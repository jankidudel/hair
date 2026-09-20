/** Stable, non-editorial public paths shared by routing and authored content. */
export const SitePath = {
  ProductExplorer: '/products',
  FlatIrons: '/flat-irons',
  CurlingIrons: '/curling-irons',
  FlatIronFinder: '/flat-iron-finder',
  CurlingToolFinder: '/curling-tool-finder',
} as const;

export type SitePath = (typeof SitePath)[keyof typeof SitePath];
