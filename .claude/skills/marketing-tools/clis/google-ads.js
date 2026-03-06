#!/usr/bin/env node

const TOKEN = process.env.GOOGLE_ADS_TOKEN
const DEV_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID
const BASE_URL = 'https://googleads.googleapis.com/v14'

if (!TOKEN || !DEV_TOKEN || !CUSTOMER_ID) {
  console.error(JSON.stringify({ error: 'GOOGLE_ADS_TOKEN, GOOGLE_ADS_DEVELOPER_TOKEN, and GOOGLE_ADS_CUSTOMER_ID environment variables required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'developer-token': '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'developer-token': DEV_TOKEN,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { status: res.status, body: text }
  }
}

async function gaql(query) {
  return api('POST', `/customers/${CUSTOMER_ID}/googleAds:searchStream`, { query })
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

function daysToDateRange(days) {
  const d = parseInt(days) || 30
  if (d === 7) return 'LAST_7_DAYS'
  if (d === 14) return 'LAST_14_DAYS'
  if (d === 30) return 'LAST_30_DAYS'
  if (d === 90) return 'LAST_90_DAYS'
  return `LAST_${d}_DAYS`
}

async function main() {
  let result

  switch (cmd) {
    case 'account':
      switch (sub) {
        case 'info':
        default:
          result = await gaql('SELECT customer.id, customer.descriptive_name FROM customer')
      }
      break

    case 'campaigns':
      switch (sub) {
        case 'list':
          result = await gaql('SELECT campaign.id, campaign.name, campaign.status, campaign_budget.amount_micros FROM campaign ORDER BY campaign.id')
          break
        case 'performance': {
          const dateRange = daysToDateRange(args.days)
          result = await gaql(`SELECT campaign.name, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM campaign WHERE segments.date DURING ${dateRange}`)
          break
        }
        case 'pause': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('POST', `/customers/${CUSTOMER_ID}/campaigns:mutate`, {
            operations: [{
              update: {
                resourceName: `customers/${CUSTOMER_ID}/campaigns/${args.id}`,
                status: 'PAUSED',
              },
              updateMask: 'status',
            }],
          })
          break
        }
        case 'enable': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('POST', `/customers/${CUSTOMER_ID}/campaigns:mutate`, {
            operations: [{
              update: {
                resourceName: `customers/${CUSTOMER_ID}/campaigns/${args.id}`,
                status: 'ENABLED',
              },
              updateMask: 'status',
            }],
          })
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, performance, pause, enable' }
      }
      break

    case 'adgroups':
      switch (sub) {
        case 'performance': {
          const dateRange = daysToDateRange(args.days)
          const limit = args.limit ? ` LIMIT ${args.limit}` : ''
          result = await gaql(`SELECT ad_group.name, metrics.impressions, metrics.clicks, metrics.conversions FROM ad_group WHERE segments.date DURING ${dateRange}${limit}`)
          break
        }
        default:
          result = { error: 'Unknown adgroups subcommand. Use: performance' }
      }
      break

    case 'keywords':
      switch (sub) {
        case 'performance': {
          const dateRange = daysToDateRange(args.days)
          const limit = args.limit || '50'
          result = await gaql(`SELECT ad_group_criterion.keyword.text, metrics.impressions, metrics.clicks, metrics.average_cpc FROM keyword_view WHERE segments.date DURING ${dateRange} ORDER BY metrics.clicks DESC LIMIT ${limit}`)
          break
        }
        default:
          result = { error: 'Unknown keywords subcommand. Use: performance' }
      }
      break

    case 'budgets':
      switch (sub) {
        case 'update': {
          if (!args.id || !args.amount) { result = { error: '--id and --amount required' }; break }
          const amountMicros = String(Math.round(parseFloat(args.amount) * 1000000))
          result = await api('POST', `/customers/${CUSTOMER_ID}/campaignBudgets:mutate`, {
            operations: [{
              update: {
                resourceName: `customers/${CUSTOMER_ID}/campaignBudgets/${args.id}`,
                amount_micros: amountMicros,
              },
              updateMask: 'amount_micros',
            }],
          })
          break
        }
        default:
          result = { error: 'Unknown budgets subcommand. Use: update' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          account: 'account [info]',
          campaigns: 'campaigns [list|performance|pause|enable] [--days 30] [--id <id>]',
          adgroups: 'adgroups [performance] [--days 30] [--limit <n>]',
          keywords: 'keywords [performance] [--days 30] [--limit 50]',
          budgets: 'budgets [update] --id <budget_id> --amount <dollars>',
        },
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
