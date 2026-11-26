import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';

/**
 * 26 November 2026 model-decision batch. Every source below was read on
 * 26 November 2026 (HTML listings as served, Dyson PDFs as downloaded).
 *
 * Internal note: on that date dyson.co.uk and dyson.com product and support
 * pages, ghdhair.com, revlonhairtools.com, argos.co.uk product pages and the
 * SharkNinja HD652SUK listing refused automated requests (HTTP 403 or 530).
 * Guides whose decision depends on those pages are registered as disabled
 * drafts in article-registry.ts until an editor verifies the exact records.
 * An editor read the Dyson, ghd, Revlon and Hot Tools pages in a browser on
 * 26 November 2026; six drafts were released from those records. The
 * two FlexFusion drafts, SpeedStyle Pro Flex vs Helios and FlexStyle vs
 * Revlon stay held.
 */
const checkedDate = '26 November 2026';

const source = (
  label: string,
  model: string,
  market: string,
  url: string,
  scope: string,
): GuideSource => ({ label, model, market, url, checkedDate, scope });

export const modelDecisionSources = /* @__PURE__ */ (() =>
  ({
    parluxElysium: source(
      'Parlux Elysium product page',
      'Parlux Elysium, Metal',
      'Manufacturer (international English)',
      'https://www.parlux.it/en/products/elysium',
      'Names 3 speeds and 3 temperatures (9 combinations), 2,300 W, 80 m³/h airflow, a 3.30 m swivel cable, a washable sponge filter in a filter holder, the AirFusion nozzle, two versions and the MagicCompact diffuser. No weight is published.',
    ),
    parluxDigitalyon: source(
      'Parlux Digitalyon product page',
      'Parlux Digitalyon',
      'Manufacturer (international English)',
      'https://www.parlux.it/en/products/parlux-digitalyon',
      'Names a cold-air button, 2 speeds, 4 temperatures, 2,400 W, a 3.30 m cable, the E-LYON motor, a redesigned filter and the Hair Capture System. Lists a Standard version with standard and slim nozzles and a pack with the MagicSense diffuser. No weight is published.',
    ),
    ttUltimateDetangler: source(
      'Tangle Teezer The Ultimate Detangler',
      'The Ultimate Detangler, Regular',
      'UK',
      'https://tangleteezer.com/products/the-ultimate-detangler',
      'Regular, Large and Mini sizes on one listing. Describes use on wet hair and in the shower, a handle, and two-tiered teeth: long teeth detangle and shorter teeth smooth. Redirects long, thick or curly hair to the Large size.',
    ),
    ttNaturallyCurly: source(
      'Tangle Teezer The Ultimate Detangler Naturally Curly',
      'The Ultimate Detangler Naturally Curly',
      'UK',
      'https://tangleteezer.com/products/naturally-curly',
      'Describes longer, firmer teeth and shorter teeth, design for use on wet hair, and positions the brush for 3C to 4C hair. Keep it away from heat. Shown as coming soon at the check.',
    ),
    unbrushMidnight: source(
      'FHI Heat UNbrush Detangling Hair Brush, Midnight',
      'UNbrush, Midnight',
      'US',
      'https://www.fhiheat.com/products/detangling-hair-brush-midnight-black',
      'Lists 105 DuoFlex bristles (58 long, 47 mini), a backless vented cushion, use on wet and dry hair, and an easy-to-clean design.',
    ),
    wetBrushFrostBlack: source(
      'Wet Brush Original Detangler, Frost Black',
      'Original Detangler, Frost Black',
      'US',
      'https://wetbrush.com/products/original-detangler-frost-black',
      'Lists IntelliFlex bristles, use on wet or dry hair, all hair types and an ergonomic design.',
    ),
    wetBrushCollection: source(
      'Wet Brush Original Detangler collection',
      'Original Detangler colours and sets',
      'US',
      'https://wetbrush.com/collections/the-original-detangler',
      'Lists the Original Detangler in several colours and gift sets alongside licensed designs; the Frost Black listing is the exact variant used here.',
    ),
    mermade25: source(
      'Mermade Hair 25mm Mini Pro Waver, Pink',
      '25mm Mini Pro Waver, Pink',
      'UK',
      'https://mermadehair.co.uk/products/pro-waver-pink-25mm',
      'Names 25mm barrels, multiple heat settings, a one-hour auto shut-off, a 2.5m swivel cord, universal voltage and a two-year warranty. Directions start with clean, dry, detangled hair. No whole-head dimensions are published.',
    ),
    mermade32: source(
      'Mermade Hair 32mm Original Pro Waver, Pink',
      '32mm Original Pro Waver, Pink',
      'UK',
      'https://mermadehair.co.uk/products/pro-waver-pink-32mm',
      'Names three 32mm barrels, multiple heat settings, a one-hour auto shut-off, a 2.5m swivel cord, universal voltage and a two-year warranty. No whole-head dimensions are published.',
    ),
    beachwaverB1: source(
      'Beachwaver B1 product page',
      'Beachwaver B1, 1-inch',
      'US',
      'https://beachwaver.com/products/beachwaver-b1',
      'Names a 1-inch ceramic barrel 5.5 inches long, left and right rotation arrows that turn only while held, 290°F, 350°F and 410°F settings, a beveled clamp, an 8 ft swivel cord and a 30-minute auto shut-off.',
    ),
    beachwaverB125: source(
      'Beachwaver B1.25 product page',
      'Beachwaver B1.25, 1.25-inch',
      'US',
      'https://beachwaver.com/products/beachwaver-b125',
      'Names a 1.25-inch ceramic barrel 5.5 inches long, the same three settings and rotation arrows, a short beveled clamp, an 8 ft swivel cord, 100–240V, a one-year limited warranty and fully dry hair before use.',
    ),
    airwrapIdManualUk: source(
      'Dyson Airwrap i.d. user manual (UK, PDF)',
      'Dyson Airwrap i.d. multi-styler and dryer',
      'UK',
      'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/dyson-airwrap-multi-styler/N308F_OUG_UK.pdf',
      'LED key: flashing blue means ready to connect and constant blue means connected; a separate indicator means clean the filter; if the red LED lights after the filter is cleaned, contact the Dyson Helpline. Also covers the removable filter cage and the filter cleaning brush.',
    ),
    airwrapIdManualUs: source(
      'Dyson Airwrap i.d. user manual (US, PDF)',
      'Dyson Airwrap i.d. multi-styler and dryer',
      'US',
      'https://www.dyson.com/content/dam/dyson/maintenance/user-guides/en_US/personalcare/dysonairwrapstyler/AirwrapID-User-Manual.pdf',
      'Same LED key as the UK manual and states that the LED sits at the bottom of the handle above the filter cage.',
    ),
    dysonAirwrapIdSupport: source(
      'Dyson UK Airwrap i.d. support',
      'Dyson Airwrap i.d.',
      'UK',
      'https://www.dyson.co.uk/support/hair-care/hair-stylers/airwrap-id',
      'Read by an editor on 26 November 2026: “White flashing light – Clean the filter.” “Red flashing light – Clean the filter, if it’s already been done, contact customer support.”',
    ),
    dysonAirwrapSupport: source(
      'Dyson UK Airwrap support',
      'Earlier Dyson Airwrap models',
      'UK',
      'https://www.dyson.co.uk/support/hair-care/hair-stylers/airwrap',
      'Official support route for Airwrap models that are not the i.d.; light meanings for those models are not covered by the i.d. manual.',
    ),
    hd07Manual: source(
      'Dyson Supersonic HD07 user manual (UK, PDF)',
      'Dyson Supersonic hair dryer HD07',
      'UK',
      'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/dysonsupersonic/hd07/7840012-605C-Manual-Direct.pdf',
      'Monthly filter check; unplug and cool; rotate the filter cage anti-clockwise, pull it down, clean cage and mesh with a lint-free cloth or soft brush, no water on the mesh, rotate clockwise to lock. LEDs flash continuously when the filter needs cleaning; contact the Dyson Helpline if all three red lights continue to flash.',
    ),
    hd16Manual: source(
      'Dyson Supersonic Nural HD16 user manual (UK, PDF)',
      'Dyson Supersonic Nural hair dryer HD16',
      'UK',
      'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/dyson-supersonic-nural/HD16_OUG_MASTER.pdf',
      'Same filter-cage procedure and no-water instruction as HD07; three flashing white LEDs and three flashing red LEDs in the diagnostics key; Pause detect turns the heater off and reduces airflow when the dryer is put down, with the capsule pulsing blue.',
    ),
    sharkDiffuserUs: source(
      'Shark FlexStyle Curl-Defining Diffuser XSKHD4DA',
      'XSKHD4DA',
      'US',
      'https://www.sharkninja.com/shark-flexstyle-curl-defining-diffuser/XSKHD4DA.html',
      'Compatible with HD400, HD435, HD440, HD430REF, HD435REF and HD432PK. Standard HD430 is not in this list.',
    ),
    sharkDiffuserCa: source(
      'Shark FlexStyle Curl-Defining Diffuser XSKHD4DA-MASTER',
      'XSKHD4DA',
      'Canada',
      'https://www.sharkninja.ca/shark-flexstyle-curl-defining-diffuser/XSKHD4DA-MASTER.html',
      'Compatible with HD430, HD430C, HD435, HD440, HD430REF, HD435REF and HD432PK. Canadian listing only.',
    ),
    sharkHd430: source(
      'Shark FlexStyle Air Styling & Drying System HD430',
      'Shark FlexStyle HD430',
      'US',
      'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
      'In the Box: the FlexStyle, two 1.25-inch Auto-Wrap Curlers, Oval Brush, Paddle Brush and Styling Concentrator. No diffuser listed. 120 V; 1,600 W.',
    ),
    sharkHd446uk: source(
      'Shark FlexStyle 5-in-1 with Storage Case HD446UK',
      'Shark FlexStyle HD446UK, Black',
      'UK',
      'https://www.sharkninja.co.uk/shark-flexstyle-5-in-1-air-styler-hair-dryer-with-storage-case-black-hd446uk/HD446UK.html',
      'In the Box: unit, Paddle Brush, Oval Brush, two curlers, Styling Concentrator, Curl-defining Diffuser, Storage Case and Style Guide. 240 V; 1,650 W.',
    ),
    sharkHd432pkuk: source(
      'Shark FlexStyle Limited Edition Pearl Pink 4-in-1 HD432PKUK',
      'Shark FlexStyle HD432PKUK, Pearl Pink',
      'UK',
      'https://www.sharkninja.co.uk/shark-flexstyle-limited-edition-pearl-pink-4-in-1-air-styler-hair-dryer-gift-set-hd432pkuk/HD432PKUK.html',
      'In the Box: main unit, 32mm Auto-Wrap Curlers, Paddle Brush, Oval Brush, Concentrator and Storage Bag. No diffuser listed. The specification block shows 120 volts on this UK listing, which conflicts with UK mains; confirm the rating label with Shark.',
    ),
    electricalSafetyFirst: source(
      'Electrical Safety First: hair dryers',
      'Hair dryers (general guidance)',
      'UK',
      'https://www.electricalsafetyfirst.org.uk/safety-advice/products-and-appliances/beauty-hygiene/hair-dryers/',
      'Keep air openings clear, follow the maker’s filter instructions, check the cable, and unplug and contact the retailer or manufacturer if you notice an odd smell, sparking, cracks, damage, burn marks or buzzing.',
    ),
    argosBabylissSupport: source(
      'Argos Support: BaByliss Keratin Shine 2200 (5335KSU)',
      'BaByliss 5335KSU',
      'UK (retailer support)',
      'https://argos-support.co.uk/6796679-babyliss-keratin-shine-2200-hair-dryer',
      'Retailer-provided support page. For a dryer that turns off during use: unplug before cleaning, keep vents uncovered, check and clean the rear filter, remove hair build-up and let it cool fully before restarting.',
    ),
    remingtonD3010: source(
      'Remington Power Dry 2000W Hair Dryer D3010',
      'Remington D3010',
      'UK',
      'https://uk.remington-europe.com/power-dry-2000w-hair-dryer-d3010-uk',
      'Lists 3 heat and 2 speed settings, cool shot, concentrator, ceramic ionic grille, hang-up loop, a 3 m cord and 205.5 × 111.5 × 277 mm. Not foldable. Shown at £18.99 on 26 November 2026.',
    ),
    remingtonD5216: source(
      'Remington Shine Therapy Hair Dryer D5216',
      'Remington D5216',
      'UK',
      'https://uk.remington-europe.com/shine-therapy-hair-dryer-d5216-uk',
      'Lists 2300W, 3 heat and 2 speed settings, cool shot, concentrator, diffuser, a removable rear grille, a 3 m cord and 241 × 115 × 280 mm. Shown at £25.32 against £37.99 on 26 November 2026.',
    ),
    remingtonD1500: source(
      'Remington On The Go 2000W Compact Hair Dryer D1500',
      'Remington D1500',
      'UK',
      'https://uk.remington-europe.com/on-the-go-2000w-compact-hair-dryer-d1500-uk',
      'Lists 2 heat and speed settings, a folding handle, concentrator, compact diffuser, a 1.8 m cord and 172 × 85 × 210 mm. No cool shot is listed. Shown at £15.99 against £18.49 on 26 November 2026.',
    ),
    // Editorial product-page audit, 26 November 2026: these pages refused
    // automated reads and were read by an editor in a browser that day.
    dysonAirwrapIdSwUk: source(
      'Dyson Airwrap i.d. multi-styler and dryer - Straight+Wavy (Ceramic Patina/Topaz)',
      'Airwrap i.d. Straight+Wavy, Ceramic Patina/Topaz',
      'UK',
      'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-id/straight-wavy-ceramic-patina-topaz',
      'Box: Airwrap i.d. unit, fast-drying attachment, 40 mm Airwrap barrel, conical Airwrap barrel, soft smoothing brush, large round brush for volume, combined dryer and flyaway smoother, filter-cleaning brush and presentation case. Describes MyDyson app connection over Bluetooth, a six-question hair profile and an automated curling sequence.',
    ),
    dysonNuralUk: source(
      'Dyson Supersonic Nural hair dryer in Ceramic patina and topaz',
      'Supersonic Nural, Ceramic patina/topaz',
      'UK',
      'https://www.dyson.co.uk/hair-care/hair-dryers/supersonic-nural/ceramic-patina-topaz',
      'Box: the dryer, Flyaway attachment, Styling concentrator, Gentle air attachment, Wave+Curl diffuser and Wide-tooth comb.',
    ),
    dysonCompleteLongUk: source(
      'Dyson Airwrap multi-styler and dryer Complete Long in Nickel/Copper',
      'Airwrap Complete Long, Nickel/Copper',
      'UK',
      'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap/complete-long-nickel-copper',
      'Box: Complete Long unit, 40 mm and 30 mm Airwrap long barrels, firm smoothing brush, soft smoothing brush, round brush for volume, combined dryer and flyaway smoother, filter-cleaning brush and presentation case. Shown as out of stock but still listed; no discontinuation status stated.',
    ),
    dysonAirwrapVsSupersonicUk: source(
      'Dyson UK: Airwrap vs Supersonic',
      'Airwrap and Supersonic families',
      'UK',
      'https://www.dyson.co.uk/discover/insights/hair/airwrap-vs-supersonic-a-comparison-of-two-iconic-machines',
      'Dyson’s own positioning: the Airwrap as a multi-styler for drying, curling, smoothing and hiding flyaways; the Supersonic for fast drying and precision styling with its attachments.',
    ),
    revlonPlusUs: source(
      'Revlon One-Step Volumizer Plus',
      'One-Step Volumizer Plus (model number not stated)',
      'US',
      'https://www.revlonhairtools.com/dryers/one-step-volumizer-plus/',
      'Lists a detachable head with a lock-in head release button, four heat settings (low, medium, high, cool) and a 2.4-inch oval head. No model number, separate speed settings or head measurement basis is stated.',
    ),
    hotTools24kUs: source(
      'Hot Tools 24K Gold One-Step Blowout',
      '24K Gold One-Step Blowout (model number not stated)',
      'US',
      'https://www.hottools.com/24k-gold-one-step-blowout/',
      'Lists a 2.8-inch oval brush head and three heat settings. No model number, control labels, head removal or head measurement basis is stated.',
    ),
    ghdGoldUk: source(
      'ghd Gold hair straightener (26mm plate), black',
      'ghd Gold, black',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/ghd-gold-p-435',
      '26 mm plate, 185°C, sleep after 30 minutes of non-use, 2.7 m cord, two-year warranty.',
    ),
    ghdChronosUk: source(
      'ghd Chronos professional hair straightener (26mm plate), black',
      'ghd Chronos, black',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/ghd-chronos-black-styler-p-650',
      '26 mm plate, 185°C, sleep after 10 minutes of non-use, 2.7 m cord, three-year warranty.',
    ),
    ghdMiniUk: source(
      'ghd Mini hair straightener',
      'ghd Mini, black',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/ghd-mini-black-styler-p-662',
      '“15mm plate” in the overview and “14.6mm plates” in the FAQ; 185°C, sleep after 30 minutes, 2.7 m cord, two-year warranty.',
    ),
    ghdOriginalUk: source(
      'ghd Original hair straightener (24mm plate), black',
      'ghd Original, black',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/ghd-original-p-580',
      '24 mm plate, 185°C, sleep after 30 minutes, 2.7 m cord, two-year warranty.',
    ),
    ghdMaxUk: source(
      'ghd Max wide plate hair straightener',
      'ghd Max, black',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/ghd-max-p-535',
      '42 mm plate, 185°C, sleep after 30 minutes, 2.7 m cord, two-year warranty.',
    ),
    ghdChronosMaxUk: source(
      'ghd Chronos Max hair straightener (43mm plate)',
      'ghd Chronos Max, black',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/ghd-chronos-max-black-styler-p-689',
      '43 mm in the heading and 43.7 mm in the FAQ; 185°C, sleep after 10 minutes, 2.7 m cord, two-year warranty. Its FAQ gives 26.7 mm for the standard Chronos.',
    ),
    ghdPlatinumPlusUk: source(
      'ghd Platinum+ professional hair straightener (26mm plate), black',
      'ghd Platinum+, black',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/ghd-platinum-plus-black-styler-p-453',
      '26 mm plate, 185°C, sleep after 30 minutes, 2.7 m cord, three-year warranty.',
    ),
    ghdCompareUk: source(
      'ghd straightener comparison',
      'Seven ghd straighteners',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/compare',
      'Widths: Gold 25.6 mm, Chronos 26.8 mm, Mini 15.3 mm, Original 25.6 mm, Max 42 mm, Chronos Max 43.7 mm, Platinum+ 26.8 mm. Technology names and heat-up times (20 to 35 seconds). Several widths differ from the individual listings.',
    ),
    ghdSupportDifferenceUk: source(
      'ghd UK support: what is the difference between the ghd straighteners?',
      'ghd straightener range',
      'UK',
      'https://ukie.help.ghdhair.com/hc/en-gb/articles/7498246753810-WHAT-IS-THE-DIFFERENCE-BETWEEN-THE-GHD-STRAIGHTENERS',
      'Gives no model-by-model differences; directs readers to the comparison page.',
    ),
  }) as const satisfies Record<string, GuideSource>)();

const S = modelDecisionSources;

/** Guides published in this release. */
export const modelDecisionSlugs = [
  ArticleSlug.ParluxElysiumVsDigitalyon,
  ArticleSlug.TangleTeezerUltimateDetanglerVsNaturallyCurly,
  ArticleSlug.UnbrushVsWetBrushOriginalDetangler,
  ArticleSlug.Mermade25mmVs32mmWaver,
  ArticleSlug.BeachwaverB1VsB125,
  ArticleSlug.DysonAirwrapFlashingLights,
  ArticleSlug.SharkFlexstyleDiffuserCompatibility,
  ArticleSlug.HairDryerKeepsShuttingOff,
  ArticleSlug.HowToCleanADysonSupersonicFilter,
  ArticleSlug.BestBudgetHairDryersUk,
  // Released after the editorial product-page audit of 26 November 2026.
  ArticleSlug.DysonAirwrapVsSupersonic,
  ArticleSlug.DysonAirwrapIdVsCompleteLong,
  ArticleSlug.HotToolsOneStepVsRevlonOneStepPlus,
  ArticleSlug.GhdGoldVsChronos,
  ArticleSlug.GhdMiniVsOriginal,
  ArticleSlug.HowToChooseAGhdStraightener,
] as const;

/** Existing guides that received substantive section additions (E03–E12). */
export const modelDecisionUpdatedSlugs: readonly string[] = [
  ArticleSlug.SharkFlexstyleModelsCompared,
  ArticleSlug.HowToChooseMultiStylerAttachments,
  ArticleSlug.BestHairDryersFineHair,
  ArticleSlug.BestHairDryersCurlyHair,
  ArticleSlug.BestDetanglingBrushes,
  ArticleSlug.BestHairWavers,
  ArticleSlug.StylingToolTroubleshooting,
  ArticleSlug.HowToCleanHairDryerFilter,
];

export const modelDecisionRelated: Readonly<Record<string, readonly string[]>> =
  {
    [ArticleSlug.ParluxElysiumVsDigitalyon]: [
      ArticleSlug.ParluxDiffuserCompatibility,
      ArticleSlug.ParluxAlyonVsDigitalyon,
      ArticleSlug.HowToCleanHairDryerFilter,
    ],
    [ArticleSlug.TangleTeezerUltimateDetanglerVsNaturallyCurly]: [
      ArticleSlug.TangleTeezerUltimateDetanglerVsFineFragile,
      ArticleSlug.TangleTeezerUltimateDetanglerLargeVsRegular,
      ArticleSlug.BestBrushesCurlyHair,
    ],
    [ArticleSlug.UnbrushVsWetBrushOriginalDetangler]: [
      ArticleSlug.WetBrushOriginalDetanglerVsSpeedDry,
      ArticleSlug.BestDetanglingBrushes,
      ArticleSlug.CanYouUseDetanglingBrushForBlowDrying,
    ],
    [ArticleSlug.Mermade25mmVs32mmWaver]: [
      ArticleSlug.BestHairWavers,
      ArticleSlug.HowToUseAHairWaver,
      ArticleSlug.HairWaverVsCurlingIron,
    ],
    [ArticleSlug.BeachwaverB1VsB125]: [
      ArticleSlug.CurlingIronBarrelSizeGuide,
      ArticleSlug.AutomaticHairCurlerVsCurlingWand,
      ArticleSlug.BestCurlingToolsLongHair,
    ],
    [ArticleSlug.DysonAirwrapFlashingLights]: [
      ArticleSlug.HowToCleanADysonAirwrapFilter,
      ArticleSlug.DysonSupersonicFlashingLights,
      ArticleSlug.StylingToolTroubleshooting,
    ],
    [ArticleSlug.SharkFlexstyleDiffuserCompatibility]: [
      ArticleSlug.SharkFlexstyleModelsCompared,
      ArticleSlug.SharkFlexstyleVsIonCurl,
      ArticleSlug.HairDryerDiffuserCompatibility,
    ],
    [ArticleSlug.HairDryerKeepsShuttingOff]: [
      ArticleSlug.HairDryerOnlyBlowsColdAir,
      ArticleSlug.HairDryerTakesTooLong,
      ArticleSlug.HowToCleanHairDryerFilter,
    ],
    [ArticleSlug.HowToCleanADysonSupersonicFilter]: [
      ArticleSlug.DysonSupersonicFlashingLights,
      ArticleSlug.HowToCleanHairDryerFilter,
      ArticleSlug.DysonSupersonicVsSupersonicNural,
    ],
    [ArticleSlug.BestBudgetHairDryersUk]: [
      ArticleSlug.HairDryerChooser,
      ArticleSlug.BestHairDryersFineHair,
      ArticleSlug.HairDryerDiffuserVsConcentrator,
    ],
    [ArticleSlug.DysonAirwrapVsSupersonic]: [
      ArticleSlug.HowToChooseADysonAirwrap,
      ArticleSlug.DysonSupersonicVsSupersonicNural,
      ArticleSlug.HairDryerDiffuserCompatibility,
    ],
    [ArticleSlug.DysonAirwrapIdVsCompleteLong]: [
      ArticleSlug.HowToChooseADysonAirwrap,
      ArticleSlug.DysonAirwrapAttachmentCompatibility,
      ArticleSlug.DysonAirwrapIdVsCoAnda2x,
    ],
    [ArticleSlug.HotToolsOneStepVsRevlonOneStepPlus]: [
      ArticleSlug.RevlonOneStepVolumizerVsPlus,
      ArticleSlug.BestHotAirBrushes,
      ArticleSlug.DrybarDoubleShotVsRevlonOneStep,
    ],
    [ArticleSlug.GhdGoldVsChronos]: [
      ArticleSlug.GhdChronosVsPlatinumPlus,
      ArticleSlug.GhdOriginalVsGold,
      ArticleSlug.HowToChooseAGhdStraightener,
    ],
    [ArticleSlug.GhdMiniVsOriginal]: [
      ArticleSlug.BestFlatIronsForShortHair,
      ArticleSlug.GhdOriginalVsGold,
      ArticleSlug.HowToChooseAGhdStraightener,
    ],
    [ArticleSlug.HowToChooseAGhdStraightener]: [
      ArticleSlug.GhdGoldVsChronos,
      ArticleSlug.GhdMiniVsOriginal,
      ArticleSlug.GhdChronosVsChronosMax,
    ],
  };

const noTesting = 'No hands-on testing.';

export const modelDecisionEvidence: Readonly<Record<string, GuideEvidence>> =
  /* @__PURE__ */ (() => ({
    [ArticleSlug.ParluxElysiumVsDigitalyon]: {
      summary: `Controls, nozzles, filters, cables and versions come from Parlux’s own product pages, read on 26 November 2026. Parlux publishes no weight for either dryer, so none is shown. Retail bundles vary by country; diffuser fit belongs to the Parlux compatibility guide. ${noTesting}`,
      sources: [S.parluxElysium, S.parluxDigitalyon],
    },
    [ArticleSlug.TangleTeezerUltimateDetanglerVsNaturallyCurly]: {
      summary: `Tooth descriptions, wet-use directions and hair-type positioning are Tangle Teezer’s own wording on its UK listings, read on 26 November 2026. Hair-type positioning is the maker’s guidance, not a fit test. ${noTesting}`,
      sources: [S.ttUltimateDetangler, S.ttNaturallyCurly],
    },
    [ArticleSlug.UnbrushVsWetBrushOriginalDetangler]: {
      summary: `Bristle construction, head design and wet or dry use come from the FHI Heat and Wet Brush US listings, read on 26 November 2026. Each maker’s breakage figure comes from a different test, so neither is compared here. ${noTesting}`,
      sources: [S.unbrushMidnight, S.wetBrushFrostBlack, S.wetBrushCollection],
    },
    [ArticleSlug.Mermade25mmVs32mmWaver]: {
      summary: `Barrel sizes, controls, cord, shut-off and starting directions come from Mermade Hair’s UK listings, read on 26 November 2026. Mermade does not publish the size of the whole head, so the guide uses an off-and-cool placement check instead. ${noTesting}`,
      sources: [S.mermade25, S.mermade32],
    },
    [ArticleSlug.BeachwaverB1VsB125]: {
      summary: `Barrel diameter and length, settings, rotation controls and the dry-hair direction come from Beachwaver’s US product pages, read on 26 November 2026. ${noTesting}`,
      sources: [S.beachwaverB1, S.beachwaverB125],
    },
    [ArticleSlug.DysonAirwrapFlashingLights]: {
      summary: `Light meanings come from Dyson’s UK and US Airwrap i.d. user manuals, read on 26 November 2026. Other Airwrap generations are routed to Dyson support rather than given i.d. meanings. ${noTesting}`,
      sources: [
        S.airwrapIdManualUk,
        S.airwrapIdManualUs,
        S.dysonAirwrapIdSupport,
        S.dysonAirwrapSupport,
      ],
    },
    [ArticleSlug.SharkFlexstyleDiffuserCompatibility]: {
      summary: `Box contents and diffuser compatibility lists come from SharkNinja’s UK, US and Canadian listings, read on 26 November 2026. A box list shows what is included; only a part listing’s compatibility list shows fit, and only for the market it is sold in. ${noTesting}`,
      sources: [
        S.sharkDiffuserUs,
        S.sharkDiffuserCa,
        S.sharkHd430,
        S.sharkHd446uk,
        S.sharkHd432pkuk,
      ],
    },
    [ArticleSlug.HairDryerKeepsShuttingOff]: {
      summary: `Symptom steps come from Electrical Safety First, the Dyson HD16 and HD07 manuals and a retailer-provided BaByliss support page, read on 26 November 2026. Model-specific behaviour stays with the model named. ${noTesting}`,
      sources: [
        S.electricalSafetyFirst,
        S.hd16Manual,
        S.hd07Manual,
        S.argosBabylissSupport,
      ],
    },
    [ArticleSlug.HowToCleanADysonSupersonicFilter]: {
      summary: `Each step comes from the UK HD07 or HD16 user manual, downloaded and read on 26 November 2026. Other Supersonic models are routed to Dyson’s own guidance. ${noTesting}`,
      sources: [S.hd07Manual, S.hd16Manual],
    },
    [ArticleSlug.BestBudgetHairDryersUk]: {
      summary: `Controls, attachments, cords and dimensions come from Remington’s UK listings, read on 26 November 2026, with the prices shown that day. Prices and offers change; recheck before buying. ${noTesting}`,
      sources: [S.remingtonD3010, S.remingtonD5216, S.remingtonD1500],
    },
    [ArticleSlug.DysonAirwrapVsSupersonic]: {
      summary: `Box lists come from Dyson UK’s Airwrap i.d. Straight+Wavy and Supersonic Nural listings and positioning from Dyson UK’s own comparison, read on 26 November 2026. A shared job does not show that parts fit another body. ${noTesting}`,
      sources: [
        S.dysonAirwrapIdSwUk,
        S.dysonNuralUk,
        S.dysonAirwrapVsSupersonicUk,
      ],
    },
    [ArticleSlug.DysonAirwrapIdVsCompleteLong]: {
      summary: `Box lists and the connected curling sequence come from Dyson UK’s two exact listings, read on 26 November 2026. Complete Long was shown out of stock that day. ${noTesting}`,
      sources: [S.dysonAirwrapIdSwUk, S.dysonCompleteLongUk],
    },
    [ArticleSlug.HotToolsOneStepVsRevlonOneStepPlus]: {
      summary: `Head labels, settings and head removal come from the Hot Tools US and Revlon US listings, read on 26 November 2026. Neither states a model number or what its head size measures. ${noTesting}`,
      sources: [S.hotTools24kUs, S.revlonPlusUs],
    },
    [ArticleSlug.GhdGoldVsChronos]: {
      summary: `Temperature, sleep timer, cord and warranty come from ghd UK’s two black listings; the alternative widths come from ghd’s comparison page and the Chronos Max FAQ, all read on 26 November 2026. ${noTesting}`,
      sources: [S.ghdGoldUk, S.ghdChronosUk, S.ghdCompareUk, S.ghdChronosMaxUk],
    },
    [ArticleSlug.GhdMiniVsOriginal]: {
      summary: `Widths, temperature, sleep timer, cord and warranty come from ghd UK’s two black listings and ghd’s comparison page, read on 26 November 2026. The pages give different widths, so each is shown with its page. ${noTesting}`,
      sources: [S.ghdMiniUk, S.ghdOriginalUk, S.ghdCompareUk],
    },
    [ArticleSlug.HowToChooseAGhdStraightener]: {
      summary: `Each row comes from the exact ghd UK black listing and ghd’s comparison page, read on 26 November 2026. ghd’s support article gives no model differences of its own. Selection guide, not a ranking. ${noTesting}`,
      sources: [
        S.ghdMiniUk,
        S.ghdOriginalUk,
        S.ghdGoldUk,
        S.ghdPlatinumPlusUk,
        S.ghdChronosUk,
        S.ghdMaxUk,
        S.ghdChronosMaxUk,
        S.ghdCompareUk,
        S.ghdSupportDifferenceUk,
      ],
    },
  }))();
