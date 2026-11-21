// Editorial audit of the built guides. Writes a Markdown report and fails on
// orphan pages. Duplicate copy, repeated headings, weak contextual linking and
// table semantics are warnings until run with --strict.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { format } from 'prettier';
import { builtSiteRoot, loadSitemapPages } from './built-site/pages.ts';
import {
  auditContent,
  contentAuditReport,
  summarisePage,
} from './built-site/content-audit.ts';

const strict = process.argv.includes('--strict');
const root = builtSiteRoot(
  process.argv.slice(2).find((argument) => !argument.startsWith('--')),
);
const output = resolve(
  process.env['HAIR_CONTENT_AUDIT_REPORT'] ??
    join(root, '..', '..', 'reports', 'CONTENT_AUDIT.md'),
);
const audit = auditContent((await loadSitemapPages(root)).map(summarisePage));
await mkdir(dirname(output), { recursive: true });
await writeFile(
  output,
  await format(contentAuditReport(audit), { parser: 'markdown' }),
);

const warnings: [string, readonly string[]][] = [
  ['duplicate paragraphs', audit.duplicateParagraphs],
  ['near-duplicate introductions/endings', audit.nearDuplicates],
  ['repeated section headings', audit.repeatedHeadings],
  ['guides with few contextual inlinks', audit.lowContextualInlinks],
  ['pages with incomplete table semantics', audit.tableSemantics],
];
for (const [label, items] of warnings)
  if (items.length) console.warn(`Warning: ${items.length} ${label}.`);
const failing = [
  ...audit.orphans.map((path) => `${path}: orphan page`),
  ...(strict ? warnings.flatMap(([, items]) => items) : []),
];
if (failing.length) {
  console.error(`Content audit failed (${failing.length} issues):`);
  for (const item of failing) console.error(`- ${item}`);
  console.error(`Report: ${output}`);
  process.exit(1);
}
console.log(
  `Content audit passed: ${audit.rows.length} pages, ${audit.rows.filter((row) => row.guide).length} guides; report ${output}`,
);
