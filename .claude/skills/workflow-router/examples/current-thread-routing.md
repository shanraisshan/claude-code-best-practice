# Example: Current Thread Routing

## Routing Decision

| Field | Value |
| --- | --- |
| Task shape | multi-track research plus workflow design |
| Scores | `risk=1`, `ambiguity=1`, `evidence_need=2`, `artifact_need=2`, `parallelism=2`, `runtime_coupling=1` |
| Environment | `OMX=cli-only`, `native_subagents=available`, `CodeGraph=not relevant`, `web=available` |
| Recommended lane | `native-subagents` plus `planning-artifact` |
| Fallback lane | `repo-inspection` plus solo synthesis |
| Why | External research, local audit, and synthesis are separable; final output should be durable. |

## Do

- Use bounded native subagents for independent research packets.
- Save a workflow artifact before synthesis.
- Write a durable plan after scope is clear.

## Do Not

- Launch `omx team` from a cli-only Codex App context.
- Edit AGENTS before candidate evidence.
- Call live OpenRouter APIs with private data.

## Escalation Gates

- If the implementation spans independent owners, recommend `omx-runtime`.
- If a high-risk decision remains contested, run `fusion-style-judge`.
- If setup health becomes the blocker, run `omx doctor`.
