#!/usr/bin/env node

const API_KEY = process.env.SAVVYCAL_API_KEY
const BASE_URL = 'https://api.savvycal.com/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'SAVVYCAL_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
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
  const limit = args.limit ? Number(args.limit) : 20

  switch (cmd) {
    case 'me':
      result = await api('GET', '/me')
      break

    case 'links':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          if (args.after) params.set('after', args.after)
          if (args.before) params.set('before', args.before)
          result = await api('GET', `/scheduling-links?${params}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/scheduling-links/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const body = { name }
          if (args.slug) body.slug = args.slug
          if (args.duration) body.duration_minutes = Number(args.duration)
          result = await api('POST', '/scheduling-links', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.slug) body.slug = args.slug
          if (args.duration) body.duration_minutes = Number(args.duration)
          result = await api('PATCH', `/scheduling-links/${id}`, body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/scheduling-links/${id}`)
          break
        }
        case 'duplicate': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', `/scheduling-links/${id}/duplicate`)
          break
        }
        case 'toggle': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', `/scheduling-links/${id}/toggle`)
          break
        }
        case 'slots': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const params = new URLSearchParams()
          if (args['start-time']) params.set('start_time', args['start-time'])
          if (args['end-time']) params.set('end_time', args['end-time'])
          const qs = params.toString()
          result = await api('GET', `/scheduling-links/${id}/slots${qs ? '?' + qs : ''}`)
          break
        }
        default:
          result = { error: 'Unknown links subcommand. Use: list, get, create, update, delete, duplicate, toggle, slots' }
      }
      break

    case 'events':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          if (args.after) params.set('after', args.after)
          if (args.before) params.set('before', args.before)
          result = await api('GET', `/events?${params}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/events/${id}`)
          break
        }
        case 'create': {
          const linkId = args['link-id']
          const startAt = args['start-at']
          const name = args.name
          const email = args.email
          if (!linkId || !startAt || !name || !email) {
            result = { error: '--link-id, --start-at, --name, and --email required' }
            break
          }
          result = await api('POST', '/events', {
            scheduling_link_id: linkId,
            start_at: startAt,
            name,
            email,
          })
          break
        }
        case 'cancel': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', `/events/${id}/cancel`)
          break
        }
        default:
          result = { error: 'Unknown events subcommand. Use: list, get, create, cancel' }
      }
      break

    case 'webhooks':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          if (args.after) params.set('after', args.after)
          if (args.before) params.set('before', args.before)
          result = await api('GET', `/webhooks?${params}`)
          break
        }
        case 'create': {
          const url = args.url
          const events = args.events?.split(',')
          if (!url || !events) { result = { error: '--url and --events (comma-separated) required' }; break }
          result = await api('POST', '/webhooks', { url, events })
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/webhooks/${id}`)
          break
        }
        default:
          result = { error: 'Unknown webhooks subcommand. Use: list, create, delete' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          me: 'me',
          links: 'links [list | get --id <id> | create --name <name> | update --id <id> | delete --id <id> | duplicate --id <id> | toggle --id <id> | slots --id <id>]',
          events: 'events [list | get --id <id> | create --link-id <id> --start-at <iso> --name <name> --email <email> | cancel --id <id>]',
          webhooks: 'webhooks [list | create --url <url> --events <e1,e2> | delete --id <id>]',
          options: '--limit <n> --after <cursor> --before <cursor>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
