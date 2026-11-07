# claude-code-best-practice
从氛围编程到智能体工程 — 实践让 Claude 更完美

![updated with Claude Code](https://img.shields.io/badge/updated_with_Claude_Code-v2.1.97%20(Apr%2010%2C%202026%2012%3A30%20AM%20PKT)-white?style=flat&labelColor=555) <a href="https://github.com/shanraisshan/claude-code-best-practice/stargazers"><img src="https://img.shields.io/github/stars/shanraisshan/claude-code-best-practice?style=flat&label=%E2%98%85&labelColor=555&color=white" alt="GitHub Stars"></a><br>

[![最佳实践](!/tags/best-practice.svg)](best-practice/) [![已实现](!/tags/implemented.svg)](implementation/) [![编排工作流](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) [![Claude](!/tags/claude.svg)](https://code.claude.com/docs) [![Boris](!/tags/boris-cherny.svg)](#-tips-and-tricks) [![社区](!/tags/community.svg)](#-subscribe) ![点击下方徽章查看原始来源](!/tags/click-badges.svg)<br>
<img src="!/tags/a.svg" height="14"> = 智能体 · <img src="!/tags/c.svg" height="14"> = 命令 · <img src="!/tags/s.svg" height="14"> = 技能

<p align="center">
  <img src="!/claude-jumping.svg" alt="Claude Code 吉祥物跳跃" width="120" height="100"><br>
  <a href="https://github.com/trending"><img src="!/root/github-trending-day.svg" alt="GitHub 当日趋势榜 #1 仓库"></a>
</p>

<p align="center">
  <img src="!/root/boris-slider.gif" alt="Boris Cherny 谈 Claude Code" width="600"><br>
  Boris Cherny 在 X 上 (<a href="https://x.com/bcherny/status/2007179832300581177">推文 1</a> · <a href="https://x.com/bcherny/status/2017742741636321619">推文 2</a> · <a href="https://x.com/bcherny/status/2021699851499798911">推文 3</a>)
</p>


## 🧠 核心概念

| 功能 | 位置 | 描述 |
|---------|----------|-------------|
| <img src="!/tags/a.svg" height="14"> [**子智能体**](https://code.claude.com/docs/en/sub-agents) | `.claude/agents/<name>.md` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-subagents.md) [![已实现](!/tags/implemented.svg)](implementation/claude-subagents-implementation.md) 在全新隔离上下文中运行的自主执行者 — 自定义工具、权限、模型、记忆和持久身份 |
| <img src="!/tags/c.svg" height="14"> [**命令**](https://code.claude.com/docs/en/slash-commands) | `.claude/commands/<name>.md` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-commands.md) [![已实现](!/tags/implemented.svg)](implementation/claude-commands-implementation.md) 注入到现有上下文中的知识 — 简单的用户调用提示模板，用于工作流编排 |
| <img src="!/tags/s.svg" height="14"> [**技能**](https://code.claude.com/docs/en/skills) | `.claude/skills/<name>/SKILL.md` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-skills.md) [![已实现](!/tags/implemented.svg)](implementation/claude-skills-implementation.md) 注入到现有上下文中的知识 — 可配置、可预加载、可自动发现，支持上下文分叉和渐进式披露 · [官方技能](https://github.com/anthropics/skills/tree/main/skills) |
| [**工作流**](https://code.claude.com/docs/en/common-workflows) | [`.claude/commands/weather-orchestrator.md`](.claude/commands/weather-orchestrator.md) | [![编排工作流](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) |
| [**钩子**](https://code.claude.com/docs/en/hooks) | `.claude/hooks/` | [![最佳实践](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-hooks) [![已实现](!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-hooks) 用户自定义处理器（脚本、HTTP、提示、智能体），在特定事件中于智能体循环之外运行 · [指南](https://code.claude.com/docs/en/hooks-guide) |
| [**MCP 服务器**](https://code.claude.com/docs/en/mcp) | `.claude/settings.json`, `.mcp.json` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-mcp.md) [![已实现](!/tags/implemented.svg)](.mcp.json) 模型上下文协议连接，用于外部工具、数据库和 API |
| [**插件**](https://code.claude.com/docs/en/plugins) | 可分发包 | 技能、子智能体、钩子、MCP 服务器和 LSP 服务器的捆绑包 · [市场](https://code.claude.com/docs/en/discover-plugins) · [创建市场](https://code.claude.com/docs/en/plugin-marketplaces) |
| [**设置**](https://code.claude.com/docs/en/settings) | `.claude/settings.json` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-settings.md) [![已实现](!/tags/implemented.svg)](.claude/settings.json) 层级化配置系统 · [权限](https://code.claude.com/docs/en/permissions) · [模型配置](https://code.claude.com/docs/en/model-config) · [输出样式](https://code.claude.com/docs/en/output-styles) · [沙箱](https://code.claude.com/docs/en/sandboxing) · [快捷键](https://code.claude.com/docs/en/keybindings) · [快速模式](https://code.claude.com/docs/en/fast-mode) |
| [**状态栏**](https://code.claude.com/docs/en/statusline) | `.claude/settings.json` | [![最佳实践](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-status-line) [![已实现](!/tags/implemented.svg)](.claude/settings.json) 可自定义状态栏，显示上下文用量、模型、费用和会话信息 |
| [**记忆**](https://code.claude.com/docs/en/memory) | `CLAUDE.md`, `.claude/rules/`, `~/.claude/rules/`, `~/.claude/projects/<project>/memory/` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-memory.md) [![已实现](!/tags/implemented.svg)](CLAUDE.md) 通过 CLAUDE.md 文件和 `@path` 导入实现持久上下文 · [自动记忆](https://code.claude.com/docs/en/memory) · [规则](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) |
| [**检查点**](https://code.claude.com/docs/en/checkpointing) | 自动（基于 git） | 自动跟踪文件编辑，支持回退（`Esc Esc` 或 `/rewind`）和定向摘要 |
| [**CLI 启动参数**](https://code.claude.com/docs/en/cli-reference) | `claude [flags]` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-cli-startup-flags.md) 启动 Claude Code 的命令行参数、子命令和环境变量 · [交互模式](https://code.claude.com/docs/en/interactive-mode) · [环境变量](https://code.claude.com/docs/en/env-vars) |
| **AI 术语** | | [![最佳实践](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-codex-cursor-gemini/blob/main/reports/ai-terms.md) 智能体工程 · 上下文工程 · 氛围编程 |
| [**最佳实践**](https://code.claude.com/docs/en/best-practices) | | 官方最佳实践 · [提示工程](https://github.com/anthropics/prompt-eng-interactive-tutorial) · [扩展 Claude Code](https://code.claude.com/docs/en/features-overview) |

### 🔥 热门功能

| 功能 | 位置 | 描述 |
|---------|----------|-------------|
| [**能量提升**](best-practice/claude-power-ups.md) | `/powerup` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-power-ups.md) 通过动画演示教授 Claude Code 功能的交互式课程（v2.1.90） |
| [**超级计划**](https://code.claude.com/docs/en/ultraplan) ![beta](!/tags/beta.svg) | `/ultraplan` | 在云端起草计划，支持基于浏览器的审查、内联评论和灵活执行 — 远程或传送回终端 |
| [**Claude Code Web**](https://code.claude.com/docs/en/claude-code-on-the-web) ![beta](!/tags/beta.svg) | `claude.ai/code` | 在云基础设施上运行任务 — 长时间任务、PR 自动修复、并行会话，无需本地设置 · [定时任务](https://code.claude.com/docs/en/web-scheduled-tasks) |
| [**Agent SDK**](https://code.claude.com/docs/en/agent-sdk/overview) | `npm` / `pip` 包 | 以 Claude Code 为库构建生产级 AI 智能体 — Python 和 TypeScript SDK，内置工具、钩子、子智能体和 MCP · [快速入门](https://code.claude.com/docs/en/agent-sdk/quickstart) · [示例](https://github.com/anthropics/claude-agent-sdk-demos) |
| [**无闪烁模式**](https://code.claude.com/docs/en/fullscreen) ![beta](!/tags/beta.svg) | `CLAUDE_CODE_NO_FLICKER=1` | [![最佳实践](!/tags/best-practice.svg)](https://x.com/bcherny/status/2039421575422980329) 无闪烁的备用屏幕渲染，支持鼠标操作、稳定内存和应用内滚动 — 可选的研究预览版 |
| [**计算机操控**](https://code.claude.com/docs/en/computer-use) ![beta](!/tags/beta.svg) | `computer-use` MCP 服务器 | 让 Claude 控制你的屏幕 — 打开应用、点击、输入和截取屏幕，支持 macOS · [桌面版](https://code.claude.com/docs/en/desktop#let-claude-use-your-computer) |
| [**自动模式**](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) ![beta](!/tags/beta.svg) | `claude --enable-auto-mode` | [![最佳实践](!/tags/best-practice.svg)](https://x.com/claudeai/status/2036503582166393240) 后台安全分类器替代手动权限提示 — Claude 决定什么是安全的，同时拦截提示注入和危险升级 · 使用 `claude --enable-auto-mode`（或 `--permission-mode auto`）启动，或在会话中用 `Shift+Tab` 切换 · [博客](https://claude.com/blog/auto-mode) |
| [**频道**](https://code.claude.com/docs/en/channels) ![beta](!/tags/beta.svg) | `--channels`，基于插件 | 将 Telegram、Discord 或 Webhook 的事件推送到运行中的会话 — Claude 在你离开时自动响应 · [参考文档](https://code.claude.com/docs/en/channels-reference) |
| [**Slack**](https://code.claude.com/docs/en/slack) | Slack 中的 `@Claude` | 在团队聊天中 @Claude 并附带编码任务 — 路由到 Claude Code Web 会话进行 bug 修复、代码审查和并行任务执行 |
| [**代码审查**](https://code.claude.com/docs/en/code-review) ![beta](!/tags/beta.svg) | GitHub App（托管） | [![最佳实践](!/tags/best-practice.svg)](https://x.com/claudeai/status/2031088171262554195) 多智能体 PR 分析，捕捉 bug、安全漏洞和回归 · [博客](https://claude.com/blog/code-review) |
| [**GitHub Actions**](https://code.claude.com/docs/en/github-actions) | `.github/workflows/` | 在 CI/CD 流水线中自动化 PR 审查、问题分类和代码生成 · [GitLab CI/CD](https://code.claude.com/docs/en/gitlab-ci-cd) |
| [**Chrome**](https://code.claude.com/docs/en/chrome) ![beta](!/tags/beta.svg) | `--chrome`，扩展 | [![最佳实践](!/tags/best-practice.svg)](reports/claude-in-chrome-v-chrome-devtools-mcp.md) 通过 Claude in Chrome 进行浏览器自动化 — 测试 Web 应用、通过控制台调试、自动化表单、从页面提取数据 |
| [**定时任务**](https://code.claude.com/docs/en/scheduled-tasks) | `/loop`、`/schedule`、cron 工具 | [![最佳实践](!/tags/best-practice.svg)](https://x.com/bcherny/status/2030193932404150413) [![已实现](!/tags/implemented.svg)](implementation/claude-scheduled-tasks-implementation.md) `/loop` 在本地按循环计划运行提示（最多 3 天）· [`/schedule`](https://code.claude.com/docs/en/web-scheduled-tasks) 在 Anthropic 基础设施的云端运行提示 — 即使电脑关机也能工作 · [公告](https://x.com/noahzweben/status/2036129220959805859) |
| [**语音听写**](https://code.claude.com/docs/en/voice-dictation) ![beta](!/tags/beta.svg) | `/voice` | [![最佳实践](!/tags/best-practice.svg)](https://x.com/trq212/status/2028628570692890800) 按住说话的语音输入提示，支持 20 种语言，可重新绑定激活键 |
| [**简化与批量**](https://code.claude.com/docs/en/skills#bundled-skills) | `/simplify`、`/batch` | [![最佳实践](!/tags/best-practice.svg)](https://x.com/bcherny/status/2027534984534544489) 内置技能，用于代码质量和批量操作 — 简化重构以提高复用性和效率，批量跨文件运行命令 |
| [**智能体团队**](https://code.claude.com/docs/en/agent-teams) ![beta](!/tags/beta.svg) | 内置（环境变量） | [![最佳实践](!/tags/best-practice.svg)](https://x.com/bcherny/status/2019472394696683904) [![已实现](!/tags/implemented.svg)](implementation/claude-agent-teams-implementation.md) 多个智能体在相同代码库上并行工作，通过共享任务协调 |
| [**远程控制**](https://code.claude.com/docs/en/remote-control) | `/remote-control`、`/rc` | [![最佳实践](!/tags/best-practice.svg)](https://x.com/noahzweben/status/2032533699116355819) 从任何设备继续本地会话 — 手机、平板或浏览器 · [无头模式](https://code.claude.com/docs/en/headless) |
| [**Git Worktrees**](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees) | 内置 | [![最佳实践](!/tags/best-practice.svg)](https://x.com/bcherny/status/2025007393290272904) 用于并行开发的隔离 git 分支 — 每个智能体拥有自己的工作副本 |
| [**Ralph Wiggum 循环**](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum) | 插件 | [![最佳实践](!/tags/best-practice.svg)](https://github.com/ghuntley/how-to-ralph-wiggum) [![已实现](!/tags/implemented.svg)](https://github.com/shanraisshan/novel-llm-26) 用于长时间任务的自主开发循环 — 迭代直到完成 |

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

<a id="orchestration-workflow"></a>

## <a href="orchestration-workflow/orchestration-workflow.md"><img src="!/tags/orchestration-workflow-hd.svg" alt="编排工作流"></a>

参见 [编排工作流](orchestration-workflow/orchestration-workflow.md) 了解 <img src="!/tags/c.svg" height="14"> **命令** → <img src="!/tags/a.svg" height="14"> **智能体** → <img src="!/tags/s.svg" height="14"> **技能** 模式的实现细节。


<p align="center">
  <img src="orchestration-workflow/orchestration-workflow.svg" alt="命令 技能 智能体 架构流程" width="100%">
</p>

<p align="center">
  <img src="orchestration-workflow/orchestration-workflow.gif" alt="编排工作流演示" width="600">
</p>

![使用方法](!/tags/how-to-use.svg)

```bash
claude
/weather-orchestrator
```

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

## ⚙️ 开发工作流

所有主要工作流都遵循相同的架构模式：**研究 → 计划 → 执行 → 审查 → 交付**

| 名称 | ★ | 独特性 | 计划 | <img src="!/tags/a.svg" height="14"> | <img src="!/tags/c.svg" height="14"> | <img src="!/tags/s.svg" height="14"> |
|------|---|------------|------|---|---|---|
| [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) | 148k | ![直觉评分](https://img.shields.io/badge/instinct_scoring-ddf4ff) ![AgentShield](https://img.shields.io/badge/AgentShield-ddf4ff) ![多语言规则](https://img.shields.io/badge/multi--lang_rules-ddf4ff) | <img src="!/tags/a.svg" height="14"> [planner](https://github.com/affaan-m/everything-claude-code/blob/main/agents/planner.md) | 47 | 82 | 182 |
| [Superpowers](https://github.com/obra/superpowers) | 143k | ![TDD 优先](https://img.shields.io/badge/TDD--first-ddf4ff) ![铁律](https://img.shields.io/badge/Iron_Laws-ddf4ff) ![全计划审查](https://img.shields.io/badge/whole--plan_review-ddf4ff) | <img src="!/tags/s.svg" height="14"> [writing-plans](https://github.com/obra/superpowers/tree/main/skills/writing-plans) | 5 | 3 | 14 |
| [Spec Kit](https://github.com/github/spec-kit) | 87k | ![规范驱动](https://img.shields.io/badge/spec--driven-ddf4ff) ![宪法](https://img.shields.io/badge/constitution-ddf4ff) ![22+ 工具](https://img.shields.io/badge/22%2B_tools-ddf4ff) | <img src="!/tags/c.svg" height="14"> [speckit.plan](https://github.com/github/spec-kit/blob/main/templates/commands/plan.md) | 0 | 9+ | 0 |
| [gstack](https://github.com/garrytan/gstack) | 68k | ![角色人设](https://img.shields.io/badge/role_personas-ddf4ff) ![/codex 审查](https://img.shields.io/badge/%2Fcodex_review-ddf4ff) ![并行冲刺](https://img.shields.io/badge/parallel_sprints-ddf4ff) | <img src="!/tags/s.svg" height="14"> [autoplan](https://github.com/garrytan/gstack/tree/main/autoplan) | 0 | 0 | 37 |
| [Get Shit Done](https://github.com/gsd-build/get-shit-done) | 50k | ![全新 200K 上下文](https://img.shields.io/badge/fresh_200K_contexts-ddf4ff) ![波次执行](https://img.shields.io/badge/wave_execution-ddf4ff) ![XML 计划](https://img.shields.io/badge/XML_plans-ddf4ff) | <img src="!/tags/a.svg" height="14"> [gsd-planner](https://github.com/gsd-build/get-shit-done/blob/main/agents/gsd-planner.md) | 24 | 68 | 0 |
| [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | 44k | ![完整 SDLC](https://img.shields.io/badge/full_SDLC-ddf4ff) ![智能体人设](https://img.shields.io/badge/agent_personas-ddf4ff) ![22+ 平台](https://img.shields.io/badge/22%2B_platforms-ddf4ff) | <img src="!/tags/s.svg" height="14"> [bmad-create-prd](https://github.com/bmad-code-org/BMAD-METHOD/tree/main/src/bmm-skills/2-plan-workflows/bmad-create-prd) | 0 | 0 | 39 |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | 39k | ![增量规范](https://img.shields.io/badge/delta_specs-ddf4ff) ![棕地项目](https://img.shields.io/badge/brownfield-ddf4ff) ![制品 DAG](https://img.shields.io/badge/artifact_DAG-ddf4ff) | <img src="!/tags/c.svg" height="14"> [opsx:propose](https://github.com/Fission-AI/OpenSpec/blob/main/src/commands/workflow/new-change.ts) | 0 | 11 | 0 |
| [oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) | 27k | ![团队编排](https://img.shields.io/badge/teams_orchestration-ddf4ff) ![tmux 工作者](https://img.shields.io/badge/tmux_workers-ddf4ff) ![技能自动注入](https://img.shields.io/badge/skill_auto--inject-ddf4ff) | <img src="!/tags/s.svg" height="14"> [ralplan](https://github.com/Yeachan-Heo/oh-my-claudecode/tree/main/skills/ralplan) | 19 | 0 | 37 |
| [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin) | 14k | ![复合学习](https://img.shields.io/badge/Compound_Learning-ddf4ff) ![多平台 CLI](https://img.shields.io/badge/Multi--Platform_CLI-ddf4ff) ![插件市场](https://img.shields.io/badge/Plugin_Marketplace-ddf4ff) | <img src="!/tags/s.svg" height="14"> [ce-plan](https://github.com/EveryInc/compound-engineering-plugin/tree/main/plugins/compound-engineering/skills/ce-plan) | 51 | 4 | 43 |
| [HumanLayer](https://github.com/humanlayer/humanlayer) | 10k | ![RPI](https://img.shields.io/badge/RPI-ddf4ff) ![上下文工程](https://img.shields.io/badge/context_engineering-ddf4ff) ![30万+ 行代码](https://img.shields.io/badge/300k%2B_LOC-ddf4ff) | <img src="!/tags/c.svg" height="14"> [create_plan](https://github.com/humanlayer/humanlayer/blob/main/.claude/commands/create_plan.md) | 6 | 27 | 0 |

### 其他

- [跨模型（Claude Code + Codex）工作流](development-workflows/cross-model-workflow/cross-model-workflow.md) [![已实现](!/tags/implemented.svg)](development-workflows/cross-model-workflow/cross-model-workflow.md)
- [RPI](development-workflows/rpi/rpi-workflow.md) [![已实现](!/tags/implemented.svg)](development-workflows/rpi/rpi-workflow.md)
- [Ralph Wiggum 循环](https://www.youtube.com/watch?v=eAtvoGlpeRU) [![已实现](!/tags/implemented.svg)](https://github.com/shanraisshan/novel-llm-26)
- [Andrej Karpathy（OpenAI 联合创始人）工作流](https://x.com/karpathy/status/2015883857489522876)
- [Peter Steinberger（OpenClaw 创建者）工作流](https://youtu.be/8lF7HmQ_RgY?t=2582)
- Boris Cherny（Claude Code 创建者）工作流 — [13 条技巧](tips/claude-boris-13-tips-03-jan-26.md) · [10 条技巧](tips/claude-boris-10-tips-01-feb-26.md) · [12 条技巧](tips/claude-boris-12-tips-12-feb-26.md) · [2 条技巧](tips/claude-boris-2-tips-25-mar-26.md) · [15 条技巧](tips/claude-boris-15-tips-30-mar-26.md) [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny)

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

## 💡 技巧与窍门（69 条）

🚫👶 = 不需要手动看管

[提示技巧](#tips-prompting) · [规划技巧](#tips-planning) · [CLAUDE.md](#tips-claudemd) · [智能体](#tips-agents) · [命令](#tips-commands) · [技能](#tips-skills) · [钩子](#tips-hooks) · [工作流](#tips-workflows) · [高级技巧](#tips-workflows-advanced) · [Git / PR](#tips-git-pr) · [调试](#tips-debugging) · [实用工具](#tips-utilities) · [日常习惯](#tips-daily)

![社区](!/tags/community.svg)

<a id="tips-prompting"></a>■ **提示技巧（3 条）**

| 技巧 | 来源 |
|-----|--------|
| 给 Claude 出难题 — "严格审查这些修改，等我通过你的测试后再创建 PR" 或 "证明这能正常工作"，然后让 Claude 对比 main 分支和你的分支差异 🚫👶 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742752566632544) |
| 在一个平庸的修复之后 — "鉴于你现在所知的一切，废弃这个方案，实现优雅的解决方案" 🚫👶 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742752566632544) |
| Claude 能自行修复大部分 bug — 粘贴 bug，说"修复"，不要微观管理如何修复 🚫👶 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742750473720121) |

<a id="tips-planning"></a>■ **规划与规范（6 条）**

| 技巧 | 来源 |
|-----|--------|
| 始终从[计划模式](https://code.claude.com/docs/en/common-workflows)开始 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179845336527000) |
| 从最小规范或提示开始，让 Claude 使用 [AskUserQuestion](https://code.claude.com/docs/en/cli-reference) 工具来面试你，然后新建会话执行规范 | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2005315275026260309) |
| 始终制定分阶段门控计划，每个阶段包含多种测试（单元测试、自动化测试、集成测试） | |
| 启动第二个 Claude 以资深工程师身份审查你的计划，或使用[跨模型](development-workflows/cross-model-workflow/cross-model-workflow.md)进行审查 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742745365057733) |
| 编写详细的规范以减少歧义再移交工作 — 你越具体，输出越好 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742752566632544) |
| 原型 > PRD — 构建 20-30 个版本而不是写规范，构建成本很低所以多尝试 | [![Boris](!/tags/boris-cherny.svg)](https://youtu.be/julbw1JuAz0?t=3630) [![视频](!/tags/video.svg)](https://youtu.be/julbw1JuAz0?t=3630) |

<a id="tips-claudemd"></a>■ **CLAUDE.md（7 条）**

| 技巧 | 来源 |
|-----|--------|
| [CLAUDE.md](https://code.claude.com/docs/en/memory) 应控制在[200 行以内](https://code.claude.com/docs/en/memory#write-effective-instructions)每文件。[humanlayer 建议约 60 行](https://www.humanlayer.dev/blog/writing-a-good-claude-md)（[仍非 100% 保证](https://www.reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/)） | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179840848597422) [![Dex](!/tags/community-dex.svg)](https://www.humanlayer.dev/blog/writing-a-good-claude-md) |
| 使用 [`<important if="...">` 标签](https://www.hlyr.dev/blog/stop-claude-from-ignoring-your-claude-md)包裹特定领域的 CLAUDE.md 规则，防止文件变长时 Claude 忽略它们 | [![Dex](!/tags/community-dex.svg)](https://www.hlyr.dev/blog/stop-claude-from-ignoring-your-claude-md) |
| 对 monorepo 使用[多个 CLAUDE.md](best-practice/claude-memory.md) — 祖先 + 后代加载 | |
| 使用 [.claude/rules/](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) 来拆分大型指令 | |
| [memory.md](https://code.claude.com/docs/en/memory)、constitution.md 并不能保证任何效果 | |
| 任何开发者都应该能启动 Claude，说"运行测试"然后第一次就成功 — 如果不行，你的 CLAUDE.md 缺少必要的构建/测试命令 | [![Dex](!/tags/community-dex.svg)](https://x.com/dexhorthy/status/2034713765401551053) |
| 保持代码库整洁并完成迁移 — 部分迁移的框架会混淆模型，可能导致选择错误的模式 | [![Boris](!/tags/boris-cherny.svg)](https://youtu.be/julbw1JuAz0?t=1112) [![视频](!/tags/video.svg)](https://youtu.be/julbw1JuAz0?t=1112) |
| 使用 [settings.json](best-practice/claude-settings.md) 进行框架强制的配置（归属、权限、模型） — 不要在 CLAUDE.md 中写"NEVER add Co-Authored-By"，当 `attribution.commit: ""` 就能确定性地实现 | [![davila7](!/tags/community-davila7.svg)](https://x.com/dani_avila7/status/2036182734310195550) |

<a id="tips-agents"></a><img src="!/tags/a.svg" height="14"> **智能体（4 条）**

| 技巧 | 来源 |
|-----|--------|
| 使用具有特定功能的[子智能体](https://code.claude.com/docs/en/sub-agents)（额外上下文）配合[技能](https://code.claude.com/docs/en/skills)（渐进式披露），而不是通用的 QA、后端工程师 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179850139000872) |
| 说"use subagents"来投入更多算力解决问题 — 将任务卸载以保持主上下文干净和聚焦 🚫👶 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742755737555434) |
| 使用 [tmux 智能体团队](https://code.claude.com/docs/en/agent-teams)和 [git worktrees](https://x.com/bcherny/status/2025007393290272904) 进行并行开发 | |
| 使用[测试时计算](https://code.claude.com/docs/en/sub-agents) — 分离的上下文窗口能让结果更好；一个智能体可能制造 bug，另一个（相同模型）能发现它们 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2031151689219321886) |

<a id="tips-commands"></a><img src="!/tags/c.svg" height="14"> **命令（3 条）**

| 技巧 | 来源 |
|-----|--------|
| 用[命令](https://code.claude.com/docs/en/slash-commands)来管理工作流，而不是[子智能体](https://code.claude.com/docs/en/sub-agents) | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179847949500714) |
| 对每天多次执行的"内循环"工作流使用[斜杠命令](https://code.claude.com/docs/en/slash-commands) — 避免重复提示，命令存储在 `.claude/commands/` 中并纳入版本控制 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179847949500714) |
| 如果每天做某件事超过一次，把它变成[技能](https://code.claude.com/docs/en/skills)或[命令](https://code.claude.com/docs/en/slash-commands) — 构建 `/techdebt`、上下文转储或分析命令 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742748984742078) |

<a id="tips-skills"></a><img src="!/tags/s.svg" height="14"> **技能（9 条）**

| 技巧 | 来源 |
|-----|--------|
| 使用 [context: fork](https://code.claude.com/docs/en/skills) 在隔离的子智能体中运行技能 — 主上下文只看到最终结果，不看到中间工具调用。agent 字段可设置子智能体类型 | [![Lydia](!/tags/lydia.svg)](https://x.com/lydiahallie/status/2033603164398883042) |
| 对 monorepo 使用[子文件夹中的技能](reports/claude-skills-for-larger-mono-repos.md) | |
| 技能是文件夹，不是文件 — 使用 references/、scripts/、examples/ 子目录实现[渐进式披露](https://code.claude.com/docs/en/skills) | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| 在每个技能中构建一个"踩坑指南"部分 — 最高信息量的内容，随时间添加 Claude 的失败点 | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| 技能的 description 字段是触发器，不是摘要 — 为模型而写（"我什么时候应该被触发？"） | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| 不要在技能中陈述显而易见的内容 — 专注于推动 Claude 超出默认行为的部分 🚫👶 | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| 不要在技能中过度约束 Claude — 给出目标和约束，而不是预设的一步步指令 🚫👶 | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| 在技能中包含脚本和库，让 Claude 组合使用而不是重建样板代码 | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| 在 SKILL.md 中嵌入 `` !`command` `` 来将动态 shell 输出注入提示 — Claude 在调用时运行它，模型只看到结果 | [![Lydia](!/tags/lydia.svg)](https://x.com/lydiahallie/status/2034337963820327017) |

<a id="tips-hooks"></a>■ **钩子（5 条）**

| 技巧 | 来源 |
|-----|--------|
| 在技能中使用[按需钩子](https://code.claude.com/docs/en/skills) — /careful 阻止破坏性命令，/freeze 阻止目录外的编辑 | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| 使用 PreToolUse 钩子[衡量技能使用情况](https://code.claude.com/docs/en/skills)，找出热门或触发不足的技能 | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |
| 使用 [PostToolUse 钩子](https://code.claude.com/docs/en/hooks) 自动格式化代码 — Claude 生成格式良好的代码，钩子处理最后 10% 以避免 CI 失败 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179852047335529) |
| 通过钩子将[权限请求](https://code.claude.com/docs/en/hooks)路由到 Opus — 让它扫描攻击并自动批准安全请求 🚫👶 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742755737555434) |
| 使用 [Stop 钩子](https://code.claude.com/docs/en/hooks) 提醒 Claude 继续工作或在一轮结束时验证其工作 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2021701059253874861) |

<a id="tips-workflows"></a>■ **工作流（7 条）**

| 技巧 | 来源 |
|-----|--------|
| 避免智能体"变笨区"，在最多 50% 上下文使用量时手动执行 [/compact](https://code.claude.com/docs/en/interactive-mode)。切换到新任务时使用 [/clear](https://code.claude.com/docs/en/cli-reference) 重置上下文 | |
| 对于较小的任务，原生 Claude Code 比任何工作流都好 | |
| 使用 [/model](https://code.claude.com/docs/en/model-config) 选择模型和推理模式，[/context](https://code.claude.com/docs/en/interactive-mode) 查看上下文使用量，[/usage](https://code.claude.com/docs/en/costs) 检查计划限制，[/extra-usage](https://code.claude.com/docs/en/interactive-mode) 配置溢出计费，[/config](https://code.claude.com/docs/en/settings) 配置设置 — 计划模式用 Opus，编码用 Sonnet，兼得两者优势 | [![Cat](!/tags/cat-wu.svg)](https://x.com/_catwu/status/1955694117264261609) |
| 始终在 [/config](https://code.claude.com/docs/en/settings) 中启用 [thinking mode](https://code.claude.com/docs/en/model-config) true（查看推理过程）和 [Output Style](https://code.claude.com/docs/en/output-styles) Explanatory（查看带有 ★ Insight 框的详细输出），以更好地理解 Claude 的决策 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179838864666847) |
| 在提示中使用 ultrathink 关键词进行[高强度推理](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking#tips-and-best-practices) | |
| 使用 [/rename](https://code.claude.com/docs/en/cli-reference) 命名重要会话（如 [TODO - 重构任务]）并稍后用 [/resume](https://code.claude.com/docs/en/cli-reference) 恢复 — 同时运行多个 Claude 时标记每个实例 | [![Cat](!/tags/cat-wu.svg)](https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it) |
| 当 Claude 偏离方向时使用 [Esc Esc 或 /rewind](https://code.claude.com/docs/en/checkpointing) 撤销，而不是试图在相同上下文中修复 | |

<a id="tips-workflows-advanced"></a>■ **高级工作流（6 条）**

| 技巧 | 来源 |
|-----|--------|
| 大量使用 ASCII 图来理解你的架构 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742759218794768) |
| 使用 [/loop](https://code.claude.com/docs/en/scheduled-tasks) 进行本地循环监控（最多 3 天）· 使用 [/schedule](https://code.claude.com/docs/en/web-scheduled-tasks) 进行云端循环任务，即使电脑关机也能运行 | |
| 使用 [Ralph Wiggum 插件](https://github.com/shanraisshan/novel-llm-26) 处理长时间自主任务 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179858435281082) |
| 使用带通配符语法的 [/permissions](https://code.claude.com/docs/en/permissions)（如 `Bash(npm run *)`、`Edit(/docs/**)`）而不是 dangerously-skip-permissions | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2007179854077407667) |
| 使用 [/sandbox](https://code.claude.com/docs/en/sandboxing) 通过文件和网络隔离减少权限提示 — 内部减少了 84% 的提示 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2021700506465579443) [![Cat](!/tags/cat-wu.svg)](https://creatoreconomy.so/p/inside-claude-code-how-an-ai-native-actually-works-cat-wu) |
| 投资构建[产品验证](https://code.claude.com/docs/en/skills)技能（如 signup-flow-driver、checkout-verifier）— 值得花一周时间完善 | [![Thariq](!/tags/thariq.svg)](https://x.com/trq212/status/2033949937936085378) |

<a id="tips-git-pr"></a>■ **Git / PR（5 条）**

| 技巧 | 来源 |
|-----|--------|
| 保持 PR 小而聚焦 — [中位数 118 行](tips/claude-boris-2-tips-25-mar-26.md)（141 个 PR，一天内 4.5 万行变更），每个 PR 一个功能，更容易审查和回退 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2038552880018538749) |
| 始终[压缩合并](tips/claude-boris-2-tips-25-mar-26.md) PR — 干净的线性历史，每个功能一个提交，方便 git revert 和 git bisect | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2038552880018538749) |
| 频繁提交 — 尽量每小时至少提交一次，任务完成时立即提交 | ![Shayan](!/tags/community-shayan.svg) |
| 在同事的 PR 上标记 [@claude](https://github.com/apps/claude)，为重复的审查反馈自动生成 lint 规则 — 用自动化把自己从代码审查中解放出来 🚫👶 | [![Boris](!/tags/boris-cherny.svg)](https://youtu.be/julbw1JuAz0?t=2715) [![视频](!/tags/video.svg)](https://youtu.be/julbw1JuAz0?t=2715) |
| 使用 [/code-review](https://code.claude.com/docs/en/code-review) 进行多智能体 PR 分析 — 在合并前捕捉 bug、安全漏洞和回归 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2031089411820228645) |

<a id="tips-debugging"></a>■ **调试（7 条）**

| 技巧 | 来源 |
|-----|--------|
| 养成截图并与 Claude 分享的习惯，当你遇到任何问题时 | ![Shayan](!/tags/community-shayan.svg) |
| 使用 MCP（[Claude in Chrome](https://code.claude.com/docs/en/chrome)、[Playwright](https://github.com/microsoft/playwright-mcp)、[Chrome DevTools](https://developer.chrome.com/blog/chrome-devtools-mcp)）让 Claude 自己查看 Chrome 控制台日志 | |
| 始终让 Claude 将终端（你想查看日志的）作为后台任务运行，以便更好地调试 | |
| 使用 [/doctor](https://code.claude.com/docs/en/cli-reference) 诊断安装、认证和配置问题 | |
| 压缩时的错误可以通过 [/model](https://code.claude.com/docs/en/model-config) 选择 1M token 模型，然后运行 [/compact](https://code.claude.com/docs/en/interactive-mode) 来解决 | |
| 使用[跨模型](development-workflows/cross-model-workflow/cross-model-workflow.md)进行 QA — 例如用 [Codex](https://github.com/shanraisshan/codex-cli-best-practice) 进行计划和实现审查 | |
| 智能搜索（glob + grep）胜过 RAG — Claude Code 尝试并最终放弃了向量数据库，因为代码会漂移导致不同步且权限复杂 | [![Boris](!/tags/boris-cherny.svg)](https://youtu.be/julbw1JuAz0?t=3095) [![视频](!/tags/video.svg)](https://youtu.be/julbw1JuAz0?t=3095) |

<a id="tips-utilities"></a>■ **实用工具（5 条）**

| 技巧 | 来源 |
|-----|--------|
| 使用 [iTerm](https://iterm2.com/)/[Ghostty](https://ghostty.org/)/[tmux](https://github.com/tmux/tmux) 终端而不是 IDE（[VS Code](https://code.visualstudio.com/)/[Cursor](https://www.cursor.com/)） | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2017742753971769626) |
| 使用 [/voice](https://code.claude.com/docs/en/voice-dictation) 或 [Wispr Flow](https://wisprflow.ai) 进行语音提示（10 倍生产力） | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2038454362226467112) |
| 使用 [claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks) 获取 Claude 反馈 | ![Shayan](!/tags/community-shayan.svg) |
| 使用[状态栏](https://github.com/shanraisshan/claude-code-status-line) 了解上下文使用情况和快速压缩 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2021700784019452195) ![Shayan](!/tags/community-shayan.svg) |
| 探索 [settings.json](best-practice/claude-settings.md) 中的功能，如[计划目录](best-practice/claude-settings.md#plans-directory)、[加载动画动词](best-practice/claude-settings.md#display--ux)，打造个性化体验 | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny/status/2021701145023197516) |

<a id="tips-daily"></a>■ **日常习惯（2 条）**

| 技巧 | 来源 |
|-----|--------|
| [每日更新](https://code.claude.com/docs/en/setup) Claude Code | ![Shayan](!/tags/community-shayan.svg) |
| 每天从阅读[更新日志](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)开始 | ![Shayan](!/tags/community-shayan.svg) |

![Boris Cherny + 团队](!/tags/claude.svg)

| 文章 / 推文 | 来源 |
|-----------------|--------|
| [Claude Code 中 15 个隐藏且未被充分利用的功能 (Boris) \| 2026/03/30](tips/claude-boris-15-tips-30-mar-26.md) | [推文](https://x.com/bcherny/status/2038454336355999749) |
| [压缩合并与 PR 大小分布 (Boris) \| 2026/03/25](tips/claude-boris-2-tips-25-mar-26.md) | [推文](https://x.com/bcherny/status/2038552880018538749) |
| [构建 Claude Code 的经验教训：如何使用技能 (Thariq) \| 2026/03/17](tips/claude-thariq-tips-17-mar-26.md) | [文章](https://x.com/trq212/status/2033949937936085378) |
| [代码审查与测试时计算 (Boris) \| 2026/03/10](tips/claude-boris-2-tips-10-mar-26.md) | [推文](https://x.com/bcherny/status/2031089411820228645) |
| /loop — 安排循环任务最多 3 天 (Boris) \| 2026/03/07 | [推文](https://x.com/bcherny/status/2030193932404150413) |
| AskUserQuestion + ASCII Markdown (Thariq) \| 2026/02/28 | [推文](https://x.com/trq212/status/2027543858289250472) |
| 像智能体一样思考 — 构建 Claude Code 的经验教训 (Thariq) \| 2026/02/28 | [文章](https://x.com/trq212/status/2027463795355095314) |
| Git Worktrees — Boris 的 5 种用法 \| 2026/02/21 | [推文](https://x.com/bcherny/status/2025007393290272904) |
| 构建 Claude Code 的经验教训：提示缓存就是一切 (Thariq) \| 2026/02/20 | [文章](https://x.com/trq212/status/2024574133011673516) |
| [人们自定义 Claude 的 12 种方式 (Boris) \| 2026/02/12](tips/claude-boris-12-tips-12-feb-26.md) | [推文](https://x.com/bcherny/status/2021699851499798911) |
| [团队使用 Claude Code 的 10 条技巧 (Boris) \| 2026/02/01](tips/claude-boris-10-tips-01-feb-26.md) | [推文](https://x.com/bcherny/status/2017742741636321619) |
| [我如何使用 Claude Code — 来自我出人意料朴素的设置的 13 条技巧 (Boris) \| 2026/01/03](tips/claude-boris-13-tips-03-jan-26.md) | [推文](https://x.com/bcherny/status/2007179832300581177) |
| 让 Claude 使用 AskUserQuestion 工具面试你 (Thariq) \| 2025/12/28 | [推文](https://x.com/trq212/status/2005315275026260309) |
| 始终使用计划模式，给 Claude 一种验证方法，使用 /code-review (Boris) \| 2025/12/27 | [推文](https://x.com/bcherny/status/2004711722926616680) |

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

## 🎬 视频 / 播客

| 视频 / 播客 | 来源 | YouTube |
|-----------------|--------|---------|
| 关于研究-计划-实现我们做错了什么 (Dex) \| 2026/03/24 \| MLOps Community | [![Dex](!/tags/community-dex.svg)](https://x.com/daborhyde) | [YouTube](https://youtu.be/YwZR6tc7qYg) |
| 与 Boris Cherny 一起构建 Claude Code (Boris) \| 2026/03/04 \| The Pragmatic Engineer | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/julbw1JuAz0) |
| Claude Code 负责人：编码问题解决后会发生什么 (Boris) \| 2026/02/19 \| Lenny's Podcast | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/We7BZVKbCVw) |
| 与 Claude Code 创建者 Boris Cherny 深入了解 Claude Code (Boris) \| 2026/02/17 \| Y Combinator | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/PQU9o_5rHC4) |
| Boris Cherny（Claude Code 创建者）谈什么推动了其职业发展 (Boris) \| 2025/12/15 \| Ryan Peterman | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/AmdLVWMdjOk) |
| 构建 Claude Code 的工程师揭示的秘密 (Cat) \| 2025/10/29 \| Every | [![Boris](!/tags/boris-cherny.svg)](https://x.com/bcherny) | [YouTube](https://youtu.be/IDSAMqip6ms) |

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

## 🔔 订阅

| 平台 | 名称 | 徽章 |
|--------|------|-------|
| ![Reddit](https://img.shields.io/badge/-FF4500?style=flat&logo=reddit&logoColor=white) | [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/)、[r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/)、[r/Anthropic](https://www.reddit.com/r/Anthropic/) | ![Boris + 团队](!/tags/claude.svg) |
| ![X](https://img.shields.io/badge/-000?style=flat&logo=x&logoColor=white) | [Claude](https://x.com/claudeai)、[Anthropic](https://x.com/AnthropicAI)、[Boris](https://x.com/bcherny)、[Thariq](https://x.com/trq212)、[Cat](https://x.com/_catwu)、[Lydia](https://x.com/lydiahallie)、[Noah](https://x.com/noahzweben)、[Anthony](https://x.com/amorriscode)、[Alex](https://x.com/alexalbert__)、[Kenneth](https://x.com/neilhtennek) | ![Boris + 团队](!/tags/claude.svg) |
| ![X](https://img.shields.io/badge/-000?style=flat&logo=x&logoColor=white) | [Jesse Kriss](https://x.com/obra)（[Superpowers](https://github.com/obra/superpowers)）、[Affaan Mustafa](https://x.com/affaanmustafa)（[ECC](https://github.com/affaan-m/everything-claude-code)）、[Garry Tan](https://x.com/garrytan)（[gstack](https://github.com/garrytan/gstack)）、[Dex Horthy](https://x.com/dexhorthy)（[HumanLayer](https://github.com/humanlayer/humanlayer)）、[Kieran Klaassen](https://x.com/kieranklaassen)（[Compound Eng](https://github.com/EveryInc/compound-engineering-plugin)）、[Tabish Gilani](https://x.com/0xTab)（[OpenSpec](https://github.com/Fission-AI/OpenSpec)）、[Brian McAdams](https://x.com/BMadCode)（[BMAD](https://github.com/bmad-code-org/BMAD-METHOD)）、[Lex Christopherson](https://x.com/official_taches)（[GSD](https://github.com/gsd-build/get-shit-done)）、[Dani Avila](https://x.com/dani_avila7)（[CC Templates](https://github.com/davila7/claude-code-templates)）、[Dan Shipper](https://x.com/danshipper)（[Every](https://every.to/)）、[Andrej Karpathy](https://x.com/karpathy)（[AutoResearch](https://x.com/karpathy/status/2015883857489522876)）、[Peter Steinberger](https://x.com/steipete)（[OpenClaw](https://x.com/openclaw)）、[Sigrid Jin](https://x.com/realsigridjin)（[claw-code](https://github.com/ultraworkers/claw-code)）、[Yeachan Heo](https://x.com/bellman_ych)（[oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode)） | ![社区](!/tags/community.svg) |
| ![YouTube](https://img.shields.io/badge/-F00?style=flat&logo=youtube&logoColor=white) | [Anthropic](https://www.youtube.com/@anthropic-ai) | ![Boris + 团队](!/tags/claude.svg) |
| ![YouTube](https://img.shields.io/badge/-F00?style=flat&logo=youtube&logoColor=white) | [Lenny's Podcast](https://www.youtube.com/@LennysPodcast)、[Y Combinator](https://www.youtube.com/@ycombinator)、[The Pragmatic Engineer](https://www.youtube.com/@pragmaticengineer)、[Ryan Peterman](https://www.youtube.com/@ryanlpeterman)、[Every](https://www.youtube.com/@every_media)、[MLOps Community](https://www.youtube.com/@MLOps) | ![社区](!/tags/community.svg) |

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

## ☠️ 创业公司 / 业务

| Claude 功能 | 替代产品 |
|-|-|
|[**代码审查**](https://code.claude.com/docs/en/code-review)|[Greptile](https://greptile.com)、[CodeRabbit](https://coderabbit.ai)、[Devin Review](https://devin.ai)、[OpenDiff](https://opendiff.com)、[Cursor BugBot](https://bugbot.dev)|
|[**语音听写**](https://code.claude.com/docs/en/voice-dictation)|[Wispr Flow](https://wisprflow.ai)、[SuperWhisper](https://superwhisper.com/)|
|[**远程控制**](https://code.claude.com/docs/en/remote-control)|[OpenClaw](https://openclaw.ai/)|
|[**Claude in Chrome**](https://code.claude.com/docs/en/chrome)|[Playwright MCP](https://github.com/microsoft/playwright-mcp)、[Chrome DevTools MCP](https://developer.chrome.com/blog/chrome-devtools-mcp)|
|[**计算机操控**](https://docs.anthropic.com/en/docs/agents-and-tools/computer-use)|[OpenAI CUA](https://openai.com/index/computer-using-agent/)|
|[**协作**](https://claude.com/blog/cowork-research-preview)|[ChatGPT Agent](https://openai.com/chatgpt/agent/)、[Perplexity Computer](https://www.perplexity.ai/computer/)、[Manus](https://manus.im)|
|[**任务**](https://x.com/trq212/status/2014480496013803643)|[Beads](https://github.com/steveyegge/beads)|
|[**计划模式**](https://code.claude.com/docs/en/common-workflows)|[Agent OS](https://github.com/buildermethods/agent-os)|
|[**技能 / 插件**](https://code.claude.com/docs/en/plugins)|YC AI 包装创业公司 ([reddit](https://reddit.com/r/ClaudeAI/comments/1r6bh4d/claude_code_skills_are_basically_yc_ai_startup/))|

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

<a id="billion-dollar-questions"></a>
![十亿美元级问题](!/tags/billion-dollar-questions.svg)

*如果你有答案，请发邮件告知我：shanraisshan@gmail.com*

**记忆与指令（4 个问题）**

1. 究竟应该在 CLAUDE.md 中放什么 — 又应该省略什么？
2. 如果你已经有了一个 CLAUDE.md，是否真的还需要单独的 constitution.md 或 rules.md？
3. 应该多久更新一次 CLAUDE.md，如何判断它已经过时？
4. 为什么 Claude 仍然会忽略 CLAUDE.md 指令 — 即使它们用大写写着"必须"？([reddit](https://reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/))

**智能体、技能与工作流（6 个问题）**

1. 什么时候应该使用命令 vs 智能体 vs 技能 — 什么时候原生 Claude Code 更好？
2. 随着模型改进，应该多久更新一次智能体、命令和工作流？
3. 给子智能体一个详细的人设真能提高质量吗？一个"完美人设/提示"对于研究/QA 子智能体应该是什么样的？
4. 应该依赖 Claude Code 内置的计划模式 — 还是构建自己的计划命令/智能体来强制执行团队的工作流？
5. 如果你有一个个人技能（如带有你编码风格的 /implement），如何整合社区技能（如 /simplify）而不产生冲突 — 当它们意见不一致时谁说了算？
6. 我们到了吗？能否将现有代码库转换为规范，删除代码，然后让 AI 仅从这些规范重新生成完全相同的代码？

**规范与文档（3 个问题）**

1. 仓库中的每个功能是否都应该有一个规范作为 markdown 文件？
2. 实现新功能后，需要多久更新一次规范以避免过时？
3. 实现新功能时，如何处理对其他功能规范的连锁影响？

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

## 报告

<p align="center">
  <a href="reports/claude-agent-sdk-vs-cli-system-prompts.md"><img src="https://img.shields.io/badge/Agent_SDK_vs_CLI-555?style=for-the-badge" alt="Agent SDK vs CLI"></a>
  <a href="reports/claude-in-chrome-v-chrome-devtools-mcp.md"><img src="https://img.shields.io/badge/Browser_Automation_MCP-555?style=for-the-badge" alt="Browser Automation MCP"></a>
  <a href="reports/claude-global-vs-project-settings.md"><img src="https://img.shields.io/badge/Global_vs_Project_Settings-555?style=for-the-badge" alt="Global vs Project Settings"></a>
  <a href="reports/claude-skills-for-larger-mono-repos.md"><img src="https://img.shields.io/badge/Skills_in_Monorepos-555?style=for-the-badge" alt="Skills in Monorepos"></a>
  <br>
  <a href="reports/claude-agent-memory.md"><img src="https://img.shields.io/badge/Agent_Memory-555?style=for-the-badge" alt="Agent Memory"></a>
  <a href="reports/claude-advanced-tool-use.md"><img src="https://img.shields.io/badge/Advanced_Tool_Use-555?style=for-the-badge" alt="Advanced Tool Use"></a>
  <a href="reports/claude-usage-and-rate-limits.md"><img src="https://img.shields.io/badge/Usage_&_Rate_Limits-555?style=for-the-badge" alt="Usage & Rate Limits"></a>
  <a href="reports/claude-agent-command-skill.md"><img src="https://img.shields.io/badge/Agents_vs_Commands_vs_Skills-555?style=for-the-badge" alt="Agents vs Commands vs Skills"></a>
  <br>
  <a href="reports/llm-day-to-day-degradation.md"><img src="https://img.shields.io/badge/LLM_Degradation-555?style=for-the-badge" alt="LLM Degradation"></a>
</p>

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

![使用方法](!/tags/how-to-use.svg)

```
1. 像读课程一样阅读这个仓库，在尝试使用之前先了解命令、智能体、技能和钩子是什么。
2. 克隆这个仓库并试用示例，尝试 /weather-orchestrator，听听钩子声音，运行智能体团队，这样你可以看到它们实际如何工作。
3. 进入你自己的项目，让 Claude 建议你应该从这个仓库中添加哪些最佳实践，把这个仓库作为参考给它，让它知道有哪些可能。
```

<a href="https://www.youtube.com/watch?v=AkAhkalkRY4"><img src="!/thumbnail/video-1.png" alt="在 YouTube 上观看" width="300"></a>

<p align="center">
  <img src="!/claude-jumping.svg" alt="章节分隔符" width="60" height="50">
</p>

<p align="center">
  <a href="https://github.com/trending?since=monthly"><img src="!/root/github-trending.png" alt="GitHub 趋势榜" width="1200"></a><br>
  ✨2026 年 3 月 GitHub 趋势榜✨
</p>

## 其他仓库

<a href="https://github.com/shanraisshan/claude-code-hooks"><img src="!/claude-speaking.svg" alt="Claude Code Hooks" width="40" height="40" align="center"></a> <a href="https://github.com/shanraisshan/claude-code-hooks"><strong>claude-code-hooks</strong></a> · <a href="https://github.com/shanraisshan/codex-cli-best-practice"><img src="!/codex-jumping.svg" alt="Codex CLI" width="40" height="40" align="center"></a> <a href="https://github.com/shanraisshan/codex-cli-best-practice"><strong>codex-cli-best-practice</strong></a> · <a href="https://github.com/shanraisshan/codex-cli-hooks"><img src="!/codex-speaking.svg" alt="Codex CLI Hooks" width="40" height="40" align="center"></a> <a href="https://github.com/shanraisshan/codex-cli-hooks"><strong>codex-cli-hooks</strong></a>

## 开发者

![开发者](!/tags/developed-by.svg)

> | # | 工作流 | 描述 |
> |---|----------|-------------|
> | 1 | /workflows:development-workflows | 通过并行研究所有 10 个工作流仓库来更新开发工作流表和跨工作流分析报告 |
> | 2 | /workflows:best-practice:workflow-concepts | 使用最新的 Claude Code 功能和概念更新 README 概念部分 |
> | 3 | /workflows:best-practice:workflow-claude-settings | 跟踪 Claude Code 设置报告变更并找出需要更新的内容 |
> | 4 | /workflows:best-practice:workflow-claude-subagents | 跟踪 Claude Code 子智能体报告变更并找出需要更新的内容 |
> | 5 | /workflows:best-practice:workflow-claude-commands | 跟踪 Claude Code 命令报告变更并找出需要更新的内容 |
> | 6 | /workflows:best-practice:workflow-claude-skills | 跟踪 Claude Code 技能报告变更并找出需要更新的内容 |

[![Claude for OSS](!/tags/claude-for-oss.svg)](https://claude.com/contact-sales/claude-for-oss)
[![Claude Community Ambassador](!/tags/claude-community-ambassador.svg)](https://claude.com/community/ambassadors)
[![Claude Certified Architect](!/tags/claude-certified-architect.svg)](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request)
[![Anthropic Academy](!/tags/anthropic-academy.svg)](https://anthropic.skilljar.com/)

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=shanraisshan/claude-code-best-practice&type=Date)](https://star-history.com/#shanraisshan/claude-code-best-practice&Date)
