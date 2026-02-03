# Claude Agent SDK vs Claude CLI: System Prompts and Output Consistency

![SDK vs CLI System Prompts Diagram](/!/sdk-vs-cli-diagram.svg)

---

## Executive Summary

When sending the same message (e.g., "What is the capital of Norway?") through the **Claude Agent SDK** versus the **Claude CLI (Claude Code)**, the system prompts accompanying these messages are fundamentally different. The CLI uses a **modular system prompt architecture** (~269 base tokens with additional context conditionally loaded based on features), while the SDK uses a minimal prompt by default. **There is no guarantee of identical output between the two**, even with matching configurations, due to the absence of a seed parameter and inherent non-determinism in Claude's architecture.

---

## 1. System Prompt Comparison

### Claude CLI (Claude Code)

The Claude CLI uses a **modular system prompt architecture** with a ~269-token base prompt, with additional context conditionally loaded:

| Component | Description | Loading |
|-----------|-------------|---------|
| **Base System Prompt** | Core instructions and behavior | Always (~269 tokens) |
| **Tool Instructions** | 18+ builtin tools (Write, Read, Edit, Bash, TodoWrite, etc.) | Always |
| **Coding Guidelines** | Code style, formatting rules, security practices | Always |
| **Safety Rules** | Refusal rules, injection defense, harm prevention | Always |
| **Response Style** | Tone, verbosity, explanation depth, emoji usage | Always |
| **Environment Context** | Working directory, git status, platform info | Always |
| **Project Context** | CLAUDE.md content, settings, hooks configuration | Conditional |
| **Subagent Prompts** | Plan mode, Explore agent, Task agent | Conditional |
| **Security Review** | Extended security instructions (~2,610 tokens) | Conditional |

**Key Characteristics:**
- **Modular architecture** with 110+ system prompt strings loaded conditionally
- Base prompt is modest (~269 tokens), total varies by features activated
- Includes extensive security and injection defense layers
- Automatically loads CLAUDE.md files in the working directory
- Session-persistent context in interactive mode

### Claude Agent SDK

The Agent SDK uses a **minimal system prompt by default** containing:

| Component | Description | Token Impact |
|-----------|-------------|--------------|
| **Essential Tool Instructions** | Only tools explicitly provided | Minimal |
| **Basic Safety** | Minimal safety instructions | Minimal |

**Key Characteristics:**
- No coding guidelines or style preferences by default
- No project context unless explicitly configured
- No extensive tool descriptions
- Requires explicit configuration to match CLI behavior

---

## 2. What Each Interface Sends

### Example: "What is the capital of Norway?"

#### Via Claude CLI

```
System Prompt: [modular, ~269+ base tokens]
├── Base system prompt (~269 tokens)
├── Tool instructions (Write, Read, Edit, Bash, Grep, Glob, etc.)
├── Git safety protocols
├── Code reference guidelines
├── Professional objectivity instructions
├── Security and injection defense rules
├── Environment context (OS, directory, date)
├── CLAUDE.md content (if present) [conditional]
├── MCP tool descriptions (if configured) [conditional]
├── Plan/Explore mode prompts [conditional]
└── Session/conversation context

User Message: "What is the capital of Norway?"
```

#### Via Claude Agent SDK (Default)

```
System Prompt: [minimal]
├── Essential tool instructions (if any tools provided)
└── Basic operational context

User Message: "What is the capital of Norway?"
```

#### Via Agent SDK (with `claude_code` preset)

```typescript
const response = await query({
  prompt: "What is the capital of Norway?",
  options: {
    systemPrompt: {
      type: "preset",
      preset: "claude_code"
    }
  }
});
```

```
System Prompt: [modular, matches CLI]
├── Full Claude Code system prompt
├── Tool instructions
├── Coding guidelines
└── Safety rules

// NOTE: Still does NOT include CLAUDE.md unless settingSources is configured
```

---

## 3. Customization Methods

### Claude CLI Customization

| Method | Command | Effect |
|--------|---------|--------|
| **Append to prompt** | `claude -p "..." --append-system-prompt "..."` | Adds instructions while preserving defaults |
| **Replace prompt** | `claude -p "..." --system-prompt "..."` | Completely replaces the system prompt |
| **Project context** | CLAUDE.md file | Automatically loaded, persistent |
| **Output styles** | `/output-style [name]` | Apply predefined response styles |

### Agent SDK Customization

| Method | Configuration | Effect |
|--------|---------------|--------|
| **Custom prompt** | `systemPrompt: "..."` | Replaces default entirely (loses tools) |
| **Preset with append** | `systemPrompt: { type: "preset", preset: "claude_code", append: "..." }` | Preserves CLI functionality + custom instructions |
| **CLAUDE.md loading** | `settingSources: ["project"]` | Loads project-level instructions |
| **Output styles** | `settingSources: ["user"]` or `settingSources: ["project"]` | Loads saved output styles |

### Configuration Comparison Table

| Feature | CLI Default | SDK Default | SDK with Preset |
|---------|-------------|-------------|-----------------|
| Tool instructions | ✅ Full | ❌ Minimal | ✅ Full |
| Coding guidelines | ✅ Yes | ❌ No | ✅ Yes |
| Safety rules | ✅ Yes | ❌ Basic | ✅ Yes |
| CLAUDE.md auto-load | ✅ Yes | ❌ No | ❌ No* |
| Project context | ✅ Automatic | ❌ No | ❌ No* |

*Requires explicit `settingSources: ["project"]` configuration

---

## 4. Output Consistency Guarantees

### Critical Finding: NO Determinism Guaranteed

**The Claude Messages API does not provide a seed parameter for reproducibility.** This is a fundamental architectural limitation.

### Factors Preventing Identical Output

| Factor | Description | Controllable? |
|--------|-------------|---------------|
| **Different system prompts** | CLI vs SDK have different defaults | ✅ Yes (with configuration) |
| **Floating-point arithmetic** | Parallel hardware quirks | ❌ No |
| **MoE routing** | Mixture-of-Experts architecture variations | ❌ No |
| **Batching/scheduling** | Cloud infrastructure differences | ❌ No |
| **Numeric precision** | Inference engine variations | ❌ No |
| **Model snapshots** | Version updates/changes | ❌ No |

### Temperature and Sampling

Even with `temperature=0.0` (greedy decoding):
- Full determinism is **NOT guaranteed**
- Minor variations can still occur due to infrastructure factors
- Known bug: [Claude CLI produces non-deterministic output for identical inputs](https://github.com/anthropics/claude-code/issues/3370)

---

## 5. Achieving Maximum Consistency

To get the **closest possible** identical outputs between SDK and CLI:

### Agent SDK Configuration

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Option 1: Use claude_code preset
const response = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  // Match CLI system prompt as closely as possible
  system: "Your exact system prompt matching CLI",
  messages: [
    { role: "user", content: "What is the capital of Norway?" }
  ],
  // Use greedy decoding for maximum consistency
  temperature: 0
});

// Option 2: With Agent SDK query function
import { query } from "@anthropic-ai/agent-sdk";

for await (const message of query({
  prompt: "What is the capital of Norway?",
  options: {
    systemPrompt: {
      type: "preset",
      preset: "claude_code"
    },
    temperature: 0,
    model: "claude-sonnet-4-20250514",
    // Load project context like CLI does
    settingSources: ["project"]
  }
})) {
  // Process response
}
```

### CLI Configuration

```bash
# Match the SDK configuration as closely as possible
claude -p "What is the capital of Norway?" \
  --model claude-sonnet-4-20250514 \
  --temperature 0
```

### Still Not Guaranteed

Even with perfectly matching configurations:
- Output may differ between runs
- Output may differ between SDK and CLI
- No seed parameter exists to force reproducibility

---

## 6. Practical Implications

### When to Use Each Interface

| Use Case | Recommended Interface | Reason |
|----------|----------------------|--------|
| Interactive development | Claude CLI | Full tool suite, project context |
| Programmatic integration | Agent SDK | Fine-grained control, embedding |
| Consistent API responses | Agent SDK + custom prompt | More control over system prompt |
| Batch processing | Agent SDK | Better for automation pipelines |
| One-off tasks | Claude CLI | Faster setup, immediate context |

### Design Recommendations

1. **Don't rely on bit-perfect reproducibility**
   - Build applications robust to minor output variations
   - Use structured outputs and validation

2. **For production pipelines requiring consistency:**
   - Cache results when possible
   - Use structured outputs with JSON schema validation
   - Combine with deterministic logic and validation
   - Consider multiple generations with consensus

3. **For matching CLI behavior in SDK:**
   ```typescript
   systemPrompt: {
     type: "preset",
     preset: "claude_code",
     append: "Your additional instructions"
   },
   settingSources: ["project", "user"]
   ```

---

## 7. System Prompt Token Impact

| Configuration | Architecture | Notes |
|---------------|-------------|-------|
| SDK (minimal) | Minimal default | Only essential tool instructions |
| SDK (claude_code preset) | Modular (~269+ base) | Matches CLI, varies by features |
| CLI (default) | Modular (~269+ base) | Additional context loaded conditionally |
| CLI (with MCP tools) | Modular + MCP | MCP tool descriptions add significant tokens |

**Note:** Claude Code uses a modular architecture with 110+ system prompt strings. The base prompt is ~269 tokens, with individual components ranging from 18 to 2,610 tokens depending on features activated.

**Implication:** The SDK's minimal default gives you more context for your actual task, but at the cost of Claude Code's full capabilities.

---

## 8. Summary Table

| Aspect | Claude CLI | Agent SDK (Default) | Agent SDK (Preset) |
|--------|------------|--------------------|--------------------|
| **System prompt** | Modular (~269+ base) | Minimal | Modular (matches CLI) |
| **Tools included** | 18+ builtin | Only if provided | 18+ builtin |
| **CLAUDE.md auto-load** | Yes | No | No (needs config) |
| **Coding guidelines** | Yes | No | Yes |
| **Safety rules** | Full | Basic | Full |
| **Temperature control** | Yes | Yes | Yes |
| **Determinism guarantee** | No | No | No |
| **Identical outputs?** | N/A | No (vs CLI) | Closer, but no |

---

## 9. Conclusion

**Q: What system prompts accompany the same message in SDK vs CLI?**

The CLI uses a **modular system prompt architecture** with a ~269-token base prompt and 110+ conditionally-loaded components (tool instructions, coding guidelines, safety rules, project context). The SDK uses a **minimal default** with only essential tool instructions, though it can be configured to match CLI behavior using the `claude_code` preset.

**Q: Is there a guarantee of identical output?**

**No.** Even with matching system prompts, identical inputs, and `temperature=0`, there is no guarantee of identical outputs due to:
- Absence of a seed parameter in Claude's API
- Floating-point arithmetic variations
- Infrastructure-level non-determinism
- Model architecture (Mixture-of-Experts) routing variations

**Recommendation:** Design systems to be robust to output variations rather than relying on deterministic behavior. For consistency-critical applications, use structured outputs, caching, and validation layers.

---

## Sources

- [Modifying System Prompts - Agent SDK](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/sdk#modifying-system-prompts)
- [Claude Code CLI Reference](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/cli)
- [Claude Code Headless Mode](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/headless)
- [Claude Code Best Practices - Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Messages API Reference](https://docs.anthropic.com/en/api/messages)
- [GitHub Issue #3370: Non-deterministic output](https://github.com/anthropics/claude-code/issues/3370)
- [Claude Code System Prompts Repository](https://github.com/Piebald-AI/claude-code-system-prompts) - Analysis of modular prompt architecture
- [Why Deterministic Output from LLMs is Nearly Impossible](https://unstract.com/blog/understanding-why-deterministic-output-from-llms-is-nearly-impossible/)

---

*This report was generated by Claude Code using the Opus 4.5 model on February 3, 2026.*
