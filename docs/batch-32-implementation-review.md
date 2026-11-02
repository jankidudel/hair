# Batch 32 implementation review

Implemented the five airflow/attachment method guides, the complete rotating-versus-fixed rewrite, fourteen contextual article additions, three paragraphs across two category hubs, five new Guides cards, the revised existing card and two original SVGs. All articles use the shared renderer and typed ArticleSlug references. No new article component, route alias, menu item or tool outcome was added. Batch 31 content and tools remain intact.

The rewritten comparison retains its original 2026-10-10 publication date and uses an explicit 2026-11-02 modification date. Changed article owners retain their registry publication dates. The five additions use 2026-11-02. Public bylines do not show publication or modification dates.

## Editorial and source decisions

All six complete articles use Editorial guide, one lead and Quick answer, a table, three FAQ questions, then separate evidence, source and related sections. The rewrite replaces its old body and article-level source list; globally useful product records remain.

The supplied negative diagnosis wording and ordinary uses of “treat/treating” were revised to appearance-focused wording so the mandatory content check passes. No medical claims were introduced. The six articles keep the supplied concise task coverage rather than padding it to remove the advisory 800-word target: their checked main-body counts are 658–738 words, above the enforced minimum.

All six assigned manufacturer sources were rechecked. Remington AS8810 and Conair CD705/CD706 returned actual manufacturer PDFs. The Airwrap i.d. PDF exceeded the web text reader limit; it was downloaded through the browser and its actual PDF text inspected. Its preparation distinctions, connected sequence, cold-shot stage, reduced-airflow completion cue and downward release support the scoped copy. Dyson comb, Flyaway and US styling pages were readable and their assigned roles/instructions checked. The Flyaway example retains dry straight/straightened preparation and no pressing down. No retired Shark PDF URLs or third-party mirrors were added.

## Repository and artifact validation

- Full `npm run verify` passed: formatting, lint, types, tests, content check, editorial targets, production build, generated SEO and internal links.
- 91 frontend, 1 API, 4 infrastructure and 33 repository tests passed (129 total).
- Content check passed for 208 HTML sources; generated SEO passed for 206 public guides.
- 230 static routes generated; 6,196 internal links passed; 228 unique intended sitemap URLs, exactly five additional article owners.
- Existing route audit found no missing sitemap entries, route-classification failures, duplicate metadata, internal orphans or broken links. Its ten existing articles without contextual incoming links are outside this batch; none is a new owner.
- Existing artifact release smoke passed for all 40 maintained owners, including the six complete Batch 32 articles.
- Targeted generated-HTML review passed: all six complete article structures and unique card titles/descriptions, fourteen exact contextual paragraphs once each, three hub paragraphs, both figure placements/dimensions/captions and preserved original rewrite publication date.
- Existing generated SEO checks now enforce the new article bodies, contextual inlinks and diagram assets. The source-rendering regression covers the rewritten comparison's single AS8810 source list, original date and separate three-question FAQ.
- SVG XML parsed; intrinsic sizes are 340×700 and 340×620, with accessible titles, no scripts, foreignObject or remote assets. Source and release artifact SVG bytes agree.
- Whitespace check passed; the index is empty. All changes remain unstaged.

The environment restricts the tsx CLI's local IPC socket. Checks used the existing external npm shell adapter that invokes `node --import tsx`; repository scripts and dependencies are unchanged. Angular ran with CI=1 and NG_BUILD_MAX_WORKERS=2.

Editorial length/metadata advisories and nine existing spelling advisories remain non-blocking. No ranking or indexing result is claimed.

## Visual checks and release limits

Firefox displayed local copies of the complete production-prerendered HTML with the original CSS and images. Desktop article typography and mobile 390×844 layout were sampled. Both figures had readable labels and wrapping captions; the complete four-stage airflow SVG was also inspected at intrinsic width. Mobile table overflow stayed inside the article, and keyboard focus and horizontal arrow-key scrolling were visibly checked.

These previews omit scripts because the sandbox blocks a local HTTP listener. They verify static layout, not Angular hydration, live route transitions or planner/finder interaction. Existing interactive component tests passed; a full served interactive browser pass and production HTTP/MIME checks remain for release verification.

The production artifact is `frontend/dist/hair-frontend/browser`. The SVG-only decorative-line cleanup was copied into its matching asset after the build and byte parity verified. Nothing was deployed, invalidated, staged or committed.

## AWS cost impact

No AWS resources, infrastructure, cache, logging, security or routing configuration changed. The ordinary manual content release continues to use existing S3 storage/upload requests and CloudFront requests/data transfer. The release smoke now makes six additional read-only article requests per run; normal existing request/transfer billing applies. No recurring resource was introduced and no deployment was performed.

## Added pages

- https://www.combreport.com/guides/how-to-use-a-rotating-hot-air-brush
- https://www.combreport.com/guides/how-to-use-airflow-curling-barrels
- https://www.combreport.com/guides/how-to-use-a-hair-dryer-flyaway-attachment
- https://www.combreport.com/guides/hair-dryer-comb-attachment-vs-concentrator
- https://www.combreport.com/guides/airflow-curling-barrel-vs-curling-wand

## Updated pages

- https://www.combreport.com/guides/rotating-vs-fixed-hot-air-brush
- https://www.combreport.com/guides/how-to-use-hot-air-brush
- https://www.combreport.com/guides/how-to-choose-multi-styler-attachments
- https://www.combreport.com/guides/dyson-airwrap-id-vs-co-anda2x
- https://www.combreport.com/guides/dyson-supersonic-nural-vs-supersonic-r
- https://www.combreport.com/guides/dyson-supersonic-vs-shark-speedstyle
- https://www.combreport.com/guides/shark-glam-vs-flexstyle
- https://www.combreport.com/guides/how-to-use-hair-dryer-concentrator-nozzle
- https://www.combreport.com/guides/how-to-blow-dry-hair
- https://www.combreport.com/guides/hot-air-brush-vs-straightening-brush
- https://www.combreport.com/guides/best-hair-dryers-thick-hair
- https://www.combreport.com/guides/how-to-section-hair-for-styling
- https://www.combreport.com/guides/why-curls-fall-out
- https://www.combreport.com/guides/automatic-hair-curler-vs-curling-wand
- https://www.combreport.com/guides/styling-tool-troubleshooting
- https://www.combreport.com/hot-air-brushes
- https://www.combreport.com/hair-dryers
- https://www.combreport.com/guides

## Changed files

- `docs/batch-32-implementation-review.md`
- `frontend/content/airflow-curling-barrel-vs-curling-wand.html`
- `frontend/content/automatic-hair-curler-vs-curling-wand.html`
- `frontend/content/best-hair-dryers-thick-hair.html`
- `frontend/content/dyson-airwrap-id-vs-co-anda2x.html`
- `frontend/content/dyson-supersonic-nural-vs-supersonic-r.html`
- `frontend/content/dyson-supersonic-vs-shark-speedstyle.html`
- `frontend/content/hair-dryer-comb-attachment-vs-concentrator.html`
- `frontend/content/hot-air-brush-vs-straightening-brush.html`
- `frontend/content/how-to-blow-dry-hair.html`
- `frontend/content/how-to-choose-multi-styler-attachments.html`
- `frontend/content/how-to-section-hair-for-styling.html`
- `frontend/content/how-to-use-a-hair-dryer-flyaway-attachment.html`
- `frontend/content/how-to-use-a-rotating-hot-air-brush.html`
- `frontend/content/how-to-use-airflow-curling-barrels.html`
- `frontend/content/how-to-use-hair-dryer-concentrator-nozzle.html`
- `frontend/content/how-to-use-hot-air-brush.html`
- `frontend/content/rotating-vs-fixed-hot-air-brush.html`
- `frontend/content/shark-glam-vs-flexstyle.html`
- `frontend/content/styling-tool-troubleshooting.html`
- `frontend/content/why-curls-fall-out.html`
- `frontend/public/diagrams/airflow-wrap-control-stages.svg`
- `frontend/public/diagrams/dryer-comb-and-concentrator-paths.svg`
- `frontend/scripts/check-generated-seo.ts`
- `frontend/src/app/airflow-method-guides.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/article-supplementary-sources.spec.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/published-guide-route.spec.ts`
- `frontend/src/app/static-page.component.ts`
- `scripts/seo/release-smoke.ts`
