# Comb Report Batch 16 implementation report

Checked: 19 October 2026. Status: implemented and production-built locally; not deployed. All work remains unstaged. No commit, push, deployment or AWS change was made.

## Preflight and intent ownership

The clean starting checkout contained 132 published guides. A baseline of canonical guide paths and the generated sitemap was exported before edits. All eight proposed paths were absent; title, heading and body searches found no equivalent complete task owner. The existing brush-cleaning and replacement guides cover different jobs from comb cleaning. No pre-existing-intent mapping was necessary: all eight specified destinations were retained.

The sitemap increases from 151 to 159 URLs, and the production build from 156 to 164 prerendered routes. The guide count increases from 132 to 140. All baseline sitemap URLs remain; the eight additions occur once each. No redirects, renamed routes, aliases or category expansion were introduced. Modification dates change only for the nine edited articles, the two hubs and the guide index. Existing publication dates remain unchanged.

The existing DecisionSnapshot, EvidenceScope, ChooseUseFixPathways, article template, FAQ, table and related-guide APIs were inspected and reused. Each new page renders its approved opening beneath its single H1, followed by the existing byline, Quick answer, substantive body, visible FAQs, evidence scope, linked annotated sources and related destinations in the specified order. Optional decision fields remain absent. The eight article HTML sources remain the body source of truth.

## Batch 15 source and production preflight

All four Batch 15 guides are present in source and generated output: flexi rods, snap-closure foam rollers, straightener-plate care and curling-iron/wand care. The Hair Accessories roller section and Flat Irons care integration are present in source.

Direct production requests on 19 October 2026 returned HTTP 200 at the exact canonical for all four guides, with the expected titles and self-canonicals. Both relevant hubs returned HTTP 200: Hair Accessories links to the two roller methods; Flat Irons links to both care methods. The production sitemap returned HTTP 200 and contains all four routes. The initial web-retrieval tool could not fetch the individual guides, but direct requests succeeded. No discrepancy preventing this batch's integrations was found, and no Batch 15 work was replayed.

This is a limited route, metadata, hub-link and sitemap preflight. It does not establish a complete Batch 15 production interaction, source-freshness or accessibility audit.

## Copy and source verification

All ten official sources were rechecked on 19 October 2026. The retrieved instructions support the supplied named examples; no named example was omitted or replaced, and no factual sentence required alteration after source verification. Product-specific directions remain bounded to the exact model or family. No independent capacity, timing, longevity, ranking, physical-test or universal-fit result is asserted.

The mandatory content-language checker flags ordinary nonmedical uses of “treat” and “treating” in HTML. These are the only approved-body/FAQ wording changes; all other approved wording and its order were checked against the handoff in generated HTML:

| Page                               | Original wording                                                              | Replacement                                                                    | Reason                                                           |
| ---------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Bobby-pin method, troubleshooting  | Treating discomfort as proof of a secure hold.                                | Regarding discomfort as proof of a secure hold.                                | Required lexical health-language gate.                           |
| Bobby-pin method, crossed pins     | Treat that as a placement option, not a required step for every side section. | Regard that as a placement option, not a required step for every side section. | Same gate; meaning retained.                                     |
| French-pin FAQ                     | Do not treat one-pin hold as a requirement or a guarantee.                    | Do not regard one-pin hold as a requirement or a guarantee.                    | Same gate; meaning retained.                                     |
| Scrunchie care table               | Treat only the affected area using the permitted cleaner and method           | Spot clean only the affected area using the permitted cleaner and method       | Same gate; identifies the already specified spot-cleaning route. |
| Scrunchie care, buying distinction | rather than treating cleaning as a reason to replace the whole set.           | rather than regarding cleaning as a reason to replace the whole set.           | Same gate; meaning retained.                                     |

The original Quick answer wording is preserved on all eight pages. Source-check dates are evidence provenance, not publication/update labels. No new public publication or update date UI was added.

### Official sources

The source records in `frontend/src/app/guide-evidence.ts` store title, exact named model/family, market context, URL, checking date and supported/unsupported claim boundaries. The manual and factual example words link directly to their official source; the Conair listing also appears in the annotated source list.

| Source                                                                                                                                                            | Market context            | Checked         | Supported distinction                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [Conair HS400 manual, US model](https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw33ed3d86/Instructional%20Booklets/HS400.pdf) | United States             | 19 October 2026 | Named kit’s readiness, preparation, heated clips, handling and removal. Does not establish every heated kit’s timing or overseas voltage use. |
| [Conair HS400 listing](https://www.conair.com/ceramic-flocked-hot-rollers/HS400.html?lang=en_US)                                                                  | United States             | 19 October 2026 | Exact named product identity and current listed kit. Does not establish independent outcome measurements.                                     |
| [Kitsch clips and bobby pins](https://www.mykitsch.com/collections/hair-clips-bobby-pins)                                                                         | United States             | 19 October 2026 | Pin-format distinction and conventional crimped-pin orientation. Does not establish universal hold, no-damage or no-crease claims.            |
| [Kitsch Hematite French Hair Pin](https://www.mykitsch.com/collections/hair-clips-bobby-pins/products/hematite-french-hair-pin)                                   | United States             | 19 October 2026 | Rigid pin identity and supported-updo use sequence. Does not establish universal insertion angle or one-pin capacity.                         |
| [France Luxe Small Hair Pin Pair](https://franceluxe.com/products/france-luxe-small-hair-pin-pair)                                                                | United States storefront  | 19 October 2026 | Another named construction/format example. Does not establish interchangeability with all wire U pins.                                        |
| [France Luxe Essence Volume Barrette](https://franceluxe.com/products/france-luxe-essence-volume-barrette)                                                        | United States storefront  | 19 October 2026 | Maker’s fuller-section positioning and clasp format. Does not establish measured internal clearance or guaranteed hold.                       |
| [France Luxe Long and Skinny French Barrette](https://franceluxe.com/en-gb/products/long-skinny-hair-barrette-french-classic)                                     | United Kingdom storefront | 19 October 2026 | Maker’s profile/fit positioning. Does not establish a universal fine-hair recommendation.                                                     |
| [Kitsch Blush Oversized Satin Bonnet](https://www.mykitsch.com/products/adjustable-oversized-satin-bonnet-blush)                                                  | United States             | 19 October 2026 | This bonnet’s hand-wash and hang-dry instruction. Does not establish every satin bonnet’s care or machine-wash permission.                    |
| [Slip product care](https://www.slip.com/pages/care)                                                                                                              | United States             | 19 October 2026 | Scrunchie-specific spot-cleaning direction. Does not establish carrying pillowcase instructions across to scrunchies.                         |
| [Kent product aftercare, Handmade Combs section](https://kentbrushes.com/pages/product-after-care)                                                                | United Kingdom            | 19 October 2026 | Cloth/soft-toothbrush care and drying limits for that family. Does not establish general soaking permission or a disinfection protocol.       |

## Integrations and illustrations

Hair Accessories retains its introduction, Choose / Use / Fix journey and Batch 15 roller section. The two requested fastening/use-and-care sections follow those introductions, with the exact card titles, descriptions, CTAs and order. The normal category guide lists also include each new destination once. Brushes & Combs places the comb-cleaning card directly after brush cleaning, with the requested card description; its Fix journey adds “Clean a comb’s teeth and spine” immediately after “Clean a manual brush,” retaining the three original destinations in order.

All nine specified existing articles receive their exact contextual sentences at the relevant semantic section. The heated comparison, bonnet comparison and elastic/scrunchie comparison place the requested new destination first in related guides. Every new page has its specified related destinations in order. The guide index uses existing category membership and registry ordering: heated use beside roller methods; pin comparison, barrette and the two pin methods beside fastening content; bonnet then scrunchie care; comb cleaning immediately after brush cleaning.

Three original SVGs explain pin shapes, barrette decoration versus clasp clearance, and comb support/soft brushing. They use the existing palette, responsive viewBoxes, accessible titles/descriptions and the exact supplied alt text/captions. Pin panels stack vertically. No dimensions, insertion angle or French-pin insertion diagram were invented. A narrowly allowed figure class preserves readable diagram spacing through sanitization. A narrowly allowed table class gives only the new tables horizontal scrolling at small widths; their hint, focusability and existing visible focus outline support keyboard use.

The existing consent-gated `guide_task_link_click` event handles related/contextual links with fixed task-group values. No new event names, personal answers, privacy-policy changes or account flows were added. The existing consent service still controls analytics.

## Validation

- Full `npm run verify` passed: formatting, lint, workspace type checks and tests, content safety, editorial checks, production build, generated SEO and internal-link checks. Frontend: 18 test files and 72 tests pass. The build emits 164 static routes and 140 public guides; the internal-link check validates 4,134 links.
- All 17 new/edited HTML files pass the source-level publication validator directly against working-tree files, without staging. The scrunchie body retains the complete approved copy and its specific spot-cleaning revision; no generic word-count filler was added. Advisory legacy metadata and under-800-word warnings remain non-blocking.
- A handoff-driven acceptance check compares all eight exact titles, descriptions, H1s, canonicals, Quick answers and complete approved body/FAQ text in initial HTML, allowing only the five documented lexical revisions and added figure/table instructions. It passes. JavaScript is not executed for this check.
- The generated SEO checker now validates task-specific step counts, FAQ/evidence/source/related order, nearby source links, hub/index membership, curated related order, all nine contextual integrations and the three accessible schematics. Existing checks validate canonical metadata, one H1, structured breadcrumbs, Article data, sitemap uniqueness and no unwanted noindex. The new pages introduce no FAQPage, HowTo, Product, Review or rating schema.
- Baseline comparison confirms exactly eight sitemap additions and zero removals. Initial HTML contains all substantive copy, semantic tables and ordinary canonical links; no content is hidden behind tabs or accordions.

- Browser layout and heading/table checks covered both hubs and all eight new pages at 320, 390, 768 and 1440 pixels (40 combinations). No page-wide overflow or extra H1 was found. Article text stays within the existing 46rem column. Each table retains scoped headers and tabindex; mobile tables intentionally scroll within their own box.
- Screenshots of article body regions and hub cards were reviewed at all four widths. All three schematics were also visually reviewed at every width; their labels and captions remain readable at 320px. The comb drawing puts the supporting fingers behind the spine, with a soft brush at the tooth gaps.
- Keyboard ArrowRight scrolls the focused pin-comparison table, whose focus outline is solid and visible. Hub-card navigation opened the pin comparison, and its contextual bobby-pin link opened the complete method. All eight new guides retained their expected H1 and route after direct browser load and refresh.
- No-JavaScript evidence comes from parsing the complete initial HTML without executing JavaScript; a separate browser JavaScript-disable setting and a spoken screen-reader run were not used. The browser accessibility tree exposes headings, lists, tables, captions and named images.

No unresolved build, content-gate, route, source-verification or layout failures remain. Physical product testing was not performed or claimed.

## Release and AWS cost boundary

This batch is local and built, not released or verified live. The production URLs below are intended release destinations. No infrastructure, cache policy, logging, security or traffic-routing configuration changed, and no AWS calls or invalidations were issued. The implementation adds no recurring AWS resource. A later ordinary static release will upload additional HTML/SVG bytes and can incur normal S3 storage/request, CloudFront request/data-transfer and any existing release-process invalidation charges; this task does not authorize deployment or cost-affecting infrastructure changes.

## Added pages

- https://www.combreport.com/guides/how-to-use-heated-hair-rollers
- https://www.combreport.com/guides/bobby-pins-vs-u-shaped-hair-pins
- https://www.combreport.com/guides/how-to-use-bobby-pins
- https://www.combreport.com/guides/how-to-use-a-french-hair-pin
- https://www.combreport.com/guides/how-to-choose-a-hair-barrette
- https://www.combreport.com/guides/how-to-wash-a-satin-bonnet
- https://www.combreport.com/guides/how-to-clean-hair-scrunchies
- https://www.combreport.com/guides/how-to-clean-a-hair-comb

## Updated pages

- https://www.combreport.com/hair-accessories
- https://www.combreport.com/brushes-combs
- https://www.combreport.com/guides
- https://www.combreport.com/guides/heated-rollers-vs-self-grip-rollers
- https://www.combreport.com/guides/hair-roller-size-guide
- https://www.combreport.com/guides/how-to-choose-hair-sectioning-clips
- https://www.combreport.com/guides/how-to-choose-claw-clip-size
- https://www.combreport.com/guides/satin-bonnet-vs-satin-pillowcase
- https://www.combreport.com/guides/hair-elastics-vs-scrunchies
- https://www.combreport.com/guides/how-to-clean-a-hair-brush
- https://www.combreport.com/guides/when-to-replace-hairbrush-or-comb
- https://www.combreport.com/guides/tail-comb-vs-wide-tooth-comb

## Changed files

- `frontend/content/bobby-pins-vs-u-shaped-hair-pins.html`
- `frontend/content/how-to-choose-a-hair-barrette.html`
- `frontend/content/how-to-clean-a-hair-comb.html`
- `frontend/content/how-to-clean-hair-scrunchies.html`
- `frontend/content/how-to-use-a-french-hair-pin.html`
- `frontend/content/how-to-use-bobby-pins.html`
- `frontend/content/how-to-use-heated-hair-rollers.html`
- `frontend/content/how-to-wash-a-satin-bonnet.html`
- `frontend/public/diagrams/barrette-clasp-fit.svg`
- `frontend/public/diagrams/comb-teeth-cleaning.svg`
- `frontend/public/diagrams/pin-fastening-shapes.svg`
- `frontend/content/hair-elastics-vs-scrunchies.html`
- `frontend/content/hair-roller-size-guide.html`
- `frontend/content/heated-rollers-vs-self-grip-rollers.html`
- `frontend/content/how-to-choose-claw-clip-size.html`
- `frontend/content/how-to-choose-hair-sectioning-clips.html`
- `frontend/content/how-to-clean-a-hair-brush.html`
- `frontend/content/satin-bonnet-vs-satin-pillowcase.html`
- `frontend/content/tail-comb-vs-wide-tooth-comb.html`
- `frontend/content/when-to-replace-hairbrush-or-comb.html`
- `frontend/scripts/check-generated-seo.ts`
- `frontend/scripts/generate-content.ts`
- `frontend/scripts/generate-seo.ts`
- `frontend/src/app/article-decision-integration.spec.ts`
- `frontend/src/app/article-page.component.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/category-pathways.ts`
- `frontend/src/app/decision-support.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/static-page.component.ts`
- `frontend/src/styles.css`
- `COMBREPORT_BATCH_16_IMPLEMENTATION_REPORT.md`
