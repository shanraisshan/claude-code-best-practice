---
name: weather-svg-creator
description: Creates an SVG weather card showing the current temperature for Dubai. Writes the SVG to orchestration-workflow/weather.svg and updates orchestration-workflow/output.md.
---

# Weather SVG Creator Skill

Creates a visual SVG weather card for Dubai, UAE and writes the output files.

## Task

You will receive a temperature value and unit (Celsius or Fahrenheit) from the calling context. Create an SVG weather card and write both the SVG and a markdown summary.

## Instructions

1. **Create SVG** — Use the SVG template from [reference.md](reference.md), replacing placeholders with actual values
2. **Write SVG file** — Read then write to `orchestration-workflow/weather.svg`
3. **Write summary** — Read then write to `orchestration-workflow/output.md` using the markdown template from [reference.md](reference.md)

## Rules

- Use the exact temperature value and unit provided — do not re-fetch or modify
- The SVG must be self-contained and valid
- Both output files go in the `orchestration-workflow/` directory

## Additional resources

- For SVG template, output template, and design specs, see [reference.md](reference.md)
- For example input/output pairs, see [examples.md](examples.md)
