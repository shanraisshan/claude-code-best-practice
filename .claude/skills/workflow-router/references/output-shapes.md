# Output Shapes

The router emits a compact decision, not a full plan.

## Standard Shape

```markdown
## Routing Decision

| Field | Value |
| --- | --- |
| Task shape |  |
| Scores | risk=?, ambiguity=?, evidence_need=?, artifact_need=?, parallelism=?, runtime_coupling=? |
| Environment | OMX=?, native_subagents=?, CodeGraph=?, web=? |
| Recommended lane |  |
| Fallback lane |  |
| Why |  |

## Do

-

## Do Not

-

## Escalation Gates

-
```

## Length Budget

Most router outputs should fit in 20-40 lines.

If a durable plan is needed, route to `planning-artifact`; do not expand the router output into a full plan.
