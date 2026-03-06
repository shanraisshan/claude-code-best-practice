#!/usr/bin/env node

const API_KEY = process.env.ZAPIER_API_KEY
const BASE_URL = 'https://api.zapier.com/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'ZAPIER_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'X-API-Key': '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
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

async function webhookPost(url, data) {
  if (args['dry-run']) {
    return { _dry_run: true, method: 'POST', url, headers: { 'Content-Type': 'application/json' }, body: data || undefined }
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
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
    case 'zaps':
      switch (sub) {
        case 'list':
          result = await api('GET', '/zaps')
          break
        case 'get': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('GET', `/zaps/${args.id}`)
          break
        }
        case 'on': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('POST', `/zaps/${args.id}/on`)
          break
        }
        case 'off': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('POST', `/zaps/${args.id}/off`)
          break
        }
        default:
          result = { error: 'Unknown zaps subcommand. Use: list, get, on, off' }
      }
      break

    case 'tasks':
      switch (sub) {
        case 'list': {
          if (!args['zap-id']) { result = { error: '--zap-id required' }; break }
          result = await api('GET', `/zaps/${args['zap-id']}/tasks`)
          break
        }
        default:
          result = { error: 'Unknown tasks subcommand. Use: list' }
      }
      break

    case 'profile':
      switch (sub) {
        case 'me':
          result = await api('GET', '/profiles/me')
          break
        default:
          result = { error: 'Unknown profile subcommand. Use: me' }
      }
      break

    case 'hooks':
      switch (sub) {
        case 'send': {
          if (!args.url) { result = { error: '--url required' }; break }
          if (!args.data) { result = { error: '--data required (JSON string)' }; break }
          let data
          try {
            data = JSON.parse(args.data)
          } catch {
            result = { error: 'Invalid JSON for --data' }
            break
          }
          result = await webhookPost(args.url, data)
          break
        }
        default:
          result = { error: 'Unknown hooks subcommand. Use: send' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          zaps: 'zaps [list|get|on|off] [--id <zap_id>]',
          tasks: 'tasks [list] --zap-id <zap_id>',
          profile: 'profile [me]',
          hooks: 'hooks [send] --url <webhook_url> --data <json>',
        },
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
