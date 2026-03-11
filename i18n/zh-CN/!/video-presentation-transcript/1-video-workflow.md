# 视频 1：从 Vibe Coding 到 Agentic Engineering — Claude Code 工作流

**总时长：约 5 分钟**

---

## 开场 — 问题所在 (0:00 – 0:45)

- "如果你刚开始使用 Claude Code，很可能你在做 vibe coding — 输入提示、获取结果、重复。这行得通，但你只用了 Claude Code 能力的一小部分。"
- "这个仓库是一个精选的最佳实践集合，带你从 vibe coding 走向 agentic engineering — Claude 不只是响应你，它为你运行工作流。"
- "在这第一个视频中，我将涵盖基础：**Commands、Agents 和 Skills** — 以及它们如何链接成可重复的工作流。"

---

## 第一部分 — 随意方式 (0:45 – 2:00)

**演示：Vibe coding 方法**

- 打开一个新的 Claude Code 终端
- 输入：*"迪拜天气怎么样？把它写入输出文件并为它创建一个 SVG 卡片。"*
- 展示结果 — 它有效，但指出：
  - SVG 设计每次都不同（随机颜色、布局、字体）
  - 你必须坐着看它工作
  - 如果你明天再运行，你会得到一个完全不同外观的卡片
- **打开第二个终端，再次运行相同的提示**
  - 并排展示 SVG — 它们看起来不同
- "这就是 vibe coding 的问题。它有效一次。但它不可重复。它不是你可以信任的工作流。"

---

## 第二部分 — 工作流方式 (2:00 – 3:15)

**演示：`/weather-orchestrator` 命令**

- "现在让我展示同样的任务，但作为工作流。"
- 输入：`/weather-orchestrator`
- 逐步讲解屏幕上发生的事情：
  1. 它**询问你**摄氏度还是华氏度（结构化用户交互）
  2. 它**启动 weather-agent** 来获取温度（你在终端中看到绿色代理）
  3. 它**调用技能**来创建 SVG 卡片
  4. 输出：`orchestration-workflow/weather.svg` + `orchestration-workflow/output.md`
- "再次运行 — 相同的 SVG 布局，相同的文件结构，相同的整洁结果。每次都是。"
- "你可以启动这个然后走开。它自主运行。"

---

## 第三部分 — 如何工作：Command → Agent → Skill (3:15 – 4:30)

**解释三个构建块**

### Commands（命令）(`.claude/commands/`)

- "命令是入口点 — 就像脚本。它是一个 markdown 文件，告诉 Claude *要遵循哪些步骤*。"
- "我们的 `weather-orchestrator` 是指挥者。它问用户一个问题，调用代理，然后调用技能。"
- 命令位于 `.claude/commands/` 并显示为 `/slash-commands`

### Agents（代理）(`.claude/agents/`)

- "代理是一个专门的工作者。我们的 `weather-agent` 有一项工作：获取温度。"
- "它有一个**预加载的技能**叫做 `weather-fetcher` — 那个技能在启动时注入到代理的上下文中，所以它确切知道调用哪个 API 以及如何解析响应。"
- 代理有自己的工具、模型和权限。它们是隔离的工作者。

### Skills（技能）(`.claude/skills/`)

- "技能是一组可复用的指令。把它想象成菜谱。"
- "我们这里有两种技能模式："
  - **代理技能**（预加载）：`weather-fetcher` 烘焙到代理中 — 它是领域知识
  - **调用的技能**：`weather-svg-creator` 通过 Skill 工具独立调用 — 它创建 SVG 卡片
- 技能可以是背景知识或独立操作

### 流程图（可选在屏幕上显示）

```
/weather-orchestrator (Command)
    → AskUser: C° 或 F°?
    → weather-agent (Agent + weather-fetcher skill)
    → weather-svg-creator (Skill)
    → Output: weather.svg + output.md
```

---

## 第四部分 — 为什么这很重要 / 总结 (4:30 – 5:00)

- "vibe coding 和 agentic engineering 之间的区别是**结构**。"
  - Vibe coding：你输入、你希望、你得到某样东西。
  - Agentic engineering：你定义一次工作流，它每次以相同方式运行。
- "Commands、Agents 和 Skills 是三个构建块。一旦你理解了这些，你可以构建任何工作流。"
- "这个仓库有更多模式 — hooks、多代理团队、CLAUDE.md 配置 — 我们将在接下来的视频中涵盖那些。"
- "仓库链接在描述中。给它 star、克隆它，并开始构建你自己的工作流。"

---

## 快速参考

| 概念 | 位置 | 目的 |
|---------|----------|---------|
| Command（命令） | `.claude/commands/` | 入口点、编排、`/slash-command` |
| Agent（代理） | `.claude/agents/` | 具有独立工具和模型的专门工作者 |
| Skill（技能） | `.claude/skills/` | 可复用指令（预加载或调用） |