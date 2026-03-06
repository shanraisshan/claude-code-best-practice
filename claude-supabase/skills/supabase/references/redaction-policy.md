# Redaction Policy (PII / Santé / Finance)

Par défaut, toute sortie doit **minimiser** les colonnes et **redacter** les valeurs sensibles.

## Données à redacter systématiquement
- Emails, téléphones, adresses, noms, identifiants personnels (PII)
- Tokens, secrets, API keys, JWTs
- Données santé, diagnostics, traitements, numéros de dossier
- Données financières : IBAN, CB, transactions, revenus

## Pattern de requêtes (read-only)
- Toujours sélectionner *seulement* les colonnes nécessaires
- Ajouter `LIMIT` (ex: 100) sauf demande explicite
- Préférer des agrégats (COUNT, MIN/MAX, histogrammes) plutôt que des lignes brutes

## Masquage recommandé (côté présentation)
- Email: `a***@domaine.tld`
- Téléphone: `***-***-1234`
- IDs: conserver 6 derniers caractères si utile
