import { describe, expect, it } from 'vitest';
import {
  heatProtectantDefaults,
  recommendHeatProtectant,
  type HeatProtectantAnswers,
} from './heat-protectant-recommendation';
const answers = (
  overrides: Partial<HeatProtectantAnswers> = {},
): HeatProtectantAnswers => ({ ...heatProtectantDefaults, ...overrides });
describe('heat protectant direction checks', () => {
  it('keeps unclear directions unresolved regardless of the other answers', () => {
    for (const stylingStep of ['drying', 'contact', 'both'] as const)
      for (const application of ['unselected', 'damp', 'dry'] as const)
        expect(
          recommendHeatProtectant(answers({ stylingStep, application }))
            .heading,
        ).toBe('Read the product directions first');
  });
  it('requires a chosen application even when direction notes are known', () => {
    for (const directions of ['damp', 'dry', 'both'] as const)
      expect(recommendHeatProtectant(answers({ directions })).heading).toBe(
        'Choose the planned application state',
      );
  });
  it('rejects both mismatches and checks each matching combination without appliance permission', () => {
    for (const application of ['damp', 'dry'] as const)
      for (const directions of ['damp', 'dry', 'both'] as const) {
        const result = recommendHeatProtectant(
          answers({ application, directions }),
        );
        expect(result.heading).toBe(
          directions === 'both' || application === directions
            ? 'Review coverage and readiness'
            : 'The recorded starting states do not match',
        );
        if (result.heading === 'Review coverage and readiness')
          expect(result.explanation).toContain('does not verify');
        expect(result.reminder).toBe(
          'No product winner, dose or appliance setting is generated.',
        );
      }
  });
  it('appends exactly the selected stage and optional feel without dose or setting rules', () => {
    for (const stylingStep of ['drying', 'contact', 'both'] as const)
      for (const finish of ['none', 'light', 'conditioned'] as const) {
        const result = recommendHeatProtectant(
          answers({ stylingStep, finish }),
        );
        expect(result.sequence).toContain(
          {
            drying: 'drying stage',
            contact: 'readiness for contact',
            both: 'later styling stage',
          }[stylingStep],
        );
        expect(!!result.preference).toBe(finish !== 'none');
        expect(result.preference ?? '').not.toMatch(/fine|thick|\d|hotter/);
      }
  });
});
