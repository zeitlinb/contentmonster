# Engineering Standards — Readiness Board

> The complete surface of how we build ContentMonster to a high standard, with live
> status per item. The agent owns driving every line of this and reporting status;
> Brad shouldn't have to surface any of it.
>
> Legend: ✅ done · ⏳ next/queued · 🅿️ deferred (reason) · ⚠️ GAP — owed, not done yet.
>
> _Last updated: 2026-07-11 (tenant×channel re-org: structure guard in CI, `.env.example` added, skills-tree disposition recorded)._

## Build & tooling
- ✅ Turborepo + pnpm 11.5.1 workspace (`apps/*`, `packages/*`). Thin root, per-workspace tsconfig/eslint.
- ✅ `packages/core` ships raw TS via exports map; consumed by web (`transpilePackages`) and cli (tsx).
- ✅ Prettier at root (code-only; prose/`docs/`/`tenants/`/`channels/` excluded). ESLint per-app, flat config + `eslint-config-prettier`.
- ✅ Node `>=20`, pnpm pinned via `packageManager`. Native builds (sharp/esbuild/unrs-resolver) approved in `pnpm-workspace.yaml`.
- ✅ **HyperFrames = layout/video engine** (default, 2026-06-22) — installed via agent skills + `npx hyperframes` CLI; HTML compositions, deterministic Chrome-capture → FFmpeg render. Remotion kept as an available alt/reference (not a dependency).
- ✅ Vendored skill trees (`.agents/skills` + `agent/skills` + `.claude/skills`, tracked by `skills-lock.json`) are **installer-managed** — near-duplicates by design (per-runtime frontmatter differs). Dedupe rides the HyperFrames upgrade path, never hand-pruning. _(Closes the offsite-review dedupe item as won't-do-by-hand, 2026-07-11.)_

## Testing
- ✅ Vitest wired in every workspace (`test` script, `--passWithNoTests`).
- ⚠️ No real tests yet (modules are stubs). Add as `packages/core` modules land.

## CI / automation
- ✅ `.github/workflows/ci.yml` — app job (install --frozen-lockfile, check-types, build, test); green since PR #1 (2026-06-22).
- ✅ `structure` job — `tools/check-structure.sh` guards the tenant×channel layout (engines in `channels/`, companies in `tenants/`, playbook anatomy, no credential JSON outside `credentials/`). Added 2026-07-11.
- 🅿️ DB job (pgTAP) — deferred until a database exists (charter D4).

## Source control & flow
- ✅ Branch-first for code/config (this migration on `migrate/monorepo-turborepo-pnpm`).
- ✅ Bisectable commits, one per phase, Co-Authored-By trailer.
- ✅ Commit routing (mirrors gtmmachines): state + artifact docs → main; code/config → branch + PR.

## Review & quality gates
- ✅ Per-phase verify gates during the migration (install/check-types/build/cli smoke).
- ⏳ **Review twice before ship:** `/gstack-review` + `/gstack-codex`, then `/gstack-ship` (Brad-gated; not yet run on this branch).

## Runtime concerns
- ✅ Secrets gitignored (`.env*` keep `!.env.example`, `secrets/`, `bzdocs/`, `credentials/`).
- ✅ `.env.example` documents GEMINI/GROK + ANTHROPIC (headless-QA, D3) keys; Drive/channel OAuth stay as credential files under `credentials/`. (Keys not consumed yet — stubs.) Added 2026-07-11.
- ⏳ Provider SDK wiring (Gemini, Grok, googleapis) — modules are stubs.

## Context & continuity
- ✅ Docs doctrine: `core-charter/` + `brainstorm/`, `reference/`, `state/`, `tools/`, `runbooks/`.
- ✅ `docs/state/` checkpoints; gstack trial/global (state in `~/.gstack`, backed up to `docs/state/`).
- ✅ Project memory at `~/.claude/projects/-Users-zeitlinb-Projects-contentmonster/memory/`.

## Deploy
- ✅ Vercel wired — project `contentmonster` (team `brad-zeitlins-projects`), GitHub-integration auto-deploys; **Root Directory = `apps/web`** (Turborepo auto-detected, pnpm install at workspace root). PR previews build green.
- ⏳ Deploy runbook + production promotion posture — write when there's a real app to ship (web is a placeholder).
