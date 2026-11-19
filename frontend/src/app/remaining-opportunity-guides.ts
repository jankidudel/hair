import { ArticleSlug } from './article-slug';
import type { GuideSource } from './guide-evidence';

// Substantive additions made while resolving the remaining research queue.
export const remainingOpportunityUpdatedSlugs = [
  ArticleSlug.SharkSpeedstyleProVsProFlex,
  ArticleSlug.HairDryerChooser,
  ArticleSlug.HairDryerDiffuserCompatibility,
  ArticleSlug.HowToChooseMultiStylerAttachments,
  ArticleSlug.T3Aire360NextGenVsDysonAirwrapId,
  ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir,
  ArticleSlug.ThermalBrushVsHotAirBrush,
  ArticleSlug.BestDetanglingBrushes,
  ArticleSlug.ConairHs400VsHs79crHotRollers,
  ArticleSlug.HowToChooseAHairBarrette,
  ArticleSlug.HowToUseTexturisingSpray,
  ArticleSlug.HairSerumVsHairOil,
  ArticleSlug.FlatIronPlateWidthGuide,
  ArticleSlug.BabylissAirWandAs6550uVsAs6553u,
  ArticleSlug.ParluxAlyonVsDigitalyon,
  ArticleSlug.HowToCleanHairDryerFilter,
  ArticleSlug.DenmanD3VsD31,
  ArticleSlug.DysonCorraleCoolshineVsCorrale,
  ArticleSlug.BestTravelFlatIrons,
  ArticleSlug.RoundBrushSizeGuide,
] as const;

const sources: Readonly<Record<string, GuideSource>> = {
  cloudwide: {
    label: 'Cloud Nine ordinary Wide Iron UK',
    model: 'Cloud Nine ordinary Wide Iron UK',
    market: 'GB',
    url: 'https://www.cloudninehair.com/products/the-wide-iron',
    checkedDate: '18 November 2026',
    scope:
      'Current ordinary model 1.5-inch nominal plate and eleven 100-200 C positions; Contouring and earlier revisions separate.',
  },
  shark300: {
    label: 'HD300 polisher XSKHD3PFAEUK',
    model: 'HD300 polisher XSKHD3PFAEUK',
    market: 'GB',
    url: 'https://www.sharkninja.co.uk/shark-speedstyle-polisher/XSKHD3PFAEUK.html',
    checkedDate: '18 November 2026',
    scope: 'HD300-series approval only; no cross-series transfer inferred.',
  },
  shark500: {
    label: 'Pro Flex polisher XSKHD5PFMSEU',
    model: 'Pro Flex polisher XSKHD5PFMSEU',
    market: 'GB/EU',
    url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-polisher/XSKHD5PFMSEU.html',
    checkedDate: '18 November 2026',
    scope: 'Explicit HD500EU/UK and HD542EU/UK list only.',
  },
  shark700: {
    label: 'HD700UK-BYO configured kit',
    model: 'HD700UK-BYO configured kit',
    market: 'GB',
    url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-build-your-own-hair-dryer-system/HD700UK-BYO.html',
    checkedDate: '18 November 2026',
    scope:
      'Pro selector establishes its selected two-piece kit; not older-spare approval.',
  },
  sharkvoltage: {
    label: 'HD500UK-BYO Pro Flex',
    model: 'HD500UK-BYO Pro Flex',
    market: 'GB',
    url: 'https://www.sharkninja.co.uk/shark-speedstyle-pro-flex-build-your-own-hair-dryer-system/HD500UK-BYO.html',
    checkedDate: '18 November 2026',
    scope: '240 V rating on the named UK offer; folding is a storage feature.',
  },
  pan0j: {
    label: 'Panasonic EH-NA0J',
    model: 'Panasonic EH-NA0J',
    market: 'GB',
    url: 'https://www.panasonic.com/uk/consumer/personal-health-care/hair-styling/eh-na0j.html',
    checkedDate: '18 November 2026',
    scope: 'Built-in quick-dry arrangement; no replacement-part approval.',
  },
  panvideo: {
    label: 'Panasonic EH-NA0J nozzle demonstration',
    model: 'Panasonic EH-NA0J nozzle demonstration',
    market: 'GB/EU',
    url: 'https://channel.panasonic.com/contents/39163',
    checkedDate: '18 November 2026',
    scope:
      'Concentrator and diffuser identification in the explicitly EU/UK demonstration.',
  },
  pan67: {
    label: 'Panasonic EH-NA67 / EH-ANA6H operating instructions',
    model: 'Panasonic EH-NA67 / EH-ANA6H operating instructions',
    market: 'US',
    url: 'https://help.na.panasonic.com/wp-content/uploads/2023/02/EHNA67_EH9210NA672352_ENG_FRE_ESP.pdf',
    checkedDate: '18 November 2026',
    scope:
      '125 V, 1875 W and three separate attachment roles; not UK ratings or spare codes.',
  },
  pan67uk: {
    label: 'Panasonic EH-NA67',
    model: 'Panasonic EH-NA67',
    market: 'GB',
    url: 'https://www.panasonic.com/uk/consumer/personal-health-care/hair-styling/eh-na67.html',
    checkedDate: '18 November 2026',
    scope:
      'UK box description names oscillating quick-dry nozzle, concentrator and diffuser.',
  },
  hydro: {
    label: 'BaByliss Hydro-Fusion 5573U',
    model: 'BaByliss Hydro-Fusion 5573U',
    market: 'GB',
    url: 'https://www.babyliss.com/uk-en/hydro-fusion-anti-frizz-2100-hair-dryer-5573U.html',
    checkedDate: '18 November 2026',
    scope:
      'Indexed exact UK manufacturer text for controls, diffuser, concentrator and rear filter; direct URL has a redirect loop.',
  },
  airpro: {
    label: 'BaByliss Air Power Pro D6555DU',
    model: 'BaByliss Air Power Pro D6555DU',
    market: 'GB',
    url: 'https://www.babyliss.com/uk-en/air-power-pro-D6555DU.html',
    checkedDate: '18 November 2026',
    scope:
      'Exact controls, two nozzle labels, diffuser and magnetic filter; no measured noise/speed comparison.',
  },
  bio: {
    label: 'Bio Ionic Universal Diffuser, black',
    model: 'Bio Ionic Universal Diffuser, black',
    market: 'US',
    url: 'https://bioionic.com/products/universal-diffuser-black',
    checkedDate: '18 November 2026',
    scope:
      'Broad maker claim for Bio Ionic dryers and adjustable vents; no cross-brand matrix or retention test.',
  },
  panparts: {
    label: 'Panasonic USA parts guidance',
    model: 'Panasonic USA parts guidance',
    market: 'US',
    url: 'https://help.na.panasonic.com/answers/parts-and-accessories-for-usa-consumer-products/',
    checkedDate: '18 November 2026',
    scope:
      'Authorised supplier route; an exact replacement diffuser code remains unconfirmed.',
  },
  dreame: {
    label: 'Dreame US AirStyle Pro / Era comparison',
    model: 'Dreame US AirStyle Pro / Era comparison',
    market: 'US',
    url: 'https://beauty.dreametech.com/pages/comparison',
    checkedDate: '18 November 2026',
    scope:
      'Named US box roles and 120 V records; no independent performance or UK kit inference.',
  },
  dreamepro: {
    label: 'Dreame AirStyle Pro',
    model: 'Dreame AirStyle Pro',
    market: 'US',
    url: 'https://beauty.dreametech.com/products/airstyle-pro-hair-styler',
    checkedDate: '18 November 2026',
    scope:
      'US-only 120 V statement and named box, kept separate from Era and Pro HI.',
  },
  dreamepart: {
    label: 'Dreame Diffuser Nozzle',
    model: 'Dreame Diffuser Nozzle',
    market: 'US',
    url: 'https://beauty.dreametech.com/products/diffuser-nozzle',
    checkedDate: '18 November 2026',
    scope:
      'Current spare explicitly lists Pro, Suite, Era and Pro HI; scope does not transfer to UK/EU.',
  },
  dreamebrush: {
    label: 'Dreame Hard Smoothing Brush',
    model: 'Dreame Hard Smoothing Brush',
    market: 'US',
    url: 'https://beauty.dreametech.com/products/dreame-hard-smoothing-brush',
    checkedDate: '18 November 2026',
    scope:
      'Current spare explicitly lists Pro, Suite, Era and Pro HI; not all historical Dreame heads.',
  },
  dreameit: {
    label: 'Dreame support: Era / Pro accessories',
    model: 'Dreame support: Era / Pro accessories',
    market: 'Italy',
    url: 'https://it.forum.dreametech.com/forum.php?mod=viewthread&tid=3627',
    checkedDate: '18 November 2026',
    scope:
      'Conflicting regional support reply without a part code; local confirmation required outside the named US approvals.',
  },
  flexus: {
    label: 'Shark FlexStyle HD430',
    model: 'Shark FlexStyle HD430',
    market: 'US',
    url: 'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
    checkedDate: '18 November 2026',
    scope:
      'Named US two-barrel, oval, paddle and concentrator box only; cross-brand fit unknown.',
  },
  t3: {
    label: 'T3 Aire 360 next-generation dual-voltage FAQ',
    model: 'T3 Aire 360 next-generation dual-voltage FAQ',
    market: 'US',
    url: 'https://t3micro.com/products/aire360-dual-voltage',
    checkedDate: '18 November 2026',
    scope:
      'Original is not dual voltage; first-generation attachments do not fit next generation; diffuser excluded from original.',
  },
  curl: {
    label: 'BaByliss Hydro-Fusion Curl Secret C1700U',
    model: 'BaByliss Hydro-Fusion Curl Secret C1700U',
    market: 'GB',
    url: 'https://www.babyliss.com/uk-en/hydro-fusion-anti-frizz-curl-secret-C1700U.html',
    checkedDate: '18 November 2026',
    scope:
      'Exact UK 190/210/230 C, direction and timer controls; indexed maker text, not generic Curl Secret identity.',
  },
  amika: {
    label: 'Amika Blowout Babe thermal brush',
    model: 'Amika Blowout Babe thermal brush',
    market: 'US',
    url: 'https://loveamika.com/products/blowout-babe-thermal-brush',
    checkedDate: '18 November 2026',
    scope:
      'Dry use, 1.5-inch nominal barrel, 180 C and 100-125 V; no airflow-drying permission.',
  },
  rise: {
    label: 'ghd Rise',
    model: 'ghd Rise',
    market: 'GB',
    url: 'https://www.ghdhair.com/hot-brush/ghd-rise-p-517',
    checkedDate: '18 November 2026',
    scope:
      '32 mm heated barrel, 185 C and dry-stage use; no US Amika electrical inference.',
  },
  smooth: {
    label: 'Shark HT200UK-series styling guide',
    model: 'Shark HT200UK-series styling guide',
    market: 'GB',
    url: 'https://argos-support.co.uk/storage/files/3361193_D001.pdf?direct',
    checkedDate: '18 November 2026',
    scope:
      'Manufacturer-authored HT200UK-series styling guide, revision MV2, supplied through HT202UK retailer support; distinct damp-airflow and dry-heated-comb modes.',
  },
  smoothindex: {
    label: 'HT202UK manual locator',
    model: 'HT202UK manual locator',
    market: 'GB',
    url: 'https://argos-support.co.uk/3361193-shark-ht202uk-smoothstyle-hot-brush',
    checkedDate: '18 November 2026',
    scope:
      'Retailer support establishes which Shark-authored guide is linked for this exact UK model.',
  },
  tt: {
    label: 'Tangle Teezer Ultimate Detangler',
    model: 'Tangle Teezer Ultimate Detangler',
    market: 'GB',
    url: 'https://tangleteezer.com/products/the-ultimate-detangler',
    checkedDate: '18 November 2026',
    scope:
      'Handled wet-stage design; Mini travel description, adult use and size choices; no measured head-size or stiffness matrix.',
  },
  ttthick: {
    label: 'Tangle Teezer Original Thick & Curly',
    model: 'Tangle Teezer Original Thick & Curly',
    market: 'GB',
    url: 'https://tangleteezer.com/products/thick-curly',
    checkedDate: '18 November 2026',
    scope:
      'Separate Original line, firm-flex teeth and wet/dry detangling; no styling heat permission.',
  },
  rollers: {
    label: 'BaByliss Thermo-Ceramic 3035U',
    model: 'BaByliss Thermo-Ceramic 3035U',
    market: 'GB',
    url: 'https://www.babyliss.com/uk-en/thermo-ceramic-rollers-3035U.html',
    checkedDate: '18 November 2026',
    scope:
      'Eight/six/six roller mix, ten super clips and twenty pins; not an HS400 electrical equivalence.',
  },
  hs400: {
    label: 'Conair HS400',
    model: 'Conair HS400',
    market: 'US',
    url: 'https://www.conair.com/ceramic-flocked-hot-rollers/HS400.html',
    checkedDate: '18 November 2026',
    scope: 'Named US 20-roller diameter mix and twenty heated clips only.',
  },
  classic: {
    label: 'France Luxe Classic Rectangle',
    model: 'France Luxe Classic Rectangle',
    market: 'US',
    url: 'https://franceluxe.com/products/classic-rectangle-hair-barrette-french-classic',
    checkedDate: '18 November 2026',
    scope:
      'Classic French-style clasp and positioning; no measured clasp capacity.',
  },
  volume: {
    label: 'France Luxe Rectangle Volume',
    model: 'France Luxe Rectangle Volume',
    market: 'US',
    url: 'https://franceluxe.com/products/rectangle-volume-hair-barrette-french-classic',
    checkedDate: '18 November 2026',
    scope:
      'Named volume profile; decorative dimensions do not establish clasp clearance.',
  },
  oribe: {
    label: 'Oribe Dry Texturizing Spray',
    model: 'Oribe Dry Texturizing Spray',
    market: 'GB',
    url: 'https://uk.oribe.com/products/dry-texturizing-spray',
    checkedDate: '18 November 2026',
    scope:
      'Current main directions and declared formula; keep promotional pro tips separate.',
  },
  oribethick: {
    label: 'Oribe Thick Dry Finishing Spray',
    model: 'Oribe Thick Dry Finishing Spray',
    market: 'GB',
    url: 'https://uk.oribe.com/products/thick-dry-finishing-spray',
    checkedDate: '18 November 2026',
    scope:
      'Different declared formula and dry-hold positioning; no shared dose or copied distance inferred.',
  },
  lp: {
    label: 'Living Proof Full Dry Volume & Texture Spray',
    model: 'Living Proof Full Dry Volume & Texture Spray',
    market: 'GB',
    url: 'https://www.livingproof.co.uk/collections/volume-fullness/products/full-dry-volume-texture-spray',
    checkedDate: '18 November 2026',
    scope:
      'Current dry-use positioning and declared ingredient list; no comparative concentrations or hold result.',
  },
  lphow: {
    label: 'Living Proof Full Dry Volume & Texture application demonstration',
    model: 'Living Proof Full Dry Volume & Texture application demonstration',
    market: 'US',
    url: 'https://www.livingproof.com/hair-101/voluminous-waves-with-dry-volume-texture-spray.html',
    checkedDate: '18 November 2026',
    scope:
      'Shake before each spray, section and six-to-ten-inch distance; keep this US method separate from UK packaging.',
  },
  pure: {
    label: 'Moroccanoil Pure Argan Oil',
    model: 'Moroccanoil Pure Argan Oil',
    market: 'US',
    url: 'https://www.moroccanoil.com/products/pure-argan-oil',
    checkedDate: '18 November 2026',
    scope:
      'Single declared argan-oil ingredient and fragrance-free positioning; cosmetic hair formula distinction only.',
  },
  original: {
    label: 'Moroccanoil Original styling formula',
    model: 'Moroccanoil Original styling formula',
    market: 'GB',
    url: 'https://uk.moroccanoil.com/products/moroccanoil-treatment-original',
    checkedDate: '18 November 2026',
    scope:
      'Declared silicones, argan oil and fragrance; concentrations and comparative finish unknown.',
  },
  ghdwide: {
    label: 'ghd Chronos Max black',
    model: 'ghd Chronos Max black',
    market: 'GB',
    url: 'https://www.ghdhair.com/hair-straighteners/ghd-chronos-max-black-styler-p-689',
    checkedDate: '18 November 2026',
    scope:
      '43 mm label and fixed 185 C; not a measured whole-tool width or comparative speed result.',
  },
  wanddif: {
    label: 'BaByliss ACAS6550DIF diffuser',
    model: 'BaByliss ACAS6550DIF diffuser',
    market: 'EU',
    url: 'https://www.babyliss.com/en-eu/air-wand-diffuser-ACAS6550DIF.html',
    checkedDate: '18 November 2026',
    scope:
      'Indexed manufacturer catalogue states AS6550; UK U-suffix and all AS655x approvals not inferred.',
  },
  wandpad: {
    label: 'BaByliss ACAS6550PAD smoothing brush',
    model: 'BaByliss ACAS6550PAD smoothing brush',
    market: 'EU',
    url: 'https://www.babyliss.com/en-eu/air-wand-smoothing-brush-ACAS6550PAD.html',
    checkedDate: '18 November 2026',
    scope:
      'Indexed manufacturer catalogue states AS6550; not proof every UK kit includes the head.',
  },
  wandmanual: {
    label: 'BaByliss Air Wand AS6550U instructions',
    model: 'BaByliss Air Wand AS6550U instructions',
    market: 'GB',
    url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1750070133583/information-booklets/AS6550U_IB.pdf',
    checkedDate: '18 November 2026',
    scope: 'Exact drying, straightening and curved oval brush roles.',
  },
  airstylemanual: {
    label: 'BaByliss Air Style 1000 2136U instructions',
    model: 'BaByliss Air Style 1000 2136U instructions',
    market: 'GB',
    url: 'https://www.babyliss.com/on/demandware.static/-/Sites-ml-babyliss-Library/en_GB/v1776089980931/information-booklets/2136U_IB.pdf',
    checkedDate: '18 November 2026',
    scope:
      'Exact attachment roles, approximately 80-percent-dry preparation and release sequence.',
  },
  ethos: {
    label: 'Parlux Ethos international English specification',
    model: 'Parlux Ethos international English specification',
    market: 'International',
    url: 'https://www.parlux.it/en/products/parlux-ethos',
    checkedDate: '18 November 2026',
    scope:
      'Three speeds by three temperatures, memory, STC cable and 2300 W; local rating/plug/box remain separate.',
  },
  flexcare: {
    label: 'Shark HD440UK / HD420UK filter care',
    model: 'Shark HD440UK / HD420UK filter care',
    market: 'GB',
    url: 'https://support.sharkninja.co.uk/article/HD440UK--HD420UK-Series-Shark-FlexStyle-Air-Styling--Drying-System-My-FlexStyle-is-Overheating?redirect=false',
    checkedDate: '18 November 2026',
    scope:
      'Monthly dry care procedure and model-specific stuck-debris wipe permission; not transferred to IonCurl.',
  },
  ioncare: {
    label: 'Shark HD800UK IonCurl getting started',
    model: 'Shark HD800UK IonCurl getting started',
    market: 'GB',
    url: 'https://support.sharkninja.co.uk/article/HD800UK-Series-Shark-Flexstyle-IonCurl-Air-Styler-Hair-Dryer---Getting-Started-with-Your-FlexStyle-IonCurl',
    checkedDate: '18 November 2026',
    scope:
      'Named bodies and sliding filter-cover access only; complete care interval and cleaning medium unverified.',
  },
  denman: {
    label: 'Denman D31 current UK',
    model: 'Denman D31 current UK',
    market: 'GB',
    url: 'https://denmanbrush.com/products/d31-freeflow-styler-7-row',
    checkedDate: '18 November 2026',
    scope: 'Seven rows and staggered pins; no inferred D41 layout.',
  },
  denmanold: {
    label: 'Denman older family guidance',
    model: 'Denman older family guidance',
    market: 'GB',
    url: 'https://denmanbrush.com/blogs/news/the-princes-trust',
    checkedDate: '18 November 2026',
    scope:
      'Historical D41 identity only; not current dimensions, availability or spare approval.',
  },
  corrale: {
    label: 'Dyson original HS00 Corrale manual 322991-01',
    model: 'Dyson original HS00 Corrale manual 322991-01',
    market: 'GB',
    url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/hairstraighteners/corrale/322991-01.pdf',
    checkedDate: '18 November 2026',
    scope:
      'Page 5 manufacturer Flight-ready directions and stated Japan restriction; current carrier and itinerary permission not established.',
  },
  coolshine: {
    label: 'Dyson CoolShine English N893 manual',
    model: 'Dyson CoolShine English N893 manual',
    market: 'GB English manual on German host',
    url: 'https://www.dyson.de/content/dam/dyson/maintenance/user-guides/en_GB/personalcare/hairstraighteners/corrale/N893-OUG-Master-Creative_AW.pdf',
    checkedDate: '18 November 2026',
    scope:
      'Four settings, dry use, cooling attachment and universal-voltage travel wording; distinct from original HS00 manual.',
  },
  coolproduct: {
    label: 'Dyson Corrale CoolShine Ceramic pink',
    model: 'Dyson Corrale CoolShine Ceramic pink',
    market: 'GB',
    url: 'https://www.dyson.co.uk/hair-care/hair-straighteners/corrale-coolshine/ceramic-pink',
    checkedDate: '18 November 2026',
    scope: 'Current 100-240 V specification for the named corded model.',
  },
};

export const remainingOpportunitySources: Readonly<
  Partial<Record<ArticleSlug, readonly GuideSource[]>>
> = {
  [ArticleSlug.SharkSpeedstyleProVsProFlex]: [
    sources.shark300,
    sources.shark500,
    sources.shark700,
    sources.sharkvoltage,
  ],
  [ArticleSlug.HairDryerChooser]: [
    sources.pan0j,
    sources.panvideo,
    sources.pan67,
    sources.pan67uk,
    sources.hydro,
    sources.airpro,
  ],
  [ArticleSlug.HairDryerDiffuserCompatibility]: [
    sources.bio,
    sources.pan67,
    sources.panvideo,
    sources.panparts,
  ],
  [ArticleSlug.HowToChooseMultiStylerAttachments]: [
    sources.dreame,
    sources.dreamepro,
    sources.dreamepart,
    sources.dreamebrush,
    sources.dreameit,
    sources.flexus,
  ],
  [ArticleSlug.T3Aire360NextGenVsDysonAirwrapId]: [sources.t3],
  [ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir]: [sources.curl],
  [ArticleSlug.ThermalBrushVsHotAirBrush]: [
    sources.amika,
    sources.rise,
    sources.smooth,
    sources.smoothindex,
  ],
  [ArticleSlug.BestDetanglingBrushes]: [sources.tt, sources.ttthick],
  [ArticleSlug.ConairHs400VsHs79crHotRollers]: [sources.rollers, sources.hs400],
  [ArticleSlug.HowToChooseAHairBarrette]: [sources.classic, sources.volume],
  [ArticleSlug.HowToUseTexturisingSpray]: [
    sources.oribe,
    sources.oribethick,
    sources.lp,
    sources.lphow,
  ],
  [ArticleSlug.HairSerumVsHairOil]: [sources.pure, sources.original],
  [ArticleSlug.FlatIronPlateWidthGuide]: [sources.ghdwide, sources.cloudwide],
  [ArticleSlug.BabylissAirWandAs6550uVsAs6553u]: [
    sources.wanddif,
    sources.wandpad,
    sources.wandmanual,
    sources.airstylemanual,
  ],
  [ArticleSlug.ParluxAlyonVsDigitalyon]: [sources.ethos],
  [ArticleSlug.HowToCleanHairDryerFilter]: [sources.flexcare, sources.ioncare],
  [ArticleSlug.DenmanD3VsD31]: [sources.denman, sources.denmanold],
  [ArticleSlug.DysonCorraleCoolshineVsCorrale]: [
    sources.corrale,
    sources.coolshine,
    sources.coolproduct,
  ],
  [ArticleSlug.BestTravelFlatIrons]: [sources.corrale],
};

export const remainingOpportunityAliases: Readonly<
  Record<string, readonly string[]>
> = {
  [ArticleSlug.SharkSpeedstyleProVsProFlex]: [
    'HD300 HD500 HD700 attachments',
    'Pro Flex voltage',
    'SpeedStyle overseas',
    'HD500UK 240V',
    'Shark SpeedStyle HD300/HD500/HD700 attachment compatibility',
    'Shark SpeedStyle Pro Flex overseas voltage suitability',
  ],
  [ArticleSlug.HairDryerChooser]: [
    'Panasonic EH NA0J vs EH NA67',
    'Panasonic nanoe nozzle types',
    'Hydro Fusion vs Air Power Pro',
    '5573U',
    'D6555DU',
    'Panasonic EH-NA0J vs EH-NA67',
    'BaByliss Hydro-Fusion vs Air Power Pro',
    'Panasonic nanoe nozzle types by model',
  ],
  [ArticleSlug.HairDryerDiffuserCompatibility]: [
    'Bio Ionic Universal Diffuser',
    'Panasonic nanoe replacement diffuser',
    'EH NA67 diffuser',
    'Panasonic nanoe diffuser replacement by model',
    'Bio Ionic Universal diffuser compatibility',
  ],
  [ArticleSlug.HowToChooseMultiStylerAttachments]: [
    'Dreame AirStyle Pro vs Era',
    'Dreame AirStyle vs Shark FlexStyle',
    'Dreame attachment compatibility',
    'Dreame AirStyle Pro vs AirStyle Era',
    'Dreame AirStyle Pro vs Shark FlexStyle',
    'Dreame AirStyle accessory compatibility by generation',
  ],
  [ArticleSlug.T3Aire360NextGenVsDysonAirwrapId]: [
    'T3 Aire 360 original vs Next Gen',
    'first generation Aire 360 attachments',
  ],
  [ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir]: [
    'C1700U',
    'Hydro Fusion Curl Secret',
    'Curl Secret vs Wave Secret Air',
    'Style Secret Air vs Curl Secret',
    'BaByliss Curl Secret vs Wave Secret Air',
    'BaByliss Style Secret Air vs Curl Secret',
  ],
  [ArticleSlug.ThermalBrushVsHotAirBrush]: [
    'Amika Blowout Babe vs ghd Rise',
    'ghd Duet Blowdry vs Shark SmoothStyle',
    'HT202UK',
  ],
  [ArticleSlug.BestDetanglingBrushes]: [
    'Ultimate Detangler vs Thick and Curly',
    'Mini vs full size Ultimate Detangler',
    'Tangle Teezer Ultimate Detangler vs Thick and Curly',
    'Tangle Teezer Mini vs full-size Ultimate Detangler',
  ],
  [ArticleSlug.ConairHs400VsHs79crHotRollers]: [
    'BaByliss 3035U vs Conair HS400',
    '3035U',
    'BaByliss 3035U vs Conair HS400 regional kits',
  ],
  [ArticleSlug.HowToChooseAHairBarrette]: [
    'France Luxe volume vs classic rectangle barrette',
    'France Luxe volume vs standard barrette',
  ],
  [ArticleSlug.HowToUseTexturisingSpray]: [
    'Oribe vs Living Proof',
    'Oribe Dry Texturizing vs Thick Dry Finishing',
    'Oribe Dry Texturizing vs Living Proof Volume and Texture',
  ],
  [ArticleSlug.HairSerumVsHairOil]: ['Moroccanoil Treatment vs Pure Argan Oil'],
  [ArticleSlug.FlatIronPlateWidthGuide]: ['ghd Chronos Max vs Cloud Nine Wide'],
  [ArticleSlug.BabylissAirWandAs6550uVsAs6553u]: [
    'Air Wand replacement attachments',
    'ACAS6550DIF',
    'ACAS6550PAD',
    'Air Wand vs Air Style 1000',
    'BaByliss Air Wand replacement attachments',
    'BaByliss Air Wand vs Air Style 1000',
  ],
  [ArticleSlug.ParluxAlyonVsDigitalyon]: [
    'Parlux Ethos vs Digitalyon',
    'Parlux Ethos vs Alyon',
  ],
  [ArticleSlug.HowToCleanHairDryerFilter]: [
    'Original FlexStyle and IonCurl filter care by model',
  ],
  [ArticleSlug.DenmanD3VsD31]: ['Denman D31 vs D41'],
};
