# Help and version

The CLI tells an operator what it can do and which version runs: `--help` lists the commands, `help <command>` shows one command's options, `--version` prints the version, and a missing or unknown command fails with a message and exit code 1.

## Sub-features

- `help-root` lists the options and the four commands: `steps`, `download-assets`, `generate-scene` and `help`.
- `help-command` shows one command's usage, description, options and defaults.
- `version` prints `0.1.0.0`.
- `no-command` prints the root help to stderr and exits 1.
- `unknown-command` prints `error: unknown command '<name>'` to stderr and exits 1.

## How to get to it (user POV)

- Run `pnpm --filter cli cli --help` or `pnpm --filter cli cli -h`.
- Run `pnpm --filter cli cli help <command>` or `pnpm --filter cli cli <command> --help`.
- Run `pnpm --filter cli cli --version` or `pnpm --filter cli cli -V`.
- Run `pnpm --filter cli cli` with no command, or with a command the CLI does not have.

## Driving it with control-contentmonster

Preconditions:

- `node .claude/skills/verify-contentmonster/control-contentmonster.mjs doctor` exits 0.

- **Root help.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out help/root -- --help`. Exit code `0`. `stdout.txt` starts with `Usage: contentmonster [options] [command]` and lists `steps`, `download-assets [options]`, `generate-scene [options]` and `help [command]`.
- **Short flag.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out help/short -- -h`. Exit code `0` and the same `stdout.txt` as the root help.
- **Command help.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out help/generate-scene -- help generate-scene`. Exit code `0`. `stdout.txt` shows `Usage: contentmonster generate-scene [options]`, `-c, --client <id>  client tenant id (default: "jaca")` and `-s, --scene <id>   scene template id`.
- **Command flag.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out help/download-assets -- download-assets --help`. Exit code `0`. `stdout.txt` shows `Usage: contentmonster download-assets [options]` and the `--client` option with default `"jaca"`.
- **Version.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out help/version -- --version`. Exit code `0` and `stdout.txt` is `0.1.0.0`.
- **Short version flag.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out help/version-short -- -V`. Exit code `0` and `stdout.txt` is `0.1.0.0`.
- **No command.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out help/no-command`. Exit code `1`. `stderr.txt` holds the root help after pnpm's `$ tsx src/index.ts` line.
- **Unknown command.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out help/unknown -- bogus`. Exit code `1`. `stderr.txt` holds `error: unknown command 'bogus'`.
- **Proof.** Each run prints `sandbox refusals: none seen in the log; ...` and `writes: none`, and `writes.json` and `denials.json` agree.

## Gotchas

- Stdout is a pipe, so commander wraps the root help at 80 columns (`Sync a client's assets from Google Drive into` breaks before `clients/<id>/assets/`). Compare text, not line breaks, with a terminal capture.
- On exit code `1`, pnpm adds `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL` and `Exit status 1` to stdout. The CLI's own message is in stderr.
- The description still says `ad-creative + book pipelines`. The book pipeline was killed on 2026-06-27; that is the current text, not a drive failure.
