# Batch 26 implementation review

Implemented COMBREPORT_CARE_PACKING_AND_STYLING_METHODS_BATCH_26_HANDOVER.md on 29 October 2026. All work is unstaged. No commit or deployment was made.

## Completed scope

- Created five distinct shared-template editorial guides. No competing registry owner or route conflict was found.
- Corrected F1–F8 in place, retaining their intended contextual anchors and surrounding article copy.
- Added E1–E12 once each, including all assigned incoming contextual links; E12 links to both application guides.
- Added three care/packing cards to Hair Accessories and two application cards to Hair Care. Guides and category discovery use the existing registry. Existing fastening, comparison and roller pathways survive.
- Added two original responsive SVG resources with dimensions, small viewBoxes, captions and descriptive image alternatives. Reused existing keyboard-focusable, narrow-screen table scrolling and schematic styles.
- Added real rendered-paragraph contamination checks to the existing generated SEO validator, plus a contaminated route/placement/pipe regression fixture. Ordinary anchors and preformatted code examples remain permitted.
- Added generated-SEO checks for exactly one authored and rendered contextual paragraph per required incoming owner, excluding related navigation.
- Added a shared-article rendering regression test for original/revision JSON-LD and sitemap policy. The generated SEO check also now validates original datePublished for every article.

## Dates

The existing updatedDate field already feeds Article dateModified and sitemap lastmod correctly. The defect was missing owner records, so no duplicate date model was introduced.

Git commit 600d99c, dated 29 October 2026, and the Batch 25 implementation review confirm the two full rewrites. Both keep their original 7 October publication dates and now record their substantive 29 October update. Every existing article materially changed in this batch also records 29 October. All original publication dates are preserved; 150 unchanged published guides retain their existing revision records. New guides are registered for 29 October. No publication/update dates were added to public copy or UI.

Hair Accessories, Hair Care and Guides have explicit 29 October discovery revisions. Other hub dates remain unchanged. Metadata records should be reviewed against the actual release date if publication is postponed.

## Source recheck

All eight assigned sources were opened and their relevant directions inspected on 29 October. No substantive source drift or collection redirect was found:

- Conair HS11RX manual: exact model, unplug/cool, unit wiping and roller damp-cloth care confirmed.
- Kitsch Ceramic Thermal Rollers 8pc: exact named listing, damp wiping and its permitted hand-wash/drying FAQ confirmed.
- Mauliébris: limited cloth/soap care, no immersion and complete drying confirmed.
- Cloud Nine UK: cooling, relaxed cord loops, plug/plate separation and the named guard confirmed.
- GOV.UK: exact electrical-items page, airline checks and separate battery/gas guidance confirmed; no global carriage table was copied.
- American Crew Molding Clay: small amount, hand softening, towel-dried application and positioned medium shine confirmed. Unrelated ingredient claims were excluded.
- Bumble and bumble UK Dryspun: dry hair, shaking, ten inches, even strokes and container warnings confirmed.
- Oribe UK Dry Texturizing Spray: main directions specify dry styled hair, shaking and six-to-eight inches. Promotional heat/close-distance tips were not adopted.

Each guide has only its assigned evidence and related records. Small editorial changes to supplied text replace diagnostic phrasing and cosmetic uses of “treat” that triggered the required content alarm; meaning and scope are preserved. No health claims were added.

## Validation

| Check                                                   | Result                                                                                                                                        |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| npm run content:check                                   | Passed: 178 HTML sources                                                                                                                      |
| Actual validateStagedGuide on every changed/new article | Passed: 26 sources; nothing was staged                                                                                                        |
| Main-body checks for five new guides                    | Passed: rollers 647, clips/pins 611, packing 676, clay 666, texturising spray 654 words, excluding FAQ/template tails                         |
| npm run check:editorial-targets                         | Passed; advisory length/metadata warnings remain, including supplied short titles and sub-800-word guides; thresholds unchanged               |
| npm run lint                                            | Passed across workspaces                                                                                                                      |
| npm run typecheck                                       | Passed across workspaces                                                                                                                      |
| npm run test                                            | Passed: 87 Angular, 1 API, 4 infrastructure and 30 script tests                                                                               |
| npm run build --workspace=frontend                      | Passed: 200 prerendered routes and fingerprinted assets                                                                                       |
| npm run check:generated-seo                             | Passed: 176 public guides, including required incoming-paragraph checks                                                                       |
| npm run check:internal-links                            | Passed: 200 generated pages, 5,254 internal links                                                                                             |
| npm run seo:validate                                    | Passed: 176 editorial pages; nine spelling advisories, zero broken internal links or route coverage errors                                    |
| Targeted initial-HTML checks                            | Passed: F1–F8 and E1–E12 exact paragraphs/anchors once, five source/body validators, assigned hub anchors, distinct dates and unchanged dates |
| Sitemap                                                 | Passed: 198 canonical URLs, each new guide once, /curling-irons preserved                                                                     |
| npm run format:check and git diff --check               | Passed                                                                                                                                        |

The tsx CLI IPC socket is blocked in this environment. Npm script checks used a temporary script-shell adapter that invokes the same entrypoints with node --import tsx; repository scripts were not changed. Default Angular worker runs aborted in the host runtime. The normal build and test commands passed with CI=1 and NG_BUILD_MAX_WORKERS=2. The date regression rendered the real shared article and its JSON-LD, and the full built-site validator checked actual sitemap output.

## Visual and release status

No connected browser surface was available for viewport inspection. Therefore 360px/desktop visual approval and measured overflow checks remain outstanding; successful markup checks do not substitute for them.

No deployment, live HTTP verification, CloudFront invalidation, infrastructure/caching change or GSC action occurred. This implementation creates no AWS resources or deployment usage. A separately authorised release must verify production statuses, bodies, diagrams, dates, hubs and sitemap.

## SVG resources

- frontend/public/diagrams/roller-care-parts.svg
- frontend/public/diagrams/travel-tool-cord-layout.svg

## Added pages

- https://www.combreport.com/guides/how-to-clean-hair-rollers
- https://www.combreport.com/guides/how-to-clean-hair-clips-and-pins
- https://www.combreport.com/guides/how-to-pack-hair-tools-for-travel
- https://www.combreport.com/guides/how-to-apply-hair-clay
- https://www.combreport.com/guides/how-to-use-texturising-spray

## Updated pages

- https://www.combreport.com/guides/best-travel-flat-irons
- https://www.combreport.com/guides/best-travel-hair-dryers
- https://www.combreport.com/guides/bobby-pins-vs-u-shaped-hair-pins
- https://www.combreport.com/guides/hair-elastics-vs-scrunchies
- https://www.combreport.com/guides/hair-styling-product-order
- https://www.combreport.com/guides/how-to-apply-hair-pomade
- https://www.combreport.com/guides/how-to-choose-a-hair-barrette
- https://www.combreport.com/guides/how-to-choose-claw-clip-size
- https://www.combreport.com/guides/how-to-choose-hair-sectioning-clips
- https://www.combreport.com/guides/how-to-choose-hair-tool-heat-mat-and-pouch
- https://www.combreport.com/guides/how-to-clean-hair-scrunchies
- https://www.combreport.com/guides/how-to-section-hair-for-styling
- https://www.combreport.com/guides/how-to-use-a-claw-clip
- https://www.combreport.com/guides/how-to-use-bobby-pins
- https://www.combreport.com/guides/how-to-use-flexi-rods
- https://www.combreport.com/guides/how-to-use-heated-hair-rollers
- https://www.combreport.com/guides/how-to-use-heatless-curling-rod
- https://www.combreport.com/guides/how-to-use-velcro-hair-rollers
- https://www.combreport.com/guides/pomade-vs-hair-clay
- https://www.combreport.com/guides/sea-salt-spray-vs-texturising-spray
- https://www.combreport.com/guides/what-hair-tools-do-i-need
- https://www.combreport.com/hair-accessories
- https://www.combreport.com/hair-care
- https://www.combreport.com/guides

## Changed files

- docs/batch-26-implementation-review.md
- frontend/content/best-travel-flat-irons.html
- frontend/content/best-travel-hair-dryers.html
- frontend/content/bobby-pins-vs-u-shaped-hair-pins.html
- frontend/content/hair-elastics-vs-scrunchies.html
- frontend/content/hair-styling-product-order.html
- frontend/content/how-to-apply-hair-clay.html
- frontend/content/how-to-apply-hair-pomade.html
- frontend/content/how-to-choose-a-hair-barrette.html
- frontend/content/how-to-choose-claw-clip-size.html
- frontend/content/how-to-choose-hair-sectioning-clips.html
- frontend/content/how-to-choose-hair-tool-heat-mat-and-pouch.html
- frontend/content/how-to-clean-hair-clips-and-pins.html
- frontend/content/how-to-clean-hair-rollers.html
- frontend/content/how-to-clean-hair-scrunchies.html
- frontend/content/how-to-pack-hair-tools-for-travel.html
- frontend/content/how-to-section-hair-for-styling.html
- frontend/content/how-to-use-a-claw-clip.html
- frontend/content/how-to-use-bobby-pins.html
- frontend/content/how-to-use-flexi-rods.html
- frontend/content/how-to-use-heated-hair-rollers.html
- frontend/content/how-to-use-heatless-curling-rod.html
- frontend/content/how-to-use-texturising-spray.html
- frontend/content/how-to-use-velcro-hair-rollers.html
- frontend/content/pomade-vs-hair-clay.html
- frontend/content/sea-salt-spray-vs-texturising-spray.html
- frontend/content/what-hair-tools-do-i-need.html
- frontend/public/diagrams/roller-care-parts.svg
- frontend/public/diagrams/travel-tool-cord-layout.svg
- frontend/scripts/check-generated-seo.ts
- frontend/src/app/article-date-rendering.spec.ts
- frontend/src/app/article-registry.ts
- frontend/src/app/article-slug.ts
- frontend/src/app/care-packing-guides.ts
- frontend/src/app/guide-evidence.ts
- frontend/src/app/guide-link-map.ts
- frontend/src/app/seo-route-policy.ts
- frontend/src/app/static-page.component.ts
- reports/seo-url-inventory.json
- scripts/guide-body-validation.test.ts
- scripts/guide-body-validation.ts
