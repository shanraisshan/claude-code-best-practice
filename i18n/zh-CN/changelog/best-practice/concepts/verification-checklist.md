# 验证清单 — README CONCEPTS 部分

用于验证 CONCEPTS 表准确性的规则。每次工作流运行时检查每条规则。

## 规则

### 1. 外部 URL 有效性
- **类别**: URL 准确性
- **检查内容**: CONCEPTS 表中的每个外部 URL（文档链接）都返回有效页面
- **深度**: 获取每个 URL 并确认加载的是预期页面（而非重定向到错误页面）
- **对比来源**: `https://code.claude.com/docs/llms.txt` 获取规范 URL 列表
- **添加日期**: 2026-03-02
- **来源**: Permissions URL `/iam` 被发现重定向到 Authentication 页面而非 Permissions 页面

### 2. 锚点片段有效性
- **类别**: URL 准确性
- **检查内容**: 任何带有锚点片段（`#section-name`）的 URL 与目标页面上的实际标题匹配
- **深度**: 获取页面并验证存在预期锚点的标题
- **对比来源**: 获取的页面内容
- **添加日期**: 2026-03-02
- **来源**: Rules 锚点 `#modular-rules-with-clauderules` 已过时；节重命名为 `#organize-rules-with-clauderules`

### 3. 缺失文档页面
- **类别**: 缺失概念
- **检查内容**: 官方文档索引（`llms.txt`中每个代表用户功能的页面在 CONCEPTS 表中都有对应行
- **深度**: 将完整文档索引与 CONCEPTS 表条目对比
- **对比来源**: `https://code.claude.com/docs/llms.txt`
- **添加日期**: 2026-03-02
- **来源**: 发现多个缺失概念（Agent Teams、Keybindings、Model Configuration 等）

### 4. 本地徽章链接有效性
- **类别**: 徽章准确性
- **检查内容**: CONCEPTS 表中的每个徽章目标路径（`best-practice/*.md`、`implementation/*.md`、`.claude/*/`）指向存在的文件或目录
- **深度**: 使用 Read/Glob 验证文件存在
- **对比来源**: 本地文件系统
- **添加日期**: 2026-03-02
- **来源**: 初始清单创建

### 5. 描述时效性
- **类别**: 描述准确性
- **检查内容**: 每个概念的描述准确反映当前官方文档描述
- **深度**: 将 README 描述与官方页面的 meta 描述或首段对比
- **对比来源**: 官方文档页面内容
- **添加日期**: 2026-03-02
- **来源**: Memory 描述缺失 auto memory；MCP Servers 位置缺失 `.mcp.json`