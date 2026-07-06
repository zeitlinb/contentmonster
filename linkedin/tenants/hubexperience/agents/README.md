# HEC LinkedIn — agent / API control

> How (and whether) agents operate this Page programmatically. Full rationale + limits in [`../../../playbook/02-agent-control-api.md`](../../../playbook/02-agent-control-api.md). **No secrets are committed.** Read this before promising anyone "the agent runs the page."

## The honest status (2026-07-06)
- **Posting model right now: human-in-the-loop.** Agents (Dewey / CREATE) draft copy + produce assets; a Page **Super/Content admin** (Tully) publishes. This is the launch model — it needs **no** LinkedIn approval and can go live today.
- **Programmatic Page posting is gated.** It requires LinkedIn's **Community Management API** (Marketing Developer Platform): create a developer app, associate it with this Page, have a Super admin **verify the app**, then **apply** for the product and **wait for LinkedIn's review**. No YouTube-style "Internal app" shortcut exists. Not a launch blocker — pursue in parallel.
- **Tokens are short-lived** if/when granted: access ~60 days, Marketing refresh ~12 months, then re-auth. No non-expiring credential.

## Concrete config (to fill once/if the API is granted)
| Item | Value |
|---|---|
| Developer app | _(pending — created at developer.linkedin.com, associated with linkedin.com/company/hubexperienceco)_ |
| App verified by | _(pending — Tully, Super admin)_ |
| Product requested | Community Management API (+ Sign In with LinkedIn / OpenID Connect for auth) |
| Scopes | `w_organization_social`, `r_organization_social`, `rw_organization_admin` |
| Org URN | `urn:li:organization:<id>` _(read from the API after grant)_ |
| Authorizing member | Tully (Super admin) |

## Secret layout (gitignored — only if/when the API is granted)
```
credentials/linkedin/hubexperience/
  client_secret.json     # from the LinkedIn developer app
  token.json             # access + refresh tokens
```
Never place these in the `linkedin/` tree (it's committed). Only under `credentials/`.

## Interim (before an API grant): reputable scheduler — optional
If Tully wants queued/scheduled posting before the API is granted, use a reputable scheduler (Buffer / Hootsuite / Sprout) that rides its **own** approved LinkedIn access. Agents prepare the copy + assets; the scheduler posts on Tully's approval. **Avoid** scraping / auto-connect / auto-DM tools — they get pages and profiles restricted.

## What agents can / can't do here
- **Can now:** draft all copy, produce every asset, prepare the exact post + settings values, stage them for a one-click human publish.
- **Can (only after Community Management API grant + verification):** create posts/comments as the Page, read org analytics.
- **Can't (UI / human):** upload logo & cover, edit page settings/About, add admins, verify the page — treat these as human-in-UI steps.

## Security (if/when tokens exist)
Least-privilege scopes; store only under `credentials/linkedin/hubexperience/`; revoke at the member's LinkedIn settings or by deleting the app; re-authorize on the token cadence (no unattended-forever assumption).
