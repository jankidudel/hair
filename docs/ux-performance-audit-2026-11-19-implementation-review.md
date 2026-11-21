# UX, performance and technical SEO audit: implementation review (19 November 2026)

This review covers the changes made for `COMBREPORT_UX_PERFORMANCE_TECHNICAL_SEO_AUDIT_2026-11-19.md`. Nothing has been deployed, staged or committed, and no URLs, slugs, redirects or canonicals changed.

## Status by audit item

| Item                                                               | Status                                  | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Evidence-box contrast                                              | Implemented                             | Scoped `--evidence-muted: #5f6761` (5.12:1 on `#f2f0eb`, previously 4.48:1) for `.guide-scope-summary` and the definition values. The global `--muted` token is unchanged. No other component uses this panel background.                                                                                                                                                                                                                                                                |
| Directory search first                                             | Implemented                             | The page order is now: intro, full-width **Search guides** (label above, the audit's placeholder, ≥44 px input, visible focus), compact category links, live result count, results, then the routine-builder, brush and troubleshooting panels in a compact "More ways to start" section. **Clear search** appears when there is a query and returns focus to the input. Empty state uses the audit's wording with a clear action. All 248 guide links stay in the server-rendered HTML. |
| Directory card headings                                            | Implemented                             | Directory-only heading scale (about 20–22 px). The featured first card is used only when no query is entered.                                                                                                                                                                                                                                                                                                                                                                            |
| Mobile startup / LCP                                               | Implemented, not field-verified         | See "Performance changes" below.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Shared JS / article copy in bundle                                 | Implemented                             | Article bodies moved out of `main.js` into one lazily loaded chunk per article.                                                                                                                                                                                                                                                                                                                                                                                                          |
| HTML compression                                                   | Code ready, needs infrastructure deploy | Default CloudFront behaviour switches to managed `CachingOptimized`. See "HTML compression" below.                                                                                                                                                                                                                                                                                                                                                                                       |
| Product explorer order                                             | Implemented                             | Short intro with the audit's copy and an adjacent visible disclosure ("Comparisons are based on published manufacturer specifications, not hands-on test results."). Filters and comparison come next; researched pairs and a collapsible **How we compare products** section follow. The "How we compare" link opens and focuses that section in place. `/products` lastmod revised.                                                                                                    |
| Cookie banner                                                      | Implemented                             | Local heading size 1.0625 rem, buttons ≥44 px tall, visible focus outline.                                                                                                                                                                                                                                                                                                                                                                                                               |
| Main-area spacing                                                  | Implemented                             | Top padding now `clamp(2rem, 4.5vw, 3.75rem)` (was up to 6.25 rem); mobile 1.75 rem. Bottom padding is unchanged.                                                                                                                                                                                                                                                                                                                                                                        |
| URL consistency (`/guides/`, `/index.html`, two-hop apex redirect) | Not changed                             | The audit marks these optional. Removing the extra hop would need the HTTPS redirect moved into the CloudFront function.                                                                                                                                                                                                                                                                                                                                                                 |

## Performance changes

1. **Non-destructive hydration.** The app had no `provideClientHydration()`, so Angular threw away and re-rendered every prerendered page at startup. A parser-time check showed the server-sent `/guides` H1 was replaced on bootstrap before this change and is preserved after it. `provideClientHydration(withEventReplay())` is now enabled. All 274 checked routes (the 271 sitemap URLs, `/404`, a query-string variant and an unknown URL) bootstrap without hydration or console errors.
2. **Per-article body chunks.** `generate-content.ts` now also emits:
   - `content-index.generated.ts`: metadata without bodies.
   - `article-bodies.generated.ts` and `article-bodies.generated/<slug>.ts`: one dynamic import per article.

   The browser app imports only the index. The `guides/:slug` route uses `articleHtmlResolver`, so prerendering still waits for, and outputs, the full article. `content.generated.ts` is unchanged for scripts and tests.

3. **Bundle result.** `main.js` went from 2,678,827 to 1,256,322 bytes. Brotli size at maximum quality went from 536 KB to 250 KB. Each article chunk is roughly 2–5 KB compressed.

Local lab comparison of `/guides` against the committed build: headless Chrome via DevTools, 4× CPU, 150 ms RTT, 1.6 Mbit/s, 412 px viewport, median of 3 runs.

| Metric                         |  Before |   After |
| ------------------------------ | ------: | ------: |
| Bytes transferred              |  694 KB |  282 KB |
| Long-task blocking (TBT proxy) |  271 ms |  172 ms |
| Load event                     |   7.5 s |   3.3 s |
| FCP / LCP                      | ~0.38 s | ~0.37 s |

These figures are not Lighthouse scores. Lighthouse could not be run because downloading it was blocked in this session. Real-time throttling did not reproduce the 5.6 s PageSpeed LCP. Lighthouse's simulated throttling counts the earlier 800 KB shared bundle and the re-rendered H1, and both are now addressed. Run three PageSpeed mobile tests after deployment and compare medians against the 90+ / ≤2.5 s target.

### Hydration safeguards

- Event replay adds `jsaction` attributes to anchors that have listeners. Links remain plain `<a href>`. The generated-SEO breadcrumb check now accepts extra attributes after `href`, but still requires a real `<a href>` with the exact label.
- An intermittent hydration error came from the routine builder's `<noscript>`, which contained element children; with scripting on, browsers parse that content as text. That fallback is now bound with `[innerHTML]`, and the no-JavaScript output is unchanged. `scripts/hydration-safety.test.ts` guards both the hydration provider and this pattern.

## HTML compression and AWS cost

CloudFront compresses only when the cache policy enables gzip/Brotli, and the managed `CachingDisabled` policy used for route documents cannot. The default behaviour now uses managed `CachingOptimized`, which is already used for JS/CSS and is compatible with the Free flat-rate plan. The deploy script already uploads HTML and stable files with `no-cache, max-age=0, must-revalidate`. CloudFront therefore keeps them at the edge for at most the policy's 1-second minimum TTL, browsers still revalidate, and no invalidations are needed. The cache key is unchanged: no headers, cookies or query strings.

- **Cost impact:** no new resource, custom cache policy, WAF rule, logging or invalidation. Compression reduces bytes out (`/guides` HTML ≈157 KB → ≈21 KB with Brotli). The 1-second edge reuse can slightly reduce S3 GET requests. A non-hashed object uploaded without `Cache-Control` could be cached for up to the policy's 24-hour default, but the current deploy script sets the header on every file.
- **Deployment:** this needs the infrastructure workflow (CloudFormation distribution update). It has not been deployed and requires your authorisation.

## Validation

- `npm run verify` passed: formatting, lint, types, 120 frontend tests (6 new, for the body split and directory search), API, infrastructure (cache-policy assertion updated) and repository tests, content safety, build, generated SEO (248 guides) and internal links (272 pages, 8,055 links).
- `npm run seo:audit`: 0 broken internal links. `npm run seo:smoke-release -- --artifact-only`: 127 owners, 0 failures. Sitemap: 271 URLs.
- Browser checks (headless Chrome, local static server):
  - Routes: all 274 routes hydrated with no console errors. Guide-to-guide client navigation updates the article.
  - Search: "Airwrap" returns 4 guides. The no-match search shows the empty state. Keyboard Tab → Enter on Clear search restores all 248 guides with focus back in the input.
  - Layout: no horizontal overflow at 375, 390 and 1280 px on `/guides`, `/products` and the checked articles.
  - Contrast fix: the evidence text renders `rgb(95, 103, 97)`.
- Not verified: Lighthouse/PageSpeed scores, field Core Web Vitals, screen-reader announcement of the count, and production compression (requires deployment).

## Pages affected

No pages were added. Updated pages (layout or shared components; content unchanged):

- https://www.combreport.com/guides
- https://www.combreport.com/products
- https://www.combreport.com/hair-tool-routine-builder (no-JavaScript fallback markup moved to a binding; output unchanged)
- All guide pages, via the shared evidence-box contrast, hydration and per-article loading, for example https://www.combreport.com/guides/dyson-airwrap-attachment-compatibility
- Every page, via the shared main spacing and cookie banner
