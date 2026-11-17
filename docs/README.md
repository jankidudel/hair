# Project documentation

Keep architecture notes, editorial decisions, and deployment runbooks here as the project grows.

## Route discovery and sitemap checks

Search policy lives in `frontend/src/app/seo-route-policy.ts`. The sitemap generator checks this policy against the actual Angular router; the generated SEO gate also checks every built document. A new router path without a disposition fails validation with its exact path.

After `npm run build --workspace=frontend`, run `npm run seo:audit` (or the existing `npm run seo:inventory`) to write measured route metadata and coverage sets to `reports/seo-url-inventory.json`. The report distinguishes registered routes, generated pages, internal destinations, sitemap entries and intended indexable pages.

Run `npm run seo:verify-production` from a network-enabled environment after deployment. This separate read-only command records HTTP status, redirect chains, headers, robots access, page metadata, sitemap membership and a bounded internal-link crawl in `reports/seo-route-audit/production.json`. A network failure is reported as unverified delivery, not as a production outage. The command never deploys, submits forms, changes tools or requests indexing.

See [the all-routes audit review](all-routes-audit-review.md) for the current findings and intentional exclusions.

## Keyword research and content planning

Use the [CombReport keyword research and URL decision workflow](seo/README.md) to gather query evidence, check page ownership, and maintain the opportunity backlog.
