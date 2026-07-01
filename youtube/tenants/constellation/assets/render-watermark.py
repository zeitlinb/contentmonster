#!/usr/bin/env python3
"""Render the Constellation video watermark at 150x150 (white glyph, transparent).

The subscribe-prompt mark that sits bottom-right over videos. White reads cleanly
over arbitrary footage. Drawn 6x and downsampled (LANCZOS) for crisp small-size edges.

Run:  python youtube/tenants/constellation/assets/render-watermark.py
Needs: Pillow
"""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
SIZE = 150
S = 6
WHITE = (255, 255, 255, 255)


def render(out):
    W = SIZE * S
    img = Image.new("RGBA", (W, W), (0, 0, 0, 0))  # transparent
    d = ImageDraw.Draw(img)
    cx = cy = W // 2
    dist = int(60 * S)
    lw = int(3 * S)
    nr = int(7 * S)
    cnr = int(8 * S)
    T, R, B, L = (cx, cy - dist), (cx + dist, cy), (cx, cy + dist), (cx - dist, cy)
    for a, b in [(T, R), (R, B), (B, L), (L, T)]:
        d.line([a, b], fill=WHITE, width=lw)
    for p in (T, R, B, L):
        d.line([(cx, cy), p], fill=WHITE, width=lw)

    def dot(p, r):
        d.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=WHITE)
    for p in (T, R, B, L):
        dot(p, nr)
    dot((cx, cy), cnr)

    img = img.resize((SIZE, SIZE), Image.LANCZOS)
    img.save(out)
    return out


if __name__ == "__main__":
    print(render(os.path.join(HERE, "watermark-150.png")))
