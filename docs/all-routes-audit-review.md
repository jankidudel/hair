# All-routes sitemap and indexability audit

Implemented locally on 25 October 2026, following Batch 22. All changes remain unstaged. Nothing was committed or deployed.

## Outcome

The previous sitemap generator combined category and guide registries with a separate static-page allowlist. The router also registered a distinct curling hub and two standalone finders, but that allowlist omitted them. All three delivered complete, self-canonical, indexable initial HTML in the production build. The sitemap now includes their exact existing URLs.

| Set                                   | Count | Evidence                                                                    |
| ------------------------------------- | ----: | --------------------------------------------------------------------------- |
| R: registered concrete pages          |   186 | Actual Angular router plus the published expansion of `/guides/:slug`       |
| G: generated documents                |   186 | Recursive inspection of all built `index.html` files                        |
| L: linked page destinations           |   184 | Anchors from every generated page, with contextual links tracked separately |
| I: intended indexable canonical pages |   184 | Explicit route policy and verified initial HTML                             |
| S: canonical sitemap entries          |   184 | Exact parsed XML membership; increased from 181                             |

`I − S`, `S − I`, `R − G`, and `L − R` are empty. `R − L` contains only `/contact` and `/404`, which are intentionally excluded from search. All intended indexable pages have incoming anchors and are reachable through the homepage/hub graph. There are no duplicate titles/descriptions, invalid H1/canonical counts, empty Related guides shells or broken internal links. Fourteen guides have no contextual article incoming links but have valid hub/navigation discovery; they are not true orphans.

## Every sitemap omission found

| Existing URL                                   | Discovery and direct built evidence                                                                        | Existing incoming navigation                                                                  | Action                                                                                        |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| https://www.combreport.com/curling-irons       | Router, generated document; H1 `Curling irons, wands and barrel sizes`; self-canonical; `index, follow`    | `/flat-irons`: `browse curling tools and methods`                                             | Included exactly once; retained the maintained 25 October substantive revision date           |
| https://www.combreport.com/flat-iron-finder    | Router, generated document, tools index; H1 `Find a Flat Iron Profile`; self-canonical; `index, follow`    | Eight source pages, including `/tools` and `/flat-irons` with `Use the Flat Iron Finder`      | Included exactly once; optional lastmod omitted because no maintained substantive date exists |
| https://www.combreport.com/curling-tool-finder | Router, generated document, tools index; H1 `Find a Curling Tool Profile`; self-canonical; `index, follow` | Nine source pages, including `/tools` and `/curling-irons` with `Use the Curling Tool Finder` | Included exactly once; optional lastmod omitted because no maintained substantive date exists |

https://www.combreport.com/guides/best-curling-irons remains a separate guide and a separate exact sitemap entry. It cannot satisfy the hub's membership assertion. No further indexable omissions were found among all 186 concrete routes. No existing sitemap URL was removed. The necessary incoming placements already exist from Batch 22, so no additional cards or unrelated navigation links were added.

## Explicit exclusions and non-page patterns

| Route or pattern                   | Disposition and repository evidence                                                                                                                                                                                                                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://www.combreport.com/contact | Non-indexable utility. Contact details await owner confirmation; `StaticPageComponent` applies `noindex, nofollow`, removes canonical metadata and omits it from the sitemap. The old inventory incorrectly guessed indexable/sitemap membership for this page; the measured inventory now reflects its actual directives. |
| https://www.combreport.com/404     | Not-found document. `NotFoundPageComponent` applies `noindex, nofollow` and removes the canonical. Excluded from the sitemap. The static `/404` document itself need not have the same transport status as an unknown URL; production unknown-path status must be checked separately.                                      |
| `/guides/:slug`                    | Finite expansion from the existing generated published-article data, backed by the article registry/publication gate. Unknown or unpublished slugs are not additional indexable pages.                                                                                                                                     |
| `/**`                              | Wildcard not-found handler, not an infinite sitemap candidate set.                                                                                                                                                                                                                                                         |
| Product comparisons                | All ten registered researched pairs resolve to already registered published guide paths. There is no separate product-comparison router pattern and no arbitrary product-pair URL generation.                                                                                                                              |
| Product filters and chooser state  | Browser state, not registered canonical paths. The current built graph contains no internal query-state anchors. The auditor preserves and reports query state rather than silently turning it into a new page or stripping it.                                                                                            |

There are no current lazy child-route trees, authentication/private routes, or registered redirect pages. The router reader resolves the current literal tree and fails explicitly on unresolved route expressions or lazy children, rather than silently omitting them.

## Fix and regression protection

`seo-route-policy.ts` supplies typed page type, disposition, canonical, exclusion reason and a modification-date source. Static policies are checked independently against the actual router, and published guides reuse the existing registry-derived generated data. The sitemap is generated from the resulting intended canonical set, without a second sitemap-only allowlist.

The generated SEO gate now fails on an unclassified registered route, an unexplained generated page, missing built output, inappropriate noindex/canonical directives, incomplete initial content, or missing/duplicate/unexpected sitemap entries. It retains the existing content, metadata, internal-link and truthful article-date assertions. A meaningful future-tool router fixture demonstrates that a newly registered page outside a narrow guide list is caught by its exact path. Separate exact assertions cover the curling hub, its buying guide and both standalone finders.

Date handling is source-based. All article `datePublished`, `dateModified`, source-check dates and sitemap dates remain unchanged. Existing explicitly maintained static revision dates are preserved. The previous blanket 20 September fallback had no page-specific revision evidence; optional lastmod was removed for its eight existing static pages rather than perpetuating a guessed date. The two newly included finders also omit lastmod. A supplied date must match the maintained policy and be a real calendar date; the validator no longer requires an invented optional field.

The old inventory wrote guessed static titles, assumed every entry was indexable/in the sitemap, and omitted router-only tools/hubs. `seo:inventory` now uses the same measured built audit as `seo:audit`, preserving the established `reports/seo-url-inventory.json` destination. Its JSON format now contains coverage, findings and per-route records rather than the old incomplete array. No application consumer of the previous report format exists.

## Delivery and production evidence

Reviewed the existing edge implementation and infrastructure configuration: the apex hostname redirects to `https://www.combreport.com`, clean paths rewrite to the matching `index.html`, and missing S3 objects are configured to serve `/404/index.html` with HTTP 404. Those are source-defined behaviors; no infrastructure, edge rewrite, cache, logging or deployment changes were made.

The separate read-only production verifier follows bounded same-site anchors starting from the homepage, hubs, tools/products and known concrete routes. It fetches direct URLs, records redirect chains, response content types and X-Robots-Tag, evaluates robots.txt, reads actual page metadata/content and follows sitemap indexes or compressed child sitemaps within explicit bounds. It checks one clearly nonexistent URL separately. It does not submit forms or create state, and it does not infer a site's health from a failed network request.

Production rechecks in this session were limited: direct requests for the homepage, robots.txt and sitemap failed with DNS access errors. The web retrieval service supplied only cached readable text for the curling finder and could not establish the other requested pages, current response headers or status. Consequently no current production 200, canonical, sitemap coverage, real 404 or post-deployment verification is claimed. `reports/seo-route-audit/production.json` records this limitation; all unknown response fields remain null instead of being reported as local-file HTTP successes.

The supplied pasted attachment could not be read or downloaded. Implementation used the readable named `COMBREPORT_ALL_ROUTES_SITEMAP_AND_INDEXABILITY_AUDIT_HANDOVER.md` from the planning project; the attachment-access limitation was disclosed during the task.

## Validation and reproducibility

Passed:

- Workspace lint and typechecks; focused standalone TypeScript checks for the new coverage, production and regression-test modules.
- All 25 repository script tests, including the four new route-policy/parity regressions.
- Content safety: 164 existing HTML files; no article body edits were required.
- Production build: 186 prerendered routes; asset fingerprinting completed.
- Generated SEO: 162 public guides plus every static route checked against its policy.
- Built route audit and inventory generation: no unexplained local coverage discrepancy.
- Internal links: 186 pages and 4,770 links.
- Formatting and `git diff --check`.

The required stages were run with the existing environment workarounds: `CI=true`, one build worker, and a temporary shell function invoking the same tsx scripts through `node --import tsx`. No dependency versions or framework configuration were changed to work around local IPC/cache restrictions. The broad frontend tool suite had already passed for Batch 22; this task changes sitemap generation and audit checks, not tool behavior.

After building, reproduce the machine-readable report with:

```sh
npm run seo:audit
```

After deployment, from a network-enabled environment:

```sh
npm run seo:verify-production
```

The inventory contains route IDs, category, discovery sources, intended disposition/reason, initial metadata/content, generated-output location, exact sitemap entry counts/date source, incoming links/counts, action taken and explicit production limitations. Status, redirect, final URL, header and production robots-access fields remain unverified until actual HTTP verification succeeds. Production observations are stored separately so network failures cannot be confused with build failures.

## Changed files

- `frontend/src/app/seo-route-policy.ts`
- `frontend/scripts/generate-seo.ts`
- `frontend/scripts/check-generated-seo.ts`
- `scripts/seo/route-coverage.ts`
- `scripts/route-coverage.test.ts`
- `scripts/seo/audit-built-routes.ts`
- `scripts/seo/generate-url-inventory.ts`
- `scripts/seo/verify-production-routes.ts`
- `package.json` — audit command aliases only; dependencies and lockfile unchanged.
- `reports/seo-url-inventory.json`
- `reports/seo-route-audit/production.json`
- `docs/README.md`
- `docs/all-routes-audit-review.md`

Generated sitemap/robots files remain generated, ignored build artifacts. Work remains unstaged.

## Added pages

None. These routes already existed.

## Updated pages and sitemap

Existing pages now covered by the sitemap, with their content and routes preserved:

- https://www.combreport.com/curling-irons
- https://www.combreport.com/flat-iron-finder
- https://www.combreport.com/curling-tool-finder

Updated generated discovery document:

- https://www.combreport.com/sitemap.xml

No deployment has been performed. Release verification remains pending. Sitemap completeness improves discovery; it does not establish Google crawling or indexing.
