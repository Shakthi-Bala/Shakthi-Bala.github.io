---
layout: post
title: Keeping tracks when stereo matching fails
description: Why cam0-only tracks helped a stereo VIO system on EuRoC V2_03, and why retaining them also needed triangulation checks.
date: 2026-10-27
permalink: /notes/stereo-tracking-dropouts/
tags: perception state-estimation
categories: engineering-notes
related_posts: false
---

**Engineering note · Stereo VIO repository experiment**

On EuRoC V2_03_difficult, the stereo front end sometimes delivered no features for two to seven seconds. The MSCKF continued on inertial measurements and accumulated error. The sliding-window estimator diverged.

The useful diagnostic was the difference between stereo matches and temporal tracks.

## What disappeared, and what remained

The cameras expose independently. In dim parts of this sequence, cam0's exposure exceeded 50 ms and its rate dropped to about 10 Hz. Its images became motion-blurred while cam1's stayed sharp. Matching blurred patches to sharp ones failed, even with a 31×31 LK window and five pyramid levels.

Tracking cam0 against its previous frame still worked for about 60% of the corners. The front end was discarding these tracks because they lacked a right-camera match.

{% include figure.liquid path="assets/projects/stereo-vio-tracking.png" avoid_scaling=true loading="lazy" alt="Saved diagnostic plot of stereo tracking availability, temporal tracks, and camera exposure on EuRoC V2_03" class="img-fluid rounded" %}

_Saved diagnostic figure from the VIO repository. The plotted measurements are unchanged._

## Keeping the observations took more than a flag

The revised front end keeps a cam0 track with a missing right-camera coordinate. A forward/backward tracking check must return within one pixel, since the stereo consistency check is unavailable.

The back ends also need to understand the reduced observation:

- The MSCKF adds two image residual rows for a monocular observation, rather than four for stereo.
- A feature with no stereo depth waits for 0.2 m of motion perpendicular to its viewing ray before MSCKF triangulation.
- The sliding window triangulates a monocular landmark once the anchor and current rays are at least one degree apart, then uses cam0 reprojection factors.

The baseline check mattered. Without it, V2_01 diverged after the additional tracks were introduced.

## The tradeoff across sequences

| V2_03, ATE RMSE | Stereo-only | Final configuration |
| --------------- | ----------- | ------------------- |
| MSCKF           | 0.677 m     | 0.217 m             |
| Sliding window  | Diverged    | 0.200 m             |

Keeping every available monocular track was not uniformly beneficial. These features compete with stereo tracks for grid slots. The final MSCKF configuration prunes cam0-only tracks first when a cell is full; the sliding window retains the unpruned variant.

Those choices were selected on the same 11 EuRoC sequences used for evaluation. The comparison establishes the behavior of these configurations on that benchmark; a separate dataset is needed to assess how well the choice transfers.

The remaining question is how to choose the mixture of stereo and monocular observations as match quality changes. The present grid policy is a heuristic, and the two back ends prefer different variants.

[Read the case study]({{ '/projects/stereo-vio/' | relative_url }}) · [Inspected implementation and experiment record](https://github.com/Shakthi-Bala/Classical_vio/blob/5a659caad3694b498a67e6236d9b847d2ab257ce/cpp/README.md#cam0-only-features-what-broke-v2_03)
