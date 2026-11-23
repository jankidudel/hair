import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { expect, it } from 'vitest';
import { AnalyticsService } from './analytics/analytics.service';
import { ArticlePageComponent } from './article-page.component';
import { ArticleSlug } from './article-slug';
import { articleRouteSnapshot } from './article-route.testing';

it('renders the specs introduction above the decoder and returns a result from the existing controls', () => {
  TestBed.configureTestingModule({
    imports: [ArticlePageComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: articleRouteSnapshot(ArticleSlug.HairDryerWattageGuide),
        },
      },
      { provide: AnalyticsService, useValue: { track: () => undefined } },
    ],
  });
  const fixture = TestBed.createComponent(ArticlePageComponent);
  fixture.detectChanges();
  const page: HTMLElement = fixture.nativeElement;
  const lede = page.querySelector('.article-header .lede')!;
  const decoder = page.querySelector('.hair-dryer-specs-decoder')!;
  expect(lede.textContent).toContain(
    'Use the label decoder to read your dryer',
  );
  expect(
    lede.compareDocumentPosition(decoder) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  const labelTable = page.querySelector(
    'table[aria-label="Read the label and the product listing"]',
  )!;
  expect(
    labelTable.compareDocumentPosition(decoder) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  for (const selector of [
    '[name="location"][value="home"]',
    '[name="wattage"][value="1400-1800"]',
    '[name="voltage"][value="dual"]',
    '[name="priority"][value="home-drying"]',
  ])
    decoder.querySelector<HTMLInputElement>(selector)!.click();
  decoder.querySelector<HTMLButtonElement>('.finder-submit')!.click();
  fixture.detectChanges();
  expect(
    decoder.querySelector('.dryer-finder-result h3')?.textContent,
  ).toBeTruthy();
  fixture.destroy();
});
