#!/usr/bin/env python3
"""Render HEC's LinkedIn Company Page cover (1128x191) — two treatments.

  photo -> the concise statement over a real HUB blue-hour movie-night image,
           cinematically graded. The "grabs you" option; on-brand per
           visual-identity.md §7 ("the corpus IS the credibility").  [PRIMARY]
  green -> the same statement as a bold sage-field brand block (cream on #667263),
           cohesive with the chosen Logo B.  [ALT]

Copy is fixed (Brad): eyebrow / "We are Memory Makers." / ALL-CAPS subtext.
LinkedIn overlaps the logo on the LOWER-LEFT and crops the band responsively, so
the lockup is centered and clear of the lower-left ~320x120 zone + edges. Each
treatment emits a *-safearea-preview.png marking the obstructed zone.

Brand: cream #F1E8D9, ink #1A1208, sage #667263, muted #5A5040. Fraunces + Geist.
Run:  python linkedin/tenants/hubexperience/assets/render-cover.py
Needs: Pillow + fonts/ (vendored) + the HUB movie-night photo.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

HERE = os.path.dirname(os.path.abspath(__file__))
FRAUNCES = os.path.join(HERE, "fonts", "Fraunces.ttf")
GEIST_MED = os.path.join(HERE, "fonts", "Geist-Medium.ttf")
PHOTO = "/Users/zeitlinb/Projects/hubexperience/site/public/hero/movie-night.png"

W, H = 1128, 191
CREAM = (241, 232, 217)
INK = (26, 18, 8)
SAGE = (102, 114, 99)        # #667263
SAGE_LT = (168, 178, 160)    # lifted sage that reads on a dark photo
MUTED = (90, 80, 64)

SAFE_LL = (320, 120)         # obstructed lower-left (logo overlap), from bottom-left

EYEBROW = "THE HUB EXPERIENCE COMPANY"
HEADLINE = "We are Memory Makers."
SUB = "THE EXPERIENCE LAYER FOR DEVELOPERS, OWNERS & OPERATORS"


def fraunces(size, weight="SemiBold"):
    f = ImageFont.truetype(FRAUNCES, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def tracked(d, cx, y, text, font, fill, track):
    """Draw letter-spaced text centered on cx (top anchor y). Returns width."""
    widths = [d.textlength(ch, font=font) for ch in text]
    total = sum(widths) + track * (len(text) - 1)
    x = cx - total / 2
    for ch, w in zip(text, widths):
        d.text((x, y), ch, font=font, fill=fill, anchor="la")
        x += w + track
    return total


def add_safearea(img, tag):
    p = img.copy()
    d = ImageDraw.Draw(p)
    d.rectangle([0, H - SAFE_LL[1], SAFE_LL[0], H], outline=(220, 90, 90), width=3)
    d.text((8, H - SAFE_LL[1] + 6), "logo overlap — keep clear", fill=(220, 90, 90),
           font=ImageFont.truetype(GEIST_MED, 13))
    p.save(os.path.join(HERE, f"cover-1128x191-{tag}-safearea-preview.png"))


def _lockup(d, cx, hh_canvas, SS, eyebrow_fill, rule_fill, head_fill, sub_fill):
    """The centered eyebrow / tick / headline / subtext lockup. Shared geometry."""
    fe = ImageFont.truetype(GEIST_MED, 14 * SS)
    fh = fraunces(46 * SS, "SemiBold")
    fs = ImageFont.truetype(GEIST_MED, 12 * SS)
    eh, rule, hh_t, sh = 14 * SS, 3 * SS, 46 * SS, 12 * SS
    g = 11 * SS
    fhb = fh.getbbox(HEADLINE)
    head_h = fhb[3] - fhb[1]
    block = eh + g + rule + g + head_h + g + sh
    y = int((hh_canvas - block) / 2) - 2 * SS
    tracked(d, cx, y, EYEBROW, fe, eyebrow_fill, 5 * SS)
    y += eh + g
    d.rounded_rectangle([cx - 42 * SS, y, cx + 42 * SS, y + rule], radius=rule, fill=rule_fill)
    y += rule + g
    d.text((cx, y), HEADLINE, font=fh, fill=head_fill, anchor="ma")
    y += head_h + g
    tracked(d, cx, y, SUB, fs, sub_fill, 3 * SS)


def render_photo():
    SS = 2
    ww, hh = W * SS, H * SS
    src = Image.open(PHOTO).convert("RGB")
    sw, sh = src.size
    target = W / H
    if sw / sh > target:
        nw = int(sh * target); x0 = (sw - nw) // 2
        src = src.crop((x0, 0, x0 + nw, sh))
    else:
        nh = int(sw / target); y0 = (sh - nh) // 2
        src = src.crop((0, y0, sw, y0 + nh))
    base = src.resize((ww, hh), Image.LANCZOS)

    # cinematic grade: richer color + a touch more contrast
    base = ImageEnhance.Color(base).enhance(1.14)
    base = ImageEnhance.Contrast(base).enhance(1.07)

    # scrim: gentle overall darken, weighted toward the bottom (grounds the text),
    # plus a soft corner vignette — keeps the venue glow alive at the edges.
    scrim = Image.new("L", (ww, hh), 0)
    sd = ImageDraw.Draw(scrim)
    for y in range(hh):
        sd.line([(0, y), (ww, y)], fill=int(78 + 96 * (y / hh)))   # top 78 -> bottom 174
    # vignette
    vig = Image.new("L", (ww, hh), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse([-ww * 0.25, -hh * 0.6, ww * 1.25, hh * 1.6], fill=0, outline=None)
    dark = Image.new("RGB", (ww, hh), (9, 8, 6))
    base = Image.composite(dark, base, scrim)

    d = ImageDraw.Draw(base)
    _lockup(d, ww // 2, hh, SS,
            eyebrow_fill=SAGE_LT, rule_fill=SAGE_LT, head_fill=CREAM, sub_fill=CREAM)

    out = base.resize((W, H), Image.LANCZOS)
    out.save(os.path.join(HERE, "cover-1128x191-photo.png"))
    add_safearea(out, "photo")


def render_green():
    SS = 4
    ww, hh = W * SS, H * SS
    img = Image.new("RGB", (ww, hh), SAGE)
    d = ImageDraw.Draw(img)
    _lockup(d, ww // 2, hh, SS,
            eyebrow_fill=CREAM, rule_fill=CREAM, head_fill=CREAM, sub_fill=(219, 225, 214))
    out = img.resize((W, H), Image.LANCZOS)
    out.save(os.path.join(HERE, "cover-1128x191-green.png"))
    add_safearea(out, "green")


if __name__ == "__main__":
    import shutil
    os.makedirs(os.path.join(HERE, "variants"), exist_ok=True)
    render_green()   # writes cover-1128x191-green.png (+ -green-safearea-preview.png)
    # SELECTED = the green field cover (Brad 2026-07-06). Canonical LinkedIn cover.
    shutil.copy(os.path.join(HERE, "cover-1128x191-green.png"),
                os.path.join(HERE, "SELECTED--cover-1128x191.png"))
    shutil.copy(os.path.join(HERE, "cover-1128x191-green-safearea-preview.png"),
                os.path.join(HERE, "SELECTED--cover-1128x191-safearea-preview.png"))
    if os.path.exists(PHOTO):
        render_photo()   # alt treatment → variants/
        for f in ("cover-1128x191-photo.png", "cover-1128x191-photo-safearea-preview.png"):
            os.replace(os.path.join(HERE, f), os.path.join(HERE, "variants", f))
    print("wrote SELECTED--cover-1128x191.png (= green) + variants/photo")
