#!/usr/bin/env node

const API_TOKEN = process.env.LIVESTORM_API_TOKEN
const BASE_URL = 'https://api.livestorm.co/v1'

if (!API_TOKEN) {
  console.error(JSON.stringify({ error: 'LIVESTORM_API_TOKEN environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
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
  const page = args.page ? Number(args.page) : 1
  const perPage = args['per-page'] ? Number(args['per-page']) : 25

  switch (cmd) {
    case 'ping':
      result = await api('GET', '/ping')
      break

    case 'events':
      switch (sub) {
        case 'list': {
          let qs = `?page[number]=${page}&page[size]=${perPage}`
          if (args.title) qs += `&filter[title]=${encodeURIComponent(args.title)}`
          result = await api('GET', `/events${qs}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/events/${id}`)
          break
        }
        case 'create': {
          const title = args.title
          if (!title) { result = { error: '--title required' }; break }
          const payload = {
            data: {
              type: 'events',
              attributes: {
                title,
                slug: args.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              },
            },
          }
          if (args.description) payload.data.attributes.description = args.description
          if (args['estimated-duration']) payload.data.attributes.estimated_duration = Number(args['estimated-duration'])
          result = await api('POST', '/events', payload)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const attrs = {}
          if (args.title) attrs.title = args.title
          if (args.description) attrs.description = args.description
          if (args.slug) attrs.slug = args.slug
          result = await api('PATCH', `/events/${id}`, {
            data: { type: 'events', id, attributes: attrs },
          })
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/events/${id}`)
          break
        }
        case 'people': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          let qs = `?page[number]=${page}&page[size]=${perPage}`
          result = await api('GET', `/events/${id}/people${qs}`)
          break
        }
        default:
          result = { error: 'Unknown events subcommand. Use: list, get, create, update, delete, people' }
      }
      break

    case 'sessions':
      switch (sub) {
        case 'list': {
          let qs = `?page[number]=${page}&page[size]=${perPage}`
          result = await api('GET', `/sessions${qs}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/sessions/${id}`)
          break
        }
        case 'create': {
          const eventId = args['event-id']
          if (!eventId) { result = { error: '--event-id required' }; break }
          const payload = {
            data: {
              type: 'sessions',
              attributes: {},
            },
          }
          if (args['estimated-started-at']) payload.data.attributes.estimated_started_at = args['estimated-started-at']
          if (args.timezone) payload.data.attributes.timezone = args.timezone
          result = await api('POST', `/events/${eventId}/sessions`, payload)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/sessions/${id}`)
          break
        }
        case 'people': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          let qs = `?page[number]=${page}&page[size]=${perPage}`
          result = await api('GET', `/sessions/${id}/people${qs}`)
          break
        }
        case 'register': {
          const id = args.id
          if (!id) { result = { error: '--id (session id) required' }; break }
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const fields = { email }
          if (args['first-name']) fields.first_name = args['first-name']
          if (args['last-name']) fields.last_name = args['last-name']
          result = await api('POST', `/sessions/${id}/people`, {
            data: {
              type: 'people',
              attributes: { fields },
            },
          })
          break
        }
        case 'unregister': {
          const id = args.id
          if (!id) { result = { error: '--id (session id) required' }; break }
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          result = await api('DELETE', `/sessions/${id}/people?filter[email]=${encodeURIComponent(email)}`)
          break
        }
        case 'chat': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          let qs = `?page[number]=${page}&page[size]=${perPage}`
          result = await api('GET', `/sessions/${id}/chat-messages${qs}`)
          break
        }
        case 'questions': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          let qs = `?page[number]=${page}&page[size]=${perPage}`
          result = await api('GET', `/sessions/${id}/questions${qs}`)
          break
        }
        case 'recordings': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/sessions/${id}/recordings`)
          break
        }
        default:
          result = { error: 'Unknown sessions subcommand. Use: list, get, create, delete, people, register, unregister, chat, questions, recordings' }
      }
      break

    case 'people':
      switch (sub) {
        case 'list': {
          let qs = `?page[number]=${page}&page[size]=${perPage}`
          if (args.email) qs += `&filter[email]=${encodeURIComponent(args.email)}`
          result = await api('GET', `/people${qs}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/people/${id}`)
          break
        }
        default:
          result = { error: 'Unknown people subcommand. Use: list, get' }
      }
      break

    case 'webhooks':
      switch (sub) {
        case 'list': {
          result = await api('GET', '/webhooks')
          break
        }
        case 'create': {
          const url = args.url
          if (!url) { result = { error: '--url required' }; break }
          const eventName = args.event || 'attendance'
          result = await api('POST', '/webhooks', {
            data: {
              type: 'webhooks',
              attributes: {
                target_url: url,
                event_name: eventName,
              },
            },
          })
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

    case 'organization':
      result = await api('GET', '/organization')
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          ping: 'ping',
          events: 'events [list | get --id <id> | create --title <t> | update --id <id> --title <t> | delete --id <id> | people --id <id>]',
          sessions: 'sessions [list | get --id <id> | create --event-id <id> | delete --id <id> | people --id <id> | register --id <id> --email <e> | unregister --id <id> --email <e> | chat --id <id> | questions --id <id> | recordings --id <id>]',
          people: 'people [list --email <e> | get --id <id>]',
          webhooks: 'webhooks [list | create --url <url> --event <name> | delete --id <id>]',
          organization: 'organization',
          options: '--page <n> --per-page <n>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
