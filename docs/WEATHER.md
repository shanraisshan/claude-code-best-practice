# Weather Karachi System Flow

This document describes the complete flow of the weather data fetching and transformation system.

## System Overview

The weather system consists of slash commands and specialized agents that work together to fetch and transform temperature data for Karachi, Pakistan.

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
                              │ calls
                              ▼
                    ┌──────────────────┐
                    │ /weather-karachi │
                    │  Command         │
                    └──────────────────┘
                              │
                              │ Step 1 (Sequential)
                              ▼
                  ┌────────────────────────┐
                  │  weather-fetcher       │
                  │  Agent                 │
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
                              │ Step 2 (Sequential)
                              ▼
                  ┌─────────────────────────┐
                  │  weather-transformer    │
                  │  Agent                  │
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

### 1. Slash Commands

#### `/weather`
- **Location**: `.claude/commands/weather.md`
- **Purpose**: Entry point for weather operations
- **Action**: Calls `/weather-karachi` command
- **Model**: haiku

#### `/weather-karachi`
- **Location**: `.claude/commands/weather-karachi.md`
- **Purpose**: Orchestrates the weather fetching and transformation workflow
- **Action**: Launches two specialized agents sequentially
- **Model**: haiku

### 2. Specialized Agents

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
- **Access**: Read by weather-transformer agent

#### `output/output.md`
- **Purpose**: Stores formatted transformation results
- **Format**: Structured markdown with sections:
  - Original Temperature
  - Transformation Applied
  - Final Result
  - Calculation Details

## Execution Flow

1. **User Invocation**: User runs `/weather` command
2. **Command Delegation**: `/weather` delegates to `/weather-karachi`
3. **Sequential Agent Execution**:
   - **Step 1**: `weather-fetcher` agent fetches current temperature from wttr.in
   - **Step 2**: `weather-transformer` agent:
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
├─ Calls: /weather-karachi
│  ├─ Agent: weather-fetcher
│  │  └─ Result: 26°C
│  ├─ Agent: weather-transformer
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
2. **Sequential Execution**: Agents run in order to ensure data dependencies are met
3. **Specialized Agents**: Task-specific agents with minimal tool access
4. **Command Chaining**: Simple commands can delegate to more complex workflows
5. **Configurable Transformations**: Rules stored externally in input files
6. **Structured Output**: Results formatted consistently in output files
