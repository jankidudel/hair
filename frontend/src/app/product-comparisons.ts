import { ArticleSlug } from './article-slug';

export type ProductCategory = 'hair-dryer' | 'multi-styler' | 'hot-air-brush';
export type PriceTier = 'entry' | 'mid-range' | 'premium';

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
  readonly imageAlt: string;
  readonly priceTier: PriceTier;
  readonly bestFor: readonly string[];
  readonly notIdealFor: readonly string[];
  readonly verifiedFacts: readonly VerifiedFact[];
  readonly officialProductUrl: string;
  readonly verifiedAt: string;
  readonly relatedGuideSlugs: readonly string[];
  readonly comparisonStatus: 'specification-led';
}

export interface CanonicalComparison {
  readonly slug: string;
  readonly path: string;
  readonly productSlugs: readonly [string, string];
  readonly guideSlug: string;
}

const verifiedAt = '2026-09-09';
const dysonSupersonicUrl =
  'https://www.dyson.co.uk/hair-care/hair-dryers/supersonic';
const sharkSpeedstyleUrl =
  'https://sharkclean.co.uk/product/shark-speedstyle-3-in-1-hair-dryer-for-straight-wavy-hair-hd331uk-zidHD331UK';
const dysonAirwrapUrl =
  'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-id';
const sharkFlexstyleUrl =
  'https://sharkclean.co.uk/product/shark-flexstyle-5-in-1-air-styler-hair-dryer-with-storage-case-black-rose-gold-hd440uk-zidHD440UK';

export const productProfiles: readonly ProductProfile[] = [
  {
    slug: 'dyson-supersonic',
    name: 'Dyson Supersonic',
    brand: 'Dyson',
    category: 'hair-dryer',
    imageAlt: 'Dyson Supersonic hair dryer',
    priceTier: 'premium',
    bestFor: ['dryer with five stated attachments', 'attachment-led routines'],
    notIdealFor: ['buyers who need a fixed bundle across markets'],
    verifiedFacts: [
      {
        label: 'Format',
        value: 'Hair dryer',
        sourceUrl: dysonSupersonicUrl,
        verifiedAt,
      },
      {
        label: 'Included attachments',
        value: 'Five attachments stated',
        sourceUrl: dysonSupersonicUrl,
        verifiedAt,
      },
    ],
    officialProductUrl: dysonSupersonicUrl,
    verifiedAt,
    relatedGuideSlugs: [
      ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
      ArticleSlug.HairDryerChooser,
    ],
    comparisonStatus: 'specification-led',
  },
  {
    slug: 'shark-speedstyle',
    name: 'Shark SpeedStyle',
    brand: 'Shark',
    category: 'hair-dryer',
    imageAlt: 'Shark SpeedStyle hair dryer',
    priceTier: 'premium',
    bestFor: ['compact dryer format', 'three stated styling attachments'],
    notIdealFor: ['buyers who need a universal attachment bundle'],
    verifiedFacts: [
      {
        label: 'Format',
        value: 'Hair dryer',
        sourceUrl: sharkSpeedstyleUrl,
        verifiedAt,
      },
      {
        label: 'Included attachments',
        value: 'Three styling attachments stated',
        sourceUrl: sharkSpeedstyleUrl,
        verifiedAt,
      },
    ],
    officialProductUrl: sharkSpeedstyleUrl,
    verifiedAt,
    relatedGuideSlugs: [
      ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
      ArticleSlug.HairDryerChooser,
    ],
    comparisonStatus: 'specification-led',
  },
  {
    slug: 'dyson-airwrap',
    name: 'Dyson Airwrap i.d.',
    brand: 'Dyson',
    category: 'multi-styler',
    imageAlt: 'Dyson Airwrap i.d. multi-styler and dryer',
    priceTier: 'premium',
    bestFor: ['multi-step styling routines', 'app-connected curling sequence'],
    notIdealFor: ['buyers who only need a basic dryer'],
    verifiedFacts: [
      {
        label: 'Format',
        value: 'Multi-styler and dryer',
        sourceUrl: dysonAirwrapUrl,
        verifiedAt,
      },
      {
        label: 'Stated functions',
        value: 'Dry, curl, wave, shape, stretch and diffuse',
        sourceUrl: dysonAirwrapUrl,
        verifiedAt,
      },
      {
        label: 'Settings',
        value: '3 heat and 3 speed settings',
        sourceUrl: dysonAirwrapUrl,
        verifiedAt,
      },
      {
        label: 'Weight',
        value: '0.595 kg',
        sourceUrl: dysonAirwrapUrl,
        verifiedAt,
      },
      {
        label: 'Guarantee',
        value: '2 years',
        sourceUrl: dysonAirwrapUrl,
        verifiedAt,
      },
    ],
    officialProductUrl: dysonAirwrapUrl,
    verifiedAt,
    relatedGuideSlugs: [
      ArticleSlug.DysonAirwrapVsSharkFlexstyle,
      ArticleSlug.BestHotAirBrushes,
    ],
    comparisonStatus: 'specification-led',
  },
  {
    slug: 'shark-flexstyle',
    name: 'Shark FlexStyle 5-in-1',
    brand: 'Shark',
    category: 'multi-styler',
    imageAlt: 'Shark FlexStyle multi-styler and hair dryer',
    priceTier: 'premium',
    bestFor: ['dryer-to-styler format', 'five stated styling functions'],
    notIdealFor: ['buyers who need a fixed bundle across markets'],
    verifiedFacts: [
      {
        label: 'Format',
        value: 'Air styler and hair dryer',
        sourceUrl: sharkFlexstyleUrl,
        verifiedAt,
      },
      {
        label: 'Stated functions',
        value: 'Curl, straighten, volumise, smooth and define',
        sourceUrl: sharkFlexstyleUrl,
        verifiedAt,
      },
      {
        label: 'Settings',
        value: '3 heat and airflow settings',
        sourceUrl: sharkFlexstyleUrl,
        verifiedAt,
      },
      {
        label: 'Weight',
        value: '700 g',
        sourceUrl: sharkFlexstyleUrl,
        verifiedAt,
      },
      {
        label: 'Guarantee',
        value: '2 years',
        sourceUrl: sharkFlexstyleUrl,
        verifiedAt,
      },
    ],
    officialProductUrl: sharkFlexstyleUrl,
    verifiedAt,
    relatedGuideSlugs: [
      ArticleSlug.DysonAirwrapVsSharkFlexstyle,
      ArticleSlug.BestHotAirBrushes,
    ],
    comparisonStatus: 'specification-led',
  },
];

// @todo: review, this needs to be improved
export const canonicalComparisons: readonly CanonicalComparison[] = [
  {
    slug: 'dyson-supersonic-vs-shark-speedstyle',
    path: '/products/dyson-supersonic-vs-shark-speedstyle',
    productSlugs: ['dyson-supersonic', 'shark-speedstyle'],
    guideSlug: 'dyson-supersonic-vs-shark-speedstyle',
  },
  {
    slug: 'dyson-airwrap-vs-shark-flexstyle',
    path: '/products/dyson-airwrap-vs-shark-flexstyle',
    productSlugs: ['dyson-airwrap', 'shark-flexstyle'],
    guideSlug: 'dyson-airwrap-vs-shark-flexstyle',
  },
];

export function comparisonForProduct(
  slug: string,
): CanonicalComparison | undefined {
  return canonicalComparisons.find((comparison) =>
    comparison.productSlugs.includes(slug),
  );
}

export function productBySlug(slug: string): ProductProfile | undefined {
  return productProfiles.find((product) => product.slug === slug);
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
    [...first.verifiedFacts, ...second.verifiedFacts].map((fact) => fact.label),
  );
  return [...labels]
    .map((label) => ({
      label,
      first: first.verifiedFacts.find((fact) => fact.label === label),
      second: second.verifiedFacts.find((fact) => fact.label === label),
    }))
    .filter((fact) => fact.first?.value !== fact.second?.value);
}
