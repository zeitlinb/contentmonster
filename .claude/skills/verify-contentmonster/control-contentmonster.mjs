#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { delimiter, dirname, isAbsolute, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HELP = `control-contentmonster: drive the ContentMonster CLI (apps/cli) the way a user
does, from this checkout, inside a sandbox that refuses every network connect.

Usage: node .claude/skills/verify-contentmonster/control-contentmonster.mjs <command> [flags]

Commands:
  up                        Check the premises, install the workspace offline from
                            the local pnpm store inside the sandbox, then drive
                            \`contentmonster --version\` as the readiness check.
                            Does nothing when this checkout is already up and its
                            install inputs have not changed.
  doctor                    Read-only health check. One OK, FAIL or INFO line per
                            check; exits 0 only when every check passes.
  info                      Print the checkout, hash, paths, tmux socket, toolchain,
                            fingerprints and the evidence run directory.
  run [flags] -- <args...>  Run \`pnpm --filter cli cli <args...>\` (the README's
                            user path) in a fresh tmux PTY on this checkout's
                            socket, inside the sandbox. Prints stdout, stderr, the
                            exit code, sandbox refusals and writes; exits with the
                            CLI's exit code (124 on timeout).
      --script <name>       Run \`pnpm --filter cli <name> <args...>\` instead, for
                            the package scripts download-assets and generate-scene.
      --out <name>          Evidence subdirectory (default: <nn>-<first arg>).
      --timeout <seconds>   Kill the drive after this long (default 60).
  egress                    List, per drive of the current run, the sandbox
                            refusals and the hosts the recorder saw.
  selftest                  Prove each isolation guard: run one probe per guard in
                            the sandbox and require the refusal, plus the controls
                            that must still work. Exits 0 only when all hold.
  cleanup                   Stop every process this checkout started (tmux server,
                            runner, CLI), found by the tmux socket and this
                            checkout's state path, delete the state directory and
                            keep the evidence. Exits 1 if anything remains.
  --help                    Print this help.

Run with Node 24 first on PATH: export PATH=/opt/homebrew/opt/node@24/bin:$PATH
`;

const SKILL = "verify-contentmonster";
const SANDBOX_EXEC = "/usr/bin/sandbox-exec";
const NODE_MAJOR = 24;
const UNROUTED_IP = "192.0.2.1";
const HOSTED_PROBE_HOST = "generativelanguage.googleapis.com";
const REFUSAL_CODES = ["EPERM", "EACCES", "ENOTFOUND"];
const LAUNCHERS = ["open", "osascript", "launchctl", "tmux", "screen", "ssh"];
const SOURCE_INPUTS = [
  "apps/cli",
  "packages",
  "clients",
  "platform",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "turbo.json",
];

const scriptPath = fileURLToPath(import.meta.url);
const skillDir = dirname(scriptPath);
const recorderPath = join(skillDir, "egress-record.mjs");
const checkout = realpathSync(gitIn(skillDir, ["rev-parse", "--show-toplevel"]).trim());
const hash = createHash("sha256").update(checkout).digest("hex").slice(0, 12);
const cacheRoot = join(homedir(), ".cache", SKILL);
const stateDir = join(cacheRoot, "state", hash);
const statePath = join(stateDir, "state.json");
const sandboxHome = join(stateDir, "home");
const sandboxTmp = join(stateDir, "tmp");
const tmuxConf = join(stateDir, "tmux.conf");
const evidenceRoot = join(cacheRoot, "evidence", hash);
const tmuxSocket = `${SKILL}-${hash}`;
const driveSession = `${tmuxSocket}-drive`;
const tagPrefix = `${SKILL}-${hash}`;
const STATE_MARKER = `VERIFY_CONTENTMONSTER_STATE=${stateDir}`;

function gitIn(cwd, args) {
  const result = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" });
  if (result.status !== 0) fail(`git ${args.join(" ")} failed: ${result.stderr.trim()}`);
  return result.stdout;
}

function git(args, encoding = "utf8") {
  const result = spawnSync("git", ["-C", checkout, ...args], {
    encoding,
    maxBuffer: 256 * 1024 * 1024,
  });
  if (result.status !== 0) fail(`git ${args.join(" ")} failed: ${String(result.stderr).trim()}`);
  return result.stdout;
}

function fail(message) {
  console.error(`${SKILL}: ${message}`);
  process.exit(1);
}

function tryRun(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: "utf8", ...options });
  return result.status === 0 ? result.stdout : null;
}

function readJson(path) {
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null;
}

function writeJson(path, value) {
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(tmp, path);
}

function readJsonLines(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function stamp(date = new Date()) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d+Z$/, "Z");
}

function localTime(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function which(name, pathValue = process.env.PATH ?? "") {
  for (const dir of pathValue.split(delimiter).filter(isAbsolute)) {
    const candidate = join(dir, name);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function pinnedPnpm() {
  const manifest = JSON.parse(readFileSync(join(checkout, "package.json"), "utf8"));
  return String(manifest.packageManager ?? "").replace(/^pnpm@/, "");
}

function toolchain() {
  const tools = {
    node: process.execPath,
    nodeVersion: process.versions.node,
    pnpm: which("pnpm"),
    pnpmPinned: pinnedPnpm(),
    tmux: which("tmux"),
  };
  const version =
    tools.pnpm === null
      ? null
      : sandboxSpawn(`${tagPrefix}-toolchain`, tools, tools.pnpm, ["--version"]);
  return { ...tools, pnpmVersion: version?.status === 0 ? version.stdout.trim() : null };
}

function premiseChecks(tools) {
  const checks = [];
  const major = Number(tools.nodeVersion.split(".")[0]);
  checks.push({
    name: "node",
    ok: major === NODE_MAJOR,
    detail:
      major === NODE_MAJOR
        ? `v${tools.nodeVersion} at ${tools.node}`
        : `v${tools.nodeVersion} at ${tools.node}; CI builds on Node ${NODE_MAJOR}. Run export PATH=/opt/homebrew/opt/node@24/bin:$PATH`,
  });
  checks.push({
    name: "pnpm",
    ok: tools.pnpmVersion !== null && tools.pnpmVersion === tools.pnpmPinned,
    detail: `${tools.pnpmVersion ?? "missing"} at ${tools.pnpm ?? "(not on PATH)"}, packageManager pins ${tools.pnpmPinned}`,
  });
  checks.push({
    name: "tmux",
    ok: tools.tmux !== null,
    detail: tools.tmux ?? "tmux is not on PATH",
  });
  checks.push({
    name: "sandbox-exec",
    ok: existsSync(SANDBOX_EXEC),
    detail: existsSync(SANDBOX_EXEC) ? SANDBOX_EXEC : `${SANDBOX_EXEC} is missing`,
  });
  const secrets = secretFileNames();
  checks.push({
    name: "no env or credential files",
    ok: secrets.length === 0,
    detail:
      secrets.length === 0
        ? "no .env* file and no credentials/ directory in the checkout (names only, never read)"
        : `found ${secrets.join(", ")}; the CLI loads .env through dotenv and may find a real key. Use a clean worktree`,
  });
  return checks;
}

function secretFileNames() {
  const out =
    tryRun("/usr/bin/find", [
      checkout,
      "(",
      "-name",
      "node_modules",
      "-o",
      "-path",
      join(checkout, ".git"),
      ")",
      "-prune",
      "-o",
      "(",
      "-name",
      ".env*",
      "-o",
      "-name",
      "credentials",
      ")",
      "-print",
    ]) ?? "";
  return out
    .split("\n")
    .filter(Boolean)
    .map((path) => path.slice(checkout.length + 1));
}

function outerCheckout() {
  const common = gitIn(checkout, [
    "rev-parse",
    "--path-format=absolute",
    "--git-common-dir",
  ]).trim();
  const main = realpathSync(dirname(common));
  return main === checkout ? null : main;
}

function launcherPaths(tools) {
  const paths = new Set([
    "/usr/bin/open",
    "/usr/bin/osascript",
    "/bin/launchctl",
    "/usr/bin/screen",
    "/usr/bin/ssh",
  ]);
  for (const dir of (process.env.PATH ?? "").split(delimiter).filter(isAbsolute)) {
    for (const name of LAUNCHERS) {
      const path = join(dir, name);
      if (existsSync(path)) {
        paths.add(path);
        paths.add(realpathSync(path));
      }
    }
  }
  if (tools.tmux) paths.add(realpathSync(tools.tmux));
  return [...paths].filter((path) => existsSync(path));
}

function sandboxProfile(tag, tools) {
  const note = `(with message "${tag}")`;
  const outer = outerCheckout();
  return [
    "(version 1)",
    "(allow default)",
    `(deny network-outbound (remote ip) ${note})`,
    `(deny network-bind (local ip) ${note})`,
    `(deny network-outbound (remote unix-socket) ${note})`,
    `(allow network-outbound (remote unix-socket (subpath "${sandboxTmp}")))`,
    `(deny process-exec ${launcherPaths(tools)
      .map((path) => `(literal "${path}")`)
      .join(" ")} ${note})`,
    ...(outer === null
      ? []
      : [
          `(deny file-read-data (subpath "${outer}") ${note})`,
          `(allow file-read-data (subpath "${checkout}"))`,
        ]),
    `(deny file-read* (regex #"/\\.env[^/]*$") (regex #"/credentials(/|$)") ${note})`,
  ].join("\n");
}

function childEnv(tools, extra = {}) {
  return {
    HOME: sandboxHome,
    TMPDIR: `${sandboxTmp}/`,
    PATH: [dirname(tools.node), dirname(tools.pnpm), "/usr/bin", "/bin"].join(delimiter),
    LANG: "en_US.UTF-8",
    TERM: "xterm-256color",
    NODE_OPTIONS: `--import=${pathToFileURL(recorderPath).href}`,
    npm_config_update_notifier: "false",
    VERIFY_CONTENTMONSTER_STATE: stateDir,
    ...extra,
  };
}

function installInputs() {
  const files = ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml"];
  for (const group of ["apps", "packages"]) {
    const dir = join(checkout, group);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir).sort()) {
      if (existsSync(join(dir, name, "package.json"))) files.push(`${group}/${name}/package.json`);
    }
  }
  return files;
}

function installFingerprint() {
  const hasher = createHash("sha256");
  for (const file of installInputs()) {
    hasher.update(`${file}\0`);
    hasher.update(readFileSync(join(checkout, file)));
  }
  return hasher.digest("hex").slice(0, 16);
}

function sourceFingerprint() {
  const inputs = SOURCE_INPUTS.filter((input) => existsSync(join(checkout, input)));
  const hasher = createHash("sha256");
  hasher.update(git(["ls-tree", "-r", "HEAD", "--", ...inputs]));
  hasher.update(
    git(["diff", "HEAD", "--binary", "--no-color", "--no-ext-diff", "--", ...inputs], "buffer"),
  );
  const untracked = git(["ls-files", "--others", "--exclude-standard", "-z", "--", ...inputs])
    .split("\0")
    .filter(Boolean);
  for (const file of untracked) {
    hasher.update(`${file}\0`);
    hasher.update(readFileSync(join(checkout, file)));
  }
  return {
    fingerprint: hasher.digest("hex").slice(0, 16),
    commit: git(["rev-parse", "HEAD"]).trim(),
    changedFiles: git(["status", "--porcelain", "--", ...inputs])
      .split("\n")
      .filter(Boolean).length,
    inputs,
  };
}

function worktreeStatus() {
  return git(["status", "--porcelain=v1", "--ignored"]).split("\n").filter(Boolean).sort();
}

function processStart(pid) {
  return tryRun("/bin/ps", ["-o", "lstart=", "-p", String(pid)])?.trim() || null;
}

function alive(pid, start) {
  return pid > 0 && start !== null && processStart(pid) === start;
}

function processTable() {
  const out = tryRun("/bin/ps", ["-axww", "-o", "pid=,ppid="]) ?? "";
  return out
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split(/\s+/).map(Number));
}

function descendants(pids) {
  const table = processTable();
  const found = new Set(pids);
  let grew = true;
  while (grew) {
    grew = false;
    for (const [pid, ppid] of table) {
      if (found.has(ppid) && !found.has(pid)) {
        found.add(pid);
        grew = true;
      }
    }
  }
  return [...found];
}

function markedProcesses() {
  const out = tryRun("/bin/ps", ["-axwwE", "-o", "pid=,command="]) ?? "";
  const ancestors = new Set([process.pid, process.ppid]);
  return out
    .split("\n")
    .filter((line) => line.includes(STATE_MARKER) || line.includes(`__drive ${evidenceRoot}`))
    .map((line) => Number(line.trim().split(/\s+/)[0]))
    .filter((pid) => !ancestors.has(pid));
}

function stopProcesses(pids) {
  const targets = descendants(pids).filter((pid) => pid !== process.pid);
  const starts = new Map(targets.map((pid) => [pid, processStart(pid)]));
  for (const pid of targets) {
    try {
      process.kill(pid, "SIGTERM");
    } catch {}
  }
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline && targets.some((pid) => alive(pid, starts.get(pid)))) sleep(100);
  for (const pid of targets.filter((pid) => alive(pid, starts.get(pid)))) {
    try {
      process.kill(pid, "SIGKILL");
    } catch {}
  }
  return targets;
}

function tmux(args) {
  const env = { ...process.env };
  delete env.TMUX;
  return spawnSync("tmux", ["-L", tmuxSocket, ...args], { encoding: "utf8", env });
}

function tmuxServerUp() {
  return tmux(["list-sessions"]).status === 0;
}

function tmuxPanePids() {
  const result = tmux(["list-panes", "-a", "-F", "#{pane_pid}"]);
  return result.status === 0 ? result.stdout.split("\n").filter(Boolean).map(Number) : [];
}

function tmuxSocketPath() {
  const uid = process.getuid();
  const base = process.env.TMUX_TMPDIR || "/private/tmp";
  return join(realpathSync(base), `tmux-${uid}`, tmuxSocket);
}

function readState() {
  return readJson(statePath);
}

function requireState() {
  const state = readState();
  if (state === null) fail(`no instance for ${checkout}. Run \`up\` first.`);
  if (state.checkout !== checkout || state.hash !== hash) {
    fail(`state at ${statePath} belongs to ${state.checkout}, not this checkout`);
  }
  return state;
}

function readDenials(tag, since) {
  const out = tryRun(
    "/usr/bin/log",
    [
      "show",
      "--start",
      localTime(new Date(since.getTime() - 1000)),
      "--style",
      "ndjson",
      "--predicate",
      `eventMessage CONTAINS "${tag}" AND senderImagePath ENDSWITH "Sandbox"`,
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  );
  if (out === null) return null;
  return out
    .split("\n")
    .filter((line) => line.startsWith("{"))
    .map((line) => {
      const [first, note = ""] = (JSON.parse(line).eventMessage ?? "").split("\n");
      const match = first.match(
        /^(?:(\d+) duplicate reports? for )?Sandbox: (.+?)\((\d+)\) deny\(\d+\) (\S+) ?(.*)$/,
      );
      if (match === null || !note.trim().startsWith(tag)) return null;
      return {
        count: match[1] === undefined ? 1 : Number(match[1]),
        process: match[2],
        pid: Number(match[3]),
        operation: match[4],
        target: match[5],
        tag: note.trim(),
      };
    })
    .filter((denial) => denial !== null);
}

function summarizeDenials(denials) {
  const totals = new Map();
  for (const denial of denials) {
    const key = `${denial.process} ${denial.operation} ${denial.target}`.trim();
    totals.set(key, (totals.get(key) ?? 0) + denial.count);
  }
  return [...totals].map(([key, total]) => `${key} x${total}`);
}

function sandboxSpawn(tag, tools, command, args, options = {}) {
  return spawnSync(SANDBOX_EXEC, ["-p", sandboxProfile(tag, tools), command, ...args], {
    encoding: "utf8",
    timeout: 30000,
    cwd: checkout,
    ...options,
    env: childEnv(tools, options.extraEnv ?? {}),
  });
}

function probeScript(body) {
  return `const report=(o)=>{process.stdout.write(JSON.stringify(o));process.exit(0)};${body}`;
}

const TCP_PROBE = probeScript(
  `const s=require("net").connect(443,"${UNROUTED_IP}");s.on("connect",()=>report({connected:true}));s.on("error",(e)=>report({error:e.code}));setTimeout(()=>report({error:"TIMEOUT"}),5000);`,
);

function egressRefused(tools) {
  const probe = sandboxSpawn(`${tagPrefix}-doctor`, tools, tools.node, ["-e", TCP_PROBE], {
    extraEnv: { NODE_OPTIONS: "" },
  });
  let result = {};
  try {
    result = JSON.parse(probe.stdout);
  } catch {}
  return {
    ok: result.error === "EPERM",
    detail:
      result.error === "EPERM"
        ? `a TCP connect to ${UNROUTED_IP}:443 inside the profile got EPERM`
        : `the probe did not get EPERM: ${probe.stdout || probe.stderr || probe.error}`,
  };
}

function healthChecks(tools, state) {
  const checks = premiseChecks(tools);
  if (state === null) {
    checks.push({ name: "state", ok: false, detail: `no state at ${statePath}. Run \`up\`` });
    return checks;
  }
  checks.push({
    name: "state",
    ok: state.checkout === checkout && state.hash === hash,
    detail: `${statePath} belongs to ${state.checkout}`,
  });
  const install = installFingerprint();
  const modules = existsSync(join(checkout, "node_modules", ".modules.yaml"));
  const tsx = existsSync(join(checkout, "apps", "cli", "node_modules", ".bin", "tsx"));
  checks.push({
    name: "install",
    ok: install === state.installFingerprint && modules && tsx,
    detail:
      install !== state.installFingerprint
        ? `STALE INSTALL: the manifests or lockfile changed since up (${state.installFingerprint} -> ${install}). Run cleanup, then up`
        : !modules || !tsx
          ? "node_modules or apps/cli's tsx is missing. Run cleanup, then up"
          : `install inputs match up (${install}): ${installInputs().join(", ")}`,
  });
  const panes = tmuxPanePids();
  const drive = state.drive ?? null;
  const driveAlive = drive !== null && alive(drive.runnerPid, drive.runnerStart);
  checks.push({
    name: "no drive running",
    ok: !tmuxServerUp() && !driveAlive,
    detail:
      tmuxServerUp() || driveAlive
        ? `tmux server ${tmuxSocket} is up (pane PIDs ${panes.join(",") || "none"}) or a recorded runner lives. Wait for it or run cleanup`
        : `no tmux server on ${tmuxSocket} and no recorded runner alive`,
  });
  const egress = egressRefused(tools);
  checks.push({ name: "sandbox refuses egress", ...egress });
  return checks;
}

function printChecks(checks) {
  for (const check of checks)
    console.log(`${check.ok ? "OK  " : "FAIL"} ${check.name}: ${check.detail}`);
  return checks.every((check) => check.ok);
}

function doctor() {
  const tools = toolchain();
  const state = readState();
  const ok = printChecks(healthChecks(tools, state));
  if (state !== null) {
    const source = sourceFingerprint();
    console.log(
      `INFO source: ${source.fingerprint} at ${source.commit.slice(0, 12)}, ${source.changedFiles} changed input file(s); at up ${state.sourceAtUp.fingerprint}. tsx compiles apps/cli and packages/core on every run, so a drive always runs the current source and records its fingerprint`,
    );
    const drives = driveDirs(state);
    const denied = drives.reduce(
      (sum, dir) => sum + (readJson(join(dir, "denials.json"))?.length ?? 0),
      0,
    );
    const hosts = drives.flatMap((dir) => readJsonLines(join(dir, "egress.jsonl")));
    console.log(
      `INFO egress: ${drives.length} drive(s) this run, ${denied} sandbox refusal line(s), ${hosts.length} recorded outbound attempt(s). \`egress\` lists them`,
    );
  }
  process.exit(ok ? 0 : 1);
}

function info() {
  const tools = toolchain();
  const state = readState();
  const source = sourceFingerprint();
  const lines = [
    ["checkout", checkout],
    ["hash", hash],
    ["outer checkout (reads denied)", outerCheckout() ?? "none"],
    ["state dir", stateDir],
    ["evidence root", evidenceRoot],
    ["run dir", state?.runDir ?? "(none; run up)"],
    ["tmux socket", `${tmuxSocket} (${tmuxSocketPath()})`],
    ["drive session", driveSession],
    ["node", `v${tools.nodeVersion} ${tools.node}`],
    ["pnpm", `${tools.pnpmVersion} ${tools.pnpm} (pinned ${tools.pnpmPinned})`],
    ["install inputs", installInputs().join(", ")],
    ["install fingerprint", `${installFingerprint()} (at up: ${state?.installFingerprint ?? "-"})`],
    ["source inputs", source.inputs.join(", ")],
    ["source fingerprint", `${source.fingerprint} at ${source.commit}`],
    ["sandbox tag prefix", tagPrefix],
  ];
  for (const [key, value] of lines) console.log(`${key}: ${value}`);
}

function driveDirs(state) {
  if (!state?.runDir || !existsSync(state.runDir)) return [];
  return readdirSync(state.runDir, { recursive: true })
    .filter((path) => path.endsWith("/spec.json") || path === "spec.json")
    .map((path) => join(state.runDir, dirname(path)))
    .sort();
}

function up() {
  const tools = toolchain();
  const premises = premiseChecks(tools);
  if (!premises.every((check) => check.ok)) {
    printChecks(premises);
    fail("up refused: a premise check failed");
  }
  const existing = readState();
  if (existing !== null) {
    if (existing.checkout === checkout && existing.installFingerprint === installFingerprint()) {
      console.log(`up: already up, evidence ${existing.runDir}`);
      return;
    }
    console.log("up: install inputs changed since up; cleaning the old state first");
    cleanup({ exit: false });
  }
  if (tmuxServerUp() || markedProcesses().length > 0) {
    fail(
      `up refused: tmux server ${tmuxSocket} or a process marked with this state dir is running without state. Run cleanup`,
    );
  }
  mkdirSync(sandboxHome, { recursive: true });
  mkdirSync(sandboxTmp, { recursive: true });
  writeFileSync(tmuxConf, "set -g remain-on-exit on\nset -g history-limit 100000\n");
  const startedAt = new Date();
  const runDir = join(evidenceRoot, stamp(startedAt));
  mkdirSync(runDir, { recursive: true });
  const store = sandboxSpawn(`${tagPrefix}-store`, tools, tools.pnpm, ["store", "path"], {
    extraEnv: { HOME: homedir() },
  });
  const storeDir = store.status === 0 ? store.stdout.trim() : null;
  const cacheDir = join(homedir(), "Library", "Caches", "pnpm");
  if (!storeDir || !existsSync(storeDir) || !existsSync(cacheDir)) {
    fail(
      `up refused: the local pnpm store (${storeDir}) or metadata cache (${cacheDir}) is missing; this skill installs offline only`,
    );
  }
  const installLog = join(runDir, "install.log");
  const installTag = `${tagPrefix}-install-${stamp(startedAt)}`;
  console.log(`up: pnpm install --frozen-lockfile --offline in the sandbox (log: ${installLog})`);
  const install = sandboxSpawn(
    installTag,
    tools,
    tools.pnpm,
    [
      "install",
      "--frozen-lockfile",
      "--offline",
      `--config.store-dir=${storeDir}`,
      `--config.cache-dir=${cacheDir}`,
    ],
    { timeout: 300000, extraEnv: { VERIFY_EGRESS_LOG: join(runDir, "install-egress.jsonl") } },
  );
  writeFileSync(installLog, `${install.stdout ?? ""}${install.stderr ?? ""}`);
  sleep(1000);
  writeJson(join(runDir, "install-denials.json"), readDenials(installTag, startedAt) ?? []);
  if (install.status !== 0) {
    console.error(
      `${install.stdout ?? ""}${install.stderr ?? ""}`.split("\n").slice(-20).join("\n"),
    );
    fail(
      `up failed: the offline install exited ${install.status ?? install.signal}. A package missing from the local store needs a networked \`pnpm install\` outside this skill`,
    );
  }
  const state = {
    skill: SKILL,
    checkout,
    hash,
    startedAt: startedAt.toISOString(),
    runDir,
    installFingerprint: installFingerprint(),
    sourceAtUp: sourceFingerprint(),
    toolchain: tools,
    drive: null,
  };
  writeJson(statePath, state);
  const ready = drive(state, tools, { name: "up-ready", argv: ["cli", "--version"], timeout: 60 });
  const version = ready.stdout.trim();
  if (ready.exit.code !== 0 || version !== "0.1.0.0") {
    fail(
      `up failed: \`contentmonster --version\` exited ${ready.exit.code} with "${version}". See ${ready.dir}`,
    );
  }
  console.log(`up: contentmonster ${version} ready in the sandbox, evidence ${runDir}`);
}

function parseRunArgs(argv) {
  const separator = argv.indexOf("--");
  const flags = separator === -1 ? argv : argv.slice(0, separator);
  const rest = separator === -1 ? [] : argv.slice(separator + 1);
  const options = { script: null, out: null, timeout: 60 };
  for (let i = 0; i < flags.length; i += 2) {
    const value = flags[i + 1];
    if (value === undefined) fail(`${flags[i]} needs a value`);
    if (flags[i] === "--script") options.script = value;
    else if (flags[i] === "--out") options.out = value;
    else if (flags[i] === "--timeout") options.timeout = Number(value);
    else fail(`unknown run flag ${flags[i]}. Put the CLI's arguments after --`);
  }
  if (!(options.timeout > 0)) fail("--timeout must be a positive number of seconds");
  if (options.out !== null && !/^[A-Za-z0-9._-]+(\/[A-Za-z0-9._-]+)*$/.test(options.out)) {
    fail("--out must be a relative name of letters, digits, dot, dash, underscore and slash");
  }
  return { ...options, rest };
}

function run(argv) {
  const options = parseRunArgs(argv);
  const tools = toolchain();
  const state = requireState();
  const checks = healthChecks(tools, state);
  if (!checks.every((check) => check.ok)) {
    printChecks(checks);
    fail("run refused: doctor fails");
  }
  const script = options.script ?? "cli";
  const index = String(driveDirs(state).length + 1).padStart(2, "0");
  const name =
    options.out ?? `${index}-${[options.script, options.rest[0]].filter(Boolean)[0] ?? "noargs"}`;
  const result = drive(state, tools, {
    name,
    argv: [script, ...options.rest],
    timeout: options.timeout,
  });
  process.exit(result.exit.timedOut ? 124 : (result.exit.code ?? 1));
}

function drive(state, tools, { name, argv, timeout }) {
  const dir = join(state.runDir, name);
  if (existsSync(join(dir, "spec.json"))) fail(`evidence ${dir} exists; pick another --out`);
  mkdirSync(dir, { recursive: true });
  const startedAt = new Date();
  const tag = `${tagPrefix}-drive-${stamp(startedAt)}-${createHash("sha256").update(dir).digest("hex").slice(0, 6)}`;
  const command = [tools.pnpm, "--filter", "cli", ...argv];
  const statusBefore = worktreeStatus();
  const sourceBefore = sourceFingerprint();
  writeJson(join(dir, "spec.json"), {
    command,
    display: `pnpm --filter cli ${argv.join(" ")}`,
    cwd: checkout,
    tag,
    profile: sandboxProfile(tag, tools),
    env: childEnv(tools, { VERIFY_EGRESS_LOG: join(dir, "egress.jsonl") }),
    timeoutSeconds: timeout,
    startedAt: startedAt.toISOString(),
    source: sourceBefore,
  });
  const started = tmux([
    "-f",
    tmuxConf,
    "new-session",
    "-d",
    "-s",
    driveSession,
    "-x",
    "160",
    "-y",
    "50",
    tools.node,
    scriptPath,
    "__drive",
    dir,
  ]);
  if (started.status !== 0) fail(`tmux new-session failed: ${started.stderr.trim()}`);
  const runnerPid = Number(
    tmux(["display-message", "-p", "-t", `=${driveSession}:`, "#{pane_pid}"]).stdout.trim(),
  );
  writeJson(statePath, {
    ...state,
    drive: { session: driveSession, dir, runnerPid, runnerStart: processStart(runnerPid) },
  });
  const exitPath = join(dir, "exit.json");
  const deadline = Date.now() + timeout * 1000;
  while (!existsSync(exitPath) && Date.now() < deadline) sleep(100);
  if (!existsSync(exitPath)) {
    const child = readJson(join(dir, "child.json"));
    const stopped = stopProcesses([runnerPid, ...(child ? [child.pid] : [])]);
    writeJson(exitPath, { code: null, signal: null, timedOut: true, stoppedPids: stopped });
  }
  const pane = tmux(["capture-pane", "-p", "-J", "-S", "-", "-E", "-", "-t", `=${driveSession}:`]);
  writeFileSync(
    join(dir, "transcript.txt"),
    `${(pane.stdout ?? "").replace(/\n{3,}/g, "\n\n").trimEnd()}\n`,
  );
  tmux(["kill-server"]);
  writeJson(statePath, { ...state, drive: null });
  const statusAfter = worktreeStatus();
  const sourceAfter = sourceFingerprint();
  const before = new Set(statusBefore);
  const after = new Set(statusAfter);
  const writes = {
    statusAdded: statusAfter.filter((line) => !before.has(line)),
    statusRemoved: statusBefore.filter((line) => !after.has(line)),
    sourceFingerprintBefore: sourceBefore.fingerprint,
    sourceFingerprintAfter: sourceAfter.fingerprint,
  };
  writeJson(join(dir, "writes.json"), writes);
  sleep(1000);
  const denials = readDenials(tag, startedAt);
  writeJson(join(dir, "denials.json"), denials ?? []);
  const exit = readJson(exitPath);
  const stdout = existsSync(join(dir, "stdout.txt"))
    ? readFileSync(join(dir, "stdout.txt"), "utf8")
    : "";
  const stderr = existsSync(join(dir, "stderr.txt"))
    ? readFileSync(join(dir, "stderr.txt"), "utf8")
    : "";
  const attempts = readJsonLines(join(dir, "egress.jsonl"));
  const wrote =
    writes.statusAdded.length + writes.statusRemoved.length > 0 ||
    sourceBefore.fingerprint !== sourceAfter.fingerprint;
  appendFileSync(
    join(state.runDir, "actions.log"),
    `${JSON.stringify({ ts: startedAt.toISOString(), name, command: `pnpm --filter cli ${argv.join(" ")}`, exit, denials: denials?.length ?? null, attempts: attempts.length, wrote })}\n`,
  );
  console.log(`$ pnpm --filter cli ${argv.join(" ")}`);
  console.log(`--- stdout\n${stdout}--- stderr\n${stderr}---`);
  console.log(
    `exit: ${exit.timedOut ? `TIMEOUT after ${timeout}s` : `${exit.code}${exit.signal ? ` (signal ${exit.signal})` : ""}`}`,
  );
  console.log(
    `sandbox refusals: ${denials === null ? "unreadable (log show failed)" : denials.length === 0 ? "none" : summarizeDenials(denials).join("; ")}`,
  );
  console.log(
    `recorded outbound attempts: ${attempts.length === 0 ? "none" : [...new Set(attempts.map((row) => `${row.kind} ${row.host}${row.port ? `:${row.port}` : ""}`))].join("; ")}`,
  );
  console.log(
    `writes: ${wrote ? [...writes.statusAdded.map((line) => `+ ${line}`), ...writes.statusRemoved.map((line) => `- ${line}`), sourceBefore.fingerprint !== sourceAfter.fingerprint ? "source fingerprint changed" : null].filter(Boolean).join("; ") : "none"}`,
  );
  console.log(`evidence: ${dir}`);
  return { dir, exit, stdout, stderr, denials, attempts, writes };
}

function runner(dir) {
  const spec = readJson(join(dir, "spec.json"));
  console.log(`$ ${spec.display}`);
  const started = Date.now();
  const child = spawn(SANDBOX_EXEC, ["-p", spec.profile, ...spec.command], {
    cwd: spec.cwd,
    env: spec.env,
    stdio: ["inherit", "pipe", "pipe"],
  });
  writeJson(join(dir, "child.json"), { pid: child.pid, start: processStart(child.pid) });
  const out = [];
  const err = [];
  child.stdout.on("data", (chunk) => {
    out.push(chunk);
    process.stdout.write(chunk);
  });
  child.stderr.on("data", (chunk) => {
    err.push(chunk);
    process.stderr.write(chunk);
  });
  child.on("close", (code, signal) => {
    writeFileSync(join(dir, "stdout.txt"), Buffer.concat(out));
    writeFileSync(join(dir, "stderr.txt"), Buffer.concat(err));
    writeJson(join(dir, "exit.json"), { code, signal, timedOut: false, ms: Date.now() - started });
    console.log(`[exit ${code ?? signal}]`);
  });
}

function egress() {
  const state = requireState();
  const installDenials = readJson(join(state.runDir, "install-denials.json")) ?? [];
  const installAttempts = readJsonLines(join(state.runDir, "install-egress.jsonl"));
  console.log(
    `install: ${installDenials.length} refusal line(s) ${summarizeDenials(installDenials).join("; ")}; ${installAttempts.length} recorded attempt(s) ${[...new Set(installAttempts.map((row) => `${row.kind} ${row.host}`))].join("; ")}`,
  );
  for (const dir of driveDirs(state)) {
    const spec = readJson(join(dir, "spec.json"));
    const denials = readJson(join(dir, "denials.json")) ?? [];
    const attempts = readJsonLines(join(dir, "egress.jsonl"));
    console.log(`${dir.slice(state.runDir.length + 1)}: ${spec.display}`);
    console.log(
      `  refusals: ${denials.length === 0 ? "none" : summarizeDenials(denials).join("; ")}`,
    );
    console.log(
      `  recorded attempts: ${attempts.length === 0 ? "none" : [...new Set(attempts.map((row) => `${row.kind} ${row.host}${row.port ? `:${row.port}` : ""}`))].join("; ")}`,
    );
  }
}

function selftest() {
  const tools = toolchain();
  const state = requireState();
  if (tmuxServerUp())
    fail(`selftest refused: tmux server ${tmuxSocket} is up. Wait for the drive or run cleanup`);
  const startedAt = new Date();
  const dir = join(state.runDir, `selftest-${stamp(startedAt)}`);
  const probeDir = join(stateDir, "probe");
  mkdirSync(join(probeDir, "apps", "cli"), { recursive: true });
  mkdirSync(join(probeDir, "credentials"), { recursive: true });
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(probeDir, "apps", "cli", ".env"), "VERIFY_DUMMY=not-a-secret\n");
  writeFileSync(join(probeDir, "credentials", "drive-service-account.json"), '{"dummy":true}\n');
  const tmuxStarted = tmux([
    "-f",
    tmuxConf,
    "new-session",
    "-d",
    "-s",
    `${tmuxSocket}-selftest`,
    "/bin/sleep",
    "60",
  ]);
  if (tmuxStarted.status !== 0)
    fail(`selftest could not start its tmux stimulus: ${tmuxStarted.stderr.trim()}`);
  const outer = outerCheckout();
  const read = (path) =>
    probeScript(
      `try{require("fs").readFileSync(${JSON.stringify(path)});report({read:true})}catch(e){report({error:e.code})}`,
    );
  const exec = (path, args) =>
    probeScript(
      `const r=require("child_process").spawnSync(${JSON.stringify(path)},${JSON.stringify(args)});report(r.error?{error:r.error.code}:{status:r.status})`,
    );
  const unixServer = join(sandboxTmp, "selftest.sock");
  const probes = [
    { guard: "tcp-egress", expect: "refused", script: TCP_PROBE },
    {
      guard: "udp-egress",
      expect: "refused",
      script: probeScript(
        `const s=require("dgram").createSocket("udp4");s.on("error",(e)=>report({error:e.code}));s.send(Buffer.from("probe"),3478,"${UNROUTED_IP}",(e)=>report(e?{error:e.code}:{sent:true}));`,
      ),
    },
    {
      guard: "loopback",
      expect: "refused",
      script: probeScript(
        `const s=require("net").connect(9,"127.0.0.1");s.on("connect",()=>report({connected:true}));s.on("error",(e)=>report({error:e.code}));`,
      ),
    },
    {
      guard: "dns-hosted-name",
      expect: "refused",
      needsDenial: true,
      script: probeScript(
        `require("dns").lookup("${HOSTED_PROBE_HOST}",(e,a)=>report(e?{error:e.code}:{address:a}));`,
      ),
    },
    {
      guard: "fetch-hosted-api",
      expect: "refused",
      needsDenial: true,
      script: probeScript(
        `fetch("https://${HOSTED_PROBE_HOST}/").then((r)=>report({status:r.status}),(e)=>report({error:(e.cause&&e.cause.code)||e.message}));`,
      ),
    },
    {
      guard: "unix-socket-to-tmux",
      expect: "refused",
      script: probeScript(
        `const s=require("net").connect(${JSON.stringify(tmuxSocketPath())});s.on("connect",()=>report({connected:true}));s.on("error",(e)=>report({error:e.code}));`,
      ),
    },
    {
      guard: "exec-tmux",
      expect: "refused",
      script: exec(realpathSync(tools.tmux), ["-L", tmuxSocket, "list-sessions"]),
    },
    { guard: "exec-open", expect: "refused", script: exec("/usr/bin/open", ["-h"]) },
    {
      guard: "exec-osascript",
      expect: "refused",
      script: exec("/usr/bin/osascript", ["-e", "return 1"]),
    },
    { guard: "exec-launchctl", expect: "refused", script: exec("/bin/launchctl", ["version"]) },
    {
      guard: "read-env-file",
      expect: "refused",
      script: read(join(probeDir, "apps", "cli", ".env")),
    },
    {
      guard: "read-credentials",
      expect: "refused",
      script: read(join(probeDir, "credentials", "drive-service-account.json")),
    },
    ...(outer === null
      ? []
      : [
          {
            guard: "read-outer-checkout",
            expect: "refused",
            script: read(join(outer, "package.json")),
          },
        ]),
    {
      guard: "caller-env-scrubbed",
      expect: "absent",
      script: probeScript(
        `report({present:Object.keys(process.env).filter((k)=>/KEY|TOKEN|SECRET|GEMINI|GOOGLE/.test(k))})`,
      ),
      callerEnv: {
        GEMINI_API_KEY: "verify-dummy-not-a-key",
        GOOGLE_APPLICATION_CREDENTIALS: "/nonexistent",
      },
    },
    {
      guard: "control-read-checkout",
      expect: "works",
      script: read(join(checkout, "package.json")),
    },
    {
      guard: "control-unix-socket-in-state-tmp",
      expect: "works",
      script: probeScript(
        `const net=require("net");try{require("fs").unlinkSync(${JSON.stringify(unixServer)})}catch{};const srv=net.createServer((c)=>c.end()).listen(${JSON.stringify(unixServer)},()=>{const s=net.connect(${JSON.stringify(unixServer)});s.on("connect",()=>{srv.close();report({connected:true})});s.on("error",(e)=>report({error:e.code}))});srv.on("error",(e)=>report({error:e.code}));`,
      ),
    },
  ];
  const results = [];
  for (const probe of probes) {
    const tag = `${tagPrefix}-selftest-${probe.guard}`;
    for (const [key, value] of Object.entries(probe.callerEnv ?? {})) process.env[key] = value;
    const out = sandboxSpawn(tag, tools, tools.node, ["-e", probe.script], {
      extraEnv: { VERIFY_EGRESS_LOG: join(dir, `${probe.guard}.egress.jsonl`) },
    });
    for (const key of Object.keys(probe.callerEnv ?? {})) delete process.env[key];
    let observed;
    try {
      observed = JSON.parse(out.stdout);
    } catch {
      observed = { raw: `${out.stdout}${out.stderr}`.trim(), status: out.status };
    }
    results.push({ ...probe, script: undefined, callerEnv: undefined, observed, tag });
  }
  tmux(["kill-server"]);
  rmSync(probeDir, { recursive: true, force: true });
  sleep(1500);
  for (const result of results) {
    result.denials = readDenials(result.tag, startedAt) ?? [];
    result.recorded = readJsonLines(join(dir, `${result.guard}.egress.jsonl`)).map(
      (row) => `${row.kind} ${row.host}${row.port ? `:${row.port}` : ""}`,
    );
    result.held =
      result.expect === "refused"
        ? REFUSAL_CODES.includes(result.observed.error) &&
          (!result.needsDenial || result.denials.length > 0)
        : result.expect === "absent"
          ? Array.isArray(result.observed.present) && result.observed.present.length === 0
          : result.observed.read === true || result.observed.connected === true;
  }
  writeJson(join(dir, "selftest.json"), results);
  for (const result of results) {
    const denial = summarizeDenials(result.denials).join("; ") || "no kernel line";
    console.log(
      `${result.held ? "HELD" : "FAIL"} ${result.guard} (expect ${result.expect}): observed ${JSON.stringify(result.observed)}; ${denial}${result.recorded.length ? `; recorder saw ${[...new Set(result.recorded)].join(", ")}` : ""}`,
    );
  }
  console.log(`evidence: ${join(dir, "selftest.json")}`);
  process.exit(results.every((result) => result.held) ? 0 : 1);
}

function cleanup({ exit = true } = {}) {
  const state = readState();
  const pids = new Set([...tmuxPanePids(), ...markedProcesses()]);
  if (state?.drive) {
    if (alive(state.drive.runnerPid, state.drive.runnerStart)) pids.add(state.drive.runnerPid);
    const child = readJson(join(state.drive.dir, "child.json"));
    if (child && alive(child.pid, child.start)) pids.add(child.pid);
  }
  const stopped = pids.size > 0 ? stopProcesses([...pids]) : [];
  tmux(["kill-server"]);
  rmSync(stateDir, { recursive: true, force: true });
  const leftover = markedProcesses();
  const serverUp = tmuxServerUp();
  console.log(
    `cleanup: stopped ${stopped.length ? stopped.join(",") : "nothing"}; removed ${stateDir}; kept evidence ${evidenceRoot}`,
  );
  if (leftover.length > 0 || serverUp) {
    console.error(
      `cleanup: still running: ${[...leftover.map(String), serverUp ? `tmux server ${tmuxSocket}` : null].filter(Boolean).join(", ")}`,
    );
    if (exit) process.exit(1);
  }
}

const [command, ...args] = process.argv.slice(2);
switch (command) {
  case "up":
    up();
    break;
  case "doctor":
    doctor();
    break;
  case "info":
    info();
    break;
  case "run":
    run(args);
    break;
  case "egress":
    egress();
    break;
  case "selftest":
    selftest();
    break;
  case "cleanup":
    cleanup();
    break;
  case "__drive":
    runner(args[0]);
    break;
  case undefined:
  case "--help":
  case "-h":
  case "help":
    process.stdout.write(HELP);
    break;
  default:
    process.stderr.write(HELP);
    fail(`unknown command ${command}`);
}
