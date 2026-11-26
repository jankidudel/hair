import { ArticleSlug } from './article-slug';
import type { GuideEvidence, GuideSource } from './guide-evidence';

/**
 * 25 November 2026 release completion: the 13 guides held on 24 November and
 * the 10 held on 23 November, published with copy and sources from the
 * Comb Report editorial brief of 25 November 2026. Automated rechecks that day
 * read only four of the cited pages; each record states its recheck result.
 * Body copy, including the expanded sections, is the brief's; each guide's
 * two FAQs (needed for the FAQ block) restate fields already on that page.
 */
const checkedDate = '25 November 2026';
/**
 * Internal note (26 November 2026 cleanup): records with `briefDate` were not
 * opened by an editor; on 25 November the maker sites refused automated reads
 * (HTTP 403/429, timeouts, redirect loops, a 404 and an unreadable PDF). They
 * render without a checked date and with a reader-facing scope only.
 */
const briefDate = '';

export const releaseCompletionSources = /* @__PURE__ */ (() =>
  ({
    R01: {
      label: 'Shark UK HD6051SUK',
      model: 'Shark UK HD6051SUK',
      market: 'UK',
      url: 'https://www.sharkninja.co.uk/shark-glam-ceramic-air-styling-and-drying-system-with-frizzfighter-hd6051suk/HD6051SUK.html',
      checkedDate: checkedDate,
      scope:
        'Read 25 November 2026. In the Box: Styling Concentrator, Silki Straightening Tool (heat-controlled ceramic with high-speed airflow), Frizzfighter Tool, Auto-Wrap Curlers, Glossi Blow-Dry Tool. Oval Brush XSKHD60OBUK sold as an add-on.',
    },
    R02: {
      label: 'Dyson UK Airwrap i.d. Straight+Wavy',
      model: 'Dyson UK Airwrap i.d. Straight+Wavy',
      market: 'UK',
      url: 'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-id/straight-wavy-ceramic-patina-topaz',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R03: {
      label: 'Dyson UK Airwrap i.d. support',
      model: 'Dyson UK Airwrap i.d. support',
      market: 'UK',
      url: 'https://www.dyson.co.uk/support/hair-care/hair-stylers/airwrap-id',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R04: {
      label: 'ghd Original UK',
      model: 'ghd Original UK',
      market: 'UK',
      url: 'https://www.ghdhair.com/hair-straighteners/ghd-original-p-580',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R05: {
      label: 'ghd Chronos UK',
      model: 'ghd Chronos UK',
      market: 'UK',
      url: 'https://www.ghdhair.com/hair-straighteners/ghd-chronos-black-styler-p-650/',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R06: {
      label: 'ghd UK Chronos support',
      model: 'ghd UK Chronos support',
      market: 'UK',
      url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/16750263326098-GHD-CHRONOS',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R07: {
      label: 'US Root Booster RVDR5292 listing',
      model: 'US Root Booster RVDR5292 listing',
      market: 'US',
      url: 'https://www.neweggbusiness.com/revlon-rvdr5292/p/9B-1EK-014H-006R1',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R08: {
      label: 'Revlon US Volumizer Plus',
      model: 'Revlon US Volumizer Plus',
      market: 'US',
      url: 'https://www.revlonhairtools.com/dryers/one-step-volumizer-plus/',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R09: {
      label: 'Drybar US Shot Collection',
      model: 'Drybar US Shot Collection',
      market: 'US',
      url: 'https://www.drybar.com/article/the-shot-collection',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R10: {
      label: 'Drybar US Double Shot listing',
      model: 'Drybar US Double Shot listing',
      market: 'US',
      url: 'https://www.drybar.com/hair-care-tools/hair-brushes/the-double-shot-oval-blow-dryer-brush',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R11: {
      label: 'BaByliss 2973U listing',
      model: 'BaByliss 2973U listing',
      market: 'US',
      url: 'https://www.babyliss.com/uk-en/hydro-fusion-anti-frizz-hot-air-styler-2973U.html',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R12: {
      label: 'BaByliss 2973U manual',
      model: 'BaByliss 2973U manual',
      market: 'US',
      url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1755873757962/information-booklets/2973U_IB.pdf',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R13: {
      label: 'BaByliss 2885U manual',
      model: 'BaByliss 2885U manual',
      market: 'US',
      url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1776441461817/information-booklets/2885U_IB.pdf',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R14: {
      label: 'ghd US Duet Blowdry, black',
      model: 'ghd US Duet Blowdry, black',
      market: 'US',
      url: 'https://www.ghdhair.com/us/wet-to-dry/ghd-duet-blowdry-hair-dryer-brush-in-black-p-663',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R15: {
      label: 'T3 US Lucea 1-inch',
      model: 'T3 US Lucea 1-inch',
      market: 'US',
      url: 'https://t3micro.com/collections/flat-irons/products/lucea-1-straightening-and-styling-iron',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R16: {
      label: 'T3 US SinglePass StyleMax',
      model: 'T3 US SinglePass StyleMax',
      market: 'US',
      url: 'https://t3micro.com/products/singlepass-stylemax-1-inch-flat-iron',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R17: {
      label: 'ghd UK Ceramic Radial range',
      model: 'ghd UK Ceramic Radial range',
      market: 'UK',
      url: 'https://www.ghdhair.com/ceramic-brushes-c',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R18: {
      label: 'Denman UK Head Hugger',
      model: 'Denman UK Head Hugger',
      market: 'UK',
      url: 'https://denmanbrush.com/collections/shop-all/products/dhh-head-hugger-rose-gold-range',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R19: {
      label: 'Olivia Garden US Ceramic + Ion Thermal Round',
      model: 'Olivia Garden US Ceramic + Ion Thermal Round',
      market: 'US',
      url: 'https://store.oliviagarden.com/products/ceramic-ion-thermal',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R20: {
      label: 'Mermade UK waver range',
      model: 'Mermade UK waver range',
      market: 'UK',
      url: 'https://mermadehair.co.uk/collections/wavers',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R21: {
      label: 'Mermade UK 32 mm Original Pro Waver',
      model: 'Mermade UK 32 mm Original Pro Waver',
      market: 'UK',
      url: 'https://mermadehair.co.uk/collections/hair-tools/products/pro-waver-black-32mm',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R22: {
      label: 'amika UK High Tide Deep Waver',
      model: 'amika UK High Tide Deep Waver',
      market: 'UK',
      url: 'https://uk.loveamika.com/products/high-tide-deep-waver',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R23: {
      label: 'Remington UK Keratin Protect AS8811',
      model: 'Remington UK Keratin Protect AS8811',
      market: 'UK',
      url: 'https://uk.remington-europe.com/keratin-protect-rotating-air-styler-as8811-uk',
      checkedDate: checkedDate,
      scope:
        'Read 25 November 2026. Rotating air styler with 40 mm and 50 mm thermal brushes and a Root Boost Attachment; cool shot, hanging loop and swivel cord listed. Direction controls are not described on the listing.',
    },
    R24: {
      label: 'Dyson UK Supersonic support and flashing-light guidance',
      model: 'Dyson UK Supersonic support and flashing-light guidance',
      market: 'UK',
      url: 'https://www.dyson.co.uk/support/hair-care/hair-dryers/supersonic',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R25: {
      label: 'Dyson UK Supersonic Nural support',
      model: 'Dyson UK Supersonic Nural support',
      market: 'UK',
      url: 'https://www.dyson.co.uk/support/hair-care/hair-dryers/supersonic-nural',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R26: {
      label: 'ghd UK red flashing light support',
      model: 'ghd UK red flashing light support',
      market: 'UK',
      url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/26867937557138-MY-PRODUCT-HAS-A-RED-FLASHING-LIGHT-WHAT-DOES-THIS-MEAN',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R27: {
      label: 'Dyson UK Airwrap curling guidance',
      model: 'Dyson UK Airwrap curling guidance',
      market: 'UK',
      url: 'https://www.dyson.co.uk/discover/insights/hair/styles/dyson-airwrap-curling-tips',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R28: {
      label: 'Dyson US Origin box',
      model: 'Dyson US Origin box',
      market: 'US',
      url: 'https://www.dyson.com/hair-care/hair-stylers/airwrap-origin/nickel-copper',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R29: {
      label: 'Dyson US i.d. box',
      model: 'Dyson US i.d. box',
      market: 'US',
      url: 'https://www.dyson.com/hair-care/hair-stylers/airwrap-id/straight-wavy-plum-copper',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R30: {
      label: 'Dyson US Co-anda2x box',
      model: 'Dyson US Co-anda2x box',
      market: 'US',
      url: 'https://www.dyson.com/hair-care/hair-stylers/airwrap-co-anda2x/straight-wavy-ceramic-pink-rose-gold',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R31: {
      label: 'Dyson UK Supersonic Origin',
      model: 'Dyson UK Supersonic Origin',
      market: 'UK',
      url: 'https://www.dyson.co.uk/hair-care/hair-dryers/supersonic/origin-black-nickel',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R32: {
      label: 'Dyson UK Supersonic Nural',
      model: 'Dyson UK Supersonic Nural',
      market: 'UK',
      url: 'https://www.dyson.co.uk/hair-care/hair-dryers/supersonic-nural/ceramic-patina-topaz',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R33: {
      label: 'Dyson’s Supersonic and Nural feature comparison',
      model: 'Dyson’s Supersonic and Nural feature comparison',
      market: 'UK',
      url: 'https://www.dyson.co.uk/discover/insights/hair/supersonic-vs-nural',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R34: {
      label: 'ghd UK Gold',
      model: 'ghd UK Gold',
      market: 'UK',
      url: 'https://www.ghdhair.com/hair-straighteners/ghd-gold-p-435',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R35: {
      label: 'ghd UK Gold support',
      model: 'ghd UK Gold support',
      market: 'UK',
      url: 'https://ukie.help.ghdhair.com/hc/en-gb/articles/7498584572434-GHD-GOLD',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R36: {
      label: 'Shark US SpeedStyle HD332',
      model: 'Shark US SpeedStyle HD332',
      market: 'US',
      url: 'https://www.sharkninja.com/shark-speedstyle-for-curly-coily-hair/HD332.html',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R37: {
      label: 'Best Buy US SpeedStyle HD332 listing',
      model: 'Best Buy US SpeedStyle HD332 listing',
      market: 'US',
      url: 'https://www.bestbuy.com/product/shark-speedstyle-rapidgloss-finisher-and-high-velocity-dryer-silk-curly-coily/6572652',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R38: {
      label: 'Shark US FlexStyle HD430',
      model: 'Shark US FlexStyle HD430',
      market: 'US',
      url: 'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
      checkedDate: checkedDate,
      scope:
        'Read 25 November 2026. In the Box: two 1.25-inch Auto-Wrap Curlers, Oval Brush, Paddle Brush, Styling Concentrator; no diffuser in the box list (sold separately). Title says Stone; the spec list says Beige.',
    },
    R39: {
      label: 'Best Buy US Shark SmoothStyle HT202 listing',
      model: 'Best Buy US Shark SmoothStyle HT202 listing',
      market: 'US',
      url: 'https://www.bestbuy.com/product/shark-smoothstyle-heated-comb-and-blow-dryer-brush-dual-mode-for-all-hair-types-silk/6552954',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R40: {
      label: 'Shark US blow-dry brush support and parts',
      model: 'Shark US blow-dry brush support and parts',
      market: 'US',
      url: 'https://www.sharkninja.com/parts-support/beauty-parts/blow-dry-brushes',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R41: {
      label: 'Wet Brush Original Detangler, Frost Black',
      model: 'Wet Brush Original Detangler, Frost Black',
      market: 'US',
      url: 'https://wetbrush.com/products/original-detangler-frost-black',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R42: {
      label: 'Wet Brush Speed Dry, Frost Black',
      model: 'Wet Brush Speed Dry, Frost Black',
      market: 'US',
      url: 'https://wetbrush.com/products/speed-dry-frost-black-black',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R43: {
      label: 'ghd Mini UK',
      model: 'ghd Mini UK',
      market: 'UK',
      url: 'https://www.ghdhair.com/hair-straighteners/ghd-mini-black-styler-p-662',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R44: {
      label: 'Cloud Nine Slim Iron UK',
      model: 'Cloud Nine Slim Iron UK',
      market: 'UK',
      url: 'https://www.cloudninehair.com/products/the-slim-iron',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R45: {
      label: 'Conair US SD11GNX',
      model: 'Conair US SD11GNX',
      market: 'US',
      url: 'https://conair.com/detangle%2C-straighten-%26-volumize%2C-3-in-1-ionic-styling-hair-dryer/SD11GNX.html?lang=en_US',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R46: {
      label: 'Conair US SD6RN',
      model: 'Conair US SD6RN',
      market: 'US',
      url: 'https://conair.com/en/1875-watt-3-in-1-ionic-dryer/SD6RN.html?lang=en_US',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R47: {
      label: 'Shark US separately sold SpeedStyle comb',
      model: 'Shark US separately sold SpeedStyle comb',
      market: 'US',
      url: 'https://www.sharkninja.com/shark-speedstyle-lift-stretch-wide-tooth-comb/XSKHD3WTCA.html',
      checkedDate: checkedDate,
      scope:
        'Read 25 November 2026. Sold separately; compatible with HD300, HD301, HD331, HD332, HD341HRG, HD341HWH, HD352 and HD331REF.',
    },
    R48: {
      label: 'Dyson UK earlier Airwrap support',
      model: 'Dyson UK earlier Airwrap support',
      market: 'UK',
      url: 'https://www.dyson.co.uk/support/hair-care/hair-stylers/airwrap',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R49: {
      label: 'Dyson UK Co-anda2x guide',
      model: 'Dyson UK Co-anda2x guide',
      market: 'UK',
      url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/dyson-airwrap-multi-styler/587990-01.pdf',
      checkedDate: briefDate,
      scope:
        'Maker’s document for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
    R50: {
      label: 'Revlon US Salon One-Step Hair Dryer and Volumizer',
      model: 'Revlon US Salon One-Step Hair Dryer and Volumizer',
      market: 'US',
      url: 'https://www.revlonhairtools.com/dryers/salon-one-step-hair-dryer-and-volumizer/',
      checkedDate: briefDate,
      scope:
        'Maker’s listing for the exact model and market named; the details this guide cites come from it. Check current details here before buying.',
    },
  }) as const satisfies Record<string, GuideSource>)();

const S = releaseCompletionSources;

/** Guides published in this release (formerly held drafts). */
export const releaseCompletionSlugs = [
  ArticleSlug.SharkGlamVsDysonAirwrapId,
  ArticleSlug.GhdOriginalVsChronos,
  ArticleSlug.RevlonOneStepRootBoosterVsPlus,
  ArticleSlug.DrybarDoubleShotVsSingleShotVsHalfShot,
  ArticleSlug.BabylissHydroFusionVsBigHair,
  ArticleSlug.GhdDuetBlowdryVsRevlonOneStepPlus,
  ArticleSlug.T3LuceaVsSinglepassStylemax,
  ArticleSlug.BestRoundBrushesForBlowouts,
  ArticleSlug.BestHairWavers,
  ArticleSlug.BestRotatingHotAirBrushes,
  ArticleSlug.DysonSupersonicFlashingLights,
  ArticleSlug.GhdStraightenerFlashingRedAndBeeping,
  ArticleSlug.WhyDysonAirwrapCurlsDontLast,
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

/** Existing owners received contextual links only, not substantive rewrites. */
export const releaseCompletionUpdatedSlugs: readonly string[] = [];

export const releaseCompletionRelated: Readonly<
  Record<string, readonly string[]>
> = {
  [ArticleSlug.SharkGlamVsDysonAirwrapId]: [
    ArticleSlug.SharkGlamVsFlexstyle,
    ArticleSlug.DysonAirwrapVsSharkFlexstyle,
    ArticleSlug.HowToChooseMultiStylerAttachments,
  ],
  [ArticleSlug.GhdOriginalVsChronos]: [
    ArticleSlug.BestAdjustableTemperatureHairStraighteners,
    ArticleSlug.GhdOriginalVsGold,
    ArticleSlug.GhdChronosVsPlatinumPlus,
  ],
  [ArticleSlug.RevlonOneStepRootBoosterVsPlus]: [
    ArticleSlug.RevlonOneStepVolumizerVsPlus,
    ArticleSlug.HotAirBrushBarrelSizeGuide,
  ],
  [ArticleSlug.DrybarDoubleShotVsSingleShotVsHalfShot]: [
    ArticleSlug.DrybarDoubleShotVsRevlonOneStep,
    ArticleSlug.HotAirBrushBarrelSizeGuide,
  ],
  [ArticleSlug.BabylissHydroFusionVsBigHair]: [
    ArticleSlug.BestRotatingHotAirBrushes,
    ArticleSlug.HowToUseARotatingHotAirBrush,
  ],
  [ArticleSlug.GhdDuetBlowdryVsRevlonOneStepPlus]: [
    ArticleSlug.DysonAirsmoothVsGhdDuetBlowdry,
    ArticleSlug.RevlonOneStepVolumizerVsPlus,
  ],
  [ArticleSlug.T3LuceaVsSinglepassStylemax]: [
    ArticleSlug.FlatIronPlateWidthGuide,
    ArticleSlug.BestFlatIrons,
  ],
  [ArticleSlug.BestRoundBrushesForBlowouts]: [
    ArticleSlug.HowToBlowDryAFringe,
    ArticleSlug.HowToBlowDryABobWithARoundBrush,
    ArticleSlug.HowToBlowDryLongHairWithARoundBrush,
  ],
  [ArticleSlug.BestHairWavers]: [
    ArticleSlug.HowToUseAHairWaver,
    ArticleSlug.HairWaverVsCurlingIron,
  ],
  [ArticleSlug.BestRotatingHotAirBrushes]: [
    ArticleSlug.BabylissHydroFusionVsBigHair,
    ArticleSlug.RotatingVsFixedHotAirBrush,
    ArticleSlug.HowToUseARotatingHotAirBrush,
  ],
  [ArticleSlug.DysonSupersonicFlashingLights]: [
    ArticleSlug.HowToCleanHairDryerFilter,
    ArticleSlug.HairDryerOnlyBlowsColdAir,
  ],
  [ArticleSlug.GhdStraightenerFlashingRedAndBeeping]: [
    ArticleSlug.StylingToolTroubleshooting,
    ArticleSlug.GhdChronosVsPlatinumPlus,
  ],
  [ArticleSlug.WhyDysonAirwrapCurlsDontLast]: [
    ArticleSlug.WhyCurlsFallOut,
    ArticleSlug.DysonAirwrapAttachmentCompatibility,
    ArticleSlug.DysonAirwrapIdVsCoAnda2x,
  ],
  [ArticleSlug.HowToChooseADysonAirwrap]: [
    ArticleSlug.DysonAirwrapIdVsCoAnda2x,
    ArticleSlug.DysonAirwrapAttachmentCompatibility,
    ArticleSlug.HowToCleanADysonAirwrapFilter,
  ],
  [ArticleSlug.DysonSupersonicVsSupersonicNural]: [
    ArticleSlug.HairDryerDiffuserCompatibility,
    ArticleSlug.DysonSupersonicNuralVsSupersonicR,
  ],
  [ArticleSlug.GhdOriginalVsGold]: [
    ArticleSlug.BestAdjustableTemperatureHairStraighteners,
    ArticleSlug.GhdGoldVsPlatinumPlus,
    ArticleSlug.GhdOriginalVsChronos,
  ],
  [ArticleSlug.SharkSpeedstyleVsFlexstyle]: [
    ArticleSlug.SharkSpeedstyleProVsProFlex,
    ArticleSlug.DysonAirwrapVsSharkFlexstyle,
  ],
  [ArticleSlug.RevlonOneStepPlusVsSharkSmoothstyle]: [
    ArticleSlug.RevlonOneStepVolumizerVsPlus,
    ArticleSlug.BestHotAirBrushes,
  ],
  [ArticleSlug.WetBrushOriginalDetanglerVsSpeedDry]: [
    ArticleSlug.CanYouUseDetanglingBrushForBlowDrying,
    ArticleSlug.TangleTeezerVsWetBrushOriginal,
  ],
  [ArticleSlug.BestFlatIronsForShortHair]: [
    ArticleSlug.FlatIronPlateWidthGuide,
    ArticleSlug.BestAdjustableTemperatureHairStraighteners,
  ],
  [ArticleSlug.HairDryersWithCombAttachment]: [
    ArticleSlug.HairDryerCombAttachmentVsConcentrator,
    ArticleSlug.HowToUseAHairDryerCombAttachment,
  ],
  [ArticleSlug.HowToCleanADysonAirwrapFilter]: [
    ArticleSlug.DysonAirwrapIdVsCoAnda2x,
    ArticleSlug.HowToChooseADysonAirwrap,
  ],
  [ArticleSlug.DrybarDoubleShotVsRevlonOneStep]: [
    ArticleSlug.DrybarDoubleShotVsSingleShotVsHalfShot,
    ArticleSlug.RevlonOneStepVolumizerVsPlus,
    ArticleSlug.RevlonOneStepPlusVsSharkSmoothstyle,
  ],
};

export const releaseCompletionEvidence: Readonly<
  Record<string, GuideEvidence>
> = /* @__PURE__ */ (() => ({
  [ArticleSlug.SharkGlamVsDysonAirwrapId]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named; the SharkNinja UK box list was checked on 25 November 2026. No hands-on testing.',
    sources: [S.R01, S.R02, S.R03],
  },
  [ArticleSlug.GhdOriginalVsChronos]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R04, S.R05, S.R06],
  },
  [ArticleSlug.RevlonOneStepRootBoosterVsPlus]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R07, S.R08],
  },
  [ArticleSlug.DrybarDoubleShotVsSingleShotVsHalfShot]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R09, S.R10],
  },
  [ArticleSlug.BabylissHydroFusionVsBigHair]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R11, S.R12, S.R13],
  },
  [ArticleSlug.GhdDuetBlowdryVsRevlonOneStepPlus]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R14, S.R08],
  },
  [ArticleSlug.T3LuceaVsSinglepassStylemax]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R15, S.R16],
  },
  [ArticleSlug.BestRoundBrushesForBlowouts]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R17, S.R18, S.R19],
  },
  [ArticleSlug.BestHairWavers]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R20, S.R21, S.R22],
  },
  [ArticleSlug.BestRotatingHotAirBrushes]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named; the Remington AS8811 listing was checked on 25 November 2026. No hands-on testing.',
    sources: [S.R11, S.R23],
  },
  [ArticleSlug.DysonSupersonicFlashingLights]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R24, S.R25],
  },
  [ArticleSlug.GhdStraightenerFlashingRedAndBeeping]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R26, S.R06],
  },
  [ArticleSlug.WhyDysonAirwrapCurlsDontLast]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R27, S.R03],
  },
  [ArticleSlug.HowToChooseADysonAirwrap]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R28, S.R29, S.R30],
  },
  [ArticleSlug.DysonSupersonicVsSupersonicNural]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R31, S.R32, S.R33],
  },
  [ArticleSlug.GhdOriginalVsGold]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R04, S.R34, S.R35],
  },
  [ArticleSlug.SharkSpeedstyleVsFlexstyle]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named; the SharkNinja US HD430 box list was checked on 25 November 2026. No hands-on testing.',
    sources: [S.R36, S.R37, S.R38],
  },
  [ArticleSlug.RevlonOneStepPlusVsSharkSmoothstyle]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R08, S.R39, S.R40],
  },
  [ArticleSlug.WetBrushOriginalDetanglerVsSpeedDry]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R41, S.R42],
  },
  [ArticleSlug.BestFlatIronsForShortHair]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R43, S.R44, S.R34],
  },
  [ArticleSlug.HairDryersWithCombAttachment]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named; the Shark comb listing was checked on 25 November 2026. No hands-on testing.',
    sources: [S.R45, S.R46, S.R47],
  },
  [ArticleSlug.HowToCleanADysonAirwrapFilter]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R03, S.R48, S.R49],
  },
  [ArticleSlug.DrybarDoubleShotVsRevlonOneStep]: {
    summary:
      'Fields come from the maker pages listed below for the exact models named. No hands-on testing.',
    sources: [S.R10, S.R50],
  },
}))();
