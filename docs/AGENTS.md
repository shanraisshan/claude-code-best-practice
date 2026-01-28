# Subagent Orchestration Best Practices

## Problem: Subagents Not Invoking

### Issue Description

When creating orchestrator skills or subagents that coordinate multiple subagents, a common mistake is using bash commands or other tools instead of the proper `Task` tool to invoke subagents. This results in the subagents not being invoked at all.

### Root Cause

**Incorrect Implementation:**

The orchestrator was trying to use bash commands to invoke subagents:
- `claude task --agent weather-fetcher "Fetch temperature"`

The problem is that `claude task` is not a valid bash command in the Claude Code environment. Skills and subagents cannot invoke other subagents through bash/CLI commands. Instead, they must use the `Task` tool programmatically.

### Solution

**Correct Implementation:**

1. **Define the skill with proper instructions:**

Skills (in `.claude/skills/<name>/SKILL.md`) orchestrate workflows by invoking subagents via the Task tool:

```yaml
---
name: weather-karachi
description: Fetch and transform weather data for Karachi
model: haiku
---
```

2. **Use the Task tool properly in the skill's instructions:**

The skill must explicitly instruct to use the Task tool with proper parameters. Instead of vague instructions like "Use the Task tool to launch the weather-fetcher agent", provide specific, clear instructions:

```markdown
## Step 1: Fetch Temperature

Use the Task tool to invoke the weather-fetcher subagent:
- subagent_type: weather-fetcher
- description: Fetch Karachi temperature
- prompt: Fetch the current temperature for Karachi, Pakistan in Celsius from wttr.in API. Return the numeric temperature value in your final report.
- model: haiku

Wait for the subagent to complete and extract the temperature value from its final report.
```

3. **Key Requirements for Orchestrating Subagents:**

   a. **Explicit Tool Usage**: State clearly "DO NOT use bash commands or any other tools. You must use the Task tool to invoke subagents."

   b. **Parameter Specification**: List all required parameters explicitly:
      - `subagent_type`: The exact subagent name
      - `description`: A short 3-5 word description
      - `prompt`: Detailed instructions for the subagent
      - `model`: The model to use (typically "haiku" for efficiency)

   c. **Sequential Execution**: For sequential workflows, explicitly state "Launch subagents one at a time, wait for completion before launching the next."

   d. **Data Passing**: Provide clear instructions on how to extract data from one subagent's report and pass it to the next subagent's prompt.

### Before and After Comparison

#### Before (Broken):
```markdown
## Your Task

1. **Launch weather-fetcher agent**: Use the Task tool to launch the weather-fetcher agent
   - This agent will fetch the current temperature for Karachi, Pakistan in Celsius
   - Wait for the agent to complete and capture the temperature value from its report
```

**Why it failed:** Too vague. The skill interpreted "launch" as running a bash command instead of using the Task tool properly.

#### After (Working):
```markdown
## Step 1: Fetch Temperature

Use the Task tool to invoke the weather-fetcher subagent:
- subagent_type: weather-fetcher
- description: Fetch Karachi temperature
- prompt: Fetch the current temperature for Karachi, Pakistan in Celsius from wttr.in API. Return the numeric temperature value in your final report.
- model: haiku

Wait for the subagent to complete and extract the temperature value from its final report.

## Critical Requirements

1. **Use Task Tool Only**: DO NOT use bash commands or any other tools. You must use the Task tool to invoke subagents.
```

**Why it works:**
- Explicitly lists all Task tool parameters
- Clearly states NOT to use bash commands
- Provides specific parameter values

### Testing the Fix

After creating the skill, test it by invoking:

```bash
# Via skill invocation
/weather-karachi

# Or via Skill tool from another command
Skill(skill="weather-karachi")
```

The skill should now:
1. Successfully invoke weather-fetcher using the Task tool
2. Extract the temperature from the fetcher's report
3. Invoke weather-transformer with the temperature value
4. Report the complete workflow results

### Key Takeaways

1. **Skills and subagents cannot use CLI commands to invoke other subagents** - they must use the Task tool programmatically
2. **Be explicit with tool usage** - clearly state which tool to use and which tools NOT to use
3. **Provide complete parameter specifications** - list all required parameters with example values
4. **Test orchestrator skills thoroughly** - ensure they properly chain subagent invocations
5. **Use clear, unambiguous language** - avoid terms like "launch" or "run" which could be interpreted as bash commands

### Color Configuration

The `color` parameter in subagent frontmatter (e.g., `color: green`) controls the color of the subagent's output in the CLI, making it easier to visually distinguish between different subagents' outputs. This is purely a display feature and does not affect the subagent's functionality or the content it produces.

## Skills vs Commands vs Subagents

| Component | Location | Purpose | Invocation |
|-----------|----------|---------|------------|
| **Skill** | `.claude/skills/<name>/SKILL.md` | Orchestrate workflows, reusable procedures | `/skill-name` or `Skill(skill="name")` |
| **Command** | `.claude/commands/<name>.md` | Legacy format (still works), simple procedures | `/command-name` |
| **Subagent** | `.claude/agents/<name>.md` | Specialized task execution with isolated context | `Task(subagent_type="name", ...)` |

Skills are recommended over commands as they support additional features like supporting files, invocation control, and subagent execution.
