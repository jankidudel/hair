import { describe, expect, it } from 'vitest';
import {
  checkRollerGroup,
  checkRollerPlan,
  parseRollerCount,
  rollerPlannerExample,
  ROLLER_COUNT_MAX,
} from './roller-count-planner';

const summaries = (groups: Parameters<typeof checkRollerPlan>[0]) =>
  checkRollerPlan(groups).map((outcome) =>
    outcome.ok ? outcome.result.summary : 'error',
  );

describe('roller count planner', () => {
  it('matches the published worked example', () => {
    expect(summaries(rollerPlannerExample)).toEqual([
      '35 mm: covered',
      '45 mm: 2 short',
    ]);
  });

  it('never lets spare pieces in one size cover another size', () => {
    const withSpares = [
      { ...rollerPlannerExample[0], available: '6' },
      rollerPlannerExample[1],
    ];
    const outcomes = checkRollerPlan(withSpares);
    expect(summaries(withSpares)).toEqual(['35 mm: covered', '45 mm: 2 short']);
    const first = outcomes[0];
    expect(first.ok && first.result.spare).toBe(4);
  });

  it('treats empty fields as zero', () => {
    expect(parseRollerCount('')).toBe(0);
    expect(parseRollerCount('  ')).toBe(0);
    const outcome = checkRollerGroup({
      label: '',
      front: '',
      crown: '',
      sides: '',
      available: '',
    });
    expect(outcome.ok && outcome.result.summary).toBe(
      'Group 1: no sections planned',
    );
  });

  it('rejects negative, fractional, non-numeric and excessive counts', () => {
    for (const bad of [
      '-1',
      '1.5',
      'two',
      '1e2',
      String(ROLLER_COUNT_MAX + 1),
    ]) {
      const outcome = checkRollerGroup({
        label: 'x',
        front: bad,
        crown: '0',
        sides: '0',
        available: '0',
      });
      expect(outcome.ok).toBe(false);
      if (!outcome.ok) expect(outcome.errors.front).toBeDefined();
    }
  });

  it('accepts the practical maximum and reports an exact match as covered', () => {
    const outcome = checkRollerGroup({
      label: '64 mm',
      front: String(ROLLER_COUNT_MAX),
      crown: '0',
      sides: '0',
      available: String(ROLLER_COUNT_MAX),
    });
    expect(outcome.ok && outcome.result.summary).toBe('64 mm: covered');
  });
});
