# The Tenant × Channel Machine — scaffold proposal

> **Status: RATIFIED 2026-07-11 (Brad: "greenlight"). Phase 1 (the re-org) executed
> the same day — promoted to the charter as a settled decision. Phases 2–5 follow;
> forks §5.2–5.5 (empire-doc routing, X greenlight, authority surface, wave-1 roster)
> remain open.**
>
> Brad's goal (verbatim intent): ContentMonster evolves to handle **all the content,
> posting, authority-asset creation, and setup for all the tenants** (HubExperience,
> Constellation, …) the way we did for LinkedIn and YouTube — so that "I have
> Constellation and want it seen on social channels" runs with **super low friction**.

## 1. The problem with today's shape

The repo is **channel-first**: `youtube/` and `linkedin/` each carry their own
`tenants/` folder. That was right for building the first two engines, but it breaks
at Brad's actual unit of intent, which is **tenant-first** ("get Constellation seen"):

- A company's presence is scattered — Constellation lives inside `youtube/tenants/`,
  HubExperience inside `linkedin/tenants/`. There is **no single place that IS a
  company's content operation**.
- Cross-channel things have no home: brand kit, voice, content pillars, the calendar,
  the repurposing loop (one story → video + post + thread), approval state, publish log.
- Every new channel adds another top-level dir with another embedded tenant list —
  the matrix grows in the wrong direction.
- Legacy from the ad-creative era (`clients/jaca`, `platform/meta.json`) is a *third*
  tenant convention sitting beside the other two.

## 2. Proposed shape — two axes, cleanly separated

**Engines are channel-first. State is tenant-first.** (Brad's own framing: "you are
the engine for them — they are a consumer of you.")

```
channels/                      ← reusable, company-agnostic ENGINES (the HOW)
  youtube/                       moved from top-level: README, playbook/01-06,
                                 templates, scripts (mint-token, operate-youtube)
  linkedin/                      moved from top-level: README, playbook/01-06,
                                 templates, scripts (reserved until API granted)
  x/                             NEW (Phase 4): playbook + API-reality doc + scripts
  web/                           NEW (gated on the authority-surface decision):
                                 owned publishing surface for authority assets
  _TEMPLATE/                     NEW-CHANNEL scaffold — how to stand up the next
                                 engine (playbook skeleton, api-reality doc form,
                                 scripts conventions, honesty rules)

tenants/                       ← one home per COMPANY (the WHO)
  constellation/
    tenant.md                    identity card: company, source-of-truth brand repo,
                                 goals, APPROVERS (who signs off before publish)
    brand/                       brand kit — canonical assets or pointers to the
                                 company repo's locked canon (never fork the truth)
    strategy.md                  voice + content pillars, cross-channel
    calendar.md                  the queue: what's planned/drafted/awaiting-approval/
                                 published, per channel
    channels/
      youtube/                   was youtube/tenants/constellation/ — config,
                                 setup-guide, assets spec, agents/README
      linkedin/                  future binding (engine exists; ~30-min onboard)
      x/                         future binding
    content/                     produced CONTENT ITEMS (see §3)
  hubexperience/
    tenant.md · brand/ · strategy.md · calendar.md
    channels/linkedin/           was linkedin/tenants/hubexperience/
    content/                     post-1 moves here as content item #1
  jaca/                          ARCHIVED banner — dormant ad-creative tenant
                                 (absorbs clients/jaca; wakes when ads pipeline does)
  _TEMPLATE/                     cross-channel NEW-TENANT onboarding (~30 min/channel)

credentials/<channel>/<tenant>/  (unchanged convention; gitignored)
packages/core · apps/cli · apps/web   (unchanged; code substrate)
docs/                            (canon unchanged; charter stays macro)
```

Migration is `git mv` + link fixes — both engine READMEs were built tenant-aware
precisely so this would be "a move, not a rewrite."

## 3. The content machine (what makes it RUN, not just sit organized)

The folders are the chassis. Five subsystems make it a machine:

1. **Tenant spine** — `tenant.md` declares the approvers (sovereignty built in:
   Brad for Constellation; Brad + Tully for HEC), the brand source-of-truth pointer,
   and the goal ("what does 'seen' mean for this company").
2. **Channel engines** — per platform: standup playbook, *honest* agent-control/API
   doc, operate script. YouTube = complete (token durability proven 2026-07-09).
   LinkedIn = complete minus gated posting API. X = not started.
3. **Content items** — the unit of production. One story authored once →
   `tenants/<id>/content/<item>/` with `item.md` (status per channel:
   IDEA → DRAFT → QA → **APPROVED** → PUBLISHED, publish log) + renditions
   (HyperFrames video for YouTube, image+copy for LinkedIn, thread for X).
   The APPROVED gate is first-class: **low friction ≠ unilateral posting.**
4. **Distribution ops** — `operate-<channel>` scripts where the API allows
   (YouTube now; X when built; LinkedIn human-in-loop until the Community
   Management API is granted — parallel application track, never launch-blocking).
5. **Status surface** — the tenant × channel matrix at a glance: live?, last post,
   queue depth, pending approvals. Start as a generated `STATUS.md` / `apps/cli`
   command; file-based per D4 (DB stays deferred).

**Authority assets** (the KDP successor) slot in as a content *type* (article,
lead magnet, PDF) whose primary channel is `channels/web/` and whose renditions
repurpose to social — but the surface decision (generate-only vs host in `apps/web`
vs existing property) is still Brad's open call and gates that lane only.

## 4. Phasing

| Phase | What | Effort | Gate |
|---|---|---|---|
| 1 | **Re-org**: create `channels/` + `tenants/`, git-mv both engines + both tenants, absorb `clients/jaca` + `platform/`, fix cross-refs, charter accuracy touch-up. Fold in offsite hygiene (dedupe `agent/skills` vs `.agents/skills`, `.env.example`, minimal CI lint) since files are moving anyway. | one session | Brad ratifies shape |
| 2 | **Tenant spine**: `tenant.md` schema + `_TEMPLATE`s; fully scaffold constellation + hubexperience (approvers, brand pointers, pillars from existing strategy docs, calendar seed). | one session | — |
| 3 | **Content machine**: content-item model + approval states + publish log; first item flows end-to-end (likely Constellation video #1 or the HEC first post — both already drafted). | 1–2 sessions | — |
| 4 | **Channel expansion**: X engine (playbook + API tier — pricing needs live verification); Constellation×LinkedIn binding; LinkedIn API application (parallel); `channels/web/` once the authority-surface call is made. | per channel | Brad: X greenlight + API tier; authority surface |
| 5 | **Ops loop**: status command, scheduled health routines (the token-check pattern, generalized), analytics pulls. | incremental | — |

## 5. Decisions this plan needs from Brad (genuine forks only)

1. **Ratify the shape** — channels/ + tenants/ split, tenant-first state. (Everything
   else in Phase 1–3 is mechanics.)
2. **Empire-model implication** — this cements social channel-ops **inside
   ContentMonster** (engine = CREATE + channel-ops), contradicting the PROPOSED
   empire doc's "channel-ops → GTM Machines" routing. Update the PROPOSED doc to
   match reality, or keep a "may migrate later" note?
3. **X/Twitter** — greenlight the engine build? (Paid API; tier/pricing to verify
   live at build time.)
4. **Authority surface** (carried since 2026-06-27) — generate-only / host in
   `apps/web` / publish into an existing property. Gates the authority lane only.
5. **Tenant roster** — constellation + hubexperience now; anyone else in wave 1?
   (Brad mentioned "bzresearch/constellation" — treat as one tenant (Constellation,
   with bzresearch as its doctrine source) unless Brad says otherwise.)

## 6. What "Constellation, seen on social, low friction" looks like after this

Open `tenants/constellation/` → `calendar.md` says what ships this week →
`content/` items carry their renditions + approval state → Brad approves in one
pass → `operate-youtube.py upload` posts the video (agent, durable token), the
LinkedIn/X renditions post via their lanes → publish log + STATUS update
automatically. Adding a whole new channel = follow `channels/_TEMPLATE`, bind it
in `tenants/constellation/channels/`, ~30 minutes of config plus the platform's
own gates. That's the machine.
