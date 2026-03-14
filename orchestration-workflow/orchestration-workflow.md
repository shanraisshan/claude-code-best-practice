# Orchestration Workflow

This document describes the **Command → Agent (with skill) → Skill** orchestration workflow, demonstrated through a weather data fetching and SVG rendering system.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## System Overview

The weather system demonstrates two distinct skill patterns within a single orchestration workflow:
- **Agent Skills** (preloaded): `weather-fetcher` is injected into the `weather-agent` at startup as domain knowledge
- **Skills** (independent): `weather-svg-creator` is invoked directly by the command via the Skill tool

This showcases the **Command → Agent → Skill** architecture pattern, where:
- A command orchestrates the workflow and handles user interaction
- An agent fetches data using its preloaded skill
- A skill creates the visual output independently

## Component Summary

| Component | Role | Example |
|-----------|------|---------|
| **Command** | Entry point, user interaction | [`/weather-orchestrator`](../.claude/commands/weather-orchestrator.md) |
| **Agent** | Fetches data with preloaded skill (agent skill) | [`weather-agent`](../.claude/agents/weather-agent.md) with [`weather-fetcher`](../.claude/skills/weather-fetcher/SKILL.md) |
| **Skill** | Creates output independently (skill) | [`weather-svg-creator`](../.claude/skills/weather-svg-creator/SKILL.md) |

## Flow Diagram

```
╔══════════════════════════════════════════════════════════════════╗
║              ORCHESTRATION WORKFLOW                              ║
║           Command  →  Agent  →  Skill                            ║
╚══════════════════════════════════════════════════════════════════╝

                         ┌───────────────────┐
                         │  User Interaction │
                         └─────────┬─────────┘
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  /weather-orchestrator — Command (Entry Point)      │
         └─────────────────────────┬───────────────────────────┘
                                   │
                              Step 1
                                   │
                                   ▼
                      ┌────────────────────────┐
                      │  AskUser — C° or F°?   │
                      └────────────┬───────────┘
                                   │
                         Step 2 — Agent tool
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  weather-agent — Agent ● skill: weather-fetcher     │
         └─────────────────────────┬───────────────────────────┘
                                   │
                          Returns: temp + unit
                                   │
                         Step 3 — Skill tool
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  weather-svg-creator — Skill ● SVG card + output    │
         └─────────────────────────┬───────────────────────────┘
                                   │
                          ┌────────┴────────┐
                          │                 │
                          ▼                 ▼
                   ┌────────────┐    ┌────────────┐
                   │weather.svg │    │ output.md  │
                   └────────────┘    └────────────┘
```

## Component Details

### 1. Command

#### `/weather-orchestrator` (Command)
- **Location**: `.claude/commands/weather-orchestrator.md`
- **Purpose**: Entry point — orchestrates the workflow and handles user interaction
- **Actions**:
  1. Asks user for temperature unit preference (Celsius/Fahrenheit)
  2. Invokes weather-agent via Agent tool
  3. Invokes weather-svg-creator via Skill tool
- **Model**: haiku

### 2. Agent with Preloaded Skill (Agent Skill)

#### `weather-agent` (Agent)
- **Location**: `.claude/agents/weather-agent.md`
- **Purpose**: Fetch weather data using its preloaded skill
- **Skills**: `weather-fetcher` (preloaded as domain knowledge)
- **Tools Available**: WebFetch, Read
- **Model**: sonnet
- **Color**: green
- **Memory**: project

The agent has `weather-fetcher` preloaded into its context at startup. It follows the skill's instructions to fetch the temperature and returns the value to the command.

### 3. Skill

#### `weather-svg-creator` (Skill)
- **Location**: `.claude/skills/weather-svg-creator/SKILL.md`
- **Purpose**: Create a visual SVG weather card and write output files
- **Invocation**: Via Skill tool from the command (not preloaded into any agent)
- **Outputs**:
  - `orchestration-workflow/weather.svg` — SVG weather card
  - `orchestration-workflow/output.md` — Weather summary

### 4. Preloaded Skill

#### `weather-fetcher` (Skill)
- **Location**: `.claude/skills/weather-fetcher/SKILL.md`
- **Purpose**: Instructions for fetching real-time temperature data
- **Data Source**: Open-Meteo API for Dubai, UAE
- **Output**: Temperature value and unit (Celsius or Fahrenheit)
- **Note**: This is an agent skill — preloaded into `weather-agent`, not invoked directly

## Execution Flow

1. **User Invocation**: User runs `/weather-orchestrator` command
2. **User Prompt**: Command asks user for preferred temperature unit (Celsius/Fahrenheit)
3. **Agent Invocation**: Command invokes `weather-agent` via Agent tool
4. **Skill Execution** (within agent context):
   - Agent follows `weather-fetcher` skill instructions to fetch temperature from Open-Meteo
   - Agent returns the temperature value and unit to the command
5. **SVG Creation**: Command invokes `weather-svg-creator` via Skill tool
   - Skill creates SVG weather card at `orchestration-workflow/weather.svg`
   - Skill writes summary to `orchestration-workflow/output.md`
6. **Result Display**: Summary shown to user with:
   - Temperature unit requested
   - Temperature fetched
   - SVG card location
   - Output file location

## Example Execution

```
Input: /weather-orchestrator
├─ Step 1: Asks: Celsius or Fahrenheit?
│  └─ User: Celsius
├─ Step 2: Agent tool → weather-agent
│  ├─ Preloaded Skill:
│  │  └─ weather-fetcher (domain knowledge)
│  ├─ Fetches from Open-Meteo → 26°C
│  └─ Returns: temperature=26, unit=Celsius
├─ Step 3: Skill tool → /weather-svg-creator
│  ├─ Creates: orchestration-workflow/weather.svg
│  └─ Writes: orchestration-workflow/output.md
└─ Output:
   ├─ Unit: Celsius
   ├─ Temperature: 26°C
   ├─ SVG: orchestration-workflow/weather.svg
   └─ Summary: orchestration-workflow/output.md
```

## Key Design Principles

1. **Two Skill Patterns**: Demonstrates both agent skills (preloaded) and skills (invoked directly)
2. **Command as Orchestrator**: The command handles user interaction and coordinates the workflow
3. **Agent for Data Fetching**: The agent uses its preloaded skill to fetch data, then returns it
4. **Skill for Output**: The SVG creator runs independently, receiving data from the command context
5. **Clean Separation**: Fetch (agent) → Render (skill) — each component has a single responsibility

## Architecture Patterns

### Agent Skill (Preloaded)

```yaml
# In agent definition (.claude/agents/weather-agent.md)
---
name: weather-agent
skills:
  - weather-fetcher    # Preloaded into agent context at startup
---
```

- **Skills are preloaded**: Full skill content is injected into agent's context at startup
- **Agent uses skill knowledge**: Agent follows instructions from preloaded skills
- **No dynamic invocation**: Skills are reference material, not invoked separately

### Skill (Direct Invocation)

```yaml
# In skill definition (.claude/skills/weather-svg-creator/SKILL.md)
---
name: weather-svg-creator
description: Creates an SVG weather card...
---
```

- **Invoked via Skill tool**: Command calls `Skill(skill: "weather-svg-creator")`
- **Independent execution**: Runs in the command's context, not inside an agent
- **Receives data from context**: Uses temperature data already available in the conversation
