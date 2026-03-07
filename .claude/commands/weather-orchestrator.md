---
description: Fetch weather data for Dubai and create an SVG weather card
model: haiku
---

# Weather Orchestrator Command

Fetch the current temperature for Dubai, UAE and create a visual SVG weather card.

## Workflow

### Step 1: Ask User Preference

Use the AskUserQuestion tool to ask the user whether they want the temperature in Celsius or Fahrenheit.

### Step 2: Fetch Weather Data

Use the Task tool to invoke the weather agent:
- subagent_type: weather-agent
- description: Fetch Dubai weather data
- prompt: Fetch the current temperature for Dubai, UAE in [unit requested by user]. Return the numeric temperature value and unit. The agent has a preloaded skill (weather-fetcher) that provides the detailed instructions.
- model: haiku

Wait for the agent to complete and capture the returned temperature value and unit.

### Step 3: Create SVG Weather Card

Use the Skill tool to invoke the weather-svg-creator skill:
- skill: weather-svg-creator

The skill will use the temperature value and unit from Step 2 (available in the current context) to create the SVG card and write output files.

## Critical Requirements

1. **Use Task Tool for Agent**: DO NOT use bash commands to invoke agents. You must use the Task tool.
2. **Use Skill Tool for SVG Creator**: Invoke the SVG creator via the Skill tool, not the Task tool.
3. **Pass User Preference**: Include the user's temperature unit preference when invoking the agent.
4. **Sequential Flow**: Complete each step before moving to the next.

## Output Summary

Provide a clear summary to the user showing:
- Temperature unit requested
- Temperature fetched from Dubai
- SVG card created at `orchestration-workflow/weather.svg`
- Summary written to `orchestration-workflow/output.md`
