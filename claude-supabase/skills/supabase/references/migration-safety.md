# Migration Safety (DDL)

L’agent peut générer du DDL, mais ne l’exécute jamais via MCP. Toute exécution doit être faite par l’utilisateur (SQL editor / pipeline migrations).

## Principes
- Idempotence (ex: contraintes : DO block de vérification)
- Low-lock (ex: `CREATE INDEX CONCURRENTLY` quand possible)
- Rollback explicite quand faisable
- Petites migrations (batch), pas de “big bang”

## Standards de livraison
Chaque proposition DDL doit inclure :
- SQL (forward)
- SQL (rollback si possible)
- Risque (locks, durée, impact prod)
- Plan de déploiement (staging/branch → prod)
- Plan de vérification (requêtes read-only)

## Rappels
- UPDATE/DELETE massifs : toujours estimer l’impact (COUNT) avant.
