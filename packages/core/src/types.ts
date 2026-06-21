// Shared domain types for the ContentMonster content engine.
// Both pipelines (ad-creative + books) build on these. Kept intentionally thin —
// this is the package boundary, not the implementation.

/** The 8-step ad-creative pipeline (see docs/reference/pipeline-spec.md). */
export const PIPELINE_STEPS = [
  "prerequisites",
  "scene-generation",
  "product-composite",
  "text-logo-overlay",
  "size-variant",
  "refinement-loop",
  "end-to-end",
  "video",
] as const;

export type PipelineStep = (typeof PIPELINE_STEPS)[number];

/** A Meta output format (universal platform spec). */
export interface OutputFormat {
  id: string;
  width: number;
  height: number;
  ratio: string;
}

/** Universal platform spec (e.g. platform/meta.json). */
export interface PlatformSpec {
  name: string;
  formats: Record<string, OutputFormat>;
}

/** A tenant config bundle loaded from clients/<id>/*.json. */
export interface ClientConfig {
  name: string;
  [key: string]: unknown;
}

/** Result of a QA pass — objective spec check or subjective creative rubric. */
export interface QaVerdict {
  pass: boolean;
  notes: string[];
}
