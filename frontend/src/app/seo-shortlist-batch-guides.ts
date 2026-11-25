import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';

/**
 * 24 November 2026 shortlist batch: nine new guides published from sources
 * read that day or from dated records already held for the same exact model,
 * and thirteen new guides held as disabled drafts because their primary maker
 * listings refused automated checks (HTTP 403, 429, redirect loops or empty
 * support bodies). Fields a source does not establish stay unknown.
 */
const checkedDate = '24 November 2026';

export const shortlistBatchSources = {
  B01: {
    label: 'Remington Shine Therapy Straightener S8500',
    model: 'Remington S8500, UK',
    market: 'UK',
    url: 'https://uk.remington-europe.com/shine-therapy-straightener-s8500-uk',
    checkedDate,
    scope:
      '9 settings, 150–230°C, digital display, temperature lock, turbo boost, plate lock, 110 × 26.5 mm floating plates, auto shut-off after 60 minutes. List £79.99, shown at £24.99 as a Black Friday deal.',
  },
  B02: {
    label: 'Remington PROluxe Hair Straightener S9100',
    model: 'Remington S9100, UK',
    market: 'UK',
    url: 'https://uk.remington-europe.com/proluxe-hair-straightener-s9100-uk',
    checkedDate,
    scope:
      'Variable settings up to 230°C (9 settings from 150°C), PRO+ setting sets the plate to 185°C, OPTIheat named, plate lock, 110 × 25 mm floating plates, £99.99. No temperature lock or shut-off time stated on the listing.',
  },
  B03: {
    label: 'Bounce Curl Define EdgeLift brush',
    model: 'Bounce Curl Define EdgeLift styling brush',
    market: 'US (international shipping)',
    url: 'https://www.bouncecurl.com/products/define-styling-brush',
    checkedDate,
    scope:
      'Medium side edge for curl clumps, top edge for bangs and shorter pieces, vegan boar and round-tip bristles, seven-step directions and mild-shampoo care; $30.00. Outcome wording is a maker claim.',
  },
  B04: {
    label: 'Denman UK D3 Original Styler',
    model: 'Denman D3 Original Styler, 7 row',
    market: 'UK',
    url: 'https://denmanbrush.com/products/d3-original-styler-7-row',
    checkedDate: '18 November 2026',
    scope:
      'Seven-row D3 construction and stated uses: wet curl definition and blow-dry styling. Page rate-limited automated checks on 24 November 2026.',
  },
  B05: {
    label: 'Denman UK D3 deep-clean instructions',
    model: 'Denman D3 Original Styler',
    market: 'UK',
    url: 'https://denmanbrush.com/blogs/news/d3-original-styler-7-row-brush-of-the-month',
    checkedDate: '19 November 2026',
    scope:
      'Slide out the pad, remove pin strips, wash in warm soapy water, rinse, dry and reassemble with the shorter rows outside. D3 only.',
  },
  B06: {
    label: 'Tangle Teezer The Ultimate Detangler (Large option)',
    model: 'Tangle Teezer Ultimate Detangler, Large',
    market: 'UK',
    url: 'https://tangleteezer.com/products/the-ultimate-detangler',
    checkedDate: '22 November 2026',
    scope:
      'Large suggested for long, thick or curly hair; wet hair and shower; keep away from heat. Regular, Large and Mini on one listing; no dimensions published. Rate-limited on 24 November 2026.',
  },
  B07: {
    label: 'Tangle Teezer The Original',
    model: 'Tangle Teezer The Original, Regular',
    market: 'UK',
    url: 'https://tangleteezer.com/products/the-original',
    checkedDate: '22 November 2026',
    scope:
      'Separate handle-free product: two-tiered teeth, wet and dry hair, keep away from heat; no dimensions.',
  },
  B08: {
    label: 'Shark FlexStyle 5-in-1 with Storage Case HD446UK',
    model: 'Shark FlexStyle HD446UK, Black',
    market: 'UK',
    url: 'https://www.sharkninja.co.uk/shark-flexstyle-5-in-1-air-styler-hair-dryer-with-storage-case-black-hd446uk/HD446UK.html',
    checkedDate,
    scope:
      'In the Box: unit, paddle and oval brushes, two curlers (left and right barrel), styling concentrator, curl-defining diffuser, storage case, style guide. Twist rotates between dryer and styler; 3 heat and airflow settings; £269.99; back-in-stock notice shown.',
  },
  B09: {
    label: 'BaByliss UK Air Wand AS6550U',
    model: 'BaByliss Air Wand AS6550U',
    market: 'UK',
    url: 'https://www.babyliss.com/uk-en/air-wand-AS6550U.html',
    checkedDate: '17 November 2026',
    scope:
      'Drying from the handset, ceramic straightening attachment and curved oval brush described; no curling barrel or diffuser in the listed box. Page looped on redirects on 24 November 2026.',
  },
  B10: {
    label: 'BaByliss UK AS6550U instructions',
    model: 'BaByliss Air Wand AS6550U',
    market: 'UK',
    url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1770307469494/information-booklets/AS6550U_IB.pdf',
    checkedDate: '17 November 2026',
    scope:
      'Drying without a head, the straightening attachment and the oval brush; preparation and attachment-changing sequence for this model.',
  },
  B11: {
    label: 'BaByliss UK Air Wand Diffuser ACAS6550UDIF',
    model: 'BaByliss ACAS6550UDIF',
    market: 'UK',
    url: 'https://www.babyliss.com/uk-en/air-wand-diffuser-ACAS6550UDIF.html',
    checkedDate: '22 November 2026',
    scope:
      'Separately sold diffuser “suitable for use with the BaByliss Air Wand”; AS6550U is not named.',
  },
  B12: {
    label: 'Shark HD440UK / HD420UK FlexStyle overheating and filter care',
    model: 'Shark FlexStyle HD440UK / HD420UK series',
    market: 'UK',
    url: 'https://support.sharkninja.co.uk/article/HD440UK--HD420UK-Series-Shark-FlexStyle-Air-Styling--Drying-System-My-FlexStyle-is-Overheating?redirect=false',
    checkedDate: '18 November 2026',
    scope:
      'Monthly dry clean: switch off, unplug, pull the lower cover off, brush mesh debris toward the cord with a dry cloth or clean toothbrush, clear the cover and slide it back until it clicks. Body returned empty to automated checks on 24 November 2026.',
  },
  B13: {
    label: 'Shark HD800UK FlexStyle IonCurl getting started',
    model: 'Shark FlexStyle IonCurl HD800UK series',
    market: 'UK',
    url: 'https://support.sharkninja.co.uk/article/HD800UK-Series-Shark-Flexstyle-IonCurl-Air-Styler-Hair-Dryer---Getting-Started-with-Your-FlexStyle-IonCurl',
    checkedDate: '18 November 2026',
    scope:
      'Separate IonCurl documentation; its care steps are not transferred to HD440UK or HD420UK.',
  },
  B14: {
    label: 'T3 Volumizing Hot Rollers Luxe',
    model: 'T3 Volumizing Hot Rollers Luxe',
    market: 'US',
    url: 'https://t3micro.com/collections/styling-tools/products/volumizing-hot-rollers-luxe',
    checkedDate,
    scope:
      'Four 1¾-inch XL and four 1½-inch LG rollers, eight crease-free clips, two heat settings; listing states both a 1-hour and a 90-minute auto-off; $129.99 shown against $169.99. No ready indicator stated.',
  },
  B15: {
    label: 'Conair HS400 Ceramic Flocked Hot Rollers',
    model: 'Conair HS400',
    market: 'US',
    url: 'https://www.conair.com/ceramic-flocked-hot-rollers/HS400.html',
    checkedDate: '18 November 2026',
    scope:
      'Twenty rollers: eight 1¼-inch, six 1-inch and six ¾-inch; twenty heated plastic clips; ready dot described. URL returned 404 to automated checks on 24 November 2026.',
  },
  B25: {
    label: 'Conair HS400 instruction booklet',
    model: 'Conair HS400',
    market: 'US',
    url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw33ed3d86/Instructional%20Booklets/HS400.pdf',
    checkedDate: '25 November 2026',
    scope:
      'Official US instructions for the HS400, including roller sizes, counts and clips.',
  },
  B16: {
    label: 'Shark SilkiPro Straight HT401UKBL1',
    model: 'Shark SilkiPro Straight HT401UKBL1',
    market: 'UK',
    url: 'https://www.sharkninja.co.uk/shark-silkipro-straight-hair-straightener-dryer-in-one-tool-with-heat-resistant-storage-case/HT401UKBL1.html',
    checkedDate: '17 November 2026',
    scope:
      'Airflow with ceramic plates; wet mode dries and straightens; dry mode stops airflow for plate-led finishing; Wide-Tooth, Gentle and Precision combs described for this SKU.',
  },
  B17: {
    label: 'ghd Duet Style black UK listing',
    model: 'ghd Duet Style, black, UK',
    market: 'UK',
    url: 'https://www.ghdhair.com/wet-to-dry/ghd-duet-style-black-p-612',
    checkedDate: '31 October 2026',
    scope:
      'Airflow combined with plates for wet-to-dry use; separate dry-only, no-air Shine Shot. Distinct from Duet Blowdry. Page refused automated checks on 24 November 2026.',
  },
  B18: {
    label: 'L’Oréal Professionnel UK SteamPod 4',
    model: 'SteamPod 4, UK',
    market: 'UK',
    url: 'https://www.lorealprofessionnel.co.uk/all-products/hair-tools/steampod-4',
    checkedDate,
    scope:
      'Continuous dry steam (0.8 g/min), wider ceramic plates, three steam-optimising combs, curl-locking guide heating up to 100°C. No starting state, water type or price on the page. Damage, speed and smoothness figures are maker claims against a named comparator.',
  },
  B19: {
    label: 'SteamPod 4 LP74 instructions',
    model: 'SteamPod 4 LP74',
    market: 'International, English section',
    url: 'https://dam.groupeseb.com/m/c159b54c21bcf6da/original/1820008740-IFU.pdf',
    checkedDate: '4 November 2026',
    scope:
      'Dried hair; commercially available demineralised water without additives; tank released with two lower buttons and filled to MAX.',
  },
  B20: {
    label: 'Dyson UK Airstrait Plum/Copper',
    model: 'Dyson Airstrait Plum/Copper, UK',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/airstrait/plum-copper',
    checkedDate: '17 November 2026',
    scope:
      'Airflow straightening without hot plates, a wet-hair mode and a separate Dry mode. Dyson pages refused automated checks on 24 November 2026.',
  },
  B21: {
    label: 'REVAMP Progloss Liberate Cordless Compact',
    model: 'REVAMP Liberate ST-1700X-EU2',
    market: 'UK',
    url: 'https://revamphair.com/progloss-liberate-cordless-compact-hair-straightener',
    checkedDate,
    scope:
      '“Up to 30 minutes” of styling (“30 mins use for a typical user”), full recharge in 3 hours, charging cable with UK/EU adaptor, three settings 160/180/210°C (the page also mentions 80–235°C), 4 × 4 × 20.5 cm, 0.24 kg, £99.99. No plate size; corded use not described.',
  },
  B22: {
    label: 'Dyson UK original Corrale blue/copper',
    model: 'Dyson Corrale (original), UK',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/corrale/blue-copper',
    checkedDate: '1 November 2026',
    scope:
      'Original rechargeable model with three settings; up to 30 minutes cordless recorded from the UK listing on 11 October 2026.',
  },
  B23: {
    label: 'Dyson UK original Corrale support',
    model: 'Dyson Corrale (original), UK',
    market: 'UK',
    url: 'https://www.dyson.co.uk/support/hair-care/hair-straighteners/corrale',
    checkedDate: '1 November 2026',
    scope:
      'Attached-cable hybrid operation extends styling time while still using the battery.',
  },
  B24: {
    label: 'Dyson UK Corrale CoolShine Ceramic pink',
    model: 'Dyson Corrale CoolShine, UK',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/corrale-coolshine/ceramic-pink',
    checkedDate: '18 November 2026',
    scope:
      'Corded, dry use, four settings, removable cooling attachment, 100–240 V. Not battery-powered, so not a cordless option.',
  },
} as const satisfies Record<string, GuideSource>;

const S = shortlistBatchSources;

/** New guides published in this batch. */
export const shortlistBatchSlugs = [
  ArticleSlug.SharkSilkiproStraightVsGhdDuetStyle,
  ArticleSlug.Steampod4VsDysonAirstrait,
  ArticleSlug.RemingtonShineTherapyVsProluxeStraightener,
  ArticleSlug.BestCordlessHairStraighteners,
  ArticleSlug.DenmanD3VsBounceCurlDefineEdgelift,
  ArticleSlug.TangleTeezerUltimateDetanglerLargeVsRegular,
  ArticleSlug.BestHotRollers,
  ArticleSlug.HowToCleanASharkFlexstyleFilter,
  ArticleSlug.BabylissAirWandVsSharkFlexstyle,
] as const;

/**
 * New guides written but held as disabled drafts: their primary maker
 * listings or support pages could not be read by automated checks on
 * 24 November 2026. Enable each only after its fields are verified.
 */
export const shortlistBatchHeldSlugs: readonly string[] = [];
// The 24 November held drafts were published on 25 November 2026 with
// the editorial brief's copy; see seo-release-completion-guides.ts.

/**
 * Existing owners received only contextual links to this batch, not
 * substantive rewrites, so none is listed as a revised owner.
 */
export const shortlistBatchUpdatedSlugs: readonly string[] = [];

export const shortlistBatchRelated: Readonly<
  Record<string, readonly string[]>
> = {
  [ArticleSlug.SharkSilkiproStraightVsGhdDuetStyle]: [
    ArticleSlug.SharkSilkiproStraightVsDysonAirstrait,
    ArticleSlug.DysonAirstraitVsGhdDuetStyle,
    ArticleSlug.HowToUseAWetToDryHairStraightener,
  ],
  [ArticleSlug.Steampod4VsDysonAirstrait]: [
    ArticleSlug.Steampod3VsSteampod4,
    ArticleSlug.HowToUseASteamHairStraightener,
    ArticleSlug.HowToUseAWetToDryHairStraightener,
  ],
  [ArticleSlug.RemingtonShineTherapyVsProluxeStraightener]: [
    ArticleSlug.BestAdjustableTemperatureHairStraighteners,
    ArticleSlug.FlatIronPlateWidthGuide,
    ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners,
  ],
  [ArticleSlug.BestCordlessHairStraighteners]: [
    ArticleSlug.CordedVsCordlessHairStraighteners,
    ArticleSlug.DysonCorraleCoolshineVsCorrale,
    ArticleSlug.BestTravelFlatIrons,
  ],
  [ArticleSlug.DenmanD3VsBounceCurlDefineEdgelift]: [
    ArticleSlug.BounceCurlDefineVsVolumeEdgelift,
    ArticleSlug.DenmanD3VsD4,
    ArticleSlug.HowToUseACurlDefiningBrush,
  ],
  [ArticleSlug.TangleTeezerUltimateDetanglerLargeVsRegular]: [
    ArticleSlug.TangleTeezerUltimateDetanglerVsFineFragile,
    ArticleSlug.TangleTeezerOriginalVsUltimateDetangler,
    ArticleSlug.BestHairBrushesForLongHair,
  ],
  [ArticleSlug.BestHotRollers]: [
    ArticleSlug.HowToUseHeatedHairRollers,
    ArticleSlug.HairRollerSizeGuide,
    ArticleSlug.ConairHs400VsHs79crHotRollers,
  ],
  [ArticleSlug.HowToCleanASharkFlexstyleFilter]: [
    ArticleSlug.SharkFlexstyleModelsCompared,
    ArticleSlug.HowToCleanHotAirBrush,
    ArticleSlug.HowToCleanHairDryerFilter,
  ],
  [ArticleSlug.BabylissAirWandVsSharkFlexstyle]: [
    ArticleSlug.BabylissAirWandAs6550uVsAs6553u,
    ArticleSlug.SharkFlexstyleModelsCompared,
    ArticleSlug.HowToChooseMultiStylerAttachments,
  ],
};

export const shortlistBatchEvidence: Readonly<Record<string, GuideEvidence>> = {
  [ArticleSlug.SharkSilkiproStraightVsGhdDuetStyle]: {
    summary:
      'Dated records of the exact UK HT401UKBL1 and black Duet Style listings establish mechanism, modes and the Shark combs. No temperature, speed or finish comparison was measured.',
    sources: [S.B16, S.B17],
  },
  [ArticleSlug.Steampod4VsDysonAirstrait]: {
    summary:
      'The UK SteamPod 4 page and LP74 instructions establish construction, dry-hair use and water; a dated Airstrait UK record establishes airflow and its two modes. Maker performance figures are not repeated as findings.',
    sources: [S.B18, S.B19, S.B20],
  },
  [ArticleSlug.RemingtonShineTherapyVsProluxeStraightener]: {
    summary:
      'Both exact UK Remington listings were read on 24 November 2026. Settings, controls and plate sizes are as listed; plate temperatures were not measured.',
    sources: [S.B01, S.B02],
  },
  [ArticleSlug.BestCordlessHairStraighteners]: {
    summary:
      'Runtimes are the makers’ stated figures with their stated conditions. CoolShine is shown only to exclude it: its UK record says it is corded. No runtime was timed.',
    sources: [S.B21, S.B22, S.B23, S.B24],
  },
  [ArticleSlug.DenmanD3VsBounceCurlDefineEdgelift]: {
    summary:
      'Maker listings and care instructions establish construction, directions and care. The section examples are editorial handling guidance, not a styling test.',
    sources: [S.B04, S.B05, S.B03],
  },
  [ArticleSlug.TangleTeezerUltimateDetanglerLargeVsRegular]: {
    summary:
      'Tangle Teezer publishes size options and who Large is suggested for, but no dimensions. The size comparison is qualitative and the handling check is editorial.',
    sources: [S.B06, S.B07],
  },
  [ArticleSlug.BestHotRollers]: {
    summary:
      'Two exact US listings establish roller counts by size, clips and controls. The six-roller plan is a worked example, not a test; HS79CR is excluded because no current listing could be confirmed.',
    sources: [S.B14, S.B15, S.B25],
  },
  [ArticleSlug.HowToCleanASharkFlexstyleFilter]: {
    summary:
      'The steps restate Shark’s HD440UK/HD420UK support procedure as recorded on 18 November 2026. Other FlexStyle families keep their own documentation.',
    sources: [S.B12, S.B13],
  },
  [ArticleSlug.BabylissAirWandVsSharkFlexstyle]: {
    summary:
      'The HD446UK listing was read on 24 November 2026; AS6550U box contents and instructions come from dated 17 November records. No hands-on comparison.',
    sources: [S.B08, S.B09, S.B10, S.B11],
  },
};

export const shortlistBatchAliases: Readonly<
  Record<string, readonly string[]>
> = {
  [ArticleSlug.SharkSilkiproStraightVsGhdDuetStyle]: [
    'SilkiPro or Duet Style',
    'Shark vs ghd wet-to-dry straightener',
  ],
  [ArticleSlug.Steampod4VsDysonAirstrait]: [
    'SteamPod or Airstrait',
    'steam straightener vs airflow straightener',
  ],
  [ArticleSlug.RemingtonShineTherapyVsProluxeStraightener]: [
    'Remington S8500 vs S9100',
    'Remington straightener comparison',
  ],
  [ArticleSlug.BestCordlessHairStraighteners]: [
    'cordless flat iron',
    'battery hair straightener UK',
  ],
  [ArticleSlug.DenmanD3VsBounceCurlDefineEdgelift]: [
    'Denman or Bounce Curl',
    'curl brush comparison',
  ],
  [ArticleSlug.TangleTeezerUltimateDetanglerLargeVsRegular]: [
    'Tangle Teezer large or regular',
    'Ultimate Detangler size',
  ],
  [ArticleSlug.BestHotRollers]: ['heated rollers', 'hot roller set'],
  [ArticleSlug.HowToCleanASharkFlexstyleFilter]: [
    'FlexStyle filter',
    'clean Shark air styler filter',
  ],
  [ArticleSlug.BabylissAirWandVsSharkFlexstyle]: [
    'Air Wand or FlexStyle',
    'BaByliss vs Shark air styler',
  ],
};
