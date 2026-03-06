#!/usr/bin/env node

const API_KEY = process.env.PLAUSIBLE_API_KEY
const BASE_URL = process.env.PLAUSIBLE_BASE_URL || 'https://plausible.io'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'PLAUSIBLE_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
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
  const siteId = args['site-id']
  const dateRange = args['date-range'] || '30d'
  const limit = args.limit ? Number(args.limit) : 100

  switch (cmd) {
    case 'stats':
      if (!siteId) { result = { error: '--site-id required (your domain, e.g. example.com)' }; break }
      switch (sub) {
        case 'aggregate': {
          const metrics = args.metrics?.split(',') || ['visitors', 'pageviews', 'bounce_rate', 'visit_duration']
          result = await api('POST', '/api/v2/query', {
            site_id: siteId,
            metrics,
            date_range: dateRange,
          })
          break
        }
        case 'timeseries': {
          const metrics = args.metrics?.split(',') || ['visitors', 'pageviews']
          const period = args.period || 'time:day'
          result = await api('POST', '/api/v2/query', {
            site_id: siteId,
            metrics,
            date_range: dateRange,
            dimensions: [period],
          })
          break
        }
        case 'pages': {
          const metrics = args.metrics?.split(',') || ['visitors', 'pageviews']
          result = await api('POST', '/api/v2/query', {
            site_id: siteId,
            metrics,
            date_range: dateRange,
            dimensions: ['event:page'],
            pagination: { limit },
          })
          break
        }
        case 'sources': {
          const metrics = args.metrics?.split(',') || ['visitors', 'bounce_rate']
          result = await api('POST', '/api/v2/query', {
            site_id: siteId,
            metrics,
            date_range: dateRange,
            dimensions: ['visit:source'],
            pagination: { limit },
          })
          break
        }
        case 'countries': {
          const metrics = args.metrics?.split(',') || ['visitors', 'percentage']
          result = await api('POST', '/api/v2/query', {
            site_id: siteId,
            metrics,
            date_range: dateRange,
            dimensions: ['visit:country'],
            pagination: { limit },
          })
          break
        }
        case 'devices': {
          const metrics = args.metrics?.split(',') || ['visitors', 'percentage']
          result = await api('POST', '/api/v2/query', {
            site_id: siteId,
            metrics,
            date_range: dateRange,
            dimensions: ['visit:device'],
            pagination: { limit },
          })
          break
        }
        case 'utm': {
          const param = args.param || 'utm_source'
          const metrics = args.metrics?.split(',') || ['visitors', 'bounce_rate']
          result = await api('POST', '/api/v2/query', {
            site_id: siteId,
            metrics,
            date_range: dateRange,
            dimensions: [`visit:${param}`],
            pagination: { limit },
          })
          break
        }
        case 'query': {
          const metrics = args.metrics?.split(',')
          if (!metrics) { result = { error: '--metrics required (comma-separated)' }; break }
          const body = { site_id: siteId, metrics, date_range: dateRange }
          if (args.dimensions) body.dimensions = args.dimensions.split(',')
          if (args.filters) {
            try { body.filters = JSON.parse(args.filters) } catch { result = { error: '--filters must be valid JSON' }; break }
          }
          body.pagination = { limit }
          result = await api('POST', '/api/v2/query', body)
          break
        }
        case 'realtime':
          result = await api('GET', `/api/v1/stats/realtime/visitors?site_id=${encodeURIComponent(siteId)}`)
          break
        default:
          result = { error: 'Unknown stats subcommand. Use: aggregate, timeseries, pages, sources, countries, devices, utm, query, realtime' }
      }
      break

    case 'sites':
      switch (sub) {
        case 'list':
          result = await api('GET', '/api/v1/sites')
          break
        case 'get': {
          if (!siteId) { result = { error: '--site-id required' }; break }
          result = await api('GET', `/api/v1/sites/${encodeURIComponent(siteId)}`)
          break
        }
        case 'create': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          const body = { domain }
          if (args.timezone) body.timezone = args.timezone
          result = await api('POST', '/api/v1/sites', body)
          break
        }
        case 'delete': {
          if (!siteId) { result = { error: '--site-id required' }; break }
          result = await api('DELETE', `/api/v1/sites/${encodeURIComponent(siteId)}`)
          break
        }
        default:
          result = { error: 'Unknown sites subcommand. Use: list, get, create, delete' }
      }
      break

    case 'goals':
      if (!siteId) { result = { error: '--site-id required' }; break }
      switch (sub) {
        case 'list':
          result = await api('GET', `/api/v1/sites/goals?site_id=${encodeURIComponent(siteId)}`)
          break
        case 'create': {
          const goalType = args['goal-type']
          if (!goalType) { result = { error: '--goal-type required (event or page)' }; break }
          const body = { site_id: siteId, goal_type: goalType }
          if (goalType === 'event') {
            if (!args['event-name']) { result = { error: '--event-name required for event goals' }; break }
            body.event_name = args['event-name']
          } else if (goalType === 'page') {
            if (!args['page-path']) { result = { error: '--page-path required for page goals' }; break }
            body.page_path = args['page-path']
          }
          result = await api('PUT', '/api/v1/sites/goals', body)
          break
        }
        case 'delete': {
          const goalId = args['goal-id']
          if (!goalId) { result = { error: '--goal-id required' }; break }
          result = await api('DELETE', `/api/v1/sites/goals/${goalId}`, { site_id: siteId })
          break
        }
        default:
          result = { error: 'Unknown goals subcommand. Use: list, create, delete' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          stats: {
            aggregate: 'stats aggregate --site-id <domain> [--date-range <30d>] [--metrics <m1,m2>]',
            timeseries: 'stats timeseries --site-id <domain> [--date-range <30d>] [--period <time:day>]',
            pages: 'stats pages --site-id <domain> [--date-range <30d>] [--limit <n>]',
            sources: 'stats sources --site-id <domain> [--date-range <30d>]',
            countries: 'stats countries --site-id <domain> [--date-range <30d>]',
            devices: 'stats devices --site-id <domain> [--date-range <30d>]',
            utm: 'stats utm --site-id <domain> [--param <utm_source>] [--date-range <30d>]',
            query: 'stats query --site-id <domain> --metrics <m1,m2> [--dimensions <d1,d2>] [--filters <json>]',
            realtime: 'stats realtime --site-id <domain>',
          },
          sites: 'sites [list | get --site-id <domain> | create --domain <domain> | delete --site-id <domain>]',
          goals: 'goals [list | create --goal-type <event|page> --event-name <name> | delete --goal-id <id>] --site-id <domain>',
          options: '--date-range <day|7d|30d|month|6mo|12mo|year> --limit <n>',
          env: 'PLAUSIBLE_BASE_URL for self-hosted instances (default: https://plausible.io)',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
