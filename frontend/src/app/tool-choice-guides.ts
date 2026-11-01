import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';

/** Exact-model source scope for current tool choices; no performance testing. */
export const toolChoiceEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = {
  [ArticleSlug.GhdSculptVsChronos]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two exact UK maker listings establish the compared width labels and control descriptions. No heat-stability, styling-speed, damage or handling result was independently measured.',
    sources: [
      {
        label: 'ghd Sculpt black, UK',
        model: 'ghd Sculpt black, UK',
        url: 'https://www.ghdhair.com/hair-straighteners/ghd-sculpt-hair-styler-black-p-777',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Named adaptive-control description and 26 mm label.',
      },
      {
        label: 'ghd standard Chronos black, UK',
        model: 'ghd standard Chronos black, UK',
        url: 'https://www.ghdhair.com/hair-straighteners/ghd-chronos-black-styler-p-650',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Named preset and 26 mm label; not Max.',
      },
    ],
  },
  [ArticleSlug.DysonCorraleCoolshineVsCorrale]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Exact UK product listings and original Corrale support establish power, control and attachment distinctions. No independent performance, weight, comfort or travel-permission comparison was performed.',
    sources: [
      {
        label: 'Corrale CoolShine Ceramic pink, UK',
        model: 'Corrale CoolShine Ceramic pink, UK',
        url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/corrale-coolshine/ceramic-pink',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope:
          'Corded operation, selected controls, dry-use boundary and removable cooling feature.',
      },
      {
        label: 'Original Corrale blue/copper, UK',
        model: 'Original Corrale blue/copper, UK',
        url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/corrale/blue-copper',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Original rechargeable model and three-setting interface.',
      },
      {
        label: 'Original Corrale UK support',
        model: 'Original Corrale UK support',
        url: 'https://www.dyson.co.uk/support/hair-care/hair-straighteners/corrale',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Attached-cable hybrid operation still uses the battery.',
      },
    ],
  },
  [ArticleSlug.DysonAirsmoothVsGhdDuetBlowdry]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two exact UK listings establish the brush designs and described systems. No speed, temperature-equivalence, noise, snagging or damage comparison was independently measured.',
    sources: [
      {
        label: 'Dyson standalone Airsmooth Ceramic pink/Rose gold, UK',
        model: 'Dyson standalone Airsmooth Ceramic pink/Rose gold, UK',
        url: 'https://www.dyson.co.uk/hair-care/hot-brushes/airsmooth/ceramic-pink',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Fixed head and named airflow/bristle description.',
      },
      {
        label: 'ghd Duet Blowdry black, UK',
        model: 'ghd Duet Blowdry black, UK',
        url: 'https://www.ghdhair.com/wet-to-dry/ghd-duet-blowdry-hair-dryer-brush-in-black-p-663',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Elliptical heated barrel/bristles and airflow; not Duet Style.',
      },
    ],
  },
  [ArticleSlug.SharkGlamVsFlexstyle]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Exact UK product pages establish the selected contents, while the maker comparison explains the powered-part boundary. No drying-speed, retention, weight or damage test was performed by Comb Report.',
    sources: [
      {
        label: 'Shark Glam HD6052SUK, UK',
        model: 'Shark Glam HD6052SUK, UK',
        url: 'https://www.sharkninja.co.uk/shark-glam-ceramic-air-styling-and-drying-system-with-diffuser-hd6052suk/HD6052SUK.html',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Selected gold box and named tools.',
      },
      {
        label: 'Shark FlexStyle HD446UK, UK',
        model: 'Shark FlexStyle HD446UK, UK',
        url: 'https://www.sharkninja.co.uk/shark-flexstyle-5-in-1-air-styler-hair-dryer-with-storage-case-black-hd446uk/HD446UK.html',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Selected black box, including diffuser.',
      },
      {
        label: 'Shark UK: Glam and FlexStyle comparison',
        model: 'Shark UK: Glam and FlexStyle comparison',
        url: 'https://www.sharkninja.co.uk/blog/compare-flexstyle-vs-glam.html',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope:
          'Powered ceramic tools and their FlexStyle incompatibility; no wider fit claim adopted.',
      },
    ],
  },
  [ArticleSlug.AutomaticHairCurlerVsCurlingWand]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two named North American maker manuals establish different wrapping and release systems. The selection framework is editorial guidance without a measured ease, retention, tangle-rate or safety comparison.',
    sources: [
      {
        label: 'Conair Curl Secret CD1031C manual',
        model: 'Conair Curl Secret CD1031C manual',
        url: 'https://www.conaircanada.ca/on/demandware.static/-/Sites-ca-conair-Library/en_CA/dw99e374c4/Instruction%20Booklet/CD1031C%20IB-18039_en.pdf',
        market: 'Canada',
        checkedDate: '1 November 2026',
        scope:
          'Named chamber-loading, motor-wrap, release and tangle-response example.',
      },
      {
        label: 'Conair CD705/CD706 wand guide',
        model: 'Conair CD705/CD706 wand guide',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw4e1e1319/Instructional%20Booklets/CD706.pdf',
        market: 'US',
        checkedDate: '1 November 2026',
        scope:
          'Named hand-wrapped wand and model-specific protection/release example.',
      },
    ],
  },
  [ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Three exact UK listings illustrate the distinction between user choice and claimed regulation. This guide does not measure accuracy, heat exposure, hair damage or personal suitability.',
    sources: [
      {
        label: 'ghd standard Chronos black, UK',
        model: 'ghd standard Chronos black, UK',
        url: 'https://www.ghdhair.com/hair-straighteners/ghd-chronos-black-styler-p-650',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Preset and named regulation example.',
      },
      {
        label: 'ghd Sculpt black, UK',
        model: 'ghd Sculpt black, UK',
        url: 'https://www.ghdhair.com/hair-straighteners/ghd-sculpt-hair-styler-black-p-777',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Adaptive description; no inferred dial or fixed Sculpt value.',
      },
      {
        label: 'Original Corrale blue/copper, UK',
        model: 'Original Corrale blue/copper, UK',
        url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/corrale/blue-copper',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope: 'Three-setting original-generation example.',
      },
    ],
  },
};
export const toolChoiceRelated = {
  [ArticleSlug.GhdSculptVsChronos]: [
    ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners,
    ArticleSlug.GhdChronosVsPlatinumPlus,
    ArticleSlug.FlatIronPlateWidthGuide,
  ],
  [ArticleSlug.DysonCorraleCoolshineVsCorrale]: [
    ArticleSlug.CordedVsCordlessHairStraighteners,
    ArticleSlug.BestTravelFlatIrons,
    ArticleSlug.DysonAirstraitVsGhdDuetStyle,
  ],
  [ArticleSlug.DysonAirsmoothVsGhdDuetBlowdry]: [
    ArticleSlug.ThermalBrushVsHotAirBrush,
    ArticleSlug.HotAirBrushVsHairDryerAndRoundBrush,
    ArticleSlug.HowToCleanHotAirBrush,
  ],
  [ArticleSlug.SharkGlamVsFlexstyle]: [
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.DysonAirwrapVsSharkFlexstyle,
    ArticleSlug.BestHotAirBrushes,
  ],
  [ArticleSlug.AutomaticHairCurlerVsCurlingWand]: [
    ArticleSlug.CurlingIronVsWand,
    ArticleSlug.HowToUseACurlingWand,
    ArticleSlug.HowToBrushOutCurls,
  ],
  [ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners]: [
    ArticleSlug.GhdSculptVsChronos,
    ArticleSlug.DysonCorraleCoolshineVsCorrale,
    ArticleSlug.FlatIronPlateWidthGuide,
  ],
} as const;
export const toolChoiceCards: Readonly<
  Partial<
    Record<string, { readonly title: string; readonly description: string }>
  >
> = {
  [ArticleSlug.GhdSculptVsChronos]: {
    title: 'ghd Sculpt vs Chronos',
    description:
      'Compare the exact UK standard-width models by their documented control approach.',
  },
  [ArticleSlug.DysonCorraleCoolshineVsCorrale]: {
    title: 'Corrale CoolShine vs original Corrale',
    description:
      'Separate corded operation, charging and the removable cooling feature.',
  },
  [ArticleSlug.DysonAirsmoothVsGhdDuetBlowdry]: {
    title: 'Dyson Airsmooth vs ghd Duet Blowdry',
    description:
      'Compare two standalone UK brush appliances by head path and described heat system.',
  },
  [ArticleSlug.SharkGlamVsFlexstyle]: {
    title: 'Shark Glam vs FlexStyle',
    description:
      'Check the selected UK boxes and the powered ceramic attachment boundary.',
  },
  [ArticleSlug.AutomaticHairCurlerVsCurlingWand]: {
    title: 'Automatic hair curler vs curling wand',
    description:
      'Compare motor wrapping with a hand-guided wand before choosing the loading sequence.',
  },
  [ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners]: {
    title: 'Fixed, selectable and adaptive straightener controls',
    description:
      'Separate the setting you choose from the regulation the appliance performs internally.',
  },
};

export const toolChoiceSlugs: readonly ArticleSlug[] = [
  ArticleSlug.GhdSculptVsChronos,
  ArticleSlug.DysonCorraleCoolshineVsCorrale,
  ArticleSlug.DysonAirsmoothVsGhdDuetBlowdry,
  ArticleSlug.SharkGlamVsFlexstyle,
  ArticleSlug.AutomaticHairCurlerVsCurlingWand,
  ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners,
];
export const toolChoiceIncoming: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.GhdSculptVsChronos]: [
    ArticleSlug.BestFlatIrons,
    ArticleSlug.GhdChronosVsPlatinumPlus,
    ArticleSlug.GhdChronosVsChronosMax,
    ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners,
  ],
  [ArticleSlug.DysonCorraleCoolshineVsCorrale]: [
    ArticleSlug.BestFlatIrons,
    ArticleSlug.CordedVsCordlessHairStraighteners,
    ArticleSlug.BestTravelFlatIrons,
    ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners,
  ],
  [ArticleSlug.DysonAirsmoothVsGhdDuetBlowdry]: [
    ArticleSlug.BestHotAirBrushes,
    ArticleSlug.ThermalBrushVsHotAirBrush,
    ArticleSlug.HowToCleanHotAirBrush,
  ],
  [ArticleSlug.SharkGlamVsFlexstyle]: [
    ArticleSlug.BestHotAirBrushes,
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.DysonAirwrapVsSharkFlexstyle,
  ],
  [ArticleSlug.AutomaticHairCurlerVsCurlingWand]: [
    ArticleSlug.CurlingIronVsWand,
    ArticleSlug.BestCurlingIrons,
  ],
};
