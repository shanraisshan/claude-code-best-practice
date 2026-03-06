#!/usr/bin/env node

const API_KEY = process.env.TRUSTPILOT_API_KEY
const API_SECRET = process.env.TRUSTPILOT_API_SECRET
const BUSINESS_UNIT_ID = process.env.TRUSTPILOT_BUSINESS_UNIT_ID
const BASE_URL = 'https://api.trustpilot.com/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'TRUSTPILOT_API_KEY environment variable required' }))
  process.exit(1)
}

let accessToken = null

async function getAccessToken() {
  if (accessToken) return accessToken
  if (!API_SECRET) return null
  const res = await fetch(`${BASE_URL}/oauth/oauth-business-users-for-applications/accesstoken`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  if (data.access_token) {
    accessToken = data.access_token
    return accessToken
  }
  return null
}

async function api(method, path, body, auth = 'apikey') {
  if (args['dry-run']) {
    const maskedHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    if (auth === 'bearer') {
      maskedHeaders['Authorization'] = '***'
    } else {
      maskedHeaders['apikey'] = '***'
    }
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: maskedHeaders, body: body || undefined }
  }
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  if (auth === 'bearer') {
    const token = await getAccessToken()
    if (!token) {
      return { error: 'TRUSTPILOT_API_SECRET required for private API endpoints' }
    }
    headers['Authorization'] = `Bearer ${token}`
  } else {
    headers['apikey'] = API_KEY
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
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
  const businessUnitId = args['business-unit'] || BUSINESS_UNIT_ID
  const limit = args.limit ? Number(args.limit) : 20

  switch (cmd) {
    case 'business':
      switch (sub) {
        case 'search': {
          const query = args.query
          if (!query) { result = { error: '--query required' }; break }
          result = await api('GET', `/business-units/search?query=${encodeURIComponent(query)}&limit=${limit}`)
          break
        }
        case 'get': {
          if (!businessUnitId) { result = { error: '--business-unit or TRUSTPILOT_BUSINESS_UNIT_ID required' }; break }
          result = await api('GET', `/business-units/${businessUnitId}`)
          break
        }
        case 'profile': {
          if (!businessUnitId) { result = { error: '--business-unit or TRUSTPILOT_BUSINESS_UNIT_ID required' }; break }
          result = await api('GET', `/business-units/${businessUnitId}/profileinfo`)
          break
        }
        case 'categories': {
          if (!businessUnitId) { result = { error: '--business-unit or TRUSTPILOT_BUSINESS_UNIT_ID required' }; break }
          result = await api('GET', `/business-units/${businessUnitId}/categories`)
          break
        }
        case 'web-links': {
          if (!businessUnitId) { result = { error: '--business-unit or TRUSTPILOT_BUSINESS_UNIT_ID required' }; break }
          const locale = args.locale || 'en-US'
          result = await api('GET', `/business-units/${businessUnitId}/web-links?locale=${encodeURIComponent(locale)}`)
          break
        }
        default:
          result = { error: 'Unknown business subcommand. Use: search, get, profile, categories, web-links' }
      }
      break

    case 'reviews':
      switch (sub) {
        case 'list': {
          if (!businessUnitId) { result = { error: '--business-unit or TRUSTPILOT_BUSINESS_UNIT_ID required' }; break }
          const reviewParams = new URLSearchParams({ perPage: String(limit), orderBy: args['order-by'] || 'createdat.desc' })
          if (args.stars) reviewParams.set('stars', args.stars)
          if (args.language) reviewParams.set('language', args.language)
          result = await api('GET', `/business-units/${businessUnitId}/reviews?${reviewParams}`)
          break
        }
        case 'get': {
          const reviewId = args.id
          if (!reviewId) { result = { error: '--id required' }; break }
          result = await api('GET', `/reviews/${reviewId}`)
          break
        }
        case 'private': {
          if (!businessUnitId) { result = { error: '--business-unit or TRUSTPILOT_BUSINESS_UNIT_ID required' }; break }
          const privateParams = new URLSearchParams({ perPage: String(limit) })
          if (args.stars) privateParams.set('stars', args.stars)
          result = await api('GET', `/private/business-units/${businessUnitId}/reviews?${privateParams}`, null, 'bearer')
          break
        }
        case 'latest':
          result = await api('GET', `/reviews/latest?count=${limit}`)
          break
        case 'reply': {
          const reviewId = args.id
          const message = args.message
          if (!reviewId) { result = { error: '--id required' }; break }
          if (!message) { result = { error: '--message required' }; break }
          result = await api('POST', `/private/reviews/${reviewId}/reply`, { message }, 'bearer')
          break
        }
        case 'delete-reply': {
          const reviewId = args.id
          if (!reviewId) { result = { error: '--id required' }; break }
          result = await api('DELETE', `/private/reviews/${reviewId}/reply`, null, 'bearer')
          break
        }
        default:
          result = { error: 'Unknown reviews subcommand. Use: list, get, private, latest, reply, delete-reply' }
      }
      break

    case 'invitations':
      switch (sub) {
        case 'create': {
          if (!businessUnitId) { result = { error: '--business-unit or TRUSTPILOT_BUSINESS_UNIT_ID required' }; break }
          const email = args.email
          const name = args.name
          if (!email) { result = { error: '--email required' }; break }
          if (!name) { result = { error: '--name required' }; break }
          const templateId = args.template
          const redirectUri = args['redirect-uri'] || 'https://trustpilot.com'
          const payload = {
            consumerEmail: email,
            consumerName: name,
            referenceNumber: args.reference || '',
            senderEmail: args['sender-email'] || undefined,
            replyTo: args['reply-to'] || undefined,
            templateId: templateId || undefined,
            redirectUri,
          }
          result = await api('POST', `/private/business-units/${businessUnitId}/email-invitations`, payload, 'bearer')
          break
        }
        case 'link': {
          if (!businessUnitId) { result = { error: '--business-unit or TRUSTPILOT_BUSINESS_UNIT_ID required' }; break }
          const email = args.email
          const name = args.name
          if (!email) { result = { error: '--email required' }; break }
          if (!name) { result = { error: '--name required' }; break }
          result = await api('POST', `/private/business-units/${businessUnitId}/invitation-links`, {
            email,
            name,
            referenceId: args.reference || '',
            redirectUri: args['redirect-uri'] || 'https://trustpilot.com',
          }, 'bearer')
          break
        }
        case 'templates': {
          if (!businessUnitId) { result = { error: '--business-unit or TRUSTPILOT_BUSINESS_UNIT_ID required' }; break }
          result = await api('GET', `/private/business-units/${businessUnitId}/templates`, null, 'bearer')
          break
        }
        default:
          result = { error: 'Unknown invitations subcommand. Use: create, link, templates' }
      }
      break

    case 'tags':
      switch (sub) {
        case 'get': {
          const reviewId = args.id
          if (!reviewId) { result = { error: '--id required' }; break }
          result = await api('GET', `/private/reviews/${reviewId}/tags`, null, 'bearer')
          break
        }
        case 'add': {
          const reviewId = args.id
          const group = args.group
          const value = args.value
          if (!reviewId) { result = { error: '--id required' }; break }
          if (!group || !value) { result = { error: '--group and --value required' }; break }
          result = await api('PUT', `/private/reviews/${reviewId}/tags`, {
            tags: [{ group, value }],
          }, 'bearer')
          break
        }
        case 'remove': {
          const reviewId = args.id
          const group = args.group
          const value = args.value
          if (!reviewId) { result = { error: '--id required' }; break }
          if (!group || !value) { result = { error: '--group and --value required' }; break }
          result = await api('DELETE', `/private/reviews/${reviewId}/tags?group=${encodeURIComponent(group)}&value=${encodeURIComponent(value)}`, null, 'bearer')
          break
        }
        default:
          result = { error: 'Unknown tags subcommand. Use: get, add, remove' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          business: 'business [search --query <q> | get | profile | categories | web-links]',
          reviews: 'reviews [list | get --id <id> | private | latest | reply --id <id> --message <msg> | delete-reply --id <id>]',
          invitations: 'invitations [create --email <e> --name <n> | link --email <e> --name <n> | templates]',
          tags: 'tags [get --id <id> | add --id <id> --group <g> --value <v> | remove --id <id> --group <g> --value <v>]',
          options: '--business-unit <id> --limit <n> --stars <1-5> --language <code>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
