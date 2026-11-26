# CombReport keyword research and URL decisions

The 26 November model-decision batch (`seo-model-decision-guides.ts`) publishes ten new guides (N10, N12–N20), the Hair Tool Manual Finder (T02, `/hair-tool-manual-finder`) and the Multi-Styler Kit Comparison (T01, `/products#compare-multi-styler-kits`). Every cited source was read on 26 November 2026, including the Dyson HD07, HD16 and Airwrap i.d. (UK N308F and US) manual PDFs. Ten briefs are held as disabled drafts because their deciding records refused automated reads that day: dyson.co.uk/dyson.com product and support pages (N01, N02, N04), ghdhair.com (N07, N08, N09, N11), revlonhairtools.com (N05, N06) and the HD652SUK listing (N03, N04; Shark UK search returns only HD652SUK-labelled parts, whose compatibility text names HD652SEU but not HD652SUK). Each draft's HTML comment lists the records to verify. Brief corrections: N20 uses three Remington UK listings (D3010, D5216 with diffuser, D1500 compact) because the Argos BaByliss listings were unreadable; the N16 colour mapping follows the i.d. manual's LED key rather than the unreadable support page; T01's "existing US" T3 record was UK, so T01 uses the US Aire 360 Dual Voltage listing (602192-UL-10). Edits applied: E03 (diffuser link; HD432PKUK still shows 120 V), E04 (T01 link), E07–E12; E01, E02, E05, E06 and the /flat-irons hub links wait for the held drafts. Technical: workflow text was removed from public source records (unverified brief records now render without a checked date), and the generator no longer gives guides first published after 2 October 2026 a 2 October `updatedDate`, so the round-brush, rotating-brush and waver guides now report 2026-11-25. The sitemap has 327 URLs (316 + 10 guides + T02). Guide evidence now loads with each article body (`generate-content.ts` writes it into `article-bodies.generated/`), and evidence/source records are wrapped in `/* @__PURE__ */` factories so unused ones are tree-shaken. Startup JS fell from 237.9 KB (pre-batch) to 229.3 KB with this batch included (limit 240 KB). Implemented locally, not deployed.

Audit release (26 November 2026): an editor read the blocked Dyson UK, ghd UK, Revlon US and Hot Tools US pages in a browser that day (official product page audit). Six held drafts are now published from those records with supplied copy: N01/N02 `dyson-airwrap-vs-supersonic`, `dyson-airwrap-id-vs-complete-long`, `hot-tools-one-step-vs-revlon-one-step-plus` (neither page states a model number or how its head size is measured; the copy says so), `ghd-gold-vs-chronos`, `ghd-mini-vs-original` and `how-to-choose-a-ghd-straightener`. Where ghd's listings, comparison page and Chronos Max FAQ give different widths, every figure is shown with its page. Each guide has two incoming links from existing guides plus a hub entry (/hot-air-brushes or /flat-irons). The Airwrap i.d. support source now quotes Dyson's white and red flashing-light text. Still held: both FlexFusion drafts (no HD652SUK listing, box list or powered-head confirmation), `shark-flexstyle-vs-revlon-one-step-plus` (no Revlon model number, no copy yet) and `shark-speedstyle-pro-flex-vs-ghd-helios` (the Helios listing is now recorded, but no copy yet). The supplied BaByliss 5335KSU vs 5395KSU draft was not used; the Remington budget guide stays. The sitemap has 333 URLs. Not deployed.

The 25 November release completion publishes the 23 held guides (N01, N02, N05–N07, N10, N12, N13, N16–N18, N20, N21 from 24 November; P01, P05–P09, P14, P16, P17, P21 from 23 November). It uses the editorial brief's titles, descriptions, H1s and body copy. The brief's expanded sections bring every body to 579–636 words. The two FAQs per guide that the required FAQ block needs are not in the brief. Comb Report wrote them, and they restate fields already on the page. Two copy corrections come from that day's rechecks: the HD6051SUK box names the "Silki Straightening Tool", and the HD430 listing describes rotating the body rather than a "pivoting handle" or "pivot". Four "treat"/"treating" phrasings were reworded for the content-safety check. The source records in `seo-release-completion-guides.ts` give each recheck result. Only the SharkNinja UK HD6051SUK, SharkNinja US HD430 and XSKHD3WTCA, and Remington AS8811 pages were read. The Conair SD11GNX and SD6RN sources moved to current official URLs. Other maker sites returned 403, 429, 404, timeouts or unreadable PDFs. The Dyson US and ghd UK retailer buttons stayed `unverified` at release (HTTP 403 again).

Post-deployment fixes (25 November 2026): the deployment check loaded the exact Dyson US Airwrap i.d. Straight+Wavy Plum/Copper listing and both ghd UK black 26 mm listings (Chronos, Platinum+) with HTTP 200 and an in-stock offer, so all three offers are now `verified`. Automated rechecks from the build environment still get HTTP 403 from dyson.com and ghdhair.com, so no offer was withheld on availability grounds, but the verification rests on that deployment check. The Dyson button renders before SharkNinja US on `/guides/dyson-airwrap-vs-shark-flexstyle`. The ghd block, headed "Check the UK black models at ghd", sits between "Decide from controls and ownership details" and "Exact manufacturer sources" on `/guides/ghd-chronos-vs-platinum-plus`. The HD430 record now displays "Shark FlexStyle HD430 in Stone (US)", and the evidence-scope list no longer repeats a model code that the name already contains. The Conair HS400 booklet is now cited on `/guides/best-hot-rollers`: the PDF text reads "MODEL HS400" and lists 20 rollers (eight 1¼-inch, six 1-inch, six ¾-inch) and 20 heated clips. The earlier HS33RX reading came from stale embedded metadata, not the booklet content.

The 24 November shortlist batch (rows `cr-2026-11-24-*`) publishes nine new guides (N03, N04, N08, N09, N11, N14, N15, N19, N22) from sources read that day or dated records of the same exact models, and holds the other 13 as disabled drafts because Dyson, ghd, Revlon, Drybar and Newegg returned 403, BaByliss looped on redirects, and T3, Denman, Tangle Teezer, amika, Mermade and Olivia Garden returned 429. Brief corrections: Corrale CoolShine is corded (excluded from N14) and the Remington AS8811 listing does not describe a rotating head (N17 needs another model). The ten 23 November held drafts were re-checked and remain held. Implemented locally, not deployed.

The 23 November search growth batch (rows `cr-2026-11-23-*`) implements E01–E09, E12 and E13, publishes 11 new guides and holds 10 as disabled drafts whose primary maker listings could not be verified (Dyson, ghd, Drybar and Best Buy returned 403 or timeouts, Conair 404, Wet Brush and Cloud Nine 429). E10 and E11 wait on the held N01. The batch is implemented locally and not deployed; rows stay PLANNED/NEW or RESEARCH until a post-deploy check.

The [22 November mega-batch review](mega-batch-2026-11-22-implementation-review.md) records the latest work: U01–U04 refreshed, two new guides (static after brushing; Tangle Teezer Original vs Ultimate Detangler), partial R03/R04 additions and a live reconciliation of the 96 older local rows. The batch is deployed and verified live. The CSV now has 316 DONE, four RESEARCH and four DECLINED records.

The [18 November exact-model implementation](#18-november-exact-model-implementation) records the original nine-guide batch. The completion review above adds the remaining supported existing-owner answers and identifies the four manufacturer holds.

The [consolidated 17 November handoff](#consolidated-17-november-implementation) records the preceding implementation and release baseline. Earlier zero-new-URL and pending-pilot findings describe their dated snapshots.

Use [content-opportunities.csv](content-opportunities.csv) to decide which reader task belongs on which URL. The research work package ends when the evidence, decision and next review are recorded. Page writing, rewrites, redirects and releases are separate work.

Follow the [editorial rules](../../AGENTS.md), the [guide publishing workflow](../../README.md#publishing-a-guide), and the [technical SEO runbook](../README.md#route-discovery-and-sitemap-checks). Give each page a distinct cosmetic grooming or styling task and a piece of information that changes the reader's decision. Apply the [durable editorial integration rules](../../COMBREPORT_SEO_IMPLEMENTATION_REPORT.md#durable-editorial-integration-rules). Use specifications and instructions within their exact scope. Require appropriate firsthand evidence for tested performance or ranked recommendations. [Google's people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) explain the risks of expanding at scale without adding original value.

## Research workflow

1. **Establish the URL inventory.** Reconcile [article sources](../../frontend/content/), [canonical slugs](../../frontend/src/app/article-slug.ts), [publication records](../../frontend/src/app/article-registry.ts), [route policy](../../frontend/src/app/seo-route-policy.ts) and [retired duplicate routes](../../scripts/removed-duplicate-routes.ts). Run `npm run seo:audit` against a current build and compare the generated sitemap with the [live sitemap](https://www.combreport.com/sitemap.xml). Inspect guides, drafts, scheduled pages, category hubs, tools and Product Explorer comparisons. Record each relevant title, canonical, task, market, exact products or models, and covered questions from the body. A sitemap establishes URL coverage. Read the answer before deciding that the owner covers the query.
2. **Collect query evidence.** Start with the 120 handover seeds and the existing CSV variants. Use Search Console's latest 90 complete days by query, landing page, country and, where useful, device. Keep a 28-day comparison window. Record every export's property, filters, search type and dates. Expand from official manuals and part catalogues, observed owner questions, autocomplete and related searches. Preserve estimates and ranges as reported. Treat Keyword Planner paid competition and Trends relative interest as distinct from organic difficulty or absolute demand. An absent query may be anonymised or fall outside the returned rows. Keep missing metrics blank. A property-level query row and a page total cannot be joined into a page-by-query result. [Search Console data limits](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive), [Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).
3. **Review actual search results.** Use manual searches or an authorised provider. Review the primary query and one or two variants in US and GB when both matter. Record date, market, device and up to ten organic result URLs per query where available. Keep ads, shopping, video and other features distinct. Describe which answer a reader could rely on, where it stops, and what CombReport would add. Mark generic results preliminary when you cannot control market or device. Record the query alongside each variant's results in notes. [Google's policy on automated search traffic](https://developers.google.com/search/docs/essentials/spam-policies#machine-generated-traffic).
4. **Cluster by reader task and check overlap twice.** Compare product or tool, task and answer format. Group reverse wording, spelling and equivalent model names when one answer supports the same decision. Four shared top-ten organic URLs is a manual review flag. Compare the proposed task against existing and scheduled page bodies, tools, hubs, internal links, market-specific page-by-query results and other candidates. Repeated landing-page switching or two pages giving the same answer warrants review. A related impression alone is weak evidence. Use `REVIEW_OVERLAP` for unresolved ownership and record the nearest current and proposed neighbours. Use one URL across US and GB when the answer travels. Consider splitting only when the documented product or task differs materially and the results support the split. [Google's canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/canonicalization).
5. **Validate products in scope.** Record the exact model, accessory code, direction of fit, market, source and source-check date. Keep physical fit, enabled features and supplied box items in separate fields in the planned answer. Check exact manuals for operating, voltage and care guidance. Record contradictions and unsupported facts as unknown. Where geometry changes the decision, compare the same measured surface and preserve maker nominal labels.
6. **Decide and verify.** A `PLANNED / NEW` row needs a distinct task, dated results review, credible demand signal, sources for the planned answer, concrete contribution, working title, canonical proposal, closest-neighbour checks and at least one live contextual link source. Reject collisions with published, draft, scheduled, retired and queued routes. Shoot for 100–300 validated new opportunities only if the evidence supports them. Keep open research in the queue with the precise missing evidence. Report distinct proposed URLs separately from query variants.

Prioritise attachment fit and replacement parts, exact generation upgrades, regional box contents, working dimensions and handling, then model-specific upkeep and troubleshooting. A useful deliverable is an exact-part migration matrix, documented kit table, measured diagram or short diagnostic sequence. Treat broad “best” terms as discovery input for the incumbent hubs and finders.

## CSV conventions and scoring

Use one row per existing owner or distinct proposed task. Keep stable IDs, UTF-8, standard CSV quoting, ISO dates and `|` between list values. `market` is the intended research market. `serp_market` and `serp_device` describe the review actually performed. Use `existing_url` for the owner of KEEP, OBSERVE, REFRESH and EXPAND. Use `proposed_url` only for NEW and put provisional slugs in notes. Keep sitewide query, URL aggregate and page-filtered observations explicitly labelled in `demand_source` and `demand_value`. In this baseline, `gsc_*` holds URL-level aggregates from Pages.csv. Use source URLs for evidence and record missing facts and concrete next checks in `evidence_needed`.

Status values are DONE for a published owner that serves the task, PLANNED for a validated new URL, RESEARCH for open ownership or validation, DRAFT for an unpublished owner, and DECLINED for a discarded idea. Actions are KEEP, OBSERVE, REFRESH, EXPAND, NEW, REVIEW_OVERLAP and DROP. A published owner can be DONE while an addition or refresh remains scoped in its action.

| Factor                       | Weight | High score                                                                         |
| ---------------------------- | -----: | ---------------------------------------------------------------------------------- |
| Niche fit                    |     25 | Specific hair-tool or cosmetic styling decision                                    |
| Distinct answer and evidence |     25 | Documented part matrix, measurement, comparison or diagnostic                      |
| Organic opportunity          |     20 | Results miss the precise model, market or answer                                   |
| Demand                       |     20 | Relevant first-party data, credible local estimates or repeated specific questions |
| Reader journey               |     10 | Relevant incoming link and an actionable next step                                 |

Score from 0 to 5 per factor. Multiply by 5, 5, 4, 4 and 2 respectively and sum. P1 is 75–100, P2 is 60–74 and P3 is below 60. Add a one-sentence rationale. Leave unscored factors, total and priority blank when evidence is unknown. The research order below uses the sum of available factors as a lower bound. Revisit ties using evidence quality and reader specificity. Scores support queue ordering. They cannot clear a product-evidence or ownership hold.

## Pass 1 baseline and decisions on 2026-11-16

- The built-route audit found **246** registered and generated documents. **245** were indexable and in the sitemap, and `/404` was outside it. The 245 consisted of 222 published guides and 23 other indexable pages. The local and live sitemaps each contained 245 unique URLs, with zero duplicates, zero local-only URLs and zero live-only URLs. The audit found zero broken internal links and ten existing guide owners without contextual incoming links.
- The content directory has 223 article sources excluding the template. The remaining source is the disabled `best-round-brush-for-blow-drying` draft. Six retired paths are registered in the retired-route list and absent from both sitemaps. The built audit identifies 12 Product Explorer comparisons pointing to canonical guide owners. The dryer finder and label decoder are embedded in [the dryer chooser](https://www.combreport.com/guides/how-to-choose-hair-dryer) and [the dryer specs guide](https://www.combreport.com/guides/hair-dryer-wattage-guide).
- Search Console export, Web text, 2026-10-17 through 2026-11-13. Chart totals were **79 clicks and 15,369 impressions**, with 232 page rows and 1,000 query rows. US had 20 clicks and 5,407 impressions. GB had 8 clicks and 2,005 impressions. The report tabs are separate aggregates. The row for `hair dryer specs` in the page-filtered screenshot gives 475 impressions and zero clicks on the wattage guide. Its country and device filters are unavailable. The 2026-11-07 through 2026-11-13 screenshot is a separate property-wide observation of 38 clicks and about 5.3K impressions. The indexing screenshot reports 245 indexed and 11 excluded across all known pages. Its count supplies no URL-level match to the 245 current sitemap URLs.
- The 28-day Pages export includes eight raw URL strings outside the current sitemap. Two are root URL forms (`https://combreport.com/` and `https://www.combreport.com/`), five are known retired paths (the curly/thick brush duplicates and three old `/products/` comparisons), and one is `/guides/how-to-choose-a-hair-brush`, outside the current registry and sitemap. The export has no exact URL row for 21 current sitemap entries. Export presence is historical search evidence.
- All 120 handover seeds were triaged into the CSV, with 140 primary and related query entries including added variants and broad exclusions. The route-level audit covers the full site. CSV body decisions focus on the research topics rather than giving every unrelated public route a keyword assignment.
- The 24 dated public-result samples are preliminary. Six extra variant searches were sampled across the Shark, Parlux and Dyson lead rows. Neither market nor device was controlled. A 90-day page-by-query-by-country export, a controlled regional top-ten review, Keyword Planner, Trends and backlinks were unavailable this round. Manufacturer documentation establishes the scope of product questions. Candidate demand and exact product approval require their own evidence.

### Worked decisions

- **Dryer specs, wattage and voltage** stay on the wattage guide. Observe the revised answer and decoder before deciding on a refresh. The Page export reports 4 clicks and 1,234 impressions. The page-filtered screenshot supplies the query-specific baseline.
- **Dyson Airsmooth vs ghd Duet Blowdry** keeps both word orders on the existing comparison. It covers standalone tools and starting state. The separate AirSmooth2x attachment identity question remains open.
- **Older Airwrap attachment fit on Co-anda2x** stays on the existing generation comparison. It directly addresses the interface boundary. The Airwrap CSV row's expansion is for named box contents only.
- **Shark Glam powered attachments on FlexStyle** stays on the existing comparison. It separates compatibility and inclusion. IonCurl migration and replacement diffuser research overlap and need a single part-ID review before reserving a URL. [Shark's GB comparison](https://www.sharkninja.co.uk/blog/ioncurl-vs-flexstyle.html).
- **Parlux fit and Nural attachment learning** remain open. Parlux's regional and language listings differ in which bodies they name for direct fit. Dyson already describes the difference between physical fit and attachment learning, and the general CombReport guide cites that distinction. A new answer needs exact evidence beyond those answers. [Parlux English listing](https://www.parlux.it/en/products/magicsense-diffuser), [Parlux Italian listing](https://www.parlux.it/products/diffusore-magicsense), [Dyson Nural specifications and FAQ](https://www.dyson.com/hair-care/hair-dryers/supersonic-nural).
- **Thick- and curly-hair brush overlap** was flagged for historical ownership review. Both duplicate paths were classified as retired in the source registry. Pass 2 verified their live response below. [SEO decision queue](../../SEO_CONTENT_DECISIONS_REQUIRED.md#content-decisions).

### Backlog counts

**80 rows.** 63 DONE owners, two additional live brush owners in overlap review, one DRAFT, eleven unresolved task hypotheses without an existing assigned owner, and three declined ideas. Zero validated distinct NEW URLs. Some hypotheses may resolve as one existing or proposed owner.

| Cluster                           | KEEP | OBSERVE | REFRESH | EXPAND | REVIEW_OVERLAP | DROP | NEW |
| --------------------------------- | ---: | ------: | ------: | -----: | -------------: | ---: | --: |
| Buying constraints and travel     |    4 |       0 |       0 |      2 |              0 |    1 |   0 |
| Clips, pins and mechanical fit    |    6 |       0 |       0 |      2 |              0 |    0 |   0 |
| Diffuser fit                      |    1 |       0 |       0 |      1 |              2 |    0 |   0 |
| Dryer specs and controls          |    0 |       1 |       0 |      2 |              0 |    0 |   0 |
| Dyson generations                 |    0 |       0 |       0 |      3 |              2 |    0 |   0 |
| Flat irons and styling controls   |    7 |       0 |       0 |      1 |              1 |    1 |   0 |
| Hot-air brushes and heads         |    7 |       0 |       1 |      2 |              0 |    0 |   0 |
| Nozzles and finishing attachments |    2 |       0 |       0 |      2 |              0 |    0 |   0 |
| Rollers, rods and set planning    |    3 |       0 |       0 |      2 |              1 |    0 |   0 |
| Round brushes and detangling      |    3 |       0 |       0 |      2 |              3 |    1 |   0 |
| Shark generations                 |    1 |       0 |       0 |      0 |              4 |    0 |   0 |
| Troubleshooting and care          |    6 |       0 |       0 |      2 |              1 |    0 |   0 |
| Total                             |   40 |       1 |       1 |     21 |             14 |    3 |   0 |

### Leading 20 research and expansion opportunities

Numbers in parentheses are research-order floors where a factor is unknown. An actual priority requires all five scores. Every candidate still follows its CSV action and evidence requirements.

1. **Olivia Garden CI-35 vs NT-34** (`cr-olivia-garden-ceramic-ion-vs-nanothermic`, 80) — Add a measured same-surface comparison or retain the existing in-person sizing check where dimensions are unknown.
2. **Denman D3 vs D4** (`cr-denman-d3-vs-d4`, 73) — Same-surface comparison of measured head and bristle width with exact variants attached.
3. **Shark original FlexStyle vs IonCurl** (`cr-shark-flexstyle-vs-ioncurl`, 72) — A two-direction migration table by body and part code, with fit, enabled functions and included accessories in separate columns.
4. **Parlux diffuser fit** (`cr-parlux-diffuser-compatibility`, 72) — Matrix for MagicSense, dedicated ALYON and other diffuser variants with direct fit, ring, exclusions and box evidence.
5. **Sectioning-clip jaw opening** (`cr-how-to-choose-hair-sectioning-clips`, 72) — Add a measured jaw opening and closing-contact comparison for named duckbill and hinged clips.
6. **Travel dryer with diffuser** (`cr-best-travel-hair-dryers`, 72) — Add an exact SKU table with voltage range, selector and maker-approved diffuser, with inclusion in a separate field.
7. **ghd Halo nozzle fit** (`cr-ghd-speed-vs-helios`, 71) — Add a short approved-model and replacement-part lookup to the existing Speed comparison.
8. **Heated roller replacement clips** (`cr-heated-roller-kit-replacement-clips`, 70) — Map kit ID and cylinder sizes to approved clip types and replacement part IDs.
9. **Co-anda2x box contents** (`cr-dyson-airwrap-id-vs-co-anda2x`, 67) — Exact US Straight+Wavy versus Curly+Coily box table aligned to each part's job, with GB evidence separated.
10. **AirSmooth2x vs Airsmooth** (`cr-dyson-airsmooth2x-vs-airsmooth`, 67) — Show which body each tool needs and compare manufacturer-approved starting state and styling stage.
11. **FlexFusion attachment fit** (`cr-shark-flexfusion-attachment-fit`, 65) — Matrix scoped to maker-listed body series and exact powered or airflow attachment codes.
12. **IonCurl replacement diffuser** (`cr-shark-ioncurl-diffuser-replacement`, 65) — Map approved diffuser part numbers and packs to exact IonCurl body and region.
13. **Revlon One-Step PLUS heads** (`cr-revlon-one-step-volumizer-vs-plus`, 65) — Extend the existing US replacement section with exact GB RVDR5298UK scope and approved part codes if documented.
14. **SteamPod replacement combs** (`cr-steampod-replacement-comb-fit`, 65) — Part-by-model and comb-variant lookup with removal directions attached to the maker manual.
15. **FlexStyle filter cleaning** (`cr-shark-flexstyle-filter-cleaning-by-model`, 65) — Record maker-supported filter part labels and care links per body; add a short routing table where appropriate.
16. **Supersonic attachments on Nural** (`cr-dyson-supersonic-nural-attachment-fit`, 63) — Add part-by-part fit and learning columns only where sources identify exact parts.
17. **Nural vs Supersonic r bundles** (`cr-dyson-supersonic-nural-vs-supersonic-r`, 61) — Extend the exact UK bundle comparison with a separately sourced US example only when it changes the decision.
18. **ghd Air and Helios diffuser** (`cr-ghd-air-vs-helios`, 60) — Add exact maker-confirmed Air and Helios fit and check Speed as a separate pairing.
19. **Parlux HFS cleaning** (`cr-parlux-alyon-vs-digitalyon`, 59) — Add a model-specific HFS versus filter cross-reference with an exact-manual link.
20. **Corrale vs CoolShine** (`cr-dyson-corrale-coolshine-vs-corrale`, 55) — Add an exact model and official travel-instructions lookup if the current power comparison leaves an open question.

## Pass 2 · Publishing shortlist (2026-11-16)

Reviewed all 13 open Pass 1 cases. Seven now have an existing-page expansion owner, one stays with an existing answer, and five remain in overlap review. One new Panasonic research hypothesis brings the CSV to **81 rows**: 41 KEEP, 28 EXPAND across 26 URLs, one REFRESH, one OBSERVE, seven REVIEW_OVERLAP (including one existing draft), three DROP, and **zero PLANNED / NEW**. Existing IDs are preserved. Some distinct research intents now share an existing owner. Combine their improvements in one page edit.

### Ranked existing-page expansions

Ranked by how directly the manufacturer evidence supports a useful addition, then by the earlier page-level demand signal. Figures below are all-country URL aggregates for 2026-10-17 through 2026-11-13.

1. **Co-anda2x US bundle contents** — Compare the two named Ceramic Pink/Rose Gold boxes side by side and carry the existing GB configuration in its own column or section. Dyson's two box lists confirm different barrel and brush choices. The owner had 179 impressions and 2 clicks. [Existing owner](https://www.combreport.com/guides/dyson-airwrap-id-vs-co-anda2x), [US Straight+Wavy](https://www.dyson.com/hair-care/hair-stylers/airwrap-co-anda2x/straight-wavy-ceramic-pink-rose-gold), [US Curly+Coily](https://www.dyson.com/hair-care/hair-stylers/airwrap-co-anda2x/curly-coily-ceramic-pink-rose-gold).
2. **Can I take my existing diffuser with a Dyson HD19?** — Add a fit and box-contents callout beside the HD19 travel example. Dyson's US FAQ lists Supersonic and Nural attachment compatibility and excludes Supersonic r. Record named package inclusion separately. The owner had 237 impressions. [Existing owner](https://www.combreport.com/guides/best-travel-hair-dryers), [Dyson HD19 compatibility](https://www.dyson.com/hair-care/hair-dryers/supersonic-travel).
3. **ghd Speed Halo nozzle versus Helios** — Add a GB part-approval callout beside the existing nozzle comparison. ghd names Speed for the magnetic Halo. Leave other exact-model approvals unresolved until documented. The owner had 95 impressions and 3 clicks. [Existing owner](https://www.combreport.com/guides/ghd-speed-vs-helios), [ghd Halo part](https://www.ghdhair.com/hair-dryer-accessories/ghd-halo-styling-concentrator-p-746).
4. **Does the MagicSense need a ring on Alyon or Digitalyon?** — Add two direct-fit rows to the existing pack comparison. Separate the ring supplied with the MagicSense accessory from whether a named dryer box includes the diffuser. The owner had 131 impressions and 2 clicks. [Existing owner](https://www.combreport.com/guides/parlux-alyon-vs-digitalyon), [Parlux MagicSense listing](https://www.parlux.it/en/products/magicsense-diffuser).
5. **Which Shark diffuser or powered attachment can I order?** — Add a small replacement-part example to the shared multi-styler guide. Label US XSKHD8DAPU, GB XSKHD8DAPKUK and US FlexFusion XSKHD6SA separately, with documented body approvals and kit inclusion in different fields. The owner had 21 impressions. [Existing owner](https://www.combreport.com/guides/how-to-choose-multi-styler-attachments), [US diffuser](https://www.sharkninja.com/shark-flexstyle-ioncurl-curl-defining-diffuser/XSKHD8DAPU.html), [GB diffuser](https://www.sharkninja.co.uk/shark-flexstyle-ioncurl-curl-defining-diffuser-pink/XSKHD8DAPKUK.html), [US FlexFusion part](https://www.sharkninja.com/shark-flexfusion-ceramic-straightener-attachment-metallic-mist/XSKHD6SA.html).
6. **Do original Supersonic attachments fit Nural and retain learning?** — Convert the existing caveat into a short check for physical fit, Attachment learning and Dyson's wide-tooth-comb exception. Link the example from the Nural bundle comparison if helpful. The general owner had 341 impressions and 4 clicks. [Existing owner](https://www.combreport.com/guides/hair-dryer-diffuser-compatibility), [Dyson Nural FAQ](https://www.dyson.com/hair-care/hair-dryers/supersonic-nural).
7. **Which replacement pad goes with my Denman D3 or D4?** — Add a model-and-row-count lookup in the existing variant section. Denman lists separate replacement pad options. Physical head dimensions remain unmeasured. The owner had 37 impressions and 1 click. [Existing owner](https://www.combreport.com/guides/denman-d3-vs-d4), [Denman replacement pads](https://denmanbrush.com/products/replacement-pads).
8. **Which closure came with my Conair heated roller kit?** — Put the HS400 and HS79CR manual examples beside a kit-label check. Record the original documented closure and direct owners to official support for replacement part approval. The owner had 22 impressions. [Existing owner](https://www.combreport.com/guides/how-to-use-heated-hair-rollers), [Conair HS79CR manual](https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwd2206057/Instructional%20Booklets/HS79CR.pdf).

### New-page shortlist and remaining holds

**Zero qualified.** The backlog contains dated preliminary public-result samples. Device and regional ranking order remain unknown. Keep the following research titles and slugs unreserved.

- **Shark FlexStyle to IonCurl: Which Attachments Carry Over?** (GB and US, `/guides/shark-flexstyle-vs-ioncurl`). Exact-part, two-direction migration could justify a dedicated page alongside the [multi-styler attachments guide](https://www.combreport.com/guides/how-to-choose-multi-styler-attachments). GB Shark already answers original-to-IonCurl reuse and excludes Glam. US Shark lists HD800 and HD400 for the checked new diffuser and concentrator, while the original US paddle brush lists HD400 bodies only. Qualitative owner threads show upgrade interest with country unknown. Require regional demand, explicit GB part-by-body approvals, and a controlled results review. Fold replacement diffuser research into this decision. [GB Shark comparison](https://www.sharkninja.co.uk/blog/ioncurl-vs-flexstyle.html), [US concentrator](https://www.sharkninja.com/shark-flexstyle-ioncurl-styling-concentrator/XSKHD8SC.html), [US original paddle brush](https://www.sharkninja.com/shark-flexstyle-paddle-brush/XSKHD4PBA.html).
- **Parlux Diffuser Compatibility by Dryer and Diffuser Model** (GB and US, `/guides/parlux-diffuser-compatibility`). A cross-family lookup could add direct fit, ring requirements and exclusions beyond the Alyon/Digitalyon expansion. The MagicSense listings differ on Ethos and Elysium scope, while Parlux identifies MagicCompact as Elysium-specific. Require confirmed regional parts and repeat demand. [English MagicSense listing](https://www.parlux.it/en/products/magicsense-diffuser), [Italian MagicSense listing](https://www.parlux.it/products/diffusore-magicsense), [US MagicSense listing](https://parluxus.com/products/parlux-magic-sense-special-diffuser-adapter), [MagicCompact](https://www.parlux.it/en/products/diffusore-magiccompact%C2%AE).
- **Panasonic regional diffuser replacement** (GB EH-NA0J and US EH-NA67-W) needs both manufacturer-approved spare codes and model-specific demand. Panasonic's US listing identifies the original diffuser, while the GB product page could not be read through the research tool. **Shark FlexStyle versus IonCurl filter care** needs complete exact-model instructions and evidence of a separate reader task. The SteamPod comb expansion can direct readers to the model-specific manual while the GB replacement IDs remain unverified. [Panasonic US EH-NA67-W](https://shop.panasonic.com/products/nanoe-hair-dryer-with-oscillating-quick-dry-nozzle), [Panasonic EH-NA0J manual](https://www.panasonic.com/content/dam/common/Global/Womens-Beauty/2024/eh-na0j/EH-NA0J_OI_EU_No_1_20230727.pdf), [Rowenta SteamPod 4 support](https://www.rowenta.com/instructions-for-use/Products-/Personal-Care/Straightener/STEAMPOD-4-LP7400/csp/1830008757).
- **Curly and thick brush pairs** remain open. On 2026-11-16, both singular URLs omitted from the registry and sitemap returned indexable, self-canonical HTTP 200 pages, as did their plural counterparts. Each pair substantially overlaps. Prefer the plural pages for later consolidation because they are registered, linked and fuller. The thick-hair pair shares leading queries and the plural page has greater visibility in both markets. Keep the plural curly-hair page as the provisional editorial owner and review migration carefully because the older singular page recorded 109 US impressions versus 2 for the current page. Verify current backlinks and the delivery source for both older documents before acting. Keep the related curl-defining-versus-detangling and detangling selection guides.
- **Disabled round-brush draft** remains in its prior overlap review. It was outside the 13 active Pass 1 cases.

### Search Console evidence

Read the eight exact-URL **Queries** reports in the signed-in Search Console browser. Filters were property `sc-domain:combreport.com`, **Web (text)**, 2026-08-17 through 2026-11-14 inclusive, and a United States versus United Kingdom country comparison. The property chart's first displayed date was 2026-09-02. The 28-day export remains a separate, all-country baseline. In the CSV, the regional data is labelled in the demand fields and the original URL-level `gsc_*` values retain their earlier scope.

| Exact page                                                                                                  | US impressions | UK impressions | Report evidence                                                                          |
| ----------------------------------------------------------------------------------------------------------- | -------------: | -------------: | ---------------------------------------------------------------------------------------- |
| [Multi-styler attachment chooser](https://www.combreport.com/guides/how-to-choose-multi-styler-attachments) |              3 |              0 | Two visible rows, both general attachment questions.                                     |
| [Shark Glam vs FlexStyle](https://www.combreport.com/guides/shark-glam-vs-flexstyle)                        |              0 |              1 | One query for Glam vs FlexStyle.                                                         |
| [General diffuser compatibility](https://www.combreport.com/guides/hair-dryer-diffuser-compatibility)       |              8 |              6 | Seven visible rows, all general fit or replacement questions.                            |
| [Parlux Alyon vs Digitalyon](https://www.combreport.com/guides/parlux-alyon-vs-digitalyon)                  |              5 |              9 | Both visible rows compare the two dryers in opposite word order.                         |
| [Current curly-hair brush guide](https://www.combreport.com/guides/best-brushes-curly-hair)                 |              2 |              0 | Two visible US queries on brushes and combs.                                             |
| [Legacy curly-hair brush guide](https://www.combreport.com/guides/best-hair-brush-for-curly-hair)           |            109 |              2 | The US query “hair brush for curly hair” accounts for 51 impressions.                    |
| [Current thick-hair brush guide](https://www.combreport.com/guides/best-brushes-thick-hair)                 |            434 |            126 | “Hair brush for thick hair” appears on both URLs, with 82 US and 18 UK impressions here. |
| [Legacy thick-hair brush guide](https://www.combreport.com/guides/best-hair-brush-for-thick-hair)           |            288 |             95 | The same query had 43 US and 16 UK impressions here.                                     |

All eight filtered reports showed zero clicks in both markets. All displayed query rows were reviewed for the four Shark/Parlux research pages and both curly guides. The thick-hair comparison uses chart totals and the first ten displayed queries on each page. The chart total and counts are separate from any sum of visible query rows. The targeted reports support the scoped existing-page improvements and the thick-hair overlap finding. They yielded no visible IonCurl or MagicSense query on the checked owners. Demand for either standalone page remains unknown, and the shortlist still contains zero NEW URLs.

A property-wide Search Analytics API pull remains unavailable through the current connection. If available later, retrieve finalized Web data on `sc-domain:combreport.com` with dimensions `query`, `page`, `country` and filter `USA`/`GBR`. Paginate results and preserve unknown query rows. [Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).

Slug checks used the live and generated sitemaps, all article sources and registry states, the route policy, retired-route list and the CSV's working slugs. Direct public checks returned HTTP 404 for the leading Shark, Parlux, Panasonic, heated-roller and separate IonCurl-diffuser working slugs. The two sitemaps still have the same 245 unique URLs.

## Earlier 17 November pilot handover

Two editorial pilots are implemented locally and tracked as PLANNED / NEW until release. Their exact query volume and controlled national ranking remain unknown. Both target URLs returned HTTP 404 before release. The backlog keeps the existing IonCurl ID and adds a travel comparison row.

- [Dyson Supersonic Travel vs ghd Flight+](https://www.combreport.com/guides/dyson-supersonic-travel-vs-ghd-flight-plus) covers voltage selection, packing, included pieces and supported attachment reuse in named UK and US listings.
- [Shark FlexStyle vs IonCurl attachment compatibility](https://www.combreport.com/guides/shark-flexstyle-vs-ioncurl) covers UK migration direction and a US exact-part lookup. The separate IonCurl diffuser question belongs here.

The six planned additions cover the US Nural fit and learning example, HD19 carry-over, two US Co-anda2x boxes, Alyon and Digitalyon MagicSense fit, the GB Speed Halo replacement and the two Denman spare pads. The shared attachment chooser and the Glam comparison link to the IonCurl pilot.

**Brush ownership.** Both thick-hair URLs returned indexable, self-canonical HTTP 200 on 17 November, including a CloudFront miss for the legacy URL. The singular route has no current source owner or sitemap entry. Its surviving advice on paddle-brush handling, wet detangling and smaller sections is already covered by the plural guide. The deployment cleanup script identifies the retired document keys, but the public response does not establish which origin object served the page. The plural URL is the preferred destination. Confirm the origin object and current backlink evidence before approving a transition. Curly-hair ownership remains open. The wider Parlux fit matrix and other research cases remain in research.

**Pre-release baseline.** The pilots have no live landing-page baseline. Use the 17 October–13 November Web export for existing owners and the separate 17 August–14 November US/UK reports above. The six updated owners had respectively 4/341, 0/237, 2/179, 2/131, 3/95 and 1/37 clicks/impressions in the all-country export. Compare those pages against the preceding comparable window after 28 complete post-release days. For the pilots, record indexing, canonical selection and relevant queries after the same interval.

**Local acceptance.** The production build has 248 prerendered documents and 247 unique sitemap URLs. The only sitemap additions are the two pilots. Both have contextual article links and self-canonical metadata. At 375 px, the five changed tables fit within the page, accept keyboard focus, and support horizontal keyboard scrolling wherever the table exceeds its container. All three new contextual links navigated to their intended guides. Production release remains pending.

## Consolidated 17 November implementation

Prepared as one unstaged change set against reviewed commit `833e770`. The release review requested in the brief is the next step. Twelve guides are implemented locally, with twelve PLANNED / NEW rows. The two earlier pilots are DONE / KEEP with `verified_live` state. Significant article and discovery revisions use 2026-11-17 lastmod. If publication occurs later, reconcile first-publication scheduling with the actual release date while preserving source-check provenance.

### Deployed baseline reconciled

Ordinary production checks on 2026-11-17 returned HTTP 200, one self canonical and index/follow for all ten requested baseline pages. All authored paragraphs, section headings and table cells matched the reviewed HEAD sources. The HD19 voltage, packed kit, nozzle/case and attachment-reuse answer, IonCurl UK direction and Glam exclusion, exact US parts, Co-anda2x US boxes, Nural fit/learning distinction, MagicSense direct-fit rows, D3/D4 pads and Halo replacement wording were present. The travel guide linked to the HD19 comparison. Both the attachment chooser and Glam/FlexStyle comparison linked to IonCurl. Public guide/category incoming links were checked separately.

| Existing production page                                                     | Confirmation                                                  |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------- |
| https://www.combreport.com/guides/dyson-supersonic-travel-vs-ghd-flight-plus | Voltage, case/nozzle and attachment reuse                     |
| https://www.combreport.com/guides/shark-flexstyle-vs-ioncurl                 | UK migration direction, Glam exclusion, US body/part table    |
| https://www.combreport.com/guides/best-travel-hair-dryers                    | HD19 carry-over and contextual comparison link                |
| https://www.combreport.com/guides/dyson-airwrap-id-vs-co-anda2x              | Two named US box inventories                                  |
| https://www.combreport.com/guides/hair-dryer-diffuser-compatibility          | Physical fit, learning and wide-tooth-comb exception          |
| https://www.combreport.com/guides/parlux-alyon-vs-digitalyon                 | MagicSense direct fit and accessory-versus-dryer package rows |
| https://www.combreport.com/guides/denman-d3-vs-d4                            | Exact replacement-pad rows                                    |
| https://www.combreport.com/guides/ghd-speed-vs-helios                        | Halo replacement matches authored output                      |
| https://www.combreport.com/guides/how-to-choose-multi-styler-attachments     | IonCurl contextual link                                       |
| https://www.combreport.com/guides/shark-glam-vs-flexstyle                    | IonCurl contextual link                                       |

### Added pages for release review

- [ghd Max vs Chronos Max: Wide Plate Choice](https://www.combreport.com/guides/ghd-max-vs-chronos-max)
- [Denman D3 vs D31: Seven Rows, Different Spacing](https://www.combreport.com/guides/denman-d3-vs-d31)
- [Ultimate Detangler vs Ultimate Styler: Which Task?](https://www.combreport.com/guides/tangle-teezer-ultimate-detangler-vs-ultimate-styler)
- [ghd Duet Style vs Duet Blowdry: Format and Modes](https://www.combreport.com/guides/ghd-duet-style-vs-duet-blowdry)
- [Shark SpeedStyle Pro vs Pro Flex: UK Bodies and Boxes](https://www.combreport.com/guides/shark-speedstyle-pro-vs-pro-flex)
- [T3 Aire 360 Next Gen vs Dyson Airwrap i.d.: UK Kits](https://www.combreport.com/guides/t3-aire-360-next-gen-vs-dyson-airwrap-id)
- [BaByliss Air Wand AS6550U vs AS6553U: Box Contents](https://www.combreport.com/guides/babyliss-air-wand-as6550u-vs-as6553u)
- [Color Wow Dream Coat: Original, Extra Strength or Curly?](https://www.combreport.com/guides/color-wow-dream-coat-original-vs-extra-strength-vs-curly)
- [Moroccanoil Treatment Original vs Light: UK Choice](https://www.combreport.com/guides/moroccanoil-treatment-original-vs-light)
- [Framar Gator Grips vs Super Sectioners: Clip Tasks](https://www.combreport.com/guides/framar-gator-grips-vs-super-sectioners)
- [Conair HS400 vs HS79CR: Roller Counts and Clips](https://www.combreport.com/guides/conair-hs400-vs-hs79cr-hot-rollers)
- [Shark SilkiPro Straight vs Dyson Airstrait: UK Modes](https://www.combreport.com/guides/shark-silkipro-straight-vs-dyson-airstrait)

Each has a conditional decision, exact-market table, documented evidence scope, manufacturer source panel, three FAQs, related destinations and contextual incoming article and category links. The UK T3 main table uses the current Aire 360 2.0 New Edition and Dyson i.d. Vinca Blue/Topaz Straight+Wavy kit, whose complete box could be verified. The US T3 diffuser note retains its second-generation scope. The Shark table explicitly selects two Pro pieces and three Pro Flex pieces as editorial example configurations. The selected order determines what is supplied.

### Existing guide pages updated locally

The 41 incremental article edits sharing owners have been combined in their source files. The thick-brush owner also preserves the legacy paddle-control point. This gives 42 existing guide source revisions. The CSV contains the precise addition and manufacturer links beside each applicable owner. Earlier deployed work on the three unchanged travel, diffuser and Speed/Helios owners remains verified_live.

- https://www.combreport.com/guides/olivia-garden-ceramic-ion-vs-nanothermic
- https://www.combreport.com/guides/how-to-choose-hair-sectioning-clips
- https://www.combreport.com/guides/how-to-choose-a-hair-barrette
- https://www.combreport.com/guides/hair-roller-size-guide
- https://www.combreport.com/guides/how-to-use-heated-hair-rollers
- https://www.combreport.com/guides/how-to-use-snap-closure-foam-rollers
- https://www.combreport.com/guides/how-to-choose-hair-dryer
- https://www.combreport.com/guides/hair-dryer-heat-and-speed-settings-guide
- https://www.combreport.com/guides/how-to-use-hair-dryer-concentrator-nozzle
- https://www.combreport.com/guides/ghd-air-vs-helios
- https://www.combreport.com/guides/dyson-supersonic-nural-vs-supersonic-r
- https://www.combreport.com/guides/dyson-supersonic-vs-shark-speedstyle
- https://www.combreport.com/guides/parlux-alyon-vs-digitalyon
- https://www.combreport.com/guides/dyson-airwrap-id-vs-co-anda2x
- https://www.combreport.com/guides/revlon-one-step-volumizer-vs-plus
- https://www.combreport.com/guides/how-to-clean-a-steam-hair-straightener
- https://www.combreport.com/guides/steam-hair-straightener-vs-flat-iron
- https://www.combreport.com/guides/how-to-clean-hair-dryer-filter
- https://www.combreport.com/guides/how-to-use-hot-air-brush
- https://www.combreport.com/guides/best-travel-flat-irons
- https://www.combreport.com/guides/babyliss-air-style-1000-vs-flawless-volume
- https://www.combreport.com/guides/how-to-clean-a-hair-brush
- https://www.combreport.com/guides/hair-styling-product-order
- https://www.combreport.com/guides/hair-serum-vs-hair-oil
- https://www.combreport.com/guides/how-to-apply-hair-serum-or-oil
- https://www.combreport.com/guides/flat-iron-plate-width-guide
- https://www.combreport.com/guides/thermal-brush-vs-hot-air-brush
- https://www.combreport.com/guides/denman-d3-vs-d4
- https://www.combreport.com/guides/best-brushes-curly-hair
- https://www.combreport.com/guides/tangle-teezer-ultimate-detangler-vs-wet-brush-original
- https://www.combreport.com/guides/ghd-chronos-vs-chronos-max
- https://www.combreport.com/guides/dyson-airstrait-vs-ghd-duet-style
- https://www.combreport.com/guides/dyson-airsmooth-vs-ghd-duet-blowdry
- https://www.combreport.com/guides/how-to-choose-multi-styler-attachments
- https://www.combreport.com/guides/how-to-use-texturising-spray
- https://www.combreport.com/guides/sea-salt-spray-vs-texturising-spray
- https://www.combreport.com/guides/how-to-apply-hair-mousse
- https://www.combreport.com/guides/how-to-use-spiral-hair-ties
- https://www.combreport.com/guides/heatless-curls-not-working
- https://www.combreport.com/guides/how-to-use-airflow-curling-barrels
- https://www.combreport.com/guides/how-to-use-an-automatic-hair-curler
- https://www.combreport.com/guides/best-brushes-thick-hair

### Discovery pages updated locally

- https://www.combreport.com/
- https://www.combreport.com/guides
- https://www.combreport.com/hair-dryers
- https://www.combreport.com/hot-air-brushes
- https://www.combreport.com/brushes-combs
- https://www.combreport.com/hair-care
- https://www.combreport.com/hair-accessories
- https://www.combreport.com/flat-irons
- https://www.combreport.com/hair-brush-finder
- https://www.combreport.com/flat-iron-finder

Guide search accepts D31, Flight Plus, HD500, AS6553U and Dream Coat Curly. Category cards use the existing registry. Small task-labelled link groups connect hair-care formulas, accessory purchase decisions and multi-styler kit selection. Brush, wide-plate and embedded dryer finder results retain the relevant general method and exact-model next step.

### Brush transition decision and exact retirement keys

Prefer the registered plural owners for both tasks. The supplied US/UK query comparisons remain 2026-08-17 through 2026-11-14 Web reports. Curly singular/plural US impressions were 109/2. Thick plural/singular impressions were US 434/288 and GB 126/95, with shared leading query wording. Both pairs recorded zero clicks. The fuller current bodies cover wet detangling, section control and separate styling tasks. The legacy thick page's paddle-control point is now explicit in the plural owner. The curly page's useful wet-use and open-spacing material was already covered.

On 2026-11-17, the signed-in `sc-domain:combreport.com` Links report showed **External links Total 0**, with No data under top linked pages, linking sites and linking text. This establishes the report's current observation. Unreported external links remain unknown. Proceed with the user's preferred real-404 retirement in the reviewed release. External links to either retired URL will then land on an HTTP 404 page.

| Retire URL                                                       | Preferred owner                                           | Confirmed S3 document                              |
| ---------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------- |
| https://www.combreport.com/guides/best-hair-brush-for-curly-hair | https://www.combreport.com/guides/best-brushes-curly-hair | `guides/best-hair-brush-for-curly-hair/index.html` |
| https://www.combreport.com/guides/best-hair-brush-for-thick-hair | https://www.combreport.com/guides/best-brushes-thick-hair | `guides/best-hair-brush-for-thick-hair/index.html` |

Read-only AWS checks confirmed production distribution `E15KYMP9H859CS`, its default S3 origin `hair-prod-sitebucket397a1860-lu3pd8ii5lc8` and empty OriginPath. The actual LIVE viewer-request function maps both extensionless and slash routes to these index documents. S3 prefix listing found those two old index files, dated 2026-09-20. Alternative exact bare and `.html` keys were absent. The legitimate short-hair page under the nearby prefix is retained. The distribution's S3 403/404 error mapping serves `/404/index.html` with HTTP 404. Ordinary public legacy brush requests still returned indexable 200 before cleanup.

The existing cleanup script previews exact keys and now checks all three document shapes for each already-retired route. Its guards reject any matching build file or sitemap owner. The release smoke command checks the two brush pairs and all existing retired routes in extensionless, slash, explicit index and `.html` forms. Any HTTP 200 or redirect fails retirement acceptance. Both existing manual content-upload workflows now run the exact-key cleanup after upload and before release smoke verification. A workflow regression check enforces that order. The retirement is prepared locally. Origin deletion awaits the requested release review.

### Research inventory reconciliation

The one CSV now contains **314 rows and 40 columns**, preserving all 82 original IDs. It covers all **237 article registry entries**, including **236 published guides and one disabled draft**, plus all **23 other indexable canonical routes**. Every one of the expected **259 sitemap URLs** has an existing or selected row. The current live sitemap has 247 unique URLs and zero duplicates. All twelve new ordinary production URLs returned HTTP 404 before release, and both legacy brush URLs still returned HTTP 200. There are twelve distinct proposed URLs, with no duplicate proposed slugs and no collision with pre-batch live routes, other drafts or existing planned owners. The two already-live pilots moved to existing_url. The IonCurl replacement-diffuser row now shares the deployed IonCurl owner, with the former generic chooser metrics retained as explicitly adjacent context and its current-owner gsc fields cleared.

The brief contains **100 supplied topic decisions**, grouped as twelve selected guides, 41 existing-owner questions and 47 further hypotheses. Several question placements share an owner and source edits also add contextual next decisions. File counts and CSV row counts therefore measure different things. The 47 hypothesis decisions occupy **46 RESEARCH rows** because the generic rod-versus-flexi format question shares the Kitsch format task. Their `research_decisions` tags preserve all 47 original placements. Working candidates appear only in notes and reserve no route. Three prior research IDs are reused for Parlux range compatibility, Panasonic replacement parts and FlexStyle/IonCurl care. Exact pair-specific volumes, controlled UK/US ranking order and difficulty remain unknown. The longer-term target of 100–300 publication-ready new URLs remains unfulfilled.

Current statuses are 252 DONE, 46 RESEARCH, twelve PLANNED, three DECLINED and one DRAFT. Current actions are 221 KEEP, 27 EXPAND, 47 REVIEW_OVERLAP, three DROP, one OBSERVE, three REFRESH and twelve NEW. `implementation_state` records 66 implemented_local, 7 verified_live, 190 covered_existing, 50 pending and 1 draft. DONE describes a serving owner. Proposed work remains visible in the action and implementation fields.

The earlier Pass 1 zero-new and Pass 2 zero-qualified findings are historical. The user's later editorial selections supersede those publication decisions. Earlier 404 and release-pending observations for the two pilots are superseded by the production confirmation above. This twelve-page consolidated batch is prepared for review.

### Remaining factual unknowns

- The AS6553U manual was not independently retrieved from the manufacturer. The guide compares documented UK box contents and keeps body equivalence unknown. AS6550U manual evidence cannot establish AS6553U equivalence.
- Conair's HS79CR product-linked PDF uses HS79 naming. The exact revision relationship and cross-kit spare compatibility remain unknown.
- Width, grip, crease, fit, drying-time and styling-retention results have no same-method CombReport measurements. Labelled dimensions and maker directions retain their exact model and market scope.
- Direct HTTP source checks returned 200 for 26 of 35 new-guide source URLs. Manufacturer filtering, BaByliss redirect loops and a media-host DNS failure limited the remaining checks. Product identity and relevant wording were also reviewed through manufacturer search/text evidence. The ghd Duet PDF path was corrected to the official UK guide. The exact Moroccanoil cosmetic product name and two specific catalogue URL patterns receive a narrow safety-scan normalization, with regression tests retaining the surrounding medical-language checks. Final browser accessibility of blocked sources remains unknown.
- The disabled round-brush draft stays in overlap review. All 46 hypothesis rows require the exact-model, reader-task, regional demand and results checks documented beside their closest owners. The selected SilkiPro page already answers its wet/dry-mode hypothesis, so a separate URL has no established additional value.
- Property-wide finalized query/page/country API evidence remains unavailable. Preserve the earlier 28-day all-country Pages aggregates and the eight US/GB filtered reports as separate baselines. Latest complete 90-day range at this handoff is 2026-08-19 through 2026-11-16, subject to Search Console finalized-data availability. Do not relabel the older August–November reports as this refreshed window. For the smallest retirement follow-up set, export Queries separately for each of the four brush URLs in the ownership table and preferred-owner columns, with exact page, Web (text), this available finalized range and country US or UK. This makes eight filtered exports. For new-page performance, export exact new owners after 28 complete post-release days.

### Validation and release sequence

Final local acceptance passed on 2026-11-17.

- `npm run verify` passed formatting, lint, type checks, all 98 frontend tests, six API tests, six infrastructure tests, 37 shared validation tests, the 238-file content safety scan, editorial checks, production build, generated SEO and internal-link checks.
- `npm run seo:audit` passed with 260 registered/generated documents, 259 indexable sitemap entries, zero duplicates, zero missing/unexpected sitemap routes, zero metadata failures, zero internal orphans and zero broken internal links. Nine pre-existing guides still lack contextual article incoming links and remain reachable through navigation/hubs. The audit normalizes the sitemap's bare root origin and the homepage's slash canonical as the same root URL.
- Artifact-only release smoke passed all 101 intended owners against authored bodies, metadata and lastmod. Its retired-file guards passed. Production retirement checks remain for the reviewed release.
- At 375 × 812, all 54 changed/new guides and ten discovery pages passed viewport checks. All 64 tables were focusable and named. All 38 overflowing tables passed horizontal arrow-key scrolling. New guide tables and added comparison-record tables were included. Missing accessible table labels found during this check were repaired within the edited sources.
- All five requested search aliases resolved to their canonical guide. Search clearing/no-match handling and keyboard navigation worked. Actual wet-detangling, styling-pin, wide-plate and everyday/diffuser/travel dryer finder choices exposed their expected guide links.
- Every new guide has a rendered category link and an authored contextual incoming article link. The 314-row CSV passed quoting, unique/stable ID, status/action, proposed-slug and full-route reconciliation checks. The root URL equivalence is normalized for this reconciliation.
- Exact-key cleanup preview passed for all six already-retired routes and their three document shapes, covering 18 keys. The two surviving brush index documents are the confirmed production objects. The preview made no deletion.
- `git diff --check` passed. Existing advisory editorial targets for length and metadata remain warnings. Production delivery of this batch and the first 28 complete post-release days remain pending.

The expected denominator is 260 prerendered documents, 259 indexable sitemap URLs, zero duplicate sitemap locations, zero missing policy owners and zero unexpected sitemap routes. The retired singular brush routes were already absent, so retirement subtracts no sitemap entries.

Use the existing manual content-release workflow after review. The release has ordinary existing S3 upload, storage and request charges plus normal CloudFront delivery usage. Exact obsolete-key removal adds ordinary S3 API requests. It creates no new recurring AWS resources. The workflow change calls the existing exact-document cleanup script after content upload. No cache-policy, WAF, logging or viewer-request routing configuration change is included. CloudFront caching is disabled on the checked default behavior, and the plan requires no invalidation. The smoke command is read-only.

Before a production upload, run the existing cleanup preview against the exact built output and production bucket. After the reviewed upload and exact-key cleanup, run `npm run seo:verify-production` and `npm run seo:smoke-release`, preserve actual statuses, canonicals, content checks and sitemap comparison, and require real 404 responses for every retired route form. The extended smoke check covers 101 intended release owners plus retired-route checks. Significant lastmod values track substantive content edits. Google ignores priority and changefreq. [Google's sitemap guidance](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping).

After release, record the release time and the first complete next day as the start of the 28-day review window. Check indexing/canonical selection and query/page/country performance for the two pilots, twelve new guides and changed owners, and removal of the two duplicates. Calendar dates remain unknown until the release is recorded. Existing low-volume baselines require an extended review when 28 days yields little data.

### Changed implementation files

- `.github/workflows/deploy-all.yml`
- `.github/workflows/deploy-content.yml`
- `docs/seo/README.md`
- `docs/seo/content-opportunities.csv`
- `frontend/content/babyliss-air-style-1000-vs-flawless-volume.html`
- `frontend/content/babyliss-air-wand-as6550u-vs-as6553u.html`
- `frontend/content/best-brushes-curly-hair.html`
- `frontend/content/best-brushes-thick-hair.html`
- `frontend/content/best-travel-flat-irons.html`
- `frontend/content/color-wow-dream-coat-original-vs-extra-strength-vs-curly.html`
- `frontend/content/conair-hs400-vs-hs79cr-hot-rollers.html`
- `frontend/content/denman-d3-vs-d31.html`
- `frontend/content/denman-d3-vs-d4.html`
- `frontend/content/dyson-airsmooth-vs-ghd-duet-blowdry.html`
- `frontend/content/dyson-airstrait-vs-ghd-duet-style.html`
- `frontend/content/dyson-airwrap-id-vs-co-anda2x.html`
- `frontend/content/dyson-supersonic-nural-vs-supersonic-r.html`
- `frontend/content/dyson-supersonic-vs-shark-speedstyle.html`
- `frontend/content/flat-iron-plate-width-guide.html`
- `frontend/content/framar-gator-grips-vs-super-sectioners.html`
- `frontend/content/ghd-air-vs-helios.html`
- `frontend/content/ghd-chronos-vs-chronos-max.html`
- `frontend/content/ghd-duet-style-vs-duet-blowdry.html`
- `frontend/content/ghd-max-vs-chronos-max.html`
- `frontend/content/hair-dryer-heat-and-speed-settings-guide.html`
- `frontend/content/hair-roller-size-guide.html`
- `frontend/content/hair-serum-vs-hair-oil.html`
- `frontend/content/hair-styling-product-order.html`
- `frontend/content/heatless-curls-not-working.html`
- `frontend/content/how-to-apply-hair-mousse.html`
- `frontend/content/how-to-apply-hair-serum-or-oil.html`
- `frontend/content/how-to-choose-a-hair-barrette.html`
- `frontend/content/how-to-choose-hair-dryer.html`
- `frontend/content/how-to-choose-hair-sectioning-clips.html`
- `frontend/content/how-to-choose-multi-styler-attachments.html`
- `frontend/content/how-to-clean-a-hair-brush.html`
- `frontend/content/how-to-clean-a-steam-hair-straightener.html`
- `frontend/content/how-to-clean-hair-dryer-filter.html`
- `frontend/content/how-to-use-airflow-curling-barrels.html`
- `frontend/content/how-to-use-an-automatic-hair-curler.html`
- `frontend/content/how-to-use-hair-dryer-concentrator-nozzle.html`
- `frontend/content/how-to-use-heated-hair-rollers.html`
- `frontend/content/how-to-use-hot-air-brush.html`
- `frontend/content/how-to-use-snap-closure-foam-rollers.html`
- `frontend/content/how-to-use-spiral-hair-ties.html`
- `frontend/content/how-to-use-texturising-spray.html`
- `frontend/content/moroccanoil-treatment-original-vs-light.html`
- `frontend/content/olivia-garden-ceramic-ion-vs-nanothermic.html`
- `frontend/content/parlux-alyon-vs-digitalyon.html`
- `frontend/content/revlon-one-step-volumizer-vs-plus.html`
- `frontend/content/sea-salt-spray-vs-texturising-spray.html`
- `frontend/content/shark-silkipro-straight-vs-dyson-airstrait.html`
- `frontend/content/shark-speedstyle-pro-vs-pro-flex.html`
- `frontend/content/steam-hair-straightener-vs-flat-iron.html`
- `frontend/content/t3-aire-360-next-gen-vs-dyson-airwrap-id.html`
- `frontend/content/tangle-teezer-ultimate-detangler-vs-ultimate-styler.html`
- `frontend/content/tangle-teezer-ultimate-detangler-vs-wet-brush-original.html`
- `frontend/content/thermal-brush-vs-hot-air-brush.html`
- `frontend/src/app/article-date-rendering.spec.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/consolidated-comparison-guides.ts`
- `frontend/src/app/direct-heat-finder.component.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/hair-brush-finder.component.ts`
- `frontend/src/app/hair-dryer-finder.component.ts`
- `frontend/src/app/seo-route-policy.ts`
- `frontend/src/app/static-page.component.ts`
- `scripts/check-content.ts`
- `scripts/cleanup-retired-route-documents.test.ts`
- `scripts/cleanup-retired-route-documents.ts`
- `scripts/content-safety.test.ts`
- `scripts/content-safety.ts`
- `scripts/release-smoke.test.ts`
- `scripts/seo/release-article-validation.ts`
- `scripts/seo/release-smoke.ts`
- `scripts/workflow-validation.test.ts`

## 18 November exact-model implementation

Implemented the supplied [research and implementation handover](exact-model-and-attachment-handover-2026-11-18.md) against starting commit `4b54640`. Its source register and uncontrolled search-result samples are preserved in that document. This batch follows its nine selections and 47 hypothesis decisions. Existing `test.sh` was untracked at the start and remains unrelated to this work. All batch changes are for unstaged local review and the user's existing manual release flow.

### Baseline and release reconciliation

On 2026-11-18, the ordinary production sitemap returned HTTP 200 with **259 unique URLs and zero duplicates**. All nine selected new URLs returned HTTP 404. The twelve guides selected in the previous batch each returned HTTP 200 with one self canonical and index/follow in fresh ordinary-URL checks. The supplied handover separately records the 17 November production verification of 101 intended owners and the retired brush variants. The repository's older tracked smoke report is dated 3 November and is an artifact-only record, so it is not presented as the 17 November release report.

The twelve previous NEW rows are now DONE with their serving URL in `existing_url`. `implementation_state` marks current local additions separately where this batch also edits a serving page. The previous PLANNED/local-pending notes remain historical in row notes, followed by the superseding delivery observation. Sitemap membership and successful public delivery establish no Search Console indexing or national query performance.

### Nine added guides prepared locally

- https://www.combreport.com/guides/parlux-diffuser-compatibility
- https://www.combreport.com/guides/t3-aireluxe-vs-featherweight-stylemax
- https://www.combreport.com/guides/remington-hydraluxe-pro-vs-proluxe-you-dryer
- https://www.combreport.com/guides/cloud-nine-original-iron-vs-touch-iron
- https://www.combreport.com/guides/steampod-3-vs-steampod-4
- https://www.combreport.com/guides/denman-d3-vs-d38
- https://www.combreport.com/guides/invisibobble-original-vs-power-vs-slim
- https://www.combreport.com/guides/color-wow-raise-the-root-vs-xtra-large
- https://www.combreport.com/guides/babyliss-wave-secret-air-vs-style-secret-air

Each uses the shared article renderer, the supplied title/H1/description/intent and opening, an exact-model decision table, three FAQs, manufacturer evidence and a small curated set of next steps. Registry scheduling is 2026-11-18. Reconcile the actual first-publication date if the release occurs later, while preserving the 18 November source-check provenance.

The Parlux page keeps Ethos language differences and the Elysium/exclusion rows visible. T3 uses the named US white AireLuxe offer, including its particular brush extras, and StyleMax 77832. Remington uses the exact UK listings and booklets marked EC9001A/AC9800A. AC9800 Manual pairs speed and heat. The EC9001 manual excludes its highest heat with the diffuser and gives a medium-heat/low-speed root-volume example. AC9800 names Diffuse mode, recommends low speed in its tips and excludes highest manual heat. These exact restrictions replace a generic setting assumption.

Cloud Nine publishes no disputed two/three-tap mapping. SteamPod identifies the named BaByliss advertising comparator without attributing its figures to generation 3. Current Xtra Large damp/dry permission stays beside its product source and is distinguished from the older Q&A. C1900U release cooling and C6688U warm AIR remain different processes with separate preparation and care boundaries.

### Twelve substantive existing-guide additions

- https://www.combreport.com/guides/cloud-nine-original-iron-vs-wide-iron
- https://www.combreport.com/guides/best-travel-flat-irons
- https://www.combreport.com/guides/hair-dryer-heat-and-speed-settings-guide
- https://www.combreport.com/guides/how-to-clean-hair-dryer-filter
- https://www.combreport.com/guides/hair-dryer-diffuser-compatibility
- https://www.combreport.com/guides/how-to-use-an-automatic-hair-curler
- https://www.combreport.com/guides/how-to-clean-an-automatic-hair-curler
- https://www.combreport.com/guides/how-to-apply-hair-mousse
- https://www.combreport.com/guides/hair-styling-product-order
- https://www.combreport.com/guides/how-to-use-flexi-rods
- https://www.combreport.com/guides/best-heatless-curling-sets
- https://www.combreport.com/guides/how-to-choose-hair-dryer

These add actual model identity, paired-control, care-access, part-fit, application or pack-coverage evidence. The current Original/Wide source confirms both 100–240 V and 30-minute hibernation descriptions for the ordinary irons. The promotional mini dryer has its own rating. The mousse FAQ, method note and source panel now preserve the different aerosol and pump-foam examples. The Canadian CD1031C and UK Secret Air examples retain separate source panels and preparation/care permissions.

### Nine compact contextual updates

- https://www.combreport.com/guides/denman-d3-vs-d4
- https://www.combreport.com/guides/denman-d3-vs-d31
- https://www.combreport.com/guides/how-to-use-a-steam-hair-straightener
- https://www.combreport.com/guides/how-to-clean-a-steam-hair-straightener
- https://www.combreport.com/guides/how-to-use-spiral-hair-ties
- https://www.combreport.com/guides/how-to-use-heatless-curling-rod
- https://www.combreport.com/guides/how-to-get-root-volume-with-a-round-brush
- https://www.combreport.com/guides/parlux-alyon-vs-digitalyon
- https://www.combreport.com/guides/curl-defining-brush-vs-detangling-brush

These preserve the existing primary decision and add a relevant comparison or pack-selection destination. Where the heatless-rod page already had the set-selection link, its existing sentence was updated for the four/six-piece alternative instead of leaving two duplicated format paragraphs. All 21 source pages have actual body changes, with substantive revisions reflected in their maintained dates.

### Eight discovery-page updates

- https://www.combreport.com/
- https://www.combreport.com/guides
- https://www.combreport.com/hair-dryers
- https://www.combreport.com/brushes-combs
- https://www.combreport.com/flat-irons
- https://www.combreport.com/curling-irons
- https://www.combreport.com/hair-care
- https://www.combreport.com/hair-accessories

The homepage uses its existing featured/curated-card structures for a small selection. Registry category cards expose the full collection. Task-labelled links distinguish replacement fit, included T3 parts, Remington controls, Cloud Nine control/voltage, SteamPod generations, Denman head format, volume placement and spiral/heatless-format choice. The named BaByliss pair is classified as a chamber-curler comparison on the curling hub. Existing finder designs and recommendation logic retain their scope.

Search aliases include Cloud 9, EC9001, AC9800, Hydracare, StyleAdapt, D38, C1900U, C6688U, MagicCompact and Xtra Large. Search results retain their position immediately below the input and status. Aliases resolve to canonical guides.

### Drawings and exact factual boundaries

Two original SVG assets show the Denman head formats and root-versus-section placement. Both have accessible titles/descriptions, useful image alternatives and captions identifying their schematic, unmeasured nature. They establish neither working dimensions nor dose, timing or performance results. The Parlux guide contains an original short text decision sequence for diffuser identity, direct fit, adapter scope and unresolved model checks.

The supplied research is the source for the selected product facts. Targeted rechecks resolved the exact Remington restrictions, AireLuxe white-package identity, current Wide Iron fields and the LP7400/LP7400F1 support route. BaByliss indexed/product accessibility limitations remain as recorded in the handover. The C6688U PDF exceeded the web reader's retrieval-size limit during this pass, and the supplied model-specific research remains its documented provenance. T3 StyleMax's supplied primary URL was also unavailable through that reader. These retrieval limits are recorded separately from factual unknowns.

Remaining factual unknowns include Touch's tap-count conflict, exact unmeasured brush/rod dimensions, replacement-part approvals outside the named lists, cross-generation comb/pad fit and independent styling/retention outcomes. Volume, difficulty and controlled UK/US ranking order remain unknown. Product and source pages supply specifications and instructions within their stated model/market scope.

### One CSV and all 47 hypotheses

The existing CSV retains **314 rows, 40 columns and every prior ID**. Nine rows reuse their original research IDs and become PLANNED / NEW. Only those nine reserve `proposed_url`. MagicSense/MagicCompact and T3 automatic/manual hypothesis references point to their selected owner without reserving a second URL. All **47 hypothesis tags** remain traceable.

Current statuses are 270 DONE, 11 PLANNED, 29 RESEARCH, three DECLINED and one DRAFT. Eleven PLANNED records comprise nine NEW owners and two covered-question references. The 29 remaining RESEARCH records were screened against this batch and retain explicit unresolved work. They do not claim a fresh complete keyword or source investigation.

Exact selected sources replace unrelated catalogue leads in `source_urls`, with old leads preserved as historical notes. Kitsch hypotheses 16/34 expand the existing heatless-set owner. SoftTouch scope expands the general diffuser method and references the T3 comparison. Original-generation identification stays with the Original/Wide owner and the new controls comparison. SilkiPro modes and the existing T3 diffuser-generation caveat remain covered by their serving owners. Remington and T3 control variants point to their named comparison and settings method. Curl Secret identity, Dreame facts, Panasonic parts, cross-series Shark approvals and the other unresolved holds remain visible. The 100–300 publication-ready new-URL target remains unfulfilled.

Earlier all-country URL aggregates, US/GB exact-page reports and sitewide query totals retain their dated scopes. No new first-party export is claimed. Unknown numeric scores and total are blank for all nine selections. N01–N09 supplies implementation order and creates no numeric SEO ranking.

### Acceptance and handoff

Final local validation passed on 2026-11-18.

- `npm run verify` passed formatting, lint, type checks, 98 frontend tests, six API tests, six infrastructure tests, 37 shared validation tests, content safety, editorial checks, production build, generated SEO and internal links. The final editorial placement correction was rebuilt and rechecked with content safety, generated SEO, internal links, route audit and artifact smoke.
- Content safety passed all 247 HTML files. The built output contains 245 public guides, 268 sitemap URLs and 269 generated documents. The route audit reports zero duplicate sitemap locations, missing/unexpected sitemap owners, metadata failures, internal orphans or broken internal links. Nine older guides retain their existing contextual-incoming-link advisory.
- Artifact-only release smoke passed all 117 intended owners, preserving earlier coverage and retired-route guards. Final internal-link validation checked 7,914 links. The local/live sitemap difference is exactly the nine selected additions, with zero removed live URLs.
- At 1280 px and 375 px, isolated Chrome checked all nine new guides, all 21 specified existing owners and the eight discovery pages. All 35 mobile tables were labelled and focusable, and all 15 overflowing tables scrolled by arrow key without page overflow. Both SVG assets decoded and were visually inspected at mobile width. Ten aliases and all nine selected contextual/category destinations passed actual browser checks.
- Firefox and WebKit test runtimes were unavailable. Safari and Firefox were not exercised. Chrome used an isolated session.
- CSV validation confirmed 314 unique stable IDs, 40 columns, all 47 hypothesis tags, nine distinct reserved URLs and complete coverage of all 268 sitemap owners. All nine selected rows retain blank unknown scores. Root URL normalization accounts for the sitemap's bare origin and the homepage slash canonical.
- All E01–E21 owner URLs were compared directly with the supplied placement table. The travel-iron example is on E05, and the unrelated steam-format guide is restored to its starting content. `git diff --check` passed. Existing editorial length/metadata warnings remain advisory.

Actual totals are **245 published guides**, one disabled draft, **268 indexable sitemap URLs** and **269 prerendered documents**. The nine additions are the entire planned sitemap increase. Retired brush routes retain their existing retirement coverage.

The release-owner smoke manifest adds the nine guides and all 21 updated owners while retaining prior regression coverage. It uses artifact-only verification before release. The two drawings also enter the existing generated-page checks. Actual production delivery of these nine guides, indexing and the first 28 complete post-release days remain pending. Record the actual release time before assigning a measurement window.

### Files changed in this batch

- `docs/seo/README.md`
- `docs/seo/content-opportunities.csv`
- `docs/seo/exact-model-and-attachment-handover-2026-11-18.md`
- `frontend/content/babyliss-wave-secret-air-vs-style-secret-air.html`
- `frontend/content/best-heatless-curling-sets.html`
- `frontend/content/best-travel-flat-irons.html`
- `frontend/content/cloud-nine-original-iron-vs-touch-iron.html`
- `frontend/content/cloud-nine-original-iron-vs-wide-iron.html`
- `frontend/content/color-wow-raise-the-root-vs-xtra-large.html`
- `frontend/content/curl-defining-brush-vs-detangling-brush.html`
- `frontend/content/denman-d3-vs-d31.html`
- `frontend/content/denman-d3-vs-d38.html`
- `frontend/content/denman-d3-vs-d4.html`
- `frontend/content/hair-dryer-diffuser-compatibility.html`
- `frontend/content/hair-dryer-heat-and-speed-settings-guide.html`
- `frontend/content/hair-styling-product-order.html`
- `frontend/content/how-to-apply-hair-mousse.html`
- `frontend/content/how-to-choose-hair-dryer.html`
- `frontend/content/how-to-clean-a-steam-hair-straightener.html`
- `frontend/content/how-to-clean-an-automatic-hair-curler.html`
- `frontend/content/how-to-clean-hair-dryer-filter.html`
- `frontend/content/how-to-get-root-volume-with-a-round-brush.html`
- `frontend/content/how-to-use-a-steam-hair-straightener.html`
- `frontend/content/how-to-use-an-automatic-hair-curler.html`
- `frontend/content/how-to-use-flexi-rods.html`
- `frontend/content/how-to-use-heatless-curling-rod.html`
- `frontend/content/how-to-use-spiral-hair-ties.html`
- `frontend/content/invisibobble-original-vs-power-vs-slim.html`
- `frontend/content/parlux-alyon-vs-digitalyon.html`
- `frontend/content/parlux-diffuser-compatibility.html`
- `frontend/content/remington-hydraluxe-pro-vs-proluxe-you-dryer.html`
- `frontend/content/steampod-3-vs-steampod-4.html`
- `frontend/content/t3-aireluxe-vs-featherweight-stylemax.html`
- `frontend/public/diagrams/denman-d3-d38-heads.svg`
- `frontend/public/diagrams/root-vs-section-product-placement.svg`
- `frontend/scripts/check-generated-seo.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/direct-heat-hub.component.ts`
- `frontend/src/app/exact-model-guides.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/seo-route-policy.ts`
- `frontend/src/app/static-page.component.ts`
- `frontend/src/app/wave-method-guides.ts`
- `scripts/seo/release-smoke.ts`

## Monthly review

Review the queue monthly, starting 2026-12-16 for open rows. Capture the strongest current evidence, review previously proposed URL collisions and promote a candidate only after peer overlap review. For a later release, compare the first 28 complete days against the preceding period when a comparable baseline exists. Read impressions, clicks, CTR and position together. Segment by page, query, country and where useful device. Extend the window for very low-volume pages. Refresh when product evidence changes or a visible query exposes an answer gap. Escalate persistent overlap for editorial review and document any later consolidation or redirect decision in the implementation batch.
