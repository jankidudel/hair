# Batch 27 implementation review

Implemented the finishing methods, brush care and release handover on 30 October 2026. All changes remain unstaged. No commit or deployment was made in this task.

## Batch 26 reconciliation

The handover's missing-release observations predate the user's redeployment. The direct production-browser verification immediately before this implementation confirmed all five Batch 26 guides, correct canonicals/indexability, 198 sitemap entries, both hub groups, all twelve contextual integrations, all eight clean prefix corrections, both diagrams and the corrected original/revision dates. The two full Batch 25 rewrites retain 7 October publication and 29 October modification dates.

That production gap is resolved. The underlying cause of the earlier stale release cannot be established from repository files alone; no claim is made about which workflow/artifact/bucket caused it. Correct Batch 26 source work was preserved rather than recreated, and all five carried owners pass the new artifact smoke check.

The production site configuration is explicitly https://www.combreport.com with indexing enabled. Both existing manual deployment workflows build frontend/dist/hair-frontend/browser and pass the prod environment's SITE_BUCKET and CLOUDFRONT_DISTRIBUTION_ID to the shared uploader. Runtime values and a production run ID were not available for this local implementation; no credentials or infrastructure were inspected or changed.

## Editorial implementation

- Added five distinct article owners through the existing shared Angular article, registry, typed slug, content-link, evidence and related-link models. No equivalent registry owner or route conflict was found.
- Fully replaced hot-air-brush cleaning, including metadata, lead, body, FAQ and footer evidence. The generic pointed-tool advice, broad damp-wipe method and unsupported interval were removed.
- Added L1–L12 once at their specified subjects. L8 replaces the previous short care paragraph; L9 precedes ordinary-brush care. Existing Batch 26 clay/texture integrations remain in place.
- Added serum/oil, curl cream and styling powder to Hair Care methods, with the powder/dry-shampoo comparison in its finishing comparison area.
- Added straightening-brush care to the existing Hot-Air Brushes care/use listing using its registry entry and exact custom description. The existing hot-air cleaning card reflects the replacement metadata. Guides discovery uses the same records.
- Delivered two original schematic SVGs, with explicit dimensions, alternatives, captions and vertically arranged readable labels. Both carried-over Batch 26 SVGs remain assigned to their original pages.
- Expanded the generated-SEO validator to cover all six new/replacement bodies and every assigned contextual incoming paragraph. Existing contamination and date regressions remain active.

Small editorial revisions remove ambiguous cosmetic uses of the word “treat” and unnecessary scalp-symptom/health references from supplied public copy. The official Original formula URL uses the existing entity-escaped URL convention in HTML; its source record resolves to the exact original manufacturer URL. No health claims, rankings, new product records, top-menu changes, redirects or dependencies were added.

## Source rechecks

All seven new sources were opened and their relevant passages checked on 30 October. No substantive drift was found:

| Source                                    | Confirmed scope                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Moroccanoil Original UK                   | Small amount on clean towel-dried mid-length to ends; separate dry finishing use                                   |
| Moroccanoil Curl Defining Cream UK        | Towel-dried application, distribution, diffuser/natural drying routes, and FAQ distinguishing heat-protectant role |
| American Crew Boost Powder US             | Loosen container, small hand-dispensed amount, light dry-hair root-area distribution                               |
| Batiste Original English European listing | Oil-refresh positioning and shake, section/spray, massage, brush sequence                                          |
| Original ghd glide UK support             | Unplug/cool, loose-hair removal, permitted damp wiping of the original model's surface/bristle gaps                |
| ghd Duet Blowdry UK aftercare             | Unplug/cool, no immersion, permitted exterior wiping and supplied brush for filter/outlets                         |
| ghd Duet Blowdry UK support               | Rear-filter location and explicit non-removability                                                                 |

Only assigned source records are rendered per page. Original glide guidance is not extended to glide+ or other generations. Inaccessible legacy PDFs were not cited as inspected evidence. Batch 26 sources were not needlessly refreshed because that source work was already complete.

## Dates

All existing publication dates are preserved. The twelve integration owners and the replacement owner record substantive updates on 30 October, as do the two changed hubs and Guides discovery. New owners are registered for 30 October. A comparison against HEAD confirms 163 unchanged published articles retain their revision records. Metadata-only rebuilds do not refresh unrelated dates. No published or updated label was added to public UI.

## Release verification

Added npm run seo:smoke-release and wired it after upload in both existing manual deployment workflows. No triggers, caching, compression, bucket cleanup, infrastructure or upload ordering were changed.

The command first reads the actual built sitemap and eleven intended rendered article documents, then requests the production sitemap and the same eleven canonical pages. It checks status, title, H1, canonical, dates, indexability, complete matching body and FAQ/evidence/source/related structure against the intended source. Missing published owners, missing artifact files, stale HTTP-200 content, home fallbacks, 404s and absent/duplicate sitemap entries fail with a non-zero exit status. Workflow wrappers do not suppress that status.

The report records source commit, dirty-tree status, a SHA-256 of the checked article documents and sitemap, and GitHub run identity when available. Artifact-only mode is explicitly labelled and cannot be mistaken for a recorded production check.

Usage after an authorised deployment:

```sh
npm run seo:smoke-release
```

Local artifact validation, without production requests:

```sh
npm run seo:smoke-release -- --artifact-only
```

Cost scope: each production smoke run makes twelve bounded GET requests using existing CloudFront request/data-transfer billing. No new AWS resources, invalidations, logs or storage are provisioned by this change. No deployment was performed.

## Validation results

| Check                                                      | Result                                                                                                                                 |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| npm run content:check                                      | Passed: 183 HTML sources                                                                                                               |
| Actual staged-content validator on all changed/new sources | Passed: 18 article files, without staging                                                                                              |
| Six main bodies, excluding FAQs/template tails             | Passed: serum/oil 660; curl cream 623; powder 662; straightening-brush care 616; powder comparison 633; airflow-brush care 616 words   |
| npm run check:editorial-targets                            | Passed with advisory target warnings; no thresholds relaxed                                                                            |
| npm run lint and npm run typecheck                         | Passed across workspaces                                                                                                               |
| Tests                                                      | Passed: 87 Angular, 1 API, 4 infrastructure, 33 script tests; 125 total                                                                |
| Release regressions                                        | Passed: stale 200, wrong title/H1/canonical, missing body, missing/duplicate sitemap, HTTP 404, and actual command failure exit status |
| npm run build --workspace=frontend                         | Passed: 205 prerendered routes, fingerprinted assets                                                                                   |
| npm run check:generated-seo                                | Passed: 181 public guides, including both contextual integration sets                                                                  |
| npm run check:internal-links                               | Passed: 205 generated pages and 5,405 internal links                                                                                   |
| npm run seo:validate                                       | Passed: nine spelling advisories; zero route/sitemap coverage errors or broken internal links                                          |
| npm run seo:smoke-release -- --artifact-only               | Passed: eleven real rendered documents and sitemap                                                                                     |
| Targeted generated-HTML acceptance                         | Passed: exact L1–L12 copy/anchors once, hub anchors, four assigned SVG resources, preserved original dates and unchanged revisions     |
| Sitemap                                                    | Passed: 203 canonicals, each of the ten distinct Batch 26/27 new owners once, /curling-irons preserved                                 |
| npm run format:check and git diff --check                  | Passed                                                                                                                                 |

The tsx IPC socket is blocked by this execution environment. Npm checks used a temporary script-shell adapter invoking the same entrypoints with node --import tsx; repository runtime commands were preserved. Angular build/tests ran with CI=1 and NG_BUILD_MAX_WORKERS=2. The newly added workflow regression was run in the final 33-test script suite after the complete workspace test run.

## Visual and production status

The local preview server could not bind its socket because the execution sandbox rejects listening sockets. Consequently, local 360px/desktop screenshots and measured page-overflow checks are not claimed. SVG XML, dimensions, alternatives and the existing narrow-screen scrolling markup were verified, but visual approval remains outstanding.

Batch 26 was verified live before implementation. Batch 27 is implemented and locally validated, but was not deployed or claimed as production-verified. Production smoke must run against the authorised release; artifact-only success is not live evidence. No GSC/indexing claim is made.

## Four diagram resources

- frontend/public/diagrams/formula-application-areas.svg — new
- frontend/public/diagrams/electrical-brush-care-areas.svg — new
- frontend/public/diagrams/roller-care-parts.svg — preserved Batch 26
- frontend/public/diagrams/travel-tool-cord-layout.svg — preserved Batch 26

## Checked artifact identity

- Source HEAD: 9245c71dfee0ed3d11771622f3c86996574c2a6f with unstaged Batch 27 changes.
- Checked-document SHA-256: 561edfb2b05a2ff482e4870e731a8a23ddcfe905a3e60dce356272bc38e2958a.
- No production GitHub run identity is assigned to this local check.

## Added pages

- https://www.combreport.com/guides/how-to-apply-hair-serum-or-oil
- https://www.combreport.com/guides/how-to-apply-curl-cream
- https://www.combreport.com/guides/how-to-use-hair-styling-powder
- https://www.combreport.com/guides/how-to-clean-a-straightening-brush
- https://www.combreport.com/guides/hair-styling-powder-vs-dry-shampoo

## Updated pages

- https://www.combreport.com/guides/curl-cream-vs-leave-in-conditioner
- https://www.combreport.com/guides/hair-mousse-vs-gel
- https://www.combreport.com/guides/hair-serum-vs-hair-oil
- https://www.combreport.com/guides/hair-styling-product-order
- https://www.combreport.com/guides/how-to-apply-gel-to-curly-hair
- https://www.combreport.com/guides/how-to-apply-heat-protectant
- https://www.combreport.com/guides/how-to-apply-leave-in-conditioner
- https://www.combreport.com/guides/how-to-choose-a-straightening-brush
- https://www.combreport.com/guides/how-to-clean-a-hair-brush
- https://www.combreport.com/guides/how-to-clean-hot-air-brush
- https://www.combreport.com/guides/how-to-use-a-curl-defining-brush
- https://www.combreport.com/guides/how-to-use-a-straightening-brush
- https://www.combreport.com/guides/sea-salt-spray-vs-texturising-spray
- https://www.combreport.com/hair-care
- https://www.combreport.com/hot-air-brushes
- https://www.combreport.com/guides

## Changed files

- .github/workflows/deploy-all.yml
- .github/workflows/deploy-content.yml
- docs/batch-27-implementation-review.md
- frontend/content/curl-cream-vs-leave-in-conditioner.html
- frontend/content/hair-mousse-vs-gel.html
- frontend/content/hair-serum-vs-hair-oil.html
- frontend/content/hair-styling-powder-vs-dry-shampoo.html
- frontend/content/hair-styling-product-order.html
- frontend/content/how-to-apply-curl-cream.html
- frontend/content/how-to-apply-gel-to-curly-hair.html
- frontend/content/how-to-apply-hair-serum-or-oil.html
- frontend/content/how-to-apply-heat-protectant.html
- frontend/content/how-to-apply-leave-in-conditioner.html
- frontend/content/how-to-choose-a-straightening-brush.html
- frontend/content/how-to-clean-a-hair-brush.html
- frontend/content/how-to-clean-a-straightening-brush.html
- frontend/content/how-to-clean-hot-air-brush.html
- frontend/content/how-to-use-a-curl-defining-brush.html
- frontend/content/how-to-use-a-straightening-brush.html
- frontend/content/how-to-use-hair-styling-powder.html
- frontend/content/sea-salt-spray-vs-texturising-spray.html
- frontend/public/diagrams/electrical-brush-care-areas.svg
- frontend/public/diagrams/formula-application-areas.svg
- frontend/scripts/check-generated-seo.ts
- frontend/src/app/article-registry.ts
- frontend/src/app/article-slug.ts
- frontend/src/app/finishing-method-guides.ts
- frontend/src/app/guide-evidence.ts
- frontend/src/app/guide-link-map.ts
- frontend/src/app/seo-route-policy.ts
- frontend/src/app/static-page.component.ts
- package.json
- reports/seo-route-audit/release-smoke.json
- reports/seo-url-inventory.json
- scripts/release-smoke.test.ts
- scripts/seo/release-article-validation.ts
- scripts/seo/release-smoke.ts
- scripts/workflow-validation.test.ts
