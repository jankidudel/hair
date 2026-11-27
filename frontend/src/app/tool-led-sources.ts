import type { GuideSource } from './guide-evidence';

/**
 * Manufacturer records for the 27 November 2026 tool-led batch: the Hair
 * Dryer Attachment Finder, Hair Tool Size Visualiser, Used Multi-Styler
 * Checklist and their twelve guides.
 *
 * Internal note on verification (never rendered):
 * - Read by automated request on 27 November 2026 (HTTP 200): every
 *   SharkNinja UK and US page below, the T3 SinglePass Curl X listing and both
 *   Hot Tools listings. Those records carry that date.
 * - Read by an editor in a browser on 26 November 2026 (official product page
 *   audit): ghd Mini, Chronos Max and compare page, Dyson Airwrap i.d.
 *   Straight+Wavy, Supersonic Nural and Complete Long. Those keep that date;
 *   the ghd Helios and p-281 records keep the 27 November release-fix date.
 * - Parlux MagicSense and MagicCompact: 18 November 2026 records reused
 *   (parlux.it returned 429 on 27 November).
 * - ghdhair.com, ukie.help.ghdhair.com and dyson.co.uk refused automated
 *   requests (HTTP 403) and store.oliviagarden.com returned 429 on
 *   27 November 2026. Records first cited in this batch from those sites use
 *   the facts stated in the 27 November tool-led handover and carry no
 *   checked date, following the site convention for unverified records.
 */
const read = '27 November 2026';
const audit = '26 November 2026';
const releaseFix = '27 November 2026';

const src = (
  label: string,
  model: string,
  market: string,
  url: string,
  checkedDate: string,
  scope: string,
): GuideSource => ({ label, model, market, url, checkedDate, scope });

export const toolLedSources = /* @__PURE__ */ (() =>
  ({
    // ghd UK dryers and accessories.
    ghdDiffuser: src(
      'ghd professional hair dryer diffuser',
      'ghd diffuser (p-281)',
      'UK',
      'https://www.ghdhair.com/hair-dryers/ghd-hair-dryer-diffuser-p-281',
      releaseFix,
      'Separately sold diffuser for the ghd Air family. The product feature says to use it with Air and to add the adapter ring for Helios; a separate footnote says the Air 1.0 needs the ring. A fit statement, not a box list for any dryer.',
    ),
    ghdFitFaq: src(
      'ghd support: which hair dryer can I use the diffuser with?',
      'ghd diffuser (p-281)',
      'UK',
      'https://ukie.help.ghdhair.com/hc/en-gb/articles/7498083142034-WHICH-HAIR-DRYER-CAN-I-USE-THE-GHD-PROFESSIONAL-HAIR-DRYER-DIFFUSER-WITH',
      '',
      'ghd support answer on diffuser fit: the Air 1.0 needs the adapter ring, and the diffuser is not for the Flight+.',
    ),
    ghdHelios: src(
      'ghd Helios professional hair dryer in black',
      'ghd Helios, black (p-497)',
      'UK',
      'https://www.ghdhair.com/hair-dryers/ghd-black-helios-p-497',
      releaseFix,
      'Lists a contoured nozzle with the dryer, variable controls with a cool shot and a 3 m cord. States no nozzle width, heat or speed counts, or weight.',
    ),
    ghdWideNozzle: src(
      'ghd professional wide styling nozzle',
      'ghd Wide Styling Nozzle (p-519)',
      'UK',
      'https://www.ghdhair.com/hair-dryer-accessories/ghd-professional-wide-styling-nozzle-p-519',
      '',
      'Separately sold 88 mm wide nozzle that lists the Helios.',
    ),
    ghdCombNozzle: src(
      'ghd professional comb nozzle',
      'ghd Comb Nozzle (p-518)',
      'UK',
      'https://www.ghdhair.com/hair-dryer-accessories/ghd-professional-comb-nozzle-p-518',
      '',
      'Separately sold comb nozzle that lists the Helios. No width is published.',
    ),
    // ghd UK straighteners and curling tools.
    ghdMini: src(
      'ghd Mini hair straightener',
      'ghd Mini, black (p-662)',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/ghd-mini-black-styler-p-662',
      audit,
      '“15mm plate” in the overview and “14.6mm plates” in the FAQ.',
    ),
    ghdChronosMax: src(
      'ghd Chronos Max hair straightener',
      'ghd Chronos Max, black (p-689)',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/ghd-chronos-max-black-styler-p-689',
      audit,
      '43 mm in the heading and 43.7 mm in the FAQ.',
    ),
    ghdCompare: src(
      'ghd straightener comparison',
      'ghd straighteners',
      'UK',
      'https://www.ghdhair.com/hair-straighteners/compare',
      audit,
      'Comparison-table widths include Mini 15.3 mm and Chronos Max 43.7 mm, which differ from some individual listings.',
    ),
    ghdClassicTong: src(
      'ghd Chronos Curve Classic Tong',
      'ghd Chronos Curve Classic Tong (p-704)',
      'UK',
      'https://www.ghdhair.com/curling-wands-and-tongs/ghd-chronos-curve-classic-tong-p-704',
      '',
      '26 mm barrel clip tong at 185°C. No heated barrel length is published.',
    ),
    ghdGrandTong: src(
      'ghd Chronos Curve Grand Tong',
      'ghd Chronos Curve Grand Tong (p-705)',
      'UK',
      'https://www.ghdhair.com/curling-wands-and-tongs/ghd-chronos-curve-grand-tong-p-705',
      '',
      '32 mm barrel clip tong at 185°C. No heated barrel length is published.',
    ),
    ghdConicalWand: src(
      'ghd Chronos Curve Conical Wand',
      'ghd Chronos Curve Conical Wand (p-702)',
      'UK',
      'https://www.ghdhair.com/curling-wands-and-tongs/ghd-chronos-curve-conical-wand-p-702',
      '',
      'Tapered wand with 28 mm and 23 mm end diameters. No heated barrel length is published.',
    ),
    ghdMaxWand: src(
      'ghd Chronos Curve Max Wand',
      'ghd Chronos Curve Max Wand (p-703)',
      'UK',
      'https://www.ghdhair.com/curling-wands-and-tongs/ghd-chronos-curve-max-wand-p-703',
      '',
      '38 mm straight barrel wand. No heated barrel length is published.',
    ),
    // SharkNinja UK.
    sharkUkDiffuser: src(
      'Shark SpeedStyle Pro Flex Diffuser',
      'XSKHD5DMSEU',
      'UK',
      'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-diffuser/XSKHD5DMSEU.html',
      read,
      '“Compatible with: HD500EU, HD500UK, HD542EU, HD542UK.”',
    ),
    sharkUkConcentrator: src(
      'Shark SpeedStyle Pro Flex Precision Concentrator',
      'XSKHD5CMSEU',
      'UK',
      'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-precision-concentrator/XSKHD5CMSEU.html',
      read,
      '“Compatible with: HD500EU, HD500UK, HD542EU, HD542UK.”',
    ),
    sharkUkPolisher: src(
      'Shark SpeedStyle Pro Flex Polisher',
      'XSKHD5PFMSEU',
      'UK',
      'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-polisher/XSKHD5PFMSEU.html',
      read,
      '“Compatible with: HD500EU, HD500UK, HD542EU, HD542UK.”',
    ),
    sharkUkRoundBrush: src(
      'Shark SpeedStyle Pro Flex Rotating Round Brush',
      'XSKHD5RBMSEU',
      'UK',
      'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-rotating-round-brush/XSKHD5RBMSEU.html',
      read,
      '“Compatible with: HD500EU, HD500UK, HD542EU, HD542UK.”',
    ),
    sharkHd542uk: src(
      'Shark SpeedStyle Pro FLEX 4-in-1 High-Velocity Hair Dryer System HD542UK',
      'HD542UK, Mocha Silver',
      'UK',
      'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-4-in-1-high-velocity-hair-dryer-system-hd542uk/HD542UK.html?dwvar_HD542UK_color=B0A69C',
      read,
      'In the box: Main Unit, Turbo Concentrator, QuickSmooth Brush, DefrizzFast Diffuser, FrizzFighter Finishing Tool and Instruction Booklet. The box names no spare-part codes.',
    ),
    // SharkNinja US.
    sharkUsHd300Diffuser: src(
      'Shark SpeedStyle DefrizzFast Diffuser',
      'XSKHD3DA',
      'US',
      'https://www.sharkninja.com/shark-speedstyle-defrizzfast-diffuser/XSKHD3DA.html',
      read,
      '“Compatible with: HD300, HD301, HD331, HD332, HD341HRG, HD341HWH, HD352, HD331REF” and “Compatible only with Shark SpeedStyle (HD300 Series).”',
    ),
    sharkUsHd500Diffuser: src(
      'Shark SpeedStyle Pro Flex DefrizzFast Diffuser',
      'XSKHD5DAMS',
      'US',
      'https://www.sharkninja.com/shark-speedstyle-pro-flex-defrizzfast-diffuser/XSKHD5DAMS.html',
      read,
      '“Compatible with: HD500, HD542, HD542C, HD541HBR.”',
    ),
    sharkHd430: src(
      'Shark FlexStyle 5-in-1 Air Styler & Hair Dryer, Stone',
      'HD430, Stone',
      'US',
      'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
      read,
      'In the box: Shark FlexStyle Air Drying & Styling System, two 1.25” Auto-Wrap Curlers, Oval Brush, Paddle Brush and Styling Concentrator. The Curl-Defining Diffuser XSKHD4DA appears only under Add-ons & Accessories.',
    ),
    sharkHd430ref: src(
      'Shark FlexStyle Certified Renewed 5-in-1 Air Styler & Hair Dryer',
      'HD430REF, Beige',
      'US',
      'https://www.sharkninja.com/shark-certified-renewed-flexstyle-air-styling-drying-system---straight-wavy/HD430REF.html',
      read,
      'Product Details: “Includes 2 curlers to curl in different directions.” No In the Box list. Paddle brush, concentrator, oval brush, diffuser and other parts appear under Add-ons & Accessories.',
    ),
    sharkFlexDiffuser: src(
      'Shark FlexStyle Curl-Defining Diffuser',
      'XSKHD4DA, Stone',
      'US',
      'https://www.sharkninja.com/shark-flexstyle-curl-defining-diffuser/XSKHD4DA.html',
      read,
      '“Compatible with: HD400, HD435, HD440, HD430REF, HD435REF, HD432PK.” Standard HD430 is not named.',
    ),
    // Dyson UK.
    dysonWaveCurlVariant: src(
      'Dyson support: Wave+Curl diffuser for Supersonic Nural (Ceramic patina/topaz)',
      'Wave+Curl diffuser 973924-01, Supersonic Nural Ceramic patina/topaz',
      'UK',
      'https://www.dyson.co.uk/support/journey/tools/973924-01.514298-01',
      '',
      'Matches part 973924-01 to the named Supersonic Nural variant.',
    ),
    dysonWaveCurl: src(
      'Dyson support: Supersonic Wave+Curl diffuser',
      'Wave+Curl diffuser 973924-01',
      'UK',
      'https://www.dyson.co.uk/support/journey/tools/973924-01',
      '',
      'Dome and Diffuse modes set by removing or fitting the prong insert. Describes physical fit on previous Supersonic dryers and reserves Attachment Learning for Supersonic Nural.',
    ),
    dysonNural: src(
      'Dyson Supersonic Nural hair dryer in Ceramic patina and topaz',
      'Supersonic Nural, Ceramic patina/topaz',
      'UK',
      'https://www.dyson.co.uk/hair-care/hair-dryers/supersonic-nural/ceramic-patina-topaz',
      audit,
      'Box: the dryer, Flyaway attachment, Styling concentrator, Gentle air attachment, Wave+Curl diffuser and Wide-tooth comb.',
    ),
    dysonNuralManual: src(
      'Dyson Supersonic Nural user manual (UK, PDF)',
      'Dyson Supersonic Nural HD16',
      'UK',
      'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/dyson-supersonic-nural/HD16_OUG_MASTER.pdf',
      audit,
      'HD16 operating manual. Use it to confirm the model code; the attachment modes come from Dyson’s support page.',
    ),
    dysonIdStraightWavy: src(
      'Dyson Airwrap i.d. Straight+Wavy, Ceramic Patina/Topaz',
      'Airwrap i.d. Straight+Wavy, Ceramic Patina/Topaz',
      'UK',
      'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-id/straight-wavy-ceramic-patina-topaz',
      audit,
      'Box: Airwrap i.d. unit, Fast dryer, 40mm Airwrap barrel, Conical Airwrap barrel, Soft smoothing brush, Large round volumising brush, Dryer+Flyaway smoother, Filter cleaning brush and Presentation case.',
    ),
    dysonIdDiffuser: src(
      'Dyson Airwrap i.d. with Diffuser, Vinca Blue/Topaz',
      'Airwrap i.d. with Diffuser (Curly+Coily page), Vinca Blue/Topaz',
      'UK',
      'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap-id/curly-coily-vinca-blue-topaz',
      '',
      'Box: Airwrap i.d. unit, Wave+Curl diffuser, Filter cleaning brush, Firm smoothing brush, Conical Airwrap barrel, Large round volumising brush, Presentation case, Fast dryer and Wide-tooth comb.',
    ),
    dysonIdDiffuserRefurb: src(
      'Dyson Refurbished Airwrap i.d. with Diffuser, Vinca Blue/Topaz',
      'Refurbished Airwrap i.d. with Diffuser, Vinca Blue/Topaz',
      'UK',
      'https://www.dyson.co.uk/refurbished/personal-care/airwrap-id-curly-coily-vinca-blue-topaz',
      '',
      'Dyson refurbished listing. Names the same pieces as the retail With Diffuser box. A separate package from the retail kit.',
    ),
    dysonCompleteLong: src(
      'Dyson Airwrap Complete Long in Nickel/Copper',
      'Airwrap Complete Long, Nickel/Copper',
      'UK',
      'https://www.dyson.co.uk/hair-care/hair-stylers/airwrap/complete-long-nickel-copper',
      audit,
      'Box: Complete Long unit, 40 mm and 30 mm Airwrap long barrels, Firm smoothing brush, Soft smoothing brush, Round volumising brush, Dryer+Flyaway smoother, Filter cleaning brush and Presentation case.',
    ),
    dysonCompleteLongRefurb: src(
      'Dyson Refurbished Airwrap Long, Nickel/Copper',
      'Refurbished Airwrap Complete Long, Nickel/Copper',
      'UK',
      'https://www.dyson.co.uk/refurbished/personal-care/airwrap-long-nickel-copper',
      '',
      'Lists the main unit without an itemised attachment list.',
    ),
    dysonIdSupport: src(
      'Dyson UK Airwrap i.d. support',
      'Dyson Airwrap i.d.',
      'UK',
      'https://www.dyson.co.uk/support/hair-care/hair-stylers/airwrap-id',
      '',
      'Dyson’s own support home for the Airwrap i.d., including its manual and guidance.',
    ),
    // Parlux (manufacturer international catalogue), reused records.
    parluxMagicSense: src(
      'Parlux MagicSense diffuser',
      'Parlux MagicSense',
      'Manufacturer (international English)',
      'https://www.parlux.it/en/products/magicsense-diffuser',
      '18 November 2026',
      'Direct fit named for Alyon, Digitalyon and Advance; 3500, 385 and Elysium excluded. Ethos appears only on the Italian listing.',
    ),
    parluxMagicCompact: src(
      'Parlux MagicCompact diffuser',
      'Parlux MagicCompact',
      'Manufacturer (international English)',
      'https://www.parlux.it/en/products/diffusore-magiccompact%C2%AE',
      '18 November 2026',
      'Documented exclusively for the Parlux Elysium.',
    ),
    // US curling irons and brushes.
    t3CurlX: src(
      'T3 SinglePass Curl X',
      'SinglePass Curl X, 1″, 1.25″ and 1.5″',
      'US',
      'https://t3micro.com/collections/curling-irons/products/singlepass-curl-x-1-ceramic-extra-long-barrel-curling-iron',
      read,
      'Barrel Size chooser: 1″, 1.25″ and 1.5″. “1″ Iron Weight: 10.6oz (cord not included)”, “1.25″ Iron Weight: 13.2oz (cord not included)”, “1.5″ Iron Weight: 15.1oz (cord not included)”. “Extra-Long Barrel (6.5″)” is stated for the product, not for one size.',
    ),
    ogRound: src(
      'Olivia Garden NanoThermic Round Thermal size chart',
      'NanoThermic Round Thermal NT-24, NT-34, NT-44',
      'US',
      'https://store.oliviagarden.com/products/nanothermic-round-thermal',
      '',
      'Chart gives bare barrel and bristle-tip diameters: NT-24 1″ / 1½″, NT-34 1¼″ / 2″, NT-44 1¾″ / 2⅜″.',
    ),
    ogSpeedXl: src(
      'Olivia Garden NanoThermic Speed XL size chart',
      'NanoThermic Speed XL NTXL-24, NTXL-34, NTXL-44',
      'US',
      'https://store.oliviagarden.com/products/nanothermic-speed-xl',
      '',
      'Same inch values as the Round chart in the corresponding rows, with alternate nominal metric labels such as 34 mm for NTXL-34. Described as extra-long; no physical length per size.',
    ),
    hotToolsBlackGold: src(
      'Hot Tools Black Gold One-Step Detachable Blowout And Volumizer',
      'Black Gold One-Step Detachable Blowout',
      'US',
      'https://www.hottools.com/black-gold-one-step-detachable-blowout/',
      read,
      '“Detachable design”, “2.8″ H11 Oval design” and “Includes: One 2.8” Blowout Volumizer Attachment and One Handle”; 9 ft swivel cord. No heat-setting count or head measurement axis.',
    ),
    hotTools24k: src(
      'Hot Tools 24K Gold One-Step Blowout And Volumizer',
      '24K Gold One-Step Blowout',
      'US',
      'https://www.hottools.com/24k-gold-one-step-blowout/',
      read,
      '“2.8″ Oval brush head” and “Three heat settings”; 8 ft swivel cord. Does not state that the head detaches or which axis the 2.8″ label measures.',
    ),
  }) as const satisfies Record<string, GuideSource>)();

export type ToolLedSourceId = keyof typeof toolLedSources;
