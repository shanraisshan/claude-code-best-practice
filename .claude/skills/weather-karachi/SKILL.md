---
name: weather-karachi
description: Fetch and transform weather data for Karachi. Use when the user asks about Karachi weather, temperature data, or wants to run the weather workflow.
model: haiku
---

# Weather Karachi Skill

Fetch the current temperature for Karachi, Pakistan and apply transformations.

## Workflow

1. Use the AskUserQuestion tool to ask the user whether they want the temperature in Celsius or Fahrenheit
2. Use the weather-fetcher subagent to retrieve the current temperature from wttr.in API in the requested unit
3. Use the weather-transformer subagent to read transformation rules from input/input.md and apply them to the temperature
4. Write the results to output/output.md

## Subagent Invocation

Use the Task tool to invoke subagents sequentially (not in parallel) to maintain data dependencies.

### Step 1: Fetch Temperature

Use the Task tool to invoke the weather-fetcher subagent:
- subagent_type: weather-fetcher
- description: Fetch Karachi temperature
- prompt: Fetch the current temperature for Karachi, Pakistan in [unit requested by user] from wttr.in API. Return the numeric temperature value in your final report.
- model: haiku

Wait for the subagent to complete and extract the temperature value from its final report.

### Step 2: Transform Temperature

Use the Task tool to invoke the weather-transformer subagent:
- subagent_type: weather-transformer
- description: Transform temperature
- prompt: Apply transformation rules from input/input.md to the temperature value: [X] degrees. Write formatted results to output/output.md.
- model: haiku

Wait for the subagent to complete.

## Critical Requirements

1. **Use Task Tool Only**: DO NOT use bash commands to invoke subagents. You must use the Task tool.
2. **Sequential Execution**: Launch subagents one at a time, wait for completion before launching the next.
3. **Data Passing**: Extract the temperature from weather-fetcher's report and pass it to weather-transformer's prompt.

## Output Summary

Provide a clear summary to the user showing:
- Temperature unit requested
- Original temperature fetched
- Transformation rule applied (from input/input.md)
- Final transformed result (written to output/output.md)
