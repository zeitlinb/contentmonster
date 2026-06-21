# How We Use gstack Here — Onboarding

> Read this before you write a line of code on ContentMonster. gstack is our "head of
> software engineering": a discipline for planning, reviewing, testing, and shipping —
> not the content engine itself. Decision trail: D5 in
> [`../../core-charter/contentmonster-charter.md`](../../core-charter/contentmonster-charter.md).

## Status (read first)
- gstack is our adopted build methodology, **installed global + namespaced** (commands are `/gstack-*`), **trial mode — NOT team-pinned into this repo**.
- In-repo footprint is intentionally minimal: `VERSION` + `CHANGELOG.md` (owned by `/gstack-ship`) and this `docs/tools/gstack/` doc. Everything else lives in `~/.gstack/`, backed up to `docs/state/`.
- If `/gstack-*` commands don't exist, gstack isn't installed in this session — note it and proceed; the migration does not depend on it being active.

## 1. The one thing to internalize
**gstack is HOW we build. It is not WHAT we build.** ContentMonster's pipelines
(ad-creative + books), brand/tenant knowledge, and CLIs are ours to design — gstack
has no opinion about content. If you catch yourself asking gstack to *generate content*,
wrong tool: gstack helps you *build the tools that generate content*.

## 2. Lanes — never blur these
| Concern | Owner | Where |
|---|---|---|
| How we build the software (plan, review, test, ship, build-session state) | **gstack** | `~/.gstack/...`, `/gstack-*` |
| What we're building + pipeline/brand/tenant knowledge + decisions | **the charter & doctrine** | `docs/core-charter/`, project memory |
| The content engine's own logic (scene gen, compositing, QA, book pipeline) | **our code** | `packages/core`, `apps/cli`, `apps/web` |

## 3. The standard build loop (every non-trivial task)
**Think → Plan → Build → Review → Test → Ship → Reflect.** Don't skip Review.
1. **Think** — `/gstack-office-hours` or `/gstack-spec` (no code from a vague idea).
2. **Plan** — `/gstack-plan-eng-review` (+ `/gstack-plan-ceo-review` for scope), or `/gstack-autoplan`.
3. **Build** — implement, fed by the design doc + plan.
4. **Review** — `/gstack-review` (auto-fixes mechanical) **and** `/gstack-codex` (cross-model). Bugs: `/gstack-investigate` (root-cause + regression test).
5. **Test** — Vitest for core/CLI; `/gstack-qa` (real browser) for any UI.
6. **Ship** — `/gstack-ship` (sync → test → version → CHANGELOG → bisectable commits → push → PR). Then `/gstack-document-release`.
7. **Reflect** — `/gstack-retro`, `/gstack-learn`.

## 4. Rules of the road
- **Never ship unreviewed:** `/gstack-review` + `/gstack-codex` before `/gstack-ship`.
- **Guard destructive/live work:** `/gstack-careful` / `/gstack-guard`. No fixes without root cause.
- **`VERSION` is gstack-owned** (four-part `MAJOR.MINOR.PATCH.MICRO`); `/gstack-ship` bumps it. Keep it == `package.json.version`. Don't hand-edit.
- **Save context before you stop.**

## 5. Browser policy
Two browser stacks; pick one per context. Build-time QA → gstack's browser (`/gstack-qa`, `/gstack-browse`). Operating-time (research, scraping) → the `claude-in-chrome` MCP. Never both at once.

## 6. Install (trial: global + namespaced)
```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack \
  && cd ~/.claude/skills/gstack && ./setup --prefix
```
`--prefix` → namespaced `/gstack-*`. When setup asks "add gstack to the current project?" → **No** (trial stays global). Requires Bun v1.0+. Reversible: `~/.claude/skills/gstack/bin/gstack-uninstall`.
