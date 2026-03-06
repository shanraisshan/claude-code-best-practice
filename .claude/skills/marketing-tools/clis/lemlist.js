#!/usr/bin/env node

const API_KEY = process.env.LEMLIST_API_KEY
const BASE_URL = 'https://api.lemlist.com/api'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'LEMLIST_API_KEY environment variable required' }))
  process.exit(1)
}

const AUTH = 'Basic ' + Buffer.from(`:${API_KEY}`).toString('base64')

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': AUTH,
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
  const offset = args.offset ? Number(args.offset) : 0
  const limit = args.limit ? Number(args.limit) : 100

  switch (cmd) {
    case 'team':
      switch (sub) {
        case 'info':
          result = await api('GET', '/team')
          break
        default:
          result = { error: 'Unknown team subcommand. Use: info' }
      }
      break

    case 'campaigns':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('offset', String(offset))
          params.set('limit', String(limit))
          result = await api('GET', `/campaigns?${params}`)
          break
        }
        case 'get': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('GET', `/campaigns/${args.id}`)
          break
        }
        case 'stats': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('GET', `/campaigns/${args.id}/stats`)
          break
        }
        case 'export': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('GET', `/campaigns/${args.id}/export`)
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, get, stats, export' }
      }
      break

    case 'leads':
      switch (sub) {
        case 'list': {
          if (!args['campaign-id']) { result = { error: '--campaign-id required' }; break }
          const params = new URLSearchParams()
          params.set('offset', String(offset))
          params.set('limit', String(limit))
          result = await api('GET', `/campaigns/${args['campaign-id']}/leads?${params}`)
          break
        }
        case 'get': {
          if (!args['campaign-id']) { result = { error: '--campaign-id required' }; break }
          if (!args.email) { result = { error: '--email required' }; break }
          result = await api('GET', `/campaigns/${args['campaign-id']}/leads/${encodeURIComponent(args.email)}`)
          break
        }
        case 'add': {
          if (!args['campaign-id']) { result = { error: '--campaign-id required' }; break }
          if (!args.email) { result = { error: '--email required' }; break }
          const body = {}
          if (args['first-name']) body.firstName = args['first-name']
          if (args['last-name']) body.lastName = args['last-name']
          if (args.company) body.companyName = args.company
          result = await api('POST', `/campaigns/${args['campaign-id']}/leads/${encodeURIComponent(args.email)}`, body)
          break
        }
        case 'delete': {
          if (!args['campaign-id']) { result = { error: '--campaign-id required' }; break }
          if (!args.email) { result = { error: '--email required' }; break }
          result = await api('DELETE', `/campaigns/${args['campaign-id']}/leads/${encodeURIComponent(args.email)}`)
          break
        }
        default:
          result = { error: 'Unknown leads subcommand. Use: list, get, add, delete' }
      }
      break

    case 'unsubscribes':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('offset', String(offset))
          params.set('limit', String(limit))
          result = await api('GET', `/unsubscribes?${params}`)
          break
        }
        case 'add': {
          if (!args.email) { result = { error: '--email required' }; break }
          result = await api('POST', `/unsubscribes/${encodeURIComponent(args.email)}`)
          break
        }
        case 'delete': {
          if (!args.email) { result = { error: '--email required' }; break }
          result = await api('DELETE', `/unsubscribes/${encodeURIComponent(args.email)}`)
          break
        }
        default:
          result = { error: 'Unknown unsubscribes subcommand. Use: list, add, delete' }
      }
      break

    case 'activities':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args['campaign-id']) params.set('campaignId', args['campaign-id'])
          if (args.type) params.set('type', args.type)
          params.set('offset', String(offset))
          params.set('limit', String(limit))
          result = await api('GET', `/activities?${params}`)
          break
        }
        default:
          result = { error: 'Unknown activities subcommand. Use: list' }
      }
      break

    case 'hooks':
      switch (sub) {
        case 'list':
          result = await api('GET', '/hooks')
          break
        case 'create': {
          if (!args['target-url']) { result = { error: '--target-url required' }; break }
          if (!args.event) { result = { error: '--event required' }; break }
          result = await api('POST', '/hooks', { targetUrl: args['target-url'], event: args.event })
          break
        }
        case 'delete': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/hooks/${args.id}`)
          break
        }
        default:
          result = { error: 'Unknown hooks subcommand. Use: list, create, delete' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          team: 'team info',
          campaigns: 'campaigns [list | get --id <id> | stats --id <id> | export --id <id>] [--offset 0] [--limit 100]',
          leads: 'leads [list | get --email <email> | add --email <email> | delete --email <email>] --campaign-id <id> [--first-name <name>] [--last-name <name>] [--company <name>]',
          unsubscribes: 'unsubscribes [list | add --email <email> | delete --email <email>] [--offset 0] [--limit 100]',
          activities: 'activities list [--campaign-id <id>] [--type emailsSent|emailsOpened|emailsClicked|emailsReplied|emailsBounced] [--offset 0] [--limit 100]',
          hooks: 'hooks [list | create --target-url <url> --event <event> | delete --id <id>]',
          options: '--dry-run --offset <n> --limit <n>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
