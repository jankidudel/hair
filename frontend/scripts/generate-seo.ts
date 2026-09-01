import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { articles } from '../src/app/content.generated.ts';

const root = join(import.meta.dirname, '..');
const siteUrl = process.env['SITE_URL'] || 'https://www.combreport.com';
const entries = [
  '/',
  '/hair-care',
  '/guides',
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
  `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
await writeFile(
  join(publicDirectory, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((route) => `  <url><loc>${siteUrl}${route === '/' ? '' : route}</loc></url>`).join('\n')}\n</urlset>\n`,
);
