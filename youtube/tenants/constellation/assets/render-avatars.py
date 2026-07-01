#!/usr/bin/env python3
"""Render the Constellation channel profile-picture (avatar) options at 800x800.

The mark is the Constellation glyph: a diamond (rotated square) with five filled
nodes (center + 4 points) and spokes from center to each point. Drawn 4x and
downsampled (LANCZOS) for clean anti-aliased edges. Palette from the brand guide:
Bedrock Black #050505, Constellation Red #FF2B2B, Pure White #FFFFFF.

Run:  python youtube/tenants/constellation/assets/render-avatars.py
Needs: pip install Pillow
"""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
SIZE = 800
S = 4  # supersample factor

BLACK = (5, 5, 5)        # #050505 Bedrock Black
RED = (255, 43, 43)      # #FF2B2B Constellation Red
WHITE = (255, 255, 255)  # #FFFFFF


def render(bg, fg, out):
    W = SIZE * S
    img = Image.new("RGB", (W, W), bg)
    d = ImageDraw.Draw(img)
    cx = cy = W // 2
    dist = int(255 * S)   # center -> point node
    lw = int(13 * S)      # line width
    nr = int(34 * S)      # outer node radius
    cnr = int(38 * S)     # center node radius
    T, R, B, L = (cx, cy - dist), (cx + dist, cy), (cx, cy + dist), (cx - dist, cy)
    # diamond edges
    for a, b in [(T, R), (R, B), (B, L), (L, T)]:
        d.line([a, b], fill=fg, width=lw)
    # spokes from center
    for p in (T, R, B, L):
        d.line([(cx, cy), p], fill=fg, width=lw)

    def dot(p, r):
        d.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=fg)
    for p in (T, R, B, L):
        dot(p, nr)
    dot((cx, cy), cnr)

    img = img.resize((SIZE, SIZE), Image.LANCZOS)
    img.save(out)
    return out


if __name__ == "__main__":
    outs = [
        render(BLACK, WHITE, os.path.join(HERE, "avatar-800-A-white-on-black.png")),
        render(BLACK, RED, os.path.join(HERE, "avatar-800-B-red-on-black.png")),
        render(RED, WHITE, os.path.join(HERE, "avatar-800-C-white-on-red.png")),
    ]
    for o in outs:
        print(o)
