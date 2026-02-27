# Lessons Learned — DO NOT REPEAT

Source: CLI-test-spec.pdf page 12-13. These are mistakes the previous AI made.

1. **Always check output dimensions first.** Generated 2816x1536 (16:9 landscape) THREE TIMES when spec says 1080x1350 (4:5 portrait). Dimension check is the FIRST QA step.

2. **Nano Banana doesn't control aspect ratio.** The --resolution flag controls max dimension, not aspect ratio. MUST include explicit aspect ratio in the prompt ("vertical 4:5 portrait orientation, 1080 wide by 1350 tall") AND verify/crop output after generation.

3. **Remotion is the compositing engine, not Pillow/Sharp.** Sharp handles pixel-level ops (bg removal, color grading, shadows). Remotion handles ALL layout (text, logo, pills, CTA, safe zones, size variants). Do not substitute one for the other.

4. **Vision QA runs after EVERY step, before any human sees output.** Loop: generate → Gemini spec check → Claude creative review → fix → repeat. Human sees only the final passing result.

5. **Product placement space must have environmental continuity.** Empty marble zone with no backsplash/veining = marble texture swatch stitched to image. Scene must be ONE continuous environment.

6. **Product space = 30-35% of frame, not 40%+.** Too much empty space splits the image in two.

7. **Threshold-based background removal is crude.** Produces white fringing, halos, artifacts. Use rembg or better segmentation.

8. **Color-match the product to the scene.** 5500K studio product in 3800K golden hour scene looks pasted. Warm-shift + add directional light matching scene's source.

9. **Flag dependencies before starting.** Verify tools are installed before writing test plans. Don't discover missing tools mid-test.

10. **Read the spec before every generation.** Not from memory — from the actual file. Memory drifts, the file doesn't.
