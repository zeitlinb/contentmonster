# Onboard a new company's LinkedIn presence

> ~30 minutes of prep, then follow the playbook. The playbook never changes per company — only the config + assets do.

## Steps
1. **Pick an id** (kebab-case, matches the company), e.g. `acme`.
2. **Scaffold the tenant folder:**
   ```bash
   mkdir -p linkedin/tenants/<id>/assets/fonts linkedin/tenants/<id>/agents linkedin/tenants/<id>/dist
   cp linkedin/templates/tenant-config.template.md linkedin/tenants/<id>/linkedin-config.md
   ```
3. **Decide scope** up front: Company Page only, or Page + founder profile. This determines which assets + copy you produce.
4. **Fill `linkedin-config.md`** with the company's real values (name, slug, tagline, About, brand colors, logo source files, voice/don'ts, cadence, funnel). Pull these from that company's brand/strategy docs — **don't invent**. Mark human-judgment fields (industry, size, founded year, button) **[CONFIRM]**.
5. **Produce the assets** per a copy of `tenants/hubexperience/assets/README.md`: Page logo (300×300) + cover (1128×191, center-band safe); if the founder profile is in scope, profile photo (400×400) + background (1584×396). These are CREATE (ContentMonster) outputs from the company's brand. If the mark isn't final, produce a clearly-labeled interim from the wordmark/monogram.
6. **Write the setup guide:** copy `tenants/hubexperience/setup-guide.md` and replace the HEC values with this company's config. Keep it self-contained so it prints standalone. It weaves playbook 01→06 with the concrete values.
7. **Decide the posting model** per `tenants/hubexperience/agents/README.md`: human-in-the-loop / scheduler now; open the Community Management API application in parallel if agent-posting is a goal.
8. **Generate the printable PDF** into `tenants/<id>/dist/`.
9. **Run the launch checklist** (`playbook/06`).

## Reuse rules
- Reusable knowledge → `playbook/` (edit there once, all tenants benefit).
- Company-specific values/copy/assets → `tenants/<id>/`.
- Secrets → `credentials/linkedin/<id>/` (gitignored). Never in the tenant folder.
- Re-verify the load-bearing LinkedIn steps live at setup time — the UI, image specs, and (especially) API access tiers drift. Don't promise agent-posting until the API product is actually granted.
