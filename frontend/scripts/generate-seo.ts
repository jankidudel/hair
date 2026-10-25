import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { articles } from '../src/app/content.generated.ts';
import {
  seoRoutesForArticles,
  routePatternPolicies,
} from '../src/app/seo-route-policy.ts';
import {
  registeredRouterPaths,
  routeClassificationErrors,
} from '../../scripts/seo/route-coverage.ts';

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
const policies = seoRoutesForArticles(articles);
const router = registeredRouterPaths(
  await readFile(join(root, 'src/app/app.routes.ts'), 'utf8'),
);
const classificationErrors = routeClassificationErrors(
  router,
  policies,
  routePatternPolicies,
);
if (classificationErrors.length)
  throw new Error(classificationErrors.join('\n'));
const entries = policies.filter(
  (policy) => policy.disposition === 'indexable-canonical',
);
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
      .map(
        ({ path, lastmod }) =>
          `  <url><loc>${siteUrl}${path === '/' ? '' : path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
      )
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
