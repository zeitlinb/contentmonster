---
title: Book-publishing pipeline design (charter D1) — captured design proposal
date: 2026-06-22
status: "⛔ KDP KILLED 2026-06-27 — no book #1, no KDP automation. Retained as a research artifact; the manuscript-gen + prose-QA + PDF-typeset parts may be reused for authority content, but the KDP-upload / cover / pricing / ISBN parts are dead. (was: DEFERRED automation phase)"
source: multi-agent design workflow (13 agents, ~1.6M tokens) — verified vs the claude-api skill + KDP docs
relates_to: kdp-publishing-runbook.md; research/2026-06-22-operator-playbook-and-economics.md (hub: README.md); [[project-book-pipeline-strategy]]
---

# Book pipeline design (D1) — captured for the post-#1 automation phase

> **Why this is parked:** we hand-craft book #1 (AI Chief of Staff) manually to capture the how-to
> knowledge, THEN build this pipeline from a proven process. This doc is the automation-spec
> skeleton; book #1's captured artifacts fill in the human-judgment boundaries. Do not resolve the
> forks below until book #1 ships + its capture is in hand.

## ⚠️ Two reconciliations vs our current strategy (apply before building)
1. **Mode A, not Mode B.** The design's `prose.ts`/S3 draft loop uses Opus-4-8 to *draft* chapters = AI-generated text = must check the KDP "AI-Generated: Text" box (Mode B). Our authority series is **Mode A** (human-written prose, AI only outlines/researches/edits) — for real authority, honest unchecked disclosure, and **enforceable copyright** (purely-AI prose has thin/zero US copyright; *editing alone doesn't create authorship*). The pipeline already supports this: `aiProvenance.text = human|assisted|generated` is a config knob, and S2/S3 just change from "AI drafts from outline" to "human-dictated material in → AI structures/tightens/edits." **Book #1's manual build defines exactly where that human/AI boundary sits.** Mode B stays available per-title (box checked) if Brad ever wants it.
2. **Stale tenant/content context.** Workflow A ran before the domain was set, so it assumes the **Jaca Sugar** tenant and frames fork D1b as generic "fiction vs nonfiction first." Reality: first realm = **Brad's authority nonfiction under his real name** (AI Chief of Staff). So D1b is largely settled (nonfiction/authority), the `clients/jaca/book.json` plan maps to a **Brad/authority-imprint tenant**, and the design's **nonfiction-hallucination gate (35–55% on niche/recent facts) + a Brad-level factual go/no-go** becomes load-bearing, not optional.

## Pipeline (14 logical stages; ad + book become first-class siblings)
S0 niche/demand screen (objective go/no-go) · S1 title brief + config + blurb/description · S2 outline → Story/Style Bible · S3 draft loop + continuity/bible-update · S5 **two-pass prose QA** (the survival gate) · S6 interior typeset + QA (Typst) · S8 cover build + QA · S10 EPUB 3 assembly · S11 KDP package + hard validation · S12 **publish (human go/no-go)** + takedown/appeal/circuit-breaker. QA runs after **every** step; nothing auto-publishes.

## Shared-core plan
- **Reuse as-is:** `config.ts` (tenant/platform loaders), `qa.ts` two-pass contract, `ai.ts generateScene` (cover raster — AI never renders final text), `media.ts` Sharp (cover pixels + ≥300-DPI resample at source), `types.ts QaVerdict`/`ClientConfig`.
- **New modules:** `prose.ts` (manuscript + Story/Style Bible) · `typeset.ts` (Typst-CLI interior, measure-then-finalize) · `cover.ts` (wrap geometry + gated CMYK) · `kdp.ts` (export/metadata/validation + appeal bundle) · `pipeline.ts` (generic registry/runner + **persisted run-ledger**) · `books/niche.ts` · `platform/kdp.json` (trim/bleed/margin/spine/DPI, sourced).
- **Abstraction changes (breaking — do together):** `PIPELINE_STEPS` → one of several step-lists (`AD_STEPS` + `BOOK_STEPS`, `PipelineId`); `qa.ts` `(imagePath)` → `(artifact: QaArtifact = image|pdf-page|prose)` with **Rubric-as-data** (AD_RUBRIC + PROSE_RUBRIC both values); `OutputFormat` → tagged px|inch union; `ai.ts` → `generateScene` + `generateProse` peers (text peer: adaptive thinking, **no** budget_tokens/temperature, mandatory streaming >16K, stop_reason refusal branch); `RunCtx` → **persisted `run.json` ledger** (resume/idempotency/cost-ceiling/redo-budget); `aiProvenance` + operationalized `humanAuthorship` drive KDP + Copyright + the S12 registrability gate.

## Prose QA rubric (the books analog of the 8-dim vision rubric)
**Pass 1 (deterministic, binary, no LLM):** word count in band (dimension-check FIRST) · chapter structure/min-words · no dup headings/body n-gram overlap · required front/back matter (copyright verso, ISBN slot, TOC, etc.) · no placeholder/AI-tell tokens · TOC↔body match · AI-disclosure flag truthful · Flesch-Kincaid · anti-slop density scorer (banned: delve/tapestry/testament; rigid 3–5 lists; NOT em-dashes) · print PDF via **veraPDF + Ghostscript** (trim/bleed/gutter/≥300-DPI/fonts/even-pages/PDF-A; validated against a known-good KDP-accepted PDF + a real upload dry-run).
**Pass 2 (subjective, Claude; 8 fiction / 9 nonfiction dims):** Voice Consistency · Coherence/Continuity · **Factual Accuracy [nonfiction only]** · Pacing/Structure · Originality/Non-Slop · Hook/Opening (weight first 1,500 words = Look-Inside) · Market/Genre Fit (+metadata accuracy) · Readability · Editorial Cleanliness.
**Thresholds:** avg ≥7.0 PASS; 5.0–6.9 REDO; <5.0 SCRAP. Overrides: any dim <6 = redo; Factual ≤4 = fact-check redo; Originality <6 = de-slop. Max 2 full-book redos → else escalate to human (never auto-ship). Cost ceiling (`maxCostUSD`) halts independently. Headless: requires `ANTHROPIC_API_KEY`; a Pass-2 **refusal FAILS LOUD → human** (closes charter **D3**). Global dims = one full-book Opus-4-8 pass (1M window fits any KDP book); local dims = per-chapter Sonnet-4-6 with cached manuscript; non-interactive on the **Batch API (50% off)**.

## Decision forks (parked — resolve at automation-build time; recs noted)
- **D1a typeset engine** → **Typst CLI shell-out day-one** (pinned binary; only confirmed PDF/A path); in-process N-API binding deferred behind a spike. Non-negotiable: a real KDP upload dry-run.
- **D1b fiction vs nonfiction first** → moot for us: **nonfiction/authority** (see reconciliation #2).
- **D1c disclosure/volume** → **over-disclose, conservative velocity** (<3/day, never link accounts).
- **D1d cover CMYK** → RGB for MVP/dry-run; **Ghostscript CMYK PDF/X-1a gated before any PAID title.**
- **D1e config granularity** → per-title file + tenant default; series fields RESERVED, series layer deferred.
- **D1f ISBN/distribution** → free KDP ISBN + ASIN; KU-vs-wide a per-title Brad call (we lean **wide**).
- **D1g headless QA auth (D3)** → require `ANTHROPIC_API_KEY`, fail loud on missing key OR refusal. **Closes D3.**
- **D1h MVP scope** → **thin vertical slice**; **worker host = STEP ZERO** (pinned typst-cli+pandoc+ghostscript+veraPDF — Vercel `apps/web` can't run those binaries). Defer hardcover/CMYK/FXL/series/post-publish.
- **D1i QA cost** → **measure (count_tokens), don't assert**; Batch API; Opus-global/Sonnet-local. (Opus 4.8 = flat 5/25 across 1M, **no long-context premium**.)
- **D1j state/recovery** → build the **persisted run-ledger now** + a minimal takedown/appeal/circuit-breaker before first publish.

## Top risks (carried forward)
Account termination (existential) · typesetting is the riskiest part (Typst-CLI + real dry-run mitigates) · **nonfiction hallucination floor 35–55%** → human factual go/no-go · model-call correctness (stop_reason refusal branch; stream >16K; no budget_tokens/temperature on 4.8) · thin copyright on AI prose → Mode A · voice drift over 30+ chapters · measure-then-finalize (gutter+royalty depend on final page count) · no public KDP publish API (browser-automation/manual + human AI-disclosure gate) · LLM-judging-own-output → cross-model (Gemini/Grok) second opinion on Originality · font licensing (prefer OFL) · **one consolidated DEFERRED register with build-triggers** so deferrals aren't rediscovered late.

> Full raw design (275K+ chars) was produced by run `wf_d5c4dd46-b59`; this doc is the durable capture — the /tmp output is ephemeral.
