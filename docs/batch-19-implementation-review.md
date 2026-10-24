# Batch 19 implementation review

Implemented locally on 22 October 2026. The checkout did not contain the six finishing guides and still had the Bobby Pins question in a paragraph. No deployment, staging or commit was performed. This batch is **not release-ready** until the checks below are resolved.

## Implemented

- Six Hair Care HTML articles using the shared Angular article page, with the supplied lead, Quick answer, semantic sections, linked FAQ answers, evidence scope, manufacturer sources and three related guides each.
- Bobby Pins question changed at source to one semantic H2, preserving the following Kitsch paragraph.
- Eight manufacturer anchors added at their named examples on the six Batch 18 pages; source lists retained.
- Two original SVG diagrams, label/market-specific source notes, Hair Care hub cards and guide-index descriptions.
- Exact contextual additions to five existing guides; a contextual link also wraps existing words in the sea salt application lead.
- Canonical slug registry, publication scheduling, generated sitemap entries, Article/BreadcrumbList metadata and regression coverage.
- No automatic-curler article or redirect. No links to the absent route were found; a route regression keeps it unknown.
- No infrastructure, deployment, caching, logging, security or routing changes. No AWS resources were created or modified.

## Copy adjustments and source checks

The content safety checker flags ordinary uses of “treat” and “treating”. Those words were revised in the flexible-hold description/body, pomade comparison and new mousse contextual paragraph without adding claims. The flexible-hold description uses “Read hold labels” in place of “Treat hold labels”. The official Moroccanoil link uses an HTML character reference in its href, resolving to the exact required manufacturer URL; the inline-anchor audit verifies that resolved destination.

Manufacturer directions were rechecked on 22 October 2026 for all five new sources and all five Batch 18 destinations. The named methods support the supplied examples. The Bumble and bumble UK desktop retrieval initially omitted relevant content; the official UK mobile page and indexed official desktop page confirmed Dryspun's dry-hair directions. Existing source-check dates were retained; the new sources use the actual verification date.

FAQs remain safe article HTML so supplied inline links are preserved. The shared article page now separates the inline FAQ from the main body and renders it in its standard article-faq section before evidence, sources and related guides. No new FAQ structured data is introduced. Existing pages with shared FAQ content receive their new final paragraph immediately before that component; the curl-troubleshooting addition precedes “Useful next steps”.

## Validation passed

- Content safety: all 154 HTML files pass the repository checker.
- Content and SEO generation.
- 18 focused tests across content, published routes, related-guide mapping and shared article integration, including all six inline FAQ splits and their preserved links.
- FAQ ordering correction (24 October): direct Angular server rendering from AOT-compiled source verifies exactly one FAQ heading/section, then evidence, sources and related guides on all six finishing guides and the existing mousse/gel guide. FAQ links remain usable. This is a focused render check, not a successful standard production build or full generated-SEO run.
- 21 repository script tests.
- Frontend ESLint and TypeScript checks.
- Angular compiler with strict template checking.
- Repository formatting and git diff whitespace checks.
- Targeted audit: all eight named-example inline anchors resolve exactly; each new guide has accessible table headers, a focusable labelled table, three related guides and one canonical sitemap entry; both SVG dimensions match their image elements.

The sandbox prevents the tsx CLI's IPC socket, so TypeScript scripts were run using Node's tsx import hook. The focused tests used a temporary Vitest configuration with Angular-compatible decorators; the normal Angular test builder was also attempted but aborted during its build. These focused results do not imply a successful full npm verify.

## Unresolved checks

The six source bodies have now been expanded with practical coverage plans, comparison notes and routine examples in response to the staged-content failure. This follow-up supersedes the handover’s restriction on expanding its supplied copy. No validator thresholds were changed.

| Guide                               | HTML body words |
| ----------------------------------- | --------------: |
| flexible-vs-strong-hold-hairspray   |             541 |
| how-to-apply-hair-pomade            |             542 |
| how-to-use-hairspray                |             533 |
| how-to-use-sea-salt-spray           |             544 |
| pomade-vs-hair-clay                 |             550 |
| sea-salt-spray-vs-texturising-spray |             548 |

The working copies of all 14 staged guides pass the existing staged-content validator, using its unmodified validateStagedGuide function and current source files. Counts above exclude the shared Quick answer and other component copy. Content safety and the editorial-target check also pass. The current FAQ-order correction changes the shared article page and its regression tests; these changes and this review update are unstaged. The existing Git index was left untouched.

The production Angular build aborts locally with exit 134; one attempt reports an esbuild service deadlock. Restricting Angular to one build worker did not resolve it. The normal Angular test builder also aborts. Consequently, prerendered initial HTML, postbuild SEO/link checks and 375px/1280px browser verification remain pending. A local preview was not available. Production retrieval was unavailable, and no deployment was attempted or verified.

Before release, review the unstaged FAQ-order correction, rebuild and run npm run verify in a working build environment, and inspect all six guides, tables, both loaded SVGs, navigation and cookie controls at both specified widths. After the normal deployment, verify real HTTP statuses/content types, initial HTML, canonical metadata, schema, sitemap entries, exact H2 and hydration against production.

## Added pages (canonical production destinations; not deployed in this task)

- https://www.combreport.com/guides/how-to-use-hairspray
- https://www.combreport.com/guides/flexible-vs-strong-hold-hairspray
- https://www.combreport.com/guides/sea-salt-spray-vs-texturising-spray
- https://www.combreport.com/guides/how-to-use-sea-salt-spray
- https://www.combreport.com/guides/pomade-vs-hair-clay
- https://www.combreport.com/guides/how-to-apply-hair-pomade

## Updated pages (canonical production destinations; not deployed in this task)

- https://www.combreport.com/guides
- https://www.combreport.com/hair-care
- https://www.combreport.com/guides/how-to-use-bobby-pins
- https://www.combreport.com/guides/hair-mousse-vs-gel
- https://www.combreport.com/guides/curl-cream-vs-leave-in-conditioner
- https://www.combreport.com/guides/how-to-apply-hair-mousse
- https://www.combreport.com/guides/how-to-apply-gel-to-curly-hair
- https://www.combreport.com/guides/hair-serum-vs-hair-oil
- https://www.combreport.com/guides/hair-styling-product-order
- https://www.combreport.com/guides/why-curls-fall-out

## Changed files

- `frontend/content/curl-cream-vs-leave-in-conditioner.html`
- `frontend/content/hair-mousse-vs-gel.html`
- `frontend/content/hair-serum-vs-hair-oil.html`
- `frontend/content/hair-styling-product-order.html`
- `frontend/content/how-to-apply-gel-to-curly-hair.html`
- `frontend/content/how-to-apply-hair-mousse.html`
- `frontend/content/how-to-use-bobby-pins.html`
- `frontend/content/why-curls-fall-out.html`
- `frontend/src/app/article-decision-integration.spec.ts`
- `frontend/src/app/article-page.component.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/content.spec.ts`
- `frontend/src/app/decision-support.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/published-guide-route.spec.ts`
- `frontend/src/app/static-page.component.ts`
- `frontend/content/flexible-vs-strong-hold-hairspray.html`
- `frontend/content/how-to-apply-hair-pomade.html`
- `frontend/content/how-to-use-hairspray.html`
- `frontend/content/how-to-use-sea-salt-spray.html`
- `frontend/content/pomade-vs-hair-clay.html`
- `frontend/content/sea-salt-spray-vs-texturising-spray.html`
- `frontend/public/diagrams/finishing-spray-coverage.svg`
- `frontend/public/diagrams/styling-label-comparison.svg`
- `frontend/src/app/finishing-guides.ts`
- `docs/batch-19-implementation-review.md`

Generated content, sitemap and other build outputs remain ignored by git. The follow-up edits remain unstaged; the existing index was not modified.
