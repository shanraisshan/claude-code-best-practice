#!/usr/bin/env node

const TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const ADVERTISER_ID = process.env.TIKTOK_ADVERTISER_ID
const BASE_URL = 'https://business-api.tiktok.com/open_api/v1.3'

if (!TOKEN) {
  console.error(JSON.stringify({ error: 'TIKTOK_ACCESS_TOKEN environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Access-Token': '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const opts = {
    method,
    headers: {
      'Access-Token': TOKEN,
      'Content-Type': 'application/json',
    },
  }
  if (body && method === 'POST') {
    opts.body = JSON.stringify(body)
  }
  const res = await fetch(`${BASE_URL}${path}`, opts)
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

function getAdvertiserId() {
  return args['advertiser-id'] || ADVERTISER_ID
}

async function main() {
  let result

  switch (cmd) {
    case 'advertiser':
      switch (sub) {
        case 'info': {
          const advId = getAdvertiserId()
          if (!advId) { result = { error: 'TIKTOK_ADVERTISER_ID env or --advertiser-id required' }; break }
          const advParams = new URLSearchParams({ advertiser_ids: JSON.stringify([advId]) })
          result = await api('GET', `/advertiser/info/?${advParams}`)
          break
        }
        default:
          result = { error: 'Unknown advertiser subcommand. Use: info' }
      }
      break

    case 'campaigns':
      switch (sub) {
        case 'list': {
          const advId = getAdvertiserId()
          if (!advId) { result = { error: 'TIKTOK_ADVERTISER_ID env or --advertiser-id required' }; break }
          const campParams = new URLSearchParams({ advertiser_id: advId, page: '1', page_size: '20' })
          result = await api('GET', `/campaign/get/?${campParams}`)
          break
        }
        case 'create': {
          const advId = getAdvertiserId()
          if (!advId) { result = { error: 'TIKTOK_ADVERTISER_ID env or --advertiser-id required' }; break }
          if (!args.name || !args.objective) { result = { error: '--name and --objective required' }; break }
          const body = {
            advertiser_id: advId,
            campaign_name: args.name,
            objective_type: args.objective,
            budget_mode: args['budget-mode'] || 'BUDGET_MODE_DAY',
          }
          if (args.budget) body.budget = parseFloat(args.budget)
          result = await api('POST', '/campaign/create/', body)
          break
        }
        case 'update-status': {
          const advId = getAdvertiserId()
          if (!advId) { result = { error: 'TIKTOK_ADVERTISER_ID env or --advertiser-id required' }; break }
          if (!args.ids || !args.status) { result = { error: '--ids and --status required' }; break }
          result = await api('POST', '/campaign/status/update/', {
            advertiser_id: advId,
            campaign_ids: args.ids.split(','),
            opt_status: args.status,
          })
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, create, update-status' }
      }
      break

    case 'adgroups':
      switch (sub) {
        case 'list': {
          const advId = getAdvertiserId()
          if (!advId) { result = { error: 'TIKTOK_ADVERTISER_ID env or --advertiser-id required' }; break }
          const agParams = new URLSearchParams({ advertiser_id: advId })
          if (args['campaign-id']) agParams.set('campaign_ids', JSON.stringify([args['campaign-id']]))
          result = await api('GET', `/adgroup/get/?${agParams}`)
          break
        }
        default:
          result = { error: 'Unknown adgroups subcommand. Use: list' }
      }
      break

    case 'reports':
      switch (sub) {
        case 'get': {
          const advId = getAdvertiserId()
          if (!advId) { result = { error: 'TIKTOK_ADVERTISER_ID env or --advertiser-id required' }; break }
          if (!args['start-date'] || !args['end-date']) { result = { error: '--start-date and --end-date required (YYYY-MM-DD)' }; break }
          const body = {
            advertiser_id: advId,
            report_type: 'BASIC',
            dimensions: args.dimensions ? args.dimensions.split(',') : ['campaign_id'],
            metrics: args.metrics ? args.metrics.split(',') : ['spend', 'impressions', 'clicks', 'conversion'],
            data_level: args['data-level'] || 'AUCTION_CAMPAIGN',
            start_date: args['start-date'],
            end_date: args['end-date'],
          }
          result = await api('POST', '/report/integrated/get/', body)
          break
        }
        default:
          result = { error: 'Unknown reports subcommand. Use: get' }
      }
      break

    case 'audiences':
      switch (sub) {
        case 'list': {
          const advId = getAdvertiserId()
          if (!advId) { result = { error: 'TIKTOK_ADVERTISER_ID env or --advertiser-id required' }; break }
          const audParams = new URLSearchParams({ advertiser_id: advId })
          result = await api('GET', `/dmp/custom_audience/list/?${audParams}`)
          break
        }
        default:
          result = { error: 'Unknown audiences subcommand. Use: list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          advertiser: 'advertiser [info]',
          campaigns: 'campaigns [list|create|update-status] [--name <name>] [--objective <obj>] [--budget-mode BUDGET_MODE_DAY] [--budget <amount>] [--ids <id1,id2>] [--status ENABLE|DISABLE]',
          adgroups: 'adgroups [list] [--campaign-id <id>]',
          reports: 'reports [get] --start-date YYYY-MM-DD --end-date YYYY-MM-DD [--dimensions campaign_id] [--metrics spend,impressions,clicks,conversion] [--data-level AUCTION_CAMPAIGN]',
          audiences: 'audiences [list]',
        },
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
