# Batch 28 implementation review

Implemented on 31 October 2026. All work remains unstaged; no commit or deployment was made.

## Completed scope

- Five complete specification-researched comparisons use the shared Angular article page, typed ArticleSlug references and existing article registry. No competing owner was present.
- Applied E1–E15 once, including the replacement Rise/Glide+ handoff, the Airwrap citation correction, the attachment-generation matrix and all ten required contextual incoming links.
- Added the exact supplied cards to Hair Dryers, Hot-Air Brushes and Flat Irons, with all five owners discoverable in the initial Guides HTML and existing category filters.
- Added two original SVGs with dimensions, alternatives, captions, vertically arranged labels and dark/light styling. Existing table scrolling markup is reused.
- New articles use one authored lead, one Quick answer, comparison tables, three template-rendered FAQ questions, Evidence scope, Sources and Related guides. Required HTML checks verify the actual rendered body.
- Existing US product records and all original registry entries are unchanged. UK source identity lives in the established guide-evidence architecture; these articles do not require duplicate Product Explorer records or additional product routes.
- The shared article template can render supplementary scoped sources alongside its existing evidence, including an attachment article with no product evidence panel. Two component regressions exercise both paths.
- Extended the generated-SEO and existing release-smoke checks to the five new owners. Corrected the publication-gate regression to validate current working-tree content at the current date instead of 17 October.

## Source outcomes and citation correction

All thirteen assigned product/support URLs S1–S13 were reopened through official web retrieval on 31 October. Relevant control, dry-use, mechanism, selected-box and compatibility passages support the supplied boundaries. Source dates record that inspection. The old S14 PDF could not be reopened; its prior title-page identification in the handover was not independently re-established during this task.

E13 removes the old 587990-01.pdf citation from the i.d.-scoped paragraph. Its UK i.d. listing and correct UK i.d. support/manual owner now appear both beside the discussion and in the supplementary source model. Existing US i.d./HD430 evidence and the UK HD446UK example remain intact. No full inspection of the oversized i.d. PDF is claimed.

E15 adds the official UK Co-anda2x compatibility FAQ as a distinct source. Its generation table separates earlier Airwrap/i.d. parts from Co-anda2x and keeps fit separate from inclusion. The complete selected UK i.d. inventory remains unverified; no invented inclusion, negative feature, price, stock, weight, timing or performance field was added.

Small editorial revisions replace ambiguous uses of “treat” and “prescription” and remove unnecessary health references from the supplied public copy. No prohibited editorial terms remain in HTML sources. The FAQ copy is held in front matter and rendered by the shared template.

## Dates and discovery

The five new registrations publish on 31 October. The fifteen edited owners and four changed discovery pages carry a 31 October substantive revision. All 182 original article registry entries, including publication dates, are unchanged. The other 168 HTML sources remain byte-for-byte identical to HEAD. No public publication/update label, redirect, menu change, dependency or infrastructure change was added.

The built sitemap contains exactly 208 unique canonical URLs, including each new owner once and the existing /curling-irons hub. The build renders 210 routes; /contact and /404 remain outside the sitemap.

## Validation

| Check                                        | Result                                                                                                           |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Content safety                               | Passed: 188 HTML sources                                                                                         |
| Actual publication validator without staging | Passed: all 20 new/changed sources                                                                               |
| New main bodies, excluding FAQ/footer        | 577, 608, 579, 646 and 678 words; all pass the actual minimum                                                    |
| Editorial targets                            | Passed, with advisory targets retained                                                                           |
| Lint and type checks                         | Passed across workspaces                                                                                         |
| Angular tests                                | 89 passed, including 2 supplementary-source regressions                                                          |
| API / infrastructure / script tests          | 1 / 4 / 33 passed; 127 total tests                                                                               |
| Production build                             | Passed: 210 prerendered routes and fingerprinted assets                                                          |
| Generated SEO                                | Passed: 186 public guides, new body/tail and required incoming checks included                                   |
| Internal links                               | Passed: 210 pages, 5,551 links                                                                                   |
| SEO validate                                 | Passed: zero broken internal links/coverage errors; 9 existing spelling advisories                               |
| Artifact release smoke                       | Passed: all 16 intended Batch 26–28 documents and sitemap                                                        |
| Targeted HTML acceptance                     | Passed: E1–E15 contextual links once, 5 hub/index assignments, FAQ/table/diagram metadata and corrected citation |
| Original registry and source preservation    | Passed: 182 registry entries preserved; 168 untouched HTML sources                                               |

The normal tsx CLI cannot create its IPC socket in this environment. Checks use a temporary external npm shell adapter that invokes the same entrypoints with node --import tsx; repository commands are unchanged. Build/tests use CI=1 and NG_BUILD_MAX_WORKERS=2.

Formatting and git diff --check also pass. Nothing is staged.

## Visual and deployment status

Local generated content was opened in Chrome and its accessibility tree confirmed the comparison, table, diagram alternative and full FAQ/evidence/source/related sequence. A screenshot did not remain on the review tab, so it is not claimed as visual approval. The isolated browser explicitly rejected file: previews under its URL policy. Full desktop/360px layout, table scrolling and measured overflow checks remain unverified. No screenshots were retained.

No deployment or production verification was performed. After an authorised deployment, run the existing npm run seo:smoke-release command; artifact-only success is not live evidence. The extended check makes 17 bounded production GET requests including the sitemap, five more than previously. These use existing request/data-transfer billing; there are no new AWS resources, invalidations, logs or storage changes.

## Assets

- frontend/public/diagrams/wet-to-dry-mode-boundaries.svg
- frontend/public/diagrams/airwrap-generation-fit.svg

## Added pages

- https://www.combreport.com/guides/ghd-speed-vs-helios
- https://www.combreport.com/guides/ghd-glide-plus-vs-glide-plus-max
- https://www.combreport.com/guides/dyson-supersonic-nural-vs-supersonic-r
- https://www.combreport.com/guides/dyson-airstrait-vs-ghd-duet-style
- https://www.combreport.com/guides/dyson-airwrap-id-vs-co-anda2x

## Updated pages

- https://www.combreport.com/guides/ghd-air-vs-helios
- https://www.combreport.com/guides/how-to-choose-hair-dryer
- https://www.combreport.com/guides/hair-dryer-heat-and-speed-settings-guide
- https://www.combreport.com/guides/ghd-rise-vs-glide-plus
- https://www.combreport.com/guides/how-to-choose-a-straightening-brush
- https://www.combreport.com/guides/how-to-use-a-straightening-brush
- https://www.combreport.com/guides/dyson-supersonic-vs-shark-speedstyle
- https://www.combreport.com/guides/hair-dryer-diffuser-compatibility
- https://www.combreport.com/guides/hair-dryer-diffuser-vs-concentrator
- https://www.combreport.com/guides/best-flat-irons
- https://www.combreport.com/guides/flat-iron-vs-hot-air-brush
- https://www.combreport.com/guides/how-to-use-a-flat-iron
- https://www.combreport.com/guides/dyson-airwrap-vs-shark-flexstyle
- https://www.combreport.com/guides/best-hot-air-brushes
- https://www.combreport.com/guides/how-to-choose-multi-styler-attachments
- https://www.combreport.com/hair-dryers
- https://www.combreport.com/hot-air-brushes
- https://www.combreport.com/flat-irons
- https://www.combreport.com/guides

## Changed files

- docs/batch-28-implementation-review.md
- frontend/content/best-flat-irons.html
- frontend/content/best-hot-air-brushes.html
- frontend/content/dyson-airstrait-vs-ghd-duet-style.html
- frontend/content/dyson-airwrap-id-vs-co-anda2x.html
- frontend/content/dyson-airwrap-vs-shark-flexstyle.html
- frontend/content/dyson-supersonic-nural-vs-supersonic-r.html
- frontend/content/dyson-supersonic-vs-shark-speedstyle.html
- frontend/content/flat-iron-vs-hot-air-brush.html
- frontend/content/ghd-air-vs-helios.html
- frontend/content/ghd-glide-plus-vs-glide-plus-max.html
- frontend/content/ghd-rise-vs-glide-plus.html
- frontend/content/ghd-speed-vs-helios.html
- frontend/content/hair-dryer-diffuser-compatibility.html
- frontend/content/hair-dryer-diffuser-vs-concentrator.html
- frontend/content/hair-dryer-heat-and-speed-settings-guide.html
- frontend/content/how-to-choose-a-straightening-brush.html
- frontend/content/how-to-choose-hair-dryer.html
- frontend/content/how-to-choose-multi-styler-attachments.html
- frontend/content/how-to-use-a-flat-iron.html
- frontend/content/how-to-use-a-straightening-brush.html
- frontend/public/diagrams/airwrap-generation-fit.svg
- frontend/public/diagrams/wet-to-dry-mode-boundaries.svg
- frontend/scripts/check-generated-seo.ts
- frontend/src/app/article-page.component.ts
- frontend/src/app/article-registry.ts
- frontend/src/app/article-slug.ts
- frontend/src/app/article-supplementary-sources.spec.ts
- frontend/src/app/current-model-comparison-guides.ts
- frontend/src/app/guide-evidence.ts
- frontend/src/app/guide-link-map.ts
- frontend/src/app/model-comparison-guides.ts
- frontend/src/app/seo-route-policy.ts
- reports/seo-route-audit/release-smoke.json
- reports/seo-url-inventory.json
- scripts/check-staged-content.test.ts
- scripts/seo/release-smoke.ts
