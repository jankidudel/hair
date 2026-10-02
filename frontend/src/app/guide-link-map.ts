import { ArticleSlug } from './article-slug';
import { articleRegistry, guideCategoryById } from './article-registry';

export interface GuideLinkMapEntry {
  readonly hubPath: string;
  readonly relatedSlugs: readonly string[];
}

/**
 * Contextual next steps are intentionally data-driven instead of being copied
 * into every article. Adjacent guides are grouped by the editorial registry,
 * and comparison pages override that default with their closest decision aids.
 */
const comparisonOverrides: Readonly<Record<string, readonly string[]>> = {
  [ArticleSlug.DysonSupersonicVsSharkSpeedstyle]: [
    ArticleSlug.HairDryerChooser,
    ArticleSlug.HairDryerWattageGuide,
  ],
  [ArticleSlug.DysonAirwrapVsSharkFlexstyle]: [
    ArticleSlug.BestHotAirBrushes,
    ArticleSlug.HotAirBrushVsHairDryer,
  ],
  [ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume]: [
    ArticleSlug.HotAirBrushBarrelSizeGuide,
    ArticleSlug.HotAirBrushVsHairDryerAndRoundBrush,
  ],
};

function relatedSlugs(slug: string, group: string): readonly string[] {
  const siblings = articleRegistry
    .filter((entry) => entry.enabled && entry.group === group)
    .sort((left, right) => left.order - right.order);
  const index = siblings.findIndex((entry) => entry.slug === slug);
  if (index < 0 || siblings.length < 3) return [];
  const defaultLinks = [
    siblings[(index + 1) % siblings.length].slug,
    siblings[(index + siblings.length - 1) % siblings.length].slug,
  ];
  // Comparison-specific decision aids supplement the cluster links. Keeping
  // the ring intact guarantees that every guide still receives two useful
  // contextual paths from within its own cluster.
  return [...new Set([...(comparisonOverrides[slug] ?? []), ...defaultLinks])];
}

export const guideLinkMap: Readonly<Record<string, GuideLinkMapEntry>> =
  Object.fromEntries(
    articleRegistry
      .filter((entry) => entry.enabled)
      .map((entry) => {
        const category = guideCategoryById[entry.group];
        if (!category)
          throw new Error(`No guide category exists for '${entry.slug}'.`);
        return [
          entry.slug,
          {
            hubPath: category.path,
            relatedSlugs: relatedSlugs(entry.slug, entry.group),
          },
        ];
      }),
  );
