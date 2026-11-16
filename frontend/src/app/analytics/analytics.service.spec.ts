import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsService } from './analytics.service';
import { CookieConsentService } from './cookie-consent.service';
import { ANALYTICS_CONFIG } from './analytics-config';

describe('task guide analytics consent', () => {
  afterEach(() => {
    document
      .querySelectorAll('script[src*="googletagmanager"]')
      .forEach((script) => script.remove());
    Reflect.deleteProperty(window, 'gtag');
    Reflect.deleteProperty(window, 'dataLayer');
  });

  it('sends task events only with consent and strips query strings from page views', () => {
    const allowed = signal(false);
    const navigation = new Subject<NavigationEnd>();
    const gtag = vi.fn();
    Object.assign(window, { gtag });
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: CookieConsentService,
          useValue: { analyticsAllowed: allowed },
        },
        {
          provide: ANALYTICS_CONFIG,
          useValue: { googleAnalyticsMeasurementId: 'G-TEST' },
        },
        {
          provide: Router,
          useValue: {
            url: '/guides/how-to-use-flexi-rods?private=answer#section',
            events: navigation,
          },
        },
      ],
    });
    const service = TestBed.inject(AnalyticsService);
    const retailerEvent = {
      guide_path: '/guides/ghd-speed-vs-helios',
      merchant: 'ghd',
      offer_market: 'UK',
    };
    TestBed.flushEffects();
    service.track('guide_task_link_click', {
      task_group: 'roller_method',
      destination_type: 'method',
    });
    service.track('care_stop_guidance_view', { tool_family: 'flat_iron' });
    service.track('retailer_outbound_click', retailerEvent);
    expect(gtag).not.toHaveBeenCalled();
    expect(
      document.querySelector('script[src*="googletagmanager"]'),
    ).toBeNull();

    allowed.set(true);
    TestBed.flushEffects();
    expect(gtag).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/guides/how-to-use-flexi-rods',
    });
    service.track('care_stop_guidance_view', { tool_family: 'curling_tool' });
    expect(gtag).toHaveBeenCalledWith('event', 'care_stop_guidance_view', {
      tool_family: 'curling_tool',
    });
    service.track('retailer_outbound_click', retailerEvent);
    expect(
      gtag.mock.calls.filter((call) => call[1] === 'retailer_outbound_click'),
    ).toEqual([['event', 'retailer_outbound_click', retailerEvent]]);
    allowed.set(false);
    TestBed.flushEffects();
    gtag.mockClear();
    service.track('guide_task_link_click', {
      task_group: 'hot_tool_care',
      destination_type: 'method',
    });
    service.track('retailer_outbound_click', retailerEvent);
    navigation.next(
      new NavigationEnd(
        1,
        '/guides/test?model=private',
        '/guides/test?model=private',
      ),
    );
    expect(gtag).not.toHaveBeenCalled();
  });
});
