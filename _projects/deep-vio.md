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
---

**Learn motion from images and inertial measurements, then test whether fusion actually improves the resulting trajectory.**

[View code on GitHub](https://github.com/Shakthi-Bala/Deep_vio) ·
[Model implementations](https://github.com/Shakthi-Bala/Deep_vio/blob/main/Code/Phase%202/models_v2.py)

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
