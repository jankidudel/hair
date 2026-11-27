import type { ArticleSummary as Article } from './content-index.generated';

export const canonicalOrigin = 'https://www.combreport.com';
export interface SeoRoutePolicy {
  readonly path: string;
  readonly id: string;
  readonly pageType:
    | 'home'
    | 'hub'
    | 'tool'
    | 'policy'
    | 'author'
    | 'guide'
    | 'utility'
    | 'not-found';
  readonly disposition:
    'indexable-canonical' | 'non-indexable-utility' | 'not-found';
  readonly reason: string;
  readonly canonical: string | null;
  readonly lastmod?: string;
  readonly lastmodSource: string;
  readonly category?: string;
}
const page = (
  path: string,
  pageType: SeoRoutePolicy['pageType'],
  lastmod?: string,
  revision?: string,
): SeoRoutePolicy => ({
  path,
  id: `page:${path}`,
  pageType,
  disposition: 'indexable-canonical',
  reason:
    'Public, self-canonical page; no intentional search exclusion is documented.',
  canonical: canonicalOrigin + (path === '/' ? '/' : path),
  lastmod,
  lastmodSource:
    revision ??
    'No maintained substantive revision date; optional lastmod omitted.',
});

/** Explicit search policy, checked independently against app.routes.ts and built output. */
export const staticSeoRoutes: readonly SeoRoutePolicy[] = [
  page(
    '/',
    'home',
    '2026-11-18',
    'Exact-model choices and attachment discovery',
  ),
  page(
    '/hair-care',
    'hub',
    '2026-11-18',
    'Exact-model choices and attachment discovery',
  ),
  page(
    '/hair-dryers',
    'hub',
    '2026-11-27',
    'Release fix: four comparison guides and the BaByliss dryer comparison',
  ),
  page(
    '/hot-air-brushes',
    'hub',
    '2026-11-27',
    'Release fix: four comparison guides and the BaByliss dryer comparison',
  ),
  page(
    '/brushes-combs',
    'hub',
    '2026-11-26',
    'Model-decision batch: new guides, kit comparison and manual finder',
  ),
  page(
    '/hair-accessories',
    'hub',
    '2026-11-22',
    'Mega batch: static and Tangle Teezer pilots, roller count planner',
  ),
  page(
    '/guides',
    'hub',
    '2026-11-27',
    'Release fix: four comparison guides and the BaByliss dryer comparison',
  ),
  page(
    '/hair-brush-finder',
    'tool',
    '2026-11-17',
    'Consolidated comparison next decisions',
  ),
  page(
    '/flat-irons',
    'hub',
    '2026-11-26',
    'Model-decision batch: new guides, kit comparison and manual finder',
  ),
  page(
    '/curling-irons',
    'hub',
    '2026-11-26',
    'Model-decision batch: new guides, kit comparison and manual finder',
  ),
  page(
    '/flat-iron-finder',
    'tool',
    '2026-11-17',
    'Consolidated comparison next decisions',
  ),
  page(
    '/hair-tool-manual-finder',
    'tool',
    '2026-11-27',
    'Release fix: plain-text result heading',
  ),
  page('/curling-tool-finder', 'tool'),
  page('/hair-tool-routine-builder', 'tool'),
  page(
    '/tools',
    'hub',
    '2026-11-26',
    'Model-decision batch: new guides, kit comparison and manual finder',
  ),
  page(
    '/products',
    'hub',
    '2026-11-26',
    'Model-decision batch: new guides, kit comparison and manual finder',
  ),
  page('/about', 'policy'),
  page('/authors/combreport-editorial-team', 'author'),
  page('/editorial-policy', 'policy'),
  page(
    '/testing-research-methodology',
    'policy',
    '2026-10-25',
    'Batch 22 evidence and date explanations',
  ),
  page(
    '/corrections-policy',
    'policy',
    '2026-11-23',
    'Search growth batch: what to include and what happens after a report',
  ),
  page('/privacy', 'policy'),
  page('/affiliate-disclosure', 'policy'),
  page('/contact', 'policy'),
  {
    path: '/404',
    id: 'page:/404',
    pageType: 'not-found',
    disposition: 'not-found',
    reason:
      'Explicit not-found document; NotFoundPageComponent applies noindex, nofollow and removes canonical.',
    canonical: null,
    lastmodSource: 'Excluded from sitemap.',
  },
];

export const routePatternPolicies = [
  {
    path: '/guides/:slug',
    disposition: 'finite-expansion',
    source:
      'Published articles generated from articleRegistry; unpublished or unknown slugs use the not-found handler.',
  },
  {
    path: '/**',
    disposition: 'not-found-handler',
    source:
      'Wildcard handler, not an unbounded set of sitemap pages. CloudFront maps missing objects to the 404 document with status 404.',
  },
] as const;

export function seoRoutesForArticles(
  articles: readonly Article[],
): readonly SeoRoutePolicy[] {
  return [
    ...staticSeoRoutes,
    ...articles.map((article): SeoRoutePolicy => ({
      path: `/guides/${article.slug}`,
      id: `article:${article.slug}`,
      pageType: 'guide',
      category: article.group,
      disposition: 'indexable-canonical',
      reason: 'Enabled, published article from the existing publication gate.',
      canonical: `${canonicalOrigin}/guides/${article.slug}`,
      lastmod: article.updatedDate ?? article.publishDate,
      lastmodSource: article.updatedDate
        ? 'Article front matter updatedDate'
        : 'Registry publishDate',
    })),
  ];
}
