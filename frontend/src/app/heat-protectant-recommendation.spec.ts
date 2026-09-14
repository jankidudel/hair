import { describe, expect, it } from 'vitest';
import {
  recommendHeatProtectant,
  type HeatProtectantAnswers,
} from './heat-protectant-recommendation';

const answers = (
  overrides: Partial<HeatProtectantAnswers> = {},
): HeatProtectantAnswers => ({
  stylingStep: 'blow-dry',
  application: 'damp',
  density: 'medium',
  finish: 'neutral',
  ...overrides,
});

describe('recommendHeatProtectant', () => {
  it('requires dry-hair directions for a dry-hair application', () => {
    expect(
      recommendHeatProtectant(answers({ application: 'dry' })).priorities[0],
    ).toContain('dry-hair directions');
  });
  it('keeps a two-step routine label-led', () => {
    expect(
      recommendHeatProtectant(answers({ stylingStep: 'both' })).reminder,
    ).toContain('label');
  });

  it('keeps a dry-hair tool routine focused on dry-hair directions', () => {
    expect(
      recommendHeatProtectant(answers({ stylingStep: 'dry-tool' }))
        .priorities[0],
    ).toContain('dry-hair styling directions');
  });
  it('keeps a fine-hair blow-dry recommendation lightweight', () => {
    expect(
      recommendHeatProtectant(answers({ density: 'fine' })).heading,
    ).toContain('light');
  });
});
