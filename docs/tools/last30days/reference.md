# last30days — recency research pulse (reference)

> Matt Van Horn's `last30days` skill: what people are discussing / recommending / debating across
> **Reddit + X + YouTube + TikTok + Instagram + Hacker News + web** over a trailing N days. Used here to
> **scout book niches and reader demand** for the book-publishing pipeline, and market/competitor signal.
> Value is **recency, not depth** — chase anything load-bearing to a primary source.
>
> _Engine upgraded v2.1 → **v3.8.0** on 2026-06-22 (to fix Reddit — see Gotchas)._

## Status / install
- **Globally installed** (git checkout, symlinked): `~/.claude/skills/last30days` →
  `~/Documents/Henry/skills/last30days/skills/last30days` (v3 moved the skill into a `skills/last30days/`
  subdir; the symlink was re-pointed to the nested dir so every project resolves it). Repo:
  `github.com/mvanhorn/last30days-skill`. A thin `SKILL.md` is vendored at `.claude/skills/last30days/`
  for discoverability; the engine stays global.
- `disable-model-invocation: true` + `user-invocable: true` → **Brad types `/last30days <topic>`**; the agent never auto-fires it.
- **Python 3.12+ required** (system `python3` is 3.9). The vendored slash command resolves `python3.12`.

## Run it
Slash command (Brad): `/last30days <topic>` (also `--quick` / `--deep`, `--days=N`).
**Use default or `--deep` depth** — `--quick` is too shallow and culls Reddit to ~1 thread.

Direct script (agent path):
```bash
python3.12 ~/.claude/skills/last30days/scripts/last30days.py "<topic>" --emit=compact
```
Source-availability check (free): `python3.12 ~/.claude/skills/last30days/scripts/last30days.py x --diagnose`.

## Credentials (`~/.config/last30days/.env`, outside the repo)
- `OPENAI_API_KEY` ✅ · `XAI_API_KEY` (X) ✅ · `OPENROUTER_API_KEY` (web) ✅ · **`SCRAPECREATORS_API_KEY`** ✅ (added 2026-06-22).
- **ScrapeCreators** powers TikTok / Instagram / Threads / Pinterest / YouTube-comments, and is the **Reddit backup**. One key, multiple sources. (Brad's own key; multi-key comma rotation supported.)
- Reddit's *primary* path is **keyless RSS** — no key needed.

## Gotchas
- **Reddit (the big one, fixed 2026-06-22):** direct `reddit.com`/`.json` now **403-blocks all HTTP** (anti-bot, even residential IP) — the old "public JSON" path is dead. Our **v2.1 had only that path → 0 threads every run** (it surfaced as an empty `concurrent.futures.TimeoutError`). **v3 fixed it** with a keyless RSS + shreddit tier (load-bearing) and ScrapeCreators as backup. Verified: default-depth run returned **16 threads / 1,912 upvotes** from r/KDP, r/selfpublishing, r/selfpublish.
- `--quick` under-returns Reddit (hard relevance filter); prefer default/`--deep`.
- X via xAI backend (no browser cookies needed); the Safari "Full Disk Access" warning at startup is cosmetic (cookie path, unused).
- Per-run small API spend; 1–3 min/run.
- See project memory [[reference-last30days-skill]] for the original first-fire notes.
