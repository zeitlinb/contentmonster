# Pipeline steps

`steps` prints the eight steps of the ad-creative pipeline in order, numbered from 0, so an operator can see where a run stands. It reads nothing and writes nothing.

## Sub-features

- `steps-list` prints exactly eight lines, `0. prerequisites` through `7. video`.
- `steps-order` keeps the order prerequisites, scene-generation, product-composite, text-logo-overlay, size-variant, refinement-loop, end-to-end, video.
- `steps-no-side-effect` writes no file and opens no connection.

## How to get to it (user POV)

- Run `pnpm --filter cli cli steps` from the checkout root, as the README shows.

## Driving it with control-contentmonster

Preconditions:

- `node .claude/skills/verify-contentmonster/control-contentmonster.mjs doctor` exits 0.

- **List the steps.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out pipeline-steps/cli -- steps`. Exit code `0`. `stdout.txt` is exactly these eight lines: `0. prerequisites`, `1. scene-generation`, `2. product-composite`, `3. text-logo-overlay`, `4. size-variant`, `5. refinement-loop`, `6. end-to-end`, `7. video`.
- **Check the transcript.** Read `transcript.txt` in the same evidence directory. It shows `$ pnpm --filter cli cli steps`, the same eight lines and `[exit 0]`, as the operator's terminal would.
- **Check the second view.** Read `writes.json` and `denials.json`. `statusAdded` and `statusRemoved` are empty, the two source fingerprints match, and `denials.json` is `[]`. `run` prints `sandbox refusals: none seen in the log; ...`, `recorded outbound attempts: none` and `writes: none`.
- **Repeat.** Run `node .claude/skills/verify-contentmonster/control-contentmonster.mjs run --out pipeline-steps/repeat -- steps`. `stdout.txt` matches the first run byte for byte.

## Gotchas

- `steps` takes no arguments. `steps extra` exits 1 with `error: too many arguments for 'steps'. Expected 0 arguments but got 1.` in stderr.
- The step names are the pipeline spec's IDs, not display names. A rename in `packages/core` changes this output, so drive this feature for any change there.
