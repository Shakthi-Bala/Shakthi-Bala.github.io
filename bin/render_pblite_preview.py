#!/usr/bin/env python3
"""Reformat saved Pb-lite report results; no new detection is performed.

Usage: python bin/render_pblite_preview.py /path/to/Pblite_boundary_detection
Requires PyMuPDF, NumPy, Matplotlib, and Pillow. See docs/PROJECT_MEDIA.md.
"""
import io
import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pymupdf
from PIL import Image

source = Path(sys.argv[1])
report = pymupdf.open(source / "Report.pdf")
# Page 3 has two image objects: gradient maps (Figure 7), then boundaries (Figure 8).
image_ref = report[2].get_images(full=True)[1][0]
figure = np.asarray(Image.open(io.BytesIO(report.extract_image(image_ref)["image"])).convert("RGB"))
assert figure.shape[:2] == (4500, 1800), "Unexpected report figure layout"
# Find the ten result rows by their dark image backgrounds, excluding white gutters.
occupied = (figure.min(axis=2) < 80).mean(axis=1) > .2
edges = np.diff(np.r_[False, occupied, False].astype(int))
rows = [(start, end) for start, end in zip(np.flatnonzero(edges == 1), np.flatnonzero(edges == -1)) if end-start > 100]
assert len(rows) == 10, "Expected ten comparison rows"
fig = plt.figure(figsize=(12, 9), dpi=100, facecolor="#101827")
fig.text(.035, .95, "Pb-lite boundary detection", color="white", fontsize=28, weight="bold")
for col, title in enumerate(("CANNY", "SOBEL", "PB-LITE")):
    fig.text(.04 + col*.32, .89, title, color="#67e8f9", fontsize=16, weight="bold")
for display_row, original_row in enumerate((0, 3, 4)):
    start, end = rows[original_row]
    occupied_x = (figure[start:end].min(axis=2) < 80).mean(axis=0) > .2
    column_edges = np.diff(np.r_[False, occupied_x, False].astype(int))
    columns = [(left, right) for left, right in zip(np.flatnonzero(column_edges == 1), np.flatnonzero(column_edges == -1)) if right-left > 100]
    assert len(columns) == 3, "Expected three method panels"
    for col, (left, right) in enumerate(columns):
        ax = fig.add_axes([.035 + col*.32, .605 - display_row*.265, .305, .245])
        ax.imshow(figure[start:end, left:right])
        ax.axis("off")
fig.text(.035, .025, "Saved report results / Figure 8, rows 1, 4, 5 / no new boundary-detection run", color="#a8b7ca", fontsize=12)
out = Path(__file__).resolve().parents[1] / "assets/projects/pblite-boundaries.png"
fig.savefig(out, dpi=100, facecolor="#101827")
plt.close(fig)
print(out, "1200x900; saved report comparisons")
