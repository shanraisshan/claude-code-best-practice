# CLAUDE.md — Site/App Backend

## Project Overview
Backend API repository. Claude Code is configured with skills for API design, database patterns, and Python/Node.js best practices.

## Tech Stack
<!-- Customize for your project -->
- Language: Python 3.12+ / Node.js 20+
- Framework: FastAPI / Express / Django
- Database: PostgreSQL / MongoDB
- Queue: Redis / RabbitMQ
- Testing: pytest / Jest

## Conventions
- API routes in `src/routes/` or `app/api/`
- Use type hints (Python) or TypeScript (Node.js)
- All endpoints must have input validation
- Run tests before pushing: `pytest` or `npm test`

## Commands
- `python -m pytest` — Run tests
- `python -m mypy .` — Type check
- `ruff check .` — Lint
- `docker compose up` — Start local services

## Skills Available (~9)
- **fix** — Lint/format fixes before commits
- **github** — PR/issue management via `gh` CLI
- **create-pr** — Formatted PR creation
- **backend-patterns** — API design, DB optimization, server-side best practices
- **stripe-integration** — Checkout, subscriptions, webhooks, customer portal, metered billing
- **python-code-style** — Linting, formatting, naming conventions
- **python-type-safety** — Type hints, generics, protocols, mypy config
- **python-error-handling** — Validation, exception hierarchies, partial failures
- **python-background-jobs** — Task queues, workers, event-driven patterns

## Additional Skills (add if needed)
- **python-project-structure** — Module architecture, `__all__`, directory layout
- **python-resource-management** — Context managers, cleanup, streaming
- **workflow-orchestration-patterns** — Temporal workflows for distributed systems
- **rag-implementation** — RAG systems with vector DBs (if AI features)
- **docstring** — PyTorch-style docstrings (if ML project)

## Guidelines
- Keep this file under 80 lines for your actual project
- Pick 5-8 skills max from the lists above
- Remove Python skills if using Node.js (replace with relevant ones)
