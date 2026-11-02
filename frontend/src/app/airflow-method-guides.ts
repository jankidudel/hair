import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';

/** Exact model and market examples; compatibility and operation remain separate. */
export const airflowSources = {
  S1: {
    label: 'Remington AS8810 instructions',
    model: 'Remington AS8810 international manual, English section',
    market: 'International (English)',
    url: 'https://cdn-img.remington-europe.com/manager/remington-europe_com/User%20Manuals/EU/aw17/AS8810_IB_INT_T22-0004889.pdf',
    checkedDate: '2 November 2026',
    scope:
      'Named controls and ordinary release; not a universal tangle procedure.',
  },
  S2: {
    label: 'Dyson Airwrap i.d. manual',
    model: 'Dyson Airwrap i.d. UK user manual',
    market: 'UK',
    url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/dyson-airwrap-multi-styler/N308F_OUG_UK.pdf',
    checkedDate: '2 November 2026',
    scope:
      'Pre-styling, connected sequence, direction and release; not Co-anda2x controls.',
  },
  S3: {
    label: 'Dyson Supersonic wide-tooth-comb support',
    model: 'Dyson Supersonic wide-tooth comb',
    market: 'UK',
    url: 'https://www.dyson.co.uk/support/journey/tools/969748-05',
    checkedDate: '2 November 2026',
    scope:
      'Named comb format and role, not a complete fit list or operating sequence.',
  },
  S4: {
    label: 'Dyson Supersonic Flyaway attachment support',
    model: 'Dyson Supersonic Flyaway attachment 971618-02',
    market: 'UK',
    url: 'https://www.dyson.co.uk/support/journey/tools/971618-02.392913-01',
    checkedDate: '2 November 2026',
    scope:
      'Starting condition, movement and handling, not universal smoother instructions.',
  },
  S5: {
    label: 'Dyson Supersonic styling article',
    model: 'Dyson Supersonic styling article',
    market: 'US',
    url: 'https://www.dyson.com/discover/insights/hair/styles/how-to-style-your-hair-using-the-supersonic-hair-dryer',
    checkedDate: '2 November 2026',
    scope:
      'Attachment roles and separate-brush context, not a UK bundle record.',
  },
  S6: {
    label: 'Conair CD705/CD706 wand manual',
    model: 'Conair CD705/CD706 Double Ceramic wand',
    market: 'US',
    url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw4e1e1319/Instructional%20Booklets/CD706.pdf',
    checkedDate: '2 November 2026',
    scope: 'Dry-hair hand wrapping, not clamp operation.',
  },
} as const satisfies Readonly<Record<string, GuideSource>>;
export const airflowMethodEvidence: Readonly<
  Partial<Record<ArticleSlug, GuideEvidence>>
> = {
  [ArticleSlug.HowToUseARotatingHotAirBrush]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'An international AS8810 manual provides one named operating example. Section preparation and observation prompts are editorial guidance, without measured handling, drying-speed, tangle-rate or finish comparisons.',
    sources: [airflowSources.S1],
  },
  [ArticleSlug.HowToUseAirflowCurlingBarrels]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'One UK manufacturer manual documents a connected operating sequence. The wider preparation framework is editorial, without comparative curl retention, ease, temperature exposure or damage measurements.',
    sources: [airflowSources.S2],
  },
  [ArticleSlug.HowToUseAHairDryerFlyawayAttachment]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'One UK support page provides a named finishing example. The stage, route and endpoint checks are editorial guidance, without measured frizz reduction, single-pass performance or an assessment of hair damage.',
    sources: [airflowSources.S4],
  },
  [ArticleSlug.HairDryerCombAttachmentVsConcentrator]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'A UK maker support page and a separate US styling article describe attachment roles. The handling comparison is editorial, without a universal operating sequence, timed drying, pulling-force, breakage or finished-shape measurements.',
    sources: [airflowSources.S3, airflowSources.S5],
  },
  [ArticleSlug.AirflowCurlingBarrelVsCurlingWand]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'A UK airflow-system guide and a US wand manual establish two named mechanisms. The routine comparison is editorial, without controlled retention, speed, damage or ease testing.',
    sources: [airflowSources.S2, airflowSources.S6],
  },
  [ArticleSlug.RotatingVsFixedHotAirBrush]: {
    relatedOnly: true,
    sourceFormat: 'product-market',
    summary:
      'One manufacturer manual illustrates powered head rotation. The distinction between the moving parts and the choice framework are editorial guidance, without timed drying, handling scores or tangle-rate testing.',
    sources: [airflowSources.S1],
  },
};
export const airflowMethodRelated = {
  [ArticleSlug.HowToUseARotatingHotAirBrush]: [
    ArticleSlug.RotatingVsFixedHotAirBrush,
    ArticleSlug.HowToUseHotAirBrush,
    ArticleSlug.HowToSectionHairForStyling,
  ],
  [ArticleSlug.HowToUseAirflowCurlingBarrels]: [
    ArticleSlug.AirflowCurlingBarrelVsCurlingWand,
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.HowToBrushOutCurls,
  ],
  [ArticleSlug.HowToUseAHairDryerFlyawayAttachment]: [
    ArticleSlug.HowToUseHairDryerConcentratorNozzle,
    ArticleSlug.HairDryerCombAttachmentVsConcentrator,
    ArticleSlug.HowToBlowDryHair,
  ],
  [ArticleSlug.HairDryerCombAttachmentVsConcentrator]: [
    ArticleSlug.HairDryerDiffuserVsConcentrator,
    ArticleSlug.HowToUseHairDryerConcentratorNozzle,
    ArticleSlug.HowToBlowDryHair,
  ],
  [ArticleSlug.AirflowCurlingBarrelVsCurlingWand]: [
    ArticleSlug.HowToUseAirflowCurlingBarrels,
    ArticleSlug.HowToUseACurlingWand,
    ArticleSlug.AutomaticHairCurlerVsCurlingWand,
  ],
  [ArticleSlug.RotatingVsFixedHotAirBrush]: [
    ArticleSlug.HowToUseARotatingHotAirBrush,
    ArticleSlug.HowToUseHotAirBrush,
    ArticleSlug.HotAirBrushBarrelSizeGuide,
  ],
} as const;
export const airflowMethodCards: Readonly<
  Partial<
    Record<string, { readonly title: string; readonly description: string }>
  >
> = {
  [ArticleSlug.HowToUseARotatingHotAirBrush]: {
    title: '`/guides/how-to-use-a-rotating-hot-air-brush`',
    description: 'Hot-Air Brushes',
  },
  [ArticleSlug.HowToUseAirflowCurlingBarrels]: {
    title: '`/guides/how-to-use-airflow-curling-barrels`',
    description: 'Hot-Air Brushes',
  },
  [ArticleSlug.HowToUseAHairDryerFlyawayAttachment]: {
    title: '`/guides/how-to-use-a-hair-dryer-flyaway-attachment`',
    description: 'Hair Dryers',
  },
  [ArticleSlug.HairDryerCombAttachmentVsConcentrator]: {
    title: '`/guides/hair-dryer-comb-attachment-vs-concentrator`',
    description: 'Hair Dryers',
  },
  [ArticleSlug.AirflowCurlingBarrelVsCurlingWand]: {
    title: '`/guides/airflow-curling-barrel-vs-curling-wand`',
    description: 'Hot-Air Brushes',
  },
  [ArticleSlug.RotatingVsFixedHotAirBrush]: {
    title: 'Rotating vs fixed hot-air brush: what moves?',
    description:
      'Separate powered head movement, hand turning and a body that changes modes.',
  },
};
export const airflowMethodSlugs: readonly ArticleSlug[] = [
  ArticleSlug.HowToUseARotatingHotAirBrush,
  ArticleSlug.HowToUseAirflowCurlingBarrels,
  ArticleSlug.HowToUseAHairDryerFlyawayAttachment,
  ArticleSlug.HairDryerCombAttachmentVsConcentrator,
  ArticleSlug.AirflowCurlingBarrelVsCurlingWand,
  ArticleSlug.RotatingVsFixedHotAirBrush,
];
export const airflowMethodIncoming: Readonly<
  Partial<Record<ArticleSlug, readonly ArticleSlug[]>>
> = {
  [ArticleSlug.HowToUseARotatingHotAirBrush]: [
    ArticleSlug.HowToUseHotAirBrush,
    ArticleSlug.HotAirBrushVsStraighteningBrush,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.StylingToolTroubleshooting,
    ArticleSlug.RotatingVsFixedHotAirBrush,
  ],
  [ArticleSlug.HowToUseAirflowCurlingBarrels]: [
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.DysonAirwrapIdVsCoAnda2x,
    ArticleSlug.SharkGlamVsFlexstyle,
    ArticleSlug.HowToSectionHairForStyling,
    ArticleSlug.WhyCurlsFallOut,
    ArticleSlug.AutomaticHairCurlerVsCurlingWand,
    ArticleSlug.StylingToolTroubleshooting,
  ],
  [ArticleSlug.HowToUseAHairDryerFlyawayAttachment]: [
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.DysonSupersonicNuralVsSupersonicR,
    ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
    ArticleSlug.HowToBlowDryHair,
    ArticleSlug.StylingToolTroubleshooting,
  ],
  [ArticleSlug.HairDryerCombAttachmentVsConcentrator]: [
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
    ArticleSlug.HowToUseHairDryerConcentratorNozzle,
    ArticleSlug.HowToBlowDryHair,
    ArticleSlug.BestHairDryersThickHair,
  ],
  [ArticleSlug.AirflowCurlingBarrelVsCurlingWand]: [
    ArticleSlug.DysonAirwrapIdVsCoAnda2x,
    ArticleSlug.SharkGlamVsFlexstyle,
    ArticleSlug.WhyCurlsFallOut,
    ArticleSlug.AutomaticHairCurlerVsCurlingWand,
  ],
};
