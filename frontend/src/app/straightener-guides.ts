import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';

const checkedDate = '4 November 2026';

export const straightenerGuideEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = /* @__PURE__ */ (() => ({
  [ArticleSlug.SteamHairStraightenerVsFlatIron]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named manufacturer records establish construction and a preparation boundary. The selection checks are editorial; no comparative styling, damage or wear-time testing was performed.',
    sources: [
      {
        label: 'SteamPod 4 UK listing',
        model: 'SteamPod 4',
        market: 'UK',
        url: 'https://www.lorealprofessionnel.co.uk/all-products/hair-tools/steampod-4',
        checkedDate,
        scope: 'Named steam/plate construction.',
      },
      {
        label: 'SteamPod 4 LP74 IFU',
        model: 'SteamPod 4 LP74',
        market: 'international LP74 English section',
        url: 'https://dam.groupeseb.com/m/c159b54c21bcf6da/original/1820008740-IFU.pdf',
        checkedDate,
        scope: 'Dry-hair preparation, not wet-to-dry permission.',
      },
      {
        label: 'Original Chronos safety guide',
        model: 'Original ghd Chronos',
        market: 'multilingual guide, English section',
        url: 'https://media.ghdhair.com/images/content/SafetyGuideChronos_FR.pdf',
        checkedDate,
        scope: 'Named dry-use plate example.',
      },
    ],
  },
  [ArticleSlug.HowToUseASteamHairStraightener]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'The operation example is SteamPod 4 LP74. The organisation checks are editorial and do not transfer LP74 permissions to another steam tool or establish styling speed or protection.',
    sources: [
      {
        label: 'SteamPod 4 model support',
        model: 'SteamPod 4 LP7400 / LP7400F1',
        market: 'international support',
        url: 'https://www.rowenta.com/instructions-for-use/csp/1830008757',
        checkedDate,
        scope: 'LP7400 / LP7400F1 identity.',
      },
      {
        label: 'LP74 instructions',
        model: 'SteamPod 4 LP74',
        market: 'English section',
        url: 'https://dam.groupeseb.com/m/c159b54c21bcf6da/original/1820008740-IFU.pdf',
        checkedDate,
        scope:
          'Preparation, water, fitted parts, orientation and service boundaries.',
      },
      {
        label: 'SteamPod 4 UK FAQ',
        model: 'SteamPod 4',
        market: 'UK',
        url: 'https://www.lorealprofessionnel.co.uk/hair-styling-advice/how-to-use-steampod-4',
        checkedDate,
        scope: 'Off/cool comb changes.',
      },
    ],
  },
  [ArticleSlug.HowToCleanASteamHairStraightener]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'SteamPod 4 supplies a named removable-comb and accessible-outlet example. The broader care map is editorial, without a universal descaling, washing or repair procedure.',
    sources: [
      {
        label: 'SteamPod 4 UK FAQ',
        model: 'SteamPod 4',
        market: 'UK',
        url: 'https://www.lorealprofessionnel.co.uk/hair-styling-advice/how-to-use-steampod-4',
        checkedDate,
        scope: 'Named comb and outlet care.',
      },
      {
        label: 'LP74 instructions',
        model: 'SteamPod 4 LP74',
        market: 'English section',
        url: 'https://dam.groupeseb.com/m/c159b54c21bcf6da/original/1820008740-IFU.pdf',
        checkedDate,
        scope: 'Water, disconnection, no-immersion and service boundaries.',
      },
    ],
  },
  [ArticleSlug.WetToDryHairStraightenerVsFlatIron]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named UK records establish contrasting mechanisms and a mode boundary. The routine comparison is editorial; no speed, damage, comfort or finish ranking is supplied.',
    sources: [
      {
        label: 'Airstrait Plum/Copper UK listing',
        model: 'Dyson Airstrait Plum/Copper',
        market: 'UK',
        url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/airstrait/plum-copper',
        checkedDate,
        scope: 'Current named airflow construction.',
      },
      {
        label: 'What is Duet Style?',
        model: 'ghd Duet Style',
        market: 'UK',
        url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/11212007740178-WHAT-IS-GHD-DUET-STYLE',
        checkedDate,
        scope: 'Airflow/plate construction.',
      },
      {
        label: 'Duet Style modes',
        model: 'ghd Duet Style',
        market: 'UK',
        url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/11212010617490-WHAT-ARE-THE-STYLING-MODES-ON-THE-GHD-DUET-STYLE',
        checkedDate,
        scope: 'Separate dry-only Shine Shot.',
      },
    ],
  },
  [ArticleSlug.HowToUseAWetToDryHairStraightener]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'The named Duet Style sequence and current UK Airstrait identity illustrate instruction matching and mode boundaries. There is no universal recommendation for heat, pass count or drying time.',
    sources: [
      {
        label: 'Duet Style guide',
        model: 'ghd Duet Style',
        market: 'ROW multilingual guide, English section',
        url: 'https://media.ghdhair.com/images/content/DUETSTYLE_ROW_SG_Copy_Doc_v1_DE.pdf',
        checkedDate,
        scope: 'Named preparation, mode transition and handling boundaries.',
      },
      {
        label: 'Duet Style modes',
        model: 'ghd Duet Style',
        market: 'UK',
        url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/11212010617490-WHAT-ARE-THE-STYLING-MODES-ON-THE-GHD-DUET-STYLE',
        checkedDate,
        scope: 'Dry-only Shine Shot.',
      },
      {
        label: 'Airstrait Plum/Copper UK listing',
        model: 'Dyson Airstrait Plum/Copper',
        market: 'UK',
        url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/airstrait/plum-copper',
        checkedDate,
        scope:
          'Current integrated-comb identity and Dry refresh, not borrowed older controls.',
      },
    ],
  },
  [ArticleSlug.HowToCleanAWetToDryHairStraightener]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Current UK support supplies distinct Duet Style and Airstrait care references. The care map is editorial and deliberately avoids merging revisions or inventing a universal filter-washing procedure.',
    sources: [
      {
        label: 'Duet Style care support',
        model: 'ghd Duet Style',
        market: 'UK',
        url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/11211966811026-HOW-DO-I-CLEAN-MY-GHD-DUET-STYLE',
        checkedDate,
        scope: 'Named exterior and rear-filter care.',
      },
      {
        label: 'Duet Style guide',
        model: 'ghd Duet Style',
        market: 'ROW multilingual guide, English section',
        url: 'https://media.ghdhair.com/images/content/DUETSTYLE_ROW_SG_Copy_Doc_v1_DE.pdf',
        checkedDate,
        scope: 'Shutdown, cooling and no-immersion boundaries.',
      },
      {
        label: 'Airstrait Plum/Copper UK listing',
        model: 'Dyson Airstrait Plum/Copper',
        market: 'UK',
        url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/airstrait/plum-copper',
        checkedDate,
        scope:
          'Current filter FAQ and exact-appliance support handoff, without an older soak sequence.',
      },
    ],
  },
  [ArticleSlug.HowToUseAFlatIron]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'A named dry-use safety guide and US Max tutorial support preparation and movement examples. The observation sequence is editorial, without a universal setting, pass count or measured protection claim.',
    sources: [
      {
        label: 'Original Chronos safety guide',
        model: 'Original ghd Chronos',
        market: 'multilingual guide, English section',
        url: 'https://media.ghdhair.com/images/content/SafetyGuideChronos_FR.pdf',
        checkedDate,
        scope: 'Named dry-use preparation and shutdown boundaries.',
      },
      {
        label: 'ghd Max straightening tutorial',
        model: 'ghd Max',
        market: 'US',
        url: 'https://www.ghdhair.com/us/hairstyles/best-straight-hairstyles/how-to-straighten-long-textured-hair',
        checkedDate,
        scope:
          'Named sectioning and moving-pass example, not universal measurements or outcome evidence.',
      },
    ],
  },
}))();

export const straightenerGuideRelated = {
  [ArticleSlug.SteamHairStraightenerVsFlatIron]: [
    ArticleSlug.HowToUseASteamHairStraightener,
    ArticleSlug.WetToDryHairStraightenerVsFlatIron,
    ArticleSlug.BestFlatIrons,
  ],
  [ArticleSlug.HowToUseASteamHairStraightener]: [
    ArticleSlug.SteamHairStraightenerVsFlatIron,
    ArticleSlug.HowToCleanASteamHairStraightener,
    ArticleSlug.HowToSectionHairForStyling,
  ],
  [ArticleSlug.HowToCleanASteamHairStraightener]: [
    ArticleSlug.HowToUseASteamHairStraightener,
    ArticleSlug.HowToCleanHairStraightenerPlates,
    ArticleSlug.HowToCleanAWetToDryHairStraightener,
  ],
  [ArticleSlug.WetToDryHairStraightenerVsFlatIron]: [
    ArticleSlug.DysonAirstraitVsGhdDuetStyle,
    ArticleSlug.HowToUseAWetToDryHairStraightener,
    ArticleSlug.SteamHairStraightenerVsFlatIron,
  ],
  [ArticleSlug.HowToUseAWetToDryHairStraightener]: [
    ArticleSlug.WetToDryHairStraightenerVsFlatIron,
    ArticleSlug.DysonAirstraitVsGhdDuetStyle,
    ArticleSlug.HowToCleanAWetToDryHairStraightener,
  ],
  [ArticleSlug.HowToCleanAWetToDryHairStraightener]: [
    ArticleSlug.HowToUseAWetToDryHairStraightener,
    ArticleSlug.HowToCleanHairStraightenerPlates,
    ArticleSlug.HowToCleanASteamHairStraightener,
  ],
  [ArticleSlug.HowToUseAFlatIron]: [
    ArticleSlug.FlatIronPlateWidthGuide,
    ArticleSlug.FlatIronSnaggingHair,
    ArticleSlug.HowToCleanHairStraightenerPlates,
  ],
} as const;

export const straightenerGuideCards: Readonly<
  Partial<
    Record<string, { readonly title?: string; readonly description: string }>
  >
> = {
  [ArticleSlug.SteamHairStraightenerVsFlatIron]: {
    description:
      'Decide whether a reservoir-fed steam plate tool changes a useful part of a dry-hair routine.',
  },
  [ArticleSlug.HowToUseASteamHairStraightener]: {
    description:
      'Prepare and organise a steam-straightening session using the exact model instructions.',
  },
  [ArticleSlug.HowToCleanASteamHairStraightener]: {
    description:
      'Separate contact-surface care, removable comb care and a reservoir/service question.',
  },
  [ArticleSlug.WetToDryHairStraightenerVsFlatIron]: {
    description:
      'Choose combined drying/straightening or a separate dry-use finishing step.',
  },
  [ArticleSlug.HowToUseAWetToDryHairStraightener]: {
    description:
      'Keep preparation, drying mode and optional dry refresh in the correct order.',
  },
  [ArticleSlug.HowToCleanAWetToDryHairStraightener]: {
    description:
      'Identify which contact surfaces, air paths and removable parts may be cleaned.',
  },
};
