import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import type { BuiltPage } from './built-site/pages.ts';
import {
  duplicateMetadataErrors,
  notFoundErrors,
  pageErrors,
} from './built-site/site-checks.ts';
import {
  auditContent,
  similarity,
  summarisePage,
} from './built-site/content-audit.ts';
import { loadEdgeHandler, viewerRequest } from './built-site/public-routes.ts';

const page = (path: string, body: string, head = ''): BuiltPage => ({
  path,
  file: `${path}/index.html`,
  document: new JSDOM(
    `<!doctype html><html><head>${head}</head><body>${body}</body></html>`,
  ).window.document,
});
const meta = (title: string, description: string, path: string) =>
  `<title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="https://www.combreport.com${path}">`;
const paragraph = 'Hold the section flat and move the dryer slowly. '.repeat(4);

test('a clean page has no crawl errors', () => {
  assert.deepEqual(
    pageErrors(
      page(
        '/guides/a',
        '<main><h1 id="a">A</h1><table><thead><tr><th>x</th></tr></thead></table></main>',
      ),
    ),
    [],
  );
});

test('crawl rejects duplicate ids, unbound values, placeholders and medical schema', () => {
  const errors = pageErrors(
    page(
      '/guides/a',
      `<main><h2 id="x">A</h2><p id="x">undefined</p><p>Read {{ArticleSlug.Missing}}</p>
       <a href="/guides/undefined">bad</a><table><tr><td>1</td></tr></table></main>
       <script type="application/ld+json">{"@type":"MedicalWebPage"}</script>`,
    ),
  );
  for (const expected of [
    'duplicate DOM id "x"',
    'unbound value "undefined"',
    'unrendered placeholder text "{{ArticleSlug.Missing}}"',
    'unbound href="/guides/undefined"',
    'table without column headers',
    'unsupported structured-data type MedicalWebPage',
  ])
    assert.ok(
      errors.some((error) => error.includes(expected)),
      `missing "${expected}" in ${JSON.stringify(errors)}`,
    );
});

test('ordinary prose that contains the word undefined is allowed', () => {
  assert.deepEqual(
    pageErrors(
      page('/guides/a', '<main><p>Some pieces remain undefined.</p></main>'),
    ),
    [],
  );
});

test('duplicate titles and descriptions across pages fail', () => {
  const errors = duplicateMetadataErrors([
    page('/a', '', meta('Same', 'One', '/a')),
    page('/b', '', meta('Same', 'Two', '/b')),
  ]);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /Duplicate title "Same" on 2 pages: \/a, \/b/);
});

test('the not-found page must be noindex without a canonical', () => {
  assert.equal(
    notFoundErrors(
      page('/404', '', '<link rel="canonical" href="https://x/404">').document,
    ).length,
    2,
  );
  assert.deepEqual(
    notFoundErrors(
      page('/404', '', '<meta name="robots" content="noindex, nofollow">')
        .document,
    ),
    [],
  );
});

test('content audit finds duplicate paragraphs, ignores table hints and counts inlinks', () => {
  const guide = (path: string, links: string) =>
    summarisePage(
      page(
        path,
        `<main><article><section class="article-body"><h2>Unique ${path}</h2><p>${paragraph}</p>
         <p class="table-scroll-hint">${'On a small screen scroll this table horizontally. '.repeat(3)}</p>
         ${links}</section></article></main>`,
      ),
    );
  const audit = auditContent([
    guide('/guides/a', '<a href="/guides/b">b</a>'),
    guide('/guides/b', ''),
  ]);
  assert.equal(audit.duplicateParagraphs.length, 1);
  assert.match(audit.duplicateParagraphs[0], /^\/guides\/a, \/guides\/b:/);
  assert.deepEqual(audit.orphans, ['/guides/a']);
  assert.deepEqual(audit.lowContextualInlinks, [
    '/guides/a (0)',
    '/guides/b (1)',
  ]);
});

test('similarity compares distinct long words', () => {
  assert.equal(similarity('Dry the roots first', 'first the roots dry'), 1);
  assert.equal(similarity('Curl', 'Wave'), 0);
});

test('the deployed edge function maps canonical paths and redirects variants', async () => {
  const handler = await loadEdgeHandler();
  assert.deepEqual(
    (viewerRequest(handler, '/guides/a') as { uri: string }).uri,
    '/guides/a/index.html',
  );
  assert.equal(
    (
      viewerRequest(handler, '/guides/a/') as {
        headers: { location: { value: string } };
      }
    ).headers.location.value,
    'https://www.combreport.com/guides/a',
  );
});
