import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import { CookieConsentBannerComponent } from './analytics/cookie-consent-banner.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CookieConsentBannerComponent,
  ],
  styleUrl: 'app.component.css',
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/" aria-label="Comb Report home">
        <svg
          class="brand-mark"
          viewBox="0 0 44 28"
          width="44"
          height="28"
          aria-hidden="true"
        >
          <path d="M3 6h25a7 7 0 0 1 0 14H15" />
          <path d="M7 10v10M11 10v10M15 10v10M19 10v10M23 10v10" />
          <path d="M31 10l8 8" />
        </svg>
        <span>Comb Report</span>
      </a>
      <nav aria-label="Main navigation">
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Home</a
        ><a routerLink="/hair-care" routerLinkActive="active">Hair Care</a
        ><a routerLink="/tools" routerLinkActive="active">Tools</a
        ><a routerLink="/products" routerLinkActive="active">Products</a
        ><a routerLink="/guides" routerLinkActive="active">Guides</a
        ><a routerLink="/about" routerLinkActive="active">About</a>
      </nav>
    </header>
    <main class="site-main"><router-outlet /></main>
    <footer class="site-footer">
      <div class="footer-row">
        <p>
          Independent grooming editorial. Some pages may contain affiliate
          links.
          <a routerLink="/affiliate-disclosure">Read our disclosure</a>.
        </p>
        <p>
          <a routerLink="/about">About</a> ·
          <a routerLink="/privacy">Privacy</a> ·
          <a routerLink="/editorial-policy">Editorial policy</a> ·
          <a routerLink="/testing-research-methodology">Methodology</a> ·
          <a routerLink="/corrections-policy">Corrections</a> ·
          <a routerLink="/contact">Contact</a>
        </p>
      </div>
    </footer>
    <app-cookie-consent-banner />
  `,
})
export class AppComponent {
  constructor() {
    inject(AnalyticsService);
  }
}
