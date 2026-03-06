#!/usr/bin/env node

const API_KEY = process.env.SIMILARWEB_API_KEY
const BASE_URL = 'https://api.similarweb.com/v1'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'SIMILARWEB_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  const separator = path.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${path}${separator}api_key=${API_KEY}`
  if (args['dry-run']) {
    return { _dry_run: true, method, url: url.replace(API_KEY, '***'), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(url, {
    method,
    headers: {
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
    case 'traffic':
      switch (sub) {
        case 'visits': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          if (!args.start) { result = { error: '--start required (YYYY-MM)' }; break }
          if (!args.end) { result = { error: '--end required (YYYY-MM)' }; break }
          const params = new URLSearchParams({ start_date: args.start, end_date: args.end })
          if (args.country) params.set('country', args.country)
          if (args.granularity) params.set('granularity', args.granularity)
          result = await api('GET', `/website/${encodeURIComponent(domain)}/total-traffic-and-engagement/visits?${params.toString()}`)
          break
        }
        case 'pages-per-visit': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          if (!args.start) { result = { error: '--start required (YYYY-MM)' }; break }
          if (!args.end) { result = { error: '--end required (YYYY-MM)' }; break }
          const params = new URLSearchParams({ start_date: args.start, end_date: args.end })
          if (args.country) params.set('country', args.country)
          if (args.granularity) params.set('granularity', args.granularity)
          result = await api('GET', `/website/${encodeURIComponent(domain)}/total-traffic-and-engagement/pages-per-visit?${params.toString()}`)
          break
        }
        case 'avg-duration': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          if (!args.start) { result = { error: '--start required (YYYY-MM)' }; break }
          if (!args.end) { result = { error: '--end required (YYYY-MM)' }; break }
          const params = new URLSearchParams({ start_date: args.start, end_date: args.end })
          if (args.country) params.set('country', args.country)
          if (args.granularity) params.set('granularity', args.granularity)
          result = await api('GET', `/website/${encodeURIComponent(domain)}/total-traffic-and-engagement/average-visit-duration?${params.toString()}`)
          break
        }
        case 'bounce-rate': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          if (!args.start) { result = { error: '--start required (YYYY-MM)' }; break }
          if (!args.end) { result = { error: '--end required (YYYY-MM)' }; break }
          const params = new URLSearchParams({ start_date: args.start, end_date: args.end })
          if (args.country) params.set('country', args.country)
          if (args.granularity) params.set('granularity', args.granularity)
          result = await api('GET', `/website/${encodeURIComponent(domain)}/total-traffic-and-engagement/bounce-rate?${params.toString()}`)
          break
        }
        case 'sources': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          if (!args.start) { result = { error: '--start required (YYYY-MM)' }; break }
          if (!args.end) { result = { error: '--end required (YYYY-MM)' }; break }
          const params = new URLSearchParams({ start_date: args.start, end_date: args.end })
          if (args.country) params.set('country', args.country)
          result = await api('GET', `/website/${encodeURIComponent(domain)}/traffic-sources/overview?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown traffic subcommand. Use: visits, pages-per-visit, avg-duration, bounce-rate, sources' }
      }
      break

    case 'referrals': {
      const domain = args.domain
      if (!domain) { result = { error: '--domain required' }; break }
      if (!args.start) { result = { error: '--start required (YYYY-MM)' }; break }
      if (!args.end) { result = { error: '--end required (YYYY-MM)' }; break }
      const params = new URLSearchParams({ start_date: args.start, end_date: args.end })
      if (args.country) params.set('country', args.country)
      result = await api('GET', `/website/${encodeURIComponent(domain)}/traffic-sources/referrals?${params.toString()}`)
      break
    }

    case 'search':
      switch (sub) {
        case 'keywords-organic': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          if (!args.start) { result = { error: '--start required (YYYY-MM)' }; break }
          if (!args.end) { result = { error: '--end required (YYYY-MM)' }; break }
          const params = new URLSearchParams({ start_date: args.start, end_date: args.end })
          if (args.country) params.set('country', args.country)
          if (args.limit) params.set('limit', args.limit)
          result = await api('GET', `/website/${encodeURIComponent(domain)}/search/organic-search-keywords?${params.toString()}`)
          break
        }
        case 'keywords-paid': {
          const domain = args.domain
          if (!domain) { result = { error: '--domain required' }; break }
          if (!args.start) { result = { error: '--start required (YYYY-MM)' }; break }
          if (!args.end) { result = { error: '--end required (YYYY-MM)' }; break }
          const params = new URLSearchParams({ start_date: args.start, end_date: args.end })
          if (args.country) params.set('country', args.country)
          if (args.limit) params.set('limit', args.limit)
          result = await api('GET', `/website/${encodeURIComponent(domain)}/search/paid-search-keywords?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown search subcommand. Use: keywords-organic, keywords-paid' }
      }
      break

    case 'competitors': {
      const domain = args.domain
      if (!domain) { result = { error: '--domain required' }; break }
      result = await api('GET', `/website/${encodeURIComponent(domain)}/similar-sites/similarsites`)
      break
    }

    case 'category-rank': {
      const domain = args.domain
      if (!domain) { result = { error: '--domain required' }; break }
      result = await api('GET', `/website/${encodeURIComponent(domain)}/category-rank/category-rank`)
      break
    }

    case 'geography': {
      const domain = args.domain
      if (!domain) { result = { error: '--domain required' }; break }
      if (!args.start) { result = { error: '--start required (YYYY-MM)' }; break }
      if (!args.end) { result = { error: '--end required (YYYY-MM)' }; break }
      const params = new URLSearchParams({ start_date: args.start, end_date: args.end })
      result = await api('GET', `/website/${encodeURIComponent(domain)}/geo/traffic-by-country?${params.toString()}`)
      break
    }

    default:
      result = {
        error: 'Unknown command',
        usage: {
          traffic: {
            visits: 'traffic visits --domain <domain> --start <YYYY-MM> --end <YYYY-MM> [--country <cc>] [--granularity <monthly|weekly|daily>]',
            'pages-per-visit': 'traffic pages-per-visit --domain <domain> --start <YYYY-MM> --end <YYYY-MM>',
            'avg-duration': 'traffic avg-duration --domain <domain> --start <YYYY-MM> --end <YYYY-MM>',
            'bounce-rate': 'traffic bounce-rate --domain <domain> --start <YYYY-MM> --end <YYYY-MM>',
            sources: 'traffic sources --domain <domain> --start <YYYY-MM> --end <YYYY-MM>',
          },
          referrals: 'referrals --domain <domain> --start <YYYY-MM> --end <YYYY-MM>',
          search: {
            'keywords-organic': 'search keywords-organic --domain <domain> --start <YYYY-MM> --end <YYYY-MM>',
            'keywords-paid': 'search keywords-paid --domain <domain> --start <YYYY-MM> --end <YYYY-MM>',
          },
          competitors: 'competitors --domain <domain>',
          'category-rank': 'category-rank --domain <domain>',
          geography: 'geography --domain <domain> --start <YYYY-MM> --end <YYYY-MM>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
