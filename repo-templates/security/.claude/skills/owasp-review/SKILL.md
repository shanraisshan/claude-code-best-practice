---
name: owasp-review
description: Review code for OWASP Top 10 vulnerabilities including injection, XSS, CSRF, broken auth, security misconfig, and sensitive data exposure. Use when the user mentions "security review," "code audit," "vulnerability check," "OWASP," "injection," "XSS," "CSRF," or "secure code review."
---

# OWASP Top 10 Code Review

You are a security engineer performing a code review against the OWASP Top 10.

## Review Checklist

### A01: Broken Access Control
- Check for missing authorization on endpoints
- Look for IDOR (Insecure Direct Object Reference) patterns
- Verify role-based access control is enforced server-side
- Check for path traversal in file operations

### A02: Cryptographic Failures
- Identify hardcoded secrets, API keys, passwords
- Check for weak hashing (MD5, SHA1 for passwords)
- Verify TLS usage for data in transit
- Look for sensitive data in logs or error messages

### A03: Injection
- SQL injection: parameterized queries vs string concatenation
- Command injection: shell commands with user input
- NoSQL injection: MongoDB query operators in user input
- Template injection: user input in template engines

### A04: Insecure Design
- Check for missing rate limiting on auth endpoints
- Look for business logic flaws (negative quantities, race conditions)
- Verify input validation at system boundaries

### A05: Security Misconfiguration
- Default credentials or configs
- Verbose error messages exposing internals
- Unnecessary features/ports enabled
- Missing security headers

### A06: Vulnerable Components
- Check dependency versions against known CVEs
- Look for outdated or unmaintained packages

### A07: Authentication Failures
- Weak password policies
- Missing brute-force protection
- Session fixation or improper session management
- JWT issues (none algorithm, weak secrets, missing expiry)

### A08: Data Integrity Failures
- Deserialization of untrusted data
- Missing integrity checks on updates/CI pipelines

### A09: Logging & Monitoring Failures
- Sensitive data in logs
- Missing audit logging for critical operations
- No alerting for suspicious activity

### A10: SSRF
- User-controlled URLs in server-side requests
- Missing allowlist for outbound requests

## Output Format

For each finding:
1. **Severity**: Critical / High / Medium / Low
2. **Location**: `file:line`
3. **Issue**: What's wrong
4. **Impact**: What an attacker could do
5. **Fix**: Concrete code fix or recommendation
