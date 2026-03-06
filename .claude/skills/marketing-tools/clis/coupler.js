#!/usr/bin/env node

const API_KEY = process.env.COUPLER_API_KEY
const BASE_URL = 'https://api.coupler.io/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'COUPLER_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Authorization': 'Bearer ***', 'Content-Type': 'application/json' }, body: body || undefined }
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
    case 'importers':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          if (args.offset) params.set('offset', args.offset)
          const qs = params.toString()
          result = await api('GET', `/importers${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/importers/${id}`)
          break
        }
        case 'run': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('POST', `/importers/${id}/run`)
          break
        }
        case 'create': {
          const source = args.source
          const destination = args.destination
          const name = args.name
          if (!source) { result = { error: '--source required' }; break }
          if (!destination) { result = { error: '--destination required' }; break }
          if (!name) { result = { error: '--name required' }; break }
          const body = { source_type: source, destination_type: destination, name }
          if (args.schedule) body.schedule = args.schedule
          result = await api('POST', '/importers', body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/importers/${id}`)
          break
        }
        default:
          result = { error: 'Unknown importers subcommand. Use: list, get, run, create, delete' }
      }
      break

    case 'runs':
      switch (sub) {
        case 'list': {
          const importerId = args['importer-id']
          if (!importerId) { result = { error: '--importer-id required' }; break }
          const params = new URLSearchParams()
          if (args.limit) params.set('limit', args.limit)
          if (args.offset) params.set('offset', args.offset)
          const qs = params.toString()
          result = await api('GET', `/importers/${importerId}/runs${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/runs/${id}`)
          break
        }
        default:
          result = { error: 'Unknown runs subcommand. Use: list, get' }
      }
      break

    case 'sources':
      switch (sub) {
        case 'list':
          result = await api('GET', '/sources')
          break
        default:
          result = { error: 'Unknown sources subcommand. Use: list' }
      }
      break

    case 'destinations':
      switch (sub) {
        case 'list':
          result = await api('GET', '/destinations')
          break
        default:
          result = { error: 'Unknown destinations subcommand. Use: list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          importers: {
            list: 'importers list [--limit <n>] [--offset <n>]',
            get: 'importers get --id <id>',
            run: 'importers run --id <id>',
            create: 'importers create --source <source-type> --destination <dest-type> --name <name> [--schedule <schedule>]',
            delete: 'importers delete --id <id>',
          },
          runs: {
            list: 'runs list --importer-id <id> [--limit <n>] [--offset <n>]',
            get: 'runs get --id <id>',
          },
          sources: 'sources list',
          destinations: 'destinations list',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
