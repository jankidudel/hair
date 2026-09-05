# Everyday Hair

An Angular static site for appearance-focused hair routines, styling, tools, and product comparisons. It is not a health site: do not publish medical, diagnostic, treatment, supplement, disease, hair-loss-treatment, hormonal, prescription, or medical-claim content.

## Setup

Use Node 22+ and run `npm install` from the repository root. Installation automatically points Git at the repository-local `.githooks` directory. The pre-commit hook checks formatting, linting, and content safety; pre-push runs lint, tests, production builds, and the safety check. You do not need to change directory: use root `npm run` commands or `make` (for example, `make dev` starts the Angular site).

## Commands

`npm run dev`, `npm run build`, `npm run lint`, `npm run test`, `npm run format`, and `npm run content:check` operate across the project. `npm run check:editorial-targets` is the fast, date-aware editorial check; pass `-- --date=YYYY-MM-DD` for a deterministic release date. `npm run check:seo` builds production output and checks sitemap, metadata, canonicals, rendered H1s and internal links. Infrastructure commands are `npm run infra:build`, `npm run infra:diff:dev`, and `npm run infra:diff:prod`.

## Publishing a guide

Every source under `frontend/content/` needs this front matter (with a real UTC calendar date):

```yaml
title: 'Page title | Comb Report'
description: 'A reader-first summary between 120 and 165 characters.'
slug: 'lowercase-hyphenated-slug'
eyebrow: 'Hair dryers'
heading: 'Visible page H1'
contentType: 'buying-guide'
primaryQuery: 'reader decision'
secondaryQueries: ['natural supporting phrase', 'another supporting phrase']
searchIntent: 'commercial-investigation'
cluster: 'hair-dryers'
author: 'Comb Report Editorial'
faq:
  - question: 'Question?'
    answer: 'Clear answer.'
```

A guide is public only when its `article-registry.ts` entry is enabled and its registry `publishDate` is today or earlier in UTC. Future and disabled guides are absent from generated routes, listings, navigation and sitemap. Before a release, add a contextual incoming link from a live category or related guide, set its `publishDate` in the registry, run `npm run check:editorial-targets`, then run `npm run check:seo` for production. Add `reviewMethod` only when naming or ranking specific products; do not imply testing that did not occur. `updatedDate` is reserved for meaningful editorial changes.

## Structure

- `frontend/`: Angular standalone application with static prerendering.
- `frontend/content/`: HTML source of truth. Each `.html` guide starts with YAML front matter, followed by safe authored HTML. The build parses it with gray-matter and sanitizes the HTML before it can be rendered.
- `api/`: minimal TypeScript Lambda health endpoint.
- `infra/`: CDK stacks for `dev` and `prod` static hosting plus the health API.

Use ordinary HTML links (`<a href="https://example.com">label</a>`) and images (`<img src="/image.jpg" alt="Description">`); see `frontend/content/article-template.html`. Authored HTML is deliberately limited to editorial content. Build interactive tools, calculators, and bespoke landing pages as Angular components.

The conservative safety scanner reports each file and matched term for editorial review. It is an alarm, not permission to write around the rules.

## AWS and deployments

Deploy CDK separately after configuring AWS CLI credentials and the target account/region. The stacks create a private S3 site bucket, CloudFront OAC distribution, and API Gateway/Lambda health endpoint. Production additionally creates the `combreport.com` public hosted zone, an ACM certificate for `www.combreport.com` and `combreport.com`, DNS aliases, and a CloudFront WAF rate-limit rule. The apex domain redirects to `www.combreport.com`.

Before the first production deployment, create the production GitHub Environment and its `AWS_DEPLOY_ROLE_ARN` variable. Once CloudFormation creates the `combreport.com` hosted zone, replace the nameservers at the domain registrar with the Route 53 nameservers shown in the `ProductionHostedZoneNameServers` output (or visible in the Route 53 console) so ACM can validate the certificate. After the distribution is deployed, select the **Free** flat-rate plan in **CloudFront → Manage plan** and attach the `combreport.com` hosted zone. The Free plan requires the production Web ACL created by this stack to remain associated.

GitHub Actions uses AWS OIDC only. Pull requests verify the project. Deployments use the fixed `us-east-1` region. The content deployment workflow publishes frontend/content changes; the infrastructure deployment workflow deploys infrastructure and the packaged API. Both default pushes to `main` to `dev`; manually run either to select `dev` or `prod`. The manual `Deploy all` workflow performs both steps for a coordinated release. Configure `AWS_DEPLOY_ROLE_ARN` in both GitHub Environments, plus `SITE_BUCKET` and `CLOUDFRONT_DISTRIBUTION_ID` for frontend publishing.
