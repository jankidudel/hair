import { straightenerGuideRelated } from '../src/app/straightener-guides.ts';
import {
  supportedUpdoSlugs,
  supportedUpdoIncoming,
} from '../src/app/supported-updo-guides.ts';
import {
  shapingMethodSlugs,
  shapingMethodIncoming,
} from '../src/app/shaping-method-guides.ts';
import {
  airflowMethodSlugs,
  airflowMethodIncoming,
} from '../src/app/airflow-method-guides.ts';
import {
  waveMethodSlugs,
  waveMethodIncoming,
} from '../src/app/wave-method-guides.ts';
import {
  toolChoiceSlugs,
  toolChoiceIncoming,
} from '../src/app/tool-choice-guides.ts';
import {
  everydayMethodSlugs,
  everydayMethodIncoming,
} from '../src/app/everyday-method-guides';
import { fastenerSlugs } from '../src/app/fastener-guides.ts';
import {
  currentModelSlugs,
  currentModelIncoming,
} from '../src/app/current-model-comparison-guides.ts';
import {
  finishingMethodSlugs,
  finishingMethodIncoming,
} from '../src/app/finishing-method-guides.ts';
import {
  carePackingSlugs,
  carePackingIncoming,
} from '../src/app/care-packing-guides.ts';
import { ArticleSlug } from '../src/app/article-slug.ts';
import { writeFile } from 'node:fs/promises';
import { careMethodSlugs } from '../src/app/care-method-guides.ts';
import {
  guideBodyStats,
  renderedGuideBody,
  renderedGuideErrors,
  renderedEditorialCopyErrors,
} from '../../scripts/guide-body-validation.ts';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { auditInternalLinks } from '../../scripts/internal-link-audit.ts';
import { articles } from '../src/app/content.generated.ts';
import { guideLinkMap } from '../src/app/guide-link-map.ts';
import { guideEvidence } from '../src/app/guide-evidence.ts';
import {
  guideCategories,
  guideCategoryById,
} from '../src/app/article-registry.ts';
import {
  seoRoutesForArticles,
  routePatternPolicies,
} from '../src/app/seo-route-policy.ts';
import {
  registeredRouterPaths,
  routeClassificationErrors,
  sitemapParityErrors,
  parseSitemap,
  builtRouteCoverageErrors,
} from '../../scripts/seo/route-coverage.ts';
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
const routePolicies = seoRoutesForArticles(articles);
failures.push(
  ...routeClassificationErrors(
    registeredRouterPaths(
      await readFile(
        resolve(import.meta.dirname, '../src/app/app.routes.ts'),
        'utf8',
      ),
    ),
    routePolicies,
    routePatternPolicies,
  ),
  ...sitemapParityErrors(routePolicies, parseSitemap(sitemap).entries),
  ...(await builtRouteCoverageErrors(output, routePolicies)),
);
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
for (const match of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  if (
    match[1].includes('<lastmod>') &&
    !/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(match[1])
  )
    failures.push(
      'sitemap.xml: a supplied lastmod must be a valid maintained date.',
    );
}
const substanceRows: string[] = [];
for (const article of articles) {
  const route = `/guides/${article.slug}`;
  if (!sitemapUrls.some((url) => url.endsWith(route)))
    failures.push(`${route}: missing sitemap entry.`);
  const html = await readFile(
    resolve(output, 'guides', article.slug, 'index.html'),
    'utf8',
  );
  const renderedBody = renderedGuideBody(html);
  failures.push(
    ...renderedEditorialCopyErrors(renderedBody.intro + renderedBody.body).map(
      (error) => `${route}: ${error}`,
    ),
  );
  const bodyStats = guideBodyStats(renderedBody.intro + renderedBody.body);
  const evidenceRecord = guideEvidence[article.slug];
  const hasEvidence = html.includes('id="evidence-scope-title"');
  const sourceCount = (
    html
      .match(
        /<section[^>]*aria-labelledby="source-checks-heading"[^>]*>([^]*?)<\/section>/,
      )?.[1]
      .match(/<a /g) ?? []
  ).length;
  substanceRows.push(
    `| ${route} | ${html.match(/<h1\b[^>]*>([^]*?)<\/h1>/)?.[1].trim() === escapeHtml(article.heading) ? 'Expected article H1' : 'REVIEW identity'} | ${bodyStats.words} | ${bodyStats.headings.join('; ')} | ${hasEvidence ? 'Yes' : 'REVIEW missing'} | ${sourceCount} | ${bodyStats.words < 500 || bodyStats.headings.length < 3 || !hasEvidence || !sourceCount ? 'Editorial review' : '—'} |`,
  );
  if (
    Object.hasOwn(straightenerGuideRelated, article.slug) ||
    supportedUpdoSlugs.includes(article.slug as ArticleSlug) ||
    article.slug === ArticleSlug.HowToChooseClawClipSize ||
    shapingMethodSlugs.includes(article.slug as ArticleSlug) ||
    airflowMethodSlugs.includes(article.slug as ArticleSlug) ||
    waveMethodSlugs.includes(article.slug) ||
    toolChoiceSlugs.includes(article.slug) ||
    everydayMethodSlugs.includes(article.slug) ||
    currentModelSlugs.includes(article.slug) ||
    careMethodSlugs.includes(
      article.slug as (typeof careMethodSlugs)[number],
    ) ||
    fastenerSlugs.includes(article.slug as (typeof fastenerSlugs)[number]) ||
    carePackingSlugs.includes(
      article.slug as (typeof carePackingSlugs)[number],
    ) ||
    finishingMethodSlugs.includes(
      article.slug as (typeof finishingMethodSlugs)[number],
    )
  ) {
    if (!evidenceRecord?.sources.length)
      failures.push(`${route}: required evidence/source model is missing.`);
    failures.push(
      ...renderedGuideErrors(html, {
        heading: article.heading,
        body: article.html,
        faqs: article.faq,
        sourceUrls: evidenceRecord?.sources.map((s) => s.url) ?? [],
        relatedPaths:
          guideLinkMap[article.slug]?.relatedSlugs.map((s) => '/guides/' + s) ??
          [],
      }).map((error) => `${route}: ${error}`),
    );
  }
  const canonical = `https://www.combreport.com${route}`;
  if (!html.includes(`<link rel="canonical" href="${canonical}">`))
    failures.push(`${route}: missing or incorrect canonical.`);
  if (!html.includes(`<meta name="robots" content="index, follow">`))
    failures.push(`${route}: unexpectedly noindex.`);
  if (!html.includes(`<title>${escapeHtml(article.title)}</title>`))
    failures.push(`${route}: missing title.`);
  if (
    !html.includes(
      `name="description" content="${escapeHtml(article.description).replace(/"/g, '&quot;')}"`,
    )
  )
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
  if (
    articleSchema?.['headline'] !== article.heading ||
    articleSchema?.['description'] !== article.description
  )
    failures.push(
      `${route}: Article headline/description does not match visible content.`,
    );
  const materialDate = article.updatedDate ?? article.publishDate;
  if (
    article.slug === ArticleSlug.HowToChooseClawClipSize &&
    (article.publishDate !== '2026-10-07' ||
      evidenceRecord?.sources.length !== 1 ||
      evidenceRecord.sources[0].url !==
        'https://franceluxe.com/products/france-luxe-jumbo-couture-jaw-classic')
  )
    failures.push(
      `${route}: preserve the original publication and the current exact-product source.`,
    );
  if (articleSchema?.['datePublished'] !== article.publishDate)
    failures.push(
      `${route}: JSON-LD datePublished differs from original publication.`,
    );
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
  const isCare = [
    'how-to-clean-hair-straightener-plates',
    'how-to-clean-a-curling-iron-or-wand',
  ].includes(slug);
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
  const stepCounts: Readonly<Record<string, number>> = {
    'how-to-use-flexi-rods': 9,
    'how-to-use-snap-closure-foam-rollers': 9,
    'how-to-clean-hair-straightener-plates': 8,
    'how-to-clean-a-curling-iron-or-wand': 9,
    'how-to-use-heated-hair-rollers': 9,
    'how-to-use-bobby-pins': 6,
    'how-to-use-a-french-hair-pin': 6,
    'how-to-choose-a-hair-barrette': 6,
    'how-to-wash-a-satin-bonnet': 7,
    'how-to-clean-hair-scrunchies': 5,
    'how-to-clean-a-hair-comb': 7,
  };
  const expectedSteps = stepCounts[slug];
  if (expectedSteps && (steps.match(/<li>/g) ?? []).length !== expectedSteps)
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
  const article = articles.find((entry) => entry.slug === slug)!;
  const category =
    waveMethodSlugs.includes(slug as ArticleSlug) ||
    slug === ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir ||
    slug === ArticleSlug.AutomaticHairCurlerVsCurlingWand
      ? 'curling-irons'
      : guideCategoryById[article.group].path.slice(1);
  const relatedHtml = html.slice(related);
  let previousRelated = -1;
  for (const relatedSlug of guideLinkMap[slug].relatedSlugs) {
    const position = relatedHtml.indexOf(`href="/guides/${relatedSlug}"`);
    if (position <= previousRelated)
      failures.push(`${route}: related cards missing or out of order.`);
    previousRelated = position;
  }
  for (const source of evidence.sources.filter(
    (entry) => entry.checkedDate === '19 October 2026',
  )) {
    if (
      !html.slice(0, faq).includes(`href="${source.url}"`) &&
      !source.label.includes('listing')
    )
      failures.push(`${route}: factual example needs a source link beside it.`);
  }
  const hub = await readFile(resolve(output, category, 'index.html'), 'utf8');
  if (!hub.includes(`href="${route}"`))
    failures.push(`/${category}: missing task-guide link '${route}'.`);
}
const methodAdditions = [
  ArticleSlug.HowToApplyHeatProtectant,
  ArticleSlug.HowToApplyLeaveInConditioner,
  ArticleSlug.HowToCleanABoarBristleHairbrush,
];
for (const slug of methodAdditions) {
  const incoming = articles.filter(
    (article) =>
      article.slug !== slug && article.html.includes(`href="/guides/${slug}"`),
  );
  if (incoming.length < 2)
    failures.push(
      `/guides/${slug}: needs two contextual incoming article links.`,
    );
}
const finderOwner = await readFile(
  resolve(
    output,
    'guides',
    ArticleSlug.HeatProtectantSprayVsCream,
    'index.html',
  ),
  'utf8',
);
const finder =
  finderOwner.match(
    /<app-heat-protectant-finder[^>]*>([^]*?)<\/app-heat-protectant-finder>/,
  )?.[1] ?? '';
if (
  !finder.includes('interactive direction checks need JavaScript') ||
  /<(?:form|button)\b/.test(finder)
)
  failures.push(
    'Heat Protectant Finder: initial HTML must retain its honest inactive fallback.',
  );
for (const slug of [
  ArticleSlug.HowToApplyHeatProtectant,
  ArticleSlug.BestHeatProtectants,
])
  if (!finder.includes(`href="/guides/${slug}"`))
    failures.push(
      `Heat Protectant Finder: missing static method link '${slug}'.`,
    );
// Editorial insertions must survive sanitizing and appear in the initial HTML.
const accessoryIntegrations: Readonly<Record<string, readonly string[]>> = {
  'how-to-choose-hair-dryer': [
    'ghd-air-vs-helios',
    'parlux-alyon-vs-digitalyon',
  ],
  'hair-dryer-wattage-guide': ['parlux-alyon-vs-digitalyon'],
  'best-flat-irons': ['cloud-nine-original-iron-vs-wide-iron'],
  'flat-iron-plate-width-guide': ['cloud-nine-original-iron-vs-wide-iron'],
  'best-curling-irons': ['ghd-soft-curl-tong-vs-creative-curl-wand'],
  'curling-iron-vs-curling-wand': ['ghd-soft-curl-tong-vs-creative-curl-wand'],
  'best-detangling-brushes': [
    'tangle-teezer-ultimate-detangler-vs-fine-fragile',
  ],
  'best-brushes-fine-hair': [
    'tangle-teezer-ultimate-detangler-vs-fine-fragile',
  ],
  'heated-rollers-vs-self-grip-rollers': ['how-to-use-heated-hair-rollers'],
  'hair-roller-size-guide': ['how-to-use-heated-hair-rollers'],
  'how-to-choose-hair-sectioning-clips': [
    'bobby-pins-vs-u-shaped-hair-pins',
    'how-to-choose-a-hair-barrette',
  ],
  'how-to-choose-claw-clip-size': [
    'how-to-choose-a-hair-barrette',
    'how-to-use-a-french-hair-pin',
  ],
  'satin-bonnet-vs-satin-pillowcase': ['how-to-wash-a-satin-bonnet'],
  'hair-elastics-vs-scrunchies': ['how-to-clean-hair-scrunchies'],
  'how-to-clean-a-hair-brush': ['how-to-clean-a-hair-comb'],
  'when-to-replace-hairbrush-or-comb': ['how-to-clean-a-hair-comb'],
  'tail-comb-vs-wide-tooth-comb': ['how-to-clean-a-hair-comb'],
};
for (const [slug, targets] of Object.entries(accessoryIntegrations)) {
  const html = await readFile(
    resolve(output, 'guides', slug, 'index.html'),
    'utf8',
  );
  for (const target of targets)
    if (!html.includes(`href="/guides/${target}"`))
      failures.push(
        `${slug}: required contextual link to ${target} is missing.`,
      );
}
for (const [slug, diagram] of [
  [ArticleSlug.BananaClipVsClawClip, 'banana-clip-and-claw-closure'],
  [ArticleSlug.HowToUseAHairBungee, 'hair-bungee-anchoring-sequence'],
  [ArticleSlug.HairPasteVsHairClay, 'styling-label-comparison-fields'],
  [ArticleSlug.HowToSlickBackHairWithGel, 'slick-back-gel-stages'],
  [ArticleSlug.HowToUseAirflowCurlingBarrels, 'airflow-wrap-control-stages'],
  [
    ArticleSlug.HairDryerCombAttachmentVsConcentrator,
    'dryer-comb-and-concentrator-paths',
  ],
  [
    ArticleSlug.HowToCleanAnAutomaticHairCurler,
    'automatic-curler-care-boundaries',
  ],
  [ArticleSlug.HowToUseAHairWaver, 'waver-step-and-release'],
  [
    ArticleSlug.DysonCorraleCoolshineVsCorrale,
    'corrale-power-and-attachment-choices',
  ],
  [ArticleSlug.AutomaticHairCurlerVsCurlingWand, 'curl-wrapping-mechanisms'],
  ['cloud-nine-original-iron-vs-wide-iron', 'cloud-nine-plate-widths'],
  [ArticleSlug.DenmanD3VsD38, 'denman-d3-d38-heads'],
  [
    ArticleSlug.ColorWowRaiseTheRootVsXtraLarge,
    'root-vs-section-product-placement',
  ],
  ['ghd-soft-curl-tong-vs-creative-curl-wand', 'original-ghd-curve-profiles'],
  ['bobby-pins-vs-u-shaped-hair-pins', 'pin-fastening-shapes'],
  ['how-to-choose-a-hair-barrette', 'barrette-clasp-fit'],
  ['how-to-clean-a-hair-comb', 'comb-teeth-cleaning'],
  [ArticleSlug.DysonAirstraitVsGhdDuetStyle, 'wet-to-dry-mode-boundaries'],
  [ArticleSlug.DysonAirwrapIdVsCoAnda2x, 'airwrap-generation-fit'],
]) {
  const html = await readFile(
    resolve(output, 'guides', slug, 'index.html'),
    'utf8',
  );
  if (
    !html.includes('class="accessory-schematic"') ||
    !html.includes(`src="/diagrams/${diagram}.svg"`)
  )
    failures.push(`${slug}: responsive schematic is missing.`);
  const svg = await readFile(
    resolve(output, 'diagrams', `${diagram}.svg`),
    'utf8',
  );
  if (
    !svg.includes('viewBox=') ||
    !svg.includes('aria-labelledby=') ||
    !svg.includes('<title')
  )
    failures.push(`${diagram}: accessible scalable SVG is required.`);
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
  [
    '/flat-irons',
    (slug: string) =>
      !/curling|curler|waver|crimper|wand/.test(slug) &&
      slug !== ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir,
  ],
  [
    '/curling-irons',
    (slug: string) =>
      /curling|curler|waver|crimper|wand/.test(slug) ||
      slug === ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir,
  ],
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
for (const [target, owners] of Object.entries({
  ...carePackingIncoming,
  ...finishingMethodIncoming,
  ...currentModelIncoming,
  ...everydayMethodIncoming,
  ...toolChoiceIncoming,
  ...waveMethodIncoming,
  ...airflowMethodIncoming,
  ...shapingMethodIncoming,
  ...supportedUpdoIncoming,
})) {
  for (const owner of owners) {
    const source = articles.find((article) => article.slug === owner);
    const rendered = renderedGuideBody(
      await readFile(resolve(output, 'guides', owner, 'index.html'), 'utf8'),
    );
    const link = `href="/guides/${target}"`;
    for (const [stage, html] of [
      ['authored', source?.html ?? ''],
      ['rendered', rendered.intro + rendered.body],
    ]) {
      const contextualPattern =
        Object.hasOwn(toolChoiceIncoming, target) ||
        Object.hasOwn(waveMethodIncoming, target)
          ? /<(p|td)\b[^>]*>([^]*?)<\/\1>/g
          : /<(p)\b[^>]*>([^]*?)<\/\1>/g;
      const paragraphs = [...html.matchAll(contextualPattern)].filter((match) =>
        match[2].includes(link),
      );
      if (paragraphs.length !== 1)
        failures.push(
          `${owner}: expected one ${stage} contextual paragraph or cell linking to '${target}'.`,
        );
    }
  }
}
if (
  unchangedGuide &&
  !sitemap.includes(
    `<loc>https://www.combreport.com/guides/${unchangedGuide.slug}</loc><lastmod>${unchangedGuide.publishDate}</lastmod>`,
  )
)
  failures.push(
    `${unchangedGuide.slug}: unchanged guide must retain its publication lastmod.`,
  );
await writeFile(
  resolve(output, '..', 'guide-substance-review.md'),
  '# Guide substance review\n\nMain-body counts are review signals, not ranking thresholds. Build identity is checked against each registered article heading.\n\n| Route | Build identity | Main-body words | Main H2 headings | Evidence scope | Sources | Review signal |\n| --- | --- | ---: | --- | --- | ---: | --- |\n' +
    substanceRows.join('\n') +
    '\n',
);
if (failures.length) {
  console.error(`Generated SEO validation failed (${failures.length} issues):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(
  `Generated SEO validation passed (${articles.length} public guides).`,
);
