---
name: supabase-schema
description: Cartographie DB + inventaire données sensibles (PII/santé/finance) — MCP only.
---

# Supabase Schema

## Mandatory steps
1) `list_tables`
2) `get_table_schema` pour chaque table pertinente (au minimum: tables exposées + tables contenant PII)

## Deliverables
- Inventaire des tables (par domaine)
- Liste des colonnes sensibles (catégorisées)
- Relations/contraintes “observées” (sans suppositions)
- Recommandations de minimisation (views, select lists, policies)

## Notes
- Ne jamais demander `SELECT *` sur tables sensibles ; préférer schema + agrégats.
