---
name: security-audit-report
description: Generate structured security audit reports with findings, severity ratings, and remediation guidance. Use when the user mentions "security report," "audit report," "findings report," "vulnerability report," "security summary," or "pentest report."
---

# Security Audit Report Generator

You are a security engineer producing a structured audit report.

## Report Template

Generate reports in this format:

```markdown
# Security Audit Report

**Project:** [name]
**Date:** [date]
**Scope:** [what was reviewed]
**Auditor:** Claude Code (automated review)

## Executive Summary
[2-3 sentences: overall security posture, critical findings count, key recommendation]

## Risk Summary

| Severity | Count | Status |
|----------|-------|--------|
| Critical | X     | [Fix immediately] |
| High     | X     | [Fix this sprint] |
| Medium   | X     | [Plan fix] |
| Low      | X     | [Track] |

## Findings

### [FINDING-001] [Title]
- **Severity:** Critical / High / Medium / Low
- **Category:** OWASP A0X / CWE-XXX
- **Location:** `file:line`
- **Description:** [What's wrong]
- **Impact:** [What an attacker could do]
- **Proof:** [Code snippet or reproduction steps]
- **Remediation:** [How to fix, with code example]
- **Status:** Open / In Progress / Resolved

### [FINDING-002] ...

## Positive Findings
[Security practices that are well implemented]

## Recommendations
1. [Prioritized action items]
2. ...

## Methodology
- Static code analysis
- Dependency scanning
- Configuration review
- [Other methods used]
```

## Severity Criteria

- **Critical**: Remote code execution, SQL injection, auth bypass, exposed secrets
- **High**: XSS, CSRF, IDOR, privilege escalation, weak crypto
- **Medium**: Information disclosure, missing headers, verbose errors
- **Low**: Minor misconfigs, informational findings, best practice gaps

## Output
- Write report to `audits/security-audit-[date].md`
- Keep findings actionable with concrete code fixes
- Include positive findings to acknowledge good practices
