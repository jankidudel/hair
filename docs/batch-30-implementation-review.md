# Batch 30 implementation review

Implemented locally on 1 November 2026. Production deployment and production HTTP verification have not been performed. Work is unstaged.

## Completed scope

- Five new shared-template guides, one full control-guide rewrite, all three paragraph grammar repairs, twelve existing-guide integrations, three hub paragraphs and Guides discovery.
- Two original labelled SVGs; intrinsic dimensions, alt text, captions and the existing responsive figure pattern are present.
- Six complete articles use the existing evidence, source, FAQ and related-guide presentation. Each has one lead, one Quick answer and three FAQs. The nine new tables use the existing keyboard-focusable mobile scrolling pattern.
- New titles and card descriptions follow the handover. Internal article links use ArticleSlug references. Original publication schedules, other model generations, US records, decision components and manual deployment triggers are preserved.
- G1/G2 retain their existing date metadata. Only the twelve substantive integrations and rewritten control owner receive a substantive update date. No public publication/update labels were added.
- Extended the existing generated-SEO, route/source and release-smoke checks. No parallel audit framework or extra product-detail routes were added.

## Source review

All twelve specified primary sources were reopened on 1 November 2026, including both Conair manuals. Product headings, model/market identities, selected Shark box contents and the relevant operating statements were inspected, rather than accepting status codes alone.

The copy keeps Sculpt adaptive regulation distinct from user-selected settings; corded CoolShine distinct from original rechargeable Corrale; standalone fixed-head Airsmooth distinct from AirSmooth2x; Duet Blowdry distinct from Duet Style; UK HD6052SUK/HD446UK distinct from US HD430; and a motor-wrapped chamber distinct from hand wrapping and airflow attraction. Conflicting or unclear heat-count/weight scopes are excluded. The UK HD446UK source href now uses its current SharkNinja destination. Old FlexFusion redirects were not adopted as evidence.

The content alarm flags the ordinary verbs “treat” and “treating”. The affected new sentences/headings were individually revised to grammatical cosmetic/tool language while retaining their intended meaning. No checker exemption or broad repository-wide replacement was introduced.

## Validation

| Check                            | Result                                                                                                                             |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Full npm run verify              | Passed                                                                                                                             |
| Formatting, lint and type checks | Passed across workspaces                                                                                                           |
| Tests                            | 89 frontend, 1 API, 4 infrastructure and 33 script tests passed                                                                    |
| Content safety                   | All 198 HTML files passed                                                                                                          |
| Publication validator            | All 20 changed/new HTML sources passed without staging                                                                             |
| Editorial targets                | Passed; advisory length/title/FAQ recommendations remain                                                                           |
| Production build                 | 220 static routes; artifact in frontend/dist/hair-frontend/browser                                                                 |
| Generated SEO                    | Passed for 196 public guides                                                                                                       |
| Internal links                   | 220 generated pages and 5,862 links passed                                                                                         |
| Sitemap/route inventory          | 218 unique intended indexable URLs; no missing sitemap routes or broken internal links                                             |
| Artifact release smoke           | All 28 maintained article owners passed, including all six Batch 30 complete articles                                              |
| SEO validation                   | Passed; 9 existing spelling advisories                                                                                             |
| Targeted artifact acceptance     | Six article structures, five Guides/category entries, three integration tables, three grammar paragraphs and two SVG assets passed |

The sandbox prevents tsx CLI IPC socket creation. Checks used a temporary external npm shell adapter invoking the same entrypoints through node --import tsx; package scripts were not changed. Angular tests/build used CI=1 and NG_BUILD_MAX_WORKERS=2 after the unrestricted-worker invocation aborted locally.

## Visual and release limits

The Corrale SVG was inspected in Chrome at its intrinsic 340px width. Both original diagrams were rendered offline and inspected for readable labels and clipping. Full desktop/mobile page rendering, measured table overflow and interactive browser navigation/hydration were not completed because the isolated preview surface blocks local file URLs. The built HTML, responsive table markup and shared component behavior are covered by the checks above; those checks are not claimed as a visual pass.

No AWS infrastructure, caching, routing, logging or deployment workflow was changed. Nothing was deployed or invalidated. A later ordinary content deployment uses the existing S3 storage/request and CloudFront request/transfer billing; no recurring resources are added by this batch. The maintained post-release smoke command now checks 28 article owners plus the sitemap when explicitly run against production.

After manual deployment, verify the five additions, all updated owners/hubs, 218-entry sitemap and both SVG response MIME types against the handover. Reconcile inventory if unrelated changes ship in the same release.

## Added pages

- https://www.combreport.com/guides/ghd-sculpt-vs-chronos
- https://www.combreport.com/guides/dyson-corrale-coolshine-vs-corrale
- https://www.combreport.com/guides/dyson-airsmooth-vs-ghd-duet-blowdry
- https://www.combreport.com/guides/shark-glam-vs-flexstyle
- https://www.combreport.com/guides/automatic-hair-curler-vs-curling-wand

## Updated pages

- https://www.combreport.com/guides/fixed-vs-adjustable-temperature-hair-straighteners
- https://www.combreport.com/guides/how-to-use-creaseless-hair-clips
- https://www.combreport.com/guides/how-to-apply-hair-serum-or-oil
- https://www.combreport.com/guides/best-flat-irons
- https://www.combreport.com/guides/ghd-chronos-vs-platinum-plus
- https://www.combreport.com/guides/corded-vs-cordless-hair-straighteners
- https://www.combreport.com/guides/ghd-chronos-vs-chronos-max
- https://www.combreport.com/guides/best-hot-air-brushes
- https://www.combreport.com/guides/thermal-brush-vs-hot-air-brush
- https://www.combreport.com/guides/how-to-choose-multi-styler-attachments
- https://www.combreport.com/guides/dyson-airwrap-vs-shark-flexstyle
- https://www.combreport.com/guides/curling-iron-vs-curling-wand
- https://www.combreport.com/guides/best-curling-irons
- https://www.combreport.com/guides/how-to-clean-hot-air-brush
- https://www.combreport.com/guides/best-travel-flat-irons
- https://www.combreport.com/flat-irons
- https://www.combreport.com/hot-air-brushes
- https://www.combreport.com/curling-irons
- https://www.combreport.com/guides

## Changed files

- `frontend/content/automatic-hair-curler-vs-curling-wand.html`
- `frontend/content/best-curling-irons.html`
- `frontend/content/best-flat-irons.html`
- `frontend/content/best-hot-air-brushes.html`
- `frontend/content/best-travel-flat-irons.html`
- `frontend/content/corded-vs-cordless-hair-straighteners.html`
- `frontend/content/curling-iron-vs-curling-wand.html`
- `frontend/content/dyson-airsmooth-vs-ghd-duet-blowdry.html`
- `frontend/content/dyson-airwrap-vs-shark-flexstyle.html`
- `frontend/content/dyson-corrale-coolshine-vs-corrale.html`
- `frontend/content/fixed-vs-adjustable-temperature-hair-straighteners.html`
- `frontend/content/ghd-chronos-vs-chronos-max.html`
- `frontend/content/ghd-chronos-vs-platinum-plus.html`
- `frontend/content/ghd-sculpt-vs-chronos.html`
- `frontend/content/how-to-apply-hair-serum-or-oil.html`
- `frontend/content/how-to-choose-multi-styler-attachments.html`
- `frontend/content/how-to-clean-hot-air-brush.html`
- `frontend/content/how-to-use-creaseless-hair-clips.html`
- `frontend/content/shark-glam-vs-flexstyle.html`
- `frontend/content/thermal-brush-vs-hot-air-brush.html`
- `frontend/public/diagrams/corrale-power-and-attachment-choices.svg`
- `frontend/public/diagrams/curl-wrapping-mechanisms.svg`
- `frontend/scripts/check-generated-seo.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/article-supplementary-sources.spec.ts`
- `frontend/src/app/current-model-comparison-guides.ts`
- `frontend/src/app/direct-heat-hub.component.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/published-guide-route.spec.ts`
- `frontend/src/app/static-page.component.ts`
- `frontend/src/app/tool-choice-guides.ts`
- `reports/seo-route-audit/release-smoke.json`
- `scripts/seo/release-smoke.ts`
- `docs/batch-30-implementation-review.md`
