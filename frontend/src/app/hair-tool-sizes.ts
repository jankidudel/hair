import type { GuideSource } from './guide-evidence';
import { toolLedSources as S } from './tool-led-sources';

/**
 * Hair Tool Size Visualiser data and geometry. Every measurement is stored in
 * unrounded millimetres. A published figure keeps its own text and source;
 * conversions are labelled and never replace the published value. Two figures
 * for one model are separate choices and are never averaged.
 */
export const MM_PER_INCH = 25.4;
export type SizeMode = 'plates' | 'barrels' | 'brushes';
export type SizeUnit = 'mm' | 'in';

export type Measurement =
  | { readonly kind: 'plate'; readonly width: number }
  | {
      readonly kind: 'cylinder';
      readonly diameter: number;
      readonly length?: number;
    }
  | {
      readonly kind: 'taper';
      readonly wide: number;
      readonly narrow: number;
      readonly length?: number;
    }
  | {
      readonly kind: 'brush';
      readonly core?: number;
      readonly bristle?: number;
    };

export interface PublishedFigure {
  readonly id: string;
  /** Where the figure appears, such as “Overview” or “FAQ”. */
  readonly basis: string;
  /** The published wording, kept as the maker wrote it. */
  readonly published: string;
  /** Unit the maker published in; the other unit is a labelled conversion. */
  readonly publishedUnit: SizeUnit;
  readonly value: Measurement;
  readonly source: GuideSource;
}

export interface SizePreset {
  readonly id: string;
  readonly mode: SizeMode;
  readonly market: 'UK' | 'US';
  readonly name: string;
  readonly figures: readonly PublishedFigure[];
}

const inch = (value: number) => value * MM_PER_INCH;

const plate = (width: number): Measurement => ({ kind: 'plate', width });
const cyl = (diameter: number): Measurement => ({ kind: 'cylinder', diameter });
const brush = (core: number, bristle: number): Measurement => ({
  kind: 'brush',
  core,
  bristle,
});

export const sizePresets: readonly SizePreset[] = [
  {
    id: 'ghd-mini',
    mode: 'plates',
    market: 'UK',
    name: 'ghd Mini (black)',
    figures: [
      {
        id: 'overview',
        basis: 'Listing overview',
        published: '15mm plate',
        publishedUnit: 'mm',
        value: plate(15),
        source: S.ghdMini,
      },
      {
        id: 'faq',
        basis: 'Listing FAQ',
        published: '14.6mm plates',
        publishedUnit: 'mm',
        value: plate(14.6),
        source: S.ghdMini,
      },
      {
        id: 'compare',
        basis: 'ghd compare table',
        published: '15.3 mm',
        publishedUnit: 'mm',
        value: plate(15.3),
        source: S.ghdCompare,
      },
    ],
  },
  {
    id: 'ghd-chronos-max',
    mode: 'plates',
    market: 'UK',
    name: 'ghd Chronos Max (black)',
    figures: [
      {
        id: 'heading',
        basis: 'Listing heading',
        published: '43mm plate',
        publishedUnit: 'mm',
        value: plate(43),
        source: S.ghdChronosMax,
      },
      {
        id: 'faq',
        basis: 'Listing FAQ',
        published: '43.7 mm',
        publishedUnit: 'mm',
        value: plate(43.7),
        source: S.ghdChronosMax,
      },
      {
        id: 'compare',
        basis: 'ghd compare table',
        published: '43.7 mm',
        publishedUnit: 'mm',
        value: plate(43.7),
        source: S.ghdCompare,
      },
    ],
  },
  {
    id: 'ghd-classic-tong',
    mode: 'barrels',
    market: 'UK',
    name: 'ghd Chronos Curve Classic Tong',
    figures: [
      {
        id: 'listing',
        basis: 'Listing',
        published: '26mm barrel',
        publishedUnit: 'mm',
        value: cyl(26),
        source: S.ghdClassicTong,
      },
    ],
  },
  {
    id: 'ghd-grand-tong',
    mode: 'barrels',
    market: 'UK',
    name: 'ghd Chronos Curve Grand Tong',
    figures: [
      {
        id: 'listing',
        basis: 'Listing',
        published: '32mm barrel',
        publishedUnit: 'mm',
        value: cyl(32),
        source: S.ghdGrandTong,
      },
    ],
  },
  {
    id: 'ghd-conical-wand',
    mode: 'barrels',
    market: 'UK',
    name: 'ghd Chronos Curve Conical Wand',
    figures: [
      {
        id: 'listing',
        basis: 'Listing',
        published: '28–23mm',
        publishedUnit: 'mm',
        value: { kind: 'taper', wide: 28, narrow: 23 },
        source: S.ghdConicalWand,
      },
    ],
  },
  {
    id: 'ghd-max-wand',
    mode: 'barrels',
    market: 'UK',
    name: 'ghd Chronos Curve Max Wand',
    figures: [
      {
        id: 'listing',
        basis: 'Listing',
        published: '38mm barrel',
        publishedUnit: 'mm',
        value: cyl(38),
        source: S.ghdMaxWand,
      },
    ],
  },
  ...(
    [
      ['1', '1″', 1],
      ['125', '1¼″ (1.25″ on the size chooser)', 1.25],
      ['15', '1½″ (1.5″ on the size chooser)', 1.5],
    ] as const
  ).map(([key, published, inches]): SizePreset => ({
    id: `t3-curl-x-${key}`,
    mode: 'barrels',
    market: 'US',
    name: `T3 SinglePass Curl X ${published.split(' ')[0]}`,
    figures: [
      {
        id: 'chooser',
        basis: 'Barrel Size chooser',
        published,
        publishedUnit: 'in',
        value: cyl(inch(inches)),
        source: S.t3CurlX,
      },
    ],
  })),
  ...(
    [
      ['24', '1″', 1, '1½″', 1.5],
      ['34', '1¼″', 1.25, '2″', 2],
      ['44', '1¾″', 1.75, '2⅜″', 2.375],
    ] as const
  ).flatMap(([size, coreText, core, bristleText, bristle]): SizePreset[] => [
    {
      id: `og-nt-${size}`,
      mode: 'brushes',
      market: 'US',
      name: `Olivia Garden NanoThermic Round NT-${size}`,
      figures: [
        {
          id: 'chart',
          basis: 'Size chart (bare barrel / bristle-tip)',
          published: `${coreText} barrel / ${bristleText} bristles`,
          publishedUnit: 'in',
          value: brush(inch(core), inch(bristle)),
          source: S.ogRound,
        },
      ],
    },
    {
      id: `og-ntxl-${size}`,
      mode: 'brushes',
      market: 'US',
      name: `Olivia Garden NanoThermic Speed XL NTXL-${size}`,
      figures: [
        {
          id: 'chart',
          basis: 'Size chart in inches (bare barrel / bristle-tip)',
          published: `${coreText} barrel / ${bristleText} bristles`,
          publishedUnit: 'in',
          value: brush(inch(core), inch(bristle)),
          source: S.ogSpeedXl,
        },
        ...(size === '34'
          ? [
              {
                id: 'metric-label',
                basis: 'Maker’s nominal metric barrel label',
                published: '34 mm barrel (nominal label)',
                publishedUnit: 'mm' as const,
                value: { kind: 'brush', core: 34 } as const,
                source: S.ogSpeedXl,
              },
            ]
          : []),
      ],
    },
  ]),
];

export const presetById = (id: string): SizePreset | undefined =>
  sizePresets.find((preset) => preset.id === id);

export const presetsForMode = (mode: SizeMode): readonly SizePreset[] =>
  sizePresets.filter((preset) => preset.mode === mode);

export const modeLabels: Readonly<Record<SizeMode, string>> = {
  plates: 'Plate widths',
  barrels: 'Curling barrels',
  brushes: 'Round brushes',
};

export interface ComparisonPreset {
  readonly id: string;
  readonly label: string;
  readonly mode: SizeMode;
  readonly a: { readonly preset: string; readonly figure: string };
  readonly b: { readonly preset: string; readonly figure: string };
}

/** Allowlisted comparison links: /hair-tool-size-visualiser#compare-<id> */
export const comparisonPresets: readonly ComparisonPreset[] = [
  {
    id: 'ghd-mini-vs-chronos-max',
    label: 'ghd Mini vs Chronos Max plates',
    mode: 'plates',
    a: { preset: 'ghd-mini', figure: 'overview' },
    b: { preset: 'ghd-chronos-max', figure: 'heading' },
  },
  {
    id: 'ghd-classic-vs-grand',
    label: 'ghd Classic 26 mm vs Grand 32 mm tong',
    mode: 'barrels',
    a: { preset: 'ghd-classic-tong', figure: 'listing' },
    b: { preset: 'ghd-grand-tong', figure: 'listing' },
  },
  {
    id: 'ghd-conical-vs-max',
    label: 'ghd Conical 28–23 mm vs Max 38 mm wand',
    mode: 'barrels',
    a: { preset: 'ghd-conical-wand', figure: 'listing' },
    b: { preset: 'ghd-max-wand', figure: 'listing' },
  },
  {
    id: 't3-curl-x-1-vs-125',
    label: 'T3 SinglePass Curl X 1″ vs 1¼″',
    mode: 'barrels',
    a: { preset: 't3-curl-x-1', figure: 'chooser' },
    b: { preset: 't3-curl-x-125', figure: 'chooser' },
  },
  {
    id: 'og-nt34-vs-ntxl34',
    label: 'Olivia Garden NT-34 vs NTXL-34',
    mode: 'brushes',
    a: { preset: 'og-nt-34', figure: 'chart' },
    b: { preset: 'og-ntxl-34', figure: 'chart' },
  },
];

/** Default comparison shown for each mode. */
export const modeDemo: Readonly<Record<SizeMode, string>> = {
  plates: 'ghd-mini-vs-chronos-max',
  barrels: 'ghd-conical-vs-max',
  brushes: 'og-nt34-vs-ntxl34',
};

export const comparisonPresetById = (id: string) =>
  comparisonPresets.find((preset) => preset.id === id);

const fractionChars: Readonly<Record<string, number>> = {
  '¼': 0.25,
  '½': 0.5,
  '¾': 0.75,
  '⅛': 0.125,
  '⅜': 0.375,
  '⅝': 0.625,
  '⅞': 0.875,
};

/**
 * Parses a reader-entered length. Accepts decimals in both units, and in
 * inch mode common fractions such as “1 1/4”, “1-1/4”, “1¼” or “3/8”.
 * Returns millimetres, `null` for blank, or `NaN` when unreadable.
 */
export function parseLength(raw: string, unit: SizeUnit): number | null {
  const text = raw
    .trim()
    .replace(/(mm|millimet(?:re|er)s?|inches|inch|in|″|")$/i, '')
    .trim()
    .replace(',', '.');
  if (!text) return null;
  let value: number;
  if (/^\d+(\.\d+)?$|^\.\d+$/.test(text)) value = Number(text);
  else if (unit === 'in') {
    const unicode = text.match(/^(\d+)?\s*([¼½¾⅛⅜⅝⅞])$/);
    const ascii = text.match(/^(?:(\d+)[\s-]+)?(\d+)\/(\d+)$/);
    if (unicode) value = Number(unicode[1] ?? 0) + fractionChars[unicode[2]];
    else if (ascii && Number(ascii[3]) > 0)
      value = Number(ascii[1] ?? 0) + Number(ascii[2]) / Number(ascii[3]);
    else return NaN;
  } else return NaN;
  return unit === 'in' ? value * MM_PER_INCH : value;
}

const trim = (value: number, places: number) =>
  String(Number(value.toFixed(places)));

/** Formats millimetres in the reader’s unit. */
export const formatLength = (mm: number, unit: SizeUnit): string =>
  unit === 'mm' ? `${trim(mm, 2)} mm` : `${trim(mm / MM_PER_INCH, 3)} in`;

/** Value for an input field, without the unit. */
export const inputValue = (mm: number | undefined, unit: SizeUnit): string =>
  mm === undefined
    ? ''
    : unit === 'mm'
      ? trim(mm, 3)
      : trim(mm / MM_PER_INCH, 4);

/** “15 mm (published)” or “25.4 mm (converted from 1″)”. */
export function figureText(
  mm: number,
  figure: PublishedFigure | undefined,
  unit: SizeUnit,
): string {
  if (!figure) return formatLength(mm, unit);
  return figure.publishedUnit === unit
    ? `${formatLength(mm, unit)} (published)`
    : `${formatLength(mm, unit)} (converted)`;
}

export type FieldName =
  'width' | 'diameter' | 'wide' | 'narrow' | 'length' | 'core' | 'bristle';

export const fieldLabels: Readonly<Record<FieldName, string>> = {
  width: 'Heated plate width',
  diameter: 'Barrel diameter',
  wide: 'Wide end diameter',
  narrow: 'Narrow end diameter',
  length: 'Heated barrel length (optional)',
  core: 'Bare core diameter',
  bristle: 'Bristle-tip diameter',
};

export type ManualShape = 'plate' | 'cylinder' | 'taper' | 'brush';

export const fieldsForShape: Readonly<
  Record<ManualShape, readonly FieldName[]>
> = {
  plate: ['width'],
  cylinder: ['diameter', 'length'],
  taper: ['wide', 'narrow', 'length'],
  brush: ['core', 'bristle'],
};

export type ManualValues = Partial<Record<FieldName, number>>;

/**
 * Validates a manual entry. Errors are keyed by field so they render inline;
 * a card with errors is not drawn, while the other card stays valid.
 */
export function buildMeasurement(
  shape: ManualShape,
  values: ManualValues,
  invalid: ReadonlySet<FieldName>,
): { measurement?: Measurement; errors: Partial<Record<FieldName, string>> } {
  const errors: Partial<Record<FieldName, string>> = {};
  for (const field of invalid)
    errors[field] = 'Enter a number, such as 25 or 1 1/4.';
  const positive = (field: FieldName, required: boolean) => {
    if (errors[field]) return undefined;
    const value = values[field];
    if (value === undefined) {
      if (required) errors[field] = 'Enter this measurement.';
      return undefined;
    }
    if (!(value > 0)) {
      errors[field] = 'Enter a measurement greater than zero.';
      return undefined;
    }
    return value;
  };
  let measurement: Measurement | undefined;
  if (shape === 'plate') {
    const width = positive('width', true);
    if (width !== undefined) measurement = { kind: 'plate', width };
  } else if (shape === 'cylinder') {
    const diameter = positive('diameter', true);
    const length = positive('length', false);
    if (diameter !== undefined && !errors.length)
      measurement = { kind: 'cylinder', diameter, length };
  } else if (shape === 'taper') {
    const wide = positive('wide', true);
    const narrow = positive('narrow', true);
    const length = positive('length', false);
    if (wide !== undefined && narrow !== undefined && narrow >= wide)
      errors.narrow = 'The narrow end must be smaller than the wide end.';
    if (
      wide !== undefined &&
      narrow !== undefined &&
      !errors.narrow &&
      !errors.length
    )
      measurement = { kind: 'taper', wide, narrow, length };
  } else {
    const core = positive('core', false);
    const bristle = positive('bristle', false);
    if (
      !errors.core &&
      !errors.bristle &&
      core === undefined &&
      bristle === undefined
    )
      errors.core =
        'Enter the core diameter, the bristle-tip diameter, or both.';
    if (core !== undefined && bristle !== undefined && bristle < core)
      errors.bristle =
        'The bristle-tip diameter can’t be smaller than the core.';
    if (
      !errors.core &&
      !errors.bristle &&
      (core !== undefined || bristle !== undefined)
    )
      measurement = { kind: 'brush', core, bristle };
  }
  return { measurement, errors };
}

/** Horizontal extent in millimetres of the drawing for one measurement. */
export function drawingExtent(m: Measurement): number {
  switch (m.kind) {
    case 'plate':
      return m.width;
    case 'cylinder':
      return m.length ?? m.diameter;
    case 'taper':
      return m.length ?? m.wide + m.narrow + taperGap(m);
    case 'brush':
      return Math.max(m.core ?? 0, m.bristle ?? 0);
  }
}

/** Gap between the two end circles of a taper drawn without a length. */
export const taperGap = (m: { wide: number }) => m.wide * 0.35;

const diff = (a: number, b: number, unit: SizeUnit) =>
  formatLength(Math.abs(a - b), unit);

const compareLine = (
  aLabel: string,
  a: number,
  bLabel: string,
  b: number,
  quantity: string,
  unit: SizeUnit,
  wider = 'wider',
) =>
  Math.abs(a - b) < 1e-9
    ? `${aLabel} and ${bLabel} have the same ${quantity}.`
    : a > b
      ? `${aLabel} is ${diff(a, b, unit)} ${wider} than ${bLabel}.`
      : `${bLabel} is ${diff(a, b, unit)} ${wider} than ${aLabel}.`;

/**
 * Summarises only like-for-like quantities. A taper is compared from each
 * named end; brushes compare core to core and bristle-tip to bristle-tip.
 */
export function compareMeasurements(
  a: Measurement,
  b: Measurement,
  unit: SizeUnit,
): readonly string[] {
  const f = (mm: number) => formatLength(mm, unit);
  if (a.kind === 'plate' && b.kind === 'plate')
    return [
      compareLine(
        `the ${f(a.width)} plate (A)`,
        a.width,
        `the ${f(b.width)} plate (B)`,
        b.width,
        'heated plate width',
        unit,
      ),
    ].map(capitalise);
  if (a.kind === 'cylinder' && b.kind === 'cylinder')
    return [
      compareLine(
        `the ${f(a.diameter)} barrel (A)`,
        a.diameter,
        `the ${f(b.diameter)} barrel (B)`,
        b.diameter,
        'barrel diameter',
        unit,
      ),
    ].map(capitalise);
  if (
    (a.kind === 'taper' && b.kind === 'cylinder') ||
    (a.kind === 'cylinder' && b.kind === 'taper')
  ) {
    const cylinder =
      a.kind === 'cylinder'
        ? a
        : (b as Extract<Measurement, { kind: 'cylinder' }>);
    const taper =
      a.kind === 'taper' ? a : (b as Extract<Measurement, { kind: 'taper' }>);
    const ends = [`the ${f(taper.wide)} end`, `the ${f(taper.narrow)} end`];
    const rel = (end: number) =>
      Math.abs(cylinder.diameter - end) < 1e-9
        ? ['the same as', '']
        : cylinder.diameter > end
          ? [`${diff(cylinder.diameter, end, unit)} wider than`, '']
          : [`${diff(cylinder.diameter, end, unit)} narrower than`, ''];
    return [
      `The ${f(cylinder.diameter)} cylinder is ${rel(taper.wide)[0]} ${ends[0]} and ${rel(taper.narrow)[0]} ${ends[1]}.`,
    ];
  }
  if (a.kind === 'taper' && b.kind === 'taper')
    return [
      capitalise(
        compareLine(
          `the wide end of A (${f(a.wide)})`,
          a.wide,
          `the wide end of B (${f(b.wide)})`,
          b.wide,
          'wide-end diameter',
          unit,
        ),
      ),
      capitalise(
        compareLine(
          `the narrow end of A (${f(a.narrow)})`,
          a.narrow,
          `the narrow end of B (${f(b.narrow)})`,
          b.narrow,
          'narrow-end diameter',
          unit,
        ),
      ),
    ];
  if (a.kind === 'brush' && b.kind === 'brush') {
    const lines: string[] = [];
    if (a.core !== undefined && b.core !== undefined)
      lines.push(
        capitalise(
          compareLine(
            `the ${f(a.core)} core (A)`,
            a.core,
            `the ${f(b.core)} core (B)`,
            b.core,
            'core diameter',
            unit,
          ),
        ),
      );
    if (a.bristle !== undefined && b.bristle !== undefined)
      lines.push(
        capitalise(
          compareLine(
            `the ${f(a.bristle)} bristle-tip diameter (A)`,
            a.bristle,
            `the ${f(b.bristle)} bristle-tip diameter (B)`,
            b.bristle,
            'bristle-tip diameter',
            unit,
          ),
        ),
      );
    if (lines.length === 0)
      lines.push(
        'A and B state different measurements, so no difference is calculated.',
      );
    return lines;
  }
  return [
    'These are different kinds of measurement, so no difference is calculated.',
  ];
}

const capitalise = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

/** Printable drawing width on A4 and US Letter with 15 mm margins. */
export const PRINTABLE_WIDTH_MM = 180;
