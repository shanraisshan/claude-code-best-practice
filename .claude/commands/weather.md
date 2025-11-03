---
description: Fetch and transform weather data for a city
argument-hint: <city-name>
model: haiku
---

# Weather Command

Fetch the current temperature for ${1:-Karachi}, Pakistan and apply transformations.

## Workflow

1. Use the weather-fetcher agent to retrieve the current temperature from wttr.in API
2. Use the weather-transformer agent to read transformation rules from input/input.md and apply them to the temperature
3. Write the results to output/output.md

Launch the agents sequentially (not in parallel) and provide a clear summary showing:
- Original temperature
- Transformation applied
- Final result
