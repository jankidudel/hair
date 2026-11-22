/**
 * Count check for a planned set of unheated rollers placed at the same time.
 * Each inventory group (usually one roller size) is compared separately: spare
 * pieces in one group never cover a shortage in another, because swapping a
 * size changes the planned curve. Counts only; this does not decide diameter,
 * working width, closure fit or a finished curl.
 */
export const rollerCountFields = [
  'front',
  'crown',
  'sides',
  'available',
] as const;

export type RollerCountField = (typeof rollerCountFields)[number];

/** A practical ceiling for one group in a single simultaneous set. */
export const ROLLER_COUNT_MAX = 60;
export const ROLLER_GROUP_LIMIT = 6;

export interface RollerGroupInput {
  readonly label: string;
  readonly front: string;
  readonly crown: string;
  readonly sides: string;
  readonly available: string;
}

export type RollerGroupStatus = 'covered' | 'short' | 'empty';

export interface RollerGroupResult {
  readonly label: string;
  readonly needed: number;
  readonly available: number;
  readonly status: RollerGroupStatus;
  /** Pieces missing for this group's plan; zero when covered. */
  readonly shortBy: number;
  /** Pieces left over in this group only; they cannot cover another group. */
  readonly spare: number;
  /** Human-readable result, for example "35 mm: covered" or "45 mm: 2 short". */
  readonly summary: string;
}

export type RollerGroupOutcome =
  | { readonly ok: true; readonly result: RollerGroupResult }
  | {
      readonly ok: false;
      readonly errors: Readonly<Partial<Record<RollerCountField, string>>>;
    };

const fieldLabels: Readonly<Record<RollerCountField, string>> = {
  front: 'front sections',
  crown: 'crown sections',
  sides: 'side sections',
  available: 'rollers available',
};

/** Empty means zero. Returns NaN for anything other than a whole count. */
export function parseRollerCount(value: string | null | undefined): number {
  const text = (value ?? '').trim();
  if (text === '') return 0;
  if (!/^\d+$/.test(text)) return Number.NaN;
  return Number(text);
}

export function groupLabel(label: string, index: number): string {
  const trimmed = label.trim().slice(0, 40);
  return trimmed || `Group ${index + 1}`;
}

export function checkRollerGroup(
  input: RollerGroupInput,
  index = 0,
): RollerGroupOutcome {
  const errors: Partial<Record<RollerCountField, string>> = {};
  const counts = {} as Record<RollerCountField, number>;
  for (const field of rollerCountFields) {
    const value = parseRollerCount(input[field]);
    if (!Number.isInteger(value) || value < 0 || value > ROLLER_COUNT_MAX)
      errors[field] =
        `Enter whole ${fieldLabels[field]} from 0 to ${ROLLER_COUNT_MAX}, or leave it blank for 0.`;
    counts[field] = value;
  }
  if (Object.keys(errors).length > 0) return { ok: false, errors };
  const label = groupLabel(input.label, index);
  const needed = counts.front + counts.crown + counts.sides;
  const available = counts.available;
  const shortBy = Math.max(0, needed - available);
  const spare = Math.max(0, available - needed);
  const status: RollerGroupStatus =
    needed === 0 ? 'empty' : shortBy > 0 ? 'short' : 'covered';
  const summary =
    status === 'empty'
      ? `${label}: no sections planned`
      : status === 'short'
        ? `${label}: ${shortBy} short`
        : `${label}: covered`;
  return {
    ok: true,
    result: { label, needed, available, status, shortBy, spare, summary },
  };
}

export function checkRollerPlan(
  groups: readonly RollerGroupInput[],
): readonly RollerGroupOutcome[] {
  return groups.map((group, index) => checkRollerGroup(group, index));
}

/** The worked example published in the guide; also the planner's reset state. */
export const rollerPlannerExample: readonly RollerGroupInput[] = [
  { label: '35 mm', front: '2', crown: '', sides: '', available: '2' },
  { label: '45 mm', front: '', crown: '4', sides: '2', available: '4' },
];

export const emptyRollerGroup = (): RollerGroupInput => ({
  label: '',
  front: '',
  crown: '',
  sides: '',
  available: '',
});
