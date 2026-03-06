#!/usr/bin/env node

const API_KEY = process.env.AMPLITUDE_API_KEY
const SECRET_KEY = process.env.AMPLITUDE_SECRET_KEY
const INGESTION_URL = 'https://api2.amplitude.com'
const QUERY_URL = 'https://amplitude.com/api/2'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'AMPLITUDE_API_KEY environment variable required' }))
  process.exit(1)
}

async function ingestApi(method, path, body) {
  if (args['dry-run']) {
    const maskedBody = body ? JSON.parse(JSON.stringify(body)) : undefined
    if (maskedBody && maskedBody.api_key) maskedBody.api_key = '***'
    return { _dry_run: true, method, url: `${INGESTION_URL}${path}`, headers: { 'Content-Type': 'application/json' }, body: maskedBody }
  }
  const res = await fetch(`${INGESTION_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { status: res.status, body: text }
  }
}

async function queryApi(method, path, params) {
  if (!SECRET_KEY) {
    return { error: 'AMPLITUDE_SECRET_KEY required for query/export operations' }
  }
  const url = params ? `${QUERY_URL}${path}?${params}` : `${QUERY_URL}${path}`
  if (args['dry-run']) {
    return { _dry_run: true, method, url, headers: { 'Authorization': '***', 'Content-Type': 'application/json' } }
  }
  const auth = Buffer.from(`${API_KEY}:${SECRET_KEY}`).toString('base64')
  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
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
    case 'track':
      switch (sub) {
        case 'event': {
          if (!args['user-id']) { result = { error: '--user-id required' }; break }
          if (!args['event-type']) { result = { error: '--event-type required' }; break }
          const event = {
            user_id: args['user-id'],
            event_type: args['event-type'],
          }
          if (args.properties) {
            event.event_properties = JSON.parse(args.properties)
          }
          result = await ingestApi('POST', '/2/httpapi', {
            api_key: API_KEY,
            events: [event],
          })
          break
        }
        case 'batch': {
          if (!args.events) { result = { error: '--events required (JSON array)' }; break }
          const events = JSON.parse(args.events)
          result = await ingestApi('POST', '/batch', {
            api_key: API_KEY,
            events,
          })
          break
        }
        default:
          result = { error: 'Unknown track subcommand. Use: event, batch' }
      }
      break

    case 'users':
      switch (sub) {
        case 'activity': {
          if (!args['user-id']) { result = { error: '--user-id required' }; break }
          const params = new URLSearchParams()
          params.set('user', args['user-id'])
          result = await queryApi('GET', '/useractivity', params)
          break
        }
        default:
          result = { error: 'Unknown users subcommand. Use: activity' }
      }
      break

    case 'export':
      switch (sub) {
        case 'events': {
          if (!args.start) { result = { error: '--start required (e.g. 20240101T00)' }; break }
          if (!args.end) { result = { error: '--end required (e.g. 20240131T23)' }; break }
          const params = new URLSearchParams()
          params.set('start', args.start)
          params.set('end', args.end)
          result = await queryApi('GET', '/export', params)
          break
        }
        default:
          result = { error: 'Unknown export subcommand. Use: events' }
      }
      break

    case 'retention':
      switch (sub) {
        case 'get': {
          if (!args.start) { result = { error: '--start required (e.g. 20240101)' }; break }
          if (!args.end) { result = { error: '--end required (e.g. 20240131)' }; break }
          const params = new URLSearchParams()
          params.set('start', args.start)
          params.set('end', args.end)
          if (args.event) {
            params.set('e', JSON.stringify([{ event_type: args.event }]))
          }
          result = await queryApi('GET', '/retention', params)
          break
        }
        default:
          result = { error: 'Unknown retention subcommand. Use: get' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          track: 'track [event --user-id <id> --event-type <type> [--properties <json>] | batch --events <json>]',
          users: 'users activity --user-id <id>',
          export: 'export events --start <YYYYMMDDThh> --end <YYYYMMDDThh>',
          retention: 'retention get --start <YYYYMMDD> --end <YYYYMMDD> [--event <type>]',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
