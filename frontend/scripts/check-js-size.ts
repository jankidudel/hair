// Fails the build when any prerendered page makes the browser download more
// startup JavaScript than the size limit allows. A page's startup JavaScript is
// its module entry scripts plus every <link rel="modulepreload">, measured with
// Brotli (what CloudFront serves to modern browsers). Lazy chunks loaded later
// (for example per-article bodies) are not counted.
//
// The limit guards against regressions such as an eagerly imported content
// catalogue or a heavy library landing in the shared bundle. Lower it when the
// bundle shrinks; raise it only with a reason.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { brotliCompressSync, constants } from 'node:zlib';

export const startupJsSizeLimitBytes = 240 * 1024;

const browserDirectory = resolve(
  import.meta.dirname,
  '..',
  'dist',
  'hair-frontend',
  'browser',
);

export function startupScripts(html: string): string[] {
  const sources = new Set<string>();
  for (const tag of html.match(/<script\b[^>]*>/g) ?? []) {
    if (!/\btype="module"/.test(tag)) continue;
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (src) sources.add(src);
  }
  for (const tag of html.match(/<link\b[^>]*>/g) ?? []) {
    if (!/\brel="modulepreload"/.test(tag)) continue;
    const href = tag.match(/\bhref="([^"]+)"/)?.[1];
    if (href) sources.add(href);
  }
  return [...sources];
}

async function htmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, {
    recursive: true,
    withFileTypes: true,
  });
  return (
    entries
      // Prerendered routes only; index.csr.html is the client-side fallback shell.
      .filter((entry) => entry.isFile() && entry.name === 'index.html')
      .map((entry) => join(entry.parentPath, entry.name))
  );
}

async function main(): Promise<void> {
  const compressedSizes = new Map<string, number>();
  const compressedSize = async (asset: string): Promise<number> => {
    const cached = compressedSizes.get(asset);
    if (cached !== undefined) return cached;
    const path = join(browserDirectory, asset.replace(/^\//, ''));
    const size = brotliCompressSync(await readFile(path), {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
    }).length;
    compressedSizes.set(asset, size);
    return size;
  };

  const pages: { route: string; bytes: number; scripts: number }[] = [];
  for (const file of await htmlFiles(browserDirectory)) {
    const html = await readFile(file, 'utf8');
    const scripts = startupScripts(html).filter(
      (src) => !/^(https?:)?\/\//.test(src),
    );
    let bytes = 0;
    for (const src of scripts) bytes += await compressedSize(src);
    const route =
      '/' + relative(browserDirectory, file).replace(/\/?index\.html$/, '');
    pages.push({ route, bytes, scripts: scripts.length });
  }
  if (pages.length === 0)
    throw new Error(`No prerendered pages found in ${browserDirectory}.`);

  pages.sort((a, b) => b.bytes - a.bytes);
  const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;
  const over = pages.filter((page) => page.bytes > startupJsSizeLimitBytes);
  const [largest] = pages;
  const smallest = pages[pages.length - 1];
  console.log(
    `Startup JS (Brotli) across ${pages.length} pages: ${kb(smallest.bytes)}–${kb(largest.bytes)} ` +
      `(largest ${largest.route}); limit ${kb(startupJsSizeLimitBytes)}.`,
  );
  if (over.length > 0) {
    for (const page of over.slice(0, 20))
      console.error(
        `${page.route}: ${kb(page.bytes)} of startup JS in ${page.scripts} script(s) exceeds the ${kb(startupJsSizeLimitBytes)} limit.`,
      );
    process.exitCode = 1;
  }
}

if (import.meta.main) await main();
