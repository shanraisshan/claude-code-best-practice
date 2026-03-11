# Claude 记忆

通过 CLAUDE.md 文件实现持久化上下文 —— 如何编写它们以及在 monorepo 中如何加载。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 1. 编写优秀的 CLAUDE.md

结构良好的 CLAUDE.md 是改善 Claude Code 项目输出的最有效方式。Humanlayer 有一份优秀的指南，涵盖应包含什么、如何组织结构以及常见陷阱。

- [Humanlayer - 编写优秀的 Claude.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)

---

## 2. 大型 Monorepo 中的 CLAUDE.md

在 monorepo 中使用 Claude Code 时，理解 CLAUDE.md 文件如何加载到上下文中对于有效组织项目指令至关重要。

<p align="center">
  <img src="assets/claude-memory/claude-memory-monorepo.jpg" alt="monorepo 中 CLAUDE.md 的加载" width="600">
</p>

### 两种加载机制

Claude Code 使用两种不同的机制加载 CLAUDE.md 文件：

#### 祖先加载（向目录树上）

当你启动 Claude Code 时，它会从当前工作目录**向上**遍历到文件系统根目录，并加载沿途发现的所有 CLAUDE.md 文件。这些文件会在**启动时立即加载**。

#### 后代加载（向目录树下）

当前工作目录下方子目录中的 CLAUDE.md 文件**不会在启动时加载**。它们只在你会话期间读取这些子目录中的文件时才会被包含。这被称为**延迟加载**。

### 示例 Monorepo 结构

考虑一个典型的 monorepo，不同组件有独立的目录：

```
/mymonorepo/
├── CLAUDE.md          # 根级别指令（跨所有组件共享）
├── frontend/
│   └── CLAUDE.md      # 前端特定指令
├── backend/
│   └── CLAUDE.md      # 后端特定指令
└── api/
    └── CLAUDE.md      # API 特定指令
```

### 场景 1：从根目录运行 Claude Code

当你从 `/mymonorepo/` 运行 Claude Code：

```bash
cd /mymonorepo
claude
```

| 文件 | 启动时加载？ | 原因 |
|------|-------------------|--------|
| `/mymonorepo/CLAUDE.md` | 是 | 当前工作目录 |
| `/mymonorepo/frontend/CLAUDE.md` | 否 | 仅在读取/编辑 `frontend/` 中的文件时加载 |
| `/mymonorepo/backend/CLAUDE.md` | 否 | 仅在读取/编辑 `backend/` 中的文件时加载 |
| `/mymonorepo/api/CLAUDE.md` | 否 | 仅在读取/编辑 `api/` 中的文件时加载 |

### 场景 2：从组件目录运行 Claude Code

当你从 `/mymonorepo/frontend/` 运行 Claude Code：

```bash
cd /mymonorepo/frontend
claude
```

| 文件 | 启动时加载？ | 原因 |
|------|-------------------|--------|
| `/mymonorepo/CLAUDE.md` | 是 | 祖先目录 |
| `/mymonorepo/frontend/CLAUDE.md` | 是 | 当前工作目录 |
| `/mymonorepo/backend/CLAUDE.md` | 否 | 目录树的不同分支 |
| `/mymonorepo/api/CLAUDE.md` | 否 | 目录树的不同分支 |

### 关键要点

1. **祖先始终在启动时加载** — Claude 向上遍历目录树并加载所有发现的 CLAUDE.md 文件。这确保你始终能访问根级别的、仓库范围的指令。

2. **后代延迟加载** — 子目录 CLAUDE.md 文件仅在你与这些子目录中的文件交互时加载。这防止无关上下文膨胀你的会话。

3. **兄弟目录不会加载** — 如果你在 `frontend/` 中工作，`backend/CLAUDE.md` 或 `api/CLAUDE.md` 不会被加载到上下文中。

4. **全局 CLAUDE.md** — 你还可以在主文件夹放置 `~/.claude/CLAUDE.md`，它适用于所有 Claude Code 会话，无论项目如何。

### 此设计为何适合 Monorepo

- **共享指令向下传递** — 根级别 CLAUDE.md 包含仓库范围的约定、编码规范和通用模式，适用于所有地方。

- **组件特定指令保持隔离** — 前端开发者不需要后端特定指令干扰他们的上下文，反之亦然。

- **上下文优化** — 通过延迟加载后代 CLAUDE.md 文件，Claude Code 避免在启动时加载可能数百 KB 的无关指令。

### 最佳实践

1. **将共享约定放在根 CLAUDE.md** — 编码规范、提交消息格式、PR 模板和其他仓库范围指南。

2. **将组件特定指令放在组件 CLAUDE.md** — 框架特定模式、组件架构、该组件独有的测试约定。

3. **使用 CLAUDE.local.md 存放个人偏好** — 将其添加到 `.gitignore`，用于不应与团队共享的指令。

---

## 来源

- [Claude Code 文档 - Claude 如何查找记忆](https://code.claude.com/docs/en/memory#how-claude-looks-up-memories)
- [Boris Cherny 在 X 平台 - 关于 CLAUDE.md 加载的说明](https://x.com/bcherny/status/2016339448863355206)
- [Humanlayer - 编写优秀的 Claude.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)