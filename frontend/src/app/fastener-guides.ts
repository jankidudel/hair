import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';
const sources: Readonly<Record<string, GuideSource>> = {
  S1: {
    label: 'Kitsch Black & Tort Matte oversized claw set',
    model: 'Kitsch Black & Tort Matte oversized claw set',
    market: 'US',
    url: 'https://www.mykitsch.com/products/eco-friendly-oversized-matte-claw-clip',
    checkedDate: '29 October 2026',
    scope:
      'US Black & Tort Matte oversized claw set; published squeeze/open, place and release sequence. No independent hold or fit result.',
  },
  S2: {
    label: 'Kitsch Sedona Metal Cloud Pins & Snap Clips 8pc Set',
    model: 'Kitsch Sedona Metal Cloud Pins & Snap Clips 8pc Set',
    market: 'US',
    url: 'https://www.mykitsch.com/products/sedona-metal-cloud-pins-snap-clips-8pc-set',
    checkedDate: '29 October 2026',
    scope:
      'US Sedona mixed pin/snap set; establishes named format and bang/layer positioning, not identical mechanisms for all pieces.',
  },
  S3: {
    label: 'invisibobble ORIGINAL Crystal Clear',
    model: 'invisibobble ORIGINAL Crystal Clear',
    market: 'English official store',
    url: 'https://invisibobble.com/products/original-crystal-clear-2023',
    checkedDate: '29 October 2026',
    scope:
      'English official ORIGINAL Crystal Clear listing; spiral identity and wrapping method. No universal wrap count or independent outcome comparison.',
  },
  S4: {
    label: 'Kitsch Creaseless Hair Clips 4pc Set',
    model: 'Kitsch Creaseless Hair Clips 4pc Set',
    market: 'US',
    url: 'https://www.mykitsch.com/products/creaseless-clips-4pc-set-black-terrazzo',
    checkedDate: '29 October 2026',
    scope:
      'US creaseless set, temporary makeup-preparation role and published placement/removal directions. No guaranteed mark-free outcome.',
  },
  S5: {
    label: 'Framar Super Sectioners Black',
    model: 'Framar Super Sectioners Black',
    market: 'International English',
    url: 'https://int.framar.com/products/super-sectioners-clips-black',
    checkedDate: '29 October 2026',
    scope:
      'International English Super Sectioners Black listing; self-locking mechanism, silicone strip and cushioned contact. Does not establish heat permission.',
  },
  S6: {
    label: 'CottonWorks Satin encyclopedia',
    model: 'CottonWorks Satin encyclopedia',
    market: 'English textile reference',
    url: 'https://cottonworks.com/encyclopedia-item/satin/',
    checkedDate: '29 October 2026',
    scope:
      "Cotton Incorporated's CottonWorks textile encyclopedia identifies satin as a weave. It does not establish a scrunchie's fibre composition, fit or hair outcome.",
  },
};
export const fastenerEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = /* @__PURE__ */ (() => ({
  [ArticleSlug.HowToUseAClawClip]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'A named manufacturer documents the basic claw action. The supported placement, inspection and troubleshooting prompts are editorial guidance, not measured capacity, hold duration or a universal twist recipe.',
    sources: [sources.S1],
  },
  [ArticleSlug.HowToUseSnapHairClips]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'The current mixed-format product establishes a named example, not a manufacturer-authored universal snap tutorial. The conventional mechanism and small-section sequence are editorial guidance, with no measured hold or no-snag claim.',
    sources: [sources.S2],
  },
  [ArticleSlug.HowToUseSpiralHairTies]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'A named maker documents the spiral format and wrapping action. The supported handling and removal checks are editorial guidance; no comparative protection, mark-free result or restoration method is established.',
    sources: [sources.S3],
  },
  [ArticleSlug.CreaselessClipsVsSectioningClips]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named maker descriptions establish task positioning and one mechanism example. The comparison supplies no independent capacity, contact-pressure, heat-resistance or crease test.',
    sources: [sources.S4, sources.S5],
  },
  [ArticleSlug.HowToChooseHairSectioningClips]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      "One named manufacturer's mechanism description supports the example. Selection and contact checks are editorial guidance; no comparative grip, temperature, capacity or crease test was performed.",
    sources: [sources.S5],
  },
  [ArticleSlug.HairElasticsVsScrunchies]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'The named official listing establishes a spiral-format example, and the textile reference identifies satin as a weave. Fit and removal comparisons are editorial guidance, not measured friction, breakage, comfort or hold-duration results.',
    sources: [sources.S3, sources.S6],
  },
}))();
export const fastenerRelated: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HowToUseAClawClip]: [
    ArticleSlug.HowToChooseClawClipSize,
    ArticleSlug.HairElasticsVsScrunchies,
    ArticleSlug.HowToUseAFrenchHairPin,
  ],
  [ArticleSlug.HowToUseSnapHairClips]: [
    ArticleSlug.HowToChooseAHairBarrette,
    ArticleSlug.HowToUseBobbyPins,
    ArticleSlug.CreaselessClipsVsSectioningClips,
  ],
  [ArticleSlug.HowToUseSpiralHairTies]: [
    ArticleSlug.HairElasticsVsScrunchies,
    ArticleSlug.HowToUseAClawClip,
    ArticleSlug.HowToCleanHairScrunchies,
  ],
  [ArticleSlug.CreaselessClipsVsSectioningClips]: [
    ArticleSlug.HowToChooseHairSectioningClips,
    ArticleSlug.HowToUseSnapHairClips,
    ArticleSlug.HowToSectionHairForStyling,
  ],
  [ArticleSlug.HowToChooseHairSectioningClips]: [
    ArticleSlug.CreaselessClipsVsSectioningClips,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.HowToUseHeatlessCurlingRod,
  ],
  [ArticleSlug.HairElasticsVsScrunchies]: [
    ArticleSlug.HowToUseSpiralHairTies,
    ArticleSlug.HowToCleanHairScrunchies,
    ArticleSlug.HowToUseAClawClip,
  ],
};

export const fastenerDescriptions: Readonly<
  Partial<Record<ArticleSlug, string>>
> = {
  [ArticleSlug.HowToUseAClawClip]:
    'Support a half-up or full arrangement, check closure and remove the clip.',
  [ArticleSlug.HowToUseSnapHairClips]:
    'Identify the flexing mechanism and hold a small section.',
  [ArticleSlug.HowToUseSpiralHairTies]:
    'Wrap a continuous coil, check the fit and unwind it.',
  [ArticleSlug.CreaselessClipsVsSectioningClips]:
    'Compare temporary surface holding with parking working layers; the labels can overlap.',
};
export const everydayFastenerSlugs: readonly ArticleSlug[] = [
  ArticleSlug.HowToUseAHairBarrette,
  ArticleSlug.HowToUseCreaselessHairClips,
  ArticleSlug.HowToUseAClawClip,
  ArticleSlug.HowToUseSnapHairClips,
  ArticleSlug.HowToUseSpiralHairTies,
];

export const fastenerSlugs = Object.keys(fastenerEvidence) as ArticleSlug[];
