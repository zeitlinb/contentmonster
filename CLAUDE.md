# ContentMonster

> Project memory for any Claude Code (or other agent) session in this repo. Read this first, every session.

## What this is

ContentMonster is an **AI-native content engine** — one house running multiple content
pipelines that share a common core (AI generation, media ops, QA, multi-tenant config).
Two sibling pipelines: **ad-creative** (Meta static + video ads from a brand brief — the
original 8-step engine) and **book-publishing** (books for Amazon/KDP — the newest realm).
First/test tenant: Jaca Sugar. May later plug into GTM Machines as a CREATE surface.

## Read these (canon)

- **`docs/core-charter/contentmonster-charter.md`** — distilled source of truth: identity, settled decisions, open decisions (D1–D5). **Start here for *what* we're building.**
- **`docs/book-publishing/`** — the **books category** (the active workstream). Read its `README.md` first: it hubs the KDP runbook, the automated-pipeline design, and all book research. Content pipelines are organized by category folder (books here; ad-creative/other content get sibling folders).
- **`docs/core-charter/brainstorm/`** — dated working docs where decisions get argued before promotion to the charter.
- **`docs/engineering-standards.md`** — readiness board (build/test/CI/gates/flow), live status + the gaps the agent still owes.
- **`docs/tools/gstack/use-gstack.md`** — *how we build here* (the methodology). **Read before writing code.**
- **`docs/reference/`** — engine specs preserved verbatim: `pipeline-spec`, `platform-rules`, `tech-decisions`, `lessons-learned` (read lessons-learned before any generation).
- **`docs/state/`** — session checkpoints; the newest filename is the current resume point.
- Persistent memory: `~/.claude/projects/-Users-zeitlinb-Projects-contentmonster/memory/` (`MEMORY.md` index).

## Division of labor (how Brad works with the agent)

Brad operates at the **decision layer**; the agent drives the machinery. Brad speaks
plain-English intent; the agent chooses which `/gstack-*` skill fires and runs the
think→plan→build→review→test→ship loop under the hood.

- **Brad provides:** direction/intent, taste at genuine forks (2–3 options, not mechanics), domain knowledge only he has, go/no-go on anything outward-facing or irreversible.
- **Agent handles silently:** skill selection/sequencing, commands/flags, engineering choices.
- **Agent stops and asks on:** direction/taste calls, anything that sends/publishes/spends/deploys or is irreversible, or when Brad's domain knowledge is genuinely needed.

## Lanes — never blur these

| Concern | Owner |
|---|---|
| How we build the software (plan, review, test, ship, build-session state) | **gstack** (`/gstack-*`) |
| What we're building + pipeline/brand/tenant knowledge + decisions | **the charter & doctrine** (`docs/core-charter/`) + memory |
| The content engine's own logic (scene gen, compositing, QA, book pipeline) | **our code** (`packages/core`, `apps/cli`, `apps/web`) |

Build-state → gstack; what-we-build → the charter/memory. Never create a competing knowledge store inside gstack.

## Operating rules

- **gstack is HOW we build, not WHAT we build.** Follow `use-gstack.md`. Think → Plan → Build → Review → Test → Ship → Reflect; never implement from a vague idea.
- **Review twice before shipping:** `/gstack-review` + `/gstack-codex`, then `/gstack-ship`.
- **Commit routing:** state checkpoints + artifact/decision-record docs go **straight to main** (no PR); **CODE/config and any doc needing an un-made judgment go branch + PR** for Brad's review.
- **Read the spec before every generation** — from the file, not memory (`docs/reference/lessons-learned.md`). **Dimension-check output FIRST.**
- **Vision QA after every step**, before any human sees output.
- **Sharp = pixel ops; Remotion = ALL layout; never rely on AI-rendered text.**
- **`/last30days <topic>` is Brad-invoked only** (recency research; the agent never auto-fires it).
- **User Sovereignty:** AI recommends, Brad decides; present + ask before anything irreversible.
- **One browser daemon:** gstack browser for build-time QA; `claude-in-chrome` MCP for operating-time. Never both.

## Brad preferences

- Substance over decoration; serious revenue-infrastructure aesthetic. **No** generic AI-blue/purple/robot clichés.
- Durable docs, decision logs, verification artifacts. Measure twice, cut once.
- Verified server/API/browser claims — not "it should work."
- Private repos; secrets gitignored; confirm before anything public or a new external destination.

## Current status (2026-06-22)

- **Monorepo migration MERGED to main** (PR #1, 2026-06-22; Turborepo + pnpm; `apps/web` + `apps/cli` + `packages/core`). CI + Vercel green; Vercel Root Directory = `apps/web`. Newest `docs/state/` file is the resume point.
- **gstack:** global + namespaced (`/gstack-*`), trial mode (not team-pinned). `VERSION` 0.1.0.0 (== `package.json`).
- **DB deferred** (file-based JSON + Zod; `packages/db` slot open). No app logic yet — `packages/core` modules are typed stubs.
- **Books pipeline (D1) = the active workstream** — research + design phase (see `docs/book-publishing/`). Niche SET (Brad's domains); first title = AI Chief of Staff; KPI = hybrid (provisional); hand-craft #1 then automate; Mode A. Mid-`/last30days` demand sweep. The newest `docs/state/` file is the resume point.
- **`/last30days` upgraded v2.1 → v3.8.0** this session (Reddit was dead; now fixed). Global skill at `~/Documents/Henry/skills/last30days/skills/last30days/`; needs Python 3.12+; ScrapeCreators key set. See `docs/tools/last30days/reference.md`.
- **Then:** resume the ad pipeline (Drive sync → generate-scene; needs Remotion + provider SDKs — D2/D3).
