# Constellation channel — image assets

> What to produce, the exact specs, and the source files. Produce these (CREATE / HyperFrames or image tooling) and drop the outputs in this folder. Specs are mirrored from [`../../../playbook/04-branding-assets.md`](../../../playbook/04-branding-assets.md) — re-confirm at upload (YouTube shows live validation).

## Source brand files (from bzresearch)
- `…/bzresearch/marketing/brand/logo/constellation-logo-white.png`
- `…/bzresearch/marketing/brand/logo/constellation-logo-black.png`
- `…/bzresearch/marketing/brand/logo/logo-option-4-white-transparent.png` (transparent)
- `…/bzresearch/marketing/brand/logo/logo-option-4-black-transparent.png` (transparent)
- Palette + type: `…/bzresearch/marketing/brand/_index.md`

## Produce these three

### 1. `avatar-800.png` — profile picture  ⚠️ UI-only upload (no API)
- 800×800 px square (displays as a circle, renders at 98×98)
- Constellation glyph (white `#FFFFFF` or Constellation Red `#FF2B2B`) centered on Bedrock Black `#050505`, generous padding so nothing clips in the circle crop
- PNG, non-animated, well under the file-size cap

### 2. `banner-2560x1440.png` — channel banner
- 2560×1440 px (16:9)
- **All text/logo inside the centered 1235×338 safe area** — wordmark + tagline "Get Found. Stay Found. Turn discovery into cash flow."
- Bedrock Black field, Constellation Red accent; **no borders, shadows, or frames**
- PNG/JPG, ≤6 MB

### 3. `watermark-150.png` — video watermark
- 150×150 px square, **PNG with transparency**, <1 MB
- The glyph only (mark, not full wordmark) — appears small, bottom-right of the player

## Optional
- `thumbnail-template.png` — a reusable per-video thumbnail base, 16:9, **3840×2160 recommended** (min width 640; 1280×720 also fine). Requires phone verification to use. Not a channel asset; kept here for convenience.

## Notes
- These images are brand assets (not secrets) and may be committed.
- Keep filenames stable so the agent-control tooling and setup guide can reference them.
