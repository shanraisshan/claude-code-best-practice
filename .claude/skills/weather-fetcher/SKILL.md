---
name: weather-fetcher
description: Instructions for fetching current weather temperature data for Karachi, Pakistan from wttr.in API
---

# Weather Fetcher Skill

This skill provides instructions for fetching current weather data.

## Task

Fetch the current temperature for Karachi, Pakistan in degrees Celsius (Centigrade).

## Instructions

1. **Fetch Weather Data**: Use the WebFetch tool to get current weather data for Karachi from wttr.in API:
   - URL: `https://wttr.in/Karachi?format=j1`
   - This returns JSON format weather data

2. **Extract Temperature**: From the JSON response, extract the current temperature in Celsius from the `current_condition` section.

3. **Store Result**: Keep the temperature value for the next step (transformation).

## Expected Output

After completing this skill's instructions:
```
Current Karachi Temperature: [X]°C
Status: Successfully fetched weather data
```

## Notes

- Only fetch the temperature, do not perform any transformations yet
- Use wttr.in as it provides reliable, free weather data
- Return just the numeric temperature value clearly
