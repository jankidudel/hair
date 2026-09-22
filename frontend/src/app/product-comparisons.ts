import { ArticleSlug } from './article-slug';

/** The single US-market source of product facts for product-facing surfaces. */
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
  readonly name: string;
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
const fact = (
  label: string,
  value: string,
  sourceUrl: string,
): VerifiedFact => ({ label, value, sourceUrl, verifiedAt: checked });
const product = (
  input: Omit<ProductProfile, 'verifiedAt' | 'comparisonStatus'>,
): ProductProfile => ({
  ...input,
  verifiedAt: checked,
  comparisonStatus: 'specification-led',
});

export const productProfiles: readonly ProductProfile[] = [
  product({
    slug: 'dyson-supersonic-nural',
    name: 'Dyson Supersonic Nural™ hair dryer',
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
    officialProductUrl: 'https://www.dyson.com/hair-care/hair-dryers',
    supportUrl:
      'https://www.dyson.com/support/hair-care/hair-dryers/supersonic-nural',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'US electrical specification',
        '120 V / 60 Hz; 1,600 W',
        'https://www.dyson.com/content/dam/dyson/for-business/business-refresh/docs/us/hair-care/DysonSupersonictechspec.pdf',
      ),
      fact(
        'Controls',
        '3 airflow settings and 4 heat settings including cold shot',
        'https://www.dyson.com/support/journey/guides/245739-01?machineId=201967-01',
      ),
      fact(
        'Warranty',
        '2-year limited warranty stated',
        'https://www.dyson.com/hair-care/hair-dryers',
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
    name: 'Shark SpeedStyle™ Pro',
    brand: 'Shark',
    category: ProductCategory.HairDryer,
    subtype: 'full-size dryer',
    imageAlt: 'Shark SpeedStyle Pro hair dryer',
    priceTier: 'premium',
    bestFor: [
      'comparing the exact included attachment bundle',
      'a dedicated dryer format',
    ],
    notIdealFor: ['buyers who need a fixed attachment list across all bundles'],
    officialProductUrl:
      'https://www.sharkninja.com/parts-support/beauty-parts/hair-dryers',
    availability: 'availability-to-check',
    evidenceStatus: 'limited-specification',
    conflictNote:
      'Shark lists SpeedStyle family support, but exact current US bundle details should be confirmed before purchase.',
    verifiedFacts: [
      fact(
        'Support path',
        'SpeedStyle family parts and support are listed by SharkNinja',
        'https://www.sharkninja.com/parts-support/beauty-parts/hair-dryers',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
      ArticleSlug.HairDryerChooser,
    ],
  }),
  product({
    slug: 'conair-digitalaire-2',
    name: 'InfinitiPRO by Conair® DigitalAIRE® 2.0 Hair Dryer',
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
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Voltage',
        'Automatic dual voltage stated',
        'https://www.conair.com/digitalaire2.html',
      ),
      fact(
        'Controls',
        '4 heat and 4 speed settings plus cold shot stated',
        'https://www.conair.com/digitalaire2.html',
      ),
      fact(
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
    name: 'InfinitiPRO by Conair® Smoothwrap Dual Ion Hair Dryer',
    brand: 'Conair',
    category: ProductCategory.HairDryer,
    subtype: 'full-size dryer',
    imageAlt: 'Conair Smoothwrap hair dryer',
    priceTier: 'entry',
    bestFor: ['a simple dryer with documented heat and speed controls'],
    notIdealFor: [
      'international travel; the manual describes standard 110–125 V use',
    ],
    officialProductUrl: 'https://www.conair.com/',
    supportUrl:
      'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw8c6198a6/Instructional%20Booklets/910N.pdf',
    availability: 'availability-to-check',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Power and controls',
        '1,875 W; 3 heat and 2 speed settings; cool shot',
        'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw8c6198a6/Instructional%20Booklets/910N.pdf',
      ),
      fact(
        'Voltage',
        'Standard dryers are designed for 110 to 125 V AC',
        'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw8c6198a6/Instructional%20Booklets/910N.pdf',
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
      'https://www.revlonhairtools.com/dryers/one-step-volumizer-plus/',
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Head and controls',
        '2.4-inch oval head; low, medium, high and cool settings',
        'https://www.revlonhairtools.com/dryers/one-step-volumizer-plus/',
      ),
      fact(
        'Warranty',
        '4-year limited warranty stated',
        'https://www.revlonhairtools.com/dryers/one-step-volumizer-plus/',
      ),
    ],
    relatedGuideSlugs: [
      ArticleSlug.BestHotAirBrushesFineHair,
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
    name: 'Wet Brush Original Detangler',
    brand: 'Wet Brush',
    category: ProductCategory.HairBrush,
    subtype: 'flexible-bristle detangling brush',
    imageAlt: 'Wet Brush Original Detangler',
    priceTier: 'entry',
    bestFor: ['a simple everyday detangling option'],
    notIdealFor: [
      'assuming care directions without the exact package documentation',
    ],
    officialProductUrl: 'https://wetbrush.com/',
    availability: 'available',
    evidenceStatus: 'limited-specification',
    verifiedFacts: [
      fact(
        'US availability',
        'Original Detangler is listed on Wet Brush’s official US store',
        'https://wetbrush.com/',
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
        brand: brand as string,
        category: ProductCategory.FlatIron,
        subtype: 'flat iron',
        imageAlt: `${name} flat iron`,
        priceTier: priceTier as PriceTier,
        plateWidthInches: plateWidthInches as number,
        heatControl: heatControl as ProductProfile['heatControl'],
        dualVoltage: dualVoltage as boolean,
        bestFor: [
          plateWidthInches === 1
            ? 'a standard-width, versatile flat iron format'
            : 'a distinct plate width for a specific handling preference',
        ],
        notIdealFor: ['assuming a fixed heat setting suits every routine'],
        officialProductUrl: 'https://www.ghdhair.com/us/flat-irons-c',
        availability: 'available',
        evidenceStatus: 'specification-researched',
        verifiedFacts: [
          fact(
            'Plate width',
            `${plateWidthInches} in`,
            'https://www.ghdhair.com/us/flat-irons-c',
          ),
          fact(
            'Voltage',
            'Universal voltage stated; check the exact product instructions before travel',
            'https://www.ghdhair.com/us/flat-irons-c',
          ),
        ],
        relatedGuideSlugs: [ArticleSlug.BestFlatIrons],
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
    availability: 'available',
    evidenceStatus: 'specification-researched',
    verifiedFacts: [
      fact(
        'Controls',
        '5 digital heat settings: 300°F, 340°F, 380°F, 420°F and 450°F',
        'https://www.babylisspro.com/nano-titanium-1-inch-digital-ultra-thin-flat-iron/BNT4172T.html',
      ),
      fact(
        'Voltage',
        '120 V / 240 V dual voltage stated',
        'https://www.babylisspro.com/nano-titanium-1-inch-digital-ultra-thin-flat-iron/BNT4172T.html',
      ),
      fact(
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
      'ghd Curve Classic Curl Iron (1.25 inch barrel)',
      'curling iron',
      1.25,
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
      'ghd Curve Creative Curl Wand (0.9 inch barrel)',
      'curling wand',
      0.9,
      'clipless',
    ],
    [
      'ghd-curve-thin-wand',
      'ghd Curve Thin Wand (0.55 inch barrel)',
      'curling wand',
      0.55,
      'clipless',
    ],
    [
      'ghd-curve-classic-wave',
      'ghd Curve Classic Wave Wand (1.5 inch barrel)',
      'curling wand',
      1.5,
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
      barrelDiameterInches: barrelDiameterInches as number,
      heatControl: 'fixed',
      mechanism: mechanism as ProductProfile['mechanism'],
      dualVoltage: true,
      bestFor: [
        'a documented barrel size when you already know the format you prefer',
      ],
      notIdealFor: [
        'guaranteeing curl shape or hold from barrel diameter alone',
      ],
      officialProductUrl: 'https://www.ghdhair.com/us/curling-irons-c',
      availability: 'available',
      evidenceStatus: 'specification-researched',
      verifiedFacts: [
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
];
export const canonicalComparisons: readonly CanonicalComparison[] = [
  {
    slug: ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
    path: `/guides/${ArticleSlug.DysonSupersonicVsSharkSpeedstyle}`,
    productSlugs: ['dyson-supersonic-nural', 'shark-speedstyle-pro'],
    guideSlug: ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
  },
];
export const productBySlug = (slug: string) =>
  productProfiles.find((item) => item.slug === slug);
export const comparisonForProduct = (slug: string) =>
  canonicalComparisons.find((item) => item.productSlugs.includes(slug));
export function parseProductSelection(value: string | null): readonly string[] {
  if (!value) return [];
  return [
    ...new Set(value.split(',').filter((slug) => productBySlug(slug))),
  ].slice(0, 3);
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
