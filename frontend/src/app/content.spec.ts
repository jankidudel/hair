import { describe, expect, it } from 'vitest';
import { articles } from './content.generated';
import { articleRegistry } from './article-registry';
import { ArticleSlug } from './article-slug';
import { guideCategories, guideCategoryById } from './article-registry';
import { isPublishedOn } from './publication-date';

describe('generated editorial content', () => {
  it('publishes the six finishing guides with the reviewed metadata and semantic FAQ sections', () => {
    const expected = [
      [
        ArticleSlug.HowToUseHairspray,
        'How to Use Hairspray: Placement and Application | Comb Report',
        'Use hairspray with the exact label’s distance, hair preparation and application method. Check placement before adding another layer to your finished style.',
      ],
      [
        ArticleSlug.FlexibleVsStrongHoldHairspray,
        'Flexible vs Strong Hold Hairspray: Read the Label | Comb Report',
        'Compare flexible and strong hold hairspray by intended movement, finish and directions. Read hold labels as product positioning rather than a shared rating scale.',
      ],
      [
        ArticleSlug.SeaSaltSprayVsTexturisingSpray,
        'Sea Salt Spray vs Texturising Spray: Compare Uses | Comb Report',
        'Compare sea salt spray and texturising spray by the exact formula, starting hair state and intended finish. The names can overlap rather than define opposites.',
      ],
      [
        ArticleSlug.HowToUseSeaSaltSpray,
        'How to Use Sea Salt Spray: Follow the Formula | Comb Report',
        'Plan sea salt spray application around the product’s starting hair state, placement and drying directions. Review distribution before adding more spray.',
      ],
      [
        ArticleSlug.PomadeVsHairClay,
        'Pomade vs Hair Clay: Compare Finish and Method | Comb Report',
        'Compare pomade and hair clay using the exact product’s finish, hold and application directions. Avoid assuming all pomades shine or all clays look matte.',
      ],
      [
        ArticleSlug.HowToApplyHairPomade,
        'How to Apply Hair Pomade: Prepare and Distribute | Comb Report',
        'Apply hair pomade using its starting hair state and preparation directions. Plan section coverage before changing the amount or adding another styling product.',
      ],
    ] as const;
    for (const [slug, title, description] of expected) {
      const article = articles.find((item) => item.slug === slug);
      expect(article?.title).toBe(title);
      expect(article?.description).toBe(description);
      expect(article?.group).toBe('hair-care');
      expect(article?.html).not.toMatch(/<h1\b/);
      expect(article?.html.match(/<h2>FAQ<\/h2>/g)).toHaveLength(1);
      expect(article?.html.match(/<h3>/g)).toHaveLength(3);
      expect(article?.html).toContain('class="accessory-table"');
      expect(article?.html).toContain('tabindex="0"');
      expect(article?.html).toContain('<th scope="col">');
    }
  });

  it('renders the Bobby Pins crossing question as exactly one semantic H2', () => {
    const html =
      articles.find((article) => article.slug === ArticleSlug.HowToUseBobbyPins)
        ?.html ?? '';
    expect(html.match(/<h2>Should you cross two pins\?<\/h2>/g)).toHaveLength(
      1,
    );
    expect(html).not.toContain('<p>Should you cross two pins?</p>');
    expect(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).toContain(
      'Should you cross two pins? Kitsch’s pin guidance describes crossing two pins for a bun anchor.',
    );
  });

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

  it('publishes the four Batch 15 task guides with exact metadata and crawlable steps', () => {
    const expected = [
      [
        ArticleSlug.HowToUseFlexiRods,
        'How to Use Flexi Rods: A Step-by-Step Set | Comb Report',
        'Use flexi rods with a clear section, wrap, bend, set and removal sequence—plus fixes for loose ends, uneven sections and tangled removal.',
      ],
      [
        ArticleSlug.HowToUseSnapClosureFoamRollers,
        'How to Use Snap-Closure Foam Rollers | Comb Report',
        'Use snap-closure foam rollers with a clear section, end placement, roll, close, readiness and removal sequence, plus practical troubleshooting.',
      ],
      [
        ArticleSlug.HowToCleanHairStraightenerPlates,
        'How to Clean Hair-Straightener Plates | Comb Report',
        'Clean flat-iron plates using the exact model instructions, then inspect plate edges, coating, hinge, cord and plug before the next use.',
      ],
      [
        ArticleSlug.HowToCleanACurlingIronOrWand,
        'How to Clean a Curling Iron or Wand | Comb Report',
        'Clean a curling iron or wand using its exact model instructions, then inspect the barrel, clamp, stand, cord and plug before reuse.',
      ],
    ] as const;

    for (const [slug, title, description] of expected) {
      const article = articles.find((item) => item.slug === slug);
      expect(article?.title).toBe(title);
      expect(article?.description).toBe(description);
      expect(article?.html).not.toMatch(/<h1\b/i);
      expect(article?.faq).toHaveLength(4);
    }

    const flexi = articles.find(
      (item) => item.slug === ArticleSlug.HowToUseFlexiRods,
    );
    const foam = articles.find(
      (item) => item.slug === ArticleSlug.HowToUseSnapClosureFoamRollers,
    );
    expect(flexi?.html.match(/<li>/g)).toHaveLength(14);
    expect(foam?.html.match(/<li>/g)).toHaveLength(14);
    expect(flexi?.html).toContain('<h2>A simple flexi-rod sequence</h2>');
    expect(foam?.html).toContain(
      '<h2>A simple snap-closure roller sequence</h2>',
    );
  });
});
