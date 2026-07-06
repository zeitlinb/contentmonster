# LinkedIn channel ops

> A reusable module for standing up and operating **LinkedIn presences for any company in the empire**. The HUB Experience Company is tenant #1; every other company plugs in the same way.
>
> _Last verified against LinkedIn's Help Center + Developer docs: 2026-07-06. LinkedIn's page UI, image specs, and (especially) its API access tiers change often and are heavily gated — treat the playbook as ground-truth-as-of-that-date and re-confirm the load-bearing steps live._

## Where this fits

Sibling to [`../youtube/`](../youtube/). In the empire operating model ([`../docs/core-charter/empire-operating-model.md`](../docs/core-charter/empire-operating-model.md)):

- **CREATE (ContentMonster)** is the **engine**. It produces the assets a presence needs — the logo, cover image, post visuals, and video — and holds the reusable standup playbook. That's this module's core job.
- The companies (HUB Experience, Constellation, …) are **tenants**: each owns its brand/offer and *consumes* this module. The first tenant is `tenants/hubexperience/`.
- **DISTRIBUTE (GTM Machines)** is the eventual home for *running* presences at scale (publishing cadence, cross-company ops). Standup lives here for now as a durable, reusable playbook; building it tenant-aware means an eventual migration is a move, not a rewrite.

## LinkedIn ≠ YouTube (read this before you assume parity)

The YouTube module maps one company → one channel with near-full agent/API control via an Internal Workspace OAuth app. **LinkedIn is different on two axes**, and the playbook is built around the honest version:

1. **Two possible surfaces per company:** a **Company Page** (the brand's home) and one or more **personal profiles** (the founder/leaders who front the brand). They have *different* image specs and *different* copy fields. A tenant declares which surface(s) are in scope; assets and copy are produced per surface.
2. **Agent control is gated, not free.** There is no "Internal app" shortcut. Programmatic posting **as a Page** requires LinkedIn's **Community Management API** (Marketing Developer Platform), which is **application-and-review gated** and not guaranteed. The realistic near-term model is human-in-the-loop (or an approved third-party scheduler), with the API as a parallel application track. Full, honest breakdown in [`playbook/02-agent-control-api.md`](playbook/02-agent-control-api.md) — do not promise "agents run the page" until the API product is actually granted.

## Layout

```
linkedin/
  README.md                     ← you are here
  playbook/                     ← reusable, company-agnostic (the "how")
    01-account-and-access.md      Page roles (super/content/analyst admins) + personal-profile owners + agent access model
    02-agent-control-api.md       LinkedIn API reality — what's API- vs UI-controllable, and the gating (the honest one)
    03-presence-creation.md       create/claim the Company Page (+ optional founder profile) — UI steps
    04-branding-assets.md         logo / cover (Page) + profile photo / background (profile) — specs + upload
    05-profile-copy-settings.md   name, tagline, About, URL, industry, location, button, hashtags, verification
    06-launch-checklist.md        pre-launch gate
  templates/
    tenant-config.template.md     blank data sheet for the next company
    NEW-TENANT.md                 how to onboard a new company in ~30 min
  scripts/                        (reserved) shared helpers — populated when/if the Community Management API is granted
  tenants/
    hubexperience/              ← tenant #1
      setup-guide.md              the self-contained, printable, HEC-specific guide
      linkedin-config.md          the concrete values (name, tagline, About, URL, brand, copy)
      content-strategy.md         cadence + first posts (incl. the first post, written)
      assets/README.md            exactly which images to produce + specs + source files + render scripts
      agents/README.md            agent/API control config for this presence (no secrets committed)
      dist/                       generated artifacts (the printable PDF)
```

**Reusable knowledge** lives in `playbook/`. **Per-company instances** live in `tenants/<id>/`. To run this for a new company you copy the template, fill the config, follow the playbook, and produce the assets — the playbook never changes per company.

## Onboard a new company

See [`templates/NEW-TENANT.md`](templates/NEW-TENANT.md). Short version:
1. `mkdir -p tenants/<id>/{assets/fonts,agents,dist}` and copy `templates/tenant-config.template.md` → `tenants/<id>/linkedin-config.md`.
2. Fill `linkedin-config.md` with that company's name, URL, tagline, About copy, brand colors, asset sources, and **which surface(s)** are in scope.
3. Follow `playbook/01`→`06` using those values; produce the assets per a copy of `tenants/hubexperience/assets/README.md`.
4. Write the setup guide (copy `tenants/hubexperience/setup-guide.md`, swap the values) and generate the printable PDF into `tenants/<id>/dist/`.

## Agent control (the honest point)

Brad wants agents to operate these presences. Unlike YouTube, LinkedIn does not hand that over easily:
- **Personal "Share on LinkedIn"** (`w_member_social`) posts as a **person**, not a page — and only for the authorizing member.
- **Posting as the Company Page** needs `w_organization_social` / `rw_organization_admin`, which live behind the **Community Management API** product — you **apply**, LinkedIn **reviews**, and a Page admin **verifies the app** against the Page. Approval is not guaranteed and can take time.
- **Tokens are short-lived** vs. YouTube: access tokens ~60 days; Marketing refresh tokens up to ~1 year (then re-auth). There is no non-expiring equivalent.
- **Pragmatic path:** ship the presence human-operated (or via an approved scheduler like Buffer/Hootsuite, which ride their *own* granted API access); pursue Community Management API access as a parallel track; only wire our own agent posting once it's actually granted. See [`playbook/02-agent-control-api.md`](playbook/02-agent-control-api.md).

## Secrets

Never commit credentials. Any OAuth client secret / access + refresh tokens live under the repo's gitignored `credentials/` dir (e.g. `credentials/linkedin/<id>/`), mirroring the YouTube module. Each tenant's `agents/README.md` says exactly what goes where. Brand assets (logo, cover, post visuals) are **not** secrets and may be committed.
