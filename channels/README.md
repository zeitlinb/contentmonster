# channels/ — reusable distribution engines

> One folder per distribution platform. Each is a **company-agnostic engine**: the
> playbook (standup, click-by-click), the honest agent-control/API reality, templates
> for onboarding the next company, and operate scripts where the platform's API allows.
>
> **The rule:** engines are channel-first, state is tenant-first. Nothing
> company-specific lives here — per-company instances live at
> [`../tenants/<id>/channels/<ch>/`](../tenants/). "You are the engine for them —
> they are a consumer of you."

| Channel | Status | Agent control |
|---|---|---|
| [`youtube/`](youtube/) | **Live** — engine complete; Constellation is tenant #1 | Full via YouTube Data API v3 (Internal OAuth app; refresh-token durability proven 2026-07-09) |
| [`linkedin/`](linkedin/) | **Live** — engine complete; HubExperience is tenant #1 | Gated — human-in-the-loop until the Community Management API is granted (see its `playbook/02`) |
| [`meta-ads/`](meta-ads/) | **Dormant seed** — spec retained from the ad-creative era | n/a until the ad pipeline resumes |

Planned next (ratified direction, 2026-07-11): `x/` (Twitter/X — pending Brad's
API-tier greenlight) and `web/` (owned authority-content surface — pending the
publishing-surface decision).

## Anatomy of an engine

```
channels/<ch>/
  README.md        what this platform is, honest constraints, where tenants live
  playbook/        01→06: account/access · agent-control API · creation ·
                   branding assets · copy/settings · launch checklist
  templates/       tenant-config data sheet + NEW-TENANT onboarding (~30 min)
  scripts/         operate/mint helpers, where the platform API permits
```

To add a new engine, mirror this anatomy (YouTube is the reference implementation;
LinkedIn shows how to handle a gated platform honestly). A formal `_TEMPLATE/`
scaffold lands in Phase 2 of the re-org plan
([`../docs/core-charter/brainstorm/20260711-tenant-channel-matrix-scaffold.md`](../docs/core-charter/brainstorm/20260711-tenant-channel-matrix-scaffold.md)).
