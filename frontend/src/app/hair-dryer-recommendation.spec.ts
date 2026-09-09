import { describe, expect, it } from 'vitest';
import {
  recommendHairDryer,
  type HairDryerAnswers,
} from './hair-dryer-recommendation';

const answers = (
  overrides: Partial<HairDryerAnswers> = {},
): HairDryerAnswers => ({
  length: 'medium',
  density: 'medium',
  goal: 'quick',
  priority: 'airflow',
  diffuser: 'not-sure',
  ...overrides,
});

describe('recommendHairDryer', () => {
  it('recommends a concentrator and controls for fine-hair blowouts', () => {
    const result = recommendHairDryer(
      answers({ density: 'fine', goal: 'smooth', diffuser: 'no' }),
    );
    expect(result.features).toContain('Concentrator nozzle');
    expect(result.features).toContain('Cool-shot button');
  });
  it('prioritises airflow for thick, long hair and quick drying', () => {
    const result = recommendHairDryer(
      answers({ density: 'thick', length: 'long' }),
    );
    expect(result.features).toContain('Airflow/motor');
    expect(result.links[0].slug).toBe('best-hair-dryers-thick-hair');
  });
  it('puts a compatible diffuser first for diffuser styling', () => {
    const result = recommendHairDryer(
      answers({ goal: 'diffuser', diffuser: 'yes' }),
    );
    expect(result.features).toEqual(
      expect.arrayContaining(['Diffuser', 'Attachment compatibility']),
    );
  });
  it('keeps compactness first for low-weight travel choices', () => {
    const result = recommendHairDryer(
      answers({ goal: 'travel', priority: 'lightweight' }),
    );
    expect(result.features[0]).toBe('Foldable/compact design');
  });
  it('lets the main goal win when choices conflict', () => {
    const result = recommendHairDryer(
      answers({ goal: 'smooth', diffuser: 'yes', priority: 'attachments' }),
    );
    expect(result.features).toContain('Concentrator nozzle');
    expect(result.heading).toContain('concentrator nozzle');
  });
});
