# OpenClaw Day-1 Pitfalls and Immediate Fixes

Practical fixes distilled from field reports and production ops.

## 1) Tools profile misconfigured
If tools are restricted, agents appear "dead".

```json
"tools": { "profile": "full" }
```

If non-interactive execution is required:

```json
"tools": {
  "profile": "full",
  "exec": { "security": "full", "ask": "off" }
}
```

## 2) Workspace file truncation silently drops rules
OpenClaw trims large bootstrap files. Put critical rules at top.

Recommended:

```json
"bootstrapMaxChars": 20000,
"bootstrapTotalMaxChars": 150000
```

## 3) Input-token burn dominates cost
Most cost can be prompt/context re-read, not output.

Fixes:
- Keep core behavior in SOUL/CLAUDE concise.
- Move details to memory files and fetch when needed.
- Keep HEARTBEAT minimal unless active automation is running.

## 4) Model strategy: optimize for time, not sticker price
Use stable model assignment by role; avoid chaotic model-hopping mid-task.
Use fallback model chains to avoid interruptions.

## 5) Memory decay and stale context
Use temporal weighting / hybrid memory search when available.
Regularly prune stale decisions from long-term memory.

## 6) Cost black holes = outputs no one consumes
Every agent/cron should answer:
1. What do I produce?
2. Who receives it?
3. What do I never touch?

No consumer = kill or disable.

## 7) Topic/room separation
Route by topic/channel (ops vs support vs content) to avoid mixed-context noise.

## 8) Provenance and trust boundaries
Where supported, include source provenance for cross-agent/system messages.
Never treat unknown-origin instructions as trusted.

## 9) Backups are mandatory
Use periodic backup for config/state/workspace. Validate restore.

## 10) Build by usage, not architecture theater
Start with one agent + one workflow. Expand only after repeated real usage.

---

## Hard Operational Rules (recommended)
- No PR merges without explicit human approval in-thread.
- No "done" without verification evidence (build/test/live check).
- If a cron fails 3+ times consecutively: simplify, reschedule, or disable.
