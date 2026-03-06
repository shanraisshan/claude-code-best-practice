#!/usr/bin/env node

const API_KEY = process.env.CALENDLY_API_KEY
const BASE_URL = 'https://api.calendly.com'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'CALENDLY_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Authorization': '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
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
  const count = args.count ? Number(args.count) : 20

  switch (cmd) {
    case 'users':
      switch (sub) {
        case 'me':
          result = await api('GET', '/users/me')
          break
        default:
          result = { error: 'Unknown users subcommand. Use: me' }
      }
      break

    case 'event-types':
      switch (sub) {
        case 'list': {
          const user = args.user
          const org = args.organization
          if (!user && !org) { result = { error: '--user or --organization URI required' }; break }
          const params = new URLSearchParams()
          if (user) params.set('user', user)
          if (org) params.set('organization', org)
          if (args.active) params.set('active', args.active)
          params.set('count', String(count))
          if (args['page-token']) params.set('page_token', args['page-token'])
          result = await api('GET', `/event_types?${params}`)
          break
        }
        case 'get': {
          const uuid = args.uuid
          if (!uuid) { result = { error: '--uuid required' }; break }
          result = await api('GET', `/event_types/${uuid}`)
          break
        }
        default:
          result = { error: 'Unknown event-types subcommand. Use: list, get' }
      }
      break

    case 'events':
      switch (sub) {
        case 'list': {
          const user = args.user
          const org = args.organization
          if (!user && !org) { result = { error: '--user or --organization URI required' }; break }
          const params = new URLSearchParams()
          if (user) params.set('user', user)
          if (org) params.set('organization', org)
          if (args['min-start']) params.set('min_start_time', args['min-start'])
          if (args['max-start']) params.set('max_start_time', args['max-start'])
          if (args.status) params.set('status', args.status)
          params.set('count', String(count))
          if (args['page-token']) params.set('page_token', args['page-token'])
          if (args.sort) params.set('sort', args.sort)
          result = await api('GET', `/scheduled_events?${params}`)
          break
        }
        case 'get': {
          const uuid = args.uuid
          if (!uuid) { result = { error: '--uuid required' }; break }
          result = await api('GET', `/scheduled_events/${uuid}`)
          break
        }
        case 'cancel': {
          const uuid = args.uuid
          if (!uuid) { result = { error: '--uuid required' }; break }
          const body = {}
          if (args.reason) body.reason = args.reason
          result = await api('POST', `/scheduled_events/${uuid}/cancellation`, body)
          break
        }
        case 'invitees': {
          const uuid = args.uuid
          if (!uuid) { result = { error: '--uuid required (event UUID)' }; break }
          const params = new URLSearchParams()
          params.set('count', String(count))
          if (args['page-token']) params.set('page_token', args['page-token'])
          if (args.email) params.set('email', args.email)
          if (args.status) params.set('status', args.status)
          result = await api('GET', `/scheduled_events/${uuid}/invitees?${params}`)
          break
        }
        default:
          result = { error: 'Unknown events subcommand. Use: list, get, cancel, invitees' }
      }
      break

    case 'availability':
      switch (sub) {
        case 'times': {
          const eventType = args['event-type']
          if (!eventType) { result = { error: '--event-type URI required' }; break }
          const startTime = args['start-time']
          const endTime = args['end-time']
          if (!startTime || !endTime) { result = { error: '--start-time and --end-time required (ISO 8601)' }; break }
          const params = new URLSearchParams({
            event_type: eventType,
            start_time: startTime,
            end_time: endTime,
          })
          result = await api('GET', `/event_type_available_times?${params}`)
          break
        }
        case 'busy': {
          const user = args.user
          if (!user) { result = { error: '--user URI required' }; break }
          const startTime = args['start-time']
          const endTime = args['end-time']
          if (!startTime || !endTime) { result = { error: '--start-time and --end-time required (ISO 8601)' }; break }
          const params = new URLSearchParams({
            user,
            start_time: startTime,
            end_time: endTime,
          })
          result = await api('GET', `/user_busy_times?${params}`)
          break
        }
        default:
          result = { error: 'Unknown availability subcommand. Use: times, busy' }
      }
      break

    case 'webhooks':
      switch (sub) {
        case 'list': {
          const org = args.organization
          const scope = args.scope || 'organization'
          if (!org) { result = { error: '--organization URI required' }; break }
          const params = new URLSearchParams({
            organization: org,
            scope,
          })
          params.set('count', String(count))
          if (args['page-token']) params.set('page_token', args['page-token'])
          result = await api('GET', `/webhook_subscriptions?${params}`)
          break
        }
        case 'create': {
          const url = args.url
          const events = args.events?.split(',')
          const org = args.organization
          const scope = args.scope || 'organization'
          if (!url || !events || !org) { result = { error: '--url, --events (comma-separated), and --organization required' }; break }
          const body = { url, events, organization: org, scope }
          if (args.user) body.user = args.user
          result = await api('POST', '/webhook_subscriptions', body)
          break
        }
        case 'delete': {
          const uuid = args.uuid
          if (!uuid) { result = { error: '--uuid required' }; break }
          result = await api('DELETE', `/webhook_subscriptions/${uuid}`)
          break
        }
        default:
          result = { error: 'Unknown webhooks subcommand. Use: list, create, delete' }
      }
      break

    case 'org':
      switch (sub) {
        case 'members': {
          const org = args.organization
          if (!org) { result = { error: '--organization URI required' }; break }
          const params = new URLSearchParams({ organization: org })
          params.set('count', String(count))
          if (args['page-token']) params.set('page_token', args['page-token'])
          result = await api('GET', `/organization_memberships?${params}`)
          break
        }
        default:
          result = { error: 'Unknown org subcommand. Use: members' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          users: 'users me',
          'event-types': 'event-types [list --user <uri> | get --uuid <id>]',
          events: 'events [list --user <uri> | get --uuid <id> | cancel --uuid <id> | invitees --uuid <id>]',
          availability: 'availability [times --event-type <uri> --start-time <iso> --end-time <iso> | busy --user <uri> --start-time <iso> --end-time <iso>]',
          webhooks: 'webhooks [list --organization <uri> | create --url <url> --events <e1,e2> --organization <uri> | delete --uuid <id>]',
          org: 'org [members --organization <uri>]',
          options: '--count <n> --page-token <token> --status <active|canceled>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
