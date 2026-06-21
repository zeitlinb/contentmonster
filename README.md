# ContentMonster

AI-native **content engine** — one house running multiple content pipelines that
share a common core (AI generation, media ops, QA, multi-tenant config).

- **Ad-creative pipeline** — Meta (Instagram/Facebook) ad creative, static + video, from a brand brief.
- **Book-publishing pipeline** — books for Amazon (KDP). _(newest realm; design in progress)_

## Layout (Turborepo + pnpm)

```
apps/web        Next.js dashboard
apps/cli        commander CLI (pipeline commands, run via tsx)
packages/core   @contentmonster/core — shared engine: ai · media · config · platform · qa · types
clients/<id>    per-tenant config (Jaca Sugar is the test client)
platform/       universal Meta/platform specs
docs/           charter, engineering standards, references, runbooks, state
```

## Commands

```bash
pnpm install           # install the workspace
pnpm dev               # run the web app (next dev)
pnpm build             # turbo build
pnpm check-types       # tsc --noEmit across workspaces
pnpm test              # vitest

pnpm --filter cli cli --help          # the ContentMonster CLI
pnpm --filter cli cli steps           # list the ad-pipeline steps
```

## Start here

- **What this is + decisions:** [`docs/core-charter/contentmonster-charter.md`](docs/core-charter/contentmonster-charter.md)
- **How we build:** [`docs/tools/gstack/use-gstack.md`](docs/tools/gstack/use-gstack.md) · [`docs/engineering-standards.md`](docs/engineering-standards.md)
- **Agent project memory:** `CLAUDE.md`

Requires Node `>=20` and pnpm (`packageManager` pins the version). Secrets live in
`.env*` / `credentials/` (gitignored) — never committed.
