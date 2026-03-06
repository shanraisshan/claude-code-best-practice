#!/usr/bin/env node

const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY
const APP_ID = process.env.ONESIGNAL_APP_ID
const BASE_URL = 'https://api.onesignal.com'

if (!REST_API_KEY) {
  console.error(JSON.stringify({ error: 'ONESIGNAL_REST_API_KEY environment variable required' }))
  process.exit(1)
}

if (!APP_ID) {
  console.error(JSON.stringify({ error: 'ONESIGNAL_APP_ID environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const headers = {
    'Authorization': `Basic ${REST_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { ...headers, Authorization: '***' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
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
  const limit = args.limit ? Number(args.limit) : 50
  const offset = args.offset ? Number(args.offset) : 0

  switch (cmd) {
    case 'notifications':
      switch (sub) {
        case 'send': {
          const message = args.message
          if (!message) { result = { error: '--message required' }; break }
          const payload = {
            app_id: APP_ID,
            contents: { en: message },
          }
          if (args.heading) payload.headings = { en: args.heading }
          if (args.url) payload.url = args.url
          if (args.data) {
            try { payload.data = JSON.parse(args.data) } catch { payload.data = { value: args.data } }
          }
          if (args.segment) {
            payload.included_segments = args.segment.split(',')
          } else if (args.emails) {
            payload.include_email_tokens = args.emails.split(',')
          } else if (args['player-ids']) {
            payload.include_player_ids = args['player-ids'].split(',')
          } else if (args.aliases) {
            try {
              payload.include_aliases = JSON.parse(args.aliases)
            } catch {
              payload.include_aliases = { external_id: args.aliases.split(',') }
            }
            payload.target_channel = args.channel || 'push'
          } else {
            payload.included_segments = ['Subscribed Users']
          }
          if (args['send-after']) payload.send_after = args['send-after']
          if (args.ttl) payload.ttl = Number(args.ttl)
          result = await api('POST', '/api/v1/notifications', payload)
          break
        }
        case 'list': {
          result = await api('GET', `/api/v1/notifications?app_id=${APP_ID}&limit=${limit}&offset=${offset}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/api/v1/notifications/${id}?app_id=${APP_ID}`)
          break
        }
        case 'cancel': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/api/v1/notifications/${id}?app_id=${APP_ID}`)
          break
        }
        default:
          result = { error: 'Unknown notifications subcommand. Use: send, list, get, cancel' }
      }
      break

    case 'segments':
      switch (sub) {
        case 'list': {
          result = await api('GET', `/api/v1/apps/${APP_ID}/segments?offset=${offset}&limit=${limit}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          let filters
          try { filters = args.filters ? JSON.parse(args.filters) : [{ field: 'session_count', relation: '>', value: '0' }] } catch { result = { error: 'Invalid JSON in --filters' }; break }
          result = await api('POST', `/api/v1/apps/${APP_ID}/segments`, { name, filters })
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/api/v1/apps/${APP_ID}/segments/${id}`)
          break
        }
        default:
          result = { error: 'Unknown segments subcommand. Use: list, create, delete' }
      }
      break

    case 'users':
      switch (sub) {
        case 'get': {
          const aliasLabel = args['alias-label'] || 'external_id'
          const aliasId = args['alias-id']
          if (!aliasId) { result = { error: '--alias-id required' }; break }
          result = await api('GET', `/api/v1/apps/${APP_ID}/users/by/${aliasLabel}/${aliasId}`)
          break
        }
        case 'create': {
          const payload = {}
          if (args['external-id']) {
            payload.identity = { external_id: args['external-id'] }
          }
          if (args.email) {
            payload.subscriptions = [{ type: 'Email', token: args.email }]
          }
          if (args.tags) {
            try { payload.tags = JSON.parse(args.tags) } catch { result = { error: 'Invalid --tags JSON' }; break }
          }
          result = await api('POST', `/api/v1/apps/${APP_ID}/users`, payload)
          break
        }
        case 'delete': {
          const aliasLabel = args['alias-label'] || 'external_id'
          const aliasId = args['alias-id']
          if (!aliasId) { result = { error: '--alias-id required' }; break }
          result = await api('DELETE', `/api/v1/apps/${APP_ID}/users/by/${aliasLabel}/${aliasId}`)
          break
        }
        default:
          result = { error: 'Unknown users subcommand. Use: get, create, delete' }
      }
      break

    case 'templates':
      switch (sub) {
        case 'list': {
          result = await api('GET', `/api/v1/templates?app_id=${APP_ID}&limit=${limit}&offset=${offset}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/api/v1/templates/${id}?app_id=${APP_ID}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const payload = { app_id: APP_ID, name }
          if (args.message) payload.contents = { en: args.message }
          if (args.heading) payload.headings = { en: args.heading }
          result = await api('POST', '/api/v1/templates', payload)
          break
        }
        default:
          result = { error: 'Unknown templates subcommand. Use: list, get, create' }
      }
      break

    case 'app':
      switch (sub) {
        case 'get': {
          result = await api('GET', `/api/v1/apps/${APP_ID}`)
          break
        }
        default:
          result = { error: 'Unknown app subcommand. Use: get' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          notifications: 'notifications [send --message <msg> --segment <s> | list | get --id <id> | cancel --id <id>]',
          segments: 'segments [list | create --name <n> --filters <json> | delete --id <id>]',
          users: 'users [get --alias-id <id> | create --external-id <id> --email <e> | delete --alias-id <id>]',
          templates: 'templates [list | get --id <id> | create --name <n> --message <msg>]',
          app: 'app [get]',
          options: '--limit <n> --offset <n>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
