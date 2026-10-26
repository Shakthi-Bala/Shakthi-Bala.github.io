---
layout: page
title: Neural Radiance Fields
description: A PyTorch NeRF implementation for learning scene appearance from posed images and rendering novel viewpoints.
img: assets/projects/nerf-lego.gif
importance: 9
category: Neural Rendering & 3D Reconstruction
featured: true
github: https://github.com/Shakthi-Bala/NERF
skills: Python · PyTorch · NeRF · Positional Encoding · Volume Rendering · Camera Rays
highlight: Posed images → a learned radiance field → novel-view renders
media_alt: A novel-view rendering animation of the Lego scene from the project repository
media_width: 480
media_height: 480
---

**Represent a scene as a learned function of position and viewing direction, then render it from new camera poses.**

[View code on GitHub](https://github.com/Shakthi-Bala/NERF) ·
[Training and volume-rendering implementation](https://github.com/Shakthi-Bala/NERF/blob/main/Phase2/Wrapper.py)

{% include figure.liquid path="assets/projects/nerf-lego.gif" avoid_scaling=true loading="eager" alt="A camera orbit around the Lego scene rendered by the repository's NeRF model" width="480" height="480" class="img-fluid rounded z-depth-1" %}

_Recorded Lego rendering animation from the repository, resized and sampled at every second frame for a smaller web preview. The total playback duration is preserved._

## The problem

A collection of photographs records a scene only from particular viewpoints. NeRF learns a continuous representation that can synthesize other views, but doing so requires correct camera rays, a useful input representation, and a differentiable rendering model.

## Implementation

- **Camera-ray geometry.** Loads posed images and camera transforms, derives focal length from field of view, and transforms camera rays into world coordinates.
- **A radiance-field MLP.** Encodes positions and view directions with sinusoidal features, uses a skip connection in the position network, and predicts density and view-dependent RGB.
- **Differentiable volume rendering.** Samples points along rays and composites their colors using density-derived opacity and transmittance, including a white background.
- **Training and recovery.** Supports ray minibatches, validation renders, checkpoint saving, and resuming interrupted training.
- **Evaluation and ablations.** Renders test views, exports per-frame images and video, records PSNR and a global-statistics SSIM implementation, and supports positional-encoding ablations.

## Experiments and artifacts

The repository includes render animations for Lego, Ship, and two custom datasets, alongside a project report. Training and rendering commands expose the ray batch size, samples per ray, checkpoint selection, and positional-encoding mode so those choices can be varied explicitly.

## Evaluation scope

The animation illustrates a saved rendering result; it is not a quantitative benchmark. PSNR and SSIM reporting code is included, but no new scores are claimed here. Reproduction requires the posed-image dataset and compatible trained checkpoints, and the training implementation expects CUDA.

[Explore the rendering examples, report, and reproduction guide →](https://github.com/Shakthi-Bala/NERF)
