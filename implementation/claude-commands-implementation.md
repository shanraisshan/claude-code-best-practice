# Commands Implementation

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar_02%2C_2026-white?style=flat&labelColor=555)

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#weather-orchestrator"><img src="../!/tags/implemented-hd.svg" alt="Implemented"></a>

The weather orchestrator command is implemented in this repo as the entry point of the **Command → Agent → Skill** architecture pattern, demonstrating how commands orchestrate multi-step workflows.

---

## Weather Orchestrator

**File**: [`.claude/commands/weather-orchestrator.md`](../.claude/commands/weather-orchestrator.md)

```yaml
---
description: Fetch weather data for Dubai and create an SVG weather card
model: haiku
---

# Weather Orchestrator Command

Fetch the current temperature for Dubai, UAE and create a visual SVG weather card.

## Workflow

### Step 1: Ask User Preference
Use the AskUserQuestion tool to ask the user whether they want the temperature
in Celsius or Fahrenheit.

### Step 2: Fetch Weather Data
Use the Task tool to invoke the weather agent:
- subagent_type: weather-agent
- prompt: Fetch the current temperature for Dubai, UAE in [unit]...

### Step 3: Create SVG Weather Card
Use the Skill tool to invoke the weather-svg-creator skill:
- skill: weather-svg-creator

...
```

The command orchestrates the entire workflow: it asks the user for their temperature unit preference, invokes the `weather-agent` via the Task tool, and then invokes the `weather-svg-creator` skill via the Skill tool.

---

## ![How to Use](../!/tags/how-to-use.svg)

```bash
$ claude
> /weather-orchestrator
```

---

## ![How to Implement](../!/tags/how-to-implement.svg)

Ask Claude to create one for you — it will generate the markdown file with YAML frontmatter and body in `.claude/commands/<name>.md`

---

<a href="https://github.com/shanraisshan/claude-code-best-practice#orchestration-workflow"><img src="../!/tags/orchestration-workflow-hd.svg" alt="Orchestration Workflow"></a>

The weather orchestrator is the **Command** in the Command → Agent → Skill orchestration pattern. It serves as the entry point — handling user interaction (temperature unit preference), delegating data fetching to the `weather-agent`, and invoking the `weather-svg-creator` skill for visual output.

<p align="center">
  <img src="../orchestration-workflow/orchestration-workflow.svg" alt="Command Skill Agent Architecture Flow" width="100%">
</p>

| Component | Role | This Repo |
|-----------|------|-----------|
| **Command** | Entry point, user interaction | [`/weather-orchestrator`](../.claude/commands/weather-orchestrator.md) |
| **Agent** | Fetches data with preloaded skill (agent skill) | [`weather-agent`](../.claude/agents/weather-agent.md) with [`weather-fetcher`](../.claude/skills/weather-fetcher/SKILL.md) |
| **Skill** | Creates output independently (skill) | [`weather-svg-creator`](../.claude/skills/weather-svg-creator/SKILL.md) |
