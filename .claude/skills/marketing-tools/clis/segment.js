#!/usr/bin/env node

const WRITE_KEY = process.env.SEGMENT_WRITE_KEY
const ACCESS_TOKEN = process.env.SEGMENT_ACCESS_TOKEN
const TRACKING_URL = 'https://api.segment.io/v1'
const PROFILE_URL = 'https://profiles.segment.com/v1'

if (!WRITE_KEY && !ACCESS_TOKEN) {
  console.error(JSON.stringify({ error: 'SEGMENT_WRITE_KEY (for tracking) or SEGMENT_ACCESS_TOKEN (for profiles) environment variable required' }))
  process.exit(1)
}

async function trackApi(method, path, body) {
  if (!WRITE_KEY) {
    return { error: 'SEGMENT_WRITE_KEY required for tracking operations' }
  }
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${TRACKING_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const auth = Buffer.from(`${WRITE_KEY}:`).toString('base64')
  const res = await fetch(`${TRACKING_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Basic ${auth}`,
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

async function profileApi(method, path) {
  if (!ACCESS_TOKEN) {
    return { error: 'SEGMENT_ACCESS_TOKEN required for profile operations' }
  }
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${PROFILE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json' } }
  }
  const auth = Buffer.from(`${ACCESS_TOKEN}:`).toString('base64')
  const res = await fetch(`${PROFILE_URL}${path}`, {
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
          if (!args.event) { result = { error: '--event required' }; break }
          const body = {
            userId: args['user-id'],
            event: args.event,
          }
          if (args.properties) {
            try { body.properties = JSON.parse(args.properties) } catch { result = { error: 'Invalid JSON in --properties' }; break }
          }
          result = await trackApi('POST', '/track', body)
          break
        }
        default:
          result = { error: 'Unknown track subcommand. Use: event' }
      }
      break

    case 'identify':
      switch (sub) {
        case 'user': {
          if (!args['user-id']) { result = { error: '--user-id required' }; break }
          const body = { userId: args['user-id'] }
          if (args.traits) {
            try { body.traits = JSON.parse(args.traits) } catch { result = { error: 'Invalid JSON in --traits' }; break }
          }
          result = await trackApi('POST', '/identify', body)
          break
        }
        default:
          result = { error: 'Unknown identify subcommand. Use: user' }
      }
      break

    case 'page':
      switch (sub) {
        case 'view': {
          if (!args['user-id']) { result = { error: '--user-id required' }; break }
          const body = { userId: args['user-id'] }
          if (args.name) body.name = args.name
          if (args.properties) {
            try { body.properties = JSON.parse(args.properties) } catch { result = { error: 'Invalid JSON in --properties' }; break }
          }
          result = await trackApi('POST', '/page', body)
          break
        }
        default:
          result = { error: 'Unknown page subcommand. Use: view' }
      }
      break

    case 'batch':
      switch (sub) {
        case 'send': {
          if (!args.events) { result = { error: '--events required (JSON array)' }; break }
          let batch
          try { batch = JSON.parse(args.events) } catch { result = { error: 'Invalid JSON in --events' }; break }
          result = await trackApi('POST', '/batch', { batch })
          break
        }
        default:
          result = { error: 'Unknown batch subcommand. Use: send' }
      }
      break

    case 'profiles':
      switch (sub) {
        case 'traits': {
          if (!args['space-id']) { result = { error: '--space-id required' }; break }
          if (!args['user-id']) { result = { error: '--user-id required' }; break }
          result = await profileApi('GET', `/spaces/${args['space-id']}/collections/users/profiles/user_id:${args['user-id']}/traits`)
          break
        }
        case 'events': {
          if (!args['space-id']) { result = { error: '--space-id required' }; break }
          if (!args['user-id']) { result = { error: '--user-id required' }; break }
          result = await profileApi('GET', `/spaces/${args['space-id']}/collections/users/profiles/user_id:${args['user-id']}/events`)
          break
        }
        default:
          result = { error: 'Unknown profiles subcommand. Use: traits, events' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          track: 'track event --user-id <id> --event <name> [--properties <json>]',
          identify: 'identify user --user-id <id> [--traits <json>]',
          page: 'page view --user-id <id> [--name <name>] [--properties <json>]',
          batch: 'batch send --events <json_array>',
          profiles: 'profiles [traits|events] --space-id <id> --user-id <id>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
