# Playbook 06 — launch checklist

> Company-agnostic gate. Don't make the channel public until every box is checked. _Verified 2026-06-28._

## Access & continuity
- [ ] Admin: **YouTube** service ON for the user's OU
- [ ] Admin: **Brand Account** service ON for the user's OU
- [ ] Channel created as a **Brand Account** (verified at `myaccount.google.com/brandaccounts`)
- [ ] **≥2 owners** set (primary identity **+** a backup company-controlled account)
- [ ] Channel **opted in to channel permissions** (Studio → Settings → Permissions)
- [ ] Team members invited at least-privilege roles

## Branding
- [ ] Profile picture uploaded (UI — square, displays as circle)
- [ ] Banner uploaded (all text/logos inside the **1235×338** safe area; no borders/shadows)
- [ ] Video watermark uploaded (square, <1 MB)
- [ ] **Published** (top-right) — branding edits don't apply until you click Publish

## Identity & copy
- [ ] **@handle** set (3–30 chars, unique)
- [ ] Channel **name** set (remember: changing it later removes the verification badge)
- [ ] Channel **description** set (uses approved messaging / banned-term list)
- [ ] **Links** added (first link = primary CTA, surfaces by Subscribe button)
- [ ] **Contact email** set
- [ ] **Keywords** set (Settings → Channel → Basic info)
- [ ] **Country** + default upload language set

## Verification
- [ ] Phone-verified (unlocks custom thumbnails, >15-min uploads, live)

## Agent / API control
- [ ] Cloud project created **in the channel's Workspace org**
- [ ] **YouTube Data API v3** enabled
- [ ] OAuth consent = **Internal** (avoids verification + 7-day token death)
- [ ] OAuth **Desktop app** client created; client JSON downloaded to gitignored `credentials/youtube/<id>/`
- [ ] **Refresh token** minted (consent as the channel-owning account; correct channel selected) and stored as a gitignored secret
- [ ] Smoke test: a read call (`channels.list mine=true`) returns the right channel
- [ ] Quota reality confirmed on the project's **Quotas** page (esp. `videos.insert`)
- [ ] Least-privilege scopes only

## Pre-public
- [ ] First video(s) ready (HyperFrames; brand-consistent)
- [ ] Description CTA points to the funnel destination
- [ ] Owner/manager list reviewed; no `Communications manager` assigned to video people
