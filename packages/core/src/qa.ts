import type { QaVerdict } from "./types";

// Two-pass QA, run after every pipeline step before any human sees output.

/** Pass 1 — objective spec compliance (Gemini Vision). All items must pass. */
export async function specCheck(_imagePath: string): Promise<QaVerdict> {
  throw new Error("specCheck: not implemented yet");
}

/** Pass 2 — subjective creative rubric, 8 dimensions scored 1-10 (Claude Vision). */
export async function creativeReview(_imagePath: string): Promise<QaVerdict> {
  throw new Error("creativeReview: not implemented yet");
}
