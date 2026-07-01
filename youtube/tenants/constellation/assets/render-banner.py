#!/usr/bin/env python3
"""Render the Constellation YouTube banner (channel art) at 2560x1440.

Stack, centered inside YouTube's 1235x338 "safe area":
  - constellation wordmark (real logo, white on transparent)
  - Constellation Red accent rule
  - "Agent-Powered AI Visibility & SEO"  (primary descriptor, white)
  - "Get found. Stay found. Turn discovery into cash flow."  (promise, muted)

Brand: Bedrock Black #050505, Constellation Red #FF2B2B, white, Inter.
Outputs the clean banner + a safe-area preview (for verification, not upload).

Run:  python youtube/tenants/constellation/assets/render-banner.py
Needs: Pillow + fonts/Inter.ttf (downloaded) + the bzresearch logo.
"""
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
LOGO = "/Users/zeitlinb/Projects/bzresearch/marketing/brand/logo/constellation-logo-white.png"
FONT = os.path.join(HERE, "fonts", "Inter.ttf")
HELV = "/System/Library/Fonts/HelveticaNeue.ttc"

W, H = 2560, 1440
CX = W // 2
SAFE_W, SAFE_H = 1235, 338
SAFE_X0, SAFE_Y0 = (W - SAFE_W) // 2, (H - SAFE_H) // 2  # 662, 551
SAFE_CY = H // 2  # 720

BG = (5, 5, 5)
RED = (255, 43, 43)
WHITE = (255, 255, 255)
MUTED = (176, 184, 196)

DESC = "Agent-Powered AI Visibility & SEO"
PROMISE_A = "Get found. Stay found. Turn Discovery Into "  # muted
PROMISE_B = "Cash Flow."                                   # Constellation Red accent
PROMISE = PROMISE_A + PROMISE_B


def inter(size, weight="Regular"):
    try:
        f = ImageFont.truetype(FONT, size)
        f.set_variation_by_name(weight)
        return f
    except Exception:
        # fallback: Helvetica Neue (index 0 regular). Bold approximated by size only.
        return ImageFont.truetype(HELV, size)


def fit_font(draw, text, weight, start, max_w):
    size = start
    while size > 10:
        f = inter(size, weight)
        if draw.textlength(text, font=f) <= max_w:
            return f, size
        size -= 2
    return inter(10, weight), 10


def build_logo(target_w):
    im = Image.open(LOGO).convert("RGBA")
    bbox = im.split()[3].getbbox()
    im = im.crop(bbox)
    w, h = im.size
    nh = max(1, round(target_w * h / w))
    return im.resize((target_w, nh), Image.LANCZOS)


def render(preview=False):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    logo = build_logo(560)
    logo_h = logo.size[1]
    max_w = 1180
    fdesc, _ = fit_font(d, DESC, "SemiBold", 72, max_w)
    fprom, _ = fit_font(d, PROMISE, "Medium", 42, max_w)

    def th(text, f):
        b = d.textbbox((0, 0), text, font=f)
        return b[3] - b[1]
    desc_h, prom_h = th(DESC, fdesc), th(PROMISE, fprom)
    rule_h, rule_w = 4, 116
    g1, g2, g3 = 30, 28, 26  # logo->rule, rule->desc, desc->promise

    total = logo_h + g1 + rule_h + g2 + desc_h + g3 + prom_h
    y = SAFE_CY - total // 2

    img.paste(logo, (CX - logo.size[0] // 2, y), logo)
    y += logo_h + g1
    d.rounded_rectangle([CX - rule_w // 2, y, CX + rule_w // 2, y + rule_h], radius=2, fill=RED)
    y += rule_h + g2
    d.text((CX, y), DESC, font=fdesc, fill=WHITE, anchor="ma")
    y += desc_h + g3
    wa = d.textlength(PROMISE_A, font=fprom)
    wb = d.textlength(PROMISE_B, font=fprom)
    sx = CX - (wa + wb) / 2
    d.text((sx, y), PROMISE_A, font=fprom, fill=MUTED, anchor="la")
    d.text((sx + wa, y), PROMISE_B, font=fprom, fill=RED, anchor="la")

    if preview:
        d.rectangle([SAFE_X0, SAFE_Y0, SAFE_X0 + SAFE_W, SAFE_Y0 + SAFE_H], outline=(90, 200, 120), width=3)
        d.text((SAFE_X0 + 8, SAFE_Y0 + 6), "safe area 1235x338 (shows on all devices)", font=inter(26, "Medium"), fill=(90, 200, 120))
        img.save(os.path.join(HERE, "banner-2560x1440-safezone-preview.png"))
    else:
        img.save(os.path.join(HERE, "banner-2560x1440.png"))


if __name__ == "__main__":
    render(preview=False)
    render(preview=True)
    print("wrote banner-2560x1440.png + banner-2560x1440-safezone-preview.png")
