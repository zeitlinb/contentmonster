# Book-publishing pipeline — category hub

> # ⛔ KILLED — 2026-06-27 (Amazon/KDP)
> **Selling books on Amazon/KDP is dead — not viable, abandoned 2026-06-27** (confirmed 2026-07-07). ContentMonster is **not** publishing books to KDP: there is no "book #1," no pricing, no runbook to execute, no strategy lock to ratify.
>
> The direction moved to **authority content** (lead magnets, articles/blog, an optional downloadable PDF) as a lead-gen funnel — scoped in memory (`[[project-authority-content-strategy]]`), deliberately **not** in canon.
>
> **Everything below is retained only as durable research artifacts** (demand sweeps, operator teardowns, economics) — useful reference, but the KDP plan itself is abandoned. **Do not resume KDP work from this folder.**

---

> **Entry point for ALL book-publishing work** (charter pipeline: books for Amazon/KDP).
> ContentMonster runs multiple content pipelines; this folder is the **books** category.
> Other content types (ad-creative, etc.) get their own sibling folders. Canon for *what
> we're building* lives in the [charter](../core-charter/contentmonster-charter.md) (decision **D1**);
> this hub is the books-specific deep-dive + index. Cross-session memory: `[[project-book-pipeline-strategy]]`.
>
> _Last updated: 2026-06-22 · **category KILLED 2026-06-27** (see banner above)._

## Where we are
Heavy **research + design phase, no book-pipeline code yet.** The niche is SET (Brad's own
domains). We have a granular KDP runbook, a captured automated-pipeline design, and the research
corpus. The **`/last30days` demand sweep is COMPLETE (3/3 runs, 2026-06-22)** and the nespola_io
operator teardown is done. **Final strategy lock awaits Brad's ratification** (recommended lock:
funnel-first KPI · AI Chief of Staff #1 · GEO #2 · GTM #3-or-defer) before charter D1 economics is
updated and book #1 begins.

## Locked decisions (Brad, 2026-06-22)
- **Series = ~5 short authority/nonfiction books** in Brad's domains: AI Chief of Staff (openclaw/Hermes), GEO/AI-SEO ("get found by ChatGPT/LLMs"), GTM engineering, +2 adjacent.
- **First title = AI Chief of Staff** (the one true white-space term; GEO is demand-rich but book-shelf-SATURATED → book #2 with differentiation).
- **KPI = funnel-first** (hybrid: track both royalties and qualified leads, optimize the backend). The demand sweep (run 3, book-funnel→high-ticket) **validated** funnel-first with hard guardrails (back-of-book funnel = publish precondition; free→paid leakage is the default failure). Final lock pending Brad's ratification.
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
- `2026-06-22-last30days-ai-cos-demand.md` — **sweep run 1/3:** AI Chief of Staff demand; concept buyer-pull strong, book-shaped demand = lead-magnet "teach me" behavior; white space holds → #1.
- `2026-06-22-last30days-gtm-engineering-demand.md` — **sweep run 2/3:** GTM engineering hot role but book shelf already saturated (GEO pattern), narrow buyer → #3 or defer.
- `2026-06-22-last30days-book-funnel-high-ticket.md` — **sweep run 3/3:** validates funnel-first KPI (math favors it; back-of-book funnel is a precondition).
- `2026-06-22-operator-teardown-nespola.md` — nespola_io = Tommi Pedruzzi corporatized; steal thin metadata/funnel mechanics, reject the model; customer whole-account KDP bans.

## Remaining work
1. ✅ DONE — `/last30days` demand sweep (3/3) + nespola_io operator teardown.
2. **GATE (Brad):** ratify the strategy lock (funnel-first · AI Chief of Staff #1 · GEO #2 · GTM #3-or-defer) → update charter D1 economics.
3. **Then** start the **instrumented hand-craft of book #1 (AI Chief of Staff)**, capturing how-to per runbook phase.
4. **Later (deferred):** build the `packages/core` book pipeline from the captured how-to + `pipeline-design-D1.md`.
