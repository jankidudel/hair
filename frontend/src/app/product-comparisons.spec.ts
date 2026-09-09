import { describe, expect, it } from 'vitest';
import {
  comparisonFacts,
  comparisonForProduct,
  productBySlug,
  productProfiles,
} from './product-comparisons';

describe('product comparison data', () => {
  it('filters the local profiles by category and price tier', () => {
    expect(
      productProfiles.filter((product) => product.category === 'hair-dryer'),
    ).toHaveLength(2);
    expect(
      productProfiles.filter((product) => product.priceTier === 'entry'),
    ).toEqual([]);
  });

  it('selects only an explicit canonical comparison for each product', () => {
    expect(comparisonForProduct('dyson-supersonic')?.path).toBe(
      '/products/dyson-supersonic-vs-shark-speedstyle',
    );
    expect(comparisonForProduct('not-a-product')).toBeUndefined();
  });

  it('keeps an absent verified fact visible as not confirmed data for the matrix', () => {
    const first = productBySlug('dyson-supersonic');
    const second = productBySlug('shark-speedstyle');
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    const facts = comparisonFacts(first!, second!);
    expect(facts.find((fact) => fact.label === 'Weight')).toBeUndefined();
    expect(
      first!.verifiedFacts.find((fact) => fact.label === 'Weight'),
    ).toBeUndefined();
  });
});
