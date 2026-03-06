#!/usr/bin/env node

const API_KEY = process.env.ACTIVECAMPAIGN_API_KEY
const API_URL = process.env.ACTIVECAMPAIGN_API_URL

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'ACTIVECAMPAIGN_API_KEY environment variable required' }))
  process.exit(1)
}

if (!API_URL) {
  console.error(JSON.stringify({ error: 'ACTIVECAMPAIGN_API_URL environment variable required (e.g. https://yourname.api-us1.com)' }))
  process.exit(1)
}

const BASE_URL = `${API_URL.replace(/\/$/, '')}/api/3`

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Api-Token': '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Api-Token': API_KEY,
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
  const offset = args.offset ? Number(args.offset) : 0

  switch (cmd) {
    case 'contacts':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          if (args.email) params.set('email', args.email)
          if (args.search) params.set('search', args.search)
          if (args['list-id']) params.set('listid', args['list-id'])
          if (args.status) params.set('status', args.status)
          result = await api('GET', `/contacts?${params.toString()}`)
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
          const contact = { email }
          if (args['first-name']) contact.firstName = args['first-name']
          if (args['last-name']) contact.lastName = args['last-name']
          if (args.phone) contact.phone = args.phone
          result = await api('POST', '/contacts', { contact })
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const contact = {}
          if (args.email) contact.email = args.email
          if (args['first-name']) contact.firstName = args['first-name']
          if (args['last-name']) contact.lastName = args['last-name']
          if (args.phone) contact.phone = args.phone
          result = await api('PUT', `/contacts/${id}`, { contact })
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/contacts/${id}`)
          break
        }
        case 'sync': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const contact = { email }
          if (args['first-name']) contact.firstName = args['first-name']
          if (args['last-name']) contact.lastName = args['last-name']
          if (args.phone) contact.phone = args.phone
          result = await api('POST', '/contact/sync', { contact })
          break
        }
        default:
          result = { error: 'Unknown contacts subcommand. Use: list, get, create, update, delete, sync' }
      }
      break

    case 'lists':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          result = await api('GET', `/lists?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/lists/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const list = { name }
          if (args['string-id']) list.stringid = args['string-id']
          if (args['sender-url']) list.sender_url = args['sender-url']
          if (args['sender-reminder']) list.sender_reminder = args['sender-reminder']
          result = await api('POST', '/lists', { list })
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/lists/${id}`)
          break
        }
        case 'subscribe': {
          const listId = args['list-id'] || args.id
          const contactId = args['contact-id']
          if (!listId) { result = { error: '--list-id required' }; break }
          if (!contactId) { result = { error: '--contact-id required' }; break }
          result = await api('POST', '/contactLists', {
            contactList: { list: listId, contact: contactId, status: 1 }
          })
          break
        }
        case 'unsubscribe': {
          const listId = args['list-id'] || args.id
          const contactId = args['contact-id']
          if (!listId) { result = { error: '--list-id required' }; break }
          if (!contactId) { result = { error: '--contact-id required' }; break }
          result = await api('POST', '/contactLists', {
            contactList: { list: listId, contact: contactId, status: 2 }
          })
          break
        }
        default:
          result = { error: 'Unknown lists subcommand. Use: list, get, create, delete, subscribe, unsubscribe' }
      }
      break

    case 'campaigns':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          result = await api('GET', `/campaigns?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/campaigns/${id}`)
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, get' }
      }
      break

    case 'deals':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          if (args.search) params.set('search', args.search)
          if (args.stage) params.set('filters[stage]', args.stage)
          if (args.owner) params.set('filters[owner]', args.owner)
          result = await api('GET', `/deals?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/deals/${id}`)
          break
        }
        case 'create': {
          const title = args.title
          if (!title) { result = { error: '--title required' }; break }
          const deal = { title }
          if (args.value) deal.value = Number(args.value)
          if (args.currency) deal.currency = args.currency
          if (args.pipeline) deal.group = args.pipeline
          if (args.stage) deal.stage = args.stage
          if (args.owner) deal.owner = args.owner
          if (args['contact-id']) deal.contact = args['contact-id']
          result = await api('POST', '/deals', { deal })
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const deal = {}
          if (args.title) deal.title = args.title
          if (args.value) deal.value = Number(args.value)
          if (args.stage) deal.stage = args.stage
          if (args.owner) deal.owner = args.owner
          if (args.status) deal.status = Number(args.status)
          result = await api('PUT', `/deals/${id}`, { deal })
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/deals/${id}`)
          break
        }
        default:
          result = { error: 'Unknown deals subcommand. Use: list, get, create, update, delete' }
      }
      break

    case 'automations':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          result = await api('GET', `/automations?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/automations/${id}`)
          break
        }
        case 'add-contact': {
          const automationId = args.id
          const contactId = args['contact-id']
          if (!automationId) { result = { error: '--id required (automation ID)' }; break }
          if (!contactId) { result = { error: '--contact-id required (contact ID, not email)' }; break }
          result = await api('POST', '/contactAutomations', {
            contactAutomation: { contact: contactId, automation: automationId }
          })
          break
        }
        default:
          result = { error: 'Unknown automations subcommand. Use: list, get, add-contact' }
      }
      break

    case 'tags':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          if (args.search) params.set('search', args.search)
          result = await api('GET', `/tags?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/tags/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          result = await api('POST', '/tags', {
            tag: { tag: name, tagType: args.type || 'contact' }
          })
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/tags/${id}`)
          break
        }
        case 'add-to-contact': {
          const tagId = args['tag-id']
          const contactId = args['contact-id']
          if (!tagId) { result = { error: '--tag-id required' }; break }
          if (!contactId) { result = { error: '--contact-id required' }; break }
          result = await api('POST', '/contactTags', {
            contactTag: { contact: contactId, tag: tagId }
          })
          break
        }
        case 'remove-from-contact': {
          const contactTagId = args.id
          if (!contactTagId) { result = { error: '--id required (contactTag ID)' }; break }
          result = await api('DELETE', `/contactTags/${contactTagId}`)
          break
        }
        default:
          result = { error: 'Unknown tags subcommand. Use: list, get, create, delete, add-to-contact, remove-from-contact' }
      }
      break

    case 'pipelines':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          result = await api('GET', `/dealGroups?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/dealGroups/${id}`)
          break
        }
        default:
          result = { error: 'Unknown pipelines subcommand. Use: list, get' }
      }
      break

    case 'webhooks':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          result = await api('GET', `/webhooks?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/webhooks/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          const url = args.url
          if (!name) { result = { error: '--name required' }; break }
          if (!url) { result = { error: '--url required' }; break }
          const events = args.events?.split(',') || ['subscribe']
          const sources = args.sources?.split(',') || ['public', 'admin', 'api', 'system']
          result = await api('POST', '/webhooks', {
            webhook: { name, url, events, sources }
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
          result = { error: 'Unknown webhooks subcommand. Use: list, get, create, delete' }
      }
      break

    case 'users':
      switch (sub) {
        case 'me':
          result = await api('GET', '/users/me')
          break
        case 'list':
          result = await api('GET', '/users')
          break
        default:
          result = { error: 'Unknown users subcommand. Use: me, list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          contacts: 'contacts [list | get --id <id> | create --email <email> | update --id <id> | delete --id <id> | sync --email <email>]',
          lists: 'lists [list | get --id <id> | create --name <name> | delete --id <id> | subscribe --list-id <lid> --contact-id <cid> | unsubscribe --list-id <lid> --contact-id <cid>]',
          campaigns: 'campaigns [list | get --id <id>]',
          deals: 'deals [list | get --id <id> | create --title <title> | update --id <id> | delete --id <id>]',
          automations: 'automations [list | get --id <id> | add-contact --id <aid> --email <email>]',
          tags: 'tags [list | get --id <id> | create --name <name> | delete --id <id> | add-to-contact --tag-id <tid> --contact-id <cid>]',
          pipelines: 'pipelines [list | get --id <id>]',
          webhooks: 'webhooks [list | get --id <id> | create --name <name> --url <url> | delete --id <id>]',
          users: 'users [me | list]',
          options: '--limit <n> --offset <n> --search <query> --email <email>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
