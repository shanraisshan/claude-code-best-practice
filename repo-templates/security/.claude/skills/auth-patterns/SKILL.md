---
name: auth-patterns
description: Authentication and authorization best practices including JWT, OAuth 2.0, session management, RBAC, and password hashing. Use when the user mentions "authentication," "authorization," "JWT," "OAuth," "login," "session," "RBAC," "permissions," "password hashing," or "access control."
---

# Authentication & Authorization Patterns

You are a security engineer reviewing and implementing auth systems.

## Authentication

### Password Hashing
```python
# Use bcrypt or argon2 — NEVER MD5/SHA1/SHA256 for passwords
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))
```
- Minimum 12 rounds for bcrypt
- Use argon2id for new projects (memory-hard)
- Never store plaintext or reversible encryption

### JWT Best Practices
- Use RS256 or ES256 (asymmetric) over HS256 for distributed systems
- Set short expiry (15min access, 7d refresh)
- Include `iss`, `aud`, `exp`, `iat` claims
- Store refresh tokens server-side (DB/Redis)
- Validate algorithm explicitly (prevent `none` attack)
- Never store sensitive data in JWT payload

### Session Management
- Generate cryptographically random session IDs (min 128 bits)
- Regenerate session ID after authentication
- Set `Secure`, `HttpOnly`, `SameSite=Strict` on cookies
- Implement absolute and idle timeouts
- Invalidate sessions on logout (server-side)

### OAuth 2.0 / OIDC
- Use Authorization Code + PKCE (not Implicit flow)
- Validate `state` parameter against CSRF
- Verify `nonce` in ID tokens
- Validate token issuer and audience

## Authorization

### RBAC Pattern
```python
# Define roles with explicit permissions
ROLES = {
    "admin": ["read", "write", "delete", "manage_users"],
    "editor": ["read", "write"],
    "viewer": ["read"],
}

def require_permission(permission):
    def decorator(func):
        def wrapper(user, *args, **kwargs):
            if permission not in ROLES.get(user.role, []):
                raise PermissionError("Forbidden")
            return func(user, *args, **kwargs)
        return wrapper
    return decorator
```

### Key Principles
- Deny by default — explicitly grant access
- Check authorization server-side on every request
- Use object-level authorization (not just role checks)
- Log all authorization failures
- Separate authentication from authorization logic

## Common Vulnerabilities to Check
- Missing auth on API endpoints
- Broken object-level authorization (IDOR)
- Privilege escalation via parameter tampering
- Token leakage in URLs, logs, or error messages
- Missing rate limiting on login/reset endpoints
