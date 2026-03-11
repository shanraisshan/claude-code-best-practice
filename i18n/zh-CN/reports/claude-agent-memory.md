# Claude Code: Agent Memory Frontmatter

子 Agent 的持久记忆 — 使 Agent 能够跨会话学习、记忆和积累知识。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 概述

在 **Claude Code v2.1.33**（2026 年 2 月）中引入，`memory` frontmatter 字段为每个子 Agent 提供了自己的持久化 markdown 知识库。在此之前，每次 Agent 调用都从零开始。

```yaml
---
name: code-reviewer
description: 审查代码质量和最佳实践
tools: Read, Write, Edit, Bash
model: sonnet
memory: user
---

你是一名代码审查员。在审查代码时，将你发现的模式、约定和反复出现的问题更新到你的 Agent 记忆中。
```

---

## 记忆作用域

| 作用域 | 存储位置 | 版本控制 | 共享 | 最适合 |
|-------|-----------------|-------------------|--------|----------|
| `user` | `~/.claude/agent-memory/<agent-name>/` | 否 | 否 | 跨项目知识（推荐的默认值） |
| `project` | `.claude/agent-memory/<agent-name>/` | 是 | 是 | 团队应共享的项目特定知识 |
| `local` | `.claude/agent-memory-local/<agent-name>/` | 否（git 忽略） | 否 | 个人的项目特定知识 |

这些作用域反映了设置层级（`~/.claude/settings.json` → `.claude/settings.json` → `.claude/settings.local.json`）。

---

## 工作原理

1. **启动时**：`MEMORY.md` 的前 200 行被注入到 Agent 的系统提示中
2. **工具访问**：`Read`、`Write`、`Edit` 自动启用，以便 Agent 管理其记忆
3. **执行期间**：Agent 可以自由读写其记忆目录
4. **整理**：如果 `MEMORY.md` 超过 200 行，Agent 会将详细信息移至主题特定文件

```
~/.claude/agent-memory/code-reviewer/     # user 作用域示例
├── MEMORY.md                              # 主文件（前 200 行被加载）
├── react-patterns.md                      # 主题特定文件
└── security-checklist.md                  # 主题特定文件
```

---

## Agent 记忆与其他记忆系统对比

| 系统 | 谁写入 | 谁读取 | 作用域 |
|--------|-----------|-----------|-------|
| **CLAUDE.md** | 你（手动） | 主 Claude + 所有 Agent | 项目 |
| **自动记忆** | 主 Claude（自动） | 仅主 Claude | 每用户每项目 |
| **`/memory` 命令** | 你（通过编辑器） | 仅主 Claude | 每用户每项目 |
| **Agent 记忆** | Agent 本身 | 仅该特定 Agent | 可配置（user/project/local） |

这些系统是**互补的** — Agent 同时读取 CLAUDE.md（项目上下文）和自己的记忆（Agent 特定知识）。

---

## 实践示例

```yaml
---
name: api-developer
description: 遵循团队约定实现 API 端点
tools: Read, Write, Edit, Bash
model: sonnet
memory: project
skills:
  - api-conventions
  - error-handling-patterns
---

实现 API 端点。遵循预加载技能中的约定。
在工作时，将架构决策和模式保存到你的记忆中。
```

这结合了**技能**（启动时的静态知识）与**记忆**（随时间积累的动态知识）。

---

## 提示

- **提示记忆使用** — 包含明确指令：`"开始前，查看你的记忆。完成后，用你学到的内容更新你的记忆。"`
- **请求记忆检查** — 调用 Agent 时：`"审查这个 PR，并检查你的记忆中是否有你之前见过的模式。"`
- **选择正确的作用域** — `user` 用于跨项目，`project` 用于团队共享，`local` 用于个人

---

## 来源

- [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Manage Claude's memory — Claude Code Docs](https://code.claude.com/docs/en/memory)
- [Claude Code v2.1.33 Release Notes](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)