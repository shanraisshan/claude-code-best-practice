#!/usr/bin/env node

const API_KEY = process.env.AIROPS_API_KEY
const WORKSPACE_ID = process.env.AIROPS_WORKSPACE_ID
const BASE_URL = 'https://api.airops.com/public_api/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'AIROPS_API_KEY environment variable required' }))
  process.exit(1)
}

if (!WORKSPACE_ID) {
  console.error(JSON.stringify({ error: 'AIROPS_WORKSPACE_ID environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const url = `${BASE_URL}${path}`
  if (args['dry-run']) {
    return { _dry_run: true, method, url, headers: { 'Authorization': 'Bearer ***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(url, {
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
    case 'flows':
      switch (sub) {
        case 'list': {
          result = await api('GET', `/workspaces/${WORKSPACE_ID}/flows`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/workspaces/${WORKSPACE_ID}/flows/${id}`)
          break
        }
        case 'execute': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const inputs = args.inputs
          let parsedInputs = {}
          if (inputs) {
            try {
              parsedInputs = JSON.parse(inputs)
            } catch {
              result = { error: '--inputs must be valid JSON' }
              break
            }
          }
          result = await api('POST', `/workspaces/${WORKSPACE_ID}/flows/${id}/execute`, { inputs: parsedInputs })
          break
        }
        case 'runs': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/workspaces/${WORKSPACE_ID}/flows/${id}/runs`)
          break
        }
        case 'run-status': {
          const runId = args['run-id']
          if (!runId) { result = { error: '--run-id required' }; break }
          result = await api('GET', `/workspaces/${WORKSPACE_ID}/runs/${runId}`)
          break
        }
        default:
          result = { error: 'Unknown flows subcommand. Use: list, get, execute, runs, run-status' }
      }
      break

    case 'workflows':
      switch (sub) {
        case 'list': {
          result = await api('GET', `/workspaces/${WORKSPACE_ID}/workflows`)
          break
        }
        case 'execute': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          const inputs = args.inputs
          let parsedInputs = {}
          if (inputs) {
            try {
              parsedInputs = JSON.parse(inputs)
            } catch {
              result = { error: '--inputs must be valid JSON' }
              break
            }
          }
          result = await api('POST', `/workspaces/${WORKSPACE_ID}/workflows/${id}/execute`, { inputs: parsedInputs })
          break
        }
        default:
          result = { error: 'Unknown workflows subcommand. Use: list, execute' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          flows: {
            list: 'flows list',
            get: 'flows get --id <id>',
            execute: 'flows execute --id <id> --inputs <json>',
            runs: 'flows runs --id <id>',
            'run-status': 'flows run-status --run-id <id>',
          },
          workflows: {
            list: 'workflows list',
            execute: 'workflows execute --id <id> --inputs <json>',
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
