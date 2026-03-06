#!/usr/bin/env node

const API_KEY = process.env.PADDLE_API_KEY
const BASE_URL = process.env.PADDLE_SANDBOX === 'true'
  ? 'https://sandbox-api.paddle.com'
  : 'https://api.paddle.com'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'PADDLE_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
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

function buildQuery() {
  const params = new URLSearchParams()
  if (args.status) params.set('status', args.status)
  if (args.after) params.set('after', args.after)
  if (args['per-page']) params.set('per_page', args['per-page'])
  if (args['order-by']) params.set('order_by', args['order-by'])
  return params.toString() ? `?${params.toString()}` : ''
}

async function main() {
  let result

  switch (cmd) {
    case 'products':
      switch (sub) {
        case 'list':
          result = await api('GET', `/products${buildQuery()}`)
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/products/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          const taxCategory = args['tax-category']
          if (!name) { result = { error: '--name required' }; break }
          if (!taxCategory) { result = { error: '--tax-category required (e.g. standard, digital-goods, saas)' }; break }
          const body = { name, tax_category: taxCategory }
          if (args.description) body.description = args.description
          if (args['image-url']) body.image_url = args['image-url']
          result = await api('POST', '/products', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.description) body.description = args.description
          if (args.status) body.status = args.status
          if (args['tax-category']) body.tax_category = args['tax-category']
          result = await api('PATCH', `/products/${id}`, body)
          break
        }
        default:
          result = { error: 'Unknown products subcommand. Use: list, get, create, update' }
      }
      break

    case 'prices':
      switch (sub) {
        case 'list':
          result = await api('GET', `/prices${buildQuery()}`)
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/prices/${id}`)
          break
        }
        case 'create': {
          const productId = args['product-id']
          const amount = args.amount
          const currency = args.currency || 'USD'
          if (!productId) { result = { error: '--product-id required' }; break }
          if (!amount) { result = { error: '--amount required (in lowest denomination, e.g. cents)' }; break }
          const body = {
            product_id: productId,
            description: args.description || 'Price',
            unit_price: { amount, currency_code: currency },
          }
          if (args.interval && args.frequency) {
            body.billing_cycle = {
              interval: args.interval,
              frequency: Number(args.frequency),
            }
          }
          result = await api('POST', '/prices', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.description) body.description = args.description
          if (args.amount && args.currency) {
            body.unit_price = { amount: args.amount, currency_code: args.currency }
          }
          if (args.status) body.status = args.status
          result = await api('PATCH', `/prices/${id}`, body)
          break
        }
        default:
          result = { error: 'Unknown prices subcommand. Use: list, get, create, update' }
      }
      break

    case 'customers':
      switch (sub) {
        case 'list':
          result = await api('GET', `/customers${buildQuery()}`)
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/customers/${id}`)
          break
        }
        case 'create': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const body = { email }
          if (args.name) body.name = args.name
          result = await api('POST', '/customers', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.email) body.email = args.email
          if (args.status) body.status = args.status
          result = await api('PATCH', `/customers/${id}`, body)
          break
        }
        default:
          result = { error: 'Unknown customers subcommand. Use: list, get, create, update' }
      }
      break

    case 'subscriptions':
      switch (sub) {
        case 'list':
          result = await api('GET', `/subscriptions${buildQuery()}`)
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/subscriptions/${id}`)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args['proration-billing-mode']) body.proration_billing_mode = args['proration-billing-mode']
          if (args['scheduled-change']) {
            try { body.scheduled_change = JSON.parse(args['scheduled-change']) } catch { result = { error: 'Invalid JSON in --scheduled-change' }; break }
          }
          result = await api('PATCH', `/subscriptions/${id}`, body)
          break
        }
        case 'cancel': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = { effective_from: args['effective-from'] || 'next_billing_period' }
          result = await api('POST', `/subscriptions/${id}/cancel`, body)
          break
        }
        case 'pause': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args['resume-at']) body.resume_at = args['resume-at']
          result = await api('POST', `/subscriptions/${id}/pause`, body)
          break
        }
        case 'resume': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = { effective_from: args['effective-from'] || 'immediately' }
          result = await api('POST', `/subscriptions/${id}/resume`, body)
          break
        }
        default:
          result = { error: 'Unknown subscriptions subcommand. Use: list, get, update, cancel, pause, resume' }
      }
      break

    case 'transactions':
      switch (sub) {
        case 'list':
          result = await api('GET', `/transactions${buildQuery()}`)
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/transactions/${id}`)
          break
        }
        case 'create': {
          const items = args.items
          if (!items) { result = { error: '--items required (JSON array of {price_id, quantity})' }; break }
          let parsedItems
          try { parsedItems = JSON.parse(items) } catch { result = { error: 'Invalid JSON in --items' }; break }
          const body = { items: parsedItems }
          if (args['customer-id']) body.customer_id = args['customer-id']
          result = await api('POST', '/transactions', body)
          break
        }
        default:
          result = { error: 'Unknown transactions subcommand. Use: list, get, create' }
      }
      break

    case 'discounts':
      switch (sub) {
        case 'list':
          result = await api('GET', `/discounts${buildQuery()}`)
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/discounts/${id}`)
          break
        }
        case 'create': {
          const amount = args.amount
          const type = args.type
          if (!amount) { result = { error: '--amount required' }; break }
          if (!type) { result = { error: '--type required (flat, flat_per_seat, percentage)' }; break }
          const body = {
            amount,
            type,
            description: args.description || 'Discount',
          }
          if (args.code) body.code = args.code
          if (args['max-uses']) body.maximum_recurring_intervals = Number(args['max-uses'])
          if (args['currency-code']) body.currency_code = args['currency-code']
          result = await api('POST', '/discounts', body)
          break
        }
        default:
          result = { error: 'Unknown discounts subcommand. Use: list, get, create' }
      }
      break

    case 'adjustments':
      switch (sub) {
        case 'list':
          result = await api('GET', `/adjustments${buildQuery()}`)
          break
        case 'create': {
          const transactionId = args['transaction-id']
          const action = args.action
          const items = args.items
          const reason = args.reason
          if (!transactionId) { result = { error: '--transaction-id required' }; break }
          if (!action) { result = { error: '--action required (refund, credit, chargeback)' }; break }
          if (!reason) { result = { error: '--reason required' }; break }
          if (!items) { result = { error: '--items required (JSON array of {item_id, type, amount})' }; break }
          let parsedItems
          try { parsedItems = JSON.parse(items) } catch { result = { error: 'Invalid JSON in --items' }; break }
          result = await api('POST', '/adjustments', {
            transaction_id: transactionId,
            action,
            reason,
            items: parsedItems,
          })
          break
        }
        default:
          result = { error: 'Unknown adjustments subcommand. Use: list, create' }
      }
      break

    case 'events':
      switch (sub) {
        case 'list':
          result = await api('GET', `/events${buildQuery()}`)
          break
        case 'types':
          result = await api('GET', '/event-types')
          break
        default:
          result = { error: 'Unknown events subcommand. Use: list, types' }
      }
      break

    case 'notifications':
      switch (sub) {
        case 'list':
          result = await api('GET', `/notifications${buildQuery()}`)
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/notifications/${id}`)
          break
        }
        case 'replay': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', `/notifications/${id}/replay`)
          break
        }
        default:
          result = { error: 'Unknown notifications subcommand. Use: list, get, replay' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          products: 'products [list | get --id <id> | create --name <n> --tax-category <cat> | update --id <id>]',
          prices: 'prices [list | get --id <id> | create --product-id <id> --amount <amt> [--currency USD] [--interval month --frequency 1] | update --id <id>]',
          customers: 'customers [list | get --id <id> | create --email <email> [--name <name>] | update --id <id>]',
          subscriptions: 'subscriptions [list | get --id <id> | update --id <id> | cancel --id <id> [--effective-from next_billing_period] | pause --id <id> | resume --id <id>]',
          transactions: 'transactions [list | get --id <id> | create --items <json>]',
          discounts: 'discounts [list | get --id <id> | create --amount <amt> --type <type> [--code <code>]]',
          adjustments: 'adjustments [list | create --transaction-id <id> --action <action> --reason <reason> --items <json>]',
          events: 'events [list | types]',
          notifications: 'notifications [list | get --id <id> | replay --id <id>]',
          env: 'Set PADDLE_SANDBOX=true for sandbox environment',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
