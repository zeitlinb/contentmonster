# Constellation YouTube — OAuth Token Durability Check

**When:** 2026-07-09 14:00 UTC (day 8+ after mint)
**Result:** ✅ **SUCCESS** — refresh token is durable; did NOT hit the 7-day expiry.
**Run by:** scheduled task `constellation-yt-token-durability-check` (autonomous).

## What was tested

The Constellation YouTube agent OAuth **refresh token** was minted **2026-07-01** for an
OAuth app whose **Audience is INTERNAL** (inside the runconstellation.com Workspace org).
An Internal-app refresh token should **not** expire at 7 days — unlike an External app in
"Testing" status, whose refresh tokens die after 7 days. This run (day 8+) proves the
distinction empirically.

## Procedure

1. Confirmed the local, gitignored credential exists:
   `credentials/youtube/constellation/token.json` (0600, minted 2026-07-01).
2. Fresh venv: `python3 -m venv /tmp/ytverify` + `pip install google-auth google-api-python-client`.
3. Standing verify (a real API call that force-refreshes the access token):
   `/tmp/ytverify/bin/python youtube/scripts/operate-youtube.py verify --token credentials/youtube/constellation/token.json`

## Output

```
VERIFY OK: token bound to 'Constellation AI' (id UChonz99tpyIYgvMnUfTTAvA) — 1 subs, 0 videos.
```

Exit 0. The refresh token successfully minted a new access token via a live Google token
exchange — i.e. it is still valid **8+ days** after minting.

## Conclusion

- The OAuth app **Audience is confirmed INTERNAL** (not External/Testing) — proven empirically,
  not just by console inspection.
- **No re-mint needed.** Agents retain durable upload/manage control of the Constellation AI
  channel via the YouTube Data API.
- This closes the OPEN "durability check" item on `[[project-youtube-channel-ops]]`.
