import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';

/** Exact UK sources; older US product records remain separately scoped. */
export const currentModelSources = {
  S1: {
    label: 'ghd Speed Titanium Black UK listing',
    model: 'ghd Speed Titanium Black UK listing',
    market: 'UK',
    url: 'https://www.ghdhair.com/hair-dryers/ghd-speed-titanium-black-p-744',
    checkedDate: '31 October 2026',
    scope:
      'Four heat and four speed options, cool shot, lock-associated memory and magnetic Halo styling concentrator; no timed drying or comfort result.',
  },
  S2: {
    label: 'ghd black Helios UK listing',
    model: 'ghd black Helios UK listing',
    market: 'UK',
    url: 'https://www.ghdhair.com/hair-dryers/ghd-black-helios-p-497',
    checkedDate: '31 October 2026',
    scope:
      'Black Helios variable power/temperature controls, cool shot, brushless motor and contoured nozzle; unestablished fields remain unknown.',
  },
  S3: {
    label: 'ghd Glide+ standard UK listing',
    model: 'ghd Glide+ standard UK listing',
    market: 'UK',
    url: 'https://www.ghdhair.com/hot-brush/ghd-glide-plus-hot-brush-p-766',
    checkedDate: '31 October 2026',
    scope:
      'Current standard Glide+ dry-hair paddle format and stated 185°C setting; distinct from original Glide and Rise.',
  },
  S4: {
    label: 'ghd Glide+ Max UK listing',
    model: 'ghd Glide+ Max UK listing',
    market: 'UK',
    url: 'https://www.ghdhair.com/hot-brush/ghd-glide-plus-max-hot-brush-p-767',
    checkedDate: '31 October 2026',
    scope:
      'Current Glide+ Max larger paddle format, dry-hair use and stated 185°C setting; no measured head ratio or time saving.',
  },
  S5: {
    label:
      'Dyson Supersonic Nural Straight+Wavy Ceramic apricot/Topaz UK listing',
    model:
      'Dyson Supersonic Nural Straight+Wavy Ceramic apricot/Topaz UK listing',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-dryers/supersonic-nural/straight-wavy-ceramic-apricot',
    checkedDate: '31 October 2026',
    scope:
      'Selected UK consumer box: Styling concentrator, Flyaway Smoother, Diffuser, Gentle air attachment and Smoothing nozzle; named control modes only.',
  },
  S6: {
    label:
      'Dyson Supersonic r consumer Straight+Wavy Ceramic pink/Rose gold UK listing',
    model:
      'Dyson Supersonic r consumer Straight+Wavy Ceramic pink/Rose gold UK listing',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-dryers/supersonic-r/straight-wavy-ceramic-pink-rose-gold',
    checkedDate: '31 October 2026',
    scope:
      'Selected UK consumer box: Professional concentrator, Gentle air attachment, Smoothing nozzle, Powerful Air Attachment and Flyaway attachment; RFID recognition and remembered settings.',
  },
  S7: {
    label: 'Dyson Airstrait Plum/Copper UK listing',
    model: 'Dyson Airstrait Plum/Copper UK listing',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/airstrait/plum-copper',
    checkedDate: '31 October 2026',
    scope:
      'Selected UK Plum/Copper airflow straightening without hot plates, and separate Dry mode; no imported revision settings or case inclusion.',
  },
  S8: {
    label: 'ghd Duet Style black UK listing',
    model: 'ghd Duet Style black UK listing',
    market: 'UK',
    url: 'https://www.ghdhair.com/wet-to-dry/ghd-duet-style-black-p-612',
    checkedDate: '31 October 2026',
    scope:
      'UK black Duet Style airflow/plate construction and dry-only, no-air Shine Shot; distinct from Duet Blowdry.',
  },
  S9: {
    label: 'Dyson Airwrap i.d. Straight+Wavy Red Velvet/Gold UK listing',
    model: 'Dyson Airwrap i.d. Straight+Wavy Red Velvet/Gold UK listing',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-id/straight-wavy-red-velvet-gold',
    checkedDate: '31 October 2026',
    scope:
      'UK i.d. connected personalised curling sequence and conical-barrel discussion. Complete selected-box inventory remains unverified.',
  },
  S10: {
    label:
      'Dyson Airwrap Co-anda2x Straight+Wavy Ceramic apricot/Topaz UK listing',
    model:
      'Dyson Airwrap Co-anda2x Straight+Wavy Ceramic apricot/Topaz UK listing',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-co-anda2x/straight-wavy-ceramic-apricot',
    checkedDate: '31 October 2026',
    scope:
      'Selected UK Co-anda2x connected sequence, intelligent attachments, AirSmooth2x and Fast dryer 2x; no other-kit inclusion or measured outcome.',
  },
  S11: {
    label: 'Dyson Airwrap Co-anda2x UK compatibility FAQ',
    model: 'Dyson Airwrap Co-anda2x UK compatibility FAQ',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-co-anda2x',
    checkedDate: '31 October 2026',
    scope:
      'Previous Airwrap/i.d. and Co-anda2x attachments do not interchange. Earlier Airwrap and i.d. cross-compatibility still requires an exact part/use check.',
  },
  S12: {
    label: 'ghd Duet Style UK styling-mode support',
    model: 'ghd Duet Style UK styling-mode support',
    market: 'UK',
    url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/11212010617490-WHAT-ARE-THE-STYLING-MODES-ON-THE-GHD-DUET-STYLE',
    checkedDate: '31 October 2026',
    scope:
      'Wet styling and separate dry-only Shine Shot; device settings are not universal styling recommendations.',
  },
  S13: {
    label: 'Dyson Airwrap i.d. UK support and manual entry',
    model: 'Dyson Airwrap i.d. UK support and manual entry',
    market: 'UK',
    url: 'https://www.dyson.co.uk/support/hair-care/hair-stylers/airwrap-id',
    checkedDate: '31 October 2026',
    scope:
      'Correctly identified UK i.d. support owner and user-manual entry checked; the full 14.53 MB i.d. PDF was not inspected.',
  },
} as const satisfies Record<string, GuideSource>;

export const currentModelEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = {
  [ArticleSlug.GhdSpeedVsHelios]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Exact UK manufacturer listings establish the interface and nozzle descriptions. Handling and replacement checks are editorial guidance, not measured drying speed, sound, comfort or hair outcomes.',
    sources: [currentModelSources.S1, currentModelSources.S2],
  },
  [ArticleSlug.GhdGlidePlusVsGlidePlusMax]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two current UK listings establish generation, dry-use state, head positioning and stated setting. No timed styling, pressure, coverage-ratio or outcome test was performed.',
    sources: [currentModelSources.S3, currentModelSources.S4],
  },
  [ArticleSlug.DysonSupersonicNuralVsSupersonicR]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two named UK consumer listings establish the compared controls and box lists. No independent drying, weight, noise, comfort or hair-outcome comparison was performed.',
    sources: [currentModelSources.S5, currentModelSources.S6],
  },
  [ArticleSlug.DysonAirstraitVsGhdDuetStyle]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Two exact UK product listings and a ghd mode guide establish construction and mode boundaries. No head-to-head drying time, hair-damage, tension or finished-result testing was performed.',
    sources: [
      currentModelSources.S7,
      currentModelSources.S8,
      currentModelSources.S12,
    ],
  },
  [ArticleSlug.DysonAirwrapIdVsCoAnda2x]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'Named UK product pages and an official compatibility FAQ establish connected features, selected attachments and interface boundaries. No measured pressure, timing, curl consistency or value comparison was performed.',
    sources: [
      currentModelSources.S9,
      currentModelSources.S10,
      currentModelSources.S11,
    ],
  },
};
export const currentModelRelated = {
  [ArticleSlug.GhdSpeedVsHelios]: [
    ArticleSlug.GhdAirVsHelios,
    ArticleSlug.HairDryerSettingsGuide,
    ArticleSlug.HairDryerDiffuserCompatibility,
  ],
  [ArticleSlug.GhdGlidePlusVsGlidePlusMax]: [
    ArticleSlug.GhdRiseVsGlidePlus,
    ArticleSlug.HowToChooseAStraighteningBrush,
    ArticleSlug.HowToCleanAStraighteningBrush,
  ],
  [ArticleSlug.DysonSupersonicNuralVsSupersonicR]: [
    ArticleSlug.HairDryerDiffuserCompatibility,
    ArticleSlug.HairDryerDiffuserVsConcentrator,
    ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
  ],
  [ArticleSlug.DysonAirstraitVsGhdDuetStyle]: [
    ArticleSlug.BestFlatIrons,
    ArticleSlug.FlatIronVsHotAirBrush,
    ArticleSlug.HowToChooseHairToolHeatMatAndPouch,
  ],
  [ArticleSlug.DysonAirwrapIdVsCoAnda2x]: [
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.DysonAirwrapVsSharkFlexstyle,
    ArticleSlug.BestHotAirBrushes,
  ],
} as const;
export const currentModelSlugs: readonly ArticleSlug[] = [
  ArticleSlug.GhdSpeedVsHelios,
  ArticleSlug.GhdGlidePlusVsGlidePlusMax,
  ArticleSlug.DysonSupersonicNuralVsSupersonicR,
  ArticleSlug.DysonAirstraitVsGhdDuetStyle,
  ArticleSlug.DysonAirwrapIdVsCoAnda2x,
];
export const currentModelIncoming: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.GhdSpeedVsHelios]: [
    ArticleSlug.GhdAirVsHelios,
    ArticleSlug.HairDryerChooser,
  ],
  [ArticleSlug.GhdGlidePlusVsGlidePlusMax]: [
    ArticleSlug.GhdRiseVsGlidePlus,
    ArticleSlug.HowToChooseAStraighteningBrush,
  ],
  [ArticleSlug.DysonSupersonicNuralVsSupersonicR]: [
    ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
    ArticleSlug.HairDryerDiffuserCompatibility,
  ],
  [ArticleSlug.DysonAirstraitVsGhdDuetStyle]: [
    ArticleSlug.BestFlatIrons,
    ArticleSlug.FlatIronVsHotAirBrush,
  ],
  [ArticleSlug.DysonAirwrapIdVsCoAnda2x]: [
    ArticleSlug.DysonAirwrapVsSharkFlexstyle,
    ArticleSlug.BestHotAirBrushes,
  ],
};
/** Supplementary citations preserve the existing article/evidence presentation. */
export const additionalGuideSources: Readonly<
  Partial<Record<string, readonly GuideSource[]>>
> = {
  [ArticleSlug.DysonAirwrapVsSharkFlexstyle]: [
    currentModelSources.S9,
    currentModelSources.S13,
  ],
  [ArticleSlug.HowToChooseMultiStylerAttachments]: [currentModelSources.S11],
};
