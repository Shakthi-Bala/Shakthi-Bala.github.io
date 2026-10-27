---
layout: page
title: 4D Occupancy World Model
description: A trajectory-conditioned world model that forecasts 3D semantic occupancy and helps a planner reject unsafe candidate trajectories.
img: assets/projects/occupancy-planning.gif
importance: 3
category: Autonomous Driving & World Models
featured: true
github: https://github.com/Shakthi-Bala/4D_occupancy_world_model_for_autonomous_driving
skills: Python · PyTorch · Transformers · SE(2) Geometry · Occupancy Forecasting · Planning
highlight: 41.92 mIoU forecasting; 42% fewer obstacle collisions in open-loop planning
media_alt: Candidate driving trajectories colored by predicted collision risk, with the selected plan in blue
media_width: 816
media_height: 541
portfolio: true
topics: [perception, learning]
featured_order: 2
featured_area: World models & scene forecasting
featured_summary: Geometry-aware occupancy forecasting with trajectory-conditioned predictions and inspectable planning evaluations.
card_result: "41.92 mIoU; 42% fewer obstacle collisions in open-loop planning."
card_conditions: "Occ3D-nuScenes validation with ground-truth past occupancy; collision reduction versus the imitation prior on matched candidates."
---

A trajectory-conditioned model that forecasts 3D semantic occupancy from past occupancy grids.

<link rel="stylesheet" href="{{ '/assets/css/research-content.css' | relative_url }}">

<section class="project-brief" aria-label="Project summary">
  <dl>
    <div><dt>Contribution &amp; credit</dt><dd>Implemented the ego-warp baseline, residual occupancy forecaster, candidate-scoring planner, and evaluation tooling. The experiments use Occ3D-nuScenes labels and published evaluation conventions.</dd></div>
    <div><dt>Outcome &amp; conditions</dt><dd><strong>41.92 mIoU</strong>, averaged at 1, 2, and 3 seconds over 4,519 validation windows, using two seconds of ground-truth past occupancy. This evaluates forecasting with known occupancy input.</dd></div>
    <div><dt>Engineering decision</dt><dd>Gave the model explicit SE(2) warping instead of asking it to learn ego-motion geometry from scratch. Removing the warp reduced mIoU to 30.15 under the same 20-epoch schedule.</dd></div>
    <div><dt>Artifacts</dt><dd><a href="#project-demo">Forecast demo</a> · <a href="https://github.com/Shakthi-Bala/4D_occupancy_world_model_for_autonomous_driving">Code &amp; technical write-up</a> · <a href="https://github.com/Shakthi-Bala/4D_occupancy_world_model_for_autonomous_driving#reproducing">Reproduction</a> · <a href="{{ '/notes/occupancy-metric-checks/' | relative_url }}">Metric investigation</a></dd></div>
  </dl>
</section>

<span id="project-demo" class="research-anchor"></span>

{% include figure.liquid path="assets/projects/occupancy-forecast.gif" avoid_scaling=true loading="eager" alt="Three-second occupancy forecasts for validation scene 0797: ground truth, a static-world ego-warp baseline, and the learned world model" width="1692" height="360" class="img-fluid rounded z-depth-1" %}

_Recorded forecasts on Occ3D-nuScenes validation scene 0797. The white box marks the ego vehicle; the learned forecast keeps moving neighboring cars alongside it, while the static-world baseline leaves them behind._

## The problem

A driving planner needs to reason about where obstacles will be, rather than only where they are now. In an ego-centered occupancy grid, much of the apparent change comes from the car's own motion. Learning that rigid geometry from scratch wastes model capacity that could instead describe moving agents and newly visible regions.

## What I built

- **A geometry-first baseline.** Resampled current occupancy into future ego frames along each planned trajectory. This parameter-free ego-warp already reaches 33.74 mIoU on the validation set.
- **A residual world model.** A VAE compresses occupancy into BEV latents; SE(2) warping aligns the history, and a space-time transformer predicts corrections conditioned on the future trajectory. A full-resolution refinement head preserves static detail.
- **A candidate-scoring planner.** An imitation prior selects 32 trajectories from a 256-trajectory vocabulary. The world model rolls out occupancy for each candidate, and collision and off-road costs determine the selected plan.
- **Reproducible evaluation.** Saved metrics, paired bootstrap comparisons, ablations, GPU-rendered forecasts, and CPU tests for geometry, metrics, and collision checks accompany the training and evaluation scripts.

## Results at a glance

| Evaluation            | Measured outcome                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| Occupancy forecasting | **41.92 mIoU / 50.54 IoU**, averaged at 1, 2, and 3 seconds over 4,519 validation windows       |
| Geometry ablation     | Removing explicit warping reduces mIoU from **41.92 to 30.15** under the same 20-epoch schedule |
| Obstacle collisions   | **0.660% → 0.386%**, a 42% relative reduction versus the imitation prior alone                  |
| Off-road rate         | **0.074% → 0.022%**, a 70% relative reduction versus the imitation prior alone                  |
| Trajectory agreement  | L2 to the logged trajectory remains similar: **0.734 m → 0.736 m**                              |

Forecasting uses two seconds of ground-truth past occupancy to predict three seconds ahead. Planning comparisons use the same 32 candidates per scene; only the safety cost changes. Rates follow the repository's occupancy-based collision checks and ST-P3-style time averaging.

{% include figure.liquid path="assets/projects/occupancy-planning-safety.png" avoid_scaling=true loading="lazy" alt="Obstacle collision, agent collision, and off-road rates for the planning baselines, with 95 percent bootstrap confidence intervals" width="1760" height="416" class="img-fluid rounded" %}

[Inspect the forecast metrics](https://github.com/Shakthi-Bala/4D_occupancy_world_model_for_autonomous_driving/blob/main/results/forecast_ours.json) ·
[Inspect the paired planning comparisons](https://github.com/Shakthi-Bala/4D_occupancy_world_model_for_autonomous_driving/blob/main/results/planning_bootstrap.json)

## Does the prediction follow the plan?

{% include figure.liquid path="assets/projects/occupancy-whatif.gif" avoid_scaling=true loading="lazy" alt="The same occupancy history forecast under the logged trajectory, hard braking, and a lane change" width="1692" height="360" class="img-fluid rounded" %}

_Same history, three future ego trajectories. Under hard braking, neighboring cars pull ahead; a lane change changes their positions relative to the ego vehicle._

## A metric failure I investigated

[Experiment note: checking collision metrics against the logged trajectory]({{ '/notes/occupancy-metric-checks/' | relative_url }})

Early planning metrics incorrectly flagged the logged human trajectory as colliding and driving off-road. The checks treated unobserved ground beneath the ego as off-road, included kerbs in the vehicle body band, and counted stray labels inside the ego box. Requiring positive off-road evidence, adjusting the body-height band, and ignoring those ego cells corrected the evaluation before comparing planners.

## Evaluation scope

This is **open-loop evaluation on logged data with ground-truth past occupancy**, not a camera-to-control system or a closed-loop driving demonstration. Collision checks use occupancy voxels rather than annotated boxes, so the rates should be compared within this study. The agent-collision reduction is not statistically significant, and the left-turn slice shows a regression that remains unresolved. A full planning step takes about 0.5 seconds on one L40S without optimization.

[Explore the architecture, limitations, and reproduction commands →](https://github.com/Shakthi-Bala/4D_occupancy_world_model_for_autonomous_driving)
