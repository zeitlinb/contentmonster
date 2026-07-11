# 05 · Public copy & settings

> Company-agnostic. The Company Page text fields + settings, with character limits and where each shows. Tenant provides the actual words in `linkedin-config.md`. **[VERIFY LIVE]** limits at entry — LinkedIn enforces them live and occasionally revises.

## Company Page — fields

| Field | Limit (approx) | Where it shows | Notes |
|---|---|---|---|
| **Name** | 100 chars | Everywhere | Exact legal/brand name. Changing it later can affect trust signals — set it right. |
| **Public URL slug** | — | `linkedin.com/company/<slug>` | The canonical handle. Availability-checked; changing breaks old links (see [`03`](03-presence-creation.md) C). |
| **Tagline** | **120 chars** | Directly under the name on the page + in search/preview | The single highest-leverage line. Say what the company is + who it's for. |
| **About / Overview (description)** | **2,000 chars** | The "About" section | The full story. Lead with the brand's primary line; end with the CTA. First ~2 lines show before "see more" — front-load. |
| **Website** | URL | Button + info | Use `https://`. |
| **Industry** | pick-list | Info + search filters | Choose the closest true industry (affects discovery). |
| **Company size** | pick-list | Info | Factual headcount band. |
| **Company type** | pick-list | Info | e.g. Privately Held. |
| **Founded (year)** | year | Info | Optional. For a company that inherits a longer operating heritage than its legal entity age, this is a judgment call — leave blank or use the heritage year; don't undercut positioning with a "new" year. |
| **Locations** | — | Info + map | HQ first; add others as they open. |
| **Custom button** | pick-list + URL | Beside the name | Options like *Visit website / Contact us / Learn more / Sign up / Register*. Pick the one that matches the brand's CTA posture (avoid SaaS-y "Sign up" for a non-SaaS brand). |
| **Community hashtags** | up to **3** | Lets the page post/engage *as the page* under those tags | Own the brand's core tag from day 1; add 1–2 non-saturated relevant tags. |

## Setup order (in the admin UI)
1. **Admin tools → Edit page → Page info**: Name, Tagline, Public URL, Website, Industry, Size, Type, Founded, Locations.
2. **About**: paste the 2,000-char description.
3. **Buttons**: choose the custom button + URL.
4. **Hashtags** (Page feed → "Hashtags"): add up to 3.
5. **Save** each section; then **view the live page** and confirm the first two lines of About + the tagline read well truncated.

## Verification & trust (do these to look legitimate)
- **Verify the Page** if prompted (work email on the company domain / LinkedIn's company-verification flow) — raises trust and can unlock features. [VERIFY LIVE]
- Ensure **≥1 associated employee** lists the company as their current employer (links profiles ↔ page, adds a "People" section).
- Post at least one substantive post **before** driving traffic — an empty page reads as abandoned.

## Founder profile — copy fields (only if in scope)
| Field | Limit | Notes |
|---|---|---|
| **Headline** | **220 chars** | Under the name. Role + hook + who-it's-for. Reuse the brand's locked positioning line. |
| **About** | **2,600 chars** | First-person, leader voice; front-load the first 3 lines (rest is behind "see more"). |
| **Custom URL** | — | `linkedin.com/in/<vanity>` — set a clean vanity. |
| **Experience** | — | Current position = the company, so the profile links to the page. |

## Compliance
Honor the tenant's locked voice + banned-terms list (from its brand doctrine). Nothing on a public field should violate the brand's "do not say" rules. When a value needs a human decision (industry, size, founded year, button), mark it **[CONFIRM]** in the tenant config and get sign-off before publishing.
