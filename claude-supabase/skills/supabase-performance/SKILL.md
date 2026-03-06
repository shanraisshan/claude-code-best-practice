---
name: supabase-performance
description: Diagnostic performance (requêtes, indexes, FTS, connexions) — MCP only, read-only.
---

# Supabase Performance

## Mandatory steps
1) list_tables
2) get_table_schema pour tables impliquées
3) execute_sql avec SELECT/EXPLAIN uniquement

## What to look for
- Seq scans sur gros volumes
- LIKE '%...%' (préférer FTS tsvector)
- N+1 queries (pattern applicatif)
- Mauvais indexes / index composites manquants
- RLS qui force des scans (colonnes non indexées dans policies)

## Output
- Hypothèses interdites : toute reco doit citer la preuve (EXPLAIN / stats)
- Si DDL conseillé (INDEX): générer la migration (voir supabase-migrations) + plan de vérif
