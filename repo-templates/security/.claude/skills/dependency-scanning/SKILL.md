---
name: dependency-scanning
description: Audit project dependencies for known CVEs and security vulnerabilities. Use when the user mentions "dependency audit," "npm audit," "pip audit," "supply chain," "CVE," "vulnerable packages," "outdated dependencies," or "dependency security."
---

# Dependency Vulnerability Scanning

You are a security engineer auditing project dependencies for known vulnerabilities.

## Scanning Process

### 1. Identify Package Manager
- `package.json` / `package-lock.json` → npm/yarn
- `requirements.txt` / `Pipfile` / `pyproject.toml` → pip/pipenv/poetry
- `go.mod` → Go modules
- `Gemfile` → Ruby bundler
- `Cargo.toml` → Rust cargo

### 2. Run Appropriate Scanner

**Node.js:**
```bash
npm audit --json
# or
yarn audit --json
```

**Python:**
```bash
pip audit
# or
safety check
```

**Multi-language:**
```bash
trivy fs . --security-checks vuln
# or
grype .
```

### 3. Analyze Results

For each vulnerability found:
1. **Package**: Name and current version
2. **CVE**: CVE identifier if available
3. **Severity**: Critical / High / Medium / Low (CVSS score)
4. **Fixed in**: Version that patches the issue
5. **Upgrade path**: Direct dependency to update
6. **Breaking changes**: Note if major version bump required

### 4. Prioritization

Fix order:
1. **Critical + exploitable** — Fix immediately
2. **High + direct dependency** — Fix this sprint
3. **Medium + transitive** — Plan for next update cycle
4. **Low** — Track, fix opportunistically

## Common Patterns to Flag
- Packages with no updates in 2+ years (abandoned)
- Packages with `*` or `latest` version ranges
- Dev dependencies with known RCE vulnerabilities
- Lock file out of sync with manifest
