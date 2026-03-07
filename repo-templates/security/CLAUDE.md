# CLAUDE.md — Security

## Project Overview
Security-focused repository for code audits, vulnerability assessment, dependency scanning, and secure development practices. Claude Code is configured with security-specific skills.

## What This Repo Covers
- OWASP Top 10 code review
- Dependency vulnerability scanning
- Security headers and CSP configuration
- Authentication and authorization patterns
- Infrastructure security hardening
- Penetration testing checklists (authorized contexts only)

## Conventions
- Audit reports go in `audits/`
- Security policies in `policies/`
- Hardening scripts in `scripts/`
- Scan results in `scans/`

## Commands
- `npm audit` / `pip audit` — Dependency scan
- `trivy fs .` — Filesystem vulnerability scan
- `semgrep --config auto .` — Static analysis

## Skills Available (~6)
- **owasp-review** — OWASP Top 10 code review (injection, XSS, CSRF, etc.)
- **dependency-scanning** — Audit dependencies for known CVEs
- **security-headers** — HTTP headers, CSP, CORS, HSTS configuration
- **auth-patterns** — Authentication/authorization best practices (JWT, OAuth, RBAC)
- **infrastructure-hardening** — Docker, K8s, cloud security baselines
- **security-audit-report** — Generate structured security audit reports

## Workflow
1. Start with `owasp-review` for code-level vulnerabilities
2. Run `dependency-scanning` for supply chain risks
3. Check `security-headers` for HTTP security
4. Review `auth-patterns` for auth/authz issues
5. Assess `infrastructure-hardening` for deployment security
6. Generate report with `security-audit-report`

## Guidelines
- All security testing must be in authorized contexts (pentesting, CTF, research)
- Never bypass security checks or disable protections
- Prioritize fixes by severity: Critical > High > Medium > Low
- Keep this file under 80 lines for your actual project
