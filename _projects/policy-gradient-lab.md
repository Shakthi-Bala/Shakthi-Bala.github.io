---
layout: page
title: Policy Gradient Lab
description: REINFORCE, learned value baselines, and generalized advantage estimation evaluated across four control environments with saved experiment evidence.
img: assets/projects/policy-gradient-cheetah.gif
importance: 4
category: Reinforcement Learning & Control
featured: true
github: https://github.com/Shakthi-Bala/policy_gradient_lab
skills: Python · PyTorch · REINFORCE · GAE · Gym · MuJoCo · Experiment Design
highlight: 24 training runs across four control environments, with fresh-episode evaluations
media_alt: A frozen HalfCheetah policy controlling the simulated robot after policy-gradient training
media_width: 480
media_height: 360
---

**Implement policy-gradient learning, then measure how return estimators, baselines, and advantage estimation affect control.**

[View code on GitHub](https://github.com/Shakthi-Bala/policy_gradient_lab) ·
[Full results and experiment commands](https://github.com/Shakthi-Bala/policy_gradient_lab/blob/main/docs/RESULTS.md)

{% include figure.liquid path="assets/projects/policy-gradient-cheetah.gif" avoid_scaling=true loading="eager" alt="A trained HalfCheetah controller from the unnormalized value-baseline experiment using the original PyTorch action sampler" width="480" height="360" class="img-fluid rounded z-depth-1" %}

_Short preview of a frozen final HalfCheetah policy using the original PyTorch sampler and an unnormalized value baseline. This is one rollout; aggregate performance comes from separate fresh-episode evaluation._

[Watch the full episode](https://github.com/Shakthi-Bala/policy_gradient_lab/blob/main/media/cheetah_reference_demo.mp4)

## The problem

Policy gradients are straightforward to write down, but noisy returns, critic fitting, and rollout budgets make their practical behavior harder to understand. A peak evaluation can hide an unstable controller. This project compares the implementation choices using retained training records and fresh evaluations of final checkpoints.

## What I built

- **Policy-gradient algorithms.** Implemented REINFORCE with trajectory returns and reward-to-go, categorical and diagonal Gaussian MLP policies, learned value baselines, advantage normalization, and generalized advantage estimation.
- **An experiment runner.** Executed 24 training runs across CartPole, HalfCheetah, LunarLander, and InvertedPendulum, preserving flags, metrics, model parameters, source provenance, and unsuccessful configurations.
- **Efficient CPU rollouts.** Added a tested NumPy inference path and removed decorative exhaust accumulation from headless LunarLander while preserving simulator behavior.
- **Numerical and simulator checks.** Added 16 tests covering return arithmetic, GAE boundaries, probability gradients, value regression, rollout budgets, inference equivalence, and simulator equivalence.

The project extends the **Berkeley CS285 Spring 2026 policy-gradient assignment starter**. [Source attribution and protocol](https://github.com/Shakthi-Bala/policy_gradient_lab/blob/main/docs/PROVENANCE.md) distinguish the course scaffold from the algorithm implementations, tooling, and experiments.

## Results at a glance

Each selected final checkpoint was evaluated on **30 fresh stochastic episodes**. Values below are mean return ± sample standard deviation for one trained policy, not uncertainty across training seeds.

| Environment         | Selected configuration                                  | Fresh-episode return      |
| ------------------- | ------------------------------------------------------- | ------------------------- |
| CartPole-v0         | Normalized trajectory returns                           | **200.0 ± 0.0 / 200**     |
| HalfCheetah-v4      | Reward-to-go + value baseline, original PyTorch sampler | **409.0 ± 55.9**          |
| LunarLander-v2      | GAE, λ = 0.99                                           | **120.0 ± 143.7**         |
| InvertedPendulum-v4 | Small batches + normalized GAE                          | **949.8 ± 199.2 / 1,000** |

[Inspect the individual evaluation outcomes →](https://github.com/Shakthi-Bala/policy_gradient_lab/tree/main/docs/evaluation)

## Sample efficiency versus stability

The stable small-batch Pendulum configuration first reached a 1,000-return evaluation at **36,372 training steps** and finished after **73,468**. A faster candidate crossed the threshold at 26,939 steps but later lost performance. Tracking the final and trailing-ten evaluations alongside the first threshold crossing makes that tradeoff visible.

{% include figure.liquid path="assets/projects/policy-gradient-pendulum.png" avoid_scaling=true loading="lazy" alt="InvertedPendulum learning curves comparing sample efficiency and stability across policy-gradient configurations" width="1458" height="816" class="img-fluid rounded" %}

## A simulator bottleneck I fixed

Headless LunarLander kept accumulating visual exhaust particles. Removing those particles produced **16.4× faster environment stepping** on a long-hover microbenchmark. State, reward, and termination traces matched exactly over 5,000 comparison steps, and learning metrics matched across 437 paired iterations. This measures simulator stepping, rather than end-to-end training speed.

[Inspect the runtime benchmark](https://github.com/Shakthi-Bala/policy_gradient_lab/blob/main/docs/lunar_runtime.json) ·
[Inspect training equivalence](https://github.com/Shakthi-Bala/policy_gradient_lab/blob/main/docs/lunar_prefix_equivalence.json)

## What the experiments did not establish

Most ablations use a single training seed. LunarLander reached a training-time evaluation peak of 236.4, but its frozen final policy averaged only 120.0 on fresh episodes. HalfCheetah outcomes also changed with the sampler RNG stream and training seed. The repository retains these failures and labels selected demonstration videos separately from evaluation evidence.

[Explore the algorithms, exact commands, and recorded runs →](https://github.com/Shakthi-Bala/policy_gradient_lab)
