# Agent Orchestration Best Practices

## Problem: Sub-agents Not Invoking

### Issue Description

When creating orchestrator agents that coordinate multiple sub-agents, a common mistake is using bash commands or other tools instead of the proper `Task` tool to invoke sub-agents. This results in the sub-agents not being invoked at all.

### Root Cause

**Incorrect Implementation:**

The orchestrator agent was trying to use bash commands to invoke sub-agents:
- `claude task --agent weather-fetcher "Fetch temperature"`

The problem is that `claude task` is not a valid bash command in the Claude Code environment. Agents cannot invoke other agents through bash/CLI commands. Instead, they must use the `Task` tool programmatically.

### Solution

**Correct Implementation:**

1. **Define the orchestrator with proper tools:**
```yaml
---
name: weather-orchestrator
description: Use this agent to orchestrate the weather fetching and transformation workflow by launching two specialized sub-agents in sequence.
tools: Task
model: haiku
color: green
---
```

2. **Use the Task tool properly in the agent's instructions:**

The agent must be explicitly instructed to use the Task tool with proper parameters. Instead of vague instructions like "Use the Task tool to launch the weather-fetcher agent", provide specific, clear instructions:

```markdown
## Step 1: Launch weather-fetcher agent

Use the Task tool to invoke the weather-fetcher subagent:
- subagent_type: weather-fetcher
- description: Fetch Karachi temperature
- prompt: Fetch the current temperature for Karachi, Pakistan in Celsius from wttr.in API. Return the numeric temperature value in your final report.
- model: haiku

Wait for the agent to complete and extract the temperature value from its final report.
```

3. **Key Requirements for Orchestrator Agents:**

   a. **Explicit Tool Usage**: State clearly "DO NOT use bash commands or any other tools. You must use the Task tool to invoke sub-agents."

   b. **Parameter Specification**: List all required parameters explicitly:
      - `subagent_type`: The exact agent name
      - `description`: A short 3-5 word description
      - `prompt`: Detailed instructions for the sub-agent
      - `model`: The model to use (typically "haiku" for efficiency)

   c. **Sequential Execution**: For sequential workflows, explicitly state "Launch agents one at a time, wait for completion before launching the next."

   d. **Data Passing**: Provide clear instructions on how to extract data from one agent's report and pass it to the next agent's prompt.

### Before and After Comparison

#### Before (Broken):
```markdown
## Your Task

1. **Launch weather-fetcher agent**: Use the Task tool to launch the weather-fetcher agent
   - This agent will fetch the current temperature for Karachi, Pakistan in Celsius
   - Wait for the agent to complete and capture the temperature value from its report
```

**Why it failed:** Too vague. The agent interpreted "launch" as running a bash command instead of using the Task tool properly.

#### After (Working):
```markdown
## Step 1: Launch weather-fetcher agent

Use the Task tool to invoke the weather-fetcher subagent:
- subagent_type: weather-fetcher
- description: Fetch Karachi temperature
- prompt: Fetch the current temperature for Karachi, Pakistan in Celsius from wttr.in API. Return the numeric temperature value in your final report.
- model: haiku

Wait for the agent to complete and extract the temperature value from its final report.

## Critical Requirements

1. **Use Task Tool Only**: DO NOT use bash commands or any other tools. You must use the Task tool to invoke sub-agents.
```

**Why it works:**
- Explicitly lists all Task tool parameters
- Clearly states NOT to use bash commands
- Provides specific parameter values

### Testing the Fix

After updating the orchestrator agent definition, test it by invoking the orchestrator:

```bash
# Via slash command
/weather

# Or directly via Task tool
Task(subagent_type="weather-orchestrator", description="Run weather workflow", prompt="Orchestrate the complete weather workflow", model="haiku")
```

The orchestrator should now:
1. Successfully invoke weather-fetcher using the Task tool
2. Extract the temperature from the fetcher's report
3. Invoke weather-transformer with the temperature value
4. Report the complete workflow results

### Key Takeaways

1. **Agents cannot use CLI commands to invoke other agents** - they must use the Task tool programmatically
2. **Be explicit with tool usage** - clearly state which tool to use and which tools NOT to use
3. **Provide complete parameter specifications** - list all required parameters with example values
4. **Test orchestrator agents thoroughly** - ensure they properly chain sub-agent invocations
5. **Use clear, unambiguous language** - avoid terms like "launch" or "run" which could be interpreted as bash commands

### Color Configuration

The `color` parameter in agent frontmatter (e.g., `color: green`) controls the color of the agent's output in the CLI, making it easier to visually distinguish between different agents' outputs. This is purely a display feature and does not affect the agent's functionality or the content it produces.
