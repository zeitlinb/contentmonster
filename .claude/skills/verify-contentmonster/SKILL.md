---
name: verify-contentmonster
description: "Drive the ContentMonster CLI (apps/cli, the `contentmonster` command: steps, download-assets, generate-scene, help and version) from this checkout, the way an operator runs it with `pnpm --filter cli cli`, in a tmux PTY inside a sandbox that refuses every network connect. Use to prove a change to apps/cli or packages/core on the real command: stdout, stderr, exit code, transcript, sandbox refusals and file writes per run."
---

# Verify ContentMonster

`control-contentmonster.mjs` runs the ContentMonster CLI exactly as the README tells an operator to: `pnpm --filter cli cli <args>` from the checkout root. Each run gets its own tmux session on this checkout's tmux socket, and the command runs inside a `sandbox-exec` profile. The script records stdout, stderr, the exit code, the pane transcript, the sandbox refusals that a log stream recorded and every file the run wrote.

Run every command from the checkout root with Node 24 first on `PATH`. The repository's CI uses Node 24, and the script refuses any other major.

```bash
export PATH=/opt/homebrew/opt/node@24/bin:$PATH
node .claude/skills/verify-contentmonster/control-contentmonster.mjs --help
```

`--help` lists every command and flag. Prose below shortens the invocation to `control-contentmonster`. Each code block spells out the full command.

## Surfaces

The repository has two user surfaces. This skill drives the primary one.

- **The CLI (`apps/cli`) is primary.** The charter puts engine logic in `packages/core` and `apps/cli`, and the runbooks name the CLI commands (`download-assets`, `generate-scene`) as the pipeline's entry points. The CLI is a short-lived process with no server. It runs through `tsx`, which compiles `apps/cli/src` and `packages/core/src` on every run, so there is no build step.
- **The web app (`apps/web`) is not driven.** It is one static Next.js page that lists the three Meta output formats, and the engineering-standards board calls it a placeholder. Its root layout loads two fonts through `next/font/google`, so `next dev` and `next build` fetch from Google Fonts, a hosted host. Driving it needs a browser harness with request-level egress control and a sandboxed build. Add that to this skill when the page gains behavior.

## Isolation and threat model

Threat model. The sandbox stops accidental leaks from three sources: the app's own code paths, this skill's driving of the browser and server, and the browser's normal network paths (fetch, XHR, WebSocket, WebRTC, service workers). Any of those reaching real data, production hosts or the developer's profile is a FAIL. Page code written to break out on purpose (IPC tricks, popup or timing races, exploits) is out of scope: these are our own apps. A verifier notes such a finding but does not fail on it.

For this CLI, the sandbox keeps the CLI's own code paths, its dependencies' install scripts and this skill's own driving off every hosted host, and the skill keeps every real key out of the process. Every child the skill starts (`pnpm --version`, `pnpm store path`, `pnpm install`, `pnpm` running a script, `tsx`, the CLI and anything they spawn) runs inside a `sandbox-exec` profile built from `(allow default)` that denies every IP connect and IP bind, loopback included; denies every unix-socket connect except under the state directory's `tmp/`, which `tsx` uses for its IPC socket; denies exec of `open`, `osascript`, `launchctl`, `tmux`, `screen`, `ssh` and `brew`, so a sandboxed process cannot ask the tmux server, Homebrew or another launcher to act for it; denies reading any `.env*` file and anything under a `credentials/` directory; and, when this checkout is a worktree, denies reading file contents in the main checkout outside this worktree. The child environment is rebuilt from nothing (`HOME` and `TMPDIR` under the state directory, `PATH`, `LANG`, `TERM`), so no key exported in the calling shell reaches the CLI.

Every denial carries a tag (`verify-contentmonster-<hash>-<purpose>`). The kernel reports each denial to the macOS unified log, but on this Mac (macOS 26.6.2, 2026-10-19) `log show` returned none of them, while `log stream` showed them as they happened. So the script starts `log stream`, filtered to the run's tag, before each sandboxed run (the install, each `run`, `selftest` and doctor's log check), waits for its first line and one more second, and stops it one second after the run. Before the run starts, it makes one denial on purpose under the run's tag: a connect to a stand-in it starts on a loopback port, which the profile denies. The script stops unless that connect gets `EPERM` and the stand-in receives nothing. When the stream shows that control denial, the run's refusal list is the stream's. When it does not, the list is marked `BLIND`: the log-based refusal check is unavailable for that run, a refusal could be missing, and containment rests on the profile itself plus the recorder. The control shows the stream works; it does not prove that every refusal reaches it, and some do not. On 2026-10-19 the stream missed 7 of about 111 tagged denials in a verifier's session, and 3 of 75 (2 of 50 probe connects and 1 of 25 controls) in 25 unperturbed runs of a probe command that makes two denied connects. macOS hides the remote address in a denial, so `egress-record.mjs`, loaded through `NODE_OPTIONS=--import`, writes the host each `fetch`, `dns.lookup` and `net.connect` named. The recorder refuses nothing: the kernel does. `run` compares the two. A recorded attempt counts as seen in the log when the stream holds a denial from the same process for its port or, for a host name, for that process's connect to `mDNSResponder`. Every attempt with no such line is listed as a recorded attempt with no kernel line, and an empty refusal list reads `none seen in the log` with the miss rate above, never a bare `none`. The recorder sees only Node's `fetch`, `dns.lookup` and `net.connect`, so a dropped denial of anything else (UDP, a unix socket, a file read, a process that is not Node) stays invisible. `selftest` proves each guard on this Mac (see Doctor).

The script derives everything else from the SHA-256 of `git rev-parse --show-toplevel` (first 12 hex characters):

- The state directory is `~/.cache/verify-contentmonster/state/<hash>/`. It holds `state.json`, the sandboxed `home/` and `tmp/`, and `tmux.conf`.
- The tmux server runs on its own socket, `verify-contentmonster-<hash>`. Each run uses the session `verify-contentmonster-<hash>-drive` and stops the server when it ends. The default tmux server is never touched.
- `node_modules` is the checkout's own, installed by `up`.
- Every sandboxed command starts in its own process group, recorded as a `.pid` file under `~/.cache/verify-contentmonster/groups/<hash>/`. When the command exits, the script stops whatever is still running in that group and deletes the record, so a process that a dependency left behind does not outlive the command.
- Every `log stream` writes its PID to a `.watch` file in the same directory before it starts, because `ps -E` does not show `/usr/bin/log`'s environment. The script stops the stream and deletes the record when the run ends, and `cleanup` reads any record left by a script that was killed.
- The log control's stand-in writes its port to a `-stand-in.txt` file there, and doctor's stream writes its output to an `.ndjson` file there. `cleanup` reads only `.pid` files as process groups and `.watch` files as streams, and deletes every other file, so it never takes a port number for a process-group ID.

One run goes at a time per checkout: `run` and `selftest` refuse while this checkout's tmux server is up. Two worktrees never share state, a tmux server or `node_modules`. The CLI opens no port, so no port check applies.

## Launch

```bash
export PATH=/opt/homebrew/opt/node@24/bin:$PATH
node .claude/skills/verify-contentmonster/control-contentmonster.mjs up
```

`up` does these steps in order:

1. It refuses unless Node is 24, `pnpm` matches the `packageManager` pin (`pnpm@11.5.1`), `tmux` and `/usr/bin/sandbox-exec` exist, and the checkout holds no `.env*` file and no `credentials/` directory. It checks names only and never reads them.
2. If this checkout is already up and its install inputs have not changed, it stops here. Otherwise it cleans the old state.
3. It refuses if this checkout's tmux server or a process carrying this state directory's marker is still running.
4. It runs `pnpm install --frozen-lockfile --offline` inside the sandbox, from the local pnpm store and metadata cache (`pnpm store path` and `~/Library/Caches/pnpm`). `pnpm store path` runs in the sandbox with the real `HOME`, so it names the user's store. It never downloads a package. A package missing from the store fails the install, and a networked `pnpm install` outside this skill is the fix.
5. It drives `contentmonster --version` through the same path as `run` and requires exit code 0 and `0.1.0.0`.

The last line is `up: contentmonster 0.1.0.0 ready in the sandbox, evidence <run dir>`. Ready means the CLI answered inside the sandbox, not only that the install exited 0.

`sharp`'s install check runs `which brew && brew environment --plain`. Before `brew` was on the denied list, a fresh install on this Mac ran Homebrew, Homebrew started `curl` with retries, the sandbox refused its DNS lookups, and `curl` kept running after the install returned. With `brew` denied, `which brew` finds nothing, the check moves on and the install succeeds with no refusal.

`pnpm install --offline` with an empty metadata cache still asks the registry for every package's metadata and retries for minutes. Inside the sandbox those lookups are refused, so the install hangs instead of failing. That is why `up` passes the real metadata cache explicitly.

## Doctor

```bash
node .claude/skills/verify-contentmonster/control-contentmonster.mjs doctor
```

Doctor changes nothing in the checkout, the state directory or the evidence. Its sandboxed probes, `pnpm --version` (run with the caller's temp directory and Node's compile cache off, so it leaves no file), the egress probe and the log control, each write a process-group record under `~/.cache/verify-contentmonster/groups/<hash>/`, creating that directory if it is missing, and delete the record when the probe ends. The log check also writes its stream's `.watch` record, its stand-in's port file and its stream output there, and deletes them when it ends. `cleanup` removes the directory. Run doctor first, and again whenever anything looks off. It prints one `OK`, `BLIND` or `FAIL` line per check and exits 0 only when no line is `FAIL`:

- Node 24, the pinned `pnpm`, `tmux` and `sandbox-exec` are present.
- The checkout holds no `.env*` file and no `credentials/` directory.
- The state file belongs to this checkout.
- The install is current. The fingerprint hashes the contents of the root `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` and every `apps/*/package.json` and `packages/*/package.json`. A change prints `STALE INSTALL`. Run `cleanup`, then `up`.
- No run is in progress: this checkout's tmux server is down and no recorded runner is alive.
- The sandbox refuses egress: a TCP connect to `192.0.2.1:443` (TEST-NET-1, never routed) inside the profile gets `EPERM`.
- The sandbox log: under a `log stream` for its own tag, a connect inside the profile to a stand-in on a loopback port gets `EPERM`, and the stream shows the denial. The line reads `BLIND` when the stream does not show it, and doctor still exits 0. `run` runs every check above this one, not this one, because each run makes its own control.

Two `INFO` lines follow. The first compares the source fingerprint now with the one at `up`. The source fingerprint hashes the committed tree of `apps/cli`, `packages`, `clients`, `platform` and the root manifests, `git diff HEAD --binary` over them, and the bytes of every untracked, non-ignored file under them. A changed source is not stale, because `tsx` compiles it on every run. Each run records the fingerprint it ran. The second counts this run's sandbox refusals, recorded outbound attempts, recorded attempts with no kernel line, and the drives marked `BLIND`.

`selftest` is the deep check. It runs one probe per guard inside the profile and requires the refusal: TCP and UDP to `192.0.2.1`, a loopback connect, a DNS lookup and a `fetch` of `generativelanguage.googleapis.com` (the Gemini API host), a unix-socket connect to this checkout's tmux socket while a tmux server listens there, exec of `tmux`, `open`, `osascript`, `launchctl` and `brew`, reads of a planted `.env` and a planted `credentials/` file, a read of the main checkout's `package.json`, and a caller-exported `GEMINI_API_KEY` reaching the child. Two controls must still work: reading this checkout's `package.json` and a unix socket under the state `tmp/`. One `log stream` covers every probe, and the log control runs first. A refusal counts only when the probe got the error and the stream holds the kernel's tagged denial for it. One second after the last probe, each refused probe that got the refusal error but has no kernel line yet runs once more under its tag plus `-retry`, and its line ends `retried once, the first try got the refusal but no kernel line`. When the stream did not show the control denial, a probe that still has no kernel line prints `BLIND` instead of `FAIL`, and `selftest` still exits 0. Each line prints `HELD`, `BLIND` or `FAIL`, what the probe saw, the denial and the host the recorder saw. The DNS and `fetch` probes fail at the `mDNSResponder` socket before any query leaves, and UDP fails at bind.

How often `selftest` passes on a healthy sandbox, on this Mac on 2026-10-19:

- Without the retry, 1 of 6 runs exited 1 on `FAIL dns-hosted-name ... no kernel line` (the verifier saw 1 of 5). The probe got `ENOTFOUND` and the recorder saw the lookup, but the stream missed the denial.
- With the retry, 40 of 40 runs exited 0, and none needed the retry. In 3 of the 40 the stream missed the control denial, so the `log control` line read `BLIND` while every guard line read `HELD`.
- The retry was proven by deleting the DNS probe's kernel line from the stream's file while `selftest` ran: the probe ran again, its line read `HELD ... retried once`, and `selftest` exited 0.

So treat a single `FAIL ... no kernel line` on a probe that got the refusal error as a likely dropped log line: run `selftest` again before you call the guard broken. A `FAIL` that names any other observation (a connect, a read, a status) is a broken guard.

```bash
node .claude/skills/verify-contentmonster/control-contentmonster.mjs selftest
```

`info` prints the checkout, the hash, the main checkout whose reads are denied, the state and evidence directories, the tmux socket, the toolchain, the install and source inputs and both fingerprints.

## Drive

Read the matching file under [`features/`](features/README.md) before you drive. It lists every entry point and the end state that proves each one.

```bash
node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out pipeline-steps/example -- steps
node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out help/example -- --help
node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out generate-scene/coffee-bar -- generate-scene --scene coffee-bar
node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --script download-assets --out download-assets/example -- -c jaca
node .claude/skills/verify-contentmonster/control-contentmonster.mjs egress
```

- These examples use `--out` names that no feature file uses, so running them first does not block a feature bullet.
- `run -- <args>` runs `pnpm --filter cli cli <args>`, the README's path. `run --script <name> -- <args>` runs `pnpm --filter cli <name> <args>`, the package scripts `download-assets` and `generate-scene`.
- `run` first runs every doctor check and refuses when one fails.
- The CLI's stdin is the tmux PTY. Its stdout and stderr are pipes that the runner appends to `stdout.txt` and `stderr.txt` as they arrive and copies to the pane, so they stay separate and a timed-out run keeps what it wrote before it was stopped.
- `run` prints the command, stdout, stderr, the exit code, the sandbox refusals, the recorded outbound attempts and the writes, then exits with the CLI's exit code. The refusal line starts with `BLIND` when the stream missed the run's control denial. It ends with `<n> recorded attempt(s) with no kernel line: ...` when the recorder saw an attempt that the stream did not show. With no refusal and no such attempt it reads `none seen in the log; ...`, which is not proof that nothing was refused. A run that passes `--timeout` (default 60 seconds) is stopped and exits 124.
- `egress` lists the refusals and recorded hosts of the install and of every run in the current run directory.

## Proof bar

Do not submit "look, it ran" captures. A proof exercises the user path and shows the end state that a skeptical reviewer would accept.

- Drive the CLI through `pnpm --filter cli cli` or the package script a user runs. Do not import `packages/core` or call a command's action directly as the primary proof.
- Run `doctor` first. A capture made while doctor fails is not evidence.
- Read the feature file for the change. Exercise every entry point it lists, and every success, empty and error path the change can affect.
- Capture the action and the end state: `spec.json` (the command and the source fingerprint), `stdout.txt`, `stderr.txt`, `exit.json` and `transcript.txt`.
- Check a second view, not only stdout. `writes.json` shows whether the run changed the checkout, and `egress.jsonl` (what the recorder saw) with `denials.json` (what the log showed) and `unlogged-attempts.json` (recorded attempts the log did not show) show whether it tried to leave the Mac. A command whose real behavior needs a hosted API is unreachable here: report the refusal as the result, never as a pass.

## Driving conventions

- Put the CLI's arguments after `--`. Keep quoted values unchanged.
- Name evidence `<feature>/<entry>` with `--out`, for example `pipeline-steps/cli`. An existing name is refused.
- Assert on `stdout.txt`. `pnpm` writes its own `$ tsx src/index.ts ...` line to stderr, and on a nonzero exit it writes `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL` to stdout after the CLI's output.
- Stdout is a pipe, so commander wraps help at 80 columns. A wider terminal wraps it differently.
- Wait on the run's end, which `run` does. Never sleep.

## Evidence

Each `up` starts a run directory at `~/.cache/verify-contentmonster/evidence/<hash>/<run-id>/`. It is outside the checkout, so it is never committed, and `cleanup` never touches it. The run directory holds:

- `install.log`, `install-denials.json`, `install-denials.ndjson` (the install's `log stream` output), `install-log-control.json` and, when the install tried to connect, `install-egress.jsonl`.
- `actions.log`, one JSON line per run with its command, exit, refusal count, whether the stream showed the log control, attempt count, the count of attempts with no kernel line and whether it wrote anything.
- One directory per run (`up-ready` is the readiness run) with `spec.json` (command, sandbox profile, child environment, source fingerprint), `child.json`, `stdout.txt`, `stderr.txt`, `exit.json`, `transcript.txt` (the whole pane), `writes.json` (lines that `git status --porcelain --ignored` gained or lost, and the source fingerprint before and after), `denials.json` (the tagged kernel denials the stream recorded, without the control), `sandbox-denials.ndjson` (the run's `log stream` output), `log-control.json` (the control's port, PID, result and whether the stream showed it), `unlogged-attempts.json` (recorded attempts with no kernel line) and, when something tried to connect, `egress.jsonl`.
- `selftest-<time>/selftest.json`, the log control and one entry per guard with what the probe saw, the denials and the recorded hosts, plus `firstTry` for a retried probe, and `sandbox-denials.ndjson`.

No file holds a credential. The child environment that `spec.json` records holds only paths and locale values.

## Cleanup

```bash
node .claude/skills/verify-contentmonster/control-contentmonster.mjs cleanup
```

Cleanup finds this checkout's processes without needing the state file: the pane processes on this checkout's tmux socket, every member of a process group recorded in a `.pid` file under `~/.cache/verify-contentmonster/groups/<hash>/` that started after its record, the PID in each `.watch` file there while that PID still runs `/usr/bin/log stream` for this checkout's tag, any process whose environment carries `VERIFY_CONTENTMONSTER_STATE=<state dir>`, and any runner whose arguments name this checkout's evidence root. macOS shows the environment only for some processes (`node` and `pnpm`, not system binaries such as `/bin/sh`, `/usr/bin/curl` or `/usr/bin/log`), which is why the records exist. With the control script killed by SIGKILL during `selftest`, and again during doctor's log check, `cleanup` stopped the orphaned stream (and the stand-in, in the doctor case) and left no `log stream` for this checkout. It adds the runner and child that the state file recorded when their start times still match. It sends SIGTERM to them and their descendants, then SIGKILL after 5 seconds. It stops the tmux server on this checkout's socket and deletes the state directory. It never matches processes by name, it keeps the evidence and it leaves `node_modules`, which is ignored install output. It exits 1 if a marked process, a group record or the tmux server remains. Run it after every run, failed runs included. A second cleanup does nothing.

## Helpers

- `control-contentmonster.mjs` is the whole driver. It is executable, so `.claude/skills/verify-contentmonster/control-contentmonster.mjs <command>` works the same as the `node` form when Node 24 is first on `PATH`. It needs only Node 24, the pinned `pnpm` and `tmux`, and adds no dependency.
- `egress-record.mjs` is the outbound-attempt recorder that each sandboxed Node process loads. Do not run it by hand.
- `features/` is the behavior map. Keep it true in the same PR as any change to `apps/cli`.
- `.gitignore` does not ignore `.claude/`, so plain `git add` picks up these files. `pnpm format:check` checks the `.mjs` files here (`.prettierignore` skips `*.md`), so run `pnpm exec prettier --write .claude/skills/verify-contentmonster` after an edit. `pnpm format:check` already fails on main for four other files (HEN-1601).

## What the stand-in differs on

The CLI runs on the operator's Mac in production too, so the drive is the real command. These differences stay unverified here:

- The real Google Drive sync and Gemini scene generation need hosted services and keys. Today both commands print `not implemented yet`. Once they call out, the sandbox refuses the call and the run records it.
- The CLI runs with a rebuilt environment and an empty `HOME`, so it sees no `.env`, no shell-exported key and no user configuration.

## Feature map

The behavior inventory lives in [`features/`](features/README.md). Each file uses the same four H2s: `Sub-features`, `How to get to it (user POV)`, `Driving it with control-contentmonster`, `Gotchas`.
