#!/usr/bin/env node

const API_KEY = process.env.POSTMARK_API_KEY
const BASE_URL = 'https://api.postmarkapp.com'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'POSTMARK_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body, useAccountToken) {
  if (args['dry-run']) {
    const maskedHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    if (useAccountToken) {
      maskedHeaders['X-Postmark-Account-Token'] = '***'
    } else {
      maskedHeaders['X-Postmark-Server-Token'] = '***'
    }
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: maskedHeaders, body: body || undefined }
  }
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  if (useAccountToken) {
    headers['X-Postmark-Account-Token'] = API_KEY
  } else {
    headers['X-Postmark-Server-Token'] = API_KEY
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
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
    case 'email':
      switch (sub) {
        case 'send': {
          const from = args.from
          const to = args.to
          const subject = args.subject
          if (!from) { result = { error: '--from required' }; break }
          if (!to) { result = { error: '--to required' }; break }
          if (!subject) { result = { error: '--subject required' }; break }
          const body = {
            From: from,
            To: to,
            Subject: subject,
          }
          if (args.html) body.HtmlBody = args.html
          if (args.text) body.TextBody = args.text
          if (!args.html && !args.text) body.TextBody = ''
          if (args.tag) body.Tag = args.tag
          if (args.stream) body.MessageStream = args.stream
          if (args['track-opens']) body.TrackOpens = true
          if (args['track-links']) body.TrackLinks = args['track-links']
          if (args.cc) body.Cc = args.cc
          if (args.bcc) body.Bcc = args.bcc
          if (args['reply-to']) body.ReplyTo = args['reply-to']
          result = await api('POST', '/email', body)
          break
        }
        case 'send-template': {
          const from = args.from
          const to = args.to
          const template = args.template
          if (!from) { result = { error: '--from required' }; break }
          if (!to) { result = { error: '--to required' }; break }
          if (!template) { result = { error: '--template required (template ID or alias)' }; break }
          const body = {
            From: from,
            To: to,
            TemplateModel: {},
          }
          const templateNum = Number(template)
          if (!isNaN(templateNum)) {
            body.TemplateId = templateNum
          } else {
            body.TemplateAlias = template
          }
          if (args.model) {
            const pairs = args.model.split(',')
            for (const pair of pairs) {
              const [k, v] = pair.split(':')
              if (k && v) body.TemplateModel[k] = v
            }
          }
          if (args.stream) body.MessageStream = args.stream
          if (args.tag) body.Tag = args.tag
          result = await api('POST', '/email/withTemplate', body)
          break
        }
        case 'send-batch': {
          const from = args.from
          const to = args.to
          const subject = args.subject
          if (!from || !to || !subject) {
            result = { error: '--from, --to (comma-separated), and --subject required' }; break
          }
          const recipients = to.split(',')
          const messages = recipients.map(recipient => ({
            From: from,
            To: recipient.trim(),
            Subject: subject,
            TextBody: args.text || '',
            HtmlBody: args.html || undefined,
            MessageStream: args.stream || undefined,
            Tag: args.tag || undefined,
          }))
          result = await api('POST', '/email/batch', messages)
          break
        }
        default:
          result = { error: 'Unknown email subcommand. Use: send, send-template, send-batch' }
      }
      break

    case 'templates':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('Count', args.count || '100')
          params.set('Offset', args.offset || '0')
          if (args.type) params.set('TemplateType', args.type)
          result = await api('GET', `/templates?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required (template ID or alias)' }; break }
          result = await api('GET', `/templates/${id}`)
          break
        }
        case 'create': {
          const name = args.name
          if (!name) { result = { error: '--name required' }; break }
          const body = {
            Name: name,
            Subject: args.subject || '',
          }
          if (args.html) body.HtmlBody = args.html
          if (args.text) body.TextBody = args.text
          if (args.alias) body.Alias = args.alias
          if (args.type) body.TemplateType = args.type
          result = await api('POST', '/templates', body)
          break
        }
        case 'delete': {
          const id = args.id
          if (!id) { result = { error: '--id required (template ID or alias)' }; break }
          result = await api('DELETE', `/templates/${id}`)
          break
        }
        default:
          result = { error: 'Unknown templates subcommand. Use: list, get, create, delete' }
      }
      break

    case 'bounces':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          params.set('count', args.count || '50')
          params.set('offset', args.offset || '0')
          if (args.type) params.set('type', args.type)
          if (args.inactive) params.set('inactive', args.inactive)
          if (args.email) params.set('emailFilter', args.email)
          result = await api('GET', `/bounces?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('GET', `/bounces/${id}`)
          break
        }
        case 'stats':
          result = await api('GET', '/deliverystats')
          break
        case 'activate': {
          const id = args.id
          if (!id) { result = { error: '--id required' }; break }
          result = await api('PUT', `/bounces/${id}/activate`)
          break
        }
        default:
          result = { error: 'Unknown bounces subcommand. Use: list, get, stats, activate' }
      }
      break

    case 'messages':
      switch (sub) {
        case 'outbound': {
          const params = new URLSearchParams()
          params.set('count', args.count || '50')
          params.set('offset', args.offset || '0')
          if (args.recipient) params.set('recipient', args.recipient)
          if (args.tag) params.set('tag', args.tag)
          if (args.status) params.set('status', args.status)
          result = await api('GET', `/messages/outbound?${params.toString()}`)
          break
        }
        case 'inbound': {
          const params = new URLSearchParams()
          params.set('count', args.count || '50')
          params.set('offset', args.offset || '0')
          if (args.recipient) params.set('recipient', args.recipient)
          if (args.status) params.set('status', args.status)
          result = await api('GET', `/messages/inbound?${params.toString()}`)
          break
        }
        case 'get': {
          const id = args.id
          if (!id) { result = { error: '--id required (message ID)' }; break }
          result = await api('GET', `/messages/outbound/${id}/details`)
          break
        }
        default:
          result = { error: 'Unknown messages subcommand. Use: outbound, inbound, get' }
      }
      break

    case 'stats':
      switch (sub) {
        case 'overview': {
          const params = new URLSearchParams()
          if (args.tag) params.set('tag', args.tag)
          if (args.from) params.set('fromdate', args.from)
          if (args.to) params.set('todate', args.to)
          result = await api('GET', `/stats/outbound?${params.toString()}`)
          break
        }
        case 'sends': {
          const params = new URLSearchParams()
          if (args.tag) params.set('tag', args.tag)
          if (args.from) params.set('fromdate', args.from)
          if (args.to) params.set('todate', args.to)
          result = await api('GET', `/stats/outbound/sends?${params.toString()}`)
          break
        }
        case 'bounces': {
          const params = new URLSearchParams()
          if (args.tag) params.set('tag', args.tag)
          if (args.from) params.set('fromdate', args.from)
          if (args.to) params.set('todate', args.to)
          result = await api('GET', `/stats/outbound/bounces?${params.toString()}`)
          break
        }
        case 'opens': {
          const params = new URLSearchParams()
          if (args.tag) params.set('tag', args.tag)
          if (args.from) params.set('fromdate', args.from)
          if (args.to) params.set('todate', args.to)
          result = await api('GET', `/stats/outbound/opens?${params.toString()}`)
          break
        }
        case 'clicks': {
          const params = new URLSearchParams()
          if (args.tag) params.set('tag', args.tag)
          if (args.from) params.set('fromdate', args.from)
          if (args.to) params.set('todate', args.to)
          result = await api('GET', `/stats/outbound/clicks?${params.toString()}`)
          break
        }
        case 'spam': {
          const params = new URLSearchParams()
          if (args.tag) params.set('tag', args.tag)
          if (args.from) params.set('fromdate', args.from)
          if (args.to) params.set('todate', args.to)
          result = await api('GET', `/stats/outbound/spam?${params.toString()}`)
          break
        }
        default:
          result = { error: 'Unknown stats subcommand. Use: overview, sends, bounces, opens, clicks, spam' }
      }
      break

    case 'server':
      switch (sub) {
        case 'get':
          result = await api('GET', '/server')
          break
        default:
          result = { error: 'Unknown server subcommand. Use: get' }
      }
      break

    case 'suppressions':
      switch (sub) {
        case 'list': {
          const params = new URLSearchParams()
          if (args.stream) params.set('MessageStream', args.stream)
          result = await api('GET', `/message-streams/${args.stream || 'outbound'}/suppressions/dump`)
          break
        }
        case 'create': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const stream = args.stream || 'outbound'
          result = await api('POST', `/message-streams/${stream}/suppressions`, {
            Suppressions: email.split(',').map(e => ({ EmailAddress: e.trim() }))
          })
          break
        }
        case 'delete': {
          const email = args.email
          if (!email) { result = { error: '--email required' }; break }
          const stream = args.stream || 'outbound'
          result = await api('POST', `/message-streams/${stream}/suppressions/delete`, {
            Suppressions: email.split(',').map(e => ({ EmailAddress: e.trim() }))
          })
          break
        }
        default:
          result = { error: 'Unknown suppressions subcommand. Use: list, create, delete' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          email: 'email [send --from <from> --to <to> --subject <subj> | send-template --from <from> --to <to> --template <id> | send-batch --from <from> --to <to1,to2> --subject <subj>]',
          templates: 'templates [list | get --id <id> | create --name <name> | delete --id <id>]',
          bounces: 'bounces [list | get --id <id> | stats | activate --id <id>]',
          messages: 'messages [outbound | inbound | get --id <id>]',
          stats: 'stats [overview | sends | bounces | opens | clicks | spam]',
          server: 'server [get]',
          suppressions: 'suppressions [list | create --email <email> | delete --email <email>]',
          options: '--tag <tag> --from <date> --to <date> --stream <stream-id>',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
