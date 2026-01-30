# Understanding Claude Skills Discovery in Large Monorepos

When working with Claude Code in a monorepo, understanding how skills are discovered and loaded into context is crucial for organizing your project-specific capabilities effectively.

## Important Difference from CLAUDE.md

**Skills do NOT have the same loading behavior as CLAUDE.md files.** While CLAUDE.md files walk UP the directory tree (ancestor loading), skills use a different discovery mechanism focused on nested directories within your project.

## How Skills Are Discovered

### 1. Standard Skill Locations

Skills are loaded from these fixed locations based on scope:

| Location | Path | Applies to |
|----------|------|------------|
| Enterprise | Managed settings | All users in organization |
| Personal | `~/.claude/skills/<skill-name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<skill-name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` | Where plugin is enabled |

### 2. Automatic Discovery from Nested Directories

When you work with files in subdirectories, Claude Code automatically discovers skills from nested `.claude/skills/` directories. For example, if you're editing a file in `packages/frontend/`, Claude Code also looks for skills in `packages/frontend/.claude/skills/`.

This supports monorepo setups where packages have their own skills.

## Example Monorepo Structure

Consider a typical monorepo with separate packages:

```
/mymonorepo/
├── .claude/
│   └── skills/
│       └── shared-conventions/SKILL.md    # Project-level skill
├── packages/
│   ├── frontend/
│   │   ├── .claude/
│   │   │   └── skills/
│   │   │       └── react-patterns/SKILL.md  # Frontend-specific skill
│   │   └── src/
│   │       └── App.tsx
│   ├── backend/
│   │   ├── .claude/
│   │   │   └── skills/
│   │   │       └── api-design/SKILL.md      # Backend-specific skill
│   │   └── src/
│   └── shared/
│       ├── .claude/
│       │   └── skills/
│       │       └── utils-patterns/SKILL.md  # Shared utilities skill
│       └── src/
```

## Scenario 1: Just Started Claude at Root (No Files Edited Yet)

When you run Claude Code from `/mymonorepo/` and haven't edited any files yet:

```bash
cd /mymonorepo
claude
# Just started - no files edited yet
```

| Skill | In Context? | Reason |
|-------|-------------|--------|
| `shared-conventions` | **Yes** | Project-level skill in root `.claude/skills/` |
| `react-patterns` | **No** | Not discovered - haven't worked with files in `packages/frontend/` |
| `api-design` | **No** | Not discovered - haven't worked with files in `packages/backend/` |
| `utils-patterns` | **No** | Not discovered - haven't worked with files in `packages/shared/` |

## Scenario 2: After Editing Files in a Package

After you ask Claude to edit `packages/frontend/src/App.tsx`:

| Skill | In Context? | Reason |
|-------|-------------|--------|
| `shared-conventions` | **Yes** | Project-level skill in root `.claude/skills/` |
| `react-patterns` | **Yes** | Discovered when editing files in `packages/frontend/` |
| `api-design` | **No** | Still not discovered - haven't worked with files in `packages/backend/` |
| `utils-patterns` | **No** | Still not discovered - haven't worked with files in `packages/shared/` |

**Key insight**: Nested skills are discovered **on-demand** when you work with files in those directories. They are not preloaded at session start.

## Key Behavior: Description vs Full Content

Skill descriptions are loaded into context so Claude knows what's available, but **full skill content only loads when invoked**. This is an important optimization:

- **Descriptions**: Always in context (within character budget)
- **Full content**: Loaded on-demand when skill is invoked

> Note: Subagents with preloaded skills work differently - the full skill content is injected at startup.

## Priority Order (When Skills Share Names)

When skills share the same name across levels, higher-priority locations win:

| Priority | Location | Scope |
|----------|----------|-------|
| 1 (highest) | Enterprise | Organization-wide |
| 2 | Personal (`~/.claude/skills/`) | All your projects |
| 3 (lowest) | Project (`.claude/skills/`) | This project only |

Plugin skills use a `plugin-name:skill-name` namespace, so they cannot conflict with other levels.

## Why This Design Works for Monorepos

- **Package-specific skills stay isolated** - Frontend developers working in `packages/frontend/` get frontend-specific skills without backend skills cluttering context.

- **Automatic discovery reduces configuration** - No need to explicitly register package-level skills; they're discovered when you work in those directories.

- **Context is optimized** - Only skill descriptions load initially, and nested skills are discovered on-demand.

- **Teams can maintain their own skills** - Each package team can define skills specific to their domain without coordinating with other teams.

## Character Budget Considerations

Skill descriptions are loaded into context up to a character budget (default 15,000 characters). In large monorepos with many packages and skills, you may hit this limit.

- Run `/context` to check for warnings about excluded skills
- Set `SLASH_COMMAND_TOOL_CHAR_BUDGET` environment variable to increase the limit

## Best Practices

1. **Put shared workflows in root `.claude/skills/`** - Repository-wide conventions, commit workflows, and shared patterns.

2. **Put package-specific skills in package `.claude/skills/`** - Framework-specific patterns, component conventions, testing utilities unique to that package.

3. **Use `disable-model-invocation: true` for dangerous skills** - Deployment or destructive skills should require explicit user invocation.

4. **Keep skill descriptions concise** - Descriptions are always in context (up to the character budget), so verbose descriptions waste context space.

5. **Use namespacing in skill names** - Consider prefixing with package names (e.g., `frontend-review`, `backend-deploy`) to avoid confusion.

## Comparison: Skills vs CLAUDE.md Loading

| Behavior | CLAUDE.md | Skills |
|----------|-----------|--------|
| Ancestor loading (UP directory tree) | Yes | No |
| Nested/descendant discovery (DOWN directory tree) | Yes (lazy) | Yes (automatic discovery) |
| Global location | `~/.claude/CLAUDE.md` | `~/.claude/skills/` |
| Project location | `.claude/` or repo root | `.claude/skills/` |
| Content loading | Full content | Description only (full on invocation) |

---

## Sources

- [Claude Code Documentation - Extend Claude with Skills](https://code.claude.com/docs/en/skills)
- [Claude Code Documentation - Automatic Discovery from Nested Directories](https://code.claude.com/docs/en/skills#automatic-discovery-from-nested-directories)
