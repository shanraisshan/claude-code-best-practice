# Contabo Infrastructure

Deploy Cloud VPS on Contabo - the best price/performance ratio in the industry. 6 vCPU + 18GB RAM for just €8/month.

## Quick Start

```bash
# 1. Install cntb CLI
curl -sL https://github.com/contabo/cntb/releases/latest/download/cntb_linux_amd64.tar.gz | tar xz
sudo mv cntb /usr/local/bin/

# 2. Configure authentication
export CNTB_OAUTH2_CLIENT_ID="your_client_id"
export CNTB_OAUTH2_CLIENT_SECRET="your_client_secret"
export CNTB_OAUTH2_USER="your_email"
export CNTB_OAUTH2_PASS="your_password"

# 3. Create instance (V48 verified working - some product IDs like V45 may fail)
cntb create instance \
  --productId V48 \
  --region EU \
  --displayName my-server \
  --imageId ubuntu-22.04 \
  --sshKeys "$(cat ~/.ssh/id_rsa.pub)"

# 4. Get IP and connect (wait 2-5 minutes)
INSTANCE_ID=$(cntb get instances --output json | jq -r '.[0].instanceId')
SERVER_IP=$(cntb get instance "$INSTANCE_ID" --output json | jq -r '.ipConfig.v4.ip')
ssh root@$SERVER_IP
```

## Server Profiles - BEST VALUE

| Use Case | Plan | Specs | Cost |
|----------|------|-------|------|
| Coolify | VPS 10 SP | 4 vCPU, 8GB | €5/mo |
| KASM | VPS 20 SP | 6 vCPU, 18GB | €8/mo |
| Both | VPS 30 | 8 vCPU, 24GB | €14/mo |

## Standard Plans (More Storage)

| Plan | Specs | Cost |
|------|-------|------|
| VPS S | 4 vCPU, 8GB, 200GB | €8/mo |
| VPS M | 6 vCPU, 16GB, 400GB | €14/mo |
| VPS L | 8 vCPU, 30GB, 800GB | €26/mo |

## Regions

- `EU` - Germany (Nuremberg)
- `US-central` - St. Louis, MO
- `US-east` - New York
- `US-west` - Seattle
- `SIN` - Singapore
- `JPN` - Tokyo
- `AUS` - Sydney

## Known Issues

- Some product IDs (like V45) may return "No offer found" - use V48 or V12
- `cntb cancel instance` may crash - use web panel instead

## Limitations

- No firewall API (use iptables)
- Slower provisioning (2-5 min)
- Object storage auto-scaling only

## See Also

- [SKILL.md](SKILL.md) - Full documentation
- [Contabo Control Panel](https://my.contabo.com/)
