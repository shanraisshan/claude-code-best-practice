---
description: Query your Lightspeed POS — ask about sales, inventory, customers, employees, or any retail data
argument-hint: [your question about your store]
model: haiku
allowed-tools:
  - Agent
  - Skill
  - AskUserQuestion
  - Read
---

# Lightspeed POS Orchestrator

Query your Lightspeed Retail POS system using natural language. Fetches live data and creates formatted reports.

## Workflow

### Step 1: Understand the Request

If the user provided an argument (e.g., `/lightspeed how are sales today?`), use that as the query.

If no argument was provided, use the AskUserQuestion tool to ask:
- **Question**: "What would you like to know about your store?"
- **Options**:
  - "Today's sales summary" — Full sales dashboard with hourly breakdown
  - "Inventory alerts" — Low stock, out of stock, and overstock items
  - "Customer insights" — Top customers, new customers, at-risk customers
  - "Employee performance" — Sales per employee, hours worked, efficiency

### Step 2: Fetch Data from Lightspeed

Use the Agent tool to invoke the lightspeed-agent:

```
Agent(
  subagent_type: "lightspeed-agent",
  description: "Fetch Lightspeed POS data",
  prompt: "[user's query]. Fetch the relevant data from the Lightspeed R-Series API and return structured results. The agent has a preloaded skill (lightspeed-api-fetcher) with all endpoint details.",
  model: "sonnet"
)
```

Wait for the agent to complete and capture the returned data.

### Step 3: Create Report

Use the Skill tool to invoke the report creator:

```
Skill(skill: "lightspeed-report-creator")
```

The skill will use the data from Step 2 (available in context) to create a formatted markdown report in `lightspeed-pos/reports/`.

### Step 4: Summary

Tell the user:
- What data was fetched
- Key highlights (top-line numbers, alerts)
- Where the full report was saved (`lightspeed-pos/reports/{type}.md`)

## Quick Queries (Skip Report)

For simple questions like "what's my most expensive item?" or "how many customers do I have?", the agent can answer directly without creating a full report. Use your judgment — only invoke the report creator for dashboard-style queries.

## Critical Requirements

1. **Use Agent tool**: DO NOT use bash to invoke agents. Use the Agent tool.
2. **Use Skill tool**: Invoke the report creator via the Skill tool.
3. **Sequential flow**: Fetch data BEFORE creating reports.
4. **Error handling**: If the agent reports auth errors, tell the user to check `lightspeed-pos/.env`.
