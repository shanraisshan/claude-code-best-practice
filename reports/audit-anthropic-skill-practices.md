# Audit: Anthropic Skill Best Practices Compliance

**Date**: 2026-03-12
**Reference**: [The Complete Guide to Building Skills for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf) + [Skill Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

## Summary

This audit compares the repository's 6 skills against Anthropic's official skill authoring guidelines. After remediation, the repo is approximately **90% compliant** (up from ~70%).

## Corrections Applied

### 1. Descriptions — "What + When + Triggers" (HIGH IMPACT)

The guide states: *"A good description must include both what the skill does AND when to use it, including specific trigger phrases."*

| Skill | Before | After |
|-------|--------|-------|
| `weather-fetcher` | "Instructions for fetching..." (no triggers) | "Fetches current weather... Use when an agent or workflow needs real-time Dubai temperature data..." |
| `weather-svg-creator` | "Creates an SVG weather card..." (no triggers) | Added "Use when..." + specific trigger phrases |
| `vibe-to-agentic-framework` | "The conceptual framework..." (no triggers) | Added "Use when creating, modifying, or reordering slides..." |
| `presentation-structure` | "Knowledge about..." (passive) | "Defines the presentation... Use when adding, removing, reordering..." |
| `presentation-styling` | "Knowledge about..." (passive) | "Documents CSS classes... Use when styling new slides..." |
| `agent-browser` | Already compliant | No change needed |

### 2. `disable-model-invocation` for Side Effects

The guide states: *"Use this for workflows with side effects like /commit, /deploy."*

- Added `disable-model-invocation: true` to `weather-svg-creator` (writes files to disk).

### 3. Troubleshooting Sections

The guide recommends: *"Troubleshooting section for error handling"* as part of the SKILL.md structure.

- Added troubleshooting sections to `weather-fetcher` (API errors, JSON structure, unit mismatch).
- Added troubleshooting sections to `weather-svg-creator` (missing input, invalid SVG, missing directory).

### 4. Concrete Examples (Input/Output Pairs)

The guide recommends: *"Provide input/output pairs just like in regular prompting."*

- Added concrete example with real JSON response and expected output to `weather-fetcher`.
- Added concrete example with actual SVG output to `weather-svg-creator`.

### 5. Metadata Fields

The guide documents optional metadata: `author`, `version`, `category`.

- Added `metadata` block to all 6 skills.

### 6. Concision — Removed Redundant Preamble

The guide states: *"Only add context Claude doesn't already have."*

- Removed generic preamble ("This skill provides instructions for...") from `weather-fetcher`.
- Removed "Task" section from `weather-svg-creator` (duplicated the description).

## Remaining Items (Not Addressed)

### Gerund Naming Convention — NOT APPLIED

The guide recommends: *"Consider using gerund form (verb + -ing)"* — e.g., `fetching-weather` instead of `weather-fetcher`.

**Why not applied**: The guide uses "consider" (not "must"). Renaming would break references in agents (`weather-agent.md` → `skills: [weather-fetcher]`), commands, settings, and CLAUDE.md. The current names are clear and kebab-case compliant.

### Testing / Evaluations — NOT ADDED

The guide recommends at least 3 evaluations per skill and testing with Haiku, Sonnet, and Opus. This requires a testing framework and real-world iteration cycles — it's a process, not a file change.

### Feedback Loops in Orchestrator — NOT ADDED

The `weather-orchestrator` command could validate SVG output after generation, but this would add complexity to a demonstration workflow. Consider adding for production use cases.

## Compliance Matrix (Post-Remediation)

| Practice | Status | Notes |
|----------|--------|-------|
| Folder with `SKILL.md` | ✅ | 6/6 |
| kebab-case naming | ✅ | 6/6 |
| `name` + `description` in frontmatter | ✅ | 6/6 |
| Description with "what + when + triggers" | ✅ | 6/6 (fixed) |
| Description in 3rd person | ✅ | 6/6 (fixed) |
| Gerund naming | ⚠️ | Not applied (optional) |
| SKILL.md < 500 lines | ✅ | 6/6 |
| Progressive disclosure (references/) | ✅ | `agent-browser` exemplary |
| References one level deep | ✅ | No nesting |
| Forward slashes in paths | ✅ | No backslashes |
| Specific, actionable instructions | ✅ | 6/6 |
| Concise (no over-explaining) | ✅ | 6/6 (improved) |
| Troubleshooting section | ✅ | 2/2 weather skills (fixed) |
| Input/output examples | ✅ | 3/6 skills (`agent-browser` + 2 weather) |
| Testing / evaluations | ❌ | Not yet implemented |
| `disable-model-invocation` for side effects | ✅ | `weather-svg-creator` (fixed) |
| Feedback loops / validation | ⚠️ | Not in orchestrator |
| Metadata (author, version) | ✅ | 6/6 (added) |
| `user-invocable: false` for background | ✅ | `weather-fetcher` |
| `allowed-tools` | ✅ | `agent-browser` |
| Consistent terminology | ✅ | No variation |
| No time-sensitive info | ✅ | No fragile dates |
