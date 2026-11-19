# SEO growth guide implementation review — 19 November 2026

Implements `COMBREPORT_SEO_GROWTH_RESEARCH_AND_IMPLEMENTATION_GUIDE_2026-11-19.md`: the shared card-title fix, twelve existing-owner updates, three new owners, two interactive additions, hub and contextual links. Nothing was deployed, staged or committed.

## Reconciliation

The registry, content directory, `docs/seo/content-opportunities.csv` and the 18 November handover were checked. There was no draft, disabled entry or existing owner for any of the three proposed URLs. The curly-hair owner is the plural `/guides/best-brushes-curly-hair` (the singular slug is asserted unpublished in `content.spec.ts`); no slug, redirect or canonical changed.

| Item                          | Status      | Notes                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Discovery cards            | Implemented | Root cause: 11 card records (5 airflow, 6 steam/wet-to-dry straightener) stored `` `/guides/...` `` as the title. Fixed at the shared lookup (`guide-card-copy.ts`, used by `/guides`, category hubs, home and direct-heat hubs) and corrected in source. Unresolved titles or descriptions (paths, empty, `undefined`, object dumps, bare category labels) fall back to the article heading/description. |
| U01 Wattage                   | Implemented | Running-cost calculator component, static worked example, watts vs kWh, 1,600 vs 2,000 W, consolidated power/performance text, new metadata and H1.                                                                                                                                                                                                                                                       |
| U02 Chooser                   | Implemented | Finder result now returns three features, one or two named comparisons with market/generation, and a next check. Matching static table in the article. No indexable result URLs.                                                                                                                                                                                                                          |
| U03 Short hair                | Implemented | Named-model table, "already own a dryer" route, duplicate "Who this guide is for" removed.                                                                                                                                                                                                                                                                                                                |
| U04 Travel                    | Implemented | Incorrect "always select a setting" and "usually less powerful" FAQs replaced; automatic vs manual mechanism; Flight+ row and HD19 vs Flight+ path; packing filler removed.                                                                                                                                                                                                                               |
| U05 Diffuser fit              | Implemented | Fit / features / box-inclusion table, new SVG (diameter, collar depth, clearance), printable fit-check record with confirmed fit / confirmed exclusion / not established.                                                                                                                                                                                                                                 |
| U06 Fine-hair brush           | Implemented | Three task rows: Tangle Teezer Fine & Fragile (keep from heat), Mason Pearson SB3, Olivia Garden CI-35. Repeated "optional brush" text consolidated.                                                                                                                                                                                                                                                      |
| U07 Curly brush               | Implemented | Table now separates detangling, wet definition (Denman, Bounce Curl), dry brush-out and blow-dry; links to D3/D38 and N02. H1 unchanged (test-pinned).                                                                                                                                                                                                                                                    |
| U08 Hot-air fine hair         | Implemented | US 76656/76657 table; 2.5-inch scope marked unconfirmed; starting state deferred to the exact manual; thermal-brush alternative.                                                                                                                                                                                                                                                                          |
| U09 Hot-air vs iron           | Implemented | Learning-curve/control rankings removed; BaByliss 2136U (UK, ~80% dry per its manual) and T3 Curl X (US) examples; powered-head link now goes to the hot-air size guide.                                                                                                                                                                                                                                  |
| U10 Round brush               | Implemented | Measuring record, two worked label comparisons, new SVG with both diameters and working length. No printable life-size circle.                                                                                                                                                                                                                                                                            |
| U11 Cleaning                  | Implemented | One primary care table; Denman D3 steps now cite the UK source; trapped hair, residue and drying answers.                                                                                                                                                                                                                                                                                                 |
| U12 Airwrap i.d. vs Co-anda2x | Implemented | Co-anda2x box variation (AirSmooth2x vs Air Straightener 2x), maker-percentage caveat, keep-or-change section, link to N01.                                                                                                                                                                                                                                                                               |
| N01 Airwrap compatibility     | Implemented | New owner with static matrix, identification route and a lookup component sharing one dataset; a spec checks the HTML matrix matches the lookup.                                                                                                                                                                                                                                                          |
| N02 Bounce Curl               | Implemented | New owner with conceptual SVG; maker tension chart followed over stockist claims.                                                                                                                                                                                                                                                                                                                         |
| N03 Mason Pearson             | Implemented | New owner: size table (maker cm, converted mm), six-model table, three worked choices.                                                                                                                                                                                                                                                                                                                    |

## Evidence limits

- Dyson UK pages refused automated retrieval in this session (HTTP 403). Dyson statements rely on the brief's 19 November check plus the repository's existing 31 October Dyson records; they remain family-level.
- The Bounce Curl comparison chart (P06) and the Mason Pearson, Denman UK pages were re-opened and match the brief. The Bounce Curl product pages (P04/P05) and Tangle Teezer returned HTTP 429; product-page wording uses the brief's check and existing repository records, worded conservatively. The handle row states, for both brushes, that the handle doubles as a parting tool and heatless curler, per the manufacturer.
- Mason Pearson military head lengths (published as 0.00) are omitted. Handle/wooden variants were not checked.
- No GSC, analytics or browser access. Baseline, deployment date and indexing remain unrecorded; this is not a ranking claim.

## Validation

- `npm run verify` passed: formatting, lint, types, 114 frontend tests (29 files, including 15 new tests for card copy, cost arithmetic, Airwrap matrix/lookup parity and finder results), API, infrastructure and repository tests, content safety (250 files), editorial targets, production build, generated SEO (248 guides) and internal links (272 pages, 8,054 links).
- Content safety flagged ordinary uses of "treat", "treating" and "prescription"; each was reworded.
- Built output: no `` `/guides/ ``, `undefined` or object-dump card titles; three new URLs in the sitemap (271 entries), self-canonical, `index, follow`; calculator and lookup render in prerendered HTML with the worked example.
- `npm run seo:audit`: 0 broken internal links, no missing sitemap or registry documents. `npm run seo:smoke-release -- --artifact-only`: verified, 127 owners, 0 failures.
- New diagrams added to the generated-SEO schematic check. `git diff --check` passed. No dependency changed.
- Not verified: visual layout at 375 px, keyboard focus order and table scrolling in a browser.

## AWS cost assessment

No infrastructure, caching, logging, WAF or routing change. A future content release adds a few KB of HTML/SVG to existing S3/CloudFront usage; the release smoke reads 15 more owner URLs per production run. No new recurring resource or invalidation.

## Added pages

- https://www.combreport.com/guides/dyson-airwrap-attachment-compatibility
- https://www.combreport.com/guides/bounce-curl-define-vs-volume-edgelift
- https://www.combreport.com/guides/mason-pearson-brush-size-and-bristle-guide

## Updated pages

- https://www.combreport.com/guides/hair-dryer-wattage-guide
- https://www.combreport.com/guides/how-to-choose-hair-dryer
- https://www.combreport.com/guides/best-hair-dryer-for-short-hair
- https://www.combreport.com/guides/best-travel-hair-dryers
- https://www.combreport.com/guides/hair-dryer-diffuser-compatibility
- https://www.combreport.com/guides/best-brushes-fine-hair
- https://www.combreport.com/guides/best-brushes-curly-hair
- https://www.combreport.com/guides/best-hot-air-brushes-fine-hair
- https://www.combreport.com/guides/hot-air-brush-vs-curling-iron
- https://www.combreport.com/guides/round-brush-size-guide
- https://www.combreport.com/guides/how-to-clean-a-hair-brush
- https://www.combreport.com/guides/dyson-airwrap-id-vs-co-anda2x
- Contextual link only: https://www.combreport.com/guides/boar-bristle-brush-guide, https://www.combreport.com/guides/boar-bristle-vs-nylon-brush, https://www.combreport.com/guides/travel-hair-brush-formats, https://www.combreport.com/guides/curl-defining-brush-vs-detangling-brush, https://www.combreport.com/guides/how-to-choose-multi-styler-attachments, https://www.combreport.com/guides/dyson-airwrap-vs-shark-flexstyle
- Hubs: https://www.combreport.com/guides, https://www.combreport.com/hair-dryers, https://www.combreport.com/hot-air-brushes, https://www.combreport.com/brushes-combs, https://www.combreport.com/tools
