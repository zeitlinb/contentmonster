#!/usr/bin/env bash
# Structure guard for the tenant × channel layout (ratified 2026-07-11 — see
# docs/core-charter/brainstorm/20260711-tenant-channel-matrix-scaffold.md).
# Dependency-free; run by CI (.github/workflows/ci.yml) or locally: bash tools/check-structure.sh
set -euo pipefail
cd "$(dirname "$0")/.."

fail=0
err() { echo "STRUCTURE FAIL: $*" >&2; fail=1; }

# 1. The pre-re-org top-level dirs must not come back.
for d in youtube linkedin clients platform; do
  [ -e "$d" ] && err "stale top-level '$d/' exists — engines live in channels/, companies in tenants/"
done

# 2. Every channel engine has a README; every tenant has a README or channel bindings.
for d in channels/*/; do
  [ -f "${d}README.md" ] || err "missing ${d}README.md"
done
for d in tenants/*/; do
  [ -f "${d}README.md" ] || [ -d "${d}channels" ] || err "$d has neither README.md nor channels/"
done

# 3. Active engines carry the full anatomy: 6 numbered playbook files + onboarding template.
for ch in youtube linkedin; do
  n=$(find "channels/$ch/playbook" -name "0[1-6]-*.md" 2>/dev/null | wc -l | tr -d ' ')
  [ "$n" -eq 6 ] || err "channels/$ch/playbook: expected 6 numbered playbook files, found $n"
  [ -f "channels/$ch/templates/NEW-TENANT.md" ] || err "channels/$ch/templates/NEW-TENANT.md missing"
done

# 4. Tenant×channel bindings carry their config sheet.
[ -f tenants/constellation/channels/youtube/channel-config.md ] ||
  err "tenants/constellation/channels/youtube/channel-config.md missing"
[ -f tenants/hubexperience/channels/linkedin/linkedin-config.md ] ||
  err "tenants/hubexperience/channels/linkedin/linkedin-config.md missing"

# 5. Never-commit guard: no credential-shaped JSON under channels/ or tenants/.
if grep -rl --include="*.json" -e refresh_token -e client_secret channels tenants 2>/dev/null | grep -q .; then
  err "possible credential JSON committed under channels/ or tenants/ — credentials/ only"
fi

if [ "$fail" -eq 0 ]; then echo "structure OK"; fi
exit "$fail"
