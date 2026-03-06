#!/usr/bin/env node

const API_KEY = process.env.SUPERMETRICS_API_KEY
const BASE_URL = 'https://api.supermetrics.com/enterprise/v2'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'SUPERMETRICS_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const separator = path.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${path}${separator}api_key=${API_KEY}`
  if (args['dry-run']) {
    return { _dry_run: true, method, url: url.replace(API_KEY, '***'), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
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
    case 'query': {
      const dsId = args['ds-id']
      const dsAccounts = args['ds-accounts']
      const dateRange = args['date-range']
      const fields = args.fields
      if (!dsId) { result = { error: '--ds-id required (e.g., GA4, AW, FB, LI, GSC)' }; break }
      if (!dsAccounts) { result = { error: '--ds-accounts required' }; break }
      if (!dateRange) { result = { error: '--date-range required (e.g., last_28_days, last_month, this_month, custom)' }; break }
      if (!fields) { result = { error: '--fields required (comma-separated field names)' }; break }
      const body = {
        ds_id: dsId,
        ds_accounts: dsAccounts,
        date_range_type: dateRange,
        fields: fields.split(',').map(f => ({ name: f.trim() })),
      }
      if (args.filter) body.filter = args.filter
      if (args['max-rows']) body.max_rows = parseInt(args['max-rows'], 10)
      if (args['start-date']) body.start_date = args['start-date']
      if (args['end-date']) body.end_date = args['end-date']
      result = await api('POST', '/query/data/json', body)
      break
    }

    case 'sources':
      switch (sub) {
        case 'list':
          result = await api('GET', '/datasources')
          break
        default:
          result = { error: 'Unknown sources subcommand. Use: list' }
      }
      break

    case 'accounts':
      switch (sub) {
        case 'list': {
          const dsId = args['ds-id']
          if (!dsId) { result = { error: '--ds-id required (e.g., GA4, AW, FB)' }; break }
          const params = new URLSearchParams({ ds_id: dsId })
          result = await api('GET', `/datasources/accounts?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown accounts subcommand. Use: list' }
      }
      break

    case 'teams':
      switch (sub) {
        case 'list':
          result = await api('GET', '/teams')
          break
        default:
          result = { error: 'Unknown teams subcommand. Use: list' }
      }
      break

    case 'users':
      switch (sub) {
        case 'list':
          result = await api('GET', '/users')
          break
        default:
          result = { error: 'Unknown users subcommand. Use: list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          query: 'query --ds-id <data-source> --ds-accounts <account-id> --date-range <range> --fields <f1,f2> [--filter <filter>] [--max-rows <n>] [--start-date <date>] [--end-date <date>]',
          sources: {
            list: 'sources list',
          },
          accounts: {
            list: 'accounts list --ds-id <data-source>',
          },
          teams: {
            list: 'teams list',
          },
          users: {
            list: 'users list',
          },
          'data-source-ids': {
            'GA4': 'Google Analytics 4',
            'GA4_PAID': 'Google Analytics (paid)',
            'AW': 'Google Ads',
            'FB': 'Facebook Ads',
            'LI': 'LinkedIn Ads',
            'TW_ADS': 'Twitter Ads',
            'IG_IA': 'Instagram',
            'FB_IA': 'Facebook Pages',
            'GSC': 'Google Search Console',
            'SE': 'Semrush',
            'MC': 'Mailchimp',
          },
          'date-ranges': ['last_28_days', 'last_month', 'this_month', 'custom'],
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
