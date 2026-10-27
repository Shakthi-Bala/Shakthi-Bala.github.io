---
layout: page
title: Navigation Through Unknown Gaps
description: Optical-flow estimation, low-motion contour detection, and navigation components for unknown gaps.
img: assets/projects/gap-navigation-rgb.gif
importance: 6
category: Aerial Robotics & Perception
featured: true
github: https://github.com/Shakthi-Bala/Navigating_through_unknown-Vizflyt
skills: Python · PyTorch · RAFT · OpenCV · Trajectory Planning · Gaussian Splatting
highlight: Optical flow → gap localization → waypoint alignment and traversal
media_alt: Rendered RGB navigation through an irregular opening, alongside optical-flow detections
media_width: 480
media_height: 360
portfolio: true
topics: [perception]
featured_order: 5
featured_area: Perception & navigation
card_stack: "Python · RAFT · OpenCV"
featured_summary: Optical-flow gap localization connected to waypoint navigation in rendered scenes.
card_result: "A rendered run shows passage through an irregular opening."
card_conditions: "One 34-second RGB/flow recording; an aggregate flight-success rate is not reported."
---

A rendered navigation pipeline using optical flow to locate candidate openings.

<link rel="stylesheet" href="{{ '/assets/css/research-content.css' | relative_url }}">

<section class="project-brief" aria-label="Project summary">
  <dl>
    <div><dt>Contribution &amp; credit</dt><dd>Connected pretrained RAFT flow estimation, OpenCV gap localization, waypoint alignment, and rendered experiments. RAFT and its weights are external dependencies; the project code handles the perception-to-motion handoff.</dd></div>
    <div><dt>Outcome &amp; conditions</dt><dd>The supplied <strong>34-second RGB/flow recording</strong> shows an approach to and passage through an irregular opening in a rendered scene. This is one recorded run; an aggregate flight-success rate is not reported.</dd></div>
    <div><dt>Engineering decision</dt><dd>Processed frames in a worker thread so waypoint motion could continue while optical flow was being computed.</dd></div>
    <div><dt>Artifacts</dt><dd><a href="#project-demo">RGB/flow recording</a> · <a href="https://github.com/Shakthi-Bala/Navigating_through_unknown-Vizflyt">Code</a> · <a href="https://github.com/Shakthi-Bala/Navigating_through_unknown-Vizflyt#steps-to-run-the-code">Setup &amp; reproduction</a></dd></div>
  </dl>
</section>

<figure class="system-diagram" aria-labelledby="system-diagram-title">
  <figcaption id="system-diagram-title"><span>System overview</span><strong>Gap navigation · perception running alongside motion</strong></figcaption>
  <ol class="system-diagram-flow">
    <li><span class="system-stage-label">Rendered input</span><strong>Consecutive scene images</strong><p>Frames from the rendered navigation setup</p></li>
    <li><span class="system-stage-label">Worker thread</span><strong>Pretrained RAFT → OpenCV</strong><p>Optical flow, low-motion contours, and candidate centroid</p></li>
    <li><span class="system-stage-label">Motion handoff</span><strong>Image-center offset → alignment</strong><p>Waypoint motion continues while perception computes the next update</p></li>
    <li><span class="system-stage-label">Navigation command</span><strong>Align, then move forward</strong><p>Updated frames provide the next perception cycle</p></li>
  </ol>
  <p class="system-diagram-note">Arrows show the perception-to-motion handoff. The recording below shows one rendered navigation run; it does not measure success across repeated trials.</p>
</figure>

<span id="project-demo" class="research-anchor"></span>

<article aria-label="RGB navigation GIF preview">
  <img src="{{ '/assets/projects/covers/gap-navigation-rgb.webp' | relative_url }}" data-preview-poster="{{ '/assets/projects/covers/gap-navigation-rgb.webp' | relative_url }}" data-preview-source="{{ '/assets/projects/gap-navigation-rgb.gif' | relative_url }}" alt="Rendered first-person view approaching and passing through an irregular opening, with optical-flow detections on the right" width="480" height="360" loading="lazy" style="display:block;width:100%;height:auto;">
  <button type="button" class="card-preview-toggle" data-preview-toggle aria-pressed="false" aria-label="Play GIF preview: Navigation Through Unknown Gaps" hidden>Play GIF preview</button>
</article>

_The supplied RGB/flow recording, converted to a looping GIF at 6 fps with the original playback speed. The first-person view is on the left; the optical-flow panel on the right begins displaying detections partway through the run. This is a rendered scene, not a physical-drone flight._

[Download the GIF]({{ '/assets/projects/gap-navigation-rgb.gif' | relative_url }}) · [Open the video]({{ '/assets/video/gap-navigation-rgb.mp4' | relative_url }})

<details>
  <summary>Watch the recording with playback controls</summary>
  <video controls playsinline preload="metadata" width="1280" height="960" poster="{{ '/assets/projects/covers/gap-navigation-rgb.webp' | relative_url }}" aria-label="RGB and optical-flow recording of navigation through an irregular opening in a rendered scene" style="display:block;width:100%;height:auto;margin-top:1rem;">
    <source src="{{ '/assets/video/gap-navigation-rgb.mp4' | relative_url }}" type="video/mp4">
    <a href="{{ '/assets/video/gap-navigation-rgb.mp4' | relative_url }}">Open the navigation recording</a>.
  </video>
</details>

[Inspect the detector code and earlier saved flow outputs](https://github.com/Shakthi-Bala/Navigating_through_unknown-Vizflyt/tree/f6eff9e0db7d5eb263017628dbd88ef338340bf8/output/gap_detector)

## The problem

An opening's shape is not always known before a drone approaches it. The perception system must locate a usable gap from images, while the control system must turn that image-space target into a motion command. Keeping rendering, flow estimation, and control connected makes it possible to investigate that handoff.

## Implementation

- **Optical-flow perception.** Uses pretrained RAFT to estimate motion between frames, then OpenCV processing to identify contours and a candidate opening center.
- **Perception during motion.** A threaded frame-processing path estimates the opening while waypoint motion continues, rather than requiring every control step to wait for inference.
- **Waypoint alignment.** Converts the detected image-center offset into a lateral correction before a forward traversal command.
- **Planning and control modules.** Includes B-spline trajectory generation with velocity and acceleration profiles, quadrotor dynamics, and PID-based control components.
- **Rendered experiments.** Blender scene assets and a Gaussian-splat renderer support perception experiments without requiring a physical flight for every iteration.

## Engineering decisions

| Choice                                                   | Purpose                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------- |
| Use visual motion to locate a candidate opening          | Avoid relying on a predefined opening outline                  |
| Process frames in a worker thread                        | Keep perception and motion execution separate                  |
| Separate trajectory generation from dynamics and control | Make each stage easier to inspect and replace                  |
| Retain rendering and logging hooks                       | Support visual inspection of the perception-to-motion pipeline |

## Planner output

{% include figure.liquid path="assets/projects/gap-navigation-planner.gif" avoid_scaling=true loading="eager" alt="The repository's B-spline planning module evaluated on illustrative waypoints, with the current trajectory sample highlighted" width="800" height="600" class="img-fluid rounded z-depth-1" %}

_Planner visualization made by running the repository's B-spline module on illustrative waypoints. It is not a recording of a drone detecting or flying through a gap._

## Reproduction and scope

The repository requires external RAFT code and weights, scene assets, and updates to machine-specific paths. The RGB/flow recording shows one rendered navigation run, and the planner illustration shows the planning module in isolation. A single recording does not establish an aggregate success rate, collision avoidance, or robustness across unseen gaps. RAFT is a pretrained external dependency, not a model trained as part of this project.

[Explore the scene setup, perception code, and control modules →](https://github.com/Shakthi-Bala/Navigating_through_unknown-Vizflyt)

<script src="{{ "/assets/js/project-previews.js" | relative_url }}" defer></script>
