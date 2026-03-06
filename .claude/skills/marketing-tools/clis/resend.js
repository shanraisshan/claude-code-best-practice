#!/usr/bin/env node

const API_KEY = process.env.RESEND_API_KEY
const BASE_URL = 'https://api.resend.com'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'RESEND_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
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
    case 'send': {
      if (!args.from || !args.to || !args.subject) { result = { error: '--from, --to, and --subject required' }; break }
      const body = { from: args.from, to: args.to?.split(','), subject: args.subject }
      if (args.html) body.html = args.html
      if (args.text) body.text = args.text
      if (args.cc) body.cc = args.cc.split(',')
      if (args.bcc) body.bcc = args.bcc.split(',')
      if (args['reply-to']) body.reply_to = args['reply-to']
      if (args['scheduled-at']) body.scheduled_at = args['scheduled-at']
      if (args.tags) body.tags = args.tags.split(',').map(t => {
        const [name, value] = t.split(':')
        return { name, value }
      })
      result = await api('POST', '/emails', body)
      break
    }

    case 'emails':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          result = await api('GET', `/emails?${params}`)
          break
        }
        case 'get':
          result = await api('GET', `/emails/${rest[0]}`)
          break
        case 'cancel':
          result = await api('POST', `/emails/${rest[0]}/cancel`)
          break
        default:
          result = { error: 'Unknown emails subcommand. Use: list, get, cancel' }
      }
      break

    case 'domains':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          result = await api('GET', `/domains?${params}`)
          break
        }
        case 'get':
          result = await api('GET', `/domains/${rest[0]}`)
          break
        case 'create':
          result = await api('POST', '/domains', { name: args.name, region: args.region })
          break
        case 'verify':
          result = await api('POST', `/domains/${rest[0]}/verify`)
          break
        case 'delete':
          result = await api('DELETE', `/domains/${rest[0]}`)
          break
        default:
          result = { error: 'Unknown domains subcommand. Use: list, get, create, verify, delete' }
      }
      break

    case 'api-keys':
      switch (sub) {
        case 'list':
          result = await api('GET', '/api-keys')
          break
        case 'create': {
          const body = { name: args.name }
          if (args.permission) body.permission = args.permission
          if (args.domain_id) body.domain_id = args.domain_id
          result = await api('POST', '/api-keys', body)
          break
        }
        case 'delete':
          result = await api('DELETE', `/api-keys/${rest[0]}`)
          break
        default:
          result = { error: 'Unknown api-keys subcommand. Use: list, create, delete' }
      }
      break

    case 'audiences':
      switch (sub) {
        case 'list':
          result = await api('GET', '/audiences')
          break
        case 'get':
          result = await api('GET', `/audiences/${rest[0]}`)
          break
        case 'create':
          result = await api('POST', '/audiences', { name: args.name })
          break
        case 'delete':
          result = await api('DELETE', `/audiences/${rest[0]}`)
          break
        default:
          result = { error: 'Unknown audiences subcommand. Use: list, get, create, delete' }
      }
      break

    case 'contacts': {
      const audienceId = sub
      if (!audienceId) { result = { error: 'Audience ID required as subcommand arg' }; break }
      const action = rest[0]
      const contactId = rest[1]
      switch (action) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          result = await api('GET', `/audiences/${audienceId}/contacts?${params}`)
          break
        }
        case 'get':
          if (!rest[1]) { result = { error: 'Contact ID required' }; break }
          result = await api('GET', `/audiences/${audienceId}/contacts/${contactId}`)
          break
        case 'create': {
          const body = { email: args.email }
          if (args['first-name']) body.first_name = args['first-name']
          if (args['last-name']) body.last_name = args['last-name']
          if (args.unsubscribed) body.unsubscribed = args.unsubscribed === 'true'
          result = await api('POST', `/audiences/${audienceId}/contacts`, body)
          break
        }
        case 'update': {
          if (!rest[1]) { result = { error: 'Contact ID required' }; break }
          const body = {}
          if (args['first-name']) body.first_name = args['first-name']
          if (args['last-name']) body.last_name = args['last-name']
          if (args.unsubscribed !== undefined) body.unsubscribed = args.unsubscribed === 'true'
          result = await api('PATCH', `/audiences/${audienceId}/contacts/${contactId}`, body)
          break
        }
        case 'delete':
          if (!rest[1]) { result = { error: 'Contact ID required' }; break }
          result = await api('DELETE', `/audiences/${audienceId}/contacts/${contactId}`)
          break
        default:
          result = { error: 'Unknown contacts action. Use: list, get, create, update, delete' }
      }
      break
    }

    case 'webhooks':
      switch (sub) {
        case 'list':
          result = await api('GET', '/webhooks')
          break
        case 'get':
          result = await api('GET', `/webhooks/${rest[0]}`)
          break
        case 'create': {
          if (!args.url) { result = { error: '--url required (webhook URL)' }; break }
          const events = args.events?.split(',') || ['email.sent', 'email.delivered', 'email.bounced']
          result = await api('POST', '/webhooks', { url: args.url, events })
          break
        }
        case 'delete':
          result = await api('DELETE', `/webhooks/${rest[0]}`)
          break
        default:
          result = { error: 'Unknown webhooks subcommand. Use: list, get, create, delete' }
      }
      break

    case 'batch': {
      let emails
      try {
        emails = JSON.parse(args.emails || '[]')
      } catch (e) {
        result = { error: 'Invalid JSON for --emails: ' + e.message }; break
      }
      result = await api('POST', '/emails/batch', emails)
      break
    }

    case 'templates':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          if (args.after) params.set('after', args.after)
          if (args.before) params.set('before', args.before)
          result = await api('GET', `/templates?${params}`)
          break
        }
        case 'get':
          result = await api('GET', `/templates/${rest[0]}`)
          break
        case 'create': {
          const body = { name: args.name, html: args.html }
          if (args.alias) body.alias = args.alias
          if (args.from) body.from = args.from
          if (args.subject) body.subject = args.subject
          if (args['reply-to']) body.reply_to = args['reply-to']
          if (args.text) body.text = args.text
          if (args.variables) {
            try { body.variables = JSON.parse(args.variables) } catch (e) { result = { error: 'Invalid JSON for --variables: ' + e.message }; break }
          }
          result = await api('POST', '/templates', body)
          break
        }
        case 'update': {
          const body = {}
          if (args.name) body.name = args.name
          if (args.html) body.html = args.html
          if (args.alias) body.alias = args.alias
          if (args.from) body.from = args.from
          if (args.subject) body.subject = args.subject
          if (args['reply-to']) body.reply_to = args['reply-to']
          if (args.text) body.text = args.text
          if (args.variables) {
            try { body.variables = JSON.parse(args.variables) } catch (e) { result = { error: 'Invalid JSON for --variables: ' + e.message }; break }
          }
          result = await api('PATCH', `/templates/${rest[0]}`, body)
          break
        }
        case 'delete':
          result = await api('DELETE', `/templates/${rest[0]}`)
          break
        case 'publish':
          result = await api('POST', `/templates/${rest[0]}/publish`)
          break
        case 'duplicate':
          result = await api('POST', `/templates/${rest[0]}/duplicate`)
          break
        default:
          result = { error: 'Unknown templates subcommand. Use: list, get, create, update, delete, publish, duplicate' }
      }
      break

    case 'broadcasts':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          result = await api('GET', `/broadcasts?${params}`)
          break
        }
        case 'get':
          result = await api('GET', `/broadcasts/${rest[0]}`)
          break
        case 'create': {
          const body = { segment_id: args['segment-id'], from: args.from, subject: args.subject }
          if (args.html) body.html = args.html
          if (args.text) body.text = args.text
          if (args['reply-to']) body.reply_to = args['reply-to']
          if (args.name) body.name = args.name
          result = await api('POST', '/broadcasts', body)
          break
        }
        case 'send': {
          const body = {}
          if (args['scheduled-at']) body.scheduled_at = args['scheduled-at']
          result = await api('POST', `/broadcasts/${rest[0]}/send`, body)
          break
        }
        case 'delete':
          result = await api('DELETE', `/broadcasts/${rest[0]}`)
          break
        default:
          result = { error: 'Unknown broadcasts subcommand. Use: list, get, create, send, delete' }
      }
      break

    case 'segments':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          result = await api('GET', `/segments?${params}`)
          break
        }
        case 'get':
          result = await api('GET', `/segments/${rest[0]}`)
          break
        case 'create':
          result = await api('POST', '/segments', { name: args.name })
          break
        case 'delete':
          result = await api('DELETE', `/segments/${rest[0]}`)
          break
        default:
          result = { error: 'Unknown segments subcommand. Use: list, get, create, delete' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          send: 'send --from <email> --to <email> --subject <subject> --html <html>',
          emails: 'emails [list|get|cancel] [id]',
          domains: 'domains [list|get|create|verify|delete] [id] [--name <name>]',
          'api-keys': 'api-keys [list|create|delete] [id] [--name <name>]',
          audiences: 'audiences [list|get|create|delete] [id] [--name <name>]',
          contacts: 'contacts <audience_id> [list|get|create|update|delete] [contact_id] [--email <email>]',
          webhooks: 'webhooks [list|get|create|delete] [id] [--endpoint <url>]',
          batch: 'batch --emails <json_array>',
          templates: 'templates [list|get|create|update|delete|publish|duplicate] [id] [--name <name>] [--html <html>] [--variables <json>]',
          broadcasts: 'broadcasts [list|get|create|send|delete] [id] [--segment-id <id>] [--from <email>] [--subject <subject>]',
          segments: 'segments [list|get|create|delete] [id] [--name <name>]',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
