---
layout: page
title: IMU Orientation Estimation & Filter Comparison
description: Gyroscope integration, accelerometer tilt, complementary filtering, Madgwick fusion, and quaternion UKF compared with Vicon orientation reference data.
img: assets/projects/orientation-filters.gif
importance: 20
category: State Estimation & Sensor Fusion
featured: true
github: https://github.com/Shakthi-Bala/Pose_correction_with_filters
skills: Python · NumPy · SciPy · Quaternions · Madgwick · UKF · IMU Calibration
highlight: Compare five orientation estimators against a Vicon reference
media_alt: Six saved orientation animations comparing gyro, accelerometer, complementary, Madgwick, UKF, and Vicon
media_width: 960
media_height: 720
---

**Investigate how different sensor-fusion choices change orientation estimates from the same inertial measurements.**

[View code on GitHub](https://github.com/Shakthi-Bala/Pose_correction_with_filters) · [Inspect the comparison implementation](https://github.com/Shakthi-Bala/Pose_correction_with_filters/blob/main/Phase1/scripts/Final_code.py)

{% include figure.liquid path="assets/projects/orientation-filters.gif" avoid_scaling=true loading="eager" alt="Six saved orientation animations comparing gyro, accelerometer, complementary, Madgwick, UKF, and Vicon" width="960" height="720" class="img-fluid rounded z-depth-1" %}

_Saved six-panel orientation-comparison recording labeled sequence 5 in the source repository. The original horizontal panels are rearranged into two rows for readability and sampled at source-video speed. Estimates and timestamps are unchanged._

## The problem

Gyroscope integration accumulates bias, while accelerometer-based tilt becomes unreliable during motion. This project compares several ways to combine those measurements, using a motion-capture orientation reference to inspect their behavior over time.

## Implementation

- **Measurement preparation.** Loads MATLAB IMU/Vicon records and calibration parameters, estimates gyroscope offsets, applies accelerometer scale/bias corrections, and checks timestamp ordering.
- **Simple baselines.** Implements rotation integration from angular velocity and gravity-based tilt after low-pass filtering.
- **Complementary fusion.** Combines integrated angular rates with smoothed accelerometer angles.
- **Madgwick fusion.** Uses quaternion propagation and an accelerometer-driven correction with configurable gain and bias handling.
- **Quaternion UKF.** Implements an error-state sigma-point construction, quaternion mean/covariance operations, gyro propagation, and accelerometer measurement updates.
- **Reference comparison.** Aligns Vicon samples to IMU timestamps and exports roll/pitch/yaw plots and side-by-side 3D orientation animations.

## Why compare the baselines?

The raw estimators make the fusion problem visible: integrating rates and measuring gravity answer different parts of the attitude problem. Accelerometer measurements alone cannot determine absolute yaw, and a six-axis fusion system still needs assumptions or an external reference to constrain heading drift.

The UKF section explicitly references the Kraft formulation. The project also contains later planning and simulation experiments; this case study focuses on the orientation-filter comparison represented in the saved artifacts.

## Reproduction and scope

The repository supplies training IMU/Vicon `.mat` files and calibration parameters. Update the absolute data paths in the comparison script and review its axis mappings, initialization, and noise settings before running. The inspected implementation initializes from Vicon and uses hand-selected parameters, so its plots are a diagnostic comparison rather than a reference-free localization benchmark. This page does not claim full position correction, a new error score, or performance across independent datasets.

[Explore the calibration, filters, and recorded comparisons →](https://github.com/Shakthi-Bala/Pose_correction_with_filters)
