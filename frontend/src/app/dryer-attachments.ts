import { ArticleSlug } from './article-slug';
import type { GuideSource } from './guide-evidence';
import { toolLedSources as S } from './tool-led-sources';

/**
 * Hair Dryer Attachment Finder records. A maker fit list, a kit box list and a
 * body-dependent feature are separate evidence types with their own sources.
 * Fit is never inferred from a product name, a collar measurement, a box list
 * or another market's part list.
 */
export type FinderMarket = 'UK' | 'US';
/** Parlux evidence is the maker's international catalogue, not UK or US. */
export type RecordMarket = FinderMarket | 'International';
export type AttachmentType =
  'diffuser' | 'concentrator' | 'comb-nozzle' | 'polisher' | 'round-brush';

export const attachmentTypeLabels: Readonly<Record<AttachmentType, string>> = {
  diffuser: 'Diffuser',
  concentrator: 'Concentrator',
  'comb-nozzle': 'Comb nozzle',
  polisher: 'Polisher',
  'round-brush': 'Round brush',
};

export interface DryerVariant {
  readonly id: string;
  readonly label: string;
}

export interface DryerRecord {
  readonly id: string;
  readonly market: RecordMarket;
  readonly maker: string;
  readonly name: string;
  /** Exact maker code, when the maker prints one. */
  readonly code?: string;
  /** Verified alternative names, compared after normalisation. */
  readonly aliases: readonly string[];
  /** Variants with different box contents. */
  readonly variants?: readonly DryerVariant[];
  readonly supportUrl?: string;
  readonly supportLabel?: string;
  readonly guideSlug?: string;
  readonly guideLabel?: string;
}

export interface AttachmentPart {
  readonly id: string;
  readonly market: RecordMarket;
  readonly maker: string;
  readonly name: string;
  readonly code: string;
  readonly type: AttachmentType;
  readonly source: GuideSource;
  readonly detail?: string;
}

export type FitStatus =
  | 'fits'
  | 'fits-with-adapter'
  | 'fits-check-version'
  | 'excluded'
  | 'unconfirmed';

export const fitStatusLabels: Readonly<Record<FitStatus, string>> = {
  fits: 'Fits',
  'fits-with-adapter': 'Fits with adapter',
  'fits-check-version': 'Fits · check Air version for adapter',
  excluded: 'Maker excludes this model',
  unconfirmed: 'Fit unconfirmed',
};

export interface FitRecord {
  readonly partId: string;
  readonly dryerId: string;
  /** Limits the record to one variant; otherwise the whole model. */
  readonly variantId?: string;
  readonly status: Exclude<FitStatus, 'unconfirmed'>;
  readonly adapter?: string;
  /** Whether the maker lists the adapter with the part, when stated. */
  readonly adapterSupply?: string;
  /** One-sentence, model-specific fitting instruction. */
  readonly instruction: string;
  readonly sources: readonly GuideSource[];
}

/** A family statement shown with its scope; never a model-level fit. */
export interface FamilyNote {
  readonly partId: string;
  readonly dryerIds: readonly string[];
  readonly text: string;
  readonly source: GuideSource;
}

export interface FeatureClaim {
  readonly partId: string;
  readonly dryerIds: readonly string[];
  readonly text: string;
  readonly source: GuideSource;
}

export interface BoxItem {
  readonly name: string;
  readonly type?: AttachmentType;
  /** Set only when the box itself names this exact spare. */
  readonly partId?: string;
}

export interface KitBox {
  readonly dryerId: string;
  readonly variantId: string;
  /** False when the source confirms only some contents. */
  readonly complete: boolean;
  readonly items: readonly BoxItem[];
  readonly source: GuideSource;
}

const ghdSupport = 'https://www.ghdhair.com/';
const sharkUkSupport = 'https://support.sharkninja.co.uk/';
const sharkUsSupport = 'https://support.sharkninja.com/';
const dysonUkSupport = 'https://www.dyson.co.uk/support';

export const dryers: readonly DryerRecord[] = [
  {
    id: 'ghd-air-uk',
    market: 'UK',
    maker: 'ghd',
    name: 'ghd Air (version not specified)',
    aliases: [],
    supportUrl: ghdSupport,
    supportLabel: 'ghd UK',
    guideSlug: ArticleSlug.GhdAirHeliosDiffuserCompatibility,
    guideLabel: 'ghd Air and Helios diffuser compatibility',
  },
  {
    id: 'ghd-air-1-uk',
    market: 'UK',
    maker: 'ghd',
    name: 'ghd Air 1.0',
    aliases: ['ghd air 1.0', 'air 1.0', 'ghd air 1'],
    supportUrl: ghdSupport,
    supportLabel: 'ghd UK',
    guideSlug: ArticleSlug.GhdAirHeliosDiffuserCompatibility,
    guideLabel: 'ghd Air and Helios diffuser compatibility',
  },
  {
    id: 'ghd-helios-uk',
    market: 'UK',
    maker: 'ghd',
    name: 'ghd Helios',
    aliases: ['ghd helios', 'helios'],
    variants: [{ id: 'black-p497', label: 'Black (p-497)' }],
    supportUrl: ghdSupport,
    supportLabel: 'ghd UK',
    guideSlug: ArticleSlug.GhdHeliosNozzleAttachmentsCompared,
    guideLabel: 'ghd Helios nozzles compared',
  },
  {
    id: 'ghd-flight-plus-uk',
    market: 'UK',
    maker: 'ghd',
    name: 'ghd Flight+',
    aliases: ['ghd flight+', 'flight+', 'ghd flight plus'],
    supportUrl: ghdSupport,
    supportLabel: 'ghd UK',
    guideSlug: ArticleSlug.GhdAirHeliosDiffuserCompatibility,
    guideLabel: 'ghd Air and Helios diffuser compatibility',
  },
  {
    id: 'shark-hd500uk',
    market: 'UK',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex',
    code: 'HD500UK',
    aliases: ['speedstyle pro flex'],
    supportUrl: sharkUkSupport,
    supportLabel: 'Shark UK support',
    guideSlug: ArticleSlug.SharkSpeedstyleDiffuserCompatibility,
    guideLabel: 'Shark SpeedStyle diffuser compatibility',
  },
  {
    id: 'shark-hd542uk',
    market: 'UK',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex 4-in-1',
    code: 'HD542UK',
    aliases: ['speedstyle pro flex 4-in-1'],
    variants: [{ id: 'mocha-silver', label: 'Mocha Silver' }],
    supportUrl: sharkUkSupport,
    supportLabel: 'Shark UK support',
    guideSlug: ArticleSlug.SharkSpeedstyleDiffuserCompatibility,
    guideLabel: 'Shark SpeedStyle diffuser compatibility',
  },
  {
    id: 'dyson-nural-uk',
    market: 'UK',
    maker: 'Dyson',
    name: 'Dyson Supersonic Nural',
    code: 'HD16',
    aliases: ['supersonic nural', 'dyson supersonic nural'],
    variants: [{ id: 'ceramic-patina-topaz', label: 'Ceramic patina/topaz' }],
    supportUrl: dysonUkSupport,
    supportLabel: 'Dyson UK support',
    guideSlug: ArticleSlug.DysonWaveCurlDomeVsDiffuse,
    guideLabel: 'Dyson Wave+Curl diffuser: Dome vs Diffuse',
  },
  {
    id: 'dyson-supersonic-hd07-uk',
    market: 'UK',
    maker: 'Dyson',
    name: 'Dyson Supersonic (earlier model)',
    code: 'HD07',
    aliases: [],
    supportUrl: dysonUkSupport,
    supportLabel: 'Dyson UK support',
    guideSlug: ArticleSlug.DysonWaveCurlDomeVsDiffuse,
    guideLabel: 'Dyson Wave+Curl diffuser: Dome vs Diffuse',
  },
  {
    id: 'shark-hd331-us',
    market: 'US',
    maker: 'Shark',
    name: 'Shark SpeedStyle',
    code: 'HD331',
    aliases: [],
    supportUrl: sharkUsSupport,
    supportLabel: 'Shark US support',
    guideSlug: ArticleSlug.SharkSpeedstyleDiffuserCompatibility,
    guideLabel: 'Shark SpeedStyle diffuser compatibility',
  },
  {
    id: 'shark-hd332-us',
    market: 'US',
    maker: 'Shark',
    name: 'Shark SpeedStyle',
    code: 'HD332',
    aliases: [],
    supportUrl: sharkUsSupport,
    supportLabel: 'Shark US support',
    guideSlug: ArticleSlug.SharkSpeedstyleDiffuserCompatibility,
    guideLabel: 'Shark SpeedStyle diffuser compatibility',
  },
  {
    id: 'shark-hd500-us',
    market: 'US',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex',
    code: 'HD500',
    aliases: [],
    supportUrl: sharkUsSupport,
    supportLabel: 'Shark US support',
    guideSlug: ArticleSlug.SharkSpeedstyleDiffuserCompatibility,
    guideLabel: 'Shark SpeedStyle diffuser compatibility',
  },
  {
    id: 'shark-hd542-us',
    market: 'US',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex',
    code: 'HD542',
    aliases: [],
    supportUrl: sharkUsSupport,
    supportLabel: 'Shark US support',
    guideSlug: ArticleSlug.SharkSpeedstyleDiffuserCompatibility,
    guideLabel: 'Shark SpeedStyle diffuser compatibility',
  },
  ...(
    [
      ['alyon', 'Parlux Alyon'],
      ['digitalyon', 'Parlux Digitalyon'],
      ['advance', 'Parlux Advance'],
      ['ethos', 'Parlux Ethos'],
      ['3500', 'Parlux 3500'],
      ['385', 'Parlux 385'],
      ['elysium', 'Parlux Elysium'],
    ] as const
  ).map(([key, name]): DryerRecord => ({
    id: `parlux-${key}`,
    market: 'International',
    maker: 'Parlux',
    name,
    aliases: [name.toLowerCase(), key],
    supportUrl: 'https://www.parlux.it/en/',
    supportLabel: 'Parlux',
    guideSlug: ArticleSlug.ParluxDiffuserCompatibility,
    guideLabel: 'Parlux diffuser compatibility',
  })),
];

export const parts: readonly AttachmentPart[] = [
  {
    id: 'ghd-p281',
    market: 'UK',
    maker: 'ghd',
    name: 'ghd Professional Hair Dryer Diffuser',
    code: 'p-281',
    type: 'diffuser',
    source: S.ghdDiffuser,
  },
  {
    id: 'ghd-p519',
    market: 'UK',
    maker: 'ghd',
    name: 'ghd Professional Wide Styling Nozzle',
    code: 'p-519',
    type: 'concentrator',
    source: S.ghdWideNozzle,
    detail: '88 mm wide',
  },
  {
    id: 'ghd-p518',
    market: 'UK',
    maker: 'ghd',
    name: 'ghd Professional Comb Nozzle',
    code: 'p-518',
    type: 'comb-nozzle',
    source: S.ghdCombNozzle,
  },
  {
    id: 'shark-xskhd5dmseu',
    market: 'UK',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex Diffuser',
    code: 'XSKHD5DMSEU',
    type: 'diffuser',
    source: S.sharkUkDiffuser,
  },
  {
    id: 'shark-xskhd5cmseu',
    market: 'UK',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex Precision Concentrator',
    code: 'XSKHD5CMSEU',
    type: 'concentrator',
    source: S.sharkUkConcentrator,
  },
  {
    id: 'shark-xskhd5pfmseu',
    market: 'UK',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex Polisher',
    code: 'XSKHD5PFMSEU',
    type: 'polisher',
    source: S.sharkUkPolisher,
  },
  {
    id: 'shark-xskhd5rbmseu',
    market: 'UK',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex Rotating Round Brush',
    code: 'XSKHD5RBMSEU',
    type: 'round-brush',
    source: S.sharkUkRoundBrush,
  },
  {
    id: 'dyson-973924-01',
    market: 'UK',
    maker: 'Dyson',
    name: 'Dyson Supersonic Wave+Curl diffuser',
    code: '973924-01',
    type: 'diffuser',
    source: S.dysonWaveCurl,
  },
  {
    id: 'shark-xskhd3da',
    market: 'US',
    maker: 'Shark',
    name: 'Shark SpeedStyle DefrizzFast Diffuser',
    code: 'XSKHD3DA',
    type: 'diffuser',
    source: S.sharkUsHd300Diffuser,
  },
  {
    id: 'shark-xskhd5dams',
    market: 'US',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex DefrizzFast Diffuser',
    code: 'XSKHD5DAMS',
    type: 'diffuser',
    source: S.sharkUsHd500Diffuser,
  },
  {
    id: 'parlux-magicsense',
    market: 'International',
    maker: 'Parlux',
    name: 'Parlux MagicSense diffuser',
    code: 'MagicSense',
    type: 'diffuser',
    source: S.parluxMagicSense,
  },
  {
    id: 'parlux-magiccompact',
    market: 'International',
    maker: 'Parlux',
    name: 'Parlux MagicCompact diffuser',
    code: 'MagicCompact',
    type: 'diffuser',
    source: S.parluxMagicCompact,
  },
];

const sharkUkProFlex = (
  partId: string,
  source: GuideSource,
  label: string,
): FitRecord[] =>
  ['shark-hd500uk', 'shark-hd542uk'].map((dryerId) => ({
    partId,
    dryerId,
    status: 'fits',
    instruction: `Shark UK lists HD500UK and HD542UK for this ${label}, with no adapter named.`,
    sources: [source],
  }));

export const fitRecords: readonly FitRecord[] = [
  {
    partId: 'ghd-p281',
    dryerId: 'ghd-air-uk',
    status: 'fits-check-version',
    adapter: 'adapter ring',
    instruction:
      'ghd says to use the diffuser with the Air, and says separately that the Air 1.0 needs the adapter ring, so check which Air you own.',
    sources: [S.ghdDiffuser, S.ghdFitFaq],
  },
  {
    partId: 'ghd-p281',
    dryerId: 'ghd-air-1-uk',
    status: 'fits-with-adapter',
    adapter: 'adapter ring',
    adapterSupply:
      'Our record does not confirm whether the ring comes with the diffuser. Check the p-281 listing before ordering.',
    instruction:
      'A footnote on the p-281 page and ghd support both say to fit the adapter ring for the Air 1.0.',
    sources: [S.ghdDiffuser, S.ghdFitFaq],
  },
  {
    partId: 'ghd-p281',
    dryerId: 'ghd-helios-uk',
    status: 'fits-with-adapter',
    adapter: 'adapter ring',
    adapterSupply:
      'Our record does not confirm whether the ring comes with the diffuser. Check the p-281 listing before ordering.',
    instruction:
      'The p-281 product feature tells Helios owners to fit the adapter ring before attaching the diffuser.',
    sources: [S.ghdDiffuser, S.ghdFitFaq],
  },
  {
    partId: 'ghd-p281',
    dryerId: 'ghd-flight-plus-uk',
    status: 'excluded',
    instruction:
      'ghd says this diffuser is not for the Flight+ travel dryer, so do not order it for that body.',
    sources: [S.ghdFitFaq],
  },
  {
    partId: 'ghd-p519',
    dryerId: 'ghd-helios-uk',
    status: 'fits',
    instruction:
      'ghd lists the Helios on the Wide Styling Nozzle page, with no adapter named.',
    sources: [S.ghdWideNozzle],
  },
  {
    partId: 'ghd-p518',
    dryerId: 'ghd-helios-uk',
    status: 'fits',
    instruction:
      'ghd lists the Helios on the Comb Nozzle page, with no adapter named.',
    sources: [S.ghdCombNozzle],
  },
  ...sharkUkProFlex('shark-xskhd5dmseu', S.sharkUkDiffuser, 'diffuser'),
  ...sharkUkProFlex(
    'shark-xskhd5cmseu',
    S.sharkUkConcentrator,
    'precision concentrator',
  ),
  ...sharkUkProFlex('shark-xskhd5pfmseu', S.sharkUkPolisher, 'polisher'),
  ...sharkUkProFlex(
    'shark-xskhd5rbmseu',
    S.sharkUkRoundBrush,
    'rotating round brush',
  ),
  {
    partId: 'dyson-973924-01',
    dryerId: 'dyson-nural-uk',
    variantId: 'ceramic-patina-topaz',
    status: 'fits',
    instruction:
      'Dyson’s support tool matches 973924-01 to the Ceramic patina/topaz Supersonic Nural; follow Dyson’s fitting steps for the diffuser.',
    sources: [S.dysonWaveCurlVariant, S.dysonWaveCurl],
  },
  ...['shark-hd331-us', 'shark-hd332-us'].map((dryerId): FitRecord => ({
    partId: 'shark-xskhd3da',
    dryerId,
    status: 'fits',
    instruction:
      'Shark US names this code on the XSKHD3DA compatible-model list, which it limits to the HD300 series.',
    sources: [S.sharkUsHd300Diffuser],
  })),
  ...['shark-hd500-us', 'shark-hd542-us'].map((dryerId): FitRecord => ({
    partId: 'shark-xskhd5dams',
    dryerId,
    status: 'fits',
    instruction:
      'Shark US names this code on the XSKHD5DAMS compatible-model list.',
    sources: [S.sharkUsHd500Diffuser],
  })),
  ...['shark-hd500-us', 'shark-hd542-us'].map((dryerId): FitRecord => ({
    partId: 'shark-xskhd3da',
    dryerId,
    status: 'excluded',
    instruction:
      'Shark says XSKHD3DA is compatible only with the SpeedStyle HD300 series, and this is a Pro Flex HD500-series code.',
    sources: [S.sharkUsHd300Diffuser],
  })),
  ...['alyon', 'digitalyon', 'advance'].map((key): FitRecord => ({
    partId: 'parlux-magicsense',
    dryerId: `parlux-${key}`,
    status: 'fits',
    instruction:
      'Parlux’s international English listing names this body for direct fit, with no adapter.',
    sources: [S.parluxMagicSense],
  })),
  ...['3500', '385', 'elysium'].map((key): FitRecord => ({
    partId: 'parlux-magicsense',
    dryerId: `parlux-${key}`,
    status: 'excluded',
    instruction:
      key === 'elysium'
        ? 'Parlux excludes Elysium from MagicSense and documents MagicCompact for it instead.'
        : 'Parlux excludes this body from MagicSense compatibility; an adapter is not documented as a workaround.',
    sources: [S.parluxMagicSense],
  })),
  {
    partId: 'parlux-magiccompact',
    dryerId: 'parlux-elysium',
    status: 'fits',
    instruction: 'Parlux documents MagicCompact exclusively for the Elysium.',
    sources: [S.parluxMagicCompact],
  },
];

export const familyNotes: readonly FamilyNote[] = [
  {
    partId: 'dyson-973924-01',
    dryerIds: ['dyson-supersonic-hd07-uk', 'dyson-nural-uk'],
    text: 'Dyson describes the Wave+Curl diffuser as physically fitting previous Supersonic dryers. That is a family statement, not a match for your exact model, and it does not cover Supersonic r, Supersonic Travel or Airwrap.',
    source: S.dysonWaveCurl,
  },
  {
    partId: 'parlux-magicsense',
    dryerIds: ['parlux-ethos'],
    text: 'Parlux’s Italian MagicSense listing names Ethos for direct fit, but the English model list does not. Confirm the exact local offer.',
    source: S.parluxMagicSense,
  },
  {
    partId: 'parlux-magiccompact',
    dryerIds: [
      'parlux-alyon',
      'parlux-digitalyon',
      'parlux-advance',
      'parlux-ethos',
      'parlux-3500',
      'parlux-385',
    ],
    text: 'Parlux documents MagicCompact exclusively for the Elysium. Its listing does not name this body, so MagicSense approval does not transfer.',
    source: S.parluxMagicCompact,
  },
];

export const featureClaims: readonly FeatureClaim[] = [
  {
    partId: 'dyson-973924-01',
    dryerIds: ['dyson-nural-uk'],
    text: 'Attachment Learning: Dyson reserves this feature for the Supersonic Nural, which recognises the attachment.',
    source: S.dysonWaveCurl,
  },
  {
    partId: 'dyson-973924-01',
    dryerIds: ['dyson-supersonic-hd07-uk'],
    text: 'Attachment Learning: Dyson reserves this feature for the Supersonic Nural, so a physical fit on an earlier Supersonic does not add it.',
    source: S.dysonWaveCurl,
  },
];

export const kitBoxes: readonly KitBox[] = [
  {
    dryerId: 'shark-hd542uk',
    variantId: 'mocha-silver',
    complete: true,
    items: [
      { name: 'Main Unit' },
      { name: 'Turbo Concentrator', type: 'concentrator' },
      { name: 'QuickSmooth Brush' },
      { name: 'DefrizzFast Diffuser', type: 'diffuser' },
      { name: 'FrizzFighter Finishing Tool' },
      { name: 'Instruction Booklet' },
    ],
    source: S.sharkHd542uk,
  },
  {
    dryerId: 'ghd-helios-uk',
    variantId: 'black-p497',
    complete: false,
    items: [{ name: 'Contoured nozzle', type: 'concentrator' }],
    source: S.ghdHelios,
  },
  {
    dryerId: 'dyson-nural-uk',
    variantId: 'ceramic-patina-topaz',
    complete: true,
    items: [
      { name: 'Supersonic Nural dryer' },
      { name: 'Flyaway attachment' },
      { name: 'Styling concentrator', type: 'concentrator' },
      { name: 'Gentle air attachment' },
      {
        name: 'Wave+Curl diffuser',
        type: 'diffuser',
        partId: 'dyson-973924-01',
      },
      { name: 'Wide-tooth comb' },
    ],
    source: S.dysonNural,
  },
];

/** Case-insensitive; removes incidental spaces; keeps suffixes and punctuation. */
export const normaliseCode = (value: string): string =>
  value.trim().toLowerCase().replace(/\s+/g, '');

const normaliseName = (value: string): string =>
  value.trim().toLowerCase().replace(/\s+/g, ' ');

export const dryerById = (id: string): DryerRecord | undefined =>
  dryers.find((dryer) => dryer.id === id);
export const partById = (id: string): AttachmentPart | undefined =>
  parts.find((part) => part.id === id);

export const dryerLabel = (dryer: DryerRecord): string =>
  dryer.code ? `${dryer.name} ${dryer.code}` : dryer.name;

export const marketLabel = (market: RecordMarket): string =>
  market === 'International' ? 'Manufacturer international' : market;

/** Dryers searchable in a market: its own records plus Parlux international. */
export const dryersForMarket = (market: FinderMarket): readonly DryerRecord[] =>
  dryers.filter((d) => d.market === market || d.market === 'International');

export type MultiStylerHint = {
  readonly label: string;
  readonly path: string;
  readonly fragment?: string;
};

const multiStylerHints: readonly [RegExp, MultiStylerHint][] = [
  [
    /flexstyle|hd4\d\d/,
    {
      label: 'Which diffuser fits my Shark FlexStyle?',
      path: `/guides/${ArticleSlug.SharkFlexstyleDiffuserCompatibility}`,
    },
  ],
  [
    /flexfusion|hd65\d/,
    {
      label: 'Compare multi-styler kits',
      path: '/products',
      fragment: 'compare-multi-styler-kits',
    },
  ],
  [
    /airwrap/,
    {
      label: 'Dyson Airwrap attachment compatibility',
      path: `/guides/${ArticleSlug.DysonAirwrapAttachmentCompatibility}`,
    },
  ],
];

export type DryerSearchResult =
  | { readonly kind: 'empty' }
  | { readonly kind: 'match'; readonly dryer: DryerRecord }
  | { readonly kind: 'choices'; readonly dryers: readonly DryerRecord[] }
  | {
      readonly kind: 'multi-styler';
      readonly hint: MultiStylerHint;
    }
  | {
      readonly kind: 'other-market';
      readonly dryers: readonly DryerRecord[];
    }
  | { readonly kind: 'none' };

/**
 * Exact code or exact verified name selects one dryer. Anything else lists
 * every candidate as a separate choice; nothing is auto-selected.
 */
export function searchDryers(
  market: FinderMarket,
  query: string,
): DryerSearchResult {
  const code = normaliseCode(query);
  if (!code) return { kind: 'empty' };
  const name = normaliseName(query);
  const pool = dryersForMarket(market);
  const exact = pool.filter(
    (d) =>
      (d.code && normaliseCode(d.code) === code) ||
      d.aliases.some((alias) => normaliseName(alias) === name),
  );
  if (exact.length === 1) return { kind: 'match', dryer: exact[0] };
  const candidates = pool.filter((d) =>
    normaliseName(`${d.maker} ${d.name} ${d.code ?? ''} ${d.aliases.join(' ')}`)
      .replace(/[()]/g, '')
      .includes(name),
  );
  const all = [...new Set([...exact, ...candidates])];
  if (all.length > 0) return { kind: 'choices', dryers: all };
  const hint = multiStylerHints.find(([pattern]) => pattern.test(code));
  if (hint) return { kind: 'multi-styler', hint: hint[1] };
  const elsewhere = dryers.filter(
    (d) => d.market !== market && d.code && normaliseCode(d.code) === code,
  );
  if (elsewhere.length) return { kind: 'other-market', dryers: elsewhere };
  return { kind: 'none' };
}

/** Exact part-code lookup across markets; suffixes are never stripped. */
export const findPartByCode = (query: string): AttachmentPart | undefined => {
  const code = normaliseCode(query);
  return code
    ? parts.find((part) => normaliseCode(part.code) === code)
    : undefined;
};

export type KitStatus =
  'listed' | 'role-other-name' | 'not-listed' | 'unconfirmed';

export const kitStatusLabels: Readonly<Record<KitStatus, string>> = {
  listed: 'Listed in this kit',
  'role-other-name': 'Listed in this kit under another name',
  'not-listed': 'Not listed in this kit',
  unconfirmed: 'Box contents unconfirmed',
};

export interface KitResult {
  readonly status: KitStatus;
  readonly text: string;
  readonly source?: GuideSource;
}

export interface FitResult {
  readonly part: AttachmentPart;
  readonly dryer: DryerRecord;
  readonly variant?: DryerVariant;
  readonly status: FitStatus;
  readonly statusLabel: string;
  readonly summary: string;
  readonly record?: FitRecord;
  readonly familyNote?: FamilyNote;
  readonly features: readonly FeatureClaim[];
  readonly kit: KitResult;
  readonly marketNote?: string;
  readonly evidence: readonly GuideSource[];
}

function kitResult(
  dryer: DryerRecord,
  variant: DryerVariant | undefined,
  part: AttachmentPart,
): KitResult {
  const box = variant
    ? kitBoxes.find((b) => b.dryerId === dryer.id && b.variantId === variant.id)
    : undefined;
  if (!box)
    return {
      status: 'unconfirmed',
      text: variant
        ? `We have no box list for the ${variant.label} ${dryerLabel(dryer)}.`
        : dryer.variants?.length
          ? 'Choose the exact kit to see its box list.'
          : 'We have no box list for this dryer.',
    };
  const exactItem = box.items.find((item) => item.partId === part.id);
  if (exactItem)
    return {
      status: 'listed',
      text: `The box lists the ${exactItem.name}.`,
      source: box.source,
    };
  const roleItem = box.items.find((item) => item.type === part.type);
  if (roleItem)
    return {
      status: 'role-other-name',
      text: `The box lists a ${roleItem.name} for this role. The maker doesn’t identify it as ${part.code}.`,
      source: box.source,
    };
  if (!box.complete)
    return {
      status: 'unconfirmed',
      text: 'Maker only confirms some box contents.',
      source: box.source,
    };
  return {
    status: 'not-listed',
    text: `The box lists ${box.items.map((item) => item.name).join(', ')}. None is named as ${part.code}.`,
    source: box.source,
  };
}

export function checkFit(
  dryer: DryerRecord,
  variantId: string | undefined,
  part: AttachmentPart,
): FitResult {
  const variant = dryer.variants?.find((v) => v.id === variantId);
  const record = fitRecords.find(
    (r) =>
      r.partId === part.id &&
      r.dryerId === dryer.id &&
      (!r.variantId || r.variantId === variant?.id),
  );
  const familyNote = record
    ? undefined
    : familyNotes.find(
        (n) => n.partId === part.id && n.dryerIds.includes(dryer.id),
      );
  const features = featureClaims.filter(
    (f) => f.partId === part.id && f.dryerIds.includes(dryer.id),
  );
  const status: FitStatus = record?.status ?? 'unconfirmed';
  const adapter = record?.adapter;
  const statusLabel =
    status === 'fits-with-adapter' && adapter
      ? `Fits with ${adapter}`
      : fitStatusLabels[status];
  let marketNote: string | undefined;
  if (part.market !== dryer.market) {
    marketNote =
      part.market === 'International' || dryer.market === 'International'
        ? 'This is manufacturer international evidence. Check a listing for your country before treating it as a UK or US result.'
        : `${part.code} is a ${part.market} part and this dryer is a ${dryer.market} model. A ${part.market} part list gives no ${dryer.market} fit or box conclusion.`;
  } else if (part.market === 'International') {
    marketNote =
      'This is manufacturer international evidence. Check a listing for your country before treating it as a UK or US result.';
  }
  const who = `${part.name} (${part.code}) on the ${dryerLabel(dryer)}${variant ? `, ${variant.label}` : ''}`;
  const summary =
    status === 'unconfirmed'
      ? `We couldn’t confirm the ${who}. Check the model code and contact the maker before ordering.`
      : status === 'excluded'
        ? `The maker excludes the ${who}.`
        : `The maker lists the ${who}.`;
  const kit = kitResult(dryer, variant, part);
  const evidence = [
    ...(record?.sources ?? [part.source]),
    ...(familyNote ? [familyNote.source] : []),
    ...(kit.source ? [kit.source] : []),
  ].filter((s, i, all) => all.findIndex((o) => o.url === s.url) === i);
  return {
    part,
    dryer,
    variant,
    status,
    statusLabel,
    summary,
    record,
    familyNote,
    features,
    kit,
    marketNote,
    evidence,
  };
}

/** Parts of one type for a dryer: verified fits first, then the rest. */
export function partsByType(
  dryer: DryerRecord,
  variantId: string | undefined,
  type: AttachmentType,
): readonly FitResult[] {
  const rank: Record<FitStatus, number> = {
    fits: 0,
    'fits-with-adapter': 0,
    'fits-check-version': 0,
    excluded: 2,
    unconfirmed: 1,
  };
  return parts
    .filter((part) => part.type === type && part.market === dryer.market)
    .map((part) => checkFit(dryer, variantId, part))
    .filter(
      (result) =>
        result.status !== 'unconfirmed' ||
        result.familyNote !== undefined ||
        result.part.maker === result.dryer.maker,
    )
    .sort((a, b) => rank[a.status] - rank[b.status]);
}

/** Types offered as filters: only those with at least one part on record. */
export const attachmentTypes = (
  Object.keys(attachmentTypeLabels) as AttachmentType[]
).filter((type) => parts.some((part) => part.type === type));

export interface FinderPreset {
  readonly id: string;
  readonly label: string;
  readonly market: FinderMarket;
  readonly dryerId: string;
  readonly variantId?: string;
  readonly partId?: string;
  readonly type?: AttachmentType;
}

/** Allowlisted preset links: /hair-dryer-attachment-finder#preset-<id> */
export const finderPresets: readonly FinderPreset[] = [
  {
    id: 'helios-diffuser',
    label: 'ghd Helios · Diffuser',
    market: 'UK',
    dryerId: 'ghd-helios-uk',
    variantId: 'black-p497',
    partId: 'ghd-p281',
  },
  {
    id: 'hd542uk-diffuser',
    label: 'Shark HD542UK · Diffuser',
    market: 'UK',
    dryerId: 'shark-hd542uk',
    variantId: 'mocha-silver',
    partId: 'shark-xskhd5dmseu',
  },
  {
    id: 'nural-wave-curl',
    label: 'Dyson Supersonic Nural · Wave+Curl',
    market: 'UK',
    dryerId: 'dyson-nural-uk',
    variantId: 'ceramic-patina-topaz',
    partId: 'dyson-973924-01',
  },
  {
    id: 'helios-concentrator',
    label: 'ghd Helios · Concentrator',
    market: 'UK',
    dryerId: 'ghd-helios-uk',
    variantId: 'black-p497',
    type: 'concentrator',
  },
];

/** Shown as sample cards; their outcomes are rendered from the data. */
export const sampleFinderPresetIds = [
  'helios-diffuser',
  'hd542uk-diffuser',
  'nural-wave-curl',
] as const;

export const finderPresetById = (id: string): FinderPreset | undefined =>
  finderPresets.find((preset) => preset.id === id);
