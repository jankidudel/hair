# Hair editorial rules

## AWS billing review

Before proposing or implementing an infrastructure, deployment, caching, logging,
security, or traffic-routing change, assess whether it can create unexpected AWS
charges. Consider both recurring resources and usage-based charges, including
CloudFront invalidations, WAF, logs, data transfer, requests, storage, and managed
custom resources. State the relevant cost impact before deployment; do not deploy
cost-affecting infrastructure without explicit user authorization.

This is a hair appearance, grooming, styling, tools, and product-comparison site—not a health site.

Never create or publish medical or health content, including diagnosis, treatment, supplements, disease, hair-loss treatments, hormonal content, prescriptions, or medical claims. Keep advice focused on cosmetic appearance and ordinary grooming. New or edited HTML sources under `frontend/content/` must pass `npm run content:check`; flagged language requires editorial review and revision before it is published.

Articles use the `.html` extension with required front matter and a safe HTML body. Use the shared Angular article page—never add an Angular component per article. Interactive experiences and bespoke landing pages are Angular components, not custom HTML blocks.

Do not display published or updated dates in public page copy or UI. Keep registry `publishDate` values only where required for publication scheduling, sitemap generation, or structured metadata.

When work changes public pages or routes, the final handoff must separately list added pages and updated pages, each as full canonical production URLs using `https://www.combreport.com` as the base. Do this automatically; do not wait to be asked.

## Git handoff

Leave all work unstaged for user review. Do not run `git add` or create commits; report the changed files and validation results so the user can make the final staging and commit decision.

## Dependency versions

Use exact package versions in every `package.json`: for example, `"rehype-parse": "9.0.1"`, never `"^9.0.1"`, `"~9.0.1"`, or another range. Keep the lockfile in sync whenever a dependency changes.
