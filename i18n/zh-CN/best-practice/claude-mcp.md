# MCP 服务器最佳实践

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2002%2C%202026%2012%3A30%20PM%20PKT-white?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../.mcp.json)

MCP（模型上下文协议）服务器通过连接外部工具、数据库和 API 来扩展 Claude Code 的功能。本指南涵盖日常使用的推荐服务器和配置最佳实践。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 日常使用的 MCP 服务器

> *"曾经过度配置了 15 个 MCP 服务器，以为越多越好。结果日常只用到 4 个。"* — [r/mcp](https://reddit.com/r/mcp/comments/1mj0fxs/)（682 赞）

| MCP 服务器 | 功能说明 | 资源 |
|------------|----------|------|
| [**Context7**](https://github.com/upstash/context7) | 获取最新的库文档到上下文中。防止过时训练数据导致的 API 幻觉 | [Reddit："迄今为止最好的编程 MCP"](https://reddit.com/r/mcp/comments/1qarjqm/) · [npm](https://www.npmjs.com/package/@upstash/context7-mcp) |
| [**Playwright**](https://github.com/microsoft/playwright-mcp) | 浏览器自动化 — 自主实现、测试和验证 UI 功能。截图、导航、表单测试 | [Reddit：前端必备](https://reddit.com/r/mcp/comments/1m59pk0/) · [文档](https://playwright.dev/) |
| [**Claude in Chrome**](https://github.com/nicobailon/claude-code-in-chrome-mcp) | 将 Claude 连接到你的真实 Chrome 浏览器 — 检查控制台、网络、DOM。调试用户实际看到的内容 | [Reddit：调试的"颠覆者"](https://reddit.com/r/mcp/comments/1qarjqm/5_mcps_that_have_genuinely_made_me_10x_faster/nza0i7t/) · [对比报告](../reports/claude-in-chrome-v-chrome-devtools-mcp.md) |
| [**DeepWiki**](https://github.com/devanshusemwal/deepwiki-mcp) | 获取任意 GitHub 仓库的结构化 wiki 风格文档 — 架构、API 接口、关系 | [Reddit："把它和 Context7 放在网关后面"](https://reddit.com/r/mcp/comments/1qarjqm/) |
| [**Excalidraw**](https://github.com/antonpk1/excalidraw-mcp-app) | 通过提示词生成架构图、流程图和系统设计，输出为手绘风格的 Excalidraw 草图 | [GitHub](https://github.com/antonpk1/excalidraw-mcp-app) |

研究（Context7/DeepWiki）→ 调试（Playwright/Chrome）→ 文档（Excalidraw）

---

## 配置

MCP 服务器在项目根目录的 `.mcp.json`（项目范围）或 `~/.claude.json`（用户范围）中配置。

### 服务器类型

| 类型 | 传输方式 | 示例 |
|------|----------|------|
| **stdio** | 启动本地进程 | `npx`、`python`、二进制文件 |
| **http** | 连接到远程 URL | HTTP/SSE 端点 |

### `.mcp.json` 示例

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "deepwiki": {
      "command": "npx",
      "args": ["-y", "deepwiki-mcp"]
    },
    "remote-api": {
      "type": "http",
      "url": "https://mcp.example.com/mcp"
    }
  }
}
```

使用环境变量扩展来处理密钥，而不是将 API 密钥提交到 `.mcp.json`：

```json
{
  "mcpServers": {
    "remote-api": {
      "type": "http",
      "url": "https://mcp.example.com/mcp?token=${MCP_API_TOKEN}"
    }
  }
}
```

### MCP 服务器设置

`.claude/settings.json` 中的以下设置控制 MCP 服务器审批：

| 键 | 类型 | 描述 |
|----|------|------|
| `enableAllProjectMcpServers` | 布尔值 | 自动批准所有 `.mcp.json` 服务器，无需提示 |
| `enabledMcpjsonServers` | 数组 | 指定自动批准的服务器名称白名单 |
| `disabledMcpjsonServers` | 数组 | 指定拒绝的服务器名称黑名单 |

### MCP 工具的权限规则

MCP 工具在权限规则中遵循 `mcp__<server>__<tool>` 命名规范：

```json
{
  "permissions": {
    "allow": [
      "mcp__*",
      "mcp__context7__*",
      "mcp__playwright__browser_snapshot"
    ],
    "deny": [
      "mcp__dangerous-server__*"
    ]
  }
}
```

---

## MCP 作用域

MCP 服务器可以在三个层级定义：

| 作用域 | 位置 | 用途 |
|--------|------|------|
| **项目** | `.mcp.json`（仓库根目录） | 团队共享服务器，提交到 git |
| **用户** | `~/.claude.json`（`mcpServers` 键） | 跨所有项目的个人服务器 |
| **子代理** | 代理前置配置（`mcpServers` 字段） | 限定于特定子代理的服务器 |

优先级：子代理 > 项目 > 用户

---

## 来源

- [MCP 服务器 — Claude Code 文档](https://code.claude.com/docs/en/mcp)
- [模型上下文协议规范](https://modelcontextprotocol.io/)
- [让我效率提升 10 倍的 5 个 MCP — r/mcp](https://reddit.com/r/mcp/comments/1qarjqm/)
- [MCP 服务器过载讨论 — r/mcp](https://reddit.com/r/mcp/comments/1mj0fxs/)