import type { OutputFormat } from "./types";

// Universal (non-tenant) platform rules. Canonical Meta output formats; every
// static ad ships at minimum 4:5 AND 1:1 (the 1:1 repositioned, not cropped).

export const OUTPUT_FORMATS: OutputFormat[] = [
  { id: "feed_vertical", width: 1080, height: 1350, ratio: "4:5" },
  { id: "feed_square", width: 1080, height: 1080, ratio: "1:1" },
  { id: "stories_reels", width: 1080, height: 1920, ratio: "9:16" },
];
