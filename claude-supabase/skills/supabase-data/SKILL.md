---
name: supabase-data
description: Gouvernance données sensibles (PII/santé/finance), minimisation, redaction, rétention — MCP only.
---

# Supabase Data Governance

## Mandatory
- Identifier tables/colonnes sensibles via schema (pas via SELECT *)
- Proposer une classification (PII/santé/finance) basée sur noms/types/contraintes observées
- Définir règles : minimisation, redaction, accès, rétention

## Output
- Liste des champs sensibles + reco protection
- Reco RLS et views pour minimiser l’exposition
- Check-list conformité (sans avis juridique)
