# Batch 21 implementation review

Implemented locally on 25 October 2026. All work remains unstaged; nothing was committed or deployed.

## Implementation

Five comparison manuscripts use the shared article page. Each has one lead, one Quick answer, a comparison table, three FAQ questions, the supplied Evidence scope, assigned Sources and exactly three Related guides. Registry and slug references supply publication scheduling, breadcrumbs, canonical metadata and sitemap inclusion. Two original responsive SVGs show plate widths and original Curve barrel profiles, with schematic-length qualifications.

The five requested comparison cards appear on the three specified hubs, before their earlier content H2s. Brushes & Combs retains Batch 20’s navigator ahead of the new block. The flat-iron route uses DirectHeatHubComponent rather than StaticPageComponent; its two cards are integrated there. The curling hub’s existing automatic comparison listing also gains the Curve comparison. The guide index includes each article once with its assigned description.

Eight supplied contextual paragraphs were appended to the existing article bodies, before their shared final next-steps navigation. Existing FAQ ordering was preserved. These are body additions, outside evidence, source and FAQ containers; no older sections were reordered.

The SEO checker now HTML-escapes metadata expectations so the supplied Fine & Fragile title and description validate correctly. Its checks also cover the eight contextual additions and both diagrams. Existing FAQ-splitting tests now include the five new pages.

## Editorial and sources

All eleven assigned manufacturer product/support URLs were rechecked on 25 October 2026. No numeric specification changes were required. UK sources remain distinct from Parlux’s international English pages; exact models and generations remain explicit. CLOUD NINE figures are the irons’ qualified masses excluding cords, rather than specifications for advertised gifts. No prices, new product database, ratings or outcome scores were introduced.

To comply with the repository rules, the brush manuscript’s health-related disclaimer was replaced with ordinary grooming copy. The content validator also flags ordinary uses of “treat” and “treating”; affected copy now uses “regard” and “regarding”. No validator thresholds were changed. Source-check dates identify evidence verification, not publication or update dates.

## Validation

Passed:

- Full `npm run verify`: formatting, workspace lint/typechecks/tests, content safety, editorial validation, production build, generated SEO and internal links.
- 76 frontend tests, one API test, four infrastructure tests and 21 repository script tests.
- Production prerender: 186 static routes. Generated SEO: 162 public guides. Internal links: 4,741 links checked.
- Existing `validateStagedGuide` applied directly to all 13 changed/new working-tree HTML sources without staging files.
- Additional rendered-DOM assertions for all five new articles and the three requested hubs: exact metadata, one H1, self-canonical, Article JSON-LD, three FAQ questions, section order, source anchors, exactly three assigned related links, hub-card counts and preserved navigator placement.
- `git diff --check`.

The environment prevents the tsx CLI’s IPC socket and its default Angular disk cache causes a native abort. Verification passed using a temporary Bash function that invokes the same scripts through `node --import tsx`, with `CI=true` and one build worker. No repository scripts, dependencies or validation checks were changed to accommodate the environment.

| Article                                          | Actual validator body words |
| ------------------------------------------------ | --------------------------: |
| ghd-air-vs-helios                                |                         735 |
| parlux-alyon-vs-digitalyon                       |                         765 |
| cloud-nine-original-iron-vs-wide-iron            |                         800 |
| ghd-soft-curl-tong-vs-creative-curl-wand         |                         786 |
| tangle-teezer-ultimate-detangler-vs-fine-fragile |                         769 |

Counts exclude front matter and shared template sections and use the staged validator’s actual expression.

Browser inspection used temporary local copies of the generated HTML with the same compiled CSS and original SVG assets. CLOUD NINE was inspected at 375px and 1280px; its table accepted keyboard focus and horizontal arrow scrolling. The Curve page’s 375px header, table and complete diagram/caption were also inspected. These representative static previews showed readable labels and contained table overflow.

## Remaining release acceptance

The sandbox prevents opening a local HTTP preview port. The static previews deliberately omit JavaScript; they do not verify hydration, cookie-control interactions or full interactive acceptance of all routes at both viewport sizes. Complete those checks against a served preview or the release environment. After the usual deployment, check public HTTP status, metadata, sitemap, diagrams, links and section order before calling the batch deployed.

No AWS action was performed and no infrastructure, caching, logging, security or routing configuration was changed. A normal publication uses existing static hosting and ordinary storage/request/data-transfer usage; no new recurring resource is introduced by this batch.

## Added pages

- https://www.combreport.com/guides/ghd-air-vs-helios
- https://www.combreport.com/guides/parlux-alyon-vs-digitalyon
- https://www.combreport.com/guides/cloud-nine-original-iron-vs-wide-iron
- https://www.combreport.com/guides/ghd-soft-curl-tong-vs-creative-curl-wand
- https://www.combreport.com/guides/tangle-teezer-ultimate-detangler-vs-fine-fragile

## Updated pages

- https://www.combreport.com/guides
- https://www.combreport.com/hair-dryers
- https://www.combreport.com/flat-irons
- https://www.combreport.com/curling-irons
- https://www.combreport.com/brushes-combs
- https://www.combreport.com/guides/how-to-choose-hair-dryer
- https://www.combreport.com/guides/hair-dryer-wattage-guide
- https://www.combreport.com/guides/best-flat-irons
- https://www.combreport.com/guides/flat-iron-plate-width-guide
- https://www.combreport.com/guides/best-curling-irons
- https://www.combreport.com/guides/curling-iron-vs-curling-wand
- https://www.combreport.com/guides/best-detangling-brushes
- https://www.combreport.com/guides/best-brushes-fine-hair

## Changed files

- `docs/batch-21-implementation-review.md`
- `frontend/content/best-brushes-fine-hair.html`
- `frontend/content/best-curling-irons.html`
- `frontend/content/best-detangling-brushes.html`
- `frontend/content/best-flat-irons.html`
- `frontend/content/cloud-nine-original-iron-vs-wide-iron.html`
- `frontend/content/curling-iron-vs-curling-wand.html`
- `frontend/content/flat-iron-plate-width-guide.html`
- `frontend/content/ghd-air-vs-helios.html`
- `frontend/content/ghd-soft-curl-tong-vs-creative-curl-wand.html`
- `frontend/content/hair-dryer-wattage-guide.html`
- `frontend/content/how-to-choose-hair-dryer.html`
- `frontend/content/parlux-alyon-vs-digitalyon.html`
- `frontend/content/tangle-teezer-ultimate-detangler-vs-fine-fragile.html`
- `frontend/public/diagrams/cloud-nine-plate-widths.svg`
- `frontend/public/diagrams/original-ghd-curve-profiles.svg`
- `frontend/scripts/check-generated-seo.ts`
- `frontend/src/app/article-decision-integration.spec.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/direct-heat-hub.component.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/model-comparison-guides.ts`
- `frontend/src/app/static-page.component.ts`
