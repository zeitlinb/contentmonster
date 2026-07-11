#!/usr/bin/env python3
"""Mint a long-lived YouTube Data API refresh token for an agent.

One-time interactive step: opens a browser, you sign in as the account that
MANAGES the target channel (and pick the right Brand Account channel at the
chooser), and a refresh token is written to disk. The agent then reuses that
token forever (Internal-app + offline) with no further human consent.

Why this script: service accounts CANNOT run a normal YouTube channel
(NoLinkedYouTubeAccount). The only path is a user OAuth refresh token. See
../playbook/02-agent-control-api.md.

Prereqs:
    pip install google-auth-oauthlib google-api-python-client

Usage (from repo root):
    python youtube/scripts/mint-youtube-token.py \
        --client-secret credentials/youtube/constellation/client_secret.json \
        --token-out      credentials/youtube/constellation/token.json \
        --scopes youtube.upload,youtube

Notes:
    * Use a Desktop-app OAuth client (loopback redirect; OOB is dead).
    * Keep client_secret.json and token.json under the gitignored credentials/ dir.
    * Add youtube.force-ssl to --scopes only if the agent manages captions/comments.
    * Revoke anytime at https://myaccount.google.com/permissions or by deleting
      the OAuth client in Google Cloud Console.
"""
import argparse
import os
import sys

SCOPE_PREFIX = "https://www.googleapis.com/auth/"


def main() -> int:
    ap = argparse.ArgumentParser(description="Mint a YouTube Data API refresh token.")
    ap.add_argument("--client-secret", required=True, help="path to the downloaded OAuth client JSON")
    ap.add_argument("--token-out", required=True, help="where to write the credentials JSON (refresh token)")
    ap.add_argument(
        "--scopes",
        default="youtube.upload,youtube",
        help="comma-separated YouTube scopes (short names ok); default: youtube.upload,youtube",
    )
    ap.add_argument("--no-smoke-test", action="store_true", help="skip the channels.list verification call")
    args = ap.parse_args()

    try:
        from google_auth_oauthlib.flow import InstalledAppFlow
    except ImportError:
        print("Missing dependency. Run: pip install google-auth-oauthlib google-api-python-client", file=sys.stderr)
        return 1

    scopes = []
    for raw in args.scopes.split(","):
        s = raw.strip()
        if not s:
            continue
        scopes.append(s if s.startswith("http") else SCOPE_PREFIX + s)

    flow = InstalledAppFlow.from_client_secrets_file(args.client_secret, scopes=scopes)
    # Desktop client -> loopback redirect on a random free port. access_type=offline
    # + prompt=consent guarantee a refresh token is issued.
    creds = flow.run_local_server(port=0, access_type="offline", prompt="consent")

    # Create the parent dir first — otherwise open() fails AFTER the browser consent
    # completes, wasting the whole round-trip (credentials/youtube/<id>/ won't exist yet).
    out_dir = os.path.dirname(os.path.abspath(args.token_out))
    os.makedirs(out_dir, exist_ok=True)
    # Write owner-only (0600) so the long-lived refresh token is never world-readable.
    fd = os.open(args.token_out, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w") as fh:
        fh.write(creds.to_json())
    print(f"Wrote credentials (incl. refresh token) to {args.token_out}")
    if not creds.refresh_token:
        print("ERROR: no refresh_token returned — re-run; ensure prompt=consent and a Desktop "
              "client, and revoke any prior grant at https://myaccount.google.com/permissions.",
              file=sys.stderr)
        return 3
    print("NOTE: this refresh token is long-lived ONLY if the OAuth app's Audience is INTERNAL. "
          "An app left in 'Testing' status expires refresh tokens after 7 days — confirm "
          "Audience = Internal in Google Cloud Console.")

    if args.no_smoke_test:
        return 0
    try:
        from googleapiclient.discovery import build

        yt = build("youtube", "v3", credentials=creds)
        resp = yt.channels().list(part="snippet", mine=True).execute()
        items = resp.get("items", [])
        if not items:
            print("SMOKE TEST: no channel found for this account. If the target is a Brand Account, "
                  "re-run and pick that channel at the chooser, or confirm you manage it.", file=sys.stderr)
            return 2
        ch = items[0]
        print(f"SMOKE TEST OK: token is bound to channel '{ch['snippet']['title']}' (id {ch['id']}).")
        print("If that is NOT the intended channel, re-run consent and select the correct Brand Account.")
    except ImportError:
        print("(Install google-api-python-client to run the channel smoke test.)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
