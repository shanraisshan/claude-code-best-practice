# Demo: Commands + Skills

## Repo Artifact

`.claude/commands/weather-orchestrator.md` + run the command live.

## Steps

1. Open `.claude/commands/weather-orchestrator.md` and read it together with the user. Point out:
   - The command is only 46 lines and does zero logic — it asks a question, calls an agent, calls a skill
   - The `model: haiku` frontmatter — commands can specify which model runs them
   - The `Skill("weather-svg-creator")` invocation — this is how commands hand off to skills

2. Run `/weather-orchestrator` live. Let it complete fully.

3. After it finishes, open `.claude/skills/weather-svg-creator/SKILL.md`. Ask: "What did the command do that the skill couldn't do for itself?"

   The answer: the command owns the *workflow* (ask → fetch → create). The skill owns *one step* (create the SVG given a temperature). The skill is reusable by anything that needs an SVG card; the command is the opinionated end-to-end entry point.

4. Show `.claude/skills/learning-tour/SKILL.md` as a contrast: this skill is much larger and uses reference files. Point out the `references/` directory pattern — same progressive disclosure, different scale.

## Expected "Why Does This Exist?" Question

**"Why does the weather agent need to exist at all? Why not just have the command fetch the weather directly?"**

Answer: The agent has capabilities the command doesn't — it has a preloaded skill (`weather-fetcher`) embedded in its context via the `skills:` frontmatter field, its own `model`, `maxTurns`, `permissionMode`, and `memory`. An agent has **persistent identity** across its turns; a command just runs instructions in the current session. When you need isolated execution with its own tools and context, you need an agent.

## Mastery Follow-up

"The official docs say 'custom commands have been merged into skills.' Given that, when would you still choose a command over a skill as your entry point?"

Good answer: Commands appear in the `/` autocomplete menu as first-class entry points and are designed to be user-invoked directly. Skills can be `user-invocable: false` (background knowledge, not exposed in the menu). Use a command when the thing is a workflow entry point; use a skill when it's reusable logic invoked by other things.
