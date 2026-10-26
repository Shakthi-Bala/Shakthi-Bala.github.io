#!/usr/bin/env python3
"""Render scientific portfolio figures from inspected project data.

Usage: python bin/render_portfolio_previews.py /path/to/portfolio-sources
Requires NumPy, OpenCV, Matplotlib, Pillow, and source checkouts named
calibration and blender below the supplied directory (see docs/PROJECT_MEDIA.md).
"""
import contextlib
import io
import runpy
import tempfile
import json
import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

SOURCE = Path(sys.argv[1])
OUT = Path(__file__).resolve().parents[1] / "assets/projects"
BG, TEXT, MUTED, CYAN, PINK = "#101827", "#f1f5f9", "#a8b7ca", "#67e8f9", "#fb87b9"
plt.rcParams.update({"font.family": "DejaVu Sans", "text.color": TEXT, "axes.labelcolor": MUTED,
                     "xtick.color": MUTED, "ytick.color": MUTED, "font.size": 12})


def canvas(title, subtitle):
    fig = plt.figure(figsize=(12, 9), dpi=100, facecolor=BG)
    fig.text(.045, .94, title, fontsize=25, weight="bold")
    fig.text(.045, .895, subtitle, fontsize=13, color=MUTED)
    return fig


def frame(fig):
    stream = io.BytesIO()
    fig.savefig(stream, format="png", dpi=100, facecolor=BG)
    plt.close(fig)
    stream.seek(0)
    return Image.open(stream).convert("RGB")


def save_sequence(frames, name):
    # One palette avoids distracting color changes between scientific figures.
    palette = frames[0].quantize(colors=192)
    indexed = [im.quantize(palette=palette, dither=Image.Dither.NONE) for im in frames]
    indexed[0].save(OUT / name, save_all=True, append_images=indexed[1:], duration=2200,
                    loop=0, optimize=True, disposal=2)


def calibration():
    # Execute the inspected estimator unchanged, redirecting only filesystem paths.
    archive = SOURCE / "calibration-data.npz"
    with tempfile.TemporaryDirectory(prefix="portfolio-calibration-") as tmp:
        root = SOURCE / "calibration"
        source = (root / "Code/Wrapper.py").read_text()
        source = source.replace("/home/alien/CV_p1/Calibration_Imgs", str(root / "Calibration_Imgs"))
        source = source.replace("/home/alien/CV_p1/outputs", str(Path(tmp) / "outputs"))
        script = Path(tmp) / "calibration.py"
        script.write_text(source)
        with (SOURCE / "calibration-run.log").open("w") as log, contextlib.redirect_stdout(log):
            result = runpy.run_path(str(script))
        np.savez(archive, **{key: result[key] for key in
                 ("A", "k1", "k2", "objpoints", "imgpoints", "image_paths", "rms_error")},
                 rotations=[r for r, t in result["extrinsics"]],
                 translations=[t for r, t in result["extrinsics"]])
    data = np.load(archive)
    assert len(data["image_paths"]) == len(data["imgpoints"]), "Corner/image correspondence must match"
    A = data["A"]
    frames = []
    for index in (0, 4, 10):
        observed = data["imgpoints"][index]
        camera = (data["rotations"][index] @ data["objpoints"][index].T) + data["translations"][index, :, None]
        normalized = camera[:2] / camera[2]
        radius2 = (normalized**2).sum(axis=0)
        distorted = normalized * (1 + data["k1"] * radius2 + data["k2"] * radius2**2)
        projected = (A @ np.vstack((distorted, np.ones(distorted.shape[1]))))[:2].T
        residual = projected - observed
        rms = np.sqrt((residual**2).sum(axis=1).mean())
        image = np.asarray(Image.open(str(data["image_paths"][index])))
        fig = canvas("Camera intrinsic calibration", "Measured checkerboard corners + geometric reprojection")
        ax = fig.add_axes([.035, .15, .56, .68])
        ax.imshow(image)
        lo, hi = observed.min(axis=0), observed.max(axis=0)
        pad = max(hi-lo) * .16
        ax.set_xlim(lo[0]-pad, hi[0]+pad)
        ax.set_ylim(hi[1]+pad, lo[1]-pad)
        ax.scatter(*observed.T, s=20, facecolors="none", edgecolors=CYAN, linewidths=1.2)
        ax.scatter(*projected.T, s=9, marker="+", c=PINK, linewidths=.9)
        ax.axis("off")
        fig.text(.055, .105, "54 corners / view", color=CYAN, fontsize=14)
        fig.text(.055, .07, "Crop of the original calibration photograph", color=MUTED, fontsize=11)
        ax = fig.add_axes([.68, .3, .27, .46], facecolor=BG)
        ax.scatter(*residual.T, c=CYAN, s=25, alpha=.85)
        lim = np.ceil(np.abs(residual).max()) + 1
        ax.set_xlim(-lim, lim)
        ax.set_ylim(lim, -lim)
        ax.set_aspect("equal")
        ax.axhline(0, color=MUTED, alpha=.4, lw=.8)
        ax.axvline(0, color=MUTED, alpha=.4, lw=.8)
        ax.set_xlabel("Horizontal error (px)")
        ax.set_ylabel("Vertical error (px)")
        ax.set_title("Reprojection residuals", color=TEXT, fontsize=14, pad=18)
        for spine in ax.spines.values(): spine.set_color("#3b4960")
        fig.text(.68, .21, f"View RMS  {rms:.2f} px", fontsize=21, weight="bold")
        fig.text(.68, .16, "Projected − measured; true pixel scale", fontsize=10, color=MUTED)
        fig.text(.045, .025, f"Source view {Path(str(data['image_paths'][index])).stem[-6:]}  •  Executed calibration, not a live camera feed", fontsize=11, color=MUTED)
        frames.append(frame(fig))
    save_sequence(frames, "camera-calibration.gif")
    frames[0].save(OUT / "camera-calibration-detail.png", optimize=True)


def blender():
    root = SOURCE / "blender/Blender_dataset/images"
    frames = []
    for camera, sample in ((1, 1), (2, 1), (3, 1), (1, 3), (2, 3), (3, 3)):
        stem = f"c{camera}_{sample:05d}"
        record = json.loads((root / f"keypoints/img_{stem}.json").read_text())
        image = Image.open(root / f"images/img_{stem}.png")
        mask = Image.open(root / f"masks/mask_{stem}.png")
        fig = canvas("Synthetic data, paired annotations", f"Blender dataset generator  /  Camera {camera}  /  Scene {sample:02d}")
        for x, im, label in ((.04, image, "RENDER + PROJECTED CORNERS"), (.52, mask, "SAVED MASK PASS")):
            ax = fig.add_axes([x, .17, .44, .66])
            ax.imshow(im, cmap="gray", vmin=0, vmax=255)
            if x == .04:
                for obj in record["objects"]:
                    pts = np.array([[p["x"], record["resolution"]["height"]-1-p["y"]] for p in obj["keypoints"]])
                    ax.scatter(*pts.T, s=42, c=CYAN, edgecolors=BG, linewidths=.7)
            ax.axis("off")
            fig.text(x, .12, label, fontsize=13, color=CYAN if x==.04 else TEXT)
        fig.text(.04, .065, "RGB image + mask + JSON corner coordinates", fontsize=18, weight="bold")
        fig.text(.04, .025, "Saved repository outputs  •  Mask pass omits occluders; corner coordinates are not visibility-filtered", fontsize=10, color=MUTED)
        frames.append(frame(fig))
    save_sequence(frames, "blender-dataset.gif")


if __name__ == "__main__":
    calibration()
    blender()
