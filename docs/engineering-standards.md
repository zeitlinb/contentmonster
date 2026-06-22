# Engineering Standards — Readiness Board

> The complete surface of how we build ContentMonster to a high standard, with live
> status per item. The agent owns driving every line of this and reporting status;
> Brad shouldn't have to surface any of it.
>
> Legend: ✅ done · ⏳ next/queued · 🅿️ deferred (reason) · ⚠️ GAP — owed, not done yet.
>
> _Last updated: 2026-06-21._

## Build & tooling
- ✅ Turborepo + pnpm 11.5.1 workspace (`apps/*`, `packages/*`). Thin root, per-workspace tsconfig/eslint.
- ✅ `packages/core` ships raw TS via exports map; consumed by web (`transpilePackages`) and cli (tsx).
- ✅ Prettier at root (code-only; prose/`docs/`/`clients/` excluded). ESLint per-app, flat config + `eslint-config-prettier`.
- ✅ Node `>=20`, pnpm pinned via `packageManager`. Native builds (sharp/esbuild/unrs-resolver) approved in `pnpm-workspace.yaml`.
- ⚠️ **Remotion** not yet a dependency — required for ad pipeline layout/video (charter D2).

## Testing
- ✅ Vitest wired in every workspace (`test` script, `--passWithNoTests`).
- ⚠️ No real tests yet (modules are stubs). Add as `packages/core` modules land.

## CI / automation
- ⏳ `.github/workflows/ci.yml` — app job (install --frozen-lockfile, check-types, build, test). Added in this migration.
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
- ⚠️ No `.env.example` yet — add one documenting GEMINI/GROK keys + (future) GOOGLE Drive creds + (future) ANTHROPIC headless-QA key.
- ⏳ Provider SDK wiring (Gemini, Grok, googleapis) — modules are stubs.

## Context & continuity
- ✅ Docs doctrine: `core-charter/` + `brainstorm/`, `reference/`, `state/`, `tools/`, `runbooks/`.
- ✅ `docs/state/` checkpoints; gstack trial/global (state in `~/.gstack`, backed up to `docs/state/`).
- ✅ Project memory at `~/.claude/projects/-Users-zeitlinb-Projects-contentmonster/memory/`.

## Deploy
- ✅ Vercel wired — project `contentmonster` (team `brad-zeitlins-projects`), GitHub-integration auto-deploys; **Root Directory = `apps/web`** (Turborepo auto-detected, pnpm install at workspace root). PR previews build green.
- ⏳ Deploy runbook + production promotion posture — write when there's a real app to ship (web is a placeholder).
