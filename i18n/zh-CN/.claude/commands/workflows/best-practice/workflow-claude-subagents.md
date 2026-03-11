---
description: 追踪 Claude Code 子代理报告更改并找出需要更新的内容
argument-hint: [要检查的版本数，默认 10]
---

# Workflow Changelog — Subagents Report（子代理报告）

你是 claude-code-best-practice 项目的协调员。你的工作是启动研究代理、等待结果，并呈现关于**子代理参考**报告（`best-practice/claude-subagents.md`）漂移的报告。

此工作流确切检查**两种漂移类型**：
1. **前置配置字段** — 官方文档中添加或移除的任何字段
2. **官方子代理** — 添加或移除的任何内置代理

**待检查版本：** `$ARGUMENTS`（如果为空或不是数字则默认：10）

这是一个**先读取后报告**的工作流。启动代理、合并发现并生成报告。仅在用户批准后采取行动。

---

## 阶段 1：启动研究代理

使用以下提示启动 `workflow-claude-subagents-agent`：

> Research the claude-code-best-practice project for subagents report drift. Check the last $ARGUMENTS versions (default: 10).
>
> Fetch these 2 external sources:
> 1. Sub-agents Reference: https://code.claude.com/docs/en/sub-agents
> 2. Changelog: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
>
> Then read the local report (`best-practice/claude-subagents.md`).
>
> Check for exactly two things:
> 1. **Frontmatter fields**: Compare the official docs' supported frontmatter fields table against the report's Frontmatter Fields table. Flag any fields that were added or removed.
> 2. **Official sub-agents**: Compare the official docs' built-in subagents list against the report's official agents table. Flag any agents that were added or removed.

---

## 阶段 2：读取以前的 Changelog 条目

**当代理运行时**，读取 `changelog/best-practice/claude-subagents/changelog.md` 获取最近 25 条条目。解析优先操作以识别：
- **重复项** — 以前出现过且仍未解决的问题
- **新项** — 首次出现的问题
- **已解决的项** — 之前标记现已有修复的问题

---

## 阶段 3：生成报告

**等待代理完成。** 生成包含以下部分的报告：

1. **前置配置字段更改** — 官方文档与我们报告中添加或移除的字段
2. **官方子代理更改** — 与我们表中添加或移除的内置代理

以优先的**行动项**摘要表结束。每个项目必须包含 `Status` 列，显示 `NEW`、`RECURRING (first seen: <date>)` 或 `RESOLVED`：

```
Priority Actions:
#  | Type           | Action                              | Status
1  | New Field      | Add <field> to frontmatter table    | NEW
2  | Removed Field  | Remove <field> from table           | RECURRING (first seen: <date>)
3  | New Agent      | Add <agent> to official agents table | NEW
4  | Removed Agent  | Remove <agent> from table           | NEW
```

还包含**自上次运行以来已解决**部分，列出以前运行中不再是问题的项目。

---

## 阶段 3.5：将摘要追加到 Changelog

**此阶段是强制性的 — 始终在向用户展示报告之前执行。**

读取现有 `changelog/best-practice/claude-subagents/changelog.md` 文件，然后**追加**（不要覆盖）一个新条目到末尾。条目格式必须精确为：

```markdown
---

## [<YYYY-MM-DD HH:MM AM/PM PKT>] Claude Code v<VERSION>

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH/MED/LOW | <type> | <action description> | <status> |
| ... | ... | ... | ... | ... |
```

**状态格式 — 必须使用以下三种格式之一：**
- `COMPLETE (reason)` — 已采取行动并成功解决
- `INVALID (reason)` — 发现不正确、不适用或故意为之
- `ON HOLD (reason)` — 行动推迟，等待外部依赖或用户决定

`(reason)` 是强制性的，必须简要说明做了什么或原因。

**追加规则：**
- 始终追加 — 永远不要覆盖或替换以前的条目
- 日期和时间是命令在巴基斯坦标准时间（PKT, UTC+5）执行的时间；通过运行 `TZ=Asia/Karachi date "+%Y-%m-%d %I:%M %p PKT"` 获取。版本来自代理发现
- 如果 `changelog/best-practice/claude-subagents/changelog.md` 不存在或为空，先创建状态图例表（见文件顶部），然后是第一个条目
- 每个条目由 `---` 分隔
- **仅包含 HIGH、MEDIUM 或 LOW 优先级的项目** — 省略 NONE 优先级项目

---

## 阶段 3.6：更新最后更新徽章

**此阶段是强制性的 — 始终在阶段 3.5 之后立即执行，在展示报告之前。**

更新 `best-practice/claude-subagents.md` 顶部的"Last Updated"徽章。运行 `TZ=Asia/Karachi date "+%b %d, %Y %-I:%M %p PKT"` 获取时间，对其进行 URL 编码（空格为 `%20`，逗号为 `%2C`），并替换徽章中的日期部分。如果 Claude Code 版本已更改，也更新徽章中的版本。

**不要在 changelog 或报告中将徽章更新记录为行动项。** 徽章同步是每次运行的例行部分，不是发现。

---

## 阶段 4：提供执行行动选项

展示报告后（并确认 changelog 和徽章都已更新），询问用户：

1. **执行所有行动** — 应用所有更改
2. **执行特定行动** — 用户选择要执行的编号
3. **只保存报告** — 不做更改

执行时：
- **新字段**：添加到前置配置字段表，包含正确的类型、必需状态和来自官方文档的描述
- **移除的字段**：移除前与用户确认
- **新代理**：添加到官方代理表，包含正确的 #、名称、模型、工具和描述
- **移除的代理**：移除前与用户确认

---

## 关键规则

1. **永远不要猜测** 版本或日期 — 使用来自代理的数据
2. **交叉引用字段计数** — 报告字段计数必须与官方文档匹配
3. **交叉引用代理计数** — 报告代理计数必须与官方文档匹配
4. **不要自动执行** — 始终先展示报告
5. **始终追加到 changelog** — 阶段 3.5 是强制性的。永远不要跳过。永远不要覆盖以前的条目。
6. **始终更新最后更新徽章** — 阶段 3.6 是强制性的。永远不要跳过。
7. **与以前的运行比较** — 读取 changelog 中最近 25 条条目，并将每个行动项标记为 NEW、RECURRING 或 RESOLVED。