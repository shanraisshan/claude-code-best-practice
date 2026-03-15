---
name: vibe-to-agentic-framework
description: 演示文稿背后的概念框架 — "Vibe Coding 到 Agentic Engineering" 的含义、旅程结构的原因，以及每张幻灯片如何融入叙事弧线
---

# "Vibe Coding 到 Agentic Engineering" 框架

此技能教授演示文稿背后的**概念模型**。每张幻灯片和章节都存在以讲述一个单一故事：开发者如何从非结构化的"vibe coding"（Low 级别）逐步过渡到高级代理工程（High 级别）。

## 核心概念

**Vibe Coding（Low 级别）** 是开发者在没有结构的情况下使用 Claude Code — 没有项目上下文、没有约定、没有可复用知识。每个提示都是碰运气。Claude 可能创建随机端点、忽略现有模式、跳过测试并产生不一致的代码。每次交互都让代码库向熵增漂移。

**Agentic Engineering（High 级别）** 是 Claude Code 作为完全配置的工程系统运行。它知道项目架构（CLAUDE.md）、遵循范围约定（Rules）、按需加载领域专业知识（Skills）、委托给专门的Worker（Agents）、编排多步骤工作流（Commands）、自动化生命周期事件（Hooks）并连接外部工具（MCP Servers）。每个提示都产生一致、经过测试、生产质量的代码。

这两个极端之间的旅程是**增量且累积的**。每个最佳实践都建立在前一个之上，演示文稿按照开发者应该采用的顺序教授它们。

## 4 级旅程系统

演示文稿使用 4 级评分系统而非百分比栏：

| 级别 | 顺序 | 颜色 | 旅程栏高度 | 描述 |
|-------|-------|-------|--------------------|-------------|
| Low | 1 | 红/橙色 (`hsl(0, 70%, 45%)`) | 25% | Vibe coding 领域 — 无结构 |
| Medium | 2 | 黄色 (`hsl(40, 70%, 45%)`) | 50% | 结构化工作流，一些自动化 |
| High | 3 | 浅绿色 (`hsl(80, 70%, 45%)`) | 75% | 领域知识、技能、自定义代理 |
| Pro | 4 | 深绿色 (`hsl(120, 70%, 45%)`) | 100% | 完整代理工程，多代理团队 |

旅程栏在第 1 张幻灯片（标题幻灯片）隐藏，从第 2 张开始显示。级别通过关键过渡幻灯片上的 `data-level` 属性设置，并由后续幻灯片继承，直到下一个级别更改。当级别更改时，`.level-badge` 由 JS 注入到幻灯片的 `h1` 上（不要在 HTML 中硬编码这些）。

## 贯穿示例：TodoApp Monorepo

每个技术都在一个现实的全栈项目上演示。演示文稿展示从普通项目（vibe coding）到具有完整 Claude Code 配置的项目（agentic engineering）的转变：

**之前（Vibe Coding）：**
```
todoapp/
├── backend/          # FastAPI (Python)
│   ├── main.py
│   ├── routes/
│   ├── models/
│   └── tests/
└── frontend/         # Next.js (TypeScript)
    ├── components/
    ├── pages/
    └── lib/
```

**之后（Agentic Engineering）：**
```
todoapp/
├── .claude/                  # Claude Code 配置
│   ├── agents/               # 自定义子代理
│   ├── skills/               # 领域知识
│   ├── commands/             # 斜杠命令
│   ├── hooks/                # 生命周期脚本
│   ├── rules/                # 模块化指令
│   ├── settings.json         # 团队设置
│   └── settings.local.json   # 个人设置
├── backend/
│   └── CLAUDE.md             # 后端指令
├── frontend/
│   └── CLAUDE.md             # 前端指令
├── .mcp.json                 # 托管 MCP 服务器
└── CLAUDE.md                 # 项目指令
```

**为什么是 TodoApp？** 它足够小以适合幻灯片，但也足够复杂以演示真实问题：具有路由模式和测试约定的后端、具有组件层次结构和设计令牌的前端，以及跨领域关注点（如添加新功能）需要双方协调的 monorepo 结构。

TodoApp 使 vibe-coding 问题具体化：没有结构，要求 Claude"添加笔记功能"会产生一个不遵循 `routes/todos.py` 模式的随机 `/api/notes` 端点、一个没有侧边栏导航的独立页面，以及零测试。有了完整的代理设置，同样的请求会产生一个遵循现有模式的路由、一个集成到侧边栏的页面，以及匹配 `test_todos.py` 风格的测试。

## 旅程弧线：为什么是这个顺序

演示文稿遵循刻意设计的教学序列。每个章节解锁一个新的能力层：

### 第 0 部分：介绍（第 1-4 张，无权重）
**目的：** 设定舞台。介绍 TodoApp，定义 vibe coding，展示目的地。
- 标题幻灯片建立旅程隐喻
- Example Project 展示转变：TodoApp 的前后对比 — 普通项目结构 vs 具有完整 Claude Code 配置的结构（.claude/、CLAUDE.md、.mcp.json 等）
- "What is Vibe Coding?" 创建 0% 基线 — 痛点
- Journey Map 提供可点击的 TOC，显示前方的完整路径

### 第 1 部分：先决条件（第 5-9 张，无权重）
**目的：** 安装并运行 Claude Code。这只是后勤工作 — 还没有工程实践。
- 安装、身份验证、首次会话、界面概览
- 无权重，因为知道如何安装工具不会提高代码质量
- "首次会话"就是 vibe coding — 这是有意的，让开发者亲身体验 0% 状态

### 第 2 部分：更好的提示（第 10-17 张，级别：Low）
**目的：** 第一个真正的改进。更好的输入产生更好的输出，即使没有任何项目配置。
- **好 vs 坏的提示：** 具体、范围明确的提示 vs 模糊的请求。最简单的改进。
- **提供上下文：** 使用 `@files` 给 Claude 它需要的代码。立即减少幻觉。
- **上下文窗口 & /compact：** 理解有限的上下文窗口可防止长会话中响应质量下降。
- **计划模式：** `/plan` 强制在编码前思考。防止在错误方法上浪费时间。

**为什么是 Low 级别：** 提示是基础但有限的。它改善单个交互但不创建持久的项目知识。每个会话都从零开始。

### 第 3 部分：项目记忆（第 18-24 张，级别：Medium）
**目的：** 从会话级知识跃升到项目级知识。Claude 现在可以跨会话记忆。
- **CLAUDE.md & /init：** 项目的"Claude 的 README"。建立架构、技术栈和约定。这是最具影响力的单一文件。
- **包含什么：** 编写有效 CLAUDE.md 内容的实用指南（保持在 150 行以内，专注于 Claude 需要知道的内容）。
- **Rules：** `.claude/rules/` 中路径范围的约定。Rules 是倍增器 — 它们自动应用于每个匹配的文件，无需开发者努力即可强制一致性。单个 `backend-testing.md` 规则确保每个测试永远遵循相同的模式。

**为什么是 Medium 级别：** 项目记忆将 Claude 从无状态工具转变为上下文感知的协作者。但仅有知识不会创建工作流。

### 第 4 部分：结构化工作流（第 25-28 张，级别：Medium）
**目的：** 防止浪费精力并提高执行质量的系统方法。
- **任务列表：** 将复杂工作分解为可追踪的步骤。防止范围漂移并确保完整性。
- **模型选择：** 选择正确的模型（架构用 Opus、实现用 Sonnet、快速任务用 Haiku）优化成本和质量。

**仍然是 Medium 级别的原因：** 工作流很重要但相对简单。它们建立第 3 部分的项目记忆之上并更系统地使用它。向 High 的步骤来自领域知识。

### 第 5 部分：领域知识（第 29-33 张，级别：High）
**目的：** 可复用、按需的专业知识。Skills 是静态记忆（CLAUDE.md/Rules）和动态代理之间的桥梁。
- **什么是 Skills：** Skills 作为打包的领域知识，Claude 在相关时加载。渐进式披露概念。
- **创建 Skills：** 实践：为 TodoApp 构建 `frontend-conventions` 技能，教授 Tailwind tokens、组件模式和侧边栏集成。
- **技能前置配置与调用：** 技术细节：YAML 前置配置、手动 vs 自动发现调用、`context: fork` 选项。

**为什么是 High 级别：** Skills 是第一个"倍增器"概念 — 一个技能定义改善其领域内的每个未来交互。但技能是被动知识；它们需要代理才能变得主动。

### 第 6 部分：代理工程（第 34-46 张，级别：High）
**目的：** 本演示文稿涵盖的目的地。自主、专门的代理协调端到端构建功能。
- **什么是 Agents：** 具有受限工具和预加载技能的专门子代理概念。
- **Frontend Engineer Agent：** 使用 TodoApp 前端约定、向侧边栏添加路由、遵循设计令牌的具体代理。前后对比展示转变。
- **Backend Engineer Agent：** 后端的并行代理 — 遵循 FastAPI 路由模式、SQLAlchemy 模型、编写匹配现有风格的测试。
- **Commands & Orchestration：** 旗舰模式：Command → Agent → Skills。单个 `/add-feature` 命令协调 frontend + backend 代理，每个都有自己的技能，交付完整的功能。这是架构巅峰。
- **Hooks & MCP：** 生命周期自动化（pre-commit 检查、声音通知）和外部工具集成。最后的自动化层。
- **Command → Agent → Skills：** 完整架构图。展示所有部分如何连接：命令调用代理、代理加载技能、技能提供知识。这是"High 级别"理解幻灯片。

**为什么是 High 级别：** 本节涵盖本演示文稿教授的最高价值实践。之前的一切都在为此铺垫。编排和代理工作流代表本课程涵盖的上限 — 完整的 Pro（多代理团队、高级编排模式）超出了本演示文稿的范围。

### High 级别幻灯片（第 44 张）
庆祝时刻。展示完整的 TodoApp 配置：
- CLAUDE.md 用于项目上下文
- Rules 用于路径范围约定
- Skills 用于领域知识
- Agents 用于一致执行
- Commands 用于编排工作流
- Hooks 用于生命周期自动化
- MCP servers 用于外部工具

### 附录（第 47+ 张，无权重）
**目的：** 参考资料。每个命令、设置和配置选项。无权重，因为这些是参考查找，不是旅程里程碑。包括：工具使用、所有斜杠命令、commit/PR 工作流、自定义选项、调试技巧和黄金法则。

## 编辑幻灯片时如何使用此框架

创建或修改幻灯片时，考虑：

1. **此概念在旅程中的位置？** 关于"提示中更好的错误消息"的幻灯片属于第 2 部分（提示，Low 级别）。关于"代理内存范围"的幻灯片属于第 6 部分（代理，High 级别）。

2. **前后是什么？** 每张重要幻灯片都应隐式或显式地展示对比：Low 级别（vibe coding）会发生什么 vs 使用此技术会发生什么。使用 TodoApp 使其具体化。

3. **级别分配感觉对吗？** 级别过渡发生在 Part 章节边界。章节内的单个幻灯片继承章节的级别。

4. **是否建立在之前的基础上？** Skills 假设开发者已经知道 CLAUDE.md 和 Rules。Agents 假设他们知道 Skills。Commands 假设他们知道 Agents。永远不要在其章节之前引用概念。

5. **使用 TodoApp。** 抽象解释会让听众失去兴趣。展示实际的 `routes/todos.py` 代码、实际的 `Sidebar.tsx` 组件、实际的 `CLAUDE.md` 内容。贯穿示例是使框架有形的关键。

## 级别过渡参考表

| 幻灯片 | 幻灯片名称 | data-level | 级别标签 |
|-------|-----------|------------|-------------|
| 10 | Better Prompting（章节分隔符） | `data-level="low"` | Low |
| 18 | Project Memory（章节分隔符） | `data-level="medium"` | Medium |
| 29 | Domain Knowledge（章节分隔符） | `data-level="high"` | High |
| 34 | Agentic Engineering（章节分隔符） | `data-level="high"` | High |

所有其他幻灯片继承之前设置的最后一个 `data-level` 属性。第 1-9 张（介绍 + 先决条件）没有级别，栏保持隐藏直到第 2 张显示"Low"（第 2-9 张在第一次级别过渡的第 10 张之前，所以栏显示空/零直到第 10 张）。

**注意：** 主演示文稿（`presentation/index.html`）上限为 **High** 级别 — 不使用 `data-level="pro"`。Pro 刻度标记在旅程栏上作为理论上限可见，但填充永远不会达到它。视频演示（`1-video-workflow.html`）上限为 **Medium** 级别。