---
model: haiku
---

# Time Orchestrator Command

Fetch the current time for Dubai (Asia/Dubai, UTC+4) and create a visual SVG time card.

## Workflow

### Step 1: Fetch Current Dubai Time

Use the Agent tool to invoke the time agent:
- subagent_type: time-agent
- description: Fetch current Dubai time
- prompt: Fetch the current time for Dubai (Asia/Dubai, UTC+4). Return exactly three fields: `time` (the time portion, e.g. "14:30:45"), `timezone` ("GST (UTC+4)"), and `formatted` (full formatted string, e.g. "2026-03-12 14:30:45 +04"). The agent has a preloaded skill (time-fetcher) that provides the detailed instructions.
- model: haiku

Wait for the agent to complete and capture the returned time data.

### Data Contract

The time-agent MUST return these three fields:
- **time**: The time portion (e.g., "14:30:45")
- **timezone**: "GST (UTC+4)"
- **formatted**: Full formatted string (e.g., "2026-03-12 14:30:45 +04")

### Step 2: Create SVG Time Card

Use the Skill tool to invoke the time-svg-creator skill:
- skill: time-svg-creator
- args: Pass the time data from Step 1 — include `time`, `timezone`, and `formatted` values

The skill will use the time data from Step 1 (available in the current context) to create the SVG card and write output files.

## Critical Requirements

1. **Use Agent Tool for time-agent**: DO NOT use bash commands to invoke agents. You must use the Agent tool with `subagent_type: "time-agent"`.
2. **Use Skill Tool for SVG Creator**: Invoke the SVG creator via the Skill tool with `skill: "time-svg-creator"`, not the Agent tool.
3. **Sequential Flow**: The agent MUST complete and return time data before the skill is invoked. Do not run them in parallel.
4. **Data Passing**: Ensure all three fields (time, timezone, formatted) from the agent response are available in context when invoking the skill.

## Output Summary

After both steps complete, provide a clear summary to the user showing:
- Current Dubai time fetched
- Timezone: GST (UTC+4)
- Full formatted timestamp
- SVG card created at `agent-teams/output/dubai-time.svg`
- Summary written to `agent-teams/output/output.md`
