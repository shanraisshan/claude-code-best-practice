# Marketing CLIs

Zero-dependency, single-file CLI tools for marketing platforms that don't ship their own.

Every CLI is a standalone Node.js script (Node 18+) with no `npm install` required — just `chmod +x` and go.

## Install

### Option 1: Run directly

```bash
node tools/clis/ahrefs.js backlinks list --target example.com
```

### Option 2: Symlink for global access

```bash
# Symlink any CLI you want available globally
ln -sf "$(pwd)/tools/clis/ahrefs.js" ~/.local/bin/ahrefs
ln -sf "$(pwd)/tools/clis/resend.js" ~/.local/bin/resend

# Then use directly
ahrefs backlinks list --target example.com
resend send --from you@example.com --to them@example.com --subject "Hello" --html "<p>Hi</p>"
```

### Option 3: Add the whole directory to PATH

```bash
export PATH="$PATH:/path/to/marketingskills/tools/clis"
```

## Authentication

Every CLI reads credentials from environment variables:

| CLI | Environment Variable |
|-----|---------------------|
| `activecampaign` | `ACTIVECAMPAIGN_API_KEY`, `ACTIVECAMPAIGN_API_URL` |
| `adobe-analytics` | `ADOBE_ACCESS_TOKEN`, `ADOBE_CLIENT_ID`, `ADOBE_COMPANY_ID` |
| `ahrefs` | `AHREFS_API_KEY` |
| `amplitude` | `AMPLITUDE_API_KEY`, `AMPLITUDE_SECRET_KEY` |
| `apollo` | `APOLLO_API_KEY` |
| `beehiiv` | `BEEHIIV_API_KEY` |
| `brevo` | `BREVO_API_KEY` |
| `buffer` | `BUFFER_API_KEY` |
| `calendly` | `CALENDLY_API_KEY` |
| `clearbit` | `CLEARBIT_API_KEY` |
| `customer-io` | `CUSTOMERIO_APP_KEY` (App API), `CUSTOMERIO_SITE_ID` + `CUSTOMERIO_API_KEY` (Track API) |
| `dataforseo` | `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD` |
| `demio` | `DEMIO_API_KEY`, `DEMIO_API_SECRET` |
| `dub` | `DUB_API_KEY` |
| `g2` | `G2_API_TOKEN` |
| `ga4` | `GA4_ACCESS_TOKEN` |
| `google-ads` | `GOOGLE_ADS_TOKEN`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_CUSTOMER_ID` |
| `google-search-console` | `GSC_ACCESS_TOKEN` |
| `hotjar` | `HOTJAR_CLIENT_ID`, `HOTJAR_CLIENT_SECRET` |
| `intercom` | `INTERCOM_API_KEY` |
| `keywords-everywhere` | `KEYWORDS_EVERYWHERE_API_KEY` |
| `kit` | `KIT_API_KEY`, `KIT_API_SECRET` |
| `klaviyo` | `KLAVIYO_API_KEY` |
| `linkedin-ads` | `LINKEDIN_ACCESS_TOKEN` |
| `livestorm` | `LIVESTORM_API_TOKEN` |
| `mailchimp` | `MAILCHIMP_API_KEY` |
| `mention-me` | `MENTIONME_API_KEY` |
| `meta-ads` | `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID` |
| `mixpanel` | `MIXPANEL_TOKEN` (ingestion), `MIXPANEL_API_KEY` + `MIXPANEL_SECRET` (query) |
| `onesignal` | `ONESIGNAL_REST_API_KEY`, `ONESIGNAL_APP_ID` |
| `optimizely` | `OPTIMIZELY_API_KEY` |
| `paddle` | `PADDLE_API_KEY`, `PADDLE_SANDBOX` (optional) |
| `partnerstack` | `PARTNERSTACK_PUBLIC_KEY`, `PARTNERSTACK_SECRET_KEY` |
| `plausible` | `PLAUSIBLE_API_KEY`, `PLAUSIBLE_BASE_URL` (optional, for self-hosted) |
| `postmark` | `POSTMARK_API_KEY` |
| `resend` | `RESEND_API_KEY` |
| `rewardful` | `REWARDFUL_API_KEY` |
| `savvycal` | `SAVVYCAL_API_KEY` |
| `segment` | `SEGMENT_WRITE_KEY` (tracking), `SEGMENT_ACCESS_TOKEN` (profile) |
| `semrush` | `SEMRUSH_API_KEY` |
| `sendgrid` | `SENDGRID_API_KEY` |
| `tiktok-ads` | `TIKTOK_ACCESS_TOKEN`, `TIKTOK_ADVERTISER_ID` |
| `tolt` | `TOLT_API_KEY` |
| `trustpilot` | `TRUSTPILOT_API_KEY`, `TRUSTPILOT_API_SECRET`, `TRUSTPILOT_BUSINESS_UNIT_ID` |
| `typeform` | `TYPEFORM_API_KEY` |
| `hunter` | `HUNTER_API_KEY` |
| `instantly` | `INSTANTLY_API_KEY` |
| `lemlist` | `LEMLIST_API_KEY` |
| `snov` | `SNOV_CLIENT_ID`, `SNOV_CLIENT_SECRET` |
| `wistia` | `WISTIA_API_KEY` |
| `zapier` | `ZAPIER_API_KEY` |

## Security

**Never hardcode API keys or tokens in scripts.** All CLIs read credentials exclusively from environment variables.

- Store keys in your shell profile (`~/.zshrc`, `~/.bashrc`) or a `.env` file
- The `.env` file is gitignored — but double-check before committing
- Use `--dry-run` on any command to preview the request without sending it (credentials are masked as `***`)
- If you fork this repo, audit your commits to ensure no secrets are included

## Command Pattern

All CLIs follow the same structure:

```
{tool} <resource> <action> [options]
```

Examples:

```bash
ahrefs backlinks list --target example.com --limit 50
semrush keywords overview --phrase "marketing automation" --database us
mailchimp campaigns list --limit 20
resend send --from you@example.com --to them@example.com --subject "Hello" --html "<p>Hi</p>"
dub links create --url https://example.com/landing --key summer-sale
```

## Output

All CLIs output JSON to stdout for easy piping:

```bash
# Pipe to jq
ahrefs backlinks list --target example.com | jq '.backlinks[].url_from'

# Save to file
semrush keywords overview --phrase "saas marketing" --database us > keywords.json

# Use in scripts
DOMAINS=$(rewardful affiliates list | jq -r '.data[].email')
```

## Available CLIs

| CLI | Category | Tool |
|-----|----------|------|
| `activecampaign.js` | Email/CRM | [ActiveCampaign](https://activecampaign.com) |
| `adobe-analytics.js` | Analytics | [Adobe Analytics](https://business.adobe.com/products/analytics) |
| `ahrefs.js` | SEO | [Ahrefs](https://ahrefs.com) |
| `amplitude.js` | Analytics | [Amplitude](https://amplitude.com) |
| `apollo.js` | Data Enrichment | [Apollo.io](https://apollo.io) |
| `beehiiv.js` | Newsletter | [Beehiiv](https://beehiiv.com) |
| `brevo.js` | Email/SMS | [Brevo](https://brevo.com) |
| `buffer.js` | Social | [Buffer](https://buffer.com) |
| `calendly.js` | Scheduling | [Calendly](https://calendly.com) |
| `clearbit.js` | Data Enrichment | [Clearbit](https://clearbit.com) |
| `customer-io.js` | Email | [Customer.io](https://customer.io) |
| `dataforseo.js` | SEO | [DataForSEO](https://dataforseo.com) |
| `demio.js` | Webinar | [Demio](https://demio.com) |
| `dub.js` | Links | [Dub.co](https://dub.co) |
| `g2.js` | Reviews | [G2](https://g2.com) |
| `ga4.js` | Analytics | [Google Analytics 4](https://analytics.google.com) |
| `google-ads.js` | Ads | [Google Ads](https://ads.google.com) |
| `google-search-console.js` | SEO | [Google Search Console](https://search.google.com/search-console) |
| `hotjar.js` | CRO | [Hotjar](https://hotjar.com) |
| `hunter.js` | Email Outreach | [Hunter.io](https://hunter.io) |
| `instantly.js` | Email Outreach | [Instantly.ai](https://instantly.ai) |
| `intercom.js` | Messaging | [Intercom](https://intercom.com) |
| `keywords-everywhere.js` | SEO | [Keywords Everywhere](https://keywordseverywhere.com) |
| `kit.js` | Email | [Kit](https://kit.com) |
| `klaviyo.js` | Email/SMS | [Klaviyo](https://klaviyo.com) |
| `lemlist.js` | Email Outreach | [Lemlist](https://lemlist.com) |
| `linkedin-ads.js` | Ads | [LinkedIn Ads](https://business.linkedin.com/marketing-solutions/ads) |
| `livestorm.js` | Webinar | [Livestorm](https://livestorm.co) |
| `mailchimp.js` | Email | [Mailchimp](https://mailchimp.com) |
| `mention-me.js` | Referral | [Mention Me](https://www.mention-me.com) |
| `meta-ads.js` | Ads | [Meta Ads](https://www.facebook.com/business/ads) |
| `mixpanel.js` | Analytics | [Mixpanel](https://mixpanel.com) |
| `onesignal.js` | Push | [OneSignal](https://onesignal.com) |
| `optimizely.js` | A/B Testing | [Optimizely](https://optimizely.com) |
| `paddle.js` | Payments | [Paddle](https://paddle.com) |
| `partnerstack.js` | Affiliate | [PartnerStack](https://partnerstack.com) |
| `plausible.js` | Analytics | [Plausible](https://plausible.io) |
| `postmark.js` | Email | [Postmark](https://postmarkapp.com) |
| `resend.js` | Email | [Resend](https://resend.com) |
| `rewardful.js` | Referral | [Rewardful](https://www.getrewardful.com) |
| `savvycal.js` | Scheduling | [SavvyCal](https://savvycal.com) |
| `segment.js` | Analytics | [Segment](https://segment.com) |
| `semrush.js` | SEO | [SEMrush](https://semrush.com) |
| `sendgrid.js` | Email | [SendGrid](https://sendgrid.com) |
| `snov.js` | Email Outreach | [Snov.io](https://snov.io) |
| `tiktok-ads.js` | Ads | [TikTok Ads](https://ads.tiktok.com) |
| `tolt.js` | Referral | [Tolt](https://tolt.io) |
| `trustpilot.js` | Reviews | [Trustpilot](https://trustpilot.com) |
| `typeform.js` | Forms | [Typeform](https://typeform.com) |
| `wistia.js` | Video | [Wistia](https://wistia.com) |
| `zapier.js` | Automation | [Zapier](https://zapier.com) |
