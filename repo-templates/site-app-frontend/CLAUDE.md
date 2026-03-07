# CLAUDE.md — Site/App Frontend

## Project Overview
Frontend application repository. Claude Code is configured with a focused set of skills for UI development, testing, and deployment.

## Tech Stack
<!-- Customize for your project -->
- Framework: React / Next.js / Angular / Vue
- Styling: Tailwind CSS / CSS Modules
- Testing: Vitest / Jest / Playwright
- Package manager: npm / pnpm / yarn

## Conventions
- Components in `src/components/`, pages in `src/pages/` or `src/app/`
- Use TypeScript strict mode
- Run `npm run lint` before committing
- Run `npm run test` before pushing

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Lint + format check
- `npm run test` — Run test suite

## Skills Available (~6)
These skills are loaded automatically when relevant:
- **fix** — Lint/format fixes before commits
- **github** — PR/issue management via `gh` CLI
- **create-pr** — Formatted PR creation
- **agent-browser** — Browser automation for E2E testing
- **angular-migration** — AngularJS to Angular migration (remove if not applicable)
- **site-architecture** — Page hierarchy, navigation, URL structure

## Guidelines
- Keep this file under 80 lines for your actual project
- Remove skills you don't use (fewer = better performance)
- Add project-specific conventions above
