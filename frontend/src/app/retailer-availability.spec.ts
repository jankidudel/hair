import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsService } from './analytics/analytics.service';
import { ArticlePageComponent } from './article-page.component';
import { ArticleSlug } from './article-slug';
import { articleRouteSnapshot } from './article-route.testing';
import { currentModelSources } from './current-model-comparison-guides';
import { GHD_UK_RETAILER_OFFERS } from './retailer-availability';

describe('ghd UK retailer pilot', () => {
  afterEach(() => TestBed.resetTestingModule());

  it.each([false, true])(
    'renders the correct offer destinations and disclosure (affiliate: %s)',
    (affiliate) => {
      const track = vi.fn();
      const approved = 'https://example.com/approved-retailer-tracking';
      TestBed.configureTestingModule({
        imports: [ArticlePageComponent],
        providers: [
          provideZonelessChangeDetection(),
          provideRouter([]),
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: articleRouteSnapshot(ArticleSlug.GhdSpeedVsHelios),
            },
          },
          { provide: AnalyticsService, useValue: { track } },
        ],
      });
      if (affiliate) {
        TestBed.overrideProvider(GHD_UK_RETAILER_OFFERS, {
          useValue: [
            {
              product: 'ghd Speed (Titanium Black)',
              label: 'Check ghd Speed at ghd UK',
              url: currentModelSources.S1.url,
              affiliateUrl: approved,
            },
            {
              product: 'ghd Helios (Black)',
              label: 'Check ghd Helios at ghd UK',
              url: currentModelSources.S2.url,
            },
          ],
        });
      }
      const fixture = TestBed.createComponent(ArticlePageComponent);
      fixture.detectChanges();
      const page: HTMLElement = fixture.nativeElement;
      const section = page.querySelector('.retailer-availability')!;
      expect(
        section.previousElementSibling?.lastElementChild?.textContent,
      ).toContain('An unestablished field');
      expect(section.nextElementSibling?.firstElementChild?.textContent).toBe(
        'Give setting memory a real job',
      );
      const [speed, helios] = Array.from(section.querySelectorAll('a'));
      expect(speed.getAttribute('href')).toBe(
        affiliate ? approved : currentModelSources.S1.url,
      );
      expect(speed.getAttribute('rel')).toBe(affiliate ? 'sponsored' : null);
      expect(speed.textContent?.trim()).toBe(
        affiliate
          ? 'Ad Check ghd Speed at ghd UK'
          : 'Check ghd Speed at ghd UK',
      );
      expect(helios.getAttribute('href')).toBe(currentModelSources.S2.url);
      expect(helios.getAttribute('rel')).toBeNull();
      expect(section.textContent?.includes('We may earn a commission')).toBe(
        affiliate,
      );
      expect(page.querySelector('#source-checks-heading')).toBeTruthy();
      const click = new Event('click', { bubbles: true, cancelable: true });
      speed.dispatchEvent(click);
      expect(click.defaultPrevented).toBe(false);
      expect(track).toHaveBeenCalledExactlyOnceWith('retailer_outbound_click', {
        guide_path: '/guides/ghd-speed-vs-helios',
        merchant: 'ghd',
        offer_market: 'UK',
      });
    },
  );
});
