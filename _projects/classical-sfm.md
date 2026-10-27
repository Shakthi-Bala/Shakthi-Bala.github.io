---
layout: page
title: Classical Structure from Motion
description: A geometric reconstruction pipeline with robust feature matching, camera-pose recovery, triangulation, PnP, and local bundle adjustment.
img: assets/projects/classical-sfm.gif
importance: 10
category: Geometric Vision & 3D Reconstruction
featured: false
github: https://github.com/Shakthi-Bala/Structure_from_motion_classical
skills: Python · NumPy · OpenCV · SIFT · RANSAC · Triangulation · PnP · SciPy
highlight: Image correspondences → camera poses and 3D points → reprojection diagnostics
media_alt: Saved reprojection overlays at linear triangulation, unstable nonlinear triangulation, and after bundle adjustment
media_width: 800
media_height: 600
portfolio: true
topics: [vision]
---

**Recover camera motion and scene structure from overlapping images, and inspect how each optimization stage changes the reprojection.**

[View code on GitHub](https://github.com/Shakthi-Bala/Structure_from_motion_classical) ·
[Inspect the saved reprojection report](https://github.com/Shakthi-Bala/Structure_from_motion_classical/blob/main/Phase1/outputs/reprojection/reprojection_report.csv)

{% include figure.liquid path="assets/projects/classical-sfm.gif" avoid_scaling=true loading="eager" alt="Saved SfM reprojection plots showing linear triangulation, an unstable nonlinear intermediate, and final bundle-adjustment overlays for two cameras" width="800" height="600" class="img-fluid rounded z-depth-1" %}

_Animated sequence of saved reprojection figures. The nonlinear-triangulation frame deliberately retains the unstable intermediate result; the final frames show the reported bundle-adjustment outputs._

## The problem

Matching two images is only the beginning of reconstruction. Outliers corrupt epipolar geometry, multiple camera poses can explain an essential matrix, and small pose errors can become large 3D errors. A useful pipeline must expose those stages and measure how well the reconstructed points project back into the input images.

## Implementation

- **Robust correspondences.** Matches SIFT features and uses RANSAC to reject inconsistent pairs before estimating epipolar geometry.
- **Two-view initialization.** Converts the fundamental matrix into an essential matrix, extracts candidate camera poses, and disambiguates them using triangulated points.
- **Point and pose refinement.** Includes linear and nonlinear triangulation, linear PnP, PnP-RANSAC, and nonlinear pose refinement for additional views.
- **Local bundle adjustment.** Jointly refines a camera pose and 3D points over image pairs with SciPy least squares.
- **Stage-by-stage diagnostics.** Writes reprojection overlays and tabulates mean, median, RMS, and maximum pixel error.

## What the saved results show

For the recorded **45-point** comparison, the final bundle-adjustment rows report mean reprojection errors of **0.120 px for camera 1** and **0.111 px for camera 2**. The same report also contains severe errors at nonlinear-triangulation and PnP intermediate stages. Those rows make the numerical behavior visible rather than supporting a claim that every refinement stage improved the estimate.

## Evaluation scope

These are saved results for a particular correspondence set, not a broad reconstruction benchmark. The implementation performs pairwise local bundle adjustment rather than a global optimization over every camera. Input paths are machine-specific and must be updated before reproduction; monocular reconstruction also retains its usual scale ambiguity.

[Explore the geometry modules and complete saved diagnostics →](https://github.com/Shakthi-Bala/Structure_from_motion_classical)
