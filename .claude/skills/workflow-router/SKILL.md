---
name: workflow-router
description: "Choose the right Codex execution lane before work begins. Use when the main uncertainty is how to route the work: direct answer, solo execution, repo inspection, native subagents, planning artifact, review gate, OMX runtime, or Fusion-style judge. Also use for ambiguous, multi-track, high-risk, review-locked, or long-running tasks where the execution lane is not already obvious."
---

# Workflow Router

Use this skill as a front door for execution-lane selection. It is advisory by default: pick the lane, state why, define the next action packet, and name escalation gates. Do not silently launch heavyweight runtime flows.

## Quick Start

1. Detect the environment lightly.
2. Classify the task shape.
3. Score routing pressure with `0/1/2` fields.
4. Choose one primary lane.
5. Emit `Routing Decision`, `Do`, `Do Not`, and `Escalation Gates`.

## Lightweight Environment Detection

Run environment detection only when it can change the lane decision. Skip it for obvious `direct-chat`, obvious `planning-artifact`, user-specified workflows, or small `solo-execute` tasks with no runtime coordination.

Run only enough detection to route when `omx-runtime`, `native-subagents`, browser/server state, external APIs, or long-running workflows are plausible candidates:

```bash
env | sort | rg '^(OMX|TMUX|CODEX)'
command -v omx
omx status
```

Do not run `omx doctor` unless the task is setup/debug oriented.

Classify OMX availability:

- `attached`: OMX/TMUX runtime signal is present and `omx status` confirms active runtime state.
- `cli-only`: `omx` exists, but no attached runtime signal is present.
- `unavailable`: `omx` is missing or unusable.

In `cli-only` contexts, you may recommend OMX handoff or lightweight helpers, but do not silently launch `omx team`, `omx ralph`, detached tmux sessions, or long-running runtime modes.

## Scoring

Score each field as `0` low, `1` medium, or `2` high:

- `risk`: destructive, production, security, secrets, review-locked, or irreversible risk.
- `ambiguity`: unclear goal, scope, architecture, or acceptance criteria.
- `evidence_need`: need for repo, web, docs, logs, tests, or source-backed claims.
- `artifact_need`: need for plan, brief, handoff, receipt, or reusable recipe.
- `parallelism`: independent packets that can run concurrently.
- `runtime_coupling`: dependence on OMX runtime, browser/server state, external API, or long-running process.

## Lane Selection

Use the lane taxonomy in [routing-matrix.md](references/routing-matrix.md).

If the user explicitly names a workflow, skill, or tool, treat it as the primary lane hint. Add guardrails, availability checks, and fallbacks as needed, but do not override the named lane unless it is unsafe, unavailable, or contradicts explicit user constraints.

Default tendencies:

- Low risk, low ambiguity, low evidence need: `direct-chat` or `solo-execute`.
- Local discovery without edits: `repo-inspection`.
- Independent packets: `native-subagents`.
- Durable plan before execution: `planning-artifact`.
- Review-locked or high-risk implementation: `review-gate-loop`.
- Attached OMX runtime plus persistent coordinated execution: `omx-runtime`.
- Expensive, high-ambiguity decision: `fusion-style-judge`.

## Output Contract

Use the short format in [routing-decision.md](templates/routing-decision.md). Keep it compact. The router is not a full plan generator.

## Fusion-Style Judge

Use [fusion-style-review.md](references/fusion-style-review.md) when the wrong decision is expensive and independent perspectives can materially improve the outcome. Version 1 uses native Codex subagents only. OpenRouter Fusion is a future explicit backend, not the default.

## Promotion Discipline

Do not add new resident AGENTS rules from one routing run. Use [promotion-gates.md](references/promotion-gates.md) before promoting any router lesson into AGENTS.md.
