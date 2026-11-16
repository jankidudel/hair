import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import {
  staticSeoRoutes,
  routePatternPolicies,
  seoRoutesForArticles,
} from '../frontend/src/app/seo-route-policy.ts';
import { articles } from '../frontend/src/app/content.generated.ts';
import {
  pageReference,
  parseSitemap,
  registeredRouterPaths,
  routeClassificationErrors,
  sitemapParityErrors,
} from './seo/route-coverage.ts';

test('every actual registered route has an explicit search disposition', async () => {
  const source = await readFile(
    new URL('../frontend/src/app/app.routes.ts', import.meta.url),
    'utf8',
  );
  assert.deepEqual(
    routeClassificationErrors(
      registeredRouterPaths(source),
      seoRoutesForArticles(articles),
      routePatternPolicies,
    ),
    [],
  );
  const future = source.replace(
    'export const routes: Routes = [',
    "export const routes: Routes = [ {path: 'new-public-tool', component: SomeTool},",
  );
  assert.match(
    routeClassificationErrors(
      registeredRouterPaths(future),
      seoRoutesForArticles(articles),
      routePatternPolicies,
    ).join('\n'),
    /Unclassified registered route \/new-public-tool/,
  );
});
test('hub and guide membership are exact; both standalone finders are intended canonical pages', () => {
  const policies = seoRoutesForArticles(articles);
  const entries = policies
    .filter((p) => p.disposition === 'indexable-canonical')
    .map((p) => ({
      url: p.canonical!,
      ...(p.lastmod ? { lastmod: p.lastmod } : {}),
    }));
  assert.deepEqual(sitemapParityErrors(policies, entries), []);
  const withoutHub = entries.filter((e) => !e.url.endsWith('/curling-irons'));
  assert.match(
    sitemapParityErrors(policies, withoutHub).join('\n'),
    /\/curling-irons: expected exactly one/,
  );
  assert.ok(
    withoutHub.some((e) => e.url.endsWith('/guides/best-curling-irons')),
  );
  for (const path of ['/flat-iron-finder', '/curling-tool-finder'])
    assert.equal(
      policies.find((p) => p.path === path)?.disposition,
      'indexable-canonical',
    );
});
test('duplicate, excluded, query-state, foreign-host and invented-date sitemap entries fail', () => {
  const policies = staticSeoRoutes;
  const entries = policies
    .filter((p) => p.disposition === 'indexable-canonical')
    .map((p) => ({
      url: p.canonical!,
      ...(p.lastmod ? { lastmod: p.lastmod } : {}),
    }));
  assert.match(
    sitemapParityErrors(policies, [...entries, entries[0]]).join('\n'),
    /found 2/,
  );
  for (const url of [
    'https://www.combreport.com/404',
    'https://www.combreport.com/products?filter=one',
    'https://combreport.com/curling-irons',
  ])
    assert.ok(sitemapParityErrors(policies, [...entries, { url }]).length);
  assert.match(
    sitemapParityErrors(
      policies,
      entries.map((e) =>
        e.url.endsWith('/flat-iron-finder')
          ? { ...e, lastmod: '2026-10-25' }
          : e,
      ),
    ).join('\n'),
    /lastmod differs/,
  );
});
test('URL parsing preserves query state, case and encoded slash while normalizing documented aliases', () => {
  assert.deepEqual(pageReference('https://combreport.com/'), {
    path: '/',
    query: '',
    hash: '',
  });
  assert.deepEqual(pageReference('/Tools%2FSpecific?filter=one#section'), {
    path: '/Tools%2FSpecific',
    query: '?filter=one',
    hash: '#section',
  });
  assert.equal(pageReference('https://example.com/curling-irons'), null);
  assert.deepEqual(
    parseSitemap(
      '<urlset><url><loc>https://www.combreport.com/curling-irons</loc></url></urlset>',
    ).entries,
    [{ url: 'https://www.combreport.com/curling-irons' }],
  );
});

test('head-format comparisons retain unique sitemap identities and substantive source pages', () => {
  const paths = [
    '/guides/t3-airebrush-vs-airebrush-round',
    '/guides/t3-singlepass-curl-x-vs-ghd-soft-curl',
  ];
  const policies = seoRoutesForArticles(articles);
  const entries = policies
    .filter((p) => p.disposition === 'indexable-canonical')
    .map((p) => ({
      url: p.canonical!,
      ...(p.lastmod ? { lastmod: p.lastmod } : {}),
    }));
  for (const path of paths) {
    assert.equal(
      entries.filter((p) => p.url === `https://www.combreport.com${path}`)
        .length,
      1,
    );
    const article = articles.find((a) => `/guides/${a.slug}` === path)!;
    assert.ok(article.html.includes('<table'));
    assert.ok(article.html.includes('/diagrams/'));
    assert.equal(article.contentMethod, 'specification-researched');
    assert.match(
      sitemapParityErrors(
        policies,
        entries.filter((e) => e.url !== `https://www.combreport.com${path}`),
      ).join('\n'),
      /expected exactly one/,
    );
  }
  assert.ok(!entries.some((e) => e.url.includes('#head-fit-worksheet')));
});
