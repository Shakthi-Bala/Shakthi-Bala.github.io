---
layout: page
title: DevResearchFlow
description: A Python CLI that connects research plans, independent reviews, and captured experiment evidence through Git-aware validation.
img: assets/projects/devresearchflow-cli.webp
importance: 2
category: Research & Developer Tools
featured: true
github: https://github.com/Shakthi-Bala/DevResearchFlow/tree/dev
skills: Python · CLI Design · JSON Schema · Git · CI · Provenance
highlight: Reviewed protocols → verified inputs → recorded execution evidence
media_alt: Recorded terminal commands validating the runnable example and recomputing its mean squared error
media_width: 843
media_height: 600
portfolio: true
topics: [research-tools]
featured_order: 6
featured_area: Research software & reproducibility
featured_summary: A Python CLI connecting reviewed research plans, verified inputs, and captured execution evidence.
card_result: "88 passing tests; 84% combined statement/branch coverage."
card_conditions: "The v0.3.0 validation record reports tests on Python 3.10 and 3.13, with coverage measured on 3.13."
---

A Python CLI for reviewing research plans, checking inputs, and recording experiment execution.

<link rel="stylesheet" href="{{ '/assets/css/research-content.css' | relative_url }}">

<section class="project-brief" aria-label="Project summary">
  <dl>
    <div><dt>Contribution &amp; credit</dt><dd>Built the Python CLI, structured records, review gates, input checks, execution runner, and Git hooks. Optional integrations use external tools; the repository supplies the workflow and evidence checks.</dd></div>
    <div><dt>Outcome &amp; conditions</dt><dd>The 0.3.0 validation record reports <strong>88 passing tests on Python 3.10 and 3.13</strong>, with 84% combined statement/branch coverage on 3.13. These checks cover software behavior and recorded evidence.</dd></div>
    <div><dt>Engineering decision</dt><dd>Validated staged files and checked code/data manifests before execution. A review should stop being accepted when the material it covered changes.</dd></div>
    <div><dt>Artifacts</dt><dd><a href="#project-demo">Recorded CLI demonstration</a> · <a href="https://github.com/Shakthi-Bala/DevResearchFlow/tree/dev">Code</a> · <a href="https://github.com/Shakthi-Bala/DevResearchFlow/blob/dev/docs/release-review.md">Validation record</a> · <a href="https://github.com/Shakthi-Bala/DevResearchFlow/blob/dev/examples/toy-ablation/README.md">Runnable example</a></dd></div>
  </dl>
</section>

<span id="project-demo" class="research-anchor"></span>

<video controls playsinline preload="metadata" width="844" height="600" poster="{{ '/assets/projects/covers/devresearchflow.webp' | relative_url }}" aria-label="DevResearchFlow CLI recording of the runnable toy ablation" style="display:block;width:100%;height:auto;">
  <source src="{{ '/assets/video/devresearchflow-cli.mp4' | relative_url }}" type="video/mp4">
  <a href="{{ '/assets/video/devresearchflow-cli.mp4' | relative_url }}">Open the CLI recording</a>.
</video>

_Actual commands from the repository’s runnable toy ablation: build the example, inspect a retained failed run and a completed run, validate 12 records with zero errors, and recompute MSE 7.5. The review records are synthetic teaching fixtures; no independent reviewer or live agent session is represented. Idle periods are shortened for playback._

[Read the recording transcript]({{ '/assets/demos/devresearchflow-cli.txt' | relative_url }}) · [Download the terminal recording]({{ '/assets/demos/devresearchflow-cli.cast' | relative_url }}) · [Reproduce the example](https://github.com/Shakthi-Bala/DevResearchFlow/tree/2740a816fa9af3f44289d8360a088610fc670827/examples/toy-ablation)

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

## Workflow reference

{% include figure.liquid path="assets/projects/devresearchflow-workflow.gif" avoid_scaling=true loading="eager" alt="Workflow illustration following research planning, implementation, execution, independent review, and conclusions" width="1200" height="744" class="img-fluid rounded z-depth-1" %}

_Workflow illustration, not a recording of live agent execution. Amber outlines identify independent review stages._

[Explore the CLI, architecture, and reproducible example →](https://github.com/Shakthi-Bala/DevResearchFlow/tree/dev)
