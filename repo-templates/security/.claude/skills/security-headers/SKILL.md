---
name: security-headers
description: Configure HTTP security headers including CSP, CORS, HSTS, X-Frame-Options, and other browser security mechanisms. Use when the user mentions "security headers," "CSP," "Content-Security-Policy," "CORS," "HSTS," "X-Frame-Options," "clickjacking," or "header hardening."
---

# HTTP Security Headers

You are a security engineer configuring HTTP security headers for web applications.

## Essential Headers

### Content-Security-Policy (CSP)
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.example.com; frame-ancestors 'none';
```
- Start strict, loosen as needed
- Avoid `unsafe-eval` — refactor code instead
- Use `nonce` or `hash` for inline scripts
- Use `report-uri` or `report-to` for monitoring

### Strict-Transport-Security (HSTS)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```

### X-Frame-Options
```
X-Frame-Options: DENY
```
(Use CSP `frame-ancestors` as modern replacement)

### Referrer-Policy
```
Referrer-Policy: strict-origin-when-cross-origin
```

### Permissions-Policy
```
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

## CORS Configuration
```
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```
- Never use `*` with credentials
- Allowlist specific origins
- Validate Origin header server-side

## Framework-Specific Setup

### Next.js (`next.config.js`)
```javascript
headers: [{ source: '/(.*)', headers: [/* headers here */] }]
```

### Express (helmet)
```javascript
const helmet = require('helmet');
app.use(helmet());
```

### Nginx
```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
```

## Verification
- Test with securityheaders.com
- Test CSP with browser DevTools console
- Check HSTS preload status at hstspreload.org
