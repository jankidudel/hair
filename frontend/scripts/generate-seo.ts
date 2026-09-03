import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { articles } from '../src/app/content.generated.ts';

type BuildConfiguration = 'development' | 'production';
interface SiteConfig {
  siteUrl: unknown;
  indexingEnabled: unknown;
}
const configuration = process.argv[2];
if (configuration !== 'development' && configuration !== 'production')
  throw new Error(
    'Use either "development" or "production" SEO configuration.',
  );
const root = join(import.meta.dirname, '..');
const config: SiteConfig = JSON.parse(
  await readFile(
    join(
      root,
      'src',
      'environments',
      `site-config.${configuration as BuildConfiguration}.json`,
    ),
    'utf8',
  ),
);
const siteUrl = validSiteUrl(config.siteUrl);
const indexingEnabled = config.indexingEnabled === true && siteUrl !== null;
const entries = [
  '/',
  '/hair-care',
  '/guides',
  '/hair-brush-finder',
  '/products',
  '/about',
  '/privacy',
  '/affiliate-disclosure',
];
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
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((route) => `  <url><loc>${siteUrl}${route === '/' ? '' : route}</loc></url>`).join('\n')}\n</urlset>\n`,
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
