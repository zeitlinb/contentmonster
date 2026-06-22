# Book-publishing pipeline — category hub

> **Entry point for ALL book-publishing work** (charter pipeline: books for Amazon/KDP).
> ContentMonster runs multiple content pipelines; this folder is the **books** category.
> Other content types (ad-creative, etc.) get their own sibling folders. Canon for *what
> we're building* lives in the [charter](../core-charter/contentmonster-charter.md) (decision **D1**);
> this hub is the books-specific deep-dive + index. Cross-session memory: `[[project-book-pipeline-strategy]]`.
>
> _Last updated: 2026-06-22._

## Where we are
Heavy **research + design phase, no book-pipeline code yet.** The niche is SET (Brad's own
domains). We have a granular KDP runbook, a captured automated-pipeline design, and 5 research
artifacts. We are **mid-`/last30days` demand sweep** (don't lock conclusions until it's done).

## Locked decisions (Brad, 2026-06-22)
- **Series = ~5 short authority/nonfiction books** in Brad's domains: AI Chief of Staff (openclaw/Hermes), GEO/AI-SEO ("get found by ChatGPT/LLMs"), GTM engineering, +2 adjacent.
- **First title = AI Chief of Staff** (the one true white-space term; GEO is demand-rich but book-shelf-SATURATED → book #2 with differentiation).
- **KPI = TRUE HYBRID** (build the funnel AND optimize royalties; track both). NOTE: the funnel-vs-revenue *economics* is still **PROVISIONAL** pending the rest of the demand sweep.
- **Hand-craft book #1, then automate** — and the manual build's PURPOSE is to **capture the how-to knowledge layer** as the spec for the `packages/core` automation.
- **Mode A** production: human-written prose, AI only outlines/researches/edits (honest "AI-assisted" disclosure + enforceable copyright). The automated design must augment, not replace, authorship.
- Specs: ~22–28k words (30–40k if revenue weight rises) · ebook **$4.99** (brand-justified upside to **$6.99–$9.99**) · paperback **$13.99–$14.99** · **wide** (no KU) · **real name** · free KDP ASIN/ISBN.

## ⛔ Two account-ending compliance gates (all 5 books, one real-name account)
1. **AI disclosure** — AI-first-drafted text = "AI-generated" even after edits → default Mode A (human-written); honest unchecked box; keep a per-book AI-usage log.
2. **Reviews** — never solicit from list/network/beta readers (Amazon address-book-matches). Drive **buys**, not reviews.

## Map of this category
| Doc | What it is |
|---|---|
| [`kdp-publishing-runbook.md`](kdp-publishing-runbook.md) | The literal click-by-click **zero → published** playbook (11 phases, who-does-what, gotchas, `[VERIFY]` tags). Also the **automation spec** for book #1's instrumented build. |
| [`pipeline-design-D1.md`](pipeline-design-D1.md) | Captured **automated `packages/core` pipeline design** (Typst typesetting, two-pass prose-QA rubric: 8 fiction / 9 nonfiction dims, run-ledger). **DEFERRED** to the post-#1 automation phase. Decides charter D3 (implements when built). |
| [`research/`](research/) | All book research artifacts + index. See [research/README.md](research/README.md). |

### Research artifacts ([research/](research/))
- `2026-06-22-operator-playbook-and-economics.md` — the deep dive: funnel-vs-revenue evidence, operator teardowns (incl. Tommi Pedruzzi), length/price, domain demand, decision forks, account-critical risks.
- `2026-06-22-last30days-ai-authority-book-creators.md` — who teaches write-&-sell-with-AI; legit vs. hype.
- `2026-06-22-last30days-kdp-stepbystep-process.md` — process/pricing confirmation + category/keyword ranking mechanics.
- `2026-06-22-last30days-length-pricing.md` — length/price norms + the hybrid pricing upside.
- `2026-06-22-last30days-geo-aiseo-demand.md` — GEO demand-rich but supply-saturated (≥6 books); confirms GEO = #2.

## Remaining work (next session)
1. **Finish the `/last30days` demand sweep** (Brad-invoked; don't shortcut — `[[feedback-dont-shortcut-research-pace]]`): **AI Chief of Staff demand** (the key one — our first title), **GTM engineering demand**, **funnel/lead-magnet** angle.
2. **Operator teardowns of specific people Brad named** — start with **[nespola_io](https://x.com/nespola_io)** (+ a couple more Brad will name). Same treatment as the Tommi teardown; fold into `research/`.
3. **Then** lock strategy → start the **instrumented hand-craft of book #1 (AI Chief of Staff)**, capturing how-to per runbook phase.
4. **Later (deferred):** build the `packages/core` book pipeline from the captured how-to + `pipeline-design-D1.md`.
