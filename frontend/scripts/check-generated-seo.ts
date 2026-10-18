import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { auditInternalLinks } from '../../scripts/internal-link-audit.ts';
import { articles } from '../src/app/content.generated.ts';
import { guideEvidence } from '../src/app/guide-evidence.ts';
import {
  guideCategories,
  guideCategoryById,
} from '../src/app/article-registry.ts';
import { removedDuplicateRoutes } from '../../scripts/removed-duplicate-routes.ts';

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
for (const route of removedDuplicateRoutes) {
  if (sitemapUrls.includes(`https://www.combreport.com${route}`))
    failures.push(`${route}: removed route remains in sitemap.`);
  try {
    await stat(resolve(output, route.slice(1), 'index.html'));
    failures.push(`${route}: removed route still has a generated document.`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
}
if (sitemapUrls.some((url) => url.endsWith('/contact')))
  failures.push('sitemap.xml: noindex contact route must be excluded.');
for (const match of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  if (!/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(match[1]))
    failures.push(
      'sitemap.xml: every canonical entry needs a truthful lastmod.',
    );
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
    failures.push(
      `${route}: commercial Best claim lacks a selection-guide outcome.`,
    );
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
    if (html.includes(token))
      failures.push(`${route}: leaked front matter '${token}'.`);
  if (/\b(?:Published|Updated)\s+[A-Z][a-z]+\s+\d{1,2},\s+20\d{2}\b/.test(html))
    failures.push(`${route}: publication dates must remain metadata-only.`);
  const articleSchema = [
    ...html.matchAll(/<script[^>]*data-site-jsonld[^>]*>([\s\S]*?)<\/script>/g),
  ]
    .flatMap((match) => {
      try {
        const value = JSON.parse(match[1]) as Record<string, unknown>;
        return Array.isArray(value['@graph']) ? value['@graph'] : [value];
      } catch {
        return [];
      }
    })
    .find(
      (value): value is Record<string, unknown> =>
        !!value && typeof value === 'object' && value['@type'] === 'Article',
    );
  const materialDate = article.updatedDate ?? article.publishDate;
  if (articleSchema?.['dateModified'] !== materialDate)
    failures.push(
      `${route}: JSON-LD dateModified does not match content data.`,
    );
  if (
    !sitemap.includes(
      `<loc>https://www.combreport.com${route}</loc><lastmod>${materialDate}</lastmod>`,
    )
  )
    failures.push(`${route}: sitemap lastmod does not match content data.`);
  const category = guideCategoryById[article.group];
  if (!category) failures.push(`${route}: missing category hub mapping.`);
  else
    validateBreadcrumb(html, route, [
      { label: 'Home', path: '/' },
      { label: 'Guides', path: '/guides' },
      ...(category.path === '/guides'
        ? []
        : [{ label: category.label, path: category.path }]),
      {
        label: guideEvidence[article.slug]?.breadcrumbLabel ?? article.heading,
        path: route,
      },
    ]);
}
const guidesHtml = await readFile(
  resolve(output, 'guides', 'index.html'),
  'utf8',
);
const safetyCopies: string[] = [];
for (const [slug, evidence] of Object.entries(guideEvidence)) {
  const route = `/guides/${slug}`;
  const html = await readFile(
    resolve(output, 'guides', slug, 'index.html'),
    'utf8',
  );
  const normalise = (value: string) =>
    value
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  const safety = html.match(
    /<app-clean-inspect-stop\b[^>]*>([\s\S]*?)<\/app-clean-inspect-stop>/,
  )?.[1];
  const isCare = slug.startsWith('how-to-clean-');
  if (isCare !== !!safety)
    failures.push(
      `${route}: shared safety component presence does not match the task.`,
    );
  if (safety) safetyCopies.push(normalise(safety));
  const body =
    html.match(
      /<section[^>]*class="article-body"[^>]*>([\s\S]*?)<\/section>/,
    )?.[1] ?? '';
  const steps = body.match(/<ol>([\s\S]*?)<\/ol>/)?.[1] ?? '';
  const expectedSteps =
    slug === 'how-to-clean-hair-straightener-plates' ? 8 : 9;
  if ((steps.match(/<li>/g) ?? []).length !== expectedSteps)
    failures.push(
      `${route}: complete ordered steps are missing from static HTML.`,
    );
  const faq = html.indexOf('class="article-faq"');
  const scope = html.indexOf('id="evidence-scope-title"');
  const sources = html.indexOf('id="source-checks-heading"');
  const related = html.indexOf('id="next-steps-heading"');
  if (!(faq > 0 && faq < scope && scope < sources && sources < related))
    failures.push(
      `${route}: FAQ, evidence, source and related-guide order is incorrect.`,
    );
  if (/"@type":"(?:FAQPage|HowTo|Review|Product|AggregateRating)"/.test(html))
    failures.push(`${route}: task guide emits unrequested structured data.`);
  for (const source of evidence.sources)
    if (!html.includes(`href="${source.url}"`))
      failures.push(`${route}: source link is missing from static HTML.`);
  if (!guidesHtml.includes(`href="${route}"`))
    failures.push(`/guides: missing task-guide link '${route}'.`);
  const category = slug.startsWith('how-to-clean-')
    ? 'flat-irons'
    : 'hair-accessories';
  const hub = await readFile(resolve(output, category, 'index.html'), 'utf8');
  if (!hub.includes(`href="${route}"`))
    failures.push(`/${category}: missing task-guide link '${route}'.`);
}
const snaggingHtml = await readFile(
  resolve(output, 'guides', 'flat-iron-snagging-hair', 'index.html'),
  'utf8',
);
const snaggingSafety = snaggingHtml.match(
  /<app-clean-inspect-stop\b[^>]*>([\s\S]*?)<\/app-clean-inspect-stop>/,
)?.[1];
if (snaggingSafety)
  safetyCopies.push(
    snaggingSafety
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
if (safetyCopies.length !== 3 || new Set(safetyCopies).size !== 1)
  failures.push(
    'CleanInspectStop must render identical copy on both care guides and the snagging guide.',
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
    (article) => article.group === category.id && category.id !== 'direct-heat',
  )) {
    if (!html.includes(`href="/guides/${article.slug}"`))
      failures.push(
        `${category.path}: missing published guide '${article.slug}'.`,
      );
  }
}
for (const [path, matcher] of [
  ['/flat-irons', (slug: string) => !/curling|wand/.test(slug)],
  ['/curling-irons', (slug: string) => /curling|wand/.test(slug)],
] as const) {
  const html = await readFile(
    resolve(output, path.slice(1), 'index.html'),
    'utf8',
  );
  for (const article of articles.filter(
    (article) => article.group === 'direct-heat' && matcher(article.slug),
  ))
    if (!html.includes(`href="/guides/${article.slug}"`))
      failures.push(`${path}: missing direct-heat guide '${article.slug}'.`);
}
for (const url of sitemapUrls) {
  const slug = url.match(/\/guides\/([^/]+)$/)?.[1];
  if (slug && !articles.some((article) => article.slug === slug))
    failures.push(`sitemap.xml: unpublished or unknown guide '${slug}'.`);
}
const sitemapLastmods = [
  ...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g),
].map((match) => match[1]);
if (new Set(sitemapLastmods).size < 2)
  failures.push(
    'sitemap.xml: lastmod values must not all be one deployment date.',
  );
const unchangedGuide = articles.find(
  (article) => article.slug === 'how-to-diffuse-wavy-hair',
);
if (
  unchangedGuide &&
  !sitemap.includes(
    `<loc>https://www.combreport.com/guides/${unchangedGuide.slug}</loc><lastmod>${unchangedGuide.publishDate}</lastmod>`,
  )
)
  failures.push(
    `${unchangedGuide.slug}: unchanged guide must retain its publication lastmod.`,
  );
if (failures.length) {
  console.error(`Generated SEO validation failed (${failures.length} issues):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(
  `Generated SEO validation passed (${articles.length} public guides).`,
);
