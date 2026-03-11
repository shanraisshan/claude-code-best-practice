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