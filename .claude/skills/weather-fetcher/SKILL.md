---
name: weather-fetcher
description: Instructions for fetching current weather temperature data for Dubai, UAE from wttr.in API
user-invocable: false
---

# Weather Fetcher Skill

This skill provides instructions for fetching current weather data.

## Task

Fetch the current temperature for Dubai, UAE in the requested unit (Celsius or Fahrenheit).

## Instructions

1. **Fetch Weather Data**: Use the WebFetch tool to get current weather data for Dubai from wttr.in API:
   - URL: `https://wttr.in/Dubai?format=j1`
   - This returns JSON format weather data

2. **Extract Temperature**: From the JSON response, extract the current temperature:
   - For Celsius: use `temp_C` from the `current_condition` section
   - For Fahrenheit: use `temp_F` from the `current_condition` section

3. **Return Result**: Return the temperature value and unit clearly.

## Expected Output

After completing this skill's instructions:
```
Current Dubai Temperature: [X]°[C/F]
Unit: [Celsius/Fahrenheit]
```

## Notes

- Only fetch the temperature, do not perform any transformations or write any files
- Use wttr.in as it provides reliable, free weather data
- Return the numeric temperature value and unit clearly
- Support both Celsius and Fahrenheit based on the caller's request
