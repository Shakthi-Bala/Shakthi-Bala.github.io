---
layout: page
title: Multi-Window Navigation in a Gaussian-Splat Scene
description: A rendered aerial-navigation project connecting attention U-Net window detection, camera-ray geometry, waypoint control, and an optical-flow extension.
img: assets/projects/aerial-window-navigation.webp
importance: 17
category: Aerial Robotics & Visual Navigation
featured: true
github: https://github.com/Shakthi-Bala/Final_project_Aerial_Robotics_RBE595
skills: Python · PyTorch · Attention U-Net · Gaussian Splatting · Camera Geometry · Quadrotor Control
highlight: Window segmentation → world-frame ray → waypoint motion
media_alt: Recorded Gaussian-splat camera views moving through a scene with three window targets
media_width: 720
media_height: 540
---

**Turn a detected opening into a geometric direction and a simulated motion command through a multi-window scene.**

[View code on GitHub](https://github.com/Shakthi-Bala/Final_project_Aerial_Robotics_RBE595) · [Watch the source recording](https://github.com/Shakthi-Bala/Final_project_Aerial_Robotics_RBE595/blob/main/video/drone_3windows.mp4)

{% include figure.liquid path="assets/projects/aerial-window-navigation.webp" avoid_scaling=true loading="eager" alt="Recorded Gaussian-splat camera views moving through a scene with three window targets" width="720" height="540" class="img-fluid rounded z-depth-1" %}

_Sampled frames from the repository's saved rendered navigation video, played at approximately 4.2× source-video speed. This is a Gaussian-splat scene viewed from simulated camera poses, rather than a physical drone recording._

## The problem

Finding a window in an image is only the first step toward traversal. A navigation system must connect image coordinates to a direction in the world, choose a target, and execute the motion while maintaining a consistent pose representation.

## Implementation

- **Window segmentation.** An attention U-Net and OpenCV postprocessing extract a candidate window mask, centroid, and corners.
- **Camera-to-world geometry.** Backprojects the centroid through the inverse intrinsic matrix, transforms the ray through camera/body/world conventions, and derives a horizontal travel direction.
- **Waypoint tracking.** Generates position, velocity, and acceleration profiles, computes quadrotor control inputs, and integrates the model with SciPy's ODE solver.
- **Multi-window sequencing.** Coordinates alignment and traversal with per-window offsets, recorded states, and return-path utilities.
- **Optical-flow exploration.** Includes a RAFT-based branch for finding an opening from motion cues, with a background frame-processing thread.
- **Recorded visualization.** Retains a rendered navigation video and saved RGB, depth, and mask artifacts.

## Engineering detail

The repository includes several experimental entry points. In the inspected `main.py`, detected centroids guide a world-frame ray, while travel distances, lateral corrections, and some transitions remain specific to the scene. The rendering path also levels roll and pitch for some camera views. These choices matter when interpreting a visually plausible traversal.

## Reproduction and scope

Reproduction requires the external Gaussian-splat scene, renderer configuration, segmentation weights, and RAFT code/weights for the optical-flow branch, plus updates to absolute paths. The preview shows an existing recording; it does not establish autonomous success across unseen scenes, end-to-end physical flight, or a measured collision-avoidance rate.

[Explore the geometric handoff, controller, and experiment variants →](https://github.com/Shakthi-Bala/Final_project_Aerial_Robotics_RBE595)
