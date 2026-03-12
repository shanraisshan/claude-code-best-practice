---
name: time-svg-creator
description: Creates an SVG time card showing the current time for Dubai. Writes the SVG to agent-teams/output/dubai-time.svg and updates agent-teams/output/output.md.
allowed-tools: Write, Read
---

# Time SVG Creator Skill

Creates a visual SVG time card for Dubai, UAE and writes the output files.

## Task

You will receive three fields from the calling context: `time`, `timezone`, and `formatted`. Create an SVG time card and write both the SVG and a markdown summary.

## Instructions

1. **Create SVG** — Use the SVG template from [reference.md](reference.md), replacing placeholders with actual values
2. **Write SVG file** — Write to `agent-teams/output/dubai-time.svg`
3. **Write summary** — Write to `agent-teams/output/output.md` using the markdown template from [reference.md](reference.md)

## Rules

- Use the EXACT time values provided — NEVER re-fetch or recalculate
- The SVG must be self-contained and valid
- Both output files go in the `agent-teams/output/` directory

## Additional resources

- For SVG template, output template, and design specs, see [reference.md](reference.md)
- For example input/output pairs, see [examples.md](examples.md)
