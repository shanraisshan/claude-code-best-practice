# Incident Runbooks (Supabase/Postgres)

Objectif : fournir des checklists “calmes” et reproductibles.

## Symptôme: trop de connexions
- Vérifier `pg_stat_activity` (count par state)
- Rechercher `idle in transaction`
- Recommander pooling + timeouts

## Symptôme: requêtes lentes
- Capturer requête + paramètres (redacted)
- EXPLAIN pour identifier seq scan, joins coûteux, manque d’index
- Corriger (index, rewrite, pagination)

## Symptôme: fuite de données
- Stopper l’exposition (revue grants/policies)
- Auditer RLS: tables exposées sans RLS
- Ajouter tests de non-régression

## Symptôme: erreurs auth / RLS
- Vérifier claims utilisés par les policies
- Vérifier rôles (anon/authenticated) et grants
