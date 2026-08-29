# Everyday Hair

An Angular static site for appearance-focused hair routines, styling, tools, and product comparisons. It is not a health site: do not publish medical, diagnostic, treatment, supplement, disease, hair-loss-treatment, hormonal, prescription, or medical-claim content.

## Setup

Use Node 22+ and run `npm install`. Installation automatically points Git at the repository-local `.githooks` directory. The pre-commit hook checks formatting, linting, and content safety; pre-push runs lint, tests, production builds, and the safety check.

## Commands

`npm run dev`, `npm run build`, `npm run lint`, `npm run test`, `npm run format`, and `npm run content:check` operate across the project. Infrastructure commands are `npm run infra:build`, `npm run infra:diff:dev`, `npm run infra:deploy:dev`, `npm run infra:diff:prod`, and `npm run infra:deploy:prod`.

## Structure

- `frontend/`: Angular standalone application with static prerendering.
- `frontend/content/`: Markdown source of truth. Front matter requires `title`, `description`, `slug`, `published`, `updated`, and `category`; `affiliateDisclosure` is optional. The build parses Markdown with gray-matter, remark (including GFM tables), then sanitizes generated HTML.
- `api/`: minimal TypeScript Lambda health endpoint.
- `infra/`: CDK stacks for `dev` and `prod` static hosting plus the health API.

Use ordinary Markdown links (`[label](https://example.com)`) and images (`![description](/image.jpg)`); see `frontend/content/article-template.md`. Markdown is deliberately limited to editorial content. Build interactive tools, calculators, and bespoke landing pages as Angular components.

The conservative safety scanner reports each file and matched term for editorial review. It is an alarm, not permission to write around the rules.

## AWS and deployments

Deploy CDK separately after configuring AWS CLI credentials and the target account/region. The stacks create a private S3 site bucket, CloudFront OAC distribution, and API Gateway/Lambda health endpoint. A custom domain, Route 53 record, and ACM certificate are intentionally deferred until the brand domain is selected.

GitHub Actions uses AWS OIDC only. Pull requests verify the project. A push to `main` with frontend changes deploys to the existing dev bucket; the manual production workflow is protected by the `prod` GitHub environment. Configure `AWS_DEPLOY_ROLE_ARN` as an environment secret and `AWS_REGION`, `SITE_BUCKET`, and `CLOUDFRONT_DISTRIBUTION_ID` as environment variables.
