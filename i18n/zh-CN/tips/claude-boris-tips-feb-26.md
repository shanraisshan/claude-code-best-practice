# 12 种自定义 Claude Code 的方式 — Boris Cherny 的技巧

Boris Cherny（[@bcherny](https://x.com/bcherny)，Claude Code 创造者）于 2026 年 2 月 12 日分享的自定义技巧摘要。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 背景

Boris Cherny 强调，可定制性是工程师最喜欢 Claude Code 的原因之一 —— 钩子、插件、LSP、MCP、技能、努力程度、自定义代理、状态栏、输出样式等等。他分享了 12 种开发者和团队自定义设置的实用方式。

<img src="assets/boris-feb-26/0.webp" alt="Boris Cherny 介绍推文" width="50%" />

---

## 1/ 配置你的终端

为最佳 Claude Code 体验设置终端：

- **主题**：运行 `/config` 设置浅色/深色模式
- **通知**：为 iTerm2 启用通知，或使用自定义通知钩子
- **换行**：如果在 IDE 终端、Apple Terminal、Warp 或 Alacritty 中使用 Claude Code，运行 `/terminal-setup` 启用 shift+enter 换行（这样就无需输入 `\`）
- **Vim 模式**：运行 `/vim`

<img src="assets/boris-feb-26/1.webp" alt="配置你的终端" width="50%" />

---

## 2/ 调整努力程度

运行 `/model` 选择你偏好的努力程度：

- **低** — 更少 token，更快响应
- **中** — 平衡行为
- **高** — 更多 token，更多智能

Boris 的偏好：全部使用高。

<img src="assets/boris-feb-26/2.webp" alt="调整努力程度" width="50%" />

---

## 3/ 安装插件、MCP 和技能

插件让你安装 LSP（支持所有主流语言）、MCP、技能、代理和自定义钩子。

从官方 Anthropic 插件市场安装，或为你的公司创建自己的市场。将 `settings.json` 提交到代码库，即可自动为团队添加市场。

运行 `/plugin` 开始。

<img src="assets/boris-feb-26/3.webp" alt="安装插件、MCP 和技能" width="50%" />

---

## 4/ 创建自定义代理

在 `.claude/agents` 中放置 `.md` 文件来创建自定义代理。每个代理可以有自定义名称、颜色、工具集、预允许和预禁止工具、权限模式和模型。

你还可以使用 `settings.json` 中的 `"agent"` 字段或 `--agent` 标志为主对话设置默认代理。

运行 `/agents` 开始。

<img src="assets/boris-feb-26/4.webp" alt="创建自定义代理" width="50%" />

---

## 5/ 预批准常用权限

Claude Code 使用结合提示注入检测、静态分析、沙箱和人工监督的权限系统。

开箱即用，一小部分安全命令已预批准。要预批准更多，运行 `/permissions` 并添加到允许和阻止列表。将这些提交到团队的 `settings.json`。

支持完整通配符语法 — 例如 `Bash(bun run *)` 或 `Edit(/docs/**)`。

<img src="assets/boris-feb-26/5.webp" alt="预批准常用权限" width="50%" />

---

## 6/ 启用沙箱

选择加入 Claude Code 的开源沙箱运行时，在减少权限提示的同时提高安全性。

运行 `/sandbox` 启用。沙箱在你的机器上运行，支持文件和网络隔离。

<img src="assets/boris-feb-26/6.webp" alt="启用沙箱" width="50%" />

---

## 7/ 添加状态栏

自定义状态栏显示在编辑器正下方，显示模型、目录、剩余上下文、费用以及你想在工作时看到的任何其他信息。

每个团队成员可以有不同的状态栏。使用 `/statusline` 让 Claude 根据你的 `.bashrc`/`.zshrc` 生成一个。

<img src="assets/boris-feb-26/7.webp" alt="添加状态栏" width="50%" />

---

## 8/ 自定义快捷键

Claude Code 中的每个快捷键都可自定义。运行 `/keybindings` 重新映射任何键。设置实时重载，你可以立即感受效果。

<img src="assets/boris-feb-26/8.webp" alt="自定义快捷键" width="50%" />

---

## 9/ 设置钩子

钩子让你确定性地接入 Claude 的生命周期：

- 自动将权限请求路由到 Slack 或 Opus
- 当 Claude 到达轮次末尾时轻推其继续（甚至可以启动代理或使用提示词决定 Claude 是否应该继续）
- 预处理或后处理工具调用，例如添加自己的日志

让 Claude 添加钩子以开始。

<img src="assets/boris-feb-26/9.webp" alt="设置钩子" width="50%" />

---

## 10/ 自定义旋转动词

自定义你的旋转动词，用你自己的动词添加或替换默认列表。将 `settings.json` 提交到源代码控制以与团队共享动词。

<img src="assets/boris-feb-26/10.webp" alt="自定义旋转动词" width="50%" />

---

## 11/ 使用输出样式

运行 `/config` 设置输出样式，让 Claude 以不同的语气或格式响应。

- **解释性** — 推荐在熟悉新代码库时使用，让 Claude 在工作时解释框架和代码模式
- **学习** — 让 Claude 指导你完成代码更改
- **自定义** — 创建自定义输出样式来调整 Claude 的声音

<img src="assets/boris-feb-26/11.webp" alt="使用输出样式" width="50%" />

---

## 12/ 自定义一切！

Claude Code 开箱即用效果很好，但当你自定义时，将 `settings.json` 提交到 git，这样你的团队也能受益。配置在多个层级受支持：

- 为你的代码库
- 为子文件夹
- 仅为你自己
- 通过企业范围的策略

拥有 37 个设置和 84 个环境变量（使用 `settings.json` 中的 `"env"` 字段避免包装脚本），你想要的任何行为很可能都是可配置的。

<img src="assets/boris-feb-26/12.webp" alt="自定义一切" width="50%" />

---

## 来源

- [Boris Cherny (@bcherny) 在 X 平台 — 2026年2月12日](https://x.com/bcherny)
- [Claude Code 终端设置文档](https://code.claude.com/docs/en/terminal)
- [Claude Code 插件与发现文档](https://code.claude.com/docs/en/discover-plugins)
- [Claude Code 子代理文档](https://code.claude.com/docs/en/sub-agents)
- [Claude Code 权限文档](https://code.claude.com/docs/en/permissions)
- [Claude Code 沙箱文档](https://code.claude.com/docs/en/sandbox)
- [Claude Code 状态栏文档](https://code.claude.com/docs/en/statusline)
- [Claude Code 快捷键文档](https://code.claude.com/docs/en/keybindings)
- [Claude Code 钩子参考](https://code.claude.com/docs/en/hooks)
- [Claude Code 输出样式文档](https://code.claude.com/docs/en/output-styles)
- [Claude Code 设置文档](https://code.claude.com/docs/en/settings)