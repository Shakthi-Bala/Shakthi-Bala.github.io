---
layout: page
title: UR16e Vision, MoveIt & Gripper Integration
description: A ROS 1 manipulation integration connecting object-location interfaces, pick/place action goals, MoveIt execution, and a service-driven gripper.
img: assets/projects/ur16e-vision-gripper.svg
importance: 18
category: Robot Manipulation & Systems Integration
featured: true
github: https://github.com/Shakthi-Bala/UR_robot_integration_with_vision_and_gripper-using-movit
skills: Python · ROS 1 · MoveIt · actionlib · UR16e · RViz · rosserial
highlight: Object poses → pick/place goals → arm motion + gripper commands
media_alt: ROS manipulation architecture connecting object poses, action goals, MoveIt planning, and gripper commands
media_width: 1200
media_height: 900
---

**Connect perception interfaces, motion planning, and gripper control through an explicit ROS manipulation workflow.**

[View code on GitHub](https://github.com/Shakthi-Bala/UR_robot_integration_with_vision_and_gripper-using-movit) · [Inspect the manipulation server](https://github.com/Shakthi-Bala/UR_robot_integration_with_vision_and_gripper-using-movit/blob/main/final_pkg/scripts/Try.py)

{% include figure.liquid path="assets/projects/ur16e-vision-gripper.svg" avoid_scaling=true loading="eager" alt="ROS manipulation architecture connecting object poses, action goals, MoveIt planning, and gripper commands" width="1200" height="900" class="img-fluid rounded z-depth-1" %}

_Architecture illustration based on the repository's ROS clients, action server, MoveIt calls, and gripper service. It is not a robot-execution recording._

## The problem

A pick-and-place command crosses several interfaces: object coordinates, task sequencing, motion planning, execution status, and tool actuation. This project assembles those interfaces around a Universal Robots arm rather than treating each as a separate demonstration.

## Implementation

- **Task-level action goals.** Uses `actionlib` clients and servers to pass start and destination points and report success or failure.
- **Staged manipulation.** Plans approach, descent, transfer, and placement poses through MoveIt's `MoveGroupCommander` interface.
- **Gripper coordination.** Wraps a Boolean gripper service and publishes gripper setpoints, with a launch file that brings up a serial bridge.
- **Execution checks.** Handles empty plans, failed execution, exceptions, and preemption checks, and publishes tool poses for inspection.
- **Perception-facing interfaces.** Includes clients for an external object-location/deprojection service and point-based goals, alongside hardcoded demonstration positions.
- **Robot bring-up documentation.** Describes the official UR driver, MoveIt, RViz, and robot-specific calibration configuration.

## Interfaces at a glance

| Boundary                | Representation                               |
| ----------------------- | -------------------------------------------- |
| Perception to task      | Object positions and `PointStamped` values   |
| Task to manipulation    | Custom pick/place action goals               |
| Server to planner       | Stamped pose targets in the robot base frame |
| Manipulation to gripper | Boolean service requests and topic setpoints |

## Reproduction and scope

This is a ROS 1/catkin integration, with ROS Melodic/Noetic-era dependencies. The public checkout depends on external UR packages, custom action messages, and a deprojection service; it is not a self-contained robot workspace. The launched example client uses fixed object locations, while vision-connected variants are retained separately. The repository contains no execution video or measured task-success benchmark, so this page documents the integration without claiming verified physical pick-and-place performance.

[Explore the launch wiring, clients, and manipulation sequence →](https://github.com/Shakthi-Bala/UR_robot_integration_with_vision_and_gripper-using-movit)
