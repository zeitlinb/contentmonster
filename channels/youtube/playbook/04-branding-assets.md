# Playbook 04 — branding assets

> The images a channel needs, exact specs, and where to upload them. Company-agnostic. _Verified 2026-06-28 against support.google.com/youtube/answer/10456525 (primary "Manage your channel branding"); two values are genuinely ambiguous in Google's own docs — flagged below. Confirm at upload, the field shows live validation._

## Upload location
All three assets are in **YouTube Studio → Customization → Profile tab** (current builds; older builds label it "Branding"). Click **Publish** (top-right) to apply.

## Profile picture (the avatar / logo)
| Spec | Value |
|---|---|
| Display | renders at **98×98 px**, shown as a **circle** |
| Upload size | no official "recommended px"; community convention **800×800 px** square |
| Formats | JPG, GIF (**non-animated**), BMP, PNG |
| Max file size | **15 MB** (official: "image size should not exceed 15 MB") |
| Content | square or round; shown on channel, videos, and across YouTube |

> ❗ The profile picture is **UI-only** — it **cannot** be set via the Data API. A human (or browser automation) must upload it in Studio.

## Banner ("channel art")
| Spec | Value |
|---|---|
| Recommended | **2560×1440 px** (best on all devices) |
| Minimum upload | **2048×1152 px**, 16:9 |
| **Safe area** (shows on **all** devices — keep all text/logos here) | **1235×338 px**, centered |
| Max file size | **6 MB** |
| Content | **no shadows/borders/frames** (Google forbids "file embellishments"); cropped differently on TV/desktop/mobile — only the safe area is guaranteed |

The banner **is** API-settable (two-step: `channelBanners.insert` → `channels.update`).

## Video watermark (subscribe prompt, bottom-right of player)
| Spec | Value |
|---|---|
| Size | **square, min 150×150 px** |
| Max file size | **< 1 MB** |
| Format | PNG with transparency recommended (JPG/GIF/BMP accepted per secondary guides) |
| Timing | End of video (last 15s) · Custom start time · Entire video |
| Notes | landscape only; not on chromeless/Flash/made-for-kids |

API-settable (`watermarks.set/unset`).

## Custom thumbnails (per-video, not channel-level)
**3840×2160 px recommended** (16:9), min width 640 px, JPG/GIF/PNG, ≤2 MB mobile / ≤50 MB desktop (1280×720 also works — it's the player aspect ratio). **Requires phone verification** (see [`05`](05-customization-settings.md)). Set per-video in the upload/edit flow; API: `thumbnails.set`.

## Production note
Profile picture, banner, and watermark are **CREATE** outputs — produce them from the company's brand assets (logo, palette, type) per the tenant's `assets/README.md`. Keep all banner text/logo inside the **1235×338** safe area.

## Sources
support.google.com/youtube: `10456525` (primary branding specs), `12950272` (banner/profile tips), `3027950` (customization tabs), `72431` (thumbnails).
