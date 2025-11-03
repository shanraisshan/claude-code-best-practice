# Weather Command

You will invoke both the weather-fetcher and weather-transformer agents to complete the weather workflow.

## Task
Execute the complete weather workflow for Karachi, Pakistan by launching two specialized agents sequentially:

1. **weather-fetcher agent**: Retrieves the current temperature from wttr.in API
2. **weather-transformer agent**: Applies transformations from input/input.md to the temperature

## Instructions

Launch both agents sequentially, waiting for each to complete before starting the next:

**Step 1:** Invoke weather-fetcher first:
   - subagent_type: "weather-fetcher"
   - description: "Fetch Karachi temperature"
   - prompt: "Fetch the current temperature for Karachi, Pakistan in Celsius from the wttr.in API. Use the WebFetch tool to retrieve the temperature from wttr.in/Karachi?format=%t and return the numeric temperature value in Celsius in your final report."
   - model: "haiku"

**Step 2:** After weather-fetcher completes, invoke weather-transformer:
   - subagent_type: "weather-transformer"
   - description: "Transform temperature data"
   - prompt: "You are the weather-transformer agent. The current temperature for Karachi, Pakistan is {temperature}°C (use the temperature value from the weather-fetcher agent). Read the transformation rules from input/input.md, apply those rules to the temperature value, and write the formatted results to output/output.md. Return a summary with the original temperature, transformation applied, and final result."
   - model: "haiku"

## Important
- Launch agents SEQUENTIALLY, not in parallel - weather fetching may take time
- Wait for weather-fetcher to complete before launching weather-transformer
- Pass the fetched temperature to the weather-transformer agent in the prompt
- Provide a clear final summary showing results from both agents
