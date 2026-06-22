# ContentMonster — Charter

> The distilled source of truth: what ContentMonster is, what's been decided, and
> what's still open. Brainstorming and exploration live in `./brainstorm/`; only
> settled conclusions get promoted up here. If it's still being argued, it belongs
> in a brainstorm doc with a pointer from §3 Open Decisions.
>
> _Last updated: 2026-06-21._

## 1. Identity & Purpose

ContentMonster is an **AI-native content engine** — one house running **multiple
content pipelines** that share a common core (AI generation, media ops, QA, tenant
config). It may later plug into [GTM Machines](https://gtmmachines.com) as a CREATE surface.

Two pipelines, sibling peers:

- **Ad-creative pipeline** — generates Meta (Instagram/Facebook) ad creative (static
  + video) from a brand brief. The original engine; an 8-step pipeline with two-pass
  QA. Full spec: [`../reference/pipeline-spec.md`](../reference/pipeline-spec.md).
- **Book-publishing pipeline** — writes and produces books to sell on Amazon (KDP).
  The newest realm; design pending (§3 D1).

First/test tenant: **Jaca Sugar** (allulose sweetener). Tenant config in
`clients/jaca/`; brand spec at [`../../clients/jaca/brand-spec.md`](../../clients/jaca/brand-spec.md).

## 2. Settled Decisions

| Date | Decision |
|------|----------|
| 2026-02 | **Runtime: TypeScript + Node**, not Python/Pillow. Source: [`../reference/tech-decisions.md`](../reference/tech-decisions.md). |
| 2026-02 | **Sharp = pixel ops** (bg removal, color grade, shadows, resize). **Remotion = ALL layout** (text, logo, pills, CTA, safe zones). Never mix. |
| 2026-02 | **AI scene gen = Nano Banana 2 (Gemini 3.1 Flash Image)**; Grok as alt. **NEVER rely on AI-rendered text** — Remotion owns typography. |
| 2026-02 | **Two-pass QA after every step:** Pass 1 Gemini Vision (objective spec), Pass 2 Claude Vision (subjective 8-dim rubric, ≥7.0 to pass). |
| 2026-02 | **Multi-tenant by config:** client rules → `clients/<id>/`; universal platform rules → `platform/`. No client logic hardcoded in system code. |
| 2026-06-21 | **One content house, multiple pipelines** (ads + books are siblings sharing `packages/core`). |
| 2026-06-21 | **Turborepo + pnpm monorepo**, modeled on gtmmachines: `apps/web` + `apps/cli` + `packages/core`. gstack as build harness (trial/global). |
| 2026-06-21 | **Database deferred** — stay file-based (JSON tenant configs + Zod); `packages/db` slot left open. |

## 3. Open Decisions

| # | Decision | Status | Working doc |
|---|----------|--------|-------------|
| D1 | **Book-publishing pipeline shape** — manuscript → layout → cover → KDP formats; which AI models; QA rubric for prose. | IN PROGRESS (active workstream — design captured, demand sweep underway) | [`../book-publishing/`](../book-publishing/) (hub + runbook + design + research) |
| D2 | **Remotion adoption** — required for ad pipeline steps 3/4/7 but not yet a dependency. When/how to add. | OPEN | [`../reference/tech-decisions.md`](../reference/tech-decisions.md) |
| D3 | **Headless QA auth** — Pass 2 is "we are Claude" interactively; needs `ANTHROPIC_API_KEY` when run headless/CI. | DECIDED in design (require key, fail-loud on refusal); implements when the deferred pipeline is built | [`../book-publishing/pipeline-design-D1.md`](../book-publishing/pipeline-design-D1.md) |
| D4 | **Database** — when to stand up Supabase and what it persists (asset tracking, book metadata, sales). | DEFERRED | — |
| D5 | **gstack mode** — trial/global now; revisit team-mode if collaborators join. | TRIAL | [`../tools/gstack/use-gstack.md`](../tools/gstack/use-gstack.md) |

## 4. Operating Principles

- **gstack is HOW we build, not WHAT we build** — see [`../tools/gstack/use-gstack.md`](../tools/gstack/use-gstack.md).
- **Lanes:** build-process → gstack; what-we-build (pipelines, brand/tenant knowledge, decisions) → this charter + `docs/`; engine logic → `packages/core` + `apps/cli`.
- **Read the spec before every generation** — from the file, not memory (see [`../reference/lessons-learned.md`](../reference/lessons-learned.md); dimension-check output FIRST).
- **Vision QA runs after every step, before any human sees output.**
- **Brad decides direction/taste/go-no-go; the agent drives mechanics.**

## 5. Context Snapshot

Monorepo migration shipped to branch `migrate/monorepo-turborepo-pnpm` on 2026-06-21
(see latest `docs/state/`). No app logic implemented yet — `packages/core` modules are
typed stubs. Next: the book pipeline (D1), then resume the ad pipeline's Drive-sync +
`generate-scene` CLIs (see [`../runbooks/google-drive-setup.md`](../runbooks/google-drive-setup.md)).

## Changelog
- 2026-06-21 — Charter created during the monorepo migration; distilled from the
  pre-monorepo `docs/` (preserved verbatim under `reference/` and the 2026-02-27 state file).
