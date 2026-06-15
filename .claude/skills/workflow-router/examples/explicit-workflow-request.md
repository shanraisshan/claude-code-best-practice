# Example: Explicit Workflow Request

User asks:

```text
Use $ce-plan to turn this discussion into a plan.
```

## Routing Decision

| Field | Value |
| --- | --- |
| Task shape | explicit planning workflow request |
| Scores | `risk=0`, `ambiguity=1`, `evidence_need=1`, `artifact_need=2`, `parallelism=0`, `runtime_coupling=0` |
| Environment | skipped because runtime detection cannot change the lane |
| Recommended lane | `planning-artifact` |
| Fallback lane | direct structured plan if skill unavailable |
| Why | User explicitly named `$ce-plan`; router should preserve the planning boundary rather than rerouting to execution. |

## Do

- Load and follow `$ce-plan`.
- Keep the output as a durable plan.
- Preserve the no-implementation boundary.

## Do Not

- Start `$ce-work`, `$team`, or implementation without a new explicit request.
- Expand scope beyond the discussion.

## Escalation Gates

- If planning reveals unresolved product blockers, ask or record assumptions.
- If implementation is requested later, route again before choosing execution lane.
