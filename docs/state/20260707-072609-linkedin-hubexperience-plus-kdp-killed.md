---
status: handoff
branch: main
timestamp: 2026-07-07T07:26:09-0400
head_commit: fe61468 (== origin/main; working tree clean)
session_theme: Built the reusable linkedin/ channel-ops engine + HubExperience tenant #1 (page assets + copy + HyperFrames first-post image, not yet live); killed the Amazon/KDP book pipeline across canon. Both pushed to main.
files_modified: linkedin/** (NEW module — README, playbook 01-06, templates, tenants/hubexperience/{linkedin-config,setup-guide,content-strategy,assets,agents,post-1}); docs/core-charter/contentmonster-charter.md; docs/book-publishing/{README,kdp-publishing-runbook,pipeline-design-D1}.md; CLAUDE.md; docs/state/*; ~/.claude memory (direction, linkedin-channel-ops NEW, hyperframes-still NEW, authority-content, MEMORY.md)
---

### Summary
Stood up **`linkedin/`** — a reusable, company-agnostic LinkedIn channel-ops engine, exact sibling to `youtube/` — with **The HUB Experience Company as tenant #1**: brand assets (Logo B, green cover, a HyperFrames first-post image), page config, printable setup guide, and a drafted first post, all committed (`a13b337`). Then **killed the Amazon/KDP book pipeline** everywhere in canon (`fe61468`). ContentMonster is now demonstrably a **multi-channel content engine** (YouTube + LinkedIn), per Brad's steer. Nothing on the HubExperience page is live yet — assets + copy await Brad/Tully sign-off + upload.

### Next Move
**Ask Brad which live thread to resume — (A) take HubExperience's LinkedIn Company Page LIVE, or (B) Constellation YouTube video #1 (carried from predecessor).** For (A): get sign-off on the DRAFT copy + first post → add Brad as 2nd Super admin → [CONFIRM] page settings → upload `SELECTED--` logo+cover + publish the first-post image+caption. **All of (A) is outward-facing = Brad/Tully's go/no-go; don't publish unilaterally.**
- **Boot-reads (after CLAUDE.md + auto memory):**
  - This file.
  - _(A)_ `linkedin/tenants/hubexperience/linkedin-config.md` (~all values + copy + `[CONFIRM]`s) · `content-strategy.md` (the first post) · `setup-guide.md` (the click-by-click).
  - _(B)_ `youtube/tenants/constellation/content-strategy.md` (~57L, the locked slate) — only if resuming Constellation.
- **Defer (JIT):** `linkedin/playbook/02-agent-control-api.md` + `agents/README.md` (only when pursuing the gated LinkedIn API); `assets/render-*.py` + `post-1/index.html` (only to re-render assets); `youtube/scripts/operate-youtube.py` (only to upload Constellation #1); the hubexperience repo's `core/brand/*` + `core/gtm/messaging/*` (only to revise HEC copy).
- **Do NOT read:** `linkedin/tenants/hubexperience/assets/variants/*` + `fonts/` + `dist/`; `credentials/` (secrets); the `agent/skills` + `.agents/skills` vendored trees; `docs/book-publishing/**` (KILLED — research artifacts only).

### Snapshot
- **2 commits this session:** `a13b337` (linkedin module), `fe61468` (KDP kill). HEAD `fe61468` == origin/main, tree clean.
- **LinkedIn canonical assets** (top-level `SELECTED--*`; alternates in `variants/`): `assets/SELECTED--logo-300x300.png` (Logo B, cream H on **sage #667263**), `assets/SELECTED--cover-1128x191.png` (green statement cover), `post-1/SELECTED--post-1-image-1080x1350.png` (HyperFrames). The "H" logo is INTERIM until the real HEC emblem lands.
- **HubExperience Company Page** is LIVE at **linkedin.com/company/hubexperienceco** (Tully created + set the URL 2026-07-06) — but NOT yet branded/populated by us.
- **KDP kill** landed in: charter §1+D1 (KILLED), `docs/book-publishing/` hub banner + runbook + pipeline-design status lines, CLAUDE.md. Research artifacts retained.
- The **offsite review** session (Fable 5, read-only) is being cleared by Brad — nothing to integrate beyond what's captured here.

### Decisions Made (Brad's words verbatim)
- Architecture: *"you are the engine for them - they are a consumer of you"* → create `linkedin/` with `tenants/`, HubExperience = tenant #1.
- Framing (correcting the offsite): *"it's too early to lock this project down as youtube. it is a full content machine which our projects are a consumer of"* + *"the charter can't be locked - only abstract/macro direction."*
- Scope: *"Tully has already created the Company Page... change that to hubexperienceco. Don't worry about Tully's personal page yet."* (Company Page only.)
- Brand: *"I want to use the hex code #667263"* (sage, the LinkedIn accent) · *"this is the logo we are going to go with"* (Logo B) · picked the **green** cover · cover subtext *"caps letters... (all caps)"*, keep the statement, *"make that stunning."*
- *"I want to use hyperframes to create a powerful image... revising... the first post... properly articulate what The HUB Experience Company is."*
- *"yes - just commit and push to main"* (linkedin module).
- Offsite session: *"should I just clear that session?... no need for it to push anything or commit - right?"* → yes, clear it; read-only.
- *"we killed the amazon kdp thing a while ago - please kill it."*
- _Agent-made (mechanical):_ engine/playbook authoring; asset render scripts (PIL) + HyperFrames still; the SELECTED--/variants file organization; drafting HEC copy from the hubexperience repo's locked brand canon; the canon kill-edits + memory writes.

### Remaining Work (priority; disposition per item)
1. **HubExperience LinkedIn go-live** (approve copy+first post · add Brad as 2nd Super admin · `[CONFIRM]` settings: industry rec Events Services / size / founded rec **blank** / HQ rec Nashville / button rec "Contact us" · upload logo+cover · publish) — **CARRIED**; outward-facing, Brad/Tully. The in-flight thread.
2. **Constellation YouTube video #1** (+ build the "Where are you invisible?" scan + voice taste-gate) — **CARRIED**; predecessor's Next Move, untouched this session.
3. **Constellation token durability check** — **CARRIED**; scheduled **2026-07-09 09:00** (auto-runs + reports; act only on FAILURE).
4. **LinkedIn Community Management API** (agent posting for the page) — **CARRIED**; gated parallel track, NOT launch-blocking. See `linkedin/playbook/02`.
5. **Authority-content successor realm** — **CARRIED**; KDP is dead but the replacement is *unscoped by design* (kept out of macro canon). Open (Brad): publishing surface (generate-only / host in apps/web / existing property) + keep-or-rescope topic pillars. See memory `project-authority-content-strategy`.
6. **Empire operating model** — **CARRIED**; still PROPOSED/unratified, and this session's shipped reality (channel-ops lives in ContentMonster) contradicts its "channel-ops → GTM Machines" routing.
7. **Offsite repo-hygiene** (dedupe `.agents/skills` vs `agent/skills`; minimal `youtube/` CI lint; archive `clients/jaca` + `platform/meta.json`; add `.env.example`) — **CARRIED**; optional, from the read-only offsite; Brad deprioritized a big consolidation.
8. **Books→authority charter re-scope** — **CLOSED** (KDP killed in canon 2026-07-07, `fe61468`).
9. **LinkedIn module build + commit** — **CLOSED** (`a13b337`).
10. **Offsite review session (Fable 5)** — **DROPPED** (Brad clearing it; read-only, value already extracted, must not commit).

### Notes
- **LinkedIn agent-posting is genuinely GATED** — Community Management API needs app + Page verification + LinkedIn review; tokens short-lived; no YouTube-style Internal-app shortcut. Do NOT promise "agents run the page." Launch = human-in-the-loop (Tully publishes).
- **Charter stays macro** (Brad). The KDP-kill edits were *accuracy* (un-asserting a false active-claim), not a new lock. Don't enumerate channels/workstreams into canon; specifics live in the module/tenant folders.
- **HEC copy is DRAFT** pulled from the *separate* `hubexperience` repo's locked brand canon — don't publish without Tully's sign-off (she's the public face; voice is locked there).
- **HyperFrames still-image gotcha** captured in memory: png-sequence ignores the composition root's own `background` → paint bg as a full-bleed child div (see `[[reference-hyperframes-still-image]]`).
- The offsite (Fable 5) review was read-only; its two live catches (book docs stale [now fixed]; Constellation scan unowned [item 2]) are captured here — no need to chain-read it.

### Currency Check (verified on disk this session)
- `linkedin/tenants/hubexperience/assets/SELECTED--{logo-300x300,cover-1128x191}.png` + `post-1/SELECTED--post-1-image-1080x1350.png` present (300×300 / 1128×191 / 1080×1350) ✓
- `linkedin/README.md` + `playbook/01-06` + `templates/*` + tenant `{linkedin-config,setup-guide,content-strategy,assets/README,agents/README}.md` present ✓ · committed in `a13b337` ✓
- KDP KILL markers present in charter + `docs/book-publishing/{README,kdp-publishing-runbook,pipeline-design-D1}.md` + CLAUDE.md ✓ · committed in `fe61468` ✓
- No "active workstream" framing for books remains in canon (grep clean) ✓ · HEAD `fe61468` == origin/main, tree clean ✓
- Memory files updated/created (see below) ✓

### Memory Written
- `project-contentmonster-direction.md` — appended the 2026-07-07 engine/consumer + charter-stays-macro steer.
- `project-linkedin-channel-ops.md` — **NEW**; the `linkedin/` module + HubExperience tenant status.
- `reference-hyperframes-still-image.md` — **NEW**; the still-render gotchas.
- `project-authority-content-strategy.md` — updated: canon now records the KDP kill (open: surface + pillars).
- `MEMORY.md` — index +2 lines (linkedin, hyperframes-still); authority-content line updated.
