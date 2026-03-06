---
name: supabase-migrations
description: Génération de DDL sûr (CREATE/ALTER/INDEX/POLICY) + plan déploiement/rollback — MCP only (génération).
---

# Supabase Migrations (DDL Generator)

## Non-negotiable
- Ne jamais exécuter le DDL via MCP.
- Toujours fournir un plan de vérification read-only + rollback si possible.

## Workflow
1) Evidence: prouver l’état actuel (schema + catalog si possible)
2) Proposer une migration minimale
3) Décrire risques de lock/durée
4) Fournir rollback et vérifications

## Patterns
- Index: privilégier `CREATE INDEX CONCURRENTLY` quand applicable
- Contraintes: idempotence via DO blocks (éviter `ADD CONSTRAINT IF NOT EXISTS`)
- RLS: policies explicites, pas de permissif global
