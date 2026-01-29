---
name: weather-transformer
description: Instructions for applying mathematical transformations to temperature data based on rules in weather-orchestration/input.md
---

# Weather Transformer Skill

This skill provides instructions for transforming temperature data.

## Task

Apply mathematical transformations to a temperature value and write results to output file.

## Instructions

1. **Read Transformation Rules**: Use the Read tool to read `weather-orchestration/input.md` which contains the transformation instructions.

2. **Apply Transformation**: Apply the transformation rule to the temperature value.
   - Example: If instruction says "add +10", add 10 to the temperature
   - Example: If instruction says "multiply by 2", multiply temperature by 2

3. **Write Output**: Use the Write tool to save the transformed result to `weather-orchestration/output.md` with proper formatting.

## Expected Input

The temperature value from the weather-fetcher skill:
```
Temperature: [X]°C
```

## Expected Output

Write to `weather-orchestration/output.md` with format:
```markdown
# Weather Transformation Result

## Original Temperature
[X]°C

## Transformation Applied
[description from weather-orchestration/input.md]

## Final Result
[Y]°C

## Calculation Details
[X]°C [operation] = [Y]°C
```

## Notes

- Read the exact transformation from weather-orchestration/input.md - don't assume
- Show your work: include original value, transformation, and result
- Ensure weather-orchestration/output.md is properly formatted and readable
