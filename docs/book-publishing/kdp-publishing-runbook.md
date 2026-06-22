---
title: KDP publishing runbook — zero → published book
date: 2026-06-22
status: draft v1 (research-backed; [VERIFY]-tagged items need a live re-check before Brad relies on them)
applies_to: ContentMonster book-publishing pipeline (charter D1); Brad's ~5-book authority series
sources: research/2026-06-22-operator-playbook-and-economics.md (hub: README.md)
relates_to: [[project-book-pipeline-strategy]]
---

# KDP publishing runbook — zero → published, for-sale book

> The literal, ordered, click-by-click playbook for getting one book live on Amazon KDP,
> tuned to Brad's authority-book series. **Who** does each step is marked `(Brad)` /
> `(agent)` / `(either)`. Phases 0–2 are **one-time** account setup; Phases 3–10 repeat
> **per book**. `[VERIFY]` = re-check against the live KDP UI / Brad's accountant before acting.

> **⚙️ PURPOSE — this runbook is the automation spec.** Book #1 (AI Chief of Staff) is
> hand-crafted manually *to capture the "how-to" knowledge layer* so each phase can be
> **promoted to an automation in `packages/core`** (empire model: do manually → instrument →
> automate). As we execute, every phase produces a **capture artifact** — actual inputs/
> prompts/tools used, the quality bar, and the human-judgment-vs-automatable boundary — which
> becomes the spec for its automate-this ticket. This file is the manual process *and* the
> blueprint for replacing it.

## Locked spec (per book)
- **Length:** ~22,000–28,000 words / ~100–120 pages, ~2-hr read. **Hard floor 18,000 words** (below = "too brief" reviews + KDP "disappointing content" exposure). 8–12 chapters of ~1,500–2,500 words around **one named framework**.
- **Price:** ebook **$4.99** to launch / build audience (70% band; ~$3.43 net), **$0.99** launch week only. **Hybrid upside:** business/prescriptive nonfiction commands **$6.99–$9.99** with a strong brand (Brad has it; both prices are in the same 70% band) — step later titles up as the series earns authority ($9.99 → ~$6.84/sale). Paperback **$13.99–$14.99** (clears the 60% print tier).
- **Formats:** ebook + paperback every title (paperback = the physical credential). Hardcover optional, flagship/post-launch only.
- **Distribution:** **WIDE** — no KDP Select/KU (it blocks the free portfolio-wide lead-magnet use). Optional one-time 90-day Select launch window with a **calendared day-90 opt-out** only.
- **Identity:** Brad's **real name** (the authority asset). Free KDP ASIN (ebook) + free KDP ISBN (print).

## ⛔ Two account-ending gates (all 5 books sit under ONE real-name account — one violation can nuke the series)
1. **AI disclosure.** KDP's verified 2026 rule: text whose **first draft came from AI is "AI-generated"** even after heavy edits. "AI-assisted" (no disclosure) = AI only brainstorms/outlines/checks grammar/refines **the human's own prose**. → **Default to human-written prose (Mode A); declare AI-assisted, box unchecked — honestly.** If any book is AI-drafted (Mode B), the **"AI-Generated: Text" box MUST be checked**. Mis-declaring is a documented termination trigger. Keep a dated per-book AI-usage log.
2. **Reviews.** Amazon prohibits reviews from anyone with a personal/financial relationship to the author (email list, network, household, beta readers) — incentive or not — and detects it via address-book matching. → **Drive your audiences to BUY (allowed, good for rank); let reviews come arms-length or via Amazon's Request-a-Review/Vine. Bar beta readers from reviewing.**

---

## Phase 0 — Decide & clear before touching KDP (one-time)
- **0.1 (Brad)** Decide author identity + tax entity; settle exact W-9 inputs. Personal = legal name / "Individual" / SSN. Single-member LLC (disregarded) = **owner's** name + "Individual/sole-proprietor" + owner's SSN/EIN (**never the LLC's EIN**). LLC taxed as partnership/S/C-corp = entity name + entity EIN + "Business". *Default: personal name for max authority.* ⚠ A Name/TIN mismatch triggers 30% withholding — **[VERIFY] with Brad's accountant before submitting.**
- **0.2 (Brad)** Confirm funnel destination per book (company + live offer + landing page); sequence releases to whichever funnels are **live first**. ⚠ A book with no live offer/landing page at launch = pure cost.
- **0.3 (Brad)** Decide **production mode per book** → drives the disclosure answer. *(A) human-written prose, AI outlines/researches/edits → assisted/unchecked (recommended);* (B) AI-written draft Brad edits → must check "AI-Generated: Text". ⚠ The single account-ending decision.
- **0.4 (either)** USPTO clearance on Brad's own product names before embedding — **"Hermes" especially** is heavily registered. [VERIFY at uspto.gov.]
- **0.5 (Brad)** Read the current KDP Content Guidelines + AI guidance and the U.S. Copyright Office AI guidance once (not from memory).
- **0.6 (either)** Lock the spec into the pipeline + two hard rules: (i) no verbatim reuse >1–2 sentences across titles; (ii) a per-book AI-usage + human-authorship log is a required dated deliverable.

## Phase 1 — Account & setup (one-time)
- **1.1 (Brad)** Go to **kdp.amazon.com**, sign in with Brad's Amazon account (or sign up). Enable **2FA** (required to reach payment settings).
- **1.2 (Brad)** Complete **Account → Author/Publisher Information**: legal name + mailing address (must match tax + bank records; not a pen name).

## Phase 2 — Tax & banking (one-time)
- **2.1 (Brad)** **Account → Getting Paid**: enter bank account (holder name must match records).
- **2.2 (Brad)** **Account → Tax Information → Complete Tax Information**: run the e-interview with the exact Name/classification/TIN from 0.1 → US routes to W-9, e-signed, validates in ~24–72h. ⚠ Skip = 30% withholding. Name must match IRS exactly ("Robert" not "Bob"). One US interview governs all marketplaces.
- **2.3 (Brad)** In Getting Paid, choose **EFT/direct deposit for EVERY marketplace** (US + UK/EU/…). EFT has **no threshold**, pays ~60 days after month-end. Check/wire HOLD funds until $100/€100. ⚠ Non-US marketplaces left on check/wire accrue but never pay out. [VERIFY thresholds.]

## Phase 3 — Manuscript (per book)
- **3.1 (agent)** Validate title/subtitle + reader-problem framing via ChatGPT + Amazon Suggest + competitor 1–3★ review-mining — **research only**. ⚠ Exclude the Pedruzzi failure modes: no cloning, no pseudonyms, no mine-and-republish.
- **3.2 (Brad)** Record/dictate genuine expertise per book (Scribe "speak-then-edit"): Brad talks the book → human writes prose from the transcript → AI outlines/researches/edits. ⚠ Thin input = AI slop = brand damage, and pushes toward must-disclose Mode B.
- **3.3 (agent)** Run **Mode A**: ChatGPT outline (8–12 chapters + reader fears/desires) → human long-form prose → AI research/tighten/error-check → Grammarly/Hemingway + plagiarism + cross-book similarity check. Log what AI did + which disclosure box applies. ⚠ Enforcement targets undisclosed-AI + thin/duplicate + low quality, **not cadence** (the only velocity limit is 3 new titles/24h).
- **3.4 (Brad)** **BLOCKING gate** — Fitzpatrick "recommendable" test: hand the manuscript to real target operators/execs as **private** feedback; refine until it passes. ⚠ Beta readers are private feedback only — **barred from posting Amazon reviews.**

## Phase 4 — Interior format (per book)
- **4.1 (agent)** Produce the lean Kindle file + print interior PDF at chosen trim (6×9). Layout tooling per ContentMonster rules; never rely on AI-rendered text. Lean file size protects the $0.15/MB delivery fee. ⚠ Pick trim **before** finalizing word count.
- **4.2 (agent)** Run KDP's **Cover Calculator** for exact spine width (~0.00225 in/page) + bleed/paper. Hardcover = separate calc (case-laminate, different geometry). ⚠ Wrong spine = rejected print cover.

## Phase 5 — Cover (per book)
- **5.1 (agent)** Design in Canva (concepts via Ideogram), serious revenue-infra aesthetic — **no AI-blue/purple/robot clichés**. "The cover gets you paid." Year-stamp where recency matters (GEO). ⚠ If ANY cover/interior **image is AI-generated**, you must check "AI-Generated: **Images**" at 6.3 (independent of the text box). Get a written designer attestation per book.

## Phase 6 — Create the title + metadata/keywords/categories (per book)
- **6.1 (either)** Bookshelf → **+ Create → Create eBook** first (fastest path to Live). Formats auto-link when title + author match exactly. ⚠ If not, contact KDP support.
- **6.2 (either)** Page 1 "Details", fixed order: Language; Title + Subtitle (<200 chars); **Series** (attach); Edition; **Primary Author** ("Brad Zeitlin", identical across editions); Contributors; Description (≤4,000 chars, limited HTML, lead with the framework name). ⚠ **Irreversible after publish:** Author/Contributor names, Title, Language, format/ISBN. Editable later: description, keywords, categories, price, A+.
- **6.3 (either)** Publishing Rights: "I own the copyright". Primary audience + reading age. **AI-content question per 0.3:** Mode A → don't check Text box; Mode B → check it. Check **Images** box if any image was AI-generated. ⚠ Disclosure is internal-only, free; mis-declaring is the termination risk.
- **6.4 (agent)** 7 keywords (50 chars, 2–3-word phrases, not duplicating the title) + up to **3 categories per format** from the browse tree. Disambiguate "AI Chief of Staff" hard from "Chief AI Officer". **Ranking mechanics (2026):** Amazon weights ~**60% category relevance / 40% keyword match**; pick the **most specific** category (e.g. "Business > … > Entrepreneurship" — ~3.4× the qualified traffic of a broad one) and spread the 3 slots across **different hierarchies**; use **long-tail** keywords (a specific phrase converts ~12× a one-word term). Give keywords **30–60 days** before changing. ⚠ 3-category cap is firm (the email-for-10 option was removed in 2023).
- **6.5 (either)** Pre-order: "ready to release now" or a future date (ebook-only feature).

## Phase 7 — Upload, similarity check & preview (per book)
- **7.1 (agent)** Page 2 "Content": upload manuscript + cover; run the **Previewer** across devices; fix rendering. Run the **cross-book similarity check first** (gates KDP's "excessively reutilized content" rule — matters before #4/#5). ⚠ Broken rendering → bad reviews.
- **7.2 (Brad)** Paperback: order **1 proof copy** (Draft only, after approving in Print Previewer). ~$2.40–$2.80 print + ~$3–$5 shipping. After approval, order cheaper **author copies** for hand-out stock. ⚠ Proofs aren't free; clear Print Previewer hard errors first.

## Phase 8 — Pricing, territories & KU decision (per book)
- **8.1 (either)** **KDP Select: do NOT enroll (go wide).** Optional 90-day launch window only, then **turn off auto-renew before day 90**. KU pays ~$0.0045/page (~$0.60–$0.75 for a full read) — pennies for low-borrow nonfiction. ⚠ Select auto-renews and locks the ebook Amazon-exclusive.
- **8.2 (either)** Ebook list **$4.99** (or $0.99 launch week 1), **70% plan**, all territories + worldwide rights. Net ~$3.43 after the **$0.15/MB** delivery fee on a sub-1MB file. GEO may go $6.99. ⚠ $0.99 forces the 35% plan (~$0.35) — launch only, never standing.
- **8.3 (either)** Paperback list **$13.99–$14.99** (clears $9.99 for the 60% tier; ~$5.59 royalty at $13.99). ⚠ Below $9.99 drops to 50%.

## Phase 9 — Proof/preview & publish (per book)
- **9.1 (Brad)** Final go/no-go: verify irreversible fields (Author, Title, Language, format/ISBN) + live preview, cover, description, price, **correct AI-disclosure answer**, AND that the **CTA landing page + capture + nurture are LIVE** → click **Publish**. Status: Draft → In Review → Live (~24–72h; +72h to appear in search). ⚠ Outward-facing/irreversible — **Brad's call**. Never publish a book whose production mode (3.3) ≠ its disclosure answer (6.3).
- **9.2 (either)** Confirm ebook + paperback are linked on one detail page. ⚠ If not, contact KDP support.

## Phase 10 — Post-publish (per book + some one-time)
- **10.1 (Brad)** **Author Central** (author.amazon.com, one-time): photo, bio (tie to Constellation/GTM Machines/openclaw/Hermes), website. ~30 min, free.
- **10.2 (agent)** Add **A+ Content** per title (KDP Marketing → A+ Content): branded framework/credential modules. Free, ~24–72h approval. A+ assets do **not** inflate the ebook file/delivery fee.
- **10.3 (Brad)** Drive Brad's audiences to **BUY** the $0.99 launch (velocity → rank), then raise to $4.99. Note the 2026 algorithm favors **long-term relevance over launch bursts** — a sustained-sales + category-rotation posture beats a one-week spike, so don't over-index on the launch pop. ⚠ **NEVER solicit reviews** from list/network/household/beta readers — fastest suspension path (this is exactly where mainstream "send ARCs to your email list" advice goes wrong). Selling to those audiences is fine; a **back-matter review request to arms-length buyers** is fine; soliciting your own list/beta readers to review is not.
- **10.4 (agent)** **Activate the backend (the actual product):** per-book landing page + email capture (privacy notice) + 7–10-email CAN-SPAM nurture mapped to the chapters + "book a call"/trial CTA into the matching company. Publish the **free email-gated PDF** on Brad's own sites (lightly CTA-enriched, not byte-identical to the paid file). ⚠ Must be LIVE at launch (a 9.1 precondition). Never upload the free PDF to KDP at $0.
- **10.5 (either)** Cross-link the series (back-matter CTAs to the next book + a company), stagger releases ~4–8 weeks apart, calendar annual GEO/AEO refreshes. ⚠ Cross-references only — no reused body chapters (duplicate-content rule).

---

## The genuine forks (Brad decides — see the research doc for full options)
Funnel-vs-revenue KPI · production mode per book · launch traction without review violations · personal vs entity tax · own ISBN vs free · ebook-only vs +paperback/+hardcover · KU vs wide · **which title first (rec: AI Chief of Staff)** · keep/defer book #4.

## Key sources (full list in the research doc)
KDP Content Guidelines (G200672390) · KDP AI disclosure 2026 (aipolicydesk; bookwriter.vip) · Amazon review policy (Community Guidelines GLHXEX85; authorimprints) · royalty bands + $0.15/MB delivery fee (kdpeasy; G200644210) · paperback tiers (G201834330) · payment thresholds/timing (G201207800; GK2MKZUL6U3SFBPZ) · SMLLC W-9 (irs.gov; legalzoom) · categories (G200652170) · Pedruzzi investigation (piratewires) · funnel-book doctrine (Capuzzi 100-Page Book; Kennedy Book The Business; Dib; Fitzpatrick Write Useful Books; Shreeve One Book Millions) · demand (emarketer GEO/AEO; chiefofstaff.network; bloomberry GTM eng) · USPTO.
