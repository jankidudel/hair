import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleSlug } from './article-slug';
import { ArticleGroupId } from './article-registry';
import { Breadcrumb, BreadcrumbsComponent } from './breadcrumbs.component';
import { articles } from './content.generated';
import { SiteSeoService } from './site-seo.service';

@Component({
  imports: [RouterLink, BreadcrumbsComponent],
  styleUrl: './static-page.component.css',
  template: `
    <app-breadcrumbs [items]="breadcrumbs" />
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
    <section
      class="category-product-explorer"
      aria-labelledby="direct-heat-start-heading"
    >
      <p class="eyebrow">Start here</p>
      <h2 id="direct-heat-start-heading">Choose the format before the model</h2>
      <p>
        Start with the tool format and the step it needs to support. Published
        dimensions and controls can narrow a choice, but do not guarantee the
        same result for every routine.
      </p>
      <ul>
        <li>
          <a
            [routerLink]="isFlat ? '/flat-iron-finder' : '/curling-tool-finder'"
            >Use the format finder</a
          >
          — narrow the handling and size questions first.
        </li>
        <li>
          <a routerLink="/products">Explore sourced product specifications</a> —
          inspect exact market labels, sources and unknowns.
        </li>
      </ul>
    </section>
    <section
      class="category-guide-section"
      aria-labelledby="direct-heat-compare-heading"
    >
      <div class="section-heading">
        <p class="eyebrow">Compare major tool types</p>
        <h2 id="direct-heat-compare-heading">Compare formats and features</h2>
      </div>
      <div class="editorial-grid guides-grid">
        @for (guide of comparisonGuides; track guide.slug) {
          <a class="guide-card" [routerLink]="['/guides', guide.slug]">
            <p class="eyebrow">{{ guide.category }}</p>
            <h2>{{ guide.heading }}</h2>
            <p>{{ guide.description }}</p>
            <span class="text-link"
              >Read guide <span aria-hidden="true">→</span></span
            >
          </a>
        }
      </div>
    </section>
    <section
      class="category-guide-section"
      aria-labelledby="direct-heat-learn-heading"
    >
      <div class="section-heading">
        <p class="eyebrow">Choose by routine</p>
        <h2 id="direct-heat-learn-heading">Selection, size and use guides</h2>
      </div>
      <div class="editorial-grid guides-grid">
        @for (guide of routineGuides; track guide.slug) {
          <a class="guide-card" [routerLink]="['/guides', guide.slug]">
            <p class="eyebrow">{{ guide.category }}</p>
            <h3>{{ guide.heading }}</h3>
            <p>{{ guide.description }}</p>
            <span class="text-link"
              >Read guide <span aria-hidden="true">→</span></span
            >
          </a>
        }
      </div>
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
            — inspect exact model and market sources.
          </li>
          <li>
            <a
              [routerLink]="[
                '/guides',
                articleSlug.FixedVsAdjustableTemperatureHairStraighteners,
              ]"
              >Choose fixed or adjustable controls</a
            >
            — decide whether a selectable setting matters.
          </li>
          <li>
            <a
              [routerLink]="['/guides', articleSlug.CeramicVsTitaniumFlatIrons]"
              >Read ceramic and titanium claims</a
            >
            — separate a coating from the whole plate.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.GhdChronosVsPlatinumPlus]"
              >Compare ghd Chronos and Platinum+</a
            >
            — separate two standard-width fixed-control models.
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
  readonly guides = articles.filter(
    (article) =>
      article.group === ArticleGroupId.DirectHeat &&
      (this.isFlat
        ? !/curling|wand/.test(article.slug)
        : /curling|wand/.test(article.slug)),
  );
  readonly comparisonGuides = this.guides.filter((guide) =>
    /\bvs\b/.test(guide.slug),
  );
  readonly routineGuides = this.guides.filter(
    (guide) => !/\bvs\b/.test(guide.slug),
  );
  readonly breadcrumbs: readonly Breadcrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Guides', path: '/guides' },
    { label: 'Flat Irons & Curling Tools' },
  ];
  constructor() {
    this.seo.set(
      this.isFlat
        ? 'Flat Irons and Hair Straighteners | Comb Report'
        : 'Curling Irons and Wands | Comb Report',
      this.isFlat
        ? 'Compare flat-iron plate widths, controls and researched US models.'
        : 'Compare curling-tool formats, barrel sizes and researched US models.',
      this.isFlat ? '/flat-irons' : '/curling-irons',
      undefined,
      [
        { label: 'Home', path: '/' },
        { label: 'Guides', path: '/guides' },
        { label: 'Flat Irons & Curling Tools', path: '/flat-irons' },
      ],
    );
  }
}
