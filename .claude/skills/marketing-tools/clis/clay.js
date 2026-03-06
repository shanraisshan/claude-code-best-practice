#!/usr/bin/env node

const API_KEY = process.env.CLAY_API_KEY
const BASE_URL = 'https://api.clay.com/v3'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'CLAY_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Authorization': 'Bearer ***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  }
  if (body) options.body = JSON.stringify(body)
  const res = await fetch(`${BASE_URL}${path}`, options)
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
  const page = args.page ? Number(args.page) : 1
  const perPage = args['per-page'] ? Number(args['per-page']) : 25

  switch (cmd) {
    case 'tables':
      switch (sub) {
        case 'list': {
          result = await api('GET', `/tables?page=${page}&per_page=${perPage}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/tables/${id}`)
          break
        }
        case 'rows': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/tables/${id}/rows?page=${page}&per_page=${perPage}`)
          break
        }
        case 'add-row': {
          const id = args.id
          const data = args.data
          if (!id) { result = { error: '--id required' }; break }
          if (!data) { result = { error: '--data required (JSON string)' }; break }
          let parsed
          try {
            parsed = JSON.parse(data)
          } catch {
            result = { error: 'Invalid JSON in --data' }
            break
          }
          result = await api('POST', `/tables/${id}/rows`, parsed)
          break
        }
        default:
          result = { error: 'Unknown tables subcommand. Use: list, get, rows, add-row' }
      }
      break

    case 'people':
      switch (sub) {
        case 'enrich': {
          const body = {}
          if (args.email) body.email = args.email
          if (args.linkedin) body.linkedin_url = args.linkedin
          if (args['first-name']) body.first_name = args['first-name']
          if (args['last-name']) body.last_name = args['last-name']
          if (args['first-name'] && args['last-name'] && args.domain) body.domain = args.domain
          if (!args.email && !args.linkedin && !(args['first-name'] && args['last-name'] && args.domain)) {
            result = { error: '--email or --linkedin required (or --first-name + --last-name + --domain)' }
            break
          }
          result = await api('POST', '/people/enrich', body)
          break
        }
        default:
          result = { error: 'Unknown people subcommand. Use: enrich' }
      }
      break

    case 'companies':
      switch (sub) {
        case 'enrich': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          result = await api('POST', '/companies/enrich', { domain })
          break
        }
        default:
          result = { error: 'Unknown companies subcommand. Use: enrich' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          tables: {
            list: 'tables list [--page <n>] [--per-page <n>]',
            get: 'tables get --id <table_id>',
            rows: 'tables rows --id <table_id> [--page <n>] [--per-page <n>]',
            'add-row': 'tables add-row --id <table_id> --data <json>',
          },
          people: {
            enrich: 'people enrich --email <email> | --linkedin <url> | --first-name <n> --last-name <n> --domain <d>',
          },
          companies: {
            enrich: 'companies enrich --domain <domain>',
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
