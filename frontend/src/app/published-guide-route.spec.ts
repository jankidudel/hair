import { waveMethodSlugs } from './wave-method-guides';
import { toolChoiceSlugs } from './tool-choice-guides';
import { UrlSegment } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { publishedGuideCanMatch } from './published-guide-route';
import { ArticleSlug } from './article-slug';

describe('published guide route matching', () => {
  it('matches a published guide route', () => {
    expect(
      publishedGuideCanMatch({}, [
        new UrlSegment('guides', {}),
        new UrlSegment('cold-water-for-hair', {}),
      ]),
    ).toBe(true);
  });

  it('declines an unknown guide so the normal 404 route handles it', () => {
    expect(
      publishedGuideCanMatch({}, [
        new UrlSegment('guides', {}),
        new UrlSegment('markdown-syntax-example', {}),
      ]),
    ).toBe(false);
  });

  it('matches published method guides and keeps unknown routes excluded', () => {
    for (const slug of [
      ...toolChoiceSlugs,
      ...waveMethodSlugs,
      ArticleSlug.HowToSectionHairForStyling,
      ArticleSlug.HowToUseAWideToothComb,
      ArticleSlug.HowToUseACurlDefiningBrush,
      ArticleSlug.HowToUseAHairPick,
      ArticleSlug.HowToPlopHair,
      ArticleSlug.HowToUseHairspray,
      ArticleSlug.FlexibleVsStrongHoldHairspray,
      ArticleSlug.SeaSaltSprayVsTexturisingSpray,
      ArticleSlug.HowToUseSeaSaltSpray,
      ArticleSlug.PomadeVsHairClay,
      ArticleSlug.HowToApplyHairPomade,
    ]) {
      expect(
        publishedGuideCanMatch({}, [
          new UrlSegment('guides', {}),
          new UrlSegment(slug, {}),
        ]),
      ).toBe(true);
    }
    expect(
      publishedGuideCanMatch({}, [
        new UrlSegment('guides', {}),
        new UrlSegment('how-to-use-an-unpublished-hair-tool', {}),
      ]),
    ).toBe(false);
  });
});
