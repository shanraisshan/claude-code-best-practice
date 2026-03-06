---
name: supabase-auth
description: Audit frontières Auth (anon/authenticated/service_role), JWT claims, grants, RLS alignment — MCP only.
---

# Supabase Auth

## Checks (read-only)
- Inventaire des rôles utilisés par policies (sans suppositions)
- Vérifier grants sur tables exposées (anon/authenticated)
- Alignement policies ↔ claims JWT (sub, role, tenant_id si présent)

## Non-negotiable
- Service role jamais côté client.
- Toute élévation de privilèges doit passer par backend contrôlé + audit.
