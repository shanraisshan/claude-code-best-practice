#!/usr/bin/env node

const API_KEY = process.env.TYPEFORM_API_KEY
const BASE_URL = 'https://api.typeform.com'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'TYPEFORM_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Authorization': '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
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
  const pageSize = args['page-size'] ? Number(args['page-size']) : undefined

  switch (cmd) {
    case 'forms':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (pageSize) params.set('page_size', String(pageSize))
          if (args.page) params.set('page', args.page)
          if (args['workspace-id']) params.set('workspace_id', args['workspace-id'])
          if (args.search) params.set('search', args.search)
          const qs = params.toString()
          result = await api('GET', `/forms${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required (form ID)' }; break }
          result = await api('GET', `/forms/${id}`)
          break
        }
        case 'create': {
          const title = args.title
          if (!title) { result = { error: '--title required' }; break }
          const body = { title }
          if (args['workspace-id']) {
            body.workspace = { href: `${BASE_URL}/workspaces/${args['workspace-id']}` }
          }
          result = await api('POST', '/forms', body)
          break
        }
        case 'update': {
          const id = args.id
          if (!id) { result = { error: '--id required (form ID)' }; break }
          const body = {}
          if (args.title) body.title = args.title
          result = await api('PUT', `/forms/${id}`, body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required (form ID)' }; break }
          result = await api('DELETE', `/forms/${id}`)
          break
        }
        default:
          result = { error: 'Unknown forms subcommand. Use: list, get, create, update, delete' }
      }
      break

    case 'responses':
      switch (sub) {
        case 'list': {
          const id = args.id
          if (!id) { result = { error: '--id required (form ID)' }; break }
          const params = new URLSearchParams()
          if (pageSize) params.set('page_size', String(pageSize))
          if (args.since) params.set('since', args.since)
          if (args.until) params.set('until', args.until)
          if (args.after) params.set('after', args.after)
          if (args.before) params.set('before', args.before)
          if (args['response-type']) params.set('response_type', args['response-type'])
          if (args.query) params.set('query', args.query)
          if (args.fields) params.set('fields', args.fields)
          if (args.sort) params.set('sort', args.sort)
          const qs = params.toString()
          result = await api('GET', `/forms/${id}/responses${qs ? '?' + qs : ''}`)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required (form ID)' }; break }
          const responseIds = args['response-ids']
          if (!responseIds) { result = { error: '--response-ids required (comma-separated)' }; break }
          result = await api('DELETE', `/forms/${id}/responses?included_response_ids=${encodeURIComponent(responseIds)}`)
          break
        }
        default:
          result = { error: 'Unknown responses subcommand. Use: list, delete' }
      }
      break

    case 'webhooks':
      switch (sub) {
        case 'list': {
          const id = args.id
          if (!id) { result = { error: '--id required (form ID)' }; break }
          result = await api('GET', `/forms/${id}/webhooks`)
          break
        }
        case 'get': {
          const id = args.id
          const tag = args.tag
          if (!id || !tag) { result = { error: '--id (form ID) and --tag required' }; break }
          result = await api('GET', `/forms/${id}/webhooks/${tag}`)
          break
        }
        case 'create': {
          const id = args.id
          const tag = args.tag
          const url = args.url
          if (!id || !tag || !url) { result = { error: '--id (form ID), --tag, and --url required' }; break }
          const body = { url, enabled: args.enabled !== 'false' }
          result = await api('PUT', `/forms/${id}/webhooks/${tag}`, body)
          break
        }
        case 'delete': {
          const id = args.id
          const tag = args.tag
          if (!id || !tag) { result = { error: '--id (form ID) and --tag required' }; break }
          result = await api('DELETE', `/forms/${id}/webhooks/${tag}`)
          break
        }
        default:
          result = { error: 'Unknown webhooks subcommand. Use: list, get, create, delete' }
      }
      break

    case 'themes':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (pageSize) params.set('page_size', String(pageSize))
          if (args.page) params.set('page', args.page)
          const qs = params.toString()
          result = await api('GET', `/themes${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required (theme ID)' }; break }
          result = await api('GET', `/themes/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const body = { name }
          if (args.font) body.font = args.font
          result = await api('POST', '/themes', body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required (theme ID)' }; break }
          result = await api('DELETE', `/themes/${id}`)
          break
        }
        default:
          result = { error: 'Unknown themes subcommand. Use: list, get, create, delete' }
      }
      break

    case 'images':
      switch (sub) {
        case 'list':
          result = await api('GET', '/images')
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required (image ID)' }; break }
          result = await api('GET', `/images/${id}`)
          break
        }
        default:
          result = { error: 'Unknown images subcommand. Use: list, get' }
      }
      break

    case 'workspaces':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (pageSize) params.set('page_size', String(pageSize))
          if (args.page) params.set('page', args.page)
          if (args.search) params.set('search', args.search)
          const qs = params.toString()
          result = await api('GET', `/workspaces${qs ? '?' + qs : ''}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required (workspace ID)' }; break }
          result = await api('GET', `/workspaces/${id}`)
          break
        }
        default:
          result = { error: 'Unknown workspaces subcommand. Use: list, get' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          forms: 'forms [list | get --id <id> | create --title <title> | update --id <id> --title <title> | delete --id <id>]',
          responses: 'responses [list --id <form_id> | delete --id <form_id> --response-ids <id1,id2>]',
          webhooks: 'webhooks [list --id <form_id> | get --id <form_id> --tag <tag> | create --id <form_id> --tag <tag> --url <url> | delete --id <form_id> --tag <tag>]',
          themes: 'themes [list | get --id <id> | create --name <name> | delete --id <id>]',
          images: 'images [list | get --id <id>]',
          workspaces: 'workspaces [list | get --id <id>]',
          options: '--page-size <n> --page <n> --since <iso> --until <iso> --query <text>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
