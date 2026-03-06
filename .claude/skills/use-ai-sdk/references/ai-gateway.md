---
title: Vercel AI Gateway
description: Reference for using Vercel AI Gateway with the AI SDK.
---

# Vercel AI Gateway

The Vercel AI Gateway is the fastest way to get started with the AI SDK. It provides access to models from OpenAI, Anthropic, Google, and other providers through a single API.

## Authentication

Authenticate with OIDC (for Vercel deployments) or an [AI Gateway API key](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys&title=AI+Gateway+API+Keys):

```env filename=".env.local"
AI_GATEWAY_API_KEY=your_api_key_here
```

## Usage

The AI Gateway is the default global provider, so you can access models using a simple string:

```ts
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-4.5',
  prompt: 'What is love?',
});
```

You can also explicitly import and use the gateway provider:

```ts
// Option 1: Import from 'ai' package (included by default)
import { gateway } from 'ai';
model: gateway('anthropic/claude-sonnet-4.5');

// Option 2: Install and import from '@ai-sdk/gateway' package
import { gateway } from '@ai-sdk/gateway';
model: gateway('anthropic/claude-sonnet-4.5');
```
