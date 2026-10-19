# ContentMonster verification map

This directory is the maintained source for verifying the user-facing behavior of the ContentMonster CLI (`apps/cli`, the `contentmonster` command). Read the index before you drive the CLI, then use the matching feature file as the recipe. The web app (`apps/web`) is not mapped yet; [SKILL.md](../SKILL.md) says why.

## Baseline preconditions

- Node 24 is first on `PATH`: `export PATH=/opt/homebrew/opt/node@24/bin:$PATH`.
- The checkout holds no `.env*` file and no `credentials/` directory, so the CLI runs without a key.
- `node .claude/skills/verify-contentmonster/control-contentmonster.mjs up` printed `up: contentmonster 0.1.0.0 ready in the sandbox, evidence <dir>`.
- `node .claude/skills/verify-contentmonster/control-contentmonster.mjs doctor` exits 0.
- Never drive a CLI run that this checkout did not start. `run` refuses while this checkout's tmux server is up.

## Driving conventions

- Start every recipe from the baseline state unless its preconditions say otherwise.
- Run every CLI action through `control-contentmonster run -- <args>`, which runs `pnpm --filter cli cli <args>`. Run a package script through `control-contentmonster run --script <name> -- <args>`, which runs `pnpm --filter cli <name> <args>`.
- Treat every command as literal. Keep quoted names and flags unchanged.
- Assert on `stdout.txt` and `exit.json`. `pnpm` adds its own lines to stderr, and to stdout on a nonzero exit.
- Name evidence `<feature>/<entry>` with `--out`, for example `generate-scene/script`.
- The CLI stores nothing today. A run that writes shows it in `writes.json`.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final line.
- CLI proof includes the command and source fingerprint (`spec.json`), `stdout.txt`, `stderr.txt`, the exit code (`exit.json`) and the pane transcript (`transcript.txt`).
- Every proof has a second view: `writes.json` for what the run changed in the checkout, and `denials.json` with `egress.jsonl` for what it tried to reach.
- Record the feature ID and the entry point with every artifact.
- Report an unreachable path with the command you ran and the unmet precondition. The real Google Drive sync and the real Gemini scene generation are unreachable here by design.
- `sandbox refusals: none seen in the log` is not proof that nothing was refused: the log stream drops some denials (7 of about 111 in one session on 2026-10-19). Read it with `recorded outbound attempts`. An attempt that the stream did not show is listed as a recorded attempt with no kernel line; report it as an attempt whose refusal the log did not confirm. A `BLIND` run had no working log stream, so report its refusal list as unavailable, not as empty.
- A sandbox refusal is a result, not a pass. Never report a hosted path as verified because the CLI printed something before the refusal.
- Do not report a skipped entry point as verified through a different path.

## Full sweep

Walk the features in this order for a broad regression of `apps/cli`:

1. [Help and version](./help-and-version.md)
2. [Pipeline steps](./pipeline-steps.md)
3. [Download assets](./download-assets.md)
4. [Generate scene](./generate-scene.md)

## Feature entry contract

Each feature file starts with an H1 title and one paragraph that describes the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with control-contentmonster` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and an observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands and observable proof. Add a feature file when the CLI gains a command, and delete one when a command goes away.

## Features

- [Help and version](./help-and-version.md) covers `--help`, `help <command>`, `--version`, the bare command and an unknown command.
- [Pipeline steps](./pipeline-steps.md) covers `steps`, the numbered list of the eight ad-creative pipeline steps.
- [Download assets](./download-assets.md) covers `download-assets` from the CLI and from its package script, and the Google Drive sync it stands for.
- [Generate scene](./generate-scene.md) covers `generate-scene` from the CLI and from its package script, and the Gemini scene generation it stands for.
