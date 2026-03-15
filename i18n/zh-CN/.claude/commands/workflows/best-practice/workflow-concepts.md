---
description: 使用最新的 Claude Code 功能和概念更新 README CONCEPTS 部分
argument-hint: [要检查的 changelog 版本数，默认 10]
---

# Workflow Changelog — README Concepts（README 概念）

你是 claude-code-best-practice 项目的协调员。你的工作是并行启动两个研究代理、等待结果、合并发现，并呈现关于**README CONCEPTS 部分**（`README.md`）漂移的统一报告。

**待检查版本：** `$ARGUMENTS`（如果为空或不是数字则默认：10）

这是一个**先读取后报告**的工作流。启动代理、合并结果并生成报告。仅在用户批准后采取行动。

---

## 阶段 0：并行启动两个代理

**立即**使用 Task 工具**在同一消息中**启动两个代理（并行启动）：

### Agent 1: workflow-concepts-agent

使用 `subagent_type: "workflow-concepts-agent"` 启动。给它以下提示：

> Research the claude-code-best-practice project for README CONCEPTS section drift. Check the last $ARGUMENTS versions (default: 10).
>
> Fetch these 3 external sources:
> 1. Claude Code Docs Index: https://code.claude.com/docs/en
> 2. Claude Code Changelog: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
> 3. Claude Code Features Overview: https://code.claude.com/docs/en/overview
>
> Then read the local README.md (specifically the CONCEPTS table), CLAUDE.md, and `reports/claude-global-vs-project-settings.md`. Analyze differences between what the official docs list as Claude Code concepts/features and what our README CONCEPTS table documents. Return a structured findings report covering missing concepts, changed concepts, deprecated concepts, URL accuracy, description accuracy, and badge accuracy.

### Agent 2: claude-code-guide

使用 `subagent_type: "claude-code-guide"` 启动。给它以下提示：

> Research the latest Claude Code features and concepts. I need you to find the COMPLETE list of all Claude Code concepts/features that should be documented. For each, provide:
> 1. Official feature name
> 2. Official docs URL
> 3. File system location (e.g., `.claude/commands/`, `~/.claude/teams/`)
> 4. Brief description (one line)
> 5. When it was introduced (version/date if known)
>
> Specifically check for these potentially missing concepts:
> - **Worktrees** — git worktree isolation for parallel development
> - **Agent Teams** — multi-agent coordination
> - **Tasks** — persistent task lists across sessions
> - **Auto Memory** — Claude's self-written project learnings
> - **Keybindings** — custom keyboard shortcuts
> - **Remote Connections** — SSH, Docker, cloud development
> - **IDE Integration** — VS Code, JetBrains extensions
> - **Model Configuration** — model selection and routing
> - **GitHub Integration** — PR reviews, issue triage
> - Any other concept from recent Claude Code versions
>
> Be thorough — search the web, fetch docs, and provide concrete version numbers and details for everything you find.

两个代理独立运行并返回其发现。

---

## 阶段 0.5：读取验证清单

**当代理运行时**，读取 `changelog/best-practice/concepts/verification-checklist.md`（如果存在）。此文件包含累积的验证规则。如果不存在，跳过此步骤 — 它将在阶段 2 中创建。

---

## 阶段 1：读取以前的 Changelog 条目

**合并发现前**，读取文件 `changelog/best-practice/concepts/changelog.md`（如果存在）获取以前的 changelog 条目。每个条目由 `---` 分隔。从这些以前的条目中解析优先操作，以便与当前发现进行比较。这让你能识别：
- **重复项** — 以前出现过且仍未解决的问题
- **新解决的项** — 以前运行中的问题现已修复
- **新项** — 此次运行中首次出现的问题

如果文件尚不存在，所有项目都是 `NEW`。

---

## 阶段 2：合并发现并生成报告

**等待两个代理完成。** 一旦你有：
- **workflow-concepts-agent 发现** — 详细的本地文件读取、外部文档获取和漂移检测分析
- **claude-code-guide 发现** — 关于最新 Claude Code 功能和概念的独立研究

交叉引用两者。专用代理提供 CONCEPTS 特定的漂移分析，而 claude-code-guide 代理可能发现它遗漏的内容（例如非常最近的更改、未记录的功能或来自 web 搜索的上下文）。标记两者之间的任何矛盾，让用户解决。

**执行验证清单（如果存在）：** 对于 `changelog/best-practice/concepts/verification-checklist.md` 中的每个规则，执行检查。在报告中包含**验证日志**部分。

**如果需要更新清单：** 如果发现揭示了现有清单规则未涵盖的新类型漂移，向 `changelog/best-practice/concepts/verification-checklist.md` 追加新规则。如果文件不存在，创建它。规则必须包括：类别、检查什么、深度级别、与哪个源比较、添加日期和来源。

还要将当前发现与以前的 changelog 条目（来自阶段 1）进行比较。对于每个优先操作，将其标记为：
- `NEW` — 此问题首次出现
- `RECURRING` — 在以前的运行中出现过且仍未解决（包括首次出现的运行日期）
- `RESOLVED` — 在以前的运行中出现过但现已修复（包括解决日期）

生成包含以下部分的结构化报告：

1. **缺失的概念** — 官方文档中存在但 CONCEPTS 表中缺失的功能/概念，包含：
   - 官方名称和文档 URL
   - 推荐的 Location 列值
   - 推荐的 Description 列值
   - 准备粘贴的确切 markdown 表格行
   - 引入版本（如已知）
2. **更改的概念** — 名称、URL、位置或描述已更改的概念
3. **弃用/移除的概念** — CONCEPTS 表中存在但官方文档中不再存在的概念
4. **URL 准确性** — 每个概念的 URL 验证
5. **描述准确性** — 每个概念的描述/位置验证
6. **徽章准确性** — 徽章链接验证和缺失徽章建议
7. **claude-code-guide 代理发现** — 该代理发现的专用代理未捕获的独特见解。仅包含添加新信息的发现。标记矛盾。

以优先的**行动项**摘要表结束：

```
Priority Actions:
#  | Type                | Action                                     | Status
1  | Missing Concept     | Add <concept> row to CONCEPTS table         | NEW
2  | Changed URL         | Update <concept> docs link                  | NEW
3  | Changed Description | Update <concept> description                | RECURRING (first seen: <date>)
4  | Deprecated Concept  | Remove <concept> row from CONCEPTS table    | NEW
5  | Broken Badge        | Fix badge link for <concept>                | NEW
```

还包含**自上次运行以来已解决**部分，列出以前运行中不再是问题的任何项目。

---

## 阶段 2.5：将摘要追加到 Changelog

**此阶段是强制性的 — 始终在向用户展示报告之前执行。**

读取现有 `changelog/best-practice/concepts/changelog.md` 文件，然后**追加**（不要覆盖）一个新条目到末尾。如果文件不存在，先创建状态图例表，然后是第一个条目。条目格式必须精确为：

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
- 每个条目由 `---` 分隔
- **仅包含 HIGH、MEDIUM 或 LOW 优先级的项目** — 省略 NONE 优先级项目

---

## 阶段 2.6：更新最后更新徽章

**此阶段是强制性的 — 始终在阶段 2.5 之后立即执行，在展示报告之前。**

更新 `README.md` 顶部（第 3 行）的"Last Updated"徽章。运行 `TZ=Asia/Karachi date "+%b %d, %Y %-I:%M %p PKT"` 获取时间，对其进行 URL 编码（空格为 `%20`，逗号为 `%2C`），并替换徽章中的日期部分。

**不要在 changelog 或报告中将徽章更新记录为行动项。**

---

## 阶段 2.7：验证所有 CONCEPTS URL

**此阶段是强制性的 — 始终在阶段 2.6 之后执行，在展示报告之前。**

对于 CONCEPTS 表中的每个概念：

1. **外部文档 URL**（例如 `https://code.claude.com/docs/en/skills`）：使用 WebFetch 获取每个 URL 并验证它返回有效页面。标记任何死链或已移动的链接。
2. **本地徽章链接**（例如 `best-practice/claude-commands.md`）：使用 Read 工具验证文件存在。标记任何损坏的链接。
3. **实现徽章链接**（例如 `.claude/commands/`）：验证路径存在。

在报告中包含**URL 验证日志**：

```
URL Validation Log:
#  | Concept     | URL Type  | URL                                           | Status | Notes
1  | Commands    | External  | https://code.claude.com/docs/en/skills         | OK     |
2  | Commands    | Badge     | best-practice/claude-commands.md               | OK     |
3  | Sub-Agents  | External  | https://code.claude.com/docs/en/sub-agents     | OK     |
...
```

**如果有任何 URL 损坏**，将它们作为 HIGH 优先级行动项添加。

---

## 阶段 3：提供执行行动选项

展示报告后（并确认 changelog 已更新），询问用户：

1. **执行所有行动** — 添加缺失概念、更新已更改概念、移除已弃用概念
2. **执行特定行动** — 用户选择要执行的编号
3. **只保存报告** — 不做更改

执行时：
- **缺失的概念**：按照现有格式向 `README.md` 中的 CONCEPTS 表添加新行：
  ```
  | [**Name**](docs-url) | `location` | Description |
  ```
  仅在相应文件存在时添加徽章（best-practice、implemented）。
- **更改的概念**：更新已更改的特定列
- **弃用的概念**：移除行前与用户确认
- **损坏的 URL**：将 URL 修复为当前有效的 URL
- **徽章修复**：将徽章链接更新为正确的文件路径
- 保持与现有表格一致的字母顺序或逻辑顺序
- 所有行动完成后，重新验证 CONCEPTS 表的一致性

---

## 关键规则

1. **在单条消息中并行启动两个代理** — 永远不要顺序启动
2. **生成报告前等待两个代理**
3. **永远不要猜测** 版本、URL 或日期 — 使用来自代理的数据
4. **缺失的概念是高优先级** — CONCEPTS 表是开发者首先看到的内容
5. **验证每个 URL** — 损坏的链接会降低整个项目的信任度
6. **不要自动执行** — 始终先展示报告
7. **始终追加到 changelog** — 阶段 2.5 是强制性的。永远不要跳过。永远不要覆盖以前的条目。
8. **与以前的运行比较** — 读取 changelog 中以前的条目，并将每个行动项标记为 NEW、RECURRING 或 RESOLVED。
9. **如果存在验证清单则执行** — 读取 verification-checklist.md 并执行每个规则。如果文件不存在且有需要持久规则的发现，则创建它。
10. **始终更新最后更新徽章** — 阶段 2.6 是强制性的。
11. **始终验证所有 CONCEPTS URL** — 阶段 2.7 是强制性的。损坏的 URL 是 HIGH 优先级。
12. **提供准备好粘贴的行** — 对于缺失的概念，包含确切的 markdown 表格行，以便执行时复制粘贴。
13. **尊重现有表格格式** — 匹配现有行的列结构、徽章模式和链接样式。