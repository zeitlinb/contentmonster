# tenants/ — per-company state

> One folder per company in the empire. A tenant **consumes** the channel engines in
> [`../channels/`](../channels/); everything about one company's content operation
> lives here, in one place — that's the point of the tenant-first layout
> (ratified 2026-07-11; see
> [`../docs/core-charter/brainstorm/20260711-tenant-channel-matrix-scaffold.md`](../docs/core-charter/brainstorm/20260711-tenant-channel-matrix-scaffold.md)).

| Tenant | Company | Status |
|---|---|---|
| [`constellation/`](constellation/) | Constellation (runconstellation.com) | **Active** — YouTube channel LIVE (@runconstellation), agent API control live; video #1 is the open thread |
| [`hubexperience/`](hubexperience/) | The HUB Experience Company | **Active** — LinkedIn Company Page exists (/company/hubexperienceco); assets + first post built, awaiting Brad/Tully go-live |
| [`jaca/`](jaca/) | Jaca Sugar | **Archived** — ad-creative-era test tenant; wakes if/when the ad pipeline resumes |

## Anatomy of a tenant

```
tenants/<id>/
  channels/<ch>/   the per-channel binding: config, setup guide, channel assets,
                   agents/ (API control config), dist/ (printable guides)
  content/         produced content items (e.g. hubexperience/content/post-1/ —
                   the HEC first-post HyperFrames project)
```

Phase 2 of the re-org plan adds the cross-channel spine per tenant: `tenant.md`
(identity + **approvers** — who signs off before anything publishes), `brand/`
(pointers to the company repo's locked canon, never a forked copy), `strategy.md`
(voice + pillars), and `calendar.md` (the cross-channel queue).

**Onboarding a company onto a channel:** follow that channel's
`channels/<ch>/templates/NEW-TENANT.md` (~30 min + the platform's own gates).

**Sovereignty rule:** everything outward-facing (publishing, page settings, uploads)
is gated on the tenant's approvers. Agents prepare; humans approve; then agents
execute where the platform API allows.
