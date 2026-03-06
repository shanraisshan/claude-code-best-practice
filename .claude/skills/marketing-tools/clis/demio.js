#!/usr/bin/env node

const API_KEY = process.env.DEMIO_API_KEY
const API_SECRET = process.env.DEMIO_API_SECRET
const BASE_URL = 'https://my.demio.com/api/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'DEMIO_API_KEY environment variable required' }))
  process.exit(1)
}

if (!API_SECRET) {
  console.error(JSON.stringify({ error: 'DEMIO_API_SECRET environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Api-Key': '***', 'Api-Secret': '***', 'Content-Type': 'application/json', Accept: 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Api-Key': API_KEY,
      'Api-Secret': API_SECRET,
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
    case 'ping':
      result = await api('GET', '/ping')
      break

    case 'events':
      switch (sub) {
        case 'list': {
          const type = args.type
          let qs = ''
          if (type) qs = `?type=${encodeURIComponent(type)}`
          result = await api('GET', `/events${qs}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/event/${id}`)
          break
        }
        case 'date': {
          const eventId = args['event-id']
          const dateId = args['date-id']
          if (!eventId) { result = { error: '--event-id required' }; break }
          if (!dateId) { result = { error: '--date-id required' }; break }
          result = await api('GET', `/event/${eventId}/date/${dateId}`)
          break
        }
        default:
          result = { error: 'Unknown events subcommand. Use: list, get, date' }
      }
      break

    case 'register':
      switch (sub) {
        case 'create': {
          const id = args.id || args['event-id']
          const name = args.name
          const email = args.email
          if (!id) { result = { error: '--id (event id) required' }; break }
          if (!name) { result = { error: '--name required' }; break }
          if (!email) { result = { error: '--email required' }; break }
          const payload = { id, name, email }
          if (args['date-id']) payload.date_id = args['date-id']
          if (args['ref-url']) payload.ref_url = args['ref-url']
          result = await api('POST', '/event/register', payload)
          break
        }
        default:
          result = { error: 'Unknown register subcommand. Use: create' }
      }
      break

    case 'participants':
      switch (sub) {
        case 'list': {
          const dateId = args['date-id']
          if (!dateId) { result = { error: '--date-id required' }; break }
          result = await api('GET', `/date/${dateId}/participants`)
          break
        }
        default:
          result = { error: 'Unknown participants subcommand. Use: list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          ping: 'ping',
          events: 'events [list --type <upcoming|past|all> | get --id <id> | date --event-id <id> --date-id <id>]',
          register: 'register [create --id <event_id> --name <name> --email <email> --date-id <date_id>]',
          participants: 'participants [list --date-id <id>]',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
