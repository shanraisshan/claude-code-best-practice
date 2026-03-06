#!/usr/bin/env node

const BASE_URL = 'https://api.zoominfo.com'

let ACCESS_TOKEN = process.env.ZOOMINFO_ACCESS_TOKEN

if (!ACCESS_TOKEN && !process.env.ZOOMINFO_USERNAME) {
  console.error(JSON.stringify({ error: 'ZOOMINFO_ACCESS_TOKEN or ZOOMINFO_USERNAME + ZOOMINFO_PRIVATE_KEY environment variables required' }))
  process.exit(1)
}

async function authenticate() {
  if (ACCESS_TOKEN) return ACCESS_TOKEN
  const username = process.env.ZOOMINFO_USERNAME
  const password = process.env.ZOOMINFO_PRIVATE_KEY
  if (!username || !password) {
    throw new Error('ZOOMINFO_USERNAME and ZOOMINFO_PRIVATE_KEY required for authentication')
  }
  const res = await fetch(`${BASE_URL}/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Authentication failed (${res.status}): ${text}`)
  }
  try {
    const data = JSON.parse(text)
    if (!data.jwt) throw new Error('No JWT in response')
    ACCESS_TOKEN = data.jwt
    return ACCESS_TOKEN
  } catch (e) {
    if (e.message === 'No JWT in response') throw e
    throw new Error(`Authentication failed: ${text}`)
  }
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ***' }, body }
  }
  const token = await authenticate()
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
  const page = args.page ? Number(args.page) : 1
  const perPage = args['per-page'] ? Number(args['per-page']) : 25

  switch (cmd) {
    case 'auth': {
      if (args['dry-run']) {
        result = { _dry_run: true, action: 'authenticate', url: `${BASE_URL}/authenticate`, jwt: '***' }
        break
      }
      const token = await authenticate()
      result = { jwt: token }
      break
    }

    case 'contacts':
      switch (sub) {
        case 'search': {
          const body = { rpp: perPage, page }
          if (args['job-title']) body.jobTitle = [args['job-title']]
          if (args.company) body.companyName = [args.company]
          if (args.location) body.locationSearchType = 'PersonLocation', body.personLocationCity = [args.location]
          if (args.seniority) body.managementLevel = [args.seniority]
          if (args.department) body.department = [args.department]
          result = await api('POST', '/search/contact', body)
          break
        }
        case 'enrich': {
          const body = {}
          if (args.email) body.matchEmail = [args.email]
          if (args['person-id']) body.personId = [args['person-id']]
          if (!args.email && !args['person-id']) {
            result = { error: '--email or --person-id required' }
            break
          }
          result = await api('POST', '/enrich/contact', body)
          break
        }
        default:
          result = { error: 'Unknown contacts subcommand. Use: search, enrich' }
      }
      break

    case 'companies':
      switch (sub) {
        case 'search': {
          const body = { rpp: perPage, page }
          if (args.name) body.companyName = [args.name]
          if (args.industry) body.industry = [args.industry]
          if (args['revenue-min']) body.revenueMin = Number(args['revenue-min'])
          if (args['revenue-max']) body.revenueMax = Number(args['revenue-max'])
          if (args['employees-min']) body.employeeCountMin = Number(args['employees-min'])
          if (args['employees-max']) body.employeeCountMax = Number(args['employees-max'])
          result = await api('POST', '/search/company', body)
          break
        }
        case 'enrich': {
          const body = {}
          if (args.domain) body.matchCompanyWebsite = [args.domain]
          if (args['company-id']) body.companyId = [args['company-id']]
          if (!args.domain && !args['company-id']) {
            result = { error: '--domain or --company-id required' }
            break
          }
          result = await api('POST', '/enrich/company', body)
          break
        }
        default:
          result = { error: 'Unknown companies subcommand. Use: search, enrich' }
      }
      break

    case 'intent':
      switch (sub) {
        case 'search': {
          if (!args.topic) {
            result = { error: '--topic required' }
            break
          }
          const body = { topicId: [args.topic] }
          if (args['company-id']) body.companyId = [args['company-id']]
          result = await api('POST', '/lookup/intent', body)
          break
        }
        default:
          result = { error: 'Unknown intent subcommand. Use: search' }
      }
      break

    case 'scoops':
      switch (sub) {
        case 'search': {
          const body = { rpp: perPage, page }
          if (args['company-id']) body.companyId = [args['company-id']]
          if (args.topic) body.topicId = [args.topic]
          result = await api('POST', '/lookup/scoops', body)
          break
        }
        default:
          result = { error: 'Unknown scoops subcommand. Use: search' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          auth: 'auth — authenticate and get JWT token',
          contacts: {
            search: 'contacts search [--job-title <t>] [--company <c>] [--location <l>] [--seniority <s>] [--department <d>] [--page <n>]',
            enrich: 'contacts enrich --email <email> | --person-id <id>',
          },
          companies: {
            search: 'companies search [--name <n>] [--industry <i>] [--revenue-min <n>] [--employees-min <n>] [--page <n>]',
            enrich: 'companies enrich --domain <domain> | --company-id <id>',
          },
          intent: {
            search: 'intent search --topic <topic> [--company-id <id>]',
          },
          scoops: {
            search: 'scoops search [--company-id <id>] [--topic <topic>] [--page <n>]',
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
