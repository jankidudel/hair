import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';
export const finishingMethodEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = /* @__PURE__ */ (() => ({
  [ArticleSlug.HowToApplyHairSerumOrOil]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'One named UK formula documents two application stages. Coverage checks are editorial guidance; no measured shine, damage, repair, absorption or heat-protection test was performed.',
    sources: [
      {
        label: 'Moroccanoil Treatment Original UK directions',
        model: 'Moroccanoil Treatment Original UK directions',
        market: 'UK',
        url: 'https://uk.moroccanoil.com/products/moroccanoil-treatment-original',
        checkedDate: '30 October 2026',
        scope:
          'UK Original formula; small-amount, clean towel-dried mid-lengths-to-ends method and a separate dry-hair finish. Not a universal serum/oil dose or repair result.',
      },
    ],
  },
  [ArticleSlug.HowToApplyCurlCream]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'A named UK cream supplies application and drying examples. Distribution and routine comparisons are editorial guidance, not tests of curl formation, hold duration, measured styling outcomes or formula compatibility.',
    sources: [
      {
        label: 'Moroccanoil Curl Defining Cream UK directions and FAQ',
        model: 'Moroccanoil Curl Defining Cream UK directions and FAQ',
        market: 'UK',
        url: 'https://uk.moroccanoil.com/products/curl-defining-cream',
        checkedDate: '30 October 2026',
        scope:
          'UK Curl Defining Cream; towel-dried application, distribution and two named drying routes. Its FAQ says it is not a heat protectant. No universal curl pattern, lasting-time or mandatory product combination.',
      },
    ],
  },
  [ArticleSlug.HowToUseHairStylingPowder]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'One named US styling powder supplies the dispensing example. Application checks are editorial guidance; no measured volume, oil removal, wear duration or ingredient-outcome test was performed.',
    sources: [
      {
        label: 'American Crew Boost Powder US directions',
        model: 'American Crew Boost Powder US directions',
        market: 'US',
        url: 'https://www.americancrew.com/products/boost-powder',
        checkedDate: '30 October 2026',
        scope:
          'US Boost Powder; loosen container, small amount into hand, light distribution on dry hair toward roots. Positioned as a styling powder, not evidence that every powder shares the mechanism or role.',
      },
    ],
  },
  [ArticleSlug.HowToCleanAStraighteningBrush]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Accessible UK support supplies a named original-glide care example. The inspection sequence is editorial guidance, not a validated universal wet-cleaning procedure or a repair method.',
    sources: [
      {
        label: 'Original ghd glide UK cleaning support',
        model: 'Original ghd glide UK cleaning support',
        market: 'UK',
        url: 'https://help.ghdhair.com/hc/en-gb/articles/360006572359-How-do-I-clean-my-ghd-glide',
        checkedDate: '30 October 2026',
        scope:
          'UK support for the original ghd glide; unplug/cool, remove hair and wipe heat plate/between bristles using a damp wipe or cloth. Not instructions for glide+, glide+ max, rise or an airflow brush.',
      },
    ],
  },
  [ArticleSlug.HairStylingPowderVsDryShampoo]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two named manufacturer listings establish positioning and different application formats. No head-to-head volume, oil removal, cleanliness or wear-duration test was performed.',
    sources: [
      {
        label: 'American Crew Boost Powder US directions',
        model: 'American Crew Boost Powder US directions',
        market: 'US',
        url: 'https://www.americancrew.com/products/boost-powder',
        checkedDate: '30 October 2026',
        scope:
          'US Boost Powder; loosen container, small amount into hand, light distribution on dry hair toward roots. Positioned as a styling powder, not evidence that every powder shares the mechanism or role.',
      },
      {
        label: 'Batiste Original English European listing',
        model: 'Batiste Original English European listing',
        market: 'English European',
        url: 'https://www.batiste-hair.eu/en/our-products/fragrance/original/',
        checkedDate: '30 October 2026',
        scope:
          'English European Original dry-shampoo listing; oil-refresh positioning and its shake, section/spray, massage and brush method. Do not turn this into a hair-health or washing-frequency prescription.',
      },
    ],
  },
  [ArticleSlug.HowToCleanHotAirBrush]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two UK support pages document care of one named airflow brush. The wider sorting sequence is editorial guidance, not a universal liquid, filter-removal or repair procedure.',
    sources: [
      {
        label: 'ghd Duet Blowdry UK aftercare',
        model: 'ghd Duet Blowdry UK aftercare',
        market: 'UK',
        url: 'https://www.ghdhair.com/looking-after-ghd-duet-blowdry',
        checkedDate: '30 October 2026',
        scope:
          'UK Duet Blowdry aftercare; unplug/cool, no immersion, permitted exterior damp wipe and supplied cleaning brush for rear filter and barrel air outlets.',
      },
      {
        label: 'ghd Duet Blowdry UK filter-cleaning support',
        model: 'ghd Duet Blowdry UK filter-cleaning support',
        market: 'UK',
        url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/20066792337682-HOW-DO-I-CLEAN-MY-GHD-DUET-BLOWDRY',
        checkedDate: '30 October 2026',
        scope:
          'UK Duet Blowdry support identifies rear-filter location and explicitly says it cannot be removed. Not permission to unscrew another tool or transfer filter care to a heated smoothing brush.',
      },
    ],
  },
}))();
export const finishingMethodRelated: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HowToApplyHairSerumOrOil]: [
    ArticleSlug.HairSerumVsHairOil,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HowToApplyHeatProtectant,
  ],
  [ArticleSlug.HowToApplyCurlCream]: [
    ArticleSlug.CurlCreamVsLeaveInConditioner,
    ArticleSlug.HowToUseACurlDefiningBrush,
    ArticleSlug.HowToUseAHairDryerDiffuser,
  ],
  [ArticleSlug.HowToUseHairStylingPowder]: [
    ArticleSlug.HairStylingPowderVsDryShampoo,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.PomadeVsHairClay,
  ],
  [ArticleSlug.HowToCleanAStraighteningBrush]: [
    ArticleSlug.HowToUseAStraighteningBrush,
    ArticleSlug.HowToCleanHotAirBrush,
    ArticleSlug.HowToCleanAHairBrush,
  ],
  [ArticleSlug.HairStylingPowderVsDryShampoo]: [
    ArticleSlug.HowToUseHairStylingPowder,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HowToUseTexturisingSpray,
  ],
  [ArticleSlug.HowToCleanHotAirBrush]: [
    ArticleSlug.HowToUseHotAirBrush,
    ArticleSlug.HowToCleanAStraighteningBrush,
    ArticleSlug.HowToCleanHairDryerFilter,
  ],
};
export const finishingMethodSlugs = Object.keys(
  finishingMethodEvidence,
) as ArticleSlug[];

export const finishingMethodIncoming: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HowToApplyHairSerumOrOil]: [
    ArticleSlug.HairSerumVsHairOil,
    ArticleSlug.HowToApplyLeaveInConditioner,
    ArticleSlug.HowToApplyHeatProtectant,
  ],
  [ArticleSlug.HowToApplyCurlCream]: [
    ArticleSlug.CurlCreamVsLeaveInConditioner,
    ArticleSlug.HowToApplyGelToCurlyHair,
    ArticleSlug.HowToApplyLeaveInConditioner,
    ArticleSlug.HowToUseACurlDefiningBrush,
  ],
  [ArticleSlug.HowToUseHairStylingPowder]: [
    ArticleSlug.HairMousseVsGel,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HowToCleanAStraighteningBrush]: [
    ArticleSlug.HowToChooseAStraighteningBrush,
    ArticleSlug.HowToUseAStraighteningBrush,
    ArticleSlug.HowToCleanAHairBrush,
  ],
  [ArticleSlug.HairStylingPowderVsDryShampoo]: [
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.SeaSaltSprayVsTexturisingSpray,
  ],
};

export const finishingMethodDescriptions: Readonly<
  Partial<Record<string, string>>
> = {
  [ArticleSlug.HowToCleanAStraighteningBrush]:
    'Separate electrical surface care from airflow-filter care and ordinary brush washing.',
};
