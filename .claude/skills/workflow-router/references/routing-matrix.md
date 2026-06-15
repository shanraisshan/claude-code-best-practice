# Routing Matrix

## Lanes

### direct-chat

Use for stable, low-risk answers that do not need file reads, web verification, or durable artifacts.

Signals:

- `risk=0`
- `ambiguity=0`
- `evidence_need=0`
- `artifact_need=0`

### solo-execute

Use for small local work one agent can finish and verify directly.

Signals:

- narrow scope;
- no independent packets;
- tests or checks are local and obvious.

### repo-inspection

Use for read-only local code or project discovery.

Preferred tools:

- CodeGraph for symbols, call relationships, impact, and indexed files.
- `rg` for literal text and file discovery.
- ordinary file reads for known paths.
- `omx sparkshell` only when an explicit read-only shell or tmux-pane summary is useful.

Do not make deprecated `omx explore` the default path.

### native-subagents

Use when the task has independent bounded packets that can run in parallel.

Examples:

- external source research plus local config audit;
- independent review lenses;
- separate test/fixture investigation;
- plan critique plus implementation mapping.

### planning-artifact

Use when the next valuable output is a durable plan, brief, handoff, or goal/spec contract.

Examples:

- user asks to plan;
- long goal needs `whole_goal` and `current_session_slice`;
- implementation should not start before scope is clarified.

### review-gate-loop

Use for review-locked, high-risk, governance, rewrite, or blocker-driven work.

Required posture:

1. targeted verification;
2. review;
3. fix blocker findings;
4. rerun verification;
5. rerun review until blockers clear.

### omx-runtime

Use when the task needs persistent coordinated execution and the session is attached to OMX runtime, or the user explicitly asks to launch/switch into OMX.

In `cli-only` contexts, recommend a handoff rather than silently launching runtime flows.

### fusion-style-judge

Use when:

- `risk=2` or `ambiguity=2`;
- wrong decision is expensive;
- independent perspectives can materially improve the decision.

Version 1 backend: native Codex subagents.

## Tie Breakers

- Explicit workflow/tool requests win as lane hints. The router may add guardrails, but should not override a named workflow unless it is unsafe, unavailable, or contradicts explicit user constraints.
- Prefer the lightest lane that can prove the claim.
- Escalate only when the current lane cannot provide enough evidence or coordination.
- Do not use router output as permission to widen scope.
- Do not bypass provider, credential, destructive, or external-production gates.
- Detect runtime availability only when it can change the lane decision; skip environment checks for obvious lightweight lanes.
- Keep scoring as agent judgment in v1. Do not add a deterministic scoring helper until repeated routing examples show drift.

## Explicit Request Examples

| User request | Router stance |
| --- | --- |
| `use $ce-plan` | Choose `planning-artifact`; preserve no-implementation boundary. |
| `use CodeGraph` | Choose `repo-inspection`; use CodeGraph for structural queries and `rg` for literal text. |
| `use $team` | Choose `omx-runtime`; verify attached runtime or prepare handoff. |
| `use native subagents` | Choose `native-subagents`; split bounded independent packets. |
| `use OpenRouter Fusion` | Choose `fusion-style-judge`; enforce provider, secret, and data boundaries. |
