import assert from 'node:assert/strict';
import test from 'node:test';
import { careMethodSlugs } from '../frontend/src/app/care-method-guides.ts';
import { articles } from '../frontend/src/app/content.generated.ts';
import {
  guideBodyErrors,
  renderedGuideErrors,
} from './guide-body-validation.ts';
import { validateStagedGuide } from './check-staged-content.ts';
import { ArticleSlug } from '../frontend/src/app/article-slug.ts';
import { articleRegistry } from '../frontend/src/app/article-registry.ts';
const legacy = `---
title: 'How Often Should You Wash Your Hair?'
description: 'Build a simple wash-day routine around your styling preferences and schedule.'
slug: '{{ArticleSlug.HowOftenShouldYouWashYourHair}}'
published: '2026-08-29'
updated: '2026-08-29'
category: 'Guides'
affiliateDisclosure: false
---
<h1>How Often Should You Wash Your Hair?</h1><p>There is no single schedule that suits every routine. Consider how you style your hair, the products you use, and how fresh you want your look to feel between wash days.</p><p>Try a simple rhythm for a couple of weeks, then adjust it when your routine changes. A gentle shampoo and a thorough rinse can make wash day feel more manageable.</p>`;
test('the real legacy placeholder cannot bypass publication checks using its old publish date', () => {
  const errors = validateStagedGuide({
    file: 'frontend/content/how-often-should-you-wash-your-hair.html',
    source: legacy,
    entry: articleRegistry.find(
      (e) => e.slug === ArticleSlug.HowOftenShouldYouWashYourHair,
    ),
    today: '2026-10-27',
  });
  assert.match(errors.join('\n'), /body is too short/);
  assert.match(
    guideBodyErrors(legacy.split('---').at(-1)!).join('\n'),
    /Quick answer/,
  );
});
test('all ten intended registered bodies meet substance checks, without counting FAQ/source tails', () => {
  assert.deepEqual(
    new Set(careMethodSlugs),
    new Set([
      ArticleSlug.ColdWaterForHair,
      ArticleSlug.HowOftenShouldYouWashYourHair,
      ArticleSlug.BestHairBrushForShortHair,
      ArticleSlug.BestLeaveInConditionersDryHair,
      ArticleSlug.HairBrushVsComb,
      ArticleSlug.BoarBristleBrushGuide,
      ArticleSlug.BestHeatProtectants,
      ArticleSlug.HowToApplyHeatProtectant,
      ArticleSlug.HowToApplyLeaveInConditioner,
      ArticleSlug.HowToCleanABoarBristleHairbrush,
    ]),
  );
  for (const slug of careMethodSlugs) {
    const article = articles.find((a) => a.slug === slug);
    assert.ok(article, slug);
    assert.deepEqual(guideBodyErrors(article.html), [], slug);
  }
});
test('metadata and an H1 do not substitute for actual body identity or the shared tail', () => {
  const article = articles.find(
    (a) => a.slug === ArticleSlug.HowToApplyHeatProtectant,
  )!;
  const errors = renderedGuideErrors(
    `<title>${article.title}</title><h1>${article.heading}</h1><p>Welcome to the home page.</p>`,
    {
      heading: article.heading,
      body: article.html,
      faqs: article.faq,
      sourceUrls: ['https://example.com/directions'],
      relatedPaths: ['/guides/best-heat-protectants'],
    },
  );
  assert.ok(errors.some((e) => e.includes('identity')));
  assert.ok(errors.some((e) => e.includes('main copy')));
  assert.ok(errors.some((e) => e.includes('tail')));
  assert.ok(errors.some((e) => e.includes('source')));
  assert.ok(errors.some((e) => e.includes('related')));
});

test('shared evidence, source and related sections stay required when the fragment has none', () => {
  const article = articles.find(
    (a) => a.slug === ArticleSlug.HowToApplyHeatProtectant,
  )!;
  const sourceUrl = 'https://www.ghdhair.com/heat-protect-products-c';
  const relatedPath = '/guides/best-heat-protectants';
  const expected = {
    heading: article.heading,
    body: article.html,
    faqs: article.faq,
    sourceUrls: [sourceUrl],
    relatedPaths: [relatedPath],
  };
  const main = `<article class="article-page"><h1> ${article.heading} </h1><section class="article-body">${article.html}</section>`;
  const faq = `<section class="article-faq">${article.faq.map((f) => `<h3>${f.question}</h3><p>${f.answer}</p>`).join('')}</section>`;
  const tail = `<section><h2 id="evidence-scope-title">Evidence scope</h2></section><section class="article-body" aria-labelledby="source-checks-heading"><h2 id="source-checks-heading">Sources</h2><a href="${sourceUrl}">Directions</a></section><nav><h2 id="next-steps-heading">Related guides</h2><a href="${relatedPath}">Selection</a></nav>`;
  assert.deepEqual(
    renderedGuideErrors(main + faq + tail + '</article>', expected),
    [],
  );
  assert.deepEqual(
    renderedGuideErrors(
      main.replace('</section>', '<p>Pins &amp; clips</p></section>') +
        faq +
        tail +
        '</article>',
      { ...expected, body: expected.body + '<p>Pins &#x26; clips</p>' },
    ),
    [],
  );
  assert.ok(
    renderedGuideErrors(main + faq + '</article>', expected).some((e) =>
      e.includes('tail'),
    ),
  );
  assert.ok(
    renderedGuideErrors(
      (main + faq + tail + '</article>').replace(
        article.html,
        '<p>Only two short paragraphs remain.</p><p>Repeated raw title.</p>',
      ),
      expected,
    ).some((e) => e.includes('main copy')),
  );
});
