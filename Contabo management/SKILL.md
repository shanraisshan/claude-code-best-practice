---
name: admin-infra-contabo
description: |
  Deploys infrastructure on Contabo using Cloud VPS and Object Storage.
  Focuses on cost‑effective provisioning and Contabo-specific CLI/API quirks.

  Use when: provisioning Contabo Cloud VPS, configuring Object Storage, or troubleshooting Contabo-specific issues.

  Keywords: contabo, cntb, VPS, cloud compute, budget hosting, best value, object storage, infrastructure
license: MIT
source: plugin
---

# Contabo Infrastructure

## CRITICAL MUST: Secrets and .env

- NEVER store live `.env` files or credentials inside any skill folder.
- `.env.template` files belong only in `templates/` within a skill.
- Store live secrets in `~/.admin/.env` (or another non-skill location you control) and reference them from there.


**Status**: Production Ready | **Dependencies**: cntb CLI, SSH key pair

---

## Navigation

- Operations, troubleshooting, config, and cost snapshot: `references/OPERATIONS.md`

---

## Step 0: Gather Required Information (MANDATORY)

**STOP. Before ANY deployment commands, collect ALL parameters from the user.**

Copy this checklist and confirm each item:

```
Required Parameters:
- [ ] SERVER_NAME        - Unique name for this server
- [ ] CONTABO_REGION     - Region (EU, US-central, US-east, US-west, SIN, JPN, AUS)
- [ ] CONTABO_PRODUCT_ID - Product/plan ID (see profiles below)
- [ ] SSH_KEY_PATH       - Path to SSH private key (default: ~/.ssh/id_rsa)

Deployment Purpose (determines recommended profile):
- [ ] Purpose: coolify / kasm / both / custom
      coolify → V39 (Cloud VPS 10 SP, €5/mo)
      kasm    → V45 (Cloud VPS 20 SP, €8/mo)
      both    → V46 (Cloud VPS 30, €14/mo)
      custom  → Ask for specific product ID
```

**Recommended profiles by purpose:**

| Purpose | Product ID | Plan | vCPU | RAM | Monthly |
|---------|-----------|------|------|-----|---------|
| coolify | V39 | Cloud VPS 10 SP | 4 | 8GB | €5 |
| kasm | V45 | Cloud VPS 20 SP | 6 | 18GB | €8 |
| both | V46 | Cloud VPS 30 | 8 | 24GB | €14 |

**DO NOT proceed to Prerequisites until ALL parameters are confirmed.**

---

## Prerequisites

Before using this skill, verify the following:

### 1. Contabo CLI Installed

```bash
cntb --version
```

**If missing**, install with:

```bash
# Download from GitHub releases
# Linux
curl -sL https://github.com/contabo/cntb/releases/latest/download/cntb_linux_amd64.tar.gz | tar xz
sudo mv cntb /usr/local/bin/

# macOS
curl -sL https://github.com/contabo/cntb/releases/latest/download/cntb_darwin_amd64.tar.gz | tar xz
sudo mv cntb /usr/local/bin/

# Windows (PowerShell)
Invoke-WebRequest -Uri "https://github.com/contabo/cntb/releases/latest/download/cntb_windows_amd64.zip" -OutFile cntb.zip
Expand-Archive cntb.zip -DestinationPath .
```

### 2. Contabo Account & API Credentials

**If you don't have a Contabo account**:

Sign up at: https://contabo.com/?ref=YOUR_REFERRAL_CODE

> *Disclosure: This is a referral link from the CJ Affiliate program. The skill author may receive $25-$250 commission. Using this link helps support the development of these skills.*

**Get API Credentials**: https://my.contabo.com/api/details

You need:
- **Client ID** (OAuth2)
- **Client Secret** (OAuth2)
- **API User** (your email)
- **API Password** (your account password or generated one)

### 3. cntb CLI Configured

```bash
cntb get instances
```

**If it shows an error**, configure with:

```bash
# Set via environment variables
export CNTB_OAUTH2_CLIENT_ID="your_client_id"
export CNTB_OAUTH2_CLIENT_SECRET="your_client_secret"
export CNTB_OAUTH2_USER="your_api_user"
export CNTB_OAUTH2_PASS="your_api_password"

# Or configure interactively
cntb config set-credentials
```

### 4. SSH Key Pair

```bash
ls ~/.ssh/id_rsa.pub
```

**If missing**, generate with:

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
```

### 5. SSH Key Available

Unlike other providers, Contabo requires you to specify the SSH key during instance creation via the `--sshKeys` parameter with the actual public key content.

```bash
cat ~/.ssh/id_rsa.pub
```

### 6. Test Authentication

```bash
cntb get datacenters
```

**If this fails**: Credentials may be incorrect. Verify at https://my.contabo.com/api/details

---

## Server Profiles

### Coolify/Kasm Deployments - BEST VALUE

| Profile | Plan | vCPU | RAM | Disk | Monthly Cost |
|---------|------|------|-----|------|--------------|
| `coolify` | Cloud VPS 10 SP | 4 | 8GB | 100GB | €5 |
| `kasm` | Cloud VPS 20 SP | 6 | 18GB | 150GB | €8 |
| `both` | Cloud VPS 30 | 8 | 24GB | 200GB | €14 |

### Standard Plans (More Storage)

| Profile | Plan | vCPU | RAM | Disk | Monthly Cost |
|---------|------|------|-----|------|--------------|
| `standard-small` | Cloud VPS S | 4 | 8GB | 200GB SSD | €8 |
| `standard-medium` | Cloud VPS M | 6 | 16GB | 400GB SSD | €14 |
| `standard-large` | Cloud VPS L | 8 | 30GB | 800GB SSD | €26 |
| `standard-xl` | Cloud VPS XL | 10 | 60GB | 1600GB SSD | €39 |

<details>
<summary><strong>Price Comparison - Why Contabo?</strong></summary>

| Provider | 6 vCPU, 16-18GB RAM | Monthly Cost |
|----------|---------------------|--------------|
| **Contabo VPS 20 SP** | 6 vCPU, 18GB | **€8** |
| Hetzner CX42 | 8 vCPU, 16GB | €20 |
| DigitalOcean | 8 vCPU, 16GB | $96 |
| Vultr | 6 vCPU, 16GB | $96 |
| Linode | 6 vCPU, 16GB | $96 |

Contabo offers **5-10x better value** than most competitors.

</details>

---

## Deployment Steps

### Step 1: Set Environment Variables

```bash
export CONTABO_REGION="EU"                 # EU, US-central, US-east, US-west, SIN, JPN, AUS
export CONTABO_PRODUCT_ID="V48"            # See product IDs below (V48 verified working)
export SERVER_NAME="my-server"
```

<details>
<summary><strong>Region options</strong></summary>

| Code | Location | Region |
|------|----------|--------|
| `EU` | Germany (Nuremberg) | Europe |
| `US-central` | St. Louis, MO | US Central |
| `US-east` | New York | US East |
| `US-west` | Seattle | US West |
| `SIN` | Singapore | Asia |
| `JPN` | Tokyo | Japan |
| `AUS` | Sydney | Australia |

Run `cntb get datacenters` for full list.

</details>

<details>
<summary><strong>Product ID reference</strong></summary>

| Product ID | Plan | vCPU | RAM | Disk | Price | Status |
|------------|------|------|-----|------|-------|--------|
| V12 | VPS S NVMe | 4 | 8GB | 100GB | €5 | ✅ Verified |
| V48 | VPS M (Cloud VPS 2 SSD) | 6 | 16GB | 400GB | €14 | ✅ Verified |
| V35 | Cloud VPS 1 | 4 | 6GB | 100GB | €4.50 | Untested |
| V39 | Cloud VPS 10 SP | 4 | 8GB | 100GB NVMe | €5 | Untested |
| V45 | Cloud VPS 20 SP | 6 | 18GB | 150GB NVMe | €8 | ⚠️ May not work |
| V46 | Cloud VPS 30 | 8 | 24GB | 200GB | €14 | Untested |
| V47 | Cloud VPS S | 4 | 8GB | 200GB SSD | €8 | Untested |
| V49 | Cloud VPS L | 8 | 30GB | 800GB SSD | €26 | Untested |
| V50 | Cloud VPS XL | 10 | 60GB | 1600GB SSD | €39 | Untested |

**Important**: Some product IDs from Contabo documentation may be outdated. V48 and V12 are verified working. Run `cntb get products --productType vps` for current list.

</details>

### Step 2: Create Instance

```bash
# Get the SSH public key content
SSH_KEY_CONTENT=$(cat ~/.ssh/id_rsa.pub)

# Create instance
cntb create instance \
  --productId "$CONTABO_PRODUCT_ID" \
  --region "$CONTABO_REGION" \
  --displayName "$SERVER_NAME" \
  --imageId "ubuntu-22.04" \
  --sshKeys "$SSH_KEY_CONTENT"
```

### Step 3: Get Instance Details

```bash
# List instances to get the ID
INSTANCE_ID=$(cntb get instances --output json | jq -r '.[] | select(.displayName=="'"$SERVER_NAME"'") | .instanceId')
echo "Instance ID: $INSTANCE_ID"

# Get instance details
cntb get instance "$INSTANCE_ID"

# Get IP address
SERVER_IP=$(cntb get instance "$INSTANCE_ID" --output json | jq -r '.ipConfig.v4.ip')
echo "SERVER_IP=$SERVER_IP"
```

### Step 4: Wait for Server Ready

```bash
# Wait for instance to be running
echo "Waiting for instance to be running..."
while [ "$(cntb get instance "$INSTANCE_ID" --output json | jq -r '.status')" != "running" ]; do
  sleep 10
done
echo "Instance is running!"

# Wait for SSH to be available (typically 2-5 minutes for Contabo)
echo "Waiting for SSH to be available..."
until ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no root@$SERVER_IP "echo connected" 2>/dev/null; do
  sleep 10
done
echo "Server is ready!"
```

### Step 5: Verify Connection

```bash
ssh root@$SERVER_IP "uname -a && free -h && df -h /"
```

### Step 6: Output for Downstream Skills

```bash
# Contabo only offers x86 architecture
SERVER_ARCH="amd64"

# Save to .env.local for downstream skills
echo "SERVER_IP=$SERVER_IP" >> .env.local
echo "SSH_USER=root" >> .env.local
echo "SSH_KEY_PATH=~/.ssh/id_rsa" >> .env.local
echo "SERVER_ARCH=$SERVER_ARCH" >> .env.local
echo "COOLIFY_SERVER_IP=$SERVER_IP" >> .env.local
echo "KASM_SERVER_IP=$SERVER_IP" >> .env.local

echo ""
echo "Instance deployed successfully!"
echo "  IP: $SERVER_IP"
echo "  Arch: $SERVER_ARCH"
echo "  SSH: ssh root@$SERVER_IP"
```

---

## Verify Deployment

```bash
ssh root@$SERVER_IP "echo 'Contabo instance connected successfully'"
```

---

## Object Storage Auto-Scaling

Contabo supports auto-scaling limits for object storage to control costs.

### Create Object Storage with Auto-Scaling

```bash
# Create object storage bucket
cntb create objectStorage \
  --region "$CONTABO_REGION" \
  --displayName "my-storage" \
  --totalPurchasedSpaceTB 0.5 \
  --autoScaling.state enabled \
  --autoScaling.sizeLimitTB 2
```

This allows storage to automatically grow up to 2TB as needed.

---

## Cleanup

**Warning**: This is destructive and cannot be undone.

```bash
# Cancel instance (Contabo uses "cancel" not "delete")
cntb cancel instance "$INSTANCE_ID"

# Note: Cancellation may take effect at end of billing period
# For immediate deletion, contact Contabo support
```

---

## Operations

Troubleshooting, best practices, configuration variables, and cost snapshots are in `references/OPERATIONS.md`.

---

## Logging Integration

When performing infrastructure operations, log to the centralized system:

```bash
# After provisioning
log_admin "SUCCESS" "operation" "Provisioned Contabo VPS" "id=$INSTANCE_ID provider=Contabo"

# After destroying
log_admin "SUCCESS" "operation" "Cancelled Contabo VPS" "id=$INSTANCE_ID"

# On error
log_admin "ERROR" "operation" "Contabo deployment failed" "error=$ERROR_MSG"
```

See `admin` skill's `references/logging.md` for full logging documentation.

---

## References

- [Contabo Control Panel](https://my.contabo.com/)
- [cntb CLI Documentation](https://github.com/contabo/cntb)
- [API Documentation](https://api.contabo.com/)
- [Pricing](https://contabo.com/en/vps/)
- [Contabo SDK (PHP)](https://packagist.org/packages/contabo/contabo-sdk)
