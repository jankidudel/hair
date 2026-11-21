// Shared loader for the post-build checks in scripts/check-built-site.ts,
// scripts/audit-built-content.ts and scripts/check-public-routes.ts.
// The generated sitemap is the list of canonical pages, so every check judges
// exactly the documents that are submitted to search engines.
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import { canonicalOrigin } from '../../frontend/src/app/seo-route-policy.ts';
import { pageReference, parseSitemap } from '../seo/route-coverage.ts';

export { canonicalOrigin };

export interface BuiltPage {
  readonly path: string;
  readonly file: string;
  readonly document: Document;
}

export function builtSiteRoot(argument = process.argv[2]): string {
  return resolve(
    argument ??
      process.env['HAIR_BUILD_ROOT'] ??
      join(import.meta.dirname, '../../frontend/dist/hair-frontend/browser'),
  );
}

export function documentFile(root: string, path: string): string {
  return path === '/'
    ? join(root, 'index.html')
    : join(root, path.slice(1), 'index.html');
}

export async function sitemapPaths(root: string): Promise<string[]> {
  const { entries } = parseSitemap(
    await readFile(join(root, 'sitemap.xml'), 'utf8'),
  );
  return entries.map((entry) => {
    const ref = pageReference(entry.url);
    if (!ref) throw new Error(`sitemap.xml: off-site URL ${entry.url}`);
    return ref.path;
  });
}

export async function loadPage(root: string, path: string): Promise<BuiltPage> {
  const file = documentFile(root, path);
  return {
    path,
    file,
    document: new JSDOM(await readFile(file, 'utf8')).window.document,
  };
}

export async function loadSitemapPages(root: string): Promise<BuiltPage[]> {
  return Promise.all(
    (await sitemapPaths(root)).map((path) => loadPage(root, path)),
  );
}

export const cleanText = (text: string | null | undefined) =>
  (text ?? '').replace(/\s+/g, ' ').trim();

/** Same-site page path for an href on `fromPath`, without query or fragment. */
export function internalPath(href: string, fromPath: string): string | null {
  try {
    return pageReference(href, canonicalOrigin + fromPath)?.path ?? null;
  } catch {
    return null;
  }
}
