---
name: ai-sdk
description: 'Answer questions about the AI SDK and help build AI-powered features. Use when developers: (1) Ask about AI SDK functions like generateText, streamText, ToolLoopAgent, or tools, (2) Want to build AI agents, chatbots, or text generation features, (3) Have questions about AI providers (OpenAI, Anthropic, etc.), streaming, tool calling, or structured output.'
metadata:
  author: Vercel Inc.
  version: '1.0'
---

## AI SDK Documentation

When you need up-to-date information about the AI SDK:

### If using ai@6.0.34 or above

Search the bundled documentation and source code in `node_modules/ai/`:

1. **Documentation**: `grep "your query" node_modules/ai/docs/`
2. **Source code**: `grep "your query" node_modules/ai/src/`

To find specific files:

- `glob "node_modules/ai/docs/**/*.mdx"` for documentation files
- `glob "node_modules/ai/src/**/*.ts"` for source files

Provider packages (`@ai-sdk/openai`, `@ai-sdk/anthropic`, etc.) also include bundled docs in their respective `node_modules/@ai-sdk/<provider>/docs/` directories.

**When in doubt, update to the latest version of the AI SDK.**

### Otherwise

1. Search the docs: `https://ai-sdk.dev/api/search-docs?q=your_query`
2. The response includes matches with links ending in `.md`
3. Fetch those `.md` URLs directly to get plain text content (e.g. `https://ai-sdk.dev/docs/agents/building-agents.md`)

Use these resources for current API details, examples, and usage patterns.

For common errors and troubleshooting, see [Common Errors Reference](references/common-errors.md).

For using Vercel AI Gateway, see [AI Gateway Reference](references/ai-gateway.md).

## Provider-Specific Information (ai@6.0.34+)

For questions about specific providers (OpenAI, Anthropic, Google, etc.), search their dedicated packages:

1. **Provider documentation**: `grep "your query" node_modules/@ai-sdk/<provider>/docs/`
2. **Provider source code**: `grep "your query" node_modules/@ai-sdk/<provider>/src/`

To find provider files:

- `glob "node_modules/@ai-sdk/<provider>/docs/**/*.mdx"` for provider documentation
- `glob "node_modules/@ai-sdk/<provider>/src/**/*.ts"` for provider source files

This is especially important for `providerOptions`, which are provider-specific settings passed to model calls. Each provider has unique options documented in their package.
