import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import {
  liveOffers,
  type RetailerOffer,
  type RetailerOfferGroup,
} from './retailer-availability';

/**
 * Retailer links for an exact-model comparison. Direct links render until an
 * approved affiliate link is configured; affiliate links are labelled "Ad",
 * marked rel="sponsored" and preceded by the commission disclosure.
 */
@Component({
  selector: 'app-retailer-offers',
  imports: [RouterLink],
  styleUrl: 'retailer-offers.component.css',
  template: `@if (offers.length) {
    <section
      class="article-body retailer-availability"
      aria-labelledby="retailer-availability-heading"
    >
      <h2 id="retailer-availability-heading">Check retailer availability</h2>
      <p>{{ group().intro }}</p>
      @if (hasAffiliateOffer) {
        <p>
          We may earn a commission if you buy through links marked Ad.
          <a routerLink="/affiliate-disclosure">How affiliate links work</a>.
        </p>
      }
      <ul>
        @for (offer of offers; track offer.product) {
          <li>
            <span>{{ offer.product }}</span>
            <a
              [href]="offer.affiliateUrl || offer.url"
              [attr.rel]="offer.affiliateUrl ? 'sponsored' : null"
              (click)="track(offer)"
              (auxclick)="track(offer, $event)"
            >
              {{ offer.affiliateUrl ? 'Ad ' + offer.label : offer.label }}</a
            >
          </li>
        }
      </ul>
    </section>
  }`,
})
export class RetailerOffersComponent {
  private readonly analytics = inject(AnalyticsService);
  readonly guidePath = input.required<string>();
  readonly group = input.required<RetailerOfferGroup>();

  get offers(): readonly RetailerOffer[] {
    return liveOffers(this.group());
  }
  get hasAffiliateOffer(): boolean {
    return this.offers.some((offer) => !!offer.affiliateUrl);
  }

  track(offer: RetailerOffer, event?: MouseEvent): void {
    // auxclick also fires for right-clicks; only a middle click opens a link.
    if (event && event.button !== 1) return;
    this.analytics.track('retailer_outbound_click', {
      guide_path: this.guidePath(),
      merchant: offer.merchant,
      offer_market: this.group().market,
      retailer: offer.retailer,
      model: offer.model,
      placement: this.group().placementLabel,
      affiliate_status: offer.affiliateUrl ? 'affiliate' : 'direct',
    });
  }
}
