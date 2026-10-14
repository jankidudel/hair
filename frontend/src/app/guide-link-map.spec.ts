import { describe, expect, it } from 'vitest';
import { articleRegistry } from './article-registry';
import { ArticleSlug } from './article-slug';
import { guideLinkMap } from './guide-link-map';

describe('guide next steps', () => {
  it('uses valid, unique, non-self guide destinations', () => {
    const knownSlugs = new Set(articleRegistry.map((entry) => entry.slug));
    for (const [slug, links] of Object.entries(guideLinkMap)) {
      expect(new Set(links.relatedSlugs).size, slug).toBe(
        links.relatedSlugs.length,
      );
      expect(links.relatedSlugs, slug).not.toContain(slug);
      for (const relatedSlug of links.relatedSlugs)
        expect(knownSlugs, `${slug} -> ${relatedSlug}`).toContain(relatedSlug);
    }
  });

  it('does not use registry adjacency for unrelated next steps', () => {
    expect(
      guideLinkMap[ArticleSlug.BestCurlingIrons].relatedSlugs,
    ).not.toContain(ArticleSlug.BestTravelFlatIrons);
    expect(
      guideLinkMap[ArticleSlug.BestCurlingIronsFineHair].relatedSlugs,
    ).toEqual(expect.arrayContaining([ArticleSlug.CurlingIronBarrelSizeGuide]));
    expect(
      guideLinkMap[ArticleSlug.HowToUseHairDryerConcentratorNozzle]
        .relatedSlugs,
    ).toEqual(
      expect.arrayContaining([ArticleSlug.HairDryerDiffuserVsConcentrator]),
    );
    expect(
      guideLinkMap[ArticleSlug.HeatlessCurlsNotWorking].relatedSlugs,
    ).toEqual(
      expect.arrayContaining([ArticleSlug.HowToUseHeatlessCurlersOnShortHair]),
    );
  });
});
