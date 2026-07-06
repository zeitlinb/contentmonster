# HEC LinkedIn — image assets

> What to produce, the exact specs, and the source files. Produced by CREATE (render scripts here / HyperFrames). Specs mirror [`../../../playbook/04-branding-assets.md`](../../../playbook/04-branding-assets.md) — re-confirm at upload (LinkedIn shows live validation). **All images are brand assets (not secrets) and may be committed.**

## Brand source (from the hubexperience repo canon)
- Palette + type: `hubexperience/core/brand/visual-identity.md` (cream `#F1E8D9`, ink `#1A1208`, rust `#B45D2A` / CTA `#A85327`, muted `#5A5040`, hairline `#C9BFB4`; Fraunces + Geist).
- Photo corpus (for the photo cover): `hubexperience/site/public/hero/movie-night.png` (real HUB blue-hour movie night). More live in Drive / the site's design bundle.
- **Logo mark:** the HEC circular emblem is **still in design** (GPT Image-2, pending Brad + Tully). Until it lands, the logo here is a labeled **INTERIM**.
- Fonts are vendored into [`fonts/`](fonts/) so renders are reproducible: `Fraunces.ttf` (variable), `Geist-Regular/Medium/SemiBold.ttf`.

## Produce these — SELECTED (2026-07-06, Brad)

Top-level holds only the **canonical, ready-to-upload** files; every alternate is in `variants/`.

### 1. `SELECTED--logo-300x300.png` — Company Page logo ("bio image")  ⚠️ admin-UI upload
- **Logo B** — cream "H" in a ring on sage `#667263`. 300×300; reads at ~60px.
- The "H" is an **INTERIM** monogram (gestures at the in-design HEC emblem). Swap in the final emblem (300×300, two-color flat, no gradients/shadows) when selected — **keep the filename**.
- Alternates: `variants/logo-A-ink-on-cream.png` (green ring on cream), `variants/logo-C-nodes-on-cream.png`.

### 2. `SELECTED--cover-1128x191.png` — Company Page cover ("header image")
- The **green-field statement cover**: sage `#667263` field, cream "We are Memory Makers." (Fraunces), all-caps eyebrow ("THE HUB EXPERIENCE COMPANY") + all-caps subtext ("THE EXPERIENCE LAYER FOR DEVELOPERS, OWNERS & OPERATORS").
- 1128×191 (~6:1). Text in the **center band**, clear of the **lower-left ~320×120** (logo overlap) + edges. Verify with `SELECTED--cover-1128x191-safearea-preview.png` (not for upload).
- Alternate: `variants/cover-1128x191-photo.png` — the same statement over a real HUB blue-hour movie-night image (kept as a strong photo option).

### 3. First-post image — built in **HyperFrames** (house standard)
The powerful first-post visual is authored in **HyperFrames**, not PIL (HyperFrames-first rule). The post + image concept live in [`../content-strategy.md`](../content-strategy.md); the HyperFrames project lives in `../post-1/` when built.

## Render
```bash
# fonts are already vendored in fonts/. Needs Pillow (installed).
python linkedin/tenants/hubexperience/assets/render-logo.py
python linkedin/tenants/hubexperience/assets/render-cover.py
```
Both scripts print what they wrote. Re-confirm dimensions + the safe-area preview before uploading.

## Notes
- Keep filenames stable so the setup guide references them.
- Cover/logo uploads happen in the Page admin UI (not via API) — see the setup guide.
