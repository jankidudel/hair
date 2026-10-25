import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { JSDOM } from 'jsdom';
import { articles } from '../../frontend/src/app/content.generated.ts';
import { auditInternalLinks } from '../internal-link-audit.ts';

// Audit artifacts are local evidence, never a claim about production HTTP or GSC.
const base = 'https://www.combreport.com';
const root = resolve(
  import.meta.dirname,
  '../../frontend/dist/hair-frontend/browser',
);
const destination = resolve(
  process.argv[2] ?? '/tmp/combreport-built-route-audit.json',
);
const normalize = (url: string) => {
  const parsed = new URL(url, base);
  return [base, 'https://combreport.com'].includes(parsed.origin)
    ? parsed.pathname.replace(/\/$/, '') || '/'
    : null;
};
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
const sitemapRoutes = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    normalize(match[1]),
  ),
);
const incoming = new Map<string, Set<string>>();
const contextual = new Map<string, Set<string>>();
const rows = await Promise.all(
  (await files(root)).map(async (file) => {
    const path = '/' + relative(root, file).replace(/(?:^|\/)index\.html$/, '');
    const route = path.replace(/\/$/, '') || '/';
    const dom = new JSDOM(await readFile(file, 'utf8'));
    const doc = dom.window.document;
    for (const anchor of doc.querySelectorAll('a[href]')) {
      const target = normalize(anchor.getAttribute('href')!);
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
      registryArticle: articles.some(
        (article) => route === '/guides/' + article.slug,
      ),
      documentStatus:
        route === '/404' ? 'not-found document' : 'generated document present',
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
      (article) => !rows.some((row) => row.route === '/guides/' + article.slug),
    )
    .map((article) => article.slug),
  allInternalOrphans: indexable
    .filter((row) => row.route !== '/' && !incoming.get(row.route)?.size)
    .map((row) => row.url),
  noContextualIncoming: indexable
    .filter((row) => row.registryArticle && !contextual.get(row.route)?.size)
    .map((row) => row.url),
  helperRoutesOutsideSitemap: rows
    .filter((row) => !row.sitemapIncluded && !row.registryArticle)
    .map((row) => row.url),
};
const links = await auditInternalLinks(root);
const report = {
  scope:
    'Built initial HTML and published source registry. HTTP status, production 404 response, layout and private GSC performance are not verified by this audit.',
  generatedAt: new Date().toISOString(),
  findings,
  brokenInternalLinks: links.failures,
  routes: rows.map((row) => ({
    ...row,
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
      findings,
      brokenInternalLinks: links.failures.length,
      report: destination,
    },
    null,
    2,
  ),
);
if (
  findings.emptyRelatedGuideShells.length ||
  findings.invalidMetadata.length ||
  findings.missingSitemapDocuments.length ||
  findings.missingRegistryDocuments.length ||
  links.failures.length
)
  process.exitCode = 1;
