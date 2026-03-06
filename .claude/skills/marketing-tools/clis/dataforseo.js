#!/usr/bin/env node

const LOGIN = process.env.DATAFORSEO_LOGIN
const PASSWORD = process.env.DATAFORSEO_PASSWORD
const BASE_URL = 'https://api.dataforseo.com/v3'

if (!LOGIN || !PASSWORD) {
  console.error(JSON.stringify({ error: 'DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD environment variables required' }))
  process.exit(1)
}

const AUTH = 'Basic ' + Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64')

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': AUTH,
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
  const location = args.location || 'United States'
  const locationCode = args['location-code'] ? Number(args['location-code']) : 2840
  const language = args.language || 'English'
  const languageCode = args['language-code'] || 'en'
  const limit = args.limit ? Number(args.limit) : 100

  switch (cmd) {
    case 'serp':
      switch (sub) {
        case 'google': {
          const keyword = args.keyword
          if (!keyword) { result = { error: '--keyword required' }; break }
          result = await api('POST', '/serp/google/organic/live/regular', [{
            keyword,
            location_name: location,
            language_name: language,
          }])
          break
        }
        case 'locations':
          result = await api('GET', '/serp/google/locations')
          break
        case 'languages':
          result = await api('GET', '/serp/google/languages')
          break
        default:
          result = { error: 'Unknown serp subcommand. Use: google, locations, languages' }
      }
      break

    case 'keywords':
      switch (sub) {
        case 'volume': {
          const keywords = args.keywords?.split(',')
          if (!keywords) { result = { error: '--keywords required (comma-separated)' }; break }
          result = await api('POST', '/keywords_data/google_ads/search_volume/live', [{
            keywords,
            location_code: locationCode,
            language_code: languageCode,
          }])
          break
        }
        case 'for-site': {
          const target = args.target
          if (!target) { result = { error: '--target required (domain)' }; break }
          result = await api('POST', '/keywords_data/google_ads/keywords_for_site/live', [{
            target,
            location_code: locationCode,
            language_code: languageCode,
          }])
          break
        }
        case 'for-keywords': {
          const keywords = args.keywords?.split(',')
          if (!keywords) { result = { error: '--keywords required (comma-separated)' }; break }
          result = await api('POST', '/keywords_data/google_ads/keywords_for_keywords/live', [{
            keywords,
            location_code: locationCode,
            language_code: languageCode,
          }])
          break
        }
        case 'trends': {
          const keywords = args.keywords?.split(',')
          if (!keywords) { result = { error: '--keywords required (comma-separated)' }; break }
          result = await api('POST', '/keywords_data/google_trends/explore/live', [{
            keywords,
            location_code: locationCode,
            language_code: languageCode,
          }])
          break
        }
        default:
          result = { error: 'Unknown keywords subcommand. Use: volume, for-site, for-keywords, trends' }
      }
      break

    case 'backlinks':
      switch (sub) {
        case 'summary': {
          const target = args.target
          if (!target) { result = { error: '--target required' }; break }
          result = await api('POST', '/backlinks/summary/live', [{
            target,
            backlinks_status_type: 'live',
          }])
          break
        }
        case 'list': {
          const target = args.target
          if (!target) { result = { error: '--target required' }; break }
          result = await api('POST', '/backlinks/backlinks/live', [{
            target,
            mode: args.mode || 'as_is',
            limit,
            backlinks_status_type: 'live',
          }])
          break
        }
        case 'refdomains': {
          const target = args.target
          if (!target) { result = { error: '--target required' }; break }
          result = await api('POST', '/backlinks/referring_domains/live', [{
            target,
            limit,
          }])
          break
        }
        case 'anchors': {
          const target = args.target
          if (!target) { result = { error: '--target required' }; break }
          result = await api('POST', '/backlinks/anchors/live', [{
            target,
            limit,
          }])
          break
        }
        case 'index':
          result = await api('GET', '/backlinks/index')
          break
        default:
          result = { error: 'Unknown backlinks subcommand. Use: summary, list, refdomains, anchors, index' }
      }
      break

    case 'onpage':
      switch (sub) {
        case 'audit': {
          const url = args.url
          if (!url) { result = { error: '--url required' }; break }
          result = await api('POST', '/on_page/instant_pages', [{
            url,
            enable_javascript: args['no-js'] ? false : true,
          }])
          break
        }
        default:
          result = { error: 'Unknown onpage subcommand. Use: audit' }
      }
      break

    case 'labs':
      switch (sub) {
        case 'competitors': {
          const target = args.target
          if (!target) { result = { error: '--target required' }; break }
          result = await api('POST', '/dataforseo_labs/google/competitors_domain/live', [{
            target,
            location_code: locationCode,
            language_code: languageCode,
            limit,
          }])
          break
        }
        case 'ranked-keywords': {
          const target = args.target
          if (!target) { result = { error: '--target required' }; break }
          result = await api('POST', '/dataforseo_labs/google/ranked_keywords/live', [{
            target,
            location_code: locationCode,
            language_code: languageCode,
            limit,
          }])
          break
        }
        case 'domain-intersection': {
          const targets = args.targets?.split(',')
          if (!targets || targets.length < 2) { result = { error: '--targets required (comma-separated, at least 2 domains)' }; break }
          const payload = { location_code: locationCode, language_code: languageCode, limit }
          targets.forEach((t, i) => { payload[`target${i + 1}`] = t })
          result = await api('POST', '/dataforseo_labs/google/domain_intersection/live', [payload])
          break
        }
        default:
          result = { error: 'Unknown labs subcommand. Use: competitors, ranked-keywords, domain-intersection' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          serp: 'serp [google --keyword <kw> | locations | languages]',
          keywords: 'keywords [volume --keywords <kw1,kw2> | for-site --target <domain> | for-keywords --keywords <kw1,kw2> | trends --keywords <kw1,kw2>]',
          backlinks: 'backlinks [summary --target <domain> | list --target <domain> | refdomains --target <domain> | anchors --target <domain> | index]',
          onpage: 'onpage [audit --url <url>]',
          labs: 'labs [competitors --target <domain> | ranked-keywords --target <domain> | domain-intersection --targets <d1,d2>]',
          options: '--location-code <code> --language-code <code> --limit <n>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
