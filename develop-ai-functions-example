---
name: develop-ai-functions-example
description: Develop examples for AI SDK functions. Use when creating, running, or modifying examples under examples/ai-functions/src to validate provider support, demonstrate features, or create test fixtures.
metadata:
  internal: true
---

## AI Functions Examples

The `examples/ai-functions/` directory contains scripts for validating, testing, and iterating on AI SDK functions across providers.

## Example Categories

Examples are organized by AI SDK function in `examples/ai-functions/src/`:

| Directory          | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `generate-text/`   | Non-streaming text generation with `generateText()`  |
| `stream-text/`     | Streaming text generation with `streamText()`        |
| `generate-object/` | Structured output generation with `generateObject()` |
| `stream-object/`   | Streaming structured output with `streamObject()`    |
| `agent/`           | `ToolLoopAgent` examples for agentic workflows       |
| `embed/`           | Single embedding generation with `embed()`           |
| `embed-many/`      | Batch embedding generation with `embedMany()`        |
| `generate-image/`  | Image generation with `generateImage()`              |
| `generate-speech/` | Text-to-speech with `generateSpeech()`               |
| `transcribe/`      | Audio transcription with `transcribe()`              |
| `rerank/`          | Document reranking with `rerank()`                   |
| `middleware/`      | Custom middleware implementations                    |
| `registry/`        | Provider registry setup and usage                    |
| `telemetry/`       | OpenTelemetry integration                            |
| `complex/`         | Multi-component examples (agents, routers)           |
| `lib/`             | Shared utilities (not examples)                      |
| `tools/`           | Reusable tool definitions                            |

## File Naming Convention

Examples follow the pattern: `{provider}-{feature}.ts`

| Pattern                                  | Example                                    | Description                |
| ---------------------------------------- | ------------------------------------------ | -------------------------- |
| `{provider}.ts`                          | `openai.ts`                                | Basic provider usage       |
| `{provider}-{feature}.ts`                | `openai-tool-call.ts`                      | Specific feature           |
| `{provider}-{sub-provider}.ts`           | `amazon-bedrock-anthropic.ts`              | Provider with sub-provider |
| `{provider}-{sub-provider}-{feature}.ts` | `google-vertex-anthropic-cache-control.ts` | Sub-provider with feature  |

## Example Structure

All examples use the `run()` wrapper from `lib/run.ts` which:

- Loads environment variables from `.env`
- Provides error handling with detailed API error logging

### Basic Template

```typescript
import { providerName } from '@ai-sdk/provider-name';
import { generateText } from 'ai';
import { run } from '../lib/run';

run(async () => {
  const result = await generateText({
    model: providerName('model-id'),
    prompt: 'Your prompt here.',
  });

  console.log(result.text);
  console.log('Token usage:', result.usage);
  console.log('Finish reason:', result.finishReason);
});
```

### Streaming Template

```typescript
import { providerName } from '@ai-sdk/provider-name';
import { streamText } from 'ai';
import { printFullStream } from '../lib/print-full-stream';
import { run } from '../lib/run';

run(async () => {
  const result = streamText({
    model: providerName('model-id'),
    prompt: 'Your prompt here.',
  });

  await printFullStream({ result });
});
```

### Tool Calling Template

```typescript
import { providerName } from '@ai-sdk/provider-name';
import { generateText, tool } from 'ai';
import { z } from 'zod';
import { run } from '../lib/run';

run(async () => {
  const result = await generateText({
    model: providerName('model-id'),
    tools: {
      myTool: tool({
        description: 'Tool description',
        inputSchema: z.object({
          param: z.string().describe('Parameter description'),
        }),
        execute: async ({ param }) => {
          return { result: `Processed: ${param}` };
        },
      }),
    },
    prompt: 'Use the tool to...',
  });

  console.log(JSON.stringify(result, null, 2));
});
```

### Structured Output Template

```typescript
import { providerName } from '@ai-sdk/provider-name';
import { generateObject } from 'ai';
import { z } from 'zod';
import { run } from '../lib/run';

run(async () => {
  const result = await generateObject({
    model: providerName('model-id'),
    schema: z.object({
      name: z.string(),
      items: z.array(z.string()),
    }),
    prompt: 'Generate a...',
  });

  console.log(JSON.stringify(result.object, null, 2));
  console.log('Token usage:', result.usage);
});
```

## Running Examples

From the `examples/ai-functions` directory:

```bash
pnpm tsx src/generate-text/openai.ts
pnpm tsx src/stream-text/openai-tool-call.ts
pnpm tsx src/agent/openai-generate.ts
```

## When to Write Examples

Write examples when:

1. **Adding a new provider**: Create basic examples for each supported API (`generateText`, `streamText`, `generateObject`, etc.)

2. **Implementing a new feature**: Demonstrate the feature with at least one provider example

3. **Reproducing a bug**: Create an example that shows the issue for debugging

4. **Adding provider-specific options**: Show how to use `providerOptions` for provider-specific settings

5. **Creating test fixtures**: Use examples to generate API response fixtures (see `capture-api-response-test-fixture` skill)

## Utility Helpers

The `lib/` directory contains shared utilities:

| File                   | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `run.ts`               | Error-handling wrapper with `.env` loading               |
| `print.ts`             | Clean object printing (removes undefined values)         |
| `print-full-stream.ts` | Colored streaming output for tool calls, reasoning, text |
| `save-raw-chunks.ts`   | Save streaming chunks for test fixtures                  |
| `present-image.ts`     | Display images in terminal                               |
| `save-audio.ts`        | Save audio files to disk                                 |

### Using print utilities

```typescript
import { print } from '../lib/print';

// Pretty print objects without undefined values
print('Result:', result);
print('Usage:', result.usage, { depth: 2 });
```

### Using printFullStream

```typescript
import { printFullStream } from '../lib/print-full-stream';

const result = streamText({ ... });
await printFullStream({ result }); // Colored output for text, tool calls, reasoning
```

## Reusable Tools

The `tools/` directory contains reusable tool definitions:

```typescript
import { weatherTool } from '../tools/weather-tool';

const result = await generateText({
  model: openai('gpt-4o'),
  tools: { weather: weatherTool },
  prompt: 'What is the weather in San Francisco?',
});
```

## Best Practices

1. **Keep examples focused**: Each example should demonstrate one feature or use case

2. **Use descriptive prompts**: Make it clear what the example is testing

3. **Handle errors gracefully**: The `run()` wrapper handles this automatically

4. **Use realistic model IDs**: Use actual model IDs that work with the provider

5. **Add comments for complex logic**: Explain non-obvious code patterns

6. **Reuse tools when appropriate**: Use `weatherTool` or create new reusable tools in `tools/`
