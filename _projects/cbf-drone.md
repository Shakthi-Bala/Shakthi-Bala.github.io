---
layout: page
title: Quadrotor Control with Collision-Cone Barrier Functions
description: A velocity-level safety filter layered over a nonlinear quadrotor controller, with sphere and cylinder scenarios in Isaac Sim and Pegasus.
img: assets/projects/cbf-drone.gif
importance: 15
category: Aerial Robotics & Safety-Aware Control
featured: false
github: https://github.com/Shakthi-Bala/CBF_for_full_drone_dynamics
skills: Python · CVXPY · OSQP · Geometric Control · Isaac Sim · Pegasus
highlight: Nominal velocity → constrained QP → nonlinear flight control
media_alt: Saved CBF quadrotor trajectory and obstacle-distance figures for a two-cylinder simulation
media_width: 1200
media_height: 900
portfolio: true
topics: [other-robotics]
---

**Explore how a collision-cone filter changes a quadrotor's motion while retaining a nonlinear tracking controller.**

[View code on GitHub](https://github.com/Shakthi-Bala/CBF_for_full_drone_dynamics) · [Read the technical report](https://github.com/Shakthi-Bala/CBF_for_full_drone_dynamics/blob/main/Control_advanced_track_report.pdf)

{% include figure.liquid path="assets/projects/cbf-drone.gif" avoid_scaling=true loading="eager" alt="Saved CBF quadrotor trajectory and obstacle-distance figures for a two-cylinder simulation" width="1200" height="900" class="img-fluid rounded z-depth-1" %}

_Saved top-down and obstacle-distance figures from the repository's two-cylinder CBF scenario. These are simulation results, with the original axes and legends preserved._

## The problem

Tracking an aggressive reference can bring a quadrotor close to obstacles. This project investigates a separate velocity-level constraint layer that modifies the requested motion before a nonlinear controller tracks it, without introducing a global replanner.

## Implementation

- **Nonlinear flight control.** Builds on the Pegasus geometric-controller example, with position, velocity, attitude, and angular-rate feedback and trajectory or waypoint references.
- **Collision-cone constraints.** Implements spherical obstacle constraints and an XY projection for vertically bounded cylinders, accounting for vehicle radius and a configurable margin.
- **Quadratic-program filtering.** Uses CVXPY and OSQP to minimize deviation from the nominal velocity subject to barrier inequalities and component-wise velocity bounds.
- **Controller integration.** The CBF-enabled variant in `scripts/backup_nonlinear_controller.py` integrates the filtered velocity into a position reference; the current `nonlinear_controller.py` is explicitly the baseline variant.
- **Inspectable experiments.** Includes baseline and CBF figures for trajectories, tracking errors, velocity, attitude, and obstacle clearance, plus a close-obstacle edge case.

## What the evidence shows

The saved plots make the tradeoff between tracking a nominal reference and changing motion near an obstacle visible. The repository retains multiple sphere and cylinder scenarios rather than only a single illustration. The baseline controller credits the original Pegasus authors, Marcelo Jacinto and Joao Pinto; this project adds the barrier-function experiments and comparison tooling.

## Reproduction and scope

The experiments require Isaac Sim and Pegasus, with the appropriate controller variant and scenario selected explicitly. The launch script imports `nonlinear_controller`, so choosing the CBF implementation is a necessary reproduction step.

The filter operates at the velocity-reference level; it is not a full-dynamics safety certificate. Obstacles are manually specified, and the implementation falls back to a speed-limited nominal command if the QP fails or has no solution. These limits, together with the recorded close-obstacle case, mean the examples should not be read as unconditional collision-avoidance guarantees. No new simulation or aggregate benchmark is claimed here.

[Inspect the barrier constraints and saved scenarios →](https://github.com/Shakthi-Bala/CBF_for_full_drone_dynamics)
