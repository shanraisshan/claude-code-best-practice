# claude-code-best-practice
your best ai assistant with the best practice

## CONCEPTS

- **[Agents](https://docs.claude.com/en/docs/claude-code/agents)** - Specialized subprocesses that autonomously handle complex, multi-step tasks
- **[Commands](https://docs.claude.com/en/docs/claude-code/slash-commands)** - Custom slash commands to extend Claude Code with reusable prompts
- **[Memory](https://docs.claude.com/en/docs/claude-code/memory)** - Persistent context that Claude remembers across conversations
- **[Hooks](https://docs.claude.com/en/docs/claude-code/hooks)** - Shell commands that execute in response to events like tool calls
- **[Skills](https://docs.claude.com/en/docs/claude-code/skills)** - Installable capabilities that add specialized functionality to Claude Code
- **[Settings](https://docs.claude.com/en/docs/claude-code/settings)** - Hierarchical configuration system for Claude Code behavior
- **[MCP Servers](https://docs.claude.com/en/docs/claude-code/mcp)** - Model Context Protocol for connecting to external tools, databases, and APIs
- **[Plugins](https://docs.claude.com/en/docs/claude-code/plugins)** - Extensible packages that bundle commands, agents, skills, hooks, and MCP servers
- **[Rules](https://docs.claude.com/en/docs/claude-code/memory#project-rules)** - Modular topic-specific instructions in `.claude/rules/*.md`
- **[Output Styles](https://docs.claude.com/en/docs/claude-code/output-styles)** - Custom system prompt modifications for different use cases
- **[Permissions](https://docs.claude.com/en/docs/claude-code/permissions)** - Fine-grained access control for tools and operations


## LESSON LEARNED

### Context Engineering
- [Humanlayer - Writing a good Claude.Md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)

### Debugging
- always ask claude to run the terminal (you want to see logs of) as a background task for better debugging
- use claude in chrome to let claude see chrome console logs on its own

### Workflows
- [Ralph plugin with sandbox](https://www.youtube.com/watch?v=eAtvoGlpeRU)
- [RPI - Research Plan Implement](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md)
- [AgentOs - 2026 its overkill (Brian Casel)](https://www.youtube.com/watch?v=0hdFJA-ho3c)

## LIBRARIES

- [Claude Code Tips](https://github.com/ykdojo/claude-code-tips)
- [Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code)

## KEYWORDS

- [btw] start prompt with btw to let the current task executing in background
- [claude --dangerously-skip-permissions] "defaultMode": "bypassPermissions"
- *deprecated** [ultrathink] Triggers extended thinking with up to ~32K thinking tokens for a single request.

## DOCS

### **[docs/AGENTS.md](docs/AGENTS.md)** - Agent Orchestration Best Practices
Learn how to properly orchestrate multiple agents, avoid common pitfalls when sub-agents aren't invoking, and implement sequential workflows using the Task tool.

### **[docs/PROMPTS.md](docs/PROMPTS.md)** - Invocation Patterns Reference
Quick reference tables showing how to invoke agents and commands from different contexts (CLI, other agents, other commands).

### **[docs/WEATHER.md](docs/WEATHER.md)** - Weather System Flow Documentation
Complete system architecture and flow diagram for the weather data fetching and transformation workflow, demonstrating real-world agent and command orchestration.

## IDE

### Cursor vs. Windsurf vs. VS Code
[Claude Code Replaced Cursor for Me… Here’s Why](https://www.youtube.com/watch?v=0iGEpx8IeM0)
![](!/ide.png)
