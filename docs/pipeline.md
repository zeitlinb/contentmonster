# Content Automation Pipeline — 8 Steps

Source: CLI-test-spec.pdf (14 pages)

## Step 0 — Prerequisites
Before ANY generation:
1. Extract transparent logo versions from brand files (remove black backgrounds)
2. Download Roboto Slab font (Bold + Light)
3. Identify best clean product photo for compositing
4. Create Remotion compositions for layout types

## Step 1 — Scene Generation
- **Tool**: Nano Banana 2 (Gemini 3.1 Flash Image)
- **Input**: 5-element prompt from scene template + explicit aspect ratio + negative constraints
- **Output**: Photorealistic background PNG
- **CRITICAL**: Nano Banana does NOT control aspect ratio. Must include "vertical 4:5 portrait orientation, 1080 wide by 1350 tall" in prompt AND verify/crop after generation
- **QA**: Both passes run on scene before proceeding

## Step 2 — Product Composite
- **Tool**: Sharp (bg removal, color grading, shadows, lighting)
- **Input**: Passing scene + real product photo
- **Processing**: Remove bg → color-grade to match scene → directional lighting → blur edges for DOF → contact shadow + ambient shadow → surface reflection → position at correct scale
- **QA**: Composite-specific checks (fringing, color match, shadow direction, scale)

## Step 3 — Text & Logo Overlay (Remotion)
- **Tool**: Remotion — NOT Sharp/Pillow
- **Input**: Composite + brand assets
- **Remotion template implements**: background, headline (Roboto Slab Bold, stroked), 2-3 attribute pills, logo (transparent bg, 2-2.5x size), CTA bar, safe zone enforcement
- **Output**: 1080x1350 PNG (4:5)
- **QA**: Full spec checklist + 8-dimension rubric

## Step 4 — Size Variant (1:1 from 4:5)
- **Tool**: Remotion — same template, different Composition dimensions
- **CRITICAL**: NOT a crop. Repositioned layout — product may move, text resizes, logo moves, pills rearrange
- **QA**: Both passes on 1:1 version

## Step 5 — Refinement Loop Verification
- Intentionally introduce violations → verify QA catches them → fix → verify convergence
- Should converge in ≤3 iterations

## Step 6 — Full Pipeline End-to-End
- Chain all steps: brief → generation → composite → Remotion render → QA loop → final output
- Track total pipeline time + API cost

## Step 7 — Video Test
- **Tools**: FFmpeg (cutting, audio), Remotion (captions, end card, overlays)
- **Structure**: Hook (0-3s) → Body (3-12s) → End Card (12-15s)
- Song over dialogue = FAIL
- Captions mandatory (83% watch muted)
- ASS subtitles preferred (FFmpeg drawtext NOT available)

## QA System — Two Pass
### Pass 1 (Gemini Vision) — Objective Spec Check
ALL items must pass. Any single failure = redo.
Categories: Dimensions, Logo, Text Placement, Product, Background, Spacing, Typography, Attributes, Size Variants, Scene Quality, Composite Quality

### Pass 2 (Claude Vision) — Subjective Creative Review
8 dimensions scored 1-10:
1. Product Integration
2. Text Variation
3. Reference Fidelity
4. Attribute Visibility
5. Contrast/Readability
6. Dead Space
7. CTA Clarity
8. Scroll-Stop Power

Thresholds: 7.0+ avg = PASS, 5.0-6.9 = REDO (max 3), <5.0 = SCRAP, any dimension <6 = mandatory redo
