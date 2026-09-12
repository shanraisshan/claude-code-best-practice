# Demo: Subagents

## Repo Artifact

`.claude/agents/weather-agent.md` — read while the weather-orchestrator output from the commands-skills demo is still visible (or re-run `/weather-orchestrator` first if needed).

## Steps

1. Open `.claude/agents/weather-agent.md`. Walk through the frontmatter fields:
   - `skills: [weather-fetcher]` — the `weather-fetcher` skill is *preloaded* into this agent's context. The agent doesn't need to invoke it explicitly; the instructions are already there.
   - `model: sonnet` — agents can run on a different model than the parent session
   - `maxTurns: 5` — caps agentic loops; prevents runaway agents
   - `permissionMode: acceptEdits` — agents can be granted different permissions than the session
   - `memory: project` — agents can have their own persistent memory scope

2. Compare with how the command invokes it:
   ```
   Task(subagent_type="weather-agent", ...)
   ```
   Point out: the `Task` tool (also called `Agent` in newer versions) is the only way to spawn a subagent. Bash commands cannot launch agents — this is a critical constraint documented in CLAUDE.md.

3. Open `.claude/agents/presentation-curator.md` as a more complex example. Show the `hooks:` field and the self-evolution pattern where the agent updates its own skills after execution.

## Expected "Why Does This Exist?" Question

**"What does the agent have that a command doesn't?"**

Answer: Persistent identity within its execution. The agent has its own model, its own permission mode, its own preloaded skills, its own memory scope, and a capped turn budget. It's an isolated subprocess with a defined contract — the parent command knows what it asked for, but the agent figures out how. This separation is what makes agents composable: you can swap the weather-agent for a different implementation without changing the command.

## Mastery Follow-up

"Given that agents have `maxTurns`, `permissionMode`, and `model` — when would you NOT use an agent and just put the logic directly in a command or skill?"

Good answer: When the task is deterministic and single-step. Agents add overhead (spawning, context isolation) that isn't worth it for simple lookups or transformations. The weather-fetcher skill is a good example of something that doesn't need an agent — it's a single API call with no iteration. The weather-agent exists because the *orchestration* pattern (agent with preloaded skill) is being demonstrated, not because fetching weather requires an agent.
