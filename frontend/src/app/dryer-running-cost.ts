/**
 * Electricity-use arithmetic for a hair dryer. It assumes the entered power is
 * drawn for the whole entered time; a nameplate rating is not a measurement of
 * every heat/speed setting.
 */
export type TariffUnit = 'major' | 'minor';

export interface DryerRunningCostInput {
  /** Rated or measured average power in watts. */
  readonly watts: number;
  /** Minutes the dryer runs in one use. */
  readonly minutesPerUse: number;
  /** Uses per week. */
  readonly usesPerWeek: number;
  /** Unit rate per kWh, in pounds/dollars/euros ('major') or pence/cents ('minor'). */
  readonly pricePerKwh: number;
  readonly tariffUnit: TariffUnit;
}

export interface DryerRunningCostResult {
  readonly kwhPerUse: number;
  readonly kwhPerWeek: number;
  /** Costs are in the major currency unit (for example pounds, not pence). */
  readonly costPerUse: number;
  readonly weeklyCost: number;
  /** A 52-week estimate, not a calendar-year bill. */
  readonly annualisedCost: number;
}

export type DryerRunningCostField = keyof Omit<
  DryerRunningCostInput,
  'tariffUnit'
>;

export type DryerRunningCostOutcome =
  | { readonly ok: true; readonly result: DryerRunningCostResult }
  | {
      readonly ok: false;
      readonly errors: Readonly<Partial<Record<DryerRunningCostField, string>>>;
    };

const fieldLabels: Readonly<Record<DryerRunningCostField, string>> = {
  watts: 'power',
  minutesPerUse: 'minutes per use',
  usesPerWeek: 'uses per week',
  pricePerKwh: 'electricity price',
};

/** Parses a form value; blank or non-numeric text is not a number. */
export function parseCostInput(value: string | number | null | undefined) {
  if (typeof value === 'number') return value;
  if (value === null || value === undefined) return Number.NaN;
  const text = value.trim().replace(/,/g, '');
  if (!/^\d*\.?\d+$|^\d+\.$/.test(text)) return Number.NaN;
  return Number(text);
}

export function calculateDryerRunningCost(
  input: DryerRunningCostInput,
): DryerRunningCostOutcome {
  const errors: Partial<Record<DryerRunningCostField, string>> = {};
  for (const field of Object.keys(fieldLabels) as DryerRunningCostField[]) {
    const value = input[field];
    if (!Number.isFinite(value) || value < 0)
      errors[field] = `Enter a ${fieldLabels[field]} of zero or more.`;
  }
  if (Object.keys(errors).length > 0) return { ok: false, errors };
  const kwhPerUse = (input.watts / 1000) * (input.minutesPerUse / 60);
  const price =
    input.tariffUnit === 'minor' ? input.pricePerKwh / 100 : input.pricePerKwh;
  const costPerUse = kwhPerUse * price;
  const weeklyCost = costPerUse * input.usesPerWeek;
  const result: DryerRunningCostResult = {
    kwhPerUse,
    kwhPerWeek: kwhPerUse * input.usesPerWeek,
    costPerUse,
    weeklyCost,
    annualisedCost: weeklyCost * 52,
  };
  if (!Object.values(result).every(Number.isFinite))
    return {
      ok: false,
      errors: { watts: 'Enter smaller values; the result is too large.' },
    };
  return { ok: true, result };
}

/** Rounds only for display; callers keep full precision internally. */
export function formatEnergy(kwh: number): string {
  return `${kwh.toLocaleString('en-GB', {
    minimumFractionDigits: kwh > 0 && kwh < 1 ? 3 : 2,
    maximumFractionDigits: 3,
  })} kWh`;
}

export function formatCost(amount: number, symbol: string): string {
  const digits = amount > 0 && amount < 1 ? 3 : 2;
  return `${symbol}${amount.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  })}`;
}
