# Skills Implementation

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar_02%2C_2026-white?style=flat&labelColor=555)

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#weather-svg-creator"><img src="../!/tags/implemented-hd.svg" alt="Implemented"></a>

Two skills are implemented in this repo as part of the **Command → Agent → Skill** architecture pattern, demonstrating two distinct skill invocation patterns: **agent skills** (preloaded) and **skills** (invoked directly).

---

## Weather SVG Creator (Skill)

**File**: [`.claude/skills/weather-svg-creator/SKILL.md`](../.claude/skills/weather-svg-creator/SKILL.md)

```yaml
---
name: weather-svg-creator
description: Creates an SVG weather card showing the current temperature for
  Dubai. Writes the SVG to orchestration-workflow/weather.svg and updates
  orchestration-workflow/output.md.
---

# Weather SVG Creator Skill

This skill creates a visual SVG weather card and writes the output files.

## Task
Create an SVG weather card displaying the temperature for Dubai, UAE,
and write it along with a summary to output files.

## Instructions
You will receive the temperature value and unit (Celsius or Fahrenheit)
from the calling context.

### 1. Create SVG Weather Card
Generate a clean SVG weather card...

### 2. Write SVG File
Write the SVG content to `orchestration-workflow/weather.svg`.

### 3. Write Output Summary
Write to `orchestration-workflow/output.md`...

...
```

This is a **skill** — invoked directly by the command via the Skill tool. It receives the temperature data from the conversation context and creates the SVG weather card and output summary.

---

## Weather Fetcher (Agent Skill)

**File**: [`.claude/skills/weather-fetcher/SKILL.md`](../.claude/skills/weather-fetcher/SKILL.md)

```yaml
---
name: weather-fetcher
description: Instructions for fetching current weather temperature data
  for Dubai, UAE from wttr.in API
user-invocable: false
---

# Weather Fetcher Skill

This skill provides instructions for fetching current weather data.

## Task
Fetch the current temperature for Dubai, UAE in the requested unit
(Celsius or Fahrenheit).

## Instructions
1. Fetch Weather Data: Use the WebFetch tool to get current weather data
   - URL: https://wttr.in/Dubai?format=j1
2. Extract Temperature: From the JSON response, extract temp_C or temp_F
3. Return Result: Return the temperature value and unit clearly.

...
```

This is an **agent skill** — preloaded into the `weather-agent` at startup via the `skills:` frontmatter field. It is not invoked directly; instead, it serves as domain knowledge injected into the agent's context. Note `user-invocable: false` which hides it from the `/` command menu.

---

## Two Skill Patterns

| Pattern | Invocation | Example | Key Difference |
|---------|-----------|---------|----------------|
| **Skill** | `Skill(skill: "name")` | `weather-svg-creator` | Invoked directly via Skill tool |
| **Agent Skill** | Preloaded via `skills:` field | `weather-fetcher` | Injected into agent context at startup |

---

## ![How to Use](../!/tags/how-to-use.svg)

**Skill** — invoke directly via slash command:
```bash
$ claude
> /weather-svg-creator
```

---

## ![How to Implement](../!/tags/how-to-implement.svg)

Ask Claude to create one for you — it will generate the markdown file with YAML frontmatter and body in `.claude/skills/my-skill/SKILL.md`

# My Skill

Instructions for what the skill does.
```