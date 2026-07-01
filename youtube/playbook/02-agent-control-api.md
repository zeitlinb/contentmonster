# Playbook 02 — agent / API control

> How AI agents control a YouTube channel programmatically, the honest limits, and the Google Cloud setup. Company-agnostic. _Verified 2026-06-28; Google iterates the Cloud console + quota — re-confirm live._

## The one thing to get right: no service accounts

A **service account cannot own/manage a normal YouTube channel** — authorizing with one raises `NoLinkedYouTubeAccount`. The *only* exception is a CMS **Content Owner** (record labels / studios with many channels), which is not us. So **domain-wide delegation is a dead end** for a creator channel.

**The real path:** OAuth 2.0 **user** authorization → a long-lived **refresh token** for a Google account that owns/manages the channel. The agent stores the refresh token and mints short-lived access tokens on demand, no human in the loop after the one-time consent.

## Make it durable + frictionless: an "Internal" app

Use an OAuth app of user type **Internal**, in the **same Google Workspace org as the channel** (e.g. `runconstellation.com`). Internal apps:
- skip Google's sensitive-scope **verification** (no homepage/privacy-policy/demo-video review),
- have **no 100-test-user cap**,
- and critically **avoid the 7-day refresh-token expiry** that External apps in "Testing" status suffer — the trap that silently kills unattended agents.

The authorizing account must be a member of that org **and** own/manage the channel (true when the channel's Brand Account is created/managed by that Workspace user). Internal user type is only selectable when the **Cloud project lives in the Workspace org** — so create the project under that org.

> **Security tradeoff:** non-expiry is convenient but the refresh token is a **long-lived credential** that manages the channel as the authorizing user with no further consent. Controls: store **only** under gitignored `credentials/`; revoke instantly at `myaccount.google.com/permissions` or by deleting the OAuth client if leaked; access-control the host and **re-mint periodically**; request least-privilege scopes.

## Scopes (request the minimum)

| Scope | Grants |
|---|---|
| `…/auth/youtube.readonly` | read-only |
| `…/auth/youtube.upload` | upload/manage **your own** videos (upload-only) |
| `…/auth/youtube` | manage account: playlists, channel branding/keywords/description, sections, subscriptions |
| `…/auth/youtube.force-ssl` | broadest: videos + **comments + captions** (these effectively require it) |
| `…/auth/youtubepartner` | CMS/Content-ID partners only |

`videos.insert` accepts `youtube.upload`, `youtube`, `youtubepartner`, or `youtube.force-ssl`. YouTube write scopes are **"sensitive"** (not "restricted"), so they do **not** trigger the heavyweight CASA security assessment.

## Quota (plan around the caps)

- Default **10,000 units/day** combined pool **for endpoints other than `videos.insert` and `search.list`** (carved into their own granular buckets on 1 Jun 2026), resets midnight Pacific.
- Reads (`*.list`) = **1 unit**; writes (insert/update/delete metadata, playlists, `thumbnails.set`, `channelBanners.insert`, `channels.update`, `watermarks.set`) = **50 units**; captions are pricey (`captions.insert` 400 / `update` 450 / `download` 200).
- **Upload cap:** `videos.insert` costs **1 unit in its own "Video Uploads" bucket, default 100 uploads/day** (and `search.list` similarly has its own ~100/day bucket). The upload limiter is the **100/day cap**, not the 10k pool.
  - The widely-cited **~1,600 units per upload** (≈6/day against the main pool) was **cut to ~100 units on 4 Dec 2025** (still in the main pool), then `videos.insert` + `search.list` **moved to their own granular buckets at 1 unit each on 1 Jun 2026** ([revision history](https://developers.google.com/youtube/v3/revision_history)) — so today `videos.insert` = 1 unit in its own 100/day bucket; ignore older guides quoting ~1,600. Confirm live numbers on **Cloud Console → APIs & Services → Quotas** if planning heavy volume.
- More quota = pass a **compliance audit** via the *YouTube API Services – Audit and Quota Extension Form* (no self-serve bump).

## API-controllable vs UI-only

**Agents CAN (YouTube Data API v3):**
- upload videos + set title/description/tags/category/privacy/scheduled `publishAt`/`madeForKids`/language (`videos.insert`/`update`)
- set custom video **thumbnail** (`thumbnails.set`)
- captions/subtitles add/edit/delete/download (`captions.*`, force-ssl)
- playlists + items create/reorder/remove (`playlists.*`, `playlistItems.*`)
- featured **sections** (`channelSections.*`, up to 10)
- **channel branding via `channels.update`**: keywords, channel description, country, default language, unsubscribed trailer, localizations
- **channel banner** (two-step: `channelBanners.insert` → `channels.update` `brandingSettings.image.bannerExternalUrl`)
- channel **watermark** (`watermarks.set/unset`)
- comments + replies post/moderate/delete (`comments.*`, `commentThreads.*`, force-ssl)
- subscriptions, ratings, read members/activities

**UI-only (a human in YouTube Studio — or brittle browser automation):**
- ❗ **channel avatar / profile picture** — `channels.update` has no avatar field
- Community-tab posts; end screens, info cards, chapters UI
- monetization / AdSense / revenue settings; channel **verification** (phone)
- audience/upload-default settings; Shorts-specific tooling; Content-ID claims (CMS only)

## Google Cloud setup (ordered)

The console moved OAuth settings to **APIs & Services → Google Auth Platform** (tabs: **Branding / Audience / Clients / Data Access**); the old single "OAuth consent screen" wizard is gone.

1. **Project** — `console.cloud.google.com`, sign in as the account in the channel's Workspace org → project picker → **New Project** (pick the org) → select it.
2. **Enable API** — Menu → **APIs & Services → Library** → search **"YouTube Data API v3"** → **Enable**.
3. **Consent screen** — Menu → **Google Auth Platform → Branding** → **Get Started**; set **App name** + **User support email**.
4. **Audience** → user type **Internal** (recommended; Workspace org only). Contact email → finish; accept the User Data Policy.
5. **Scopes** — **Data Access → Add or remove scopes** → add the minimum (e.g. `youtube.upload`, and `youtube` and/or `youtube.force-ssl`) → Update → Save.
6. **Client** — **Clients → Create client** → Application type **Desktop app** (for a local/headless agent; loopback redirect, OOB is dead) or **Web application** (then add exact **Authorized redirect URIs**). **Download** the client-secret JSON.
7. **Mint the refresh token (one time)** — run the consent flow as the channel-owning account with `access_type=offline&prompt=consent` (PKCE for Desktop). Exchange the code at `https://oauth2.googleapis.com/token`; persist the **refresh token** as a gitignored secret. If the account manages multiple channels, **select the right (Brand Account) channel** during consent.
8. **Store secrets** — client JSON + refresh token under the repo's gitignored `credentials/youtube/<id>/`. Never commit.

## Sources
developers.google.com/youtube/v3: `guides/auth/installed-apps`, `guides/authentication`, `determine_quota_cost`, `docs/videos/insert`, `docs/channels/update`, `guides/quota_and_compliance_audits`. developers.google.com/identity: `protocols/oauth2/production-readiness/sensitive-scope-verification`, `protocols/oauth2/scopes`. developers.google.com/workspace/guides/configure-oauth-consent. support.google.com/cloud/answer/15549945 (Testing vs In production, 7-day token).
