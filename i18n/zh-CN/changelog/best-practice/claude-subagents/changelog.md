# Subagents 报告 — 变更日志历史

## 状态图例

| 状态 | 含义 |
|--------|---------|
| COMPLETE (reason) | 已执行操作并成功解决 |
| INVALID (reason) | 发现不正确、不适用或故意为之 |
| ON HOLD (reason) | 操作延迟 — 等待外部依赖或用户决策 |

---

## [2026-02-28 03:22 PM PKT] Claude Code v2.1.63

| # | 优先级 | 类型 | 操作 | 状态 |
|---|----------|------|--------|--------|
| 1 | HIGH | Agents 表 | 添加 `workflow-changelog-claude-agents-frontmatter-agent` 到 Agents in This Repository 表 | COMPLETE (已添加，model: opus，继承所有工具，无 skills/memory) |
| 2 | HIGH | Agents 表 | 修复 presentation-curator skills 列 — 为技能名称添加 `presentation/` 前缀 | COMPLETE (已更新为 presentation/vibe-to-agentic-framework 等) |
| 3 | MED | 字段文档 | 为 `color` 字段添加说明，表明它功能正常但不在官方 frontmatter 表中 | COMPLETE (已在描述列添加非官方状态说明) |
| 4 | MED | 调用节 | 扩展调用节，添加 --agents CLI 标志、/agents 命令、claude agents CLI、agent 恢复 | COMPLETE (已添加含 5 种方法的调用方法表) |

---

## [2026-03-07 08:35 AM PKT] Claude Code v2.1.71

| # | 优先级 | 类型 | 操作 | 状态 |
|---|----------|------|--------|--------|
| 1 | HIGH | 损坏链接 | 修复 agent memory 链接到 `reports/claude-agent-memory.md` | COMPLETE |
| 2 | HIGH | 行为变更 | 更新 `tools` 字段描述：`Task(agent_type)` → `Agent(agent_type)`（v2.1.63 重命名） | COMPLETE |
| 3 | HIGH | 行为变更 | 更新调用节：Task 工具 → Agent 工具（v2.1.63 重命名） | COMPLETE (已更新标题、代码示例并添加重命名说明) |
| 4 | HIGH | 示例更新 | 更新完整功能示例：`Task(monitor, rollback)` → `Agent(monitor, rollback)` | COMPLETE |
| 5 | HIGH | 内置 Agent | 添加 `Bash` agent 到 Official Claude Agents 表（model: inherit，用途：在独立上下文中执行终端命令） | COMPLETE (已添加到表) |
| 6 | HIGH | Agents 表 | 添加 `workflow-concepts-agent` 到 Agents in This Repository 表（model: opus，color: green） | COMPLETE |
| 7 | HIGH | Agents 表 | 添加 `workflow-claude-settings-agent` 到 Agents in This Repository 表（model: opus，color: yellow） | COMPLETE |
| 8 | MED | 内置 Agent | 修复 `statusline-setup` model：`inherit` → `Sonnet` | COMPLETE |
| 9 | MED | 内置 Agent | 修复 `claude-code-guide` model：`inherit` → `Haiku` | NOT APPLICABLE (已从表中移除) |
| 10 | MED | Agents 表 | 修复 `weather-agent` color：`teal` → `green` | COMPLETE |
| 11 | MED | 调用 | 添加 `--agent <name>` CLI 标志到调用方法表 | COMPLETE (已添加为调用方法表第一行) |
| 12 | MED | 行为变更 | 更新第 147 行文本：Official Claude Agents 表标题中的 "Task tool" → "Agent tool" | COMPLETE (用户重写了标题文本) |
| 13 | MED | 跨文件 | 更新 CLAUDE.md：`Task(...)` → `Agent(...)` 引用（第 50-53、61 行） | COMPLETE (已更新编排节和 tools 字段描述) |