import { ArticleSlug } from './article-slug';

export interface GuideSource {
  readonly label: string;
  readonly model: string;
  readonly market: string;
  readonly url: string;
  readonly checkedDate: string;
  readonly scope: string;
}

export interface GuideEvidence {
  readonly breadcrumbLabel?: string;
  readonly summary: string;
  readonly sources: readonly GuideSource[];
}

const checkedDate = '18 October 2026';

const stylingProductSources: readonly GuideSource[] = [
  {
    label: 'John Frieda Curl Reviver Mousse directions',
    model: 'John Frieda Curl Reviver Mousse',
    market: 'United Kingdom',
    url: 'https://www.johnfrieda.com/en-uk/products/dream-curls/stylers-refreshers/curl-reviver-mousse/',
    checkedDate: '21 October 2026',
    scope:
      'Named inverted-can dispensing, damp-hair distribution and scrunching directions.',
  },
  {
    label: 'Ouidad Advanced Climate Control Heat & Humidity Gel directions',
    model: 'Ouidad Advanced Climate Control Heat & Humidity Gel',
    market: 'United States',
    url: 'https://www.ouidad.com/products/advanced-climate-control-heat-and-humidity-gel',
    checkedDate: '21 October 2026',
    scope:
      'Named damp-section Rake & Shake method, air drying and diffuser drying.',
  },
  {
    label: 'Moroccanoil Curl Defining Cream directions',
    model: 'Moroccanoil Curl Defining Cream',
    market: 'United Kingdom',
    url: 'https://uk.moroccanoil.com/products/curl-defining-cream',
    checkedDate: '21 October 2026',
    scope:
      'Named towel-dried application and styling directions; not a requirement to combine products.',
  },
  {
    label: 'Moroccanoil All in One Leave-in Conditioner directions',
    model: 'Moroccanoil All in One Leave-in Conditioner',
    market: 'United Kingdom',
    url: 'https://uk.moroccanoil.com/products/leave-in-conditioner',
    checkedDate: '21 October 2026',
    scope:
      'Named clean, towel-dried application before preferred styling products.',
  },
  {
    label: 'Moroccanoil Treatment Original ingredients and directions',
    model: 'Moroccanoil Treatment Original',
    market: 'United Kingdom',
    url: 'https://uk.moroccanoil.com/products/moroccanoil-treatment-original',
    checkedDate: '21 October 2026',
    scope:
      'Declared silicones alongside argan oil, and damp- and dry-hair application stages. The official product name does not imply a health claim.',
  },
];

export const guideEvidence: Readonly<Record<string, GuideEvidence>> = {
  [ArticleSlug.HairMousseVsGel]: {
    summary:
      'This guide compares application formats and product directions. It does not independently rank hold, weight, humidity performance or curl retention.',
    sources: [stylingProductSources[0], stylingProductSources[1]],
  },
  [ArticleSlug.CurlCreamVsLeaveInConditioner]: {
    summary:
      'This guide separates product roles using named manufacturer directions. It does not establish that every leave-in or curl cream has the same ingredients, hold or conditioning effect.',
    sources: [stylingProductSources[2], stylingProductSources[3]],
  },
  [ArticleSlug.HowToApplyHairMousse]: {
    summary:
      'The named product supports one dispensing example. The sectioning and comparison workflow is editorial guidance, not a universal dose or performance claim.',
    sources: [stylingProductSources[0]],
  },
  [ArticleSlug.HowToApplyGelToCurlyHair]: {
    summary:
      'A named manufacturer method is distinguished from an editorial distribution checklist. No universal cast, quantity, hold level or layering sequence is prescribed.',
    sources: [stylingProductSources[1]],
  },
  [ArticleSlug.HairSerumVsHairOil]: {
    summary:
      'This guide explains overlapping product labels using a named ingredient-list example. It does not rank formulas or infer concentrations, repair or heat protection from category names.',
    sources: [stylingProductSources[4]],
  },
  [ArticleSlug.HairStylingProductOrder]: {
    summary:
      'This is an editorial planning framework with a named sequence example. It does not certify formula compatibility or replace product labels and appliance manuals.',
    sources: [stylingProductSources[3]],
  },
  [ArticleSlug.HowToUseHeatedHairRollers]: {
    summary:
      'This is an editorial workflow with a named US manual example. Heating, hair preparation, hot-part handling and removal timing remain specific to the exact roller kit.',
    sources: [
      {
        label: 'Conair HS400 manual, US model',
        model: 'Conair HS400 manual, US model',
        market: 'United States',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw33ed3d86/Instructional%20Booklets/HS400.pdf',
        checkedDate: '19 October 2026',
        scope:
          'Named kit’s readiness, preparation, heated clips, handling and removal. Does not establish every heated kit’s timing or overseas voltage use.',
      },
      {
        label: 'Conair HS400 listing',
        model: 'Conair HS400 listing',
        market: 'United States',
        url: 'https://www.conair.com/ceramic-flocked-hot-rollers/HS400.html?lang=en_US',
        checkedDate: '19 October 2026',
        scope:
          'Exact named product identity and current listed kit. Does not establish independent outcome measurements.',
      },
    ],
  },
  [ArticleSlug.BobbyPinsVsUShapedHairPins]: {
    summary:
      'This guide compares visible fastening mechanisms and manufacturer-described uses. It does not rank pin strength or claim that one format holds every hair type.',
    sources: [
      {
        label: 'Kitsch clips and bobby pins',
        model: 'Kitsch clips and bobby pins',
        market: 'United States',
        url: 'https://www.mykitsch.com/collections/hair-clips-bobby-pins',
        checkedDate: '19 October 2026',
        scope:
          'Pin-format distinction and conventional crimped-pin orientation. Does not establish universal hold, no-damage or no-crease claims.',
      },
      {
        label: 'Kitsch Hematite French Hair Pin',
        model: 'Kitsch Hematite French Hair Pin',
        market: 'United States',
        url: 'https://www.mykitsch.com/collections/hair-clips-bobby-pins/products/hematite-french-hair-pin',
        checkedDate: '19 October 2026',
        scope:
          'Rigid pin identity and supported-updo use sequence. Does not establish universal insertion angle or one-pin capacity.',
      },
      {
        label: 'France Luxe Small Hair Pin Pair',
        model: 'France Luxe Small Hair Pin Pair',
        market: 'United States storefront',
        url: 'https://franceluxe.com/products/france-luxe-small-hair-pin-pair',
        checkedDate: '19 October 2026',
        scope:
          'Another named construction/format example. Does not establish interchangeability with all wire U pins.',
      },
    ],
  },
  [ArticleSlug.HowToUseBobbyPins]: {
    summary:
      'The orientation example follows Kitsch’s published guidance for conventional crimped bobby pins. Section handling and troubleshooting are editorial suggestions, not measured hold claims.',
    sources: [
      {
        label: 'Kitsch clips and bobby pins',
        model: 'Kitsch clips and bobby pins',
        market: 'United States',
        url: 'https://www.mykitsch.com/collections/hair-clips-bobby-pins',
        checkedDate: '19 October 2026',
        scope:
          'Pin-format distinction and conventional crimped-pin orientation. Does not establish universal hold, no-damage or no-crease claims.',
      },
    ],
  },
  [ArticleSlug.HowToUseAFrenchHairPin]: {
    summary:
      'The named Kitsch example documents a rigid French pin used with an arranged updo. The practice sequence is editorial guidance and does not establish a universal angle, capacity or one-pin hold.',
    sources: [
      {
        label: 'Kitsch Hematite French Hair Pin',
        model: 'Kitsch Hematite French Hair Pin',
        market: 'United States',
        url: 'https://www.mykitsch.com/collections/hair-clips-bobby-pins/products/hematite-french-hair-pin',
        checkedDate: '19 October 2026',
        scope:
          'Rigid pin identity and supported-updo use sequence. Does not establish universal insertion angle or one-pin capacity.',
      },
    ],
  },
  [ArticleSlug.HowToChooseAHairBarrette]: {
    summary:
      'This is a fit framework with manufacturer-described barrette examples. No clasp capacity, hold duration or universal fine-hair or thick-hair winner was independently measured.',
    sources: [
      {
        label: 'France Luxe Essence Volume Barrette',
        model: 'France Luxe Essence Volume Barrette',
        market: 'United States storefront',
        url: 'https://franceluxe.com/products/france-luxe-essence-volume-barrette',
        checkedDate: '19 October 2026',
        scope:
          'Maker’s fuller-section positioning and clasp format. Does not establish measured internal clearance or guaranteed hold.',
      },
      {
        label: 'France Luxe Long and Skinny French Barrette',
        model: 'France Luxe Long and Skinny French Barrette',
        market: 'United Kingdom storefront',
        url: 'https://franceluxe.com/en-gb/products/long-skinny-hair-barrette-french-classic',
        checkedDate: '19 October 2026',
        scope:
          'Maker’s profile/fit positioning. Does not establish a universal fine-hair recommendation.',
      },
    ],
  },
  [ArticleSlug.HowToWashASatinBonnet]: {
    summary:
      'The named Kitsch bonnet example provides a product-specific hand-wash method. Other fibres, linings, bands and closures may require different care; no universal wash temperature or schedule is prescribed.',
    sources: [
      {
        label: 'Kitsch Blush Oversized Satin Bonnet',
        model: 'Kitsch Blush Oversized Satin Bonnet',
        market: 'United States',
        url: 'https://www.mykitsch.com/products/adjustable-oversized-satin-bonnet-blush',
        checkedDate: '19 October 2026',
        scope:
          'This bonnet’s hand-wash and hang-dry instruction. Does not establish every satin bonnet’s care or machine-wash permission.',
      },
    ],
  },
  [ArticleSlug.HowToCleanHairScrunchies]: {
    summary:
      'Slip’s published scrunchie instruction is a named spot-cleaning example. The other routes are conditional workflows, not product-specific washing permission or a universal silk-care recipe.',
    sources: [
      {
        label: 'Slip product care',
        model: 'Slip product care',
        market: 'United States',
        url: 'https://www.slip.com/pages/care',
        checkedDate: '19 October 2026',
        scope:
          'Scrunchie-specific spot-cleaning direction. Does not establish carrying pillowcase instructions across to scrunchies.',
      },
    ],
  },
  [ArticleSlug.HowToCleanAHairComb]: {
    summary:
      'Kent’s handmade-comb aftercare provides a specific cloth-and-soft-brush example. It is not a universal instruction for wood, horn, metal, coated or composite combs.',
    sources: [
      {
        label: 'Kent product aftercare, Handmade Combs section',
        model: 'Kent product aftercare, Handmade Combs section',
        market: 'United Kingdom',
        url: 'https://kentbrushes.com/pages/product-after-care',
        checkedDate: '19 October 2026',
        scope:
          'Cloth/soft-toothbrush care and drying limits for that family. Does not establish general soaking permission or a disinfection protocol.',
      },
    ],
  },
  [ArticleSlug.HowToUseFlexiRods]: {
    summary:
      'This guide combines a conservative editorial sequence with directions published for identifiable roller sets. Product-specific preparation and timing remain with the exact set instructions.',
    sources: [
      {
        label: 'Annie Silky Satin Flexi Rods product directions',
        model: 'Annie 01291 Silky Satin Flexi Rods, 9/16 inch, 5 count',
        market: 'United States',
        url: 'https://www.annieinc.com/products/annie-silky-satin-flexi-rods-9-16-inch-5-count-blue',
        checkedDate,
        scope:
          'The maker describes wrapping and folding the ends inward. Its preparation advice applies to this set; no curl outcome or universal rod count is inferred.',
      },
      {
        label: 'Kitsch Velvet XL Flexi Rods product directions',
        model: 'Kitsch Eucalyptus Velvet XL Flexi Rods, 4-piece set',
        market: 'United States',
        url: 'https://www.mykitsch.com/collections/heatless-hair-1/products/eucalyptus-velvet-xl-flexi-rods-4pc-set',
        checkedDate,
        scope:
          'The maker describes dry-hair wrapping and separately allows damp hair. It also describes a scrunchie fastening step, which belongs to this set rather than every flexi rod.',
      },
    ],
  },
  [ArticleSlug.HowToUseSnapClosureFoamRollers]: {
    summary:
      'This guide combines a conservative editorial sequence with directions published for identifiable roller sets. Product-specific preparation and timing remain with the exact set instructions.',
    sources: [
      {
        label: 'Annie Jumbo Foam Hair Rollers product directions',
        model: 'Annie 01065 Foam Hair Rollers, 1 1/2 inch Jumbo, 6 count',
        market: 'United States',
        url: 'https://www.annieinc.com/products/annie-01065',
        checkedDate,
        scope:
          'The listing identifies a tab closure and gives product-specific preparation advice. Its promotional longevity and universal-fit claims are not adopted here.',
      },
      {
        label: 'RED by KISS Hair Foam Roller product details',
        model: 'RED by KISS HRS06 Hair Foam Roller',
        market: 'United States',
        url: 'https://ivyusa.com/shop/hair-foam-roller-2792',
        checkedDate,
        scope:
          'The official indexed product description identifies a snap closure and foam construction. Detailed preparation and removal directions are sparse; the sequence above is editorial workflow guidance. The full page could not be retrieved during this check.',
      },
    ],
  },
  [ArticleSlug.HowToCleanHairStraightenerPlates]: {
    breadcrumbLabel: 'How to clean straightener plates',
    summary:
      'This guide summarizes conservative external-care boundaries. The exact model manual controls permitted cloths, moisture and cleaning products; visible structural or electrical damage is not treated as a cleaning task.',
    sources: [
      {
        label: 'Conair CS225 instruction booklet',
        model: 'Conair Double Ceramic Flat Iron CS225',
        market: 'United States',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwe8198bd7/Instructional%20Booklets/CS225.pdf',
        checkedDate,
        scope:
          'The model manual directs disconnection from power, cooling and an exterior cloth wipe. It does not establish a site-wide cleaning substance.',
      },
      {
        label: 'BaBylissPRO BNT137 instruction booklet',
        model: 'BaBylissPRO Nano Titanium Mini Flat Iron BNT137',
        market: 'United States',
        url: 'https://babylisspro.com/on/demandware.static/-/Sites-master-us-babylisspro/default/dwfb4a73ed/manuals/BNT137.pdf',
        checkedDate,
        scope:
          'The model manual directs disconnection from power, cooling and an exterior cloth wipe; abnormal conditions require authorized service.',
      },
      {
        label: 'ghd Unplugged cleaning support',
        model: 'ghd Unplugged cordless straightener',
        market: 'United States',
        url: 'https://help.ghdhair.com/hc/en-us/articles/4403030589074-What-steps-do-you-recommend-in-cleaning-my-ghd-unplugged',
        checkedDate,
        scope:
          'This model-specific support page requires switching off, removing the charging source and cooling, then permits a damp cloth followed by wiping dry. That permission stays with this model.',
      },
    ],
  },
  [ArticleSlug.HowToCleanACurlingIronOrWand]: {
    summary:
      'This guide summarizes conservative external-care boundaries. The exact model manual controls permitted cloths, moisture and cleaning products; visible structural or electrical damage is not treated as a cleaning task.',
    sources: [
      {
        label: 'Conair CD851 instruction booklet',
        model: 'Conair Frizz Defense Curling Iron CD851',
        market: 'United States and Canada',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwbfca27c7/Instructional%20Booklets/CD851.pdf',
        checkedDate,
        scope:
          'The model manual describes disconnecting, cooling and wiping the exterior with a cloth, with immediate stop-use guidance for visible cord damage.',
      },
      {
        label: 'Conair CD123 instruction booklet',
        model: 'Conair You Curl Curling Wand CD123',
        market: 'United States',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw35d3b126/Instructional%20Booklets/CD123NN.pdf',
        checkedDate,
        scope:
          'The wand manual describes disconnecting, cooling and wiping the exterior with a cloth. It also prohibits consumer repairs.',
      },
      {
        label: 'BaBylissPRO Nano Titanium curling-iron instructions',
        model: 'BaBylissPRO BABNT75SN(MN) series curling irons',
        market: 'United States',
        url: 'https://babylisspro.com/on/demandware.static/-/Sites-master-us-babylisspro/default/dw219c7cd1/manuals/BABNT75SN%28MN%29%20series%20IB-10252D.pdf',
        checkedDate,
        scope:
          'The series manual describes disconnecting, cooling and wiping the exterior with a cloth; it directs abnormal conditions to authorized service.',
      },
    ],
  },
};
