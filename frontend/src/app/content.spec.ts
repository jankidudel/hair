import { describe, expect, it } from 'vitest';
import { articles } from './content.generated';
import { articleRegistry } from './article-registry';

describe('generated editorial content', () => {
  it('has one prerenderable route per article', () => {
    const enabledSlugs = articleRegistry
      .filter((article) => article.enabled)
      .map((article) => article.slug);
    expect(articles.map((article) => article.slug)).toHaveLength(
      enabledSlugs.length,
    );
    expect(new Set(articles.map((article) => article.slug))).toEqual(
      new Set(enabledSlugs),
    );
  });
});
