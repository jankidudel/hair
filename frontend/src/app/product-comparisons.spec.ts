import { describe, expect, it } from 'vitest';
import {
  comparisonFacts,
  comparisonForProduct,
  parseProductSelection,
  ProductCategory,
  productBySlug,
  productProfiles,
} from './product-comparisons';

describe('product comparison data', () => {
  it('keeps unique, source-backed profiles with explicit markets', () => {
    expect(
      productProfiles.filter(
        (product) => product.category === ProductCategory.HairDryer,
      ),
    ).toHaveLength(5);
    expect(productProfiles.some((product) => product.market === 'UK')).toBe(
      true,
    );
    expect(productProfiles.some((product) => product.market === 'US')).toBe(
      true,
    );
    expect(new Set(productProfiles.map((product) => product.slug)).size).toBe(
      productProfiles.length,
    );
    for (const product of productProfiles) {
      expect(product.officialProductUrl).toMatch(/^https:\/\//);
      expect(['US', 'UK']).toContain(product.market);
      expect(product.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(product.verifiedFacts.length).toBeGreaterThan(0);
      expect(
        product.verifiedFacts.every((fact) =>
          fact.sourceUrl.startsWith('https://'),
        ),
      ).toBe(true);
    }
  });

  it('selects only an explicit canonical comparison for each product', () => {
    expect(comparisonForProduct('dyson-supersonic-nural')?.path).toBe(
      '/guides/dyson-supersonic-vs-shark-speedstyle',
    );
    expect(comparisonForProduct('not-a-product')).toBeUndefined();
    expect(
      comparisonForProduct('revlon-one-step-volumizer-plus'),
    ).toBeUndefined();
    expect(comparisonForProduct('denman-d200-skeleton-vent-uk')?.path).toBe(
      '/guides/vented-brush-vs-paddle-brush',
    );
    expect(
      comparisonForProduct('dyson-corrale-original-blue-copper-uk')?.path,
    ).toBe('/guides/corded-vs-cordless-hair-straighteners');
  });

  it('keeps an absent verified fact visible as not confirmed data for the matrix', () => {
    const first = productBySlug('dyson-supersonic-nural');
    const second = productBySlug('shark-speedstyle-pro');
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    const facts = comparisonFacts(first!, second!);
    expect(
      facts.find((fact) => fact.label === 'Electrical specification'),
    ).toEqual({
      label: 'Electrical specification',
      first: undefined,
      second: expect.any(Object),
    });
    expect(
      first!.verifiedFacts.find((fact) => fact.label === 'Weight'),
    ).toBeUndefined();
  });

  it('caps, deduplicates, and validates shareable explorer selections', () => {
    expect(
      parseProductSelection(
        'dyson-supersonic-nural,not-a-product,dyson-supersonic-nural,conair-digitalaire-2,revlon-one-step-volumizer-plus,wet-brush-original-detangler',
      ),
    ).toEqual([
      'dyson-supersonic-nural',
      'conair-digitalaire-2',
      'revlon-one-step-volumizer-plus',
    ]);
  });
});
