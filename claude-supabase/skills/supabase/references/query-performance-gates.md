# Query Performance Gates (Postgres / Supabase)

## Gate 0 — Mesure
- Identifier les requêtes lentes et les patterns (N+1, full scan, LIKE '%...%')
- Utiliser EXPLAIN (read-only) pour confirmer (jamais au feeling)

## Gate 1 — Indexing
- Index sur colonnes filtrées (WHERE) et de jointure (JOIN)
- Index composites si filtres multi-colonnes (égalité d’abord, range ensuite)
- Index covering (INCLUDE) si index-only scan pertinent

## Gate 2 — Full-Text Search
- Interdire `LIKE '%term%'` sur gros volumes
- Recommander `tsvector` + index GIN + ranking si recherche texte

## Gate 3 — Connexions
- Pooling obligatoire côté app (éviter 1 connexion par requête)
- Timeouts pour éviter `idle in transaction`

## Gate 4 — Sécurité/perf
- RLS peut impacter la perf : indexer les colonnes utilisées dans les policies
