import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';
export const consolidatedComparisonSlugs = [
  ArticleSlug.GhdMaxVsChronosMax,
  ArticleSlug.DenmanD3VsD31,
  ArticleSlug.TangleTeezerUltimateDetanglerVsUltimateStyler,
  ArticleSlug.GhdDuetStyleVsDuetBlowdry,
  ArticleSlug.SharkSpeedstyleProVsProFlex,
  ArticleSlug.T3Aire360NextGenVsDysonAirwrapId,
  ArticleSlug.BabylissAirWandAs6550uVsAs6553u,
  ArticleSlug.ColorWowDreamCoatOriginalVsExtraStrengthVsCurly,
  ArticleSlug.MoroccanoilTreatmentOriginalVsLight,
  ArticleSlug.FramarGatorGripsVsSuperSectioners,
  ArticleSlug.ConairHs400VsHs79crHotRollers,
  ArticleSlug.SharkSilkiproStraightVsDysonAirstrait,
] as const;
export const consolidatedComparisonRelated: Readonly<
  Record<string, readonly string[]>
> = {
  [ArticleSlug.GhdMaxVsChronosMax]: [
    ArticleSlug.FlatIronPlateWidthGuide,
    ArticleSlug.GhdChronosVsChronosMax,
  ],
  [ArticleSlug.DenmanD3VsD31]: [
    ArticleSlug.DenmanD3VsD4,
    ArticleSlug.BestBrushesCurlyHair,
  ],
  [ArticleSlug.TangleTeezerUltimateDetanglerVsUltimateStyler]: [
    ArticleSlug.BestDetanglingBrushes,
    ArticleSlug.TangleTeezerUltimateDetanglerVsFineFragile,
  ],
  [ArticleSlug.GhdDuetStyleVsDuetBlowdry]: [
    ArticleSlug.DysonAirstraitVsGhdDuetStyle,
    ArticleSlug.DysonAirsmoothVsGhdDuetBlowdry,
  ],
  [ArticleSlug.SharkSpeedstyleProVsProFlex]: [
    ArticleSlug.HairDryerChooser,
    ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
  ],
  [ArticleSlug.T3Aire360NextGenVsDysonAirwrapId]: [
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.DysonAirwrapIdVsCoAnda2x,
  ],
  [ArticleSlug.BabylissAirWandAs6550uVsAs6553u]: [
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume,
  ],
  [ArticleSlug.ColorWowDreamCoatOriginalVsExtraStrengthVsCurly]: [
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HowToApplyHairSerumOrOil,
  ],
  [ArticleSlug.MoroccanoilTreatmentOriginalVsLight]: [
    ArticleSlug.HairSerumVsHairOil,
    ArticleSlug.HowToApplyHairSerumOrOil,
  ],
  [ArticleSlug.FramarGatorGripsVsSuperSectioners]: [
    ArticleSlug.HowToChooseHairSectioningClips,
    ArticleSlug.CreaselessClipsVsSectioningClips,
  ],
  [ArticleSlug.ConairHs400VsHs79crHotRollers]: [
    ArticleSlug.HairRollerSizeGuide,
    ArticleSlug.HowToUseHeatedHairRollers,
  ],
  [ArticleSlug.SharkSilkiproStraightVsDysonAirstrait]: [
    ArticleSlug.WetToDryHairStraightenerVsFlatIron,
    ArticleSlug.DysonAirstraitVsGhdDuetStyle,
  ],
};
export const consolidatedComparisonEvidence: Readonly<
  Record<string, GuideEvidence>
> = /* @__PURE__ */ (() => ({
  [ArticleSlug.GhdMaxVsChronosMax]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'ghd Max UK black',
        model: 'ghd Max UK black',
        market: 'GB',
        url: 'https://www.ghdhair.com/hair-straighteners/ghd-max-p-535',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'ghd Chronos Max UK black',
        model: 'ghd Chronos Max UK black',
        market: 'GB',
        url: 'https://www.ghdhair.com/hair-straighteners/ghd-chronos-max-black-styler-p-689',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.DenmanD3VsD31]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'Denman D3 UK',
        model: 'Denman D3 UK',
        market: 'GB',
        url: 'https://denmanbrush.com/products/d3-original-styler-7-row',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'Denman D31 UK',
        model: 'Denman D31 UK',
        market: 'GB',
        url: 'https://denmanbrush.com/products/d31-freeflow-styler-7-row',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'Denman pin-layout explanation',
        model: 'Denman pin-layout explanation',
        market: 'GB',
        url: 'https://denmanbrush.com/blogs/news/here-come-the-curls',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.TangleTeezerUltimateDetanglerVsUltimateStyler]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'US Ultimate Detangler',
        model: 'US Ultimate Detangler',
        market: 'US',
        url: 'https://us.tangleteezer.com/products/the-ultimate-detangler',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'US Ultimate Styler',
        model: 'US Ultimate Styler',
        market: 'US',
        url: 'https://us.tangleteezer.com/products/the-ultimate-styler',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.GhdDuetStyleVsDuetBlowdry]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'UK ghd Duet comparison',
        model: 'UK ghd Duet comparison',
        market: 'GB',
        url: 'https://www.ghdhair.com/wet-to-dry/compare',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'Duet Style operating guide',
        model: 'Duet Style operating guide',
        market: 'GB',
        url: 'https://media.ghdhair.com/images/content/DuetStyle_SafetyGuide_2023_UK.pdf',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.SharkSpeedstyleProVsProFlex]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'UK HD700UK-BYO',
        model: 'UK HD700UK-BYO',
        market: 'GB',
        url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-build-your-own-hair-dryer-system/HD700UK-BYO.html',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK HD500UK-BYO',
        model: 'UK HD500UK-BYO',
        market: 'GB',
        url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-build-your-own-hair-dryer-system/HD500UK-BYO.html',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK Pro Flex polisher',
        model: 'UK Pro Flex polisher',
        market: 'GB',
        url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-polisher/XSKHD5PFMSEU.html',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK original polisher',
        model: 'UK original polisher',
        market: 'GB',
        url: 'https://www.sharkninja.co.uk/shark-speedstyle-polisher/XSKHD3PFAEUK.html',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.T3Aire360NextGenVsDysonAirwrapId]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'UK T3 Aire 360 2.0',
        model: 'UK T3 Aire 360 2.0',
        market: 'GB',
        url: 'https://t3micro.co.uk/products/aire-360-2-0',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK Airwrap i.d. selected box',
        model: 'UK Airwrap i.d. selected box',
        market: 'GB',
        url: 'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-id/straight-wavy-vinca-blue-topaz',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'US Next-Gen diffuser restriction',
        model: 'US Next-Gen diffuser restriction',
        market: 'US',
        url: 'https://t3micro.com/collections/pos-hair-dryers/products/aire360-dual-voltage-diffuser',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.BabylissAirWandAs6550uVsAs6553u]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'UK AS6550U',
        model: 'UK AS6550U',
        market: 'GB',
        url: 'https://www.babyliss.com/uk-en/air-wand-AS6550U.html',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK AS6553U',
        model: 'UK AS6553U',
        market: 'GB',
        url: 'https://www.babyliss.com/uk-en/air-wand-with-smoothing-brush-AS6553U.html',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK Air Wand accessories',
        model: 'UK Air Wand accessories',
        market: 'GB',
        url: 'https://www.babyliss.com/uk-en/air-collection/air-wand/accessories/',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'AS6550U instructions',
        model: 'AS6550U instructions',
        market: 'GB',
        url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1770307469494/information-booklets/AS6550U_IB.pdf',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.ColorWowDreamCoatOriginalVsExtraStrengthVsCurly]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'UK Dream Coat Original',
        model: 'UK Dream Coat Original',
        market: 'GB',
        url: 'https://uk.colorwowhair.com/products/dream-coat-anti-frizz-treatment',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK Extra Strength Dream Coat',
        model: 'UK Extra Strength Dream Coat',
        market: 'GB',
        url: 'https://uk.colorwowhair.com/products/extra-strength-dream-coat',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK Dream Coat for Curly Hair',
        model: 'UK Dream Coat for Curly Hair',
        market: 'GB',
        url: 'https://uk.colorwowhair.com/products/dream-coat-curly-hair',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: "Maker's Dream Coat directions FAQ",
        model: "Maker's Dream Coat directions FAQ",
        market: 'GB',
        url: 'https://uk.colorwowhair.com/blogs/all/frizzy-hair-how-to-use-dream-coat',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.MoroccanoilTreatmentOriginalVsLight]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'UK Moroccanoil Treatment Original',
        model: 'UK Moroccanoil Treatment Original',
        market: 'GB',
        url: 'https://uk.moroccanoil.com/products/moroccanoil-treatment-original',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK Moroccanoil Treatment Light',
        model: 'UK Moroccanoil Treatment Light',
        market: 'GB',
        url: 'https://uk.moroccanoil.com/products/moroccanoil-treatment-light',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.FramarGatorGripsVsSuperSectioners]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'Framar international clip FAQ',
        model: 'Framar international clip FAQ',
        market: 'International',
        url: 'https://int.framar.com/pages/faq',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'Framar clip collection',
        model: 'Framar clip collection',
        market: 'US',
        url: 'https://framar.com/collections/clips',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.ConairHs400VsHs79crHotRollers]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'US Conair HS400',
        model: 'US Conair HS400',
        market: 'US',
        url: 'https://www.conair.com/ceramic-flocked-hot-rollers/HS400.html',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'US Conair HS79CR',
        model: 'US Conair HS79CR',
        market: 'US',
        url: 'https://www.conair.com/8-piece-color-changing-hot-rollers/HS79CR.html?lang=en_US',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'Conair HS400 booklet',
        model: 'Conair HS400 booklet',
        market: 'US',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw33ed3d86/Instructional%20Booklets/HS400.pdf',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'Booklet linked as HS79CR, labelled HS79',
        model: 'Booklet linked as HS79CR, labelled HS79',
        market: 'US',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwd2206057/Instructional%20Booklets/HS79CR.pdf',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
  [ArticleSlug.SharkSilkiproStraightVsDysonAirstrait]: {
    summary:
      'Manufacturer specifications and directions establish the stated product scope. Handling choices are editorial and measured comparative outcomes remain unknown.',
    sources: [
      {
        label: 'UK HT401UKBL1',
        model: 'UK HT401UKBL1',
        market: 'GB',
        url: 'https://www.sharkninja.co.uk/shark-silkipro-straight-hair-straightener-dryer-in-one-tool-with-heat-resistant-storage-case/HT401UKBL1.html',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'UK Airstrait Plum/Copper',
        model: 'UK Airstrait Plum/Copper',
        market: 'GB',
        url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/airstrait/plum-copper',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
      {
        label: 'SilkiPro model support',
        model: 'SilkiPro model support',
        market: 'GB',
        url: 'https://support.sharkninja.co.uk/article/HT400UK-Series-Shark-SilkiPro-Straight-Get-to-Know-Your-Shark-SilkiPro-Straight-Features-Specs-Combs-Safety?redirect=false',
        checkedDate: '17 November 2026',
        scope:
          'Regional product identity and the documented fields compared in the article.',
      },
    ],
  },
}))();
export const consolidatedComparisonAliases: Readonly<
  Record<string, readonly string[]>
> = {
  [ArticleSlug.GhdMaxVsChronosMax]: [
    'ghd original Max',
    'Chronos Max 43mm',
    'ghd Max 42mm',
  ],
  [ArticleSlug.DenmanD3VsD31]: ['D31', 'Denman Freeflow', 'D3 seven row'],
  [ArticleSlug.TangleTeezerUltimateDetanglerVsUltimateStyler]: [
    'Ultimate Styler',
    'Ultimate Detangler finishing',
  ],
  [ArticleSlug.GhdDuetStyleVsDuetBlowdry]: [
    'Duet family',
    'Duet Blowdry brush',
    'Duet Style Shine Shot',
  ],
  [ArticleSlug.SharkSpeedstyleProVsProFlex]: [
    'HD500',
    'HD700',
    'Pro Flex',
    'SpeedStyle Pro',
  ],
  [ArticleSlug.T3Aire360NextGenVsDysonAirwrapId]: [
    'T3 Next Gen',
    'Aire360 2.0',
    'T3 dual voltage',
  ],
  [ArticleSlug.BabylissAirWandAs6550uVsAs6553u]: [
    'AS6553U',
    'AS6550U',
    'Air Wand smoothing brush',
  ],
  [ArticleSlug.ColorWowDreamCoatOriginalVsExtraStrengthVsCurly]: [
    'Dream Coat Curly',
    'Dream Coat Extra Strength',
    'Color Wow Original',
  ],
  [ArticleSlug.MoroccanoilTreatmentOriginalVsLight]: [
    'Moroccanoil Original',
    'Moroccanoil Light',
  ],
  [ArticleSlug.FramarGatorGripsVsSuperSectioners]: [
    'Framar Gator',
    'Super Sectioners',
  ],
  [ArticleSlug.ConairHs400VsHs79crHotRollers]: [
    'HS400',
    'HS79CR',
    'Conair Roller Palette',
  ],
  [ArticleSlug.SharkSilkiproStraightVsDysonAirstrait]: [
    'SilkiPro',
    'HT401UK',
    'Airstrait UK',
  ],
};

/** Existing owners included in the consolidated release acceptance checks. */
export const consolidatedUpdatedSlugs = [
  'olivia-garden-ceramic-ion-vs-nanothermic',
  'how-to-choose-hair-sectioning-clips',
  'how-to-choose-a-hair-barrette',
  'hair-roller-size-guide',
  'how-to-use-heated-hair-rollers',
  'how-to-use-snap-closure-foam-rollers',
  'how-to-choose-hair-dryer',
  'hair-dryer-heat-and-speed-settings-guide',
  'how-to-use-hair-dryer-concentrator-nozzle',
  'ghd-air-vs-helios',
  'dyson-supersonic-nural-vs-supersonic-r',
  'dyson-supersonic-vs-shark-speedstyle',
  'parlux-alyon-vs-digitalyon',
  'dyson-airwrap-id-vs-co-anda2x',
  'revlon-one-step-volumizer-vs-plus',
  'how-to-clean-a-steam-hair-straightener',
  'steam-hair-straightener-vs-flat-iron',
  'how-to-clean-hair-dryer-filter',
  'how-to-use-hot-air-brush',
  'best-travel-flat-irons',
  'babyliss-air-style-1000-vs-flawless-volume',
  'how-to-clean-a-hair-brush',
  'hair-styling-product-order',
  'hair-serum-vs-hair-oil',
  'how-to-apply-hair-serum-or-oil',
  'flat-iron-plate-width-guide',
  'thermal-brush-vs-hot-air-brush',
  'denman-d3-vs-d4',
  'best-brushes-curly-hair',
  'tangle-teezer-ultimate-detangler-vs-wet-brush-original',
  'ghd-chronos-vs-chronos-max',
  'dyson-airstrait-vs-ghd-duet-style',
  'dyson-airsmooth-vs-ghd-duet-blowdry',
  'how-to-choose-multi-styler-attachments',
  'how-to-use-texturising-spray',
  'sea-salt-spray-vs-texturising-spray',
  'how-to-apply-hair-mousse',
  'how-to-use-spiral-hair-ties',
  'heatless-curls-not-working',
  'how-to-use-airflow-curling-barrels',
  'how-to-use-an-automatic-hair-curler',
  'dyson-supersonic-travel-vs-ghd-flight-plus',
  'shark-flexstyle-vs-ioncurl',
  'best-travel-hair-dryers',
  'hair-dryer-diffuser-compatibility',
  'ghd-speed-vs-helios',
  'shark-glam-vs-flexstyle',
  'best-brushes-thick-hair',
] as const;
