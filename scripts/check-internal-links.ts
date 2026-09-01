import { resolve } from 'node:path';
import { auditInternalLinks } from './internal-link-audit.ts';

const outputDirectory = resolve(
  process.argv[2] ??
    resolve(
      import.meta.dirname,
      '..',
      'frontend',
      'dist',
      'hair-frontend',
      'browser',
    ),
);
const result = await auditInternalLinks(outputDirectory);
if (result.failures.length > 0) {
  console.error(
    `Internal link validation failed (${result.failures.length} links):\n`,
  );
  for (const failure of result.failures)
    console.error(
      `- ${failure.source}\n  ${failure.originalUrl} → ${failure.target} (${failure.reason})`,
    );
  process.exit(1);
}
console.log(
  `Internal link validation passed (${result.pages} generated pages, ${result.links} internal links checked).`,
);
