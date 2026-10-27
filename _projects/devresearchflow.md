---
layout: page
title: DevResearchFlow
description: A Python CLI that connects research plans, independent reviews, and captured experiment evidence through Git-aware validation.
img: assets/projects/devresearchflow-workflow.gif
importance: 2
category: Research & Developer Tools
featured: true
github: https://github.com/Shakthi-Bala/DevResearchFlow/tree/dev
skills: Python · CLI Design · JSON Schema · Git · CI · Provenance
highlight: Reviewed protocols → verified inputs → recorded execution evidence
media_alt: Animated diagram showing the research workflow and independent review stages
media_width: 1200
media_height: 744
portfolio: true
topics: [research-tools]
featured_order: 6
featured_area: Research software & reproducibility
featured_summary: A Python CLI connecting reviewed research plans, verified inputs, and captured execution evidence.
---

**Make AI-assisted research easier to inspect, reproduce, and challenge.**

[View code on GitHub](https://github.com/Shakthi-Bala/DevResearchFlow/tree/dev) ·
[Walk through a runnable experiment](https://github.com/Shakthi-Bala/DevResearchFlow/blob/dev/examples/toy-ablation/README.md)

{% include figure.liquid path="assets/projects/devresearchflow-workflow.gif" avoid_scaling=true loading="eager" alt="Workflow illustration following research planning, implementation, execution, independent review, and conclusions" width="1200" height="744" class="img-fluid rounded z-depth-1" %}

_Workflow illustration, not a recording of live agent execution. Amber outlines identify independent review stages._

## The problem

An AI-generated conclusion can sound convincing even when its experiment was never run, its inputs changed after review, or its evidence is missing. DevResearchFlow makes those handoffs explicit: a reviewed plan leads to a recorded execution, and conclusions point back to sources and measurements.

## What I built

- **An installable Python CLI.** The `drf` command initializes projects, creates structured records, prepares reviews, runs planned experiments, validates evidence, and reports workflow status.
- **Seven role contracts.** Coordination, specialist work, and independent protocol, implementation, and evidence reviews have explicit responsibilities and handoffs.
- **A guarded execution runner.** Before execution, the runner checks reviewed code and per-file dataset manifests. It then captures logs, timestamps, exit codes, checksums, and execution receipts; failed attempts remain part of the record.
- **Git-aware review gates.** Staged-record validation, pre-commit hooks, and CI help catch changed artifacts and stale reviews before they become accepted evidence.
- **Structured provenance.** YAML records, JSON schemas, reviewer identities, and source references connect hypotheses, experiments, runs, and claims.

## Design decisions that matter

| Decision                                        | Why it matters                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| Verify code and dataset inputs before execution | Prevents a reviewed protocol from silently running against different inputs           |
| Preserve failed runs and require a fresh run ID | Keeps the experiment history inspectable instead of overwriting inconvenient outcomes |
| Record reviewer identity and session            | Allows validation to reject recorded self-review and missing review identities        |
| Validate staged content                         | Checks what is about to be committed, including staged artifact changes               |
| Preserve existing project files and hooks       | Allows adoption in an existing repository without replacing its local setup           |

## Validation and delivery

The documented 0.3.0 validation passed **88 tests on Python 3.10 and 3.13**, with **84% combined statement/branch coverage** in the Python 3.13 run, including subprocess execution and copied project-local checkers. A later unreleased follow-up reports **94 regression tests on Python 3.13**.

The release review also records Ruff, mypy, source/wheel builds, and installation checks from a clean environment outside the checkout. Runner scenarios include successful execution, command failure, timeout, cancellation, changed inputs, and receipt tampering.

[Read the validation record and its scope](https://github.com/Shakthi-Bala/DevResearchFlow/blob/dev/docs/release-review.md)

## Try the workflow

Install from the repository's `dev` branch, then use the CLI inside a Git project:

```bash
drf init . --ci
drf status
drf check
```

The [first-experiment guide](https://github.com/Shakthi-Bala/DevResearchFlow/blob/dev/docs/first-experiment.md) walks through planning and reviewing an experiment before running it.

## Boundaries

The validator checks structure, recorded identities, and provenance; scientific correctness still requires substantive review. Receipts detect ordinary changes but are not cryptographic attestation against someone controlling the repository and execution host. The worked example uses real local execution with explicitly synthetic review fixtures; a real thesis pilot and live role-profile enforcement remain unverified.

[Explore the CLI, architecture, and reproducible example →](https://github.com/Shakthi-Bala/DevResearchFlow/tree/dev)
