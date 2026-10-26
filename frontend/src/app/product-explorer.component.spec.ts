import { DOCUMENT } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { AnalyticsService } from './analytics/analytics.service';
import {
  DIFFERENT_MARKET_WARNING,
  GENERATION_WARNING,
  productBySlug,
} from './product-comparisons';
import { ProductExplorerComponent } from './product-explorer.component';
import { SiteSeoService } from './site-seo.service';

describe('ProductExplorerComponent decision support', () => {
  const analyticsCalls: unknown[][] = [];

  beforeEach(() => {
    analyticsCalls.length = 0;
    TestBed.configureTestingModule({
      imports: [ProductExplorerComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => null },
            },
          },
        },
        { provide: SiteSeoService, useValue: { set: () => undefined } },
        {
          provide: AnalyticsService,
          useValue: {
            track: (...args: unknown[]) => analyticsCalls.push(args),
          },
        },
        { provide: DOCUMENT, useValue: document },
      ],
    });
  });

  async function setup() {
    const fixture = TestBed.createComponent(ProductExplorerComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.componentInstance.selectedSlugs = [];
    fixture.changeDetectorRef.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('does not show a market warning for same-market records', async () => {
    const fixture = await setup();
    fixture.componentInstance.selectedSlugs = [
      'dyson-supersonic-nural',
      'shark-speedstyle-pro',
    ];
    expect(fixture.componentInstance.selectedMarketWarning).toBeUndefined();
  });

  it('shows exact market and generation warnings when records differ', async () => {
    const fixture = await setup();
    fixture.componentInstance.selectedSlugs = [
      'dyson-supersonic-nural',
      'babyliss-flawless-volume-2764u-uk',
    ];
    expect(fixture.componentInstance.selectedMarketWarning).toBe(
      DIFFERENT_MARKET_WARNING,
    );
    expect(fixture.componentInstance.selectedGenerationWarning).toBe(
      GENERATION_WARNING,
    );
  });

  it('shows the generation warning when a generation is unknown', async () => {
    const fixture = await setup();
    fixture.componentInstance.selectedSlugs = [
      'dyson-supersonic-nural',
      'conair-digitalaire-2',
    ];
    expect(fixture.componentInstance.selectedGenerationWarning).toBe(
      GENERATION_WARNING,
    );
  });

  it('shows unknown fields explicitly and renders scope and checklist once for two models', async () => {
    const fixture = await setup();
    fixture.componentInstance.selectedSlugs = [
      'dyson-supersonic-nural',
      'shark-speedstyle-pro',
    ];
    fixture.changeDetectorRef.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain(
      'Not established for this exact record',
    );
    expect(element.querySelectorAll('app-evidence-scope')).toHaveLength(1);
    expect(element.querySelectorAll('app-upgrade-check')).toHaveLength(1);
  });

  it('does not render the checklist with fewer than two selected models', async () => {
    const fixture = await setup();
    fixture.componentInstance.selectedSlugs = ['dyson-supersonic-nural'];
    fixture.changeDetectorRef.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('app-upgrade-check')).toHaveLength(0);
    expect(element.textContent).toContain(
      'Compare products that answer the same job',
    );
  });

  it('emits only start/completion event names without answers or product identities', async () => {
    const fixture = await setup();
    fixture.componentInstance.toggleProduct('dyson-supersonic-nural');
    fixture.componentInstance.toggleProduct('shark-speedstyle-pro');
    expect(analyticsCalls).toEqual([
      ['product_explorer_started'],
      ['product_explorer_comparison_completed'],
    ]);
  });
  it('keeps researched pairs crawlable and permits only the explicit tong/wand exception', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;
    const element = fixture.nativeElement as HTMLElement;
    expect(
      element.querySelectorAll(
        '[aria-labelledby="researched-pairs-heading"] a',
      ),
    ).toHaveLength(7);
    expect(element.textContent).toContain('Price not compared');
    expect(
      component.filteredProducts.some((p) => p.slug === 'ghd-air-uk'),
    ).toBe(true);
    component.priceFilter = 'premium';
    expect(
      component.filteredProducts.some((p) => p.slug === 'ghd-air-uk'),
    ).toBe(false);
    component.priceFilter = 'all';
    component.toggleProduct('ghd-curve-soft-curl-tong-uk');
    component.toggleProduct('ghd-air-uk');
    expect(component.selectedSlugs).toHaveLength(1);
    component.toggleProduct('ghd-curve-creative-curl-wand-uk');
    expect(component.selectedSlugs).toHaveLength(2);
    component.toggleProduct('ghd-curve-classic-curl');
    expect(component.selectedSlugs).toHaveLength(2);
    fixture.changeDetectorRef.detectChanges();
    (
      Array.from(element.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('Clear selection'),
      ) as HTMLButtonElement
    ).click();
    expect(component.selectedSlugs).toEqual([]);
  });
  it('routes only the exact new US pairs to their researched comparisons', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(
      element.querySelectorAll(
        '[aria-labelledby="researched-pairs-heading"] a',
      ),
    ).map((a) => a.getAttribute('href'));
    expect(links).toContain('/guides/t3-airebrush-vs-airebrush-round');
    expect(links).toContain('/guides/t3-singlepass-curl-x-vs-ghd-soft-curl');
    for (const [slugs, path] of [
      [
        ['t3-airebrush-oval-us', 't3-airebrush-round-us'],
        '/guides/t3-airebrush-vs-airebrush-round',
      ],
      [
        ['t3-singlepass-curl-x-125-us', 'ghd-curve-soft-curl'],
        '/guides/t3-singlepass-curl-x-vs-ghd-soft-curl',
      ],
    ] as const) {
      for (const slug of slugs) {
        const card = Array.from(element.querySelectorAll('.product-card')).find(
          (candidate) =>
            candidate.querySelector('h2')?.textContent?.trim() ===
            productBySlug(slug)!.name,
        )!;
        expect(
          card.querySelector('.product-actions a.button')?.getAttribute('href'),
        ).toBe(path);
        (card.querySelector('.compare-toggle') as HTMLButtonElement).click();
        await fixture.whenStable();
      }
      expect(component.selectedSlugs).toEqual([...slugs]);
      expect(
        element.querySelectorAll('.comparison-matrix thead th'),
      ).toHaveLength(3);
      const clear = Array.from(element.querySelectorAll('button')).find(
        (button) => button.textContent?.trim() === 'Clear selection',
      )!;
      clear.click();
      await fixture.whenStable();
      expect(component.selectedSlugs).toEqual([]);
    }
    expect(
      component.comparisonForProduct('ghd-curve-soft-curl-tong-uk')?.path,
    ).toBe('/guides/ghd-soft-curl-tong-vs-creative-curl-wand');
  });
});
