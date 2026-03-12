# MCP Integration — Supabase

Objectif : permettre à Claude Code de lire ton schéma et d’exécuter des requêtes **read-only** sur un projet Supabase.

## Outils attendus

- `mcp__supabase__list_tables`
- `mcp__supabase__get_table_schema`
- `mcp__supabase__execute_sql` (read-only)

## Conventions d’usage

- Toute session commence par `list_tables`.
- L’agent doit appeler `get_table_schema` sur les tables qu’il interroge.
- `execute_sql` ne sert qu’à des SELECT / EXPLAIN (pas de DDL/DML).
- Les sorties doivent redacter PII/santé/finance.
