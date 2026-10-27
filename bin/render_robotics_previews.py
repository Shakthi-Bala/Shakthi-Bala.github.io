#!/usr/bin/env python3
"""Render portfolio previews from saved robotics recordings and figures.

Usage: python bin/render_robotics_previews.py /path/to/portfolio-sources
Requires OpenCV, NumPy, Matplotlib, and Pillow. Source paths and inspected
revisions are recorded in docs/PROJECT_MEDIA.md. Does not run robot controllers.
"""
import io
import sys
from pathlib import Path

import cv2
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from PIL import Image

SOURCE = Path(sys.argv[1]).resolve()
OUT = Path(__file__).resolve().parents[1] / "assets/projects"
BG = "#101827"


def save_gif(frames, name, duration):
    if name.endswith(".webp"):
        frames[0].save(OUT / name, save_all=True, append_images=frames[1:],
                       duration=duration, loop=0, quality=72, method=6)
        print(name, len(frames), "frames", frames[0].size)
        return
    # Keep each scientific frame's own colors rather than deriving a palette
    # from downsampled thumbnails, which can wash out thin plot traces.
    frames = [frame.quantize(colors=256, dither=Image.Dither.NONE) for frame in frames]
    frames[0].save(OUT / name, save_all=True, append_images=frames[1:],
                   duration=duration, loop=0, optimize=True, disposal=2)
    print(name, len(frames), "frames", frames[0].size)


def recording(relative, name, stride, duration):
    capture = cv2.VideoCapture(str(SOURCE / relative))
    frames = []
    index = 0
    while True:
        ok, bgr = capture.read()
        if not ok:
            break
        if index % stride == 0:
            rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
            rgb = cv2.resize(rgb, (720, 540), interpolation=cv2.INTER_AREA)
            frames.append(Image.fromarray(rgb))
        index += 1
    capture.release()
    if not frames:
        raise RuntimeError(f"No decoded frames: {relative}")
    save_gif(frames, name, duration)


def cbf_figures():
    root = SOURCE / "CBF_for_full_drone_dynamics/figures/with_cbf/2_cylinder"
    frames = []
    for filename, subtitle in [
        ("cbf_2cylinder_top_down.png", "Saved top-down trajectory / two-cylinder scenario"),
        ("cbf_2cylinder_dist_to_obs.png", "Saved obstacle-distance plot / two-cylinder scenario"),
    ]:
        fig = plt.figure(figsize=(12, 9), dpi=100, facecolor=BG)
        fig.text(.04, .94, "Quadrotor control with C3BF", color="white", fontsize=28, weight="bold")
        fig.text(.04, .89, subtitle, color="#a8b7ca", fontsize=15)
        ax = fig.add_axes([.04, .08, .92, .76])
        ax.imshow(Image.open(root / filename))
        ax.axis("off")
        fig.text(.04, .025, "Repository simulation figures; original axes and legends preserved", color="#a8b7ca", fontsize=12)
        stream = io.BytesIO()
        fig.savefig(stream, format="png", facecolor=BG)
        plt.close(fig)
        stream.seek(0)
        frames.append(Image.open(stream).convert("RGB"))
    save_gif(frames, "cbf-drone.gif", 2400)


def window_perception():
    """Reflow the owner's three-panel recording for a readable project card."""
    path = OUT.parents[1] / "assets/video/vizflyt-perception-mask-depth.mp4"
    cap = cv2.VideoCapture(str(path))
    frames = []
    index = 0
    while True:
        ok, bgr = cap.read()
        if not ok:
            break
        if index % 6 == 0:
            rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
            height, width = rgb.shape[:2]
            assert (width, height) == (1920, 480), "Expected three 640x480 panels"
            fig = plt.figure(figsize=(12, 9), dpi=80, facecolor=BG)
            fig.text(.035, .94, "Window perception: RGB + depth + mask", color="white", fontsize=25, weight="bold")
            for panel, bounds, label, label_y in [
                (0, [.025, .16, .60, .64], "RGB VIEW", .805),
                (1, [.66, .51, .31, .33], "DEPTH VIEW", .855),
                (2, [.66, .105, .31, .33], "WINDOW-MASK OUTPUT", .45),
            ]:
                ax = fig.add_axes(bounds)
                ax.imshow(rgb[:, panel*640:(panel+1)*640])
                ax.axis("off")
                fig.text(bounds[0], label_y, label, color="#67e8f9", fontsize=13)
            fig.text(.035, .045, "Supplied recording / synchronized source panels / source-video speed", color="#a8b7ca", fontsize=12)
            stream = io.BytesIO()
            fig.savefig(stream, format="png", facecolor=BG)
            plt.close(fig)
            stream.seek(0)
            frames.append(Image.open(stream).convert("RGB"))
        index += 1
    cap.release()
    if not frames:
        raise RuntimeError(f"No decoded frames: {path}")
    save_gif(frames, "vizflyt-perception.webp", 200)


def orientation():
    path = SOURCE / "Pose_correction_with_filters/Phase1/Videos/orientation_comparison_6_panel_5.mp4"
    cap = cv2.VideoCapture(str(path))
    frames = []
    index = 0
    while True:
        ok, bgr = cap.read()
        if not ok:
            break
        if index % 4 == 0:
            rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
            height, width = rgb.shape[:2]
            assert width % 6 == 0, "Expected six equal comparison panels"
            fig = plt.figure(figsize=(12, 9), dpi=80, facecolor=BG)
            fig.text(.04, .95, "One IMU. Five estimators. Vicon reference.", color="white", fontsize=23, weight="bold")
            for i in range(6):
                # Reflow the saved scientific panels without changing the estimates.
                ax = fig.add_axes([.055 + (i % 3)*.31, .48 - (i // 3)*.405, .27, .37])
                ax.imshow(rgb[:, i*width//6:(i+1)*width//6])
                ax.axis("off")
            fig.text(.04, .025, "Recorded orientation comparison / source video labeled sequence 5 / original playback speed", color="#a8b7ca", fontsize=11)
            stream = io.BytesIO()
            fig.savefig(stream, format="png", facecolor=BG)
            plt.close(fig)
            stream.seek(0)
            frames.append(Image.open(stream).convert("RGB"))
        index += 1
    cap.release()
    save_gif(frames, "orientation-filters.gif", 200)


if __name__ == "__main__":
    cbf_figures()
    recording("Final_project_Aerial_Robotics_RBE595/video/drone_3windows.mp4", "aerial-window-navigation.webp", 15, 120)
    window_perception()
    orientation()
