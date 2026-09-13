import { describe, expect, it } from 'vitest';
import {
  recommendStraighteningBrush,
  type StraighteningBrushAnswers,
} from './straightening-brush-recommendation';

const answers = (
  overrides: Partial<StraighteningBrushAnswers> = {},
): StraighteningBrushAnswers => ({
  length: 'medium',
  density: 'medium',
  texture: 'wavy',
  finish: 'soft-smoothing',
  heatControl: 'adjustable',
  frequency: 'occasional',
  budget: 'mid-range',
  ...overrides,
});

describe('recommendStraighteningBrush', () => {
  it('keeps a refresh focused on handling and controls', () => {
    const result = recommendStraighteningBrush(answers({ finish: 'refresh' }));
    expect(result.features).toContain('Comfortable handle');
  });
  it('prioritises section control for thick hair', () => {
    const result = recommendStraighteningBrush(answers({ density: 'thick' }));
    expect(result.features).toContain('Wide, usable brush surface');
  });
  it('keeps entry comparisons focused on core controls', () => {
    const result = recommendStraighteningBrush(answers({ budget: 'entry' }));
    expect(result.heading).toContain('core controls');
  });
});
