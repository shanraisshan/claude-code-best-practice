#!/usr/bin/env node

const API_KEY = process.env.WISTIA_API_KEY
const BASE_URL = 'https://api.wistia.com/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'WISTIA_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const auth = 'Basic ' + Buffer.from(`${API_KEY}:`).toString('base64')
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Authorization': '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': auth,
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
const page = args.page ? Number(args.page) : 1
const perPage = args['per-page'] ? Number(args['per-page']) : 25

async function main() {
  let result

  switch (cmd) {
    case 'projects':
      switch (sub) {
        case 'list':
          result = await api('GET', `/projects.json?page=${page}&per_page=${perPage}`)
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required (project hashed ID)' }; break }
          result = await api('GET', `/projects/${id}.json`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const body = { name }
          if (args.public) body.public = true
          result = await api('POST', '/projects.json', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required (project hashed ID)' }; break }
          const body = {}
          if (args.name) body.name = args.name
          result = await api('PUT', `/projects/${id}.json`, body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required (project hashed ID)' }; break }
          result = await api('DELETE', `/projects/${id}.json`)
          break
        }
        default:
          result = { error: 'Unknown projects subcommand. Use: list, get, create, update, delete' }
      }
      break

    case 'medias':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams({ page: String(page), per_page: String(perPage) })
          if (args.project) params.set('project_id', args.project)
          if (args.name) params.set('name', args.name)
          if (args.type) params.set('type', args.type)
          result = await api('GET', `/medias.json?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          result = await api('GET', `/medias/${id}.json`)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          const body = {}
          if (args.name) body.name = args.name
          if (args.description) body.description = args.description
          result = await api('PUT', `/medias/${id}.json`, body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          result = await api('DELETE', `/medias/${id}.json`)
          break
        }
        case 'copy': {
          const id = args.id
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          const body = {}
          if (args['target-project']) body.project_id = args['target-project']
          result = await api('POST', `/medias/${id}/copy.json`, body)
          break
        }
        case 'stats': {
          const id = args.id
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          result = await api('GET', `/medias/${id}/stats.json`)
          break
        }
        default:
          result = { error: 'Unknown medias subcommand. Use: list, get, update, delete, copy, stats' }
      }
      break

    case 'stats':
      switch (sub) {
        case 'account':
          result = await api('GET', '/stats/account.json')
          break
        case 'project': {
          const id = args.id
          if (!id) { result = { error: '--id required (project hashed ID)' }; break }
          result = await api('GET', `/stats/projects/${id}.json`)
          break
        }
        case 'media': {
          const id = args.id
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          result = await api('GET', `/stats/medias/${id}.json`)
          break
        }
        case 'media-by-date': {
          const id = args.id
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          const params = new URLSearchParams()
          if (args.start) params.set('start_date', args.start)
          if (args.end) params.set('end_date', args.end)
          const qs = params.toString() ? `?${params.toString()}` : ''
          result = await api('GET', `/stats/medias/${id}/by_date.json${qs}`)
          break
        }
        case 'engagement': {
          const id = args.id
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          result = await api('GET', `/stats/medias/${id}/engagement.json`)
          break
        }
        case 'visitors': {
          const params = new URLSearchParams({ page: String(page), per_page: String(perPage) })
          if (args.search) params.set('search', args.search)
          result = await api('GET', `/stats/visitors.json?${params.toString()}`)
          break
        }
        case 'visitor': {
          const key = args.key
          if (!key) { result = { error: '--key required (visitor key)' }; break }
          result = await api('GET', `/stats/visitors/${key}.json`)
          break
        }
        case 'events': {
          const params = new URLSearchParams({ page: String(page), per_page: String(perPage) })
          if (args['media-id']) params.set('media_id', args['media-id'])
          result = await api('GET', `/stats/events.json?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown stats subcommand. Use: account, project, media, media-by-date, engagement, visitors, visitor, events' }
      }
      break

    case 'account':
      result = await api('GET', '/account.json')
      break

    case 'captions':
      switch (sub) {
        case 'list': {
          const id = args.id
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          result = await api('GET', `/medias/${id}/captions.json`)
          break
        }
        case 'create': {
          const id = args.id
          const language = args.language
          if (!id) { result = { error: '--id required (media hashed ID)' }; break }
          if (!language) { result = { error: '--language required (e.g. eng)' }; break }
          const body = { language }
          if (args['srt-file']) {
            const fs = require('fs')
            body.caption_file = fs.readFileSync(args['srt-file'], 'utf8')
          }
          result = await api('POST', `/medias/${id}/captions.json`, body)
          break
        }
        default:
          result = { error: 'Unknown captions subcommand. Use: list, create' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          projects: 'projects [list | get --id <id> | create --name <name> | update --id <id> --name <name> | delete --id <id>]',
          medias: 'medias [list [--project <id>] | get --id <id> | update --id <id> --name <name> | delete --id <id> | copy --id <id> [--target-project <id>] | stats --id <id>]',
          stats: 'stats [account | project --id <id> | media --id <id> | media-by-date --id <id> [--start <date> --end <date>] | engagement --id <id> | visitors | visitor --key <key> | events [--media-id <id>]]',
          account: 'account',
          captions: 'captions [list --id <media-id> | create --id <media-id> --language <lang>]',
          options: '--page <n> --per-page <n>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
