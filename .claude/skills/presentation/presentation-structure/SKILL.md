---
name: presentation-structure
description: Knowledge about the presentation slide format, weight system, navigation, and section structure
---

# Presentation Structure Skill

Knowledge about how the presentation at `presentation/index.html` is structured.

## File Location

`presentation/index.html` — a single-file HTML presentation with inline CSS and JS.

## Slide Format

Each slide is a div with `data-slide` (sequential number) and optional `data-level` (journey level at transition points):

```html
<!-- Regular slide — inherits level from previous data-level slide -->
<div class="slide" data-slide="12">
    <h1>Slide Title</h1>
    <!-- content -->
</div>

<!-- Level transition slide — sets new level for this slide and all following -->
<div class="slide section-slide" data-slide="10" data-level="low">
    <h1>Section Name</h1>
    <p class="section-desc">Level: Low — description of this section</p>
</div>

<!-- Title slide (centered) -->
<div class="slide title-slide" data-slide="1">
    <h1>Presentation Title</h1>
    <p class="subtitle">Subtitle text</p>
</div>
```

## Journey Bar Level System

The presentation uses a 4-level system instead of cumulative percentages:

- Levels are set via `data-level` attribute on key transition slides (section dividers)
- All slides after a `data-level` slide inherit that level until the next transition
- The journey bar fills to 25% / 50% / 75% / 100% for Low / Medium / High / Pro respectively
- The bar is hidden on slide 1 (title slide); from slide 2 onward the bar is shown
- Slides before the first `data-level` (slides 2–9) show an empty bar (no level yet set)
- A `.level-badge` is JS-injected on the `<h1>` of slides that carry `data-level` — do NOT hardcode in HTML

### Level Transitions by Section

| Section | Slide Range | data-level | Bar Height |
|---------|-------------|------------|------------|
| Part 0: Introduction | Slides 1-4 | (none) | hidden / empty |
| Part 1: Prerequisites | Slides 5-9 | (none) | empty |
| Part 2: Better Prompting | Slides 10-17 | `low` | 25% |
| Part 3: Project Memory | Slides 18-24 | `medium` | 50% |
| Part 4: Structured Workflows | Slides 25-28 | (inherits medium) | 50% |
| Part 5: Domain Knowledge | Slides 29-33 | `high` | 75% |
| Part 6: Agentic Engineering | Slides 34-46 | `high` | 75% |
| Appendix | Slides 47+ | (inherits high) | 75% |

## Navigation System

- `goToSlide(n)` — used in TOC links, must match actual `data-slide` numbers
- `totalSlides` is auto-computed from DOM (`document.querySelectorAll('[data-slide]').length`)
- Arrow keys, Space, and touch swipe for navigation
- Slide counter shows `current / total` at bottom-left

## Renumbering Rules

After adding, removing, or reordering slides:
1. Renumber ALL `data-slide` attributes sequentially starting from 1
2. Update all `goToSlide()` calls in the TOC/Journey Map slide
3. The JS `totalSlides` auto-computes — no manual update needed
4. Verify no gaps or duplicates exist

## Section Divider Format

Section dividers use the `section-slide` class. Level-transition section dividers carry `data-level` and show the level name in the description:

```html
<div class="slide section-slide" data-slide="10" data-level="low">
    <p class="section-number">Part 2</p>
    <h1>Better Prompting</h1>
    <p class="section-desc">Level: Low — effective prompting for real results.</p>
</div>
```

The JS will inject a `.level-badge` (e.g., "→ Low") into the `<h1>` at runtime when the level transitions — do not add these manually in HTML.
