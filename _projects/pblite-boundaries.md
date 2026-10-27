---
layout: page
title: Pb-lite Boundary Detection
description: A classical boundary-detection pipeline combining texture, brightness, and color gradients with Canny and Sobel responses, alongside a CIFAR-10 architecture study.
img: assets/projects/pblite-boundaries.png
importance: 21
category: Computer Vision & Image Understanding
featured: true
github: https://github.com/Shakthi-Bala/Pblite_boundary_detection
skills: Python · OpenCV · NumPy · K-Means · Filter Banks · PyTorch
highlight: Filter responses → textons → histogram gradients → boundary maps
media_alt: Saved Canny, Sobel, and Pb-lite boundary comparisons for airplane, butterfly, and duck images from the project report
media_width: 1200
media_height: 900
---

**Look beyond intensity edges by measuring how texture, brightness, and color change across a potential boundary.**

[View code on GitHub](https://github.com/Shakthi-Bala/Pblite_boundary_detection) · [Read the project report](https://github.com/Shakthi-Bala/Pblite_boundary_detection/blob/main/Report.pdf)

{% include figure.liquid path="assets/projects/pblite-boundaries.png" avoid_scaling=true loading="eager" alt="Saved report comparisons showing Canny, Sobel, and Pb-lite boundaries for airplane, butterfly, and duck examples" width="1200" height="900" class="img-fluid rounded z-depth-1" %}

_Selected comparisons from Figure 8 of the project report, arranged for readability. These are saved experimental outputs, rather than a new boundary-detection run._

## The problem

Intensity-based edges do not capture every meaningful change in an image. Texture and color may distinguish neighboring regions even when their brightness is similar. This project implements a Pb-lite pipeline that combines those cues and compares the resulting boundaries with Canny and Sobel outputs.

## Implementation

- **Multiscale filter banks.** Constructs oriented derivative-of-Gaussian, Leung–Malik, and Gabor filters. The main texton pipeline combines 32 DoG, 48 LM Small, and 40 Gabor filters; LM Large is generated separately for inspection.
- **Discrete feature maps.** Clusters filter responses into 64 texton labels, grayscale intensity into 16 brightness labels, and Lab color into 16 color labels using K-means.
- **Oriented neighborhood comparisons.** Generates half-disk pairs at three radii and eight orientations, then computes chi-square histogram differences across each pair.
- **Cue fusion.** Takes the maximum response across the neighborhood comparisons for each cue and combines the feature gradients with an equally weighted Canny/Sobel baseline.
- **Intermediate visualization.** Saves filter banks, feature maps, gradient maps, and final boundaries so the stages can be inspected individually.

The implementation extends the **WPI RBE/CS549 Alohomora homework starter**, which retains attribution to its instructors and the University of Maryland CMSC733 material.

## What the comparison reveals

The report presents ten boundary-detection examples. Pb-lite retains intricate structure in some images, but the report also identifies additional texture and background noise, including cases where the object becomes less distinct. The selected preview preserves both the object contours and the extra responses rather than implying that more edges always mean a better boundary estimate.

These are qualitative comparisons. No new boundary precision, recall, or dataset-wide ranking is claimed.

## A separate classification study

The repository's second phase implements a baseline CNN, ResNet-20/56, ResNeXt, and DenseNet variants in PyTorch for CIFAR-10 classification. Training and evaluation utilities include augmentation, AdamW, learning-rate scheduling, checkpoint handling, TensorBoard logging, and confusion matrices.

The report records **89.26% CIFAR-10 test accuracy for DenseNet-BC-100** under its reported training setup. This is a report-sourced result from the classification phase, not a boundary-detection score or a newly reproduced benchmark. Saved training curves and architecture figures accompany the code.

## Reproduction and scope

The boundary wrapper expects external BSDS500 images and uses absolute input/output paths that must be updated. Its fusion stage reads the saved, color-mapped gradient PNGs back as grayscale, a detail to preserve when reproducing the current implementation. The classifier requires external CIFAR-10 images, label files, and checkpoints; its `Network.Network` imports also need to match the local module layout.

The preview uses the report's existing results. This page does not claim that either phase has been retrained or rerun on an independent dataset.

[Explore the filter construction, cue fusion, and classification experiments →](https://github.com/Shakthi-Bala/Pblite_boundary_detection)
