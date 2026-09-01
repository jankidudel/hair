import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { auditInternalLinks } from './internal-link-audit.ts';

async function fixture(files: Record<string, string>): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), 'hair-links-'));
  await Promise.all(
    Object.entries(files).map(async ([path, html]) => {
      const destination = join(directory, path);
      await mkdir(join(destination, '..'), { recursive: true });
      await writeFile(destination, html);
    }),
  );
  return directory;
}

const page = (body: string, canonical = 'https://www.combreport.com/') =>
  `<html><head><link rel="canonical" href="${canonical}"></head><body>${body}</body></html>`;

test('accepts root-relative and relative generated routes with query strings and anchors', async () => {
  const directory = await fixture({
    'index.html': page('<a href="/guides/?page=1#featured">Guides</a>'),
    'guides/index.html': page(
      '<a id="featured"></a><a href="../about/">About</a>',
      'https://www.combreport.com/guides',
    ),
    'about/index.html': page(
      '<a name="contact"></a>',
      'https://www.combreport.com/about',
    ),
  });
  assert.deepEqual((await auditInternalLinks(directory)).failures, []);
});

test('supports generated route.html output', async () => {
  const directory = await fixture({
    'index.html': page('<a href="/guides">Guides</a>'),
    'guides.html': page('', 'https://www.combreport.com/guides'),
  });
  assert.deepEqual((await auditInternalLinks(directory)).failures, []);
});

test('reports missing pages and anchors with their generated source', async () => {
  const directory = await fixture({
    'index.html': page(
      '<a href="/typo">Typo</a><a href="/guides#missing">Anchor</a>',
    ),
    'guides/index.html': page('', 'https://www.combreport.com/guides'),
  });
  const { failures } = await auditInternalLinks(directory);
  assert.deepEqual(
    failures.map(({ source, target, reason }) => ({ source, target, reason })),
    [
      {
        source: 'index.html',
        target: '/typo',
        reason: 'generated page not found',
      },
      {
        source: 'index.html',
        target: '/guides#missing',
        reason: 'anchor not found',
      },
    ],
  );
});

test('ignores external and non-navigation links but rejects development targets', async () => {
  const directory = await fixture({
    'index.html': page(
      '<a href="https://example.com">External</a><a href="mailto:hello@example.com">Email</a><a href="#section">Fragment</a><a href="/download.pdf" download>Download</a><a href="https://localhost:4200/guides">Local</a><a href="https://d123.cloudfront.net/guides">Dev</a>',
    ),
  });
  const { failures } = await auditInternalLinks(directory);
  assert.equal(failures.length, 2);
  assert.ok(
    failures.every(({ reason }) => reason === 'development or localhost URL'),
  );
});

test('reports duplicate and missing canonical URLs', async () => {
  const directory = await fixture({
    'index.html': page('', 'https://www.combreport.com/guides'),
    'about/index.html': page('', 'https://www.combreport.com/guides'),
  });
  const { failures } = await auditInternalLinks(directory);
  assert.deepEqual(
    failures.map(({ reason }) => reason),
    [
      'canonical generated page not found',
      'canonical generated page not found',
      'duplicate canonical URL (also used by about/index.html)',
    ],
  );
});
