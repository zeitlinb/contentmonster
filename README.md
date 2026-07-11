# ContentMonster

AI-native **content engine** — one house producing content and operating
distribution channels for every company in the empire, on two axes:
**channels** (reusable engines: the HOW of each platform) × **tenants**
(per-company state: the WHO). Shared core: AI generation, media ops
(HyperFrames-first), QA, multi-tenant config.

- **Channel ops** — stand up + operate social presences per company: `channels/youtube/` (agent-API control live), `channels/linkedin/` (posting human-in-the-loop; API gated).
- **Ad-creative pipeline** — Meta (Instagram/Facebook) ad creative, static + video, from a brand brief. _(deferred; engine stubbed, resumes with Drive-sync)_
- ~~Book-publishing (Amazon/KDP)~~ — **killed 2026-06-27**; superseded by the authority-content direction.

## Layout (Turborepo + pnpm)

```
channels/<ch>   reusable distribution ENGINES — playbook, templates, scripts
                (youtube · linkedin · meta-ads[dormant seed])
tenants/<id>    per-company state — channel bindings + content items
                (constellation · hubexperience · jaca[archived])
apps/web        Next.js dashboard
apps/cli        commander CLI (pipeline commands, run via tsx)
packages/core   @contentmonster/core — shared engine: ai · media · config · platform · qa · types
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
