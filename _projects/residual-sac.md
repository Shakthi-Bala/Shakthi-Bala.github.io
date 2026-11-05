---
layout: page
title: Residual SAC for Robot Reaching & Tracking
description: A MuJoCo UR16e study comparing a frozen Cartesian PI controller, standalone SAC, and bounded residual SAC under hidden payload and command delay.
img: assets/projects/posters/residual-sac.webp
importance: 6
category: Robot Learning & Manipulation
featured: false
github: https://github.com/Shakthi-Bala/residual_sac_robot_control
skills: Python · PyTorch · SAC · MuJoCo · Residual Reinforcement Learning · Slurm · Experiment Design
highlight: Three training seeds, matched held-out targets, and explicit checks for learned improvement
media_alt: Matched UR16e tracking rollouts for Cartesian PI, standalone SAC, and residual SAC under added payload and command delay
media_width: 1488
media_height: 610
portfolio: true
topics: [learning, manipulation]
demo_anchor: project-demo
---

**When a conventional controller already works well, does a learned residual actually improve it?**

<link rel="stylesheet" href="{{ '/assets/css/research-content.css' | relative_url }}">

<section class="project-brief" aria-label="Project summary">
  <dl>
    <div><dt>Contribution &amp; credit</dt><dd>Implemented DQN/SAC updates and benchmark tooling on Berkeley Deep RL HW3 scaffolding, then extended the work with a custom six-joint UR16e MuJoCo environment, bounded residual policy, matched evaluation, and Slurm experiments. The robot model derives from the official Universal Robots description through an earlier pick-and-place project.</dd></div>
    <div><dt>Outcome &amp; conditions</dt><dd>Validation-selected residual SAC reached <strong>89.8 ± 0.4% success</strong> versus <strong>89.6% for Cartesian PI</strong> on matched simulated tests. Two of three residual seeds retained the initial zero-correction checkpoint; none met the preset baseline-improvement criterion.</dd></div>
    <div><dt>Engineering decision</dt><dd>Separated inherited controller competence from learned improvement, froze controller tuning before training, and retained final-checkpoint regressions alongside validation-selected results.</dd></div>
    <div><dt>Artifacts</dt><dd><a href="#project-demo">Matched simulation demo</a> · <a href="https://github.com/Shakthi-Bala/residual_sac_robot_control">Code</a> · <a href="https://github.com/Shakthi-Bala/residual_sac_robot_control/blob/main/residual-control/results/report.pdf">Technical report</a> · <a href="https://github.com/Shakthi-Bala/residual_sac_robot_control/tree/main/residual-control#reproduce-the-full-study">Reproduction protocol</a></dd></div>
  </dl>
</section>

<span id="project-demo" class="research-anchor"></span>

<video controls playsinline preload="none" width="1200" height="492" poster="{{ '/assets/projects/posters/residual-sac.webp' | relative_url }}" aria-label="Three matched simulated UR16e controllers tracking with 3 kg added payload and 100 ms command delay" style="display:block;width:100%;height:auto;">
  <source src="{{ '/assets/video/residual-sac-tracking.mp4' | relative_url }}" type="video/mp4">
  <a href="{{ '/assets/video/residual-sac-tracking.mp4' | relative_url }}">Watch the tracking comparison</a>.
</video>

_One matched simulation rollout per controller, with 3 kg added payload and 100 ms command delay. Training seed 1 and target seed 20000 were fixed before evaluating results. These illustrations use validation-selected checkpoints and are not averages or hardware demonstrations._

[More scenarios, including held-out payload/delay and final-checkpoint regressions →](https://github.com/Shakthi-Bala/residual_sac_robot_control#ur16e-conventional-control-sac-and-residual-sac)

## What I built

- **A shared robot environment.** Six UR16e joints, a physical payload body, a torque-limited velocity servo, and common command limits. Control runs at 50 Hz with 2 ms MuJoCo dynamics steps.
- **Three comparable methods.** A damped-Jacobian Cartesian PI controller, standalone SAC predicting the outer-loop velocity command, and residual SAC adding a correction bounded to ±0.2 rad/s per joint.
- **Hidden-dynamics experiments.** Training randomizes payload from 0–3 kg and delay from 0–100 ms. Held-out tests also include 5 kg payload and 160 ms delay, beyond those ranges.
- **Traceable evaluation.** Disjoint calibration, validation, and test target seeds; matched initial states and references; per-episode CSVs; selected/final policy weights; source and model provenance.

## Results and evaluation conditions

Each learned method uses **three training seeds with 100,000 interactions per seed**. Each selected policy is evaluated on 144 matched episodes. Including the deterministic baseline, the study reports 1,008 held-out episodes. Values below average conditions and tasks equally; ± is descriptive training-seed standard deviation, not a confidence interval.

| Method         |     Success | RMSE after 1 s | Terminal failures |
| -------------- | ----------: | -------------: | ----------------: |
| Cartesian PI   |       89.6% |        11.2 mm |              0.0% |
| Standalone SAC | 9.0 ± 12.2% | 44.9 ± 14.1 mm |      33.3 ± 23.6% |
| Residual SAC   | 89.8 ± 0.4% |  10.6 ± 1.1 mm |        0.0 ± 0.0% |

Reaching succeeds when error stays below 2 cm for the final 0.5 seconds. Tracking succeeds when at least 90% of the post-approach period stays within 2 cm. A rollout can miss the success criterion without a terminal failure.

The residual's aggregate RMSE is 5.8% lower than PI, but **two seeds select the untrained zero-residual policy**. No run confirms the stricter validation criterion: at least 10% lower RMSE than the frozen baseline, without reduced success, at two consecutive evaluations. Retaining the controller is useful behavior, but does not establish learned improvement.

[Inspect per-episode results](https://github.com/Shakthi-Bala/residual_sac_robot_control/blob/main/residual-control/results/episodes.csv) · [Checkpoint selection and interaction accounting](https://github.com/Shakthi-Bala/residual_sac_robot_control/tree/main/residual-control#training-interactions-and-checkpoint-selection)

## Engineering choices and limits

A strong baseline leaves little room for a residual to help. The study records controller calibration costs separately, preserves late-training regressions, and distinguishes absolute task competence from improvement attributable to learning. The learned methods use the same observations and interaction budget; payload and delay remain hidden.

This is free-space simulation with contacts disabled, a local workspace, and episodes up to five seconds. It does not validate collision avoidance, assembly, or real-robot transfer. The repository includes no robot connection or ROS 2 node. Joint-envelope and command filters are implementation constraints, not a formal safety guarantee.

## Earlier DQN and SAC benchmarks

The same repository implements replay-based DQN/Double DQN, tanh-Gaussian SAC, learned entropy temperature, and single versus clipped double critics. Experiments cover CartPole, LunarLander, MsPacman, HalfCheetah, Hopper, and Pendulum. Those benchmark comparisons use a single training seed; best-checkpoint and final-checkpoint returns are reported separately.

[Benchmark algorithms, attribution, reports, and exact run commands →](https://github.com/Shakthi-Bala/residual_sac_robot_control#implementation)
