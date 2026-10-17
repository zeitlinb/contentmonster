import dns from "node:dns";
import { appendFileSync } from "node:fs";
import net from "node:net";

// Records the host each outbound attempt names, because the kernel's sandbox
// denial hides it. It blocks nothing: the sandbox profile does the refusing.
const logPath = process.env.VERIFY_EGRESS_LOG;

function record(kind, host, port) {
  try {
    appendFileSync(
      logPath,
      `${JSON.stringify({
        ts: new Date().toISOString(),
        pid: process.pid,
        script: process.argv[1] ?? null,
        kind,
        host: String(host),
        port: port === undefined ? null : Number(port),
      })}\n`,
    );
  } catch {}
}

function connectTarget(args) {
  const [first, second] = Array.isArray(args[0]) ? args[0] : args;
  if (typeof first === "object" && first !== null) {
    if (first.path !== undefined) return null;
    return { host: first.host ?? "localhost", port: first.port };
  }
  if (typeof first === "number" || /^\d+$/.test(String(first))) {
    return { host: typeof second === "string" ? second : "localhost", port: first };
  }
  return null;
}

if (logPath) {
  const lookup = dns.lookup;
  dns.lookup = function (host, ...rest) {
    record("dns.lookup", host);
    return lookup.call(this, host, ...rest);
  };
  const promiseLookup = dns.promises.lookup;
  dns.promises.lookup = function (host, ...rest) {
    record("dns.lookup", host);
    return promiseLookup.call(this, host, ...rest);
  };
  const connect = net.Socket.prototype.connect;
  net.Socket.prototype.connect = function (...args) {
    const target = connectTarget(args);
    if (target !== null) record("net.connect", target.host, target.port);
    return connect.apply(this, args);
  };
  const realFetch = globalThis.fetch;
  if (realFetch) {
    globalThis.fetch = function (input, init) {
      try {
        const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
        record("fetch", url.hostname, url.port || (url.protocol === "https:" ? 443 : 80));
      } catch {}
      return realFetch.call(this, input, init);
    };
  }
}
