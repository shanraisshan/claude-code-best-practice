#!/usr/bin/env node

const APP_KEY = process.env.CUSTOMERIO_APP_KEY
const SITE_ID = process.env.CUSTOMERIO_SITE_ID
const API_KEY = process.env.CUSTOMERIO_API_KEY

const TRACK_URL = 'https://track.customer.io/api/v1'
const APP_URL = 'https://api.customer.io/v1'

const hasTrackAuth = SITE_ID && API_KEY
const hasAppAuth = APP_KEY

if (!hasTrackAuth && !hasAppAuth) {
  console.error(JSON.stringify({ error: 'CUSTOMERIO_APP_KEY (for App API) or CUSTOMERIO_SITE_ID + CUSTOMERIO_API_KEY (for Track API) environment variables required' }))
  process.exit(1)
}

const basicAuth = hasTrackAuth ? Buffer.from(`${SITE_ID}:${API_KEY}`).toString('base64') : null

async function trackApi(method, path, body) {
  if (!hasTrackAuth) {
    return { error: 'Track API requires CUSTOMERIO_SITE_ID and CUSTOMERIO_API_KEY environment variables' }
  }
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${TRACK_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${TRACK_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Basic ${basicAuth}`,
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

async function appApi(method, path, body) {
  if (!hasAppAuth) {
    return { error: 'App API requires CUSTOMERIO_APP_KEY environment variable' }
  }
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${APP_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${APP_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${APP_KEY}`,
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
    case 'customers':
      switch (sub) {
        case 'identify': {
          const customerId = rest[0] || args.id
          if (!customerId) { result = { error: 'Customer ID required (positional arg or --id)' }; break }
          const body = {}
          if (args.email) body.email = args.email
          if (args['first-name']) body.first_name = args['first-name']
          if (args['last-name']) body.last_name = args['last-name']
          if (args['created-at']) body.created_at = parseInt(args['created-at'])
          if (args.plan) body.plan = args.plan
          if (args.data) Object.assign(body, JSON.parse(args.data))
          result = await trackApi('PUT', `/customers/${customerId}`, body)
          break
        }
        case 'get': {
          const customerId = rest[0] || args.id
          if (!customerId) { result = { error: 'Customer ID required (positional arg or --id)' }; break }
          result = await appApi('GET', `/customers/${customerId}/attributes`)
          break
        }
        case 'delete': {
          const customerId = rest[0] || args.id
          if (!customerId) { result = { error: 'Customer ID required (positional arg or --id)' }; break }
          result = await trackApi('DELETE', `/customers/${customerId}`)
          break
        }
        case 'track-event': {
          const customerId = rest[0] || args.id
          if (!customerId) { result = { error: 'Customer ID required (positional arg or --id)' }; break }
          if (!args.name) { result = { error: '--name required (event name)' }; break }
          const body = { name: args.name }
          if (args.data) body.data = JSON.parse(args.data)
          result = await trackApi('POST', `/customers/${customerId}/events`, body)
          break
        }
        default:
          result = { error: 'Unknown customers subcommand. Use: identify, get, delete, track-event' }
      }
      break

    case 'campaigns':
      switch (sub) {
        case 'list':
          result = await appApi('GET', '/campaigns')
          break
        case 'get': {
          const campaignId = rest[0] || args.id
          if (!campaignId) { result = { error: 'Campaign ID required (positional arg or --id)' }; break }
          result = await appApi('GET', `/campaigns/${campaignId}`)
          break
        }
        case 'metrics': {
          const campaignId = rest[0] || args.id
          if (!campaignId) { result = { error: 'Campaign ID required (positional arg or --id)' }; break }
          result = await appApi('GET', `/campaigns/${campaignId}/metrics`)
          break
        }
        case 'trigger': {
          const campaignId = rest[0] || args.id
          if (!campaignId) { result = { error: 'Campaign ID required (positional arg or --id)' }; break }
          const body = {}
          if (args.emails) body.emails = args.emails.split(',')
          if (args.ids) body.ids = args.ids.split(',')
          if (args.data) body.data = JSON.parse(args.data)
          result = await appApi('POST', `/campaigns/${campaignId}/triggers`, body)
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, get, metrics, trigger' }
      }
      break

    case 'send':
      switch (sub) {
        case 'email': {
          const body = {
            transactional_message_id: args['message-id'],
            to: args.to,
            identifiers: {},
          }
          if (args['identifier-id']) body.identifiers.id = args['identifier-id']
          if (args['identifier-email']) body.identifiers.email = args['identifier-email']
          if (args.data) body.message_data = JSON.parse(args.data)
          if (args.from) body.from = args.from
          if (args.subject) body.subject = args.subject
          if (args.body) body.body = args.body
          result = await appApi('POST', '/send/email', body)
          break
        }
        default:
          result = { error: 'Unknown send subcommand. Use: email' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          customers: 'customers [identify|get|delete|track-event] <customer_id> [--email <email>] [--first-name <name>] [--plan <plan>] [--data <json>] [--name <event>]',
          campaigns: 'campaigns [list|get|metrics|trigger] [campaign_id] [--emails <e1,e2>] [--ids <id1,id2>] [--data <json>]',
          send: 'send email --message-id <id> --to <email> [--identifier-id <id>] [--identifier-email <email>] [--data <json>]',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
