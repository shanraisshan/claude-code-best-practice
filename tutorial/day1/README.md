# Day 1 — Your First Conversation with Claude Code

[Back to Day 0 (Setup)](../day0/README.md)

---

You've installed Claude Code. Now what? This guide walks you through three levels of using it — each one gives you more control over **how** Claude does its work.

Think of it like hiring someone:
1. **Prompting** = asking a stranger on the street for directions
2. **Agents** = hiring a specialist who always does things a certain way
3. **Skills** = that specialist having specific training for specific tasks

---

## Level 1: Prompting (Just Ask)

> 🧠 **Think of it like** texting a friend who knows a lot. You ask "what's the weather in Karachi?" and they'll give you *an* answer — but you have no idea if they checked a weather app, looked out their window, or just guessed from memory.

Open your terminal and type `claude`. You're now in a conversation. Try typing:

```
what is the weather in Karachi?
```

Claude will answer — but **how** it answers is unpredictable. It might:
- Pull from its training data (which could be outdated)
- Search the web (if web tools are available)
- Give you a general answer instead of real-time data

This is perfectly fine for quick questions! But if you need **consistent, reliable results**, prompting alone isn't enough.

### When Prompting Works Great

- Asking questions about your codebase ("what does this file do?")
- Writing or editing documents ("rewrite this email to sound more professional")
- Brainstorming ideas ("give me 5 subject lines for this campaign")
- Explaining things ("explain this error message like I'm not a developer")

### The Limitation

Every time you ask "what's the weather?", Claude might fetch data differently — or not fetch real data at all. There's no guarantee it uses the same source or method twice.

---

## Level 2: Agents (The Specialist)

An **agent** is Claude playing a specific role — like assigning a job title.

> 🧠 **Think of it like** a restaurant kitchen. Without an agent, you walk into a random kitchen and shout "make me pasta!" — whoever hears you might boil instant noodles or make a five-course Italian meal. With an agent, you hire a **Pasta Chef** whose job description says: *"Always use fresh ingredients, always cook al dente, always plate it the same way."* Now you know exactly what you're getting, every single time.

Here's the same idea applied to Claude:

> **Without an agent:** You ask Claude "What's the weather in Dubai?"
> It might check its training data, search the web, or make a best guess. You don't know what it'll do.
>
> **With an agent:** A `weather-agent` has a clear job description:
> *"Always check the Open-Meteo API for Dubai. Always return the temperature in a specific format."*
> Same question, same approach, every time.

### Real Example from This Repo

This repo has a `weather-agent` — its entire job is fetching Dubai's temperature. Here's what makes it different from just prompting:

| | Prompting | Agent |
|---|---|---|
| **Source** | Could be anywhere | Always Open-Meteo API |
| **Location** | Whatever Claude picks | Always Dubai (lat: 25.2, lon: 55.3) |
| **Format** | Random paragraph | Clean temperature + unit |
| **Consistency** | Different every time | Same method, every time |

### The Takeaway

Agents give you **predictability**. Same question → same approach → same quality. That's the advantage — not that agents are smarter, but that they're **consistent**.

---

## Level 3: Skills (The Training)

A **skill** is a specific capability that an agent (or Claude itself) can use.

> 🧠 **Think of it like** a new employee's training manual. When someone joins your team, they have a role (agent), but they also go through specific training modules — how to use the CRM, how to write a proposal, how to run a standup. Each training module is a **skill**. The role tells them *what* they are; the skills tell them *how* to do specific things.

Now think about a real person:

> **Shayan** has many skills:
> - Engineering skill — can write code
> - Gaming skill — knows game mechanics
> - Reading skill — can digest and summarize long documents
>
> Each skill has its own knowledge and methods. Shayan uses the right skill for the right task.

Claude works the same way. The `weather-agent` has a skill called `weather-fetcher`:

- The **agent** (`weather-agent`) = the person with the job title "Weather Reporter"
- The **skill** (`weather-fetcher`) = the specific training on *how* to fetch weather data

The skill contains exact instructions:
1. Call this specific API URL
2. Extract the temperature from this specific field in the response
3. Return it in this specific format

### Why Separate Agents and Skills?

Because **one agent can have multiple skills**, and **one skill can be used by multiple agents**.

For example, imagine you create:
- A `daily-report-agent` that summarizes your day
- It could use a `weather-fetcher` skill (for weather) + a `calendar-reader` skill (for meetings) + a `email-summarizer` skill (for email highlights)

Skills are reusable building blocks. Agents are the people who use them.

---

## Putting It All Together

Here's the full picture:

```
Level 1: PROMPTING
You → "What's the weather?" → Claude figures it out somehow
                                (unpredictable method)

Level 2: AGENTS
You → Weather Agent → Always uses the same approach
                      (predictable method)

Level 3: SKILLS
You → Weather Agent → Uses weather-fetcher skill
                      (predictable method with specific instructions)
```

Each level adds more control:

| Level | What You Control | Best For |
|-------|-----------------|----------|
| **Prompting** | The question | Quick one-off questions |
| **Agents** | The question + who answers | Repeatable tasks |
| **Skills** | The question + who answers + how they do it | Critical workflows |

---

## What's Next?

For now, spend time at **Level 1** — just prompt. Get comfortable asking Claude questions in the terminal. The more you use it, the more you'll notice tasks that would benefit from an agent.

---

[Back to Day 0 (Setup)](../day0/README.md)
