import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ANALYTICS_CONFIG } from './analytics-config';
import { CookieConsentService } from './cookie-consent.service';

type GtagArguments = [
  command: string,
  target: string | Date,
  parameters?: object,
];
type AnalyticsWindow = Window & {
  dataLayer?: IArguments[];
  gtag?: (...args: GtagArguments) => void;
};

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly consent = inject(CookieConsentService);
  private readonly config = inject(ANALYTICS_CONFIG);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly measurementId = this.config.googleAnalyticsMeasurementId;
  private readonly enabled =
    this.isBrowser &&
    this.measurementId.length > 0 &&
    !this.measurementId.includes('REPLACE_ME');
  private scriptRequested = false;
  private initialised = false;
  private currentPath = this.cleanPath(this.router.url);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event) => {
        this.currentPath = this.cleanPath(event.urlAfterRedirects);
        this.trackPageView();
      });
    effect(() =>
      this.consent.analyticsAllowed() ? this.enable() : this.disable(),
    );
  }
  private enable(): void {
    if (!this.enabled) return;
    this.setMeasurementDisabled(false);
    if (this.initialised || this.scriptRequested) return;
    this.initialise();
    this.scriptRequested = true;
    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(this.measurementId)}`;
    script.addEventListener('error', () => {
      this.scriptRequested = false;
      this.initialised = false;
    });
    this.document.head.appendChild(script);
  }
  private initialise(): void {
    if (this.initialised || !this.consent.analyticsAllowed()) return;
    const browserWindow = this.getWindow();
    browserWindow.dataLayer ??= [];
    browserWindow.gtag ??= function (): void {
      // Google gtag.js expects the function's Arguments object, not an array.
      // eslint-disable-next-line prefer-rest-params
      browserWindow.dataLayer?.push(arguments);
    };
    browserWindow.gtag('js', new Date());
    browserWindow.gtag('config', this.measurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      anonymize_ip: true,
      send_page_view: false,
    });
    this.initialised = true;
    this.trackPageView();
  }
  private disable(): void {
    if (this.enabled) this.setMeasurementDisabled(true);
  }
  private trackPageView(): void {
    if (!this.enabled || !this.initialised || !this.consent.analyticsAllowed())
      return;
    this.getWindow().gtag?.('event', 'page_view', {
      page_path: this.currentPath,
    });
  }
  private cleanPath(url: string): string {
    return url.split(/[?#]/, 1)[0] || '/';
  }
  private getWindow(): AnalyticsWindow {
    return this.document.defaultView as AnalyticsWindow;
  }
  private setMeasurementDisabled(disabled: boolean): void {
    (this.getWindow() as unknown as Record<string, boolean>)[
      `ga-disable-${this.measurementId}`
    ] = disabled;
  }
}
