# Batch 20 implementation review

Implemented locally on 24 October 2026. All changes are unstaged. Nothing was committed or deployed. Production build and browser acceptance remain pending.

## Implemented

Five supplied manuscripts use the shared article page, existing Quick answer, inline FAQ splitting, evidence/source data and three related links. Registry entries generate category breadcrumbs, canonical metadata, publication scheduling and sitemap entries. Two original SVGs illustrate parking/working sections and fabric handling.

The reusable anchor-only navigator appears once on each requested hub, before the first existing H2. New guides are excluded from the hubs' automatic lower card sections to avoid duplicate cards. The guide index retains its existing category-labelled grid and lists every new guide once with the assigned description.

All eight contextual paragraphs render through `guide-contextual-integrations.ts`, immediately before the existing Related guides or Continue from this decision navigation. They remain outside FAQ, evidence and sources; the individual article HTML files do not need duplicate paragraph markup.

No dependencies, redirects, indexed tool routes or infrastructure were added. No AWS operations were performed.

## Copy and sources

All seven manufacturer URLs were rechecked on 24 October 2026. Their methods and exclusions support the named examples. The Hair Pick page explicitly excludes detangling and heat; no dry-hair instruction was inferred. Source dates identify evidence checks, not public publication/update dates.

The content checker flags ordinary uses of “treating” and “treatment”. The comb guide now says “adopting another person’s routine”; the pick introduction says “assuming every long-toothed tool”; the plopping evidence omits “treatment benefit”, and its final FAQ says “shower-cap routine”. No validator was relaxed and no body was expanded to meet a threshold.

## Validation

Passed:

- Content safety for all 159 HTML sources, using `node --import tsx scripts/check-content.ts` (the npm script's tsx CLI cannot open its IPC socket in this session).
- Existing unmodified `validateStagedGuide` against the five working files without staging them.
- Editorial-target validation; its existing advisory warnings remain, including the 800-word target and its front-matter-only FAQ counter.
- Frontend TypeScript checking, ESLint, Prettier and `git diff --check`.
- Angular compiler template checks and AOT emission to a temporary directory.
- All 76 existing frontend tests against that AOT output, using temporary Vitest/TestBed configuration outside the repository.
- All 21 repository script tests.
- Sixteen additional temporary rendered-DOM checks: all five articles' title/description/canonical/robots, Article and BreadcrumbList JSON-LD, one H1 and Quick answer, three FAQ questions, FAQ → Evidence scope → Sources → Related guides order, exactly three related anchors, eight exact contextual integrations, both single-instance hub navigators, and the guide-index links/descriptions.
- Each new canonical appears exactly once in the generated sitemap. Existing Batch 19 content and Bobby Pins H2 regression tests pass.

| Guide                            | HTML body words |
| -------------------------------- | --------------: |
| how-to-section-hair-for-styling  |             694 |
| how-to-use-a-wide-tooth-comb     |             654 |
| how-to-use-a-curl-defining-brush |             650 |
| how-to-use-a-hair-pick           |             651 |
| how-to-plop-hair                 |             700 |

These counts use the staged validator's exact expression and exclude front matter and shared components.

## Pending release checks

The normal Angular production build and test builder abort with exit 134. Attempts with serial compilation, disabled optimisation and a separate installed Node runtime also failed. One attempt reported an esbuild deadlock; a native crash report records an invalid-memory-free abort. The independent Angular compiler and compiled test results above do not constitute a successful production build.

The session also denies opening a local HTTP preview port. Consequently, the production-generated SEO/internal-link checks, true initial-HTML delivery, JavaScript-disabled keyboard navigation and 375px/1280px visual checks of diagrams, tables, cards, navigation and cookie controls remain pending. The browser also blocks local-file preview URLs. No mobile testing is claimed from the DOM checks.

Before release, run `npm run verify` in a working build environment and finish those viewport/keyboard checks. After the normal deployment, verify production statuses, metadata, diagrams, sitemap and integrations. No deployment has been attempted here.

## Changed files

- `frontend/content/how-to-section-hair-for-styling.html`
- `frontend/content/how-to-use-a-wide-tooth-comb.html`
- `frontend/content/how-to-use-a-curl-defining-brush.html`
- `frontend/content/how-to-use-a-hair-pick.html`
- `frontend/content/how-to-plop-hair.html`
- `frontend/public/diagrams/parked-and-working-sections.svg`
- `frontend/public/diagrams/fabric-handling-methods.svg`
- `frontend/src/app/article-slug.ts`
- `frontend/src/app/article-registry.ts`
- `frontend/src/app/decision-support.ts`
- `frontend/src/app/guide-evidence.ts`
- `frontend/src/app/guide-link-map.ts`
- `frontend/src/app/handling-guides.ts`
- `frontend/src/app/handling-routine-navigator.component.ts`
- `frontend/src/app/handling-routine-navigator.component.css`
- `frontend/src/app/guide-contextual-integrations.ts`
- `frontend/src/app/article-page.component.ts`
- `frontend/src/app/static-page.component.ts`
- `frontend/src/app/published-guide-route.spec.ts`
- `frontend/src/app/article-decision-integration.spec.ts`
- `docs/batch-20-implementation-review.md`

## Added pages (production destinations, not deployed)

- https://www.combreport.com/guides/how-to-section-hair-for-styling
- https://www.combreport.com/guides/how-to-use-a-wide-tooth-comb
- https://www.combreport.com/guides/how-to-use-a-curl-defining-brush
- https://www.combreport.com/guides/how-to-use-a-hair-pick
- https://www.combreport.com/guides/how-to-plop-hair

## Updated pages (production destinations, not deployed)

- https://www.combreport.com/brushes-combs
- https://www.combreport.com/hair-accessories
- https://www.combreport.com/guides
- https://www.combreport.com/guides/how-to-choose-hair-sectioning-clips
- https://www.combreport.com/guides/wide-tooth-comb-vs-detangling-brush
- https://www.combreport.com/guides/curl-defining-brush-vs-detangling-brush
- https://www.combreport.com/guides/denman-d3-vs-d4
- https://www.combreport.com/guides/best-brushes-curly-hair
- https://www.combreport.com/guides/how-to-use-a-microfibre-hair-towel
- https://www.combreport.com/guides/microfiber-hair-towel-vs-cotton-t-shirt
- https://www.combreport.com/guides/how-to-apply-gel-to-curly-hair
