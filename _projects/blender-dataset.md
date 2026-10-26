---
layout: page
title: Blender Synthetic Dataset Generator
description: Automated multi-camera rendering of randomized window targets with paired mask passes and projected corner annotations.
img: assets/projects/blender-dataset.gif
importance: 13
category: Synthetic Data & Computer Vision
featured: true
github: https://github.com/Shakthi-Bala/blender_dataset_generator
skills: Python · Blender · bpy · Synthetic Data · Camera Projection · Segmentation
highlight: Randomized scenes → RGB renders + masks + JSON corner annotations
media_alt: Saved Blender renders with projected corner annotations beside their paired mask passes across multiple cameras and scenes
media_width: 1200
media_height: 900
---

**Generate visual training data and geometric annotations together, with explicit control over the scene and cameras.**

[View code on GitHub](https://github.com/Shakthi-Bala/blender_dataset_generator) ·
[Inspect the generator](https://github.com/Shakthi-Bala/blender_dataset_generator/blob/main/Blender_dataset/blender_scripts/data_generator.py)

{% include figure.liquid path="assets/projects/blender-dataset.gif" avoid_scaling=true loading="eager" alt="Six saved Blender examples showing RGB renders with cyan projected plane-corner markers and their paired grayscale masks" width="1200" height="900" class="img-fluid rounded z-depth-1" %}

_Saved repository renders and paired masks across three cameras and two scene configurations. Cyan markers visualize the saved JSON corner coordinates, converted from bottom-origin to image coordinates. The mask pass omits the occluders visible in RGB._

## The problem

Collecting varied images and annotating target geometry by hand is slow. A procedural scene can vary object placement, camera pose, background, lighting, and distractors while exporting labels directly from its known geometry.

## What I built

- **Procedural scene assembly.** Creates textured window planes, a backdrop, lights, and cube occluders through Blender's Python API.
- **Controlled randomization.** Varies target count, position, rotation, scale, camera orbit and focal length, lighting, and background materials, with a fixed random seed in the main generator.
- **Multi-camera capture.** Renders each scene from three cameras; the committed example set contains 18 RGB images, 18 masks, and 18 JSON annotation records.
- **Separate render passes.** Uses synchronized RGB and mask geometry, toggling collections to export color images and grayscale mask passes.
- **Projected corner labels.** Projects four plane vertices into each camera and saves pixel coordinates alongside image names, resolution, camera identity, and object names.

## Inspectable outputs

| Artifact | Contents                                                                   |
| -------- | -------------------------------------------------------------------------- |
| RGB PNG  | Textured targets, backdrop, lighting, and optional distractors             |
| Mask PNG | Thresholded target texture rendered in a separate pass                     |
| JSON     | Camera identifier, resolution, and four projected corners per target plane |

The preview cycles scenes 1 and 3 across cameras 1–3. These are committed renders, rather than newly generated examples or segmentation-model predictions.

## Reproduction and scope

Run the scripts in Blender's Python environment after updating the target texture and output paths. The main generator targets Blender 4.x and exposes image count, resolution, seed, and camera count as script settings.

The current annotations have limits that matter for training: mask rendering hides RGB occluders, so the masks do not describe only the visible target pixels. Corner coordinates are clamped to the image bounds without a visibility flag, and the saved vertical coordinate uses a bottom-origin convention. Review these conventions before using the outputs as supervision. This project demonstrates data generation; it does not report downstream segmentation accuracy or real-world transfer performance.

[Explore scene randomization, saved samples, and annotations →](https://github.com/Shakthi-Bala/blender_dataset_generator)
