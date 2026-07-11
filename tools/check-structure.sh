#!/usr/bin/env bash
# Structure guard for the tenant × channel layout (ratified 2026-07-11 — see
# docs/core-charter/brainstorm/20260711-tenant-channel-matrix-scaffold.md).
# Dependency-free; run by CI (.github/workflows/structure.yml) or locally:
#   bash tools/check-structure.sh
# Design: accumulate errors (err() sets fail=1 and continues) so one run
# reports every violation; nothing here may abort early under set -e.
set -euo pipefail
cd "$(dirname "$0")/.."

fail=0
err() { echo "STRUCTURE FAIL: $*" >&2; fail=1; }

# 1. Neither the pre-re-org top-level dirs nor the old embedded-tenant
#    convention (channels/<ch>/tenants/) may come back.
for d in youtube linkedin clients platform; do
  [ -e "$d" ] && err "stale top-level '$d/' exists — engines live in channels/, companies in tenants/"
done
for d in channels/*/tenants; do
  [ -e "$d" ] && err "'$d' exists — tenant instances live in tenants/<id>/channels/<ch>/, not inside engines"
done

# 2. Every channel engine has a README; every tenant has a README or channel bindings.
for d in channels/*/; do
  [ -f "${d}README.md" ] || err "missing ${d}README.md"
done
for d in tenants/*/; do
  [ -f "${d}README.md" ] || [ -d "${d}channels" ] || err "$d has neither README.md nor channels/"
done

# 3. Active engines carry the full anatomy: playbook steps 01-06 (each checked
#    individually, top level only) + onboarding template.
for ch in youtube linkedin; do
  if [ -d "channels/$ch/playbook" ]; then
    for i in 1 2 3 4 5 6; do
      ls "channels/$ch/playbook/0$i-"*.md >/dev/null 2>&1 || err "channels/$ch/playbook/0$i-*.md missing"
    done
  else
    err "channels/$ch/playbook/ missing"
  fi
  [ -f "channels/$ch/templates/NEW-TENANT.md" ] || err "channels/$ch/templates/NEW-TENANT.md missing"
done

# 4. Every tenant×channel binding carries a config sheet (*-config.md).
for b in tenants/*/channels/*/; do
  ls "$b"*-config.md >/dev/null 2>&1 || err "$b missing its *-config.md sheet"
done

# 5. Never-commit guard (belt-and-braces; .gitignore is the primary control):
#    no credential-shaped CONTENT under channels/ or tenants/. -I skips binaries.
#    Markers are JSON-key-shaped ("refresh_token" quoted) or PEM headers so that
#    docs legitimately mentioning the client_secret.json FILENAME don't trip it.
#    No pipe here on purpose: grep -q under pipefail can mask a hit via SIGPIPE.
_CRED_MARKERS=(-e '"refresh_token"' -e '"client_secret"' -e '"private_key"' -e "BEGIN PRIVATE KEY" -e "BEGIN RSA PRIVATE")
if grep -rIq "${_CRED_MARKERS[@]}" channels tenants 2>/dev/null; then
  err "credential-shaped content under channels/ or tenants/ — credentials/ (gitignored) only:"
  grep -rIl "${_CRED_MARKERS[@]}" channels tenants 2>/dev/null >&2 || true
fi

if [ "$fail" -eq 0 ]; then echo "structure OK"; fi
exit "$fail"
