#!/usr/bin/env node

const API_KEY = process.env.HUNTER_API_KEY
const BASE_URL = 'https://api.hunter.io/v2'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'HUNTER_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const separator = path.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${path}${separator}api_key=${API_KEY}`
  if (args['dry-run']) {
    return { _dry_run: true, method, url: url.replace(API_KEY, '***'), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(url, {
    method,
    headers: {
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
    case 'domain':
      switch (sub) {
        case 'search': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          const params = new URLSearchParams({ domain })
          if (args.limit) params.set('limit', args.limit)
          if (args.type) params.set('type', args.type)
          result = await api('GET', `/domain-search?${params.toString()}`)
          break
        }
        case 'count': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          const params = new URLSearchParams({ domain })
          if (args.type) params.set('type', args.type)
          result = await api('GET', `/email-count?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown domain subcommand. Use: search, count' }
      }
      break

    case 'email':
      switch (sub) {
        case 'find': {
          const domain = args.domain
          const firstName = args['first-name']
          const lastName = args['last-name']
          if (!domain) { result = { error: '--domain required' }; break }
          if (!firstName) { result = { error: '--first-name required' }; break }
          if (!lastName) { result = { error: '--last-name required' }; break }
          const params = new URLSearchParams({ domain, first_name: firstName, last_name: lastName })
          result = await api('GET', `/email-finder?${params.toString()}`)
          break
        }
        case 'verify': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const params = new URLSearchParams({ email })
          result = await api('GET', `/email-verifier?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown email subcommand. Use: find, verify' }
      }
      break

    case 'account':
      switch (sub) {
        case 'info':
          result = await api('GET', '/account')
          break
        default:
          result = { error: 'Unknown account subcommand. Use: info' }
      }
      break

    case 'leads':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          if (args.offset) params.set('offset', args.offset)
          const qs = params.toString()
          result = await api('GET', `/leads${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/leads/${id}`)
          break
        }
        case 'create': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const body = { email }
          if (args['first-name']) body.first_name = args['first-name']
          if (args['last-name']) body.last_name = args['last-name']
          if (args.company) body.company = args.company
          result = await api('POST', '/leads', body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/leads/${id}`)
          break
        }
        default:
          result = { error: 'Unknown leads subcommand. Use: list, get, create, delete' }
      }
      break

    case 'campaigns':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          if (args.offset) params.set('offset', args.offset)
          const qs = params.toString()
          result = await api('GET', `/campaigns${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/campaigns/${id}`)
          break
        }
        case 'start': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', `/campaigns/${id}/start`)
          break
        }
        case 'pause': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', `/campaigns/${id}/pause`)
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, get, start, pause' }
      }
      break

    case 'leads-lists':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          if (args.offset) params.set('offset', args.offset)
          const qs = params.toString()
          result = await api('GET', `/leads_lists${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/leads_lists/${id}`)
          break
        }
        default:
          result = { error: 'Unknown leads-lists subcommand. Use: list, get' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          domain: {
            search: 'domain search --domain <domain> [--limit <n>] [--type personal|generic]',
            count: 'domain count --domain <domain> [--type personal|generic]',
          },
          email: {
            find: 'email find --domain <domain> --first-name <name> --last-name <name>',
            verify: 'email verify --email <email>',
          },
          account: 'account info',
          leads: {
            list: 'leads list [--limit <n>] [--offset <n>]',
            get: 'leads get --id <id>',
            create: 'leads create --email <email> [--first-name <name>] [--last-name <name>] [--company <company>]',
            delete: 'leads delete --id <id>',
          },
          campaigns: {
            list: 'campaigns list [--limit <n>] [--offset <n>]',
            get: 'campaigns get --id <id>',
            start: 'campaigns start --id <id>',
            pause: 'campaigns pause --id <id>',
          },
          'leads-lists': {
            list: 'leads-lists list [--limit <n>] [--offset <n>]',
            get: 'leads-lists get --id <id>',
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
