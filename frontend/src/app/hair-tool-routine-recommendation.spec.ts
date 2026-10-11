import { describe, expect, it } from 'vitest';
import {
  recommendHairToolRoutine,
  type HairToolRoutineAnswers,
} from './hair-tool-routine-recommendation';

const answers = (
  overrides: Partial<HairToolRoutineAnswers> = {},
): HairToolRoutineAnswers => ({
  length: 'medium',
  goal: 'smooth',
  time: '10-20',
  owned: [],
  ...overrides,
});

describe('recommendHairToolRoutine', () => {
  it('keeps short, quick routines small', () => {
    const result = recommendHairToolRoutine(
      answers({ length: 'short', time: 'under-10' }),
    );
    expect(result.items).toHaveLength(1);
    expect(result.items[0].detail).toContain('Smaller');
  });
  it('uses a dryer and suitable round brush for a long-hair blowout', () => {
    const result = recommendHairToolRoutine(
      answers({ length: 'long', goal: 'blowout' }),
    );
    expect(result.items.map((item) => item.tool)).toContain('Hair dryer');
    expect(result.items[1].detail).toContain('long hair');
  });
  it('does not duplicate a hot-air brush for simple smoothing', () => {
    const result = recommendHairToolRoutine(
      answers({ owned: ['hot-air-brush'] }),
    );
    expect(result.summary).toContain('existing hot-air brush');
    expect(result.skip).toContain('separate dryer and round brush');
  });
  it('suggests a compact travel setup with no current tools', () => {
    const result = recommendHairToolRoutine(answers({ goal: 'travel' }));
    expect(result.items[1].tool).toContain('Compact dryer');
  });
  it('keeps a finishing category for curls with more available time', () => {
    const result = recommendHairToolRoutine(
      answers({ goal: 'curls', time: 'over-20' }),
    );
    expect(result.items.map((item) => item.tool)).toContain(
      'Curl or wave finishing tool category',
    );
    expect(result.skip).toContain('large round brush');
  });
  it('does not propose a dryer and round brush when an airflow brush covers the selected blowout task', () => {
    const result = recommendHairToolRoutine(
      answers({ goal: 'blowout', owned: ['hot-air-brush'] }),
    );
    expect(result.items.map((item) => item.tool)).toEqual([
      'Your existing hot-air brush',
    ]);
    expect(result.skip).toContain('separate dryer and manual round brush');
  });
  it('keeps a dry-use heated brush after a separate drying stage', () => {
    const result = recommendHairToolRoutine(
      answers({ owned: ['heated-round-brush'] }),
    );
    expect(result.items[0].detail).toContain('drying stage');
    expect(result.items[1].detail).toContain('already-dry');
  });
});
