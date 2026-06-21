// Sharp-based pixel ops: background removal, color grading, shadows, resize, crop.
// Layout/compositing (text, logo, pills, CTA) is Remotion's job, NOT this module
// (see docs/reference/tech-decisions.md). Implementation lands later.

export interface CompositeOptions {
  scenePath: string;
  productPath: string;
  outPath: string;
}

export async function compositeProduct(_opts: CompositeOptions): Promise<string> {
  throw new Error("compositeProduct: not implemented yet");
}
