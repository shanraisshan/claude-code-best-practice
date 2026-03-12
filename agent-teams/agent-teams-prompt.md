Create an agent team to build a time orchestration workflow that displays
the current Dubai time as a visual SVG card. The workflow follows the
Command → Agent → Skill architecture pattern:

- A command orchestrates the flow and handles user interaction
- An agent fetches the live current time for Dubai using a preloaded skill
- A skill creates a visual SVG time card from the fetched data

**Important**: All files must be created inside `agent-teams/.claude/` —
NOT in the repo root's `.claude/` directory. This keeps the agent team's
output self-contained and runnable via `cd agent-teams && claude`.
Do NOT reference or copy the existing weather workflow — build everything from scratch.

Assign these teammates:

1. **Command Architect** — Design and implement the `/time-orchestrator`
   command in `agent-teams/.claude/commands/time-orchestrator.md`. The command should:
   - Invoke the time-agent via the Agent tool (NOT bash) to fetch the
     current time for Dubai, UAE (Asia/Dubai timezone, UTC+4)
   - Invoke the time-svg-creator skill via the Skill tool to render the
     SVG card from the fetched time data
   - Use model: haiku in the frontmatter
   - Include critical requirements: sequential flow, correct tool usage
     (Agent tool for agents, Skill tool for skills), and an output summary
   Coordinate with the other teammates via the shared task list to agree
   on the data contract ({time, timezone, formatted}) passed between components.

2. **Agent Engineer** — Design and implement the `time-agent` in
   `agent-teams/.claude/agents/time-agent.md` and its preloaded `time-fetcher`
   skill in `agent-teams/.claude/skills/time-fetcher/SKILL.md`. The agent should:
   - Fetch the current time for Dubai (Asia/Dubai, UTC+4) using Bash
     with `TZ='Asia/Dubai' date '+%Y-%m-%d %H:%M:%S %Z'`
   - Return the time value, timezone name, and formatted string to the command
   - Use frontmatter: tools (Bash), model: haiku, color: blue, maxTurns: 3
   - Preload the time-fetcher skill via the `skills:` field
   The time-fetcher skill (`agent-teams/.claude/skills/time-fetcher/SKILL.md`)
   should contain the bash command for Dubai time, the expected output format,
   and set user-invocable: false since it is agent-only domain knowledge.
   Post the agreed data contract to the shared task list so the Command
   Architect and Skill Designer can align on the interface.

3. **Skill Designer** — Design and implement the `time-svg-creator`
   skill in `agent-teams/.claude/skills/time-svg-creator/SKILL.md` with supporting
   files `reference.md` (SVG template + output template) and `examples.md`
   (example input/output pairs). The skill should:
   - Receive a time value, timezone, and formatted string from the calling context
   - Create a self-contained SVG time card for Dubai showing the current time
   - Write the SVG to `agent-teams/output/dubai-time.svg`
   - Write a markdown summary to `agent-teams/output/output.md`
   - Use the exact time provided — never re-fetch
   - Keep templates in reference.md (SVG markup with placeholders, markdown
     output template) and example pairs in examples.md
   Also create the `agent-teams/output/` directory for the output files.

All three teammates should create tasks in the shared task list to
coordinate the data contract: the agent returns {time, timezone, formatted},
the command passes it through context, and the skill consumes it.
Start all three in parallel since the components are independent —
they only need to agree on the data interface, not wait on each other's
implementation.
