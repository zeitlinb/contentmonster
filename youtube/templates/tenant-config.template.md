# {{COMPANY}} — YouTube channel config

> Data sheet for one company's channel. Copy to `tenants/<id>/channel-config.md` and fill. The playbook reads these values; the setup guide pastes them.

## Identity
- **Channel name (display):** {{CHANNEL_NAME}}
- **@handle (primary choice):** {{HANDLE}}
- **@handle (fallbacks, if taken):** {{HANDLE_FALLBACKS}}
- **Owning Google identity (Workspace):** {{OWNER_EMAIL}}
- **Backup owner (continuity):** {{BACKUP_OWNER_EMAIL}}
- **Workspace org / domain:** {{WORKSPACE_DOMAIN}}

## Public copy
- **Channel description:** {{DESCRIPTION}}
- **Links (title → URL; first = primary CTA):** {{LINKS}}
- **Contact email:** {{CONTACT_EMAIL}}
- **Channel keywords:** {{KEYWORDS}}
- **Country:** {{COUNTRY}}
- **Default video language:** {{LANGUAGE}}

## Brand assets (for CREATE to produce the images)
- **Logo source files:** {{LOGO_PATHS}}
- **Palette (hex + roles):** {{PALETTE}}
- **Typography:** {{FONTS}}
- **Profile picture concept:** {{AVATAR_CONCEPT}}
- **Banner concept (text inside 1235×338 safe area):** {{BANNER_CONCEPT}}

## Strategy
- **Cadence:** {{CADENCE}}
- **Content pillars:** {{PILLARS}}
- **First videos:** {{FIRST_VIDEOS}}
- **CTA / funnel destination:** {{FUNNEL}}
- **Measurement:** {{METRICS}}

## Voice & compliance
- **Voice/tone:** {{VOICE}}
- **Banned terms / don'ts:** {{DONTS}}

## Agent control
- **Cloud project name:** {{GCP_PROJECT}}
- **OAuth user type:** Internal (org-owned) / External
- **Scopes:** {{SCOPES}}
- **Secrets location (gitignored):** credentials/youtube/{{ID}}/
