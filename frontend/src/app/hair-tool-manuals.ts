import { ArticleSlug } from './article-slug';

/**
 * Hair Tool Manual Finder records. Every document link below was opened and
 * read on 26 November 2026. Product listings are labelled as such: they are
 * not manuals. Support pages that refused automated checks on that date are
 * listed only as maker support homes in `manualFinderMakers`, never as records.
 */
export type ManualMarket = 'UK' | 'US';
export type ManualMarketChoice = ManualMarket | 'unsure';
export type ManualDocumentType =
  | 'User manual'
  | 'Model family manual'
  | 'Official product page'
  | 'Retailer-provided support';

export interface ManualDocument {
  readonly type: ManualDocumentType;
  readonly url: string;
  readonly pdf?: boolean;
  /** Shown when the document covers a family rather than the exact code. */
  readonly scopeNote?: string;
}

export interface ManualRecord {
  readonly id: string;
  readonly maker: string;
  readonly name: string;
  /** Exact code printed on the label, or a named variant when none is verified. */
  readonly code: string;
  readonly codeKind: 'model code' | 'named variant';
  readonly market: ManualMarket;
  /** Verified alternative spellings only. Compared after normalisation. */
  readonly aliases: readonly string[];
  readonly documents: readonly ManualDocument[];
  readonly checkedDate: string;
  readonly guideSlug?: string;
  readonly guideLabel?: string;
}

const checkedDate = '26 November 2026';

export const manualRecords: readonly ManualRecord[] = [
  {
    id: 'dyson-hd07-uk',
    maker: 'Dyson',
    name: 'Dyson Supersonic hair dryer',
    code: 'HD07',
    codeKind: 'model code',
    market: 'UK',
    aliases: [],
    documents: [
      {
        type: 'User manual',
        url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/dysonsupersonic/hd07/7840012-605C-Manual-Direct.pdf',
        pdf: true,
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.HowToCleanADysonSupersonicFilter,
    guideLabel: 'Clean a Dyson Supersonic filter by model',
  },
  {
    id: 'dyson-hd16-uk',
    maker: 'Dyson',
    name: 'Dyson Supersonic Nural hair dryer',
    code: 'HD16',
    codeKind: 'model code',
    market: 'UK',
    aliases: ['supersonic nural'],
    documents: [
      {
        type: 'User manual',
        url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/dyson-supersonic-nural/HD16_OUG_MASTER.pdf',
        pdf: true,
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.HowToCleanADysonSupersonicFilter,
    guideLabel: 'Clean a Dyson Supersonic filter by model',
  },
  {
    id: 'dyson-airwrap-id-uk',
    maker: 'Dyson',
    name: 'Dyson Airwrap i.d. multi-styler and dryer',
    code: 'Airwrap i.d.',
    codeKind: 'named variant',
    market: 'UK',
    aliases: ['airwrap id', 'airwrap i.d'],
    documents: [
      {
        type: 'User manual',
        url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/dyson-airwrap-multi-styler/N308F_OUG_UK.pdf',
        pdf: true,
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.DysonAirwrapFlashingLights,
    guideLabel: 'Airwrap flashing white or red: what to check',
  },
  {
    id: 'dyson-airwrap-id-us',
    maker: 'Dyson',
    name: 'Dyson Airwrap i.d. multi-styler and dryer',
    code: 'Airwrap i.d.',
    codeKind: 'named variant',
    market: 'US',
    aliases: ['airwrap id', 'airwrap i.d'],
    documents: [
      {
        type: 'User manual',
        url: 'https://www.dyson.com/content/dam/dyson/maintenance/user-guides/en_US/personalcare/dysonairwrapstyler/AirwrapID-User-Manual.pdf',
        pdf: true,
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.DysonAirwrapFlashingLights,
    guideLabel: 'Airwrap flashing white or red: what to check',
  },
  {
    id: 'shark-hd430-us',
    maker: 'Shark',
    name: 'Shark FlexStyle Air Styling & Drying System',
    code: 'HD430',
    codeKind: 'model code',
    market: 'US',
    aliases: [],
    documents: [
      {
        type: 'Official product page',
        url: 'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.SharkFlexstyleDiffuserCompatibility,
    guideLabel: 'Which diffuser fits my Shark FlexStyle?',
  },
  {
    id: 'shark-hd446uk',
    maker: 'Shark',
    name: 'Shark FlexStyle 5-in-1 with Storage Case',
    code: 'HD446UK',
    codeKind: 'model code',
    market: 'UK',
    aliases: [],
    documents: [
      {
        type: 'Official product page',
        url: 'https://www.sharkninja.co.uk/shark-flexstyle-5-in-1-air-styler-hair-dryer-with-storage-case-black-hd446uk/HD446UK.html',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.SharkFlexstyleModelsCompared,
    guideLabel: 'Shark FlexStyle models compared',
  },
  {
    id: 'shark-hd432pkuk',
    maker: 'Shark',
    name: 'Shark FlexStyle Limited Edition Pearl Pink 4-in-1',
    code: 'HD432PKUK',
    codeKind: 'model code',
    market: 'UK',
    aliases: [],
    documents: [
      {
        type: 'Official product page',
        url: 'https://www.sharkninja.co.uk/shark-flexstyle-limited-edition-pearl-pink-4-in-1-air-styler-hair-dryer-gift-set-hd432pkuk/HD432PKUK.html',
        scopeNote:
          'This UK page listed 120 volts on the check date. Read the rating label or ask Shark before relying on it.',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.SharkFlexstyleModelsCompared,
    guideLabel: 'Shark FlexStyle models compared',
  },
  {
    id: 'shark-hd542uk',
    maker: 'Shark',
    name: 'Shark SpeedStyle Pro Flex 4-in-1 High-Velocity Hair Dryer System',
    code: 'HD542UK',
    codeKind: 'model code',
    market: 'UK',
    aliases: [],
    documents: [
      {
        type: 'Official product page',
        url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-4-in-1-high-velocity-hair-dryer-system-hd542uk/HD542UK.html',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.SharkSpeedstyleProVsProFlex,
    guideLabel: 'Shark SpeedStyle Pro vs Pro Flex',
  },
  {
    id: 'remington-d3010-uk',
    maker: 'Remington',
    name: 'Remington Power Dry 2000W Hair Dryer',
    code: 'D3010',
    codeKind: 'model code',
    market: 'UK',
    aliases: [],
    documents: [
      {
        type: 'Official product page',
        url: 'https://uk.remington-europe.com/power-dry-2000w-hair-dryer-d3010-uk',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.BestBudgetHairDryersUk,
    guideLabel: 'Budget hair dryers in the UK',
  },
  {
    id: 'remington-d5216-uk',
    maker: 'Remington',
    name: 'Remington Shine Therapy Hair Dryer',
    code: 'D5216',
    codeKind: 'model code',
    market: 'UK',
    aliases: [],
    documents: [
      {
        type: 'Official product page',
        url: 'https://uk.remington-europe.com/shine-therapy-hair-dryer-d5216-uk',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.BestBudgetHairDryersUk,
    guideLabel: 'Budget hair dryers in the UK',
  },
  {
    id: 'remington-d1500-uk',
    maker: 'Remington',
    name: 'Remington On The Go 2000W Compact Hair Dryer',
    code: 'D1500',
    codeKind: 'model code',
    market: 'UK',
    aliases: [],
    documents: [
      {
        type: 'Official product page',
        url: 'https://uk.remington-europe.com/on-the-go-2000w-compact-hair-dryer-d1500-uk',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.BestBudgetHairDryersUk,
    guideLabel: 'Budget hair dryers in the UK',
  },
  {
    id: 'babyliss-5335ksu-uk',
    maker: 'BaByliss',
    name: 'BaByliss Keratin Shine 2200 Hair Dryer',
    code: '5335KSU',
    codeKind: 'model code',
    market: 'UK',
    aliases: [],
    documents: [
      {
        type: 'Retailer-provided support',
        url: 'https://argos-support.co.uk/6796679-babyliss-keratin-shine-2200-hair-dryer',
        scopeNote: 'Argos support page, not a BaByliss document.',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.HairDryerKeepsShuttingOff,
    guideLabel: 'Why does my hair dryer keep cutting out?',
  },
  {
    id: 'beachwaver-b1-us',
    maker: 'Beachwaver',
    name: 'Beachwaver B1 rotating curling iron, 1-inch',
    code: 'B1',
    codeKind: 'named variant',
    market: 'US',
    aliases: ['beachwaver b1'],
    documents: [
      {
        type: 'Model family manual',
        url: 'https://cdn.shopify.com/s/files/1/0452/5481/files/BSeries_UserGuide_100523.pdf?v=1696534800',
        pdf: true,
        scopeNote:
          'B-Series dual-voltage user guide. Confirm B1 on your label; the guide covers the series.',
      },
      {
        type: 'Official product page',
        url: 'https://beachwaver.com/products/beachwaver-b1',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.BeachwaverB1VsB125,
    guideLabel: 'Beachwaver B1 vs B1.25',
  },
  {
    id: 'beachwaver-b125-us',
    maker: 'Beachwaver',
    name: 'Beachwaver B1.25 rotating curling iron, 1.25-inch',
    code: 'B1.25',
    codeKind: 'named variant',
    market: 'US',
    aliases: ['beachwaver b1.25', 'b125'],
    documents: [
      {
        type: 'Model family manual',
        url: 'https://cdn.shopify.com/s/files/1/0452/5481/files/BSeries_UserGuide_100523.pdf?v=1696534800',
        pdf: true,
        scopeNote:
          'B-Series dual-voltage user guide. Confirm B1.25 on your label; the guide covers the series.',
      },
      {
        type: 'Official product page',
        url: 'https://beachwaver.com/products/beachwaver-b125',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.BeachwaverB1VsB125,
    guideLabel: 'Beachwaver B1 vs B1.25',
  },
  {
    id: 'mermade-25mm-uk',
    maker: 'Mermade Hair',
    name: 'Mermade Hair 25mm Mini Pro Waver, Pink',
    code: '25mm Mini Pro Waver',
    codeKind: 'named variant',
    market: 'UK',
    aliases: ['mermade 25mm', '25mm pro waver'],
    documents: [
      {
        type: 'Official product page',
        url: 'https://mermadehair.co.uk/products/pro-waver-pink-25mm',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.Mermade25mmVs32mmWaver,
    guideLabel: 'Mermade 25 mm vs 32 mm Pro Waver',
  },
  {
    id: 'mermade-32mm-uk',
    maker: 'Mermade Hair',
    name: 'Mermade Hair 32mm Original Pro Waver, Pink',
    code: '32mm Original Pro Waver',
    codeKind: 'named variant',
    market: 'UK',
    aliases: ['mermade 32mm', '32mm pro waver'],
    documents: [
      {
        type: 'Official product page',
        url: 'https://mermadehair.co.uk/products/pro-waver-pink-32mm',
      },
    ],
    checkedDate,
    guideSlug: ArticleSlug.Mermade25mmVs32mmWaver,
    guideLabel: 'Mermade 25 mm vs 32 mm Pro Waver',
  },
];

/** Allowlisted maker support homes, shown when no verified record matches. */
export const manualFinderMakers: readonly {
  readonly maker: string;
  readonly links: readonly { readonly label: string; readonly url: string }[];
}[] = [
  {
    maker: 'Dyson',
    links: [
      { label: 'Dyson UK support', url: 'https://www.dyson.co.uk/support' },
      { label: 'Dyson US support', url: 'https://www.dyson.com/support' },
    ],
  },
  {
    maker: 'Shark',
    links: [
      {
        label: 'SharkNinja UK support',
        url: 'https://support.sharkninja.co.uk/',
      },
      {
        label: 'SharkNinja US support',
        url: 'https://support.sharkninja.com/',
      },
    ],
  },
  {
    maker: 'ghd',
    links: [
      {
        label: 'ghd UK and Ireland help',
        url: 'https://ukie.help.ghdhair.com/hc/en-gb',
      },
    ],
  },
  {
    maker: 'Remington',
    links: [
      {
        label: 'Remington Europe help',
        url: 'https://help.remington-europe.com/hc/en-gb',
      },
    ],
  },
  {
    maker: 'Beachwaver',
    links: [
      {
        label: 'Beachwaver manuals',
        url: 'https://beachwaver.com/pages/manuals',
      },
    ],
  },
];

/** Trim, ignore case and treat spaces, dots and hyphens as insignificant. */
export function normaliseModelCode(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s.\-_/]+/g, '');
}

export type ManualLookupResult =
  | { readonly kind: 'empty' }
  | { readonly kind: 'exact'; readonly records: readonly ManualRecord[] }
  | {
      /** The code exists, but only for another market. */
      readonly kind: 'other-market';
      readonly records: readonly ManualRecord[];
    }
  | {
      /** Market unknown: documented markets for this code, none preselected. */
      readonly kind: 'choose-market';
      readonly records: readonly ManualRecord[];
    }
  | { readonly kind: 'suggestions'; readonly records: readonly ManualRecord[] }
  | { readonly kind: 'none' };

const keys = (record: ManualRecord) =>
  [record.code, ...record.aliases].map(normaliseModelCode);

export function lookupManual(
  market: ManualMarketChoice | undefined,
  input: string,
  records: readonly ManualRecord[] = manualRecords,
): ManualLookupResult {
  const query = normaliseModelCode(input);
  if (!query) return { kind: 'empty' };
  const exact = records.filter((record) => keys(record).includes(query));
  if (exact.length > 0) {
    if (!market || market === 'unsure') {
      const markets = new Set(exact.map((record) => record.market));
      return markets.size === 1
        ? { kind: 'exact', records: exact }
        : { kind: 'choose-market', records: exact };
    }
    const inMarket = exact.filter((record) => record.market === market);
    return inMarket.length > 0
      ? { kind: 'exact', records: inMarket }
      : { kind: 'other-market', records: exact };
  }
  if (query.length < 2) return { kind: 'none' };
  const partial = records.filter(
    (record) =>
      (!market || market === 'unsure' || record.market === market) &&
      keys(record).some((key) => key.includes(query) || query.includes(key)),
  );
  return partial.length > 0
    ? { kind: 'suggestions', records: partial }
    : { kind: 'none' };
}

export const manualRecordsByMaker = [
  ...new Set(manualRecords.map((record) => record.maker)),
].map((maker) => ({
  maker,
  records: manualRecords.filter((record) => record.maker === maker),
}));
