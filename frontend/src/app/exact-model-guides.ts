import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';
export const exactModelSources: Readonly<Record<string, GuideSource>> = {
  S01: {
    label: 'Parlux English MagicSense',
    model: 'Parlux English MagicSense',
    market: 'International catalogue',
    url: 'https://www.parlux.it/en/products/magicsense-diffuser',
    checkedDate: '18 November 2026',
    scope:
      'MagicSense direct-fit models, adapter-package wording and named exclusions.',
  },
  S02: {
    label: 'Parlux Italian MagicSense',
    model: 'Parlux Italian MagicSense',
    market: 'International catalogue',
    url: 'https://www.parlux.it/products/diffusore-magicsense',
    checkedDate: '18 November 2026',
    scope:
      'Italian MagicSense model list, including Ethos, and adapter-package scope.',
  },
  S03: {
    label: 'Parlux MagicCompact',
    model: 'Parlux MagicCompact',
    market: 'International catalogue',
    url: 'https://www.parlux.it/en/products/diffusore-magiccompact%C2%AE',
    checkedDate: '18 November 2026',
    scope: 'MagicCompact pairing documented exclusively for Elysium.',
  },
  S04: {
    label: 'Parlux US diffuser listing',
    model: 'Parlux US diffuser listing',
    market: 'US',
    url: 'https://parluxus.com/products/parlux-magic-sense-special-diffuser-adapter',
    checkedDate: '18 November 2026',
    scope: 'Selected US MagicSense offer with limited model-detail wording.',
  },
  S05: {
    label: 'Parlux diffuser buying guide',
    model: 'Parlux diffuser buying guide',
    market: 'International catalogue',
    url: 'https://www.parlux.it/en/blogs/news/diffusore-professionale-guida-acquisto',
    checkedDate: '18 November 2026',
    scope:
      'Manufacturer context for diffuser selection; exact product lists establish approval.',
  },
  S06: {
    label: 'T3 US AireLuxe',
    model: 'T3 US AireLuxe',
    market: 'US',
    url: 'https://t3micro.com/products/t3-aireluxe-professional-hair-dryer-new',
    checkedDate: '18 November 2026',
    scope:
      'US white AireLuxe listing, model 76812, controls, electrical rating and selected box.',
  },
  S07: {
    label: 'T3 US Featherweight StyleMax',
    model: 'T3 US Featherweight StyleMax',
    market: 'US',
    url: 'https://t3micro.com/collections/bestsellers/products/featherweight-stylemax-professional-hair-dryer',
    checkedDate: '18 November 2026',
    scope:
      'US Featherweight StyleMax model 77832, workflow, electrical rating and included attachments.',
  },
  S08: {
    label: 'T3 SoftTouch 3 diffuser',
    model: 'T3 SoftTouch 3 diffuser',
    market: 'US',
    url: 'https://t3micro.com/products/softtouch3-finger-diffuser',
    checkedDate: '18 November 2026',
    scope: 'SoftTouch 3 approval for the specifically named dryer bodies.',
  },
  S09: {
    label: 'Remington UK EC9001',
    model: 'Remington UK EC9001',
    market: 'UK',
    url: 'https://uk.remington-europe.com/hydraluxe-pro-hair-dryer-ec9001-uk',
    checkedDate: '18 November 2026',
    scope: 'UK Hydraluxe Pro EC9001 product identity and named package.',
  },
  S10: {
    label: 'Remington UK EC9001 instructions',
    model: 'Remington UK EC9001 instructions',
    market: 'UK',
    url: 'https://cdn-img.remington-europe.com/manager/remington-europe_com/User%20Manuals/uk/EC9001_UK_T22-7001335-B.pdf',
    checkedDate: '18 November 2026',
    scope:
      'EC9001A booklet linked for the UK EC9001 listing; controls, mounting and diffuser restriction.',
  },
  S11: {
    label: 'Remington UK AC9800',
    model: 'Remington UK AC9800',
    market: 'UK',
    url: 'https://uk.remington-europe.com/proluxe-you-adaptive-hair-dryer-ac9800-uk',
    checkedDate: '18 November 2026',
    scope: 'UK PROluxe You AC9800 product identity.',
  },
  S12: {
    label: 'Remington UK AC9800 instructions',
    model: 'Remington UK AC9800 instructions',
    market: 'UK',
    url: 'https://uk.remington-europe.com/amfile/file/download/file/3187/product/4540/',
    checkedDate: '18 November 2026',
    scope:
      'AC9800A booklet, StyleAdapt, paired Manual speed/heat levels, diffuser restriction and inlet-grille care.',
  },
  S13: {
    label: 'Cloud Nine UK Original Iron',
    model: 'Cloud Nine UK Original Iron',
    market: 'UK',
    url: 'https://www.cloudninehair.com/products/the-original-iron',
    checkedDate: '18 November 2026',
    scope:
      'Current ordinary UK Original Iron controls, voltage and hibernation description.',
  },
  S14: {
    label: 'Cloud Nine UK Touch Iron',
    model: 'Cloud Nine UK Touch Iron',
    market: 'UK',
    url: 'https://www.cloudninehair.com/products/the-touch-iron',
    checkedDate: '18 November 2026',
    scope:
      'Current UK Touch temperatures and voltage; website tap-mapping passages conflict.',
  },
  S15: {
    label: "L'Or\u00e9al UK SteamPod 3 guidance",
    model: "L'Or\u00e9al UK SteamPod 3 guidance",
    market: 'UK',
    url: 'https://www.lorealprofessionnel.co.uk/hair-styling-advice/how-to-use-steampod-hair-straightener',
    checkedDate: '18 November 2026',
    scope: 'Historical UK SteamPod 3 preparation and removable-comb guidance.',
  },
  S16: {
    label: "L'Or\u00e9al UK SteamPod 4",
    model: "L'Or\u00e9al UK SteamPod 4",
    market: 'UK',
    url: 'https://www.lorealprofessionnel.co.uk/all-products/hair-tools/steampod-4',
    checkedDate: '18 November 2026',
    scope:
      'UK SteamPod 4 design, comb package and named advertising comparator.',
  },
  S17: {
    label: "L'Or\u00e9al UK SteamPod 4 explanation",
    model: "L'Or\u00e9al UK SteamPod 4 explanation",
    market: 'UK',
    url: 'https://www.lorealprofessionnel.co.uk/hair-styling-advice/how-to-use-steampod-4',
    checkedDate: '18 November 2026',
    scope: 'SteamPod 4 comb roles and generation-specific setup.',
  },
  S18: {
    label: 'Rowenta LP7400 support',
    model: 'Rowenta LP7400 support',
    market: 'UK',
    url: 'https://www.rowenta.com/instructions-for-use/Products-/Personal-Care/Straightener/STEAMPOD-4-LP7400/csp/1830008757',
    checkedDate: '18 November 2026',
    scope: 'LP7400/LP7400F1 support page and model-specific documentation.',
  },
  S19: {
    label: 'Denman UK D3',
    model: 'Denman UK D3',
    market: 'UK',
    url: 'https://denmanbrush.com/products/d3-original-styler-7-row',
    checkedDate: '18 November 2026',
    scope: 'UK D3 Original Styler construction and stated uses.',
  },
  S20: {
    label: 'Denman UK D38',
    model: 'Denman UK D38',
    market: 'UK',
    url: 'https://denmanbrush.com/products/d38-denman-detangler',
    checkedDate: '18 November 2026',
    scope: 'UK D38 paddle format and stated uses.',
  },
  S21: {
    label: "Denman's D38 explanation",
    model: "Denman's D38 explanation",
    market: 'UK',
    url: 'https://denmanbrush.com/blogs/news/brush-of-the-month-d38-power-paddle',
    checkedDate: '18 November 2026',
    scope:
      'D38 relationship to D3-style pins and the broader air-cushioned paddle.',
  },
  S22: {
    label: 'invisibobble ORIGINAL Crystal Clear',
    model: 'invisibobble ORIGINAL Crystal Clear',
    market: 'International catalogue',
    url: 'https://invisibobble.com/products/original-crystal-clear-2023',
    checkedDate: '18 November 2026',
    scope: 'Selected ORIGINAL Crystal Clear spiral and three-piece package.',
  },
  S23: {
    label: 'invisibobble POWER Crystal Clear',
    model: 'invisibobble POWER Crystal Clear',
    market: 'International catalogue',
    url: 'https://invisibobble.com/collections/spirals-sprunchies/products/power-crystal-clear-2023',
    checkedDate: '18 November 2026',
    scope: 'Selected POWER Crystal Clear positioning and three-piece package.',
  },
  S24: {
    label: 'invisibobble SLIM Pink Monocle',
    model: 'invisibobble SLIM Pink Monocle',
    market: 'International catalogue',
    url: 'https://invisibobble.com/collections/spirals-sprunchies/products/slim-pink-monocle-2023',
    checkedDate: '18 November 2026',
    scope: 'Selected SLIM Pink Monocle design and three-piece package.',
  },
  S25: {
    label: 'Color Wow UK Raise the Root',
    model: 'Color Wow UK Raise the Root',
    market: 'UK',
    url: 'https://uk.colorwowhair.com/products/raise-the-root',
    checkedDate: '18 November 2026',
    scope: 'UK Raise the Root placement, starting-state and drying directions.',
  },
  S26: {
    label: 'Color Wow UK Xtra Large',
    model: 'Color Wow UK Xtra Large',
    market: 'UK',
    url: 'https://uk.colorwowhair.com/products/flat-hair-volumizer-extra-large',
    checkedDate: '18 November 2026',
    scope:
      'Current UK Xtra Large damp/dry permission, pump dispensing, section distribution and drying options.',
  },
  S27: {
    label: 'Color Wow Xtra Large Q&A',
    model: 'Color Wow Xtra Large Q&A',
    market: 'UK',
    url: 'https://uk.colorwowhair.com/blogs/all/volume-hair-xtra-large-bombshell',
    checkedDate: '18 November 2026',
    scope:
      'Maker Q&A on root versus distributed volume and the optional named pairing; older damp-only list retained as dated wording.',
  },
  S28: {
    label: 'BaByliss UK Wave Secret Air C1900U manual',
    model: 'BaByliss UK Wave Secret Air C1900U manual',
    market: 'UK',
    url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1772798725082/information-booklets/C1900U_IB.pdf',
    checkedDate: '18 November 2026',
    scope:
      'UK C1900U heated settings, product-preparation restriction, release cooling and model-specific sequence.',
  },
  S29: {
    label: 'BaByliss UK Style Secret Air C6688U manual',
    model: 'BaByliss UK Style Secret Air C6688U manual',
    market: 'UK',
    url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1757671677225/information-booklets/C6688U_IB.pdf',
    checkedDate: '18 November 2026',
    scope:
      'UK C6688U warm AIR, heated settings, preparation exception and filter/inlet-mesh access.',
  },
  S30: {
    label: 'Kitsch Sunset continuous set',
    model: 'Kitsch Sunset continuous set',
    market: 'UK',
    url: 'https://www.mykitsch.com/collections/casey-holme-s-favorites/products/satin-heatless-curling-set-sunset-tie-dye',
    checkedDate: '18 November 2026',
    scope: 'Exact Sunset continuous-ribbon package and its fasteners.',
  },
  S31: {
    label: 'Kitsch UK Rosewood jumbo four-pack',
    model: 'Kitsch UK Rosewood jumbo four-pack',
    market: 'UK',
    url: 'https://www.mykitsch.co.uk/collections/curling-tools/products/satin-jumbo-flexi-rods-4pc-rosewood',
    checkedDate: '18 November 2026',
    scope:
      'UK Rosewood jumbo four-piece dimensions, count and bendable closure.',
  },
  S32: {
    label: 'Kitsch UK satin six-pack',
    model: 'Kitsch UK satin six-pack',
    market: 'UK',
    url: 'https://www.mykitsch.co.uk/products/satin-wrapped-flexi-rods-6pc',
    checkedDate: '18 November 2026',
    scope:
      'Six-piece satin individual-rod package; working dimensions remain unknown in retrieved text.',
  },
};
export const exactModelSlugs = [
  ArticleSlug.ParluxDiffuserCompatibility,
  ArticleSlug.T3AireluxeVsFeatherweightStylemax,
  ArticleSlug.RemingtonHydraluxeProVsProluxeYouDryer,
  ArticleSlug.CloudNineOriginalIronVsTouchIron,
  ArticleSlug.Steampod3VsSteampod4,
  ArticleSlug.DenmanD3VsD38,
  ArticleSlug.InvisibobbleOriginalVsPowerVsSlim,
  ArticleSlug.ColorWowRaiseTheRootVsXtraLarge,
  ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir,
] as const;
export const exactModelRelated: Readonly<Record<string, readonly string[]>> = {
  [ArticleSlug.ParluxDiffuserCompatibility]: [
    ArticleSlug.HairDryerDiffuserCompatibility,
    ArticleSlug.ParluxAlyonVsDigitalyon,
  ],
  [ArticleSlug.T3AireluxeVsFeatherweightStylemax]: [
    ArticleSlug.HairDryerSettingsGuide,
    ArticleSlug.HairDryerChooser,
  ],
  [ArticleSlug.RemingtonHydraluxeProVsProluxeYouDryer]: [
    ArticleSlug.HairDryerSettingsGuide,
    ArticleSlug.HairDryerChooser,
  ],
  [ArticleSlug.CloudNineOriginalIronVsTouchIron]: [
    ArticleSlug.CloudNineOriginalIronVsWideIron,
    ArticleSlug.FlatIronPlateWidthGuide,
  ],
  [ArticleSlug.Steampod3VsSteampod4]: [
    ArticleSlug.HowToUseASteamHairStraightener,
    ArticleSlug.HowToCleanASteamHairStraightener,
  ],
  [ArticleSlug.DenmanD3VsD38]: [
    ArticleSlug.DenmanD3VsD4,
    ArticleSlug.DenmanD3VsD31,
    ArticleSlug.CurlDefiningBrushVsDetanglingBrush,
  ],
  [ArticleSlug.InvisibobbleOriginalVsPowerVsSlim]: [
    ArticleSlug.HowToUseSpiralHairTies,
    ArticleSlug.HairElasticsVsScrunchies,
  ],
  [ArticleSlug.ColorWowRaiseTheRootVsXtraLarge]: [
    ArticleSlug.HowToApplyHairMousse,
    ArticleSlug.HairStylingProductOrder,
  ],
  [ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir]: [
    ArticleSlug.HowToUseAnAutomaticHairCurler,
    ArticleSlug.HowToCleanAnAutomaticHairCurler,
  ],
};
export const exactModelEvidence: Readonly<Record<string, GuideEvidence>> = {
  [ArticleSlug.ParluxDiffuserCompatibility]: {
    summary:
      'Exact-model manufacturer documentation and editorial task analysis. Comparative handling, styling speed and retention have not been measured by CombReport.',
    sources: [
      exactModelSources.S01,
      exactModelSources.S02,
      exactModelSources.S03,
      exactModelSources.S04,
      exactModelSources.S05,
    ],
  },
  [ArticleSlug.T3AireluxeVsFeatherweightStylemax]: {
    summary:
      'Exact-model manufacturer documentation and editorial task analysis. Comparative handling, styling speed and retention have not been measured by CombReport.',
    sources: [
      exactModelSources.S06,
      exactModelSources.S07,
      exactModelSources.S08,
    ],
  },
  [ArticleSlug.RemingtonHydraluxeProVsProluxeYouDryer]: {
    summary:
      'Exact-model manufacturer documentation and editorial task analysis. Comparative handling, styling speed and retention have not been measured by CombReport.',
    sources: [
      exactModelSources.S09,
      exactModelSources.S10,
      exactModelSources.S11,
      exactModelSources.S12,
    ],
  },
  [ArticleSlug.CloudNineOriginalIronVsTouchIron]: {
    summary:
      'Exact-model manufacturer documentation and editorial task analysis. Comparative handling, styling speed and retention have not been measured by CombReport.',
    sources: [exactModelSources.S13, exactModelSources.S14],
  },
  [ArticleSlug.Steampod3VsSteampod4]: {
    summary:
      'Exact-model manufacturer documentation and editorial task analysis. Comparative handling, styling speed and retention have not been measured by CombReport.',
    sources: [
      exactModelSources.S15,
      exactModelSources.S16,
      exactModelSources.S17,
      exactModelSources.S18,
    ],
  },
  [ArticleSlug.DenmanD3VsD38]: {
    summary:
      'Exact-model manufacturer documentation and editorial task analysis. Comparative handling, styling speed and retention have not been measured by CombReport.',
    sources: [
      exactModelSources.S19,
      exactModelSources.S20,
      exactModelSources.S21,
    ],
  },
  [ArticleSlug.InvisibobbleOriginalVsPowerVsSlim]: {
    summary:
      'Exact-model manufacturer documentation and editorial task analysis. Comparative handling, styling speed and retention have not been measured by CombReport.',
    sources: [
      exactModelSources.S22,
      exactModelSources.S23,
      exactModelSources.S24,
    ],
  },
  [ArticleSlug.ColorWowRaiseTheRootVsXtraLarge]: {
    summary:
      'Exact-model manufacturer documentation and editorial task analysis. Comparative handling, styling speed and retention have not been measured by CombReport.',
    sources: [
      exactModelSources.S25,
      exactModelSources.S26,
      exactModelSources.S27,
    ],
  },
  [ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir]: {
    summary:
      'Exact-model manufacturer documentation and editorial task analysis. Comparative handling, styling speed and retention have not been measured by CombReport.',
    sources: [exactModelSources.S28, exactModelSources.S29],
  },
};
export const exactModelAliases: Readonly<Record<string, readonly string[]>> = {
  [ArticleSlug.ParluxDiffuserCompatibility]: [
    'MagicSense',
    'MagicCompact',
    'Parlux Ethos diffuser',
    'Elysium diffuser',
  ],
  [ArticleSlug.T3AireluxeVsFeatherweightStylemax]: [
    'T3 AireLuxe',
    'Featherweight StyleMax',
    'StyleMax automatic settings',
    'SoftTouch 3',
  ],
  [ArticleSlug.RemingtonHydraluxeProVsProluxeYouDryer]: [
    'EC9001',
    'AC9800',
    'Hydracare',
    'StyleAdapt',
    'PROluxe You',
  ],
  [ArticleSlug.CloudNineOriginalIronVsTouchIron]: [
    'Cloud 9',
    'Touch Iron',
    'Original Iron controls',
    'Touch voltage',
  ],
  [ArticleSlug.Steampod3VsSteampod4]: [
    'SteamPod 3 vs 4',
    'SteamPod combs',
    'LP7400',
    'SteamPod upgrade',
  ],
  [ArticleSlug.DenmanD3VsD38]: ['D38', 'Power Paddle', 'Denman D3 paddle'],
  [ArticleSlug.InvisibobbleOriginalVsPowerVsSlim]: [
    'invisibobble Original',
    'Power Slim',
    'spiral hair tie variants',
  ],
  [ArticleSlug.ColorWowRaiseTheRootVsXtraLarge]: [
    'Xtra Large',
    'Raise the Root',
    'Color Wow volume',
    'root spray vs foam',
  ],
  [ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir]: [
    'C1900U',
    'C6688U',
    'Wave Secret Air',
    'Style Secret Air',
    'warm AIR',
  ],
};
export const exactModelUpdatedSlugs = [
  'denman-d3-vs-d4',
  'denman-d3-vs-d31',
  'cloud-nine-original-iron-vs-wide-iron',
  'how-to-use-a-steam-hair-straightener',
  'best-travel-flat-irons',
  'how-to-clean-a-steam-hair-straightener',
  'hair-dryer-heat-and-speed-settings-guide',
  'how-to-clean-hair-dryer-filter',
  'hair-dryer-diffuser-compatibility',
  'how-to-use-an-automatic-hair-curler',
  'how-to-clean-an-automatic-hair-curler',
  'how-to-use-spiral-hair-ties',
  'how-to-apply-hair-mousse',
  'hair-styling-product-order',
  'how-to-use-heatless-curling-rod',
  'how-to-use-flexi-rods',
  'best-heatless-curling-sets',
  'how-to-get-root-volume-with-a-round-brush',
  'how-to-choose-hair-dryer',
  'parlux-alyon-vs-digitalyon',
  'curl-defining-brush-vs-detangling-brush',
] as const;
