import assert from 'node:assert/strict';
import test from 'node:test';
import { articleRegistry } from '../frontend/src/app/article-registry.ts';
import { articleSlugNameByValue } from '../frontend/src/app/article-slug.ts';
import { canonicalComparisons } from '../frontend/src/app/product-comparisons.ts';
import { validateStagedGuide } from './check-staged-content.ts';

function source(slug: string, body: string): string {
  const slugName =
    articleSlugNameByValue[slug as keyof typeof articleSlugNameByValue];
  return `---
title: 'A useful guide title'
description: 'A useful guide description that gives readers enough context for a decision.'
slug: '{{ArticleSlug.${slugName}}}'
eyebrow: 'Hair dryers'
heading: 'A useful guide heading'
---
${body}`;
}

const entry = articleRegistry.find(
  (candidate) => candidate.slug === 'ionic-vs-ceramic-hair-dryer',
)!;

test('allows a disabled draft below the hard minimum', () => {
  const errors = validateStagedGuide({
    file: 'frontend/content/ionic-vs-ceramic-hair-dryer.html',
    source: source(entry.slug, '<p>Draft copy.</p>'),
    entry: { ...entry, enabled: false },
    today: '2026-09-20',
  });
  assert.deepEqual(errors, []);
});

test('allows a future-dated draft below the hard minimum', () => {
  const errors = validateStagedGuide({
    file: 'frontend/content/ionic-vs-ceramic-hair-dryer.html',
    source: source(entry.slug, '<p>Draft copy.</p>'),
    entry: { ...entry, publishDate: '2099-01-01' },
    today: '2026-09-06',
  });
  assert.deepEqual(errors, []);
});

test('rejects a publishable guide below the hard minimum', () => {
  const errors = validateStagedGuide({
    file: 'frontend/content/ionic-vs-ceramic-hair-dryer.html',
    source: source(entry.slug, '<p>Too short.</p>'),
    entry,
    today: '2026-09-06',
  });
  assert.match(errors.join('\n'), /body is too short/);
});

test('allows links to registered canonical comparison guides', () => {
  const body = `<p>${'Useful comparison context '.repeat(250)}</p>${canonicalComparisons
    .map((comparison) => `<a href="${comparison.path}">Compare</a>`)
    .join('')}`;
  const errors = validateStagedGuide({
    file: 'frontend/content/ionic-vs-ceramic-hair-dryer.html',
    source: source(entry.slug, body),
    entry,
    today: '2026-10-11',
  });
  assert.deepEqual(errors, []);
});

test('allows links to the hair tool routine builder', () => {
  const body = `<p>${'Useful routine context '.repeat(250)}</p><a href="/hair-tool-routine-builder">Build a routine</a>`;
  const errors = validateStagedGuide({
    file: 'frontend/content/ionic-vs-ceramic-hair-dryer.html',
    source: source(entry.slug, body),
    entry,
    today: '2026-09-06',
  });
  assert.deepEqual(errors, []);
});
