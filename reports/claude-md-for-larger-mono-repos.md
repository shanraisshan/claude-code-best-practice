# Understanding CLAUDE.md Loading in Large Monorepos

When working with Claude Code in a monorepo, understanding how CLAUDE.md files are loaded into context is crucial for organizing your project instructions effectively.

## The Two Loading Mechanisms

Claude Code uses two distinct mechanisms for loading CLAUDE.md files:

### 1. Ancestor Loading (UP the directory tree)

When you start Claude Code, it walks **upward** from your current working directory toward the filesystem root and loads every CLAUDE.md it finds along the way. These files are loaded **immediately at startup**.

### 2. Descendant Loading (DOWN the directory tree)

CLAUDE.md files in subdirectories below your current working directory are **NOT loaded at launch**. They are only included when Claude reads files in those subdirectories during your session. This is known as **lazy loading**.

## Example Monorepo Structure

Consider a typical monorepo with separate directories for different components:

```
/mymonorepo/
├── CLAUDE.md          # Root-level instructions (shared across all components)
├── frontend/
│   └── CLAUDE.md      # Frontend-specific instructions
├── backend/
│   └── CLAUDE.md      # Backend-specific instructions
└── api/
    └── CLAUDE.md      # API-specific instructions
```

## Scenario 1: Running Claude Code from the Root Directory

When you run Claude Code from `/mymonorepo/`:

```bash
cd /mymonorepo
claude
```

| File | Loaded at Launch? | Reason |
|------|-------------------|--------|
| `/mymonorepo/CLAUDE.md` | Yes | It's your current working directory |
| `/mymonorepo/frontend/CLAUDE.md` | No | Loaded only when you read/edit files in `frontend/` |
| `/mymonorepo/backend/CLAUDE.md` | No | Loaded only when you read/edit files in `backend/` |
| `/mymonorepo/api/CLAUDE.md` | No | Loaded only when you read/edit files in `api/` |

## Scenario 2: Running Claude Code from a Component Directory

When you run Claude Code from `/mymonorepo/frontend/`:

```bash
cd /mymonorepo/frontend
claude
```

| File | Loaded at Launch? | Reason |
|------|-------------------|--------|
| `/mymonorepo/CLAUDE.md` | Yes | It's an ancestor directory |
| `/mymonorepo/frontend/CLAUDE.md` | Yes | It's your current working directory |
| `/mymonorepo/backend/CLAUDE.md` | No | Different branch of the directory tree |
| `/mymonorepo/api/CLAUDE.md` | No | Different branch of the directory tree |

## Key Takeaways

1. **Ancestors always load at startup** - Claude walks UP the directory tree and loads all CLAUDE.md files it finds. This ensures you always have access to root-level, repository-wide instructions.

2. **Descendants load lazily** - Subdirectory CLAUDE.md files only load when you interact with files in those subdirectories. This prevents irrelevant context from bloating your session.

3. **Siblings never load** - If you're working in `frontend/`, you won't get `backend/CLAUDE.md` or `api/CLAUDE.md` loaded into context.

4. **Global CLAUDE.md** - You can also place a CLAUDE.md at `~/.claude/CLAUDE.md` in your home folder, which applies to ALL Claude Code sessions regardless of project.

## Why This Design Works for Monorepos

This loading strategy is intentionally designed for large monorepos:

- **Shared instructions propagate down** - Root-level CLAUDE.md contains repository-wide conventions, coding standards, and common patterns that apply everywhere.

- **Component-specific instructions stay isolated** - Frontend developers don't need backend-specific instructions cluttering their context, and vice versa.

- **Context is optimized** - By lazily loading descendant CLAUDE.md files, Claude Code avoids loading potentially hundreds of kilobytes of irrelevant instructions at startup.

## Best Practices

1. **Put shared conventions in root CLAUDE.md** - Coding standards, commit message formats, PR templates, and other repository-wide guidelines.

2. **Put component-specific instructions in component CLAUDE.md** - Framework-specific patterns, component architecture, testing conventions unique to that component.

3. **Use CLAUDE.local.md for personal preferences** - Add it to `.gitignore` for instructions that shouldn't be shared with the team.

---

## Sources

- [Claude Code Documentation - How Claude Looks Up Memories](https://code.claude.com/docs/en/memory#how-claude-looks-up-memories)
- [Boris Cherny on X - Clarification on CLAUDE.md Loading](https://x.com/bcherny/status/2016339448863355206)
