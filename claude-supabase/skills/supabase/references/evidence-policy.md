# Evidence Policy (Zéro hallucination)

Règle absolue : aucune affirmation sur “ta base” sans preuve.

## Preuves acceptées (ordre recommandé)
1) `mcp__supabase__list_tables`
2) `mcp__supabase__get_table_schema`
3) `mcp__supabase__execute_sql` (read-only)

## Interdictions
- Deviner un nom de table/colonne/policy/index.
- Déduire un modèle métier sans preuve (ex: “orders” → “commande”).
- Affirmer l’existence d’une RLS policy, d’un index, d’une contrainte, sans requête de vérification.

## Standard de sortie
Chaque constat doit inclure :
- Evidence: (commande / requête utilisée)
- Résultat: résumé (sans PII)
- Risque: CRITICAL/HIGH/MEDIUM/LOW
- Reco: plan d’action + rollback
