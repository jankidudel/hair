import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleSlug } from './article-slug';
import { SiteSeoService } from './site-seo.service';

@Component({
  imports: [RouterLink],
  styleUrl: './static-page.component.css',
  template: `
    <section class="listing-intro">
      <p class="eyebrow">Direct-heat tools</p>
      <h1>
        {{
          isFlat
            ? 'Flat irons and hair straighteners'
            : 'Curling irons, wands and barrel sizes'
        }}
      </h1>
      <p class="lede">
        {{
          isFlat
            ? 'Choose a flat-iron format by plate width, controls and documented travel details—not a promise about results.'
            : 'Choose a clamp, wand or tapered format and a practical barrel-size band for the routine you want.'
        }}
      </p>
    </section>
    <section class="category-product-explorer">
      <p class="eyebrow">Start here</p>
      <h2>Choose your next step</h2>
      @if (isFlat) {
        <ul>
          <li>
            <a routerLink="/flat-iron-finder">Use the Flat Iron Finder</a> —
            narrow a practical profile.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.FlatIronPlateWidthGuide]"
              >Compare plate widths</a
            >
            — use inches-first practical bands.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.BestFlatIrons]"
              >Compare researched models</a
            >
            — inspect exact US source records.
          </li>
        </ul>
      } @else {
        <ul>
          <li>
            <a routerLink="/curling-tool-finder">Use the Curling Tool Finder</a>
            — compare clamp and wand formats.
          </li>
          <li>
            <a
              [routerLink]="['/guides', articleSlug.CurlingIronBarrelSizeGuide]"
              >Compare barrel sizes</a
            >
            — sizes influence possible results, not guarantees.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.BestCurlingIrons]"
              >Compare researched models</a
            >
            — inspect exact US source records.
          </li>
        </ul>
      }
      <p>
        Specifications are researched from official sources. Follow the exact
        manufacturer instructions; published dimensions and controls do not
        guarantee a styling outcome.
      </p>
    </section>
  `,
})
export class DirectHeatHubComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SiteSeoService);
  readonly articleSlug = ArticleSlug;
  readonly isFlat = this.route.snapshot.data['kind'] === 'flat';
  constructor() {
    this.seo.set(
      this.isFlat
        ? 'Flat Irons and Hair Straighteners | Comb Report'
        : 'Curling Irons and Wands | Comb Report',
      this.isFlat
        ? 'Compare flat-iron plate widths, controls and researched US models.'
        : 'Compare curling-tool formats, barrel sizes and researched US models.',
      this.isFlat ? '/flat-irons' : '/curling-irons',
    );
  }
}
