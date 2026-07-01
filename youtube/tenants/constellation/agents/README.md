# Constellation channel — agent / API control

> How agents operate this channel programmatically. Full rationale + limits in [`../../../playbook/02-agent-control-api.md`](../../../playbook/02-agent-control-api.md). This file is the Constellation-specific config. **No secrets are committed.**

## Model (recap)
- **No service accounts** — they can't run a normal channel (`NoLinkedYouTubeAccount`). Agents use an **OAuth refresh token** for a Google account that manages the channel.
- Use an **Internal** OAuth app inside the **runconstellation.com** Workspace org → no Google verification, no 100-user cap, **no 7-day token expiry**.
- Authorizing account = `henry@runconstellation.com` (owns/manages the Brand Account channel).

## Concrete config
| Item | Value |
|---|---|
| Cloud project | `constellation-youtube` (created in the runconstellation.com org) |
| API | YouTube Data API v3 (enabled) |
| OAuth user type | **Internal** |
| OAuth client type | **Desktop app** (loopback redirect; OOB is dead) |
| Scopes (minimum) | `https://www.googleapis.com/auth/youtube.upload`, `https://www.googleapis.com/auth/youtube` |
| Scopes (add only if needed) | `https://www.googleapis.com/auth/youtube.force-ssl` (captions/comments) |
| Authorizing account | `henry@runconstellation.com` |

## Secret layout (gitignored — `credentials/` is in .gitignore)
```
credentials/youtube/constellation/
  client_secret.json     # downloaded from the OAuth client (Cloud console)
  token.json             # the minted refresh token (+ access token cache)
```
Never place these inside the `youtube/` tree (it's committed). Only under `credentials/`.

## One-time setup → see the setup guide
Phase 7 of [`../setup-guide.md`](../setup-guide.md) is the click-by-click: create project → enable API → Internal consent → Desktop client → mint refresh token → store under `credentials/youtube/constellation/`.

Mint the token with the bundled helper (handles the loopback OAuth + smoke test):
```bash
pip install google-auth-oauthlib google-api-python-client
python youtube/scripts/mint-youtube-token.py \
  --client-secret credentials/youtube/constellation/client_secret.json \
  --token-out      credentials/youtube/constellation/token.json \
  --scopes youtube.upload,youtube
```

## Smoke test (after minting the token)
- `channels.list` with `mine=true` should return the **Constellation** channel id (confirms the token is bound to the right channel, not henry@'s personal channel).
- If it returns the wrong/personal channel: re-run consent and **select the Constellation Brand Account** at the chooser, or confirm `henry@` is a manager/owner of that Brand Account.

## Operate the channel (after minting) — `operate-youtube.py`
The consumer of the token. Loads `token.json`, auto-refreshes, and runs the channel:
```bash
# standing smoke test (repeatable — re-run anytime to confirm the token binding):
python youtube/scripts/operate-youtube.py verify --token credentials/youtube/constellation/token.json
# upload a video (private by default):
python youtube/scripts/operate-youtube.py upload --token credentials/youtube/constellation/token.json \
  --file video.mp4 --title "…" --description "…" --tags "ai,seo" --category 28 --privacy private
```
Subcommands: `verify` · `upload` (+ `--thumbnail`, `--publish-at`, `--made-for-kids`) · `thumbnail` · `update`.
Least-privilege: uses only `youtube.upload` + `youtube`; captions/comments (force-ssl) are intentionally not implemented until scopes are expanded.

## What agents can / can't do here
- **Can:** upload videos + full metadata, set thumbnails, playlists/sections, captions, channel **keywords/description/links/country/banner/watermark**, comments.
- **Can't (UI-only):** the **profile picture/avatar**, Community posts, end screens, monetization, phone verification. Leave these as human-in-Studio steps.

## Quota watch
Default 10,000 units/day (reads 1 / writes 50 / captions 400+). `videos.insert` = **1 unit in its own bucket, 100 uploads/day** (the old ~1,600-unit cost was retired Dec 2025 — ignore it). The upload limiter is the 100/day cap. More quota = YouTube API Services compliance-audit form. Confirm live on Cloud Console → Quotas.

## Security
The refresh token is a long-lived credential that manages the channel as henry@ with no further consent. Keep it only under `credentials/youtube/constellation/`; revoke at `myaccount.google.com/permissions` or by deleting the OAuth client if it leaks; re-mint periodically; least-privilege scopes only.
