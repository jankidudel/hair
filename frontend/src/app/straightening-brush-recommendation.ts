export type StraighteningBrushLength = 'short' | 'medium' | 'long';
export type StraighteningBrushDensity = 'fine' | 'medium' | 'thick';
export type StraighteningBrushTexture = 'straight' | 'wavy' | 'curly';
export type StraighteningBrushFinish = 'soft-smoothing' | 'sleek' | 'refresh';
export type HeatControlPreference = 'lower' | 'adjustable' | 'simple';
export type StylingFrequency = 'occasional' | 'regular';
export type StraighteningBrushBudget = 'entry' | 'mid-range' | 'premium';

export interface StraighteningBrushAnswers {
  readonly length: StraighteningBrushLength;
  readonly density: StraighteningBrushDensity;
  readonly texture: StraighteningBrushTexture;
  readonly finish: StraighteningBrushFinish;
  readonly heatControl: HeatControlPreference;
  readonly frequency: StylingFrequency;
  readonly budget: StraighteningBrushBudget;
}

export interface StraighteningBrushResult {
  readonly heading: string;
  readonly explanation: string;
  readonly features: readonly string[];
  readonly caution: string;
}

export function recommendStraighteningBrush(
  answers: StraighteningBrushAnswers,
): StraighteningBrushResult {
  const hair = `${answers.length}, ${answers.density} ${answers.texture} hair`;
  const controls =
    answers.heatControl === 'lower'
      ? 'lower and adjustable temperature settings'
      : 'adjustable temperature settings';

  if (answers.finish === 'refresh')
    return {
      heading: 'Look for an easy-to-handle brush with adjustable controls',
      explanation: `For a dry-hair refresh on ${hair}, a straightforward brush format and ${controls} are more useful than a long feature list. Choose a tool you can guide through smaller sections without turning a quick tidy-up into a full styling routine.`,
      features: [
        'Adjustable temperature settings',
        'Comfortable handle',
        'Clear controls',
      ],
      caution: 'Use only on dry, detangled hair as directed by the maker.',
    };

  if (answers.texture === 'curly' || answers.density === 'thick')
    return {
      heading:
        'Look for adjustable settings and a brush that suits section work',
      explanation: `With ${hair}, compare a brush’s settings and layout before assuming one pass will suit every section. A straightening brush is a dry-hair smoothing category; it is most useful when its controls and handling fit the amount of work you expect to do.`,
      features: [
        'Adjustable temperature settings',
        'Wide, usable brush surface',
        'Comfortable handle',
        'Automatic shut-off',
      ],
      caution:
        'Smaller sections give you more control than repeatedly passing over a large one.',
    };

  if (answers.budget === 'entry')
    return {
      heading: 'Start with the core controls rather than extra modes',
      explanation: `For ${hair}, an entry-level comparison should start with ${controls}, a practical handle and the stated safety features. Spend on the controls you expect to use, rather than assuming a higher price alone will make the tool a better fit.`,
      features: [
        'Adjustable temperature settings',
        'Clear controls',
        'Automatic shut-off',
      ],
      caution: 'Check the exact settings and maker instructions before buying.',
    };

  return {
    heading: 'Look for adjustable controls that match your usual finish',
    explanation: `For ${hair} and a ${answers.finish === 'sleek' ? 'sleeker' : 'softly smoothed'} finish, compare ${controls}, brush shape and how comfortably the handle fits your regular routine. ${answers.frequency === 'regular' ? 'For regular use, simple controls you can repeat matter more than occasional novelty settings.' : 'For occasional use, a clear, uncomplicated control layout may be enough.'}`,
    features: [
      'Adjustable temperature settings',
      'Brush shape and usable surface',
      'Comfortable handle',
      'Automatic shut-off',
    ],
    caution:
      'A stated setting does not guarantee the same finish for every routine.',
  };
}
