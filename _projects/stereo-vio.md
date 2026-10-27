---
layout: page
title: Stereo Visual-Inertial Odometry
description: "Python to C++17: 3.1× faster deterministic replay, two estimation back ends, and zero failures across 11 EuRoC sequences."
img: assets/projects/stereo-vio-demo.gif
importance: 1
category: Robotics & Perception
featured: true
github: https://github.com/Shakthi-Bala/Classical_vio/tree/cpp
skills: C++17 · ROS 2 · Eigen · Ceres · OpenCV · Python
highlight: 0.156 m mean trajectory error across all 11 EuRoC sequences
media_alt: Stereo feature tracks beside estimated and ground-truth trajectories on EuRoC MH_05_difficult
media_width: 720
media_height: 338
portfolio: true
topics: [perception]
featured_order: 1
featured_area: Visual-inertial estimation
card_stack: "C++17 · ROS 2 · Eigen · Ceres"
featured_summary: C++17 estimation with two back ends, numerical parity checks, and ROS 2 integration.
card_result: "0.156 m mean trajectory error across all 11 EuRoC sequences."
card_conditions: "SE3 alignment, loop closure disabled; estimator settings were selected on those same sequences."
---

Stereo visual-inertial odometry in Python and C++17, evaluated on EuRoC and TUM-VI.

<link rel="stylesheet" href="{{ '/assets/css/research-content.css' | relative_url }}">

<section class="project-brief" aria-label="Project summary">
  <dl>
    <div><dt>Contribution &amp; credit</dt><dd>Rebuilt the Python stereo MSCKF in C++17, added a Ceres sliding-window back end and ROS 2 integration, and investigated front-end tracking failures. The Python baseline comes from WPI coursework built on KumarRobotics/msckf_vio.</dd></div>
    <div><dt>Outcome &amp; conditions</dt><dd>The sliding-window estimator reached <strong>0.156 m mean ATE across all 11 EuRoC sequences</strong>, after SE3 alignment with loop closure disabled. Its settings were selected on those same sequences.</dd></div>
    <div><dt>Engineering decision</dt><dd>Kept validated cam0-only tracks when stereo matching disappeared. This brought V2_03 from sliding-window divergence to 0.200 m ATE; triangulation checks prevented poorly constrained landmarks.</dd></div>
    <div><dt>Artifacts</dt><dd><a href="#project-demo">Recorded demo</a> · <a href="https://github.com/Shakthi-Bala/Classical_vio/tree/cpp">Code</a> · <a href="https://github.com/Shakthi-Bala/Classical_vio/blob/cpp/cpp/README.md">Technical documentation &amp; reproduction</a> · <a href="{{ '/notes/stereo-tracking-dropouts/' | relative_url }}">Failure investigation</a></dd></div>
  </dl>
</section>

<figure class="system-diagram" aria-labelledby="system-diagram-title">
  <figcaption id="system-diagram-title"><span>System overview</span><strong>Stereo VIO · shared front end, two back ends</strong></figcaption>
  <ol class="system-diagram-flow">
    <li><span class="system-stage-label">Sensor input</span><strong>Stereo images + IMU</strong><p>Calibrated EuRoC or ROS 2 input</p></li>
    <li><span class="system-stage-label">Measurements</span><strong>Tracked features + inertial constraints</strong><p>Stereo matching; retain validated cam0-only tracks during stereo dropouts</p></li>
    <li><span class="system-stage-label">Estimator alternatives</span><strong>MSCKF filter / Ceres sliding window</strong><p>Shared visual front end; the sliding window uses IMU preintegration</p></li>
    <li><span class="system-stage-label">Output &amp; evaluation</span><strong>Pose trajectory</strong><p>SE3-aligned ATE, completion rate, and processing time</p></li>
  </ol>
  <p class="system-diagram-note">The filter and sliding-window optimizer are alternative back ends. Benchmark results on this page disable loop closure unless stated otherwise.</p>
</figure>

<span id="project-demo" class="research-anchor"></span>

{% include figure.liquid path="assets/projects/stereo-vio-demo.gif" avoid_scaling=true loading="eager" alt="Stereo feature tracks on the left and MSCKF, sliding-window, and ground-truth trajectories on the right" width="720" height="338" class="img-fluid rounded z-depth-1" %}

_Recorded outputs from EuRoC MH_05_difficult, played at approximately 8× speed. Colors indicate feature-track age._

## Results at a glance

| Engineering result          | Measured outcome                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Faster deterministic replay | **3.1× speedup:** 25.17 ms/frame in Python → 8.06 ms/frame for the behavior-matched C++ port                     |
| Complete benchmark coverage | **11/11 EuRoC sequences completed**, with no failures for either final C++ back end                              |
| Sliding-window accuracy     | **0.156 m** mean absolute trajectory error (ATE), versus **0.217 m** for the evaluated VINS-Fusion configuration |
| ROS 2 integration           | **10.1 ms/frame** end to end for the MSCKF on MH_01, using one core                                              |
| Numerical parity            | Filter poses agree with Python to **1e-9 m** when given identical feature input                                  |

Timing for the behavior-matched port is the mean of five runs on the same compute node, using one core and MH_01_easy. The final MSCKF configuration takes 8.41 ms/frame offline; ROS 2 timing includes additional integration overhead. ATE is measured after SE3 alignment and averaged across all 11 EuRoC sequences, with loop closure disabled for the comparison above.

## The problem

A working Python estimator is a starting point, but a robotics system also needs predictable runtime, robust tracking, and reproducible evaluation. This project began with a WPI RBE/CS549 stereo MSCKF implementation and grew into a C++17 system with two estimation back ends and a ROS 2 interface.

## What I built

- **A verified C++ port.** Matched the Python filter module by module and checked front-end feature parity across all 2,882 MH_01 frames before changing the estimator.
- **Two back ends on a shared front end.** An MSCKF filter and a Ceres sliding-window optimizer with IMU preintegration, inverse-depth landmarks, analytic Jacobians, and Schur-complement marginalization.
- **Performance improvements backed by profiling.** Reused image pyramids, removed redundant covariance products, and restricted gating calculations to active state blocks while preserving numerical output.
- **ROS 2 and reproducible evaluation.** Added bag playback, benchmark scripts, unit tests, cross-architecture CI, and Docker packaging.

## A failure I investigated and fixed

[Engineering note: keeping tracks when stereo matching fails]({{ '/notes/stereo-tracking-dropouts/' | relative_url }})

On V2_03_difficult, independent camera exposure and motion blur caused stereo matching to disappear for seconds at a time. Discarding every feature without a stereo match left the estimators without visual updates.

I retained validated cam0-only tracks and added baseline checks for triangulation. The sliding-window estimator went from divergence to **0.200 m ATE** on that sequence; the final MSCKF reached **0.217 m**. This turned a dataset-specific tracking failure into a concrete front-end and estimator improvement.

{% include figure.liquid path="assets/projects/stereo-vio-benchmark.png" avoid_scaling=true loading="lazy" alt="Benchmark plot comparing trajectory accuracy and processing latency for Python MSCKF, C++ MSCKF, C++ sliding window, and VINS-Fusion" class="img-fluid rounded" %}

## Tradeoffs and evaluation scope

The MSCKF offers lower compute cost; the sliding window improves average EuRoC accuracy. Optional 4-DoF loop closure reduces the sliding window's final mean ATE to **0.105 m**, but it uses pose-proximity candidates rather than general appearance-based place recognition.

The EuRoC configuration was selected on the same 11 sequences used for evaluation. As a separate generalization check, the MSCKF achieved **0.129 m** mean ATE on the six TUM-VI room sequences using the EuRoC filter settings and dataset-specific calibration. These are repository benchmarks, not deployment guarantees.

The Python baseline builds on course starter code translated from KumarRobotics/msckf_vio. The repository documents that lineage alongside the C++ extensions, measurements, and reproduction commands.

[Explore the implementation and full results →](https://github.com/Shakthi-Bala/Classical_vio/tree/cpp/cpp)
