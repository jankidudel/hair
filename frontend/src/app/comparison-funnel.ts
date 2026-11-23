import { ArticleSlug } from './article-slug';
import type { AnalyticsService } from './analytics/analytics.service';

/** Market scope of each exact-model comparison in the buying-guide funnel. */
export const comparisonMarkets: Readonly<Partial<Record<string, string>>> = {
  [ArticleSlug.GhdChronosVsPlatinumPlus]: 'UK',
  [ArticleSlug.DysonAirwrapVsSharkFlexstyle]: 'US',
  [ArticleSlug.SharkGlamVsFlexstyle]: 'UK',
  [ArticleSlug.RevlonOneStepVolumizerVsPlus]: 'US',
  [ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume]: 'UK',
};

/** Buying guides whose clicks into a comparison form the first funnel step. */
export const funnelSourceSlugs: ReadonlySet<string> = new Set([
  ArticleSlug.BestFlatIronsFineHair,
  ArticleSlug.BestFlatIrons,
  ArticleSlug.BestHotAirBrushes,
  ArticleSlug.HowToChooseMultiStylerAttachments,
]);

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 60);

/** Names the nearest preceding h2 (and table, when inside one) for a link. */
export function linkPlacement(anchor: Element): string {
  const inTable = !!anchor.closest('table');
  let node: Element | null = anchor;
  while (node && node.parentElement && !node.matches('section, nav, main')) {
    let sibling = node.previousElementSibling;
    while (sibling) {
      if (sibling.tagName === 'H2') {
        const heading = slugify(sibling.textContent ?? '');
        return inTable ? `${heading}_table` : heading;
      }
      sibling = sibling.previousElementSibling;
    }
    node = node.parentElement;
  }
  const own = node?.querySelector('h2')?.textContent;
  const base = own ? slugify(own) : 'intro';
  return inTable ? `${base}_table` : base;
}

/**
 * Records one guide_comparison_click when a click on `target` follows an
 * internal link to an exact-model comparison. Returns whether it tracked.
 */
export function trackComparisonClick(
  analytics: Pick<AnalyticsService, 'track'>,
  sourcePath: string,
  target: EventTarget | null,
): boolean {
  const anchor = (target as Element | null)?.closest?.('a');
  const href = anchor?.getAttribute('href');
  if (!anchor || !href?.startsWith('/guides/')) return false;
  const destinationPath = href.split(/[?#]/, 1)[0];
  const slug = destinationPath.slice('/guides/'.length);
  const market = comparisonMarkets[slug];
  if (!market || destinationPath === sourcePath) return false;
  analytics.track('guide_comparison_click', {
    source_path: sourcePath,
    destination_path: destinationPath,
    offer_market: market,
    placement: linkPlacement(anchor),
  });
  return true;
}
