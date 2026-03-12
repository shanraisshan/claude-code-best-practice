---
name: verify
description: Verify a claimed completion with objective evidence before marking done
user-invocable: true
---

# Verify Skill

Use this skill to validate completion claims.

## PASS criteria (at least one with evidence)
- build/test command output
- live endpoint check
- runtime smoke test
- diff review with risk callouts

## FAIL behavior
If verification fails, return:
- exact blocker
- likely root cause
- next fix step
