# {{COMPANY}} — LinkedIn config

> Data sheet for one company's LinkedIn presence. Copy to `tenants/<id>/linkedin-config.md` and fill. The playbook reads these values; the setup guide pastes them. Mark human-judgment values **[CONFIRM]**.

## Scope
- **Surface(s) in scope:** {{SURFACES}}  _(Company Page / +founder profile)_
- **Founder profile owner (if in scope):** {{FOUNDER}}

## Identity
- **Page name (display):** {{PAGE_NAME}}
- **Public URL slug:** linkedin.com/company/{{SLUG}}
- **Owning member (first Super admin):** {{OWNER}}
- **Backup Super admin (continuity):** {{BACKUP_ADMIN}}
- **Content admins (operators):** {{CONTENT_ADMINS}}

## Public copy
- **Tagline (≤120 chars):** {{TAGLINE}}
- **About / Overview (≤2,000 chars):** {{ABOUT}}
- **Website:** {{WEBSITE}}
- **Custom button (label → URL):** {{BUTTON}}
- **Community hashtags (≤3):** {{HASHTAGS}}

## Settings
- **Industry:** {{INDUSTRY}}
- **Company size:** {{SIZE}}
- **Company type:** {{TYPE}}
- **Founded (year, or blank):** {{FOUNDED}}
- **HQ location:** {{HQ}}
- **Other locations:** {{LOCATIONS}}

## Brand assets (for CREATE to produce the images)
- **Logo / mark source files:** {{LOGO_PATHS}}
- **Palette (hex + roles):** {{PALETTE}}
- **Typography:** {{FONTS}}
- **Logo (300×300) concept:** {{LOGO_CONCEPT}}
- **Cover (1128×191, center-band safe) concept:** {{COVER_CONCEPT}}
- **(If profile) photo + background concept:** {{PROFILE_ASSET_CONCEPT}}

## Strategy
- **Cadence:** {{CADENCE}}
- **Content pillars:** {{PILLARS}}
- **First post:** {{FIRST_POST}}
- **CTA / funnel destination:** {{FUNNEL}}
- **Measurement:** {{METRICS}}

## Voice & compliance
- **Voice/tone:** {{VOICE}}
- **Banned terms / don'ts:** {{DONTS}}

## Agent control
- **Posting model (now):** human-in-the-loop / scheduler — {{POSTING_MODEL}}
- **Community Management API application:** {{API_STATUS}}  _(not started / applied / granted)_
- **Secrets location (gitignored):** credentials/linkedin/{{ID}}/
