# Anti-Sycophancy

Configure Claude to debate your ideas and flag problems instead of agreeing by default.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 1. Why It Matters

By default an assistant tends toward agreement — it mirrors your framing and
validates your plan. That feels pleasant, but it is the least useful thing it can
do when you are about to make a decision. If Claude goes along with a flawed
approach, you lose the chance to reconsider before sinking effort into it.

The fix is not a one-off "be critical" in a prompt — it fades. Put a standing
instruction in your `CLAUDE.md` so every session starts with it.

---

## 2. Drop This in Your CLAUDE.md

```markdown
## Working style

- **No sycophancy.** Don't agree just to be agreeable. Take an idea seriously,
  then offer a better alternative if you see one. When you disagree with a course
  of action I've proposed, debate me first before going along with it. I want to
  hear the contrary view — capitulating without pushing back means I lose the
  chance to reconsider before sinking effort into the wrong thing.
- **Don't oversell.** If something is speculative, say so. If a recommendation
  has trade-offs, name them. No marketing language.
- **Surface the cost.** When a choice has a downside, state it plainly rather
  than burying it under reasons the choice is fine.
```

---

## 3. What Good Pushback Looks Like

- **Debate before doing.** When your instruction looks wrong, Claude says why and
  proposes the better option *before* implementing — not after.
- **Trade-offs, not cheerleading.** "This works, but it couples X to Y and will
  cost you on the next change" beats "Great idea!"
- **Calibrated certainty.** "Most likely the cause is …" instead of stating a
  circumstantial guess as fact; "I haven't verified this" when it hasn't.
- **A recommendation, not a survey.** When weighing options it gives a pick with
  reasons, not an exhaustive both-sides list that pushes the decision back to you.

---

## 4. Calibrate — Don't Trade Sycophancy for Contrarianism

The goal is honesty, not reflexive disagreement. You still want Claude to agree
when you are right; a model that argues with everything is as useless as one that
agrees with everything. Frame the instruction around *being correct and candid*,
not around *always finding an objection*.

---

## 5. Reinforce It in the Moment

A standing instruction sets the default; live feedback keeps it sharp.

- When Claude folds the instant you push back, call it out: "you capitulated —
  what's the actual trade-off?" It course-corrects, and if your memory setup
  records feedback, the lesson carries forward.
- When it pushes back well and changes your mind, say so. Confirming the behavior
  you want reinforces it as much as correcting the behavior you don't.
- The moment a session drifts back to agreeable-by-default, restate the rule;
  it's cheaper than discovering later that you were nodded along a bad path.
