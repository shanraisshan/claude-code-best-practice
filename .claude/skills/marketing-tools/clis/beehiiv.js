#!/usr/bin/env node

const API_KEY = process.env.BEEHIIV_API_KEY
const BASE_URL = 'https://api.beehiiv.com/v2'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'BEEHIIV_API_KEY environment variable required' }))
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
  const pubId = args.publication || args.pub
  const limit = args.limit ? Number(args.limit) : 10

  switch (cmd) {
    case 'publications':
      switch (sub) {
        case 'list':
          result = await api('GET', '/publications')
          break
        case 'get': {
          if (!pubId) { result = { error: '--publication required' }; break }
          result = await api('GET', `/publications/${pubId}`)
          break
        }
        default:
          result = { error: 'Unknown publications subcommand. Use: list, get' }
      }
      break

    case 'subscriptions':
      switch (sub) {
        case 'list': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          if (args.email) params.set('email', args.email)
          if (args.status) params.set('status', args.status)
          if (args.tier) params.set('tier', args.tier)
          if (args.cursor) params.set('cursor', args.cursor)
          if (args.expand) params.set('expand[]', args.expand)
          result = await api('GET', `/publications/${pubId}/subscriptions?${params.toString()}`)
          break
        }
        case 'get': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const subId = args.id
          if (!subId) { result = { error: '--id required' }; break }
          result = await api('GET', `/publications/${pubId}/subscriptions/${subId}`)
          break
        }
        case 'create': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const body = { email }
          if (args['reactivate-existing']) body.reactivate_existing = true
          if (args['send-welcome-email']) body.send_welcome_email = true
          if (args['utm-source']) body.utm_source = args['utm-source']
          if (args['utm-medium']) body.utm_medium = args['utm-medium']
          if (args['utm-campaign']) body.utm_campaign = args['utm-campaign']
          if (args.tier) body.tier = args.tier
          if (args['referring-site']) body.referring_site = args['referring-site']
          result = await api('POST', `/publications/${pubId}/subscriptions`, body)
          break
        }
        case 'update': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const subId = args.id
          if (!subId) { result = { error: '--id required' }; break }
          const body = {}
          if (args.tier) body.tier = args.tier
          result = await api('PUT', `/publications/${pubId}/subscriptions/${subId}`, body)
          break
        }
        case 'delete': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const subId = args.id
          if (!subId) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/publications/${pubId}/subscriptions/${subId}`)
          break
        }
        default:
          result = { error: 'Unknown subscriptions subcommand. Use: list, get, create, update, delete' }
      }
      break

    case 'posts':
      switch (sub) {
        case 'list': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const params = new URLSearchParams()
          params.set('limit', String(limit))
          if (args.status) params.set('status', args.status)
          if (args.cursor) params.set('cursor', args.cursor)
          result = await api('GET', `/publications/${pubId}/posts?${params.toString()}`)
          break
        }
        case 'get': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const postId = args.id
          if (!postId) { result = { error: '--id required' }; break }
          result = await api('GET', `/publications/${pubId}/posts/${postId}`)
          break
        }
        case 'create': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const title = args.title
          if (!title) { result = { error: '--title required' }; break }
          const body = { title }
          if (args.subtitle) body.subtitle = args.subtitle
          if (args.content) body.content = args.content
          if (args.status) body.status = args.status
          result = await api('POST', `/publications/${pubId}/posts`, body)
          break
        }
        case 'delete': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const postId = args.id
          if (!postId) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/publications/${pubId}/posts/${postId}`)
          break
        }
        default:
          result = { error: 'Unknown posts subcommand. Use: list, get, create, delete' }
      }
      break

    case 'segments':
      switch (sub) {
        case 'list': {
          if (!pubId) { result = { error: '--publication required' }; break }
          result = await api('GET', `/publications/${pubId}/segments`)
          break
        }
        case 'get': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const segId = args.id
          if (!segId) { result = { error: '--id required' }; break }
          result = await api('GET', `/publications/${pubId}/segments/${segId}`)
          break
        }
        default:
          result = { error: 'Unknown segments subcommand. Use: list, get' }
      }
      break

    case 'automations':
      switch (sub) {
        case 'list': {
          if (!pubId) { result = { error: '--publication required' }; break }
          result = await api('GET', `/publications/${pubId}/automations`)
          break
        }
        case 'get': {
          if (!pubId) { result = { error: '--publication required' }; break }
          const autoId = args.id
          if (!autoId) { result = { error: '--id required' }; break }
          result = await api('GET', `/publications/${pubId}/automations/${autoId}`)
          break
        }
        default:
          result = { error: 'Unknown automations subcommand. Use: list, get' }
      }
      break

    case 'referral-program':
      switch (sub) {
        case 'get': {
          if (!pubId) { result = { error: '--publication required' }; break }
          result = await api('GET', `/publications/${pubId}/referral_program`)
          break
        }
        default:
          result = { error: 'Unknown referral-program subcommand. Use: get' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          publications: 'publications [list | get --publication <id>]',
          subscriptions: 'subscriptions [list | get --id <id> | create --email <email> | update --id <id> | delete --id <id>] --publication <id>',
          posts: 'posts [list | get --id <id> | create --title <title> | delete --id <id>] --publication <id>',
          segments: 'segments [list | get --id <id>] --publication <id>',
          automations: 'automations [list | get --id <id>] --publication <id>',
          'referral-program': 'referral-program [get] --publication <id>',
          options: '--publication <id> --limit <n> --email <email> --status <status> --tier <tier>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
