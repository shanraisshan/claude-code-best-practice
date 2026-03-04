---
description: Audit your project against Claude Code best practices and generate a compliance report
allowed-tools: Read, Glob, Grep, Bash(find *), Bash(ls *), Bash(cat *)
---

# Claude Code Best Practices Audit

Perform a comprehensive audit of the current project against all Claude Code best practices documented in this repository. Generate a structured compliance report with actionable findings.

## Audit Scope

Check the following areas systematically. For each area, report status as PASS, WARN, or FAIL with specific recommendations.

## Step 1: Project Root Configuration

Check for the presence and quality of:

- [ ] `CLAUDE.md` exists at project root
  - Contains repository overview
  - Documents key components and architecture
  - Lists development commands (build, test, lint, deploy)
  - Defines coding conventions and style guidelines
  - References important files and directories
- [ ] `.claude/` directory exists with proper structure
- [ ] `.claude/settings.json` exists with permissions configured

## Step 2: Commands Audit

Reference: `best-practice/claude-commands.md`

Check `.claude/commands/` directory:
- [ ] Custom commands exist with proper `.md` extension
- [ ] Commands use YAML frontmatter (description, model, allowed-tools)
- [ ] Commands have clear step-by-step instructions
- [ ] Workflow commands exist in `.claude/commands/workflows/` if applicable
- [ ] Commands follow the naming convention (lowercase, hyphenated)

## Step 3: Skills Audit

Reference: `best-practice/claude-skills.md`

Check `.claude/skills/` directory:
- [ ] Skills exist with `SKILL.md` files in subdirectories
- [ ] Skills use proper YAML frontmatter (name, description, allowed-tools)
- [ ] Skills have `disable-model-invocation` set appropriately
- [ ] Skills have `user-invocable` configured correctly
- [ ] Skills use `context: fork` for isolated execution where appropriate

## Step 4: Subagents Audit

Reference: `best-practice/claude-subagents.md`

Check `.claude/agents/` directory:
- [ ] Agent definitions exist with proper `.md` files
- [ ] Agents use YAML frontmatter (name, description, model, skills, tools)
- [ ] Agents have scoped tool permissions via `allowed-tools`
- [ ] Agent hooks are configured where needed (PreToolUse, PostToolUse, Stop)

## Step 5: MCP Server Configuration

Reference: `best-practice/claude-mcp.md`

Check MCP setup:
- [ ] `.mcp.json` exists at project root (project-level MCP servers)
- [ ] MCP servers are relevant to the project domain
- [ ] Server configurations include proper authentication where needed
- [ ] No hardcoded secrets in MCP configuration (use environment variables)

## Step 6: Hooks Audit

Reference: `.claude/hooks/HOOKS-README.md`

Check hooks configuration:
- [ ] Hooks are defined in `.claude/settings.json` under the `hooks` key
- [ ] Hook scripts exist and are executable
- [ ] Hooks use `async: true` for non-blocking operations
- [ ] Hooks have appropriate `timeout` values
- [ ] `disableAllHooks` is not set to true (unless intentional)
- [ ] Hook matchers are used for targeted execution where applicable

## Step 7: Memory & Context

Reference: `best-practice/claude-memory.md`

Check memory configuration:
- [ ] `CLAUDE.md` serves as primary project memory
- [ ] `.claude/CLAUDE.md` exists for additional context (if needed)
- [ ] Memory files are concise (under 200 lines for auto-loaded files)
- [ ] No sensitive information in memory files (API keys, passwords)
- [ ] Memory is organized semantically, not chronologically

## Step 8: Settings Audit

Reference: `best-practice/claude-settings.md`

Check settings configuration:
- [ ] `.claude/settings.json` has `permissions.allow` configured for common tools
- [ ] `.claude/settings.json` has `permissions.deny` for dangerous operations
- [ ] `.claude/settings.local.json` is in `.gitignore` (for personal overrides)
- [ ] Model preferences are set appropriately
- [ ] No overly permissive settings (avoid `Bash(*)` in allow)

## Step 9: CLI Flags Audit

Reference: `best-practice/claude-cli-startup-flags.md`

Check if the project documents recommended CLI flags:
- [ ] README or CLAUDE.md mentions recommended startup flags
- [ ] Permission mode documented (default, plan, acceptEdits)
- [ ] Model selection documented for different use cases

## Step 10: Monorepo-Specific Checks (if applicable)

If the project is a monorepo or workspace:
- [ ] Root `CLAUDE.md` provides workspace overview
- [ ] Each package/service has its own `CLAUDE.md` with local context
- [ ] Shared commands exist at root level for cross-package operations
- [ ] Package-specific commands exist within each package directory
- [ ] MCP servers are configured at the appropriate level (root vs package)

## Output Format

Generate a markdown report with this structure:

```markdown
# Claude Code Best Practices Audit Report

**Project:** [project name]
**Date:** [current date]
**Overall Score:** [X/10 areas passing]

## Summary

| Area | Status | Score |
|------|--------|-------|
| Project Root | PASS/WARN/FAIL | details |
| Commands | PASS/WARN/FAIL | details |
| Skills | PASS/WARN/FAIL | details |
| Subagents | PASS/WARN/FAIL | details |
| MCP Servers | PASS/WARN/FAIL | details |
| Hooks | PASS/WARN/FAIL | details |
| Memory | PASS/WARN/FAIL | details |
| Settings | PASS/WARN/FAIL | details |
| CLI Flags | PASS/WARN/FAIL | details |
| Monorepo | PASS/WARN/FAIL/N/A | details |

## Detailed Findings

[For each WARN/FAIL, provide specific file paths, what's missing, and exact steps to fix]

## Quick Wins

[Top 3 easiest improvements that would have the most impact]

## Recommended Next Steps

[Prioritized action items]
```

Write the report to `reports/audit-report.md` in the project root. If the `reports/` directory doesn't exist, create it.
