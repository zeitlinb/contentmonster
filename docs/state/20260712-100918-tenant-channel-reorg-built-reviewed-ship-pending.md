---
status: handoff
branch: main (this file) — WORK LIVES ON `claude/state-file-review-85ec76` in worktree `.claude/worktrees/state-file-review-85ec76` (3 commits, NOT pushed)
timestamp: 2026-07-12T10:09:18-0400
head_commit: main = 1e3e3d8 · branch = 393c3ce (be46c0a, 373a8b3 beneath; worktree clean)
session_theme: Ratified + executed the tenant×channel matrix re-org (Phase 1); double-reviewed (Claude army + Codex cross-model); 3 small Codex fixes + ship (PR) remain.
files_modified: ON BRANCH — channels/** + tenants/** (moved from youtube/ linkedin/ clients/ platform/), tools/check-structure.sh, .github/workflows/structure.yml, .env.example, .gitignore, .prettierignore, README.md, CLAUDE.md, charter (+brainstorm/20260711 RATIFIED), engineering-standards, tech-decisions, packages/core docstrings, apps/cli. MEMORY: direction, youtube-ops, linkedin-ops, MEMORY.md (all path-updated). GSTACK: 2 learnings logged.
---

### Summary
Brad greenlit the **tenant × channel matrix** ("greenlight") and Phase 1 was executed the same session: engines → `channels/{youtube,linkedin,meta-ads}`, per-company state → `tenants/{constellation,hubexperience,jaca}` (bindings at `tenants/<id>/channels/<ch>/`, HEC post-1 at `tenants/hubexperience/content/post-1/`), offsite hygiene folded in (CI structure guard, `.env.example`, skills-dedupe dispositioned), canon + memory updated. Review-twice ran: 3 specialist subagents + Claude adversarial + Codex adversarial + Codex structured; ~25 real findings fixed across 2 commits (incl. a Codex P1 that reverted a wrong Claude-side gitignore fix). Typecheck/tests/structure-guard all green. **Not yet shipped.**

### Next Move
**In the worktree, apply the 3 remaining Codex-adversarial fixes, re-run `bash tools/check-structure.sh` + `pnpm check-types && pnpm test`, then `/gstack-ship` → PR to main for Brad's review.** The 3 fixes (all mechanical): (1) add `BEGIN OPENSSH PRIVATE KEY` + `BEGIN EC PRIVATE` markers to the credential grep in `tools/check-structure.sh`; (2) harden the guard — each `tenants/*/channels/<ch>/` binding must name an engine that exists in `channels/`, and reject empty binding dirs / `ls`-glob matching directories named `*.md` (use `[ -f ]`); (3) `channels/youtube/README.md` onboarding step 1 needs `mkdir -p tenants/<new-id>/channels` before the `cp -r`. PR body: note the 2 pre-existing Codex findings (below) as Phase-2 work. At ship, persist the gstack review-log entries (adversarial-review + review, per skill Step 5.8).
- **Boot-reads:** this file · `docs/core-charter/brainstorm/20260711-tenant-channel-matrix-scaffold.md` §§4–5 (roadmap Phases 2–5 + open forks, ~1k tok) · `channels/README.md` + `tenants/README.md` (~600 tok, the new layout law).
- **Defer (JIT):** `~/.claude/skills/gstack-ship/SKILL.md` (at ship) · tenant binding docs (only if resuming go-live threads) · `channels/<ch>/playbook/*` (only when operating a channel).
- **Do NOT read:** older `docs/state/*` (this file supersedes; G2 below restates all opens) · `docs/book-publishing/**` (KILLED) · vendored `agent/skills`+`.agents/skills` · `assets/variants/`+`fonts/`.

### Snapshot
- Worktree `.claude/worktrees/state-file-review-85ec76` = branch `claude/state-file-review-85ec76`, clean, 3 commits ahead of main, unpushed. Main checkout untouched on `main`.
- New CI: `.github/workflows/structure.yml` (own workflow ON PURPOSE — ci.yml paths-ignores `**.md` on main pushes, the guard polices markdown). Guard failure modes empirically tested.
- Codex CLI: PATH resolves stale homebrew 0.138; use `/Users/zeitlinb/.hermes/node/bin/codex` (0.144.1) — in gstack learnings.
- gstack upgrade available 1.58.0.0 → 1.60.1.0 (deliberately not taken mid-review).

### Decisions Made (Brad verbatim; agent-mechanical marked)
- **"greenlight"** → ratified the channels/×tenants/ shape AND Phase-1 execution as a gstack build→review→ship cycle. Promoted to charter (2026-07-11 settled-decision row).
- Goal set (Brad): ContentMonster *"needs to evolve to handle all the content, posting, authority asset creation, setup etc.. for all the tenants… so it is super low friction"* → the ratified plan/brainstorm doc IS the response to this.
- Adversarial-review doctrine (Brad, unresolved): wants *"adversarial skeptic reviews"*; agent recommended adding a Workflow-based verification stage (refute-my-dispositions + verify-fixes, loop-until-dry) on top of gstack+Codex, possibly as CLAUDE.md doctrine — **Brad has not decided** (item 9).
- _Agent-made (mechanical):_ skipped gstack's separate red-team pass (4 independent passes deemed sufficient — Brad probed this; see item 9); moved structure job to its own workflow; restored `tenants/*/assets/` gitignore per Codex P1 (documented convention in tenants/README + .gitignore comments); scoped-skip of performance/design specialists (renames only); codex CLI upgrade; deferred gstack upgrade.

### Remaining Work (priority; disposition per item)
1. **Ship the re-org branch** (3 Codex fixes → verify → `/gstack-ship` PR; Brad merges) — **CARRIED**; the in-flight thread; Brad's last standing question "Proceed?" was interrupted — confirm or just proceed per greenlight.
2. **HubExperience LinkedIn go-live** (approve copy+post · Brad as 2nd Super admin · [CONFIRM] settings · upload+publish) — **CARRIED**; outward-facing = Brad/Tully; paths now `tenants/hubexperience/channels/linkedin/`.
3. **Constellation YouTube video #1** (+ "Where are you invisible?" scan lead-magnet — still unowned — + ElevenLabs voice taste-gate) — **CARRIED**; strategy locked at `tenants/constellation/channels/youtube/content-strategy.md`.
4. **Roadmap Phase 2** (tenant spine: tenant.md w/ approvers, brand/ pointers, strategy, calendar, _TEMPLATEs) — **CARRIED**; next build after ship; Phase 3 = content-item model w/ approval states.
5. **Codex pre-existing findings → Phase 2**: `operate-youtube.py` hardcodes Constellation's channel id (rejects other tenants — generalize per-tenant config); `render-banner.py` machine-specific source path (by design, note only) — **CARRIED**.
6. **Open forks (Brad, from plan §5):** empire-doc channel-ops routing update · X/Twitter greenlight + API tier (verify pricing live) · authority publishing surface (generate-only / apps/web / existing property) · wave-1 tenant roster — **CARRIED**; none block ship.
7. **LinkedIn Community Management API application** — **CARRIED**; gated parallel track, not launch-blocking.
8. **Empire operating model ratification** — **CARRIED**; still PROPOSED; 2026-07-11 charter row explicitly leaves its "may migrate" hedge open (fork in item 6).
9. **Adversarial-workflow doctrine** (add Workflow verification stage before ship? clean-tree verification round for THIS PR?) — **CARRIED**; Brad's call; if he opts in, that's the Workflow-tool opt-in.
10. **gstack upgrade 1.58→1.60.1** — **CARRIED**; run `/gstack-upgrade` at a seam, not mid-cycle.
11. **Token durability check** — **CLOSED** (PASSED 2026-07-09, day-8 live verify `VERIFY OK: token bound to 'Constellation AI'`; checkpoint `20260709T140041Z-…`; memory updated; one-time task self-disabled).
12. **Offsite repo-hygiene** (jaca/platform archive · .env.example · CI lint · skills dedupe) — **CLOSED** (all in `373a8b3`; dedupe dispositioned as installer-managed in engineering-standards).
13. **Books→authority canon kill** — **CLOSED** (predecessor, `fe61468`).

### Notes
- **Do not cold-boot in the main checkout and expect the re-org** — it exists only on the branch until the PR merges. Work in the worktree.
- Old paths (`youtube/…`, `linkedin/…`) persist BY DESIGN in `docs/state/` history and are translated in memory files ("PATHS MOVED 2026-07-11" blocks). The scheduled-task SKILL.md (durability check) cites old paths — it's disabled/fired; if cloned as the Phase-5 template, update paths.
- Review lesson worth keeping (also in gstack learnings): my own round-1 "fix" of the gitignore was wrong and only Codex caught it — cross-model review is doing real work here; the author-triages-own-review gap is the argument behind item 9.
- Charter stays macro (standing) — the 2026-07-11 row records the axes, not channel/tenant enumeration; specifics live in channels/ + tenants/ READMEs.

### Currency Check (verified on disk this session)
- Branch `393c3ce` clean, 3 commits, structure guard OK, typecheck+tests GREEN ✓
- Brainstorm doc header RATIFIED ✓ · charter row+changelog (2 hits) ✓ · CLAUDE.md status ✓ · engineering-standards (structure.yml line, env line, skills disposition) ✓ · new files (structure.yml, check-structure.sh, .env.example, 4 READMEs) present ✓
- Memory: direction (+2026-07-11 block) ✓ · youtube-ops + linkedin-ops ("PATHS MOVED 2026-07-11") ✓ · MEMORY.md 3 lines updated ✓
- gstack learnings.jsonl: `codex-dual-install-hermes-path` + `tree-move-relative-link-depth` appended ✓

### Memory Written
- `project-contentmonster-direction.md` — 2026-07-11 ratification + layout + open-forks block.
- `project-youtube-channel-ops.md` / `project-linkedin-channel-ops.md` — path-translation blocks; stale "uncommitted" claim removed.
- `MEMORY.md` — direction/youtube/linkedin index lines rewritten to new paths + status.
- gstack `learnings.jsonl` — the 2 operational/pitfall entries above.
