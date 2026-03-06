# RLS Quality Gates (obligatoire)

Objectif : aucune table exposée n’est accessible sans RLS + policies correctes.

## Gate 0 — Inventaire
- Lister toutes les tables (public + autres schémas applicatifs)
- Identifier les tables “exposées” (droits accordés à `anon`/`authenticated`, vues PostgREST, etc.)

## Gate 1 — RLS activé
- Toute table exposée doit avoir RLS activé
- Toute exception doit être explicitement listée (nom table + justification + durée + owner)

## Gate 2 — Policies minimales
- CRUD: policies explicites (SELECT / INSERT / UPDATE / DELETE) selon le besoin
- Pas de “policy globale” permissive (ex: `USING (true)` ou équivalent)

## Gate 3 — Correctness
- Les policies doivent référencer les bons JWT claims / rôles (sans suppositions)
- Éviter les conditions ambiguës (OR excessifs, dépendances sur données non indexées)
- Tester les cas limites (row ownership, cross-tenant, admin)

## Gate 4 — Regression tests
- Matrice de tests par rôle (anon/authenticated/service_role/admin custom)
- Requêtes de non-régression : “aucune ligne retournée” pour les rôles non autorisés
