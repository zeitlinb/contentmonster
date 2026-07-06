#!/usr/bin/env python3
"""Render HEC's LinkedIn Company Page logo (300x300) — INTERIM.

The final HEC emblem is still in design (GPT Image-2, pending Brad + Tully).
This interim gestures at the brand's own documented direction (visual-identity.md §8):
a refined circular emblem centered on a single "H" as a convergence point, with
subtle radiating/orbiting nodes (people gathering at a hub). Two-color, flat, no
gradients/shadows. Swap in the final emblem when selected.

Brand: cream #F1E8D9, ink #1A1208, rust #B45D2A. Fraunces (display) for the H.
Outputs A (ink on cream), B (cream on rust), C (A + orbiting nodes); copies the
chosen default to logo-300.png.

Run:  python linkedin/tenants/hubexperience/assets/render-logo.py
Needs: Pillow + fonts/Fraunces.ttf (vendored).
"""
import os, math
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
FRAUNCES = os.path.join(HERE, "fonts", "Fraunces.ttf")

S = 300
C = S // 2
CREAM = (241, 232, 217)
INK = (26, 18, 8)
RUST = (180, 93, 42)
SAGE = (102, 114, 99)  # #667263 — the green accent Brad chose for LinkedIn

# 4x supersample for crisp edges, then downscale
SS = 4


def fraunces(size, weight="SemiBold"):
    f = ImageFont.truetype(FRAUNCES, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def render(name, bg, fg, ring, nodes=False):
    img = Image.new("RGB", (S * SS, S * SS), bg)
    d = ImageDraw.Draw(img)
    c = C * SS

    # thin ring with generous padding
    ring_r = 108 * SS
    ring_w = 4 * SS
    d.ellipse([c - ring_r, c - ring_r, c + ring_r, c + ring_r], outline=ring, width=ring_w)

    # optional orbiting nodes (people gathering at a hub) — subtle, few, tasteful
    if nodes:
        node_r = ring_r
        dot = 6 * SS
        for ang in (-90, 30, 150):  # 3 evenly spaced points on the ring
            rad = math.radians(ang)
            nx = c + node_r * math.cos(rad)
            ny = c + node_r * math.sin(rad)
            d.ellipse([nx - dot, ny - dot, nx + dot, ny + dot], fill=fg)

    # centered "H" in Fraunces
    f = fraunces(150 * SS, "SemiBold")
    d.text((c, c), "H", font=f, fill=fg, anchor="mm")

    out = img.resize((S, S), Image.LANCZOS)
    path = os.path.join(HERE, name)
    out.save(path)
    return path


if __name__ == "__main__":
    os.makedirs(os.path.join(HERE, "variants"), exist_ok=True)
    render("variants/logo-A-ink-on-cream.png", CREAM, INK, SAGE)        # alt: ink H on cream
    b = render("logo-B-cream-on-green.png", SAGE, CREAM, CREAM)         # SELECTED (Brad 2026-07-06)
    render("variants/logo-C-nodes-on-cream.png", CREAM, INK, SAGE, nodes=True)  # alt: with nodes
    # SELECTED = Logo B — cream "H" on sage #667263. This is the canonical LinkedIn logo.
    Image.open(b).save(os.path.join(HERE, "SELECTED--logo-300x300.png"))
    print("wrote SELECTED--logo-300x300.png (= Logo B) + variants/A,C")
