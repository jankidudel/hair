# Everyday Hair

An Angular static site for appearance-focused hair routines, styling, tools, and product comparisons. It is not a health site: do not publish medical, diagnostic, treatment, supplement, disease, hair-loss-treatment, hormonal, prescription, or medical-claim content.

## Setup

Use Node 22+ and run `npm install` from the repository root. Installation automatically points Git at the repository-local `.githooks` directory. Pre-commit performs formatting, linting, content safety, and a fast staged-guide check. Pre-push runs the complete `npm run verify` gate. You do not need to change directory: use root `npm run` commands or `make` (for example, `make dev` starts the Angular site).

## Commands

`npm run check:staged-content` validates only staged guide files. `npm run check:editorial-targets` is the full, date-aware editorial check; pass `-- --date=YYYY-MM-DD` for a deterministic release date. `npm run check:seo` runs that editorial gate, builds production output, and checks sitemap, metadata, canonicals, rendered H1s and internal links. `npm run verify` is the complete local pre-push gate. Infrastructure commands are `npm run infra:build` and `npm run infra:diff:prod`.

## Publishing a guide

Every source under `frontend/content/` needs this front matter (with a real UTC calendar date):

```yaml
title: 'Page title | Comb Report'
description: 'A reader-first summary between 120 and 165 characters.'
slug: 'lowercase-hyphenated-slug'
eyebrow: 'Hair dryers'
heading: 'Visible page H1'
faq:
  - question: 'Question?'
    answer: 'Clear answer.'
```

A guide is public only when its `article-registry.ts` entry is enabled and its registry `publishDate` is today or earlier in UTC. Future and disabled guides are drafts: they are absent from generated routes, listings, navigation and sitemap, and may remain below the publishable-content minimum while you work. Before publication, add a contextual incoming link from a live category or related guide, set its `publishDate`, then run `npm run check:editorial-targets` and `npm run check:seo`.

Hard errors block commits, pushes, pull requests and deployments; warnings identify worthwhile editorial improvements without blocking release. `git commit --no-verify` is an emergency local escape hatch only: it never permits deployment when the non-bypassable GitHub validation job fails. Add `reviewMethod` only when naming or ranking specific products; do not imply testing that did not occur. `updatedDate` is reserved for meaningful editorial changes.

Each retained guide must answer its own reader decision. When adding researched material to an older page, integrate it into the finished article: remove repeated generic body sections, duplicate introductions and conclusions, and obsolete serialized front matter. Keep short shared disclosures where useful. State exact model, market and source beside claims that depend on them; a family page, regional listing or charging specification cannot silently stand in for another model, market or operating rating. Leave unsupported fields unknown and preserve the source's actual check date.

Lead a choice guide with the usable task and recommendation, then explain its trade-off and the next decision. When dimensions matter, name the measured surface: a round brush's solid barrel, its outside bristle diameter, a roller's cylinder diameter, working width and closure are different fields. Keep maker nominal labels intact, and never derive a measurement from a model suffix. Density changes the amount of hair in a working section; it does not by itself prescribe a larger diameter. When expanding an older article, move the new answer before its conclusion so the page reads as one finished guide.

Exact brush shape and variant identity stay attached to a named model and market: a handled Ultimate Detangler is not a palm-held Styler, and a standard Glide+ is not Glide or Glide+ Max. Spatial explanations need an actual accessible drawing when placement, path or geometry is the decision; a table of arrows is still a text table. Keep diagram labels readable at mobile width and identify schematic, unmeasured shapes. In recommendation tools, account for what the reader already owns by stage: drying, damp shaping, dry finishing and setting are distinct; suggest another tool only for an uncovered task and explain its optional role. After changing a guide, read its introduction, table, FAQ and conclusion together for contradictory advice.

## Structure

- `frontend/`: Angular standalone application with static prerendering.
- `frontend/content/`: HTML source of truth. Each `.html` guide starts with YAML front matter, followed by safe authored HTML. The build parses it with gray-matter and sanitizes the HTML before it can be rendered.
- `api/`: minimal TypeScript Lambda health endpoint.
- `infra/`: the production CDK stack for static hosting plus the health API.

Use ordinary HTML links (`<a href="https://example.com">label</a>`) and images (`<img src="/image.jpg" alt="Description">`); see `frontend/content/article-template.html`. Authored HTML is deliberately limited to editorial content. Build interactive tools, calculators, and bespoke landing pages as Angular components.

The conservative safety scanner reports each file and matched term for editorial review. It is an alarm, not permission to write around the rules.

## AWS and deployments

Deploy CDK separately after configuring AWS CLI credentials and the target account/region. The stacks create a private S3 site bucket, CloudFront OAC distribution, and API Gateway/Lambda health endpoint. Production additionally creates the `combreport.com` public hosted zone, an ACM certificate for `www.combreport.com` and `combreport.com`, DNS aliases, and a CloudFront WAF rate-limit rule. The apex domain redirects to `www.combreport.com`.

Before the first production deployment, create the production GitHub Environment and its `AWS_DEPLOY_ROLE_ARN` variable. Once CloudFormation creates the `combreport.com` hosted zone, replace the nameservers at the domain registrar with the Route 53 nameservers shown in the `ProductionHostedZoneNameServers` output (or visible in the Route 53 console) so ACM can validate the certificate. After the distribution is deployed, select the **Free** flat-rate plan in **CloudFront → Manage plan** and attach the `combreport.com` hosted zone. The Free plan requires the production Web ACL created by this stack to remain associated.

GitHub Actions uses AWS OIDC only. Pull requests verify the project. Production deployments are manual and use the fixed `us-east-1` region. The content deployment workflow publishes frontend/content changes; the infrastructure deployment workflow deploys infrastructure and the packaged API. The manual `Deploy all` workflow performs both steps for a coordinated release. Configure `AWS_DEPLOY_ROLE_ARN`, `SITE_BUCKET`, and `CLOUDFRONT_DISTRIBUTION_ID` in the production GitHub Environment.

### Contact delivery

The contact page uses a form and omits the destination address. CDK sets `hello@inspectmesh.com` as both sender and recipient. Verify the address or its domain in SES in the AWS account and region used by Comb Report (`us-east-1`).

Set up a Cloudflare Turnstile widget for `www.combreport.com`. In the `prod` GitHub Environment, save its public key as the `TURNSTILE_SITE_KEY` variable and its private key as the `TURNSTILE_SECRET` secret. Run **Deploy all** for the first release so the API and form ship together.

CloudFront forwards the contact path to the existing REST API. The CloudFront WAF applies the site's per-IP limit, and API Gateway throttles the contact method. Lambda checks Turnstile with Cloudflare before sending through SES. Lambda uses seven-day log retention and does not log form values. Review WAF plan allowances and usage charges for API requests, Lambda, logs, data transfer and SES before deploying.

Smoke-test the deployed `POST https://www.combreport.com/api/contact` with `Content-Type: application/json`, `Origin: https://www.combreport.com`, and an empty JSON object. A JSON 400 response with field errors confirms the request reached the API. Then send a correction from the published form and verify it reaches the InspectMesh inbox with the correct reply address. Populate the confirmed privacy details in `CONTACT_FORM_PRIVACY` in `frontend/src/app/contact-config.ts`.
