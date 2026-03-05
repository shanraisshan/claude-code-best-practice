# Video 1: From Vibe Coding to Agentic Engineering — Workflows with Claude Code

**Total duration: ~5 minutes**

---

## INTRO — The Problem (0:00 – 0:45)

- "If you've just started with Claude Code, chances are you're doing vibe coding — typing prompts, getting results, repeating. That works, but you're only using a fraction of what Claude Code can do."
- "This repo is a curated collection of best practices that takes you from vibe coding to agentic engineering — where Claude doesn't just respond to you, it runs workflows for you."
- "In this first video, I'm covering the foundation: **Commands, Agents, and Skills** — and how they chain together into repeatable workflows."

---

## PART 1 — The Ad-Hoc Way (0:45 – 2:00)

**Demo: Vibe coding approach**

- Open a fresh Claude Code terminal
- Type: *"What is the weather in Dubai? Write it to an output file and create an SVG card for it."*
- Show the result — it works, but point out:
  - The SVG design is different every time (random colors, layout, fonts)
  - You had to sit and watch it work
  - If you run it again tomorrow, you'll get a completely different looking card
- **Open a second terminal, run the same prompt again**
  - Show the SVG side-by-side — they look different
- "This is the problem with vibe coding. It works once. But it's not repeatable. It's not a workflow you can trust."

---

## PART 2 — The Workflow Way (2:00 – 3:15)

**Demo: `/weather-orchestrator` command**

- "Now let me show you the same task, but as a workflow."
- Type: `/weather-orchestrator`
- Walk through what happens on screen:
  1. It **asks you** Celsius or Fahrenheit (structured user interaction)
  2. It **spawns a weather-agent** to fetch the temperature (you see the green agent in the terminal)
  3. It **invokes a skill** to create the SVG card
  4. Output: `orchestration-workflow/weather.svg` + `orchestration-workflow/output.md`
- "Run it again — same SVG layout, same file structure, same clean result. Every time."
- "You can kick this off and walk away. It runs autonomously."

---

## PART 3 — How It Works: Command → Agent → Skill (3:15 – 4:30)

**Explain the three building blocks**

### Commands (`.claude/commands/`)

- "A command is the entry point — like a script. It's a markdown file that tells Claude *what steps to follow*."
- "Our `weather-orchestrator` is the conductor. It asks the user a question, calls an agent, then calls a skill."
- Commands live in `.claude/commands/` and show up as `/slash-commands`

### Agents (`.claude/agents/`)

- "An agent is a specialized worker. Our `weather-agent` has one job: fetch the temperature."
- "It has a **preloaded skill** called `weather-fetcher` — that skill is injected into the agent's context at startup, so it knows exactly which API to call and how to parse the response."
- Agents have their own tools, models, and permissions. They're isolated workers.

### Skills (`.claude/skills/`)

- "A skill is a reusable set of instructions. Think of it as a recipe."
- "We have two skill patterns here:"
  - **Agent skill** (preloaded): `weather-fetcher` is baked into the agent — it's domain knowledge
  - **Invoked skill**: `weather-svg-creator` is called independently via the Skill tool — it creates the SVG card
- Skills can be background knowledge OR standalone actions

### Flow Diagram (optionally show on screen)

```
/weather-orchestrator (Command)
    → AskUser: C° or F°?
    → weather-agent (Agent + weather-fetcher skill)
    → weather-svg-creator (Skill)
    → Output: weather.svg + output.md
```

---

## PART 4 — Why This Matters / Wrap-up (4:30 – 5:00)

- "The difference between vibe coding and agentic engineering is **structure**."
  - Vibe coding: you type, you hope, you get something.
  - Agentic engineering: you define a workflow once, and it runs the same way every time.
- "Commands, Agents, and Skills are the three building blocks. Once you understand these, you can build any workflow."
- "This repo has more patterns — hooks, multi-agent teams, CLAUDE.md configuration — we'll cover those in upcoming videos."
- "Link to the repo is in the description. Star it, clone it, and start building your own workflows."

---

## Quick Reference

| Concept | Location | Purpose |
|---------|----------|---------|
| Command | `.claude/commands/` | Entry point, orchestration, `/slash-command` |
| Agent | `.claude/agents/` | Specialized worker with own tools & model |
| Skill | `.claude/skills/` | Reusable instructions (preloaded or invoked) |
