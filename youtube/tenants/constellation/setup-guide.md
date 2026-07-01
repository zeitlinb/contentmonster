# Constellation — YouTube channel setup guide

> A self-contained, click-by-click guide to stand up Constellation's YouTube channel **the right way for a team + AI agents to operate**, and to wire programmatic (agent) control. Print and follow top to bottom.
>
> **Account to use throughout:** `henry@runconstellation.com` (Google Workspace + Google Cloud).
> **Legend:** **[CONFIRM]** = a Brad decision before you act · **[VERIFY LIVE]** = Google's docs were ambiguous or the UI shifts; check the on-screen value.
> _Ground truth verified against official Google/YouTube docs on 2026-06-28. The Cloud console, YouTube Studio, and API quotas change often — re-confirm the flagged steps live._

---

> **▶ EXECUTION STATUS (Constellation — 2026-07-01):** Phases 1–7 are **COMPLETE and live** — channel created (**@runconstellation**, "Constellation AI", ID `UChonz99tpyIYgvMnUfTTAvA`), fully branded, described, linked, contact set, **backup owner `woodfordvideos@gmail.com` added (Owner, via Studio → Permissions)**, **all three verification tiers** unlocked (phone + ID video), and **Phase 7 agent/API control DONE** — Internal OAuth app + Desktop client + refresh token minted to `credentials/youtube/constellation/token.json` (gitignored), verified bound to **Constellation AI** via `operate-youtube.py verify`. Agents can now operate the channel via the API. Phase-6 Keywords/Country/Language **confirmed saved (2026-07-01)**. **Open:** durability check **scheduled 2026-07-09** (day 8+, auto-runs locally); content cadence + first 3 videos. Live progress detail in `channel-config.md`.

## What you'll end up with
- A **Brand Account** channel named **Constellation** (co-ownable by a team; survives anyone leaving) — not a personal channel.
- Branding (profile picture, banner, watermark), full public copy, handle, keywords, verification.
- An **Internal OAuth app** + **refresh token** so agents can upload videos and manage the channel via the YouTube Data API, with no 7-day token expiry and no Google verification.

## Before you start (Phase 0 — confirm these)
- **Handle:** `@runconstellation` ✅ (fallbacks `@ConstellationHQ`, `@getconstellation`).
- **Display name:** `Constellation AI` ✅ (bare "Constellation" was filter-blocked).
- **Contact email:** `henry@runconstellation.com`.
- **Backup owner:** `woodfordvideos@gmail.com` (added as co-owner right after creation).
- **[CONFIRM] Cadence + first 3 videos** (defaults in `channel-config.md`).
- **Produce the 3 images first** (Phase 4 blocks without them — they don't exist yet): `avatar-800.png`, `banner-2560x1440.png`, `watermark-150.png`. Generate these via CREATE/HyperFrames from Constellation's brand per [`assets/README.md`](assets/README.md); the source logos live in `bzresearch/marketing/brand/logo/` (external to this repo — make sure it's reachable). Save the outputs into [`assets/`](assets/).
- **Admin access?** Phase 1 needs a **Workspace administrator** of `runconstellation.com` (may be you).

---

## Phase 1 — Workspace admin prerequisites (do this first)
A Workspace user can only create a company (Brand Account) channel if **two** "Additional Google services" are ON for their org unit. Enabling one is not enough.

1. Sign in to **admin.google.com** as a `runconstellation.com` administrator.
2. **Apps → Additional Google services.**
3. Open **YouTube** → **Service status** → set **On for everyone** (or On for the org unit containing `henry@`).
4. Back in Additional Google services, look for **Brand Account**. **It often has no row of its own** — in many tenants it's governed by the **"Access to additional services without individual control"** umbrella (a banner near the top with a **Change** control). **If that banner says "On" (the default), Brand Account is already enabled — no separate toggle needed.** Only if a distinct **Brand Account** row actually exists, set its **Service status → On for everyone → Save**. _(Confirmed for runconstellation.com on 2026-06-28: no separate row; the umbrella is On, so Brand Account is enabled.)_
5. **Account maturity gate (can block channel creation):** a Workspace user can create a channel only once the account is **≥30 days old OR ≥$30 USD has been processed** on the Workspace billing (an anti-abuse check, not a paid upgrade; doesn't apply to Education/Nonprofit). runconstellation.com is almost certainly past this — but if creation is blocked, this is why.
6. **Wait up to 48 hours** for propagation. (If channel-creation options are missing later, this is almost always why.)

> Why: a personal channel can't be co-owned or transferred; a Brand Account can. YouTube and Brand Account are governed by separate admin controls (an individual toggle, or the umbrella). Neither is a paid add-on — both are free additional services on every Workspace edition.

---

## Phase 2 — Create the channel as a Brand Account
> **If the "Create a channel" / Brand Account option is missing here, Phase 1 hasn't propagated yet** — wait (up to 48h) and retry. That's the #1 cause of a missing option, not a mistake on your end.

1. Go to **youtube.com**. Top-right **profile picture → Switch account** and confirm you're on **henry@runconstellation.com** (name/icon shows top-right). Being "signed into Workspace" isn't enough — you must be on this identity.
2. Profile picture → **Settings**.
3. Under **Account** → **Add or manage channel(s)** _([VERIFY LIVE] older builds: "Add or manage your channel(s)")_.
4. Click **Create a channel** _(older builds: "Create a new channel")_.
5. On the form:
   - **Profile picture:** upload `avatar-800.png`.
   - **Name:** type the brand name. ⚠️ YouTube's name filter may reject a bare single brand word (it rejected **"Constellation"** on the new account — "This name can't be used…"). If so, add a word — **"Constellation AI"** was accepted (2026-06-29). (henry@ already has an auto-created *personal* channel; the channel you create here is the **2nd** channel, which YouTube automatically makes a **Brand Account** — so use the brand name, not "Henry …".)
   - **Handle:** `@runconstellation` (or fallback if taken).
6. Click **Create channel.**
7. **Verify it's a Brand Account:** visit **myaccount.google.com/brandaccounts** — "Constellation" should appear under *Your Brand Accounts*. (Or in Studio → Settings → Account, an **"Add or remove managers"** option confirms it.)

> To work on this channel later: switch to the **Constellation** identity — either at youtube.com (profile picture → **Switch account**) or inside YouTube Studio itself (top-right profile → **Switch account**, or go to **studio.youtube.com**). Studio acts on whichever identity is active; confirm via the name/icon top-right.

---

## Phase 3 — Continuity + team & agent access
**Do the backup owner immediately** — a Brand Account left with **no active owners** is suspended 21 days then **deleted**, taking the channel with it. (Turning a user's admin Brand Account service off only *removes that user* when other owners remain; the danger is being the *last* owner. Keeping ≥2 owners prevents this.)

1. **Add a 2nd owner (current method = YouTube Studio):** Studio → **Settings → Permissions** → **Invite** → **`woodfordvideos@gmail.com`** → role **Owner** → send (invite expires in 30 days); accept from that inbox. _⚠️ The legacy `myaccount.google.com/brandaccounts` page is often **EMPTY** for newly-created channels — Google now manages channel access through Studio Permissions, which works on its own. Don't rely on the brandaccounts page. (Confirmed 2026-06-29.)_
2. **Opt in to channel permissions** (granular, safer day-to-day model): YouTube Studio (as Constellation) → **Settings → Permissions** → opt in (primary owner only).
3. **Add team members:** Settings → Permissions → **Invite** → email → role (**Manager** for operators, **Editor** for video-only, **Viewer** for read-only) → send. *Invites expire in 30 days.*

> ⚠️ In Brand Account roles, **"Communications manager" cannot use YouTube** — never assign it to anyone who manages video. Keep **≥2 owners** always.
> Agents are **not** added here — they use OAuth (Phase 7).

---

## Phase 4 — Branding (YouTube Studio → Customization → Profile)
Be on the Constellation identity. Studio → **Customization** → **Profile** tab _([VERIFY LIVE] older builds label it "Branding")_. **Click Publish (top-right) when done — nothing applies until you do.**

| Asset | File | Spec |
|---|---|---|
| **Profile picture** | `avatar-800.png` | square, displays as circle; JPG/PNG/BMP/**non-animated** GIF; ≤15 MB |
| **Banner** | `banner-2560x1440.png` | recommend 2560×1440; **keep all text/logo inside the centered 1235×338 safe area**; ≤6 MB; no borders/shadows |
| **Video watermark** | `watermark-150.png` | square ≥150×150; **PNG with transparency**; <1 MB; choose timing **Entire video** (best for subscribe prompting) or End of video (last 15s) |

1. **Picture** → upload `avatar-800.png` → crop → Done.
2. **Banner image** → upload `banner-2560x1440.png` → adjust → Done.
3. **Video watermark** → upload `watermark-150.png` → pick timing.
4. **Publish.**

> The profile picture is **UI-only** (agents can't set it via API), so do it here now.

---

## Phase 5 — Public copy & settings
### 5a. Customization → Profile (then **Publish**)
- **Handle:** confirm `@runconstellation`.
- **Channel name:** `Constellation`. ⚠️ Changing the name later **removes the verification badge** — set it right now.
- **Channel description:** paste:

```
The AI-native digital presence and revenue machine. Get Found. Stay Found. Turn discovery into cash flow.

Your customers now search in 6+ places — Google, ChatGPT, Claude, Perplexity, Gemini, Amazon, social. Most businesses optimize one and stay invisible on the rest. Constellation maps your entire digital node network, finds what's costing you revenue, and deploys AI agent teams — guided by expert humans — to fix it continuously.

Two Machines. One System. The Digital Presence Machine gets you found and keeps you found. The Revenue Machine connects discovery to actual sales. Every recommendation ties to measurable revenue impact.

New videos on AI visibility, search-to-sale, and agent-powered execution.
→ runconstellation.com
```

- **Links** → **Add link**: title `Constellation`, URL `https://runconstellation.com` (the first link surfaces next to Subscribe). Add LinkedIn/X later when live.
- **Contact info** → `henry@runconstellation.com`.
- **Publish.**

### 5b. Settings → Channel → Basic info (then **Save**)
- **Keywords:** `AI visibility, AI SEO, generative engine optimization, GEO, answer engine optimization, AEO, search to sale, ChatGPT SEO, Perplexity, AI search, digital presence, revenue operations, AI agents`
- **Country of residence:** United States.
- **Default video language:** set under **Settings → Upload defaults → Advanced settings → Video language → English** (there is no "default language" under Settings → Channel).

---

## Phase 6 — Verify the channel (phone)
1. **Settings → Channel → Feature eligibility** (or go to **youtube.com/verify**) → verify with a phone number.
2. Unlocks the **intermediate** tier: **custom thumbnails**, videos **>15 min**, **live streaming**, podcasts.
   - A phone number verifies **≤2 channels/year**. Custom-thumbnail unlock can take up to ~24h to appear — not an error.

---

## Phase 7 — Agent / API control (the part Brad cares about)
Goal: agents upload videos and manage the channel via the **YouTube Data API v3**, durably.

**Key facts (don't fight these):**
- **No service accounts** — they fail with `NoLinkedYouTubeAccount`. Agents use a **user OAuth refresh token** for `henry@` (who manages the channel).
- Build an **Internal** app inside the `runconstellation.com` org → **no** Google verification, **no** 100-user cap, and **no** 7-day refresh-token expiry. _(The 7-day expiry attaches to the **"Testing" publishing status** of External apps; an **Internal** app has no publishing status at all, so it's never in Testing — that's why it's exempt. The trap that silently kills unattended agents.)_

**Steps** (the Cloud console now uses **APIs & Services → Google Auth Platform** with Branding / Audience / Clients / Data Access tabs):
1. **console.cloud.google.com** as `henry@runconstellation.com` → project picker → **New Project** → name `constellation-youtube`, **and pick the runconstellation.com organization** (required for Internal) → Create → select it.
2. **APIs & Services → Library** → search **"YouTube Data API v3"** → **Enable**.
3. **Google Auth Platform → Branding → Get Started** → App name `Constellation YouTube Agent`, **User support email** = henry@ → Next.
4. **Audience** → **Internal** → Next. Contact email → Next → accept the User Data Policy → Create.
5. **Data Access → Add or remove scopes** → add the minimum:
   - `https://www.googleapis.com/auth/youtube.upload`
   - `https://www.googleapis.com/auth/youtube`
   - (add `https://www.googleapis.com/auth/youtube.force-ssl` only if agents will manage captions/comments) → Update → Save.
6. **Clients → Create client** → Application type **Desktop app** → Create → **download** the client-secret JSON.
7. Save it to **`credentials/youtube/constellation/client_secret.json`** (gitignored — never commit).
8. **Mint the refresh token (one time)** — use the bundled helper, no hand-rolled OAuth needed:
   ```bash
   pip install google-auth-oauthlib google-api-python-client
   python youtube/scripts/mint-youtube-token.py \
     --client-secret credentials/youtube/constellation/client_secret.json \
     --token-out      credentials/youtube/constellation/token.json \
     --scopes youtube.upload,youtube
   ```
   It opens a browser → **sign in as henry@** → **at the channel chooser pick the Constellation Brand Account** (not henry@'s personal channel) → it writes the refresh token to `token.json`. (The script uses a loopback redirect, which the Desktop client allows automatically; OOB is dead.)
9. **Smoke test:** the helper automatically calls `channels.list mine=true` and prints the channel it's bound to — confirm it says **Constellation**. Wrong/personal channel → re-run and pick the Brand Account at the chooser.
10. **Quota:** default **10,000 units/day** combined pool **for endpoints _other than_ `videos.insert` and `search.list`** (reads = 1 unit, writes = 50, captions = 400+), resets midnight Pacific. `videos.insert` now costs **1 unit in its own "Video Uploads" bucket, default 100 uploads/day** — so the upload limiter is the **100/day cap**, not the 10k pool. _History (per the [official revision history](https://developers.google.com/youtube/v3/revision_history)): the old ~1,600-unit upload cost dropped to ~100 units on **4 Dec 2025** (still in the main pool), then `videos.insert` + `search.list` moved to their **own granular buckets at 1 unit each on 1 Jun 2026** — so the current 1-unit/own-bucket model is the **June-2026** change, not December 2025._ More quota = submit the *YouTube API Services – Audit and Quota Extension* form (no self-serve bump). Confirm live numbers under **APIs & Services → Quotas**.

11. **Operate the channel (the consumer of the token).** Minting is done; agents now run the channel via `youtube/scripts/operate-youtube.py`, which loads `token.json` and auto-refreshes:
    ```bash
    # standing smoke test — re-confirm the token is bound to Constellation anytime:
    python youtube/scripts/operate-youtube.py verify --token credentials/youtube/constellation/token.json
    # upload (private by default; --publish-at schedules; --thumbnail sets a custom thumb):
    python youtube/scripts/operate-youtube.py upload --token credentials/youtube/constellation/token.json \
      --file video.mp4 --title "…" --description "…" --tags "ai,seo" --category 28 --privacy private
    ```
    Subcommands: `verify`, `upload`, `thumbnail`, `update`. Captions/comments are intentionally omitted (they need `force-ssl` — expand scopes first).
12. **Prove durability past day 7 (verified, not "should work").** Note `token.json`'s date; on **day 8+** re-run the `verify` command above. If it still returns *Constellation AI*, the Internal token did **not** hit the 7-day expiry (empirically confirming Audience = Internal, not Testing). An `invalid_grant` means the app isn't truly Internal — re-check step 4.

**Agents can:** upload + full metadata, thumbnails, playlists/sections, captions, channel keywords/description/links/country/banner/watermark, comments.
**Agents can't (UI-only):** profile picture/avatar, Community posts, end screens, monetization, phone verification.

> **Security tradeoff (read this):** the Internal-app refresh token is, by design, a **long-lived, durable credential** (durable, _not literally non-expiring_) that can upload to and manage the channel as henry@ with no further human approval. _It can still be invalidated by: the user revoking access, ~6 months of non-use, an admin restricting a requested scope, exceeding the per-client live-token limit, or a Workspace **Google Cloud session-control** policy (Admin console → Security) — which is the one remaining way an Internal-app token can be forced to re-consent._ Compensating controls: (a) keep it **only** under gitignored `credentials/youtube/constellation/`, never in the `youtube/` tree or any commit; (b) it can be revoked instantly at **myaccount.google.com/permissions** or by deleting the OAuth client in Cloud Console if it leaks; (c) access-control the host/disk that stores it and **re-mint periodically**; (d) request only the scopes you need (don't add `force-ssl` unless agents manage captions/comments).

---

## Phase 8 — Launch checklist (Constellation)
- [ ] Admin: YouTube + Brand Account services ON (Phase 1)
- [ ] Channel created as **Brand Account**, verified at brandaccounts (Phase 2)
- [ ] **≥2 owners**; channel permissions opted in; team invited (Phase 3)
- [ ] Profile picture + banner (safe-area) + watermark uploaded and **Published** (Phase 4)
- [ ] Handle, name, description, links, contact, keywords, country, language set (Phase 5)
- [ ] Phone-verified (Phase 6)
- [ ] Cloud project (in org) + API enabled + Internal consent + Desktop client + refresh token stored; smoke test passes (Phase 7)
- [ ] First video ready; description CTA → runconstellation.com
- [ ] No `Communications manager` assigned to video people

---

## Appendix A — copy/paste block
- **Name:** `Constellation`
- **Handle:** `@runconstellation`
- **Description:** (Phase 5a block above)
- **Keywords:** `AI visibility, AI SEO, generative engine optimization, GEO, answer engine optimization, AEO, search to sale, ChatGPT SEO, Perplexity, AI search, digital presence, revenue operations, AI agents`
- **Primary link:** `https://runconstellation.com`

## Appendix B — asset specs
| Asset | Size | Format | Limit | Where |
|---|---|---|---|---|
| Profile picture | 800×800 (circle crop) | PNG | ≤15 MB [VERIFY] | Customization → Profile |
| Banner | 2560×1440 (safe area 1235×338) | PNG/JPG | ≤6 MB | Customization → Profile |
| Watermark | 150×150 square | PNG (transparent) | <1 MB | Customization → Profile |
| Thumbnail (per video) | 3840×2160 (min width 640) | JPG/PNG | ≤2 MB mobile | per-video; needs verification |

## Appendix C — provenance & caveats
Sources: official `support.google.com/youtube`, `support.google.com/a`, `developers.google.com/youtube/v3`, `developers.google.com/identity` (full list in the `playbook/` files). This guide was adversarially fact-checked against those live sources on 2026-06-28 and re-verified 2026-07-01. Note: the **`videos.insert` quota cost** dropped from ~1,600 to ~100 units on **4 Dec 2025** (still in the main pool), then `videos.insert` + `search.list` moved to their **own granular buckets at 1 unit each on 1 Jun 2026** (default 100/day) — ignore older guides that still cite the ~1,600-unit figure. YouTube/Cloud UI labels drift; treat **[VERIFY LIVE]** items as confirm-on-screen.

---
_Generate the printable PDF into `dist/`: from the gstack repo's make-pdf — `pdf generate --cover --toc <this file> dist/constellation-youtube-setup-guide.pdf` (write to an allowed path, then copy)._
