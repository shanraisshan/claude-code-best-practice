#!/usr/bin/env node

const CLIENT_ID = process.env.HOTJAR_CLIENT_ID
const CLIENT_SECRET = process.env.HOTJAR_CLIENT_SECRET
const OAUTH_URL = 'https://api.hotjar.io'
const BASE_URL = 'https://api.hotjar.io/v2'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(JSON.stringify({ error: 'HOTJAR_CLIENT_ID and HOTJAR_CLIENT_SECRET environment variables required' }))
  process.exit(1)
}

let cachedToken = null

async function getToken() {
  if (cachedToken) return cachedToken
  const res = await fetch(`${OAUTH_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${encodeURIComponent(CLIENT_ID)}&client_secret=${encodeURIComponent(CLIENT_SECRET)}`,
  })
  const data = await res.json()
  if (!data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to obtain access token')
  }
  cachedToken = data.access_token
  return cachedToken
}

async function api(method, path) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json', Accept: 'application/json' } }
  }
  const token = await getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
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
  const siteId = args['site-id']
  const limit = args.limit || '100'
  const cursor = args.cursor

  switch (cmd) {
    case 'sites':
      switch (sub) {
        case 'list':
          result = await api('GET', '/sites')
          break
        default:
          result = { error: 'Unknown sites subcommand. Use: list' }
      }
      break

    case 'surveys':
      if (!siteId) { result = { error: '--site-id required' }; break }
      switch (sub) {
        case 'list':
          result = await api('GET', `/sites/${siteId}/surveys`)
          break
        case 'responses': {
          const surveyId = args['survey-id']
          if (!surveyId) { result = { error: '--survey-id required' }; break }
          const params = new URLSearchParams({ limit })
          if (cursor) params.set('cursor', cursor)
          result = await api('GET', `/sites/${siteId}/surveys/${surveyId}/responses?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown surveys subcommand. Use: list, responses' }
      }
      break

    case 'heatmaps':
      if (!siteId) { result = { error: '--site-id required' }; break }
      switch (sub) {
        case 'list':
          result = await api('GET', `/sites/${siteId}/heatmaps`)
          break
        default:
          result = { error: 'Unknown heatmaps subcommand. Use: list' }
      }
      break

    case 'recordings':
      if (!siteId) { result = { error: '--site-id required' }; break }
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams({ limit })
          if (cursor) params.set('cursor', cursor)
          if (args['date-from']) params.set('date_from', args['date-from'])
          if (args['date-to']) params.set('date_to', args['date-to'])
          result = await api('GET', `/sites/${siteId}/recordings?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown recordings subcommand. Use: list' }
      }
      break

    case 'forms':
      if (!siteId) { result = { error: '--site-id required' }; break }
      switch (sub) {
        case 'list':
          result = await api('GET', `/sites/${siteId}/forms`)
          break
        default:
          result = { error: 'Unknown forms subcommand. Use: list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          sites: 'sites list',
          surveys: 'surveys list --site-id <id> | surveys responses --site-id <id> --survey-id <id> [--limit <n>] [--cursor <cursor>]',
          heatmaps: 'heatmaps list --site-id <id>',
          recordings: 'recordings list --site-id <id> [--limit <n>] [--cursor <cursor>] [--date-from <date>] [--date-to <date>]',
          forms: 'forms list --site-id <id>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
