#!/usr/bin/env node

const API_KEY = process.env.INSTANTLY_API_KEY
const BASE_URL = 'https://api.instantly.ai/api/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'INSTANTLY_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const separator = path.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${path}${separator}api_key=${API_KEY}`
  if (args['dry-run']) {
    const maskedUrl = url.replace(API_KEY, '***')
    const maskedBody = body ? JSON.parse(JSON.stringify(body)) : undefined
    if (maskedBody && maskedBody.api_key) maskedBody.api_key = '***'
    return { _dry_run: true, method, url: maskedUrl, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: maskedBody }
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
    case 'campaigns':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          if (args.skip) params.set('skip', args.skip)
          const qs = params.toString()
          result = await api('GET', `/campaign/list${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const params = new URLSearchParams({ campaign_id: id })
          result = await api('GET', `/campaign/get?${params.toString()}`)
          break
        }
        case 'status': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const params = new URLSearchParams({ campaign_id: id })
          result = await api('GET', `/campaign/get/status?${params.toString()}`)
          break
        }
        case 'launch': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', '/campaign/launch', { api_key: API_KEY, campaign_id: id })
          break
        }
        case 'pause': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', '/campaign/pause', { api_key: API_KEY, campaign_id: id })
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, get, status, launch, pause' }
      }
      break

    case 'leads':
      switch (sub) {
        case 'list': {
          const campaignId = args['campaign-id']
          if (!campaignId) { result = { error: '--campaign-id required' }; break }
          const params = new URLSearchParams({ campaign_id: campaignId })
          if (args.limit) params.set('limit', args.limit)
          if (args.skip) params.set('skip', args.skip)
          result = await api('GET', `/lead/get?${params.toString()}`)
          break
        }
        case 'add': {
          const campaignId = args['campaign-id']
          const email = args.email
          if (!campaignId) { result = { error: '--campaign-id required' }; break }
          if (!email) { result = { error: '--email required' }; break }
          const lead = { email }
          if (args['first-name']) lead.first_name = args['first-name']
          if (args['last-name']) lead.last_name = args['last-name']
          if (args.company) lead.company_name = args.company
          result = await api('POST', '/lead/add', { api_key: API_KEY, campaign_id: campaignId, leads: [lead] })
          break
        }
        case 'delete': {
          const campaignId = args['campaign-id']
          const email = args.email
          if (!campaignId) { result = { error: '--campaign-id required' }; break }
          if (!email) { result = { error: '--email required' }; break }
          result = await api('POST', '/lead/delete', { api_key: API_KEY, campaign_id: campaignId, delete_list: [email] })
          break
        }
        case 'status': {
          const campaignId = args['campaign-id']
          const email = args.email
          if (!campaignId) { result = { error: '--campaign-id required' }; break }
          if (!email) { result = { error: '--email required' }; break }
          const params = new URLSearchParams({ campaign_id: campaignId, email })
          result = await api('GET', `/lead/get/status?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown leads subcommand. Use: list, add, delete, status' }
      }
      break

    case 'accounts':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          if (args.skip) params.set('skip', args.skip)
          const qs = params.toString()
          result = await api('GET', `/account/list${qs ? '?' + qs : ''}`)
          break
        }
        case 'status': {
          const accountId = args['account-id']
          if (!accountId) { result = { error: '--account-id required' }; break }
          const params = new URLSearchParams({ email: accountId })
          result = await api('GET', `/account/get/status?${params.toString()}`)
          break
        }
        case 'warmup-status': {
          const accountId = args['account-id']
          if (!accountId) { result = { error: '--account-id required' }; break }
          const params = new URLSearchParams({ email: accountId })
          result = await api('GET', `/account/get/warmup?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown accounts subcommand. Use: list, status, warmup-status' }
      }
      break

    case 'analytics':
      switch (sub) {
        case 'campaign': {
          const campaignId = args['campaign-id']
          if (!campaignId) { result = { error: '--campaign-id required' }; break }
          const body = { api_key: API_KEY, campaign_id: campaignId }
          if (args['start-date']) body.start_date = args['start-date']
          if (args['end-date']) body.end_date = args['end-date']
          result = await api('POST', '/analytics/campaign/summary', body)
          break
        }
        case 'steps': {
          const campaignId = args['campaign-id']
          if (!campaignId) { result = { error: '--campaign-id required' }; break }
          const body = { api_key: API_KEY, campaign_id: campaignId }
          if (args['start-date']) body.start_date = args['start-date']
          if (args['end-date']) body.end_date = args['end-date']
          result = await api('POST', '/analytics/campaign/step', body)
          break
        }
        case 'account': {
          const startDate = args['start-date']
          const endDate = args['end-date']
          if (!startDate) { result = { error: '--start-date required' }; break }
          if (!endDate) { result = { error: '--end-date required' }; break }
          result = await api('POST', '/analytics/campaign/count', { api_key: API_KEY, start_date: startDate, end_date: endDate })
          break
        }
        default:
          result = { error: 'Unknown analytics subcommand. Use: campaign, steps, account' }
      }
      break

    case 'blocklist':
      switch (sub) {
        case 'list':
          result = await api('GET', '/blocklist')
          break
        case 'add': {
          const entries = args.entries
          if (!entries) { result = { error: '--entries required (comma-separated emails or domains)' }; break }
          const entryList = entries.split(',').map(e => e.trim())
          result = await api('POST', '/blocklist/add', { api_key: API_KEY, entries: entryList })
          break
        }
        default:
          result = { error: 'Unknown blocklist subcommand. Use: list, add' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          campaigns: {
            list: 'campaigns list [--limit <n>] [--skip <n>]',
            get: 'campaigns get --id <id>',
            status: 'campaigns status --id <id>',
            launch: 'campaigns launch --id <id>',
            pause: 'campaigns pause --id <id>',
          },
          leads: {
            list: 'leads list --campaign-id <id> [--limit <n>] [--skip <n>]',
            add: 'leads add --campaign-id <id> --email <email> [--first-name <name>] [--last-name <name>] [--company <name>]',
            delete: 'leads delete --campaign-id <id> --email <email>',
            status: 'leads status --campaign-id <id> --email <email>',
          },
          accounts: {
            list: 'accounts list [--limit <n>] [--skip <n>]',
            status: 'accounts status --account-id <email>',
            'warmup-status': 'accounts warmup-status --account-id <email>',
          },
          analytics: {
            campaign: 'analytics campaign --campaign-id <id> [--start-date YYYY-MM-DD] [--end-date YYYY-MM-DD]',
            steps: 'analytics steps --campaign-id <id> [--start-date YYYY-MM-DD] [--end-date YYYY-MM-DD]',
            account: 'analytics account --start-date YYYY-MM-DD --end-date YYYY-MM-DD',
          },
          blocklist: {
            list: 'blocklist list',
            add: 'blocklist add --entries <email-or-domain,email-or-domain>',
          },
          options: '--dry-run (show request without executing)',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
