<!-- bz:orders:begin sha=9195a568146a2a3d91a5c4e26b6779f7eb08fc78b5a5155895b6c93c75e4e24e -->
<!-- Generated from zeitlinb/harness ENTERPRISE.md by scripts/orders.mjs. Edit the source and re-render; a hand edit here fails the check. -->

E1. pstack (open-pstack poteto-mode) is the method and governs wherever it speaks.
E2. A session deletes freely inside its own repo and worktrees, its pstack store and temp folders.
E3. Deleting anything outside that space, or anything holding unpushed commits or uncommitted work, needs Brad's yes on the exact ls-verified list.
E5. A GitHub workflow runs automatically only for a check that cannot run locally and is declared with its reason and measured minutes in the repo's bz.config.json automaticChecks.
E6. A ci.yml workflow runs only when a person starts it (workflow_dispatch).
E7. No repo runs a product cron on GitHub.
E8. Credentials are never printed.
E9. No repository is forked unless Brad directs it.
E10. Any repository write outside zeitlinb/ needs Brad's exact-text approval.
E11. A run that must outlast the session or one tool call runs under tmux or the host's own background-process manager, never as a bare desktop-app child process.
E12. Linear is reached through its API with the key from the credentials store, never through a Linear connector.
E13. Vercel is reached with the logged-in `vercel` CLI, never through a Vercel connector.

<!-- bz:orders:end -->

# ContentMonster

## What this is

ContentMonster is an **AI-native content engine** — one house running multiple content
pipelines that share a common core (AI generation, media ops, QA, multi-tenant config).
Sibling content pipelines: **ad-creative** (Meta static + video ads from a brand brief — the
original 8-step engine). _The **book-publishing / Amazon-KDP** pipeline was **KILLED 2026-06-27**
(not viable); direction moved to authority content as lead-gen — see the `docs/book-publishing/` banner._
First/test tenant: Jaca Sugar. May later plug into GTM Machines as a CREATE surface.

## Read these (canon)

- **`docs/core-charter/contentmonster-charter.md`** — distilled source of truth: identity, settled decisions, open decisions (D1–D5). **Start here for *what* we're building.**
- **`docs/book-publishing/`** — ⛔ **KILLED 2026-06-27** (Amazon/KDP not viable). Retained only as **research artifacts** — do not resume KDP work. Direction pivoted to authority content (lead-gen); see the folder's README banner.
- **`docs/core-charter/brainstorm/`** — dated working docs where decisions get argued before promotion to the charter.
- **`docs/engineering-standards.md`** — readiness board for build, tooling and CI, with live status.
- **`docs/reference/`** — engine specs preserved verbatim: `pipeline-spec`, `platform-rules`, `tech-decisions`, `lessons-learned` (read lessons-learned before any generation).
- **`docs/state/`** — session checkpoints; the newest filename is the current resume point.

## Content rules

- **Read the spec before every generation** — from the file, not memory (`docs/reference/lessons-learned.md`). **Dimension-check output FIRST.**
- **Vision QA after every step**, before any human sees output.
- **Sharp = pixel ops; HyperFrames = ALL layout; never rely on AI-rendered text.** HyperFrames-first shop (2026-06-22); Remotion kept as alt/reference.
- **Video standard = the HyperFrames 7-step pipeline** (`docs/reference/hyperframes-pipeline.md`); start at the `/hyperframes` skill, which routes to the right workflow.
- **`/last30days <topic>` is Brad-invoked only** (recency research; the agent never auto-fires it).

## Current status (2026-06-22)

- **Monorepo:** Turborepo + pnpm; `apps/web` + `apps/cli` + `packages/core`. Vercel Root Directory = `apps/web`.
- **HyperFrames-first (2026-06-22):** default layout/video engine; the HyperFrames skills come from the global install (`~/.claude/skills`), none are vendored here; `hyperframes-lab/` smoke test renders green (Node 22 + FFmpeg 8).
- **DB deferred** (file-based JSON + Zod; `packages/db` slot open). No app logic yet — `packages/core` modules are typed stubs.
- **Authority content** (lead-gen) replaced the books pipeline; its scope is tracked in memory (`[[project-authority-content-strategy]]`), kept out of canon.
- **`/last30days`** is the global install; it needs Python 3.12+ and a ScrapeCreators key. See `docs/tools/last30days/reference.md`.
- **Then:** resume the ad pipeline (Drive sync → generate-scene; needs HyperFrames + provider SDKs — D3).

Known pre-existing failure: `pnpm format:check` fails on main (four unformatted files), so it is left out of CI until fixed; tracked as HEN-1601.
