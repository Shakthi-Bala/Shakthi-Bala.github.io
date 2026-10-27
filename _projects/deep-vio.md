---
layout: page
title: Deep Visual-Inertial Odometry
description: A comparison of vision-only, IMU-only, and fused motion estimators trained on synthetic data, including ResNet-18 and FiLM fusion.
img: assets/projects/deep-vio-trajectories.gif
importance: 7
category: Robot Perception & Sensor Fusion
featured: true
github: https://github.com/Shakthi-Bala/Deep_vio
skills: Python · PyTorch · ResNet-18 · LSTM · FiLM · Blender · Gaussian Splatting
highlight: Compare sensor modalities, fusion strategies, and integrated trajectory error
media_alt: A sequence of saved DeepVO and FiLM trajectory-comparison plots from synthetic test sequences
media_width: 800
media_height: 600
portfolio: true
topics: [perception, learning]
featured_order: 4
featured_area: Learned state estimation
featured_summary: Vision-only, inertial, and fused motion estimators compared through prediction loss and integrated trajectory error.
---

A team comparison of learned visual, inertial, and fused odometry on synthetic data.

<link rel="stylesheet" href="{{ '/assets/css/research-content.css' | relative_url }}">

<section class="project-brief" aria-label="Project summary">
  <dl>
    <div><dt>Contribution &amp; credit</dt><dd>Team implementation of vision-only, IMU-only, and fused motion estimators, synthetic data generation, staged training, and trajectory evaluation. WPI RBE 549, Spring 2026, with Aditya Patwardhan and Bradley Kohler.</dd></div>
    <div><dt>Outcome &amp; conditions</dt><dd>The repository reports <strong>1.5 m ATE for ResNet-18 vision-only odometry</strong> and 3.5 m for two-stage FiLM fusion on its synthetic test data, even though FiLM has lower test loss.</dd></div>
    <div><dt>Engineering decision</dt><dd>Compared integrated trajectories as well as prediction loss. That comparison exposed a case where the better loss did not produce the better trajectory.</dd></div>
    <div><dt>Artifacts</dt><dd><a href="#project-demo">Evaluation plots</a> · <a href="https://github.com/Shakthi-Bala/Deep_vio">Code &amp; reproduction</a> · <a href="https://github.com/Shakthi-Bala/Deep_vio/blob/main/cv_p4ph2.pdf">Team course report</a></dd></div>
  </dl>
</section>

<span id="project-demo" class="research-anchor"></span>

{% include figure.liquid path="assets/projects/deep-vio-trajectories.gif" avoid_scaling=true loading="eager" alt="Saved trajectory plots for sequences 001, 005, and 009 comparing ground truth, ResNet visual odometry, and FiLM fusion variants" width="800" height="600" class="img-fluid rounded z-depth-1" %}

_Animated sequence of the repository's saved model-evaluation plots, not a live camera recording. Each frame shows a different synthetic sequence._

## The problem

Visual and inertial sensors have different failure modes, but combining them does not automatically yield better odometry. This project compares separate modalities, simple concatenation, and learned feature modulation while examining both prediction loss and accumulated trajectory error.

## What we built

- **Three modality baselines.** CNN visual odometry, LSTM inertial odometry, and concatenation-based visual-inertial estimation provide a starting comparison.
- **A stronger visual encoder.** ResNet-18 is adapted to paired, six-channel image input.
- **FiLM fusion.** A bidirectional LSTM encodes IMU measurements, with feature-wise modulation and soft gating connecting the inertial and visual streams.
- **Staged training.** Visual pretraining is followed by frozen-encoder fusion training and joint fine-tuning.
- **Synthetic data and evaluation.** Blender generation, IMU simulation, Gaussian-splat rendering, dataset quality checks, and integrated trajectory plots support the experiments.

This was a **WPI RBE 549 Spring 2026 group project** with Aditya Patwardhan and Bradley Kohler.

## Reported results

| Model                   | Test loss  | ATE (m) |
| ----------------------- | ---------- | ------- |
| DeepVO, CNN             | 0.3017     | 6.6     |
| DeepIO, LSTM            | 0.5430     | 10.6    |
| DeepVIO, concatenation  | 0.5129     | 17.1    |
| DeepVO, ResNet-18       | 0.0295     | **1.5** |
| DeepVIO, two-stage FiLM | **0.0237** | 3.5     |

These are the repository's reported synthetic-test results. FiLM has the lowest test loss, while the ResNet vision-only model has the lowest reported ATE. The distinction matters: improving the training objective does not necessarily improve the trajectory obtained by integrating relative poses.

## Evaluation scope

The study compares models on synthetic data and includes cross-trajectory evaluation code. It does not establish real-world navigation performance or a universal benefit from IMU fusion. Reproduction requires generating or obtaining the dataset and supplying the checkpoint paths expected by the evaluation scripts.

[Explore the training stages, evaluation code, and project report →](https://github.com/Shakthi-Bala/Deep_vio)
