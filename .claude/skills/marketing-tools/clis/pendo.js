#!/usr/bin/env node

const API_KEY = process.env.PENDO_INTEGRATION_KEY
const BASE_URL = 'https://app.pendo.io/api/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'PENDO_INTEGRATION_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const url = `${BASE_URL}${path}`
  if (args['dry-run']) {
    return { _dry_run: true, method, url, headers: { 'Content-Type': 'application/json', 'x-pendo-integration-key': '***' }, body: body || undefined }
  }
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-pendo-integration-key': API_KEY,
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
    case 'features':
      switch (sub) {
        case 'list':
          result = await api('GET', '/feature')
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/feature/${id}`)
          break
        }
        default:
          result = { error: 'Unknown features subcommand. Use: list, get' }
      }
      break

    case 'pages':
      switch (sub) {
        case 'list':
          result = await api('GET', '/page')
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/page/${id}`)
          break
        }
        default:
          result = { error: 'Unknown pages subcommand. Use: list, get' }
      }
      break

    case 'guides':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.state) params.set('state', args.state)
          const qs = params.toString()
          result = await api('GET', `/guide${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/guide/${id}`)
          break
        }
        default:
          result = { error: 'Unknown guides subcommand. Use: list, get' }
      }
      break

    case 'visitors':
      switch (sub) {
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/visitor/${id}`)
          break
        }
        case 'search': {
          const query = args.query
          if (!query) { result = { error: '--query <json> required' }; break }
          let body
          try { body = JSON.parse(query) } catch { result = { error: 'Invalid JSON in --query' }; break }
          result = await api('POST', '/aggregation', body)
          break
        }
        default:
          result = { error: 'Unknown visitors subcommand. Use: get, search' }
      }
      break

    case 'accounts':
      switch (sub) {
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/account/${id}`)
          break
        }
        case 'search': {
          const query = args.query
          if (!query) { result = { error: '--query <json> required' }; break }
          let body
          try { body = JSON.parse(query) } catch { result = { error: 'Invalid JSON in --query' }; break }
          result = await api('POST', '/aggregation', body)
          break
        }
        default:
          result = { error: 'Unknown accounts subcommand. Use: get, search' }
      }
      break

    case 'reports':
      switch (sub) {
        case 'funnel': {
          const pipeline = args.pipeline
          if (!pipeline) { result = { error: '--pipeline <json> required' }; break }
          let body
          try { body = JSON.parse(pipeline) } catch { result = { error: 'Invalid JSON in --pipeline' }; break }
          result = await api('POST', '/aggregation', body)
          break
        }
        default:
          result = { error: 'Unknown reports subcommand. Use: funnel' }
      }
      break

    case 'metadata':
      switch (sub) {
        case 'list': {
          const kind = args.kind
          if (!kind) { result = { error: '--kind <visitor|account|parentAccount> required' }; break }
          result = await api('GET', `/metadata/schema/${kind}`)
          break
        }
        default:
          result = { error: 'Unknown metadata subcommand. Use: list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          features: {
            list: 'features list',
            get: 'features get --id <id>',
          },
          pages: {
            list: 'pages list',
            get: 'pages get --id <id>',
          },
          guides: {
            list: 'guides list [--state <state>]',
            get: 'guides get --id <id>',
          },
          visitors: {
            get: 'visitors get --id <id>',
            search: 'visitors search --query <json>',
          },
          accounts: {
            get: 'accounts get --id <id>',
            search: 'accounts search --query <json>',
          },
          reports: {
            funnel: 'reports funnel --pipeline <json>',
          },
          metadata: {
            list: 'metadata list --kind <visitor|account|parentAccount>',
          },
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
