# Claude Code: Usage, Rate Limits & Usage Credits

Understanding how usage limits work in Claude Code and how to keep working when you hit them.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Overview

Claude Code on subscription plans (Pro, Max, Ultra, Team) has usage limits: a weekly limit, plus a five-hour session limit on most plans. Max 20x was renamed **Ultra** on October 30, 2026, and Max 5x is now just **Max**. These slash commands help you monitor and manage usage:

| Command | Description | Available To |
|---------|-------------|--------------|
| `/usage` | Check plan limits and rate limit status | Subscription plans |
| `/usage-credits` | Configure usage credits (pay-as-you-go overflow) when limits are hit. Renamed from `/extra-usage` in v2.1.144; the old name still works | Subscription plans |
| `/rate-limit-options` | Show ways to keep working when a limit blocks a request: wait and continue, add usage credits, or upgrade | Subscription plans |
| `/cost` | Show token usage and spending for the current session | API key users |

When you hit a limit, check three things in order: a free **[limit reset](#limit-resets--free-refills)**, your **[monthly API credits](#monthly-api-credits-max-ultra-team)** for API work, then **usage credits**.

🎬 20-second explainer of both tips: [weekly-limit-reset-tip.mp4](../video-studio/2026-11-11-weekly-limit-reset-tip/weekly-limit-reset-tip.mp4)

---

## `/usage` — Check Your Limits

Shows your current plan's usage limits and rate limit status. Useful for checking how much capacity you have left before hitting a limit. On the web, the same view lives at **Settings > Usage** on claude.ai.

---

## Limit Resets — Free Refills

Anthropic occasionally gives eligible paid plans free **limit resets**. Using one restores your usage right away, without waiting for your normal reset day.

| Type | What it restores |
|------|------------------|
| Weekly reset | Your whole weekly limit, back to full |
| Five-hour reset | Your five-hour session limit, back to full |
| Fable limit reset | Only the weekly usage you spent on Fable models (plus a full five-hour window, if your plan has one) |

### How to Use One

1. Open **Settings > Usage** in Claude on the web, Claude Desktop or the mobile apps. The same button appears on the "limit reached" message.
2. Under **Limit resets**, select **Reset for free** and confirm.

### Key Details

| Detail | Value |
|--------|-------|
| In Claude Code | The button isn't available in the terminal or IDE, but limits are shared across your account, so a reset done on the web also unblocks Claude Code |
| Timing | You don't need to hit a limit first. Your regular weekly reset day doesn't change |
| Undo | Not possible once used |
| Expiry | Shown in Settings > Usage. Unused resets lapse, and cancelling or downgrading forfeits them |
| Plan eligibility | Only "eligible plans"; Anthropic doesn't publish a fixed list |

### Grants So Far

Resets are one-off grants tied to launches or make-goods, not a recurring perk:

| Date | Grant | Who got it | Expires |
|------|-------|------------|---------|
| Nov 9, 2026 | Fable 5.2 launch: Fable limit resets | Max, Ultra and premium seats: 1–3 by tenure (under 6 months: 1, 6–12 months: 2, over 12 months: 3). Pro and standard Team seats: 1, plus a week of Fable access. Billing had to be in place before Nov 9, 10:00 AM PT | Mar 8, 2027, 11:59 PM PT (Max, Ultra, premium); Nov 16, 2026 (Pro, standard Team) |
| Nov 10, 2026 | One full reset across all models and limits, after "a few small issues that used more limits than intended" | Every Pro, Max, Ultra and Team subscriber | Dec 10, 2026, 2:00 PM PT |

---

## Monthly API Credits (Max, Ultra, Team)

Max, Ultra and Team plans include a monthly credit for the **Claude Platform API**, separate from your chat and Claude Code usage.

| Plan | Monthly API credit |
|------|--------------------|
| Max | $100 |
| Ultra | $200 |
| Team | $20 per Standard seat, $100 per Premium seat, pooled and capped at $500 |
| Free, Pro, Enterprise | Not eligible |

### How to Claim

1. Go to **Settings > Billing** (Max, Ultra) or **Organization settings > Billing** (Team Owner or Primary Owner).
2. In **API credits**, select **Link organization** and pick or create a Claude Console organization.

New subscribers can claim after seven days on an eligible plan. You can link only one Console organization, and changing it later requires support.

### What the Credits Cover

| Covered | Not covered |
|---------|-------------|
| Claude API (Messages and Message Batches) | Interactive Claude Code in the terminal, IDE, desktop or web |
| Console Playground | Usage credits after you hit a plan limit |
| Claude Managed Agents | Claude on Bedrock, Vertex AI or Foundry |
| Claude Agent SDK and `claude -p`, **only** with an API key from the linked organization | `claude -p` signed in with your plan (that draws from plan limits) |

Credits refresh each billing cycle and **don't roll over**: unused credit expires at the end of the cycle. They are spent before any purchased credits. In practice, when Claude Code hits a limit, these credits let you keep building through the API or Agent SDK, but they don't lift the Claude Code limit itself.

---

## `/usage-credits` — Keep Working Past Limits

The `/usage-credits` command (previously `/extra-usage`) configures **pay-as-you-go overflow billing** so Claude Code keeps working when you hit your plan's limits, instead of blocking you.

### How It Works

1. You hit your plan's limit (the five-hour session window or the weekly limit; verified Ultra accounts have no five-hour limit)
2. If usage credits are enabled with available funds, Claude Code continues without interruption
3. Overflow tokens are billed at **standard API rates**, separate from your subscription fee

### Setting It Up

Run `/usage-credits` in the CLI. It opens your usage-credits billing settings in the browser, or prints the URL when no browser can open, for example over SSH (Claude Code v2.1.205 or later). Team and Enterprise members without billing access send a usage-credits request to their admin instead. On the web, the same settings are at **Settings > Usage** on claude.ai:

1. Turn on usage credits
2. Add a payment method
3. Set a **monthly spending cap** (or choose unlimited)
4. Optionally add **prepaid funds** with auto-reload when balance drops below a threshold

### Key Details

| Detail | Value |
|--------|-------|
| Daily redemption limit | $2,000/day |
| Billing | Separate from subscription, at standard API rates |
| Limit windows | Weekly on all plans, plus a five-hour session window except on verified Ultra accounts |
| Promotional credits | Used before purchased credits |

---

## `/cost` — Session Spending (API Users)

For users authenticating with an API key (not a subscription plan), `/cost` shows:

- Total cost for the current session
- API duration and wall time
- Token usage breakdown
- Code changes made

This command is not relevant for subscription plan users.

---

## Fast Mode and Usage Credits

Fast mode (`/fast`) gives faster output on the current model if it supports fast mode, and otherwise switches to Opus. It has a special billing relationship with usage credits:

- Fast mode usage is **always billed to usage credits** from the first token
- This applies even if you have remaining usage on your subscription plan
- Fast mode does not consume your plan's included rate limits

This means you need usage credits enabled and funded to use `/fast`.

---

## CLI Startup Flags

Two startup flags relate to usage budgets (API key users only, print mode):

| Flag | Description |
|------|-------------|
| `--max-budget-usd <AMOUNT>` | Maximum dollar amount for API calls before stopping |
| `--max-turns <NUMBER>` | Limit number of agentic turns |

See [CLI Startup Flags Reference](claude-cli-startup-flags.md) for the full list.

---

## Sources

- [What is a limit reset? — Claude Help Center](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset)
- [Claude Fable 5.2 launch offers — Claude Help Center](https://support.claude.com/en/articles/17506494-claude-fable-5-2-launch-offers)
- [Monthly API credits for Max, Ultra, and Team plans — Claude Help Center](https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-ultra-and-team-plans)
- [What is the Ultra plan? — Claude Help Center](https://support.claude.com/en/articles/17728952-what-is-the-ultra-plan)
- [Claude Free Usage Reset: Who Gets It (quotes the Nov 10, 2026 @ClaudeDevs post) — CellCog](https://cellcog.ai/blog/claude-free-usage-reset/)
- [Extra usage for paid Claude plans — Claude Help Center](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans)
- [Using Claude Code with your Pro or Max plan — Claude Help Center](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)
- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
