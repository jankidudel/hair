import { describe, expect, it } from 'vitest';
import {
  allBrushRecommendations,
  recommendHairBrush,
  type HairBrushAnswers,
} from './hair-brush-recommendation';
import { articleRegistry } from './article-registry';

const answers = (
  overrides: Partial<HairBrushAnswers> = {},
): HairBrushAnswers => ({
  length: 'medium',
  texture: 'straight',
  thickness: 'medium',
  use: 'dry',
  goal: 'smooth',
  ...overrides,
});

describe('recommendHairBrush', () => {
  it('uses a wide-tooth comb for curly wet detangling', () => {
    const result = recommendHairBrush(
      answers({ texture: 'curly-coily', use: 'wet' }),
    );
    expect(result.primary.category).toBe('wide-tooth-comb');
    expect(result.alternative).toBeUndefined();
    expect(result.rationale).toContain('does not imply dryer permission');
  });
  it('does not recommend dry brushing as required for curls', () => {
    const result = recommendHairBrush(
      answers({ texture: 'curly-coily', goal: 'define-curls' }),
    );
    expect(result.primary.category).toBe('wide-tooth-comb');
    expect(result.rationale).toContain('dry brushing');
  });
  it('uses a vent brush for short blow-dried hair', () => {
    expect(
      recommendHairBrush(answers({ length: 'short', use: 'blow-dry' })).primary
        .category,
    ).toBe('vent-brush');
  });
  it('favours gentler bristles for fine everyday hair', () => {
    expect(
      recommendHairBrush(answers({ thickness: 'fine' })).primary.category,
    ).toBe('boar-mixed-bristle');
  });
  it('uses a paddle brush for thick, long everyday hair', () => {
    expect(
      recommendHairBrush(answers({ length: 'long', thickness: 'thick' }))
        .primary.category,
    ).toBe('paddle-brush');
  });
  it('lets the task override a broad hair-type label', () => {
    expect(
      recommendHairBrush(
        answers({ thickness: 'fine', use: 'blow-dry', goal: 'smooth' }),
      ).primary.category,
    ).toBe('paddle-brush');
    expect(
      recommendHairBrush(
        answers({ thickness: 'thick', use: 'wet', goal: 'volume' }),
      ).primary.category,
    ).toBe('flexible-detangling-brush');
  });
  it('always returns a complete recommendation with an enabled guide route', () => {
    const enabledSlugs = new Set(
      articleRegistry
        .filter((article) => article.enabled)
        .map((article) => article.slug),
    );
    for (const recommendation of allBrushRecommendations) {
      expect(enabledSlugs.has(recommendation.guideSlug)).toBe(true);
      expect(recommendation.bestFor.length).toBeGreaterThan(0);
    }
  });
});
