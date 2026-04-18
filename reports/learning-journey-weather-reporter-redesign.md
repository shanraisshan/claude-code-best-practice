# Learning Journey — Weather Reporter Redesign Plan

← Back to [README](../README.md)

## Overview

Redesign all slides from slide 7 onward around a single running example: the **weather reporter agent**. The narrative arc matches the TOC visible order (Agents → Skills → Context → CLAUDE.md → Commands+Workflow), letting the audience meet the weather reporter first, then understand what they know, how they think, what rules they follow, and finally how to trigger them with one command.

---

## 1. Current → New Section Map

| Current section | Current slides | Action | New position |
|---|---|---|---|
| Topic 1: Context | 7-11 (section at 7) | Move to Topic 3 | slides 17-21 |
| Topic 2: CLAUDE.md | 12-17 (section at 12) | Move to Topic 4 | slides 22-27 |
| Topic 3: Agents | 18-23 (section at 18) | Move to Topic 1 | slides 7-12 |
| Topic 4: Skills | 24-29 (section at 24) | Move to Topic 2 | slides 13-18 |
| Topic 5: Commands | 30-32 (section at 30) | Merge with Workflow into Topic 5 | slides 28-32 |
| Topic 6: Workflow | 33-36 (section at 33) | Merged into Commands section | (no separate section slide) |
| Closing slide | 37 | Keep, update subtitle | slide 33 |

**New total: 33 slides** (same as current 37 minus the Workflow section slide and 3 Workflow content slides that merge into the Commands section, which grows by those 3 slides).

Wait — let me recount:

Current: slides 7-37 = 31 slides.
- Agents section: 6 slides (18-23) → becomes Topic 1 (7-12)
- Skills section: 6 slides (24-29) → becomes Topic 2 (13-18)
- Context section: 5 slides (7-11) → becomes Topic 3 (19-23)
- CLAUDE.md section: 6 slides (12-17) → becomes Topic 4 (24-29)
- Commands+Workflow merged: 3 + 1 section + 4 content = Commands (3) + Workflow (1 section + 3 content) = 7 slides → becomes Topic 5 (30-36)
- Closing: 1 slide (37)

**New total: 37 slides.** (No slides are dropped; the Workflow section slide becomes part of the merged Commands+Workflow section — we keep it as a sub-section or drop its `data-level` to avoid a second section divider.)

**Decision**: Keep all 37 slides. Drop `data-level` on the old Workflow section divider (slide 33) so it's treated as a content slide, not a section divider. Commands section covers 30-36. The Workflow section divider becomes a visual "chapter header" inside the Commands section.

Actually, simpler: keep the Workflow section divider as a content slide with no `data-level`. The journey bar stays at `commands` level. The section number text changes from "Topic 6" to just a sub-heading.

---

## 2. New LEVELS Map (no change to keys or colors)

The new section order is: **Agents → Skills → Context → CLAUDE.md → Commands**. The `workflow` level key is retired from `data-level` use (section divider loses `data-level`). The `LEVELS` map still carries `workflow` for the journey-bar history display, but no slide triggers it.

**Revised approach**: Drop `workflow` level entirely from the LEVELS map since no slide carries `data-level="workflow"`. The journey bar tops out at `commands` (83%). That's fine — the Workflow section is presented as the climax *inside* the Commands section, not a separate topic.

Actually the journey bar filling to 83% rather than 100% for a closing section is unsatisfying. Better plan: **merge Commands+Workflow into a single section called "Commands & Workflow"** with `data-level="commands"`. Keep `workflow` level in LEVELS at 100% and assign `data-level="workflow"` to the *old* workflow section-divider slide — it becomes a visual transition inside the Commands section. This way the bar fills to 100% at the workflow slides.

**Final decision**: Keep both `commands` (83%) and `workflow` (100%) in LEVELS. Assign `data-level="commands"` to the Commands section divider and `data-level="workflow"` to the Workflow sub-section slide. Journey ticks stay as-is. This matches the current structure exactly — just the content slides reorder.

---

## 3. Slide-by-Slide Content Outline

### Slides 1-6 (unchanged)

Slides 1 (title), 2 (Boris GIF), 3 (Vibe→Agentic), 4 (What is Vibe Coding), 5 (Good vs Bad Prompts), 6 (TOC — update goToSlide targets only).

**TOC updates on slide 6:**
- Agents row: `goToSlide(7)` (was 18)
- Skills row: `goToSlide(13)` (was 24)
- Context row: `goToSlide(19)` (was 7)
- CLAUDE.md row: `goToSlide(25)` (was 12)
- Commands row: `goToSlide(30)` (was 30 — no change)

---

### Section 1: Agents (slides 7-12) — "The Person"

**Slide 7** — Section divider (`data-level="agents"`, Topic 1)
- Title: "Agents — The Weather Reporter"
- Desc: "An agent is Claude playing a specific role. Meet the weather reporter — a specialist hired to fetch and report weather data for Dubai."

**Slide 8** — "The Restaurant Kitchen" (current slide 19)
- Content: same analogy (plain prompting = shouting in a random kitchen; agent = specific specialist)
- Update the agent example to use "weather reporter" framing throughout
- Keep the two-col card comparing plain prompting vs weather-agent

**Slide 9** — "Prompting vs. Agent — Side by Side" (current slide 20)
- Keep table intact. Already uses weather example well.

**Slide 10** — "Agents Get Their Own Brain" (current slide 21)
- Keep tip from Thariq. Tie it to: "the weather reporter works in their own brain — all that web fetching stays out of yours."

**Slide 11** — "How to Create Your Own Agent" (current slide 22)
- Keep `/agents` how-to pattern
- Update code-block to show real `weather-agent.md` path

**Slide 12** — "Agent Config Fields" (current slide 23)
- Keep field-row table. Add a callout box showing the `skills: [weather-fetcher]` field in context.

---

### Section 2: Skills (slides 13-18) — "What the Reporter Knows"

**Slide 13** — Section divider (`data-level="skills"`, Topic 2)
- Title: "Skills — What the Weather Reporter Knows"
- Desc: "Skills are the specific things the reporter has been trained to do. Our reporter has two: fetch the data, and render it as a card."

**Slide 14** — "The Training Manual" (current slide 25)
- Reframe: the weather reporter has two skills: weather-fetcher (go get the temperature) and weather-svg-creator (create the visual card).
- Replace "Shayan" example with the weather reporter's two skills.

**Slide 15** — "When to Turn Something Into a Skill" (current slide 26)
- Keep Boris tip. Add weather-fetcher and weather-svg-creator as two of the examples.

**Slide 16** — "Why Separate Agents and Skills?" (current slide 27)
- Keep two-col. Update to emphasize: weather-agent = the person, weather-fetcher = their training.

**Slide 17** — "How to Create Your Own Skill" (current slide 28)
- Keep. The code-block already shows the real `weather-fetcher` SKILL.md content — perfect.

**Slide 18** — "Skill Config Fields" (current slide 29)
- Keep. Add note: `user-invocable: false` is set on weather-fetcher because it's agent-only.

---

### Section 3: Context (slides 19-23) — "The Reporter's Brain"

**Slide 19** — Section divider (`data-level="context"`, Topic 3)
- Title: "Context — The Reporter's Brain"
- Desc: "Now that you've met the reporter and know their skills, let's understand what they can actually hold in mind at once."

**Slide 20** — "Claude's Brain" (current slide 8)
- Keep. Add one sentence tying to weather reporter: "When the weather-agent is dispatched, it gets its own fresh brain — and weather-fetcher is pinned into it at startup."
- Keep both diagrams (context-window.jpeg stays here).

**Slide 21** — "What Loads at Session Start" (current slide 9)
- Keep. Tie to weather reporter: "At startup, Claude knows *about* weather-fetcher (description only). When the command runs, the full skill content is loaded into the agent's brain."
- Keep context.jpg here.

**Slide 22** — "Keep the Brain Clear" (current slide 10)
- Keep branching-point table.

**Slide 23** — "How to Manage Your Context" (current slide 11)
- Keep `/context`, `/compact`, `/clear` how-to.

---

### Section 4: CLAUDE.md (slides 24-29) — "The Pocket Rulebook"

**Slide 24** — Section divider (`data-level="claude-md"`, Topic 4)
- Title: "CLAUDE.md — The Reporter's Pocket Rulebook"
- Desc: "The reporter consults this at the start of every shift — even though their brain resets overnight."

**Slide 25** — "The Employee Handbook" (current slide 13)
- Keep. Update to weather-reporter framing: CLAUDE.md is the rulebook the reporter reads before going on air — "always report in Celsius unless asked, always cite the source."

**Slide 26** — "How to Create Your CLAUDE.md" (current slide 14)
- Keep `/init` how-to.

**Slide 27** — "Grow CLAUDE.md With Every Mistake" (current slide 15)
- Keep Boris tip.

**Slide 28** — "What Goes in CLAUDE.md" (current slide 16)
- Keep code-block. Weather reporter touch: add a comment showing weather-specific rules.

**Slide 29** — "How CLAUDE.md Loads" (current slide 17)
- Keep.

---

### Section 5: Commands + Workflow (slides 30-36) — "The Trigger"

**Slide 30** — Section divider (`data-level="commands"`, Topic 5)
- Title: "Commands — The Trigger"
- Desc: "One word kicks off the whole chain. `/weather-orchestrator` → agent → skill → SVG card."

**Slide 31** — "Commands — The Entry Point" (current slide 31)
- Keep. Good intro. Already references weather-orchestrator.

**Slide 32** — "How to Create Your Own Command" (current slide 32)
- Keep. Code-block already shows weather-orchestrator.md.

**Slide 33** — Workflow sub-section (was slide 33, `data-level="workflow"`)
- Change section-number text from "Topic 6" to "Putting It All Together"
- Keep `data-level="workflow"` so bar fills to 100%.
- Update title to: "Workflow — All Five Pieces Together"
- Desc: "Watch the weather reporter example run from one keystroke to SVG card output."

**Slide 34** — "Command → Agent → Skill" (current slide 34)
- Keep code-block flow diagram. It's already perfect.

**Slide 35** — "Two Ways Skills Are Used" (current slide 35)
- Keep two-col comparing preloaded vs direct invocation.

**Slide 36** — "How to Wire Your Own Workflow" (current slide 36)
- Keep. Already uses weather workflow as the example.

**Slide 37** — Closing (current slide 37)
- Keep. Update subtitle to: "Five concepts, one running example"
- Update body text to reference the weather reporter arc.

---

## 4. Asset Reuse Inventory

| Asset | Current location | New location | Action |
|---|---|---|---|
| `context-window.jpeg` | Slide 8 (Claude's Brain) | Slide 20 (same content, renumbered) | Survives — no change needed |
| `context.jpg` | Slide 9 (What Loads at Session Start) | Slide 21 (same content, renumbered) | Survives — no change needed |
| `../../!/claude-jumping.svg` | Slides 1, header | Unchanged | No action |
| `../../!/root/boris-slider.gif` | Slide 2 | Unchanged | No action |

Both context diagrams are preserved exactly where they are — the slides that contain them simply get renumbered (8→20, 9→21).

---

## 5. Bookkeeping Impact

### New section-divider positions and `data-level` assignments

| Slide | Topic | `data-level` |
|---|---|---|
| 7 | Agents | `agents` |
| 13 | Skills | `skills` |
| 19 | Context | `context` |
| 25 | CLAUDE.md | `claude-md` |
| 30 | Commands | `commands` |
| 33 | Workflow sub-section | `workflow` |

### TOC `goToSlide` targets on slide 6

| Row | Topic | Old target | New target |
|---|---|---|---|
| Row 1 | Agents | 18 | 7 |
| Row 2 | Skills | 24 | 13 |
| Row 3 | Context | 7 | 19 |
| Row 4 | CLAUDE.md | 12 | 25 |
| Row 5 | Commands | 30 | 30 |

### Journey ticks (no change)

The journey tick rail is already ordered top→bottom as: Workflow, Commands, Skills, Agents, CLAUDE.md, Context. This is the *reverse* of the arc order (top = highest level = last achieved). No change needed.

### LEVELS map (no change)

All 6 level keys (`context`, `claude-md`, `agents`, `skills`, `commands`, `workflow`) remain. No keys added or removed.

---

## 6. Implementation Approach

The HTML is one large file. The slides are in the wrong order for the new arc. The cleanest implementation is to:

1. Cut the slide divs and paste them in new order (7-12 = old 18-23, 13-18 = old 24-29, 19-23 = old 7-11, 24-29 = old 12-17, 30-37 unchanged).
2. Re-number all `data-slide` attributes sequentially.
3. Update the section-slide `data-level` attributes.
4. Update the section-number text and h1 on section dividers.
5. Update TOC `goToSlide` targets on slide 6.
6. Update the Workflow section-slide (old 33) section-number text.
7. Make targeted content edits to weather-reporter framing where called for.

Total slide count: **37** (unchanged).

---

## 7. Ambiguities — None Load-Bearing

All ambiguities have been resolved above. Proceeding directly to implementation.
