# Existing video

Open `hyperframes-lab/output.mp4` to see the committed six-second ContentMonster title, rule, subtitle, and closing fade. This recipe verifies that artifact against the declared composition. It does not render a replacement.

## Sub-features

- `video-shape` matches the composition's 1920×1080 dimensions and six-second duration.
- `video-decode` decodes the complete H.264 video, with 180 frames at 30 fps and no audio.
- `video-pixels` shows the opening, title entrance, full hold, and closing fade at representative timestamps.

## How to get to it (user POV)

Open `hyperframes-lab/output.mp4` in a video player.

## Driving it with ffprobe and ffmpeg

Preconditions:

- Complete [Video route](../SKILL.md#video-route) launch and doctor. Use its absolute `video` path and fresh evidence directory `proof`.

- **Read the media.** Run this fail-fast block in Bash and retain its executed text and tool exit. No command may overwrite an existing image or wait on stdin. A missing frame stops the block.

```bash
set -euo pipefail
ffprobe -v error -show_format -show_streams -of json "$video" > "$proof/ffprobe.json" 2> "$proof/ffprobe.stderr"
ffmpeg -nostdin -n -v error -xerror -i "$video" -f null - > "$proof/decode.stdout" 2> "$proof/decode.stderr"
for time in 0 0.5 2 5.65 5.933; do
	ffmpeg -nostdin -n -v error -xerror -ss "$time" -i "$video" -frames:v 1 "$proof/frame-$time.png" > "$proof/frame-$time.stdout" 2> "$proof/frame-$time.stderr"
	test -s "$proof/frame-$time.png"
done
```

- **Compare dimensions and duration.** Require one H.264 video stream, 1920×1080, 30 fps, 180 frames, six seconds, and no audio stream. Compare dimensions and duration directly with `index.html`.
- **Decode the whole video.** Require the block to exit 0 and no decoder errors in `decode.stderr`.
- **Inspect the frames.** Open all five PNGs. At 0 seconds, expect the dark opening. At 0.5 seconds, expect the title entrance. At 2 seconds, expect the full ContentMonster title, gold rule, and `HyperFrames pipeline · smoke test` subtitle. At 5.65 and 5.933 seconds, expect progressively darker closing frames. Record what each image shows.

## Gotchas

- A successful ffmpeg exit alone does not prove that a frame exists. Preserve an absent-frame result and choose a valid timestamp. Never silently accept a missing image.
- At 30 fps, the last frame timestamp is about 5.9667 seconds. The 5.933-second sample precedes it.
- This proof does not establish that today's composition would render identical pixels. The existing MP4 has no retained source-to-render provenance beyond the committed pair.
- Composition checks and renders use the installed `/hyperframes` skill. The pinned `hyperframes@0.6.121` scripts remain unverified by this artifact route.
