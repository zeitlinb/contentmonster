# YouTube channel ops

> A reusable module for standing up and operating **YouTube channels for any company in the empire**, with **AI-agent control** as a first-class goal. Constellation is tenant #1; every other company plugs in the same way.
>
> _Last verified against Google/YouTube docs: 2026-06-28. Google's Cloud Console, YouTube Studio UI, and API quota shift often — treat the playbook as ground-truth-as-of-that-date and re-confirm the load-bearing steps live._

## Where this fits

In the empire operating model ([`../docs/core-charter/empire-operating-model.md`](../docs/core-charter/empire-operating-model.md)):

- **CREATE (ContentMonster)** produces the assets a channel needs — the videos (HyperFrames), profile picture, banner, thumbnails. That's this repo's core job.
- **DISTRIBUTE (GTM Machines)** is the eventual home for *running* channels at scale (publishing cadence, cross-company channel ops). Channel **standup** lives here for now as a durable, reusable playbook; it may migrate to the DISTRIBUTE engine later. Building it tenant-aware now means that migration is a move, not a rewrite.

A company is a **tenant**: it owns its brand/offer and *consumes* this module. The first company (Constellation) is `tenants/constellation/`.

## Layout

```
youtube/
  README.md                     ← you are here
  playbook/                     ← reusable, company-agnostic (the "how")
    01-account-and-access.md      Workspace admin + Brand Account + team/agent access model
    02-agent-control-api.md       Google Cloud + OAuth + scopes + quota + what is API- vs UI-controllable
    03-channel-creation.md        create the channel as a Brand Account (UI steps)
    04-branding-assets.md         profile picture / banner / watermark specs + upload
    05-customization-settings.md  handle, name, description, links, contact, keywords, country, verification
    06-launch-checklist.md        pre-launch gate
  templates/
    tenant-config.template.md     blank data sheet for the next company
    NEW-TENANT.md                 how to onboard a new company in ~30 min
  tenants/
    constellation/              ← tenant #1
      setup-guide.md              the self-contained, printable, Constellation-specific guide
      channel-config.md           the concrete values (name, handle, copy, colors, keywords)
      assets/README.md            exactly which images to produce + specs + source files
      agents/README.md            agent/API control config for this channel (no secrets committed)
      dist/                       generated artifacts (the printable PDF)
```

**Reusable knowledge** lives in `playbook/`. **Per-company instances** live in `tenants/<id>/`. To run this for a new company you copy the template, fill the config, follow the playbook, and produce the assets — the playbook never changes per company.

## Onboard a new company

See [`templates/NEW-TENANT.md`](templates/NEW-TENANT.md). Short version:
1. `cp -r tenants/constellation tenants/<new-id>` (then clear the values) — or start from `templates/tenant-config.template.md`.
2. Fill `tenants/<new-id>/channel-config.md` with that company's name, handle, copy, brand colors, asset sources.
3. Follow `playbook/01`→`06` using those values; produce the assets per `assets/README.md`.
4. Generate the printable guide PDF into `tenants/<new-id>/dist/`.

## Agent control (the point)

Brad wants agents to operate these channels. The honest shape, verified against current docs:
- **Service accounts do NOT work** for a normal channel (`NoLinkedYouTubeAccount`). Agents authenticate with **OAuth 2.0 user credentials → a long-lived refresh token** for an account that owns/manages the channel.
- Use an **"Internal" OAuth app** inside the channel's own Google Workspace org (e.g. `runconstellation.com`) to avoid Google app-verification, the 100-test-user cap, **and** the 7-day refresh-token expiry that kills unattended agents.
- The **YouTube Data API v3** controls uploads, metadata, thumbnails, playlists, captions, channel keywords/description/banner, watermark, comments. A few things are **UI-only** (notably the channel **avatar/profile picture**, Community posts, end screens, monetization). Full breakdown in [`playbook/02-agent-control-api.md`](playbook/02-agent-control-api.md).

## Secrets

Never commit credentials. OAuth client-secret JSON and refresh tokens live under the repo's gitignored `credentials/` dir (e.g. `credentials/youtube/<id>/`), mirroring [`../docs/runbooks/google-drive-setup.md`](../docs/runbooks/google-drive-setup.md). Each tenant's `agents/README.md` says exactly what goes where.
