---
layout: page
title: Vizflyt Window Perception Stack
description: A segmentation-to-navigation prototype with attention U-Net inference, window-mask postprocessing, centroid corrections, and simulated waypoint tracking.
img: assets/projects/vizflyt-perception.webp
importance: 19
category: Robot Perception & Visual Servoing
featured: false
github: https://github.com/Shakthi-Bala/Vizflyt_perception_stack
skills: Python · PyTorch · OpenCV · Attention U-Net · Gaussian Splatting · Visual Servoing
highlight: RGB rendering → window features → alignment and traversal
media_alt: Synchronized RGB, depth, and window-mask views from the supplied window perception video
media_width: 960
media_height: 720
portfolio: true
topics: [perception]
---

**Connect a window segmentation model to the geometric and control interfaces needed for rendered navigation.**

[View code on GitHub](https://github.com/Shakthi-Bala/Vizflyt_perception_stack) · [Inspect window feature extraction](https://github.com/Shakthi-Bala/Vizflyt_perception_stack/blob/main/Code/window_detector.py)

{% include figure.liquid path="assets/projects/vizflyt-perception.webp" avoid_scaling=true loading="eager" alt="Synchronized RGB, depth, and window-mask views from the supplied window perception video" width="960" height="720" class="img-fluid rounded z-depth-1" %}

_Supplied window-perception recording, sampled at five frames per second and shown at source-video speed. The synchronized RGB, depth, and window-mask panels are rearranged for readability; no new model inference is added._

<video controls playsinline preload="metadata" style="display: block; width: 100%; height: auto;" width="1920" height="480" aria-label="Full window perception recording showing synchronized RGB, depth, and window-mask views">
  <source src="{{ '/assets/video/vizflyt-perception-mask-depth.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support embedded video. <a href="{{ '/assets/video/vizflyt-perception-mask-depth.mp4' | relative_url }}">Watch the full recording</a>.
</video>

[Open the full-resolution video]({{ '/assets/video/vizflyt-perception-mask-depth.mp4' | relative_url }})

_The full recording preserves the original three-panel layout, resolution, and playback timing._

## The problem

A segmentation mask is not yet a navigation target. Multiple detections must be separated, a candidate must be selected, and its image-space geometry must be converted into useful alignment and motion commands.

## Implementation

- **Attention U-Net inference.** Loads an external segmentation checkpoint and preprocesses rendered RGB frames for prediction.
- **Mask postprocessing.** Includes connected-component, erosion, and watershed-based strategies for separating window candidates.
- **Feature extraction.** Computes a selected candidate's centroid, area, and minimum-area rectangle corners for downstream control.
- **Alignment and traversal.** Uses centroid errors to correct position before a forward waypoint phase, with per-window offsets.
- **Simulation integration.** Connects the renderer, trajectory profiles, quadrotor dynamics, and controller, and saves video and diagnostic outputs.

## Design and evidence

The supplied recording shows synchronized RGB, depth, and window-mask output as the camera view changes. The implementation exposes the mask-to-feature handoff and its control use, but the active navigation path remains tuned to three windows with explicit per-window offsets.

Although the repository overview mentions PnP pose estimation, the inspected main navigation path uses segmentation-centroid corrections. This case study describes that implemented path without assigning it an unverified PnP accuracy result.

## Reproduction and scope

The segmentation checkpoint, Gaussian-splat scene, and render settings are external and referenced through machine-specific paths. The recording is an existing visualization, not a newly reproduced model evaluation. No held-out detection accuracy, pose-error benchmark, or physical-flight result is claimed.

[Explore the detector, postprocessing, and navigation handoff →](https://github.com/Shakthi-Bala/Vizflyt_perception_stack)
