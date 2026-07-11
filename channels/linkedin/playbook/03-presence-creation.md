# 03 · Presence creation

> Company-agnostic UI steps to create (or claim) a Company Page, and optionally set up a founder profile. **[VERIFY LIVE]** = LinkedIn's UI shifts; confirm on-screen. If the presence already exists, skip to "Claim / verify you're an admin" and then go straight to branding (04) + copy (05).

## A. Company Page — create new

1. Sign in as the **owner** member (this member becomes the first **Super admin**).
2. Top nav → the **For Business** grid (top-right, 9-dot icon) → **Create a Company Page +**.
3. Choose page type: **Company** (not Showcase page, not Educational). [VERIFY LIVE]
4. Fill the create form:
   - **Name** — the exact brand name.
   - **linkedin.com/company/** — the **public URL slug**. Pick the canonical handle (e.g. `acmeco`); LinkedIn checks availability inline. Getting the slug right here avoids a later URL change.
   - **Website** — the live domain (with `https://`).
   - **Industry**, **Company size**, **Company type** — set the closest true values (changeable later).
   - **Logo** and **tagline** — you can add now or in step 04/05; the page must have a logo before you publicly promote it.
   - Tick the verification/authority checkbox confirming you may act on the company's behalf.
5. **Create page.**
6. **Immediately add a second Super admin** (continuity) — Admin tools → Manage admins → Add admin. See [`01-account-and-access.md`](01-account-and-access.md).

## B. Company Page — claim / confirm you're an admin (page already exists)

1. Sign in as a member who should be an admin.
2. Go to the page. If you're already an admin you'll see **Admin tools**. If not, open the page → **More** → **Request admin access** (LinkedIn verifies via a work email on the company domain or existing admin approval). [VERIFY LIVE]
3. Once you have **Super admin**, confirm continuity: **≥2 Super admins**.

## C. Public URL (slug) change on an existing page

If the page's slug isn't the canonical handle yet:
1. **Admin tools → Edit page → Page info → Public URL** (label varies) → set the new slug. [VERIFY LIVE]
2. Constraints to expect: the target slug must be **available**, and LinkedIn limits how often a URL can change. Changing it **breaks old links** to the previous URL — update anywhere the old URL was shared.
3. Verify the new URL resolves before announcing.

## D. Founder / personal profile (only if in scope)

Not "created" (the person already has an account) — **optimized**:
1. Confirm the member's **headline**, **About**, **experience** entry for the company, **custom profile URL** (`linkedin.com/in/<vanity>`), profile photo, and background image are set per the tenant config.
2. Add the company as the person's **current position** so the profile ↔ page link is live (this also grows the page's associated-member count).
3. Personal-profile copy + image specs are in [`04`](04-branding-assets.md) and [`05`](05-profile-copy-settings.md).

## Done when
- [ ] Page exists at the canonical `linkedin.com/company/<slug>`
- [ ] **≥2 Super admins**
- [ ] Website + industry + size + type set (even if rough)
- [ ] (If in scope) founder profile links to the page as current position
