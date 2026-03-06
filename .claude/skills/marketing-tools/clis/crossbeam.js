#!/usr/bin/env node

const API_KEY = process.env.CROSSBEAM_API_KEY
const BASE_URL = 'https://api.crossbeam.com/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'CROSSBEAM_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const url = `${BASE_URL}${path}`
  if (args['dry-run']) {
    return { _dry_run: true, method, url, headers: { 'Authorization': 'Bearer ***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(url, {
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

  switch (cmd) {
    case 'partners':
      switch (sub) {
        case 'list': {
          result = await api('GET', '/partners')
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/partners/${id}`)
          break
        }
        default:
          result = { error: 'Unknown partners subcommand. Use: list, get' }
      }
      break

    case 'populations':
      switch (sub) {
        case 'list': {
          result = await api('GET', '/populations')
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/populations/${id}`)
          break
        }
        default:
          result = { error: 'Unknown populations subcommand. Use: list, get' }
      }
      break

    case 'overlaps':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args['partner-id']) params.set('partner_id', args['partner-id'])
          if (args['population-id']) params.set('population_id', args['population-id'])
          const qs = params.toString()
          result = await api('GET', `/overlaps${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/overlaps/${id}`)
          break
        }
        default:
          result = { error: 'Unknown overlaps subcommand. Use: list, get' }
      }
      break

    case 'reports':
      switch (sub) {
        case 'list': {
          result = await api('GET', '/reports')
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/reports/${id}`)
          break
        }
        default:
          result = { error: 'Unknown reports subcommand. Use: list, get' }
      }
      break

    case 'threads':
      switch (sub) {
        case 'list': {
          result = await api('GET', '/threads')
          break
        }
        default:
          result = { error: 'Unknown threads subcommand. Use: list' }
      }
      break

    case 'accounts':
      switch (sub) {
        case 'search': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          const params = new URLSearchParams({ domain })
          result = await api('GET', `/accounts/search?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown accounts subcommand. Use: search' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          partners: {
            list: 'partners list',
            get: 'partners get --id <id>',
          },
          populations: {
            list: 'populations list',
            get: 'populations get --id <id>',
          },
          overlaps: {
            list: 'overlaps list [--partner-id <id>] [--population-id <id>]',
            get: 'overlaps get --id <id>',
          },
          reports: {
            list: 'reports list',
            get: 'reports get --id <id>',
          },
          threads: {
            list: 'threads list',
          },
          accounts: {
            search: 'accounts search --domain <domain>',
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
