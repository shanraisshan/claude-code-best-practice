#!/usr/bin/env node

const API_KEY = process.env.CLOSE_API_KEY
const BASE_URL = 'https://api.close.com/api/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'CLOSE_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const url = `${BASE_URL}${path}`
  if (args['dry-run']) {
    return { _dry_run: true, method, url, headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ***' }, body: body || undefined }
  }
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ${btoa(API_KEY + ':')}`,
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
    case 'leads':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.query) params.set('query', args.query)
          if (args.page) params.set('_skip', (parseInt(args.page) - 1) * 100)
          const qs = params.toString()
          result = await api('GET', `/lead/${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/lead/${id}/`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const body = { name }
          if (args.url) body.url = args.url
          if (args.description) body.description = args.description
          result = await api('POST', '/lead/', body)
          break
        }
        default:
          result = { error: 'Unknown leads subcommand. Use: list, get, create' }
      }
      break

    case 'contacts':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args['lead-id']) params.set('lead_id', args['lead-id'])
          const qs = params.toString()
          result = await api('GET', `/contact/${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/contact/${id}/`)
          break
        }
        case 'create': {
          const leadId = args['lead-id']
          const name = args.name
          if (!leadId) { result = { error: '--lead-id required' }; break }
          if (!name) { result = { error: '--name required' }; break }
          const body = { lead_id: leadId, name }
          if (args.email) {
            body.emails = [{ email: args.email, type: 'office' }]
          }
          if (args.phone) {
            body.phones = [{ phone: args.phone, type: 'office' }]
          }
          result = await api('POST', '/contact/', body)
          break
        }
        default:
          result = { error: 'Unknown contacts subcommand. Use: list, get, create' }
      }
      break

    case 'opportunities':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.status) params.set('status', args.status)
          const qs = params.toString()
          result = await api('GET', `/opportunity/${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/opportunity/${id}/`)
          break
        }
        case 'create': {
          const leadId = args['lead-id']
          const value = args.value
          if (!leadId) { result = { error: '--lead-id required' }; break }
          if (!value) { result = { error: '--value required (in cents)' }; break }
          const body = { lead_id: leadId, value: parseInt(value) }
          if (args.status) body.status_type = args.status
          result = await api('POST', '/opportunity/', body)
          break
        }
        default:
          result = { error: 'Unknown opportunities subcommand. Use: list, get, create' }
      }
      break

    case 'activities':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args['lead-id']) params.set('lead_id', args['lead-id'])
          if (args.type) params.set('_type__type', args.type)
          const qs = params.toString()
          result = await api('GET', `/activity/${qs ? '?' + qs : ''}`)
          break
        }
        default:
          result = { error: 'Unknown activities subcommand. Use: list' }
      }
      break

    case 'tasks':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args['assigned-to']) params.set('assigned_to', args['assigned-to'])
          if (args['is-complete']) params.set('is_complete', args['is-complete'])
          const qs = params.toString()
          result = await api('GET', `/task/${qs ? '?' + qs : ''}`)
          break
        }
        case 'create': {
          const leadId = args['lead-id']
          const text = args.text
          if (!leadId) { result = { error: '--lead-id required' }; break }
          if (!text) { result = { error: '--text required' }; break }
          const body = { lead_id: leadId, text, _type: 'lead' }
          if (args['assigned-to']) body.assigned_to = args['assigned-to']
          if (args.date) body.date = args.date
          result = await api('POST', '/task/', body)
          break
        }
        default:
          result = { error: 'Unknown tasks subcommand. Use: list, create' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          leads: {
            list: 'leads list [--query <q>] [--page <n>]',
            get: 'leads get --id <id>',
            create: 'leads create --name <name> [--url <url>] [--description <desc>]',
          },
          contacts: {
            list: 'contacts list [--lead-id <id>]',
            get: 'contacts get --id <id>',
            create: 'contacts create --lead-id <id> --name <name> [--email <email>] [--phone <phone>]',
          },
          opportunities: {
            list: 'opportunities list [--status <status>]',
            get: 'opportunities get --id <id>',
            create: 'opportunities create --lead-id <id> --value <cents> [--status <status>]',
          },
          activities: {
            list: 'activities list [--lead-id <id>] [--type <type>]',
          },
          tasks: {
            list: 'tasks list [--assigned-to <user-id>] [--is-complete <bool>]',
            create: 'tasks create --lead-id <id> --text <text> [--assigned-to <user-id>] [--date <date>]',
          },
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
