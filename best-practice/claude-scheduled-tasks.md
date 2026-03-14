# Scheduled Tasks Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2014%2C%202026-white?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-scheduled-tasks-implementation.md)

Run prompts on a recurring schedule, set one-time reminders, and poll deployments and builds — all within a Claude Code session.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## What Are Scheduled Tasks

Scheduled tasks let Claude re-run a prompt automatically on an interval. Tasks are **session-scoped** — they live in the current Claude Code process and are gone when you exit. For durable scheduling that survives restarts, use Desktop scheduled tasks or GitHub Actions with a `schedule` trigger.

Key characteristics:

| Property | Detail |
|----------|--------|
| **Scope** | Current session only — closing the terminal cancels everything |
| **Max duration** | Recurring tasks auto-expire after **3 days** |
| **Max tasks** | Up to **50** scheduled tasks per session |
| **Timezone** | All times interpreted in your **local timezone**, not UTC |
| **Execution** | Fires between your turns, not mid-response. Waits if Claude is busy |
| **Missed fires** | No catch-up — fires once when Claude becomes idle, not once per missed interval |
| **Jitter** | Recurring tasks fire up to 10% of their period late (capped at 15 min). One-shot tasks at `:00`/`:30` fire up to 90s early |
| **Min version** | Requires Claude Code **v2.1.72** or later |

---

## The /loop Command

The `/loop` bundled skill is the quickest way to schedule a recurring prompt.

```text
/loop 5m check if the deployment finished and tell me what happened
```

### Interval Syntax

| Form | Example | Parsed Interval |
|------|---------|-----------------|
| Leading token | `/loop 30m check the build` | Every 30 minutes |
| Trailing `every` clause | `/loop check the build every 2 hours` | Every 2 hours |
| No interval | `/loop check the build` | Defaults to every **10 minutes** |

Supported units: `s` (seconds), `m` (minutes), `h` (hours), `d` (days). Seconds are rounded up to the nearest minute (cron has one-minute granularity). Odd intervals like `7m` or `90m` are rounded to the nearest clean interval.

### Loop Over Another Command

The scheduled prompt can itself be a slash command or skill invocation:

```text
/loop 20m /review-pr 1234
```

Each time the job fires, Claude runs `/review-pr 1234` as if you had typed it.

### One-Time Reminders

For one-shot reminders, use natural language instead of `/loop`:

```text
remind me at 3pm to push the release branch
```

```text
in 45 minutes, check whether the integration tests passed
```

Claude pins the fire time to a specific minute using a cron expression, confirms when it will fire, and deletes the task after it runs.

---

## Cron Tools

Under the hood, `/loop` and natural-language reminders use three tools:

| Tool | Purpose |
|------|---------|
| `CronCreate` | Schedule a new task. Accepts a **5-field cron expression**, the prompt to run, and whether it recurs or fires once |
| `CronList` | List all scheduled tasks with their IDs, schedules, and prompts |
| `CronDelete` | Cancel a task by its **8-character ID** |

You can also manage tasks in natural language:

```text
what scheduled tasks do I have?
```

```text
cancel the deploy check job
```

### Cron Expression Reference

`CronCreate` accepts standard 5-field cron: `minute hour day-of-month month day-of-week`.

| Expression | Meaning |
|------------|---------|
| `*/5 * * * *` | Every 5 minutes |
| `0 * * * *` | Every hour on the hour |
| `7 * * * *` | Every hour at 7 minutes past |
| `0 9 * * *` | Every day at 9am local |
| `0 9 * * 1-5` | Weekdays at 9am local |
| `30 14 15 3 *` | March 15 at 2:30pm local |

All fields support wildcards (`*`), single values (`5`), steps (`*/15`), ranges (`1-5`), and comma-separated lists (`1,15,30`). Extended syntax like `L`, `W`, `?`, and name aliases (`MON`, `JAN`) is **not** supported.

---

## Use Cases

| Use Case | Example | Suggested Interval |
|----------|---------|-------------------|
| **Poll deployment status** | `/loop 5m check if the staging deploy finished` | 2-5 min |
| **Babysit a PR** | `/loop 20m /review-pr 1234` | 15-30 min |
| **Monitor CI builds** | `/loop 10m check whether the CI build passed on main` | 5-10 min |
| **Check test results** | `in 45 minutes, check whether the integration tests passed` | One-shot |
| **Recurring code quality** | `/loop 1h run a quick lint check on src/` | 30-60 min |
| **Release reminders** | `remind me at 3pm to push the release branch` | One-shot |
| **Dependency monitoring** | `/loop 2h check if there are new security advisories for our deps` | 1-2 hr |

---

## Configuration

| Setting | Value | Effect |
|---------|-------|--------|
| `CLAUDE_CODE_DISABLE_CRON` | `1` | Disables the scheduler entirely. The cron tools and `/loop` become unavailable, and any already-scheduled tasks stop firing |

Set this environment variable when you want to prevent any scheduled task execution in a session.

---

## Best Practices

| Practice | Rationale |
|----------|-----------|
| **Keep intervals reasonable** | Polling every 30 seconds wastes API tokens. Use 2-5 min for deployments, 15-30 min for PR reviews |
| **Use for monitoring, not heavy compute** | Scheduled prompts share your session — heavy tasks block interactive use |
| **Combine with notifications** | Pair scheduled checks with Slack or desktop notifications so you don't have to watch the terminal |
| **Prefer `/loop` over manual polling** | Typing "check the build" every 5 minutes burns context; `/loop` keeps the prompt compact |
| **Use one-shot reminders for known wait times** | If a deploy takes ~30 min, use `in 30 minutes check the deploy` instead of polling every 5 min |
| **Cancel when done** | Forgotten loops consume tokens for up to 3 days. Cancel tasks once the job is finished |
| **Avoid `:00` and `:30` for precise one-shot timing** | One-shot jitter applies at top/bottom of the hour. Pick an odd minute like `:07` if exact timing matters |
| **Use Desktop or GitHub Actions for durable scheduling** | Session-scoped tasks die when you exit. For unattended cron, use persistent alternatives |

---

## Sources

- [Scheduled Tasks — Claude Code Docs](https://code.claude.com/docs/en/scheduled-tasks)
- [Skills Best Practice](claude-skills.md) — `/loop` is a bundled skill
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
