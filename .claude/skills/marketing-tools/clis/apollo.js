#!/usr/bin/env node

const API_KEY = process.env.APOLLO_API_KEY
const BASE_URL = 'https://api.apollo.io/api/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'APOLLO_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const authBody = body ? { ...body, api_key: API_KEY } : { api_key: API_KEY }
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Content-Type': 'application/json' }, body: { ...authBody, api_key: '***' } }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authBody),
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
    case 'people':
      switch (sub) {
        case 'search': {
          const body = { page, per_page: perPage }
          if (args.titles) body.person_titles = args.titles.split(',')
          if (args.locations) body.person_locations = args.locations.split(',')
          if (args.seniorities) body.person_seniorities = args.seniorities.split(',')
          if (args['employee-ranges']) body.organization_num_employees_ranges = args['employee-ranges'].split(',').map(r => r.trim())
          if (args.keywords) body.q_keywords = args.keywords
          result = await api('POST', '/mixed_people/search', body)
          break
        }
        case 'enrich': {
          const body = {}
          if (args.email) body.email = args.email
          if (args['first-name']) body.first_name = args['first-name']
          if (args['last-name']) body.last_name = args['last-name']
          if (args.domain) body.domain = args.domain
          if (args.linkedin) body.linkedin_url = args.linkedin
          if (!args.email && !args.linkedin && !(args['first-name'] && args.domain)) {
            result = { error: '--email, --linkedin, or --first-name + --domain required' }
            break
          }
          result = await api('POST', '/people/match', body)
          break
        }
        case 'bulk-enrich': {
          const emails = args.emails?.split(',')
          if (!emails) { result = { error: '--emails required (comma-separated)' }; break }
          const details = emails.map(email => ({ email: email.trim() }))
          result = await api('POST', '/people/bulk_match', { details })
          break
        }
        default:
          result = { error: 'Unknown people subcommand. Use: search, enrich, bulk-enrich' }
      }
      break

    case 'organizations':
      switch (sub) {
        case 'search': {
          const body = { page, per_page: perPage }
          if (args.locations) body.organization_locations = args.locations.split(',')
          if (args['employee-ranges']) body.organization_num_employees_ranges = args['employee-ranges'].split(',').map(r => r.trim())
          if (args.keywords) body.q_keywords = args.keywords
          result = await api('POST', '/mixed_companies/search', body)
          break
        }
        case 'enrich': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          result = await api('POST', '/organizations/enrich', { domain })
          break
        }
        default:
          result = { error: 'Unknown organizations subcommand. Use: search, enrich' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          people: {
            search: 'people search [--titles <t1,t2>] [--locations <l1,l2>] [--seniorities <s1,s2>] [--employee-ranges <1,100>] [--keywords <kw>] [--page <n>]',
            enrich: 'people enrich --email <email> | --first-name <name> --last-name <name> --domain <domain> | --linkedin <url>',
            'bulk-enrich': 'people bulk-enrich --emails <e1,e2,e3>',
          },
          organizations: {
            search: 'organizations search [--locations <l1,l2>] [--employee-ranges <1,100>] [--keywords <kw>] [--page <n>]',
            enrich: 'organizations enrich --domain <domain>',
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
