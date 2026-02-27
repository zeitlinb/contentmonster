# Tech Decisions

## Runtime: TypeScript + Node.js (NOT Python)
Previous AI used Python/Pillow. We're building fresh in TS/Node for the SaaS.

## Framework: Next.js + CLI hybrid
Web app (Next.js App Router) with standalone CLI scripts in src/cli/. Each pipeline step is an independent CLI command testable in isolation.

## Image Pixel Ops: Sharp (NOT Pillow)
Sharp replaces Pillow for: background removal, color grading, drop shadows, lighting adjustments, resize, crop to target dimensions.
Sharp does NOT do: text overlays, logo placement, layout composition (that's Remotion).

## Layout Compositing: Remotion
Remotion handles ALL layout: text overlays, headline placement, attribute pills, logo, CTA bars, safe zone enforcement, size variant generation (4:5, 1:1, 9:16).
React components define templates. Each template accepts props (background image, headline, attributes, logo, colors). Same template code produces all output sizes.

## AI Scene Generation: Nano Banana 2 (Gemini 3.1 Flash Image)
Released Feb 26, 2026. Pro-level quality at Flash speed.
Previous model was gemini-3-pro-image-preview. New model: gemini-3.1-flash-image.
Does NOT control aspect ratio — must include in prompt AND crop after.

## QA Pass 1: Gemini Vision (gemini-2.5-flash or gemini-3-pro)
Objective spec compliance. Structured pass/fail checklist.

## QA Pass 2: Claude Vision (WE ARE CLAUDE)
Subjective creative quality. 8-dimension scoring rubric.
No external API call needed when running interactively.
For headless/CLI: will need ANTHROPIC_API_KEY.

## Alternative Image Gen: Grok Imagine (xAI)
Text-to-image only. Cannot edit images. Rate limited (3+ sec between calls).

## Video: FFmpeg + Remotion
FFmpeg for cutting, audio overlay, compression, ASS subtitle burn-in.
Remotion for captions, end cards, overlays.
Note: FFmpeg drawtext filter may not be available — use ASS subtitles.

## Config: JSON + Zod
Tenant configs as JSON files in clients/{name}/. Validated with Zod schemas at load time.
Platform specs as JSON in platform/. Universal, not tenant-specific.

## Multi-Tenant Architecture
- Client-specific rules (colors, fonts, no dark backgrounds) = tenant config in clients/{name}/
- Platform rules (Meta safe zones, aspect ratios, caption requirements) = universal in platform/
- NO client-specific logic hardcoded in system code
