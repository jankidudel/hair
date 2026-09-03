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
}

export const articleGroups = {
  [ArticleGroupId.HairDryers]: { label: 'Hair Dryers' },
  [ArticleGroupId.HotAirBrushes]: { label: 'Hot-Air Brushes' },
  [ArticleGroupId.BrushesAndCombs]: { label: 'Brushes & Combs' },
  [ArticleGroupId.HairCare]: { label: 'Hair Care' },
  [ArticleGroupId.HairAccessories]: { label: 'Hair Accessories' },
  [ArticleGroupId.Guides]: { label: 'Guides' },
} as const;

export const articleRegistry: readonly ArticleRegistryEntry[] = [
  {
    slug: 'best-hair-dryers-fine-hair',
    group: ArticleGroupId.HairDryers,
    order: 10,
    enabled: true,
  },
  {
    slug: 'best-hair-dryers-thick-hair',
    group: ArticleGroupId.HairDryers,
    order: 20,
    enabled: true,
  },
  {
    slug: 'best-hair-dryers-curly-hair',
    group: ArticleGroupId.HairDryers,
    order: 30,
    enabled: true,
  },
  {
    slug: 'best-travel-hair-dryers',
    group: ArticleGroupId.HairDryers,
    order: 40,
    enabled: true,
  },
  {
    slug: 'how-to-choose-hair-dryer',
    group: ArticleGroupId.HairDryers,
    order: 50,
    enabled: true,
  },
  {
    slug: 'dyson-supersonic-vs-shark-speedstyle',
    group: ArticleGroupId.HairDryers,
    order: 60,
    enabled: true,
  },
  {
    slug: 'best-hot-air-brushes',
    group: ArticleGroupId.HotAirBrushes,
    order: 10,
    enabled: true,
  },
  {
    slug: 'best-hot-air-brushes-fine-hair',
    group: ArticleGroupId.HotAirBrushes,
    order: 20,
    enabled: true,
  },
  {
    slug: 'best-hot-air-brushes-short-hair',
    group: ArticleGroupId.HotAirBrushes,
    order: 30,
    enabled: true,
  },
  {
    slug: 'dyson-airwrap-vs-shark-flexstyle',
    group: ArticleGroupId.HotAirBrushes,
    order: 40,
    enabled: true,
  },
  {
    slug: 'hot-air-brush-vs-hair-dryer',
    group: ArticleGroupId.HotAirBrushes,
    order: 50,
    enabled: true,
  },
  {
    slug: 'how-to-use-hot-air-brush',
    group: ArticleGroupId.HotAirBrushes,
    order: 60,
    enabled: true,
  },
  {
    slug: 'best-detangling-brushes',
    group: ArticleGroupId.BrushesAndCombs,
    order: 10,
    enabled: true,
  },
  {
    slug: 'best-brushes-thick-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 20,
    enabled: true,
  },
  {
    slug: 'best-brushes-curly-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 30,
    enabled: true,
  },
  {
    slug: 'best-brushes-fine-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 40,
    enabled: true,
  },
  {
    slug: 'wide-tooth-comb-vs-detangling-brush',
    group: ArticleGroupId.BrushesAndCombs,
    order: 50,
    enabled: true,
  },
  {
    slug: 'boar-bristle-brush-guide',
    group: ArticleGroupId.BrushesAndCombs,
    order: 60,
    enabled: true,
  },
  {
    slug: 'how-to-choose-hair-brush',
    group: ArticleGroupId.BrushesAndCombs,
    order: 70,
    enabled: true,
  },
  {
    slug: 'best-hair-brush-for-short-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 80,
    enabled: true,
  },
  {
    slug: 'best-hair-brush-for-thick-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 90,
    enabled: true,
  },
  {
    slug: 'best-hair-brush-for-curly-hair',
    group: ArticleGroupId.BrushesAndCombs,
    order: 100,
    enabled: true,
  },
  {
    slug: 'boar-bristle-vs-nylon-brush',
    group: ArticleGroupId.BrushesAndCombs,
    order: 110,
    enabled: true,
  },
  {
    slug: 'hair-brush-vs-comb',
    group: ArticleGroupId.BrushesAndCombs,
    order: 120,
    enabled: true,
  },
  {
    slug: 'best-heat-protectants',
    group: ArticleGroupId.HairCare,
    order: 10,
    enabled: true,
  },
  {
    slug: 'best-leave-in-conditioners-dry-hair',
    group: ArticleGroupId.HairCare,
    order: 20,
    enabled: true,
  },
  {
    slug: 'best-microfibre-hair-towels',
    group: ArticleGroupId.HairAccessories,
    order: 10,
    enabled: true,
  },
  {
    slug: 'silk-vs-satin-pillowcase-hair',
    group: ArticleGroupId.HairAccessories,
    order: 20,
    enabled: true,
  },
  {
    slug: 'best-heatless-curling-sets',
    group: ArticleGroupId.HairAccessories,
    order: 30,
    enabled: true,
  },
  {
    slug: 'cold-water-for-hair',
    group: ArticleGroupId.Guides,
    order: 10,
    enabled: true,
  },
  {
    slug: 'how-often-should-you-wash-your-hair',
    group: ArticleGroupId.Guides,
    order: 20,
    enabled: true,
  },
  {
    slug: 'how-to-choose-a-hair-brush',
    group: ArticleGroupId.Guides,
    order: 30,
    enabled: true,
  },
  {
    slug: 'markdown-syntax-example',
    group: ArticleGroupId.Guides,
    order: 40,
    enabled: true,
  },
] as const;
