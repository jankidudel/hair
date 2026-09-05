import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const contentDirectory = join(import.meta.dirname, '..', 'frontend', 'content');
const prohibitedTerms = [
  'diagnos(?:e|is|tic)',
  'treat(?:ment|ing)?',
  'supplement',
  'disease',
  'disorder',
  'medical(?: claim| advice)?',
  'hair loss',
  'alopecia',
  'hormonal?',
  'prescription',
  'minoxidil',
  'finasteride',
];
const matcher = new RegExp(`\\b(?:${prohibitedTerms.join('|')})\\b`, 'gi');
const files = (await readdir(contentDirectory)).filter((file) =>
  file.endsWith('.html'),
);
const failures: string[] = [];
for (const file of files) {
  const text = await readFile(join(contentDirectory, file), 'utf8');
  const matches = [...text.matchAll(matcher)].map((match) =>
    match[0].toLowerCase(),
  );
  if (matches.length > 0)
    failures.push(`${file}: ${[...new Set(matches)].join(', ')}`);
}
if (failures.length > 0) {
  console.error(
    'CONTENT SAFETY ALARM: possible prohibited health content detected.',
  );
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(
  `Content safety check passed (${files.length} HTML files checked).`,
);
