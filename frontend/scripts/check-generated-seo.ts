import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { auditInternalLinks } from '../../scripts/internal-link-audit.ts';
import { articles } from '../src/app/content.generated.ts';

const output = resolve(
  import.meta.dirname,
  '..',
  'dist',
  'hair-frontend',
  'browser',
);
const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8');
const audit = await auditInternalLinks(output);
const failures = [
  ...audit.failures.map(
    (failure) =>
      `${failure.source}: ${failure.reason} (${failure.originalUrl})`,
  ),
];
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
if (new Set(sitemapUrls).size !== sitemapUrls.length)
  failures.push('sitemap.xml: duplicate URL.');
for (const article of articles) {
  const route = `/guides/${article.slug}`;
  if (!sitemapUrls.some((url) => url.endsWith(route)))
    failures.push(`${route}: missing sitemap entry.`);
  const html = await readFile(
    resolve(output, 'guides', article.slug, 'index.html'),
    'utf8',
  );
  const canonical = `https://www.combreport.com${route}`;
  if (!html.includes(`<link rel="canonical" href="${canonical}">`))
    failures.push(`${route}: missing or incorrect canonical.`);
  if (!html.includes(`<meta name="robots" content="index, follow">`))
    failures.push(`${route}: unexpectedly noindex.`);
  if (!html.includes(`<title>${article.title}</title>`))
    failures.push(`${route}: missing title.`);
  if (!html.includes(`name="description" content="${article.description}"`))
    failures.push(`${route}: missing description.`);
  if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1)
    failures.push(`${route}: must have exactly one H1.`);
}
for (const url of sitemapUrls) {
  const slug = url.match(/\/guides\/([^/]+)$/)?.[1];
  if (slug && !articles.some((article) => article.slug === slug))
    failures.push(`sitemap.xml: unpublished or unknown guide '${slug}'.`);
}
if (failures.length) {
  console.error(`Generated SEO validation failed (${failures.length} issues):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(
  `Generated SEO validation passed (${articles.length} public guides).`,
);
