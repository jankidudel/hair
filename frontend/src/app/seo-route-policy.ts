import type { Article } from './content.generated';

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
  page('/', 'home', '2026-10-17', 'Batch 14 homepage editorial revision'),
  page(
    '/hair-care',
    'hub',
    '2026-10-27',
    'Batch 24 care methods and direction-check discovery',
  ),
  page('/hair-dryers', 'hub', '2026-10-25', 'Batch 22 descriptive guide cards'),
  page('/hot-air-brushes', 'hub', '2026-10-17', 'Batch 14 category revision'),
  page(
    '/brushes-combs',
    'hub',
    '2026-10-27',
    'Batch 24 care methods and direction-check discovery',
  ),
  page(
    '/hair-accessories',
    'hub',
    '2026-10-19',
    'Existing explicit accessories hub revision record',
  ),
  page(
    '/guides',
    'hub',
    '2026-10-27',
    'Batch 24 care methods and direction-check discovery',
  ),
  page('/hair-brush-finder', 'tool'),
  page(
    '/flat-irons',
    'hub',
    '2026-10-25',
    'Batch 22 task labels and curling discovery links',
  ),
  page(
    '/curling-irons',
    'hub',
    '2026-10-25',
    'Batch 22 editorial selection link labels',
  ),
  page('/flat-iron-finder', 'tool'),
  page('/curling-tool-finder', 'tool'),
  page('/hair-tool-routine-builder', 'tool'),
  page(
    '/tools',
    'hub',
    '2026-10-27',
    'Batch 24 care methods and direction-check discovery',
  ),
  page(
    '/products',
    'hub',
    '2026-10-25',
    'Batch 22 scoped records and researched pairs',
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
  page('/corrections-policy', 'policy'),
  page('/privacy', 'policy'),
  page('/affiliate-disclosure', 'policy'),
  {
    path: '/contact',
    id: 'page:/contact',
    pageType: 'utility',
    disposition: 'non-indexable-utility',
    reason:
      'Contact details await owner confirmation; StaticPageComponent explicitly applies noindex, nofollow.',
    canonical: null,
    lastmodSource: 'Excluded from sitemap.',
  },
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
