# claude-code-best-practice
熟能生巧，Claude 亦然

![最后更新](https://img.shields.io/badge/Last_Updated-Mar%2007%2C%202026%203%3A14%20PM%20PKT-white?style=flat&labelColor=555) <a href="https://github.com/shanraisshan/claude-code-best-practice/stargazers"><img src="https://img.shields.io/github/stars/shanraisshan/claude-code-best-practice?style=flat&label=%E2%98%85&labelColor=555&color=white" alt="GitHub Stars"></a>

[![最佳实践](!/tags/best-practice.svg)](best-practice/) *点击此徽章查看最新最佳实践*<br>
[![已实现](!/tags/implemented.svg)](implementation/) *点击此徽章查看本仓库中的实现*<br>
[![编排工作流](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) *点击此徽章查看 Command → Agent → Skill 编排工作流*

<p align="center">
  <img src="!/claude-jumping.svg" alt="Claude Code 吉祥物跳跃" width="120" height="100">
</p>

<p align="center">
  <img src="!/slider/boris-slider.gif" alt="Boris Cherny 谈 Claude Code" width="600"><br>
  Boris Cherny 在 X 平台 (<a href="https://x.com/bcherny/status/2007179832300581177">推文 1</a> · <a href="https://x.com/bcherny/status/2017742741636321619">推文 2</a> · <a href="https://x.com/bcherny/status/2021699851499798911">推文 3</a>)
</p>


## 概念

| 功能 | 位置 | 描述 |
|---------|----------|-------------|
| [**命令 (Commands)**](https://code.claude.com/docs/en/slash-commands) | `.claude/commands/<name>.md` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-commands.md) [![已实现](!/tags/implemented.svg)](implementation/claude-commands-implementation.md) 工作流的入口提示 — 使用 `/command-name` 调用 |
| [**子代理 (Sub-Agents)**](https://code.claude.com/docs/en/sub-agents) | `.claude/agents/<name>.md` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-subagents.md) [![已实现](!/tags/implemented.svg)](implementation/claude-subagents-implementation.md) 具有独立名称、颜色、工具、权限和模型的自定义代理 |
| [**技能 (Skills)**](https://code.claude.com/docs/en/skills) | `.claude/skills/<name>/SKILL.md` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-skills.md) [![已实现](!/tags/implemented.svg)](implementation/claude-skills-implementation.md) 可复用的知识、工作流和斜杠命令 — 按需加载或使用 `/skill-name` 调用 |
| [**工作流 (Workflows)**](https://code.claude.com/docs/en/common-workflows) | [`.claude/commands/weather-orchestrator.md`](.claude/commands/weather-orchestrator.md) | [![编排工作流](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) |
| [**钩子 (Hooks)**](https://code.claude.com/docs/en/hooks) | `.claude/hooks/` | [![最佳实践](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-voice-hooks) [![已实现](!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-voice-hooks) 在代理循环之外，针对特定事件运行的确定性脚本 |
| [**MCP 服务器**](https://code.claude.com/docs/en/mcp) | `.claude/settings.json`, `.mcp.json` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-mcp.md) [![已实现](!/tags/implemented.svg)](.mcp.json) 连接外部工具、数据库和 API 的模型上下文协议 |
| [**插件 (Plugins)**](https://code.claude.com/docs/en/plugins) | 可分发包 | 技能、子代理、钩子和 MCP 服务器的捆绑包 · [市场](https://code.claude.com/docs/en/discover-plugins) |
| [**设置 (Settings)**](https://code.claude.com/docs/en/settings) | `.claude/settings.json` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-settings.md) [![已实现](!/tags/implemented.svg)](.claude/settings.json) 分层配置系统 · [权限](https://code.claude.com/docs/en/permissions) · [模型配置](https://code.claude.com/docs/en/model-config) · [输出样式](https://code.claude.com/docs/en/output-styles) · [沙箱](https://code.claude.com/docs/en/sandboxing) · [快捷键](https://code.claude.com/docs/en/keybindings) · [快速模式](https://code.claude.com/docs/en/fast-mode) |
| [**状态栏 (Status Line)**](https://code.claude.com/docs/en/statusline) | `.claude/settings.json` | [![最佳实践](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-status-line) [![已实现](!/tags/implemented.svg)](.claude/settings.json) 显示上下文使用量、模型、费用和会话信息的自定义状态栏 |
| [**记忆 (Memory)**](https://code.claude.com/docs/en/memory) | `CLAUDE.md`, `.claude/rules/`, `~/.claude/rules/`, `~/.claude/projects/<project>/memory/` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-memory.md) [![已实现](!/tags/implemented.svg)](CLAUDE.md) 通过 CLAUDE.md 文件和 `@path` 导入实现持久化上下文 · [自动记忆](https://code.claude.com/docs/en/memory) · [规则](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) |
| [**检查点 (Checkpointing)**](https://code.claude.com/docs/en/checkpointing) | 自动（基于 git） | 自动追踪文件编辑，支持回退（`Esc Esc` 或 `/rewind`）和定向摘要 |
| [**CLI 启动标志**](https://code.claude.com/docs/en/cli-reference) | `claude [flags]` | [![最佳实践](!/tags/best-practice.svg)](best-practice/claude-cli-startup-flags.md) 启动 Claude Code 的命令行标志、子命令和环境变量 |
| **AI 术语** | | [![最佳实践](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-codex-cursor-gemini/blob/main/reports/ai-terms.md) 代理工程 · 上下文工程 · Vibe 编程 |
| [**最佳实践**](https://code.claude.com/docs/en/best-practices) | | 官方最佳实践 · [提示工程](https://github.com/anthropics/prompt-eng-interactive-tutorial) · [扩展 Claude Code](https://code.claude.com/docs/en/features-overview) |

### 🔥 热门

| 功能 | 位置 | 描述 |
|---------|----------|-------------|
| [**定时任务**](https://code.claude.com/docs/en/scheduled-tasks) | `/loop`, cron 工具 | [![最佳实践](!/tags/best-practice.svg)](https://x.com/bcherny/status/2030193932404150413) 按计划循环运行提示（最长 3 天）、设置一次性提醒、轮询部署和构建 |
| [**代理团队**](https://code.claude.com/docs/en/agent-teams) | 内置（环境变量） | 多个代理并行工作于同一代码库，共享任务协调 |
| [**语音模式**](https://x.com/trq212/status/2028628570692890800) | 内置命令 | 语音输入提示 - 输入 /voice 激活|
| [**远程控制**](https://code.claude.com/docs/en/remote-control) | 内置命令 | 从任意设备继续本地会话 — 手机、平板或浏览器 · [无头模式](https://code.claude.com/docs/en/headless) |
| [**Git Worktrees**](https://code.claude.com/docs/en/common-workflows) | 内置 | [![最佳实践](!/tags/best-practice.svg)](https://x.com/bcherny/status/2025007393290272904) 用于并行开发的隔离 git 分支 — 每个代理获得自己的工作副本 |
| [**Ralph Wiggum 循环**](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum) | 插件 | [![最佳实践](!/tags/best-practice.svg)](https://github.com/ghuntley/how-to-ralph-wiggum) [![已实现](!/tags/implemented.svg)](https://github.com/shanraisshan/novel-llm-26) 用于长时间运行任务的自主开发循环 — 迭代直至完成 |

<a id="orchestration-workflow"></a>

## <a href="orchestration-workflow/orchestration-workflow.md"><img src="!/tags/orchestration-workflow-hd.svg" alt="编排工作流"></a>

详见 [orchestration-workflow](orchestration-workflow/orchestration-workflow.md) 了解 **Command → Agent → Skill** 模式的实现细节。


<p align="center">
  <img src="orchestration-workflow/orchestration-workflow.svg" alt="命令技能代理架构流程" width="100%">
</p>

<p align="center">
  <img src="orchestration-workflow/orchestration-workflow.gif" alt="编排工作流演示" width="600">
</p>

![如何使用](!/tags/how-to-use.svg)

```bash
claude
/weather-orchestrator
```

| 组件 | 角色 | 示例 |
|-----------|------|---------|
| **命令 (Command)** | 入口点，用户交互 | [`/weather-orchestrator`](.claude/commands/weather-orchestrator.md) |
| **代理 (Agent)** | 使用预加载技能（代理技能）获取数据 | [`weather-agent`](.claude/agents/weather-agent.md) 配合 [`weather-fetcher`](.claude/skills/weather-fetcher/SKILL.md) |
| **技能 (Skill)** | 独立创建输出 | [`weather-svg-creator`](.claude/skills/weather-svg-creator/SKILL.md) |

## 开发工作流

### 🔥 热门
- [跨模型（Claude Code + Codex）工作流](development-workflows/cross-model-workflow/cross-model-workflow.md) [![已实现](!/tags/implemented.svg)](development-workflows/cross-model-workflow/cross-model-workflow.md)
- [RPI](development-workflows/rpi/rpi-workflow.md) [![已实现](!/tags/implemented.svg)](development-workflows/rpi/rpi-workflow.md)
- [Ralph Wiggum 循环](https://www.youtube.com/watch?v=eAtvoGlpeRU) [![已实现](!/tags/implemented.svg)](https://github.com/shanraisshan/novel-llm-26)

### 其他
- [Github Speckit](https://github.com/github/spec-kit) · ★ 74k
- [obra/superpowers](https://github.com/obra/superpowers) · ★ 72k
- [OpenSpec OPSX](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md) · ★ 28k
- [get-shit-done (GSD)](https://github.com/gsd-build/get-shit-done) · ★ 25k
- [Andrej Karpathy（OpenAI 创始成员）工作流](https://github.com/forrestchang/andrej-karpathy-skills) · ★ 7k
- [Brian Casel（Agent OS 创造者）- 2026 工作流](https://github.com/buildermethods/agent-os) · ★ 4k - [2026 年已过时](https://www.youtube.com/watch?v=0hdFJA-ho3c)
- [Human Layer RPI - 研究计划实现](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md) · ★ 1.5k
- [Boris Cherny（Claude Code 创造者）- 2026年2月工作流](https://x.com/bcherny/status/2017742741636321619)
- [Peter Steinberger（OpenClaw 创造者）工作流](https://youtu.be/8lF7HmQ_RgY?t=2582)

## 技巧与窍门

![社区](!/tags/community.svg)

■ **规划 (2)**
- 始终从[计划模式](https://code.claude.com/docs/en/common-workflows)开始。让 Claude 采访你；[向用户提问](https://code.claude.com/docs/en/cli-reference)
- 始终制定分阶段关卡计划，每个阶段包含多个测试（单元、自动化、集成）。使用[跨模型](development-workflows/cross-model-workflow/cross-model-workflow.md)审查你的计划

■ **工作流 (12)**
- [CLAUDE.md](https://code.claude.com/docs/en/memory) 每个文件应控制在 [200 行以内](https://code.claude.com/docs/en/memory#write-effective-instructions)。[humanlayer 中为 60 行](https://www.humanlayer.dev/blog/writing-a-good-claude-md)（[仍不能 100% 保证](https://www.reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/)）。
- 在 monorepo 中使用[多个 CLAUDE.md](best-practice/claude-memory.md) — 祖先 + 后代加载
- 使用 [.claude/rules/](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) 拆分大型指令
- 使用[命令](https://code.claude.com/docs/en/slash-commands)来管理工作流，而非[子代理](https://code.claude.com/docs/en/sub-agents)
- 为特定功能配置[子代理](https://code.claude.com/docs/en/sub-agents)（额外上下文）配合[技能](https://code.claude.com/docs/en/skills)（渐进式披露），而非通用 qa、后端工程师
- [memory.md](https://code.claude.com/docs/en/memory)、constitution.md 不保证任何效果
- 避免代理智力低谷区，在达到 50% 时手动执行 [/compact](https://code.claude.com/docs/en/interactive-mode)。如切换到新任务，使用 [/clear](https://code.claude.com/docs/en/cli-reference) 重置会话上下文
- 对于较小任务，原生 CC（Claude Code）优于任何工作流
- 在 monorepo 中使用[子文件夹中的技能](reports/claude-skills-for-larger-mono-repos.md)
- 使用 [/model](https://code.claude.com/docs/en/model-config) 选择模型和推理，[/context](https://code.claude.com/docs/en/interactive-mode) 查看上下文使用量，[/usage](https://code.claude.com/docs/en/costs) 检查计划限制，[/extra-usage](https://code.claude.com/docs/en/interactive-mode) 配置溢出计费，[/config](https://code.claude.com/docs/en/settings) 配置设置
- 始终在 [/config](https://code.claude.com/docs/en/settings) 中开启[思考模式](https://code.claude.com/docs/en/model-config)（查看推理）和[输出样式](https://code.claude.com/docs/en/output-styles)为解释性（查看带 ★ Insight 框的详细输出），以更好理解 Claude 的决策
- 在提示中使用 ultrathink 关键词实现[高投入推理](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking#tips-and-best-practices)
- 使用 [/rename](https://code.claude.com/docs/en/cli-reference) 重命名重要会话（如 [TODO - 重构任务]）并稍后 [/resume](https://code.claude.com/docs/en/cli-reference) 恢复
- 当 Claude 偏离轨道时，使用 [Esc Esc 或 /rewind](https://code.claude.com/docs/en/checkpointing) 撤销，而非在同一上下文中尝试修复
- 频繁提交 — 尝试每小时至少提交一次，任务完成后立即提交

■ **高级工作流 (6)**
- 大量使用 ASCII 图表理解你的架构
- 使用 [tmux 代理团队](https://code.claude.com/docs/en/agent-teams)和 [git worktrees](https://x.com/bcherny/status/2025007393290272904) 进行并行开发
- 使用 [/loop](https://code.claude.com/docs/en/scheduled-tasks) 进行循环监控 — 轮询部署、看护 PR、检查构建（最长运行 3 天）
- 使用 [Ralph Wiggum 插件](https://github.com/shanraisshan/novel-llm-26)处理长时间运行的自主任务
- 使用 [/permissions](https://code.claude.com/docs/en/permissions) 配合通配符语法（Bash(npm run *), Edit(/docs/**)）而非 dangerously-skip-permissions
- 使用 [/sandbox](https://code.claude.com/docs/en/sandboxing) 通过文件和网络隔离减少权限提示

■ **调试 (5)**
- 养成截图习惯，遇到问题时与 Claude 分享
- 使用 mcp（[Claude in Chrome](https://code.claude.com/docs/en/chrome)、[Playwright](https://github.com/microsoft/playwright-mcp)、[Chrome DevTools](https://developer.chrome.com/blog/chrome-devtools-mcp)）让 Claude 自行查看 Chrome 控制台日志
- 始终让 Claude 将终端（你想查看日志的）作为后台任务运行，以便更好调试
- 使用 [/doctor](https://code.claude.com/docs/en/cli-reference) 诊断安装、身份验证和配置问题
- 压缩期间的错误可通过使用 [/model](https://code.claude.com/docs/en/model-config) 选择 1M token 模型，然后运行 [/compact](https://code.claude.com/docs/en/interactive-mode) 解决
- 使用[跨模型](development-workflows/cross-model-workflow/cross-model-workflow.md)进行 QA — 例如使用 [Codex](https://github.com/shanraisshan/codex-cli-best-practice) 进行计划和实现审查

■ **实用工具 (5)**
- 使用 [iTerm](https://iterm2.com/)/[Ghostty](https://ghostty.org/)/[tmux](https://github.com/tmux/tmux) 终端而非 IDE（[VS Code](https://code.visualstudio.com/)/[Cursor](https://www.cursor.com/)）
- 使用 [Wispr Flow](https://wisprflow.ai) 进行语音提示（10 倍生产力）
- 使用 [claude-code-voice-hooks](https://github.com/shanraisshan/claude-code-voice-hooks) 获取 Claude 反馈
- 使用[状态栏](https://github.com/shanraisshan/claude-code-status-line)了解上下文状态和快速压缩
- 探索 [settings.json](best-practice/claude-settings.md) 功能，如[计划目录](best-practice/claude-settings.md#plans-directory)、[旋转动词](best-practice/claude-settings.md#display--ux)以获得个性化体验

■ **日常 (3)**
- 每日[更新](https://code.claude.com/docs/en/setup) Claude Code，每天开始时阅读 [changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- 关注 Reddit 上的 [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/)、[r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/)
- 关注 X 平台上的 [Boris](https://x.com/bcherny)、[Thariq](https://x.com/trq212)、[Cat](https://x.com/_catwu)、[Lydia](https://x.com/lydiahallie)、[Noah](https://x.com/noahzweben)

![Boris Cherny + 团队](!/tags/boris-team.svg)

- [始终使用计划模式，给 Claude 验证方法，使用 /code-review | 27/Dec/25](https://x.com/bcherny/status/2004711722926616680) ● [推文](https://x.com/bcherny/status/2004711722926616680)
- [让 Claude 使用 AskUserQuestion 工具采访你 (Thariq) | 28/Dec/25](https://x.com/trq212/status/2005315275026260309) ● [推文](https://x.com/trq212/status/2005315275026260309)
- [Boris 设置 - 5 个技巧 | 03/Jan/26](https://x.com/bcherny/status/2007179832300581177) ● [推文](https://x.com/bcherny/status/2007179832300581177)
- [Claude 团队自身的 10 个使用技巧 | 01/Feb/26](https://x.com/bcherny/status/2017742741636321619) ● [推文](https://x.com/bcherny/status/2017742741636321619)
- [人们自定义 Claude 的 12 种方式 | 12/Feb/26](tips/claude-boris-tips-feb-26.md) ● [推文](https://x.com/bcherny/status/2021699851499798911)
- [Git Worktrees - Boris 的 5 种使用方式 | 2026年2月21日](https://x.com/bcherny/status/2025007393290272904) ● [推文](https://x.com/bcherny/status/2025007393290272904)
- [像代理一样思考 - 构建 Claude Code 的经验 (Thariq) | 2026年2月28日](https://x.com/trq212/status/2027463795355095314) ● [推文](https://x.com/trq212/status/2027463795355095314)
- [/loop — 安排最长 3 天的循环任务 | 2026年3月7日](https://x.com/bcherny/status/2030193932404150413) ● [推文](https://x.com/bcherny/status/2030193932404150413)

## ☠️ 创业公司 / 商业

| Claude | 替代 |
|-|-|
|[**语音模式**](https://x.com/trq212/status/2028628570692890800)|[Wispr Flow](https://wisprflow.ai), [SuperWhisper](https://superwhisper.com/)|
|[**远程控制**](https://code.claude.com/docs/en/remote-control)|[OpenClaw](https://openclaw.ai/)
|**Cowork**|[OpenAI Operator](https://openai.com/operator), [AgentShadow](https://agentshadow.ai)
|[**任务**](https://x.com/trq212/status/2014480496013803643)|[Beads](https://github.com/steveyegge/beads)
|[**计划模式**](https://code.claude.com/docs/en/common-workflows)|[Agent OS](https://github.com/buildermethods/agent-os)|
|[**技能 / 插件**](https://code.claude.com/docs/en/plugins)|YC AI 套壳创业公司 ([reddit](https://reddit.com/r/ClaudeAI/comments/1r6bh4d/claude_code_skills_are_basically_yc_ai_startup/))|

<a id="billion-dollar-questions"></a>
![价值十亿的问题](!/tags/billion-dollar-questions.svg)

*如有答案，请通过 shanraisshan@gmail.com 告知*

**记忆与指令 (4)**

1. CLAUDE.md 中到底应该放什么 — 又该排除什么？
2. 如果已有 CLAUDE.md，是否真的需要单独的 constitution.md 或 rules.md？
3. 应该多久更新一次 CLAUDE.md，又如何判断它已过时？
4. 为什么 Claude 仍然忽略 CLAUDE.md 指令 — 即使它们用大写写著 MUST？([reddit](https://reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/))

**代理、技能与工作流 (6)**

1. 何时该使用命令 vs 代理 vs 技能 — 何时原生 Claude Code 反而更好？
2. 随着模型改进，应该多久更新代理、命令和工作流？
3. 给子代理详细的人设是否能提高质量？研究/QA 子代理的"完美人设/提示"是什么样的？
4. 应该依赖 Claude Code 内置的计划模式 — 还是构建自己的计划命令/代理来强制执行团队工作流？
5. 如果有个人技能（如带着你编码风格的 /implement），如何整合社区技能（如 /simplify）而不冲突 — 当它们冲突时谁优先？
6. 我们到了吗？能否将现有代码库转换为规格，删除代码，然后仅从这些规格让 AI 精确重新生成相同的代码？

**规格与文档 (3)**

1. 仓库中的每个功能是否都应该有一个 markdown 规格文件？
2. 需要多久更新规格，以免在实现新功能时过时？
3. 实现新功能时，如何处理对其他功能规格的连锁影响？

## 报告

| 报告 | 描述 |
|--------|-------------|
| [Agent SDK vs CLI 系统提示](reports/claude-agent-sdk-vs-cli-system-prompts.md) | 为什么 Claude CLI 和 Agent SDK 输出可能不同 — 系统提示架构和确定性 |
| [浏览器自动化 MCP 比较](reports/claude-in-chrome-v-chrome-devtools-mcp.md) | Playwright、Chrome DevTools 和 Claude in Chrome 自动化测试比较 |
| [全局 vs 项目设置](reports/claude-global-vs-project-settings.md) | 哪些功能仅限全局（`~/.claude/`）vs 双范围，包括任务和代理团队 |
| [Monorepo 技能发现](reports/claude-skills-for-larger-mono-repos.md) | 技能在大型 monorepo 项目中如何被发现和加载 |
| [代理记忆前置配置](reports/claude-agent-memory.md) | 子代理的持久记忆范围（`user`、`project`、`local`）— 使代理能跨会话学习 |
| [高级工具使用模式](reports/claude-advanced-tool-use.md) | 编程式工具调用 (PTC)、工具搜索和工具使用示例 |
| [使用量、速率限制和额外用量](reports/claude-usage-and-rate-limits.md) | 使用量命令（`/usage`、`/extra-usage`、`/cost`）、速率限制和按量付费溢出计费 |
| [LLM 日复一日退化](reports/llm-day-to-day-degradation.md) | 为什么 LLM 性能日复一日变化 — 基础设施 bug、MoE 路由差异和心理学 |

[![Claude for OSS](!/tags/claude-for-oss.svg)](https://claude.com/contact-sales/claude-for-oss)
[![Claude 社区大使](!/tags/claude-community-ambassador.svg)](https://claude.com/community/ambassadors)