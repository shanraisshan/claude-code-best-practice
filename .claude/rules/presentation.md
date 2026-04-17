# Glob: presentation/**

## Delegation Rule

Any request to update, modify, or fix a presentation MUST be handled by the matching per-presentation agent. **Never edit presentation HTML directly.** Route by which presentation the user is referring to:

| Presentation | Path | Agent |
|---|---|---|
| Vibe Coding → Agentic Engineering | `presentation/vibe-coding-to-agentic-engineering/index.html` | `presentation-vibe-coding` |
| Claude Code Learning Journey | `presentation/learning-journey/index.html` | `presentation-learning-journey` |

Invoke via the Agent tool:

```
Agent(subagent_type="presentation-vibe-coding", description="...", prompt="...")
Agent(subagent_type="presentation-learning-journey", description="...", prompt="...")
```

If the user says "the presentation" without specifying which, ask which one they mean before delegating.

## Why

Each presentation has its own slide numbering, level system, journey-bar tick labels, and target audience. Per-presentation agents let each one keep a focused knowledge base and self-evolve without cross-contaminating the other. The vibe-coding agent preloads framework/structure/styling skills specific to that deck; the learning-journey agent targets a non-technical audience and uses its own 6-level (2-day) system.
