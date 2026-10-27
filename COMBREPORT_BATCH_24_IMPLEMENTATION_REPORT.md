# Comb Report Batch 24 implementation handoff

Implemented locally on 27 October 2026. No deployment, commits or staging performed.

## Completed scope

- Seven existing articles fully replaced; three new shared-template methods added after checking the canonical registry for duplicate owners.
- All twelve follow-up integrations completed, including construction-specific cleaning, pointed-tool corrections and whole-product vegan-status wording.
- Hair Care and Brushes & Combs discovery blocks, generated guide cards and tool-directory description updated. New links use ArticleSlug references.
- Two original, accessible SVGs added with adjacent explanatory text. Product and appliance instructions feed separate checks; no setting or dose is generated.
- Existing finder retains its owner URL and now asks about sequence, planned application, recorded product directions and optional feel. Missing notes and mismatches remain unresolved. Answers clear stale results; reset restores exact defaults. Instances have unique IDs and independent session state. Only a short status uses a polite live region. No persistence, new network calls, analytics or storage introduced; the old finder analytics calls were removed.
- Three new methods have static links from the guide index, category hub and at least two relevant article bodies. Each has exactly one sitemap entry.

## Validation gap and correction

The two placeholder guides were classified as legacy by their old registry publishDate, which excluded them from the minimum-word and section checks. The staged validator also reads only the Git index, so running it on an unstaged tree does not review those edits. Generated SEO previously checked metadata, route identity and evidence-page tails, but these legacy pages were not evidence owners and it did not enforce their main-body substance.

The current editorial contract now explicitly covers the ten repaired/new owners while preserving their real publication schedules. Their generated documents must contain the expected substantive authored body, one Quick answer, the required main sections, their FAQ, evidence, sources and related destinations in order. A matching title or a 200 homepage shell cannot pass. Legacy exceptions for other pages remain unchanged; the review report flags candidates without deleting, noindexing or padding them.

Regression fixtures cover the actual old wash-frequency placeholder, a wrong-page shell, missing shared tails, dropped body copy and registry/set membership. Existing decision integration tests no longer depend on stale whole-site counts.

## Editorial and source checks

All ten named primary sources were checked on 27 October 2026. The three methods were rechecked against ghd UK, Moroccanoil UK, OUAI US North Bondi, Mason Pearson pocket-family/B4 and the correct Kent wood-backed care group. Exact formula, variant, region and construction boundaries remain visible. The B4 source initially timed out and succeeded on the next fetch; no source remains unverified.

The supplied plan contained clinical and symptom-related washing passages that conflict with AGENTS.md. Those passages and its diagnostic FAQ were replaced with ordinary grooming, product-direction and appearance guidance. AAD is used only for its dirt/oil washing principle. No universal interval, formula performance ranking or inferred dose/heat permission was added. A short relevant care-record paragraph was added to the material comparison so its edited body meets the existing publication gate.

## Validation results

| Check                              | Result                                                                                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run verify`                   | Passed: formatting, lint, all workspace typechecks, all tests, content, editorial targets, production build, generated SEO and links         |
| Tests                              | 121 passed: 86 frontend, 1 API, 4 infrastructure, 30 script/route/workflow checks                                                            |
| Working-tree publication gate      | All 22 changed/new HTML articles passed `validateStagedGuide`, without staging                                                               |
| `npm run check:staged-content`     | Passed; index intentionally empty, supplemented by working-tree validation above                                                             |
| `npm run content:check`            | Passed across 169 HTML files                                                                                                                 |
| Production build                   | 191 prerendered routes, including 167 public guides                                                                                          |
| Generated SEO/route/sitemap checks | Passed; 189 canonical sitemap entries, including the three additions                                                                         |
| Internal links                     | 4,992 links across 191 generated documents passed                                                                                            |
| Desktop/mobile review              | P1/P2/P3, both former placeholders and finder inspected; diagrams readable, tables contained, no horizontal document overflow at 390px       |
| Finder browser behaviour           | Unclear directions, mismatch, stale-result invalidation and exact reset verified; static no-JS fallback and links verified in generated HTML |
| `git diff --check`                 | Passed                                                                                                                                       |

Existing editorial advisory warnings remain (body targets, metadata lengths and FAQ counts). The Angular experimental-test-builder and prerender configuration notices also remain. None is a failing check. This does not establish production deployment or Google indexing.

No infrastructure or deployment workflow changed. No AWS resources, invalidations or production traffic actions were performed.

## Added pages

- https://www.combreport.com/guides/how-to-apply-heat-protectant
- https://www.combreport.com/guides/how-to-apply-leave-in-conditioner
- https://www.combreport.com/guides/how-to-clean-a-boar-bristle-hairbrush

## Updated pages

- https://www.combreport.com/guides/best-brushes-fine-hair
- https://www.combreport.com/guides/best-hair-brush-for-short-hair
- https://www.combreport.com/guides/best-heat-protectants
- https://www.combreport.com/guides/best-leave-in-conditioners-dry-hair
- https://www.combreport.com/guides/boar-bristle-brush-guide
- https://www.combreport.com/guides/boar-bristle-vs-nylon-brush
- https://www.combreport.com/guides/cold-water-for-hair
- https://www.combreport.com/guides/curl-cream-vs-leave-in-conditioner
- https://www.combreport.com/guides/hair-brush-vs-comb
- https://www.combreport.com/guides/hair-styling-product-order
- https://www.combreport.com/guides/heat-protectant-spray-vs-cream
- https://www.combreport.com/guides/how-often-should-you-wash-your-hair
- https://www.combreport.com/guides/how-to-blow-dry-hair
- https://www.combreport.com/guides/how-to-choose-hair-brush
- https://www.combreport.com/guides/how-to-clean-a-hair-brush
- https://www.combreport.com/guides/how-to-use-a-curling-iron
- https://www.combreport.com/guides/how-to-use-a-flat-iron
- https://www.combreport.com/guides/what-is-the-grey-fuzz-on-my-hairbrush
- https://www.combreport.com/guides/when-to-replace-hairbrush-or-comb
- https://www.combreport.com/hair-care
- https://www.combreport.com/brushes-combs
- https://www.combreport.com/guides
- https://www.combreport.com/tools

## Changed files

- `frontend/content/best-brushes-fine-hair.html`
- `frontend/content/best-hair-brush-for-short-hair.html`
- `frontend/content/best-heat-protectants.html`
- `frontend/content/best-leave-in-conditioners-dry-hair.html`
- `frontend/content/boar-bristle-brush-guide.html`
- `frontend/content/boar-bristle-vs-nylon-brush.html`
- `frontend/content/cold-water-for-hair.html`
- `frontend/content/curl-cream-vs-leave-in-conditioner.html`
- `frontend/content/hair-brush-vs-comb.html`
- `frontend/content/hair-styling-product-order.html`
- `frontend/content/heat-protectant-spray-vs-cream.html`
- `frontend/content/how-often-should-you-wash-your-hair.html`
- `frontend/content/how-to-apply-heat-protectant.html`
- `frontend/content/how-to-apply-leave-in-conditioner.html`
- `frontend/content/how-to-blow-dry-hair.html`
- `frontend/content/how-to-choose-hair-brush.html`
- `frontend/content/how-to-clean-a-boar-bristle-hairbrush.html`
- `frontend/content/how-to-clean-a-hair-brush.html`
- `frontend/content/how-to-use-a-curling-iron.html`
- `frontend/content/how-to-use-a-flat-iron.html`
- `frontend/content/what-is-the-grey-fuzz-on-my-hairbrush.html`
- `frontend/content/when-to-replace-hairbrush-or-comb.html`
- `frontend/public/diagrams/boar-bristle-brush-care-parts.svg`
- `frontend/public/diagrams/product-direction-and-appliance-readiness.svg`
- `frontend/scripts/check-editorial-targets.ts`
- `frontend/scripts/check-generated-seo.ts`
- `frontend/src/app/article-decision-integration.spec.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/care-method-guides.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/heat-protectant-finder.component.css`
- `frontend/src/app/heat-protectant-finder.component.spec.ts`
- `frontend/src/app/heat-protectant-finder.component.ts`
- `frontend/src/app/heat-protectant-recommendation.spec.ts`
- `frontend/src/app/heat-protectant-recommendation.ts`
- `frontend/src/app/seo-route-policy.ts`
- `frontend/src/app/static-page.component.ts`
- `scripts/check-staged-content.ts`
- `scripts/guide-body-validation.test.ts`
- `scripts/guide-body-validation.ts`
- `COMBREPORT_BATCH_24_IMPLEMENTATION_REPORT.md`
- `COMBREPORT_BATCH_24_GUIDE_SUBSTANCE_REVIEW.md`

## Remaining editorial candidates

The accompanying guide-substance review lists all 167 current guide routes with actual build identity, approximate rendered main-body counts, major sections and visible evidence/source availability. 9 guides are below 500 words; 115 trigger at least one review signal. These are future editorial candidates, not unfinished Batch 24 pages. No production deployment was requested.
