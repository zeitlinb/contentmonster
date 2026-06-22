---
status: books pipeline (D1) — research + design done; mid /last30days demand sweep
branch: main (all work committed straight to main: state + artifact docs)
timestamp: 2026-06-22
supersedes: docs/state/20260621-132238-handoff-research-next.md
files_modified:
  - docs/book-publishing/ (NEW books category — hub, runbook, design, research/*)
  - CLAUDE.md (canon pointer + status), docs/core-charter/contentmonster-charter.md (D1 in-progress, D3 closed)
  - docs/tools/last30days/reference.md (v3.8.0), .claude/skills/last30days/SKILL.md (py3.12)
  - memory: project-book-pipeline-strategy.md, feedback-dont-shortcut-research-pace.md (NEW), reference-last30days-skill.md, MEMORY.md
---

# Handoff — Books research + design done; demand sweep in progress (2026-06-22)

### Summary
Built the books-publishing pipeline knowledge base this session: a granular KDP runbook, a
captured automated-pipeline design, and 5 research artifacts — all reorganized under a new
**`docs/book-publishing/`** category (books is the active workstream; other content types get
sibling folders). We are **mid-`/last30days` demand sweep**; conclusions are NOT locked.

### Next Move
**Resume the `/last30days` demand sweep, then operator teardowns — do NOT lock or start writing until the sweep is done.**
- `Boot-reads:` `CLAUDE.md` (canon) · **`docs/book-publishing/README.md`** (the books hub — status, decisions, doc map, remaining work; ~1.2k) · this file · memory `project-book-pipeline-strategy.md` + `feedback-dont-shortcut-research-pace.md`.
- `Defer (JIT):` `docs/book-publishing/research/2026-06-22-operator-playbook-and-economics.md` (the deep dive — read when synthesizing the next demand runs) · `docs/book-publishing/kdp-publishing-runbook.md` (when starting book #1) · `docs/book-publishing/pipeline-design-D1.md` (only when building the automated pipeline, post-#1).
- `Do NOT read:` `node_modules`, `pnpm-lock.yaml`; the pre-monorepo `docs/state/20260227-*` (historical); `docs/reference/*` (ad-pipeline, not books).

### Snapshot (deltas not visible from git)
- **`/last30days` upgraded v2.1 → v3.8.0** (Reddit was 403-dead on v2.1; v3 fixes it via keyless RSS + ScrapeCreators). Global skill moved to `~/Documents/Henry/skills/last30days/skills/last30days/`; symlink re-pointed; needs **Python 3.12+**; `SCRAPECREATORS_API_KEY` set in `~/.config/last30days/.env`. **Use default/`--deep` depth, never `--quick`** (culls Reddit to ~1 thread). Verified: 16–18 Reddit threads/run.
- Two background research workflows ran (operator-playbook, pipeline-design) — both captured to `docs/book-publishing/`; raw /tmp outputs are ephemeral.

### Decisions Made (Brad, verbatim where it's a direction/taste call)
- KPI: first picked **"Real revenue product"**, then re-decided **"True hybrid"** (build funnel AND optimize royalties). Economics still PROVISIONAL pending the sweep.
- First title: **"let's do AI Chief of staff."** (GEO is demand-rich but book-shelf-saturated → #2.)
- **"the purpose is to capture the knowledge layer of how-to so we can promote that to automations - this is critical and should be reflected in the plan and the ticket board"** (hand-craft #1 = instrumented knowledge capture).
- **"stop shortcutting our last30days plan... we are a measure twice cut once method here"** + **"are you drawing conclusions yet?"** → run the WHOLE sweep before locking (memory: feedback-dont-shortcut-research-pace).
- Reddit fix: **"wire up the skill properly. you just wasted alot of time silently failing"** → diagnosed + upgraded (done). Provided his own ScrapeCreators key (we use it; no new account).
- Handoff: organize **"so it is the books category since we are doing a lot more in this repo... all kinds of content."**
- _Agent mechanical choices:_ docs reorg into `docs/book-publishing/`; Mode A default; runbook specs.

### Remaining Work (priority order)
1. **Finish the `/last30days` demand sweep** — CARRIED. `/last30days demand for books on AI chief of staff and AI agents for executives` (the key first-title run), then GTM-engineering demand, then funnel/lead-magnet. Brad-invoked only; agent absorbs + stores each in `docs/book-publishing/research/`.
2. **Operator teardowns of people Brad named** — CARRIED (new). Start with **https://x.com/nespola_io** (+ a couple more Brad will name); same treatment as the Tommi Pedruzzi teardown.
3. **Lock strategy → hand-craft book #1 (AI Chief of Staff)** — CARRIED. Blocked on #1–#2. Execute the runbook, Mode A, capturing how-to per phase (tasks #13/#14).
4. **Build `packages/core` book pipeline** — CARRIED, DEFERRED (post-#1; tasks #15 + `pipeline-design-D1.md`).
5. **Predecessor item — design D1** — CLOSED (runbook + design + research authored this session).
6. **Resume ad pipeline (D2/D3)** — CARRIED (after books).

### Notes
- Reddit direct `.json` 403s all HTTP (anti-bot, even residential IP) — that's why v2.1 died. Don't "fix" by UA tricks; v3's keyless+SC path is the answer.
- GEO book shelf has ≥6 titles incl. Ross Hudgens (Siege Media) — GEO needs heavy differentiation if pursued.
- Open question for Brad: the "couple more specific people" beyond nespola_io (he'll name them).

### Currency Check (verified on disk)
- ✓ `docs/book-publishing/` — hub README + runbook + pipeline-design-D1 + research/ (5 artifacts + index) all present (`find docs/book-publishing`).
- ✓ CLAUDE.md books pointer + status; charter D1=in-progress, D3=closed.
- ✓ `docs/tools/last30days/reference.md` = v3.8.0; `/last30days --diagnose` → has_scrapecreators true, Reddit live.
- ✓ Memory: strategy (hybrid, knowledge-capture), feedback-dont-shortcut (NEW), last30days (v3.8.0), MEMORY.md index all updated.

### Memory Written
- `~/.claude/projects/-Users-zeitlinb-Projects-contentmonster/memory/`: `project-book-pipeline-strategy.md` (updated), **`feedback-dont-shortcut-research-pace.md`** (new), `reference-last30days-skill.md` (updated), `MEMORY.md` (index).
