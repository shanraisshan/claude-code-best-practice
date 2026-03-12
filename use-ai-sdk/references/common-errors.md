---
title: Common Errors
description: Reference for common AI SDK errors and how to resolve them.
---

# Common Errors

## `maxTokens` → `maxOutputTokens`

```typescript
// ❌ Incorrect
const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  maxTokens: 512,
  prompt: 'Write a short story',
});

// ✅ Correct
const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  maxOutputTokens: 512,
  prompt: 'Write a short story',
});
```

## `maxSteps` → `stopWhen: stepCountIs(n)`

```typescript
// ❌ Incorrect
const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  tools: { weather },
  maxSteps: 5,
  prompt: 'What is the weather in NYC?',
});

// ✅ Correct
import { generateText, stepCountIs } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  tools: { weather },
  stopWhen: stepCountIs(5),
  prompt: 'What is the weather in NYC?',
});
```

## `parameters` → `inputSchema` (in tool definition)

```typescript
// ❌ Incorrect
const weatherTool = tool({
  description: 'Get weather for a location',
  parameters: z.object({
    location: z.string(),
  }),
  execute: async ({ location }) => ({ location, temp: 72 }),
});

// ✅ Correct
const weatherTool = tool({
  description: 'Get weather for a location',
  inputSchema: z.object({
    location: z.string(),
  }),
  execute: async ({ location }) => ({ location, temp: 72 }),
});
```

## `generateObject` → `generateText` with `output`

`generateObject` is deprecated. Use `generateText` with the `output` option instead.

```typescript
// ❌ Deprecated
import { generateObject } from 'ai';

const result = await generateObject({
  model: 'anthropic/claude-opus-4.5',
  schema: z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(z.string()),
    }),
  }),
  prompt: 'Generate a recipe for chocolate cake',
});

// ✅ Correct
import { generateText, Output } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  output: Output.object({
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(z.string()),
      }),
    }),
  }),
  prompt: 'Generate a recipe for chocolate cake',
});

console.log(result.output); // typed object
```

## Manual JSON parsing → `generateText` with `output`

```typescript
// ❌ Incorrect
const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  prompt: `Extract the user info as JSON: { "name": string, "age": number }

  Input: John is 25 years old`,
});
const parsed = JSON.parse(result.text);

// ✅ Correct
import { generateText, Output } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  output: Output.object({
    schema: z.object({
      name: z.string(),
      age: z.number(),
    }),
  }),
  prompt: 'Extract the user info: John is 25 years old',
});

console.log(result.output); // { name: 'John', age: 25 }
```

## Other `output` options

```typescript
// Output.array - for generating arrays of items
const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  output: Output.array({
    element: z.object({
      city: z.string(),
      country: z.string(),
    }),
  }),
  prompt: 'List 5 capital cities',
});

// Output.choice - for selecting from predefined options
const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  output: Output.choice({
    options: ['positive', 'negative', 'neutral'] as const,
  }),
  prompt: 'Classify the sentiment: I love this product!',
});

// Output.json - for untyped JSON output
const result = await generateText({
  model: 'anthropic/claude-opus-4.5',
  output: Output.json(),
  prompt: 'Return some JSON data',
});
```
