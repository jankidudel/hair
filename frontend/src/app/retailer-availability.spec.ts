import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsService } from './analytics/analytics.service';
import { ArticlePageComponent } from './article-page.component';
import { ArticleSlug } from './article-slug';
import { articleRouteSnapshot } from './article-route.testing';
import { currentModelSources } from './current-model-comparison-guides';
import {
  RETAILER_OFFERS,
  liveOffers,
  type RetailerOfferGroup,
} from './retailer-availability';
import { linkPlacement, trackComparisonClick } from './comparison-funnel';

function render(
  slug: ArticleSlug,
  override?: Partial<Record<ArticleSlug, RetailerOfferGroup>>,
) {
  const track = vi.fn();
  TestBed.configureTestingModule({
    imports: [ArticlePageComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: { snapshot: articleRouteSnapshot(slug) },
      },
      { provide: AnalyticsService, useValue: { track } },
    ],
  });
  if (override)
    TestBed.overrideProvider(RETAILER_OFFERS, { useValue: override });
  const fixture = TestBed.createComponent(ArticlePageComponent);
  fixture.detectChanges();
  return { page: fixture.nativeElement as HTMLElement, track };
}

describe('retailer offers', () => {
  afterEach(() => TestBed.resetTestingModule());

  it.each([false, true])(
    'renders the ghd Speed vs Helios offers and disclosure (affiliate: %s)',
    (affiliate) => {
      const approved = 'https://example.com/approved-retailer-tracking';
      TestBed.configureTestingModule({
        providers: [provideZonelessChangeDetection()],
      });
      const configured = TestBed.inject(RETAILER_OFFERS);
      TestBed.resetTestingModule();
      const speedGroup = configured[ArticleSlug.GhdSpeedVsHelios]!;
      const { page, track } = render(
        ArticleSlug.GhdSpeedVsHelios,
        affiliate
          ? {
              [ArticleSlug.GhdSpeedVsHelios]: {
                ...speedGroup,
                offers: speedGroup.offers.map((offer, index) =>
                  index === 0 ? { ...offer, affiliateUrl: approved } : offer,
                ),
              },
            }
          : undefined,
      );
      const section = page.querySelector('.retailer-availability')!;
      const host = section.parentElement!;
      expect(
        host.previousElementSibling?.lastElementChild?.textContent,
      ).toContain('An unestablished field');
      expect(host.nextElementSibling?.firstElementChild?.textContent).toBe(
        'Give setting memory a real job',
      );
      const [speed, helios] = Array.from(section.querySelectorAll('a')).filter(
        (link) => !link.getAttribute('href')?.startsWith('/'),
      );
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
        retailer: 'ghd UK',
        model: 'ghd Speed Titanium Black',
        placement: 'after_comparison_table',
        affiliate_status: affiliate ? 'affiliate' : 'direct',
      });
    },
  );

  it('places exact UK Shark links below the Glam quick answer', () => {
    const { page, track } = render(ArticleSlug.SharkGlamVsFlexstyle);
    const section = page.querySelector('.retailer-availability')!;
    const host = section.parentElement!;
    expect(host.nextElementSibling?.firstElementChild?.textContent).toBe(
      'Separate the body from the jobs in the box',
    );
    const links = Array.from(section.querySelectorAll('a'));
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Check Glam HD6052SUK at SharkNinja UK',
      'Check FlexStyle HD446UK at SharkNinja UK',
    ]);
    expect(links[0].getAttribute('href')).toContain('/HD6052SUK.html');
    expect(links[1].getAttribute('href')).toContain('/HD446UK.html');
    links[1].dispatchEvent(new MouseEvent('auxclick', { button: 2 }));
    expect(track).not.toHaveBeenCalled();
    links[1].dispatchEvent(new MouseEvent('auxclick', { button: 1 }));
    expect(track).toHaveBeenCalledExactlyOnceWith(
      'retailer_outbound_click',
      expect.objectContaining({
        guide_path: '/guides/shark-glam-vs-flexstyle',
        offer_market: 'UK',
        model: 'HD446UK',
        placement: 'below_quick_answer',
        affiliate_status: 'direct',
      }),
    );
  });

  it('renders only verified US offers below the Airwrap quick choice', () => {
    const { page } = render(ArticleSlug.DysonAirwrapVsSharkFlexstyle);
    const section = page.querySelector('.retailer-availability')!;
    expect(section.parentElement?.previousElementSibling?.tagName).toBe(
      'APP-DECISION-SNAPSHOT',
    );
    const links = Array.from(section.querySelectorAll('a'));
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Check FlexStyle HD430 at SharkNinja US',
    ]);
  });

  it('keeps the unverified ghd Chronos and Platinum+ block switched off', () => {
    const { page } = render(ArticleSlug.GhdChronosVsPlatinumPlus);
    expect(page.querySelector('.retailer-availability')).toBeNull();
  });

  it('never renders an offer that has not been verified', () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    const groups = Object.values(TestBed.inject(RETAILER_OFFERS));
    for (const group of groups) {
      for (const offer of liveOffers(group))
        expect(offer.destinationCheck).toBe('verified');
      expect(new Set(group!.offers.map((offer) => offer.model)).size).toBe(
        group!.offers.length,
      );
    }
  });
});

describe('guide-to-comparison clicks', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('records source, destination, market and placement once', () => {
    const { page, track } = render(ArticleSlug.BestFlatIronsFineHair);
    const link = page.querySelector<HTMLAnchorElement>(
      `.article-body a[href="/guides/${ArticleSlug.GhdChronosVsPlatinumPlus}"]`,
    )!;
    expect(link).toBeTruthy();
    link.addEventListener('click', (event) => event.preventDefault());
    link.click();
    const calls = track.mock.calls.filter(
      ([name]) => name === 'guide_comparison_click',
    );
    expect(calls).toEqual([
      [
        'guide_comparison_click',
        {
          source_path: '/guides/best-flat-irons-fine-hair',
          destination_path: '/guides/ghd-chronos-vs-platinum-plus',
          offer_market: 'UK',
          placement: expect.any(String),
        },
      ],
    ]);
  });

  it('ignores links that are not funnel comparisons', () => {
    const track = vi.fn();
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '/guides/how-to-use-a-flat-iron');
    expect(trackComparisonClick({ track }, '/guides/x', anchor)).toBe(false);
    anchor.setAttribute('href', 'https://example.com/guides/shark-glam');
    expect(trackComparisonClick({ track }, '/guides/x', anchor)).toBe(false);
    expect(track).not.toHaveBeenCalled();
  });

  it('names the nearest heading and marks table placements', () => {
    const section = document.createElement('section');
    section.innerHTML = `<h2>Quick answer</h2><p><a id="a" href="#">x</a></p>
      <h2>Choose by job</h2><table><tbody><tr><td><a id="b" href="#">y</a></td></tr></tbody></table>`;
    expect(linkPlacement(section.querySelector('#a')!)).toBe('quick_answer');
    expect(linkPlacement(section.querySelector('#b')!)).toBe(
      'choose_by_job_table',
    );
  });
});
