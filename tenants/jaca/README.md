# Jaca Sugar — ARCHIVED tenant

> ⛔ **Dormant since the ad-creative pipeline was deferred.** Retained intact — these
> configs are the working spec for the 8-step Meta ad engine and wake when that
> pipeline resumes (Drive-sync + `generate-scene`; see the charter's Context
> Snapshot). Do not build against them until then.
>
> Moved here 2026-07-11 from `clients/jaca/` in the tenant×channel re-org. The
> matching platform spec moved to [`../../channels/meta-ads/`](../../channels/meta-ads/).

Contents (unchanged from the ad-creative era):

- `brand-spec.md` — Jaca Sugar brand rules (colors, voice, product framing)
- `brand.json` · `products.json` · `scenes.json` · `layouts.json` · `qa-rules.json`
  — the machine-readable tenant config bundle the ad pipeline loads
- `assets/` — Drive-synced product assets (gitignored; synced via `apps/cli
  download-assets` per `docs/runbooks/google-drive-setup.md`)
