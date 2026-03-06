#!/usr/bin/env node

const API_KEY = process.env.INTERCOM_API_KEY
const BASE_URL = 'https://api.intercom.io'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'INTERCOM_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json', Accept: 'application/json', 'Intercom-Version': '2.11' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Intercom-Version': '2.11',
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
  const perPage = args['per-page'] ? Number(args['per-page']) : undefined

  switch (cmd) {
    case 'contacts':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (perPage) params.set('per_page', String(perPage))
          if (args['starting-after']) params.set('starting_after', args['starting-after'])
          const qs = params.toString()
          result = await api('GET', `/contacts${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/contacts/${id}`)
          break
        }
        case 'create': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const body = {
            role: args.role || 'user',
            email,
          }
          if (args.name) body.name = args.name
          if (args.phone) body.phone = args.phone
          result = await api('POST', '/contacts', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.email) body.email = args.email
          if (args.phone) body.phone = args.phone
          if (args.role) body.role = args.role
          result = await api('PUT', `/contacts/${id}`, body)
          break
        }
        case 'search': {
          const field = args.field
          const operator = args.operator || '='
          const value = args.value
          if (!field || !value) { result = { error: '--field and --value required' }; break }
          const body = {
            query: { field, operator, value },
          }
          if (perPage) body.pagination = { per_page: perPage }
          result = await api('POST', '/contacts/search', body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/contacts/${id}`)
          break
        }
        case 'tag': {
          const id = args.id
          const tagId = args['tag-id']
          if (!id || !tagId) { result = { error: '--id (contact ID) and --tag-id required' }; break }
          result = await api('POST', `/contacts/${id}/tags`, { id: tagId })
          break
        }
        case 'untag': {
          const id = args.id
          const tagId = args['tag-id']
          if (!id || !tagId) { result = { error: '--id (contact ID) and --tag-id required' }; break }
          result = await api('DELETE', `/contacts/${id}/tags/${tagId}`)
          break
        }
        default:
          result = { error: 'Unknown contacts subcommand. Use: list, get, create, update, search, delete, tag, untag' }
      }
      break

    case 'conversations':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (perPage) params.set('per_page', String(perPage))
          if (args['starting-after']) params.set('starting_after', args['starting-after'])
          const qs = params.toString()
          result = await api('GET', `/conversations${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/conversations/${id}`)
          break
        }
        case 'search': {
          const field = args.field
          const operator = args.operator || '='
          const value = args.value
          if (!field || value === undefined) { result = { error: '--field and --value required' }; break }
          const body = {
            query: { field, operator, value },
          }
          if (perPage) body.pagination = { per_page: perPage }
          result = await api('POST', '/conversations/search', body)
          break
        }
        case 'reply': {
          const id = args.id
          const body = args.body
          const adminId = args['admin-id']
          if (!id || !body || !adminId) { result = { error: '--id, --body, and --admin-id required' }; break }
          result = await api('POST', `/conversations/${id}/reply`, {
            message_type: 'comment',
            type: 'admin',
            admin_id: adminId,
            body,
          })
          break
        }
        case 'close': {
          const id = args.id
          const adminId = args['admin-id']
          if (!id || !adminId) { result = { error: '--id and --admin-id required' }; break }
          result = await api('POST', `/conversations/${id}/parts`, {
            message_type: 'close',
            type: 'admin',
            admin_id: adminId,
            body: args.body || '',
          })
          break
        }
        default:
          result = { error: 'Unknown conversations subcommand. Use: list, get, search, reply, close' }
      }
      break

    case 'messages':
      switch (sub) {
        case 'create': {
          const messageType = args.type || 'inapp'
          const body = args.body
          const adminId = args['admin-id']
          const to = args.to
          if (!body || !adminId || !to) { result = { error: '--body, --admin-id, and --to (user ID) required' }; break }
          result = await api('POST', '/messages', {
            message_type: messageType,
            body,
            from: { type: 'admin', id: adminId },
            to: { type: 'user', id: to },
          })
          break
        }
        default:
          result = { error: 'Unknown messages subcommand. Use: create --body <text> --admin-id <id> --to <user_id> [--type inapp|email]' }
      }
      break

    case 'companies':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (perPage) params.set('per_page', String(perPage))
          if (args.page) params.set('page', args.page)
          const qs = params.toString()
          result = await api('GET', `/companies${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/companies/${id}`)
          break
        }
        case 'create': {
          const companyId = args['company-id']
          const name = args.name
          if (!companyId) { result = { error: '--company-id required' }; break }
          const body = { company_id: companyId }
          if (name) body.name = name
          if (args.plan) body.plan = args.plan
          if (args.industry) body.industry = args.industry
          result = await api('POST', '/companies', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.plan) body.plan = args.plan
          if (args.industry) body.industry = args.industry
          result = await api('PUT', `/companies/${id}`, body)
          break
        }
        default:
          result = { error: 'Unknown companies subcommand. Use: list, get, create, update' }
      }
      break

    case 'tags':
      switch (sub) {
        case 'list':
          result = await api('GET', '/tags')
          break
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          result = await api('POST', '/tags', { name })
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/tags/${id}`)
          break
        }
        default:
          result = { error: 'Unknown tags subcommand. Use: list, create, delete' }
      }
      break

    case 'articles':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (perPage) params.set('per_page', String(perPage))
          if (args.page) params.set('page', args.page)
          const qs = params.toString()
          result = await api('GET', `/articles${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/articles/${id}`)
          break
        }
        case 'create': {
          const title = args.title
          const authorId = args['author-id']
          if (!title || !authorId) { result = { error: '--title and --author-id required' }; break }
          const body = {
            title,
            author_id: Number(authorId),
            state: args.state || 'draft',
          }
          if (args.body) body.body = args.body
          result = await api('POST', '/articles', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.title) body.title = args.title
          if (args.body) body.body = args.body
          if (args.state) body.state = args.state
          result = await api('PUT', `/articles/${id}`, body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/articles/${id}`)
          break
        }
        default:
          result = { error: 'Unknown articles subcommand. Use: list, get, create, update, delete' }
      }
      break

    case 'admins':
      switch (sub) {
        case 'list':
          result = await api('GET', '/admins')
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/admins/${id}`)
          break
        }
        default:
          result = { error: 'Unknown admins subcommand. Use: list, get' }
      }
      break

    case 'events':
      switch (sub) {
        case 'create': {
          const eventName = args.name
          const userId = args['user-id']
          if (!eventName || !userId) { result = { error: '--name and --user-id required' }; break }
          const body = {
            event_name: eventName,
            user_id: userId,
            created_at: args['created-at'] ? Number(args['created-at']) : Math.floor(Date.now() / 1000),
          }
          if (args.metadata) {
            try { body.metadata = JSON.parse(args.metadata) } catch { body.metadata = {} }
          }
          result = await api('POST', '/events', body)
          break
        }
        case 'list': {
          const userId = args['user-id']
          if (!userId) { result = { error: '--user-id required' }; break }
          const params = new URLSearchParams({ type: 'user', user_id: userId })
          if (perPage) params.set('per_page', String(perPage))
          result = await api('GET', `/events?${params}`)
          break
        }
        default:
          result = { error: 'Unknown events subcommand. Use: create, list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          contacts: 'contacts [list | get --id <id> | create --email <email> | update --id <id> | search --field <f> --value <v> | delete --id <id> | tag --id <id> --tag-id <id> | untag --id <id> --tag-id <id>]',
          conversations: 'conversations [list | get --id <id> | search --field <f> --value <v> | reply --id <id> --body <text> --admin-id <id> | close --id <id> --admin-id <id>]',
          messages: 'messages [create --body <text> --admin-id <id> --to <user_id>]',
          companies: 'companies [list | get --id <id> | create --company-id <id> --name <name> | update --id <id>]',
          tags: 'tags [list | create --name <name> | delete --id <id>]',
          articles: 'articles [list | get --id <id> | create --title <title> --author-id <id> | update --id <id> | delete --id <id>]',
          admins: 'admins [list | get --id <id>]',
          events: 'events [create --name <name> --user-id <id> | list --user-id <id>]',
          options: '--per-page <n> --starting-after <cursor> --page <n>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
