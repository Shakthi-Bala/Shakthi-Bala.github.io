---
layout: page
title: "RGMC SimSort: Vision-Based Object Sorting"
description: A documented sorting-system design that combines seven camera lookup positions, five workspace regions, object orientation estimation, and region-specific motion planning.
img: assets/projects/rgmc-simsort.svg
importance: 16
category: Robotic Manipulation & Task Planning
featured: false
github: https://github.com/Shakthi-Bala/RGMC_Simsort_2025
skills: MATLAB · YOLOv4 · Point Clouds · PCA · Inverse Kinematics · Cubic Splines
highlight: Seven lookup views → five region strategies → class-based sorting
media_alt: Illustration of seven lookup views feeding perception, five region strategies, and class-based placement
media_width: 1200
media_height: 900
portfolio: true
topics: [perception, manipulation]
---

**Break a large sorting workspace into manageable perception views and region-specific manipulation strategies.**

[View project overview on GitHub](https://github.com/Shakthi-Bala/RGMC_Simsort_2025)

{% include figure.liquid path="assets/projects/rgmc-simsort.svg" avoid_scaling=true loading="eager" alt="Illustration of seven lookup views feeding perception, five region strategies, and class-based placement" width="1200" height="900" class="img-fluid rounded z-depth-1" %}

_Architecture illustration of the approach described in the project README. It is a design summary, rather than a screenshot of a running system._

## The problem

A single view cannot conveniently cover every object in a large workspace. Objects may also need different handling depending on their orientation, container placement, and reachability. The documented approach uses predefined camera lookup positions and routes each region to an appropriate planning strategy.

## Documented system design

- **Seven lookup positions.** Observe subsets of the workspace independently instead of stitching the complete scene continuously.
- **Object recognition.** The overview specifies a custom YOLOv4 detector in MATLAB with an 85% confidence cutoff. This is a detection threshold, not a measured accuracy score.
- **Position and orientation estimation.** Deproject detections into 3D and use point-cloud centroids and principal component analysis to estimate object orientation where needed.
- **Five region strategies.** Distinguish static, orientation-change, box, object-change, and out-of-reach regions.
- **Region-aware motion.** Use inverse kinematics for manipulation and intermediate checkpoints with segmented cubic splines for the out-of-reach region.
- **Class-based sorting.** Associate the detected class index with a predefined placement location.

## Why partition the workspace?

| Region             | Strategy described in the overview                    |
| ------------------ | ----------------------------------------------------- |
| Static             | Fixed pick/place poses and class-based destinations   |
| Orientation change | Point-cloud PCA to align the gripper                  |
| Box                | Orientation estimation for objects inside a container |
| Object change      | PCA and IK for changing configurations                |
| Out of reach       | Intermediate checkpoints and segmented splines        |

## Available evidence

The inspected public Git checkout contains the README only. It links to an external folder for scripts and demonstrations, but those files are not part of the inspected repository. This case study therefore presents the documented design without claiming a reproduced implementation, competition placement, measured sorting accuracy, or verified cycle time.

[Read the project overview and follow its demo/files link →](https://github.com/Shakthi-Bala/RGMC_Simsort_2025)
