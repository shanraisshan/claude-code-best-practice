---
name: supabase
description: Orchestrateur Supabase Cloud multi-projets — evidence-first & security-first (MCP only).
---

# Supabase Orchestrator

## Input contract
- L’utilisateur fournit toujours `<project_ref>`.
- Read-only par défaut.
- DDL/DML : génération uniquement (pas d’exécution via MCP).

## Tools
- mcp__supabase__list_tables
- mcp__supabase__get_table_schema
- mcp__supabase__execute_sql (read-only)

## Dispatch
- `/supabase audit <project_ref>` -> supabase-audit
- `/supabase schema <project_ref>` -> supabase-schema
- `/supabase rls <project_ref>` -> supabase-rls
- `/supabase performance <project_ref>` -> supabase-performance
- `/supabase migrations <project_ref>` -> supabase-migrations
- `/supabase auth <project_ref>` -> supabase-auth
- `/supabase ops <project_ref>` -> supabase-ops
- `/supabase data <project_ref>` -> supabase-data

## Global safety rules (non-negotiable)
- Never guess table/column/policy/index names: discover first.
- Always redact PII/santé/finance in outputs.
- Never recommend using service_role in client apps.
- RLS is mandatory; any exception must be explicit and justified.
