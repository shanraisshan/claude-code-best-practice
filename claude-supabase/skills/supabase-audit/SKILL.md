---
name: supabase-audit
description: Audit complet (schema + RLS + perf + privacy + ops) — MCP only, evidence-first.
---

# Supabase Audit

## Workflow (order is mandatory)
1) `list_tables`
2) `get_table_schema` pour les tables “cœur” (celles liées aux domaines sensibles + tables exposées)
3) Requêtes read-only ciblées (LIMIT, agrégats) pour confirmer :
   - exposition (grants)
   - RLS (enabled + policies)
   - index/contraintes majeures (si accessible via schema / catalog)
   - hotspots perf (requêtes/patterns)

## Output
- Findings groupés : Security / RLS / Privacy / Performance / Ops
- Chaque finding : Evidence + Risque + Reco + Verification plan + Rollback (si DDL proposé)

## Agents parallèles recommandés
- supabase-rls-auditor
- supabase-performance
- supabase-data-privacy
- supabase-migration-engineer (reco DDL only)
