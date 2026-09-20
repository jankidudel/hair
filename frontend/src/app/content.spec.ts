import { describe, expect, it } from 'vitest';
import { articles } from './content.generated';
import { articleRegistry } from './article-registry';
import { ArticleSlug } from './article-slug';
import { guideCategories, guideCategoryById } from './article-registry';
import { isPublishedOn } from './publication-date';

describe('generated editorial content', () => {
  it('has one prerenderable route per article', () => {
    const today = new Date().toISOString().slice(0, 10);
    const enabledSlugs = articleRegistry
      .filter((article) =>
        isPublishedOn(article.enabled, article.publishDate, today),
      )
      .map((article) => article.slug);
    expect(articles.map((article) => article.slug)).toHaveLength(
      enabledSlugs.length,
    );
    expect(new Set(articles.map((article) => article.slug))).toEqual(
      new Set(enabledSlugs),
    );
  });

  it('registers every canonical article slug exactly once', () => {
    expect(articleRegistry.map((article) => article.slug).sort()).toEqual(
      Object.values(ArticleSlug).sort(),
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

  it('maps every publishable guide to a category hub and excludes future guides', () => {
    for (const article of articles) {
      expect(guideCategoryById[article.group]).toBeDefined();
    }
    expect(guideCategories.map((category) => category.path)).toEqual([
      '/flat-irons',
      '/hair-dryers',
      '/hot-air-brushes',
      '/brushes-combs',
      '/hair-care',
      '/hair-accessories',
    ]);
    expect(isPublishedOn(true, '2099-01-01', '2026-09-05')).toBe(false);
  });
});
