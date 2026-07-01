---
status: milestone-complete
branch: main
timestamp: 2026-07-01T07:59:58
session_theme: Constellation YouTube Phase 7 (agent/API control) COMPLETE — refresh token minted + verified; channel fully operable by agents
files_modified: youtube/scripts/mint-youtube-token.py (hardened), youtube/scripts/operate-youtube.py (NEW), youtube/tenants/constellation/{setup-guide,channel-config}.md, youtube/tenants/constellation/agents/README.md, youtube/playbook/02-agent-control-api.md, ~/.claude memory (project-youtube-channel-ops)
uncommitted: the ENTIRE youtube/ tree + docs/core-charter/empire-operating-model.md are still untracked in git (commit is Brad's call)
secrets: credentials/youtube/constellation/{client_secret.json,token.json} exist on disk, gitignored, 0600 — NEVER commit
---

# Constellation YouTube — Phase 7 (agent/API control) COMPLETE ✅

### Summary
Resumed at Phase 7 and finished it end-to-end with Brad (babystep console walkthrough). The
Constellation channel is now **fully operable by AI agents via the YouTube Data API v3**. Before the
walkthrough, ran a 9-agent verification sweep (live Google docs, 2026-07-01) that returned **SAFE TO
RUN** — all three load-bearing claims (Internal-app no-7-day-expiry, videos.insert 1-unit/100-per-day
bucket, Desktop loopback/OOB-dead) survived adversarial refutation. The sweep surfaced a **script
blocker** + doc drift, which were fixed pre-flight. The missing **operate-client** was built to close
the loop. Token minted and verified with a real API call.

### What shipped this session
- **Token minted (2026-07-01):** `credentials/youtube/constellation/token.json` (0600, gitignored),
  scopes `youtube.upload` + `youtube`, **bound to Constellation AI `UChonz99tpyIYgvMnUfTTAvA`**
  (confirmed by the minter's smoke test AND `operate-youtube.py verify` — a real `channels.list`).
- **`youtube/scripts/operate-youtube.py` (NEW):** the consumer that was missing. Subcommands
  `verify` / `upload` (+ `--thumbnail`, `--publish-at`, `--made-for-kids`) / `thumbnail` / `update`.
  Loads token.json via `Credentials.from_authorized_user_file`, auto-refreshes, persists back at 0600.
  Least-privilege; captions/comments (force-ssl) intentionally NOT implemented. Compile + live-verified.
- **`mint-youtube-token.py` hardened:** (BLOCKER) create parent dir before writing; write token 0600
  via `os.open`; fail-loud (`return 3`) if no refresh_token; print an "is-this-app-Internal?" reminder;
  strip scope tokens up front.
- **Doc corrections (live-verified against developers.google.com):** quota history re-dated (the
  1-unit/own-bucket model is the **1 Jun 2026** change; the **4 Dec 2025** change was ~1,600→~100 in the
  main pool) in setup-guide.md (Phase-7 step 10 + Appendix C) and playbook/02; "non-expiring" softened
  to "long-lived/durable" with the Workspace-session-control caveat; Internal-exemption re-attributed to
  "no publishing status → never in Testing." Added operate-client + day-8 durability steps to the guide
  and agents/README.

### Concrete Phase-7 config (for the record)
- Cloud project `constellation-youtube` · **proj # 423893530283** · in the **runconstellation.com** org.
- YouTube Data API v3 enabled. OAuth app "Constellation YouTube Agent" · **Audience = Internal**.
- OAuth client: **Desktop** "Constellation YouTube agent (desktop)" · loopback redirect · client id
  `423893530283-…apps.googleusercontent.com` · `client_secret.json` gitignored/0600.
- Isolated venv for the tooling lives in the session scratchpad (`…/scratchpad/ytvenv`); reusable via
  `pip install google-auth-oauthlib google-api-python-client` on any Python (system is 3.9.6 — works but
  EOL; a 3.11+/venv is cleaner).

### Open / carried
1. **Durability check (do on/after 2026-07-09, day 8+):** re-run
   `…/ytvenv/bin/python youtube/scripts/operate-youtube.py verify --token credentials/youtube/constellation/token.json`
   — if it still returns "Constellation AI", the Internal token did NOT hit a 7-day expiry (empirical proof
   Audience=Internal, not Testing). `invalid_grant` would mean the app isn't truly Internal.
2. **Commit routing (BRAD'S CALL):** the entire `youtube/` tree has never been committed. Recommend a
   **branch + PR** for the whole module (module + Constellation tenant + operate-client + mint script +
   Phase-7 doc fixes); this state checkpoint → main. Secrets stay gitignored. Awaiting go-ahead
   (outward-facing / first commit of the module).
3. **Phase 6 loose end:** confirm Keywords / Country (US) / Default language (English) were **Saved** in
   Studio → Settings → Channel → Basic info (Brad never confirmed the Save).
4. **Content:** cadence (start bi-weekly) + first 3 videos — defaults in channel-config.md. Natural next
   real work now that agents can upload: produce video #1 via CREATE/HyperFrames → `operate-youtube.py
   upload`.
5. **Empire operating model** (separate thread): `docs/core-charter/empire-operating-model.md` still
   PROPOSED/uncommitted, awaiting Brad ratify + canonical-home call. Books→authority-content charter
   re-scope also pending. See memory `project-empire-operating-model` + `project-authority-content-strategy`.

### Verification artifacts (this session)
- Minter smoke test: `SMOKE TEST OK: token is bound to channel 'Constellation AI' (id UChonz99tpyIYgvMnUfTTAvA).`
- Operate-client: `VERIFY OK: token bound to 'Constellation AI' (id UChonz99tpyIYgvMnUfTTAvA) — 1 subs, 0 videos.`
- token.json: refresh_token present, scopes correct, perms 0o600, gitignored (git check-ignore confirmed).

### Boot-reads for next session (after CLAUDE.md)
- This file (resume point).
- `youtube/tenants/constellation/channel-config.md` — "Agent control — LIVE" section = source of truth for values.
- memory `project-youtube-channel-ops.md` (auto-loads) — status + gotchas.
- Defer: `youtube/scripts/operate-youtube.py` (open when producing/uploading video #1).
