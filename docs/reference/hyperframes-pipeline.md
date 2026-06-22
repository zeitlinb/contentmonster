# ContentMonster Video Production Standard — the HyperFrames 7-Step Pipeline

> **This is our standard for producing video content** (adopted 2026-06-22; Brad).
> ContentMonster is a **HyperFrames-first shop**: HyperFrames is the default layout/video
> engine and this 7-step pipeline is how we build every multi-beat video. Copied from the
> upstream guide — keep in sync with the source, do not drift from memory.
>
> **Source (read from the file, not memory):** https://hyperframes.heygen.com/guides/pipeline
> · Full doc index: https://hyperframes.heygen.com/llms.txt
> · Skills entry point: `/hyperframes` (routes intent → the right workflow skill).

## Why this is the standard
The old ad-creative engine spec ([`pipeline-spec.md`](pipeline-spec.md)) was an 8-step,
Remotion-based flow. We are now HyperFrames-first, so video production follows the pipeline
below. Each step produces a **named artifact on disk**, so any session (human or agent) can
track progress, see *why* a beat looks the way it does, and re-enter at any checkpoint.
**Sharp is unchanged** — it still does pixel ops (bg removal, color grade, shadows) that feed
Capture/Build. **Remotion is kept as an alt/reference** (see [HyperFrames vs Remotion](https://hyperframes.heygen.com/guides/hyperframes-vs-remotion.md); the `/remotion-to-hyperframes` skill ports legacy Remotion sources into HyperFrames).

## The 7 steps

| # | Step | Artifact(s) | Key command(s) | Quality gate |
|---|------|-------------|----------------|--------------|
| 1 | **Capture** | `capture/` (screenshots at scroll depths, color palettes, CSS font stacks, downloaded assets/SVG/woff2, Lottie + detected animations, optional Gemini vision enrichment) | `npx hyperframes capture <url> -o <proj>/capture` | Can describe the source's visual identity in 1-2 sentences + name its top colors, fonts, standout assets. |
| 2 | **Design** | `DESIGN.md` — 6 sections: Overview, Colors (5-10 HEX w/ roles), Typography, Components, Imagery, Do's & Don'ts | (authored from capture) | `DESIGN.md` exists with all six sections filled from real captured data (or deliberate choices for greenfield). |
| 3 | **Script** | `SCRIPT.md` — Hook, Story, Proof, CTA (or a per-beat copy plan for non-narrated) | (authored) | `SCRIPT.md` exists in project root; references REAL features/stats/components from `capture/extracted/visible-text.txt` — no invented claims. |
| 4 | **Storyboard** | `STORYBOARD.md` — global direction + per-beat: timing, exact narration line, mood/camera, asset paths, techniques, transitions, SFX | (authored) | `STORYBOARD.md` exists with beat-by-beat direction + an asset audit naming every file used. |
| 5 | **VO & Timing** | `narration.wav`/`.mp3`, `narration.txt` (pronunciation subs, e.g. `API`→`A P I`), `transcript.json` (`{text,start,end}` per word) | `npx hyperframes tts SCRIPT.md --voice <v> --output narration.wav` · `npx hyperframes transcribe narration.wav` | All three files exist; `STORYBOARD.md` beat timings reference REAL timestamps from `transcript.json`, not estimates. |
| 6 | **Build** | `compositions/<beat>.html` (one self-contained file per beat) | (authored; for multi-beat, spawn a focused sub-agent per beat) | Every composition self-reviewed: no overlapping elements, no misplaced assets, no static images left unanimated. Uses exact `DESIGN.md` colors/fonts, `class="clip"`, `data-*` semantics, GSAP timelines registered. |
| 7 | **Validate** | `snapshots/frame-*.png`, lint/validate reports, optional `<proj>.mp4` | `npx hyperframes lint` · `npx hyperframes validate` · `npx hyperframes snapshot <proj> --at <t1,t2>` · `npx hyperframes render --output <proj>.mp4` (`--batch rows.json` for personalized batches) | `lint` + `validate` pass with ZERO errors; snapshot frames look right; Studio preview URL ready to share. |

## When to use it
- **Use the full pipeline** for any narrative video with **3+ beats**, product launches, complex narratives, and website-to-video. Decision criterion: *if a non-author needs to understand why a beat looks the way it does, write it down in `STORYBOARD.md`.*
- **Skip it** for single-shot ~5s animations — a hand-authored composition suffices (e.g. our smoke test in `hyperframes-lab/`).

## Iteration & re-entry (artifacts make it surgical)
- **Rework creative:** edit `STORYBOARD.md` → rebuild specific beats.
- **Surgical tweak:** open the beat's composition HTML, adjust live via `npx hyperframes preview` (long-running — run in background).
- **Voice swap:** re-run TTS against `narration.txt` (subs already applied).
- **Single-beat rebuild:** prompt the agent with new direction; it re-reads `STORYBOARD.md`, `DESIGN.md`, `transcript.json`.

## How it maps to our pipelines
- **Ad-creative:** replaces the Remotion overlay/render steps of the legacy [`pipeline-spec.md`](pipeline-spec.md). Sharp still composites the product photo; HyperFrames owns ALL layout (headline, pills, logo, CTA, safe zones, size variants) + video (captions, end card). Our **two-pass Vision QA** (Gemini objective + Claude 8-dim subjective) layers on top of Step 7 Validate, before any human sees output.
- **Book-publishing:** trailers, launch/promo clips, and social cuts for each title follow the same 7 steps.
- **`/last30days`-style recency** and brand/tenant rules feed Step 2 Design and Step 3 Script.

## Routing (which skill runs which job)
Start at **`/hyperframes`** — it routes "make me a video" to the right workflow: `/product-launch-video`, `/website-to-video`, `/faceless-explainer`, `/pr-to-video`, `/motion-graphics`, `/embedded-captions`, `/graphic-overlays`, `/slideshow`, or `/general-video` (fallback). Domain skills: `/hyperframes-core` (composition), `/hyperframes-animation` (GSAP + runtime adapters), `/hyperframes-creative` (design/narration), `/hyperframes-cli` (dev loop), `/hyperframes-media` (TTS/transcribe/bg-removal), `/hyperframes-registry` (catalog blocks). `/remotion-to-hyperframes` ports legacy Remotion sources.
