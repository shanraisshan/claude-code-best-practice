# Weather Karachi System Flow

This document describes the complete flow of the weather data fetching and transformation system.

## System Overview

The weather system consists of skills and specialized subagents that work together to fetch and transform temperature data for Karachi, Pakistan.

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interaction                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  /weather        │
                    │  Command         │
                    └──────────────────┘
                              │
                              │ invokes via Skill tool
                              ▼
                    ┌──────────────────┐
                    │ /weather-karachi │
                    │  Skill           │
                    └──────────────────┘
                              │
                              │ Step 1 (Sequential via Task tool)
                              ▼
                  ┌────────────────────────┐
                  │  weather-fetcher       │
                  │  Subagent              │
                  │  (subagent_type)       │
                  └────────────────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │  wttr.in API           │
                  │  Fetch Temperature     │
                  │  for Karachi           │
                  └────────────────────────┘
                              │
                              │ Returns: 26°C
                              ▼
                              │
                              │ Step 2 (Sequential via Task tool)
                              ▼
                  ┌─────────────────────────┐
                  │  weather-transformer    │
                  │  Subagent               │
                  │  (subagent_type)        │
                  └─────────────────────────┘
                              │
                              ▼
                  ┌─────────────────────────┐
                  │  input/input.md         │
                  │  Read Transform Rules   │
                  └─────────────────────────┘
                              │
                              │ Reads: "add +10"
                              ▼
                  ┌────────────────────────┐
                  │  Apply Transform       │
                  │  26 + 10 = 36°C        │
                  └────────────────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │  output/output.md      │
                  │  Write Results         │
                  └────────────────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │  Display Summary       │
                  │  to User               │
                  └────────────────────────┘
```

## Component Details

### 1. Skills and Commands

#### `/weather` (Command)
- **Location**: `.claude/commands/weather.md`
- **Purpose**: Entry point for weather operations
- **Action**: Invokes `weather-karachi` skill via Skill tool
- **Model**: haiku

#### `/weather-karachi` (Skill)
- **Location**: `.claude/skills/weather-karachi/SKILL.md`
- **Purpose**: Orchestrates the weather fetching and transformation workflow
- **Action**: Launches two specialized subagents sequentially via Task tool
- **Model**: haiku

### 2. Specialized Subagents

#### `weather-fetcher`
- **Location**: `.claude/agents/weather-fetcher.md`
- **Purpose**: Fetch real-time temperature data
- **Data Source**: wttr.in API for Karachi, Pakistan
- **Output**: Temperature in Celsius (numeric value)
- **Tools Available**: WebFetch

#### `weather-transformer`
- **Location**: `.claude/agents/weather-transformer.md`
- **Purpose**: Apply mathematical transformations to temperature data
- **Input Source**: `input/input.md` (transformation rules)
- **Output Destination**: `output/output.md` (formatted results)
- **Tools Available**: Read, Write

### 3. Data Files

#### `input/input.md`
- **Purpose**: Stores transformation rules
- **Format**: Natural language instructions (e.g., "add +10 in the result")
- **Access**: Read by weather-transformer subagent

#### `output/output.md`
- **Purpose**: Stores formatted transformation results
- **Format**: Structured markdown with sections:
  - Original Temperature
  - Transformation Applied
  - Final Result
  - Calculation Details

## Execution Flow

1. **User Invocation**: User runs `/weather` command or `/weather-karachi` skill
2. **Skill Invocation**: `/weather` invokes `weather-karachi` skill via Skill tool
3. **Sequential Subagent Execution** (via Task tool):
   - **Step 1**: `weather-fetcher` subagent fetches current temperature from wttr.in
   - **Step 2**: `weather-transformer` subagent:
     - Reads transformation rules from `input/input.md`
     - Applies rules to the fetched temperature
     - Formats and writes results to `output/output.md`
4. **Result Display**: Summary shown to user with:
   - Original temperature
   - Transformation rule applied
   - Final transformed result

## Example Execution

```
Input: /weather
├─ Invokes: weather-karachi skill (via Skill tool)
│  ├─ Subagent: weather-fetcher (via Task tool)
│  │  └─ Result: 26°C
│  ├─ Subagent: weather-transformer (via Task tool)
│  │  ├─ Reads: input/input.md ("add +10")
│  │  ├─ Calculates: 26 + 10 = 36°C
│  │  └─ Writes: output/output.md
│  └─ Output:
│     ├─ Original: 26°C
│     ├─ Transform: Add +10
│     └─ Result: 36°C
```

## Key Design Principles

1. **Separation of Concerns**: Each component has a single, clear responsibility
2. **Sequential Execution**: Subagents run in order to ensure data dependencies are met
3. **Specialized Subagents**: Task-specific subagents with minimal tool access
4. **Skill-Based Architecture**: Skills orchestrate workflows, subagents execute tasks
5. **Configurable Transformations**: Rules stored externally in input files
6. **Structured Output**: Results formatted consistently in output files
