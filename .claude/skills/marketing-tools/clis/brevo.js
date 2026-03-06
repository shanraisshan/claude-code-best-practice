#!/usr/bin/env node

const API_KEY = process.env.BREVO_API_KEY
const BASE_URL = 'https://api.brevo.com/v3'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'BREVO_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'api-key': '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'api-key': API_KEY,
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
  const limit = args.limit ? Number(args.limit) : 50
  const offset = args.offset ? Number(args.offset) : 0

  switch (cmd) {
    case 'account':
      switch (sub) {
        case 'get':
          result = await api('GET', '/account')
          break
        default:
          result = { error: 'Unknown account subcommand. Use: get' }
      }
      break

    case 'contacts':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          if (args.sort) params.set('sort', args.sort)
          result = await api('GET', `/contacts?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id || args.email
          if (!id) { result = { error: '--id or --email required' }; break }
          result = await api('GET', `/contacts/${encodeURIComponent(id)}`)
          break
        }
        case 'create': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const body = { email }
          if (args['first-name'] || args['last-name']) {
            body.attributes = {}
            if (args['first-name']) body.attributes.FIRSTNAME = args['first-name']
            if (args['last-name']) body.attributes.LASTNAME = args['last-name']
          }
          if (args['list-ids']) body.listIds = args['list-ids'].split(',').map(Number)
          result = await api('POST', '/contacts', body)
          break
        }
        case 'update': {
          const id = args.id || args.email
          if (!id) { result = { error: '--id or --email required' }; break }
          const body = {}
          if (args['first-name'] || args['last-name']) {
            body.attributes = {}
            if (args['first-name']) body.attributes.FIRSTNAME = args['first-name']
            if (args['last-name']) body.attributes.LASTNAME = args['last-name']
          }
          if (args['list-ids']) body.listIds = args['list-ids'].split(',').map(Number)
          if (args['unlink-list-ids']) body.unlinkListIds = args['unlink-list-ids'].split(',').map(Number)
          result = await api('PUT', `/contacts/${encodeURIComponent(id)}`, body)
          break
        }
        case 'delete': {
          const id = args.id || args.email
          if (!id) { result = { error: '--id or --email required' }; break }
          result = await api('DELETE', `/contacts/${encodeURIComponent(id)}`)
          break
        }
        case 'import': {
          const emails = args.emails?.split(',')
          if (!emails) { result = { error: '--emails required (comma-separated)' }; break }
          const body = {
            jsonBody: emails.map(e => ({ email: e.trim() })),
          }
          if (args['list-ids']) body.listIds = args['list-ids'].split(',').map(Number)
          result = await api('POST', '/contacts/import', body)
          break
        }
        default:
          result = { error: 'Unknown contacts subcommand. Use: list, get, create, update, delete, import' }
      }
      break

    case 'lists':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          if (args.sort) params.set('sort', args.sort)
          result = await api('GET', `/contacts/lists?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/contacts/lists/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const body = { name, folderId: args.folder ? Number(args.folder) : 1 }
          result = await api('POST', '/contacts/lists', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.folder) body.folderId = Number(args.folder)
          result = await api('PUT', `/contacts/lists/${id}`, body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/contacts/lists/${id}`)
          break
        }
        case 'contacts': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          result = await api('GET', `/contacts/lists/${id}/contacts?${params.toString()}`)
          break
        }
        case 'add-contacts': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const emails = args.emails?.split(',')
          if (!emails) { result = { error: '--emails required (comma-separated)' }; break }
          result = await api('POST', `/contacts/lists/${id}/contacts/add`, { emails })
          break
        }
        case 'remove-contacts': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const emails = args.emails?.split(',')
          if (!emails) { result = { error: '--emails required (comma-separated)' }; break }
          result = await api('POST', `/contacts/lists/${id}/contacts/remove`, { emails })
          break
        }
        default:
          result = { error: 'Unknown lists subcommand. Use: list, get, create, update, delete, contacts, add-contacts, remove-contacts' }
      }
      break

    case 'email':
      switch (sub) {
        case 'send': {
          const senderEmail = args.from
          const to = args.to
          const subject = args.subject
          if (!senderEmail) { result = { error: '--from required' }; break }
          if (!to) { result = { error: '--to required' }; break }
          if (!subject) { result = { error: '--subject required' }; break }
          const body = {
            sender: { email: senderEmail },
            to: to.split(',').map(e => ({ email: e.trim() })),
            subject,
          }
          if (args['sender-name']) body.sender.name = args['sender-name']
          if (args.html) body.htmlContent = args.html
          if (args.text) body.textContent = args.text
          if (!args.html && !args.text) body.textContent = ''
          if (args['reply-to']) body.replyTo = { email: args['reply-to'] }
          if (args.tags) body.tags = args.tags.split(',')
          result = await api('POST', '/smtp/email', body)
          break
        }
        default:
          result = { error: 'Unknown email subcommand. Use: send' }
      }
      break

    case 'campaigns':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          if (args.type) params.set('type', args.type)
          if (args.status) params.set('status', args.status)
          if (args.sort) params.set('sort', args.sort)
          result = await api('GET', `/emailCampaigns?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/emailCampaigns/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const body = {
            name,
            sender: { email: args.from || '' },
            subject: args.subject || '',
          }
          if (args['sender-name']) body.sender.name = args['sender-name']
          if (args.html) body.htmlContent = args.html
          if (args['list-ids']) body.recipients = { listIds: args['list-ids'].split(',').map(Number) }
          result = await api('POST', '/emailCampaigns', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.subject) body.subject = args.subject
          if (args.html) body.htmlContent = args.html
          result = await api('PUT', `/emailCampaigns/${id}`, body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/emailCampaigns/${id}`)
          break
        }
        case 'send-now': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', `/emailCampaigns/${id}/sendNow`)
          break
        }
        case 'send-test': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const emails = args.emails?.split(',')
          if (!emails) { result = { error: '--emails required (comma-separated)' }; break }
          result = await api('POST', `/emailCampaigns/${id}/sendTest`, { emailTo: emails })
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, get, create, update, delete, send-now, send-test' }
      }
      break

    case 'sms':
      switch (sub) {
        case 'send': {
          const sender = args.from
          const recipient = args.to
          const content = args.content
          if (!sender) { result = { error: '--from required (sender name)' }; break }
          if (!recipient) { result = { error: '--to required (phone number)' }; break }
          if (!content) { result = { error: '--content required' }; break }
          result = await api('POST', '/transactionalSMS/sms', {
            sender,
            recipient,
            content,
            type: args.type || 'transactional',
          })
          break
        }
        case 'campaigns': {
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          params.set('offset', String(offset))
          if (args.status) params.set('status', args.status)
          result = await api('GET', `/smsCampaigns?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown sms subcommand. Use: send, campaigns' }
      }
      break

    case 'senders':
      switch (sub) {
        case 'list':
          result = await api('GET', '/senders')
          break
        case 'create': {
          const name = args.name
          const email = args.email
          if (!name) { result = { error: '--name required' }; break }
          if (!email) { result = { error: '--email required' }; break }
          result = await api('POST', '/senders', { name, email })
          break
        }
        default:
          result = { error: 'Unknown senders subcommand. Use: list, create' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          account: 'account [get]',
          contacts: 'contacts [list | get --email <email> | create --email <email> | update --email <email> | delete --email <email> | import --emails <e1,e2>]',
          lists: 'lists [list | get --id <id> | create --name <name> | delete --id <id> | contacts --id <id> | add-contacts --id <id> --emails <e1,e2> | remove-contacts --id <id> --emails <e1,e2>]',
          email: 'email [send --from <from> --to <to> --subject <subj>]',
          campaigns: 'campaigns [list | get --id <id> | create --name <name> | send-now --id <id> | send-test --id <id> --emails <e1,e2>]',
          sms: 'sms [send --from <name> --to <phone> --content <msg> | campaigns]',
          senders: 'senders [list | create --name <name> --email <email>]',
          options: '--limit <n> --offset <n> --status <status>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
