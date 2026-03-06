#!/usr/bin/env node

const ACCESS_TOKEN = process.env.GSC_ACCESS_TOKEN
const BASE_URL = 'https://searchconsole.googleapis.com'

if (!ACCESS_TOKEN) {
  console.error(JSON.stringify({ error: 'GSC_ACCESS_TOKEN environment variable required' }))
  process.exit(1)
}

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
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

function getDefaultDates() {
  const end = new Date()
  end.setDate(end.getDate() - 3)
  const start = new Date(end)
  start.setDate(start.getDate() - 28)
  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  }
}

async function main() {
  let result
  const siteUrl = args['site-url']

  switch (cmd) {
    case 'search': {
      if (!siteUrl) {
        result = { error: '--site-url is required for search commands' }
        break
      }
      const encodedSiteUrl = encodeURIComponent(siteUrl)
      const defaults = getDefaultDates()
      const body = {
        startDate: args['start-date'] || defaults.startDate,
        endDate: args['end-date'] || defaults.endDate,
        rowLimit: parseInt(args.limit || '100', 10),
      }

      switch (sub) {
        case 'query':
          body.dimensions = ['query']
          result = await api('POST', `/webmasters/v3/sites/${encodedSiteUrl}/searchAnalytics/query`, body)
          break
        case 'pages':
          body.dimensions = ['page']
          result = await api('POST', `/webmasters/v3/sites/${encodedSiteUrl}/searchAnalytics/query`, body)
          break
        case 'countries':
          body.dimensions = ['country']
          result = await api('POST', `/webmasters/v3/sites/${encodedSiteUrl}/searchAnalytics/query`, body)
          break
        default:
          result = { error: 'Unknown search subcommand. Use: query, pages, countries' }
      }
      break
    }

    case 'inspect': {
      if (!siteUrl) {
        result = { error: '--site-url is required for inspect commands' }
        break
      }
      switch (sub) {
        case 'url':
          if (!args.url) { result = { error: '--url required (URL to inspect)' }; break }
          result = await api('POST', '/v1/urlInspection/index:inspect', {
            inspectionUrl: args.url,
            siteUrl: siteUrl,
          })
          break
        default:
          result = { error: 'Unknown inspect subcommand. Use: url' }
      }
      break
    }

    case 'sitemaps': {
      if (!siteUrl) {
        result = { error: '--site-url is required for sitemaps commands' }
        break
      }
      const encodedSiteUrl = encodeURIComponent(siteUrl)
      switch (sub) {
        case 'list':
          result = await api('GET', `/webmasters/v3/sites/${encodedSiteUrl}/sitemaps`)
          break
        case 'submit': {
          if (!args['sitemap-url']) { result = { error: '--sitemap-url required' }; break }
          const sitemapUrl = encodeURIComponent(args['sitemap-url'])
          result = await api('PUT', `/webmasters/v3/sites/${encodedSiteUrl}/sitemaps/${sitemapUrl}`)
          if (!result.body && !result.error) {
            result = { success: true, message: 'Sitemap submitted successfully' }
          }
          break
        }
        default:
          result = { error: 'Unknown sitemaps subcommand. Use: list, submit' }
      }
      break
    }

    default:
      result = {
        error: 'Unknown command',
        usage: {
          'search query': 'search query --site-url <url> [--start-date <date>] [--end-date <date>] [--limit <n>]',
          'search pages': 'search pages --site-url <url> [--start-date <date>] [--end-date <date>] [--limit <n>]',
          'search countries': 'search countries --site-url <url> [--start-date <date>] [--end-date <date>] [--limit <n>]',
          'inspect url': 'inspect url --site-url <url> --url <page-url>',
          'sitemaps list': 'sitemaps list --site-url <url>',
          'sitemaps submit': 'sitemaps submit --site-url <url> --sitemap-url <sitemap-url>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
