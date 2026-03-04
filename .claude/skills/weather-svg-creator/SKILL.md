---
name: weather-svg-creator
description: Creates an SVG weather card showing the current temperature for Dubai. Writes the SVG to orchestration-workflow/weather.svg and updates orchestration-workflow/output.md.
---

# Weather SVG Creator Skill

This skill creates a visual SVG weather card and writes the output files.

## Task

Create an SVG weather card displaying the temperature for Dubai, UAE, and write it along with a summary to output files.

## Instructions

You will receive the temperature value and unit (Celsius or Fahrenheit) from the calling context.

### 1. Create SVG Weather Card

Generate a clean SVG weather card with the following structure:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160" width="300" height="160">
  <rect width="300" height="160" rx="12" fill="#1a1a2e"/>
  <text x="150" y="45" text-anchor="middle" fill="#8892b0" font-family="system-ui" font-size="14">Unit: [Celsius/Fahrenheit]</text>
  <text x="150" y="100" text-anchor="middle" fill="#ccd6f6" font-family="system-ui" font-size="42" font-weight="bold">[value]°[C/F]</text>
  <text x="150" y="140" text-anchor="middle" fill="#64ffda" font-family="system-ui" font-size="16">Dubai, UAE</text>
</svg>
```

Replace `[Celsius/Fahrenheit]`, `[value]`, and `[C/F]` with actual values.

### 2. Write SVG File

Write the SVG content to `orchestration-workflow/weather.svg`.

### 3. Write Output Summary

Write to `orchestration-workflow/output.md`:

```markdown
# Weather Result

## Temperature
[value]°[C/F]

## Location
Dubai, UAE

## Unit
[Celsius/Fahrenheit]

## SVG Card
![Weather Card](weather.svg)
```

## Expected Input

Temperature value and unit from the weather-agent:
```
Temperature: [X]°[C/F]
Unit: [Celsius/Fahrenheit]
```

## Notes

- Use the exact temperature value and unit provided - do not re-fetch or modify
- The SVG should be a self-contained, valid SVG file
- Keep the design minimal and clean
- Both output files go in the `orchestration-workflow/` directory
