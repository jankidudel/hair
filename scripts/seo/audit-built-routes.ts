import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  seoRoutesForArticles,
  routePatternPolicies,
} from '../../frontend/src/app/seo-route-policy.ts';
import {
  registeredRouterPaths,
  routeClassificationErrors,
  sitemapParityErrors,
  parseSitemap,
  builtRouteCoverageErrors,
  pageReference,
} from './route-coverage.ts';
import { JSDOM } from 'jsdom';
import { articles } from '../../frontend/src/app/content.generated.ts';
import { guideCategories } from '../../frontend/src/app/article-registry.ts';
import { canonicalComparisons } from '../../frontend/src/app/product-comparisons.ts';
import { auditInternalLinks } from '../internal-link-audit.ts';

export async function runBuiltRouteAudit(outputPath?: string) {
  // Audit artifacts are local evidence, never a claim about production HTTP or GSC.
  const base = 'https://www.combreport.com';
  const root = resolve(
    import.meta.dirname,
    '../../frontend/dist/hair-frontend/browser',
  );
  const destination = resolve(outputPath ?? 'reports/seo-url-inventory.json');
  const normalize = (url: string) => {
    const ref = pageReference(url);
    return ref && !ref.query ? ref.path : null;
  };
  const policies = seoRoutesForArticles(articles);
  const router = registeredRouterPaths(
    await readFile(
      resolve(import.meta.dirname, '../../frontend/src/app/app.routes.ts'),
      'utf8',
    ),
  );
  const classificationErrors = routeClassificationErrors(
    router,
    policies,
    routePatternPolicies,
  );
  async function files(directory: string): Promise<string[]> {
    return (
      await Promise.all(
        (await readdir(directory, { withFileTypes: true })).map((entry) =>
          entry.isDirectory()
            ? files(resolve(directory, entry.name))
            : entry.name === 'index.html'
              ? [resolve(directory, entry.name)]
              : [],
        ),
      )
    ).flat();
  }
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  const parsedSitemap = parseSitemap(sitemap);
  const previousAudit = JSON.parse(
    await readFile(
      resolve(
        import.meta.dirname,
        '../../reports/batch-22-built-route-audit.json',
      ),
      'utf8',
    ),
  ) as { routes: { route: string; sitemapIncluded: boolean }[] };
  const previouslyOmitted = new Set(
    previousAudit.routes
      .filter((row) => !row.sitemapIncluded)
      .map((row) => row.route),
  );
  const sitemapRoutes = new Set(
    parsedSitemap.entries.map((entry) => normalize(entry.url)),
  );
  const outgoing = new Map<string, Set<string>>();
  const queryStateLinks: { source: string; destination: string }[] = [];
  const incoming = new Map<string, Set<string>>();
  const contextual = new Map<string, Set<string>>();
  const rows = await Promise.all(
    (await files(root)).map(async (file) => {
      const path =
        '/' + relative(root, file).replace(/(?:^|\/)index\.html$/, '');
      const route = path.replace(/\/$/, '') || '/';
      const dom = new JSDOM(await readFile(file, 'utf8'));
      const doc = dom.window.document;
      outgoing.set(route, new Set());
      const policy = policies.find((p) => p.path === route);
      for (const anchor of doc.querySelectorAll('a[href]')) {
        const href = anchor.getAttribute('href')!;
        const ref = pageReference(href, base + route);
        if (ref?.query)
          queryStateLinks.push({ source: route, destination: href });
        const target = ref && !ref.query ? ref.path : null;
        if (target) outgoing.get(route)!.add(target);
        if (!target || target === route) continue;
        const add = (map: Map<string, Set<string>>) => {
          if (!map.has(target)) map.set(target, new Set());
          map.get(target)!.add(route);
        };
        add(incoming);
        if (anchor.closest('.article-body, .article-next-steps, .article-faq'))
          add(contextual);
      }
      const schemaTypes = new Set<string>();
      const visit = (value: unknown): void => {
        if (!value || typeof value !== 'object') return;
        const object = value as Record<string, unknown>;
        const types = object['@type'];
        if (typeof types === 'string') schemaTypes.add(types);
        else if (Array.isArray(types))
          types.forEach((type) => schemaTypes.add(String(type)));
        Object.values(object).forEach((child) => {
          if (Array.isArray(child)) child.forEach(visit);
          else if (typeof child === 'object') visit(child);
        });
      };
      for (const script of doc.querySelectorAll(
        'script[type="application/ld+json"]',
      ))
        visit(JSON.parse(script.textContent!));
      const canonicals = [...doc.querySelectorAll('link[rel="canonical"]')].map(
        (link) => link.getAttribute('href'),
      );
      const robots = [...doc.querySelectorAll('meta[name="robots"]')].map(
        (meta) => meta.getAttribute('content') ?? '',
      );
      const row = {
        url: base + (route === '/' ? '' : route),
        route,
        stableId: policy?.id ?? null,
        diagnosis:
          previouslyOmitted.has(route) &&
          policy?.disposition === 'indexable-canonical'
            ? 'Previously omitted indexable canonical page.'
            : policy?.disposition === 'indexable-canonical'
              ? 'Existing public canonical page.'
              : 'Intentional search exclusion.',
        actionTaken:
          policy?.disposition === 'indexable-canonical'
            ? previouslyOmitted.has(route)
              ? 'Included in the shared-policy generated sitemap; retained existing incoming navigation.'
              : 'Preserved inclusion; registered explicit policy and verified built output.'
            : 'Preserved noindex directive and sitemap exclusion.',
        remainingLimitation:
          'Production HTTP delivery, response headers and robots access remain unverified by this built-output audit.',
        verificationResult:
          'Generated document inspected; see coverage.classificationErrors for any failing delivery or metadata assertion.',
        pageType: policy?.pageType ?? 'unclassified',
        category:
          policy?.category ??
          guideCategories.find((category) => category.path === route)?.id ??
          null,
        intendedIndexability: policy?.disposition === 'indexable-canonical',
        disposition: policy?.disposition ?? 'unresolved-discrepancy',
        dispositionReason:
          policy?.reason ?? 'Generated route has no matching policy.',
        canonicalPolicy: policy?.canonical ?? null,
        lastmod: policy?.lastmod ?? null,
        lastmodSource: policy?.lastmodSource ?? 'Unknown',
        generatedOutput: relative(resolve(import.meta.dirname, '../..'), file),
        discoverySources: [
          'generated-output',
          ...(guideCategories.some((category) => category.path === route)
            ? ['category-registry']
            : []),
          ...(canonicalComparisons.some(
            (comparison) => comparison.path === route,
          )
            ? ['comparison-registry']
            : []),
          ...(policy?.pageType === 'guide'
            ? ['article-registry']
            : router.some((r) => r.path === route)
              ? ['router']
              : []),
          ...(sitemapRoutes.has(route) ? ['sitemap'] : []),
        ],
        responseStatus: null,
        redirectChain: null,
        finalUrl: null,
        responseContentType: null,
        xRobotsTag: null,
        robotsTxtAccess: null,
        productionVerification: 'Not fetched by this network-free built audit.',
        initialHtmlContent: doc.querySelector('.not-found-page')
          ? 'not-found content'
          : (doc.querySelector('main')?.textContent?.trim().length ?? 0) > 80
            ? 'page-specific initial content'
            : 'incomplete shell',
        sitemapEntryCount: parsedSitemap.entries.filter(
          (entry) => normalize(entry.url) === route,
        ).length,
        registryArticle: articles.some(
          (article) => route === '/guides/' + article.slug,
        ),
        documentStatus:
          route === '/404'
            ? 'not-found document'
            : 'generated document present',
        httpStatus: null,
        title: doc.title,
        description:
          doc
            .querySelector('meta[name="description"]')
            ?.getAttribute('content') ?? null,
        h1: [...doc.querySelectorAll('h1')].map((h) => h.textContent?.trim()),
        canonicals,
        robots,
        indexable:
          route !== '/404' && !robots.some((value) => /noindex/i.test(value)),
        schemaTypes: [...schemaTypes],
        emptyRelatedGuideShell: [
          ...doc.querySelectorAll('.article-next-steps'),
        ].some(
          (section) =>
            section.querySelector('h2')?.textContent?.trim() ===
              'Related guides' && !section.querySelector('a[href^="/guides/"]'),
        ),
        dryerChooserInitialValues:
          route === '/guides/how-to-choose-hair-dryer'
            ? [...doc.querySelectorAll('app-hair-dryer-finder select')].map(
                (select) => (select as HTMLSelectElement).value,
              )
            : null,
        sitemapIncluded: sitemapRoutes.has(route),
      };
      dom.window.close();
      return row;
    }),
  );
  rows.sort((a, b) => a.route.localeCompare(b.route));
  const indexable = rows.filter((row) => row.indexable);
  const duplicates = (field: 'title' | 'description') => {
    const grouped = new Map<string, string[]>();
    for (const row of indexable) {
      const value = row[field];
      if (value) grouped.set(value, [...(grouped.get(value) ?? []), row.url]);
    }
    return [...grouped]
      .filter(([, urls]) => urls.length > 1)
      .map(([value, urls]) => ({ value, urls }));
  };
  const findings = {
    duplicateTitles: duplicates('title'),
    emptyRelatedGuideShells: indexable
      .filter((row) => row.emptyRelatedGuideShell)
      .map((row) => row.url),
    duplicateDescriptions: duplicates('description'),
    invalidMetadata: indexable
      .filter(
        (row) =>
          !row.title ||
          !row.description ||
          row.h1.length !== 1 ||
          row.canonicals.length !== 1 ||
          normalize(row.canonicals[0] ?? '') !== row.route,
      )
      .map((row) => row.url),
    missingSitemapDocuments: [...sitemapRoutes].filter(
      (route) => !rows.some((row) => row.route === route),
    ),
    missingRegistryDocuments: articles
      .filter(
        (article) =>
          !rows.some((row) => row.route === '/guides/' + article.slug),
      )
      .map((article) => article.slug),
    allInternalOrphans: indexable
      .filter((row) => row.route !== '/' && !incoming.get(row.route)?.size)
      .map((row) => row.url),
    noContextualIncoming: indexable
      .filter((row) => row.registryArticle && !contextual.get(row.route)?.size)
      .map((row) => row.url),
    routesOutsideSitemap: rows
      .filter((row) => !row.sitemapIncluded && !row.registryArticle)
      .map((row) => row.url),
  };
  const links = await auditInternalLinks(root);
  const registered = new Set(policies.map((p) => p.path));
  const generated = new Set(rows.map((row) => row.route));
  const linked = new Set(
    [...outgoing.values()].flatMap((destinations) => [...destinations]),
  );
  const intended = new Set(
    policies
      .filter((p) => p.disposition === 'indexable-canonical')
      .map((p) => p.path),
  );
  const difference = (a: Set<string>, b: Set<string | null>) =>
    [...a].filter((path) => !b.has(path)).sort();
  const reachable = new Set<string>();
  const queue = [
    '/',
    '/guides',
    '/tools',
    '/products',
    ...policies.filter((p) => p.pageType === 'hub').map((p) => p.path),
  ];
  while (queue.length) {
    const path = queue.shift()!;
    if (reachable.has(path)) continue;
    reachable.add(path);
    for (const target of outgoing.get(path) ?? [])
      if (registered.has(target) && !reachable.has(target)) queue.push(target);
  }
  const coverageErrors = [
    ...classificationErrors,
    ...canonicalComparisons
      .filter((comparison) => !registered.has(comparison.path))
      .map(
        (comparison) =>
          `Comparison ${comparison.slug} has no registered concrete destination ${comparison.path}.`,
      ),
    ...sitemapParityErrors(policies, parsedSitemap.entries),
    ...(await builtRouteCoverageErrors(root, policies)),
  ];
  const coverage = {
    counts: {
      registered: registered.size,
      generated: generated.size,
      linked: linked.size,
      intendedIndexable: intended.size,
      sitemap: parsedSitemap.entries.length,
    },
    newlyIncludedRoutes: [...previouslyOmitted]
      .filter((path) => intended.has(path))
      .sort(),
    intendedMissingFromSitemap: difference(intended, sitemapRoutes),
    sitemapOutsideIntended: [...sitemapRoutes].filter(
      (path) => path && !intended.has(path),
    ),
    registeredMissingGenerated: difference(registered, generated),
    linkedUnregistered: difference(linked, registered),
    registeredUnlinked: difference(registered, linked),
    indexableUnreachable: [...intended].filter((path) => !reachable.has(path)),
    classificationErrors: coverageErrors,
    patterns: routePatternPolicies,
    productComparisonRoutes: canonicalComparisons.map((comparison) => ({
      id: comparison.slug,
      path: comparison.path,
      guideSlug: comparison.guideSlug,
    })),
    productComparisonExpansion:
      'canonicalComparisons point to existing published guide paths; no separate product-route permutations are registered.',
    delivery:
      'Existing CloudFront apex-to-www 301 and clean-path-to-index.html rewrite; missing S3 objects map to /404/index.html with status 404. Source reviewed; no infrastructure change.',
    queryStateLinks,
  };
  const report = {
    scope:
      'Built initial HTML and published source registry. HTTP status, production 404 response, layout and private GSC performance are not verified by this audit.',
    generatedAt: new Date().toISOString(),
    coverage,
    findings,
    brokenInternalLinks: links.failures,
    routes: rows.map((row) => ({
      ...row,
      discoverySources: [
        ...row.discoverySources,
        ...(incoming.get(row.route)?.size ? ['internal-link'] : []),
        ...(incoming.get(row.route)?.has('/tools') ? ['tools-index'] : []),
      ],
      allInternalIncomingCount: incoming.get(row.route)?.size ?? 0,
      contextualIncomingCount: contextual.get(row.route)?.size ?? 0,
      incomingInternalPages: [...(incoming.get(row.route) ?? [])].sort(),
      incomingContextualArticlePages: [
        ...(contextual.get(row.route) ?? []),
      ].sort(),
    })),
  };
  await mkdir(resolve(destination, '..'), { recursive: true });
  await writeFile(destination, JSON.stringify(report, null, 2) + '\n');
  console.log(
    JSON.stringify(
      {
        routes: rows.length,
        coverage,
        findings,
        brokenInternalLinks: links.failures.length,
        report: destination,
      },
      null,
      2,
    ),
  );
  if (
    coverageErrors.length ||
    coverage.linkedUnregistered.length ||
    coverage.indexableUnreachable.length ||
    findings.allInternalOrphans.length ||
    findings.emptyRelatedGuideShells.length ||
    findings.invalidMetadata.length ||
    findings.missingSitemapDocuments.length ||
    findings.missingRegistryDocuments.length ||
    links.failures.length
  )
    process.exitCode = 1;

  return report;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await runBuiltRouteAudit(process.argv[2]);
