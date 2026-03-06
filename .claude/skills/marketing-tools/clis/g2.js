#!/usr/bin/env node

const API_TOKEN = process.env.G2_API_TOKEN
const BASE_URL = 'https://data.g2.com/api/v1'

if (!API_TOKEN) {
  console.error(JSON.stringify({ error: 'G2_API_TOKEN environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/vnd.api+json', Accept: 'application/vnd.api+json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Token token=${API_TOKEN}`,
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
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
  const productId = args['product-id'] || args.product

  switch (cmd) {
    case 'reviews':
      switch (sub) {
        case 'list': {
          let qs = `?page[size]=${perPage}&page[number]=${page}`
          if (productId) qs += `&filter[product_id]=${productId}`
          if (args.state) qs += `&filter[state]=${encodeURIComponent(args.state)}`
          result = await api('GET', `/survey-responses${qs}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/survey-responses/${id}`)
          break
        }
        default:
          result = { error: 'Unknown reviews subcommand. Use: list, get' }
      }
      break

    case 'products':
      switch (sub) {
        case 'list': {
          let qs = `?page[size]=${perPage}&page[number]=${page}`
          if (args.name) qs += `&filter[name]=${encodeURIComponent(args.name)}`
          result = await api('GET', `/products${qs}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/products/${id}`)
          break
        }
        default:
          result = { error: 'Unknown products subcommand. Use: list, get' }
      }
      break

    case 'reports':
      switch (sub) {
        case 'list': {
          let qs = `?page[size]=${perPage}&page[number]=${page}`
          result = await api('GET', `/reports${qs}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/reports/${id}`)
          break
        }
        default:
          result = { error: 'Unknown reports subcommand. Use: list, get' }
      }
      break

    case 'competitors':
      switch (sub) {
        case 'list': {
          if (!productId) { result = { error: '--product-id required' }; break }
          let qs = `?page[size]=${perPage}&page[number]=${page}&filter[product_id]=${productId}`
          result = await api('GET', `/competitor-comparisons${qs}`)
          break
        }
        default:
          result = { error: 'Unknown competitors subcommand. Use: list' }
      }
      break

    case 'categories':
      switch (sub) {
        case 'list': {
          let qs = `?page[size]=${perPage}&page[number]=${page}`
          if (args.name) qs += `&filter[name]=${encodeURIComponent(args.name)}`
          result = await api('GET', `/categories${qs}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/categories/${id}`)
          break
        }
        default:
          result = { error: 'Unknown categories subcommand. Use: list, get' }
      }
      break

    case 'tracking':
      switch (sub) {
        case 'visitors': {
          let qs = `?page[size]=${perPage}&page[number]=${page}`
          if (args.start) qs += `&filter[start_date]=${encodeURIComponent(args.start)}`
          if (args.end) qs += `&filter[end_date]=${encodeURIComponent(args.end)}`
          result = await api('GET', `/tracking-events${qs}`)
          break
        }
        default:
          result = { error: 'Unknown tracking subcommand. Use: visitors' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          reviews: 'reviews [list --product-id <id> | get --id <id>]',
          products: 'products [list --name <name> | get --id <id>]',
          reports: 'reports [list | get --id <id>]',
          competitors: 'competitors [list --product-id <id>]',
          categories: 'categories [list --name <name> | get --id <id>]',
          tracking: 'tracking [visitors --start <date> --end <date>]',
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
