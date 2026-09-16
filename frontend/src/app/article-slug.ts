/** Canonical slugs for every published or scheduled article. */
export const ArticleSlug = {
  BestHairDryersFineHair: 'best-hair-dryers-fine-hair',
  BestHairDryersThickHair: 'best-hair-dryers-thick-hair',
  BestHairDryersCurlyHair: 'best-hair-dryers-curly-hair',
  BestTravelHairDryers: 'best-travel-hair-dryers',
  RoundBrushSizeGuide: 'round-brush-size-guide',
  HairDryerChooser: 'how-to-choose-hair-dryer',
  HairDryerWattageGuide: 'hair-dryer-wattage-guide',
  DysonSupersonicVsSharkSpeedstyle: 'dyson-supersonic-vs-shark-speedstyle',
  BestHairDryerForShortHair: 'best-hair-dryer-for-short-hair',
  HairDryerDiffuserVsConcentrator: 'hair-dryer-diffuser-vs-concentrator',
  HowToUseAHairDryerDiffuser: 'how-to-use-a-hair-dryer-diffuser',
  IonicVsCeramicHairDryer: 'ionic-vs-ceramic-hair-dryer',
  HairDryerSettingsGuide: 'hair-dryer-heat-and-speed-settings-guide',
  HowToUseHairDryerConcentratorNozzle:
    'how-to-use-hair-dryer-concentrator-nozzle',
  HowToCleanHairDryerFilter: 'how-to-clean-hair-dryer-filter',
  HowToBlowDryHair: 'how-to-blow-dry-hair',
  BestHotAirBrushes: 'best-hot-air-brushes',
  BestHotAirBrushesFineHair: 'best-hot-air-brushes-fine-hair',
  BestHotAirBrushesShortHair: 'best-hot-air-brushes-short-hair',
  DysonAirwrapVsSharkFlexstyle: 'dyson-airwrap-vs-shark-flexstyle',
  BaBylissAirStyle1000VsFlawlessVolume:
    'babyliss-air-style-1000-vs-flawless-volume',
  HotAirBrushVsHairDryer: 'hot-air-brush-vs-hair-dryer',
  HowToUseHotAirBrush: 'how-to-use-hot-air-brush',
  HowToUseAHotAirBrushOnShortHair: 'how-to-use-a-hot-air-brush-on-short-hair',
  BestHotAirBrushForThickHair: 'best-hot-air-brush-for-thick-hair',
  HotAirBrushVsStraighteningBrush: 'hot-air-brush-vs-straightening-brush',
  HowToChooseAStraighteningBrush: 'how-to-choose-a-straightening-brush',
  HowToUseAStraighteningBrush: 'how-to-use-a-straightening-brush',
  StraighteningBrushVsFlatIron: 'straightening-brush-vs-flat-iron',
  HowToCleanHotAirBrush: 'how-to-clean-hot-air-brush',
  HotAirBrushBarrelSizeGuide: 'hot-air-brush-barrel-size-guide',
  CanYouUseHotAirBrushOnDryHair: 'can-you-use-hot-air-brush-on-dry-hair',
  HotAirBrushVsHairDryerAndRoundBrush:
    'hot-air-brush-vs-hair-dryer-and-round-brush',
  BestDetanglingBrushes: 'best-detangling-brushes',
  HotAirBrushVsCurlingIron: 'hot-air-brush-vs-curling-iron',
  BestBrushesThickHair: 'best-brushes-thick-hair',
  BestBrushesCurlyHair: 'best-brushes-curly-hair',
  BestBrushesFineHair: 'best-brushes-fine-hair',
  WideToothCombVsDetanglingBrush: 'wide-tooth-comb-vs-detangling-brush',
  BoarBristleBrushGuide: 'boar-bristle-brush-guide',
  HowToChooseHairBrush: 'how-to-choose-hair-brush',
  BestHairBrushForShortHair: 'best-hair-brush-for-short-hair',
  BestHairBrushForThickHair: 'best-hair-brush-for-thick-hair',
  BestHairBrushForCurlyHair: 'best-hair-brush-for-curly-hair',
  BoarBristleVsNylonBrush: 'boar-bristle-vs-nylon-brush',
  HairBrushVsComb: 'hair-brush-vs-comb',
  RoundBrushVsPaddleBrush: 'round-brush-vs-paddle-brush',
  BestRoundBrushForBlowDrying: 'best-round-brush-for-blow-drying',
  HowToCleanAHairBrush: 'how-to-clean-a-hair-brush',
  WhatHairToolsDoINeed: 'what-hair-tools-do-i-need',
  WhatIsTheGreyFuzzOnMyHairbrush: 'what-is-the-grey-fuzz-on-my-hairbrush',
  HowToUseARoundBrushWithAHairDryer:
    'how-to-use-a-round-brush-with-a-hair-dryer',
  HowToGetRootVolumeWithARoundBrush:
    'how-to-get-root-volume-with-a-round-brush',
  HowToBlowDryABobWithARoundBrush: 'how-to-blow-dry-a-bob-with-a-round-brush',
  BestHeatProtectants: 'best-heat-protectants',
  HeatProtectantSprayVsCream: 'heat-protectant-spray-vs-cream',
  BestLeaveInConditionersDryHair: 'best-leave-in-conditioners-dry-hair',
  BestMicrofibreHairTowels: 'best-microfibre-hair-towels',
  SilkVsSatinPillowcaseHair: 'silk-vs-satin-pillowcase-hair',
  BestHeatlessCurlingSets: 'best-heatless-curling-sets',
  HowToUseHeatlessCurlersOnShortHair:
    'how-to-use-heatless-curlers-on-short-hair',
  HowToUseAMicrofibreHairTowel: 'how-to-use-a-microfibre-hair-towel',
  ColdWaterForHair: 'cold-water-for-hair',
  HowOftenShouldYouWashYourHair: 'how-often-should-you-wash-your-hair',
} as const;

export type ArticleSlug = (typeof ArticleSlug)[keyof typeof ArticleSlug];

export const articleSlugNameByValue: Readonly<
  Record<ArticleSlug, keyof typeof ArticleSlug>
> = Object.fromEntries(
  Object.entries(ArticleSlug).map(([name, slug]) => [slug, name]),
) as Readonly<Record<ArticleSlug, keyof typeof ArticleSlug>>;

export function resolveArticleSlugReference(
  value: string,
): ArticleSlug | undefined {
  const match = /^\{\{ArticleSlug\.([A-Za-z][A-Za-z0-9]*)\}\}$/.exec(value);
  return match ? ArticleSlug[match[1] as keyof typeof ArticleSlug] : undefined;
}
