import { describe, expect, it } from 'vitest';
import { airflowMethodCards } from './airflow-method-guides';
import { ArticleSlug } from './article-slug';
import { articles } from './content.generated';
import { isUnresolvedCardText, resolveGuideCardCopy } from './guide-card-copy';
import { shapingMethodCards } from './shaping-method-guides';
import { straightenerGuideCards } from './straightener-guides';
import { supportedUpdoCards } from './supported-updo-guides';
import { toolChoiceCards } from './tool-choice-guides';
import { waveMethodCards } from './wave-method-guides';

const listingCards = resolveGuideCardCopy(
  toolChoiceCards,
  waveMethodCards,
  airflowMethodCards,
  shapingMethodCards,
  supportedUpdoCards,
  straightenerGuideCards,
);

describe('guide card copy', () => {
  it('rejects raw paths, empty values, object dumps and bare category labels', () => {
    for (const value of [
      '`/guides/how-to-use-airflow-curling-barrels`',
      '/guides/how-to-use-airflow-curling-barrels',
      '',
      '   ',
      'undefined',
      '[object Object]',
      'Hot-Air Brushes',
      undefined,
    ])
      expect(isUnresolvedCardText(value), String(value)).toBe(true);
    expect(isUnresolvedCardText('How to use airflow curling barrels')).toBe(
      false,
    );
  });

  it('falls back to the canonical article heading for every listing card', () => {
    for (const article of articles) {
      const title = listingCards[article.slug]?.title ?? article.heading;
      const description =
        listingCards[article.slug]?.description ?? article.description;
      expect(isUnresolvedCardText(title), article.slug).toBe(false);
      expect(isUnresolvedCardText(description), article.slug).toBe(false);
    }
  });

  it('uses human headings for the previously malformed airflow and straightener cards', () => {
    for (const slug of [
      ArticleSlug.HowToUseAHairDryerFlyawayAttachment,
      ArticleSlug.HairDryerCombAttachmentVsConcentrator,
      ArticleSlug.HowToUseARotatingHotAirBrush,
      ArticleSlug.HowToUseAirflowCurlingBarrels,
      ArticleSlug.AirflowCurlingBarrelVsCurlingWand,
      ArticleSlug.SteamHairStraightenerVsFlatIron,
      ArticleSlug.HowToCleanAWetToDryHairStraightener,
    ]) {
      const article = articles.find((entry) => entry.slug === slug);
      if (!article) continue;
      expect(listingCards[slug]?.title ?? article.heading, slug).toBe(
        article.heading,
      );
    }
  });
});
