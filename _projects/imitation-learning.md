---
layout: page
title: Imitation Learning from 2D to a Robot Arm
description: Action-chunking policies for Push-T, zero-shot transfer to a simulated UR5e, and PPO fine-tuning that reduces clear failures.
img: assets/projects/imitation-ur5e.gif
importance: 5
category: Robot Learning & Manipulation
featured: true
github: https://github.com/Shakthi-Bala/imitation_learning_agent
skills: Python · PyTorch · Flow Matching · Action Chunking · PPO · MuJoCo · Inverse Kinematics
highlight: 2D-to-UR5e transfer; PPO reduces clear failures from 11.4% to 6.4%
media_alt: A simulated UR5e arm executing a flow-matching policy trained only on 2D Push-T demonstrations
media_width: 800
media_height: 343
portfolio: true
topics: [learning, manipulation]
featured_order: 3
featured_area: Robot learning & manipulation
featured_summary: Action-chunking policies transferred from 2D demonstrations to a simulated UR5e, with paired fine-tuning evaluations.
---

**Learn to push from human demonstrations, transfer the policy to a simulated robot arm, and improve it with reward feedback.**

[View code on GitHub](https://github.com/Shakthi-Bala/imitation_learning_agent) ·
[UR5e experiments and report](https://github.com/Shakthi-Bala/imitation_learning_agent/blob/main/ur_pusht/report/ur_pusht_report.md)

{% include figure.liquid path="assets/projects/imitation-ur5e.gif" avoid_scaling=true loading="eager" alt="A UR5e arm pushes a T-shaped block toward the green goal with a policy trained on 2D data; the right panel shows a top view and the policy target" width="800" height="343" class="img-fluid rounded z-depth-1" %}

_Recorded MuJoCo rollout of the 2D-trained flow policy running zero-shot on a UR5e. The right panel hides the arm to show the block and the policy's current target. This is a simulation, not a physical-robot deployment._

## The problem

Human demonstrations often contain several valid ways to solve the same manipulation task. A regression policy can average those choices into an ineffective action. Transferring a learned policy to an arm adds another challenge: the controller must track the policy while contact and friction change the block's behavior.

## What I built

- **Two action-chunking policies.** An MSE policy predicts eight actions directly; a flow-matching policy generates the same chunk with ten Euler integration steps. Both use a three-hidden-layer MLP and the same training budget on 206 human demonstrations.
- **A UR5e Push-T environment.** Built a MuJoCo task with table friction, matching the 2D benchmark's start states and success test. Damped least-squares inverse kinematics, gravity compensation, and velocity feed-forward keep mean stick-tip tracking error within 0.3 mm.
- **Zero-shot policy transfer.** Kept the five-number state and eight-action interface consistent so the 2D-trained policies could control the arm without robot training data.
- **Self-improvement and RL experiments.** Compared retraining on successful robot rollouts with PPO fine-tuning over the flow policy's noisy denoising steps, retaining failed approaches and evaluating final policies on matched start states.

The 2D implementation extends the **Berkeley CS185/285 Spring 2026 imitation-learning assignment**; its data loading, environment, and evaluation scaffold come from the course starter. The UR5e environment and transfer experiments form the second part of the project.

## Results at a glance

| Evaluation                          | Measured outcome                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| 2D Push-T, 100 test episodes        | Mean goal-coverage reward improves from **0.629 with MSE to 0.817 with flow matching**     |
| 2D clear failures, reward below 0.3 | **22/100 with MSE → 8/100 with flow matching**                                             |
| Zero-shot UR5e transfer             | Flow matching reaches **0.79–0.82 mean reward** across four evaluations of the same policy |
| PPO, same 500 start states          | Mean reward rises from **0.797 to 0.854**                                                  |
| PPO clear failures                  | **11.4% → 6.4%**, a five-percentage-point reduction                                        |

Reward measures how much of the goal the block covers; 1.0 is perfect. The paired bootstrap interval for PPO's mean reward gain is **+0.032 to +0.082** at 95% confidence. Fully solved episodes change from 14.8% to 16.0%, which is not a measurable improvement in solve rate.

## What helped, and what did not

Retraining from scratch on the robot's successful episodes narrowed the data toward starts the policy already solved, reducing reward relative to a human-only control. Fine-tuning on those successes held roughly level. PPO instead uses reward feedback to distinguish better and worse action chunks.

The PPO clip range mattered: 0.01 blocked roughly 40–60% of denoising-step updates and learning stalled; 0.1 allowed the policy to improve. Advantage-weighted regression made performance worse.

{% include figure.liquid path="assets/projects/imitation-ppo-comparison.gif" avoid_scaling=true loading="lazy" alt="The same UR5e Push-T start state before and after PPO: the zero-shot policy pushes away from the goal, while the fine-tuned policy pushes onto it" width="600" height="225" class="img-fluid rounded" %}

_Illustrative before-and-after rollout from start seed 105. Aggregate results come from the same 500 evaluation starts for both policies._

{% include figure.liquid path="assets/projects/imitation-rl-results.png" avoid_scaling=true loading="lazy" alt="RL fine-tuning learning curves and paired changes in reward and clear failures, with 95 percent confidence intervals" width="2600" height="880" class="img-fluid rounded" %}

## Evaluation scope

This is state-based manipulation in simulation. The transfer preserves task coordinates and does not establish camera-based or physical-robot generalization. Contact-rich rollouts vary slightly across CPU types, so final comparisons use matched seeds on the same node. PPO mainly reduces clear failures; it does not establish a higher rate of fully solved episodes.

[Explore the models, reports, videos, and reproduction commands →](https://github.com/Shakthi-Bala/imitation_learning_agent)
