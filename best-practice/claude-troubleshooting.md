# Claude Code Troubleshooting

Common failures and how to fix them.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 1. Hooks Not Firing

**Symptoms:** PostToolUse / PreToolUse hooks silently do nothing. No errors, no output.

**Causes and fixes:**

- **Wrong event name** — hook event names are case-sensitive. `PostToolUse` is correct; `posttooluse` is not.
- **Script not executable** — run `chmod +x your-hook-script.sh` and verify with `ls -la`.
- **Shebang missing** — shell scripts need `#!/bin/bash` or `#!/usr/bin/env python3` on the first line.
- **Path issues** — hooks run from the project root. Use absolute paths or `$PWD`-relative paths inside your script.
- **JSON syntax error in settings.json** — a malformed hooks config silently disables all hooks. Validate with `cat .claude/settings.json | python3 -m json.tool`.
- **Wrong matcher** — `toolName` matchers are exact strings. Check the tool names documented in [claude-settings.md](claude-settings.md) or in the official [permissions docs](https://code.claude.com/docs/en/permissions).

---

## 2. Context Rot (Claude Getting Worse Mid-Session)

**Symptoms:** Responses become vague, Claude forgets earlier decisions, output quality degrades.

**What's happening:** Claude enters a "dumb zone" around ~40% context usage as attention spreads across too much prior conversation.

**Fixes:**

- Run `/compact` to summarize and compress the conversation before hitting the limit.
- Start a new session with `/new` and carry forward only what matters in a fresh prompt.
- Use `/clear` to reset entirely if the session has gone off-track.
- Avoid pasting large files directly into the chat — use `@file` references instead so Claude reads them on demand.
- Keep CLAUDE.md focused. Every token in CLAUDE.md loads at startup and counts against your context.

---

## 3. Agent Loop / Claude Stuck Repeating Itself

**Symptoms:** Claude runs the same tool calls in a loop, makes no forward progress, or keeps re-trying a failed step.

**Fixes:**

- Press `Esc` to interrupt, then redirect with a specific instruction ("stop trying X, do Y instead").
- Use `/rewind` (or `Esc Esc`) to roll back to before the loop started.
- Add a max-iterations constraint in your prompt: "try this up to 3 times, then stop and tell me what you found."
- For subagents, set `maxTurns` in the agent frontmatter to cap runaway loops.

---

## 4. Tool Permission Denials

**Symptoms:** Claude asks for permission on every bash command, or a tool is blocked when it shouldn't be.

**Fixes:**

- Add the tool to `permissions.allow` in `.claude/settings.json`:
  ```json
  {
    "permissions": {
      "allow": ["Bash(npm run *)", "Bash(git *)", "Edit(*)", "Read(*)"]
    }
  }
  ```
- Use `permissions.deny` to hard-block tools regardless of other rules:
  ```json
  {
    "permissions": {
      "deny": ["Bash(rm -rf *)"]
    }
  }
  ```
- Use `--permission-mode auto` (or `Shift+Tab` to toggle) to let the background safety classifier decide instead of prompting you.
- Check whether a hook is intercepting and blocking the tool via a non-zero exit code.

---

## 5. MCP Server Not Connecting

**Symptoms:** MCP tools missing from context, "server not found" errors, tools load then disappear.

**Fixes:**

- Confirm the server process is running: check for errors in the MCP server's own logs.
- Validate your `.mcp.json` or `settings.json` config — a missing comma or wrong key name silently breaks it.
- Use `alwaysLoad: true` in your MCP server config to prevent the tool from being deferred and not loading into context (v2.1.121+).
- Restart Claude Code after any MCP config change — changes are not hot-reloaded.
- Check that environment variables the server needs (API keys, etc.) are set in the `env` block of your MCP config, not just in your shell.

---

## 6. CLAUDE.md Not Loading

**Symptoms:** Instructions in CLAUDE.md seem to be ignored. Claude doesn't know project context.

**How CLAUDE.md loads:**

- Files in ancestor directories (above your working directory) load at startup.
- Files in subdirectories load lazily only when Claude reads files in those directories.
- Global `~/.claude/CLAUDE.md` always loads.

**Fixes:**

- Verify location: run `pwd` and check that your CLAUDE.md is in or above that directory.
- Check for syntax issues — CLAUDE.md is plain markdown, but very large files can be truncated. Keep it under ~500 lines.
- Use `@path/to/file` imports inside CLAUDE.md to split instructions across files rather than putting everything in one large file.
- Run `/memory` to inspect what Claude has actually loaded in the current session.

---

## 7. Skill Not Available / Not Triggering

**Symptoms:** A skill command doesn't appear, or invoking it does nothing.

**Fixes:**

- Confirm the skill directory structure: `.claude/skills/<name>/SKILL.md` — the `SKILL.md` filename is required.
- Skills are loaded via tool search, not automatically. If your skill isn't being found, add it to `alwaysLoad` in settings or reference it explicitly in your CLAUDE.md.
- Auto-discovery uses the `description` field in SKILL.md frontmatter. Make it specific — Claude matches skills based on this text. Use `when_to_use` for additional trigger phrases beyond the description.

---

## 8. Recovering a Lost Session

**Symptoms:** Terminal closed accidentally, session history gone, need to resume work.

**Options:**

- `/resume` — lists recent sessions by name. Use `/rename` at the start of sessions to make them findable.
- Check `~/.claude/projects/<project>/` for persisted session data.
- If using auto memory, recent context may be preserved in `~/.claude/projects/<project>/memory/`.
- For in-progress file changes: run `git diff` — Claude's edits are real file writes and survive session loss.

---

## 9. High Cost / Unexpected Usage

**Symptoms:** Token usage or cost much higher than expected.

**Common causes and fixes:**

- **Large CLAUDE.md** — every token loads on every request. Trim ruthlessly, use `@imports` for rarely-needed sections.
- **Subagent proliferation** — each subagent spawns a fresh context. Audit how many are being created with `/usage`.
- **Repeated tool calls** — if Claude is reading the same large file repeatedly, instruct it to read once and reference from memory.
- **No `/compact`** — run `/compact` proactively before context fills rather than letting it auto-compact (which is less targeted).
- **Scheduled tasks** — `/loop` and `/schedule` tasks accumulate cost while you're away. Check active tasks with `/tasks`.
