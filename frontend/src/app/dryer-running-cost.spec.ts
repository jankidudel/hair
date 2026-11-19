import { describe, expect, it } from 'vitest';
import {
  calculateDryerRunningCost,
  formatCost,
  parseCostInput,
} from './dryer-running-cost';

const base = {
  watts: 2000,
  minutesPerUse: 10,
  usesPerWeek: 5,
  pricePerKwh: 25,
  tariffUnit: 'minor' as const,
};

describe('dryer running cost', () => {
  it('matches the published worked example', () => {
    const outcome = calculateDryerRunningCost(base);
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.kwhPerUse).toBeCloseTo(1 / 3, 10);
    expect(outcome.result.costPerUse).toBeCloseTo(0.08333, 5);
    expect(outcome.result.weeklyCost).toBeCloseTo(0.41667, 5);
    expect(outcome.result.annualisedCost).toBeCloseTo(21.6667, 4);
    expect(formatCost(outcome.result.annualisedCost, '£')).toBe('£21.67');
  });

  it('treats pence/cents and whole-currency rates equivalently', () => {
    const minor = calculateDryerRunningCost(base);
    const major = calculateDryerRunningCost({
      ...base,
      pricePerKwh: 0.25,
      tariffUnit: 'major',
    });
    expect(minor.ok && major.ok).toBe(true);
    if (!minor.ok || !major.ok) return;
    expect(major.result.costPerUse).toBeCloseTo(minor.result.costPerUse, 12);
  });

  it('allows legitimate zero cost without NaN', () => {
    for (const input of [
      { ...base, pricePerKwh: 0 },
      { ...base, usesPerWeek: 0 },
      { ...base, watts: 0 },
    ]) {
      const outcome = calculateDryerRunningCost(input);
      expect(outcome.ok).toBe(true);
      if (outcome.ok)
        for (const value of Object.values(outcome.result))
          expect(Number.isFinite(value)).toBe(true);
    }
  });

  it('rejects empty, negative, non-numeric and infinite inputs', () => {
    expect(parseCostInput('')).toBeNaN();
    expect(parseCostInput('abc')).toBeNaN();
    expect(parseCostInput('-5')).toBeNaN();
    expect(parseCostInput('1e400')).toBeNaN();
    expect(parseCostInput('1,800')).toBe(1800);
    for (const input of [
      { ...base, watts: Number.NaN },
      { ...base, minutesPerUse: -1 },
      { ...base, pricePerKwh: Number.POSITIVE_INFINITY },
    ]) {
      const outcome = calculateDryerRunningCost(input);
      expect(outcome.ok).toBe(false);
    }
    const overflow = calculateDryerRunningCost({
      ...base,
      watts: 1e308,
      minutesPerUse: 1e308,
    });
    expect(overflow.ok).toBe(false);
  });
});
