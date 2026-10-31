import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { afterEach, describe, expect, it } from 'vitest';
import { ArticlePageComponent } from './article-page.component';
import { ArticleSlug } from './article-slug';
import { AnalyticsService } from './analytics/analytics.service';
import { currentModelSources } from './current-model-comparison-guides';

describe('supplementary model-specific article sources', () => {
  afterEach(() => TestBed.resetTestingModule());

  it.each([
    [ArticleSlug.DysonAirwrapVsSharkFlexstyle, currentModelSources.S13.url],
    [
      ArticleSlug.HowToChooseMultiStylerAttachments,
      currentModelSources.S11.url,
    ],
  ])(
    'renders a scoped source list for %s without replacing its existing evidence',
    (slug, url) => {
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
      const element: HTMLElement = fixture.nativeElement;
      const sourceLists = element.querySelectorAll(
        'section[aria-labelledby="source-checks-heading"]',
      );
      expect(sourceLists).toHaveLength(1);
      expect(sourceLists[0].querySelector(`a[href="${url}"]`)).not.toBeNull();
      expect(element.innerHTML).not.toContain('587990-01.pdf');
      if (slug === ArticleSlug.DysonAirwrapVsSharkFlexstyle) {
        expect(
          fixture.componentInstance.evidenceProducts.map(
            (product) => product.slug,
          ),
        ).toEqual(['dyson-airwrap-id-straight-wavy', 'shark-flexstyle-hd430']);
        expect(
          sourceLists[0].querySelector(
            `a[href="${currentModelSources.S9.url}"]`,
          ),
        ).not.toBeNull();
      }
      fixture.destroy();
    },
  );
});
