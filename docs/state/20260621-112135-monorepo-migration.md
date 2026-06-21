---
status: in-progress (on branch migrate/monorepo-turborepo-pnpm, not yet pushed)
branch: migrate/monorepo-turborepo-pnpm
timestamp: 2026-06-21 11:21
files_modified:
  - root: package.json, pnpm-workspace.yaml, turbo.json, .prettier*, VERSION, .gitignore
  - apps/web, apps/cli, packages/core (new workspaces)
  - docs/ re-homed into the seven-folder doctrine
---

# Session State — Monorepo Migration (2026-06-21)

> Top-of-stack. ContentMonster is being rebuilt on the gtmmachines model.
> Read [the charter](../core-charter/contentmonster-charter.md) for *what* this is.

## Resume
On branch `migrate/monorepo-turborepo-pnpm`. The structural migration is built and
locally verified; **nothing pushed yet** (awaiting Brad's go on push + PR + the formal
gstack review/ship). Pick up at: T5/T6 wrap (gstack files + CI) → then push decision.

## Next Move
1. Brad decides: push branch + open PR, and whether to run `/gstack-review` + `/gstack-codex` + `/gstack-ship`.
2. First product work (Brad's chosen realm): **book-publishing pipeline** for Amazon — design `apps/cli` book commands + `packages/core` book modules.
3. Then resume the original ad-pipeline next-steps (see the runbook): Google Drive sync CLI → `generate-scene`.

## Snapshot (what changed)
- npm → **pnpm 11.5.1** workspace + **Turborepo**. Thin root; per-workspace tsconfig/eslint.
- Workspaces: `apps/web` (Next 16.2.7 dashboard), `apps/cli` (commander via tsx), `packages/core` (`@contentmonster/core` shared engine — ai/media/config/platform/qa/types as thin typed stubs).
- Docs re-homed into `core-charter/`, `reference/`, `state/`, `tools/`, `runbooks/`, `engineering-standards.md`.
- `/last30days` skill wired into `.claude/skills/` (thin re-home; engine stays global).
- Verified: pnpm install (sharp built), check-types 3/3, next build, cli --help/steps.

## Decisions Made (Brad, verbatim where possible)
- "one content house, multiple pipelines" — ads + books are siblings sharing core infra.
- "Full clean migration now." DB deferred ("keep slot open").
- Model exactly on gtmmachines (Turborepo + gstack + docs doctrine).

## Remaining Work
- Push + PR (so CI runs); formal gstack review-twice + ship (Brad-gated).
- Books pipeline design (the new realm).
- Resume ad pipeline: Drive sync → generate-scene (needs Remotion + provider SDKs — see Open Decisions in the charter).

## Currency Check
- gstack installed global + namespaced; `/last30days` global skill is a live symlink (creds at `~/.config/last30days/.env`).
- The pre-monorepo handoff (`20260227-state-handoff.md`) is preserved verbatim; its Windows paths are historical (we are on macOS now).

## Memory Written
- `project-contentmonster-direction.md`, `reference-last30days-skill.md` (+ MEMORY.md index) in this project's Claude memory.
