import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { articles } from '../src/app/content.generated.ts';
import { guideCategories } from '../src/app/article-registry.ts';
import { articleBySlug } from '../src/app/content.generated.ts';

interface SiteConfig {
  siteUrl: unknown;
  indexingEnabled: unknown;
}
const root = join(import.meta.dirname, '..');
const config: SiteConfig = JSON.parse(
  await readFile(
    join(root, 'src', 'environments', 'site-config.production.json'),
    'utf8',
  ),
);
const siteUrl = validSiteUrl(config.siteUrl);
const indexingEnabled = config.indexingEnabled === true && siteUrl !== null;
const entries = [
  '/',
  '/hair-care',
  ...guideCategories
    .filter((category) => category.path !== '/hair-care')
    .map((category) => category.path),
  '/guides',
  '/tools',
  '/hair-brush-finder',
  '/hair-tool-routine-builder',
  '/products',
  '/about',
  '/privacy',
  '/affiliate-disclosure',
  '/editorial-policy',
  '/testing-research-methodology',
  '/corrections-policy',
  '/authors/combreport-editorial-team',
];
// Static pages do not have article front matter. These are the dates of their
// last material editorial revision, deliberately not the generation date.
const batchFourteenStaticRoutes = new Set([
  '/',
  '/hair-dryers',
  '/hot-air-brushes',
  '/brushes-combs',
  '/hair-accessories',
  '/tools',
  '/products',
]);
const staticLastModified: Readonly<Record<string, string>> = Object.fromEntries(
  entries.map((route) => [
    route,
    [
      '/guides',
      '/products',
      '/testing-research-methodology',
      '/hair-dryers',
      '/brushes-combs',
      '/flat-irons',
      '/curling-irons',
    ].includes(route)
      ? '2026-10-25'
      : ['/hair-care'].includes(route)
        ? '2026-10-21'
        : ['/hair-accessories', '/brushes-combs'].includes(route)
          ? '2026-10-19'
          : ['/tools'].includes(route)
            ? '2026-10-18'
            : batchFourteenStaticRoutes.has(route)
              ? '2026-10-17'
              : '2026-09-20',
  ]),
);
for (const { slug } of articles) entries.push(`/guides/${slug}`);
const publicDirectory = join(root, 'public');
await mkdir(publicDirectory, { recursive: true });
await writeFile(
  join(publicDirectory, 'robots.txt'),
  indexingEnabled
    ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
    : 'User-agent: *\nAllow: /\n',
);
const sitemapPath = join(publicDirectory, 'sitemap.xml');
if (!indexingEnabled) {
  await rm(sitemapPath, { force: true });
} else
  await writeFile(
    sitemapPath,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
      .map((route) => {
        const slug = route.match(/^\/guides\/([^/]+)$/)?.[1];
        const article = slug ? articleBySlug[slug] : undefined;
        const lastmod =
          article?.updatedDate ??
          article?.publishDate ??
          staticLastModified[route];
        return `  <url><loc>${siteUrl}${route === '/' ? '' : route}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
      })
      .join('\n')}\n</urlset>\n`,
  );
function validSiteUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length === 0) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      url.pathname === '/' &&
      !url.search &&
      !url.hash
      ? url.origin
      : null;
  } catch {
    return null;
  }
}
