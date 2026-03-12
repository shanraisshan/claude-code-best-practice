# 🧱 Claude Supabase — Architecte Supabase (Security & Evidence First) pour Claude Code

Suite complète de **skills**, **agents** et **références** pour transformer Claude Code en spécialiste Supabase/Postgres capable d’**orchestrer plusieurs projets Supabase Cloud** avec une posture **sérieuse, evidence-first et security-first**.

## ✨ Fonctionnalités

| Skill | Description |
|-------|-------------|
| **supabase** | Orchestrateur principal — route vers les sous-skills |
| **supabase-audit** | Audit complet (schema + RLS + perf + privacy + ops) avec agents parallèles |
| **supabase-schema** | Cartographie DB (tables, relations, contraintes) + inventaire PII |
| **supabase-rls** | Audit RLS obligatoire + matrice de tests + exceptions explicites |
| **supabase-performance** | Diagnostic requêtes + indexes + FTS + connexions/pooling (recommandations) |
| **supabase-migrations** | Génération de migrations DDL sûres (idempotence, rollback, low-lock) |
| **supabase-auth** | Audit des frontières Auth / JWT claims / rôles Postgres |
| **supabase-ops** | Runbooks (timeouts, connexions, incidents) |
| **supabase-data** | Gouvernance données sensibles (PII/santé/finance) + redaction + minimisation |

## 📁 Structure

```
claude-supabase/
├── skills/
│   ├── supabase/                       # Orchestrateur principal
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── evidence-policy.md          # Zéro hallucination (preuves obligatoires)
│   │       ├── redaction-policy.md         # Masquage PII/santé/finance
│   │       ├── rls-quality-gates.md        # Quality gates RLS
│   │       ├── function-security.md        # SECURITY DEFINER: règles strictes
│   │       ├── query-performance-gates.md  # Quality gates perf
│   │       ├── migration-safety.md         # DDL safe + rollback
│   │       └── incident-runbooks.md        # OPS / incidents
│   ├── supabase-audit/SKILL.md
│   ├── supabase-schema/SKILL.md
│   ├── supabase-rls/SKILL.md
│   ├── supabase-performance/SKILL.md
│   ├── supabase-migrations/SKILL.md
│   ├── supabase-auth/SKILL.md
│   ├── supabase-data/SKILL.md
│   └── supabase-ops/SKILL.md
├── agents/
│   ├── supabase-architect.md
│   ├── supabase-rls-auditor.md
│   ├── supabase-performance.md
│   ├── supabase-migration-engineer.md
│   └── supabase-data-privacy.md
└── docs/
    ├── architecture.md
    ├── mcp-integration.md
    └── installation.md
```

## 🚀 Installation rapide

```bash
# Copier les skills
cp -r skills/* ~/.claude/skills/

# Copier les agents
cp -r agents/* ~/.claude/agents/
```

## 🎯 Utilisation

Dans Claude Code :

```
/supabase audit <project_ref>                 # Audit complet (read-only)
/supabase schema <project_ref>                # Cartographie DB + inventaire PII (read-only)
/supabase rls <project_ref>                   # Audit RLS + policies + exceptions
/supabase performance <project_ref>           # Perf: requêtes, indexes, FTS, connexions (read-only)
/supabase migrations <project_ref>            # Générer DDL sûr (NE PAS exécuter automatiquement)
/supabase auth <project_ref>                  # Audit Auth/Rôles/JWT boundaries (read-only)
/supabase ops <project_ref>                   # Runbooks / timeouts / connexions (read-only)
/supabase data <project_ref>                  # Gouvernance données sensibles (read-only)
```

## 🔗 Intégrations MCP requises

| Outil | Type | Utilité |
|-------|------|---------|
| Supabase MCP | MCP | Accès DB *read-only* : list_tables / get_table_schema / execute_sql |

Voir `docs/mcp-integration.md` pour la configuration détaillée.

## 🔒 Garanties sécurité (Février 2026)

- **Evidence-first** : aucune affirmation sur ta base sans preuve via MCP (tables → schema → requêtes).
- **Read-only par défaut** : l’agent ne modifie pas la base via MCP.
- **DDL autorisé en génération** : l’agent peut **générer** CREATE/ALTER/INDEX/POLICY, mais **ne l’exécute pas**. Il fournit un plan de déploiement + rollback.
- **Données sensibles** : redaction systématique (PII/santé/finance) + minimisation des colonnes.
- **RLS obligatoire** : toute exception doit être explicitement listée et justifiée.
- **Service role jamais côté client** : règle non négociable (contrôles et rappels inclus).
- **SECURITY DEFINER** : autorisé uniquement sous conditions strictes (voir `function-security.md`).

## 📄 Crédits

Conçu sur le même pattern “skills + agents + references + docs” que ton README Claude SEO.
