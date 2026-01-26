---
description: Fetch and transform weather data for Karachi
model: haiku
---

# Weather Karachi Command

Fetch the current temperature for Karachi, Pakistan and apply transformations.

## Workflow


1. Use the AskUserQuestion tool to ask the user whether they want the temperature in Celsius or Fahrenheit
2. Use the weather-fetcher agent to retrieve the current temperature from wttr.in API in the requested unit
3. Use the weather-transformer agent to read transformation rules from input/input.md and apply them to the temperature
4. Write the results to output/output.md

Launch the agents sequentially (not in parallel) and provide a clear summary showing:
- Temperature unit requested
- Original temperature
- Transformation applied
- Final result
