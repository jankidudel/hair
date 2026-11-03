import { ArticleSlug } from './article-slug';
import type { GuideEvidence } from './guide-evidence';

/** Named fastening constructions and maker-specific supported handling. */
export const supportedUpdoEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = {
  [ArticleSlug.HowToUseABananaClip]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'One maker listing and its product photographs establish a named interlocking construction. The supported placement and observation sequence is editorial, without measured fit, hold time or protection outcomes.',
    sources: [
      {
        label: 'France Luxe Banana Clip',
        model: 'France Luxe Banana Clip',
        market: 'US/default storefront',
        url: 'https://franceluxe.com/products/france-luxe-banana-clip',
        checkedDate: '3 November 2026',
        scope:
          'Named clasp and visible construction, not universal fit or hold evidence.',
      },
    ],
  },
  [ArticleSlug.BananaClipVsClawClip]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two maker listings establish named closure types. The arrangement and access comparison is editorial, without measured holding force, comfort, duration or physical hair effects.',
    sources: [
      {
        label: 'France Luxe Banana Clip',
        model: 'France Luxe Banana Clip',
        market: 'US/default storefront',
        url: 'https://franceluxe.com/products/france-luxe-banana-clip',
        checkedDate: '3 November 2026',
        scope: 'Interlocking-clasp example.',
      },
      {
        label: 'France Luxe Jumbo Couture Claw Clip – Classic',
        model: 'France Luxe Jumbo Couture Claw Clip – Classic',
        market: 'US/default storefront',
        url: 'https://franceluxe.com/products/france-luxe-jumbo-couture-jaw-classic',
        checkedDate: '3 November 2026',
        scope: 'Spring-clasp example, not a jaw-capacity test.',
      },
    ],
  },
  [ArticleSlug.HowToUseAHairBungee]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      "One maker's product and instruction pages establish a named open-band mechanism. The fit and controlled-removal framework is editorial, without force, retention, damage or speed testing.",
    sources: [
      {
        label: 'Hair Bungee Original',
        model: 'Hair Bungee Original',
        market: 'Australian maker, English',
        url: 'https://www.hairbungee.com/index.php/about-hair-bungee/hair-bungee-original',
        checkedDate: '3 November 2026',
        scope: 'Named construction.',
      },
      {
        label: 'How to Hair Bungee',
        model: 'How to Hair Bungee',
        market: 'Australian maker, English',
        url: 'https://www.hairbungee.com/index.php/about-hair-bungee/how-to-hair-bungee',
        checkedDate: '3 November 2026',
        scope: 'Separate hair anchoring, not hook-to-hook closure.',
      },
    ],
  },
  [ArticleSlug.HairBungeeVsHairElastic]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      "One maker's product and use pages establish a named open-band construction. The comparison with closed-loop handling is editorial, without retention, force, speed or damage measurements.",
    sources: [
      {
        label: 'Hair Bungee Original',
        model: 'Hair Bungee Original',
        market: 'Australian maker, English',
        url: 'https://www.hairbungee.com/index.php/about-hair-bungee/hair-bungee-original',
        checkedDate: '3 November 2026',
        scope: 'Open band versus ring-shaped elastic.',
      },
      {
        label: 'How to Hair Bungee',
        model: 'How to Hair Bungee',
        market: 'Australian maker, English',
        url: 'https://www.hairbungee.com/index.php/about-hair-bungee/how-to-hair-bungee',
        checkedDate: '3 November 2026',
        scope: 'Named anchoring instructions.',
      },
    ],
  },
  [ArticleSlug.HowToUseHairSticks]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two maker tutorials establish named insertion and handling examples. The support and observation framework is editorial, without measured hold, ease, hair-length limits or physical hair effects.',
    sources: [
      {
        label: 'Tidal Hair Sticks tutorial',
        model: 'Tidal Hair Sticks tutorial',
        market: 'US maker',
        url: 'https://tidalhairsticks.com/pages/hair-stick-tutorials',
        checkedDate: '3 November 2026',
        scope: 'Named edge/change-direction example and supported grip.',
      },
      {
        label: 'LongLocks basic-bun tutorial',
        model: 'LongLocks basic-bun tutorial',
        market: 'US maker, English',
        url: 'https://www.longlocks.com/how-to-use-hair-sticks.htm',
        checkedDate: '3 November 2026',
        scope: 'Named weaving example and resistance boundary.',
      },
    ],
  },
  [ArticleSlug.HowToChooseClawClipSize]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'One current maker listing establishes a named outside dimension and spring mechanism. The fit, access and task comparison is editorial, without measured capacity, grip, comfort or wear duration.',
    sources: [
      {
        label: 'France Luxe Jumbo Couture Claw Clip – Classic',
        model: 'France Luxe Jumbo Couture Claw Clip – Classic',
        market: 'US/default storefront',
        url: 'https://franceluxe.com/products/france-luxe-jumbo-couture-jaw-classic',
        checkedDate: '3 November 2026',
        scope:
          'Published outside dimension and clasp, not an internal-capacity measurement.',
      },
    ],
  },
};
export const supportedUpdoRelated = {
  [ArticleSlug.HowToUseABananaClip]: [
    ArticleSlug.BananaClipVsClawClip,
    ArticleSlug.HowToUseAClawClip,
    ArticleSlug.HowToCleanHairClipsAndPins,
  ],
  [ArticleSlug.BananaClipVsClawClip]: [
    ArticleSlug.HowToUseABananaClip,
    ArticleSlug.HowToUseAClawClip,
    ArticleSlug.HowToChooseClawClipSize,
  ],
  [ArticleSlug.HowToUseAHairBungee]: [
    ArticleSlug.HairBungeeVsHairElastic,
    ArticleSlug.HowToUseSpiralHairTies,
    ArticleSlug.HairElasticsVsScrunchies,
  ],
  [ArticleSlug.HairBungeeVsHairElastic]: [
    ArticleSlug.HowToUseAHairBungee,
    ArticleSlug.HairElasticsVsScrunchies,
    ArticleSlug.HowToUseSpiralHairTies,
  ],
  [ArticleSlug.HowToUseHairSticks]: [
    ArticleSlug.HowToUseAFrenchHairPin,
    ArticleSlug.BobbyPinsVsUShapedHairPins,
    ArticleSlug.HowToUseAClawClip,
  ],
  [ArticleSlug.HowToChooseClawClipSize]: [
    ArticleSlug.HowToUseAClawClip,
    ArticleSlug.BananaClipVsClawClip,
    ArticleSlug.HowToChooseHairSectioningClips,
  ],
} as const;
export const supportedUpdoCards: Readonly<
  Partial<
    Record<string, { readonly title: string; readonly description: string }>
  >
> = {
  [ArticleSlug.HowToUseABananaClip]: {
    title: 'How to use a banana clip',
    description:
      'Support the gathered hair and check the actual interlocking closure before release.',
  },
  [ArticleSlug.BananaClipVsClawClip]: {
    title: 'Banana clip vs claw clip',
    description:
      'Compare catch and spring-jaw handling against the arrangement you want to hold.',
  },
  [ArticleSlug.HowToUseAHairBungee]: {
    title: 'How to use a hair bungee',
    description:
      'Keep anchoring, wrapping and controlled removal with the actual hooked band.',
  },
  [ArticleSlug.HairBungeeVsHairElastic]: {
    title: 'Hair bungee vs hair elastic',
    description:
      'Compare an open wrap with a closed loop before choosing the placement task.',
  },
  [ArticleSlug.HowToUseHairSticks]: {
    title: 'How to use hair sticks',
    description:
      'Support the bun and follow a named insertion route without forcing through resistance.',
  },
  [ArticleSlug.HowToChooseClawClipSize]: {
    title: 'How to choose claw clip size and hold',
    description:
      'Separate outside length, usable opening and the arrangement the clip must support.',
  },
};
export const supportedUpdoSlugs: readonly ArticleSlug[] = [
  ArticleSlug.HowToUseABananaClip,
  ArticleSlug.BananaClipVsClawClip,
  ArticleSlug.HowToUseAHairBungee,
  ArticleSlug.HairBungeeVsHairElastic,
  ArticleSlug.HowToUseHairSticks,
];
export const supportedUpdoIncoming: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.BananaClipVsClawClip]: [
    ArticleSlug.HowToUseAClawClip,
    ArticleSlug.HowToChooseAHairBarrette,
    ArticleSlug.HowToChooseHairSectioningClips,
    ArticleSlug.HowToChooseClawClipSize,
  ],
  [ArticleSlug.HowToUseABananaClip]: [
    ArticleSlug.HowToUseAClawClip,
    ArticleSlug.HowToUseAHairBarrette,
    ArticleSlug.HowToUseSnapHairClips,
    ArticleSlug.HowToCleanHairClipsAndPins,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.HowToSlickBackHairWithGel,
    ArticleSlug.HowToChooseHairSectioningClips,
  ],
  [ArticleSlug.HowToUseHairSticks]: [
    ArticleSlug.HowToUseAFrenchHairPin,
    ArticleSlug.BobbyPinsVsUShapedHairPins,
    ArticleSlug.HowToUseBobbyPins,
    ArticleSlug.HowToCleanHairClipsAndPins,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.HowToPackHairToolsForTravel,
  ],
  [ArticleSlug.HairBungeeVsHairElastic]: [
    ArticleSlug.HairElasticsVsScrunchies,
    ArticleSlug.HowToUseSpiralHairTies,
    ArticleSlug.HowToCleanHairScrunchies,
    ArticleSlug.HowToSlickBackHairWithGel,
  ],
  [ArticleSlug.HowToUseAHairBungee]: [
    ArticleSlug.HairElasticsVsScrunchies,
    ArticleSlug.HowToUseSpiralHairTies,
    ArticleSlug.HowToCleanHairScrunchies,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.HowToSlickBackHairWithGel,
    ArticleSlug.HowToPackHairToolsForTravel,
  ],
};
