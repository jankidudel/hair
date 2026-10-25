import ts from 'typescript';
import { JSDOM } from 'jsdom';
import {
  canonicalOrigin,
  type SeoRoutePolicy,
} from '../../frontend/src/app/seo-route-policy.ts';
import { isValidCalendarDate } from '../../frontend/src/app/publication-date.ts';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

export interface RouterPath {
  path: string;
  source: string;
  redirectTo?: string;
}

/** Read the actual router without importing Angular components into a Node audit. */
export function registeredRouterPaths(
  source: string,
  file = 'app.routes.ts',
): RouterPath[] {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const paths: RouterPath[] = [];
  const property = (node: ts.ObjectLiteralExpression, key: string) =>
    node.properties.find(
      (p) =>
        ts.isPropertyAssignment(p) &&
        p.name.getText(tree).replace(/['"]/g, '') === key,
    ) as ts.PropertyAssignment | undefined;
  const literal = (
    value: ts.Expression | undefined,
    context: string,
  ): string => {
    if (!value || !ts.isStringLiteralLike(value))
      throw Error(
        `${file}: unresolved ${context}; route audit must resolve its actual source.`,
      );
    return value.text;
  };
  function routes(array: ts.ArrayLiteralExpression, parent = ''): void {
    for (const item of array.elements) {
      if (!ts.isObjectLiteralExpression(item))
        throw Error(
          `${file}: unresolved route spread/expression ${item.getText(tree)}.`,
        );
      const pathProperty = property(item, 'path');
      if (!pathProperty)
        throw Error(`${file}: a route has no resolved literal path.`);
      const part = literal(pathProperty.initializer, 'route path');
      const path = ('/' + [parent, part].filter(Boolean).join('/')).replace(
        /\/{2,}/g,
        '/',
      );
      const children = property(item, 'children');
      if (property(item, 'loadChildren'))
        throw Error(
          `${file}: lazy route '${path}' needs its child-route source resolved before coverage can pass.`,
        );
      const redirect = property(item, 'redirectTo');
      if (children) {
        if (!ts.isArrayLiteralExpression(children.initializer))
          throw Error(`${file}: unresolved children for ${path}.`);
        routes(children.initializer, path.replace(/^\//, ''));
      }
      if (
        property(item, 'component') ||
        property(item, 'loadComponent') ||
        redirect ||
        !children
      )
        paths.push({
          path,
          source: `${file}:${tree.getLineAndCharacterOfPosition(item.getStart(tree)).line + 1}`,
          ...(redirect
            ? { redirectTo: literal(redirect.initializer, `${path} redirect`) }
            : {}),
        });
    }
  }
  let found = false;
  function visit(node: ts.Node): void {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(tree) === 'routes'
    ) {
      if (!node.initializer || !ts.isArrayLiteralExpression(node.initializer))
        throw Error(`${file}: routes must resolve to an array.`);
      found = true;
      routes(node.initializer);
    } else ts.forEachChild(node, visit);
  }
  visit(tree);
  if (!found) throw Error(`${file}: no routes export was resolved.`);
  return paths;
}

export function routeClassificationErrors(
  router: readonly RouterPath[],
  policies: readonly SeoRoutePolicy[],
  patterns: readonly { path: string }[],
): string[] {
  const errors: string[] = [];
  const exact = new Set(
    router
      .filter((r) => !r.path.includes(':') && !r.path.includes('*'))
      .map((r) => r.path),
  );
  const known = new Set(
    policies.filter((r) => r.pageType !== 'guide').map((r) => r.path),
  );
  for (const route of router) {
    const patterned = route.path.includes(':') || route.path.includes('*');
    if (
      !(patterned
        ? patterns.some((p) => p.path === route.path)
        : known.has(route.path))
    )
      errors.push(
        `Unclassified registered route ${route.path} (${route.source}).`,
      );
    if (
      route.redirectTo &&
      policies.some(
        (p) => p.path === route.path && p.disposition === 'indexable-canonical',
      )
    )
      errors.push(
        `Redirect ${route.path} cannot be an indexable canonical page.`,
      );
  }
  for (const policy of policies.filter((r) => r.pageType !== 'guide'))
    if (!exact.has(policy.path))
      errors.push(
        `SEO policy ${policy.path} has no registered concrete router page.`,
      );
  if (new Set(policies.map((r) => r.path)).size !== policies.length)
    errors.push('Duplicate SEO route policy paths.');
  return errors;
}

/** Keep case/reserved encodings; only documented host/slash aliases are normalized. */
export function pageReference(
  href: string,
  from = canonicalOrigin,
): { path: string; query: string; hash: string } | null {
  const url = new URL(href, from);
  if (
    !['https://www.combreport.com', 'https://combreport.com'].includes(
      url.origin,
    )
  )
    return null;
  return {
    path: url.pathname.replace(/\/$/, '') || '/',
    query: url.search,
    hash: url.hash,
  };
}
export interface SitemapEntry {
  url: string;
  lastmod?: string;
}
export function parseSitemap(xml: string): {
  entries: SitemapEntry[];
  children: string[];
} {
  const dom = new JSDOM(xml, { contentType: 'application/xml' });
  const doc = dom.window.document;
  const root = doc.documentElement.localName;
  if (!['urlset', 'sitemapindex'].includes(root))
    throw Error(`Unexpected sitemap root ${root}.`);
  const entries = [...doc.getElementsByTagName('url')].map((node) => ({
    url: node.getElementsByTagName('loc')[0]?.textContent?.trim() ?? '',
    ...(node.getElementsByTagName('lastmod')[0]
      ? { lastmod: node.getElementsByTagName('lastmod')[0].textContent?.trim() }
      : {}),
  }));
  const children = [...doc.getElementsByTagName('sitemap')].map(
    (node) => node.getElementsByTagName('loc')[0]?.textContent?.trim() ?? '',
  );
  dom.window.close();
  return { entries, children };
}
export function sitemapParityErrors(
  policies: readonly SeoRoutePolicy[],
  entries: readonly SitemapEntry[],
): string[] {
  const errors: string[] = [];
  const counts = new Map<string, number>();
  for (const entry of entries) {
    let ref: ReturnType<typeof pageReference> = null;
    try {
      ref = pageReference(entry.url);
    } catch {
      /* Report malformed URLs below. */
    }
    if (
      !ref ||
      (!entry.url.startsWith(canonicalOrigin + '/') &&
        entry.url !== canonicalOrigin) ||
      ref.query ||
      ref.hash
    ) {
      errors.push(`Invalid canonical sitemap URL ${entry.url}.`);
      continue;
    }
    counts.set(ref.path, (counts.get(ref.path) ?? 0) + 1);
    const policy = policies.find((p) => p.path === ref.path);
    if (!policy || policy.disposition !== 'indexable-canonical')
      errors.push(
        `Unexpected sitemap entry ${entry.url}; no intended indexable canonical policy.`,
      );
    if (entry.lastmod !== policy?.lastmod)
      errors.push(
        `${ref.path}: sitemap lastmod differs from its maintained source (expected ${policy?.lastmod ?? 'omitted'}).`,
      );
    if (entry.lastmod && !isValidCalendarDate(entry.lastmod))
      errors.push(`${ref.path}: invalid lastmod date.`);
  }
  for (const policy of policies.filter(
    (p) => p.disposition === 'indexable-canonical',
  ))
    if (counts.get(policy.path) !== 1)
      errors.push(
        `${policy.path}: expected exactly one sitemap entry; found ${counts.get(policy.path) ?? 0}.`,
      );
  return errors;
}

export async function generatedHtmlFiles(directory: string): Promise<string[]> {
  return (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map((entry) =>
        entry.isDirectory()
          ? generatedHtmlFiles(resolve(directory, entry.name))
          : entry.name === 'index.html'
            ? [resolve(directory, entry.name)]
            : [],
      ),
    )
  ).flat();
}
export const generatedRoutePath = (root: string, file: string) =>
  '/' +
  relative(root, file)
    .replace(/(?:^|\/)index\.html$/, '')
    .replace(/\/$/, '');

/** Fast, network-free integration gate against actual documents, independent of the sitemap list. */
export async function builtRouteCoverageErrors(
  root: string,
  policies: readonly SeoRoutePolicy[],
): Promise<string[]> {
  const errors: string[] = [];
  const files = await generatedHtmlFiles(root);
  const generated = new Map(
    files.map((file) => [generatedRoutePath(root, file), file]),
  );
  for (const [path] of generated)
    if (!policies.some((p) => p.path === path))
      errors.push(`Generated route ${path} has no explicit SEO disposition.`);
  for (const policy of policies) {
    const file = generated.get(policy.path);
    if (!file) {
      errors.push(`Registered route ${policy.path} has no generated page.`);
      continue;
    }
    const dom = new JSDOM(await readFile(file, 'utf8'));
    const doc = dom.window.document;
    const canonicals = [...doc.querySelectorAll('link[rel="canonical"]')].map(
      (link) => link.getAttribute('href') ?? '',
    );
    const noindex = [...doc.querySelectorAll('meta[name="robots"]')].some(
      (meta) => /\bnoindex\b/i.test(meta.getAttribute('content') ?? ''),
    );
    if (policy.disposition === 'indexable-canonical') {
      const canonical = canonicals[0];
      if (
        canonicals.length !== 1 ||
        !canonical?.startsWith(canonicalOrigin + '/') ||
        pageReference(canonical)?.path !== policy.path ||
        new URL(canonical).search ||
        new URL(canonical).hash
      )
        errors.push(
          `${policy.path}: built canonical does not match search policy.`,
        );
      if (noindex)
        errors.push(
          `${policy.path}: intended indexable page delivers noindex.`,
        );
      if (
        !doc.title ||
        !doc
          .querySelector('meta[name="description"]')
          ?.getAttribute('content') ||
        doc.querySelectorAll('h1').length !== 1
      )
        errors.push(
          `${policy.path}: incomplete title/description/H1 metadata.`,
        );
      const main = doc.querySelector('main');
      if (
        !main ||
        (main.textContent?.trim().length ?? 0) < 80 ||
        doc.querySelector('.not-found-page')
      )
        errors.push(
          `${policy.path}: built output is an incomplete shell or not-found content.`,
        );
    } else if (!noindex || canonicals.length)
      errors.push(
        `${policy.path}: intentional exclusion must deliver noindex and no canonical.`,
      );
    dom.window.close();
  }
  return errors;
}
