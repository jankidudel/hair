import { describe, expect, it } from 'vitest';
import { articles } from './content.generated';
import {
  recommendHairDryer,
  type HairDryerAnswers,
} from './hair-dryer-recommendation';
const answers = (
  overrides: Partial<HairDryerAnswers> = {},
): HairDryerAnswers => ({
  length: 'medium',
  sectionAmount: 'medium',
  goal: 'quick',
  priority: 'airflow',
  diffuser: 'not-sure',
  ...overrides,
});
describe('dryer feature guidance', () => {
  it('changes section planning without changing the primary guidance or prescribing heat', () => {
    for (const goal of ['quick', 'smooth', 'diffuser', 'travel'] as const) {
      const lower = recommendHairDryer(
        answers({ goal, sectionAmount: 'lower' }),
      );
      const higher = recommendHairDryer(
        answers({ goal, sectionAmount: 'higher' }),
      );
      expect(higher.explanation).toBe(lower.explanation);
      expect(higher.links).toEqual(lower.links);
      expect(lower.smallerSection).toBe(false);
      expect(higher.smallerSection).toBe(true);
    }
  });
  it('retains travel electrical guidance when a diffuser is also requested', () => {
    const result = recommendHairDryer(
      answers({ goal: 'travel', diffuser: 'yes' }),
    );
    expect(result.explanation).toContain('operating input');
    expect(result.links[0].slug).toBe(
      'plug-adapter-vs-voltage-converter-hair-tools',
    );
    expect(result.diffuserNote).toBe('yes');
  });
  it('keeps the goal primary and avoids repeating the diffuser compatibility result', () => {
    expect(
      recommendHairDryer(answers({ goal: 'smooth', diffuser: 'yes' }))
        .diffuserNote,
    ).toBe('yes');
    expect(
      recommendHairDryer(answers({ goal: 'diffuser', diffuser: 'yes' }))
        .diffuserNote,
    ).toBeUndefined();
    expect(
      recommendHairDryer(answers({ diffuser: 'no' })).diffuserNote,
    ).toBeUndefined();
  });
  it('returns three features, one or two live comparisons with a market label and a next check', () => {
    const live = new Set(articles.map((article) => article.slug));
    for (const goal of ['quick', 'smooth', 'diffuser', 'travel'] as const) {
      const result = recommendHairDryer(answers({ goal }));
      expect(result.features).toHaveLength(3);
      expect(result.comparisons.length).toBeGreaterThanOrEqual(1);
      expect(result.comparisons.length).toBeLessThanOrEqual(2);
      for (const comparison of result.comparisons) {
        expect(live, comparison.slug).toContain(comparison.slug);
        expect(comparison.scope.trim()).not.toBe('');
      }
      expect(result.nextCheck.trim()).not.toBe('');
    }
  });
});
