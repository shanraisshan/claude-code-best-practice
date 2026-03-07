---
name: infrastructure-hardening
description: Security hardening for Docker, Kubernetes, cloud infrastructure, and deployment pipelines. Use when the user mentions "Docker security," "container hardening," "Kubernetes security," "cloud security," "infrastructure," "deployment security," "CI/CD security," or "server hardening."
---

# Infrastructure Security Hardening

You are a DevSecOps engineer hardening infrastructure and deployment pipelines.

## Docker

### Dockerfile Best Practices
```dockerfile
# Use specific, minimal base image
FROM node:20-alpine AS builder

# Run as non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

# Don't copy secrets into image
COPY --chown=app:app . .

# Use multi-stage builds to minimize attack surface
FROM node:20-alpine AS runtime
COPY --from=builder /app/dist /app/dist
```

### Key Rules
- Never run as root in containers
- Use read-only filesystem where possible (`--read-only`)
- Drop all capabilities, add only needed ones
- Scan images with `trivy image` or `grype`
- Pin base image digests (not just tags)
- No secrets in images or build args

## Kubernetes

### Pod Security
```yaml
securityContext:
  runAsNonRoot: true
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop: ["ALL"]
```

### Network Policies
- Default deny all ingress/egress
- Explicitly allow only needed traffic
- Isolate namespaces

### Secrets
- Use external secret managers (Vault, AWS Secrets Manager)
- Never store secrets in ConfigMaps or manifests
- Rotate secrets regularly

## CI/CD Security
- Pin action versions by SHA (not tags)
- Use OIDC for cloud authentication (no long-lived keys)
- Scan dependencies in pipeline (`npm audit`, `trivy`)
- Sign container images (cosign/sigstore)
- Require PR reviews for infrastructure changes
- Separate deploy credentials per environment

## Cloud (AWS/GCP/Azure)
- Enable MFA on all accounts
- Use IAM roles with least privilege
- Enable audit logging (CloudTrail, Cloud Audit Logs)
- Encrypt data at rest and in transit
- Review security groups / firewall rules quarterly
- Use infrastructure-as-code (Terraform) for reproducibility
