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

  it('keeps one canonical brush guide for each thick- and curly-hair intent', () => {
    const publishedSlugs = articleRegistry
      .filter((article) => article.enabled)
      .map((article) => article.slug);
    expect(publishedSlugs).toContain(ArticleSlug.BestBrushesThickHair);
    expect(publishedSlugs).toContain(ArticleSlug.BestBrushesCurlyHair);
    expect(publishedSlugs).not.toContain('best-hair-brush-for-thick-hair');
    expect(publishedSlugs).not.toContain('best-hair-brush-for-curly-hair');
    expect(publishedSlugs).not.toContain('flat-iron-vs-straightening-brush');
  });

  it('renders readable selection-guide labels and keyboard-scrollable comparison tables', () => {
    for (const [slug, heading] of [
      [
        ArticleSlug.BestHairDryersFineHair,
        'How to choose a hair dryer for fine hair',
      ],
      [
        ArticleSlug.BestHairDryersCurlyHair,
        'How to choose a hair dryer for curly hair',
      ],
      [
        ArticleSlug.BestBrushesCurlyHair,
        'How to choose a hair brush for curly hair',
      ],
    ]) {
      expect(articles.find((article) => article.slug === slug)?.heading).toBe(
        heading,
      );
    }
    for (const slug of [
      ArticleSlug.BestHairDryersThickHair,
      ArticleSlug.BestBrushesFineHair,
      ArticleSlug.BestBrushesThickHair,
      ArticleSlug.BestBrushesCurlyHair,
    ]) {
      const html = articles.find((article) => article.slug === slug)?.html;
      expect(html).toContain('class="table-scroll-hint"');
      expect(html).toMatch(/<table tabindex="0" aria-label="[^"]+">/);
      expect(html).toContain('<th>');
    }
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
