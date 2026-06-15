# Example: CLI-Only OMX Boundary

User asks:

```text
Use $team for this multi-lane implementation.
```

Observed environment:

```text
OMX availability: cli-only
- `omx` command exists
- no attached `OMX_*` or `TMUX` runtime signal is present
```

## Routing Decision

| Field | Value |
| --- | --- |
| Task shape | explicit OMX/team workflow request |
| Scores | `risk=1`, `ambiguity=1`, `evidence_need=1`, `artifact_need=1`, `parallelism=2`, `runtime_coupling=2` |
| Environment | `OMX=cli-only`, `native_subagents=available`, `CodeGraph=available`, `web=not relevant` |
| Recommended lane | `omx-runtime` handoff / launch decision |
| Fallback lane | `native-subagents` for bounded read-only planning packets |
| Why | User explicitly requested `$team`, but current session is not attached to OMX runtime. Router should preserve the request while preventing a silent runtime switch. |

## Do

- State that OMX is CLI-only in this context.
- Prepare a handoff or launch recommendation for `omx team`.
- Use native subagents only for bounded sidecar research if useful before runtime switch.

## Do Not

- Silently launch `omx team`, `omx ralph`, detached tmux, or long-running runtime modes.
- Treat native subagents as team workers with OMX worker discipline.
- Widen implementation scope while preparing the handoff.

## Escalation Gates

- If the user explicitly asks to launch/switch into OMX runtime, follow the runtime launch path.
- If the task can be safely handled without persistent runtime coordination, route back to `native-subagents` or `planning-artifact`.
- If OMX setup health is uncertain, run `omx doctor` before recommending team execution.
