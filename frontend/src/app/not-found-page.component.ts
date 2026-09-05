import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteSeoService } from './site-seo.service';

@Component({
  imports: [RouterLink],
  template: `
    <section class="not-found-page">
      <p class="eyebrow">Error 404</p>
      <h1>That page could not be found.</h1>
      <p class="lede">
        The link may be outdated, or the address may have been typed
        incorrectly.
      </p>
      <div class="not-found-actions">
        <a class="button" routerLink="/">Go to the homepage</a>
        <a class="button" routerLink="/guides">Browse guides</a>
      </div>
    </section>
  `,
})
export class NotFoundPageComponent {
  private readonly seo = inject(SiteSeoService);

  constructor() {
    this.seo.applyNoIndex(
      'Page Not Found | Comb Report',
      'The page you requested could not be found.',
    );
  }
}
