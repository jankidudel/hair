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
    slug: 'best-hair-dryers-fine-hair',
    group: ArticleGroupId.HairDryers,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-hair-dryers-thick-hair',
    group: ArticleGroupId.HairDryers,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-hair-dryers-curly-hair',
    group: ArticleGroupId.HairDryers,
    order: 30,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-travel-hair-dryers',
    group: ArticleGroupId.HairDryers,
    order: 40,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'how-to-choose-hair-dryer',
    group: ArticleGroupId.HairDryers,
    order: 50,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'dyson-supersonic-vs-shark-speedstyle',
    group: ArticleGroupId.HairDryers,
    order: 60,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-hair-dryer-for-short-hair',
    group: ArticleGroupId.HairDryers,
    order: 70,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'hair-dryer-diffuser-vs-concentrator',
    group: ArticleGroupId.HairDryers,
    order: 80,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'how-to-use-a-hair-dryer-diffuser',
    group: ArticleGroupId.HairDryers,
    order: 90,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'ionic-vs-ceramic-hair-dryer',
    group: ArticleGroupId.HairDryers,
    order: 100,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'best-hot-air-brushes',
    group: ArticleGroupId.HotAirBrushes,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-hot-air-brushes-fine-hair',
    group: ArticleGroupId.HotAirBrushes,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-hot-air-brushes-short-hair',
    group: ArticleGroupId.HotAirBrushes,
    order: 30,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'dyson-airwrap-vs-shark-flexstyle',
    group: ArticleGroupId.HotAirBrushes,
    order: 40,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'hot-air-brush-vs-hair-dryer',
    group: ArticleGroupId.HotAirBrushes,
    order: 50,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'how-to-use-hot-air-brush',
    group: ArticleGroupId.HotAirBrushes,
    order: 60,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-hot-air-brush-for-thick-hair',
    group: ArticleGroupId.HotAirBrushes,
    order: 70,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'hot-air-brush-vs-straightening-brush',
    group: ArticleGroupId.HotAirBrushes,
    order: 60,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'how-to-clean-hot-air-brush',
    group: ArticleGroupId.HotAirBrushes,
    order: 80,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'hot-air-brush-barrel-size-guide',
    group: ArticleGroupId.HotAirBrushes,
    order: 90,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'can-you-use-hot-air-brush-on-dry-hair',
    group: ArticleGroupId.HotAirBrushes,
    order: 100,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'best-detangling-brushes',
    group: ArticleGroupId.BrushesAndCombs,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-brushes-thick-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-brushes-curly-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 30,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-brushes-fine-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 40,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'wide-tooth-comb-vs-detangling-brush',
    group: ArticleGroupId.BrushesAndCombs,
    order: 50,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'boar-bristle-brush-guide',
    group: ArticleGroupId.BrushesAndCombs,
    order: 60,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'how-to-choose-hair-brush',
    group: ArticleGroupId.BrushesAndCombs,
    order: 70,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-hair-brush-for-short-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 80,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-hair-brush-for-thick-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 90,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-hair-brush-for-curly-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 100,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'boar-bristle-vs-nylon-brush',
    group: ArticleGroupId.BrushesAndCombs,
    order: 110,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'hair-brush-vs-comb',
    group: ArticleGroupId.BrushesAndCombs,
    order: 120,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'round-brush-vs-paddle-brush',
    group: ArticleGroupId.BrushesAndCombs,
    order: 130,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'best-round-brush-for-blow-drying',
    group: ArticleGroupId.BrushesAndCombs,
    order: 140,
    enabled: false,
    publishDate: '2099-01-01',
  },
  {
    slug: 'how-to-clean-a-hair-brush',
    group: ArticleGroupId.BrushesAndCombs,
    order: 150,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'round-brush-size-guide',
    group: ArticleGroupId.BrushesAndCombs,
    order: 145,
    enabled: true,
    publishDate: '2026-09-07',
  },
  {
    slug: 'what-is-the-grey-fuzz-on-my-hairbrush',
    group: ArticleGroupId.BrushesAndCombs,
    order: 155,
    enabled: true,
    publishDate: '2026-09-07',
  },
  {
    slug: 'best-heat-protectants',
    group: ArticleGroupId.HairCare,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-leave-in-conditioners-dry-hair',
    group: ArticleGroupId.HairCare,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-microfibre-hair-towels',
    group: ArticleGroupId.HairAccessories,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'silk-vs-satin-pillowcase-hair',
    group: ArticleGroupId.HairAccessories,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'best-heatless-curling-sets',
    group: ArticleGroupId.HairAccessories,
    order: 30,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'how-to-use-a-microfibre-hair-towel',
    group: ArticleGroupId.HairAccessories,
    order: 40,
    enabled: true,
    publishDate: '2026-09-05',
  },
  {
    slug: 'cold-water-for-hair',
    group: ArticleGroupId.HairCare,
    order: 10,
    enabled: true,
    publishDate: '2026-08-31',
  },
  {
    slug: 'how-often-should-you-wash-your-hair',
    group: ArticleGroupId.HairCare,
    order: 20,
    enabled: true,
    publishDate: '2026-08-31',
  },
] as const;
