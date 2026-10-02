import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { auditInternalLinks } from '../../scripts/internal-link-audit.ts';
import { articles } from '../src/app/content.generated.ts';
import { guideCategories } from '../src/app/article-registry.ts';

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
const categoryById = new Map(
  guideCategories.map((category) => [category.id, category]),
);
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function breadcrumbList(
  html: string,
  route: string,
): Record<string, unknown> | undefined {
  const lists = [
    ...html.matchAll(/<script[^>]*data-site-jsonld[^>]*>([\s\S]*?)<\/script>/g),
  ].flatMap((match) => {
    try {
      const value = JSON.parse(match[1]) as Record<string, unknown>;
      const graph = Array.isArray(value['@graph']) ? value['@graph'] : [value];
      return graph.filter(
        (item): item is Record<string, unknown> =>
          !!item &&
          typeof item === 'object' &&
          item['@type'] === 'BreadcrumbList',
      );
    } catch {
      failures.push(`${route}: invalid JSON-LD.`);
      return [];
    }
  });
  if (lists.length !== 1) {
    failures.push(
      `${route}: expected one BreadcrumbList JSON-LD, found ${lists.length}.`,
    );
    return undefined;
  }
  return lists[0];
}
function validateBreadcrumb(
  html: string,
  route: string,
  expected: Array<{ label: string; path: string }>,
): void {
  const list = breadcrumbList(html, route);
  const visible = html.match(
    /<nav[^>]*aria-label="Breadcrumb"[^>]*class="breadcrumbs"[^>]*>([\s\S]*?)<\/nav>/,
  )?.[1];
  if (!visible) failures.push(`${route}: missing visible breadcrumb.`);
  for (const item of expected.slice(0, -1)) {
    if (
      !visible?.includes(`<a href="${item.path}">${escapeHtml(item.label)}</a>`)
    )
      failures.push(
        `${route}: breadcrumb link for '${item.label}' is missing or non-crawlable.`,
      );
  }
  const current = expected.at(-1);
  if (
    current &&
    !visible?.includes(
      `<span aria-current="page">${escapeHtml(current.label)}</span>`,
    )
  )
    failures.push(`${route}: current breadcrumb does not match the page.`);
  const entries = list?.['itemListElement'];
  if (!Array.isArray(entries) || entries.length !== expected.length) {
    failures.push(
      `${route}: BreadcrumbList items do not match the visible breadcrumb.`,
    );
    return;
  }
  for (const [index, expectedItem] of expected.entries()) {
    const actual = entries[index] as Record<string, unknown>;
    if (
      actual['position'] !== index + 1 ||
      actual['name'] !== expectedItem.label ||
      actual['item'] !== `https://www.combreport.com${expectedItem.path}`
    )
      failures.push(
        `${route}: BreadcrumbList item ${index + 1} does not match visible breadcrumb.`,
      );
  }
}
if (new Set(sitemapUrls).size !== sitemapUrls.length)
  failures.push('sitemap.xml: duplicate URL.');
if (sitemapUrls.some((url) => url.endsWith('/contact')))
  failures.push('sitemap.xml: noindex contact route must be excluded.');
for (const match of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  if (!/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(match[1]))
    failures.push('sitemap.xml: every canonical entry needs a truthful lastmod.');
}
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
  if (/^Best\b/i.test(article.heading))
    failures.push(`${route}: commercial Best claim lacks a selection-guide outcome.`);
  if (
    article.commercialOutcome === 'selection-guide' &&
    !html.includes('Selection guide, not a product ranking.')
  )
    failures.push(`${route}: selection-guide evidence label is missing.`);
  for (const token of [
    '--- title:',
    'primaryIntent:',
    'authorId:',
    'contentMethod:',
    'faq: - question:',
  ])
    if (html.includes(token)) failures.push(`${route}: leaked front matter '${token}'.`);
  if (!html.includes(`Published ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${article.publishDate}T00:00:00Z`))}`))
    failures.push(`${route}: missing visible truthful published date.`);
  if (article.updatedDate && !html.includes(`Updated ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${article.updatedDate}T00:00:00Z`))}`))
    failures.push(`${route}: missing visible truthful updated date.`);
  const category = categoryById.get(article.group);
  if (!category) failures.push(`${route}: missing category hub mapping.`);
  else
    validateBreadcrumb(html, route, [
      { label: 'Home', path: '/' },
      { label: 'Guides', path: '/guides' },
      { label: category.label, path: category.path },
      { label: article.heading, path: route },
    ]);
}
const guidesHtml = await readFile(
  resolve(output, 'guides', 'index.html'),
  'utf8',
);
validateBreadcrumb(guidesHtml, '/guides', [
  { label: 'Home', path: '/' },
  { label: 'Guides', path: '/guides' },
]);
for (const category of guideCategories) {
  if (!sitemapUrls.includes(`https://www.combreport.com${category.path}`))
    failures.push(`${category.path}: missing sitemap entry.`);
  if (!guidesHtml.includes(`href="${category.path}"`))
    failures.push(`/guides: missing category hub link '${category.path}'.`);
  const html = await readFile(
    resolve(output, category.path.slice(1), 'index.html'),
    'utf8',
  );
  validateBreadcrumb(html, category.path, [
    { label: 'Home', path: '/' },
    { label: 'Guides', path: '/guides' },
    { label: category.label, path: category.path },
  ]);
  for (const article of articles.filter(
    (article) => article.group === category.id,
  )) {
    if (!html.includes(`href="/guides/${article.slug}"`))
      failures.push(
        `${category.path}: missing published guide '${article.slug}'.`,
      );
  }
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
