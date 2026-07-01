# Onboard a new company's YouTube channel

> ~30 minutes of prep, then follow the playbook. The playbook never changes per company — only the config + assets do.

## Steps
1. **Pick an id** (kebab-case, matches the company), e.g. `acme`.
2. **Scaffold the tenant folder:**
   ```bash
   mkdir -p youtube/tenants/<id>/assets youtube/tenants/<id>/agents youtube/tenants/<id>/dist
   cp youtube/templates/tenant-config.template.md youtube/tenants/<id>/channel-config.md
   ```
3. **Fill `channel-config.md`** with the company's real values (name, handle, description copy, links, brand colors, logo source files, voice/don'ts, cadence, funnel). Pull these from that company's brand/strategy docs — don't invent.
4. **Produce the assets** per a copy of `tenants/constellation/assets/README.md`: profile picture (UI-only), banner (safe-area-aware), watermark. These are CREATE (ContentMonster) outputs from the company's brand.
5. **Write the setup guide:** copy `tenants/constellation/setup-guide.md` and replace the Constellation values with this company's config. (It weaves playbook 01→06 with the company's concrete values; keep it self-contained so it prints standalone.)
6. **Set up agent control** per a copy of `tenants/constellation/agents/README.md` (Cloud project in *that company's* Workspace org; Internal OAuth app; refresh token to `credentials/youtube/<id>/`).
7. **Generate the printable PDF** into `tenants/<id>/dist/` (see the make-pdf note in the setup guide's footer).
8. **Run the launch checklist** (`playbook/06`).

## Reuse rules
- Reusable knowledge → `playbook/` (edit there once, all tenants benefit).
- Company-specific values/copy/assets → `tenants/<id>/`.
- Secrets → `credentials/youtube/<id>/` (gitignored). Never in the tenant folder.
- Re-verify the load-bearing Google/YouTube steps live at setup time — the UI and quota drift.
