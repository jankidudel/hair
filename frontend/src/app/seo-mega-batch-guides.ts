import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';

/**
 * 22 November 2026 mega batch: two new editorial pilots (N01, N02), four
 * existing-owner refreshes (U01–U04) and the verified parts of the R03/R04
 * evidence checks. Sources were read on the check date; fields they do not
 * establish stay unknown on the page.
 */
const checkedDate = '22 November 2026';

export const megaBatchSources = {
  M01: {
    label: 'ghd Helios professional hair dryer in black',
    model: 'ghd Helios, black',
    market: 'UK',
    url: 'https://www.ghdhair.com/hair-dryers/ghd-black-helios-p-497',
    checkedDate,
    scope:
      'Contoured nozzle, variable power and temperature settings and a cool shot. No weight, box list or diffuser inclusion stated.',
  },
  M02: {
    label: 'ghd professional Helios hair dryer diffuser',
    model: 'ghd Helios diffuser',
    market: 'UK',
    url: 'https://www.ghdhair.com/hair-dryers/ghd-hair-dryer-diffuser-p-281',
    checkedDate,
    scope:
      'Separately sold diffuser stated for ghd Helios and ghd air dryers; ghd air 1.0 needs a ring adapter. Inclusion in a Helios box is not stated.',
  },
  M03: {
    label: 'Shark SpeedStyle Pro Flex Build Your Own HD500UK-BYO',
    model: 'Shark SpeedStyle Pro Flex HD500UK',
    market: 'UK',
    url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-build-your-own-hair-dryer-system/HD500UK-BYO.html',
    checkedDate,
    scope:
      'Choose three of six attachments, including diffuser and precision concentrator; 0.73 kg listed without stating what it includes. Stock varies and is not used.',
  },
  M04: {
    label: 'Shark SpeedStyle Pro Flex diffuser XSKHD5DMSEU',
    model: 'Shark XSKHD5DMSEU diffuser',
    market: 'UK',
    url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-diffuser/XSKHD5DMSEU.html',
    checkedDate,
    scope:
      'Separately listed diffuser, compatible with HD500EU, HD500UK, HD542EU and HD542UK.',
  },
  M05: {
    label: 'Philips hot brush tangle support page',
    model: 'Philips BHH811/00',
    market: 'UK',
    url: 'https://www.philips.co.uk/c-t/XC000013814/my-hair-gets-tangled-in-the-philips-multistyler-hot-brush',
    checkedDate,
    scope:
      'Model-specific support for BHH811/00 only; covers usage causes and describes no general release mechanism.',
  },
  M06: {
    label: 'Tangle Teezer The Original',
    model: 'Tangle Teezer The Original, Regular',
    market: 'UK',
    url: 'https://tangleteezer.com/products/the-original',
    checkedDate,
    scope:
      'Two-tiered teeth, wet and dry hair, straight-to-wavy positioning, keep away from heat, care wording. Handle-free body seen in product images; no dimensions.',
  },
  M07: {
    label: 'Tangle Teezer The Ultimate Detangler',
    model: 'Tangle Teezer The Ultimate Detangler, Regular',
    market: 'UK',
    url: 'https://tangleteezer.com/products/the-ultimate-detangler',
    checkedDate,
    scope:
      'Two-tiered teeth, designed for wet hair and the shower, handle for wet hands, keep away from heat; Large and Mini on the same listing. No dimensions; dry use not described.',
  },
  M08: {
    label: 'Library of Congress: How does static electricity work?',
    model: 'General physics explainer',
    market: 'International',
    url: 'https://www.loc.gov/everyday-mysteries/physics/item/how-does-static-electricity-work/',
    checkedDate,
    scope:
      'Static as a charge imbalance and charge transfer by rubbing materials together. General mechanism only; no brush or hair-care testing.',
  },
  M09: {
    label:
      'Velasco et al. (2009), Hair fiber characteristics and methods to evaluate hair physical and mechanical properties',
    model: 'Review article, Brazilian Journal of Pharmaceutical Sciences 45(1)',
    market: 'International',
    url: 'https://doi.org/10.1590/S1984-82502009000100019',
    checkedDate,
    scope:
      'Combing produces surface charge through friction and hair’s high electrical resistance; charge dissipates more easily from wet hair, so fly-away is greater in dry conditions. Secondary summary; no brush-material comparison.',
  },
  M10: {
    label: 'BaByliss UK Air Wand Diffuser ACAS6550UDIF',
    model: 'BaByliss ACAS6550UDIF',
    market: 'UK',
    url: 'https://www.babyliss.com/uk-en/air-wand-diffuser-ACAS6550UDIF.html',
    checkedDate,
    scope:
      'UK code and “suitable for use with the BaByliss Air Wand”. Neither AS6550U nor AS6553U is named.',
  },
  M11: {
    label: 'BaByliss UK Air Wand Smoothing Brush ACAS6550UPAD',
    model: 'BaByliss ACAS6550UPAD',
    market: 'UK',
    url: 'https://www.babyliss.com/uk-en/air-wand-smoothing-brush-ACAS6550UPAD.html',
    checkedDate,
    scope:
      'UK code and “suitable for use with the BaByliss Air Wand”. Neither AS6550U nor AS6553U is named.',
  },
  M12: {
    label: 'Denman replacement pads',
    model: 'Denman D3, D4 and D14 pads',
    market: 'UK',
    url: 'https://denmanbrush.com/products/replacement-pads',
    checkedDate,
    scope:
      'Lists D3 seven-row, D4 nine-row and D14 five-row pads only; no D41 or D31 pad named.',
  },
} as const satisfies Record<string, GuideSource>;

const S = megaBatchSources;

export const megaBatchSlugs = [
  ArticleSlug.WhyHairGetsStaticAfterBrushing,
  ArticleSlug.TangleTeezerOriginalVsUltimateDetangler,
] as const;

/** Existing owners revised substantively in this batch. */
export const megaBatchUpdatedSlugs = [
  ArticleSlug.RoundBrushStuckInHair,
  ArticleSlug.BestHairDryersThickHair,
  ArticleSlug.HairRollerSizeGuide,
  ArticleSlug.HairDryerSettingsGuide,
  ArticleSlug.BabylissAirWandAs6550uVsAs6553u,
  ArticleSlug.DenmanD3VsD31,
] as const;

export const megaBatchRelated: Readonly<Record<string, readonly string[]>> = {
  [ArticleSlug.WhyHairGetsStaticAfterBrushing]: [
    ArticleSlug.HairBrushVsComb,
    ArticleSlug.BoarBristleBrushGuide,
    ArticleSlug.HotAirBrushFrizzyHair,
  ],
  [ArticleSlug.TangleTeezerOriginalVsUltimateDetangler]: [
    ArticleSlug.TangleTeezerVsWetBrushOriginal,
    ArticleSlug.TangleTeezerUltimateDetanglerVsFineFragile,
    ArticleSlug.TangleTeezerUltimateDetanglerVsUltimateStyler,
  ],
};

export const megaBatchEvidence: Readonly<Record<string, GuideEvidence>> = {
  [ArticleSlug.WhyHairGetsStaticAfterBrushing]: {
    summary:
      'General physics and hair-fibre references explain the mechanism. The two-section check is an observation readers can try, not a CombReport test, and no brush is ranked.',
    sources: [S.M08, S.M09],
  },
  [ArticleSlug.TangleTeezerOriginalVsUltimateDetangler]: {
    summary:
      'Exact UK manufacturer listings for the two standard Regular brushes. CombReport has not measured grip, tooth flexibility, force or breakage.',
    sources: [S.M06, S.M07],
  },
};

/** Sources added to existing owners; merged by URL with their earlier records. */
export const megaBatchSupplementarySources: Readonly<
  Partial<Record<string, readonly GuideSource[]>>
> = {
  [ArticleSlug.BabylissAirWandAs6550uVsAs6553u]: [S.M10, S.M11],
  [ArticleSlug.DenmanD3VsD31]: [S.M12],
};

export const megaBatchAliases: Readonly<Record<string, readonly string[]>> = {
  [ArticleSlug.WhyHairGetsStaticAfterBrushing]: [
    'static hair after brushing',
    'hair sticking to brush',
    'hairbrush static in winter',
    'flyaways after brushing',
  ],
  [ArticleSlug.TangleTeezerOriginalVsUltimateDetangler]: [
    'Tangle Teezer Original vs Wet Detangler',
    'Tangle Teezer with handle vs Original',
    'Tangle Teezer Original or Ultimate Detangler',
  ],
  [ArticleSlug.HairRollerSizeGuide]: [
    'how many rollers do I need',
    'hair roller size chart',
    'roller count planner',
  ],
  [ArticleSlug.RoundBrushStuckInHair]: [
    'how to get a round brush out of hair',
    'hair wrapped around round brush',
  ],
};
