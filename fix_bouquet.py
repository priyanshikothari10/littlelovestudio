import json

targets = [
    (120, 200),  # Stem 1
    (140, 200),  # Stem 2  (Tulip)
    (165, 200),  # Stem 3  (Peony)
    (188, 200),  # Stem 4  (Daisy)
    (208, 200),  # Stem 5  (Rose2)
    (130, 215),  # Stem 6  (Lav)
    (198, 218),  # Stem 7  (Tulip2)
]

flowers_def = [
    ("RoseSVG", 64, 0, 0.75, 0, 0),
    ("TulipSVG", 58, 1, 0.95, 0, 0),
    ("PeonySVG", 70, 2, 0.82, 0, 0),
    ("DaisySVG", 58, 3, 0.83, 0, 0),
    ("RoseSVG", 60, 4, 0.75, 0, 0),
    ("LavenderSVG", 52, 5, 0.875, 0, 0),
    ("TulipSVG", 50, 6, 0.95, 0, 0)
]

for i, (comp, size, tidx, yratio, ox, oy) in enumerate(flowers_def):
    tx, ty = targets[tidx]
    fx = tx - size/2 + ox
    fy = ty - size * yratio + oy
    print(f"Flower {i} ({comp}): x={fx:.0f}, y={fy:.0f}")
