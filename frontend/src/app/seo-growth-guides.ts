import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';

/**
 * 19 November 2026 growth batch: three new owners, existing-owner revisions and
 * their primary sources. Dyson rows reuse the research check recorded in the
 * implementation brief; their pages refused automated retrieval in this
 * implementation session, so their scope stays at family/listing level.
 */
export const seoGrowthSources = /* @__PURE__ */ (() =>
  ({
    P01: {
      label: 'Dyson UK Airwrap Co-anda2x compatibility FAQ',
      model: 'Dyson Airwrap Co-anda2x family page',
      market: 'UK',
      url: 'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-co-anda2x',
      checkedDate: '19 November 2026',
      scope:
        'Earlier Airwrap and Airwrap i.d. attachments are cross-compatible; Co-anda2x attachments and earlier attachments do not interchange in either direction. Family-level statement, not an exhaustive part catalogue.',
    },
    P02: {
      label: 'Dyson UK Airwrap i.d. Prussian blue/Rich copper listing',
      model: 'Dyson Airwrap i.d. Straight+Wavy, Prussian blue/Rich copper',
      market: 'UK',
      url: 'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-id/straight-wavy-prussian-blue-bright-copper',
      checkedDate: '19 November 2026',
      scope:
        'i.d. attachment FAQ within the i.d./earlier Airwrap family. Does not override the Co-anda2x exclusion.',
    },
    P03: {
      label: 'Dyson UK Airwrap Co-anda2x Plum/Copper listing',
      model: 'Dyson Airwrap Co-anda2x Straight+Wavy, Plum/Copper',
      market: 'UK',
      url: 'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-co-anda2x/straight-wavy-plum-copper',
      checkedDate: '19 November 2026',
      scope:
        'Selected box lists Air Straightener 2x; the same page retains older AirSmooth2x FAQ copy. Not a verified operating manual for either attachment.',
    },
    P04: {
      label: 'Bounce Curl Define EdgeLift brush',
      model: 'Bounce Curl Define EdgeLift styling brush',
      market: 'US (international shipping)',
      url: 'https://www.bouncecurl.com/products/define-styling-brush',
      checkedDate: '19 November 2026',
      scope:
        'Medium side-edge description, detangle-first directions, bristle wording and mild-shampoo cleaning. Outcome statements are maker claims.',
    },
    P05: {
      label: 'Bounce Curl Volume EdgeLift brush',
      model: 'Bounce Curl Volume EdgeLift brush',
      market: 'US (international shipping)',
      url: 'https://www.bouncecurl.com/products/volume-edge-lift-brush',
      checkedDate: '19 November 2026',
      scope:
        'Smaller side-edge spacing description, pre-detangling directions and cleaning. No measured spacing, volume or tension.',
    },
    P06: {
      label: 'Bounce Curl brush comparison',
      model: 'Bounce Curl EdgeLift range comparison',
      market: 'US (international shipping)',
      url: 'https://www.bouncecurl.com/blogs/news/bounce-curl-brush-comparison',
      checkedDate: '19 November 2026',
      scope:
        'Maker chart: Define and Volume high tension; Slick-Dense medium; Slick-Flex low. Medium versus small curl-group descriptions. Not independent testing.',
    },
    P07: {
      label: 'Mason Pearson choose-a-brush size table',
      model: 'Mason Pearson hairbrush sizes',
      market: 'International (UK maker)',
      url: 'https://masonpearson.com/choose-a-brush/',
      checkedDate: '19 November 2026',
      scope:
        'Published length, width and head length in inches and centimetres for Large, Medium, Handy and Pocket. Military head values are published as 0.00 and are not used.',
    },
    P08: {
      label: 'Mason Pearson bristle and nylon hairbrushes',
      model: 'Mason Pearson BN1, BN2, BN3 and BN4',
      market: 'International (UK maker)',
      url: 'https://masonpearson.com/bristle-nylon-hairbrushes/',
      checkedDate: '19 November 2026',
      scope:
        'Model names and ring counts; family FAQ advises against wet-hair use and says to turn bristles away from heat when heat styling.',
    },
    P09: {
      label: 'Mason Pearson Handy hairbrushes',
      model: 'Mason Pearson B3, SB3 and BN3',
      market: 'International (UK maker)',
      url: 'https://masonpearson.com/handy-hairbrushes/',
      checkedDate: '19 November 2026',
      scope:
        'Six-ring Handy options: stiff boar, fine boar, and boar with nylon. States the Handy is sold with a cleaning brush.',
    },
    P10: {
      label: 'Mason Pearson Pocket hairbrushes',
      model: 'Mason Pearson B4, SB4, CB4, BN4 and N4',
      market: 'International (UK maker)',
      url: 'https://masonpearson.com/pocket-hairbrushes/',
      checkedDate: '19 November 2026',
      scope:
        'Five-ring Pocket options; states the Pocket is not sold with a cleaning brush.',
    },
    P11: {
      label: 'Tangle Teezer Ultimate Detangler Fine & Fragile',
      model: 'Tangle Teezer handled Ultimate Detangler Fine & Fragile',
      market: 'UK',
      url: 'https://tangleteezer.com/products/the-ultimate-detangler-fine-fragile',
      checkedDate: '25 October 2026',
      scope:
        'Softer-tooth description relative to the standard model and keep-away-from-heat restriction; no independent breakage result.',
    },
    P12: {
      label: 'Denman UK D3 deep-clean instructions',
      model: 'Denman D3 Original Styler',
      market: 'UK',
      url: 'https://denmanbrush.com/blogs/news/d3-original-styler-7-row-brush-of-the-month',
      checkedDate: '19 November 2026',
      scope:
        'Slide out the pad, remove pin strips, wash in warm soapy water, rinse, dry and reassemble with the shorter rows outside. D3 only.',
    },
    P16: {
      label: 'National Energy Action appliance-cost explanation',
      model: 'Electricity cost arithmetic',
      market: 'UK',
      url: 'https://www.nea.org.uk/wp-content/uploads/2022/04/How-much-do-my-appliances-cost-to-use-October-2022.pdf',
      checkedDate: '19 November 2026',
      scope:
        'Watts, time and unit-rate method. Its October 2022 tariff is historical and is not used as a default.',
    },
    OG1: {
      label: 'Olivia Garden Ceramic + ion Thermal Round',
      model: 'Olivia Garden Ceramic + ion Thermal Round CI-35',
      market: 'US',
      url: 'https://store.oliviagarden.com/products/ceramic-ion-thermal',
      checkedDate: '11 October 2026',
      scope:
        'Manual round brush for use with a separate dryer; 1 3/8-inch maker label, not a measured outside-bristle diameter.',
    },
  }) as const satisfies Record<string, GuideSource>)();

const S = seoGrowthSources;

export const seoGrowthSlugs = [
  ArticleSlug.DysonAirwrapAttachmentCompatibility,
  ArticleSlug.BounceCurlDefineVsVolumeEdgelift,
  ArticleSlug.MasonPearsonBrushSizeAndBristleGuide,
] as const;

/** Existing owners revised substantively in this batch. */
export const seoGrowthUpdatedSlugs = [
  ArticleSlug.HairDryerWattageGuide,
  ArticleSlug.HairDryerChooser,
  ArticleSlug.BestHairDryerForShortHair,
  ArticleSlug.BestTravelHairDryers,
  ArticleSlug.HairDryerDiffuserCompatibility,
  ArticleSlug.BestBrushesFineHair,
  ArticleSlug.BestBrushesCurlyHair,
  ArticleSlug.BestHotAirBrushesFineHair,
  ArticleSlug.HotAirBrushVsCurlingIron,
  ArticleSlug.RoundBrushSizeGuide,
  ArticleSlug.HowToCleanAHairBrush,
  ArticleSlug.DysonAirwrapIdVsCoAnda2x,
] as const;

export const seoGrowthRelated: Readonly<Record<string, readonly string[]>> = {
  [ArticleSlug.DysonAirwrapAttachmentCompatibility]: [
    ArticleSlug.DysonAirwrapIdVsCoAnda2x,
    ArticleSlug.HowToChooseMultiStylerAttachments,
    ArticleSlug.DysonAirwrapVsSharkFlexstyle,
  ],
  [ArticleSlug.BounceCurlDefineVsVolumeEdgelift]: [
    ArticleSlug.CurlDefiningBrushVsDetanglingBrush,
    ArticleSlug.BestBrushesCurlyHair,
    ArticleSlug.HowToSectionHairForStyling,
  ],
  [ArticleSlug.MasonPearsonBrushSizeAndBristleGuide]: [
    ArticleSlug.BoarBristleBrushGuide,
    ArticleSlug.BoarBristleVsNylonBrush,
    ArticleSlug.HowToCleanABoarBristleHairbrush,
  ],
};

const newGuideSummary =
  'Manufacturer documentation and editorial task analysis. CombReport has not measured fit, handling, styling results or durability for these products.';

export const seoGrowthEvidence: Readonly<Record<string, GuideEvidence>> =
  /* @__PURE__ */ (() => ({
    [ArticleSlug.DysonAirwrapAttachmentCompatibility]: {
      summary:
        'Dyson family-level compatibility statements and selected UK listings. Not an exhaustive part catalogue; CombReport has not physically fitted attachments or tested connected features.',
      sources: [S.P01, S.P02, S.P03],
    },
    [ArticleSlug.BounceCurlDefineVsVolumeEdgelift]: {
      summary: newGuideSummary,
      sources: [S.P04, S.P05, S.P06],
    },
    [ArticleSlug.MasonPearsonBrushSizeAndBristleGuide]: {
      summary:
        "Mason Pearson's published size table and family pages. Dimensions are the maker's approximate figures, not CombReport measurements of a specimen.",
      sources: [S.P07, S.P08, S.P09, S.P10],
    },
  }))();

/** Sources added to existing owners; merged by URL with their earlier records. */
export const seoGrowthSupplementarySources: Readonly<
  Partial<Record<string, readonly GuideSource[]>>
> = /* @__PURE__ */ (() => ({
  [ArticleSlug.HairDryerWattageGuide]: [S.P16],
  [ArticleSlug.BestBrushesFineHair]: [S.P11, S.P09, S.OG1],
  [ArticleSlug.HowToCleanAHairBrush]: [S.P12],
  [ArticleSlug.DysonAirwrapIdVsCoAnda2x]: [S.P01, S.P03],
  [ArticleSlug.BestBrushesCurlyHair]: [S.P06],
}))();

export const seoGrowthAliases: Readonly<Record<string, readonly string[]>> = {
  [ArticleSlug.DysonAirwrapAttachmentCompatibility]: [
    'Airwrap attachment compatibility',
    'old Airwrap attachments fit Co-anda2x',
    'Airwrap i.d. attachments fit original',
    'Co-anda2x attachments older Airwrap',
    'Air Straightener 2x vs AirSmooth2x',
  ],
  [ArticleSlug.BounceCurlDefineVsVolumeEdgelift]: [
    'Bounce Curl Define vs Volume',
    'which Bounce Curl brush',
    'EdgeLift brush difference',
    'Slick-Flex Slick-Dense',
  ],
  [ArticleSlug.MasonPearsonBrushSizeAndBristleGuide]: [
    'Mason Pearson size guide',
    'Mason Pearson Handy vs Junior',
    'Mason Pearson BN2 vs BN3',
    'Mason Pearson B3 vs BN3',
    'Mason Pearson Pocket vs Handy',
    'Mason Pearson sensitive vs regular',
  ],
  [ArticleSlug.HairDryerWattageGuide]: [
    'hair dryer electricity cost',
    'hair dryer running cost calculator',
    '1600 vs 2000 watts',
    'watts vs kWh',
  ],
};
