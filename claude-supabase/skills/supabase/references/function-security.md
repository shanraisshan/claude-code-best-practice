# SQL Functions Security Policy (SECURITY DEFINER)

SECURITY DEFINER est autorisé, mais strictement encadré.

## Autorisé seulement si
1) Raison documentée : besoin réel (ex: logique atomique, contrôle d’accès, perf)
2) **Owner dédié** (principe du moindre privilège), pas un superuser “par défaut”
3) `search_path` contrôlé :
   - soit via `ALTER FUNCTION ... SET search_path = ...`
   - soit via `SET search_path` dans le corps de la fonction
4) Validation d’entrées stricte (types, nullability, whitelists)
5) Aucune exfiltration PII inattendue (minimisation)
6) Logging/observabilité (au minimum via événements applicatifs)

## Interdictions
- SECURITY DEFINER + SQL dynamique non contrôlé
- Fonctions qui contournent RLS sans justification explicite
- Exposer la fonction à des rôles non prévus (grants trop larges)

## Check-list de revue
- Qui peut EXECUTE la fonction ? (grants)
- La fonction accède à quelles tables ?
- Quel `search_path` ?
- Peut-elle retourner des données sensibles ?
