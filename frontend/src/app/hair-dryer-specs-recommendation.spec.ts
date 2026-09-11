import { describe, expect, it } from 'vitest';
import {
  decodeHairDryerSpecs,
  type HairDryerSpecsAnswers,
} from './hair-dryer-specs-recommendation';

const answers = (
  overrides: Partial<HairDryerSpecsAnswers> = {},
): HairDryerSpecsAnswers => ({
  location: 'home',
  wattage: '1400-1800',
  voltage: 'single',
  priority: 'home-drying',
  ...overrides,
});

describe('decodeHairDryerSpecs', () => {
  it('keeps lower-wattage home choices in context', () => {
    const result = decodeHairDryerSpecs(answers({ wattage: 'under-1400' }));
    expect(result.paragraphs.join(' ')).toContain('not a direct score');
    expect(result.paragraphs.join(' ')).toContain('lighter dryer');
  });

  it('flags the trade-offs of higher-wattage home choices', () => {
    const result = decodeHairDryerSpecs(answers({ wattage: 'over-1800' }));
    expect(result.paragraphs.join(' ')).toContain('heat control and noise');
  });

  it('puts voltage first for travel with a single-voltage dryer', () => {
    const result = decodeHairDryerSpecs(
      answers({ location: 'occasional-travel', voltage: 'single' }),
    );
    expect(result.paragraphs.join(' ')).toContain(
      'A plug adapter changes the plug shape, not the supply voltage.',
    );
  });

  it('explains the limits of dual-voltage travel flexibility', () => {
    const result = decodeHairDryerSpecs(
      answers({ location: 'frequent-travel', voltage: 'dual' }),
    );
    expect(result.paragraphs.join(' ')).toContain('printed voltage range');
    expect(result.paragraphs.join(' ')).toContain('selector instructions');
  });

  it('does not guess when the wattage is unavailable', () => {
    const result = decodeHairDryerSpecs(answers({ wattage: 'unknown' }));
    expect(result.heading).toContain('Find the label');
  });
});
