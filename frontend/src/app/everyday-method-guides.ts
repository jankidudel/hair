import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';
export const everydayMethodEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = {
  [ArticleSlug.HowToBlowDryAFringe]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two UK manufacturer tutorials establish named fringe and curtain approaches. The section boundaries and observation prompts are editorial guidance, without a measured hold, speed or heat-damage result.',
    sources: [
      {
        label: 'Dyson UK: how to blow-dry and style bangs',
        model: 'Dyson UK: how to blow-dry and style bangs',
        url: 'https://www.dyson.co.uk/discover/news/latest/how-to-style-bangs',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope:
          'Separate-dryer/brush approach and a cold-shot finish; exact attachment fit still needs checking.',
      },
      {
        label: 'ghd UK: how to style curtain bangs',
        model: 'ghd UK: how to style curtain bangs',
        url: 'https://www.ghdhair.com/hairstyles/fringe/how-to-style-curtain-bangs',
        market: 'UK',
        checkedDate: '1 November 2026',
        scope:
          'One-side-at-a-time brush direction; optional direct-contact steps are outside this method.',
      },
    ],
  },
  [ArticleSlug.HowToBrushOutCurls]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named Australian and US maker instructions support cooling before separating a styled set. The single-section comparison is editorial guidance; no retention, friction or brush-performance test was performed.',
    sources: [
      {
        label: 'ghd Australia: curls with a straightener',
        model: 'ghd Australia: curls with a straightener',
        url: 'https://www.ghdhair.com/au/hairstyles/curly/how-to-curl-hair-with-a-straightener',
        market: 'Australia',
        checkedDate: '1 November 2026',
        scope:
          'Cooling and brushing into waves only; no damage or wear-duration claims adopted.',
      },
      {
        label: 'Conair CD705/CD706 wand instructions',
        model: 'Conair CD705/CD706 wand instructions',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw4e1e1319/Instructional%20Booklets/CD706.pdf',
        market: 'US',
        checkedDate: '1 November 2026',
        scope: 'Model-specific instruction to cool before combing or brushing.',
      },
    ],
  },
  [ArticleSlug.HowToUseAHairBarrette]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      "A UK maker's own-range tutorial documents a conventional clasp action. The supported practice and fit observations are editorial guidance, without measured capacity, hold duration or a guaranteed no-snag result.",
    sources: [
      {
        label: 'TEGEN: how to use barrette clips',
        model: 'TEGEN: how to use barrette clips',
        url: 'https://tegenaccessories.co.uk/blogs/tegen-accessories-blog-posts/hair-tutorial-how-to-use-barrette-clips',
        market: 'UK own-range tutorial',
        checkedDate: '1 November 2026',
        scope:
          'Conventional side-pad release, lower-bar placement and normal closure; other mechanisms can differ.',
      },
    ],
  },
  [ArticleSlug.HowToUseCreaselessHairClips]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'A named Kitsch listing supplies a preparation role and basic placement/removal directions. Inspection and troubleshooting are editorial guidance; no crease, pressure, capacity or heat test was performed.',
    sources: [
      {
        label: 'Kitsch: Creaseless Hair Clips 4pc Set',
        model: 'Kitsch: Creaseless Hair Clips 4pc Set',
        url: 'https://www.mykitsch.com/en-eu/products/creaseless-clips-4pc-set-black-terrazzo',
        market: 'English European listing',
        checkedDate: '1 November 2026',
        scope:
          'Temporary makeup-preparation use and gentle placement/removal, without a tested mark-free or heat-use finding.',
      },
    ],
  },
  [ArticleSlug.HowToUseDryShampoo]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two US maker listings and the Batiste FAQ establish different application formats and directions. No comparative absorption, cleanliness or wear-duration test was performed.',
    sources: [
      {
        label: 'Batiste Original Classic Clean Scent',
        model: 'Batiste Original Classic Clean Scent',
        url: 'https://www.batistehair.com/products/dry-shampoo/fragrance-original',
        market: 'US aerosol',
        checkedDate: '1 November 2026',
        scope:
          'Its own shake, root-application and working-through method; quantities and distance do not transfer to another package.',
      },
      {
        label: 'Batiste US FAQ: dry-hair starting state',
        model: 'Batiste US FAQ',
        url: 'https://www.batistehair.com/faqs',
        market: 'US',
        checkedDate: '1 November 2026',
        scope:
          'Confirms dry hair in its wet-hair question. Its other timing and distance examples are not merged with the Original product page.',
      },
      {
        label: 'Kristin Ess Fragrance Free Dry Shampoo Powder',
        model: 'Kristin Ess Fragrance Free Dry Shampoo Powder',
        url: 'https://kristinesshair.com/products/dry-shampoo-powder',
        market: 'US loose powder',
        checkedDate: '1 November 2026',
        scope:
          'Dry-hair root placement and fingertip/palm blending, without a universal dispenser action.',
      },
    ],
  },
  [ArticleSlug.WhyCurlsFallOut]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named US and Australian maker instructions support dry-state and cooling checks for their examples. The symptom framework is editorial guidance; no universal cause, retention result or product-compatibility finding was measured.',
    sources: [
      {
        label: 'Conair CD705/CD706 wand guide',
        model: 'Conair CD705/CD706 wand guide',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw4e1e1319/Instructional%20Booklets/CD706.pdf',
        market: 'US',
        checkedDate: '1 November 2026',
        scope:
          'Named dry-hair and cool-before-brushing instructions, not a clamp-iron manual.',
      },
      {
        label: 'ghd Australia: curls with a straightener',
        model: 'ghd Australia: curls with a straightener',
        url: 'https://www.ghdhair.com/au/hairstyles/curly/how-to-curl-hair-with-a-straightener',
        market: 'Australia',
        checkedDate: '1 November 2026',
        scope:
          'Cooling and brushed-wave sequence only; no duration or damage claims adopted.',
      },
    ],
  },
};
export const everydayMethodRelated: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HowToBlowDryAFringe]: [
    ArticleSlug.HowToBlowDryHair,
    ArticleSlug.HowToUseARoundBrushWithAHairDryer,
    ArticleSlug.HowToUseCreaselessHairClips,
  ],
  [ArticleSlug.HowToBrushOutCurls]: [
    ArticleSlug.WhyCurlsFallOut,
    ArticleSlug.HairBrushVsComb,
    ArticleSlug.HowToUseHairspray,
  ],
  [ArticleSlug.HowToUseAHairBarrette]: [
    ArticleSlug.HowToChooseAHairBarrette,
    ArticleSlug.HowToUseSnapHairClips,
    ArticleSlug.HowToCleanHairClipsAndPins,
  ],
  [ArticleSlug.HowToUseCreaselessHairClips]: [
    ArticleSlug.CreaselessClipsVsSectioningClips,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.HowToBlowDryAFringe,
  ],
  [ArticleSlug.HowToUseDryShampoo]: [
    ArticleSlug.HairStylingPowderVsDryShampoo,
    ArticleSlug.HowToUseHairStylingPowder,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.WhyCurlsFallOut]: [
    ArticleSlug.HowToBrushOutCurls,
    ArticleSlug.CurlingIronBarrelSizeGuide,
    ArticleSlug.StylingToolTroubleshooting,
  ],
};
export const everydayMethodSlugs: readonly ArticleSlug[] = [
  ArticleSlug.HowToBlowDryAFringe,
  ArticleSlug.HowToBrushOutCurls,
  ArticleSlug.HowToUseAHairBarrette,
  ArticleSlug.HowToUseCreaselessHairClips,
  ArticleSlug.HowToUseDryShampoo,
  ArticleSlug.WhyCurlsFallOut,
];
export const everydayMethodDescriptions: Readonly<
  Partial<Record<string, string>>
> = {
  [ArticleSlug.HowToBlowDryAFringe]:
    'Isolate the front section, choose its direction and keep the brush release manageable.',
  [ArticleSlug.HowToBrushOutCurls]:
    'Separate a cooled styled set only as much as the intended finish needs.',
  [ArticleSlug.HowToUseAHairBarrette]:
    "Practise a conventional clasp's placement, normal closure and supported release.",
  [ArticleSlug.HowToUseCreaselessHairClips]:
    'Hold a temporary surface section aside and remove the clip before the next task.',
  [ArticleSlug.HowToUseDryShampoo]:
    "Follow the actual aerosol or powder's application and working-through directions.",
  [ArticleSlug.WhyCurlsFallOut]:
    'Locate the change before reviewing shape, section, cooling and finishing.',
};
export const everydayMethodIncoming: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HowToBlowDryAFringe]: [
    ArticleSlug.HowToBlowDryHair,
    ArticleSlug.HowToUseARoundBrushWithAHairDryer,
    ArticleSlug.HowToBlowDryABobWithARoundBrush,
  ],
  [ArticleSlug.HowToBrushOutCurls]: [
    ArticleSlug.WhyCurlsFallOut,
    ArticleSlug.HowToCurlHairWithAFlatIron,
    ArticleSlug.HowToUseACurlingWand,
    ArticleSlug.HowToUseHairspray,
    ArticleSlug.HowToApplyHairSerumOrOil,
  ],
  [ArticleSlug.HowToUseAHairBarrette]: [
    ArticleSlug.HowToChooseAHairBarrette,
    ArticleSlug.HowToUseBobbyPins,
    ArticleSlug.HowToUseSnapHairClips,
    ArticleSlug.HowToUseAClawClip,
  ],
  [ArticleSlug.HowToUseCreaselessHairClips]: [
    ArticleSlug.CreaselessClipsVsSectioningClips,
    ArticleSlug.HowToSectionHairForStyling,
  ],
  [ArticleSlug.HowToUseDryShampoo]: [
    ArticleSlug.HairStylingPowderVsDryShampoo,
    ArticleSlug.HowToUseTexturisingSpray,
    ArticleSlug.HairStylingProductOrder,
  ],
};
