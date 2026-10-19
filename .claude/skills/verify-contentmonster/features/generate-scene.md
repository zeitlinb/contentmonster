# Generate scene

`generate-scene` is the pipeline's scene step: it is meant to generate a scene background for a tenant's scene template through Gemini (Nano Banana). Today the command accepts the tenant and scene IDs and prints that generation is not implemented. Real generation calls a hosted, paid API with a key, so it is unreachable here.

## Sub-features

- `scene-default-client` uses the tenant `jaca` when no `--client` is given.
- `scene-flags` echoes the tenant from `-c` or `--client` and the scene from `-s` or `--scene`.
- `scene-missing-scene` prints `scene=(none)` when no scene is given.
- `scene-not-implemented` prints `[generate-scene] client=<id> scene=<id> — not implemented yet`, exits 0 and writes nothing.
- `scene-gemini` is the real generation through the Gemini API. Unreachable here.

## How to get to it (user POV)

- Run `pnpm --filter cli cli generate-scene [--client <id>] [--scene <id>]`.
- Run the package script `pnpm --filter cli generate-scene [-c <id>] [-s <id>]`.

## Driving it with control-contentmonster

Preconditions:

- `node .claude/skills/verify-contentmonster/control-contentmonster.mjs doctor` exits 0.
- `clients/jaca/scenes.json` holds the scene `kitchen-counter`.

- **Scene from the CLI.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out generate-scene/cli -- generate-scene --scene kitchen-counter`. Exit code `0`. `stdout.txt` is `[generate-scene] client=jaca scene=kitchen-counter — not implemented yet`.
- **Short flags.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out generate-scene/short -- generate-scene -c jaca -s kitchen-counter`. Exit code `0` and the same line.
- **No scene.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out generate-scene/no-scene -- generate-scene`. Exit code `0`. `stdout.txt` is `[generate-scene] client=jaca scene=(none) — not implemented yet`.
- **Package script.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --script generate-scene --out generate-scene/script -- --scene kitchen-counter`. Exit code `0` and the same line as the CLI run. `transcript.txt` shows `$ pnpm --filter cli generate-scene --scene kitchen-counter`.
- **Second view.** For each run, `writes.json` shows no new `output/` line and `denials.json` is `[]`. `run` prints `writes: none` and `sandbox refusals: none seen in the log; ...`.
- **Gemini generation (unreachable).** Real generation sends the scene prompt to the Gemini API with a paid key. The child environment holds no key, the sandbox denies reading `.env*` and every connect, and `selftest`'s `fetch-hosted-api` probe shows a `fetch` of `generativelanguage.googleapis.com` refused at the DNS lookup, before any query left the Mac. Report `scene-gemini` as unreachable: hosted, paid Gemini API and a key.

## Gotchas

- When generation lands, a run inside the sandbox fails at its first Gemini call. `run` prints the refusal and the recorded host. That output proves the guard held. It does not prove a scene was generated.
- The command does not check the scene ID against `clients/<id>/scenes.json` today. `--scene nonexistent` prints the same line, so do not report scene validation as verified.
- `output/` is ignored by git. `writes.json` still sees a new `output/` directory once it holds a file, because it diffs `git status --ignored`.
