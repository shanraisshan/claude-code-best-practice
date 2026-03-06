#!/usr/bin/env node

const PUBLIC_KEY = process.env.PARTNERSTACK_PUBLIC_KEY
const SECRET_KEY = process.env.PARTNERSTACK_SECRET_KEY
const BASE_URL = 'https://api.partnerstack.com/api/v2'

if (!PUBLIC_KEY || !SECRET_KEY) {
  console.error(JSON.stringify({ error: 'PARTNERSTACK_PUBLIC_KEY and PARTNERSTACK_SECRET_KEY environment variables required' }))
  process.exit(1)
}

const AUTH = 'Basic ' + Buffer.from(`${PUBLIC_KEY}:${SECRET_KEY}`).toString('base64')

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': AUTH,
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
const limit = args.limit ? Number(args.limit) : 10

function buildQuery() {
  const params = new URLSearchParams()
  if (args.limit) params.set('limit', args.limit)
  if (args.after) params.set('starting_after', args.after)
  if (args.before) params.set('ending_before', args.before)
  if (args['order-by']) params.set('order_by', args['order-by'])
  return params.toString() ? `?${params.toString()}` : ''
}

async function main() {
  let result

  switch (cmd) {
    case 'partnerships':
      switch (sub) {
        case 'list':
          result = await api('GET', `/partnerships${buildQuery()}`)
          break
        case 'get': {
          const key = args.key
          if (!key) { result = { error: '--key required (partnership key)' }; break }
          result = await api('GET', `/partnerships/${key}`)
          break
        }
        case 'create': {
          const email = args.email
          const group = args.group
          if (!email) { result = { error: '--email required' }; break }
          if (!group) { result = { error: '--group required (group key)' }; break }
          const body = { email, group_key: group }
          if (args.name) body.name = args.name
          if (args['first-name']) body.first_name = args['first-name']
          if (args['last-name']) body.last_name = args['last-name']
          result = await api('POST', '/partnerships', body)
          break
        }
        case 'update': {
          const key = args.key
          if (!key) { result = { error: '--key required (partnership key)' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.group) body.group_key = args.group
          result = await api('PATCH', `/partnerships/${key}`, body)
          break
        }
        default:
          result = { error: 'Unknown partnerships subcommand. Use: list, get, create, update' }
      }
      break

    case 'customers':
      switch (sub) {
        case 'list':
          result = await api('GET', `/customers${buildQuery()}`)
          break
        case 'get': {
          const key = args.key
          if (!key) { result = { error: '--key required (customer key)' }; break }
          result = await api('GET', `/customers/${key}`)
          break
        }
        case 'create': {
          const email = args.email
          const partnerKey = args['partner-key']
          if (!email) { result = { error: '--email required' }; break }
          if (!partnerKey) { result = { error: '--partner-key required' }; break }
          const body = { email, partner_key: partnerKey }
          if (args.name) body.name = args.name
          if (args['customer-key']) body.customer_key = args['customer-key']
          result = await api('POST', '/customers', body)
          break
        }
        case 'update': {
          const key = args.key
          if (!key) { result = { error: '--key required (customer key)' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.email) body.email = args.email
          if (args['partner-key']) body.partner_key = args['partner-key']
          result = await api('PATCH', `/customers/${key}`, body)
          break
        }
        case 'delete': {
          const key = args.key
          if (!key) { result = { error: '--key required (customer key)' }; break }
          result = await api('DELETE', `/customers/${key}`)
          break
        }
        default:
          result = { error: 'Unknown customers subcommand. Use: list, get, create, update, delete' }
      }
      break

    case 'transactions':
      switch (sub) {
        case 'list':
          result = await api('GET', `/transactions${buildQuery()}`)
          break
        case 'get': {
          const key = args.key
          if (!key) { result = { error: '--key required (transaction key)' }; break }
          result = await api('GET', `/transactions/${key}`)
          break
        }
        case 'create': {
          const customerKey = args['customer-key']
          const amount = args.amount
          if (!customerKey) { result = { error: '--customer-key required' }; break }
          if (!amount) { result = { error: '--amount required (in cents)' }; break }
          const body = {
            customer_key: customerKey,
            amount: Number(amount),
          }
          if (args.currency) body.currency = args.currency
          if (args.category) body.category = args.category
          if (args['product-key']) body.product_key = args['product-key']
          result = await api('POST', '/transactions', body)
          break
        }
        case 'delete': {
          const key = args.key
          if (!key) { result = { error: '--key required (transaction key)' }; break }
          result = await api('DELETE', `/transactions/${key}`)
          break
        }
        default:
          result = { error: 'Unknown transactions subcommand. Use: list, get, create, delete' }
      }
      break

    case 'deals':
      switch (sub) {
        case 'list':
          result = await api('GET', `/deals${buildQuery()}`)
          break
        case 'get': {
          const key = args.key
          if (!key) { result = { error: '--key required (deal key)' }; break }
          result = await api('GET', `/deals/${key}`)
          break
        }
        case 'create': {
          const partnerKey = args['partner-key']
          const name = args.name
          if (!partnerKey) { result = { error: '--partner-key required' }; break }
          if (!name) { result = { error: '--name required' }; break }
          const body = { partner_key: partnerKey, name }
          if (args.amount) body.amount = Number(args.amount)
          if (args.currency) body.currency = args.currency
          if (args.stage) body.stage = args.stage
          result = await api('POST', '/deals', body)
          break
        }
        case 'update': {
          const key = args.key
          if (!key) { result = { error: '--key required (deal key)' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.amount) body.amount = Number(args.amount)
          if (args.stage) body.stage = args.stage
          if (args.status) body.status = args.status
          result = await api('PATCH', `/deals/${key}`, body)
          break
        }
        case 'archive': {
          const key = args.key
          if (!key) { result = { error: '--key required (deal key)' }; break }
          result = await api('DELETE', `/deals/${key}`)
          break
        }
        default:
          result = { error: 'Unknown deals subcommand. Use: list, get, create, update, archive' }
      }
      break

    case 'actions':
      switch (sub) {
        case 'list':
          result = await api('GET', `/actions${buildQuery()}`)
          break
        case 'create': {
          const customerKey = args['customer-key']
          const actionKey = args['action-key']
          if (!customerKey) { result = { error: '--customer-key required' }; break }
          if (!actionKey) { result = { error: '--action-key required' }; break }
          const body = {
            customer_key: customerKey,
            key: actionKey,
          }
          if (args.value) body.value = Number(args.value)
          result = await api('POST', '/actions', body)
          break
        }
        default:
          result = { error: 'Unknown actions subcommand. Use: list, create' }
      }
      break

    case 'rewards':
      switch (sub) {
        case 'list':
          result = await api('GET', `/rewards${buildQuery()}`)
          break
        case 'create': {
          const partnerKey = args['partner-key']
          const amount = args.amount
          if (!partnerKey) { result = { error: '--partner-key required' }; break }
          if (!amount) { result = { error: '--amount required (in cents)' }; break }
          const body = {
            partner_key: partnerKey,
            amount: Number(amount),
          }
          if (args.description) body.description = args.description
          if (args.currency) body.currency = args.currency
          result = await api('POST', '/rewards', body)
          break
        }
        default:
          result = { error: 'Unknown rewards subcommand. Use: list, create' }
      }
      break

    case 'leads':
      switch (sub) {
        case 'list':
          result = await api('GET', `/leads${buildQuery()}`)
          break
        case 'get': {
          const key = args.key
          if (!key) { result = { error: '--key required (lead key)' }; break }
          result = await api('GET', `/leads/${key}`)
          break
        }
        case 'create': {
          const partnerKey = args['partner-key']
          const email = args.email
          if (!partnerKey) { result = { error: '--partner-key required' }; break }
          if (!email) { result = { error: '--email required' }; break }
          const body = { partner_key: partnerKey, email }
          if (args.name) body.name = args.name
          if (args.company) body.company = args.company
          result = await api('POST', '/leads', body)
          break
        }
        case 'update': {
          const key = args.key
          if (!key) { result = { error: '--key required (lead key)' }; break }
          const body = {}
          if (args.email) body.email = args.email
          if (args.name) body.name = args.name
          if (args.status) body.status = args.status
          result = await api('PATCH', `/leads/${key}`, body)
          break
        }
        default:
          result = { error: 'Unknown leads subcommand. Use: list, get, create, update' }
      }
      break

    case 'groups':
      switch (sub) {
        case 'list':
          result = await api('GET', `/groups${buildQuery()}`)
          break
        default:
          result = { error: 'Unknown groups subcommand. Use: list' }
      }
      break

    case 'webhooks':
      switch (sub) {
        case 'list':
          result = await api('GET', `/webhooks${buildQuery()}`)
          break
        case 'get': {
          const key = args.key
          if (!key) { result = { error: '--key required (webhook key)' }; break }
          result = await api('GET', `/webhooks/${key}`)
          break
        }
        case 'create': {
          const target = args.target
          if (!target) { result = { error: '--target required (webhook URL)' }; break }
          const body = { target }
          if (args.events) body.events = args.events.split(',')
          result = await api('POST', '/webhooks', body)
          break
        }
        case 'delete': {
          const key = args.key
          if (!key) { result = { error: '--key required (webhook key)' }; break }
          result = await api('DELETE', `/webhooks/${key}`)
          break
        }
        default:
          result = { error: 'Unknown webhooks subcommand. Use: list, get, create, delete' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          partnerships: 'partnerships [list | get --key <key> | create --email <email> --group <group-key> | update --key <key>]',
          customers: 'customers [list | get --key <key> | create --email <email> --partner-key <key> | update --key <key> | delete --key <key>]',
          transactions: 'transactions [list | get --key <key> | create --customer-key <key> --amount <cents> | delete --key <key>]',
          deals: 'deals [list | get --key <key> | create --partner-key <key> --name <name> | update --key <key> | archive --key <key>]',
          actions: 'actions [list | create --customer-key <key> --action-key <key> [--value <n>]]',
          rewards: 'rewards [list | create --partner-key <key> --amount <cents>]',
          leads: 'leads [list | get --key <key> | create --partner-key <key> --email <email> | update --key <key>]',
          groups: 'groups [list]',
          webhooks: 'webhooks [list | get --key <key> | create --target <url> [--events <evt1,evt2>] | delete --key <key>]',
          options: '--limit <n> --after <cursor> --before <cursor> --order-by <field>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
