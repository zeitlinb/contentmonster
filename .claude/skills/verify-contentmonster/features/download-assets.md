# Download assets

`download-assets` is the pipeline's first step for a tenant: it is meant to sync the tenant's brand, product and UGC assets from Google Drive into `clients/<id>/assets/`. Today the command accepts the tenant ID and prints that the sync is not implemented. The real sync needs the hosted Google Drive API and a service-account key, so it is unreachable here.

## Sub-features

- `download-default-client` runs for the default tenant `jaca` when no `--client` is given.
- `download-client-flag` echoes the tenant from `-c` or `--client`.
- `download-not-implemented` prints `[download-assets] client=<id> — not implemented yet`, exits 0 and writes nothing.
- `download-drive-sync` is the real Drive sync into `clients/<id>/assets/`. Unreachable here.

## How to get to it (user POV)

- Run `pnpm --filter cli cli download-assets [--client <id>]`.
- Run the package script `pnpm --filter cli download-assets [-c <id>]`.

## Driving it with control-contentmonster

Preconditions:

- `node .claude/skills/verify-contentmonster/control-contentmonster.mjs doctor` exits 0.
- `clients/jaca/assets/` does not exist in the checkout.

- **Default tenant.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out download-assets/default -- download-assets`. Exit code `0`. `stdout.txt` is `[download-assets] client=jaca — not implemented yet`.
- **Client flag.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out download-assets/cli -- download-assets --client jaca`. Exit code `0` and the same line.
- **Package script.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --script download-assets --out download-assets/script -- -c jaca`. Exit code `0` and the same line. `transcript.txt` shows `$ pnpm --filter cli download-assets -c jaca`.
- **Second view.** For each run, `writes.json` shows no new `clients/jaca/assets/` line and `denials.json` is `[]`. `run` prints `writes: none` and `sandbox refusals: none seen in the log; ...`.
- **Drive sync (unreachable).** The real sync calls the Google Drive API with the key at `credentials/drive-service-account.json`. The sandbox denies reading `credentials/` and every connect, so the run cannot reach Drive. Report `download-drive-sync` as unreachable: hosted Google Drive and a service-account key.

## Gotchas

- When the sync lands, a run inside the sandbox fails at its first Drive call. `run` then prints the refusal (on this Mac a DNS lookup fails as a `network-outbound` denial on `/private/var/run/mDNSResponder`) and the host the recorder saw. That output proves the guard held. It does not prove the sync.
- `clients/*/assets/` is ignored by git. `writes.json` still sees a new `clients/<id>/assets/` directory once it holds a file, because it diffs `git status --ignored`.
- `--client` accepts any string today. Do not report an unknown tenant ID as handled until the command validates it.
