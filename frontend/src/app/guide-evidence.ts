import { finishingMethodEvidence } from './finishing-method-guides';
import { carePackingEvidence } from './care-packing-guides';
import { fastenerEvidence } from './fastener-guides';
import { careMethodEvidence } from './care-method-guides';
import { headFormatEvidence } from './head-format-guides';
import { ArticleSlug } from './article-slug';
import { coreGuideEvidence } from './core-guide-quality';

export interface GuideSource {
  readonly label: string;
  readonly model: string;
  readonly market: string;
  readonly url: string;
  readonly checkedDate: string;
  readonly scope: string;
}

export interface GuideEvidence {
  readonly relatedOnly?: boolean;
  readonly sourceIntro?: string;
  readonly breadcrumbLabel?: string;
  readonly sourceFormat?: 'product-market';
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

const finishingSources: readonly GuideSource[] = [
  {
    label: 'TRESemmé Extra Hold Hairspray 400ml',
    model: 'TRESemmé Extra Hold Hairspray 400ml',
    market: 'United Kingdom',
    url: 'https://www.tresemme.com/uk/p/extra-hold-hair-spray-for-frizzy-hair.html/08710447299081',
    checkedDate: '22 October 2026',
    scope:
      'Named dry-hair application and finishing description; not evidence of comparative lasting power.',
  },
  {
    label: 'Bumble and bumble Surf Spray',
    model: 'Bumble and bumble Surf Spray',
    market: 'United States',
    url: 'https://www.bumbleandbumble.com/product/19061/221/style/texture-sprays/surf-spray-for-beachy-waves',
    checkedDate: '22 October 2026',
    scope:
      'Named starting states and arranging/drying method; not a guarantee of a new curl pattern.',
  },
  {
    label: 'Bumble and bumble Thickening Dryspun Texture Spray',
    model: 'Bumble and bumble Thickening Dryspun Texture Spray',
    market: 'United Kingdom',
    url: 'https://www.bumbleandbumble.co.uk/product/19061/126838/style/texture-sprays/thickening-dryspun-texture-spray',
    checkedDate: '22 October 2026',
    scope:
      'Named dry-hair method and container warnings; no quantitative volume claim reproduced.',
  },
  {
    label: 'American Crew Pomade',
    model: 'American Crew Pomade',
    market: 'United States',
    url: 'https://www.americancrew.com/products/pomade',
    checkedDate: '22 October 2026',
    scope:
      'Named formula positioning and application method; not a category-wide property.',
  },
  {
    label: 'American Crew Molding Clay',
    model: 'American Crew Molding Clay',
    market: 'United States',
    url: 'https://www.americancrew.com/products/molding-clay',
    checkedDate: '22 October 2026',
    scope:
      'Named finish and preparation directions; not evidence that all clay products behave alike.',
  },
];

export const guideEvidence: Readonly<Record<string, GuideEvidence>> = {
  ...finishingMethodEvidence,
  ...carePackingEvidence,
  ...fastenerEvidence,
  ...careMethodEvidence,
  ...coreGuideEvidence,
  ...headFormatEvidence,
  [ArticleSlug.GhdAirVsHelios]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'This compares current UK manufacturer product and support pages. It does not include hands-on drying, noise, comfort or durability testing. Warranty terms and accessories must be confirmed for the actual purchase.',
    sources: [
      {
        label: 'ghd Air product page',
        model: 'ghd Air product page',
        market: 'UK',
        url: 'https://www.ghdhair.com/hair-dryers/ghd-air-p-248',
        checkedDate: '25 October 2026',
        scope:
          'Model controls, concentrator, cable and currently displayed warranty; no independent result claim.',
      },
      {
        label: 'ghd black Helios product page',
        model: 'ghd black Helios product page',
        market: 'UK',
        url: 'https://www.ghdhair.com/hair-dryers/ghd-black-helios-p-497',
        checkedDate: '25 October 2026',
        scope:
          'Named motor, contoured nozzle, controls, cable and currently displayed warranty.',
      },
      {
        label: 'ghd: What is the wattage of the ghd hair dryers?',
        model: 'ghd: What is the wattage of the ghd hair dryers?',
        market: 'UK support',
        url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/7497912716946-WHAT-IS-THE-WATTAGE-OF-THE-GHD-HAIR-DRYERS',
        checkedDate: '25 October 2026',
        scope:
          'Published input ranges, not measured drying speed or travel compatibility.',
      },
    ],
  },
  [ArticleSlug.ParluxAlyonVsDigitalyon]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'This uses Parlux’s international English model pages. Published figures are not independent measurements, and local plug, voltage, warranty and bundle entitlement remain separate checks.',
    sources: [
      {
        label: 'Parlux Alyon',
        model: 'Parlux Alyon',
        market: 'International English',
        url: 'https://www.parlux.it/en/products/parlux-alyon',
        checkedDate: '25 October 2026',
        scope:
          'Published motor, input, airflow, cable and control specifications; local sale details not established.',
      },
      {
        label: 'Parlux Digitalyon',
        model: 'Parlux Digitalyon',
        market: 'International English',
        url: 'https://www.parlux.it/en/products/parlux-digitalyon',
        checkedDate: '25 October 2026',
        scope:
          'Published specifications and Standard versus diffuser-pack distinction.',
      },
    ],
  },
  [ArticleSlug.CloudNineOriginalIronVsWideIron]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'This compares current UK manufacturer specifications for the two named irons. It does not establish reduced damage, faster styling, improved comfort or any measured effect of Revive Mode.',
    sources: [
      {
        label: 'CLOUD NINE The Original Iron',
        model: 'CLOUD NINE The Original Iron',
        market: 'UK',
        url: 'https://www.cloudninehair.com/products/the-original-iron',
        checkedDate: '25 October 2026',
        scope:
          'Current model’s plate width, shared features and weight explicitly excluding cord.',
      },
      {
        label: 'CLOUD NINE The Wide Iron',
        model: 'CLOUD NINE The Wide Iron',
        market: 'UK',
        url: 'https://www.cloudninehair.com/products/the-wide-iron',
        checkedDate: '25 October 2026',
        scope:
          'Current model’s plate width, shared features and weight explicitly excluding cord.',
      },
    ],
  },
  [ArticleSlug.GhdSoftCurlTongVsCreativeCurlWand]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'This compares the named original UK Curve models from ghd’s current pages. No hands-on curl retention, ease-of-use, safety or damage comparison is claimed.',
    sources: [
      {
        label: 'ghd Curve Soft Curl Tong',
        model: 'ghd Curve Soft Curl Tong',
        market: 'UK',
        url: 'https://www.ghdhair.com/curling-tongs/ghd-curve-soft-curl-tong-p-302',
        checkedDate: '25 October 2026',
        scope:
          'Original Curve barrel, lever, listed temperature, stand and sleep feature.',
      },
      {
        label: 'ghd Curve Creative Curl Wand',
        model: 'ghd Curve Creative Curl Wand',
        market: 'UK',
        url: 'https://www.ghdhair.com/curling-wands/ghd-curve-creative-curl-wand-p-303',
        checkedDate: '25 October 2026',
        scope:
          'Original Curve tapered barrel and wrapping method; no retention or damage claim reproduced.',
      },
    ],
  },
  [ArticleSlug.TangleTeezerUltimateDetanglerVsFineFragile]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'This uses current UK product descriptions for two specifically named handled brushes. Tooth softness is manufacturer-described; pulling, comfort and breakage outcomes were not independently tested.',
    sources: [
      {
        label: 'Tangle Teezer The Ultimate Detangler',
        model: 'Tangle Teezer The Ultimate Detangler',
        market: 'UK',
        url: 'https://tangleteezer.com/products/the-ultimate-detangler',
        checkedDate: '25 October 2026',
        scope: 'Named handled brush’s positioning and heat exclusion.',
      },
      {
        label: 'Tangle Teezer The Ultimate Detangler Fine & Fragile',
        model: 'Tangle Teezer The Ultimate Detangler Fine & Fragile',
        market: 'UK',
        url: 'https://tangleteezer.com/products/the-ultimate-detangler-fine-fragile',
        checkedDate: '25 October 2026',
        scope:
          'Softer-tooth description relative to the handled standard model and heat exclusion.',
      },
    ],
  },
  [ArticleSlug.HowToSectionHairForStyling]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'This guide combines a named manufacturer’s sectioning example with editorial organisation checks. It does not prescribe a universal section size or establish that a clip is compatible with heat.',
    sources: [
      {
        label: 'Tangle Teezer: How to do a bouncy blow dry',
        model: 'Tangle Teezer: How to do a bouncy blow dry',
        market: 'UK',
        url: 'https://tangleteezer.com/blogs/inspiration/how-to-do-a-bouncy-blow-dry',
        checkedDate: '24 October 2026',
        scope:
          'Sectioning and parking unused hair only; no universal heat or moisture instruction adopted.',
      },
    ],
  },
  [ArticleSlug.HowToUseAWideToothComb]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'The named tutorial supports its model’s end-first method; the product listing supplies its use restrictions. Other checks organise a routine and do not establish that wide-tooth combs are faster or gentler than brushes.',
    sources: [
      {
        label: 'Tangle Teezer: How to Use A Wide Tooth Comb',
        model: 'Tangle Teezer: How to Use A Wide Tooth Comb',
        market: 'UK',
        url: 'https://tangleteezer.com/blogs/inspiration/how-to-use-a-wide-tooth-comb',
        checkedDate: '24 October 2026',
        scope:
          'Named end-first method and dual-sided design, not a category-wide performance comparison.',
      },
      {
        label: 'Tangle Teezer: Wide Tooth Comb',
        model: 'Tangle Teezer: Wide Tooth Comb',
        market: 'UK',
        url: 'https://tangleteezer.com/products/wide-tooth-comb',
        checkedDate: '24 October 2026',
        scope: 'Exact model’s permitted uses and heat exclusion.',
      },
    ],
  },
  [ArticleSlug.HowToUseACurlDefiningBrush]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'A current UK Denman D3 listing establishes one named styling example. This guide supplies editorial trial checks, not an independent comparison, a universal brush technique or a guaranteed curl result.',
    sources: [
      {
        label: 'Denman: D3 Original Curl Definer & Styler',
        model: 'Denman: D3 Original Curl Definer & Styler',
        market: 'UK',
        url: 'https://denmanbrush.com/products/d3-original-styler-7-row',
        checkedDate: '24 October 2026',
        scope:
          'Named UK model’s wet-definition positioning and hand movement; no universal outcome claim.',
      },
    ],
  },
  [ArticleSlug.HowToUseAHairPick]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'The named product listing establishes its styling role and exclusions. The outline checks are editorial planning advice, not evidence of a measured volume increase or a universal technique for every pick.',
    sources: [
      {
        label: 'Tangle Teezer: Hair Pick',
        model: 'Tangle Teezer: Hair Pick',
        market: 'UK',
        url: 'https://tangleteezer.com/products/hair-pick',
        checkedDate: '24 October 2026',
        scope:
          'Named styling role; explicitly excludes detangling and heat. No dry-hair instruction inferred from this listing.',
      },
    ],
  },
  [ArticleSlug.HowToPlopHair]: {
    sourceFormat: 'product-market',
    relatedOnly: true,
    summary:
      'Two manufacturer tutorials establish examples of fabric positioning and cupping. This guide does not compare drying speed, promise a curl pattern or establish a universal duration or product sequence.',
    sources: [
      {
        label: 'Bouclème: Usage — Curl Towel',
        model: 'Bouclème: Usage — Curl Towel',
        market: 'UK',
        url: 'https://www.boucleme.co.uk/pages/usage-curl-towel',
        checkedDate: '24 October 2026',
        scope:
          'Fabric positioning for the named towel; no universal fastening or time.',
      },
      {
        label: 'Practicurl: How to use the Curl Towel',
        model: 'Practicurl: How to use the Curl Towel',
        market: 'UK',
        url: 'https://www.practicurl.com/pages/how-to-use-curl-wrap-t-shirt-towel',
        checkedDate: '24 October 2026',
        scope:
          'Distinguishes wrapping, plopping and micro-plopping; its times are not generalised.',
      },
    ],
  },

  [ArticleSlug.HowToUseHairspray]: {
    sourceFormat: 'product-market',
    summary:
      'This guide uses one named manufacturer’s application directions as an example. The coverage checks are editorial planning advice, not comparative performance testing.',
    sources: [finishingSources[0]],
  },
  [ArticleSlug.FlexibleVsStrongHoldHairspray]: {
    sourceFormat: 'product-market',
    summary:
      'This is a guide to interpreting labels and planning comparisons. It does not rank hairsprays or establish a shared numerical hold scale.',
    sources: [finishingSources[0]],
  },
  [ArticleSlug.SeaSaltSprayVsTexturisingSpray]: {
    sourceFormat: 'product-market',
    summary:
      'This comparison uses two named products from different regional manufacturer sites. It does not compare measured volume, lasting power or hair-health outcomes.',
    sources: [finishingSources[1], finishingSources[2]],
  },
  [ArticleSlug.HowToUseSeaSaltSpray]: {
    sourceFormat: 'product-market',
    summary:
      'This guide illustrates a section-planning approach using one named manufacturer method. It does not establish a universal dose, frequency of use or hair-health benefit.',
    sources: [finishingSources[1]],
  },
  [ArticleSlug.PomadeVsHairClay]: {
    sourceFormat: 'product-market',
    summary:
      'These are manufacturer-positioned examples, not a hands-on ranking or evidence that every pomade or clay shares their characteristics.',
    sources: [finishingSources[3], finishingSources[4]],
  },
  [ArticleSlug.HowToApplyHairPomade]: {
    sourceFormat: 'product-market',
    summary:
      'The named example establishes its own application directions. The section checks are editorial routine-planning advice, not measured performance findings.',
    sources: [finishingSources[3]],
  },
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
