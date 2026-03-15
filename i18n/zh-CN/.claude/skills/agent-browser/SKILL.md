---
name: agent-browser
description: AI 代理的浏览器自动化 CLI。当用户需要与网站交互时使用，包括导航页面、填写表单、点击按钮、截图、提取数据、测试 web 应用或自动化任何浏览器任务。触发包括"打开网站"、"填写表单"、"点击按钮"、"截图"、"从页面抓取数据"、"测试这个 web 应用"、"登录网站"、"自动化浏览器操作"等请求，或任何需要程序化 web 交互的任务。
allowed-tools: Bash(agent-browser:*)
---

# 使用 agent-browser 进行浏览器自动化

## 核心工作流

每次浏览器自动化都遵循此模式：

1. **导航**：`agent-browser open <url>`
2. **快照**：`agent-browser snapshot -i`（获取元素引用如 `@e1`、`@e2`）
3. **交互**：使用引用点击、填充、选择
4. **重新快照**：导航或 DOM 更改后，获取新的引用

```bash
agent-browser open https://example.com/form
agent-browser snapshot -i
# 输出：@e1 [input type="email"], @e2 [input type="password"], @e3 [button] "Submit"

agent-browser fill @e1 "user@example.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait --load networkidle
agent-browser snapshot -i  # 检查结果
```

## 基本命令

```bash
# 导航
agent-browser open <url>              # 导航（别名：goto, navigate）
agent-browser close                   # 关闭浏览器

# 快照
agent-browser snapshot -i             # 带引用的交互元素（推荐）
agent-browser snapshot -i -C          # 包含光标交互元素（带 onclick、cursor:pointer 的 div）
agent-browser snapshot -s "#selector" # 范围限定到 CSS 选择器

# 交互（使用快照中的 @refs）
agent-browser click @e1               # 点击元素
agent-browser fill @e2 "text"         # 清除并输入文本
agent-browser type @e2 "text"         # 不清除直接输入
agent-browser select @e1 "option"     # 选择下拉选项
agent-browser check @e1               # 勾选复选框
agent-browser press Enter             # 按键
agent-browser scroll down 500         # 滚动页面

# 获取信息
agent-browser get text @e1            # 获取元素文本
agent-browser get url                 # 获取当前 URL
agent-browser get title               # 获取页面标题

# 等待
agent-browser wait @e1                # 等待元素
agent-browser wait --load networkidle # 等待网络空闲
agent-browser wait --url "**/page"    # 等待 URL 模式
agent-browser wait 2000               # 等待毫秒数

# 捕获
agent-browser screenshot              # 截图到临时目录
agent-browser screenshot --full       # 全页截图
agent-browser pdf output.pdf          # 保存为 PDF
```

## 常见模式

### 表单提交

```bash
agent-browser open https://example.com/signup
agent-browser snapshot -i
agent-browser fill @e1 "Jane Doe"
agent-browser fill @e2 "jane@example.com"
agent-browser select @e3 "California"
agent-browser check @e4
agent-browser click @e5
agent-browser wait --load networkidle
```

### 带状态持久化的认证

```bash
# 登录一次并保存状态
agent-browser open https://app.example.com/login
agent-browser snapshot -i
agent-browser fill @e1 "$USERNAME"
agent-browser fill @e2 "$PASSWORD"
agent-browser click @e3
agent-browser wait --url "**/dashboard"
agent-browser state save auth.json

# 在未来会话中复用
agent-browser state load auth.json
agent-browser open https://app.example.com/dashboard
```

### 数据提取

```bash
agent-browser open https://example.com/products
agent-browser snapshot -i
agent-browser get text @e5           # 获取特定元素文本
agent-browser get text body > page.txt  # 获取所有页面文本

# JSON 输出用于解析
agent-browser snapshot -i --json
agent-browser get text @e1 --json
```

### 并行会话

```bash
agent-browser --session site1 open https://site-a.com
agent-browser --session site2 open https://site-b.com

agent-browser --session site1 snapshot -i
agent-browser --session site2 snapshot -i

agent-browser session list
```

### 可视化浏览器（调试）

```bash
agent-browser --headed open https://example.com
agent-browser highlight @e1          # 高亮元素
agent-browser record start demo.webm # 录制会话
```

### 本地文件（PDF、HTML）

```bash
# 使用 file:// URL 打开本地文件
agent-browser --allow-file-access open file:///path/to/document.pdf
agent-browser --allow-file-access open file:///path/to/page.html
agent-browser screenshot output.png
```

### iOS 模拟器（Mobile Safari）

```bash
# 列出可用的 iOS 模拟器
agent-browser device list

# 在特定设备上启动 Safari
agent-browser -p ios --device "iPhone 16 Pro" open https://example.com

# 与桌面相同的工作流 - 快照、交互、重新快照
agent-browser -p ios snapshot -i
agent-browser -p ios tap @e1          # 点击（click 的别名）
agent-browser -p ios fill @e2 "text"
agent-browser -p ios swipe up         # 移动端特定手势

# 截图
agent-browser -p ios screenshot mobile.png

# 关闭会话（关闭模拟器）
agent-browser -p ios close
```

**要求：** 带有 Xcode 的 macOS，Appium（`npm install -g appium && appium driver install xcuitest`）

**真机：** 如果预先配置，可与物理 iOS 设备配合使用。使用 `--device "<UDID>"`，其中 UDID 来自 `xcrun xctrace list devices`。

## 引用生命周期（重要）

当页面更改时，引用（`@e1`、`@e2` 等）会失效。以下情况后必须重新快照：

- 点击导航链接或按钮
- 表单提交
- 动态内容加载（下拉菜单、模态框）

```bash
agent-browser click @e5              # 导航到新页面
agent-browser snapshot -i            # 必须重新快照
agent-browser click @e1              # 使用新的引用
```

## 语义定位器（引用的替代方案）

当引用不可用或不可靠时，使用语义定位器：

```bash
agent-browser find text "Sign In" click
agent-browser find label "Email" fill "user@test.com"
agent-browser find role button click --name "Submit"
agent-browser find placeholder "Search" type "query"
agent-browser find testid "submit-btn" click
```

## 深入文档

| 参考 | 何时使用 |
|-----------|-------------|
| [references/commands.md](references/commands.md) | 完整命令参考及所有选项 |
| [references/snapshot-refs.md](references/snapshot-refs.md) | 引用生命周期、失效规则、故障排除 |
| [references/session-management.md](references/session-management.md) | 并行会话、状态持久化、并发抓取 |
| [references/authentication.md](references/authentication.md) | 登录流程、OAuth、2FA 处理、状态复用 |
| [references/video-recording.md](references/video-recording.md) | 用于调试和文档的录制工作流 |
| [references/proxy-support.md](references/proxy-support.md) | 代理配置、地理测试、轮换代理 |

## 即用模板

| 模板 | 描述 |
|----------|-------------|
| [templates/form-automation.sh](templates/form-automation.sh) | 带验证的表单填写 |
| [templates/authenticated-session.sh](templates/authenticated-session.sh) | 登录一次，复用状态 |
| [templates/capture-workflow.sh](templates/capture-workflow.sh) | 带截图的内容提取 |

```bash
./templates/form-automation.sh https://example.com/form
./templates/authenticated-session.sh https://app.example.com/login
./templates/capture-workflow.sh https://example.com ./output
```