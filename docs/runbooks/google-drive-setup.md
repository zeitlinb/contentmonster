# Runbook — Google Drive asset sync (Jaca)

> Operational setup for syncing a client's brand/product/UGC assets from Google Drive
> into `clients/<id>/assets/` (gitignored). Promoted from the 2026-02-27 pre-monorepo
> state file. Drives the `apps/cli` `download-assets` command (not yet implemented).

## One-time setup (Brad, browser steps)
1. Go to https://console.cloud.google.com/
2. Create a project (or use existing) → **enable the Google Drive API**.
3. Create a **Service Account** → download its JSON key file.
4. **Share these 4 Drive folders with the service-account email (Viewer):**
   | Folder | ID |
   |--------|----|
   | Brand / Logos | `1LIxX8h8c3nJl_buB4owF1rIxJMDZXSGA` |
   | Product Photos | `1y3aT6KObReEtqAzDx0ppPvtSVoiByYol` |
   | UGC | `1W-8iOu8hfSBWtKLkaUb0_omhcEATsvfz` |
   | Ad Creative Library | `1ZMAitCdv9Ce_P7YShOC1UTy2s68LRLLw` |
5. Drop the JSON key at `credentials/drive-service-account.json` (gitignored).

## Then (agent builds)
- `apps/cli` `download-assets` command → syncs Drive folders into `clients/jaca/assets/` using the `googleapis` client in `packages/core`.

## Notes
- `credentials/` and `clients/*/assets/` are gitignored — never commit keys or synced assets.
- Source brief paths in the old state file are **Windows paths from a different machine** (historical); this repo is on macOS.
