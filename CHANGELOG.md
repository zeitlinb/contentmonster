# Changelog

All notable changes to ContentMonster. Format: `## [MAJOR.MINOR.PATCH.MICRO] - YYYY-MM-DD`
with Added / Changed / Fixed / Removed sections. `VERSION` is owned by `/gstack-ship`.

## [0.1.0.0] - 2026-06-21

### Added
- Turborepo + pnpm monorepo foundation (`apps/web`, `apps/cli`, `packages/core`).
- `@contentmonster/core` shared engine (ai/media/config/platform/qa/types — typed stubs).
- Docs doctrine: charter, engineering standards, reference specs, runbooks, state, tool cards.
- gstack trial integration (`VERSION`, `CHANGELOG`, `docs/tools/gstack/`), `.claude` settings, and the `/last30days` skill (thin re-home).
- App-only CI workflow.

### Changed
- Switched package manager from npm to pnpm 11.5.1.
- Moved the Next.js app into `apps/web`; re-homed docs into the seven-folder layout.
- Aligned next/react to empire versions (16.2.7 / 19.2.4).
