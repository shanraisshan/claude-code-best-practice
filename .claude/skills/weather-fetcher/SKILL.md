---
name: weather-fetcher
description: Fetches current weather temperature data for Dubai, UAE from the Open-Meteo API. Use when an agent or workflow needs real-time Dubai temperature data, weather conditions, or current climate information for Dubai.
user-invocable: false
metadata:
  author: claude-code-best-practice
  version: 1.0.0
  category: weather
---

# Weather Fetcher

## Instructions

1. **Fetch Weather Data**: Use the WebFetch tool to get current weather data for Dubai from the Open-Meteo API.

   For **Celsius**:
   - URL: `https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=celsius`

   For **Fahrenheit**:
   - URL: `https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=fahrenheit`

2. **Extract Temperature**: From the JSON response, extract the current temperature:
   - Field: `current.temperature_2m`
   - Unit label is in: `current_units.temperature_2m`

3. **Return Result**: Return the temperature value and unit clearly.

## Example

**Input**: Fetch temperature in Celsius

**API Response**:
```json
{
  "current": {
    "temperature_2m": 30.8
  },
  "current_units": {
    "temperature_2m": "°C"
  }
}
```

**Expected Output**:
```
Current Dubai Temperature: 30.8°C
Unit: Celsius
```

## Troubleshooting

- **API unreachable**: If Open-Meteo returns an error or times out, retry once after a brief pause. If it still fails, report the error clearly — do not invent temperature values.
- **Unexpected JSON structure**: If the `current.temperature_2m` field is missing, log the full response and report the issue.
- **Unit mismatch**: Always verify that `current_units.temperature_2m` matches the requested unit (Celsius or Fahrenheit).

## Notes

- Only fetch the temperature, do not perform any transformations or write any files
- Open-Meteo is free, requires no API key, and uses coordinate-based lookups for reliability
- Dubai coordinates: latitude 25.2048, longitude 55.2708
- Support both Celsius and Fahrenheit based on the caller's request
