import { describe, expect, it } from 'vitest';
import { articles } from './content.generated';
import { articleRegistry } from './article-registry';
import { isPublishedOn } from './publication-date';

describe('generated editorial content', () => {
  it('has one prerenderable route per article', () => {
    const enabledSlugs = articleRegistry
      .filter((article) =>
        isPublishedOn(article.enabled, article.publishDate, '2026-09-05'),
      )
      .map((article) => article.slug);
    expect(articles.map((article) => article.slug)).toHaveLength(
      enabledSlugs.length,
    );
    expect(new Set(articles.map((article) => article.slug))).toEqual(
      new Set(enabledSlugs),
    );
  });

  it('keeps the publishing schedule in the registry, not guide HTML', () => {
    const scheduledGuide = articleRegistry.find(
      (article) => article.slug === 'best-hair-dryer-for-short-hair',
    );
    expect(scheduledGuide?.publishDate).toBe('2026-09-05');
    expect(
      articleRegistry.find(
        (article) => article.slug === 'how-to-use-a-hair-dryer-diffuser',
      )?.publishDate,
    ).toBe('2026-09-05');
  });
});
