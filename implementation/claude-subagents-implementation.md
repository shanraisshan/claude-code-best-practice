# Sub-agents Implementation

![Last Updated](https://img.shields.io/badge/Last_Updated-Feb_28%2C_2026_07%3A59_PM_PKT-white?style=flat&labelColor=555)

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#weather-agent"><img src="../!/tags/implemented-hd.svg" alt="Implemented"></a>

The weather agent is implemented in this repo as an example of the **Command → Agent → Skills** architecture pattern.

---

## Weather Agent

**File**: [`.claude/agents/weather.md`](../.claude/agents/weather.md)

```yaml
---
name: weather
description: Use this agent PROACTIVELY when you need to fetch and transform
  weather data for Karachi, Pakistan. This agent fetches real-time temperature
  from wttr.in API and applies transformation rules from
  orchestration-workflow/input.md, writing results to
  orchestration-workflow/output.md.
tools: WebFetch, Read, Write
model: sonnet
color: green
memory: project
skills:
  - weather-fetcher
  - weather-transformer
---

# Weather Agent

You are a specialized weather agent that fetches and transforms weather data
for Karachi, Pakistan.

## Your Task

Execute the weather workflow by following the instructions from your preloaded
skills sequentially:

1. **First**: Follow the `weather-fetcher` skill instructions to fetch the
   current temperature
2. **Then**: Follow the `weather-transformer` skill instructions to apply
   transformations and write results
3. **Finally**: Update your agent memory with the reading details for
   historical tracking

...
```

The agent has two skills preloaded (`weather-fetcher` and `weather-transformer`) that provide step-by-step instructions for fetching from the wttr.in API and applying transformation rules.

---

## How to Use

```bash
$ claude
> What is the weather in Karachi?
```

---

<a href="https://github.com/shanraisshan/claude-code-best-practice#orchestration-workflow"><img src="../!/tags/orchestration-workflow-hd.svg" alt="Orchestration Workflow"></a>

The weather agent is the **Agent** in the Command → Agent → Skills orchestration pattern. It receives the workflow from the `/weather-orchestrator` command and executes it using two preloaded skills (`weather-fetcher`, `weather-transformer`) within a single execution context.

<p align="center">
  <img src="../!/command-skill-agent-flow.svg" alt="Command Skill Agent Architecture Flow" width="100%">
</p>

| Component | Role | This Repo |
|-----------|------|-----------|
| **Command** | Entry point, user interaction | `/weather-orchestrator` |
| **Agent** | Orchestrates workflow with preloaded skills | `weather` agent |
| **Skills** | Domain knowledge injected at startup | `weather-fetcher`, `weather-transformer` |

