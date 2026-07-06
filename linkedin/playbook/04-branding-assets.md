# 04 · Branding assets — specs & upload

> Company-agnostic image specs. CREATE (ContentMonster) produces these from the tenant's brand; drop outputs in the tenant's `assets/`. LinkedIn shows live validation on upload — **[VERIFY LIVE]** the numbers at upload time; LinkedIn revises them periodically.

## Company Page assets

| Asset | Recommended size | Displays as | Format / limit | Notes |
|---|---|---|---|---|
| **Logo** | **300 × 300 px** (square) | square with slightly rounded corners; small (~60–70px) in feed + on the page | PNG or JPG, ≤ 8 MB | This is the "bio image." Must read at tiny sizes — mark/monogram, not a full wordmark. Generous padding. |
| **Cover image** | **1128 × 191 px** (~6:1) | full-width band at the top of the page | PNG or JPG, ≤ 8 MB | This is the "header image." **The logo overlaps the lower-left**, and LinkedIn crops the band responsively — keep all text/key content **centered-to-right and out of the lower-left ~320px**. No borders/shadows. |

### The cover "safe area" (the LinkedIn analog of YouTube's 1235×338)
On the 1128 × 191 cover, treat the **lower-left ~320 × 120 px** as **obstructed** (the logo badge + page name sit there on desktop) and expect **horizontal responsive crop** on narrow layouts. Compose so the message survives both: hold the wordmark/tagline in the **center band**, nothing critical in the lower-left or the extreme edges. A render script should output a `-safearea-preview.png` marking the obstructed zone (mirrors the YouTube banner preview pattern).

## Personal profile assets (only if the founder profile is in scope)

| Asset | Recommended size | Displays as | Format / limit |
|---|---|---|---|
| **Profile photo** | **400 × 400 px** (square, ≥ 400; up to very large ok) | circle | PNG/JPG, ≤ 8 MB |
| **Background / cover** | **1584 × 396 px** (4:1) | banner behind the top of the profile | PNG/JPG, ≤ 8 MB |

Profile photo = a real, well-lit headshot of the person (LinkedIn is a face-first surface; do not use a logo as a person's photo). Background = brand-consistent, low-noise, text-light (the photo + headline overlay it).

## Post visuals (for content, not the profile chrome)

| Use | Size | Notes |
|---|---|---|
| Single-image feed post | **1200 × 1200** (square) or 1200 × 627 (1.91:1) | Square/portrait tend to win more feed height. Legible on mute; one idea per image. |
| Document / carousel (PDF) | 1080 × 1080 per page (square) | Strong for B2B "how it works" explainers. |

## Upload (Company Page)
1. **Admin tools → Edit page.**
2. **Logo** → upload the 300×300 → position → **Save**.
3. **Cover image** → upload the 1128×191 → confirm the lower-left/edges aren't clipping key content → **Save**.
4. View the live page (and a mobile view) to confirm the cover crop + logo overlap look right. Re-crop if the message is obstructed.

> Logo/cover uploads are done in the **admin UI** — do not assume the API sets them (see [`02`](02-agent-control-api.md)). Treat as a human-in-UI step.

## Brand-fidelity rules (carry from the tenant's visual identity)
- Use the tenant's exact palette + type tokens (no substitutions). If a mark isn't finalized, produce a clearly-labeled **interim** logo from the wordmark/monogram and note it pending the final mark.
- Honor the tenant's anti-patterns (e.g. no pure white/black, no generic SaaS blue, no stock cliché).
- Keep filenames stable so the setup guide + tooling can reference them.
