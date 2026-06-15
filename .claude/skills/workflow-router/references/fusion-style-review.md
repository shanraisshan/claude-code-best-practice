# Fusion-Style Review

Fusion-style review is a judge contract, not a specific provider.

## Trigger

Use when all are true:

- the decision is high-risk or high-ambiguity;
- being wrong is expensive;
- at least two independent perspectives can improve the result.

## Backend Policy

Version 1 uses native Codex subagents only.

OpenRouter Fusion is deferred to a future explicit experiment and must use non-sensitive or explicitly redacted prompts.

## Panel Lenses

Choose two to four independent lenses:

- architecture lens;
- execution lens;
- risk/security lens;
- source/docs lens;
- testing/verification lens;
- product/scope lens.

Panelists should answer independently and report:

- recommendation;
- evidence;
- assumptions;
- blind spots;
- confidence.

## Judge Output

The leader synthesizes:

- **Consensus:** what credible panels agree on.
- **Contradictions:** where panels conflict and which source decides.
- **Partial coverage:** which requirements or risks were missed.
- **Unique insights:** useful one-off ideas.
- **Blind spots:** what remains unproven.
- **Decision:** recommended lane or action.

Do not paste raw panel outputs as the final answer.
