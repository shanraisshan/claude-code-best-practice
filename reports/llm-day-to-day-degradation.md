# LLM Day-to-Day Degradation: Myth vs Reality

Can a deployed LLM's performance change day-to-day even though the model weights are frozen? A deep-dive into proven causes, infrastructure bugs, and psychological factors.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<table width="100%">
<tr>
<td width="50%"><img src="assets/llm-degradation.png" alt="Twitter users reporting day-to-day Claude quality degradation" width="100%" /></td>
<td width="50%"><img src="assets/llm-degradation-2.png" alt="Twitter users reporting day-to-day Claude quality degradation" width="100%" /></td>
</tr>
</table>

---
---

# 🔥 Claude Code Ops 4.6 Analysis. High Reasoning

When Anthropic launches a model like Opus 4.6, the **model weights** — billions of learned parameters — are frozen. Training is enormously expensive (millions of dollars, weeks of compute). Nobody is retraining the model overnight.

But weights are only one layer of a much larger system. Research reveals at least **7 distinct mechanisms** that can cause real or perceived quality changes, even when model weights are frozen.

| Question | Answer |
|----------|--------|
| Do model weights change after launch? | **No** — confirmed by all providers |
| Can the model behave differently day-to-day? | **Yes** — proven with ±8-14% variance |
| Is it intentional "nerfing"? | **No** — no evidence of deliberate degradation |
| Are infrastructure bugs real? | **Yes** — Anthropic confirmed 3 bugs affecting up to 16% of requests |
| Is some of it psychological? | **Yes** — confirmation bias and honeymoon effects are real |
| Can system prompts/post-training change? | **Yes** — documented across providers |
| Should users trust their perception? | **Partially** — real causes exist, but perception amplifies them |

---

## The Full Inference Stack

The model weights are frozen, but **nine layers above them** can independently affect what you experience:

```
┌──────────────────────────────────────────────┐
│  YOUR SESSION CONTEXT                        │  ← Degrades within session
│  (accumulated errors, long conversations)    │
├──────────────────────────────────────────────┤
│  SYSTEM PROMPT                               │  ← Updated regularly
│  (safety rules, behavior instructions)       │
├──────────────────────────────────────────────┤
│  POST-TRAINING (RLHF / Fine-tuning)         │  ← Can be updated quietly
│  (instruction following, safety alignment)   │
├──────────────────────────────────────────────┤
│  SAMPLING PARAMETERS                         │  ← Can be tuned server-side
│  (temperature, top-p, top-k)                 │
├──────────────────────────────────────────────┤
│  SPECULATIVE DECODING                        │  ← Draft model quality varies
│  (draft model predictions + verification)    │
├──────────────────────────────────────────────┤
│  MoE ROUTING / BATCH COMPOSITION             │  ← ±8-14% variance proven
│  (which experts activate per request)        │
├──────────────────────────────────────────────┤
│  HARDWARE ROUTING                            │  ← TPU vs GPU vs Trainium
│  (which cluster serves your request)         │
├──────────────────────────────────────────────┤
│  QUANTIZATION LEVEL                          │  ← May vary under load
│  (FP16 vs INT8 vs INT4 precision)            │
├──────────────────────────────────────────────┤
│  COMPILER & RUNTIME                          │  ← XLA bugs proven real
│  (XLA:TPU, CUDA, hardware-specific code)     │
├──────────────────────────────────────────────┤
│  MODEL WEIGHTS (FROZEN)                      │  ← These DON'T change
│  (billions of learned parameters)            │
└──────────────────────────────────────────────┘
```

The key mental model: **frozen weights ≠ frozen behavior**. This is like saying "same engine = same driving experience" while ignoring the tires, road conditions, fuel quality, and driver fatigue.

---

## Proven Causes: Infrastructure Bugs

### Anthropic's September 2025 Postmortem

In September 2025, Anthropic published a detailed postmortem revealing **three separate infrastructure bugs** that degraded Claude's quality between August and September 2025. Their official statement:

> "We never reduce model quality due to demand, time of day, or server load. The problems our users reported were due to infrastructure bugs alone."

### Bug #1 — Context Window Routing Error

Sonnet 4 requests were accidentally routed to servers configured for 1M token context windows instead of standard servers.

- **Timeline**: Introduced August 5, worsened August 29 after a load balancing change
- **Peak impact**: 16% of Sonnet 4 requests affected at worst hour (August 31)
- **User impact**: ~30% of Claude Code users had at least one degraded message
- **Insidious detail**: Routing was "sticky" — once you hit a bad server, subsequent requests kept going there
- **Fixed**: September 4–18 (rolled out across platforms)

### Bug #2 — TPU Output Corruption

A misconfiguration on TPU servers caused errors during token generation, assigning high probability to tokens that should rarely appear.

- **Symptoms**: Thai or Chinese characters appearing mid-English response, obvious code syntax errors
- **Affected**: Opus 4.1 and Opus 4 (August 25–28), Sonnet 4 (August 25–September 2)
- **Scope**: Only Claude API; third-party platforms unaffected
- **Fixed**: Rolled back September 2

### Bug #3 — XLA:TPU Compiler Miscompilation (the nastiest)

A code change to fix precision issues accidentally exposed a **latent compiler bug** in Google's XLA:TPU.

- **Root cause**: The approximate top-k operation (used to pick the most likely next tokens) "sometimes returned completely wrong results, but only for certain batch sizes and model configurations"
- **Why it was hard to find**: It changed behavior depending on what operations ran before or after it, and whether debugging tools were enabled
- **Hidden for months**: A previous workaround from December 2024 had been accidentally masking this deeper bug
- **Affected**: Haiku 3.5 confirmed; subset of Sonnet 4 and Opus 3 suspected
- **Resolution**: Switched from approximate to exact top-k; accepted "minor efficiency impact" because "Model quality is non-negotiable"

### Why Detection Was Difficult

Anthropic's own automated evaluations didn't catch the degradation users reported, "in part because Claude often recovers well from isolated mistakes." Each bug produced different symptoms on different platforms at different rates, creating "a confusing mix of reports that didn't point to any single cause."

Key context: Claude runs on **three different hardware platforms** (AWS Trainium, NVIDIA GPUs, Google TPUs), each with different failure modes, compilers, and precision behaviors. Your request might hit different hardware on different days.

---

## Proven Causes: MoE Routing Variance

Modern large models often use a **Mixture-of-Experts (MoE)** architecture, where only a subset of the model's parameters ("experts") activate for each input. A learned router decides which experts to use.

Scale AI's research revealed a critical finding:

> "The combination of Sparse MoE and batched inference creates unpredictable results because the composition of a batch can determine which expert your query gets routed to, and the mix of queries from other users in the same batch is not deterministic."

### Measured Day-to-Day Variance Across Providers

| Provider | Day-to-Day Score Variance |
|----------|--------------------------|
| OpenAI (GPT-4 variants) | ±10–12% |
| Anthropic (Claude variants) | ±8–11% |
| Google (Gemini variants) | ±9–14% |

Concrete example: the same model scored **77% on jailbreak resistance one day and 63% the next**. Same model, same weights, same test — 14 percentage points of swing from infrastructure alone.

This means even with zero bugs and zero changes, the same model can produce noticeably different quality outputs on different days purely due to how requests are batched and routed. An A/B test cannot reliably detect a 5% quality signal when the day-to-day noise is 10–15%.

---

## Proven Causes: System Prompt & Post-Training Updates

### System Prompt Changes

The model weights don't change, but the **system prompt** wrapping those weights can be updated at any time. Analysis of Claude's system prompt evolution shows dozens of iterations, with "hot-fixes" — short instructions added to patch undesired behavior — being added and removed regularly.

Claude 3.7's system prompt contained multiple hot-fix instructions targeting common LLM "gotchas." Claude 4.0's system prompt removed all of them, with the behaviors addressed during post-training through reinforcement learning instead.

### The Post-Training Theory

The most plausible theory for unexplained quality shifts: companies can update **fine-tuning and RLHF** (reinforcement learning from human feedback) without changing the base model weights. This would technically make it truthful to say "the model hasn't changed" while still altering behavior through updated safety guardrails and instruction-following adjustments.

---

## Proven Causes: Silent Model Swaps

OpenAI has been documented multiple times silently changing which model users interact with:

- Removing the model picker overnight, forcing users from GPT-4o to GPT-5
- Making GPT-4o a hidden "legacy model" requiring a manual toggle in settings, with no in-app notification
- An "autoswitcher" bug routing users to wrong models
- Plus subscribers reported models switching to a "restricted version" without consent

Sam Altman acknowledged the rollout was "a little more bumpy than we hoped for." Reddit threads received thousands of upvotes calling the new model a "disaster" and a "downgrade."

This demonstrates that model swaps **do happen** in the industry — sometimes intentionally (product decisions) and sometimes accidentally (routing bugs).

---

## Contributing Factors

### Quantization Under Load

To serve millions of users cost-effectively, companies may serve **quantized** versions of models — reducing precision from FP16 to INT8 or INT4. This can reduce memory usage by 2–4x and accelerate inference, but introduces subtle quality loss. Whether providers dynamically switch quantization levels under load is debated, but the technical capability exists and is well-documented in serving frameworks like vLLM and TensorRT.

### Speculative Decoding

Modern serving stacks use a smaller "draft" model to predict multiple tokens ahead, then have the real model verify them. Theoretically this preserves the same output distribution, but in practice acceptance rates vary by domain and context. Out-of-the-box draft models may work fine in some cases but often struggle with domain-specific tasks or very long contexts.

### Context Window Pollution

In a long coding session, earlier mistakes accumulate in context. The model sees its own errors and may perpetuate them. This is the most common cause of "Claude got dumber" within a single session — it's not the model degrading, it's context contamination.

**Practical tip**: Use `/compact` or start fresh sessions when quality feels off. This is the single most actionable thing you can do.

---

## The Stanford Study — And Why It's Complicated

The landmark 2023 study by Stanford and UC Berkeley (Chen, Zaharia, Zou) — "How is ChatGPT's Behavior Changing Over Time?" — is frequently cited as proof that LLMs degrade. The headline finding:

> GPT-4's accuracy on "Is this number prime? Think step by step" fell from **97.6% to 2.4%** between March and June 2023.

### What the Study Proved

- The behavior of the "same" LLM service **can change substantially** in a short period
- Different capabilities can move in opposite directions (GPT-4 got worse at math, GPT-3.5 got better)
- Code generation quality dropped (GPT-4 executable code: 52% → 10%)
- The study coined the term **"LLM drift"**

### Methodological Critiques

- The March version used **temperature 0.0** while the June version used **temperature 1.0** — a fundamental confounding variable that increases randomness
- Only **500 queries per task** — too small for definitive statistical claims
- The "math questions" were actually yes/no questions where the model's guessing pattern changed, not its mathematical ability
- Changes likely reflected intentional **post-training safety updates**, not degradation

The study proved something important — LLM behavior changes over time — but the mechanism was likely intentional updates, not unintentional degradation.

---

## The Psychology

### Confirmation Bias

Once someone tweets "Claude is dumb today," you start noticing every mistake. On days when nobody complains, you brush off the same errors. Social media amplifies this effect.

### The Honeymoon Effect

Users experience an initial honeymoon period with new models, then gradually discover limitations. The model didn't change — expectations adjusted upward faster than capabilities warranted.

### Task Difficulty Variance

Your tasks vary day to day. A day of hard problems feels like the model got worse, even when it hasn't.

### The "Weekend Claude" Myth

Despite many users believing in day-of-week patterns, rigorous analysis found **no consistent evidence** for day-of-week quality patterns. One analysis titled "AI is Dumber on Mondays" came up empty.

### Stochastic Nature of LLMs

LLMs are probabilistic. The same prompt can produce different outputs each time. On a bad luck streak, you might get several poor responses in a row — pure randomness, not degradation.

---

## Bottom Line

The phenomenon users describe is **real but misattributed**:

- **Correct**: their experience degraded on certain days
- **Incorrect**: the model was intentionally "nerfed"

The actual causes are a combination of:

1. **Infrastructure bugs** — proven by Anthropic's postmortem (up to 16% of requests affected)
2. **MoE routing variance** — ±8-14% quality swing measured by Scale AI, even with zero changes
3. **System prompt and post-training updates** — documented across providers
4. **Hardware heterogeneity** — TPU vs GPU vs Trainium, each with different failure modes
5. **Context pollution** — long sessions degrade within-session quality
6. **Confirmation bias** — social media amplifies perceived patterns
7. **Stochastic variance** — same model, same prompt, different output every time

The measurement problem is severe: day-to-day variance of ±8-14% means you cannot distinguish a real 5% quality change from noise. This is why both the "it's all in your head" and "they nerfed it" camps feel confident — the signal-to-noise ratio makes it impossible to tell from individual experience alone.

---

## Sources

- [Anthropic: A Postmortem of Three Recent Issues](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues) — Official postmortem detailing three infrastructure bugs (September 2025)
- [Anthropic Reveals Three Infrastructure Bugs — InfoQ](https://www.infoq.com/news/2025/10/anthropic-infrastructure-bugs/) — Technical analysis of the postmortem
- [How is ChatGPT's Behavior Changing Over Time? — Stanford/UC Berkeley](https://arxiv.org/abs/2307.09009) — Landmark study on LLM drift (2023)
- [The Truth About ChatGPT's Degrading Capabilities — TechTalks](https://bdtechtalks.com/2023/07/24/chatgpt-capabilities-degrading-study/) — Methodological critique of the Stanford study
- [LLMs Are Getting Dumber and We Have No Idea Why — Ignorance.ai](https://www.ignorance.ai/p/llms-are-getting-dumber-and-we-have) — Five theories for perceived degradation
- [When Claude Forgets How to Code — Robert Matsuoka](https://hyperdev.matsuoka.com/p/when-claude-forgets-how-to-code) — Analysis of Claude quality fluctuations and infrastructure causes
- [Smoothing Out LLM Variance — Scale AI](https://scale.com/blog/smoothing-out-llm-variance) — Measured ±8-14% day-to-day variance across providers
- [What We Can Learn from Anthropic's System Prompt Updates — PromptLayer](https://blog.promptlayer.com/what-we-can-learn-from-anthropics-system-prompt-updates/) — System prompt evolution analysis
- [Claude's System Prompt Changes Reveal Anthropic's Priorities — Drew Breunig](https://www.dbreunig.com/2025/06/03/comparing-system-prompts-across-claude-versions.html) — Hot-fix patterns in system prompts
- [Complaints About Secretly Switching Models — OpenAI Forum](https://community.openai.com/t/complaints-about-secretly-switching-models/1360150) — Documented silent model swaps
- [Speculative Decoding — BentoML LLM Inference Handbook](https://bentoml.com/llm/inference-optimization/speculative-decoding) — How draft models affect serving
- [A Visual Guide to Mixture of Experts — Maarten Grootendorst](https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-mixture-of-experts) — MoE architecture and routing explained

---
---

# 🔥 Codex 5.3 High Reason and Finding

### Report Scope

This section explains why users can experience a short window where Claude output quality drops while Codex 5.3 feels stable or stronger on coding tasks. The focus is not on permanent model quality rankings. The focus is short-horizon production behavior under real serving conditions.

Report date: March 5, 2026.

### Observed Pattern

The reported pattern is:

1. Model quality is acceptable for a period.
2. Quality appears to degrade for several days.
3. Quality returns close to prior baseline.

This shape is usually a serving-stack or rollout pattern, not a permanent base-model capability change. Permanent capability decline would not normally recover this quickly without an explicit rollback or fix.

### High Reason: Why Codex 5.3 Can Look Better in a Bad Window

Codex 5.3 can appear clearly stronger during another provider's degraded period for several technical reasons that can all happen at the same time:

1. Product-objective fit. Codex 5.3 is optimized for code-generation and agentic coding workflows, so even equal raw model strength can yield better coding outcomes due to tool orchestration, repository reasoning, and code-centric instruction tuning.
2. Inference policy differences. Providers tune latency, reasoning depth, and decoding defaults independently. A more conservative policy at one provider can look "smarter" than an aggressive speed-optimized policy at another for the same day.
3. Serving-path separation. Even if two providers host state-of-the-art models, they run different routing layers, compiler/runtime stacks, and rollout pipelines. An incident in one stack does not imply correlated degradation in the other.
4. Rollout and rollback timing. If one provider is mid-rollout while another is stable, users can see large temporary quality divergence with no underlying long-term change in model weights.
5. Session-level contamination effects. In long coding chats, error accumulation can amplify perceived decline. A competing assistant can feel better simply because the failing session was reset or because its tool loop recovered faster.

### Detailed Finding

For a report like "Claude felt very weak for about four days, then came back," the most probable explanation is:

1. A provider-side incident, routing issue, decoding/runtime bug, or rollout regression affected a subset of requests.
2. The issue persisted long enough to be noticed repeatedly in real workflows.
3. The issue was fixed or rolled back.
4. Perceived quality returned quickly.

During that same period, Codex 5.3 could feel substantially better because it did not share the same incident path and because coding-task optimization magnified the gap in practical outcomes.

### Hypothesis Ranking for This Pattern

| Hypothesis | Likelihood | Rationale |
|------------|------------|-----------|
| Provider incident plus rollback | High | Best match for multi-day dip followed by fast recovery |
| Serving configuration change (sampling/latency/reasoning budget) | High | Common source of sudden behavior shifts without model retraining |
| Silent alias or snapshot movement | Medium-High | Can change behavior with no visible user action |
| Prompt drift and context contamination only | Medium | Can degrade sessions, but less likely to explain broad multi-day reports alone |
| Permanent base-model degradation | Low | Inconsistent with fast return to previous quality |

### What Would Confirm or Falsify This Finding

To turn this from high-confidence inference into hard proof, collect request-level telemetry for the same task set across days:

1. Exact model identifier and snapshot/alias at request time.
2. Any backend fingerprint or release marker exposed by the provider.
3. Decoding parameters (temperature, top_p, top_k, max tokens).
4. Latency, timeout, and error-rate traces.
5. Structured quality scores on a fixed coding benchmark prompt set.
6. Session length and token-context depth at failure points.

If quality drops correlate with an incident window, a config change, or a backend fingerprint shift, the incident/config hypothesis is confirmed. If no such shifts exist and degradation is only in long sessions, context contamination becomes the primary explanation.

### Practical Engineering Guidance

To reduce day-to-day variance in production:

1. Pin model snapshots when available instead of using floating aliases.
2. Store request metadata (model ID, parameters, latency, errors, response quality label).
3. Run a fixed daily canary suite for coding tasks and alert on regression.
4. Reset or compact long-running sessions after several failed turns.
5. Keep a fallback provider/model path for incident windows.
6. Separate "model quality" from "serving reliability" in internal dashboards.

### Final Conclusion

Codex 5.3 looking better during a short Claude degradation window is a technically plausible and expected outcome in modern LLM operations. The strongest explanation is not permanent model collapse. The strongest explanation is temporary serving-path degradation at one provider, combined with coding-specific optimization and stable operation at the other provider during the same period.
