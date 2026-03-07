# Repo Templates — Claude Code Skills par Domaine

Ce dossier contient **5 templates de repos** avec des configurations Claude Code optimisees par domaine.
Chaque template inclut un `CLAUDE.md` et les skills pertinentes dans `.claude/skills/`.

## Pourquoi separer ?

Un seul repo avec 60+ skills degrade les performances de Claude Code :
- **Dilution d'attention** : trop de contexte = moins de precision
- **Consommation de tokens** : chaque skill est injectee dans le contexte
- **Regle d'or** : 5-8 skills max par projet pour des resultats optimaux

## Templates Disponibles

### 1. `site-app-frontend/` — Developpement Frontend (6 skills)
Pour les repos d'applications web cote client.

| Skill | Description |
|-------|------------|
| `fix` | Lint/format avant commits |
| `github` | Gestion PR/issues via `gh` |
| `create-pr` | Creation de PR formatees |
| `agent-browser` | Automatisation navigateur (E2E) |
| `angular-migration` | Migration AngularJS → Angular |
| `site-architecture` | Hierarchie pages, navigation, URLs |

### 2. `site-app-backend/` — Developpement Backend (8 skills)
Pour les repos d'APIs et services backend (Python focus).

| Skill | Description |
|-------|------------|
| `fix` | Lint/format avant commits |
| `github` | Gestion PR/issues via `gh` |
| `create-pr` | Creation de PR formatees |
| `backend-patterns` | API design, DB optimization, patterns serveur |
| `python-code-style` | Linting, formatting, conventions |
| `python-type-safety` | Type hints, generics, mypy |
| `python-error-handling` | Validation, exceptions, erreurs partielles |
| `python-background-jobs` | Task queues, workers, event-driven |

**Extras disponibles** : `python-project-structure`, `python-resource-management`, `workflow-orchestration-patterns`, `rag-implementation`, `docstring`

### 3. `seo/` — SEO (7 skills)
Pour l'optimisation search, audits techniques, et contenu SEO.

| Skill | Description |
|-------|------------|
| `seo-audit` | Audit technique, crawl, Core Web Vitals |
| `schema-markup` | JSON-LD, structured data, rich snippets |
| `ai-seo` | Optimisation pour les moteurs IA (AEO/GEO) |
| `programmatic-seo` | Pages a grande echelle via templates |
| `content-strategy` | Planification contenu, mots-cles |
| `analytics-tracking` | GA4, conversion tracking, UTM |
| `competitor-alternatives` | Pages de comparaison et "vs" |

### 4. `security/` — Securite (6 skills, toutes nouvelles)
Pour les audits de securite, hardening, et bonnes pratiques.

| Skill | Description |
|-------|------------|
| `owasp-review` | Revue code OWASP Top 10 |
| `dependency-scanning` | Audit CVE des dependances |
| `security-headers` | CSP, CORS, HSTS, headers HTTP |
| `auth-patterns` | JWT, OAuth, sessions, RBAC |
| `infrastructure-hardening` | Docker, K8s, CI/CD, cloud security |
| `security-audit-report` | Generation de rapports d'audit structures |

### 5. `marketing-seo/` — Marketing & SEO (10 skills)
Pour le marketing digital complet : copy, CRO, SEO, campagnes.

| Skill | Description |
|-------|------------|
| `seo-audit` | Audit technique SEO |
| `content-strategy` | Planification contenu et mots-cles |
| `schema-markup` | Structured data JSON-LD |
| `copywriting` | Copy de pages (homepage, landing, pricing) |
| `copy-editing` | Revision et amelioration de copy existant |
| `social-content` | Contenu LinkedIn, Twitter/X, Instagram |
| `page-cro` | Optimisation conversion de pages |
| `signup-flow-cro` | Optimisation inscription/activation |
| `email-sequence` | Drip campaigns, emails lifecycle |
| `launch-strategy` | Lancement produit, annonces, GTM |

**Extras disponibles** : `paid-ads`, `ad-creative`, `ab-test-setup`, `marketing-psychology`, `cold-email`, `pricing-strategy`, `referral-program`, `churn-prevention`

## Comment Utiliser

### Copier un template dans votre projet
```bash
# Copier le CLAUDE.md
cp repo-templates/site-app-backend/CLAUDE.md /votre/projet/CLAUDE.md

# Copier les skills
cp -r repo-templates/site-app-backend/.claude/skills/ /votre/projet/.claude/skills/

# Personnaliser le CLAUDE.md pour votre projet
```

### Combiner des templates
Si votre projet couvre plusieurs domaines, **ne copiez pas tout**.
Choisissez 2-3 skills de chaque domaine pertinent (max 8-10 total).

### Retirer une skill
Supprimez simplement le dossier dans `.claude/skills/` :
```bash
rm -rf .claude/skills/angular-migration  # Si pas de projet Angular
```

## Skill Mapping Complet

Toutes les 63 skills de ce repo, classees par domaine :

| Domaine | Skills |
|---------|--------|
| **Dev Workflow** | `fix`, `github`, `create-pr`, `update-docs`, `coding-agent` |
| **Frontend** | `agent-browser`, `angular-migration`, `site-architecture` |
| **Backend** | `backend-patterns`, `workflow-orchestration-patterns` |
| **Python** | `python-code-style`, `python-type-safety`, `python-project-structure`, `python-error-handling`, `python-background-jobs`, `python-resource-management`, `docstring` |
| **AI/ML** | `use-ai-sdk`, `rag-implementation`, `develop-ai-functions-example`, `claude-api` |
| **SEO** | `seo-audit`, `schema-markup`, `ai-seo`, `programmatic-seo`, `content-strategy`, `competitor-alternatives` |
| **Analytics** | `analytics-tracking` |
| **CRO** | `page-cro`, `form-cro`, `signup-flow-cro`, `popup-cro`, `onboarding-cro`, `paywall-upgrade-cro`, `ab-test-setup` |
| **Copy** | `copywriting`, `copy-editing`, `marketing-psychology` |
| **Marketing** | `marketing-ideas`, `marketing-tools`, `product-marketing-context`, `social-content`, `cold-email`, `email-sequence` |
| **Growth** | `launch-strategy`, `gtm-planning`, `free-tool-strategy`, `referral-program`, `churn-prevention`, `pricing-strategy`, `revops`, `sales-enablement` |
| **Ads** | `paid-ads`, `ad-creative` |
| **Securite** | `owasp-review`, `dependency-scanning`, `security-headers`, `auth-patterns`, `infrastructure-hardening`, `security-audit-report` |
| **Finance** | `startup-financial-modeling`, `creating-financial-models` |
| **Specialise** | `add-malli-schemas`, `implementing-jsc-classes-zig`, `implementing-jsc-classes-cpp`, `gog` |
| **Meteo (demo)** | `weather-fetcher`, `weather-svg-creator` |
