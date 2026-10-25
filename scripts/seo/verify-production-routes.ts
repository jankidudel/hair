import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { JSDOM } from 'jsdom';
import { articles } from '../../frontend/src/app/content.generated.ts';
import {
  canonicalOrigin,
  seoRoutesForArticles,
} from '../../frontend/src/app/seo-route-policy.ts';
import {
  pageReference,
  parseSitemap,
  sitemapParityErrors,
  type SitemapEntry,
} from './route-coverage.ts';

// Read-only bounded production crawl; no authentication, forms, indexing submissions or invalidations.
const policies = seoRoutesForArticles(articles);
const destination = resolve(
  process.argv[2] ?? 'reports/seo-route-audit/production.json',
);
const maxPages = 500;
async function request(pathOrUrl: string) {
  let url = new URL(pathOrUrl, canonicalOrigin).href;
  const redirectChain: {
    url: string;
    status: number;
    location: string | null;
  }[] = [];
  try {
    for (let redirects = 0; redirects < 8; redirects++) {
      if (!pageReference(url))
        throw Error('Redirect or sitemap leaves the documented site hosts.');
      const response = await fetch(url, {
        redirect: 'manual',
        signal: AbortSignal.timeout(12000),
        headers: { accept: 'text/html,application/xml,text/plain;q=0.9' },
      });
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get('location');
        redirectChain.push({ url, status: response.status, location });
        await response.body?.cancel();
        if (!location) throw Error('Redirect has no Location header.');
        url = new URL(location, url).href;
        continue;
      }
      let bytes = Buffer.from(await response.arrayBuffer());
      if (bytes[0] === 0x1f && bytes[1] === 0x8b) bytes = gunzipSync(bytes);
      return {
        requestedUrl: new URL(pathOrUrl, canonicalOrigin).href,
        finalUrl: url,
        status: response.status,
        contentType: response.headers.get('content-type'),
        xRobotsTag: response.headers.get('x-robots-tag'),
        redirectChain,
        text: bytes.toString('utf8'),
        networkError: null as string | null,
      };
    }
    throw Error('Redirect limit exceeded.');
  } catch (error) {
    return {
      requestedUrl: new URL(pathOrUrl, canonicalOrigin).href,
      finalUrl: null,
      status: null,
      contentType: null,
      xRobotsTag: null,
      redirectChain,
      text: '',
      networkError:
        error instanceof Error
          ? `${error.message}${error.cause ? ': ' + String(error.cause) : ''}`
          : String(error),
    };
  }
}
function robotsAccess(path: string, text: string): string {
  const groups: {
    agents: string[];
    rules: { allow: boolean; pattern: string }[];
  }[] = [];
  let current:
    | { agents: string[]; rules: { allow: boolean; pattern: string }[] }
    | undefined;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.split('#')[0].trim();
    const split = line.indexOf(':');
    if (split < 0) continue;
    const key = line.slice(0, split).toLowerCase();
    const value = line.slice(split + 1).trim();
    if (key === 'user-agent') {
      if (!current || current.rules.length) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if (current && ['allow', 'disallow'].includes(key) && value)
      current.rules.push({ allow: key === 'allow', pattern: value });
  }
  const specific = groups.filter((g) =>
    g.agents.some((agent) => agent !== '*' && 'googlebot'.includes(agent)),
  );
  const selected = specific.length
    ? specific
    : groups.filter((g) => g.agents.includes('*'));
  const matching = selected
    .flatMap((g) => g.rules)
    .filter((rule) => {
      const expression = rule.pattern
        .replace(/[.+?^{}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*');
      return new RegExp('^' + expression).test(path);
    })
    .sort(
      (a, b) =>
        b.pattern.length - a.pattern.length ||
        Number(b.allow) - Number(a.allow),
    );
  return matching[0]
    ? `${matching[0].allow ? 'allowed' : 'blocked'} by ${specific.length ? 'Googlebot' : 'User-agent:*'} ${matching[0].allow ? 'Allow' : 'Disallow'}: ${matching[0].pattern}`
    : 'allowed; no matching robots exclusion';
}
const [home, robots, firstSitemap] = await Promise.all([
  request('/'),
  request('/robots.txt'),
  request('/sitemap.xml'),
]);
const withoutText = (result: Awaited<ReturnType<typeof request>>) => {
  const { text, ...metadata } = result;
  void text;
  return metadata;
};
const report: { [key: string]: unknown } = {
  checkedAt: new Date().toISOString(),
  scope:
    'Actual read-only HTTP observations. Network failures are not evidence of a production outage.',
  preflight: {
    home: withoutText(home),
    robots: withoutText(robots),
    sitemap: withoutText(firstSitemap),
  },
};
if (home.networkError) {
  report.verification =
    'blocked by network access; full production crawl and release verification remain unverified';
  report.routes = policies.map((p) => ({
    path: p.path,
    expectedDisposition: p.disposition,
    status: null,
    verification: 'not fetched because homepage network preflight failed',
  }));
  process.exitCode = 1;
} else {
  const entries: SitemapEntry[] = [];
  const sitemapErrors: string[] = [];
  const sitemapDocuments: string[] = [];
  const pending = [firstSitemap];
  while (pending.length && sitemapDocuments.length < 20) {
    const response = pending.shift()!;
    if (sitemapDocuments.includes(response.requestedUrl)) continue;
    sitemapDocuments.push(response.requestedUrl);
    if (response.status !== 200 || response.networkError) {
      sitemapErrors.push(
        `${response.requestedUrl}: ${response.networkError ?? response.status}`,
      );
      continue;
    }
    try {
      const parsed = parseSitemap(response.text);
      entries.push(...parsed.entries);
      const remaining = Math.max(
        0,
        20 - sitemapDocuments.length - pending.length,
      );
      if (parsed.children.length > remaining)
        sitemapErrors.push('Sitemap child-document bound reached.');
      for (const child of parsed.children.slice(0, remaining)) {
        if (
          !sitemapDocuments.includes(child) &&
          !pending.some((item) => item.requestedUrl === child)
        )
          pending.push(await request(child));
      }
    } catch (error) {
      sitemapErrors.push(`${response.requestedUrl}: ${String(error)}`);
    }
  }
  if (pending.length) sitemapErrors.push('Sitemap-document bound reached.');
  const visited = new Set<string>();
  const queued = new Set<string>();
  const seeds = [
    '/',
    '/guides',
    '/tools',
    '/products',
    ...policies.map((p) => p.path),
    ...entries.flatMap((entry) => {
      const ref = pageReference(entry.url);
      return ref && !ref.query ? [ref.path] : [];
    }),
  ];
  const queue = seeds.filter((path) => {
    if (queued.has(path)) return false;
    queued.add(path);
    return true;
  });
  const routes: Record<string, unknown>[] = [];
  const outgoing = new Map<string, Set<string>>();
  const queryStateLinks: { source: string; href: string }[] = [];
  async function crawl(path: string) {
    visited.add(path);
    const response = path === '/' ? home : await request(path);
    const policy = policies.find((p) => p.path === path);
    const result: Record<string, unknown> = {
      path,
      expectedDisposition: policy?.disposition ?? 'unresolved-discrepancy',
      ...withoutText(response),
      robotsTxtAccess:
        robots.status === 200 ? robotsAccess(path, robots.text) : 'unverified',
    };
    if (response.contentType?.includes('text/html')) {
      const dom = new JSDOM(response.text);
      const doc = dom.window.document;
      outgoing.set(path, new Set());
      result.title = doc.title;
      result.description =
        doc
          .querySelector('meta[name="description"]')
          ?.getAttribute('content') ?? null;
      result.h1 = [...doc.querySelectorAll('h1')].map((h) =>
        h.textContent?.trim(),
      );
      result.canonicals = [
        ...doc.querySelectorAll('link[rel="canonical"]'),
      ].map((link) => link.getAttribute('href'));
      result.robots = [...doc.querySelectorAll('meta[name="robots"]')].map(
        (meta) => meta.getAttribute('content'),
      );
      result.initialContent = doc.querySelector('.not-found-page')
        ? 'not-found content'
        : (doc.querySelector('main')?.textContent?.trim().length ?? 0) > 80
          ? 'page-specific initial content'
          : 'incomplete shell';
      for (const anchor of doc.querySelectorAll('a[href]')) {
        const href = anchor.getAttribute('href')!;
        let ref: ReturnType<typeof pageReference> = null;
        try {
          ref = pageReference(
            href,
            response.finalUrl ?? canonicalOrigin + path,
          );
        } catch {
          continue;
        }
        if (!ref) continue;
        if (ref.query) {
          queryStateLinks.push({ source: path, href });
          continue;
        }
        if (
          /\.(?:js|css|svg|png|jpe?g|webp|ico|pdf|xml|txt|zip)$/i.test(ref.path)
        )
          continue;
        outgoing.get(path)!.add(ref.path);
        if (!queued.has(ref.path) && queued.size < maxPages) {
          queued.add(ref.path);
          queue.push(ref.path);
        }
      }
      dom.window.close();
    }
    routes.push(result);
  }
  while (queue.length && visited.size < maxPages) {
    const batch = queue.splice(0, Math.min(4, maxPages - visited.size));
    await Promise.all(batch.map(crawl));
  }
  const failures = [
    ...sitemapErrors,
    ...sitemapParityErrors(policies, entries),
  ];
  for (const row of routes) {
    const policy = policies.find((p) => p.path === row.path);
    const canonicals = row.canonicals as string[] | undefined;
    const noindex = /noindex/i.test(
      JSON.stringify(row.robots ?? []) + String(row.xRobotsTag ?? ''),
    );
    if (row.networkError) {
      failures.push(`${row.path}: network access unverified`);
      continue;
    }
    if (policy?.disposition === 'indexable-canonical') {
      if (
        !row.title ||
        !row.description ||
        (row.h1 as unknown[] | undefined)?.length !== 1
      )
        failures.push(
          `${row.path}: incomplete title, description or H1 metadata`,
        );
      if (
        row.status !== 200 ||
        row.initialContent !== 'page-specific initial content' ||
        !String(row.contentType).includes('text/html')
      )
        failures.push(
          `${row.path}: delivery does not establish complete 200 HTML`,
        );
      if (
        noindex ||
        canonicals?.length !== 1 ||
        (canonicals[0] !== policy.canonical &&
          !(row.path === '/' && canonicals[0] === canonicalOrigin))
      )
        failures.push(`${row.path}: indexability/canonical policy mismatch`);
      if (String(row.robotsTxtAccess).startsWith('blocked'))
        failures.push(`${row.path}: blocked by robots.txt`);
    } else if (!policy) {
      const finalReference = row.finalUrl
        ? pageReference(String(row.finalUrl))
        : null;
      if (
        (row.redirectChain as unknown[]).length &&
        finalReference &&
        policies.some((p) => p.path === finalReference.path)
      )
        row.disposition = 'redirect';
      else
        failures.push(
          `${row.path}: linked production destination has no resolved registered policy (HTTP ${row.status})`,
        );
    } else if (!noindex)
      failures.push(`${row.path}: intended excluded page lacks noindex`);
  }
  const missing = await request('/route-audit-not-found-check');
  report.notFoundCheck = withoutText(missing);
  if (missing.status !== 404)
    failures.push('Clearly nonexistent URL did not establish a real HTTP 404.');
  report.verification = failures.length
    ? 'production discrepancies or network limitations found'
    : 'production HTTP, sitemap and graph checks passed';
  report.sitemapDocuments = sitemapDocuments;
  report.sitemapEntries = entries;
  report.routes = routes.sort((a, b) =>
    String(a.path).localeCompare(String(b.path)),
  );
  report.graph = [...outgoing].map(([path, links]) => ({
    path,
    links: [...links].sort(),
  }));
  report.queryStateLinks = queryStateLinks;
  report.failures = failures;
  report.crawlBoundReached = queue.length > 0;
  if (queue.length || failures.length) process.exitCode = 1;
}
await mkdir(resolve(destination, '..'), { recursive: true });
await writeFile(destination, JSON.stringify(report, null, 2) + '\n');
console.log(
  JSON.stringify({ verification: report.verification, report: destination }),
);
