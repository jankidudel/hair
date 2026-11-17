import { DOCUMENT } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { describe, expect, it } from 'vitest';
import { ArticlePageComponent } from './article-page.component';
import { ArticleSlug } from './article-slug';
import { articles } from './content.generated';
import { seoRoutesForArticles } from './seo-route-policy';
import { AnalyticsService } from './analytics/analytics.service';

describe('substantive article dates', () => {
  it.each([
    ArticleSlug.HowToChooseHairSectioningClips,
    ArticleSlug.HowToChooseClawClipSize,
  ])(
    'preserves publication and renders the substantive revision for %s',
    (slug) => {
      TestBed.configureTestingModule({
        imports: [ArticlePageComponent],
        providers: [
          provideZonelessChangeDetection(),
          provideRouter([]),
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { paramMap: convertToParamMap({ slug }) } },
          },
          { provide: AnalyticsService, useValue: { track: () => undefined } },
        ],
      });
      const fixture = TestBed.createComponent(ArticlePageComponent);
      fixture.detectChanges();
      const doc = TestBed.inject(DOCUMENT);
      const schema = JSON.parse(
        doc.querySelector('script[data-site-jsonld]')!.textContent!,
      );
      const article = (schema['@graph'] ?? [schema]).find(
        (value: Record<string, unknown>) => value['@type'] === 'Article',
      );
      expect(article.datePublished).toBe('2026-10-07');
      expect(article.dateModified).toBe(
        slug === ArticleSlug.HowToChooseHairSectioningClips
          ? '2026-11-17'
          : '2026-11-03',
      );
      expect(
        seoRoutesForArticles(articles).find(
          (route) => route.path === `/guides/${slug}`,
        )?.lastmod,
      ).toBe(article.dateModified);
      const unchanged = articles.find(
        (value) => value.slug === ArticleSlug.HowToDiffuseWavyHair,
      )!;
      expect(unchanged.updatedDate).toBeUndefined();
      expect(
        seoRoutesForArticles(articles).find(
          (route) => route.path === `/guides/${unchanged.slug}`,
        )?.lastmod,
      ).toBe(unchanged.publishDate);
      expect(fixture.nativeElement.textContent).not.toContain(
        article.dateModified,
      );
      fixture.destroy();
      doc
        .querySelectorAll('script[data-site-jsonld]')
        .forEach((node) => node.remove());
    },
  );
});
