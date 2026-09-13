import { ArticleSlug } from './article-slug';

export const ArticleGroupId = {
  HairDryers: 'hair-dryers',
  HotAirBrushes: 'hot-air-brushes',
  BrushesAndCombs: 'brushes-and-combs',
  HairCare: 'hair-care',
  HairAccessories: 'hair-accessories',
  Guides: 'guides',
} as const;

export type ArticleGroupId =
  (typeof ArticleGroupId)[keyof typeof ArticleGroupId];

export interface ArticleRegistryEntry {
  readonly slug: string;
  readonly group: ArticleGroupId;
  readonly order: number;
  readonly enabled: boolean;
  readonly publishDate: string;
}

export const articleGroups = {
  [ArticleGroupId.HairDryers]: { label: 'Hair Dryers' },
  [ArticleGroupId.HotAirBrushes]: { label: 'Hot-Air Brushes' },
  [ArticleGroupId.BrushesAndCombs]: { label: 'Brushes & Combs' },
  [ArticleGroupId.HairCare]: { label: 'Hair Care' },
  [ArticleGroupId.HairAccessories]: { label: 'Hair Accessories' },
  [ArticleGroupId.Guides]: { label: 'Guides' },
} as const;

export const guideCategories = [
  {
    id: ArticleGroupId.HairDryers,
    label: 'Hair Dryers',
    path: '/hair-dryers',
    title: 'Hair Dryer Guides | Comb Report',
    description:
      'Practical hair dryer guides for choosing and using styling tools.',
    heading: 'Hair dryer guides',
    intro:
      'Find practical help with choosing a hair dryer, comparing styling features, and matching a dryer to the finish you want.',
  },
  {
    id: ArticleGroupId.HotAirBrushes,
    label: 'Hot-Air Brushes',
    path: '/hot-air-brushes',
    title: 'Hot-Air Brush Guides | Comb Report',
    description: 'Practical hot-air brush guides for everyday styling choices.',
    heading: 'Hot-air brush guides',
    intro:
      'Explore hot-air brush comparisons and straightforward advice for choosing a styling tool that suits your routine.',
  },
  {
    id: ArticleGroupId.BrushesAndCombs,
    label: 'Brushes & Combs',
    path: '/brushes-combs',
    title: 'Hair Brush and Comb Guides | Comb Report',
    description:
      'Hair brush and comb guides for everyday grooming and styling.',
    heading: 'Brushes and combs guides',
    intro:
      'Browse clear guides to brushes and combs, from everyday detangling choices to styling shapes and materials.',
  },
  {
    id: ArticleGroupId.HairCare,
    label: 'Hair Care',
    path: '/hair-care',
    title: 'Hair Care Guides | Comb Report',
    description: 'Practical hair care guides for everyday styling routines.',
    heading: 'Hair care guides',
    intro:
      'Practical choices for a routine that feels comfortable and looks considered.',
  },
  {
    id: ArticleGroupId.HairAccessories,
    label: 'Hair Accessories',
    path: '/hair-accessories',
    title: 'Hair Accessories Guides | Comb Report',
    description: 'Hair accessory guides for simple everyday styling routines.',
    heading: 'Hair accessories guides',
    intro:
      'Discover useful guides to the accessories that support an everyday styling routine, from towels to heatless tools.',
  },
] as const;

export type GuideCategory = (typeof guideCategories)[number];

export const guideCategoryById: Readonly<Record<string, GuideCategory>> =
  Object.fromEntries(
    guideCategories.map((category) => [category.id, category]),
  );

export const articleRegistry: readonly ArticleRegistryEntry[] = [
  {
    slug: ArticleSlug.BestHairDryersFineHair,
    group: ArticleGroupId.HairDryers,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestHairDryersThickHair,
    group: ArticleGroupId.HairDryers,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestHairDryersCurlyHair,
    group: ArticleGroupId.HairDryers,
    order: 30,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestTravelHairDryers,
    group: ArticleGroupId.HairDryers,
    order: 40,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.HairDryerWattageGuide,
    group: ArticleGroupId.HairDryers,
    order: 50,
    enabled: true,
    publishDate: '2026-09-10',
  },
  {
    slug: ArticleSlug.HairDryerChooser,
    group: ArticleGroupId.HairDryers,
    order: 0,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.DysonSupersonicVsSharkSpeedstyle,
    group: ArticleGroupId.HairDryers,
    order: 60,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestHairDryerForShortHair,
    group: ArticleGroupId.HairDryers,
    order: 70,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.HairDryerDiffuserVsConcentrator,
    group: ArticleGroupId.HairDryers,
    order: 80,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.HowToUseAHairDryerDiffuser,
    group: ArticleGroupId.HairDryers,
    order: 90,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.IonicVsCeramicHairDryer,
    group: ArticleGroupId.HairDryers,
    order: 100,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.HairDryerSettingsGuide,
    group: ArticleGroupId.HairDryers,
    order: 110,
    enabled: true,
    publishDate: '2026-09-12',
  },
  {
    slug: ArticleSlug.HowToUseHairDryerConcentratorNozzle,
    group: ArticleGroupId.HairDryers,
    order: 120,
    enabled: true,
    publishDate: '2026-09-12',
  },
  {
    slug: ArticleSlug.HowToCleanHairDryerFilter,
    group: ArticleGroupId.HairDryers,
    order: 130,
    enabled: true,
    publishDate: '2026-09-12',
  },
  {
    slug: ArticleSlug.BestHotAirBrushes,
    group: ArticleGroupId.HotAirBrushes,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestHotAirBrushesFineHair,
    group: ArticleGroupId.HotAirBrushes,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestHotAirBrushesShortHair,
    group: ArticleGroupId.HotAirBrushes,
    order: 30,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.DysonAirwrapVsSharkFlexstyle,
    group: ArticleGroupId.HotAirBrushes,
    order: 40,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume,
    group: ArticleGroupId.HotAirBrushes,
    order: 45,
    enabled: true,
    publishDate: '2026-09-12',
  },
  {
    slug: ArticleSlug.HotAirBrushVsHairDryer,
    group: ArticleGroupId.HotAirBrushes,
    order: 50,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.HowToUseHotAirBrush,
    group: ArticleGroupId.HotAirBrushes,
    order: 60,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.HowToUseAHotAirBrushOnShortHair,
    group: ArticleGroupId.HotAirBrushes,
    order: 65,
    enabled: true,
    publishDate: '2026-09-08',
  },
  {
    slug: ArticleSlug.BestHotAirBrushForThickHair,
    group: ArticleGroupId.HotAirBrushes,
    order: 70,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.HotAirBrushVsStraighteningBrush,
    group: ArticleGroupId.HotAirBrushes,
    order: 60,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.HowToChooseAStraighteningBrush,
    group: ArticleGroupId.HotAirBrushes,
    order: 75,
    enabled: true,
    publishDate: '2026-09-13',
  },
  {
    slug: ArticleSlug.HowToCleanHotAirBrush,
    group: ArticleGroupId.HotAirBrushes,
    order: 80,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.HotAirBrushBarrelSizeGuide,
    group: ArticleGroupId.HotAirBrushes,
    order: 90,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.CanYouUseHotAirBrushOnDryHair,
    group: ArticleGroupId.HotAirBrushes,
    order: 100,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.HotAirBrushVsHairDryerAndRoundBrush,
    group: ArticleGroupId.HotAirBrushes,
    order: 110,
    enabled: true,
    publishDate: '2026-09-08',
  },
  {
    slug: ArticleSlug.BestDetanglingBrushes,
    group: ArticleGroupId.BrushesAndCombs,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.HotAirBrushVsCurlingIron,
    group: ArticleGroupId.HotAirBrushes,
    order: 95,
    enabled: true,
    publishDate: '2026-09-08',
  },
  {
    slug: ArticleSlug.BestBrushesThickHair,
    group: ArticleGroupId.BrushesAndCombs,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestBrushesCurlyHair,
    group: ArticleGroupId.BrushesAndCombs,
    order: 30,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestBrushesFineHair,
    group: ArticleGroupId.BrushesAndCombs,
    order: 40,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.WideToothCombVsDetanglingBrush,
    group: ArticleGroupId.BrushesAndCombs,
    order: 50,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BoarBristleBrushGuide,
    group: ArticleGroupId.BrushesAndCombs,
    order: 60,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.HowToChooseHairBrush,
    group: ArticleGroupId.BrushesAndCombs,
    order: 70,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestHairBrushForShortHair,
    group: ArticleGroupId.BrushesAndCombs,
    order: 80,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestHairBrushForThickHair,
    group: ArticleGroupId.BrushesAndCombs,
    order: 90,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestHairBrushForCurlyHair,
    group: ArticleGroupId.BrushesAndCombs,
    order: 100,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BoarBristleVsNylonBrush,
    group: ArticleGroupId.BrushesAndCombs,
    order: 110,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.HairBrushVsComb,
    group: ArticleGroupId.BrushesAndCombs,
    order: 120,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.RoundBrushVsPaddleBrush,
    group: ArticleGroupId.BrushesAndCombs,
    order: 130,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.BestRoundBrushForBlowDrying,
    group: ArticleGroupId.BrushesAndCombs,
    order: 140,
    enabled: false,
    publishDate: '2099-01-01',
  },
  {
    slug: ArticleSlug.HowToCleanAHairBrush,
    group: ArticleGroupId.BrushesAndCombs,
    order: 150,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.RoundBrushSizeGuide,
    group: ArticleGroupId.BrushesAndCombs,
    order: 145,
    enabled: true,
    publishDate: '2026-09-07',
  },
  {
    slug: ArticleSlug.WhatHairToolsDoINeed,
    group: ArticleGroupId.BrushesAndCombs,
    order: 150,
    enabled: true,
    publishDate: '2026-09-10',
  },
  {
    slug: ArticleSlug.WhatIsTheGreyFuzzOnMyHairbrush,
    group: ArticleGroupId.BrushesAndCombs,
    order: 155,
    enabled: true,
    publishDate: '2026-09-07',
  },
  {
    slug: ArticleSlug.HowToUseARoundBrushWithAHairDryer,
    group: ArticleGroupId.BrushesAndCombs,
    order: 160,
    enabled: true,
    publishDate: '2026-09-08',
  },
  {
    slug: ArticleSlug.HowToGetRootVolumeWithARoundBrush,
    group: ArticleGroupId.BrushesAndCombs,
    order: 170,
    enabled: true,
    publishDate: '2026-09-08',
  },
  {
    slug: ArticleSlug.HowToBlowDryABobWithARoundBrush,
    group: ArticleGroupId.BrushesAndCombs,
    order: 180,
    enabled: true,
    publishDate: '2026-09-08',
  },
  {
    slug: ArticleSlug.BestHeatProtectants,
    group: ArticleGroupId.HairCare,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestLeaveInConditionersDryHair,
    group: ArticleGroupId.HairCare,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestMicrofibreHairTowels,
    group: ArticleGroupId.HairAccessories,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.SilkVsSatinPillowcaseHair,
    group: ArticleGroupId.HairAccessories,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.BestHeatlessCurlingSets,
    group: ArticleGroupId.HairAccessories,
    order: 30,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.HowToUseAMicrofibreHairTowel,
    group: ArticleGroupId.HairAccessories,
    order: 40,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: ArticleSlug.ColdWaterForHair,
    group: ArticleGroupId.HairCare,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: ArticleSlug.HowOftenShouldYouWashYourHair,
    group: ArticleGroupId.HairCare,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
] as const;
