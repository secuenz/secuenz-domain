---
title: Turning external reconnaissance into a governed workflow
description: How to connect passive discovery, service validation and approved security checks as one repeatable workflow.
pubDate: 2026-08-19
author: Secuenz
tags: ['reconnaissance', 'workflows']
draft: false
---

Most external recon starts the same way: enumerate subdomains, find which ones are alive, then scan
the live ones. Almost every team writes this as a bash one-liner, and almost every team's version
rots differently.

## The manual version

The pipeline usually looks something like this:

```text
asset-discovery --target target.com \
  | service-validation --input discovered-assets \
  | security-checks --policy approved-baseline
```

It works until it doesn't. There's no record of what ran, no way to pause before the scanning stage
hits a client's production estate, and the output is three different formats glued together by
whoever ran it.

## What's missing

- **Reproducibility** — the flags drift between runs and between operators.
- **Governance** — nothing stops the scanning stage from firing at the wrong target.
- **Normalization** — each tool emits its own shape, so results get hand-collated.

## As a ChaosEngine workflow

The same process becomes a visible workflow that is reviewed before execution:

```text
target input
  └─> asset discovery
    └─> service validation
      └─> security checks
        └─> structured output
```

The approval lifecycle is the important part. The complete target scope, actions and output contract are
reviewed before the workflow is approved to run. If separate authorization is required for a later active
stage, model that stage as a separately approved workflow rather than implying an unsupported in-graph gate.

## What the workflow still needs

Turning the commands into nodes does not make the workflow production-ready by itself. Before execution,
the team still needs to confirm:

- The target is authorized and represented by the workflow input.
- The exact tool actions are registered and approved.
- The selected worker has meaningful, verified versions of every binary.
- Timeouts, cancellation and output paths are defined.
- The reviewer understands which stage will generate active traffic.

Catalog presence and graph validation are useful checks, but neither proves that a worker can execute the
workflow successfully. That final runtime check remains part of onboarding and operational validation.

See the complete [external reconnaissance workflow blueprint](/workflows/external-reconnaissance/) or
[request early access](/early-access/) to bring your team's existing version into a focused pilot.
