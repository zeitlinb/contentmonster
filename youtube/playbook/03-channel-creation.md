# Playbook 03 — create the channel (as a Brand Account)

> Company-agnostic UI steps to create the channel correctly. _Verified 2026-06-28; YouTube wording shifts — confirm on-screen labels live._

**Prerequisite:** both admin services ON for the user's OU (see [`01`](01-account-and-access.md)), propagated (up to 48h).

## Be on the right identity first
Being "signed into Workspace" is not enough — you must be on the correct **identity** in the YouTube account switcher, or you'll create the channel under the wrong account.

1. Go to **youtube.com**, top-right **profile picture** → **Switch account** → confirm the active identity is the intended Workspace account (its name/icon shows top-right).

## Create the channel
2. Profile picture → **Settings**.
3. Under the **Account** section → **Add or manage channel(s)** (older builds: "Add or manage your channel(s)").
4. Click **Create a channel** (older builds: "Create a new channel").
5. On the form: set a profile picture, type the **Name** = the **brand name** (the account's **2nd** channel is automatically a Brand Account; use the brand name — not your personal Google Account name — so you don't confuse it with the auto-created personal channel), and set the **@handle**.
6. Click **Create channel**.

## Verify it's a Brand Account
7. Visit `myaccount.google.com/brandaccounts` — the channel should appear under **Your Brand Accounts**; or in YouTube Studio → Settings → Account, an **"Add or remove managers"** option confirms it (personal channels lack this).

## Operating on the right channel later
8. YouTube Studio acts on the **currently active identity**. Switch to the Brand Account either at youtube.com (profile picture → **Switch account**) **or** inside Studio (top-right profile → **Switch account**, or go to **studio.youtube.com**), then work. Confirm via the name/icon top-right.

## Gotchas
- Using your own Google-account name/photo creates/reuses the **personal** channel, not a Brand Account. Give it the **brand** name.
- A Brand Account only shows in your **Switch account** list if your Google account is one of its owners/managers.
- If creation options are missing, the admin Brand Account service is likely off for the OU (see [`01`](01-account-and-access.md)) — usually an admin fix, not user-fixable.

## Sources
support.google.com/youtube: `1646861` (create channel), `7286468` (check Brand Account), `3046356` (switch accounts), `7001996` (Brand Account model).
