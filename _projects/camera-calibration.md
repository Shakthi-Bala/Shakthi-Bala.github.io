---
layout: page
title: Camera Intrinsic Calibration
description: A checkerboard calibration pipeline that derives camera intrinsics, extrinsics, and radial distortion from planar homographies.
img: assets/projects/camera-calibration.gif
importance: 8
category: Computer Vision & Camera Geometry
featured: true
github: https://github.com/Shakthi-Bala/Intrinsic_calibration_math_cam
skills: Python · NumPy · OpenCV · DLT · SVD · Least Squares · Camera Geometry
highlight: Checkerboard observations → camera parameters → reprojection checks
media_alt: Saved checkerboard corner detections and observed-versus-projected corner overlays across calibration views
media_width: 800
media_height: 600
---

**Recover camera parameters from images of a planar checkerboard, with the geometry implemented explicitly.**

[View code on GitHub](https://github.com/Shakthi-Bala/Intrinsic_calibration_math_cam) ·
[Read the report](https://github.com/Shakthi-Bala/Intrinsic_calibration_math_cam/blob/main/Report_compressed.pdf)

{% include figure.liquid path="assets/projects/camera-calibration.gif" avoid_scaling=true loading="eager" alt="A slideshow of saved calibration outputs showing checkerboard corners and measured versus reprojected points" width="800" height="600" class="img-fluid rounded z-depth-1" %}

_Animated sequence of saved corner-detection and reprojection figures from the repository. Green and red reprojection markers distinguish observed and projected corners._

## The problem

Pixel coordinates become useful geometric measurements only when the camera model is known. Instead of treating calibration as a single library call, this project exposes the steps connecting a known planar target to focal lengths, principal point, skew, camera poses, and radial distortion.

## Implementation

- **Subpixel measurements.** Detects a 9×6 checkerboard and refines corner locations with OpenCV; the target uses a 0.025 m square size.
- **Normalized homography estimation.** Normalizes object and image coordinates, builds the DLT system, and solves it with SVD before restoring the original coordinate frames.
- **Closed-form intrinsics.** Uses homography constraints to recover the intrinsic matrix, including focal lengths, principal point, and skew.
- **Per-view extrinsics.** Extracts rotation and translation from each homography and projects the rotation estimate back onto an orthonormal matrix.
- **Radial distortion and validation.** Fits two radial-distortion coefficients with linear least squares, computes per-image and overall RMS reprojection errors, and writes observed-versus-projected overlays.

## Why expose the mathematics?

Each stage provides a check on the next one: corner quality affects homographies, homography consistency affects intrinsics, and reprojection errors reveal whether the complete model explains the observations. The repository retains calibration images, corner overlays, and reprojection figures for inspection.

## Reproduction and scope

Update the input and output directories in `Code/Wrapper.py` before running it. The implementation uses a planar checkerboard and a two-coefficient radial model; it does not establish calibration stability across different lenses or a full tangential-distortion model. The GIF shows saved outputs rather than a new calibration run.

[Explore the derivation in code and inspect the saved outputs →](https://github.com/Shakthi-Bala/Intrinsic_calibration_math_cam)
