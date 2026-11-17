import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { articles } from '../frontend/src/app/content.generated.ts';
import { ArticleSlug } from '../frontend/src/app/article-slug.ts';
import { guideEvidence } from '../frontend/src/app/guide-evidence.ts';
import { guideLinkMap } from '../frontend/src/app/guide-link-map.ts';
import {
  releaseArticleErrors,
  retiredRouteErrors,
} from './seo/release-article-validation.ts';

test('release check rejects stale 200s, wrong identities, missing body and missing sitemap entries', () => {
  const article = articles.find(
    (value) => value.slug === ArticleSlug.HowToCleanHairRollers,
  )!;
  const evidence = guideEvidence[article.slug];
  const relatedPaths = guideLinkMap[article.slug].relatedSlugs.map(
    (slug) => `/guides/${slug}`,
  );
  const canonical = `https://www.combreport.com/guides/${article.slug}`;
  const expected = { article, evidence, relatedPaths };
  const sitemap = [
    { url: canonical, lastmod: article.updatedDate ?? article.publishDate },
  ];
  const escape = (text: string) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const html = `<title>${escape(article.title)}</title><link rel="canonical" href="${canonical}"><meta name="robots" content="index, follow"><script data-site-jsonld>${JSON.stringify({ '@type': 'Article', datePublished: article.publishDate, dateModified: article.updatedDate ?? article.publishDate })}</script><article class="article-page"><h1>${escape(article.heading)}</h1><section class="article-body">${article.html}</section><section class="article-faq">${article.faq.map((faq) => `<h3>${escape(faq.question)}</h3><p>${escape(faq.answer)}</p>`).join('')}</section><section><h2 id="evidence-scope-title">Evidence scope</h2></section><section class="article-body"><h2 id="source-checks-heading">Sources</h2>${evidence.sources.map((source) => `<a href="${source.url}">Source</a>`).join('')}</section><nav><h2 id="next-steps-heading">Related guides</h2>${relatedPaths.map((path) => `<a href="${path}">Guide</a>`).join('')}</nav></article>`;
  const response = { status: 200, contentType: 'text/html', text: html };
  assert.deepEqual(releaseArticleErrors(response, expected, sitemap), []);
  for (const changed of [
    html.replace(article.html, '<p>Old abbreviated content.</p>'),
    html.replace(
      `<title>${escape(article.title)}</title>`,
      '<title>Old title</title>',
    ),
    html.replace(`<h1>${escape(article.heading)}</h1>`, '<h1>Home</h1>'),
    html.replace(`href="${canonical}"`, 'href="https://www.combreport.com/"'),
  ])
    assert.ok(
      releaseArticleErrors({ ...response, text: changed }, expected, sitemap)
        .length,
    );
  assert.match(
    releaseArticleErrors({ ...response, status: 404 }, expected, sitemap).join(
      '\n',
    ),
    /HTTP 404/,
  );
  assert.match(
    releaseArticleErrors(response, expected, []).join('\n'),
    /sitemap entry/,
  );
  assert.match(
    releaseArticleErrors(response, expected, [...sitemap, ...sitemap]).join(
      '\n',
    ),
    /sitemap entry/,
  );
});

test('the real release command exits unsuccessfully when its rendered artifact is missing', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'hair-release-smoke-'));
  try {
    const output = join(directory, 'result.json');
    const result = spawnSync(
      process.execPath,
      [
        '--import',
        'tsx',
        'scripts/seo/release-smoke.ts',
        '--artifact-only',
        `--artifact=${directory}`,
        `--output=${output}`,
      ],
      { cwd: new URL('..', import.meta.url), encoding: 'utf8' },
    );
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(await readFile(output, 'utf8'));
    assert.equal(report.verified, false);
    assert.equal(report.mode, 'artifact-only');
    assert.ok(
      report.failures.some((failure: string) =>
        failure.includes('/sitemap.xml'),
      ),
    );
    assert.match(report.sourceCommit, /^[\da-f]{40}$/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('retired brush routes reject indexable 200s and redirects', () => {
  assert.deepEqual(retiredRouteErrors({ status: 404, text: 'Not found' }), []);
  for (const status of [200, 301, 302, 403])
    assert.ok(
      retiredRouteErrors({ status, text: 'Legacy brush guide' }).length,
    );
});
