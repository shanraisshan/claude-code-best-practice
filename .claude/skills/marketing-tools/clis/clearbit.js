#!/usr/bin/env node

const API_KEY = process.env.CLEARBIT_API_KEY

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'CLEARBIT_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, baseUrl, path, body) {
  const auth = 'Basic ' + Buffer.from(`${API_KEY}:`).toString('base64')
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${baseUrl}${path}`, headers: { 'Authorization': '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${baseUrl}${path}`, {
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

async function main() {
  let result

  switch (cmd) {
    case 'person':
      switch (sub) {
        case 'find': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          result = await api('GET', 'https://person-stream.clearbit.com', `/v2/people/find?email=${encodeURIComponent(email)}`)
          break
        }
        default:
          result = { error: 'Unknown person subcommand. Use: find' }
      }
      break

    case 'company':
      switch (sub) {
        case 'find': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          result = await api('GET', 'https://company-stream.clearbit.com', `/v2/companies/find?domain=${encodeURIComponent(domain)}`)
          break
        }
        default:
          result = { error: 'Unknown company subcommand. Use: find' }
      }
      break

    case 'combined':
      switch (sub) {
        case 'find': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          result = await api('GET', 'https://person-stream.clearbit.com', `/v2/combined/find?email=${encodeURIComponent(email)}`)
          break
        }
        default:
          result = { error: 'Unknown combined subcommand. Use: find' }
      }
      break

    case 'reveal':
      switch (sub) {
        case 'find': {
          const ip = args.ip
          if (!ip) { result = { error: '--ip required' }; break }
          result = await api('GET', 'https://reveal.clearbit.com', `/v1/companies/find?ip=${encodeURIComponent(ip)}`)
          break
        }
        default:
          result = { error: 'Unknown reveal subcommand. Use: find' }
      }
      break

    case 'name-to-domain':
      switch (sub) {
        case 'find': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          result = await api('GET', 'https://company.clearbit.com', `/v1/domains/find?name=${encodeURIComponent(name)}`)
          break
        }
        default:
          result = { error: 'Unknown name-to-domain subcommand. Use: find' }
      }
      break

    case 'prospector':
      switch (sub) {
        case 'search': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          const params = new URLSearchParams({ domain })
          if (args.role) params.set('role', args.role)
          if (args.seniority) params.set('seniority', args.seniority)
          if (args.title) params.set('title', args.title)
          if (args.page) params.set('page', args.page)
          if (args['page-size']) params.set('page_size', args['page-size'])
          result = await api('GET', 'https://prospector.clearbit.com', `/v1/people/search?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown prospector subcommand. Use: search' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          person: 'person find --email <email>',
          company: 'company find --domain <domain>',
          combined: 'combined find --email <email>',
          reveal: 'reveal find --ip <ip>',
          'name-to-domain': 'name-to-domain find --name <company_name>',
          prospector: 'prospector search --domain <domain> [--role <role>] [--seniority <level>] [--title <title>]',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
