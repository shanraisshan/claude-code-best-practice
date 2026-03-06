#!/usr/bin/env node

const API_KEY = process.env.OPTIMIZELY_API_KEY
const BASE_URL = 'https://api.optimizely.com/v2'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'OPTIMIZELY_API_KEY environment variable required' }))
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

async function main() {
  let result
  const projectId = args['project-id']
  const page = args.page ? Number(args.page) : 1
  const perPage = args['per-page'] ? Number(args['per-page']) : 25

  switch (cmd) {
    case 'projects':
      switch (sub) {
        case 'list':
          result = await api('GET', `/projects?page=${page}&per_page=${perPage}`)
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/projects/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const body = { name }
          if (args.platform) body.platform = args.platform
          result = await api('POST', '/projects', body)
          break
        }
        default:
          result = { error: 'Unknown projects subcommand. Use: list, get, create' }
      }
      break

    case 'experiments':
      switch (sub) {
        case 'list': {
          if (!projectId) { result = { error: '--project-id required' }; break }
          const params = new URLSearchParams({ project_id: projectId, page: String(page), per_page: String(perPage) })
          if (args.status) params.set('status', args.status)
          result = await api('GET', `/experiments?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/experiments/${id}`)
          break
        }
        case 'create': {
          if (!projectId) { result = { error: '--project-id required' }; break }
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const body = {
            project_id: Number(projectId),
            name,
            type: args.type || 'a/b',
            status: 'not_started',
          }
          if (args['traffic-allocation']) body.traffic_allocation = Number(args['traffic-allocation'])
          result = await api('POST', '/experiments', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.status) body.status = args.status
          if (args['traffic-allocation']) body.traffic_allocation = Number(args['traffic-allocation'])
          result = await api('PATCH', `/experiments/${id}`, body)
          break
        }
        case 'results': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const params = new URLSearchParams()
          if (args['start-time']) params.set('start_time', args['start-time'])
          if (args['end-time']) params.set('end_time', args['end-time'])
          const qs = params.toString()
          result = await api('GET', `/experiments/${id}/results${qs ? '?' + qs : ''}`)
          break
        }
        case 'archive': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('PATCH', `/experiments/${id}`, { status: 'archived' })
          break
        }
        default:
          result = { error: 'Unknown experiments subcommand. Use: list, get, create, update, results, archive' }
      }
      break

    case 'campaigns':
      switch (sub) {
        case 'list': {
          if (!projectId) { result = { error: '--project-id required' }; break }
          result = await api('GET', `/campaigns?project_id=${projectId}&page=${page}&per_page=${perPage}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/campaigns/${id}`)
          break
        }
        case 'results': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/campaigns/${id}/results`)
          break
        }
        default:
          result = { error: 'Unknown campaigns subcommand. Use: list, get, results' }
      }
      break

    case 'audiences':
      switch (sub) {
        case 'list': {
          if (!projectId) { result = { error: '--project-id required' }; break }
          result = await api('GET', `/audiences?project_id=${projectId}&page=${page}&per_page=${perPage}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/audiences/${id}`)
          break
        }
        default:
          result = { error: 'Unknown audiences subcommand. Use: list, get' }
      }
      break

    case 'events':
      switch (sub) {
        case 'list': {
          if (!projectId) { result = { error: '--project-id required' }; break }
          result = await api('GET', `/events?project_id=${projectId}&page=${page}&per_page=${perPage}`)
          break
        }
        default:
          result = { error: 'Unknown events subcommand. Use: list' }
      }
      break

    case 'pages':
      switch (sub) {
        case 'list': {
          if (!projectId) { result = { error: '--project-id required' }; break }
          result = await api('GET', `/pages?project_id=${projectId}&page=${page}&per_page=${perPage}`)
          break
        }
        default:
          result = { error: 'Unknown pages subcommand. Use: list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          projects: 'projects [list | get --id <id> | create --name <name>]',
          experiments: 'experiments [list --project-id <id> | get --id <id> | create --project-id <id> --name <name> | update --id <id> --status <status> | results --id <id> | archive --id <id>]',
          campaigns: 'campaigns [list --project-id <id> | get --id <id> | results --id <id>]',
          audiences: 'audiences [list --project-id <id> | get --id <id>]',
          events: 'events list --project-id <id>',
          pages: 'pages list --project-id <id>',
          options: '--page <n> --per-page <n> --status <not_started|running|paused|archived>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
