---
name: supabase-rls
description: Audit RLS obligatoire + policies + matrice de tests (exceptions explicites) — MCP only.
---

# Supabase RLS

## Mandatory discovery
1) list_tables
2) get_table_schema des tables exposées / sensibles

## Read-only SQL checks (examples)
(À adapter aux noms réels et schémas réels)

- Tables avec RLS activé (via catalog):
  - inspecter `pg_class.relrowsecurity` par schéma applicatif
- Policies:
  - `pg_policies` pour lister `USING` / `WITH CHECK`

## Quality gates
Voir `skills/supabase/references/rls-quality-gates.md`.

## Output
- Tableau: table → RLS enabled? → policies? → roles impactés
- Liste d’exceptions (si existantes) + justification + plan de suppression
