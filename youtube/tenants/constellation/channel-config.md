# Constellation — YouTube channel config

> The concrete values for Constellation's channel. Sourced from bzresearch (`foundations/051626-constellation-evolved.md`, brand `marketing/brand/_index.md`, channel strategy `clients/constellation-internal/`). Items were marked **[CONFIRM]** during planning; nearly all are now resolved and live — see Setup progress.

## Setup progress (live — 2026-07-01)

**The channel is LIVE:** youtube.com/@runconstellation · channel ID `UChonz99tpyIYgvMnUfTTAvA`

- [x] **Phase 1 — Workspace services** on (YouTube = its own toggle; Brand Account governed by the "additional services without individual control" umbrella, which is On — no separate Brand Account row in this tenant).
- [x] **Channel created** as the 2nd channel under henry@runconstellation.com → display name **Constellation AI** (bare "Constellation" was rejected by YouTube's name filter), handle **@runconstellation**.
- [x] **Branding published** — avatar (red glyph on black, option B), banner (wordmark + "Agent-Powered AI Visibility & SEO" + red "Cash Flow."), watermark (white glyph, transparent; timing = **End of video**).
- [x] **Description + Website link + Contact email** live (the refined description below; runconstellation.com; henry@runconstellation.com).
- [x] **Backup owner `woodfordvideos@gmail.com` added as Owner** via YouTube Studio → Settings → **Permissions** (the modern path; the `myaccount.google.com/brandaccounts` page is EMPTY for this channel — do not use it). Continuity secured.
- [x] **Verification — ALL THREE tiers** (phone + ID/video). Custom thumbnails, 15-min+ uploads, live streaming, and advanced features unlocked.
- [x] **Keywords / Country (US) / default language (English)** — saved (confirmed by Brad, 2026-07-01).
- [x] **Phase 7 — Agent / API control — DONE (2026-07-01).** Cloud project `constellation-youtube` (proj # `423893530283`, in the runconstellation.com org) → YouTube Data API v3 enabled → **Internal** OAuth app "Constellation YouTube Agent" → **Desktop** client → refresh token minted to `credentials/youtube/constellation/token.json` (0600, gitignored). Smoke test + `operate-youtube.py verify` both confirm the token is bound to **Constellation AI** (`UChonz99tpyIYgvMnUfTTAvA`). **Agents can now upload/manage via the API.**

## Identity
- **Channel name (display):** `Constellation AI`  _(YouTube's name filter rejected bare "Constellation" on the new account; retry "Constellation" later once the channel is established)_
- **Channel ID / URLs:** `UChonz99tpyIYgvMnUfTTAvA` · youtube.com/channel/UChonz99tpyIYgvMnUfTTAvA · youtube.com/@runconstellation — created 2026-06-29 as a Brand Account
- **@handle (primary):** `@runconstellation`  _(matches the live domain; safest, not URL-like)_
- **@handle (fallbacks if taken):** `@ConstellationHQ`, `@getconstellation`  _(avoid `@constellation.ai` — a `.tld` handle can be rejected as "URL-like")_
- **Owning Google identity (Workspace):** `henry@runconstellation.com`
- **Backup owner (continuity):** `woodfordvideos@gmail.com` — add as co-owner immediately after creation
- **Workspace org / domain:** `runconstellation.com`

## Public copy
**Channel description** (lead with outcomes; respects the don'ts — no "fully automated," no client names, no "honest"):
```
Constellation makes clear, actionable videos about AI visibility and SEO — how businesses get found and stay found as search evolves in the age of AI, across Google, ChatGPT, Claude, Perplexity, and beyond.

Each video breaks down how search and AI actually discover your business, what's quietly costing you traffic and revenue, and how to fix it — agent-powered execution, expert-human strategy, every move tied to a measurable outcome.

Get found. Stay found. Turn discovery into cash flow.
→ runconstellation.com
```
_(LIVE on the channel as of 2026-06-29.)_

- **Links** (first = primary CTA): `Constellation → https://runconstellation.com`; later add LinkedIn (CINT-W-005) + X (CINT-W-003) once live.
- **Contact email:** `henry@runconstellation.com`
- **Channel keywords:** `AI visibility`, `AI SEO`, `generative engine optimization`, `GEO`, `answer engine optimization`, `AEO`, `search to sale`, `ChatGPT SEO`, `Perplexity`, `AI search`, `digital presence`, `revenue operations`, `AI agents`
- **Country:** United States
- **Default video language:** English

## Brand assets (for CREATE to produce the images — see `assets/README.md`)
- **Logo source:** `/Users/zeitlinb/Projects/bzresearch/marketing/brand/logo/` — `constellation-logo-white.png`, `constellation-logo-black.png` (+ `logo-option-4-white-transparent.png`, `logo-option-4-black-transparent.png` for transparency)
- **Palette:** Bedrock Black `#050505`, Constellation Red `#FF2B2B`, Pure White `#FFFFFF`, Deep Space `#0B0F1A`, Panel `#131B2B`; signal accents Interface Blue `#2563EB` (Get Found), Insight Violet `#8B5CF6` (Stay Found), Signal Green `#10B981` (Cash Flow)
- **Typography:** Inter (400/500/600/700/800)
- **Profile picture concept:** the constellation glyph (white or red) centered on Bedrock Black `#050505`, generous padding (renders as a circle)
- **Banner concept:** wordmark + tagline **"Get Found. Stay Found. Turn discovery into cash flow."** on Bedrock Black, Constellation Red accent — all inside the **1235×338** safe area; no borders/shadows

## Strategy (from CINT-W-004)
- **Cadence [CONFIRM]:** start bi-weekly (2–3 videos/month)
- **Content pillars:** (1) hero/awareness 60–90s; (2) AI-engine deep dives (ChatGPT/Claude/Perplexity/Amazon/local); (3) anonymized case studies (post-Phase-1); (4) founder thought leadership; (5) methodology / "34+ bots cataloged"
- **First 3 videos [CONFIRM]:** (1) "The way people find businesses has fundamentally changed" (problem intro); (2) "How AI engines find you — and why most businesses are invisible"; (3) "Two Machines. One System."
- **Funnel:** YouTube description CTA → runconstellation.com → contact / pre-qual
- **Measurement:** views, subscribers, watch-time, external-link CTR, form-submission attribution; YouTube also valued as an entity-graph signal

## Voice & compliance (from brand doctrine)
- **Voice:** confident, outcome-obsessed, premium-editorial restraint; agent verbs (deploy, optimize, measure, connect). Narration voice = ElevenLabs "Mark" (Henry-cloned) for consistency.
- **Don'ts:** no "fully automated/zero-touch/AI replaces your agency"; no "honest/honestly" (Brad ban); no naming clients (Jaca, Scoop Duke, Woody's); don't flatten the category ("SEO software," "marketing dashboard," "agency"); don't "boil the ocean" — lead with "start where it hurts"; never frame as "rank better" (lead with revenue).

## Agent control — LIVE (2026-07-01)
- **Cloud project:** `constellation-youtube` · project # `423893530283` · in the **runconstellation.com** org (so OAuth user type could be **Internal**).
- **API:** YouTube Data API v3 — enabled.
- **OAuth app:** "Constellation YouTube Agent" · **Audience = Internal** (no verification, no 100-user cap, no 7-day token expiry — Internal has no publishing status, so it's never in "Testing").
- **OAuth client:** **Desktop app** "Constellation YouTube agent (desktop)" · loopback redirect · client id `423893530283-…apps.googleusercontent.com`.
- **Scopes:** `youtube.upload` + `youtube` (least-privilege; `youtube.force-ssl` **not** added — only needed if agents manage captions/comments).
- **Refresh token:** minted 2026-07-01 → `credentials/youtube/constellation/token.json` (0600, gitignored). Bound to **Constellation AI** (`UChonz99tpyIYgvMnUfTTAvA`) — verified via `channels.list mine=true` + `operate-youtube.py verify` (real API call).
- **Operate the channel:** `python youtube/scripts/operate-youtube.py {verify,upload,thumbnail,update} --token credentials/youtube/constellation/token.json` (loads token.json, auto-refresh). Re-mint with `mint-youtube-token.py` if ever needed.
- **Durability check (OPEN):** re-run `operate-youtube.py verify` on/after **2026-07-09** (day 8+) to empirically confirm the Internal token did **not** hit a 7-day expiry.
- **Revoke/rotate:** revoke at `myaccount.google.com/permissions` or delete the OAuth client in Cloud Console; then re-mint. Re-minting issues a fresh token; revoke the prior grant to avoid orphaned credentials.
- **Secrets (gitignored):** `credentials/youtube/constellation/` — `client_secret.json`, `token.json`. Never commit.
