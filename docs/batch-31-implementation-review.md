# Batch 31 implementation review

Implemented locally on 2 November 2026. Work is unstaged. No production deployment or production HTTP verification was performed.

## Completed scope

- Five new shared-template guides, one complete in-place crease-guide rewrite, fourteen existing-owner updates (including E1B/E2B), three paragraphs across the two existing hubs, Guides cards and two original SVGs.
- All six complete articles use Editorial guide, one lead, one Quick answer, a substantive table, three FAQs and separate evidence/source/related sections. Card labels and descriptions follow the handover.
- The crease guide now cites the Conair CD851 clamp manual. Its obsolete CD706 wand reference and old body/footer are removed. CD706 remains available to the valid wand comparison owners.
- The two care paragraphs and the straightener warm-plate FAQ now address the reader directly. Exact-model cleaning permission boundaries remain intact.
- New article links use typed ArticleSlug references. Registry additions preserve original existing publication dates; only substantive changed owners receive 2 November modification dates. No public publication/update labels were added.
- Curling hub classification now includes curler, waver and crimper names. Existing finder outcomes, menus, shared interactive components and manual deployment triggers are unchanged.
- Existing generated-SEO, publication-route and rendered-source checks were extended. The source regression checks that the crease article uses the clamp manual while retaining the legitimate wand reference elsewhere.

## Evidence review

The five specified manufacturer-hosted manuals were reopened on 2 November 2026. Their English instructions establish CD1031C loading/release and its particular disconnected cover/chamber care; CI91AW geometry selection separately from heat controls; CD851 clamp operation; S3580 patterned-plate operation; and 2447CU release and last-wave overlap instructions. No multilingual manual corpus or additional applications were installed.

Examples retain their model and market limits. No universal temperature, contact time, overlap distance, imported-model recommendation or measured performance winner was introduced. Individual occurrences of ordinary “treat”/“treating” language and diagnostic wording in the supplied copy were revised to retain the grooming meaning and pass the content alarm; no checker exemption or global substitution was used.

## Validation

| Check                   | Result                                                                                                                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Formatting, lint, types | Passed                                                                                                                                                                                                    |
| Tests                   | 90 frontend, 1 API, 4 infrastructure and 33 script tests passed (128 total)                                                                                                                               |
| Content safety          | All 203 HTML files passed                                                                                                                                                                                 |
| Publication validation  | All 20 changed/new HTML sources passed without staging                                                                                                                                                    |
| Editorial targets       | Passed; advisory length/title/FAQ recommendations remain                                                                                                                                                  |
| Production build        | 225 prerendered static routes                                                                                                                                                                             |
| Generated SEO           | Passed for 201 public guides                                                                                                                                                                              |
| Internal links          | 225 generated pages and 6,023 links passed                                                                                                                                                                |
| Sitemap/route inventory | 223 unique intended sitemap entries; no missing indexable routes or broken internal links                                                                                                                 |
| SEO validation          | Passed with 9 existing spelling advisories                                                                                                                                                                |
| Artifact release smoke  | All 34 maintained article owners passed, including the six complete Batch 31 articles                                                                                                                     |
| Targeted acceptance     | Six complete article structures, one Guides/curling-hub card per owner, correct clamp source, three care prose repairs, original four-entry straightener FAQ and both diagram positions/dimensions passed |
| Git hygiene             | Whitespace check passed; nothing staged                                                                                                                                                                   |

The first full verification reached generated SEO and exposed an older hub matcher that classified new curler/waver/crimper names as flat-iron guides. Its matcher was corrected to agree with the rendered hub; generated SEO and the remaining internal-link/release checks then passed. Earlier formatting, lint, types, tests, content checks and production build passed in that verification run.

The environment's tsx CLI socket restriction was handled using the existing temporary external npm shell adapter with node --import tsx. Repository package scripts are unchanged. Angular checks used CI=1 and NG_BUILD_MAX_WORKERS=2.

## Visual and release limits

Both original SVGs were rendered offline at their intrinsic 340px width and visually inspected for readable labels, distinct panels and clipping. Their responsive image dimensions, captions and table markup were checked in the built HTML. A full desktop/mobile browser rendering and interaction pass was unavailable because this session does not expose the Browser app's control tool. Existing component tests passed; the HTML checks are not claimed as measured browser overflow or hydration checks.

The manual production release artifact is in frontend/dist/hair-frontend/browser. After deployment, verify all five additions, the rewrite, fourteen updated owners, two hubs, Guides, the 223-entry sitemap and both SVG MIME responses. Reconcile intervening releases if the inventory changes. The maintained post-release smoke command checks 34 article owners plus the sitemap.

No AWS infrastructure, cache, logging, routing or deployment configuration changed. Nothing was deployed or invalidated. A later ordinary content release uses the existing S3 storage/request and CloudFront request/transfer billing; this batch adds no recurring resources.

## Added pages

- https://www.combreport.com/guides/how-to-use-an-automatic-hair-curler
- https://www.combreport.com/guides/how-to-clean-an-automatic-hair-curler
- https://www.combreport.com/guides/hair-waver-vs-curling-iron
- https://www.combreport.com/guides/how-to-use-a-hair-waver
- https://www.combreport.com/guides/hair-crimper-vs-hair-waver

## Updated pages

- https://www.combreport.com/guides/curling-iron-leaves-crease
- https://www.combreport.com/guides/how-to-clean-a-curling-iron-or-wand
- https://www.combreport.com/guides/how-to-clean-hair-straightener-plates
- https://www.combreport.com/guides/automatic-hair-curler-vs-curling-wand
- https://www.combreport.com/guides/best-curling-irons
- https://www.combreport.com/guides/curling-iron-vs-curling-wand
- https://www.combreport.com/guides/how-to-use-a-curling-iron
- https://www.combreport.com/guides/how-to-use-a-curling-wand
- https://www.combreport.com/guides/curling-iron-barrel-size-guide
- https://www.combreport.com/guides/how-to-section-hair-for-styling
- https://www.combreport.com/guides/how-to-brush-out-curls
- https://www.combreport.com/guides/why-curls-fall-out
- https://www.combreport.com/guides/best-curling-tools-short-hair
- https://www.combreport.com/guides/best-curling-tools-long-hair
- https://www.combreport.com/guides/styling-tool-troubleshooting
- https://www.combreport.com/curling-irons
- https://www.combreport.com/flat-irons
- https://www.combreport.com/guides

## Changed files

- `frontend/content/automatic-hair-curler-vs-curling-wand.html`
- `frontend/content/best-curling-irons.html`
- `frontend/content/best-curling-tools-long-hair.html`
- `frontend/content/best-curling-tools-short-hair.html`
- `frontend/content/curling-iron-barrel-size-guide.html`
- `frontend/content/curling-iron-leaves-crease.html`
- `frontend/content/curling-iron-vs-curling-wand.html`
- `frontend/content/hair-crimper-vs-hair-waver.html`
- `frontend/content/hair-waver-vs-curling-iron.html`
- `frontend/content/how-to-brush-out-curls.html`
- `frontend/content/how-to-clean-a-curling-iron-or-wand.html`
- `frontend/content/how-to-clean-an-automatic-hair-curler.html`
- `frontend/content/how-to-clean-hair-straightener-plates.html`
- `frontend/content/how-to-section-hair-for-styling.html`
- `frontend/content/how-to-use-a-curling-iron.html`
- `frontend/content/how-to-use-a-curling-wand.html`
- `frontend/content/how-to-use-a-hair-waver.html`
- `frontend/content/how-to-use-an-automatic-hair-curler.html`
- `frontend/content/styling-tool-troubleshooting.html`
- `frontend/content/why-curls-fall-out.html`
- `frontend/public/diagrams/automatic-curler-care-boundaries.svg`
- `frontend/public/diagrams/waver-step-and-release.svg`
- `frontend/scripts/check-generated-seo.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/article-supplementary-sources.spec.ts`
- `frontend/src/app/direct-heat-hub.component.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/published-guide-route.spec.ts`
- `frontend/src/app/static-page.component.ts`
- `frontend/src/app/wave-method-guides.ts`
- `reports/seo-route-audit/release-smoke.json`
- `scripts/seo/release-smoke.ts`
- `docs/batch-31-implementation-review.md`
