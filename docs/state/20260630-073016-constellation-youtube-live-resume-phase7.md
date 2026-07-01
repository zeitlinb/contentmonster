---
status: in-progress
branch: main
timestamp: 2026-06-30T07:30:16
session_theme: Constellation YouTube channel LIVE — resume at Phase 7 (agent/API control)
files_modified: youtube/** (module + Constellation tenant + assets + scripts + dist PDF), docs/core-charter/empire-operating-model.md, ~/.claude memory
---

# Constellation YouTube channel — LIVE; resume at agent/API control (Phase 7)

### Summary
Built a reusable multi-tenant `youtube/` module and stood up Constellation's channel end-to-end with Brad (babystepped, live in YouTube). The channel is LIVE, branded, described, secured with a backup owner, and fully verified. Only **Phase 7 — agent/API control (Google Cloud + OAuth refresh token)** remains. (Earlier this session, recorded in their own files/memory: codebase orientation; books-on-Amazon KILL → authority-content pivot; a PROPOSED empire operating-model doc + PDF.)

### Next Move
**Resume the babystep walkthrough at Phase 7, Step 7.1 — create the Google Cloud project + enable the YouTube Data API v3.** Give Brad the steps ONE AT A TIME (same babystep cadence as the whole setup). Canonical steps: `youtube/tenants/constellation/setup-guide.md` → "Phase 7." Inline copy below ("PHASE 7 STEPS").

- **Boot-reads (after CLAUDE.md):**
  - `youtube/tenants/constellation/channel-config.md` (~1.5k) — live setup progress + every value. Source of truth.
  - `youtube/tenants/constellation/setup-guide.md` Phase 7 section (~1k) — canonical click-by-click for the remaining work.
  - `youtube/tenants/constellation/agents/README.md` (~0.5k) — agent-control config (project, scopes, secret paths).
  - memory `project-youtube-channel-ops.md` (auto-loads) — status + gotchas.
- **Defer (JIT):** `youtube/playbook/02-agent-control-api.md` (only if Brad asks why/deeper on OAuth/quota); `youtube/scripts/mint-youtube-token.py` (open at Step 7.4); `docs/core-charter/empire-operating-model.md` (only if the empire thread resumes — it's PROPOSED, awaiting ratify + canonical-home call).
- **Do NOT read:** the `agent/skills` + `.agents/skills` trees (huge vendored HyperFrames skills, irrelevant); the dist `.pdf` (binary).

### PHASE 7 STEPS (give one at a time)
Account: **henry@runconstellation.com** (Workspace + Google Cloud). Goal: a durable OAuth refresh token so agents post via the YouTube Data API. NO service accounts (they fail `NoLinkedYouTubeAccount`).
- **7.1** console.cloud.google.com → New Project `constellation-youtube`, **Organization = runconstellation.com** (confirm — required for the Internal app) → enable **YouTube Data API v3** (APIs & Services → Library).
- **7.2** APIs & Services → **Google Auth Platform** → Branding (app name + support email) → **Audience = Internal** (avoids verification + 100-user cap + 7-day token death) → Data Access → add scopes `youtube.upload` + `youtube` (+ `youtube.force-ssl` only if agents will manage captions/comments).
- **7.3** Clients → Create client → **Desktop app** → download the client-secret JSON → save to `credentials/youtube/constellation/client_secret.json` (gitignored).
- **7.4** Run `pip install google-auth-oauthlib google-api-python-client`, then `python youtube/scripts/mint-youtube-token.py --client-secret credentials/youtube/constellation/client_secret.json --token-out credentials/youtube/constellation/token.json --scopes youtube.upload,youtube` → sign in as henry@, **pick the Constellation AI channel** at the chooser. The helper writes the token and runs a `channels.list` smoke test (must print "Constellation AI").
- Quota: 10k units/day; uploads = 1 unit / own bucket / 100 per day. More via the YouTube API audit/quota-extension form.

### Snapshot
- Channel LIVE: youtube.com/@runconstellation · "Constellation AI" · ID `UChonz99tpyIYgvMnUfTTAvA` · created 2026-06-29.
- `youtube/` module: `playbook/01–06`, `templates/`, `tenants/constellation/{setup-guide,channel-config,assets/,agents/,dist/}`, `scripts/mint-youtube-token.py`. Assets: avatar-800.png (=B red-on-black), banner-2560x1440.png, watermark-150.png + PIL generators + fonts/Inter.ttf.
- The whole `youtube/` tree + `docs/core-charter/empire-operating-model.md` are **UNCOMMITTED** in git. Files persist on disk through a context clear; commit is Brad's call (code/judgment docs → branch+PR; state checkpoints → main).

### Decisions Made (verbatim where the user spoke)
- Handle: "@runconstellation is approved." Display name: Brad approved "Constellation" but YouTube's filter rejected it ("the name can not be Constellation - got... 'This name can't be used'") → used **"Constellation AI"**.
- "use henry@runconstellation.com for the contact email."
- "backup owner is woodfordvideos@gmail.com."
- Avatar: "I think B is more on brand - however, go ahead and produce all three." → B canonical.
- Banner: descriptor **"Agent-Powered AI Visibility & SEO"** + "I like it with the two lines"; "change 'Turn discovery into cash flow.' to 'Turn Discovery Into Cash Flow.' ... accent cash flow with constellation red."
- Positioning (verbatim): "we never want to say things are moving away from Google - they are still the biggest part of search and they are also AI." → description says search "evolves," Google listed first.
- Watermark timing = End of video (Brad set; fine).
- Agent-made (mechanical): avatar/banner/watermark rendered with PIL; Inter fetched from Google Fonts (OFL); state written to docs/state directly (not via gstack-context-save) to conserve context at ~600k.

### Remaining Work
1. **Phase 7 agent/API control** — CARRIED. Next = Step 7.1 above.
2. Keywords / Country (US) / default language (English) (Step 6) — CARRIED: Brad didn't confirm Save; verify in Settings → Channel → Basic info.
3. Content: cadence + first 3 videos — CARRIED (deferred; recommendations in channel-config.md).
4. Commit routing — CARRIED: youtube/ tree + empire doc uncommitted; Brad's call.
5. Empire operating model — CARRIED: PROPOSED at docs/core-charter/empire-operating-model.md; awaiting Brad ratify + canonical-home decision (loop Sherlock); books→authority-content charter re-scope also pending.
6. Watermark timing — CLOSED (End of video).

### Notes
- YouTube name filter blocks bare brand words on new accounts → add a word. Brand Account has NO admin toggle in this tenant (the "additional services without individual control" umbrella governs it) AND `myaccount.google.com/brandaccounts` is EMPTY for this channel → manage owners/team via **Studio → Settings → Permissions**, not brandaccounts. (All folded into playbook/01 + setup-guide.)
- Profile picture/avatar is UI-only (no API). Internal OAuth app requires the Cloud project be in the runconstellation.com org.
- WebFetch can't read YouTube channel content (JS) — rely on Brad's screenshots to verify live state.

### Currency Check (verified on disk this session)
- channel-config.md (setup progress + values) ✓
- setup-guide.md (status banner + Phase 7 + corrections) ✓
- playbook/01-account-and-access.md (umbrella + brandaccounts-empty + maturity gate) ✓
- memory project-youtube-channel-ops.md (LIVE status + gotchas) ✓ ; MEMORY.md index ✓
- assets avatar-800/banner-2560x1440/watermark-150 + generators ✓
- scripts/mint-youtube-token.py ✓
- dist/constellation-youtube-setup-guide.pdf refreshed ✓ (482,935 bytes, 2026-06-30)

### Memory Written
- `~/.claude/projects/-Users-zeitlinb-Projects-contentmonster/memory/project-youtube-channel-ops.md` (LIVE status + gotchas)
- `…/memory/MEMORY.md` (index line)
- (earlier this session) `project-authority-content-strategy.md`, `project-empire-operating-model.md`, `project-contentmonster-direction.md`
