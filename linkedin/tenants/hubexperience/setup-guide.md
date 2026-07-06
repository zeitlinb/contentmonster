# The HUB Experience Company — LinkedIn Company Page setup guide

> A self-contained, click-by-click guide to stand up HEC's LinkedIn **Company Page** the right way for a team to operate. Print and follow top to bottom.
>
> **Page:** linkedin.com/company/**hubexperienceco** · **Public face / owner:** Tully Zeitlin · **Backup admin:** Brad Zeitlin.
> **Legend:** **[CONFIRM]** = a Brad/Tully decision before you act · **[VERIFY LIVE]** = LinkedIn's UI/limits drift; confirm on-screen.
> _Ground truth verified against LinkedIn Help Center + Developer docs on 2026-07-06. LinkedIn's page UI, image specs, and API tiers change often — re-confirm flagged steps live._

---

> **▶ EXECUTION STATUS (HEC — 2026-07-06):** Page **exists** and is administered by **Tully**; the **public URL is already `hubexperienceco`** (Tully changed it 2026-07-06 → linkedin.com/company/hubexperienceco). **Remaining:** add Brad as backup Super admin · upload logo + cover · enter tagline/About/settings · publish the first post. Copy + first post are **drafted** in [`linkedin-config.md`](linkedin-config.md) + [`content-strategy.md`](content-strategy.md), pending Brad/Tully sign-off. Agent posting is **gated** (human-in-the-loop launch — see [`agents/README.md`](agents/README.md)).

## What you'll end up with
- A **Company Page** at `linkedin.com/company/hubexperienceco`, fully branded (logo + cover), with tagline, About, settings, a custom button, and the brand hashtag.
- **≥2 Super admins** (Tully + Brad) so the page survives any one person leaving.
- A **first post** live (or scheduled), so the page isn't empty when traffic arrives.
- A clear, honest posting model (human-in-the-loop now; Community Management API pursued in parallel).

## Before you start (Phase 0 — confirm these)
- **Page name:** `The HUB Experience Company` ✅
- **Public URL:** `hubexperienceco` ✅ (already set)
- **Owner / Super admin #1:** Tully ✅ · **Backup Super admin:** Brad **[CONFIRM]**
- **[CONFIRM]** the DRAFT tagline, About, custom button, industry, company size, founded year, HQ (all in `linkedin-config.md`).
- **Produce the 2 images first** (Phase 3 needs them): `logo-300.png` + `cover-1128x191.png` — render per [`assets/README.md`](assets/README.md).

---

## Phase 1 — Confirm admin + continuity
1. Tully signs in and opens **linkedin.com/company/hubexperienceco** → she should see **Admin tools** (top-right). If not: page → **More → Request admin access** [VERIFY LIVE].
2. **Add Brad as a 2nd Super admin** (continuity — a page with one admin who loses access is a support headache): **Admin tools → Manage admins → Page admins → Add admin →** search Brad (he must be **connected to Tully** or **follow the page** to appear) → role **Super admin** → **Save**. **[CONFIRM]**
3. Add any day-to-day operators as **Content admins** (post/edit, no admin control).

> Keep **≥2 Super admins** at all times.

---

## Phase 2 — Branding (Admin tools → Edit page)
Upload the two produced images. **[VERIFY LIVE]** the size numbers on upload.

| Asset | File | Spec |
|---|---|---|
| **Logo** ("bio image") | `assets/SELECTED--logo-300x300.png` | **Logo B** — cream "H" on sage `#667263`; 300×300; reads at ~60px; PNG ≤8 MB |
| **Cover** ("header image") | `assets/SELECTED--cover-1128x191.png` | **green-field statement cover**; 1128×191 (~6:1); text in the center band, clear of the lower-left ~320×120 (logo overlap) + edges; PNG ≤8 MB |

1. **Edit page → Logo →** upload `SELECTED--logo-300x300.png` → **Save**.
2. **Cover image →** upload `SELECTED--cover-1128x191.png` → confirm the message isn't clipped by the logo overlap → **Save**.
3. **View the live page on desktop and mobile** — re-crop if the cover message is obstructed.

> Logo/cover are set in the **admin UI** (not the API). **Selected 2026-07-06 (Brad): Logo B + the green `#667263` statement cover** (alternates live in `assets/variants/`). The "H" is a labeled **interim** monogram — swap in the final HEC emblem when Brad/Tully select it (keep the same filename).

---

## Phase 3 — Public copy & settings (Admin tools → Edit page → Page info / About)
Paste from `linkedin-config.md` (get **[CONFIRM]** sign-off first). **Save** each section, then view the live page.

- **Tagline (≤120):** `We are Memory Makers. The experience layer for developers, owners & operators.`
- **About (≤2,000):** paste the DRAFT block from `linkedin-config.md` (front-loaded; first ~2 lines show before "see more").
- **Website:** `https://hubexperienceco.com`
- **Industry [CONFIRM]:** recommended `Events Services` (alts: `Entertainment Providers`, `Hospitality`).
- **Company size [CONFIRM]:** set what's true (likely `2-10 employees`).
- **Company type:** `Privately Held`.
- **Founded [CONFIRM]:** recommend **leave blank** (a "2026" year undercuts the 11-year, not-a-startup positioning).
- **HQ location [CONFIRM]:** recommended `Nashville, TN`.
- **Custom button [CONFIRM]:** recommended `Contact us` → `https://hubexperienceco.com` (matches "Get in touch"; avoid "Sign up").
- **Community hashtags (≤3):** `#WeAreMemoryMakers` + **[CONFIRM]** up to 2 more (`#ExperienceOperators`, `#ActivatedSpace`) only if non-saturated + approved.

**Trust:** if LinkedIn offers to **verify the page** (work email on the company domain / company-verification flow), do it [VERIFY LIVE]. Make sure **≥1 employee** lists HEC as their current employer (populates the People section, links profiles ↔ page).

---

## Phase 4 — First post (don't launch to an empty page)
1. Get **[CONFIRM]** sign-off on the first post (drafted in [`content-strategy.md`](content-strategy.md)).
2. Produce its visual (the "We are Memory Makers." card, or — recommended — the real HUB movie-night photo per the photography doctrine).
3. **Post as the Page** (Tully, as admin) → paste the copy → attach the visual → confirm the link + `#WeAreMemoryMakers` → **Post** (or schedule).

---

## Phase 5 — Posting model / agent control (read the honest version)
- **Now:** human-in-the-loop — agents draft copy + assets; Tully (Super/Content admin) publishes. Live today, no LinkedIn approval needed.
- **Programmatic Page posting is gated:** the **Community Management API** requires a developer app associated with the page, a Super-admin **app verification**, and LinkedIn's **review of an application**. No YouTube-style Internal-app shortcut. Pursue in parallel; don't block launch. Full detail: [`agents/README.md`](agents/README.md) + [`../../playbook/02-agent-control-api.md`](../../playbook/02-agent-control-api.md).

---

## Phase 6 — Launch checklist (HEC)
- [ ] Tully = Super admin; **Brad added as 2nd Super admin** (Phase 1)
- [ ] `logo-300.png` + `cover-1128x191.png` uploaded + saved; checked desktop + mobile (Phase 2)
- [ ] Tagline, About, Website, Industry, Size, Type, Founded, HQ, Button, Hashtags set (Phase 3)
- [ ] Page verified if offered; ≥1 employee lists HEC (Phase 3)
- [ ] First post approved + its visual produced + posted/scheduled (Phase 4)
- [ ] Posting model understood: human-in-the-loop now; API in parallel (Phase 5)
- [ ] No banned terms / off-brand claims anywhere; all [CONFIRM] values signed off

---

## Appendix A — copy/paste block
- **Name:** `The HUB Experience Company`
- **URL:** `linkedin.com/company/hubexperienceco`
- **Tagline:** `We are Memory Makers. The experience layer for developers, owners & operators.`
- **About:** (the DRAFT block in `linkedin-config.md`)
- **Website / Button target:** `https://hubexperienceco.com`
- **Primary hashtag:** `#WeAreMemoryMakers`

## Appendix B — asset specs
| Asset | Size | Format | Limit | Where |
|---|---|---|---|---|
| Logo | 300×300 | PNG/JPG | ≤8 MB [VERIFY] | Edit page → Logo |
| Cover | 1128×191 (center-band safe; avoid lower-left ~320×120) | PNG/JPG | ≤8 MB [VERIFY] | Edit page → Cover |
| Post image | 1200×1200 or 1200×627 | PNG/JPG | — | Per post |

## Appendix C — provenance & caveats
Sources: LinkedIn Help Center (Pages), `developer.linkedin.com` (Community Management / Marketing APIs). Verified 2026-07-06. LinkedIn UI labels, image specs, and — especially — API access tiers drift; treat **[VERIFY LIVE]** items as confirm-on-screen and don't promise agent-posting until the API product is granted.

---
_Generate the printable PDF into `dist/`: from the gstack repo's make-pdf — `pdf generate --cover --toc <this file> dist/hec-linkedin-setup-guide.pdf` (write to an allowed path, then copy)._
