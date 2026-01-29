---
description: Fetch and transform weather data for Karachi
model: haiku
---

# Weather Orchestrator Command

Fetch the current temperature for Karachi, Pakistan and apply transformations.

## Workflow

1. Use the AskUserQuestion tool to ask the user whether they want the temperature in Celsius or Fahrenheit
2. Use the weather agent to fetch and transform the temperature data

## Agent Invocation

Use the Task tool to invoke the weather agent.

### Invoke Weather Agent

Use the Task tool to invoke the weather agent:
- subagent_type: weather
- description: Fetch and transform Karachi weather
- prompt: Fetch the current temperature for Karachi, Pakistan in [unit requested by user]. Then apply the transformation rules from weather-orchestration/input.md and write the results to weather-orchestration/output.md. The agent has preloaded skills (weather-fetcher and weather-transformer) that provide the detailed instructions.
- model: haiku

Wait for the agent to complete its workflow.

## Critical Requirements

1. **Use Task Tool Only**: DO NOT use bash commands to invoke agents. You must use the Task tool.
2. **Single Agent**: The weather agent handles both fetching and transformation using its preloaded skills.
3. **Pass User Preference**: Include the user's temperature unit preference in the prompt.

## Output Summary

Provide a clear summary to the user showing:
- Temperature unit requested
- Original temperature fetched
- Transformation rule applied (from weather-orchestration/input.md)
- Final transformed result (written to weather-orchestration/output.md)
