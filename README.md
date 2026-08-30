# Everyday Hair

An Angular static site for appearance-focused hair routines, styling, tools, and product comparisons. It is not a health site: do not publish medical, diagnostic, treatment, supplement, disease, hair-loss-treatment, hormonal, prescription, or medical-claim content.

## Setup

Use Node 22+ and run `npm install` from the repository root. Installation automatically points Git at the repository-local `.githooks` directory. The pre-commit hook checks formatting, linting, and content safety; pre-push runs lint, tests, production builds, and the safety check. You do not need to change directory: use root `npm run` commands or `make` (for example, `make dev` starts the Angular site).

## Commands

`npm run dev`, `npm run build`, `npm run lint`, `npm run test`, `npm run format`, and `npm run content:check` operate across the project. Infrastructure commands are `npm run infra:build`, `npm run infra:diff:dev`, and `npm run infra:diff:prod`. Deployments run through GitHub Actions.

## Structure

- `frontend/`: Angular standalone application with static prerendering.
- `frontend/content/`: Markdown source of truth. Front matter requires `title`, `description`, `slug`, `published`, `updated`, and `category`; `affiliateDisclosure` is optional. The build parses Markdown with gray-matter, remark (including GFM tables), then sanitizes generated HTML.
- `api/`: minimal TypeScript Lambda health endpoint.
- `infra/`: CDK stacks for `dev` and `prod` static hosting plus the health API.

Use ordinary Markdown links (`[label](https://example.com)`) and images (`![description](/image.jpg)`); see `frontend/content/article-template.md`. Markdown is deliberately limited to editorial content. Build interactive tools, calculators, and bespoke landing pages as Angular components.

The conservative safety scanner reports each file and matched term for editorial review. It is an alarm, not permission to write around the rules.

## AWS and deployments

Deploy CDK separately after configuring AWS CLI credentials and the target account/region. The stacks create a private S3 site bucket, CloudFront OAC distribution, and API Gateway/Lambda health endpoint. A custom domain, Route 53 record, and ACM certificate are intentionally deferred until the brand domain is selected.

GitHub Actions uses AWS OIDC only. Pull requests verify the project. GitHub Actions deployments are currently disabled until infrastructure is configured. Deployments use the fixed `us-east-1` region. The content deployment workflow publishes frontend/content changes; the infrastructure deployment workflow deploys infrastructure and the packaged API. Both default pushes to `main` to `dev`; manually run either to select `dev` or `prod`. The manual `Deploy all` workflow performs both steps for a coordinated release. When ready, configure `AWS_DEPLOY_ROLE_ARN` in both GitHub Environments, plus `SITE_BUCKET` and `CLOUDFRONT_DISTRIBUTION_ID` for frontend publishing, then remove each workflow's disabling condition.
