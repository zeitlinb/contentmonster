# Playbook 01 — account & access model

> How to own a company YouTube channel so a **team + AI agents** can run it, and the company never loses control. Company-agnostic. _Verified 2026-06-28; re-confirm admin labels live._

## The decision: Brand Account, never a personal channel

Every Google Account that touches YouTube gets **one auto-created personal channel**, named after the account and managed by exactly one person. It **cannot be co-owned or cleanly transferred** — wrong for a company.

Create the channel as a **Brand Account** instead. A Brand Account channel:
- is a separate identity (not publicly tied to the underlying Google login),
- supports **multiple owners + managers**, each using their own Google account (no password sharing),
- survives any one person leaving.

The **2nd channel** under any Google Account is automatically a Brand Account — that's the mechanism we use.

## Two Workspace admin services must be ON (the #1 blocker)

The owning identity here is a Google **Workspace** user. A Workspace admin must enable **two separate** "Additional Google services" for the org unit (OU) that contains the user — enabling one is not enough:

`admin.google.com` → **Apps** → **Additional Google services** →
1. **YouTube** → Service status → **On** (for everyone, or for the user's OU)
2. **Brand Account** → enabled either by its own **Service status → On**, OR — common — via the **"Access to additional services without individual control"** umbrella. **Brand Account frequently has no individual row**; if the umbrella banner shows **On** (the default), Brand Account is already enabled. Only toggle a separate Brand Account row if one actually exists in the list.

Notes:
- Requires the **Service Settings / YouTube administrator** admin privilege.
- Changes can take **up to 48 hours** to propagate. "Can't create a channel" is usually this not having propagated, or one of the two services still off.
- **Don't expect a "Brand Account" row in every tenant** — it's often umbrella-governed (the list is alphabetical; if there's no entry between "Blogger" and "Campaign Manager," it's not individually listed, and the umbrella covers it).
- **Account maturity gate:** a Workspace user can create a channel only once the account is **≥30 days old OR ≥$30 USD has been processed** on billing (anti-abuse, not a paid tier; exempt for Education/Nonprofit).
- Neither YouTube nor Brand Account is a paid add-on — both are **free additional services on every Workspace edition**; the console's "ADD SERVICES" button is not a paywall.
- **Education editions only:** age-based access can block YouTube for under-18-designated accounts even when ON. Irrelevant for a standard business tenant.

## Two access layers (use both)

### Brand Account roles — `myaccount.google.com/brandaccounts`
Governs classic **ownership** + is the only place the *primary owner* transfers. ⚠️ **This page is often EMPTY for channels created the modern way** (Google now routes channel access through Studio Permissions below) — don't assume the channel is broken if nothing's listed. Use channel permissions for day-to-day owner/team adds.

| Role | Can | Use for |
|---|---|---|
| **Primary owner** (exactly 1) | everything incl. ownership transfer | the company's main identity |
| **Owner** | most actions + controls who manages | keep **≥1 besides primary** for continuity |
| **Manager** | use YouTube (post/manage video) | operators |
| **Communications manager** | like Manager but **CANNOT use YouTube** | ⚠️ never assign to video people |

**7-day rule:** to become/assign primary owner, both parties must have been an owner/manager for ≥7 days. Plan transfers ahead.

### Channel permissions — set in YouTube Studio → Settings → **Permissions**
Google's newer, more granular, more secure day-to-day access model (still requires the channel be a Brand Account; the primary owner opts in once).

| Role | Notes |
|---|---|
| **Owner** | everything incl. delete + manage permissions, but **cannot transfer ownership** (that's Brand-Account-only) |
| **Manager** | everything except delete channel; can manage permissions |
| **Editor** / **Editor (Limited)** | upload/edit/publish; Limited = no revenue data |
| **Subtitle Editor** | captions only |
| **Viewer** / **Viewer (Limited)** | read-only; Limited = no revenue data |

Add people: Studio → Settings → Permissions → **Invite** → email → role → send. **Invitations expire in 30 days.**

## Continuity rules (don't skip)
- Keep **≥2 owners** at all times (e.g. the primary Workspace identity **plus one backup company-controlled account**). A Brand Account left with **no active owners** is **suspended 21 days then deleted**, taking the channel with it. (Turning a user's admin Brand Account service off only *removes that user* when other owners remain — the account stays active; the delete path is triggered by losing the *last* owner. Keeping ≥2 owners is the protection.)
- Add the backup owner **immediately** after creating the channel, before launch.

## Where agents fit
Brand Account / channel-permission roles attach to **human-style Google accounts, not API principals**. Agents do **not** get a "role" — they act through **OAuth on behalf of an authorized account** (see [`02-agent-control-api.md`](02-agent-control-api.md)). Design: company Workspace identity = primary owner; named humans = owners/managers; automation = OAuth refresh token scoped to an authorized account at least privilege.

## Sources
support.google.com/youtube: `1646861` (create channel / 2nd = Brand Account), `7001996` (Brand Account model), `4628007` (roles + 7-day rule), `9481328` (channel permissions roles), `9367690` (opt-in). support.google.com/a: `9377793` (admin Brand Account on/off; 21-day delete), `182442` (turn services on/off per OU). Workspace YouTube admin: `knowledge.workspace.google.com/admin/youtube`.
