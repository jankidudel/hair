import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';

/**
 * 23 November 2026 search growth batch: 11 new guides published, 10 new
 * guides held as disabled drafts (their primary maker listings could not be
 * verified), and existing-owner upgrades E01–E09, E12 and E13. Sources were
 * read on the dates given; fields they do not establish stay unknown.
 */
const checkedDate = '23 November 2026';

export const searchGrowthSources = {
  G01: {
    label: 'Shark FlexStyle 5-in-1 with Storage Case HD446UK',
    model: 'Shark FlexStyle HD446UK, Black',
    market: 'UK',
    url: 'https://www.sharkninja.co.uk/shark-flexstyle-5-in-1-air-styler-hair-dryer-with-storage-case-black-hd446uk/HD446UK.html',
    checkedDate,
    scope:
      'In the Box: unit, paddle and oval brushes, two curlers, styling concentrator, curl-defining diffuser, storage case. Back-in-stock notice shown.',
  },
  G02: {
    label: 'Shark FlexStyle Limited Edition Pearl Pink 4-in-1 HD432PKUK',
    model: 'Shark FlexStyle HD432PKUK, Pearl Pink',
    market: 'UK',
    url: 'https://www.sharkninja.co.uk/shark-flexstyle-limited-edition-pearl-pink-4-in-1-air-styler-hair-dryer-gift-set-hd432pkuk/HD432PKUK.html',
    checkedDate,
    scope:
      'In the Box: main unit, 32mm Auto-Wrap Curlers, paddle and oval brushes, concentrator, storage bag; no diffuser. Spec table lists 120 volts. Back-in-stock notice shown.',
  },
  G03: {
    label: 'Shark FlexStyle Build Your Own 4-in-1 HD400UK-BYO',
    model: 'Shark FlexStyle HD400UK-BYO',
    market: 'UK',
    url: 'https://www.sharkninja.co.uk/shark-flexstyle-build-your-own-air-styling-hair-drying-system-black/HD400UK-BYO.html',
    checkedDate,
    scope:
      'Choose four of nine listed accessories; storage case in product details but not in the box list; selector items shown out of stock.',
  },
  G04: {
    label: 'Shark SpeedStyle Turbo Concentrator XSKHD3SCA',
    model: 'Shark XSKHD3SCA',
    market: 'US',
    url: 'https://www.sharkninja.com/shark-speedstyle-turbo-concentrator/XSKHD3SCA.html',
    checkedDate,
    scope:
      'Compatible with HD300, HD301, HD331, HD332, HD341HRG, HD341HWH, HD352, HD331REF; HD300 series only.',
  },
  G05: {
    label: 'Shark FlexStyle Styling Concentrator XSKHD4SCBK',
    model: 'Shark XSKHD4SCBK, Black',
    market: 'US',
    url: 'https://www.sharkninja.com/shark-flexstyle-styling-concentrator/XSKHD4SCBK.html',
    checkedDate,
    scope:
      'Seventeen listed FlexStyle codes; plain HD430 and HD440 are not on the list. Stone sibling XSKHD4SCA.',
  },
  G06: {
    label: 'Shark SpeedStyle Pro Flex Build Your Own HD500UK-BYO',
    model: 'Shark SpeedStyle Pro Flex HD500UK-BYO',
    market: 'UK',
    url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-build-your-own-hair-dryer-system/HD500UK-BYO.html',
    checkedDate,
    scope:
      'Choose three of six accessories; Precision Concentrator listed for HD500EU, HD500UK, HD542EU, HD542UK; 0.73 kg with no stated basis; 2.44 m cord; control layout not described.',
  },
  G07: {
    label: 'GA.MA iQ2 Perfetto hair dryer',
    model: 'GA.MA iQ2 Perfetto, UK plug option',
    market: 'UK',
    url: 'https://www.gamaprofessional.com/en/prodotto/hair-dryer-iq2-perfetto/',
    checkedDate,
    scope:
      '294 g stated as weight without cable; 3.00 m cable; 4 temperatures, 3 speeds; nozzles, diffuser and Smart Pad listed; EU or UK plug.',
  },
  G08: {
    label: 'Remington Sleek & Smooth Slim Straightener S5500',
    model: 'Remington S5500',
    market: 'UK',
    url: 'https://uk.remington-europe.com/sleek-smooth-slim-straightener-s5500-uk',
    checkedDate,
    scope:
      '9 settings, 150–230°C, plus/minus buttons with digital display, temperature lock and boost, 15-second heat-up, 60-minute auto shut-off.',
  },
  G09: {
    label: 'Shark SpeedStyle Lift & Stretch Wide-Tooth Comb XSKHD3WTCA',
    model: 'Shark XSKHD3WTCA',
    market: 'US',
    url: 'https://www.sharkninja.com/shark-speedstyle-lift-stretch-wide-tooth-comb/XSKHD3WTCA.html',
    checkedDate,
    scope: 'Compatible only with SpeedStyle HD300 series; eight codes listed.',
  },
  G10: {
    label: 'Philips cool shot support',
    model: 'Philips HP8260/00 and HP4935/00',
    market: 'US',
    url: 'https://www.usa.philips.com/c-f/XC000004037/how-does-the-cool-shot-on-my-philips-hairdryer-work',
    checkedDate,
    scope:
      'Cool shot gives a burst of cold air to set a style after drying a section; model-specific.',
  },
  G11: {
    label: 'Electrical Safety First: hair dryers',
    model: 'General appliance safety advice',
    market: 'UK',
    url: 'https://www.electricalsafetyfirst.org.uk/safety-advice/products-and-appliances/beauty-hygiene/hair-dryers/',
    checkedDate,
    scope:
      'Stop and unplug for odd smell, sparking, cracks or damage; check air openings and follow maker filter instructions.',
  },
  G12: {
    label: 'Denman D38 Power Paddle',
    model: 'Denman D38',
    market: 'UK',
    url: 'https://denmanbrush.com/collections/detangle/products/d38-denman-detangler',
    checkedDate,
    scope:
      'Product page title lists detangling, curl defining and blow-drying; body text was not readable on the check date.',
  },
  G13: {
    label: 'Dyson UK Airsmooth Ceramic pink/Rose gold',
    model: 'Dyson standalone Airsmooth, UK',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hot-brushes/airsmooth/ceramic-pink',
    checkedDate: '1 November 2026',
    scope:
      'Fixed teardrop head, named airflow/bristle areas, wet-to-dry and separate dry-refresh directions.',
  },
  G14: {
    label: 'Dyson UK Airstrait Plum/Copper',
    model: 'Dyson Airstrait Plum/Copper, UK',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/airstrait/plum-copper',
    checkedDate: '17 November 2026',
    scope:
      'Airflow straightening without hot plates and a separate Dry mode; no settings or case inclusion compared.',
  },
  G15: {
    label: 'Dyson UK Corrale CoolShine Ceramic pink',
    model: 'Dyson Corrale CoolShine, UK',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/corrale-coolshine/ceramic-pink',
    checkedDate: '18 November 2026',
    scope:
      'Corded, dry use, four settings, removable cooling attachment, 100–240 V.',
  },
  G16: {
    label: 'Dyson UK Supersonic r Straight+Wavy',
    model: 'Dyson Supersonic r Straight+Wavy Ceramic pink/Rose gold, UK',
    market: 'UK',
    url: 'https://www.dyson.co.uk/hair-care/hair-dryers/supersonic-r/straight-wavy-ceramic-pink-rose-gold',
    checkedDate: '31 October 2026',
    scope: 'Box list and remembered settings; no weight in this record.',
  },
  G17: {
    label: 'Cloud Nine UK Original Iron',
    model: 'Cloud Nine Original Iron, current ordinary model',
    market: 'UK',
    url: 'https://www.cloudninehair.com/products/the-original-iron',
    checkedDate: '18 November 2026',
    scope:
      '11 settings, 100–200°C, Revive Mode, 100–240 V, 30-minute hibernation.',
  },
  G18: {
    label: 'Cloud Nine UK Touch Iron',
    model: 'Cloud Nine Touch Iron',
    market: 'UK',
    url: 'https://www.cloudninehair.com/products/the-touch-iron',
    checkedDate: '18 November 2026',
    scope: 'Two settings, 165°C and 195°C, Touch Technology, 220–240 V.',
  },
  G19: {
    label: 'Revlon Salon One-Step Hair Dryer and Volumizer',
    model: 'Revlon Salon One-Step, US',
    market: 'US',
    url: 'https://www.revlonhairtools.com/dryers/salon-one-step-hair-dryer-and-volumizer/',
    checkedDate: '26 October 2026',
    scope: 'Fixed oval head, three heat/speed settings, 120 V US outlets only.',
  },
  G20: {
    label: 'Revlon One-Step Volumizer PLUS',
    model: 'Revlon One-Step Volumizer PLUS, US',
    market: 'US',
    url: 'https://www.revlonhairtools.com/dryers/one-step-volumizer-plus/',
    checkedDate: '26 October 2026',
    scope: 'Detachable 2.4-inch oval head; low, medium, high and cool.',
  },
  G21: {
    label: 'Tangle Teezer The Ultimate Detangler',
    model: 'Tangle Teezer Ultimate Detangler, Large',
    market: 'UK',
    url: 'https://tangleteezer.com/products/the-ultimate-detangler',
    checkedDate: '22 November 2026',
    scope:
      'Large suggested for long, thick or curly hair; wet hair and shower; keep away from heat.',
  },
  G22: {
    label: 'Olivia Garden Ceramic + ion Thermal Round',
    model: 'Olivia Garden Ceramic + ion Thermal Round CI-35',
    market: 'US',
    url: 'https://store.oliviagarden.com/products/ceramic-ion-thermal',
    checkedDate: '11 October 2026',
    scope:
      'Manual round brush for use with a separate dryer; 1 3/8-inch maker label, not a measured outside-bristle diameter.',
  },
  G23: {
    label: 'Dyson Supersonic wide-tooth-comb support',
    model: 'Dyson Supersonic wide-tooth comb',
    market: 'UK',
    url: 'https://www.dyson.co.uk/support/journey/tools/969748-05',
    checkedDate: '2 November 2026',
    scope:
      'Named comb format and role, not a complete fit list or operating sequence.',
  },
  G24: {
    label: 'Dyson Supersonic Flyaway attachment support',
    model: 'Dyson Supersonic Flyaway attachment 971618-02',
    market: 'UK',
    url: 'https://www.dyson.co.uk/support/journey/tools/971618-02.392913-01',
    checkedDate: '2 November 2026',
    scope:
      'Starting condition, movement and handling for one finishing attachment, not universal smoother instructions.',
  },
} as const satisfies Record<string, GuideSource>;

const S = searchGrowthSources;

/** New guides published in this batch. */
export const searchGrowthSlugs = [
  ArticleSlug.DysonAirsmoothVsDysonAirstrait,
  ArticleSlug.WhyIsMyHairFrizzyAfterBlowDrying,
  ArticleSlug.SharkFlexstyleModelsCompared,
  ArticleSlug.DysonAirstraitVsCorraleCoolshine,
  ArticleSlug.BestLightweightHairDryers,
  ArticleSlug.BestHairBrushesForLongHair,
  ArticleSlug.BestHotAirBrushesForLongHair,
  ArticleSlug.BestAdjustableTemperatureHairStraighteners,
  ArticleSlug.HairDryerReplacementNozzleCompatibility,
  ArticleSlug.HowToUseAHairDryerCombAttachment,
  ArticleSlug.HairDryerOnlyBlowsColdAir,
] as const;

/**
 * New guides written but held as disabled drafts: their primary maker
 * listings returned 403, 404, 429 or timeouts to automated checks.
 */
export const searchGrowthHeldSlugs = [
  ArticleSlug.HowToChooseADysonAirwrap,
  ArticleSlug.DysonSupersonicVsSupersonicNural,
  ArticleSlug.GhdOriginalVsGold,
  ArticleSlug.SharkSpeedstyleVsFlexstyle,
  ArticleSlug.RevlonOneStepPlusVsSharkSmoothstyle,
  ArticleSlug.WetBrushOriginalDetanglerVsSpeedDry,
  ArticleSlug.BestFlatIronsForShortHair,
  ArticleSlug.HairDryersWithCombAttachment,
  ArticleSlug.HowToCleanADysonAirwrapFilter,
  ArticleSlug.DrybarDoubleShotVsRevlonOneStep,
] as const;

/** Existing owners revised substantively in this batch. */
export const searchGrowthUpdatedSlugs = [
  ArticleSlug.HairDryerWattageGuide,
  ArticleSlug.HairDryerChooser,
  ArticleSlug.HairDryerTakesTooLong,
  ArticleSlug.BestHairDryerForShortHair,
  ArticleSlug.HowToBlowDryHair,
  ArticleSlug.HairDryerDiffuserCompatibility,
  ArticleSlug.HotAirBrushVsCurlingIron,
  ArticleSlug.HeatlessCurlsNotWorking,
  ArticleSlug.DysonAirsmoothVsGhdDuetBlowdry,
  ArticleSlug.HotAirBrushFrizzyHair,
  ArticleSlug.BestBrushesThickHair,
] as const;

export const searchGrowthRelated: Readonly<Record<string, readonly string[]>> =
  {
    [ArticleSlug.DysonAirsmoothVsDysonAirstrait]: [
      ArticleSlug.DysonAirsmoothVsGhdDuetBlowdry,
      ArticleSlug.DysonAirstraitVsGhdDuetStyle,
      ArticleSlug.DysonAirstraitVsCorraleCoolshine,
    ],
    [ArticleSlug.WhyIsMyHairFrizzyAfterBlowDrying]: [
      ArticleSlug.HowToBlowDryHair,
      ArticleSlug.HotAirBrushFrizzyHair,
      ArticleSlug.WhyBlowoutDoesNotLast,
    ],
    [ArticleSlug.SharkFlexstyleModelsCompared]: [
      ArticleSlug.SharkGlamVsFlexstyle,
      ArticleSlug.SharkFlexstyleVsIonCurl,
      ArticleSlug.HowToChooseMultiStylerAttachments,
    ],
    [ArticleSlug.DysonAirstraitVsCorraleCoolshine]: [
      ArticleSlug.DysonCorraleCoolshineVsCorrale,
      ArticleSlug.DysonAirstraitVsGhdDuetStyle,
      ArticleSlug.DysonAirsmoothVsDysonAirstrait,
    ],
    [ArticleSlug.BestLightweightHairDryers]: [
      ArticleSlug.HairDryerChooser,
      ArticleSlug.DysonSupersonicNuralVsSupersonicR,
      ArticleSlug.BestTravelHairDryers,
    ],
    [ArticleSlug.BestHairBrushesForLongHair]: [
      ArticleSlug.BestBrushesThickHair,
      ArticleSlug.HowToBlowDryLongHairWithARoundBrush,
      ArticleSlug.BestHotAirBrushesForLongHair,
    ],
    [ArticleSlug.BestHotAirBrushesForLongHair]: [
      ArticleSlug.RevlonOneStepVolumizerVsPlus,
      ArticleSlug.HowToUseAHotAirBrushOnLongHair,
      ArticleSlug.HotAirBrushBarrelSizeGuide,
    ],
    [ArticleSlug.BestAdjustableTemperatureHairStraighteners]: [
      ArticleSlug.FixedVsAdjustableTemperatureHairStraighteners,
      ArticleSlug.BestFlatIrons,
      ArticleSlug.CloudNineOriginalIronVsTouchIron,
    ],
    [ArticleSlug.HairDryerReplacementNozzleCompatibility]: [
      ArticleSlug.HairDryerDiffuserCompatibility,
      ArticleSlug.HowToUseHairDryerConcentratorNozzle,
      ArticleSlug.WideVsNarrowHairDryerConcentrator,
    ],
    [ArticleSlug.HowToUseAHairDryerCombAttachment]: [
      ArticleSlug.HairDryerCombAttachmentVsConcentrator,
      ArticleSlug.HowToBlowDryHair,
      ArticleSlug.HowToUseAHairDryerDiffuser,
    ],
    [ArticleSlug.HairDryerOnlyBlowsColdAir]: [
      ArticleSlug.HairDryerTakesTooLong,
      ArticleSlug.HowToCleanHairDryerFilter,
      ArticleSlug.HairDryerSettingsGuide,
    ],
  };

export const searchGrowthEvidence: Readonly<Record<string, GuideEvidence>> = {
  [ArticleSlug.WhyIsMyHairFrizzyAfterBlowDrying]: {
    summary:
      'The timing table and two-section trial are editorial guidance for readers to observe, not a CombReport test. One named finishing attachment is cited for its own model only.',
    sources: [S.G24],
  },
  [ArticleSlug.DysonAirsmoothVsDysonAirstrait]: {
    summary:
      'Existing dated records of the exact UK listings establish head format and documented modes. No temperature, drying-time, smoothness or hair-condition comparison was measured.',
    sources: [S.G13, S.G14],
  },
  [ArticleSlug.SharkFlexstyleModelsCompared]: {
    summary:
      'Three exact UK SharkNinja listings establish box contents as listed. Availability is recorded separately and changes daily; no hands-on testing.',
    sources: [S.G01, S.G02, S.G03],
  },
  [ArticleSlug.DysonAirstraitVsCorraleCoolshine]: {
    summary:
      'Existing dated records of the exact UK listings establish starting state, power arrangement, settings count and the cooling part. No finish or speed comparison.',
    sources: [S.G14, S.G15],
  },
  [ArticleSlug.BestLightweightHairDryers]: {
    summary:
      'Exact UK listings establish each published weight and its stated basis. No weighing or handling test was performed, and figures with no basis are not ranked.',
    sources: [S.G07, S.G06, S.G16],
  },
  [ArticleSlug.BestHairBrushesForLongHair]: {
    summary:
      'Maker listings establish each brush’s stated job and size label by region. The section comparison is an editorial handling check, not a test.',
    sources: [S.G21, S.G12, S.G22],
  },
  [ArticleSlug.BestHotAirBrushesForLongHair]: {
    summary:
      'Existing dated records of two exact US Revlon listings establish head format, controls and electrical scope. The holding check is a reader observation.',
    sources: [S.G19, S.G20],
  },
  [ArticleSlug.BestAdjustableTemperatureHairStraighteners]: {
    summary:
      'Exact UK listings establish documented settings and controls. Plate temperatures were not measured, and BaByliss 2516U is omitted because its listing could not be verified.',
    sources: [S.G08, S.G17, S.G18],
  },
  [ArticleSlug.HairDryerReplacementNozzleCompatibility]: {
    summary:
      'Exact SharkNinja part listings establish the body codes each nozzle names. No physical fit testing; an unlisted body is recorded as no match yet.',
    sources: [S.G04, S.G05, S.G06],
  },
  [ArticleSlug.HowToUseAHairDryerCombAttachment]: {
    summary:
      'Two maker records establish comb identity and fit scope. The technique steps are editorial; settings and starting state come from each model’s manual.',
    sources: [S.G23, S.G09],
  },
  [ArticleSlug.HairDryerOnlyBlowsColdAir]: {
    summary:
      'One model-specific cool-shot support page and Electrical Safety First advice support the checks. Advice stays with controls and user maintenance the manual allows.',
    sources: [S.G10, S.G11],
  },
};

/** Sources added to existing owners; merged by URL with their earlier records. */
export const searchGrowthSupplementarySources: Readonly<
  Partial<Record<string, readonly GuideSource[]>>
> = {
  [ArticleSlug.BestHairDryerForShortHair]: [S.G04],
  [ArticleSlug.BestBrushesThickHair]: [S.G21, S.G12, S.G22],
};

export const searchGrowthAliases: Readonly<Record<string, readonly string[]>> =
  {
    [ArticleSlug.DysonAirsmoothVsDysonAirstrait]: [
      'Airsmooth or Airstrait',
      'Dyson brush vs straightener',
    ],
    [ArticleSlug.WhyIsMyHairFrizzyAfterBlowDrying]: [
      'frizzy after blow dry',
      'blow-dry frizz',
    ],
    [ArticleSlug.SharkFlexstyleModelsCompared]: [
      'FlexStyle HD446UK',
      'FlexStyle Build Your Own',
      'which FlexStyle to buy',
    ],
    [ArticleSlug.DysonAirstraitVsCorraleCoolshine]: [
      'Airstrait or Corrale',
      'Dyson straightener comparison',
    ],
    [ArticleSlug.BestLightweightHairDryers]: [
      'light hair dryer',
      'hair dryer weight',
    ],
    [ArticleSlug.BestHairBrushesForLongHair]: [
      'best type of hairbrush for long hair',
      'best brush for long hair',
    ],
    [ArticleSlug.BestHotAirBrushesForLongHair]: [
      'blow dryer brush for long hair',
    ],
    [ArticleSlug.BestAdjustableTemperatureHairStraighteners]: [
      'straightener with temperature control',
      'adjustable heat straightener UK',
    ],
    [ArticleSlug.HairDryerReplacementNozzleCompatibility]: [
      'replacement concentrator nozzle',
      'lost hair dryer nozzle',
    ],
    [ArticleSlug.HowToUseAHairDryerCombAttachment]: [
      'wide-tooth comb attachment',
      'blow dryer comb attachment',
    ],
    [ArticleSlug.HairDryerOnlyBlowsColdAir]: [
      'hair dryer not getting hot',
      'hair dryer blowing cold',
    ],
    [ArticleSlug.HairDryerWattageGuide]: ['hair dryer specs'],
  };
