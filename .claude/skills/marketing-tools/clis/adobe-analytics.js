#!/usr/bin/env node

const ACCESS_TOKEN = process.env.ADOBE_ACCESS_TOKEN
const CLIENT_ID = process.env.ADOBE_CLIENT_ID
const COMPANY_ID = process.env.ADOBE_COMPANY_ID

if (!ACCESS_TOKEN || !CLIENT_ID || !COMPANY_ID) {
  console.error(JSON.stringify({ error: 'ADOBE_ACCESS_TOKEN, ADOBE_CLIENT_ID, and ADOBE_COMPANY_ID environment variables required' }))
  process.exit(1)
}

const BASE_URL = `https://analytics.adobe.io/api/${COMPANY_ID}`

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { 'Authorization': '***', 'x-api-key': '***', 'x-proxy-global-company-id': COMPANY_ID, 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'x-api-key': CLIENT_ID,
      'x-proxy-global-company-id': COMPANY_ID,
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
    case 'reportsuites':
      switch (sub) {
        case 'list':
          result = await api('GET', '/reportsuites')
          break
        default:
          result = { error: 'Unknown reportsuites subcommand. Use: list' }
      }
      break

    case 'dimensions':
      switch (sub) {
        case 'list': {
          if (!args.rsid) { result = { error: '--rsid required' }; break }
          const params = new URLSearchParams()
          params.set('rsid', args.rsid)
          result = await api('GET', `/dimensions?${params}`)
          break
        }
        default:
          result = { error: 'Unknown dimensions subcommand. Use: list' }
      }
      break

    case 'metrics':
      switch (sub) {
        case 'list': {
          if (!args.rsid) { result = { error: '--rsid required' }; break }
          const params = new URLSearchParams()
          params.set('rsid', args.rsid)
          result = await api('GET', `/metrics?${params}`)
          break
        }
        default:
          result = { error: 'Unknown metrics subcommand. Use: list' }
      }
      break

    case 'reports':
      switch (sub) {
        case 'run': {
          if (!args.rsid) { result = { error: '--rsid required' }; break }
          if (!args['start-date']) { result = { error: '--start-date required' }; break }
          if (!args['end-date']) { result = { error: '--end-date required' }; break }
          if (!args.metrics) { result = { error: '--metrics required (comma-separated)' }; break }
          const body = {
            rsid: args.rsid,
            globalFilters: [{
              type: 'dateRange',
              dateRange: `${args['start-date']}T00:00:00/${args['end-date']}T23:59:59`,
            }],
            metricContainer: {
              metrics: args.metrics.split(',').map(m => ({ id: m.trim() })),
            },
          }
          if (args.dimension) {
            body.dimension = args.dimension
          }
          result = await api('POST', '/reports', body)
          break
        }
        default:
          result = { error: 'Unknown reports subcommand. Use: run' }
      }
      break

    case 'segments':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.rsid) params.set('rsid', args.rsid)
          result = await api('GET', `/segments?${params}`)
          break
        }
        default:
          result = { error: 'Unknown segments subcommand. Use: list' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          reportsuites: 'reportsuites list',
          dimensions: 'dimensions list --rsid <report_suite_id>',
          metrics: 'metrics list --rsid <report_suite_id>',
          reports: 'reports run --rsid <report_suite_id> --start-date <YYYY-MM-DD> --end-date <YYYY-MM-DD> --metrics <metrics> [--dimension <dimension>]',
          segments: 'segments list [--rsid <report_suite_id>]',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
