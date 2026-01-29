# Weather Karachi System Flow

This document describes the complete flow of the weather data fetching and transformation system.

## System Overview

The weather system demonstrates the **Command → Agent → Skills** architecture pattern, where:
- A command orchestrates the workflow
- An agent executes tasks using preloaded skills
- Skills provide domain-specific knowledge and instructions

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interaction                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────────┐
                    │  /weather-orchestrator│
                    │  Command              │
                    │  (Entry point)        │
                    └──────────────────────┘
                              │
                              │ Task tool invocation
                              ▼
                    ┌──────────────────────┐
                    │  weather             │
                    │  Agent               │
                    │  (Orchestrates flow) │
                    │                      │
                    │  skills:             │
                    │  - weather-fetcher   │
                    │  - weather-transformer│
                    └──────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│  weather-fetcher        │     │  weather-transformer    │
│  Skill                  │     │  Skill                  │
│  (Preloaded knowledge)  │     │  (Preloaded knowledge)  │
└─────────────────────────┘     └─────────────────────────┘
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│  wttr.in API            │     │  weather-orchestration/ │
│  Fetch Temperature      │     │  Read Transform Rules   │
│  for Karachi            │     └─────────────────────────┘
└─────────────────────────┘                   │
              │                               ▼
              │ Returns: 26°C       ┌─────────────────────────┐
              │                     │  Apply Transform        │
              └─────────────────────│  26 + 10 = 36°C         │
                                    └─────────────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────────────┐
                                    │  weather-orchestration/output.md       │
                                    │  Write Results          │
                                    └─────────────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────────────┐
                                    │  Display Summary        │
                                    │  to User                │
                                    └─────────────────────────┘
```

## Component Details

### 1. Command

#### `/weather-orchestrator` (Command)
- **Location**: `.claude/commands/weather-orchestrator.md`
- **Purpose**: Entry point for weather operations
- **Action**: Invokes the weather agent via Task tool
- **Model**: haiku

### 2. Agent with Skills

#### `weather` (Agent)
- **Location**: `.claude/agents/weather.md`
- **Purpose**: Execute the weather workflow using preloaded skills
- **Skills**: `weather-fetcher`, `weather-transformer`
- **Tools Available**: WebFetch, Read, Write
- **Model**: haiku
- **Color**: green

The agent has skills preloaded into its context at startup. It follows the instructions from each skill sequentially.

### 3. Skills

#### `weather-fetcher` (Skill)
- **Location**: `.claude/skills/weather-fetcher/SKILL.md`
- **Purpose**: Instructions for fetching real-time temperature data
- **Data Source**: wttr.in API for Karachi, Pakistan
- **Output**: Temperature in Celsius (numeric value)

#### `weather-transformer` (Skill)
- **Location**: `.claude/skills/weather-transformer/SKILL.md`
- **Purpose**: Instructions for applying mathematical transformations
- **Input Source**: `weather-orchestration/input.md` (transformation rules)
- **Output Destination**: `weather-orchestration/output.md` (formatted results)

### 4. Data Files

#### `weather-orchestration/input.md`
- **Purpose**: Stores transformation rules
- **Format**: Natural language instructions (e.g., "add +10 in the result")
- **Access**: Read by weather agent following weather-transformer skill

#### `weather-orchestration/output.md`
- **Purpose**: Stores formatted transformation results
- **Format**: Structured markdown with sections:
  - Original Temperature
  - Transformation Applied
  - Final Result
  - Calculation Details

## Execution Flow

1. **User Invocation**: User runs `/weather-orchestrator` command
2. **User Prompt**: Command asks user for preferred temperature unit (Celsius/Fahrenheit)
3. **Agent Invocation**: Command invokes weather agent via Task tool
4. **Skill Execution** (within agent context):
   - **Step 1**: Agent follows `weather-fetcher` skill instructions to fetch temperature from wttr.in
   - **Step 2**: Agent follows `weather-transformer` skill instructions to:
     - Read transformation rules from `weather-orchestration/input.md`
     - Apply rules to the fetched temperature
     - Write formatted results to `weather-orchestration/output.md`
5. **Result Display**: Summary shown to user with:
   - Temperature unit requested
   - Original temperature
   - Transformation rule applied
   - Final transformed result

## Example Execution

```
Input: /weather-orchestrator
├─ Asks: Celsius or Fahrenheit?
├─ User: Celsius
├─ Task: weather agent (via Task tool)
│  ├─ Skills Preloaded:
│  │  ├─ weather-fetcher (knowledge)
│  │  └─ weather-transformer (knowledge)
│  ├─ Step 1 (weather-fetcher skill):
│  │  └─ Fetches from wttr.in → 26°C
│  ├─ Step 2 (weather-transformer skill):
│  │  ├─ Reads: weather-orchestration/input.md ("add +10")
│  │  ├─ Calculates: 26 + 10 = 36°C
│  │  └─ Writes: weather-orchestration/output.md
│  └─ Returns: Complete report
└─ Output:
   ├─ Unit: Celsius
   ├─ Original: 26°C
   ├─ Transform: Add +10
   └─ Result: 36°C
```

## Key Design Principles

1. **Command → Agent → Skills**: Three-tier architecture for clean separation
2. **Skills as Knowledge**: Skills provide domain knowledge preloaded into agent context
3. **Single Agent**: One agent handles multiple related tasks using its skills
4. **Sequential Execution**: Agent follows skill instructions in order
5. **Configurable Transformations**: Rules stored externally in input files
6. **Structured Output**: Results formatted consistently in output files

## Architecture Pattern: Agent-Skills

This system demonstrates the **agent-skills pattern** where:

```yaml
# In agent definition (.claude/agents/weather.md)
---
name: weather
skills:
  - weather-fetcher
  - weather-transformer
---
```

- **Skills are preloaded**: Full skill content is injected into agent's context at startup
- **Agent uses skill knowledge**: Agent follows instructions from preloaded skills
- **No dynamic invocation**: Skills are not invoked separately; they're reference material
- **Single execution context**: All work happens within one agent's context
