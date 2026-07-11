# 02 · Agent / API control — the honest reality

> Company-agnostic. The load-bearing truth about operating LinkedIn programmatically. LinkedIn's Developer Platform is **heavily gated and changes often** — every access claim here is **[VERIFY LIVE]** against `developer.linkedin.com` at setup time. Do **not** promise "agents run the page" until the product below is actually granted.

## TL;DR (don't fight these)

- **YouTube let us in; LinkedIn makes us apply.** There is **no** "Internal app" trick and **no** long-lived, self-issued, full-control token.
- **Posting as a Company Page** requires the **Community Management API** (part of the Marketing Developer Platform). You **apply**, LinkedIn **reviews**, and a Page **Super admin verifies the app** against the Page. Approval is **not guaranteed** and can take days to weeks.
- **Posting as a person** (`w_member_social`, the "Share on LinkedIn" product) is easier to get but posts **as that member only**, not as the Page.
- **Tokens are short-lived:** access tokens ~**60 days**; Marketing refresh tokens up to ~**12 months**, then re-auth. Plan for re-consent; there is no non-expiring credential.
- **Pragmatic default:** launch **human-operated** (a Super/Content admin publishes), or via a **reputable scheduler** (Buffer / Hootsuite / Sprout / Taplio) that rides its *own* approved API access. Pursue our own API grant as a *parallel* track, not a launch blocker.

## The products & scopes (as of 2026-07-06 — [VERIFY LIVE])

| You want to… | Product to request | Key scopes | Gate |
|---|---|---|---|
| Post/read **as the Company Page**, comment, read org analytics | **Community Management API** | `w_organization_social`, `r_organization_social`, `rw_organization_admin` | **Review + app verification by a Page admin.** Hardest. |
| Post **as a person** (the authorizing member) | **Share on LinkedIn** | `w_member_social` | Self-serve-ish (Sign In with LinkedIn + product add) |
| Basic identity / "Sign in" | **Sign In with LinkedIn using OpenID Connect** | `openid`, `profile`, `email` | Self-serve |
| Ads | **Advertising API** | `rw_ads`, `r_ads_reporting` | Separate review |

**What is UI-only in practice:** editing the Page's **logo, cover image, tagline, About/description, custom button, industry, and locations** is done in the Page admin UI. Some org fields are technically reachable via the `organizations`/`organizationAcls` endpoints with `rw_organization_admin`, but treat page-branding edits as **human-in-UI** unless you have confirmed the specific field works live. [VERIFY LIVE]

## How to apply (Company Page posting) — the real steps

1. **developer.linkedin.com → Create app.** Associate it with the **Company Page** (the app must be linked to a Page you administer).
2. **Verify the app**: LinkedIn generates a verification URL the app's Page **Super admin** must open/confirm. Do this from the owner account.
3. **Products → request "Community Management API"** (and "Sign In with LinkedIn using OpenID Connect" for auth). Fill the use-case honestly. **Wait for review.**
4. Once granted: implement **OAuth 2.0 (Authorization Code)** — member signs in, you get an **access token (~60d)** + **refresh token (~12mo)**. Scopes = the org-social set above.
5. Post via the **`/rest/posts`** (or `ugcPosts`) endpoint with an `author` of `urn:li:organization:<id>`.
6. Store secrets under gitignored `credentials/linkedin/<id>/` — never in the tenant tree, never committed.

## Durability & security notes

- **No Internal-app exemption** exists like YouTube's. Expect to **re-authorize** on the token cadence above; build a re-consent reminder, don't assume unattended forever.
- Tokens that post as an org act with real reach — treat them like the YouTube refresh token: least-privilege scopes, gitignored only, revocable, rotated.
- **Automation hygiene:** LinkedIn actively restricts accounts using scraping / auto-connect / auto-DM tooling. Stay on first-party APIs and reputable schedulers. A restricted founder profile or page is far more expensive than slower posting.

## Recommendation for a fresh tenant

Ship the presence **now, human-operated**, with agents doing everything up to the publish click (draft copy, produce assets, queue in a scheduler). Open the **Community Management API** application in parallel. Wire our own agent posting **only after** the grant + app verification succeed, and record the concrete config in the tenant's `agents/README.md` then. Under-promise here; this is the one place LinkedIn will make a "should work" plan fail.
