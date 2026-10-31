# claude-code-最佳实践

从"感觉编码"到"智能代理工程" - 实践成就完美的 Claude

![使用 Claude Code 更新](https://img.shields.io/badge/使用_Claude_Code_更新-v2.1.139%20(2026年5月13日)-white?style=flat&labelColor=555)

> [!TIP]
> 访问[**如何使用**](#如何使用)部分，充分利用本仓库。

## 🧠 核心概念

| 功能 | 位置 | 说明 |
|------|------|------|
| **子代理 (Subagents)** | `.claude/agents/<name>.md` | 专注于特定功能的AI代理 |
| **命令 (Commands)** | `.claude/commands/<name>.md` | 快速触发的工作流命令 |
| **技能 (Skills)** | `.claude/skills/<name>/SKILL.md` | 可复用的功能模块 |
| **工作流 (Workflows)** | `.claude/commands/` | 复杂的多步骤流程 |
| **钩子 (Hooks)** | `.claude/hooks/` | 事件触发的自动化 |
| **MCP 服务器** | `.claude/settings.json`, `.mcp.json` | 模型上下文协议集成 |
| **设置 (Settings)** | `.claude/settings.json` | 项目和全局配置 |
| **记忆 (Memory)** | `CLAUDE.md`, `.claude/rules/` | AI行为和规则定义 |

---

## 🔥 热门功能

| 功能 | 位置 | 说明 |
|------|------|------|
| **Ultrareview** (测试) | `/ultrareview` | 任务跟踪和代码审查 |
| **开发容器** | `.devcontainer/` | 一致的开发环境 |
| **Channels** (测试) | `--channels` | 多通道集成 |
| **Ultraplan** (测试) | `/ultraplan` | 智能规划工具 |
| **自动模式** (测试) | `--permission-mode auto` | 消除权限提示 |
| **Power-ups** | `/powerup` | 高级功能增强 |
| **快速模式** (测试) | `/fast` | 加快处理速度 |
| **计算机使用** (测试) | `computer-use` MCP | 桌面自动化 |
| **Agent SDK** | npm / pip 包 | 构建自定义代理 |

---

## ⚙️ 开发工作流

所有主要工作流都遵循同一架构模式：**研究 → 规划 → 执行 → 审查 → 发布**

| 名称 | ⭐ | 工作流 |
|------|----|----|
| [Superpowers](https://github.com/obra/superpowers) | 188k | 头脑风暴 → 规划 → 实现 |
| [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) | 180k | 计划 → 实现 → 验证 |
| [Spec Kit](https://github.com/github/spec-kit) | 97k | 宪法 → 规范 → 实现 |
| [gstack](https://github.com/garrytan/gstack) | 95k | 办公时间 → 规划 → 代码 |

---

## 🧰 技能集合

按星数排序的最受欢迎的技能库：

| 名称 | ⭐ | 技能数 |
|------|----|----|
| [anthropics/skills](https://github.com/anthropics/skills) | 133k | 17 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | 76k | 24 |
| [wshobson/agents](https://github.com/wshobson/agents) | 35k | 153 |
| [agent-skills](https://github.com/addyosmani/agent-skills) | 27k | 21 |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 21k | 1,100+ |

---

## 🤖 代理集合

最受欢迎的代理定义库：

| 名称 | ⭐ | 代理数 |
|------|----|----|
| [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | 96k | 198 |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 20k | 189 |

---

## 💡 技巧和技巧 (83个)

### 🚫👶 = 不要过度管理

**提示 (3个)**

| 技巧 | 来源 |
|-----|------|
| 挑战Claude——"审视这些变更，直到我通过你的测试才提交PR" | Boris |
| 修复效果不理想后——"了解所有信息后，重新实现优雅的解决方案" | Boris |
| Claude通常自己修复大多数bug——粘贴bug，说"修复"，不要微管理 | Boris |

**规划/规范 (7个)**

| 技巧 | 来源 |
|-----|------|
| 始终从[规划模式](https://code.claude.com/docs/en/common-workflows)开始 | Boris |
| 用最少的规范开始，让Claude通过[AskUserQuestion](https://code.claude.com/docs/en/cli-reference)工具采访你 | Thariq |
| 始终制定分阶段的门控计划，每个阶段有多个测试（单元、自动化、集成） | Dex |
| 将PRD分解为纵切片（追踪器），跨越所有层（DB + 服务 + UI） | Boris |
| 启动第二个Claude作为员工工程师审查你的计划 | Boris |

**上下文 (5个)**

| 技巧 | 来源 |
|-----|------|
| 在1M上下文模型上，上下文衰退在~300-400k tokens开始——保持会话在那之下 | Thariq |
| 在~40%上下文时进入"愚蠢区"——保持在40%以下 | Thariq |
| 倒回 > 修正——双按Esc或使用[/rewind](https://code.claude.com/docs/en/checkpointing)返回失败前的状态 | Thariq |
| [/compact](https://code.claude.com/docs/en/interactive-mode)提示比让自动压缩运行更好 | Thariq |
| 使用子代理进行上下文管理——只让child的最终结果进入主上下文 | Thariq |

---

## 📚 教程

### Day 0：安装和设置
- [Windows](tutorial/day0/windows.md)
- [macOS](tutorial/day0/mac.md)
- [Linux](tutorial/day0/linux.md)

### Day 1：第一次对话
- [级别1：提示](tutorial/day1/README.md#level-1-prompting-just-ask)
- [级别2：代理](tutorial/day1/README.md#level-2-agents-the-specialist)
- [级别3：技能](tutorial/day1/README.md#level-3-skills-the-training)

---

## 🎬 视频/播客

| 视频/播客 | 来源 | YouTube |
|----------|------|---------|
| 从感觉编码到智能代理工程 (Andrej) \| 2026年5月2日 | AI Engineer | [观看](https://www.youtube.com/watch?v=...) |
| AI编码工作流完整演练 (Matt) \| 2026年4月24日 | Matt Pocock | [观看](https://youtu.be/-QFHIoCo-Ko) |
| 构建Claude Code (Boris) \| 2026年3月4日 | Pragmatic Engineer | [观看](https://youtu.be/julbw1JuAz0) |

---

<a id="如何使用"></a>

## 如何使用

按以下步骤充分利用本仓库：

1. **作为课程阅读，不是工作流** — 这是参考资料；稍后运行内容
2. **不要将Claude作为聊天机器人使用** — 学习原语（agents、commands、skills、hooks）并组装成自己的工作流
3. **运行[`/weather-orchestrator`](orchestration-workflow/orchestration-workflow.md)** 查看完整的命令 → 代理 → 技能流程
4. **在工作时监听自定义钩子声音** — 实现在[Claude Code 钩子仓库](https://github.com/shanraisshan/claude-code-hooks)
5. **学习高级主题和实现** — 从[🔥 热门](#-热门功能)小节了解
6. **在你的项目中指向[技巧和技巧](#-技巧和技巧-83个)部分** — 所有技巧都有来源标注
7. **订阅社区** — 在[订阅](#-订阅)部分查看Reddit和YouTube频道

---

## 📖 其他资源

- [Claude Code 官方文档](https://code.claude.com/docs)
- [Anthropic 提示工程指南](https://github.com/anthropics/prompt-eng-interactive-tutorial)
- [Agent SDK 快速开始](https://code.claude.com/docs/en/agent-sdk/quickstart)

---

## 📝 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件获取详情

原始作者：Shayan Rais ([@shanraisshan](https://github.com/shanraisshan))  
中文翻译：本仓库贡献者

---

## 🙏 致谢

感谢原始仓库的创建者和所有贡献者！

如果你想贡献中文翻译，请查看[TRANSLATION_GUIDE.zh-CN.md](TRANSLATION_GUIDE.zh-CN.md)

---

**最后更新**: 2026年5月13日
