#!/usr/bin/env node

const API_KEY = process.env.BUFFER_API_KEY
const BASE_URL = 'https://api.bufferapp.com/1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'BUFFER_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Accept': 'application/json',
  }
  if (body && method !== 'GET') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { ...headers, 'Authorization': '***' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? new URLSearchParams(body).toString() : undefined,
  })
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { status: res.status, body: text }
  }
}

async function apiJson(method, path, body) {
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

  switch (cmd) {
    case 'user':
      switch (sub) {
        case 'info':
          result = await api('GET', '/user.json')
          break
        case 'deauthorize':
          result = await api('POST', '/user/deauthorize.json')
          break
        default:
          result = { error: 'Unknown user subcommand. Use: info, deauthorize' }
      }
      break

    case 'profiles':
      switch (sub) {
        case 'list':
          result = await api('GET', '/profiles.json')
          break
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/profiles/${id}.json`)
          break
        }
        case 'schedules': {
          const id = args.id
          if (!id) { result = { error: '--id required (profile ID)' }; break }
          result = await api('GET', `/profiles/${id}/schedules.json`)
          break
        }
        default:
          result = { error: 'Unknown profiles subcommand. Use: list, get, schedules' }
      }
      break

    case 'updates':
      switch (sub) {
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required (update ID)' }; break }
          result = await api('GET', `/updates/${id}.json`)
          break
        }
        case 'pending': {
          const id = args.id
          if (!id) { result = { error: '--id required (profile ID)' }; break }
          const params = new URLSearchParams()
          if (args.page) params.set('page', args.page)
          if (args.count) params.set('count', args.count)
          if (args.since) params.set('since', args.since)
          const qs = params.toString() ? `?${params.toString()}` : ''
          result = await api('GET', `/profiles/${id}/updates/pending.json${qs}`)
          break
        }
        case 'sent': {
          const id = args.id
          if (!id) { result = { error: '--id required (profile ID)' }; break }
          const params = new URLSearchParams()
          if (args.page) params.set('page', args.page)
          if (args.count) params.set('count', args.count)
          if (args.since) params.set('since', args.since)
          const qs = params.toString() ? `?${params.toString()}` : ''
          result = await api('GET', `/profiles/${id}/updates/sent.json${qs}`)
          break
        }
        case 'create': {
          const profileIds = args['profile-ids']
          const text = args.text
          if (!profileIds) { result = { error: '--profile-ids required (comma-separated)' }; break }
          if (!text) { result = { error: '--text required' }; break }
          const body = { text }
          profileIds.split(',').forEach(id => {
            if (!body['profile_ids[]']) body['profile_ids[]'] = []
          })
          const formBody = new URLSearchParams()
          formBody.append('text', text)
          profileIds.split(',').forEach(id => formBody.append('profile_ids[]', id.trim()))
          if (args['scheduled-at']) formBody.append('scheduled_at', args['scheduled-at'])
          if (args.now) formBody.append('now', 'true')
          if (args.top) formBody.append('top', 'true')
          if (args.shorten) formBody.append('shorten', 'true')
          if (args['dry-run']) {
            result = { _dry_run: true, method: 'POST', url: `${BASE_URL}/updates/create.json`, headers: { 'Authorization': '***', 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }, body: formBody.toString() }
            break
          }
          const res = await fetch(`${BASE_URL}/updates/create.json`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
            body: formBody.toString(),
          })
          const resText = await res.text()
          try { result = JSON.parse(resText) } catch { result = { status: res.status, body: resText } }
          break
        }
        case 'update': {
          const id = args.id
          const text = args.text
          if (!id) { result = { error: '--id required (update ID)' }; break }
          if (!text) { result = { error: '--text required' }; break }
          const body = { text }
          if (args['scheduled-at']) body.scheduled_at = args['scheduled-at']
          result = await api('POST', `/updates/${id}/update.json`, body)
          break
        }
        case 'share': {
          const id = args.id
          if (!id) { result = { error: '--id required (update ID)' }; break }
          result = await api('POST', `/updates/${id}/share.json`)
          break
        }
        case 'destroy': {
          const id = args.id
          if (!id) { result = { error: '--id required (update ID)' }; break }
          result = await api('POST', `/updates/${id}/destroy.json`)
          break
        }
        case 'reorder': {
          const id = args.id
          const order = args.order
          if (!id) { result = { error: '--id required (profile ID)' }; break }
          if (!order) { result = { error: '--order required (comma-separated update IDs)' }; break }
          const formBody = new URLSearchParams()
          order.split(',').forEach(uid => formBody.append('order[]', uid.trim()))
          if (args['dry-run']) {
            result = { _dry_run: true, method: 'POST', url: `${BASE_URL}/profiles/${id}/updates/reorder.json`, headers: { 'Authorization': '***', 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }, body: formBody.toString() }
            break
          }
          const res = await fetch(`${BASE_URL}/profiles/${id}/updates/reorder.json`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
            body: formBody.toString(),
          })
          const resText = await res.text()
          try { result = JSON.parse(resText) } catch { result = { status: res.status, body: resText } }
          break
        }
        case 'shuffle': {
          const id = args.id
          if (!id) { result = { error: '--id required (profile ID)' }; break }
          result = await api('POST', `/profiles/${id}/updates/shuffle.json`)
          break
        }
        default:
          result = { error: 'Unknown updates subcommand. Use: get, pending, sent, create, update, share, destroy, reorder, shuffle' }
      }
      break

    case 'info':
      result = await api('GET', '/info/configuration.json')
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          user: 'user [info | deauthorize]',
          profiles: 'profiles [list | get --id <id> | schedules --id <id>]',
          updates: 'updates [get --id <id> | pending --id <profile-id> | sent --id <profile-id> | create --profile-ids <ids> --text <text> [--scheduled-at <time>] [--now] | update --id <id> --text <text> | share --id <id> | destroy --id <id> | reorder --id <profile-id> --order <id1,id2> | shuffle --id <profile-id>]',
          info: 'info',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
