#!/usr/bin/env node

const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN
const BASE_URL = 'https://api.linkedin.com/v2'

if (!TOKEN) {
  console.error(JSON.stringify({ error: 'LINKEDIN_ACCESS_TOKEN environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'X-RestLi-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json',
  }
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { ...headers, Authorization: '***' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { status: res.status, body: text }
  }
}

function parseArgs(args) {
  const result = { _: [] }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const next = args[i + 1]
      if (next && !next.startsWith('--')) {
        result[key] = next
        i++
      } else {
        result[key] = true
      }
    } else {
      result._.push(arg)
    }
  }
  return result
}

const args = parseArgs(process.argv.slice(2))
const [cmd, sub, ...rest] = args._

async function main() {
  let result

  switch (cmd) {
    case 'accounts':
      switch (sub) {
        case 'list':
          result = await api('GET', '/adAccountsV2?q=search')
          break
        default:
          result = { error: 'Unknown accounts subcommand. Use: list' }
      }
      break

    case 'campaigns':
      switch (sub) {
        case 'list': {
          if (!args['account-id']) { result = { error: '--account-id required' }; break }
          result = await api('GET', `/adCampaignsV2?q=search&search.account.values[0]=urn:li:sponsoredAccount:${args['account-id']}`)
          break
        }
        case 'create': {
          if (!args['account-id'] || !args.name) { result = { error: '--account-id and --name required' }; break }
          if (!args['campaign-group-id']) { result = { error: '--campaign-group-id required' }; break }
          const body = {
            account: `urn:li:sponsoredAccount:${args['account-id']}`,
            campaignGroup: `urn:li:sponsoredCampaignGroup:${args['campaign-group-id']}`,
            name: args.name,
            type: args.type || 'SPONSORED_UPDATES',
            costType: args['cost-type'] || 'CPC',
            unitCost: {
              amount: parseFloat(args['unit-cost'] || '5.00'),
              currencyCode: 'USD',
            },
            dailyBudget: {
              amount: parseFloat(args['daily-budget'] || '100.00'),
              currencyCode: 'USD',
            },
            status: 'PAUSED',
          }
          result = await api('POST', '/adCampaignsV2', body)
          break
        }
        case 'update': {
          if (!args.id || !args.status) { result = { error: '--id and --status required' }; break }
          result = await api('POST', `/adCampaignsV2/${args.id}`, {
            patch: {
              $set: {
                status: args.status,
              },
            },
          })
          break
        }
        case 'analytics': {
          if (!args.id) { result = { error: '--id required' }; break }
          if (!args['start-year'] || !args['start-month'] || !args['start-day'] || !args['end-year'] || !args['end-month'] || !args['end-day']) {
            result = { error: '--start-year, --start-month, --start-day, --end-year, --end-month, --end-day required' }
            break
          }
          const params = new URLSearchParams({
            q: 'analytics',
            pivot: 'CAMPAIGN',
            'dateRange.start.year': args['start-year'],
            'dateRange.start.month': args['start-month'],
            'dateRange.start.day': args['start-day'],
            'dateRange.end.year': args['end-year'],
            'dateRange.end.month': args['end-month'],
            'dateRange.end.day': args['end-day'],
            campaigns: `urn:li:sponsoredCampaign:${args.id}`,
            fields: 'impressions,clicks,costInLocalCurrency,conversions',
          })
          result = await api('GET', `/adAnalyticsV2?${params}`)
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, create, update, analytics' }
      }
      break

    case 'creatives':
      switch (sub) {
        case 'list': {
          if (!args['campaign-id']) { result = { error: '--campaign-id required' }; break }
          result = await api('GET', `/adCreativesV2?q=search&search.campaign.values[0]=urn:li:sponsoredCampaign:${args['campaign-id']}`)
          break
        }
        default:
          result = { error: 'Unknown creatives subcommand. Use: list' }
      }
      break

    case 'audiences':
      switch (sub) {
        case 'count': {
          if (!args.targeting) { result = { error: '--targeting required (JSON string)' }; break }
          let targeting
          try {
            targeting = JSON.parse(args.targeting)
          } catch {
            result = { error: 'Invalid JSON for --targeting' }
            break
          }
          result = await api('POST', '/audienceCountsV2', { audienceCriteria: targeting })
          break
        }
        default:
          result = { error: 'Unknown audiences subcommand. Use: count' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          accounts: 'accounts [list]',
          campaigns: 'campaigns [list|create|update|analytics] [--account-id <id>] [--name <name>] [--type SPONSORED_UPDATES] [--cost-type CPC] [--unit-cost 5.00] [--daily-budget 100.00] [--id <id>] [--status ACTIVE|PAUSED]',
          creatives: 'creatives [list] --campaign-id <id>',
          audiences: 'audiences [count] --targeting <json>',
        },
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
