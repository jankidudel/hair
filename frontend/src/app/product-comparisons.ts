import { ArticleSlug } from './article-slug';

/** Shared model- and market-scoped source of product facts for product-facing surfaces. */
export const ProductCategory = {
  HairDryer: 'hair-dryer',
  MultiStyler: 'multi-styler',
  HotAirBrush: 'hot-air-brush',
  HairBrush: 'hair-brush',
  FlatIron: 'flat-iron',
  CurlingIron: 'curling-iron',
  CurlingWand: 'curling-wand',
} as const;
export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];
export type PriceTier = 'entry' | 'mid-range' | 'premium';
export type EvidenceStatus =
  'specification-researched' | 'limited-specification';
export interface VerifiedFact {
  readonly label: string;
  readonly value: string;
  readonly sourceUrl: string;
  readonly verifiedAt: string;
}
export interface ProductProfile {
  readonly slug: string;
  readonly market: 'US' | 'UK';
  readonly name: string;
  /** Exact public model/listing identifier when the evidence record establishes one. */
  readonly modelIdentifier?: string;
  /** Named generation or model family; absent means the generation is unresolved. */
  readonly generation?: string;
  readonly brand: string;
  readonly category: ProductCategory;
  readonly subtype: string;
  readonly imageAlt: string;
  readonly priceTier: PriceTier;
  readonly bestFor: readonly string[];
  readonly notIdealFor: readonly string[];
  readonly verifiedFacts: readonly VerifiedFact[];
  readonly officialProductUrl: string;
  readonly supportUrl?: string;
  readonly verifiedAt: string;
  readonly availability: 'available' | 'availability-to-check';
  readonly evidenceStatus: EvidenceStatus;
  readonly conflictNote?: string;
  readonly relatedGuideSlugs: readonly string[];
  readonly comparisonStatus: 'specification-led';
  /** Direct-heat details are deliberately optional: unknown is never a positive match. */
  readonly plateWidthInches?: number;
  readonly barrelDiameterInches?: number;
  readonly heatControl?: 'fixed' | 'presets' | 'adjustable' | 'unknown';
  readonly dualVoltage?: boolean;
  readonly mechanism?: 'clamp' | 'clipless' | 'interchangeable' | 'automatic';
}
export interface CanonicalComparison {
  readonly slug: string;
  readonly path: string;
  readonly productSlugs: readonly [string, string];
  readonly guideSlug: string;
}
const checked = '2026-09-20';
const batchEightChecked = '2026-10-08';
const batchNineChecked = '2026-10-10';
const batchTenChecked = '2026-10-11';
const fact = (
  label: string,
  value: string,
  sourceUrl: string,
): VerifiedFact => ({ label, value, sourceUrl, verifiedAt: checked });
const product = (
  input: Omit<ProductProfile, 'verifiedAt' | 'comparisonStatus' | 'market'> & {
    readonly verifiedAt?: string;
    readonly market?: ProductProfile['market'];
  },
): ProductProfile => ({
  ...input,
  market: input.market ?? 'US',
  verifiedAt: input.verifiedAt ?? checked,
  comparisonStatus: 'specification-led',
});
const batchEightFact = (
  label: string,
  value: string,
  sourceUrl: string,
): VerifiedFact => ({ label, value, sourceUrl, verifiedAt: batchEightChecked });

const batchNineFact = (
  label: string,
  value: string,
  sourceUrl: string,
): VerifiedFact => ({
  label,
  value,
  sourceUrl,
  verifiedAt: batchNineChecked,
});

const ghdExactFlatIronSource: Readonly<Record<string, string>> = {
  'ghd-chronos':
    'https://www.ghdhair.com/us/flat-irons/ghd-chronos-black-flat-iron-p-650',
  'ghd-platinum-plus':
    'https://www.ghdhair.com/us/flat-irons/ghd-platinum-plus-black-flat-iron-p-453',
  'ghd-gold': 'https://www.ghdhair.com/us/flat-irons/ghd-gold-p-435',
  'ghd-chronos-max':
    'https://www.ghdhair.com/us/flat-irons/ghd-chronos-max-black-flat-iron-p-689',
  'ghd-mini':
    'https://www.ghdhair.com/us/flat-irons/ghd-mini-black-flat-iron-p-662',
  'ghd-unplugged':
    'https://www.ghdhair.com/us/flat-irons/ghd-unplugged-cordless-flat-iron-black-p-552',
};
const ghdExactFlatIronIdentifier: Readonly<Record<string, string>> = {
  'ghd-chronos': 'p-650, US black 1-inch listing',
  'ghd-platinum-plus': 'p-453, US black 1-inch listing',
  'ghd-gold': 'p-435, US black 1-inch listing',
  'ghd-chronos-max': 'p-689, US black 2-inch listing',
  'ghd-mini': 'p-662, US black 0.60-inch listing',
  'ghd-unplugged': 'p-552, US black 0.88-inch listing',
};

export const productProfiles: readonly ProductProfile[] = [
  ...[
    {
      slug: 'denman-d3-original-7-row-uk',
      name: 'Denman D3 The Original Curl Definer & Styler, 7 row',
      url: 'https://denmanbrush.com/products/d3-original-styler-7-row',
      rows: 'Seven rows; maker describes wet curl definition and precision blow-drying',
      guide: ArticleSlug.DenmanD3VsD4,
    },
    {
      slug: 'denman-d4-original-9-row-uk',
      name: 'Denman D4 Original 9 Row Styler',
      url: 'https://denmanbrush.com/products/d4-original-styler-9-row',
      rows: 'Nine rows; maker describes wet curl definition and long-hair shape',
      guide: ArticleSlug.DenmanD3VsD4,
    },
  ].map((brush) =>
    product({
      slug: brush.slug,
      market: 'UK',
      name: brush.name,
      modelIdentifier: brush.slug.startsWith('denman-d3')
        ? 'D3, 7-row UK listing'
        : 'D4, 9-row UK listing',
      generation: brush.slug.startsWith('denman-d3') ? 'D3' : 'D4',
      brand: 'Denman',
      category: ProductCategory.HairBrush,
      subtype: 'manual styling-row brush',
      imageAlt: brush.name,
      priceTier: 'entry',
      bestFor: ['comparing exact row layouts for styling'],
      notIdealFor: [
        'claiming row count proves detangling speed or curl results',
      ],
      officialProductUrl: brush.url,
      availability: 'availability-to-check',
      evidenceStatus: 'specification-researched',
      verifiedAt: batchTenChecked,
      verifiedFacts: [
        {
          label: 'Rows and maker-described use',
          value: brush.rows,
          sourceUrl: brush.url,
          verifiedAt: batchTenChecked,
        },
      ],
      relatedGuideSlugs: [
        brush.guide,
        ArticleSlug.CurlDefiningBrushVsDetanglingBrush,
      ],
    }),
  ),
  ...[
    {
      slug: 'olivia-garden-ceramic-ion-thermal-ci-35-us',
      name: 'Olivia Garden Ceramic + ion Thermal Round CI-35',
      url: 'https://store.oliviagarden.com/products/ceramic-ion-thermal',
      label:
        'CI-35 is labelled 1 3/8 inches by the maker; barrel and bristle diameters are shown separately in an image',
    },
    {
      slug: 'olivia-garden-nanothermic-round-thermal-nt-34-us',
      name: 'Olivia Garden NanoThermic Round Thermal NT-34',
      url: 'https://store.oliviagarden.com/products/nanothermic-round-thermal',
      label:
        'NT-34 is labelled 1 1/4 inches by the maker; barrel and bristle diameters are shown separately in an image',
    },
  ].map((brush) =>
    product({
      slug: brush.slug,
      market: 'US',
      name: brush.name,
      brand: 'Olivia Garden',
      category: ProductCategory.HairBrush,
      subtype: 'manual thermal round brush',
      imageAlt: brush.name,
      priceTier: 'mid-range',
      bestFor: ['comparing the exact nominal size and manual-brush layout'],
      notIdealFor: [
        'treating the model suffix as a measured millimetre diameter',
      ],
      officialProductUrl: brush.url,
      availability: 'availability-to-check',
      evidenceStatus: 'specification-researched',
      verifiedAt: batchTenChecked,
      verifiedFacts: [
        {
          label: 'Nominal label and diameter definition',
          value: brush.label,
          sourceUrl: brush.url,
          verifiedAt: batchTenChecked,
        },
      ],
      relatedGuideSlugs: [
        ArticleSlug.OliviaGardenCeramicIonVsNanothermic,
        ArticleSlug.RoundBrushSizeGuide,
      ],
    }),
  ),
  product({
    slug: 'dyson-supersonic-nural',
    name: 'Dyson Supersonic Nural™ hair dryer',
    modelIdentifier: 'Supersonic Nural, current US listing',
    generation: 'Supersonic Nural',
    brand: 'Dyson',
    category: ProductCategory.HairDryer,
    subtype: 'full-size dryer',
    imageAlt: 'Dyson Supersonic Nural hair dryer',
    priceTier: 'premium',
    bestFor: [
      'documented diffuser and wide-tooth-comb attachments',
      'separate heat and airflow controls',
    ],
    notIdealFor: ['international use without checking the exact model voltage'],
    officialProductUrl:
      'https://www.dyson.com/hair-care/hair-dryers/supersonic-nural',
    supportUrl:
      'https://www.dyson.com/support/hair-care/hair-dryers/supersonic-nural',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedAt: batchEightChecked,
    verifiedFacts: [
      batchEightFact(
        'Styling features',
        'Attachment learning remembers the last-used settings; Pause detect reduces heat and airflow when set down',
        'https://www.dyson.com/hair-care/hair-dryers/supersonic-nural',
      ),
      batchEightFact(
        'Attachments',
        'Wave+Curl diffuser and wide-tooth comb are shown for this Nural range',
        'https://www.dyson.com/hair-care/hair-dryers/supersonic-nural',
      ),
      batchEightFact(
        'Warranty',
        '2-year limited warranty stated',
        'https://www.dyson.com/hair-care/hair-dryers/supersonic-nural',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
      ArticleSlug.BestHairDryersCurlyHair,
      ArticleSlug.HairDryerChooser,
    ],
  }),
  product({
    slug: 'shark-speedstyle-pro',
    name: 'Shark SpeedStyle™ Pro Hair Dryer System (HD731)',
    modelIdentifier: 'HD731',
    generation: 'SpeedStyle Pro HD731',
    brand: 'Shark',
    category: ProductCategory.HairDryer,
    subtype: 'full-size dryer',
    imageAlt: 'Shark SpeedStyle Pro hair dryer',
    priceTier: 'premium',
    bestFor: [
      'a dedicated dryer with an included finishing tool, brush and concentrator',
    ],
    notIdealFor: ['buyers expecting a diffuser in the HD731 box'],
    officialProductUrl:
      'https://www.sharkninja.com/shark-speedstyle-pro-hair-dryer-straight-wavy/HD731.html',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedAt: batchEightChecked,
    verifiedFacts: [
      batchEightFact(
        'Electrical specification',
        'HD731: 120 V; 1,750 W',
        'https://www.sharkninja.com/shark-speedstyle-pro-hair-dryer-straight-wavy/HD731.html',
      ),
      batchEightFact(
        'In the box',
        'HD731: FrizzFighter Finishing Tool, QuickSmooth Brush and Turbo Concentrator',
        'https://www.sharkninja.com/shark-speedstyle-pro-hair-dryer-straight-wavy/HD731.html',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
      ArticleSlug.HairDryerChooser,
    ],
  }),
  product({
    slug: 'conair-digitalaire-2',
    name: 'InfinitiPRO by Conair® DigitalAIRE® 2.0 (manual models 1000/1002)',
    brand: 'Conair',
    category: ProductCategory.HairDryer,
    subtype: 'dual-voltage dryer',
    imageAlt: 'Conair DigitalAIRE 2.0 hair dryer',
    priceTier: 'mid-range',
    bestFor: [
      'international travel with documented automatic dual voltage',
      'a folding handle and diffuser',
    ],
    notIdealFor: ['a buyer who does not need travel features'],
    officialProductUrl: 'https://www.conair.com/digitalaire2.html',
    supportUrl:
      'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw3c012f03/Instructional%20Booklets/1000.pdf',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedAt: batchEightChecked,
    verifiedFacts: [
      batchEightFact(
        'Manual scope',
        'Conair identifies models 1000/1002 in the DigitalAIRE 2.0 instruction booklet; confirm the label on the unit offered',
        'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw3c012f03/Instructional%20Booklets/1000.pdf',
      ),
      batchEightFact(
        'Voltage',
        'Automatic dual voltage stated',
        'https://www.conair.com/digitalaire2.html',
      ),
      batchEightFact(
        'Controls',
        '4 heat and 4 speed settings plus cold shot stated',
        'https://www.conair.com/digitalaire2.html',
      ),
      batchEightFact(
        'Attachments',
        'Concentrator, diffuser and Frizz Defense attachment stated',
        'https://www.conair.com/digitalaire2.html',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BestTravelHairDryers,
      ArticleSlug.BestHairDryersCurlyHair,
    ],
  }),
  product({
    slug: 'conair-smoothwrap',
    name: 'InfinitiPRO by Conair® SmoothWrap Hair Dryer (910P)',
    brand: 'Conair',
    category: ProductCategory.HairDryer,
    subtype: 'full-size dryer',
    imageAlt: 'Conair Smoothwrap hair dryer',
    priceTier: 'entry',
    bestFor: ['a simple dryer with documented heat and speed controls'],
    notIdealFor: [
      'international travel; the manual describes standard 110–125 V use',
    ],
    officialProductUrl:
      'https://www.conair.com/smoothwrap-hair-dryer/910p.html',
    supportUrl:
      'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwe0958d46/Instructional%20Booklets/910P.pdf',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedAt: batchEightChecked,
    verifiedFacts: [
      batchEightFact(
        'Power and controls',
        '910P: 1,875 W; six heat and speed combinations; cool shot',
        'https://www.conair.com/smoothwrap-hair-dryer/910p.html',
      ),
      batchEightFact(
        'Attachments',
        '910P includes a concentrator and diffuser',
        'https://www.conair.com/smoothwrap-hair-dryer/910p.html',
      ),
      batchEightFact(
        'Electrical scope',
        'The 910P instruction booklet states 60 Hz AC and 110–125 V for this standard dryer',
        'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwe0958d46/Instructional%20Booklets/910P.pdf',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BestHairDryersFineHair,
      ArticleSlug.HairDryerChooser,
    ],
  }),
  product({
    slug: 'dyson-supersonic-travel',
    name: 'Dyson Supersonic™ Travel hair dryer',
    brand: 'Dyson',
    category: ProductCategory.HairDryer,
    subtype: 'compact travel dryer',
    imageAlt: 'Dyson Supersonic Travel hair dryer',
    priceTier: 'premium',
    bestFor: ['a compact dedicated travel dryer'],
    notIdealFor: ['assuming a plug adapter changes voltage'],
    officialProductUrl: 'https://www.dyson.com/hair-care/hair-dryers',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Travel format',
        '32% smaller and 25% lighter than the original Supersonic, according to Dyson',
        'https://www.dyson.com/hair-care/hair-dryers',
      ),
      fact(
        'Attachment compatibility',
        'Compatible with Supersonic and Nural attachments, except Supersonic r attachments',
        'https://www.dyson.com/hair-care/hair-dryers',
      ),
    ],
    relatedGuideSlugs: [ArticleSlug.BestTravelHairDryers],
  }),
  product({
    slug: 'revlon-one-step-volumizer-plus',
    name: 'Revlon One-Step™ Volumizer PLUS',
    brand: 'Revlon',
    category: ProductCategory.HotAirBrush,
    subtype: 'detachable oval hot-air brush',
    imageAlt: 'Revlon One-Step Volumizer Plus hot-air brush',
    priceTier: 'mid-range',
    bestFor: [
      'a detachable 2.4-inch oval head',
      'documented low, medium, high and cool settings',
    ],
    notIdealFor: [
      'international travel without confirming the appliance rating',
    ],
    officialProductUrl:
      'https://www.revlonhairtools.com/curling_irons/one-step-volumizer-plus/',
    verifiedAt: batchNineChecked,
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      batchNineFact(
        'Head and controls',
        '2.4-inch oval head; low, medium, high and cool settings',
        'https://www.revlonhairtools.com/curling_irons/one-step-volumizer-plus/',
      ),
      batchNineFact(
        'Warranty',
        '4-year limited warranty stated',
        'https://www.revlonhairtools.com/curling_irons/one-step-volumizer-plus/',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BestHotAirBrushesFineHair,
      ArticleSlug.BestHotAirBrushes,
      ArticleSlug.RevlonOneStepVolumizerVsPlus,
    ],
  }),
  product({
    slug: 'revlon-salon-one-step-volumizer-us',
    name: 'Revlon Salon One-Step Hair Dryer and Volumizer (current US listing)',
    brand: 'Revlon',
    category: ProductCategory.HotAirBrush,
    subtype: 'fixed oval hot-air brush',
    imageAlt: 'Revlon Salon One-Step Hair Dryer and Volumizer',
    priceTier: 'mid-range',
    bestFor: ['a non-detachable oval brush with three documented settings'],
    notIdealFor: ['someone who needs a detachable head or a medium setting'],
    officialProductUrl:
      'https://www.revlonhairtools.com/dryers/salon-one-step-hair-dryer-and-volumizer/',
    verifiedAt: batchNineChecked,
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      batchNineFact(
        'US model scope',
        'Current Salon One-Step Hair Dryer and Volumizer listing; non-detachable brush head',
        'https://www.revlonhairtools.com/dryers/salon-one-step-hair-dryer-and-volumizer/',
      ),
      batchNineFact(
        'US controls and rating',
        'Three heat/speed settings; 1,100 W; designed for 120 V US outlets only',
        'https://www.revlonhairtools.com/dryers/salon-one-step-hair-dryer-and-volumizer/',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.RevlonOneStepVolumizerVsPlus,
      ArticleSlug.BestHotAirBrushes,
    ],
  }),
  product({
    slug: 'conair-bc95',
    name: 'InfinitiPRO by Conair® 2-in-1 Wet-or-Dry Hot Air Styler',
    brand: 'Conair',
    category: ProductCategory.HotAirBrush,
    subtype: 'oval wet-or-dry hot-air styler',
    imageAlt: 'Conair Wet-or-Dry Hot Air Styler',
    priceTier: 'mid-range',
    bestFor: ['a large oval barrel and wet/dry mode switch'],
    notIdealFor: ['someone who needs a small round barrel'],
    officialProductUrl:
      'https://www.conair.com/2-in-one-wet-or-dry-hot-air-styler/BC95.html?lang=en_US',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Power and design',
        '1,000 W; large oval barrel; Wet mode and Dry mode stated',
        'https://www.conair.com/2-in-one-wet-or-dry-hot-air-styler/BC95.html?lang=en_US',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BestHotAirBrushesFineHair,
      ArticleSlug.BestHotAirBrushes,
    ],
  }),
  product({
    slug: 'conair-bc200',
    name: 'InfinitiPRO by Conair® Hot Air Paddle Brush Styler',
    brand: 'Conair',
    category: ProductCategory.HotAirBrush,
    subtype: 'paddle hot-air brush',
    imageAlt: 'Conair Hot Air Paddle Brush Styler',
    priceTier: 'entry',
    bestFor: [
      'a paddle-shaped styling surface',
      'three documented heat/speed settings',
    ],
    notIdealFor: ['a routine that needs a round barrel'],
    officialProductUrl: 'https://www.conair.com/',
    supportUrl:
      'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw298835f7/Instructional%20Booklets/BC200N.pdf',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Controls',
        'Low, high and cool settings stated',
        'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw298835f7/Instructional%20Booklets/BC200N.pdf',
      ),
      fact(
        'Bristles',
        'Nylon, silicone and detangling bristles stated',
        'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw298835f7/Instructional%20Booklets/BC200N.pdf',
      ),
    ],
    relatedGuideSlugs: [ArticleSlug.BestHotAirBrushesFineHair],
  }),
  product({
    slug: 'dyson-airwrap-id-straight-wavy',
    name: 'Dyson Airwrap i.d.™ multi-styler and dryer Straight+Wavy',
    modelIdentifier: 'Airwrap i.d. Straight+Wavy, US listing',
    generation: 'Airwrap i.d.',
    brand: 'Dyson',
    category: ProductCategory.MultiStyler,
    subtype: 'multi-styler and dryer',
    imageAlt: 'Dyson Airwrap i.d. Straight+Wavy multi-styler and dryer',
    priceTier: 'premium',
    bestFor: [
      'checking the exact US Airwrap i.d. set and compatible attachments',
    ],
    notIdealFor: [
      'assuming every Airwrap i.d. variant includes the same attachments',
    ],
    officialProductUrl:
      'https://www.dyson.com/hair-care/hair-stylers/airwrap-id/straight-wavy-plum-copper',
    supportUrl:
      'https://www.dyson.com/support/hair-care/hair-stylers/airwrap-id',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedAt: batchEightChecked,
    verifiedFacts: [
      batchEightFact(
        'Model scope',
        'Airwrap i.d. Straight+Wavy, Plum/Copper, US page: 120 V; 1,300 W',
        'https://www.dyson.com/hair-care/hair-stylers/airwrap-id/straight-wavy-plum-copper',
      ),
      batchEightFact(
        'In the box',
        'Conical and 1.6-inch Airwrap barrels, Large Round Volumizing Brush, Dryer+Flyaway smoother, Fast Dryer, Anti Snag Loop Brush, filter cleaning brush and case',
        'https://www.dyson.com/hair-care/hair-stylers/airwrap-id/straight-wavy-plum-copper',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.DysonAirwrapVsSharkFlexstyle,
      ArticleSlug.BestHotAirBrushes,
    ],
  }),
  product({
    slug: 'shark-flexstyle-hd430',
    name: 'Shark FlexStyle® 4-in-1 Air Styling & Drying System (HD430)',
    modelIdentifier: 'HD430',
    generation: 'FlexStyle HD430',
    brand: 'Shark',
    category: ProductCategory.MultiStyler,
    subtype: 'multi-styler and dryer',
    imageAlt: 'Shark FlexStyle HD430 air styling and drying system',
    priceTier: 'mid-range',
    bestFor: ['a listed five-piece HD430 in-box set'],
    notIdealFor: ['assuming separately sold accessories are included'],
    officialProductUrl:
      'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedAt: batchEightChecked,
    verifiedFacts: [
      batchEightFact(
        'Electrical specification',
        '120 V; 1,600 W',
        'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
      ),
      batchEightFact(
        'In the box',
        'Main unit, two 1.25-inch Auto-Wrap Curlers, Oval Brush, Paddle Brush and Styling Concentrator',
        'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
      ),
      batchEightFact(
        'Warranty',
        '2-year limited warranty stated',
        'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.DysonAirwrapVsSharkFlexstyle,
      ArticleSlug.BestHotAirBrushes,
      ArticleSlug.HotAirBrushVsHairDryer,
    ],
  }),
  product({
    slug: 'babyliss-big-hair-deluxe-as970u-uk',
    market: 'UK',
    name: 'BaByliss Big Hair Deluxe AS970U',
    brand: 'BaByliss',
    category: ProductCategory.HotAirBrush,
    subtype: 'rotating and fixed attachment hot-air styler',
    imageAlt: 'BaByliss Big Hair Deluxe AS970U',
    priceTier: 'mid-range',
    bestFor: ['a documented rotating 50 mm brush alongside fixed attachments'],
    notIdealFor: ['assuming every attachment is powered to rotate'],
    officialProductUrl:
      'https://www.babyliss.com/uk-en/big-hair-deluxe-AS970U.html',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedAt: batchNineChecked,
    verifiedFacts: [
      batchNineFact(
        'Attachment movement',
        '50 mm rotating brush; 38 mm fixed brush also listed',
        'https://www.babyliss.com/uk-en/big-hair-deluxe-AS970U.html',
      ),
      batchNineFact(
        'Controls',
        'Two temperature settings plus cool listed',
        'https://www.babyliss.com/uk-en/big-hair-deluxe-AS970U.html',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.RotatingVsFixedHotAirBrush,
      ArticleSlug.HotAirBrushBarrelSizeGuide,
    ],
  }),
  product({
    slug: 'tangle-teezer-ultimate-detangler-matte-uk',
    market: 'UK',
    name: 'Tangle Teezer The Ultimate Detangler Matte',
    modelIdentifier: 'Ultimate Detangler Matte, UK listing',
    generation: 'Ultimate Detangler Matte',
    brand: 'Tangle Teezer',
    category: ProductCategory.HairBrush,
    subtype: 'two-tier detangling brush',
    imageAlt: 'Tangle Teezer Ultimate Detangler Matte brush',
    priceTier: 'entry',
    bestFor: ['two-tier teeth and matte textured grip'],
    notIdealFor: [
      'heat styling; the exact maker page says keep this brush away from heat',
    ],
    officialProductUrl:
      'https://tangleteezer.com/products/the-ultimate-detangler-matte',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedAt: batchNineChecked,
    verifiedFacts: [
      {
        label: 'UK grip and teeth',
        value: 'Matte textured handle and two-tier teeth',
        sourceUrl:
          'https://tangleteezer.com/products/the-ultimate-detangler-matte',
        verifiedAt: batchTenChecked,
      },
      batchNineFact(
        'Construction and use',
        'Long and short teeth; maker describes use on shower-fresh hair',
        'https://tangleteezer.com/products/the-ultimate-detangler-matte',
      ),
      batchNineFact(
        'Care and restriction',
        'Remove hair, wash with warm water and mild soap or shampoo, air dry; keep away from heat',
        'https://tangleteezer.com/products/the-ultimate-detangler-matte',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.TangleTeezerVsWetBrushOriginal,
      ArticleSlug.CanYouUseDetanglingBrushForBlowDrying,
    ],
  }),
  product({
    slug: 'tangle-teezer-ultimate-detangler',
    name: 'Tangle Teezer The Ultimate Detangler',
    brand: 'Tangle Teezer',
    category: ProductCategory.HairBrush,
    subtype: 'handled wet-use detangling brush',
    imageAlt: 'Tangle Teezer Ultimate Detangler brush',
    priceTier: 'entry',
    bestFor: [
      'wet hair and shower routines',
      'a handled brush with two-tier teeth',
    ],
    notIdealFor: [
      'heat styling; the brand limits its Blow-Styling range to low-to-cool heat',
    ],
    officialProductUrl:
      'https://us.tangleteezer.com/products/the-ultimate-detangler',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Wet-use direction',
        'Designed for wet hair and shower use',
        'https://us.tangleteezer.com/products/the-ultimate-detangler',
      ),
      fact(
        'Care',
        'Remove hair, rinse with warm water and mild soap or shampoo as needed; air dry',
        'https://us.tangleteezer.com/products/the-ultimate-detangler',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BestDetanglingBrushes,
      ArticleSlug.BestBrushesCurlyHair,
    ],
  }),
  product({
    slug: 'wet-brush-original-detangler',
    name: 'Wet Brush Original Detangler (Frost Black)',
    modelIdentifier: 'Original Detangler Frost Black, US listing',
    generation: 'Original Detangler Frost Black',
    brand: 'Wet Brush',
    category: ProductCategory.HairBrush,
    subtype: 'flexible-bristle detangling brush',
    imageAlt: 'Wet Brush Original Detangler',
    priceTier: 'entry',
    bestFor: ['a wet- or dry-use brush with flexible IntelliFlex bristles'],
    notIdealFor: [
      'assuming care directions without the exact package documentation',
    ],
    officialProductUrl:
      'https://wetbrush.com/products/original-detangler-frost-black',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedAt: batchNineChecked,
    verifiedFacts: [
      {
        label: 'US grip and pins',
        value: 'Ergonomic handle and IntelliFlex bristles',
        sourceUrl:
          'https://wetbrush.com/products/original-detangler-frost-black',
        verifiedAt: batchTenChecked,
      },
      batchNineFact(
        'Bristles and use',
        'Frost Black Original Detangler has IntelliFlex bristles and is listed for wet or dry hair',
        'https://wetbrush.com/products/original-detangler-frost-black',
      ),
    ],
    relatedGuideSlugs: [ArticleSlug.BestDetanglingBrushes],
  }),
  product({
    slug: 'tangle-teezer-ultimate-detangler-naturally-curly',
    name: 'Tangle Teezer The Ultimate Detangler Naturally Curly',
    brand: 'Tangle Teezer',
    category: ProductCategory.HairBrush,
    subtype: 'curly-to-coily detangling brush',
    imageAlt: 'Tangle Teezer Ultimate Detangler Naturally Curly',
    priceTier: 'entry',
    bestFor: [
      'a curly-to-coily routine where an official detangler category is relevant',
    ],
    notIdealFor: ['claiming a styling result from specifications alone'],
    officialProductUrl: 'https://us.tangleteezer.com/collections/view-all',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Range classification',
        'Listed by Tangle Teezer US as a detangling option for curly to coily hair',
        'https://us.tangleteezer.com/collections/view-all',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BestBrushesCurlyHair,
      ArticleSlug.BestDetanglingBrushes,
    ],
  }),
  ...[
    [
      'ghd-chronos',
      'ghd Chronos Flat Iron (1 inch plate) Black',
      'ghd',
      1,
      'fixed',
      true,
      'premium',
    ],
    [
      'ghd-platinum-plus',
      'ghd Platinum+ Flat Iron (1 inch plate) Black',
      'ghd',
      1,
      'fixed',
      true,
      'premium',
    ],
    [
      'ghd-gold',
      'ghd Gold Flat Iron (1 inch plate) Black',
      'ghd',
      1,
      'fixed',
      true,
      'premium',
    ],
    [
      'ghd-original',
      'ghd Original Flat Iron (1 inch plate) Black',
      'ghd',
      1,
      'fixed',
      true,
      'mid-range',
    ],
    [
      'ghd-chronos-max',
      'ghd Chronos Max Flat Iron (2 inch plate) Black',
      'ghd',
      2,
      'fixed',
      true,
      'premium',
    ],
    [
      'ghd-mini',
      'ghd Mini Flat Iron (0.60 inch plate) Black',
      'ghd',
      0.6,
      'fixed',
      true,
      'mid-range',
    ],
    [
      'ghd-unplugged',
      'ghd Unplugged Flat Iron (0.88 inch plate) Black',
      'ghd',
      0.88,
      'fixed',
      true,
      'premium',
    ],
  ].map(
    ([
      slug,
      name,
      brand,
      plateWidthInches,
      heatControl,
      dualVoltage,
      priceTier,
    ]) =>
      product({
        slug: slug as string,
        name: name as string,
        modelIdentifier: ghdExactFlatIronIdentifier[slug as string],
        generation: slug as string,
        brand: brand as string,
        category: ProductCategory.FlatIron,
        subtype: 'flat iron',
        imageAlt: `${name} flat iron`,
        priceTier: priceTier as PriceTier,
        plateWidthInches: plateWidthInches as number,
        heatControl: heatControl as ProductProfile['heatControl'],
        dualVoltage:
          slug === 'ghd-unplugged' ||
          slug === 'ghd-chronos-max' ||
          slug === 'ghd-mini'
            ? undefined
            : (dualVoltage as boolean),
        bestFor: [
          slug === 'ghd-chronos'
            ? 'a standard-width fixed-setting tool with a documented 10-minute inactivity shutoff'
            : slug === 'ghd-platinum-plus'
              ? 'a standard-width fixed-setting tool with a documented 30-minute inactivity shutoff'
              : plateWidthInches === 1
                ? 'a standard-width fixed-setting flat iron'
                : 'a distinct plate width for a specific handling preference',
        ],
        notIdealFor: ['someone who needs an adjustable temperature control'],
        officialProductUrl:
          ghdExactFlatIronSource[slug as string] ??
          'https://www.ghdhair.com/us/flat-irons-c',
        verifiedAt: ghdExactFlatIronSource[slug as string]
          ? batchNineChecked
          : undefined,
        availability: 'available',
        evidenceStatus: 'specification-researched',
        verifiedFacts: ghdExactFlatIronSource[slug as string]
          ? [
              batchNineFact(
                'US model and plate',
                `Exact black model; ${plateWidthInches} in plate label`,
                ghdExactFlatIronSource[slug as string],
              ),
              ...(slug === 'ghd-chronos' || slug === 'ghd-chronos-max'
                ? [
                    batchNineFact(
                      'Inactivity shutoff',
                      '10 minutes',
                      ghdExactFlatIronSource[slug as string],
                    ),
                  ]
                : slug === 'ghd-platinum-plus' ||
                    slug === 'ghd-gold' ||
                    slug === 'ghd-mini'
                  ? [
                      batchNineFact(
                        'Inactivity shutoff',
                        '30 minutes',
                        ghdExactFlatIronSource[slug as string],
                      ),
                    ]
                  : []),
              ...(slug === 'ghd-unplugged'
                ? [
                    batchNineFact(
                      'Operation',
                      'Cordless; cannot be used while charging',
                      ghdExactFlatIronSource[slug as string],
                    ),
                  ]
                : []),
              ...(slug === 'ghd-chronos-max' || slug === 'ghd-gold'
                ? [
                    batchNineFact(
                      'US warranty',
                      '2 years stated for this exact model',
                      ghdExactFlatIronSource[slug as string],
                    ),
                  ]
                : slug === 'ghd-chronos' || slug === 'ghd-platinum-plus'
                  ? [
                      batchNineFact(
                        'US warranty',
                        '3 years stated for this exact model',
                        ghdExactFlatIronSource[slug as string],
                      ),
                    ]
                  : []),
            ]
          : [
              fact(
                'Plate width',
                `${plateWidthInches} in`,
                'https://www.ghdhair.com/us/flat-irons-c',
              ),
            ],
        relatedGuideSlugs: [
          ArticleSlug.BestFlatIrons,
          ...(slug === 'ghd-chronos' || slug === 'ghd-platinum-plus'
            ? [ArticleSlug.GhdChronosVsPlatinumPlus]
            : []),
          ...(slug === 'ghd-gold' || slug === 'ghd-platinum-plus'
            ? [ArticleSlug.GhdGoldVsPlatinumPlus]
            : []),
          ...(slug === 'ghd-chronos' || slug === 'ghd-chronos-max'
            ? [ArticleSlug.GhdChronosVsChronosMax]
            : []),
        ],
      }),
  ),
  product({
    slug: 'babylisspro-nano-titanium-digital',
    name: 'BaBylissPRO Nano Titanium 1 inch Digital Ultra-Thin Flat Iron',
    brand: 'BaBylissPRO',
    category: ProductCategory.FlatIron,
    subtype: 'flat iron',
    imageAlt: 'BaBylissPRO Nano Titanium digital flat iron',
    priceTier: 'mid-range',
    plateWidthInches: 1,
    heatControl: 'presets',
    dualVoltage: true,
    bestFor: [
      'five documented digital heat settings and international voltage support',
    ],
    notIdealFor: ['someone who wants a fixed-control tool'],
    officialProductUrl:
      'https://www.babylisspro.com/nano-titanium-1-inch-digital-ultra-thin-flat-iron/BNT4172T.html',
    verifiedAt: batchNineChecked,
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      batchNineFact(
        'Controls',
        '5 digital heat settings: 300°F, 340°F, 380°F, 420°F and 450°F',
        'https://www.babylisspro.com/nano-titanium-1-inch-digital-ultra-thin-flat-iron/BNT4172T.html',
      ),
      batchNineFact(
        'Voltage',
        '120 V / 240 V dual voltage stated',
        'https://www.babylisspro.com/nano-titanium-1-inch-digital-ultra-thin-flat-iron/BNT4172T.html',
      ),
      batchNineFact(
        'Automatic shutoff',
        '60 minutes stated',
        'https://www.babylisspro.com/nano-titanium-1-inch-digital-ultra-thin-flat-iron/BNT4172T.html',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BestFlatIrons,
      ArticleSlug.BestTravelFlatIrons,
    ],
  }),
  ...[
    [
      'ghd-curve-classic-curl',
      'ghd Curve Classic Curl Iron (1 inch barrel)',
      'curling iron',
      1,
      'clamp',
    ],
    [
      'ghd-curve-soft-curl',
      'ghd Curve Soft Curl Iron (1.25 inch barrel)',
      'curling iron',
      1.25,
      'clamp',
    ],
    [
      'ghd-curve-creative-curl',
      'ghd Curve Creative Curl Wand (tapered barrel)',
      'curling wand',
      undefined,
      'clipless',
    ],
    [
      'ghd-curve-thin-wand',
      'ghd Curve Thin Wand (0.5 inch barrel)',
      'curling wand',
      0.5,
      'clipless',
    ],
    [
      'ghd-curve-classic-wave',
      'ghd Curve Classic Wave Wand (oval barrel)',
      'curling wand',
      undefined,
      'clipless',
    ],
  ].map(([slug, name, subtype, barrelDiameterInches, mechanism]) =>
    product({
      slug: slug as string,
      name: name as string,
      brand: 'ghd',
      category:
        subtype === 'curling iron'
          ? ProductCategory.CurlingIron
          : ProductCategory.CurlingWand,
      subtype: subtype as string,
      imageAlt: `${name} styling tool`,
      priceTier: 'premium',
      barrelDiameterInches: barrelDiameterInches as number | undefined,
      heatControl: 'fixed',
      mechanism: mechanism as ProductProfile['mechanism'],
      dualVoltage: true,
      bestFor: [
        slug === 'ghd-curve-classic-curl'
          ? 'a 1-inch clamp format documented in ghd US warranty information'
          : slug === 'ghd-curve-soft-curl'
            ? 'a 1.25-inch clamp format documented on the exact US product page'
            : 'a documented barrel size when you already know the format you prefer',
      ],
      notIdealFor: [
        'guaranteeing curl shape or hold from barrel diameter alone',
      ],
      officialProductUrl:
        slug === 'ghd-curve-soft-curl'
          ? 'https://www.ghdhair.com/us/curl-irons/ghd-soft-curl-curling-iron-p-302'
          : slug === 'ghd-curve-classic-curl'
            ? 'https://www.ghdhair.com/us/warranty/'
            : 'https://www.ghdhair.com/us/curling-irons-c',
      verifiedAt:
        slug === 'ghd-curve-classic-curl' || slug === 'ghd-curve-soft-curl'
          ? batchEightChecked
          : undefined,
      availability:
        slug === 'ghd-curve-classic-curl'
          ? 'availability-to-check'
          : 'available',
      evidenceStatus: 'specification-researched',
      verifiedFacts:
        slug === 'ghd-curve-classic-curl' || slug === 'ghd-curve-soft-curl'
          ? [
              batchEightFact(
                'US barrel diameter',
                `${barrelDiameterInches} in`,
                slug === 'ghd-curve-classic-curl'
                  ? 'https://www.ghdhair.com/us/warranty/'
                  : 'https://www.ghdhair.com/us/curl-irons/ghd-soft-curl-curling-iron-p-302',
              ),
            ]
          : [
              fact(
                'Barrel diameter',
                `${barrelDiameterInches} in`,
                'https://www.ghdhair.com/us/curling-irons-c',
              ),
              fact(
                'Format',
                mechanism === 'clamp' ? 'Clamp iron' : 'Clipless wand',
                'https://www.ghdhair.com/us/curling-irons-c',
              ),
            ],
      relatedGuideSlugs: [ArticleSlug.BestCurlingIrons],
    }),
  ),
  product({
    slug: 'hot-tools-24k-gold-1in',
    name: 'Hot Tools Pro Artist 24K Gold Curling Iron, 1 inch',
    brand: 'Hot Tools',
    category: ProductCategory.CurlingIron,
    subtype: 'curling iron',
    imageAlt: 'Hot Tools 24K Gold curling iron',
    priceTier: 'mid-range',
    barrelDiameterInches: 1,
    heatControl: 'adjustable',
    mechanism: 'clamp',
    bestFor: ['a standard 1-inch clamp iron format'],
    notIdealFor: ['assuming a barrel material predicts styling results'],
    officialProductUrl:
      'https://www.hottools.com/products/pro-artist-24k-gold-curling-iron',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Barrel diameter',
        '1 in model',
        'https://www.hottools.com/products/pro-artist-24k-gold-curling-iron',
      ),
    ],
    relatedGuideSlugs: [ArticleSlug.BestCurlingIrons],
  }),
  product({
    slug: 'babylisspro-conicurl',
    name: 'BaBylissPRO Nano Titanium ConiCurl Taper Iron',
    brand: 'BaBylissPRO',
    category: ProductCategory.CurlingWand,
    subtype: 'tapered curling wand',
    imageAlt: 'BaBylissPRO ConiCurl taper iron',
    priceTier: 'mid-range',
    heatControl: 'adjustable',
    mechanism: 'clipless',
    bestFor: ['a tapered, clipless format'],
    notIdealFor: ['a buyer who needs one fixed documented diameter'],
    officialProductUrl: 'https://www.babylisspro.com/',
    supportUrl:
      'https://babylisspro.com/on/demandware.static/-/Sites-master-us-babylisspro/default/dw1507af85/manuals/BABNT100%28125%29TBN%20IB-10524B.pdf',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Format',
        'Taper iron instructions published by BaBylissPRO',
        'https://babylisspro.com/on/demandware.static/-/Sites-master-us-babylisspro/default/dw1507af85/manuals/BABNT100%28125%29TBN%20IB-10524B.pdf',
      ),
    ],
    relatedGuideSlugs: [ArticleSlug.CurlingIronVsWand],
  }),
  product({
    slug: 't3-singlepass-curl-125',
    name: 'T3 SinglePass Curl 1.25 inch Professional Curling Iron',
    brand: 'T3',
    category: ProductCategory.CurlingIron,
    subtype: 'curling iron',
    imageAlt: 'T3 SinglePass Curl curling iron',
    priceTier: 'premium',
    barrelDiameterInches: 1.25,
    heatControl: 'adjustable',
    mechanism: 'clamp',
    bestFor: ['a 1.25-inch clamp-iron format with adjustable controls'],
    notIdealFor: ['a clipless-wand preference'],
    officialProductUrl:
      'https://t3micro.com/products/singlepass-curl-1-25-professional-curling-iron',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Barrel diameter',
        '1.25 in',
        'https://t3micro.com/products/singlepass-curl-1-25-professional-curling-iron',
      ),
    ],
    relatedGuideSlugs: [ArticleSlug.BestCurlingIrons],
  }),
  product({
    slug: 'babyliss-air-style-1000-2136u-uk',
    market: 'UK',
    name: 'BaByliss Air Style 1000 (2136U)',
    modelIdentifier: '2136U',
    generation: 'Air Style 1000 2136U',
    brand: 'BaByliss',
    category: ProductCategory.MultiStyler,
    subtype: 'multi-attachment hot-air styler',
    imageAlt: 'BaByliss Air Style 1000 UK multi-attachment styler',
    priceTier: 'mid-range',
    bestFor: [
      'one handle with documented drying, volumising, smoothing and curling attachments',
    ],
    notIdealFor: [
      'someone who wants a single fixed brush without changing heads',
    ],
    officialProductUrl:
      'https://www.babyliss.com/uk-en/air-style-1000-2136U.html',
    supportUrl:
      'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1776089980931/information-booklets/2136U_IB.pdf',
    verifiedAt: batchEightChecked,
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      batchEightFact(
        'UK model and brush',
        '2136U; 50 mm volumising brush',
        'https://www.babyliss.com/uk-en/air-style-1000-2136U.html',
      ),
      batchEightFact(
        'UK included parts',
        'Drying nozzle, paddle brush, conical curler and heat glove listed',
        'https://www.babyliss.com/uk-en/air-style-1000-2136U.html',
      ),
      batchEightFact(
        'UK manual controls',
        'Low and high heat plus cool',
        'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1776089980931/information-booklets/2136U_IB.pdf',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume,
      ArticleSlug.BestHotAirBrushes,
    ],
  }),
  product({
    slug: 'babyliss-flawless-volume-2764u-uk',
    market: 'UK',
    name: 'BaByliss Flawless Volume (2764U)',
    modelIdentifier: '2764U',
    generation: 'Flawless Volume 2764U',
    brand: 'BaByliss',
    category: ProductCategory.HotAirBrush,
    subtype: 'single-head hot-air brush',
    imageAlt: 'BaByliss Flawless Volume UK hot-air brush',
    priceTier: 'entry',
    bestFor: [
      'a documented 38 mm single-brush process with low, high and cool settings',
    ],
    notIdealFor: ['someone who needs the Air Style 1000 attachment set'],
    officialProductUrl:
      'https://www.babyliss.com/uk-en/flawless-volume-2764U.html',
    supportUrl:
      'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1743783094778/information-booklets/2764U_IB.pdf',
    verifiedAt: batchEightChecked,
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      batchEightFact(
        'UK model and brush',
        '2764U; 38 mm barrel',
        'https://www.babyliss.com/uk-en/flawless-volume-2764U.html',
      ),
      batchEightFact(
        'UK controls',
        'Low and high heat plus cool',
        'https://www.babyliss.com/uk-en/flawless-volume-2764U.html',
      ),
      batchEightFact(
        'UK filter care',
        'Rear filter twists off for cleaning after unplugging and cooling',
        'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1743783094778/information-booklets/2764U_IB.pdf',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume,
      ArticleSlug.BestHotAirBrushes,
    ],
  }),
  product({
    slug: 'ghd-chronos-black-uk',
    market: 'UK',
    name: 'ghd Chronos (26 mm plate) Black, UK',
    modelIdentifier: 'p-650, UK black 26 mm listing',
    generation: 'ghd-chronos',
    brand: 'ghd',
    category: ProductCategory.FlatIron,
    subtype: 'standard-width flat iron',
    imageAlt: 'ghd Chronos black UK straightener',
    priceTier: 'premium',
    plateWidthInches: 1,
    heatControl: 'fixed',
    bestFor: [
      'a UK 26 mm preset 185°C model with 10-minute inactivity shutoff',
    ],
    notIdealFor: ['someone who wants an adjustable temperature'],
    officialProductUrl:
      'https://www.ghdhair.com/hair-straighteners/ghd-chronos-black-styler-p-650',
    verifiedAt: batchEightChecked,
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      batchEightFact(
        'UK plate and control',
        '26 mm; preset 185°C',
        'https://www.ghdhair.com/hair-straighteners/ghd-chronos-black-styler-p-650',
      ),
      batchEightFact(
        'UK inactivity shutoff',
        '10 minutes',
        'https://www.ghdhair.com/hair-straighteners/ghd-chronos-black-styler-p-650',
      ),
      batchEightFact(
        'UK warranty',
        '3 years stated',
        'https://ukie.help.ghdhair.com/hc/en-gb/articles/7496039450258-WHAT-IS-THE-WARRANTY-ON-MY-PRODUCT',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.GhdChronosVsPlatinumPlus,
      ArticleSlug.GhdChronosVsChronosMax,
      ArticleSlug.BestFlatIrons,
    ],
  }),
  product({
    slug: 'ghd-chronos-max-black-uk',
    market: 'UK',
    name: 'ghd Chronos Max (43 mm plate) Black, UK',
    modelIdentifier: 'p-689, UK black 43 mm listing',
    generation: 'ghd-chronos-max',
    brand: 'ghd',
    category: ProductCategory.FlatIron,
    subtype: 'wide flat iron',
    imageAlt: 'ghd Chronos Max black UK straightener',
    priceTier: 'premium',
    heatControl: 'fixed',
    bestFor: [
      'a UK 43 mm preset 185°C model with 10-minute inactivity shutoff',
    ],
    notIdealFor: ['someone who wants an adjustable temperature'],
    officialProductUrl:
      'https://www.ghdhair.com/hair-straighteners/ghd-chronos-max-black-styler-p-689',
    verifiedAt: '2026-10-17',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      {
        label: 'UK plate and control',
        value: '43 mm; preset 185°C',
        sourceUrl:
          'https://www.ghdhair.com/hair-straighteners/ghd-chronos-max-black-styler-p-689',
        verifiedAt: '2026-10-17',
      },
      {
        label: 'UK inactivity shutoff',
        value: '10 minutes',
        sourceUrl:
          'https://www.ghdhair.com/hair-straighteners/ghd-chronos-max-black-styler-p-689',
        verifiedAt: '2026-10-17',
      },
      {
        label: 'UK warranty',
        value: '2 years stated',
        sourceUrl:
          'https://www.ghdhair.com/hair-straighteners/ghd-chronos-max-black-styler-p-689',
        verifiedAt: '2026-10-17',
      },
    ],
    relatedGuideSlugs: [
      ArticleSlug.GhdChronosVsChronosMax,
      ArticleSlug.BestFlatIrons,
    ],
  }),
  product({
    slug: 'ghd-platinum-plus-black-uk',
    market: 'UK',
    name: 'ghd Platinum+ (26 mm plate) Black, UK',
    modelIdentifier: 'p-453, UK black 26 mm listing',
    generation: 'ghd-platinum-plus',
    brand: 'ghd',
    category: ProductCategory.FlatIron,
    subtype: 'standard-width flat iron',
    imageAlt: 'ghd Platinum+ black UK straightener',
    priceTier: 'premium',
    plateWidthInches: 1,
    heatControl: 'fixed',
    bestFor: [
      'a UK 26 mm preset 185°C model with 30-minute inactivity shutoff',
    ],
    notIdealFor: ['someone who wants an adjustable temperature'],
    officialProductUrl:
      'https://www.ghdhair.com/hair-straighteners/ghd-platinum-plus-black-styler-p-453',
    verifiedAt: batchEightChecked,
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      batchEightFact(
        'UK plate and control',
        '26 mm; preset 185°C',
        'https://www.ghdhair.com/hair-straighteners/ghd-platinum-plus-black-styler-p-453',
      ),
      batchEightFact(
        'UK inactivity shutoff',
        '30 minutes',
        'https://www.ghdhair.com/hair-straighteners/ghd-platinum-plus-black-styler-p-453',
      ),
      batchEightFact(
        'UK warranty',
        '3 years stated',
        'https://ukie.help.ghdhair.com/hc/en-gb/articles/7496039450258-WHAT-IS-THE-WARRANTY-ON-MY-PRODUCT',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.GhdChronosVsPlatinumPlus,
      ArticleSlug.BestFlatIrons,
    ],
  }),
  ...[
    {
      slug: 'denman-d200-skeleton-vent-uk',
      name: 'Denman D200 The Skeleton Vent, UK',
      subtype: 'manual vented brush',
      url: 'https://denmanbrush.com/products/d200-skeleton-vent',
      detail: 'Open vented head; maker lists blow-drying and root-lift use',
    },
    {
      slug: 'denman-d83-gentle-paddle-uk',
      name: 'Denman D83 The Gentle Paddle, UK',
      subtype: 'manual paddle brush',
      url: 'https://denmanbrush.com/products/d83-paddle',
      detail: 'Broad cushioned paddle; maker lists straight blow-drying use',
    },
  ].map(({ slug, name, subtype, url, detail }) =>
    product({
      slug,
      market: 'UK',
      name,
      brand: 'Denman',
      category: ProductCategory.HairBrush,
      subtype,
      imageAlt: name,
      priceTier: 'entry',
      bestFor: [detail],
      notIdealFor: ['assuming measured drying speed from head shape'],
      officialProductUrl: url,
      verifiedAt: batchTenChecked,
      availability: 'availability-to-check',
      evidenceStatus: 'specification-researched',
      verifiedFacts: [
        {
          label: 'UK head and use',
          value: detail,
          sourceUrl: url,
          verifiedAt: batchTenChecked,
        },
      ],
      relatedGuideSlugs: [ArticleSlug.VentedBrushVsPaddleBrush],
    }),
  ),
  ...[
    {
      slug: 'ghd-chronos-curve-conical-wand-us',
      name: 'ghd Chronos Curve Conical Wand, US',
      subtype: 'tapered clipless wand',
      url: 'https://www.ghdhair.com/us/curling-wands/ghd-chronos-curve-conical-wand-p-702',
      detail: 'Maker-labelled 1.1–0.9 inch tapered barrel',
    },
    {
      slug: 'ghd-chronos-curve-max-wand-us',
      name: 'ghd Chronos Curve Max Wand, US',
      subtype: 'cylindrical clipless wand',
      url: 'https://www.ghdhair.com/us/curling-wands/ghd-chronos-curve-max-wand-p-703',
      detail: 'Maker-labelled 1.5 inch barrel',
    },
  ].map(({ slug, name, subtype, url, detail }) =>
    product({
      slug,
      market: 'US',
      name,
      brand: 'ghd',
      category: ProductCategory.CurlingWand,
      subtype,
      imageAlt: name,
      priceTier: 'premium',
      mechanism: 'clipless',
      bestFor: [detail],
      notIdealFor: ['assuming the barrel label predicts a finished curl'],
      officialProductUrl: url,
      verifiedAt: batchTenChecked,
      availability: 'availability-to-check',
      evidenceStatus: 'specification-researched',
      verifiedFacts: [
        {
          label: 'US barrel profile',
          value: detail,
          sourceUrl: url,
          verifiedAt: batchTenChecked,
        },
      ],
      relatedGuideSlugs: [ArticleSlug.TaperedVsCylindricalCurlingWand],
    }),
  ),
  product({
    slug: 'ghd-gold-26mm-black-uk',
    market: 'UK',
    name: 'ghd Gold (26 mm plate) Black, UK',
    brand: 'ghd',
    category: ProductCategory.FlatIron,
    subtype: 'corded straightener',
    imageAlt: 'ghd Gold black UK straightener',
    priceTier: 'premium',
    heatControl: 'fixed',
    bestFor: ['a fixed styling place with a manageable cord path'],
    notIdealFor: ['cord-free styling'],
    officialProductUrl:
      'https://www.ghdhair.com/hair-straighteners/ghd-gold-p-435',
    verifiedAt: batchTenChecked,
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      {
        label: 'UK operating format',
        value: 'Corded; 26 mm plate label',
        sourceUrl: 'https://www.ghdhair.com/hair-straighteners/ghd-gold-p-435',
        verifiedAt: batchTenChecked,
      },
    ],
    relatedGuideSlugs: [ArticleSlug.CordedVsCordlessHairStraighteners],
  }),
  product({
    slug: 'dyson-corrale-original-blue-copper-uk',
    market: 'UK',
    name: 'Dyson Corrale (Prussian blue/rich copper), UK',
    brand: 'Dyson',
    category: ProductCategory.FlatIron,
    subtype: 'rechargeable cordless straightener',
    imageAlt: 'Original Dyson Corrale blue and copper straightener',
    priceTier: 'premium',
    heatControl: 'presets',
    bestFor: ['cord-free handling with a planned charging stage'],
    notIdealFor: ['assuming cable attachment bypasses battery use'],
    officialProductUrl:
      'https://www.dyson.co.uk/hair-care/hair-straighteners/corrale/blue-copper',
    supportUrl:
      'https://www.dyson.co.uk/support/hair-care/hair-straighteners/corrale',
    verifiedAt: batchTenChecked,
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      {
        label: 'UK cordless runtime',
        value: 'Up to 30 minutes; actual runtime depends on use',
        sourceUrl:
          'https://www.dyson.co.uk/hair-care/hair-straighteners/corrale/blue-copper',
        verifiedAt: batchTenChecked,
      },
      {
        label: 'Hybrid charge mode',
        value: 'Cable extends use while battery remains involved',
        sourceUrl:
          'https://www.dyson.co.uk/support/hair-care/hair-straighteners/corrale',
        verifiedAt: batchTenChecked,
      },
    ],
    relatedGuideSlugs: [ArticleSlug.CordedVsCordlessHairStraighteners],
  }),
];
export const canonicalComparisons: readonly CanonicalComparison[] = [
  {
    slug: ArticleSlug.VentedBrushVsPaddleBrush,
    path: `/guides/${ArticleSlug.VentedBrushVsPaddleBrush}`,
    productSlugs: [
      'denman-d200-skeleton-vent-uk',
      'denman-d83-gentle-paddle-uk',
    ],
    guideSlug: ArticleSlug.VentedBrushVsPaddleBrush,
  },
  {
    slug: ArticleSlug.TaperedVsCylindricalCurlingWand,
    path: `/guides/${ArticleSlug.TaperedVsCylindricalCurlingWand}`,
    productSlugs: [
      'ghd-chronos-curve-conical-wand-us',
      'ghd-chronos-curve-max-wand-us',
    ],
    guideSlug: ArticleSlug.TaperedVsCylindricalCurlingWand,
  },
  {
    slug: ArticleSlug.CordedVsCordlessHairStraighteners,
    path: `/guides/${ArticleSlug.CordedVsCordlessHairStraighteners}`,
    productSlugs: [
      'ghd-gold-26mm-black-uk',
      'dyson-corrale-original-blue-copper-uk',
    ],
    guideSlug: ArticleSlug.CordedVsCordlessHairStraighteners,
  },
  {
    slug: ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
    path: `/guides/${ArticleSlug.DysonSupersonicVsSharkSpeedstyle}`,
    productSlugs: ['dyson-supersonic-nural', 'shark-speedstyle-pro'],
    guideSlug: ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
  },
  {
    slug: ArticleSlug.DysonAirwrapVsSharkFlexstyle,
    path: `/guides/${ArticleSlug.DysonAirwrapVsSharkFlexstyle}`,
    productSlugs: ['dyson-airwrap-id-straight-wavy', 'shark-flexstyle-hd430'],
    guideSlug: ArticleSlug.DysonAirwrapVsSharkFlexstyle,
  },
];
export const productBySlug = (slug: string) =>
  productProfiles.find((item) => item.slug === slug);
export const DIFFERENT_MARKET_WARNING =
  'These records use different markets. Plug, voltage, bundle, warranty and availability details may not be comparable.';
export const GENERATION_WARNING =
  'The product generations do not match or are not fully identified. Treat family-name similarities as unverified.';
export function marketWarning(
  products: readonly ProductProfile[],
): string | undefined {
  return new Set(products.map((product) => product.market)).size > 1
    ? DIFFERENT_MARKET_WARNING
    : undefined;
}
export function generationWarning(
  products: readonly ProductProfile[],
): string | undefined {
  const generations = products.map((product) => product.generation);
  return generations.some((generation) => !generation) ||
    new Set(generations).size > 1
    ? GENERATION_WARNING
    : undefined;
}
export const comparisonForProduct = (slug: string) =>
  canonicalComparisons.find((item) => item.productSlugs.includes(slug));
export function parseProductSelection(value: unknown): readonly string[] {
  if (typeof value !== 'string') return [];
  const product = productBySlug(value);
  return product ? [product.slug] : [];
}
export function comparisonFacts(
  first: ProductProfile,
  second: ProductProfile,
): readonly {
  label: string;
  first: VerifiedFact | undefined;
  second: VerifiedFact | undefined;
}[] {
  const labels = new Set(
    [...first.verifiedFacts, ...second.verifiedFacts].map((item) => item.label),
  );
  return [...labels].map((label) => ({
    label,
    first: first.verifiedFacts.find((item) => item.label === label),
    second: second.verifiedFacts.find((item) => item.label === label),
  }));
}
