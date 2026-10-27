---
layout: page
title: Classical Panorama Stitching
description: A feature-based panorama pipeline that detects and distributes corners, matches descriptors, estimates robust homographies, and blends overlapping images.
img: assets/projects/classical-panorama.gif
importance: 12
category: Computer Vision & Image Stitching
featured: false
github: https://github.com/Shakthi-Bala/Traditional_panaroma
skills: Python · NumPy · OpenCV · ANMS · Feature Matching · RANSAC · Image Warping
highlight: Corners → robust correspondences → aligned and blended panoramas
media_alt: A sequence of repository input images, corner detections, ANMS features, RANSAC matches, and a stitched panorama
media_width: 800
media_height: 600
portfolio: true
topics: [vision]
---

**Build an image-stitching pipeline from local features and projective geometry, with intermediate outputs that explain the final panorama.**

[View code on GitHub](https://github.com/Shakthi-Bala/Traditional_panaroma) ·
[Inspect saved panoramas](https://github.com/Shakthi-Bala/Traditional_panaroma/tree/main/YourDirectoryID_p1/Phase1/report_outputs/panaroma)

{% include figure.liquid path="assets/projects/classical-panorama.gif" avoid_scaling=true loading="eager" alt="A slideshow of saved panorama-project inputs and intermediate outputs, ending with the stitched training-set panorama" width="800" height="600" class="img-fluid rounded z-depth-1" %}

_Animated sequence of an input view and selected saved pipeline outputs: corner detections, ANMS, RANSAC correspondences, and the training-set-1 panorama. It is a figure sequence, not a recording of a new stitching run._

## The problem

Overlapping photographs do not align automatically. Features need to cover the image rather than cluster in one textured region, mismatches must be rejected, and warped views need a common canvas and a blending strategy.

## Implementation

- **Corner detection and ANMS.** Detects candidate corners and applies adaptive non-maximal suppression to distribute selected features spatially.
- **Patch descriptors.** Extracts and normalizes local appearance patches into compact 8×8 descriptors.
- **Correspondence filtering.** Uses nearest-neighbor descriptor comparisons and a ratio test before robust geometric estimation.
- **RANSAC homographies.** Samples candidate mappings, scores reprojection consistency, and rejects image pairs with insufficient support.
- **Warping and blending.** Accumulates homographies into a reference frame, computes panorama bounds, warps images into a shared canvas, and uses distance-transform feathering to soften seams.

The project extends the WPI **MyAutoPano** course starter, retaining its attribution. The repository includes training, test, and custom image sets alongside saved correspondence and panorama results.

## What the outputs make inspectable

Corner and ANMS images reveal feature coverage; correspondence figures reveal mismatch rejection; final panoramas reveal geometric alignment and seam quality. Keeping those stages separate makes it easier to locate a failure than judging only the final mosaic.

## Reproduction and scope

Update the input and output paths in the wrapper before running it. A homography is appropriate for approximately planar scenes or suitable camera rotation; strong parallax and moving objects can still produce misalignment or ghosting. The saved panoramas are qualitative examples, without a claimed quantitative benchmark.

[Explore the full pipeline and saved training, test, and custom panoramas →](https://github.com/Shakthi-Bala/Traditional_panaroma)
