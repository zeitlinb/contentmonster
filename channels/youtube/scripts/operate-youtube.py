#!/usr/bin/env python3
"""Operate a YouTube channel via the Data API v3 using a minted refresh token.

This is the CONSUMER side of Phase 7: `mint-youtube-token.py` creates the long-lived
refresh token (one-time, interactive); THIS script uses it to actually run the channel
with no human in the loop — verify the binding, upload videos, set thumbnails, and
update metadata.

Least-privilege: works with the `youtube.upload` + `youtube` scopes the token is minted
with. Captions/comments (force-ssl) are intentionally NOT implemented here — don't add
them until the OAuth app's scopes are expanded. Profile picture / Community posts / end
screens / monetization / phone verification are UI-only and cannot be done via the API.

Prereqs:
    pip install google-auth google-api-python-client

Usage (from repo root):
    # Standing smoke test — confirm the token is still bound to the right channel:
    python youtube/scripts/operate-youtube.py verify \
        --token credentials/youtube/constellation/token.json

    # Upload a video (private by default — flip to public/unlisted, or schedule):
    python youtube/scripts/operate-youtube.py upload \
        --token credentials/youtube/constellation/token.json \
        --file path/to/video.mp4 \
        --title "Title" --description "Body" --tags "ai,seo,geo" \
        --category 28 --privacy private \
        [--thumbnail path/to/thumb.jpg] [--publish-at 2026-07-04T15:00:00Z] [--made-for-kids]

    # Set/replace a thumbnail on an existing video:
    python youtube/scripts/operate-youtube.py thumbnail \
        --token credentials/youtube/constellation/token.json \
        --video-id VIDEO_ID --file path/to/thumb.jpg

    # Update metadata on an existing video (only the flags you pass change):
    python youtube/scripts/operate-youtube.py update \
        --token credentials/youtube/constellation/token.json \
        --video-id VIDEO_ID [--title ...] [--description ...] [--tags ...] [--privacy ...]

Notes:
    * --token points at the token.json written by mint-youtube-token.py (must contain a
      refresh_token). Credentials auto-refresh; the refreshed token is written back (0600).
    * privacy = private | unlisted | public. --publish-at (RFC-3339, e.g. 2026-07-04T15:00:00Z)
      schedules a *private* video to go public at that time.
    * Common category IDs (US): 22 People & Blogs, 24 Entertainment, 27 Education,
      28 Science & Technology, 25 News & Politics. Confirm live via videoCategories.list.
    * Expected channel (Constellation): 'Constellation AI' / UChonz99tpyIYgvMnUfTTAvA.
"""
import argparse
import os
import sys

CONSTELLATION_CHANNEL_ID = "UChonz99tpyIYgvMnUfTTAvA"


def _load_creds(token_path):
    """Load credentials from token.json, refresh if needed, persist the refresh back (0600)."""
    try:
        from google.oauth2.credentials import Credentials
        from google.auth.transport.requests import Request
    except ImportError:
        print("Missing dependency. Run: pip install google-auth google-api-python-client", file=sys.stderr)
        raise SystemExit(1)

    if not os.path.exists(token_path):
        print(f"Token not found: {token_path}\n"
              f"Mint it first with youtube/scripts/mint-youtube-token.py (Phase 7).", file=sys.stderr)
        raise SystemExit(1)

    creds = Credentials.from_authorized_user_file(token_path)
    if not creds.valid:
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            # Persist the refreshed access token (owner-only) so subsequent runs reuse it.
            fd = os.open(token_path, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
            with os.fdopen(fd, "w") as fh:
                fh.write(creds.to_json())
        else:
            print("Credentials are invalid and cannot be refreshed (no refresh_token?). "
                  "Re-mint with mint-youtube-token.py.", file=sys.stderr)
            raise SystemExit(1)
    return creds


def _service(token_path):
    try:
        from googleapiclient.discovery import build
    except ImportError:
        print("Missing dependency. Run: pip install google-api-python-client", file=sys.stderr)
        raise SystemExit(1)
    return build("youtube", "v3", credentials=_load_creds(token_path))


def _my_channel(yt):
    resp = yt.channels().list(part="snippet,contentDetails,statistics", mine=True).execute()
    items = resp.get("items", [])
    return items[0] if items else None


def cmd_verify(args):
    yt = _service(args.token)
    ch = _my_channel(yt)
    if not ch:
        print("VERIFY FAILED: no channel for this token. Re-mint and pick the Brand Account "
              "at the chooser, or confirm the authorizing account manages it.", file=sys.stderr)
        return 2
    title = ch["snippet"]["title"]
    cid = ch["id"]
    subs = ch.get("statistics", {}).get("subscriberCount", "?")
    vids = ch.get("statistics", {}).get("videoCount", "?")
    print(f"VERIFY OK: token bound to '{title}' (id {cid}) — {subs} subs, {vids} videos.")
    if cid != CONSTELLATION_CHANNEL_ID:
        print(f"WARNING: expected Constellation channel id {CONSTELLATION_CHANNEL_ID} but got "
              f"{cid}. If this is the wrong (e.g. personal) channel, re-mint the token and "
              f"select the Constellation Brand Account at the chooser.", file=sys.stderr)
        return 3
    return 0


def _tags_list(tags):
    return [t.strip() for t in tags.split(",") if t.strip()] if tags else None


def cmd_upload(args):
    try:
        from googleapiclient.http import MediaFileUpload
    except ImportError:
        print("Missing dependency. Run: pip install google-api-python-client", file=sys.stderr)
        return 1
    if not os.path.exists(args.file):
        print(f"Video file not found: {args.file}", file=sys.stderr)
        return 1

    yt = _service(args.token)
    snippet = {"title": args.title, "description": args.description or ""}
    tags = _tags_list(args.tags)
    if tags:
        snippet["tags"] = tags
    if args.category:
        snippet["categoryId"] = str(args.category)
    if args.language:
        snippet["defaultLanguage"] = args.language

    status = {"privacyStatus": args.privacy, "selfDeclaredMadeForKids": bool(args.made_for_kids)}
    if args.publish_at:
        # Scheduling requires the video to be private until publishAt.
        status["privacyStatus"] = "private"
        status["publishAt"] = args.publish_at

    body = {"snippet": snippet, "status": status}
    media = MediaFileUpload(args.file, chunksize=-1, resumable=True)
    req = yt.videos().insert(part="snippet,status", body=body, media_body=media)

    print(f"Uploading {args.file} …")
    response = None
    while response is None:
        chunk_status, response = req.next_chunk()
        if chunk_status:
            print(f"  {int(chunk_status.progress() * 100)}%")
    vid = response["id"]
    print(f"UPLOAD OK: https://youtu.be/{vid} (privacy={status['privacyStatus']}"
          + (f", publishAt={args.publish_at}" if args.publish_at else "") + ")")

    if args.thumbnail:
        _set_thumbnail(yt, vid, args.thumbnail)
    return 0


def _set_thumbnail(yt, video_id, path):
    from googleapiclient.http import MediaFileUpload
    if not os.path.exists(path):
        print(f"Thumbnail not found: {path}", file=sys.stderr)
        return 1
    yt.thumbnails().set(videoId=video_id, media_body=MediaFileUpload(path)).execute()
    print(f"THUMBNAIL OK: set on {video_id} (needs a verified channel; may take ~a while to show).")
    return 0


def cmd_thumbnail(args):
    yt = _service(args.token)
    return _set_thumbnail(yt, args.video_id, args.file)


def cmd_update(args):
    yt = _service(args.token)
    resp = yt.videos().list(part="snippet,status", id=args.video_id).execute()
    items = resp.get("items", [])
    if not items:
        print(f"No video {args.video_id} visible to this token.", file=sys.stderr)
        return 2
    snippet = items[0]["snippet"]
    status = items[0]["status"]

    if args.title is not None:
        snippet["title"] = args.title
    if args.description is not None:
        snippet["description"] = args.description
    if args.tags is not None:
        snippet["tags"] = _tags_list(args.tags) or []
    if args.privacy is not None:
        status["privacyStatus"] = args.privacy
    # categoryId is required on update; it's already present from the fetch above.

    yt.videos().update(part="snippet,status", body={
        "id": args.video_id, "snippet": snippet, "status": status,
    }).execute()
    print(f"UPDATE OK: {args.video_id} (privacy={status.get('privacyStatus')}).")
    return 0


def main():
    ap = argparse.ArgumentParser(description="Operate a YouTube channel with a minted refresh token.")
    sub = ap.add_subparsers(dest="cmd", required=True)

    def add_token(p):
        p.add_argument("--token", required=True, help="path to token.json (from mint-youtube-token.py)")

    p = sub.add_parser("verify", help="confirm the token is bound to the expected channel")
    add_token(p)
    p.set_defaults(func=cmd_verify)

    p = sub.add_parser("upload", help="upload a video (+ optional thumbnail / schedule)")
    add_token(p)
    p.add_argument("--file", required=True, help="path to the video file")
    p.add_argument("--title", required=True)
    p.add_argument("--description", default="")
    p.add_argument("--tags", default=None, help="comma-separated tags")
    p.add_argument("--category", default=None, help="numeric categoryId, e.g. 28 (Science & Tech)")
    p.add_argument("--privacy", default="private", choices=["private", "unlisted", "public"])
    p.add_argument("--publish-at", dest="publish_at", default=None,
                   help="RFC-3339 time to auto-publish (schedules as private until then)")
    p.add_argument("--language", default=None, help="defaultLanguage, e.g. en")
    p.add_argument("--made-for-kids", dest="made_for_kids", action="store_true")
    p.add_argument("--thumbnail", default=None, help="optional thumbnail image to set after upload")
    p.set_defaults(func=cmd_upload)

    p = sub.add_parser("thumbnail", help="set/replace a thumbnail on an existing video")
    add_token(p)
    p.add_argument("--video-id", dest="video_id", required=True)
    p.add_argument("--file", required=True, help="thumbnail image (JPG/PNG, <=2MB)")
    p.set_defaults(func=cmd_thumbnail)

    p = sub.add_parser("update", help="update metadata on an existing video (only passed flags change)")
    add_token(p)
    p.add_argument("--video-id", dest="video_id", required=True)
    p.add_argument("--title", default=None)
    p.add_argument("--description", default=None)
    p.add_argument("--tags", default=None, help="comma-separated tags (replaces existing)")
    p.add_argument("--privacy", default=None, choices=["private", "unlisted", "public"])
    p.set_defaults(func=cmd_update)

    args = ap.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
