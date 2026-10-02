import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { productProfiles } from '../src/app/product-comparisons.ts';

const contentDirectory = resolve(import.meta.dirname, '..', 'content');
const spellingPatterns = [
  /\bprioritis(?:e|ing)\b/gi,
  /\btravell(?:ing|ed)\b/gi,
  /\bcentre\b/gi,
  /\bmicrofibre\b/gi,
  /\bcolours\b/gi,
];
const spellingExceptions = new Set<string>();
const hostExceptions = new Set<string>();
const files = (await readdir(contentDirectory)).filter((file) =>
  file.endsWith('.html'),
);
const spellingWarnings: string[] = [];

for (const file of files) {
  const content = await readFile(resolve(contentDirectory, file), 'utf8');
  for (const pattern of spellingPatterns) {
    for (const match of content.matchAll(pattern)) {
      const value = match[0].toLowerCase();
      if (!spellingExceptions.has(`${file}:${value}`))
        spellingWarnings.push(`${file}: ${match[0]}`);
    }
  }
}

const nonUsHosts = productProfiles
  .flatMap((product) => [product.officialProductUrl, product.supportUrl])
  .filter((url): url is string => !!url)
  .map((url) => new URL(url).hostname)
  .filter(
    (host) => /\.(co\.uk|uk|eu)$/i.test(host) && !hostExceptions.has(host),
  );

console.log(`US localization report (${files.length} source guides)`);
console.log(
  `Likely UK spellings: ${spellingWarnings.length}${spellingWarnings.length ? ` (${spellingWarnings.join('; ')})` : ''}`,
);
console.log(
  `Non-US manufacturer hosts: ${nonUsHosts.length}${nonUsHosts.length ? ` (${nonUsHosts.join(', ')})` : ''}`,
);
console.log(
  'Exceptions are explicit and intentionally empty until a documented source-title or brand-name exception is needed.',
);
if (spellingWarnings.length > 0) process.exitCode = 1;
