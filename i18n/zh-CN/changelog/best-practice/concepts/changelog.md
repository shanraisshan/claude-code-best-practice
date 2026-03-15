# 变更日志 — README CONCEPTS 部分

追踪 README CONCEPTS 表与官方 Claude Code 文档之间的偏差。

## 状态图例

| 状态 | 含义 |
|--------|---------|
| `COMPLETE (reason)` | 已执行操作并成功解决 |
| `INVALID (reason)` | 发现不正确、不适用或故意为之 |
| `ON HOLD (reason)` | 操作延迟，等待外部依赖或用户决策 |

---

## [2026-03-02 11:14 AM PKT] Claude Code v2.1.63

| # | 优先级 | 类型 | 操作 | 状态 |
|---|----------|------|--------|--------|
| 1 | HIGH | 损坏 URL | 修复 Permissions URL 从 `/iam` 到 `/permissions` | COMPLETE (URL 已更新为 /permissions) |
| 2 | HIGH | 缺失概念 | 添加 Agent Teams 行到 CONCEPTS 表 | COMPLETE (已添加行，位置 ~\/\.claude\/teams\/) |
| 3 | HIGH | 缺失概念 | 添加 Keybindings 行到 CONCEPTS 表 | COMPLETE (已添加行，位置 ~\/\.claude\/keybindings\.json) |
| 4 | HIGH | 缺失概念 | 添加 Model Configuration 行到 CONCEPTS 表 | COMPLETE (已添加行，位置 \.claude\/settings\.json) |
| 5 | HIGH | 缺失概念 | 添加 Auto Memory 行到 CONCEPTS 表 | COMPLETE (已添加行，位置 ~\/\.claude\/projects\/<project>\/memory\/) |
| 6 | HIGH | 过时锚点 | 修复 Rules URL 锚点从 `#modular-rules-with-clauderules` 到 `#organize-rules-with-clauderules` | COMPLETE (锚点已更新) |
| 7 | MED | 缺失概念 | 添加 Checkpointing 行到 CONCEPTS 表 | COMPLETE (已添加行，位置为自动基于 git) |
| 8 | MED | 缺失概念 | 添加 Status Line 行到 CONCEPTS 表 | COMPLETE (已添加行，位置 ~\/\.claude\/settings\.json) |
| 9 | MED | 缺失概念 | 添加 Remote Control 行到 CONCEPTS 表 | COMPLETE (已添加行，位置 CLI \/ claude\.ai) |
| 10 | MED | 缺失概念 | 添加 Fast Mode 行到 CONCEPTS 表 | COMPLETE (已添加行，位置 \.claude\/settings\.json) |
| 11 | MED | 缺失概念 | 添加 Headless Mode 行到 CONCEPTS 表 | COMPLETE (已添加行，位置 CLI 标志 -p) |
| 12 | LOW | 描述变更 | 更新 Memory 描述以提及 auto memory | COMPLETE (描述和位置已更新) |
| 13 | LOW | 位置变更 | 更新 MCP Servers 位置以包含 `.mcp.json` | COMPLETE (位置已更新以包含 .mcp.json) |
| 14 | LOW | 缺失徽章 | 为 Hooks 行添加 Implemented 徽章 | COMPLETE (已添加 Implemented 徽章链接到 .claude/hooks/) |

---

## [2026-03-02 11:57 AM PKT] Claude Code v2.1.63

| # | 优先级 | 类型 | 操作 | 状态 |
|---|----------|------|--------|--------|
| 1 | HIGH | 表整合 | 将 CONCEPTS 表从 22 行整合为 10 行 — 将相关概念折叠为内联文档链接 | COMPLETE (22 → 10 行) |
| 2 | MED | 合并概念 | 将 Marketplaces 折叠到 Plugins 行作为内联链接 | COMPLETE (链接到 /discover-plugins) |
| 3 | MED | 合并概念 | 将 Agent Teams 折叠到 Sub-Agents 行作为内联链接 | COMPLETE (链接到 /agent-teams) |
| 4 | MED | 合并概念 | 将 Permissions、Model Config、Output Styles、Sandboxing、Keybindings、Status Line、Fast Mode 折叠到 Settings 行作为内联链接 | COMPLETE (已折叠 7 个概念并附带文档链接) |
| 5 | MED | 合并概念 | 将 Auto Memory 和 Rules 折叠到 Memory 行作为内联链接 | COMPLETE (链接到 /memory 和 /memory#organize-rules-with-clauderules) |
| 6 | MED | 合并概念 | 将 Headless Mode 折叠到 Remote Control 行作为内联链接 | COMPLETE (链接到 /headless) |
| 7 | LOW | 重排序 | 按逻辑分组重新排序表：构建块 → 扩展 → 配置 → 上下文 → 运行时 | COMPLETE (按关注点分组，而非时间顺序) |

---

## [2026-03-07 08:40 AM PKT] Claude Code v2.1.71

| # | 优先级 | 类型 | 操作 | 状态 |
|---|----------|------|--------|--------|
| 1 | HIGH | 损坏 URL | 修复 TIPS 中的 `context-management` → `interactive-mode`（第 112、115、135 行） | COMPLETE (3 处已替换为 interactive-mode) |
| 2 | HIGH | 损坏 URL | 修复 TIPS 中的 `model-configuration` → `model-config`（第 115、116、135 行） | COMPLETE (3 处已替换为 model-config) |
| 3 | HIGH | 损坏 URL | 修复 TIPS 中的 `usage-billing` → `costs`（第 115 行） | COMPLETE (已替换为 costs) |
| 4 | HIGH | 损坏 URL | 移除 STARTUPS 中的 `cowork` URL（第 167 行）— 页面不存在 | COMPLETE (已移除超链接，保留纯文本) |
| 5 | HIGH | 缺失概念 | 添加 Scheduled Tasks 行到 CONCEPTS 和 Hot 部分（`/loop`、cron 工具） | COMPLETE (由用户添加到两个表 + /loop 技巧 + Boris 推文) |
| 6 | MED | 位置变更 | 更新 Agent Teams 位置从 `.claude/agents/<name>.md` 到 `built-in (env var)` | COMPLETE (位置已更新为内置环境变量) |

---

## [2026-03-10 01:18 PM PKT] Claude Code v2.1.72

| # | 优先级 | 类型 | 操作 | 状态 |
|---|----------|------|--------|--------|
| 1 | HIGH | 损坏 URL | 修复 CONCEPTS 表中 Commands URL 从 `/slash-commands` 到 `/skills`（第 24 行）— `/slash-commands` 实际指向 Skills 页面；文档称「commands 已合并到 skills」 | INVALID (URL 仍可访问；用户选择保持现状) |
| 2 | HIGH | 损坏 URL | 修复 TIPS 部分中 Commands URL 从 `/slash-commands` 到 `/skills`（第 108 行）— 同一过时 URL | INVALID (URL 仍可访问；用户选择保持现状) |
| 3 | MED | 缺失内联链接 | 为 CLI Startup Flags 行添加 Interactive Mode（`/interactive-mode`）内联链接 — 涵盖 /compact、/clear、/context、/extra-usage | COMPLETE (已为 CLI Startup Flags 描述添加内联链接) |
| 4 | MED | 缺失内联链接 | 为 Settings 行添加 Costs（`/costs`）内联链接 — 涵盖 /usage、计费、按量付费 | INVALID (用户选择跳过) |
| 5 | LOW | 缺失概念 | 考虑添加 IDE Integrations 行（VS Code、JetBrains、Desktop App、Web）或到 Best Practices 的内联链接 | INVALID (用户选择跳过 — 属于平台表面，非配置概念) |
| 6 | HIGH | 缺失概念 | 在 Hot 表中添加 Code Review 行 — 多代理 PR 分析（研究预览，Teams 与 Enterprise） | COMPLETE (已作为 Hot 首条添加，含博客链接与最佳实践推文) |
| 7 | MED | 新徽章 | 创建 `!/tags/beta.svg` 标签（黄色，38x20px）并添加到 Hot 表中的 Code Review 和 Agent Teams | COMPLETE (已创建 beta.svg；已添加到 Code Review 和 Agent Teams 行) |
| 8 | MED | 重排序 | 按发布日期对 Hot 表排序（最新在前）：Code Review → Scheduled Tasks → Voice Mode → Agent Teams → Remote Control → Git Worktrees → Ralph Wiggum | COMPLETE (已交换 Voice Mode 与 Agent Teams 以匹配时间顺序) |