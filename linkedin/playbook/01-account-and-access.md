# 01 · Account & access model

> Company-agnostic. How a LinkedIn presence is owned and who (people + agents) can act on it. Re-verify labels live — LinkedIn's admin UI drifts. **[VERIFY LIVE]** = confirm on-screen.

## The two surfaces

A company on LinkedIn can have up to two kinds of surface. A tenant declares which are in scope (`linkedin-config.md`).

| Surface | What it is | Who owns it | Admin model |
|---|---|---|---|
| **Company Page** | The brand's home (`linkedin.com/company/<slug>`) | The company, via **page admins** | Roles below |
| **Personal profile(s)** | A founder/leader who fronts the brand | The individual **member** | The member controls it; no "roles" — delegation is informal or via a scheduler |

> A Company Page **cannot exist on its own** — it must be created and administered *by a personal LinkedIn member* who becomes its first Super admin. There is no "brand account" that stands apart from a person (unlike a YouTube Brand Account). Continuity therefore depends on **keeping ≥2 Super admins**, so the Page survives any one person leaving.

## Company Page roles (the important ones)

LinkedIn splits Page admins into two families — **Page admins** (manage the page) and **Paid media admins** (ads). For standup you care about Page admins:

| Role | Can do | Give to |
|---|---|---|
| **Super admin** | Everything: edit the page, manage all admins, post, delete the page | The owner(s) + a backup. **Keep ≥2.** |
| **Content admin** | Post, comment, edit some content — **cannot** manage admins or core settings | Day-to-day operators |
| **Analyst** | View analytics only | Anyone who needs reporting, read-only |
| **(Paid) Campaign manager / Creative manager / etc.** | Ads only | Only if running paid |

**Continuity rule (do this immediately after creation):** add a **second Super admin** as backup. A Page with a single Super admin who loses access is a recovery-support headache; two Super admins removes that single point of failure.

**How to add an admin:** Page → **Admin tools** (top right) → **Manage admins** → **Page admins** tab → **Add admin** → search the person (you must be connected, or they follow the page — LinkedIn requires an existing relationship) → pick the role → **Save**. [VERIFY LIVE]

## Personal profile(s)

If a founder profile is in scope, it is that person's own account. You cannot "add an admin" to a personal profile. Options for team/agent help:
- The person acts themselves (highest trust, lowest scale).
- A scheduler (Buffer, Hootsuite, Taplio, etc.) with the person's granted auth drafts/queues; the person approves.
- **Never** share a personal password or run automation that violates LinkedIn's User Agreement (aggressive auto-connect/auto-DM tools get profiles restricted). Keep automation to first-party APIs and reputable schedulers.

## Where agents fit

Agents are **not** added as page admins. Programmatic access is a separate, gated track — see [`02-agent-control-api.md`](02-agent-control-api.md). Until that API is granted, treat posting as a **human-in-the-loop** step: agents draft copy + produce assets; a Super/Content admin publishes.

## Prerequisites checklist
- [ ] A personal LinkedIn member to create/own the Page (the owner)
- [ ] A second member lined up as **backup Super admin**
- [ ] The two connected to each other / following the page (so admin-add works)
- [ ] Decision: which surface(s) in scope (Page only / +founder profile)
- [ ] Company verification info ready (LinkedIn may prompt to **verify the Page** via a work email on the company domain or the **CLEAR/company-verification** flow — speeds trust + unlocks some features) [VERIFY LIVE]
