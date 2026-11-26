import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';

/** Named formula and market instructions; descriptors are not measured rankings. */
export const shapingMethodEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = /* @__PURE__ */ (() => ({
  [ArticleSlug.HairWaxVsHairGel]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Three maker pages establish named formats, descriptions and application instructions. The comparison framework is editorial, without measured hold, shine, reworkability or ingredient effects.',
    sources: [
      {
        label: 'got2b Glued Spiking Wax',
        model: 'got2b Glued Spiking Wax',
        market: 'international English, 75 ml',
        url: 'https://www.got2b.com/hair-styling/product/gel-cream-wax/glued-spiking-wax.html',
        checkedDate: '3 November 2026',
        scope: 'Named dry-hair application.',
      },
      {
        label: 'American Crew Firm Hold Styling Gel',
        model: 'American Crew Firm Hold Styling Gel',
        market: 'US',
        url: 'https://www.americancrew.com/products/firm-hold-styling-gel',
        checkedDate: '3 November 2026',
        scope: 'Named preparation and handling.',
      },
      {
        label: 'American Crew Liquid Wax',
        model: 'American Crew Liquid Wax',
        market: 'US',
        url: 'https://www.americancrew.com/products/liquid-wax',
        checkedDate: '3 November 2026',
        scope:
          'Liquid format and maker-described finish, not a category-wide result.',
      },
    ],
  },
  [ArticleSlug.HowToApplyHairWax]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two manufacturer pages document named market/package differences. The coverage and observation sequence is editorial, without a universal dose, hold-duration test or formulation comparison.',
    sources: [
      {
        label: 'got2b Glued Spiking Wax',
        model: 'got2b Glued Spiking Wax',
        market: 'international English, 75 ml',
        url: 'https://www.got2b.com/hair-styling/product/gel-cream-wax/glued-spiking-wax.html',
        checkedDate: '3 November 2026',
        scope: 'Named palm/dry-hair directions.',
      },
      {
        label: 'got2b US Glued Spiking Hair Wax',
        model: 'got2b US Glued Spiking Hair Wax',
        market: 'US, 2 oz',
        url: 'https://www.got2b.us/styling/glued/spiking-wax.html',
        checkedDate: '3 November 2026',
        scope: 'Named damp starting-state information only.',
      },
    ],
  },
  [ArticleSlug.HairPasteVsHairClay]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two US maker pages establish named descriptions and preparation differences. The comparison is editorial, without controlled shine, hold, spreading, ingredient or finished-style measurements.',
    sources: [
      {
        label: 'American Crew Defining Paste',
        model: 'American Crew Defining Paste',
        market: 'US',
        url: 'https://www.americancrew.com/products/defining-paste',
        checkedDate: '3 November 2026',
        scope: 'Named finish and damp/dry method.',
      },
      {
        label: 'American Crew Molding Clay',
        model: 'American Crew Molding Clay',
        market: 'US',
        url: 'https://www.americancrew.com/products/molding-clay',
        checkedDate: '3 November 2026',
        scope: 'Named medium-shine description and towel-dried method.',
      },
    ],
  },
  [ArticleSlug.HowToApplyHairPaste]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'One US maker page provides a named paste method. The outline, coverage and detailing framework is editorial, without measured dose, spread, hold duration or a guarantee of a particular finish.',
    sources: [
      {
        label: 'American Crew Defining Paste',
        model: 'American Crew Defining Paste',
        market: 'US',
        url: 'https://www.americancrew.com/products/defining-paste',
        checkedDate: '3 November 2026',
        scope: 'Named palm preparation and damp/dry directions.',
      },
    ],
  },
  [ArticleSlug.HowToSlickBackHairWithGel]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two maker pages document different named gel instructions. The coverage, backward-shape and optional-fastening framework is editorial, without measured hold, wear time or a universal refresh recipe.',
    sources: [
      {
        label: 'American Crew Firm Hold Styling Gel',
        model: 'American Crew Firm Hold Styling Gel',
        market: 'US',
        url: 'https://www.americancrew.com/products/firm-hold-styling-gel',
        checkedDate: '3 November 2026',
        scope: 'Named starting state, placement and later-handling direction.',
      },
      {
        label: 'Give Me Slick Back Styling Gel',
        model: 'Give Me Slick Back Styling Gel',
        market: 'UK',
        url: 'https://www.givemecosmetics.com/products/slick-back-styling-gel',
        checkedDate: '3 November 2026',
        scope:
          'Directions section only: preparation, distribution, natural drying and refresh permission for that formula.',
      },
    ],
  },
}))();
export const shapingMethodRelated = {
  [ArticleSlug.HairWaxVsHairGel]: [
    ArticleSlug.HowToApplyHairWax,
    ArticleSlug.HowToSlickBackHairWithGel,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HowToApplyHairWax]: [
    ArticleSlug.HairWaxVsHairGel,
    ArticleSlug.HowToApplyHairPaste,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HairPasteVsHairClay]: [
    ArticleSlug.HowToApplyHairPaste,
    ArticleSlug.HowToApplyHairClay,
    ArticleSlug.PomadeVsHairClay,
  ],
  [ArticleSlug.HowToApplyHairPaste]: [
    ArticleSlug.HairPasteVsHairClay,
    ArticleSlug.HowToApplyHairWax,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.HowToSlickBackHairWithGel]: [
    ArticleSlug.HowToApplyGelToCurlyHair,
    ArticleSlug.HairBrushVsComb,
    ArticleSlug.HairStylingProductOrder,
  ],
} as const;
export const shapingMethodCards: Readonly<
  Partial<
    Record<string, { readonly title: string; readonly description: string }>
  >
> = {
  [ArticleSlug.HairWaxVsHairGel]: {
    title: 'Hair wax vs hair gel',
    description:
      'Compare the named finish, starting state and handling instead of category stereotypes.',
  },
  [ArticleSlug.HowToApplyHairWax]: {
    title: 'How to apply hair wax',
    description:
      "Keep the exact container's directions, hand preparation and coverage together.",
  },
  [ArticleSlug.HairPasteVsHairClay]: {
    title: 'Hair paste vs hair clay',
    description:
      'Read two formula records without assuming clay must be matte.',
  },
  [ArticleSlug.HowToApplyHairPaste]: {
    title: 'How to apply hair paste',
    description:
      'Spread through the intended area before arranging the outline and selected pieces.',
  },
  [ArticleSlug.HowToSlickBackHairWithGel]: {
    title: 'How to slick back hair with gel',
    description:
      'Separate backward shaping, setting and any optional fastening.',
  },
};
export const shapingMethodSlugs: readonly ArticleSlug[] = [
  ArticleSlug.HairWaxVsHairGel,
  ArticleSlug.HowToApplyHairWax,
  ArticleSlug.HairPasteVsHairClay,
  ArticleSlug.HowToApplyHairPaste,
  ArticleSlug.HowToSlickBackHairWithGel,
];
export const shapingMethodIncoming: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HairWaxVsHairGel]: [
    ArticleSlug.PomadeVsHairClay,
    ArticleSlug.HairMousseVsGel,
    ArticleSlug.FlexibleVsStrongHoldHairspray,
  ],
  [ArticleSlug.HowToApplyHairWax]: [
    ArticleSlug.HowToApplyHairPomade,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HowToUseHairStylingPowder,
    ArticleSlug.HowToUseTexturisingSpray,
    ArticleSlug.HowToApplyHairSerumOrOil,
    ArticleSlug.HowToCleanAHairComb,
  ],
  [ArticleSlug.HairPasteVsHairClay]: [
    ArticleSlug.PomadeVsHairClay,
    ArticleSlug.HowToApplyHairClay,
    ArticleSlug.HairStylingPowderVsDryShampoo,
    ArticleSlug.SeaSaltSprayVsTexturisingSpray,
  ],
  [ArticleSlug.HowToApplyHairPaste]: [
    ArticleSlug.HowToApplyHairPomade,
    ArticleSlug.HowToApplyHairClay,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HowToUseHairStylingPowder,
    ArticleSlug.HowToUseTexturisingSpray,
    ArticleSlug.HowToApplyHairSerumOrOil,
  ],
  [ArticleSlug.HowToSlickBackHairWithGel]: [
    ArticleSlug.HairMousseVsGel,
    ArticleSlug.HowToApplyGelToCurlyHair,
    ArticleSlug.HairStylingProductOrder,
    ArticleSlug.HowToUseHairspray,
    ArticleSlug.HairBrushVsComb,
    ArticleSlug.HowToCleanAHairComb,
    ArticleSlug.HowToUseAWideToothComb,
  ],
};
