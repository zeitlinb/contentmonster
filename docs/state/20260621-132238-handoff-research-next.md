---
status: migration MERGED to main (PR #1); next session = research
branch: main (PR #1 merged 2026-06-22, branch deleted)
timestamp: 2026-06-21 13:22
supersedes: docs/state/20260621-112135-monorepo-migration.md
files_modified:
  - docs/engineering-standards.md (Deploy line: Vercel wired)
  - docs/state/ (this handoff)
  - memory: reference-vercel-deploy.md (+ MEMORY.md)
---

# Handoff — Migration done; research is next (2026-06-21 13:22)

### Summary
The Turborepo + pnpm monorepo migration is **merged to main** (PR #1, 2026-06-22; CI + Vercel
green; branch deleted). Next session's first work is **research**: run `/last30days` to scout
book niches/demand, then design the book-publishing pipeline.

### Next Move
**Run book-niche research via `/last30days <topic>` (Brad types it), then design the book-publishing pipeline (charter D1).**
- `Boot-reads:` `CLAUDE.md` (canon, ~1k) · `docs/core-charter/contentmonster-charter.md` (what we're building; D1 is the target, ~1.5k) · **this file** · `docs/tools/last30days/reference.md` (how to run the skill, ~0.5k).
- `Defer (JIT):` `docs/reference/pipeline-spec.md` + `platform-rules.md` (only when building the AD pipeline, not books) · `docs/runbooks/google-drive-setup.md` (when resuming Drive sync) · `packages/core/src/*` (when implementing modules).
- `Do NOT read:` `node_modules`, `pnpm-lock.yaml`, `.next/`; the pre-monorepo `docs/state/20260227-state-handoff.md` (historical, superseded — Windows paths are from another machine).

### Snapshot (deltas not visible from git status)
- **PR #1 MERGED to main** (2026-06-22, merge commit `5fda23a`; branch deleted). 8 bisectable commits preserved on main. You are on `main`.
- Repo shape: `apps/web` (Next 16.2.7) · `apps/cli` (commander/tsx) · `packages/core` (`@contentmonster/core`, typed stubs) · `docs/` doctrine · `clients/jaca` + `platform/` unchanged.
- **Vercel fixed:** project Root Directory → `apps/web` (was null). Persisted; future builds incl. main-on-merge are correct. Details in `reference-vercel-deploy` memory.
- **`/last30days` becomes a slash command only after a fresh session restart** (project skills enumerate at startup). It works via the global symlink today; creds self-load from `~/.config/last30days/.env` (OPENAI + XAI verified true).
- gstack: trial/global, NOT initialized for this project (no `~/.gstack/projects/*contentmonster*`); state convention here is `docs/state/` direct (this file).

### Decisions Made (Brad, verbatim where it's a direction/taste call)
- New realm: "writing books that you can sell on amazon." Relationship: **"Sibling pipeline, one house"** (books + ad-creative share `packages/core`).
- "**Full clean migration now.**" · "**Defer DB, keep slot open.**" · Model exactly on gtmmachines ("it is the model... we need to be set up right in here").
- `/last30days`: "**yes wire it in properly**" → vendored as a thin re-home (`SKILL.md` only; engine stays global).
- Process: "do a self review on your plan... create granular tickets... then proceed" (done; self-review caught the skill-symlink premise, branch-first, per-phase gates).
- Ship scope: "**Push branch + open PR**" (not full gstack ship) · settings.json "**Write it now**" · "you fix the vercel situation."
- _Agent mechanical choices (not Brad's):_ scope `@contentmonster/*`, pnpm, isolated version-bump commit, docs taxonomy mapping, app-only CI.

### Remaining Work (priority order)
1. **Research → book pipeline design (charter D1)** — CARRIED. Next-session first move; `/last30days` then design manuscript→layout→cover→KDP + prose-QA rubric.
2. **Merge PR #1** — CLOSED (merged to main 2026-06-22, branch deleted). The formal `/gstack-review` + `/gstack-codex` + `/gstack-ship` were DROPPED for this migration (Brad chose push → PR → merge).
3. **Resume ad pipeline** — CARRIED. Drive-sync CLI → `generate-scene`; needs Remotion + provider SDKs (charter D2/D3). After books.
4. Pre-monorepo next-steps (Drive setup, generate-scene) — CLOSED as standalone items; folded into `docs/runbooks/google-drive-setup.md` + charter.
5. T5/T6 + push decision from the 11:21 checkpoint — CLOSED (done, pushed, PR green).

### Notes
- Vercel preview URLs 401 = deployment protection (auth gate), not a build error — judge by deployment `state: READY`.
- A docs commit to this branch re-runs CI (pull_request isn't paths-ignored) — harmless.
- Can't commit state to `main` — the new `docs/state/` layout exists only on the branch until merge; this handoff lives on the branch.

### Currency Check (verified on disk now)
- ✓ Vercel `rootDirectory` == `apps/web` — confirmed via API GET.
- ✓ PR #1 checks: Build & unit tests `pass`, Vercel `pass` — `gh pr checks 1`.
- ✓ Branch pushed, head `32d2a02`, tree clean — `git`.
- ✓ Memory files present: `project-contentmonster-direction.md`, `reference-last30days-skill.md`, `reference-vercel-deploy.md`, `MEMORY.md`.
- ✓ Skill `--diagnose` → openai/xai/youtube true.

### Memory Written
- `~/.claude/projects/-Users-zeitlinb-Projects-contentmonster/memory/`: `project-contentmonster-direction.md`, `reference-last30days-skill.md`, **`reference-vercel-deploy.md`** (new), `MEMORY.md` (index).
- Project docs: `docs/engineering-standards.md` Deploy line updated (Vercel wired).
