# Comb Report Batch 15 implementation report

Source check date: 18 October 2026.

Status: implemented and verified locally. All changes remain unstaged. No commit, push, pull request or deployment has been made. The new production URLs below are release destinations, not claims that Batch 15 is already live.

## Batch 14 verification

Corrected: Batch 14 source integration was incomplete; the missing integrations are included in this release.

The existing DecisionSnapshot, EvidenceScope and UpgradeCheck render on a direct production load of `/guides/ghd-chronos-vs-platinum-plus`. The production homepage and Hair Accessories hub expose the existing journeys. Direct production inspection confirmed that `/tools` still used Choose / Use / Check a specification. This release changes the last group to Fix while retaining its existing specification decoder. No second version of a Batch 14 component was created. The statement above is ready to copy into a future pull request under the same heading.

## Implementation

Four registry-backed HTML guides use the shared article page. Exact titles, descriptions, openings, steps, troubleshooting copy and FAQs follow the supplied handoff. The foam-roller FAQ uses “regard” instead of “treat” to pass the repository's health-language checker. Every page has one H1, an absolute self-canonical, a visible breadcrumb matching its structured breadcrumb, and Article metadata. These four pages do not emit FAQPage, HowTo, Product, Review or rating schema.

The exact opening appears under the H1, followed by the existing byline and DecisionSnapshot. The article body is followed by FAQ, EvidenceScope, annotated manufacturer sources and curated related guides. CleanInspectStop is a single Angular component inserted after the cleaning sequence on both care pages and immediately before “When to seek support” on the existing snagging page. Its safety copy is fixed; only heading level and an optional class are configurable.

The two hubs have the specified method/care sections. Registry data controls guide ordering. All previous canonical slugs remain, including disabled/scheduled entries; the published guide count increases from 128 to 132. The existing curling hub also picks up the new barrel-care guide through its current category data.

The new article tables wrap their columns at narrow widths. The safety table wraps without a minimum-width overflow. Existing table behavior elsewhere remains as before. Related-guide links use ordinary HTML destinations, and the requested steps, safety guidance, FAQs, evidence and links are present in generated static HTML.

The existing consent-gated analytics service handles `guide_task_link_click` with fixed task-group/destination-type values and `care_stop_guidance_view` with a fixed tool-family value. The latter is observed once per page instance when the shared safety section enters the viewport. No article text, model names, reader answers or query strings are passed. Events are suppressed without analytics consent.

## Evidence and deliberate omissions

- Flexi rods: official Annie 01291 and Kitsch Eucalyptus Velvet XL directions; preparation and fastening differences remain specific to those sets. Kitsch's extra scrunchie step is identified in its source note.
- Snap-closure foam rollers: Annie 01065 Jumbo Foam Rollers and RED by KISS HRS06. Detailed official directions are sparse, so the sequence is labelled as editorial workflow guidance. The RED by KISS official indexed description established foam construction and snap closure; its full page was unavailable to the research fetcher, and this limitation is visible in the source note.
- Straightener care: Conair CS225 and BaBylissPRO BNT137 manuals plus model-specific ghd Unplugged support. The ghd damp-cloth permission remains explicitly model-specific.
- Curling-tool care: Conair CD851 and CD123 manuals plus the BaBylissPRO BABNT75SN(MN) series manual.
- All source records include model, market, URL, checked date and the boundary they support in `guide-evidence.ts`.
- No universal chemical, moisture level, temperature, dwell time, roller count, curl longevity, performance ranking or first-party test claim was added. Marketing promises in manufacturer listings were not adopted.
- No fourth straightener-related card was invented: a general hair-tool replacement page does not exist. The existing brush/comb replacement page is a different task.
- No new tool, calculator, redirect, alias, stock image, dependency, infrastructure resource or privacy-policy change was added.

## Validation

- Full `npm run verify` passed: formatting, lint, all workspace type checks and tests, content safety, editorial checks, production build, generated SEO and internal links. Editorial checks retain advisory word-count and legacy metadata warnings; the handoff copy was not padded to reach an advisory target.
- Angular tests include the shared safety component, guide data, evidence summary and analytics consent/revocation/query stripping.
- The generated SEO gate now checks the four guides' static ordered steps, safety-component presence, identical safety copy across all three uses, section order, source links, hub/index links and absence of extra schema types. The existing gate checks all public metadata, one H1, canonicals, breadcrumbs and sitemap uniqueness.
- All nine new/edited HTML sources pass the source-level publication gate, including its 500-word hard minimum and internal-link validation.
- All 129 existing canonical slug constants are retained; four are added. No route or canonical was retired.
- The production build generates 156 static routes and 132 public guides. Internal-link validation checks 3,895 links.
- Browser layout checks covered all four new guides, `/hair-accessories`, `/flat-irons` and `/guides` at widths 320, 390, 768 and 1440. No document overflow or new-table horizontal overflow was found. Mobile safety content and desktop hub cards were visually inspected.
- A new hub card opened its guide; a related-guide cross-link opened the foam method; direct load and refresh retained its correct H1/title. Keyboard Tab reached a link with a visible solid focus outline.
- Native browser accessibility inspection exposed the ordered lists and tables; table markup has column header scopes. A separate VoiceOver/NVDA speech run was not performed. The no-JavaScript guarantee was checked against complete generated HTML, rather than a browser JavaScript-disable setting.
- Reduced-motion styling already disables unnecessary transitions globally; these additions introduce no animation.
- Production acceptance for Batch 15 remains pending deployment. Only Batch 14 baseline pages were inspected live.

## Added pages

These are canonical production destinations for the locally completed release:

- https://www.combreport.com/guides/how-to-use-flexi-rods
- https://www.combreport.com/guides/how-to-use-snap-closure-foam-rollers
- https://www.combreport.com/guides/how-to-clean-hair-straightener-plates
- https://www.combreport.com/guides/how-to-clean-a-curling-iron-or-wand

## Updated pages

- https://www.combreport.com/hair-accessories
- https://www.combreport.com/flat-irons
- https://www.combreport.com/curling-irons
- https://www.combreport.com/guides
- https://www.combreport.com/tools
- https://www.combreport.com/guides/velcro-vs-foam-hair-rollers
- https://www.combreport.com/guides/how-to-use-velcro-hair-rollers
- https://www.combreport.com/guides/hair-roller-size-guide
- https://www.combreport.com/guides/flat-iron-snagging-hair
- https://www.combreport.com/guides/curling-iron-leaves-crease

## Files created

- `frontend/content/how-to-use-flexi-rods.html`
- `frontend/content/how-to-use-snap-closure-foam-rollers.html`
- `frontend/content/how-to-clean-hair-straightener-plates.html`
- `frontend/content/how-to-clean-a-curling-iron-or-wand.html`
- `frontend/src/app/clean-inspect-stop.component.ts`
- `frontend/src/app/clean-inspect-stop.component.css`
- `frontend/src/app/clean-inspect-stop.component.spec.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/analytics/analytics.service.spec.ts`
- `COMBREPORT_BATCH_15_IMPLEMENTATION_REPORT.md`

## Files modified

- `frontend/content/curling-iron-leaves-crease.html`
- `frontend/content/flat-iron-snagging-hair.html`
- `frontend/content/hair-roller-size-guide.html`
- `frontend/content/how-to-use-velcro-hair-rollers.html`
- `frontend/content/velcro-vs-foam-hair-rollers.html`
- `frontend/scripts/check-generated-seo.ts`
- `frontend/scripts/generate-seo.ts`
- `frontend/src/app/article-decision-integration.spec.ts`
- `frontend/src/app/article-page.component.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/content.spec.ts`
- `frontend/src/app/decision-components.spec.ts`
- `frontend/src/app/decision-snapshot.component.css`
- `frontend/src/app/decision-snapshot.component.ts`
- `frontend/src/app/decision-support.ts`
- `frontend/src/app/direct-heat-hub.component.ts`
- `frontend/src/app/evidence-scope.component.css`
- `frontend/src/app/evidence-scope.component.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/static-page.component.ts`
- `frontend/src/styles.css`

Generated content, sitemap and build output are regenerated by the existing pipeline and are ignored by Git.

## Release authorization and AWS cost assessment

No infrastructure or caching policy change is required. Publishing with the existing frontend asset script incurs S3 upload/request charges and storage for the new content-addressed assets, followed by normal CloudFront request and data-transfer usage as visitors load them. The script retains older hashed assets, so storage may grow slightly. It does not issue CloudFront invalidations. This batch creates no WAF, log, managed custom-resource or other recurring AWS resource charges. No exact bill estimate is asserted because traffic and account pricing/allowances were not inspected.

AGENTS.md requires explicit authorization before a cost-affecting deployment. Publishing and direct production acceptance remain the final release steps after that authorization. No Git staging or commit is required or authorized by this report.
