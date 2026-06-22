---
status: HyperFrames-first MERGED to main (PR #2); books /last30days sweep COMPLETE (3/3); books strategy lock awaits Brad's ratification
branch: main (157cc7b) — origin synced; feat/hyperframes-first merged + deleted
timestamp: 2026-06-22 13:16
supersedes: docs/state/20260622-books-research-handoff.md (banner added there; sweep now done)
files_modified:
  - MERGED via PR #2 (squash 157cc7b): HyperFrames toolchain (.agents/skills, .claude/skills, agent/, skills-lock.json), hyperframes-lab/* (smoke test + output.mp4), docs/reference/hyperframes-pipeline.md (NEW), doctrine flip (CLAUDE.md, charter, engineering-standards, lessons-learned, tech-decisions, pipeline-spec, clients/jaca/brand-spec+products.json, packages/core ai.ts+media.ts)
  - Straight to main: docs/book-publishing/research/2026-06-22-{operator-teardown-nespola, last30days-ai-cos-demand, last30days-gtm-engineering-demand, last30days-book-funnel-high-ticket}.md + research/README + book-publishing/README
  - memory: project-book-pipeline-strategy (updated), feedback-cto-decisive-execution (NEW), MEMORY.md
---

# Handoff — HyperFrames-first shipped + books demand sweep complete (2026-06-22)

### Summary
Two workstreams advanced. (1) **Books:** the `/last30days` demand sweep finished 3/3 and the nespola_io operator teardown is done — verdict locked-pending-ratification. (2) **HyperFrames:** ContentMonster became a **HyperFrames-first shop** — installed the toolchain, proved the render pipeline (smoke test), flipped Remotion→HyperFrames across the canon, adopted the 7-step pipeline as our video standard, and **merged it all to main (PR #2, squash 157cc7b)** after a clean double review.

### Next Move
**Ask Brad to ratify the books strategy lock; on "lock it" → update charter D1 economics + start the instrumented hand-craft of book #1 (AI Chief of Staff).** Recommended lock: funnel-first KPI · AI Chief of Staff #1 · GEO #2 · GTM #3-or-defer · Mode A real-name moat. If Brad instead directs video work, HyperFrames is ready — start at the `/hyperframes` skill.
- `Boot-reads:` `CLAUDE.md` (canon + current status, auto-loaded) · this file · **`docs/book-publishing/README.md`** (books hub: verdict + remaining, ~1.5k) · memory `project-book-pipeline-strategy` + `feedback-cto-decisive-execution` + `feedback-dont-shortcut-research-pace`.
- `Defer (JIT):` the 4 `docs/book-publishing/research/2026-06-22-*` demand/teardown digests (when locking strategy) · `kdp-publishing-runbook.md` (when starting book #1) · **`docs/reference/hyperframes-pipeline.md`** + `hyperframes-lab/CLAUDE.md` (when doing ANY video work) · `pipeline-design-D1.md` (post-#1 automation).
- `Do NOT read:` `.agents/skills/**` + `.claude/skills/**` (vendored HyperFrames skills — huge; invoke the `/hyperframes*` slash commands instead) · `node_modules`, `pnpm-lock.yaml`, `hyperframes-lab/output.mp4` (binary) · `docs/reference/pipeline-spec.md` (legacy ad spec, superseded) · `docs/state/2026-0227*` + `20260621-*` + the superseded `20260622-books-research-handoff.md`.

### Snapshot (deltas not visible from git)
- **HyperFrames `/hyperframes*` slash commands activate on the NEXT session reload** — they were installed this session so are not yet live in-session. Next session they're available (entry point: `/hyperframes`, which routes to workflow skills).
- Smoke test `hyperframes-lab/` renders green on Node 22.22.3 + FFmpeg 8.0.1; `npm run dev` is a long-running server (run in background).
- `/last30days` raw outputs saved in `~/Documents/Last30Days/` (durable record is the `research/` digests, not these).
- gstack **upgrade available 1.58.0.0 → 1.58.4.0** (optional; run `/gstack-upgrade`).
- Reddit live on `/last30days` v3.8.0; ScrapeCreators key set; `/last30days` is Brad-invoked only.

### Decisions Made (Brad, verbatim where it's a direction/taste call)
- Sweep cadence: **"I'll fire it now, in parallel"** (Brad fired all 3 `/last30days` runs himself).
- Operators: **"Just nespola_io for now."**
- HyperFrames location/scope: **"Inside contentmonster"** + **"Full end-to-end smoke test."**
- **"commit everything. and, update any instance of remotion to hyperframes as the default. keep the remotion tools and reference but we are now a Hyperframes first shop."**
- **"read this and let's copy the pipeline as our standard"** (the HyperFrames 7-step pipeline).
- GSAP/CDN review flag: **"gsap, cdn and hyperframes are clearly documented the way they should work - this is a silly question - figure it out and do it as my CTO would do it"** → rejected as a false positive.
- Commit hygiene + landing: **"follow best practices and do it like my CTO would do it"** then **"merge"**.
- _Agent mechanical choices:_ scoped reviews to our diff (not vendored skills); de-conflated main by pushing before merge; squash-merge.

### Remaining Work (priority order)
1. **Lock books strategy → charter D1 + book #1** — CARRIED (#18/#13/#14). GATE: Brad's ratification. Then update charter D1 economics + start instrumented hand-craft of book #1, capturing how-to per runbook phase.
2. **Build `packages/core` book pipeline** — CARRIED, DEFERRED (#15; post-#1; `pipeline-design-D1.md`).
3. **Additional operator teardowns** — CARRIED; Brad names targets (none named beyond nespola_io, which is DONE).
4. **Resume ad-creative pipeline (Drive sync → generate-scene)** — CARRIED; now built on **HyperFrames** (charter D2 closed) + provider SDKs (D3).
5. _From predecessor handoff:_ finish sweep → **CLOSED** (3/3); nespola_io teardown → **CLOSED**; lock strategy → **CARRIED** (item 1).

### Notes
- The unpushed-main trap bit us: research/docs committed straight to local main were never pushed, so they bundled into PR #2 until we pushed main first. Logged as a gstack learning. Push main before cutting a feature branch.
- Vendored HyperFrames skills (~8.8MB, ~303k lines) are committed deliberately (Brad's call) — large but intentional; do not "clean up."
- Open question for Brad: the books strategy lock (the one decision parked when he pivoted to HyperFrames mid-session).

### Currency Check (verified on disk, 2026-06-22 13:16)
- ✓ main = origin/main = 157cc7b ("feat(video): HyperFrames-first … (#2)"); feat/hyperframes-first deleted.
- ✓ on main: `docs/reference/hyperframes-pipeline.md`, `hyperframes-lab/index.html`+`output.mp4`, `.agents/skills/hyperframes/SKILL.md`, the 4 research digests + teardown.
- ✓ charter has "HyperFrames-first shop" decision; CLAUDE.md has "HyperFrames = ALL layout".
- ✓ memory `project-book-pipeline-strategy` records sweep-complete; `feedback-cto-decisive-execution` created; MEMORY.md indexed.
- ✓ raw last30days files present in `~/Documents/Last30Days/`.

### Memory Written
- `~/.claude/projects/-Users-zeitlinb-Projects-contentmonster/memory/`: `feedback-cto-decisive-execution.md` (NEW), `project-book-pipeline-strategy.md` (updated: sweep complete + verdict), `MEMORY.md` (index + HyperFrames-first pointer). HyperFrames-first canon lives in the charter + `docs/reference/hyperframes-pipeline.md` (not duplicated in memory).
