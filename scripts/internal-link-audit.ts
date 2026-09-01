import { readdir, readFile } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';

const canonicalHosts = new Set(['combreport.com', 'www.combreport.com']);
const ignoredSchemes = new Set(['mailto:', 'tel:', 'javascript:', 'data:']);

interface ElementNode {
  type: 'element';
  tagName: string;
  properties?: Record<string, unknown>;
  children?: HtmlNode[];
}

interface RootNode {
  type: 'root';
  children?: HtmlNode[];
}

type HtmlNode = ElementNode | RootNode | { children?: HtmlNode[] };

interface GeneratedPage {
  absolutePath: string;
  relativePath: string;
  route: string;
  ids: Set<string>;
  namedAnchors: Set<string>;
  links: Array<{ href: string; download: boolean }>;
  canonicals: string[];
}

export interface InternalLinkFailure {
  source: string;
  originalUrl: string;
  target: string;
  reason: string;
}

export interface InternalLinkAuditResult {
  pages: number;
  links: number;
  failures: InternalLinkFailure[];
}

function propertyValue(value: unknown): string | undefined {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return undefined;
}

function hasCanonicalRel(value: unknown): boolean {
  if (typeof value === 'string')
    return value.split(/\s+/).includes('canonical');
  return Array.isArray(value) && value.includes('canonical');
}

function visit(node: HtmlNode, visitor: (element: ElementNode) => void): void {
  if (node.type === 'element') visitor(node);
  for (const child of node.children ?? []) visit(child, visitor);
}

async function htmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.isFile() &&
        entry.name.endsWith('.html') &&
        entry.name !== 'index.csr.html'
        ? [path]
        : [];
    }),
  );
  return files.flat().sort();
}

function routeFor(relativePath: string): string {
  const posixPath = relativePath.split(sep).join('/');
  if (posixPath === 'index.html') return '/';
  if (posixPath.endsWith('/index.html'))
    return `/${posixPath.slice(0, -'index.html'.length)}`;
  return `/${posixPath.slice(0, -'.html'.length)}`;
}

async function readGeneratedPage(
  outputDirectory: string,
  absolutePath: string,
): Promise<GeneratedPage> {
  const html = await readFile(absolutePath, 'utf8');
  const tree = unified().use(rehypeParse).parse(html) as HtmlNode;
  const page: GeneratedPage = {
    absolutePath,
    relativePath: relative(outputDirectory, absolutePath).split(sep).join('/'),
    route: routeFor(relative(outputDirectory, absolutePath)),
    ids: new Set(),
    namedAnchors: new Set(),
    links: [],
    canonicals: [],
  };
  visit(tree, (element) => {
    const properties = element.properties ?? {};
    const id = propertyValue(properties['id']);
    if (id) page.ids.add(id);
    if (element.tagName === 'a') {
      const name = propertyValue(properties['name']);
      if (name) page.namedAnchors.add(name);
      const href = propertyValue(properties['href']);
      if (href)
        page.links.push({
          href,
          download: Object.hasOwn(properties, 'download'),
        });
    }
    if (element.tagName === 'area') {
      const href = propertyValue(properties['href']);
      if (href)
        page.links.push({
          href,
          download: Object.hasOwn(properties, 'download'),
        });
    }
    if (element.tagName === 'link' && hasCanonicalRel(properties['rel'])) {
      const href = propertyValue(properties['href']);
      if (href) page.canonicals.push(href);
    }
  });
  return page;
}

function isDevelopmentTarget(url: URL): boolean {
  return (
    url.hostname === 'localhost' || url.hostname.endsWith('.cloudfront.net')
  );
}

function resolveUrl(href: string, sourceRoute: string): URL | undefined {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith('#')) return undefined;
  const scheme = trimmed.match(/^[a-z][a-z0-9+.-]*:/i)?.[0].toLowerCase();
  if (scheme && ignoredSchemes.has(scheme)) return undefined;
  return new URL(trimmed, `https://www.combreport.com${sourceRoute}`);
}

function pageForPathname(
  pagesByRoute: Map<string, GeneratedPage>,
  pathname: string,
): GeneratedPage | undefined {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return (
    pagesByRoute.get(normalized) ??
    pagesByRoute.get(`${normalized}/`) ??
    pagesByRoute.get(`${normalized}.html`)
  );
}

function targetLabel(url: URL): string {
  return `${url.pathname}${url.search}${url.hash}`;
}

function validateTarget(
  source: GeneratedPage,
  originalUrl: string,
  url: URL,
  pagesByRoute: Map<string, GeneratedPage>,
): InternalLinkFailure | undefined {
  const target = targetLabel(url);
  const destination = pageForPathname(pagesByRoute, url.pathname);
  if (!destination)
    return {
      source: source.relativePath,
      originalUrl,
      target,
      reason: 'generated page not found',
    };
  if (
    url.hash.length > 1 &&
    !destination.ids.has(url.hash.slice(1)) &&
    !destination.namedAnchors.has(url.hash.slice(1))
  )
    return {
      source: source.relativePath,
      originalUrl,
      target,
      reason: 'anchor not found',
    };
  return undefined;
}

export async function auditInternalLinks(
  outputDirectory: string,
): Promise<InternalLinkAuditResult> {
  const pages = await Promise.all(
    (await htmlFiles(outputDirectory)).map((path) =>
      readGeneratedPage(outputDirectory, path),
    ),
  );
  const pagesByRoute = new Map<string, GeneratedPage>();
  for (const page of pages) {
    pagesByRoute.set(page.route, page);
    if (page.route.endsWith('/'))
      pagesByRoute.set(page.route.slice(0, -1) || '/', page);
  }
  const failures: InternalLinkFailure[] = [];
  let links = 0;
  const canonicalSources = new Map<string, GeneratedPage>();
  for (const page of pages) {
    for (const { href, download } of page.links) {
      if (download) continue;
      const url = resolveUrl(href, page.route);
      if (!url) continue;
      if (isDevelopmentTarget(url)) {
        failures.push({
          source: page.relativePath,
          originalUrl: href,
          target: targetLabel(url),
          reason: 'development or localhost URL',
        });
        continue;
      }
      if (!canonicalHosts.has(url.hostname)) continue;
      links += 1;
      const failure = validateTarget(page, href, url, pagesByRoute);
      if (failure) failures.push(failure);
    }
    for (const canonical of page.canonicals) {
      const url = resolveUrl(canonical, page.route);
      if (
        !url ||
        !canonicalHosts.has(url.hostname) ||
        isDevelopmentTarget(url)
      ) {
        failures.push({
          source: page.relativePath,
          originalUrl: canonical,
          target: canonical,
          reason: 'canonical URL must use the production site domain',
        });
        continue;
      }
      const failure = validateTarget(page, canonical, url, pagesByRoute);
      if (failure)
        failures.push({ ...failure, reason: `canonical ${failure.reason}` });
      const normalizedCanonical = `${url.origin}${url.pathname}`;
      const previous = canonicalSources.get(normalizedCanonical);
      if (previous && previous.absolutePath !== page.absolutePath)
        failures.push({
          source: page.relativePath,
          originalUrl: canonical,
          target: normalizedCanonical,
          reason: `duplicate canonical URL (also used by ${previous.relativePath})`,
        });
      else canonicalSources.set(normalizedCanonical, page);
    }
  }
  return { pages: pages.length, links, failures };
}
