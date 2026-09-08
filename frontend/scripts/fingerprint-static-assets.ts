import { createHash } from 'node:crypto';
import { readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const outputDirectory = resolve(
  import.meta.dirname,
  '..',
  'dist',
  'hair-frontend',
  'browser',
);
const entryAssetNames = ['main.js', 'styles.css'] as const;
const indexHtml = await readFile(join(outputDirectory, 'index.html'), 'utf8');

const replacements = new Map<string, string>();
for (const entryAssetName of entryAssetNames) {
  if (!indexHtml.includes(entryAssetName)) {
    ensureEntryAssetIsAlreadyFingerprinted(indexHtml, entryAssetName);
    continue;
  }

  const sourcePath = join(outputDirectory, entryAssetName);
  const contents = await readFile(sourcePath);
  const extension = extname(entryAssetName);
  const basename = entryAssetName.slice(0, -extension.length);
  const fingerprint = createHash('sha256')
    .update(contents)
    .digest('hex')
    .slice(0, 16);
  const fingerprintedName = `${basename}.${fingerprint}${extension}`;

  await rename(sourcePath, join(outputDirectory, fingerprintedName));
  replacements.set(entryAssetName, fingerprintedName);
}

await rewriteHtmlReferences(outputDirectory);
if (replacements.size === 0) {
  console.log('Static entry assets are already fingerprinted.');
} else {
  console.log(
    `Fingerprinted static entry assets: ${[...replacements.values()].join(', ')}.`,
  );
}

function ensureEntryAssetIsAlreadyFingerprinted(
  html: string,
  entryAssetName: string,
): void {
  const extension = extname(entryAssetName);
  const basename = entryAssetName.slice(0, -extension.length);
  const fingerprintedEntryPattern = new RegExp(
    `${basename}[-.][A-Za-z0-9_-]{8,}\\${extension}`,
  );

  if (!fingerprintedEntryPattern.test(html)) {
    throw new Error(
      `Expected ${entryAssetName} or a fingerprinted equivalent in index.html.`,
    );
  }
}

async function rewriteHtmlReferences(directory: string): Promise<void> {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return rewriteHtmlReferences(path);
      if (!entry.isFile() || !entry.name.endsWith('.html')) return;

      const html = await readFile(path, 'utf8');
      const fingerprintedHtml = [...replacements].reduce(
        (result, [sourceName, fingerprintedName]) =>
          result.replaceAll(sourceName, fingerprintedName),
        html,
      );
      await writeFile(path, fingerprintedHtml);
    }),
  );
}
