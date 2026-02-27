# Session State — Last Updated 2026-02-27

## What's Done
- Next.js project scaffolded, built, committed, pushed to https://github.com/zeitlinb/contentmonster.git
- Dependencies installed: sharp, commander, zod, dotenv, googleapis, tsx
- .env.local configured with GEMINI_API_KEY and GROK_API_KEY
- Jaca tenant configs created: clients/jaca/{brand,products,scenes,layouts,qa-rules}.json
- Universal platform specs: platform/meta.json
- Context docs saved to docs/ and Claude memory files
- All committed and pushed to GitHub (branch: main)

## What's Next — IN ORDER
1. **Google Drive API setup** (in progress)
   - User needs to do browser steps first:
     a. Go to https://console.cloud.google.com/
     b. Create project (or use existing) → enable Google Drive API
     c. Create Service Account → download JSON key file
     d. Share these 4 Drive folders with the service account email (Viewer):
        - Brand/Logos: 1LIxX8h8c3nJl_buB4owF1rIxJMDZXSGA
        - Product Photos: 1y3aT6KObReEtqAzDx0ppPvtSVoiByYol
        - UGC: 1W-8iOu8hfSBWtKLkaUb0_omhcEATsvfz
        - Ad Creative Library: 1ZMAitCdv9Ce_P7YShOC1UTy2s68LRLLw
     e. Drop JSON key at: contentmonster/credentials/drive-service-account.json
   - Then I build: src/cli/download-assets.ts to sync Drive → clients/jaca/assets/

2. **First CLI: generate-scene** (pending)
   - src/cli/generate-scene.ts
   - Calls Nano Banana 2 (Gemini 3.1 Flash Image)
   - Loads scene template from clients/jaca/scenes.json
   - CRITICAL: must include explicit aspect ratio in prompt AND crop after generation

## Critical Reminders for Next Session
- Read docs/lessons-learned.md FIRST — 10 mistakes to avoid
- Sharp = pixel ops (bg removal, shadows, resize). Remotion = ALL layout (text, logo, pills, CTA, safe zones)
- We ARE Claude — no ANTHROPIC_API_KEY needed for vision QA
- All Mac paths from CLI-test-spec are WRONG — that was a different machine
- Jaca rules are CLIENT config, not system constraints. Platform rules (Meta) are universal.
- The plan file is at: C:\Users\zeitl\.claude\plans\swirling-napping-eich.md

## Source Files (read these, don't rely on memory)
- CLI-test-spec: C:\Users\zeitl\Documents\Dev\17 - bzspecs contentmonster\jaca\CLI-test-spec.pdf
- Brand brief: C:\Users\zeitl\Documents\Dev\17 - bzspecs contentmonster\jaca\jaca-brand-brief.md
- Creative rules: C:\Users\zeitl\Documents\Dev\17 - bzspecs contentmonster\jaca\creative rules\*.md
