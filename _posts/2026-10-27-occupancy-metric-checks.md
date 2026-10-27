---
layout: post
title: Checking collision metrics against the logged trajectory
description: Three geometry and labeling issues that made an occupancy-based planning evaluation flag the logged human trajectory.
date: 2026-10-27
permalink: /notes/occupancy-metric-checks/
tags: perception evaluation world-models
categories: experiment-notes
related_posts: false
---

**Experiment note · Occupancy world-model evaluation**

An early version of the planning evaluator flagged the logged human trajectory as colliding on 1.9% of waypoints and off-road 12% of the time. Those rates prompted a closer look at how the checks mapped occupancy labels into violations.

A logged trajectory can contain real violations. Here, inspection exposed three problems in the evaluator itself.

## Missing ground labels became off-road events

Occ3D does not observe the ground directly under the ego vehicle. The initial check treated an absent road label as evidence that the vehicle had left the road.

The corrected check requires a positively labeled non-drivable surface: sidewalk, terrain, vegetation, or other-flat. Missing data remains missing data. That distinction matters before comparing two planners, since both would otherwise inherit the same mislabeled events.

## The body-height band included kerbs

The collision check looks for occupied voxels intersecting the vehicle's body band. Kerbs and sloped road extended into the lowest cells used by the first implementation.

Moving the lower boundary to 0.6 m, with the band ending at 1.8 m, changed what counted as a body collision. A collision metric depends on this geometry as well as on the trajectory.

## Stray labels appeared inside the ego box

About 2% of frames contained stray occupancy labels inside the ego vehicle's own box. Ignoring those ego cells removed another source of false collision events.

These corrections are recorded in the project's metric-fix commit. They change the evaluator, so planning comparisons need to use the corrected checks consistently.

## What was compared afterward

The planning study keeps the same 32 candidate trajectories per scene and changes their scoring cost. Under its occupancy-based checks, obstacle collisions fell from 0.660% for the imitation prior to 0.386% with world-model scoring.

{% include figure.liquid path="assets/projects/occupancy-planning-safety.png" avoid_scaling=true loading="lazy" alt="Saved planning comparison showing collision and off-road rates with bootstrap intervals under the corrected evaluator" class="img-fluid rounded" %}

_Saved planning comparison. See the repository for the rates, paired bootstrap results, and maneuver breakdown._

The inputs are ground-truth past occupancy, and the plans are evaluated on logged data. The voxel-based collision rates should be compared within this study. They use different observations and geometry from box-based rates reported elsewhere.

## Checks worth carrying forward

Before interpreting a planning score, inspect what the evaluator does with an unobserved cell, a sloped surface, and a label inside the ego footprint. Then look at the scene slices: the aggregate collision improvement in this study coexists with a worse agent-collision result on left turns.

The left-turn slice contains 180 scenes. The repository has not ruled out a real regression in agent collisions.

[Read the case study]({{ '/projects/occupancy-world-model/' | relative_url }}) · [Inspected evaluation record](https://github.com/Shakthi-Bala/4D_occupancy_world_model_for_autonomous_driving/blob/895aad57466af1048310e84860e924623ecbec1f/README.md#evaluation-details-that-matter) · [Metric-fix commit](https://github.com/Shakthi-Bala/4D_occupancy_world_model_for_autonomous_driving/commit/873e8b6)
