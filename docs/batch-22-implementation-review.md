# Batch 22 implementation review

Implemented locally on 25 October 2026. Work is unstaged; nothing was committed or deployed.

## Changes

The five requested guide bodies, titles, H1s, descriptions and FAQs were replaced, using the shared article page. Each is labelled Editorial guide, preserves the existing author and URL, has one Quick answer, the supplied evidence scope, rechecked manufacturer sources and exactly three assigned related guides. Unsupported health-related wording and ordinary uses of “treat/treating” were revised to pass the strict editorial checker. No validation limit was lowered.

All five replacement tables retain a scroll hint, keyboard focus and a descriptive accessible name. FAQs, evidence, Sources and related guides remain sibling sections in that order. Sources use a shared introduction and their actual check date, rather than a new publication claim.

The dryer chooser now uses working-section amount rather than strand thickness. Its main goal controls the primary result; priority, optional diffuser fit and section planning supplement it. Travel retains its electrical-rating check. Clear choices restores the specified defaults, clears the result and keeps state local to the instance. Four core guide anchors are present before submission. Initial HTML also selects Medium / A moderate amount / Everyday drying / Airflow control / Not sure correctly without JavaScript.

Product Explorer adds ten exact scoped records and five canonical pairs. No existing exact model/market/variant record matched these additions: existing US, Matte, palm-held and other-variant records were preserved. Parlux uses International English rather than a fabricated US or UK market. New records contain only rechecked non-numerical manufacturer details and null price tiers; All-price includes them and specific price tiers exclude them. Five static comparison anchors use the current H1s. Selection retains the two-model limit and permits the specifically researched tong/wand pair across categories, while rejecting unrelated cross-category pairs. Clear selection removes the selected models.

The existing common Article structured-data headline now follows the visible H1; the description remains the article description. The generated SEO validator checks that correspondence. This template correction affects all existing article URLs without changing their publication or modification dates. No new Review, rating or FAQ schema was added to the rewritten guides.

Empty Related guides shells are suppressed where no related articles exist (87 published guides); a standalone category link remains where the former shell supplied category navigation. Populated related lists and decision navigation remain. Index and category cards reuse the new headings and descriptions through the article model, retaining descriptive single-card anchors.

The methodology page adds the supplied comparison-evidence and date-explanation sections. The flat-iron and curling hubs describe the new editorial selection destinations accurately. The built-page audit also found a missing required curling-guide link on /flat-irons and an existing /curling-irons hub without incoming links; contextual links from /flat-irons now resolve both. No new route, redirect, canonical target or indexability change was introduced.

Sitemap lastmod was updated for the five substantively rewritten articles and the changed static listing/methodology/hub pages only. Other article dates remain unchanged. /curling-irons remains outside the sitemap under the existing route policy.

## Models and source scope

All thirteen supplied manufacturer product pages were rechecked on 25 October 2026. No new numerical specifications were needed. Source-check dates identify that inspection; no unrelated product records were bulk-refreshed.

| Pair                 | New record slugs                                                                               | Market                | Canonical comparison                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| ghd dryers           | ghd-air-uk; ghd-helios-black-uk                                                                | UK                    | https://www.combreport.com/guides/ghd-air-vs-helios                                |
| Parlux dryers        | parlux-alyon-international; parlux-digitalyon-international                                    | International English | https://www.combreport.com/guides/parlux-alyon-vs-digitalyon                       |
| CLOUD NINE irons     | cloud-nine-original-iron-uk; cloud-nine-wide-iron-uk                                           | UK                    | https://www.combreport.com/guides/cloud-nine-original-iron-vs-wide-iron            |
| Original Curve tools | ghd-curve-soft-curl-tong-uk; ghd-curve-creative-curl-wand-uk                                   | UK                    | https://www.combreport.com/guides/ghd-soft-curl-tong-vs-creative-curl-wand         |
| Handled brushes      | tangle-teezer-ultimate-detangler-standard-uk; tangle-teezer-ultimate-detangler-fine-fragile-uk | UK                    | https://www.combreport.com/guides/tangle-teezer-ultimate-detangler-vs-fine-fragile |

## Validation

All required verification stages passed after the corrections, with the failing test and remaining verification stages rerun after each relevant fix:

- Formatting, workspace lint and typechecks.
- 76 frontend tests, one API test, four infrastructure tests and 21 repository script tests.
- Content safety: 164 HTML files; editorial-target validation passed with existing advisory warnings, without changing thresholds.
- Existing staged-body validator applied directly to all five unstaged sources, preserving the unstaged handoff.
- Production build: 186 prerendered routes; generated SEO: 162 public guides.
- Internal links: 186 generated pages and 4,770 internal links.
- Built-route audit: zero duplicate titles/descriptions, missing or multiple H1/canonical defects, missing sitemap or registry documents, broken internal links, empty Related guides shells or all-internal orphaned indexable pages.
- Initial-HTML dryer defaults verified against the generated document. Static guide/comparison links and exact FAQ/evidence/source/related ordering are covered by generated SEO validation.
- Batch 20 navigator, Batch 21 comparisons and diagrams, and the Bobby Pins H2 remain covered by the existing checks.
- git diff --check.

The broader tests caught the missing table accessibility attributes and an old comparison-link test fixed to 11 October. Table accessibility was restored. That test now evaluates the full registered comparison set once its latest comparison is published; publication-gate behavior and separate future-draft tests remain intact.

The environment blocks the tsx CLI IPC socket, and Angular's default local disk cache causes a native abort. The same npm scripts were run with a temporary Bash tsx function invoking node --import tsx, CI=true and one worker. No repository scripts or dependencies were changed for those environment workarounds.

| Guide                    | Actual staged-validator body words |
| ------------------------ | ---------------------------------: |
| how-to-choose-hair-dryer |                                674 |
| best-flat-irons          |                                705 |
| best-curling-irons       |                                717 |
| best-detangling-brushes  |                                737 |
| best-brushes-fine-hair   |                                745 |

Counts exclude front matter and shared sources/evidence/navigation. The table-accessibility hint is visible body text; none of the guides depends on it to meet the 500-word gate.

## Reproducible inventory and remaining checks

Run after building:

```sh
node --import tsx scripts/seo/audit-built-routes.ts reports/batch-22-built-route-audit.json
```

The accompanying JSON records all 186 built routes, published-registry membership, document status, title, description, H1s, canonicals, robots, schema types, sitemap membership, incoming links from all internal pages and incoming contextual article links. Homepage slash variants are normalized. HTTP status is deliberately null: a local generated file is not evidence of a live 200 or correct production 404 response.

Fourteen guides have no incoming contextual article links, while still having valid incoming hub/navigation links. These are not reported as true orphans, and no arbitrary link block was added. Helper/non-sitemap routes are reported separately. Full details are in reports/batch-22-built-route-audit.json.

No current Comb Report GSC export was found or supplied; private search performance, Google-selected canonicals and indexing states remain unverified. No indexing improvement is promised.

The local initial HTML was inspected through browser accessibility, which exposed and led to the no-JavaScript default-selection correction. Reliable mobile/desktop screenshot inspection could not be completed through the active browser, so 375px/1280px visual layout, horizontal-overflow and focus-state QA remains pending. No visual pass is claimed.

Deployment and public release verification remain pending: status/real 404 responses, initial HTML, live chooser/selection behavior, pair links, sitemap dates and mobile/desktop layout. Record the actual release date when deployed. Compare the same five core guides over equal 28-day GSC windows once sufficient post-release data exists. No infrastructure or deployment changes were made and no AWS resources were provisioned.

## Changed files

- docs/batch-22-implementation-review.md
- frontend/content/best-brushes-fine-hair.html
- frontend/content/best-curling-irons.html
- frontend/content/best-detangling-brushes.html
- frontend/content/best-flat-irons.html
- frontend/content/how-to-choose-hair-dryer.html
- frontend/scripts/check-generated-seo.ts
- frontend/scripts/generate-seo.ts
- frontend/src/app/article-decision-integration.spec.ts
- frontend/src/app/article-page.component.ts
- frontend/src/app/core-guide-quality.ts
- frontend/src/app/direct-heat-hub.component.ts
- frontend/src/app/guide-evidence.ts
- frontend/src/app/guide-link-map.ts
- frontend/src/app/hair-dryer-finder.component.spec.ts
- frontend/src/app/hair-dryer-finder.component.ts
- frontend/src/app/hair-dryer-recommendation.spec.ts
- frontend/src/app/hair-dryer-recommendation.ts
- frontend/src/app/product-comparisons.spec.ts
- frontend/src/app/product-comparisons.ts
- frontend/src/app/product-explorer.component.spec.ts
- frontend/src/app/product-explorer.component.ts
- frontend/src/app/static-page.component.ts
- reports/batch-22-built-route-audit.json
- scripts/check-staged-content.test.ts
- scripts/seo/audit-built-routes.ts

## Added pages

None.

## Updated pages

Primary editorial/tool/hub updates and regenerated descriptive category cards:

- https://www.combreport.com/guides/how-to-choose-hair-dryer
- https://www.combreport.com/guides/best-flat-irons
- https://www.combreport.com/guides/best-curling-irons
- https://www.combreport.com/guides/best-detangling-brushes
- https://www.combreport.com/guides/best-brushes-fine-hair
- https://www.combreport.com/products
- https://www.combreport.com/guides
- https://www.combreport.com/testing-research-methodology
- https://www.combreport.com/hair-dryers
- https://www.combreport.com/brushes-combs
- https://www.combreport.com/flat-irons
- https://www.combreport.com/curling-irons

All existing articles also receive the common structured-data headline correction; qualifying empty navigation shells are removed through the shared template. This complete affected-article URL list includes the five primary rewrites above:

- https://www.combreport.com/guides/babyliss-air-style-1000-vs-flawless-volume
- https://www.combreport.com/guides/best-brushes-curly-hair
- https://www.combreport.com/guides/best-brushes-fine-hair
- https://www.combreport.com/guides/best-brushes-thick-hair
- https://www.combreport.com/guides/best-curling-irons
- https://www.combreport.com/guides/best-curling-irons-fine-hair
- https://www.combreport.com/guides/best-curling-tools-long-hair
- https://www.combreport.com/guides/best-curling-tools-short-hair
- https://www.combreport.com/guides/best-detangling-brushes
- https://www.combreport.com/guides/best-flat-irons
- https://www.combreport.com/guides/best-flat-irons-fine-hair
- https://www.combreport.com/guides/best-flat-irons-thick-hair
- https://www.combreport.com/guides/best-hair-brush-for-short-hair
- https://www.combreport.com/guides/best-hair-dryer-for-short-hair
- https://www.combreport.com/guides/best-hair-dryers-curly-hair
- https://www.combreport.com/guides/best-hair-dryers-fine-hair
- https://www.combreport.com/guides/best-hair-dryers-thick-hair
- https://www.combreport.com/guides/best-heat-protectants
- https://www.combreport.com/guides/best-heatless-curling-sets
- https://www.combreport.com/guides/best-hot-air-brush-for-thick-hair
- https://www.combreport.com/guides/best-hot-air-brushes
- https://www.combreport.com/guides/best-hot-air-brushes-fine-hair
- https://www.combreport.com/guides/best-hot-air-brushes-short-hair
- https://www.combreport.com/guides/best-leave-in-conditioners-dry-hair
- https://www.combreport.com/guides/best-microfibre-hair-towels
- https://www.combreport.com/guides/best-travel-flat-irons
- https://www.combreport.com/guides/best-travel-hair-dryers
- https://www.combreport.com/guides/boar-bristle-brush-guide
- https://www.combreport.com/guides/boar-bristle-vs-nylon-brush
- https://www.combreport.com/guides/bobby-pins-vs-u-shaped-hair-pins
- https://www.combreport.com/guides/can-you-use-detangling-brush-for-blow-drying
- https://www.combreport.com/guides/can-you-use-hot-air-brush-on-dry-hair
- https://www.combreport.com/guides/ceramic-vs-titanium-flat-irons
- https://www.combreport.com/guides/cloud-nine-original-iron-vs-wide-iron
- https://www.combreport.com/guides/cold-water-for-hair
- https://www.combreport.com/guides/corded-vs-cordless-hair-straighteners
- https://www.combreport.com/guides/curl-cream-vs-leave-in-conditioner
- https://www.combreport.com/guides/curl-defining-brush-vs-detangling-brush
- https://www.combreport.com/guides/curling-iron-barrel-size-guide
- https://www.combreport.com/guides/curling-iron-leaves-crease
- https://www.combreport.com/guides/curling-iron-vs-curling-wand
- https://www.combreport.com/guides/denman-d3-vs-d4
- https://www.combreport.com/guides/dyson-airwrap-vs-shark-flexstyle
- https://www.combreport.com/guides/dyson-supersonic-vs-shark-speedstyle
- https://www.combreport.com/guides/fixed-vs-adjustable-temperature-hair-straighteners
- https://www.combreport.com/guides/flat-iron-plate-width-guide
- https://www.combreport.com/guides/flat-iron-snagging-hair
- https://www.combreport.com/guides/flat-iron-vs-curling-iron-for-curls
- https://www.combreport.com/guides/flat-iron-vs-hot-air-brush
- https://www.combreport.com/guides/flexi-rods-vs-foam-rollers
- https://www.combreport.com/guides/flexible-vs-strong-hold-hairspray
- https://www.combreport.com/guides/ghd-air-vs-helios
- https://www.combreport.com/guides/ghd-chronos-vs-chronos-max
- https://www.combreport.com/guides/ghd-chronos-vs-platinum-plus
- https://www.combreport.com/guides/ghd-gold-vs-platinum-plus
- https://www.combreport.com/guides/ghd-rise-vs-glide-plus
- https://www.combreport.com/guides/ghd-soft-curl-tong-vs-creative-curl-wand
- https://www.combreport.com/guides/hair-brush-vs-comb
- https://www.combreport.com/guides/hair-dryer-diffuser-compatibility
- https://www.combreport.com/guides/hair-dryer-diffuser-vs-concentrator
- https://www.combreport.com/guides/hair-dryer-heat-and-speed-settings-guide
- https://www.combreport.com/guides/hair-dryer-takes-too-long
- https://www.combreport.com/guides/hair-dryer-wattage-guide
- https://www.combreport.com/guides/hair-elastics-vs-scrunchies
- https://www.combreport.com/guides/hair-mousse-vs-gel
- https://www.combreport.com/guides/hair-roller-size-guide
- https://www.combreport.com/guides/hair-serum-vs-hair-oil
- https://www.combreport.com/guides/hair-styling-product-order
- https://www.combreport.com/guides/heat-protectant-spray-vs-cream
- https://www.combreport.com/guides/heated-rollers-vs-self-grip-rollers
- https://www.combreport.com/guides/heatless-curls-not-working
- https://www.combreport.com/guides/hot-air-brush-barrel-size-guide
- https://www.combreport.com/guides/hot-air-brush-frizzy-hair
- https://www.combreport.com/guides/hot-air-brush-vs-curling-iron
- https://www.combreport.com/guides/hot-air-brush-vs-hair-dryer
- https://www.combreport.com/guides/hot-air-brush-vs-hair-dryer-and-round-brush
- https://www.combreport.com/guides/hot-air-brush-vs-straightening-brush
- https://www.combreport.com/guides/how-often-should-you-wash-your-hair
- https://www.combreport.com/guides/how-to-apply-gel-to-curly-hair
- https://www.combreport.com/guides/how-to-apply-hair-mousse
- https://www.combreport.com/guides/how-to-apply-hair-pomade
- https://www.combreport.com/guides/how-to-blow-dry-a-bob-with-a-round-brush
- https://www.combreport.com/guides/how-to-blow-dry-hair
- https://www.combreport.com/guides/how-to-blow-dry-long-hair-with-a-round-brush
- https://www.combreport.com/guides/how-to-choose-a-hair-barrette
- https://www.combreport.com/guides/how-to-choose-a-straightening-brush
- https://www.combreport.com/guides/how-to-choose-claw-clip-size
- https://www.combreport.com/guides/how-to-choose-hair-brush
- https://www.combreport.com/guides/how-to-choose-hair-dryer
- https://www.combreport.com/guides/how-to-choose-hair-sectioning-clips
- https://www.combreport.com/guides/how-to-choose-hair-tool-heat-mat-and-pouch
- https://www.combreport.com/guides/how-to-choose-multi-styler-attachments
- https://www.combreport.com/guides/how-to-clean-a-curling-iron-or-wand
- https://www.combreport.com/guides/how-to-clean-a-hair-brush
- https://www.combreport.com/guides/how-to-clean-a-hair-comb
- https://www.combreport.com/guides/how-to-clean-hair-dryer-filter
- https://www.combreport.com/guides/how-to-clean-hair-scrunchies
- https://www.combreport.com/guides/how-to-clean-hair-straightener-plates
- https://www.combreport.com/guides/how-to-clean-hot-air-brush
- https://www.combreport.com/guides/how-to-curl-hair-with-a-flat-iron
- https://www.combreport.com/guides/how-to-diffuse-wavy-hair
- https://www.combreport.com/guides/how-to-get-root-volume-with-a-round-brush
- https://www.combreport.com/guides/how-to-plop-hair
- https://www.combreport.com/guides/how-to-section-hair-for-styling
- https://www.combreport.com/guides/how-to-use-a-curl-defining-brush
- https://www.combreport.com/guides/how-to-use-a-curling-iron
- https://www.combreport.com/guides/how-to-use-a-curling-wand
- https://www.combreport.com/guides/how-to-use-a-flat-iron
- https://www.combreport.com/guides/how-to-use-a-french-hair-pin
- https://www.combreport.com/guides/how-to-use-a-hair-dryer-diffuser
- https://www.combreport.com/guides/how-to-use-a-hair-pick
- https://www.combreport.com/guides/how-to-use-a-hot-air-brush-on-fine-hair
- https://www.combreport.com/guides/how-to-use-a-hot-air-brush-on-long-hair
- https://www.combreport.com/guides/how-to-use-a-hot-air-brush-on-short-hair
- https://www.combreport.com/guides/how-to-use-a-microfibre-hair-towel
- https://www.combreport.com/guides/how-to-use-a-round-brush-with-a-hair-dryer
- https://www.combreport.com/guides/how-to-use-a-straightening-brush
- https://www.combreport.com/guides/how-to-use-a-straightening-brush-on-short-hair
- https://www.combreport.com/guides/how-to-use-a-wide-tooth-comb
- https://www.combreport.com/guides/how-to-use-bobby-pins
- https://www.combreport.com/guides/how-to-use-flexi-rods
- https://www.combreport.com/guides/how-to-use-hair-dryer-concentrator-nozzle
- https://www.combreport.com/guides/how-to-use-hairspray
- https://www.combreport.com/guides/how-to-use-heated-hair-rollers
- https://www.combreport.com/guides/how-to-use-heatless-curlers-on-short-hair
- https://www.combreport.com/guides/how-to-use-heatless-curling-rod
- https://www.combreport.com/guides/how-to-use-hot-air-brush
- https://www.combreport.com/guides/how-to-use-sea-salt-spray
- https://www.combreport.com/guides/how-to-use-snap-closure-foam-rollers
- https://www.combreport.com/guides/how-to-use-velcro-hair-rollers
- https://www.combreport.com/guides/how-to-wash-a-satin-bonnet
- https://www.combreport.com/guides/ionic-vs-ceramic-hair-dryer
- https://www.combreport.com/guides/microfiber-hair-towel-vs-cotton-t-shirt
- https://www.combreport.com/guides/olivia-garden-ceramic-ion-vs-nanothermic
- https://www.combreport.com/guides/parlux-alyon-vs-digitalyon
- https://www.combreport.com/guides/plug-adapter-vs-voltage-converter-hair-tools
- https://www.combreport.com/guides/pomade-vs-hair-clay
- https://www.combreport.com/guides/revlon-one-step-volumizer-vs-plus
- https://www.combreport.com/guides/rotating-vs-fixed-hot-air-brush
- https://www.combreport.com/guides/round-brush-size-guide
- https://www.combreport.com/guides/round-brush-stuck-in-hair
- https://www.combreport.com/guides/round-brush-vs-paddle-brush
- https://www.combreport.com/guides/satin-bonnet-vs-satin-pillowcase
- https://www.combreport.com/guides/sea-salt-spray-vs-texturising-spray
- https://www.combreport.com/guides/silk-vs-satin-pillowcase-hair
- https://www.combreport.com/guides/straightening-brush-vs-flat-iron
- https://www.combreport.com/guides/styling-tool-troubleshooting
- https://www.combreport.com/guides/tail-comb-vs-wide-tooth-comb
- https://www.combreport.com/guides/tangle-teezer-ultimate-detangler-vs-fine-fragile
- https://www.combreport.com/guides/tangle-teezer-ultimate-detangler-vs-wet-brush-original
- https://www.combreport.com/guides/tapered-vs-cylindrical-curling-wand
- https://www.combreport.com/guides/thermal-brush-vs-hot-air-brush
- https://www.combreport.com/guides/travel-hair-brush-formats
- https://www.combreport.com/guides/velcro-vs-foam-hair-rollers
- https://www.combreport.com/guides/vented-brush-vs-paddle-brush
- https://www.combreport.com/guides/what-hair-tools-do-i-need
- https://www.combreport.com/guides/what-is-the-grey-fuzz-on-my-hairbrush
- https://www.combreport.com/guides/when-to-replace-hairbrush-or-comb
- https://www.combreport.com/guides/why-curls-fall-out
- https://www.combreport.com/guides/why-your-blowout-does-not-last
- https://www.combreport.com/guides/wide-tooth-comb-vs-detangling-brush
- https://www.combreport.com/guides/wide-vs-narrow-hair-dryer-concentrator
