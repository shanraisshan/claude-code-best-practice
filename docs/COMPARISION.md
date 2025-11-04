# COMPARISION
commands, agents, skill

# Invocation Patterns Reference

This document provides a comprehensive reference for invoking Agents, Commands, and Skills across different contexts.

## Agent Invocation

Agents are specialized subprocesses that handle complex, multi-step tasks. They support both **automatic delegation** (proactive) and **explicit invocation**.

### Invocation Methods

  | From                 | How                    | Example                             | Notes |
  |----------------------|------------------------|-------------------------------------|-------|
  | Claude CLI           | **Automatic (proactive)** | User: "I just modified the auth code"<br/>Claude auto-invokes code-review agent | Requires "PROACTIVELY" keyword in agent description |
  | Claude CLI           | Explicit natural language | "use weather transformer agent to transform 50 degree" | Direct request by name |
  | /commands/Commands.md| Task tool              | `Task(subagent_type="weather-transformer", description="Transform temperature", prompt="Apply transformation to 50°C", model="haiku")` | Programmatic invocation from commands |
  | Another subagent     | Task tool              | `Task(subagent_type="weather-fetcher", description="Fetch temperature", prompt="Get Karachi temperature", model="haiku")` | Agent-to-agent orchestration |

### Automatic Delegation (Proactive Agents)

Agents can be configured for **automatic invocation** by Claude based on context. Claude analyzes:
- Your task description and request
- Each agent's `description` field
- Current context and available tools

**To enable automatic delegation**, include directive keywords in the agent's `description` field:
- `"use PROACTIVELY"`
- `"MUST BE USED"`
- `"Invoke automatically"`

**Example: Proactive Code Review Agent**
```yaml
---
name: code-reviewer
description: Use this agent PROACTIVELY after any code modifications. Expert code reviewer that analyzes quality, security, and maintainability. Invoke automatically when code is written or modified.
tools: Read, Grep, Bash
model: haiku
---
```

**Result**: When you modify code, Claude automatically invokes `code-reviewer` without explicit request.

**Example: Proactive Test Agent**
```yaml
---
name: test-runner
description: MUST BE USED when tests fail or new code is added. Automatically runs tests and fixes failures.
tools: Bash, Read, Edit
model: haiku
---
```

**Result**: Claude proactively runs tests after code changes.

## Command Invocation

Commands (slash commands) are user-defined operations that extend Claude Code with reusable prompts. They support both **automatic invocation** (by default) and **explicit activation**.

### Invocation Methods

  | From                 | How                    | Example                             | Notes |
  |----------------------|------------------------|-------------------------------------|-------|
  | Claude CLI           | **Automatic (default)** | User: "I need to write unit tests"<br/>Claude auto-invokes `/write-unit-test` if description matches | Requires `description` field; can disable with `disable-model-invocation: true` |
  | Claude CLI           | Natural language prompt | "use the weather command to fetch the weather" | Claude interprets and expands command |
  | Claude CLI           | Explicit slash command  | `/weather-karachi` | Direct command execution |
  | /agents/Agents.md    | SlashCommand tool      | `SlashCommand(command="/weather-karachi")` | Commands invoked from agents |
  | Another /command     | SlashCommand tool      | `SlashCommand(command="/weather-karachi")` | Command chaining |

### Automatic Command Invocation

By default, Claude can **automatically invoke slash commands** through the SlashCommand tool when contextually appropriate. This works similarly to proactive agents.

**How it works:**
- Commands with a `description` field are included in Claude's context
- Claude analyzes your request and matches it against available command descriptions
- If a match is found, Claude automatically invokes the command via SlashCommand tool

**To enable automatic invocation**, ensure your command has a clear `description`:
```yaml
---
description: Writes comprehensive unit tests for the specified function or module
model: haiku
---
```

**To disable automatic invocation** for a specific command:
```yaml
---
description: Administrative command for system configuration
disable-model-invocation: true
model: haiku
---
```

**Example: Auto-invoked Test Command**
```yaml
---
description: Generates and runs unit tests for new code. Use when user adds new functions or asks about testing.
model: haiku
---
```

**Result**: When you say "I added a new login function", Claude may automatically invoke this command.

**Global Control**: Use `/permissions` to disable the SlashCommand tool entirely, preventing all automatic command execution.

## Skill Invocation

Skills are model-invoked capabilities that Claude activates automatically based on context. Unlike agents and commands, skills cannot be explicitly invoked.

  | From                 | How                    | Example                             | Notes |
  |----------------------|------------------------|-------------------------------------|-------|
  | Claude CLI           | Automatic (model-driven) | User: "Extract text from this PDF"<br/>Claude autonomously activates PDF skill | No explicit invocation - Claude decides based on Skill description |
  | Claude CLI           | Natural language prompt | "Can you help me analyze this Excel file?"<br/>Claude may invoke Excel skill if available | Context-dependent activation |
  | /agents/Agents.md    | Skill tool             | `Skill(command="pdf")` | **Only if agent has Skill tool access** |
  | Another /command     | Skill tool             | `Skill(command="xlsx")` | **Only if command prompt includes Skill tool access** |
  | Another skill        | N/A                    | Skills cannot invoke other skills | Skills are single-purpose and don't orchestrate |

### Key Differences: Skills vs Agents vs Commands

| Feature              | Agent                  | Command                | Skill                  |
|----------------------|------------------------|------------------------|------------------------|
| **Invocation**       | **Both**: Automatic (with PROACTIVELY keyword) OR Explicit (Task tool/prompt) | **Both**: Automatic (default, via SlashCommand tool) OR Explicit (slash syntax) | Automatic only (model-driven) |
| **User Activation**  | Contextual (if proactive) OR "Use X agent" | Contextual (default) OR `/command-name` | Contextual request only |
| **Discoverability**  | Automatic via description (if proactive) OR user must know name | Automatic via description (default) | Automatic via description |
| **Orchestration**    | Can invoke other agents/commands | Can invoke agents/commands | Single-purpose, no orchestration |
| **Configuration**    | Use `PROACTIVELY` keyword in description for auto-invocation | `disable-model-invocation: true` to prevent auto-invocation | Description determines when to activate |
| **Opt-Out**          | Don't use PROACTIVELY keyword | Set `disable-model-invocation: true` | No opt-out mechanism |
| **Best For**         | Multi-step workflows   | Reusable procedures    | Ambient capabilities   |

## Invocation Examples by Scenario

### Scenario 1: User Wants Weather Data

**Using Command (Explicit):**
```
User: /weather-karachi
Result: Explicit command execution → agents run → output generated
```

**Using Command (Automatic - Default Behavior):**
```yaml
# Command configuration with description (automatic invocation enabled by default)
---
description: Fetch and transform weather data for Karachi
model: haiku
---
```
```
User: "What's the weather like in Karachi?"
Result: Claude automatically invokes /weather-karachi command via SlashCommand tool
Note: Commands are auto-invoked by default unless disable-model-invocation: true is set
```

**Using Agent (Explicit):**
```
User: "Use the weather-fetcher agent to get Karachi temperature"
Result: Claude invokes weather-fetcher agent → returns temperature
```

**Using Agent (Automatic/Proactive):**
```yaml
# Agent configuration with PROACTIVELY keyword
---
description: Use this agent PROACTIVELY when user asks about Karachi weather.
             Fetch current temperature from wttr.in.
---
```
```
User: "What's the weather like in Karachi?"
Result: Claude automatically invokes weather-fetcher agent → returns temperature
Note: Agent description contains "PROACTIVELY" keyword
```

**Using Skill (Automatic):**
```
User: "What's the weather in Karachi?"
Result: If weather skill exists with proper description, Claude automatically invokes it
Note: No explicit mention of "skill" needed
```

### Scenario 2: Orchestrating Multiple Steps

**Command Orchestrating Agents:**
```markdown
<!-- In /weather-karachi command -->
1. Task(subagent_type="weather-fetcher", ...)
2. Task(subagent_type="weather-transformer", ...)
```

**Agent Orchestrating Other Agents:**
```markdown
<!-- In weather-orchestrator agent -->
1. Task(subagent_type="weather-fetcher", ...)
2. Extract temperature from report
3. Task(subagent_type="weather-transformer", prompt="Transform {temperature}", ...)
```

**Skills Cannot Orchestrate:**
Skills are single-purpose and don't coordinate other capabilities.

### Scenario 3: Automatic Agent Invocation (Real-World)

**Proactive Code Review Agent:**
```yaml
---
name: code-reviewer
description: Use this agent PROACTIVELY after any code modifications. Reviews for quality, security, and best practices.
tools: Read, Grep, Bash
---
```

**User Workflow:**
```
User: "I've updated the authentication logic in auth.ts"
Claude: Automatically invokes code-reviewer agent
Agent: Reads auth.ts, analyzes changes, reports findings
User: Gets automatic code review without asking for it
```

**Proactive Test Runner Agent:**
```yaml
---
name: test-runner
description: MUST BE USED when code is modified or tests fail. Automatically runs tests and reports results.
tools: Bash, Read
---
```

**User Workflow:**
```
User: "I fixed the login bug"
Claude: Automatically invokes test-runner agent
Agent: Runs test suite, reports pass/fail status
User: Gets immediate test feedback
```

### Scenario 4: From Within Code/Prompts

**Invoking Agent from Command:**
```markdown
Use the Task tool to invoke the weather-fetcher subagent:
- subagent_type: weather-fetcher
- description: Fetch Karachi temperature
- prompt: Fetch the current temperature for Karachi, Pakistan in Celsius
- model: haiku
```

**Invoking Command from Agent:**
```markdown
Use the SlashCommand tool to execute the weather workflow:
SlashCommand(command="/weather-karachi")
```

**Invoking Skill (if Skill tool available):**
```markdown
Use the Skill tool to process the PDF:
Skill(command="pdf")
```

## Core Differences Between Commands and Agents

While commands and agents share similar invocation patterns, they have fundamental architectural differences:

### Key Architectural Differences

**1. Purpose & Complexity**
- **Commands**: Reusable prompt templates that expand into instructions. Best for **procedural workflows** with predefined steps.
- **Agents**: Autonomous subprocesses with their own tool access. Best for **complex, multi-step tasks** requiring independent decision-making.

**2. Execution Model**
- **Commands**: Expand into prompts that Claude executes in the main conversation context
- **Agents**: Run as separate subprocesses with isolated execution environments

**3. Tool Access**
- **Commands**: Execute within the main Claude context and inherit available tools
- **Agents**: Have explicitly defined tool subsets specified in their configuration (e.g., `tools: Read, Grep, Bash`)

**4. Autonomy Level**
- **Commands**: Provide instructions for Claude to follow. Can interact with users via AskUserQuestion tool to gather preferences or clarify requirements.
- **Agents**: Act autonomously to complete tasks and return final reports. **Should NOT ask questions** - they run independently and must work with the information provided in their prompt.

**5. Model Selection**
- **Commands**: Can specify which model to use for executing the command
- **Agents**: Can specify which model runs the agent subprocess (e.g., `model: haiku` for cost efficiency)

### When to Choose Each

**Choose Commands when:**
- You have a reusable prompt/workflow
- Steps are mostly predefined
- You want users to trigger via `/slash` syntax
- You need a simple procedural template

**Choose Agents when:**
- Task requires autonomous multi-step problem solving
- You need isolated tool access for security/organization
- Task should run as independent subprocess
- You want specialized capabilities (like code review, test running)

**Example from this repository:**
- `/weather-karachi` command: Orchestrates the workflow
- `weather-fetcher` agent: Autonomous subprocess that fetches temperature
- `weather-transformer` agent: Autonomous subprocess that transforms data

The command coordinates, while agents execute their specialized tasks independently.

## Summary

- **Agents**: **Both automatic and explicit invocation**
  - Automatic: Use `PROACTIVELY` or `MUST BE USED` keywords in description field
  - Explicit: Via Task tool or natural language prompt

- **Commands**: **Both automatic (default) and explicit invocation**
  - Automatic: Enabled by default when `description` field is present
  - Explicit: Via slash syntax (`/command`) or SlashCommand tool
  - Opt-out: Set `disable-model-invocation: true` to prevent automatic invocation

- **Skills**: **Automatic invocation only** - Claude decides based on context and description
  - No explicit invocation mechanism
  - No opt-out available

- **Key Design Choices**:
  - Use **proactive agents** for complex multi-step workflows that should trigger automatically
  - Use **commands (with auto-invocation)** for reusable procedures that should activate contextually
  - Use **commands (with disable-model-invocation)** for workflows requiring strict explicit control
  - Use **skills** for ambient, always-available single-purpose capabilities
  - **Orchestration difference**: Agents and commands can orchestrate other agents/commands; skills are single-purpose

