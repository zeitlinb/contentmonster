// AI scene generation. Nano Banana 2 (Gemini 3.1 Flash Image) for scenes; Grok
// Imagine as an alternative. NEVER rely on AI-rendered text — use Remotion for
// all typography (see docs/reference/lessons-learned.md). Implementation lands later.

export interface SceneRequest {
  prompt: string;
  /** Explicit aspect ratio MUST be in the prompt; verify/crop after generation. */
  aspectRatio: string;
}

export async function generateScene(_req: SceneRequest): Promise<string> {
  throw new Error("generateScene: not implemented yet");
}
