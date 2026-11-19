import { exactModelSources } from './exact-model-guides';
import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';

/** Named manual examples; operating and care permissions stay model-specific. */
export const waveMethodEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = {
  [ArticleSlug.HowToUseAnAutomaticHairCurler]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'The Canadian CD1031C and UK C1900U/C6688U manuals establish separate named operating examples. Loading, preparation and air functions remain model-specific.',
    sources: [
      exactModelSources.S28,
      exactModelSources.S29,
      {
        label: 'Conair Curl Secret CD1031C manual',
        model: 'Conair Curl Secret CD1031C manual',
        url: 'https://www.conaircanada.ca/on/demandware.static/-/Sites-ca-conair-Library/en_CA/dw99e374c4/Instruction%20Booklet/CD1031C%20IB-18039_en.pdf',
        market: 'Canada',
        checkedDate: '2 November 2026',
        scope: "Exact model's loading, release and stop instructions.",
      },
    ],
  },
  [ArticleSlug.HowToCleanAnAutomaticHairCurler]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Canadian CD1031C cover care and UK C6688U filter/inlet access are separate named examples. Their removal and cleaning permissions remain model-specific.',
    sources: [
      exactModelSources.S29,
      {
        label: 'Conair Curl Secret CD1031C manual',
        model: 'Conair Curl Secret CD1031C manual',
        url: 'https://www.conaircanada.ca/on/demandware.static/-/Sites-ca-conair-Library/en_CA/dw99e374c4/Instruction%20Booklet/CD1031C%20IB-18039_en.pdf',
        market: 'Canada',
        checkedDate: '2 November 2026',
        scope:
          'Named cover/chamber maintenance; do not transfer access to another generation.',
      },
    ],
  },
  [ArticleSlug.HairWaverVsCurlingIron]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'UK waver and US clamp-iron manuals document two named actions. The format-selection framework is editorial guidance without measured speed, damage, ease or retention superiority.',
    sources: [
      {
        label: 'BaByliss Deep Waves 2447CU instructions',
        model: 'BaByliss Deep Waves 2447CU instructions',
        url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1766051636652/information-booklets/2447CU_IB.pdf',
        market: 'UK',
        checkedDate: '2 November 2026',
        scope: 'Named pressing and repositioning format.',
      },
      {
        label: 'Conair CD851 instructions',
        model: 'Conair CD851 instructions',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwbfca27c7/Instructional%20Booklets/CD851.pdf',
        market: 'US',
        checkedDate: '2 November 2026',
        scope: 'Named clamp/barrel action; not a wand manual.',
      },
    ],
  },
  [ArticleSlug.HowToUseAHairWaver]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two UK manuals establish named waver sequences and different placement details. Section planning and observation prompts are editorial guidance; no universal contact, temperature or performance result is supplied.',
    sources: [
      {
        label: 'Remington CI91AW UK instructions',
        model: 'Remington CI91AW UK instructions',
        url: 'https://cdn-img.remington-europe.com/manager/remington-europe_com/User%20Manuals/uk/CI91AW_UK_T22-7002203.pdf',
        market: 'UK',
        checkedDate: '2 November 2026',
        scope: 'Separate geometry/heat controls and pressing sequence.',
      },
      {
        label: 'BaByliss Deep Waves 2447CU instructions',
        model: 'BaByliss Deep Waves 2447CU instructions',
        url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1766051636652/information-booklets/2447CU_IB.pdf',
        market: 'UK',
        checkedDate: '2 November 2026',
        scope: 'Its own release and last-wave placement directions.',
      },
    ],
  },
  [ArticleSlug.HairCrimperVsHairWaver]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'International English crimper and UK waver manuals establish two named geometries. The comparison does not measure texture, volume, speed, damage or retention and does not prescribe a universal placement.',
    sources: [
      {
        label: 'Remington S3580 international manual',
        model: 'Remington S3580 international manual',
        url: 'https://cdn-img.remington-europe.com/manager/User%20Manuals/EU/aw18/S3580_INT_IB_T22-7000122.pdf',
        market: 'International (English)',
        checkedDate: '2 November 2026',
        scope: 'Patterned crimping-plate example and its own sequence.',
      },
      {
        label: 'Remington CI91AW UK manual',
        model: 'Remington CI91AW UK manual',
        url: 'https://cdn-img.remington-europe.com/manager/remington-europe_com/User%20Manuals/uk/CI91AW_UK_T22-7002203.pdf',
        market: 'UK',
        checkedDate: '2 November 2026',
        scope: 'Named waver geometry; no finished-pattern measurement adopted.',
      },
    ],
  },
  [ArticleSlug.CurlingIronLeavesCrease]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'A US clamp-iron manual establishes a named mechanism. The mark-location and rehearsal framework is editorial guidance, not a measured explanation of crease causes or a performance comparison.',
    sources: [
      {
        label: 'Conair CD851 clamp-iron guide',
        model: 'Conair CD851 clamp-iron guide',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwbfca27c7/Instructional%20Booklets/CD851.pdf',
        market: 'US',
        checkedDate: '2 November 2026',
        scope:
          'Clamp-iron operating and condition boundaries; not a clipless-wand manual.',
      },
    ],
  },
};
export const waveMethodRelated = {
  [ArticleSlug.HowToUseAnAutomaticHairCurler]: [
    ArticleSlug.AutomaticHairCurlerVsCurlingWand,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.HowToCleanAnAutomaticHairCurler,
  ],
  [ArticleSlug.HowToCleanAnAutomaticHairCurler]: [
    ArticleSlug.HowToUseAnAutomaticHairCurler,
    ArticleSlug.AutomaticHairCurlerVsCurlingWand,
    ArticleSlug.HowToCleanACurlingIronOrWand,
  ],
  [ArticleSlug.HairWaverVsCurlingIron]: [
    ArticleSlug.HowToUseAHairWaver,
    ArticleSlug.HowToUseACurlingIron,
    ArticleSlug.HairCrimperVsHairWaver,
  ],
  [ArticleSlug.HowToUseAHairWaver]: [
    ArticleSlug.HairWaverVsCurlingIron,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.HairCrimperVsHairWaver,
  ],
  [ArticleSlug.HairCrimperVsHairWaver]: [
    ArticleSlug.HowToUseAHairWaver,
    ArticleSlug.HairWaverVsCurlingIron,
    ArticleSlug.CurlingIronBarrelSizeGuide,
  ],
  [ArticleSlug.CurlingIronLeavesCrease]: [
    ArticleSlug.HowToUseACurlingIron,
    ArticleSlug.HowToCleanACurlingIronOrWand,
    ArticleSlug.HairWaverVsCurlingIron,
  ],
} as const;
export const waveMethodCards: Readonly<
  Partial<
    Record<string, { readonly title: string; readonly description: string }>
  >
> = {
  [ArticleSlug.HowToUseAnAutomaticHairCurler]: {
    title: 'How to use an automatic hair curler',
    description:
      'Keep preparation, loading orientation and the exact release cue together.',
  },
  [ArticleSlug.HowToCleanAnAutomaticHairCurler]: {
    title: 'How to clean an automatic hair curler',
    description:
      'Separate chamber, cover and electrical-body care before choosing an action.',
  },
  [ArticleSlug.HairWaverVsCurlingIron]: {
    title: 'Hair waver vs curling iron',
    description:
      'Compare a repeated press pattern with shaping around a clamp barrel.',
  },
  [ArticleSlug.HowToUseAHairWaver]: {
    title: 'How to use a hair waver',
    description:
      "Place, press, open and reposition using the exact model's pattern instructions.",
  },
  [ArticleSlug.HairCrimperVsHairWaver]: {
    title: 'Hair crimper vs hair waver',
    description:
      'Inspect contact geometry and the intended pattern before comparing size labels.',
  },
  [ArticleSlug.CurlingIronLeavesCrease]: {
    title: 'Why does a curling iron leave a crease?',
    description:
      'Locate the mark and review placement, release and tool condition before another pass.',
  },
};
export const waveMethodSlugs: readonly ArticleSlug[] = [
  ArticleSlug.HowToUseAnAutomaticHairCurler,
  ArticleSlug.HowToCleanAnAutomaticHairCurler,
  ArticleSlug.HairWaverVsCurlingIron,
  ArticleSlug.HowToUseAHairWaver,
  ArticleSlug.HairCrimperVsHairWaver,
  ArticleSlug.CurlingIronLeavesCrease,
];
export const waveMethodIncoming: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HowToUseAnAutomaticHairCurler]: [
    ArticleSlug.AutomaticHairCurlerVsCurlingWand,
    ArticleSlug.BestCurlingIrons,
    ArticleSlug.HowToUseACurlingWand,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.StylingToolTroubleshooting,
  ],
  [ArticleSlug.HowToCleanAnAutomaticHairCurler]: [
    ArticleSlug.HowToCleanACurlingIronOrWand,
    ArticleSlug.AutomaticHairCurlerVsCurlingWand,
    ArticleSlug.StylingToolTroubleshooting,
  ],
  [ArticleSlug.HairWaverVsCurlingIron]: [
    ArticleSlug.BestCurlingIrons,
    ArticleSlug.CurlingIronVsWand,
    ArticleSlug.WhyCurlsFallOut,
    ArticleSlug.BestCurlingToolsShortHair,
    ArticleSlug.CurlingIronLeavesCrease,
  ],
  [ArticleSlug.HowToUseAHairWaver]: [
    ArticleSlug.HowToUseACurlingIron,
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.HowToBrushOutCurls,
    ArticleSlug.WhyCurlsFallOut,
    ArticleSlug.BestCurlingToolsLongHair,
    ArticleSlug.StylingToolTroubleshooting,
  ],
  [ArticleSlug.HairCrimperVsHairWaver]: [
    ArticleSlug.BestCurlingIrons,
    ArticleSlug.CurlingIronBarrelSizeGuide,
  ],
};
