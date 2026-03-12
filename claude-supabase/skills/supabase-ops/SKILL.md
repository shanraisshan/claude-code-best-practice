---
name: supabase-ops
description: Runbooks ops (connexions, timeouts, incidents) — MCP only (read-only).
---

# Supabase Ops

## What to pull (read-only)
- Connexions actives / states (pg_stat_activity)
- Sessions idle in transaction
- Verrouillages (pg_locks) si besoin
- Erreurs récurrentes (si visibles côté SQL)

## Output
- Actions immédiates (mitigation)
- Actions correctives (pooling, timeouts, indexes)
- Prévention (alerting, playbooks)
