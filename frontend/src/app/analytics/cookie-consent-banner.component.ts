import { Component, inject } from '@angular/core';
import { CookieConsentService } from './cookie-consent.service';

@Component({
  selector: 'app-cookie-consent-banner',
  styleUrl: './cookie-consent-banner.component.css',
  template: `@if (consent.bannerVisible()) {
    <aside
      class="consent-banner"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div>
        <h2 id="cookie-consent-title">Analytics cookies</h2>
        <p id="cookie-consent-description">
          We use optional analytics cookies to understand how visitors use Comb
          Report and improve it.
        </p>
      </div>
      <div class="actions">
        <button type="button" (click)="consent.accept()">
          Accept analytics</button
        ><button type="button" (click)="consent.reject()">Reject</button>
      </div>
    </aside>
  }`,
})
export class CookieConsentBannerComponent {
  readonly consent = inject(CookieConsentService);
}
