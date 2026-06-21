# last30days — recency research pulse (reference)

> Matt Van Horn's `last30days` skill (v2.1): what people are discussing / recommending /
> debating across **Reddit + X + YouTube + web** over a trailing N days. Used here to
> **scout book niches and reader demand** for the book-publishing pipeline, and market/
> competitor signal generally. Value is **recency, not depth** — a "what's-changing"
> signal; chase anything load-bearing to a primary source.

## Status / install
- **Globally installed** (not vendored): `~/.claude/skills/last30days/` is a symlink to the real skill at `~/Documents/Henry/skills/last30days/`. A thin `SKILL.md` is vendored into this repo at `.claude/skills/last30days/` so it's discoverable here; the engine (scripts) stays global.
- `disable-model-invocation: true` + `user-invocable: true` → **Brad types `/last30days <topic>`**; the agent never auto-fires it. New project skills appear after a **session restart**.

## Run it
Slash command (Brad): `/last30days <topic>` (also `--quick` / `--deep`, `--days=N`).

Direct script (agent path — bypasses the slash command):
```bash
cd ~/Documents/Henry/skills/last30days/scripts
python3 last30days.py "<topic>" --emit=compact     # the script self-loads its own creds
```
Source-availability check (free, no paid run): `python3 last30days.py x --diagnose`.

## Credentials (verified 2026-06-21)
- Read by the script itself from `~/.config/last30days/.env` (NOT repo-portable; never enters this repo).
- `OPENAI_API_KEY` (Reddit) + `XAI_API_KEY` (X) ✅. YouTube via yt-dlp (no key) ✅. Web via OpenRouter ✅.
- Runtime: python3, node, yt-dlp all present. Small per-run API spend (~1–3 min/run).

## Gotchas
- It is NOT in the turbo/app build graph — keys live outside the repo by design; don't add them to `turbo.json`.
- Reddit deep-drill sometimes 403s (partial Reddit is normal); YouTube results aren't date-bounded.
- See the project memory `reference-last30days-skill.md` for the full first-fire notes.
