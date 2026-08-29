import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { readdir, readFile } from 'node:fs/promises';

const root = join(import.meta.dirname, '..');
const siteUrl = process.env['SITE_URL'] || 'https://example.com';
const content = join(root, 'content');
const entries = [
  '/',
  '/guides',
  '/products',
  '/about',
  '/privacy',
  '/affiliate-disclosure',
];
for (const file of (await readdir(content)).filter(
  (item) => item.endsWith('.md') && item !== 'article-template.md',
))
  entries.push(
    `/guides/${matter(await readFile(join(content, file), 'utf8')).data.slug}`,
  );
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
