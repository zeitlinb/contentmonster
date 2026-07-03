---
status: handoff
branch: main
timestamp: 2026-07-03T07:08:12-0400
head_commit: 2b0106e (== origin/main; working tree clean)
session_theme: Phase 7 (agent/API control) shipped + verified; Constellation YouTube content strategy locked + 8-week launch slate; all committed to main
files_modified: youtube/scripts/mint-youtube-token.py (hardened), youtube/scripts/operate-youtube.py (NEW), youtube/tenants/constellation/{content-strategy.md NEW, channel-config.md, setup-guide.md, agents/README.md}, youtube/playbook/02-agent-control-api.md, .gitignore, docs/state/*, docs/core-charter/empire-operating-model.md (committed), ~/.claude memory
---

### Summary
Finished **Phase 7 end-to-end**: Internal OAuth app + Desktop client + a durable refresh token (minted 2026-07-01, verified bound to **Constellation AI** by a real API call), built the operate-client, then **locked the channel's content strategy** (research-backed, editor-vetted) with an approved **8-week launch slate**. Everything committed + pushed to main. The Constellation channel is now fully **agent-operable** and has a plan; next real work = produce video #1.

### Next Move
**Produce launch video #1 — "Your Traffic Didn't Die. Your Buyers Moved." (faceless HyperFrames, 75s) — then upload via `operate-youtube.py`.** Two gates first: (a) the **"Where are you invisible?" scan** lead-magnet must exist + be fast/mobile-clean (every early CTA points to it); (b) the ElevenLabs **"Mark"/Henry voice clone** must pass a premium-not-synthetic taste-gate.
- **Boot-reads (after CLAUDE.md):**
  - `youtube/tenants/constellation/content-strategy.md` (~57L) — the LOCKED plan + 8-week slate. Canonical.
  - `youtube/tenants/constellation/channel-config.md` (~72L) — all channel values + "Agent control — LIVE" section.
  - memory `project-youtube-channel-ops` (auto-loads) — status + gotchas.
- **Defer (JIT):** `youtube/scripts/operate-youtube.py` (open when uploading #1); `mint-youtube-token.py` (only to re-mint); the `/hyperframes` skills (when building the faceless video); `docs/state/20260701-075958-…phase7-DONE` (deeper Phase-7 detail if needed).
- **Do NOT read:** the `agent/skills` + `.agents/skills` vendored trees; the `dist/*.pdf` (binary); `credentials/` (secrets).

### Snapshot
- **Agents operate the channel now:** `python youtube/scripts/operate-youtube.py {verify,upload,thumbnail,update} --token credentials/youtube/constellation/token.json`. Deps: `pip install google-auth google-api-python-client` (a throwaway venv is fine; system python 3.9.6 is EOL but works).
- HEAD `2b0106e` == origin/main, tree clean. **4 commits this session:** `8f7e74b` (Phase 7 + operate-client), `f1b6358` (Phase-6 tidy), `fa55649` (content strategy), `2b0106e` (empire doc).
- Secrets: `credentials/youtube/constellation/{client_secret,token}.json` — 0600, gitignored, **NEVER commit**.
- **Scheduled local task** `constellation-yt-token-durability-check` fires **2026-07-09 09:00** — auto-verifies token durability (proves no 7-day expiry), reports, updates state.

### Decisions Made (Brad's words verbatim)
- Commit routing: **"Straight to main"** (chose over branch+PR for the whole youtube module).
- Production model: **"Hybrid: faceless-first + founder."**
- Cadence: **"Weekly."**  · Founder slots: **"W3 + W6."**  · Lead magnet: **"'Where are you invisible?' scan."**  · Audience lane: **"High-ticket B2B only."**
- **"you schedule the durability check and verify it then."** → scheduled Jul 9.
- **"I saved Phase 6 tidy issues."** → Keywords/Country/Language confirmed saved.
- **"go ahead and commit and push that operating model file then handoff."** → empire doc committed (`2b0106e`, still PROPOSED).
- Phase 7 console steps executed by Brad; confirmed Audience = **"i reads Internal"**; picked **"Constellation AI"** at the channel chooser.
- _Agent-made (mechanical):_ script/doc hardening from a 9-agent live-docs verification sweep (parent-dir/0600 fix, quota re-dating, durability wording); operate-client built; content strategy synthesized via a research→critique workflow; state/memory/config updates.

### Remaining Work (priority; disposition per item)
1. **Produce video #1** (+ build the "Where are you invisible?" scan + pass the voice taste-gate) — **CARRIED**; the Next Move.
2. **Durability check** — **CARRIED**; scheduled Jul 9 09:00 (local task auto-runs + reports; no action needed unless it reports FAILURE → re-check Audience=Internal, re-mint).
3. **Content-strategy refinements** (not blocking): W3 lost-revenue math (needs Henry's defensible line); "Ask the 5 Engines" evergreen series for wk9+; voice taste-gate — **CARRIED** (all in content-strategy.md).
4. **Empire operating model** — **CARRIED**; now COMMITTED to main (`2b0106e`) but still **PROPOSED/not-ratified** — awaits Brad go/no-go + canonical-home call (top-level / bzbrain / bzresearch ROUTER). See memory `project-empire-operating-model`.
5. **Books→authority-content charter re-scope** — **CARRIED** (separate thread; repo charter/canon still shows the old books-as-active plan). See memory `project-authority-content-strategy`.
6. Phase 7 agent/API control — **CLOSED** (minted+verified, `8f7e74b`).
7. Phase 6 Keywords/Country/Language — **CLOSED** (Brad saved, confirmed).
8. Commit routing / GitHub sync — **CLOSED** (4 commits pushed; tree clean; local == origin/main).

### Notes
- **Workflow gotcha (don't repeat):** a StructuredOutput schema with many `required` fields + a huge free-text field made the critique agent oscillate (fix one required prop, drop another) → hit the 5-retry cap → the whole workflow threw. Keep workflow schemas lean: few required fields, short/bounded strings, don't pile strict enums + long prose in one object. Recovery: cached research + v1 draft were pulled from the run journal and finalized by hand.
- **Date note:** work ran 2026-07-01 (machine clock, CDT); this handoff written 2026-07-03 (EDT) — session spanned. Artifact dates reflect when work happened.
- WebFetch can't read live YouTube channel content (JS) — rely on Brad screenshots to verify on-channel state.

### Currency Check (verified on disk this session)
- content-strategy.md (Locked decisions + 8-wk slate) ✓ · channel-config.md (Agent-control LIVE + Strategy→content-strategy.md) ✓ · setup-guide.md (Phase 1–7 banner + Phase 7 corrections) ✓ · playbook/02 (quota re-dating) ✓
- mint-youtube-token.py (hardened) ✓ · operate-youtube.py (NEW, compiles + ran live) ✓ · docs/state/20260701-075958-…phase7-DONE ✓
- credentials/{client_secret,token}.json present, 0600, gitignored ✓ · scheduled task SKILL.md present ✓ · HEAD 2b0106e == origin/main, tree clean ✓

### Memory Written
- `~/.claude/projects/-Users-zeitlinb-Projects-contentmonster/memory/project-youtube-channel-ops.md` — Phase 7 DONE + content strategy LOCKED + open items (updated this session).
- Unchanged but still relevant: `project-empire-operating-model`, `project-authority-content-strategy`, `reference-vercel-deploy`, `feedback-cto-decisive-execution`.
