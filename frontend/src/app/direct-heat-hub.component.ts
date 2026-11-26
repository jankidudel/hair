import { resolveGuideCardCopy } from './guide-card-copy';
import { waveMethodCards } from './wave-method-guides';
import { straightenerGuideCards } from './straightener-guides';
import { toolChoiceCards } from './tool-choice-guides';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleSlug } from './article-slug';
import { ArticleGroupId } from './article-registry';
import { Breadcrumb, BreadcrumbsComponent } from './breadcrumbs.component';
import { articles } from './content-index.generated';
import { SiteSeoService } from './site-seo.service';
import { AnalyticsService } from './analytics/analytics.service';
import {
  modelComparisonDescriptions,
  modelComparisonGroups,
} from './model-comparison-guides';

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
    @if (isFlat) {
      <section
        class="category-guide-section"
        aria-labelledby="model-comparisons-heading"
      >
        <div class="section-heading">
          <h2 id="model-comparisons-heading">{{ modelComparisons.heading }}</h2>
          <p>{{ modelComparisons.intro }}</p>
        </div>
        <div class="editorial-grid guides-grid">
          @for (card of modelComparisons.cards; track card.slug) {
            <a class="guide-card" [routerLink]="['/guides', card.slug]">
              <h3>{{ card.label }}</h3>
              <p>{{ modelComparisonDescriptions[card.slug] }}</p>
              <span class="text-link">Read guide →</span>
            </a>
          }
        </div>
      </section>
      <section
        class="category-guide-section"
        aria-labelledby="heated-surface-care-heading"
      >
        <div class="section-heading">
          <h2 id="heated-surface-care-heading">
            Maintain the heated surface you already own
          </h2>
          <p>
            Routine residue and visible damage require different decisions. Use
            the exact model instructions for cleaning, then stop if a plate,
            barrel, clamp, housing, cord or plug is damaged.
          </p>
          <p>
            For a motor-wrapped chamber, use
            <a
              [routerLink]="[
                '/guides',
                articleSlug.HowToCleanAnAutomaticHairCurler,
              ]"
              >automatic-curler cleaning</a
            >. A removable care cover, accessible chamber surface and electrical
            body have different permission checks; an ordinary exposed-barrel
            cleaning method does not establish those access rules.
          </p>
          <p>
            For a reservoir-fed tool, use
            <a
              [routerLink]="[
                '/guides',
                articleSlug.HowToCleanASteamHairStraightener,
              ]"
              >steam-straightener care</a
            >
            to separate surfaces, combs, outlets and the water system. For a
            two-arm airflow appliance, use
            <a
              [routerLink]="[
                '/guides',
                articleSlug.HowToCleanAWetToDryHairStraightener,
              ]"
              >wet-to-dry straightener care</a
            >
            to identify permitted contact-surface and air-path access. Neither
            task is covered completely by an ordinary plate wipe, and another
            revision's removable part does not establish a cleaning permission.
          </p>
        </div>
        <div class="editorial-grid guides-grid">
          <a
            class="guide-card"
            [routerLink]="[
              '/guides',
              articleSlug.HowToCleanHairStraightenerPlates,
            ]"
            (click)="trackCareLink()"
          >
            <h3>Clean straightener plates</h3>
            <p>
              Use the model manual, avoid improvised solvents and inspect the
              plates before reconnecting power.
            </p>
            <span class="text-link">Open the plate-cleaning guide →</span>
          </a>
          <a
            class="guide-card"
            [routerLink]="['/guides', articleSlug.HowToCleanACurlingIronOrWand]"
            (click)="trackCareLink()"
          >
            <h3>Clean a curling iron or wand</h3>
            <p>
              Clean a conventional barrel, then check the clamp, hinge, stand,
              cord and plug where present.
            </p>
            <span class="text-link">Open the barrel-cleaning guide →</span>
          </a>
        </div>
      </section>
    }
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
      @if (isFlat) {
        <p>
          For a standard-width control comparison, use
          <a [routerLink]="['/guides', articleSlug.GhdSculptVsChronos]"
            >Sculpt versus Chronos</a
          >. For a corded model versus an original rechargeable system, use
          <a
            [routerLink]="[
              '/guides',
              articleSlug.DysonCorraleCoolshineVsCorrale,
            ]"
            >Corrale CoolShine versus original Corrale</a
          >. Keep user controls, internal regulation and power arrangements as
          separate choices. For the settings you can actually select on current
          UK irons, see
          <a
            [routerLink]="[
              '/guides',
              articleSlug.BestAdjustableTemperatureHairStraighteners,
            ]"
            >adjustable-temperature straighteners</a
          >; for Dyson’s wet-to-dry and dry-use tools, compare
          <a
            [routerLink]="[
              '/guides',
              articleSlug.DysonAirstraitVsCorraleCoolshine,
            ]"
            >Airstrait and Corrale CoolShine</a
          >.
        </p>
        <p>
          Compare
          <a
            [routerLink]="[
              '/guides',
              articleSlug.SteamHairStraightenerVsFlatIron,
            ]"
            >steam straightener versus flat iron</a
          >
          for a reservoir-fed plate system, or
          <a
            [routerLink]="[
              '/guides',
              articleSlug.WetToDryHairStraightenerVsFlatIron,
            ]"
            >wet-to-dry straightener versus flat iron</a
          >
          when the aim is combined drying and straightening. Once the task is
          clear, follow
          <a
            [routerLink]="[
              '/guides',
              articleSlug.HowToUseASteamHairStraightener,
            ]"
            >steam-straightener use</a
          >
          or
          <a
            [routerLink]="[
              '/guides',
              articleSlug.HowToUseAWetToDryHairStraightener,
            ]"
            >wet-to-dry straightener use</a
          >. Keep each appliance's starting state, fitted parts and modes with
          its own instructions.
        </p>
      } @else {
        <p>
          If you want to change how the section is wrapped, compare
          <a
            [routerLink]="[
              '/guides',
              articleSlug.AutomaticHairCurlerVsCurlingWand,
            ]"
            >automatic curlers and curling wands</a
          >. A motor-wrapped chamber, hand-guided barrel and airflow-attraction
          tool have different loading and release questions.
        </p>
        <p>
          For a repeated press pattern, compare
          <a [routerLink]="['/guides', articleSlug.HairWaverVsCurlingIron]"
            >waver and curling-iron actions</a
          >. For two patterned-contact formats, compare
          <a [routerLink]="['/guides', articleSlug.HairCrimperVsHairWaver]"
            >crimpers and wavers</a
          >. Decide which movement and contact pattern you want before
          interpreting a size label.
        </p>
        <p>
          For a set that cools in place,
          <a [routerLink]="['/guides', articleSlug.BestHotRollers]"
            >compare hot rollers by size and clip</a
          >. If a repeated wave is the format you want,
          <a [routerLink]="['/guides', articleSlug.BestHairWavers]"
            >compare dedicated hair wavers</a
          >
          to find a waver that fits the length and section you can comfortably
          position.
        </p>
        <p>
          Within one range, compare
          <a [routerLink]="['/guides', articleSlug.Mermade25mmVs32mmWaver]"
            >Mermade 25 mm and 32 mm Pro Wavers</a
          >
          by wave scale and head placement, or
          <a [routerLink]="['/guides', articleSlug.BeachwaverB1VsB125]"
            >Beachwaver B1 and B1.25</a
          >
          by barrel size on one rotating clamp design.
        </p>
      }
      @if (isFlat) {
        <p>
          For current control and voltage choices, compare
          <a
            [routerLink]="[
              '/guides',
              articleSlug.CloudNineOriginalIronVsTouchIron,
            ]"
            >Cloud Nine Original and Touch</a
          >. For documented steam-generation and comb changes, compare
          <a [routerLink]="['/guides', articleSlug.Steampod3VsSteampod4]"
            >SteamPod 3 and 4</a
          >.
        </p>
        <p>
          <strong>Compare straighteners by routine.</strong>
          <a
            [routerLink]="[
              '/guides',
              articleSlug.BestCordlessHairStraighteners,
            ]"
            >Shop cordless straighteners for touch-ups</a
          >
          by stated runtime and charging, or
          <a [routerLink]="['/guides', articleSlug.Steampod4VsDysonAirstrait]"
            >choose between SteamPod 4 and Dyson Airstrait</a
          >
          by whether you start on dried or wet hair.
        </p>
        <ul>
          <li>
            <a [routerLink]="['/guides', articleSlug.GhdOriginalVsChronos]"
              >Compare ghd Original and Chronos</a
            >: compare two UK preset models by plate width, controls and sleep
            timing.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.BestFlatIronsForShortHair]"
              >Choose a flat iron for short hair</a
            >: compare slim and standard heads for a fringe, crop or bob.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.GhdOriginalVsGold]"
              >Compare ghd Original and Gold</a
            >: see how the two UK preset stylers differ in width, controls and
            included equipment.
          </li>
          <li>
            <a
              [routerLink]="[
                '/guides',
                articleSlug.HowToChooseAGhdStraightener,
              ]"
              >Choose a ghd straightener</a
            >: sort the seven black UK models by plate format, sleep timer and
            warranty.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.GhdGoldVsChronos]"
              >Compare ghd Gold and Chronos</a
            >: two 26 mm UK stylers with different sleep timers and warranties.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.GhdMiniVsOriginal]"
              >Compare ghd Mini and Original</a
            >: a narrow plate for a fringe or crop against the standard
            Original.
          </li>
        </ul>
      } @else {
        <p>
          For two exact UK chamber curlers, compare
          <a
            [routerLink]="[
              '/guides',
              articleSlug.BabylissWaveSecretAirVsStyleSecretAir,
            ]"
            >C1900U Wave Secret Air and C6688U Style Secret Air</a
          >. Cooling air on release and warm AIR shaping have different roles.
        </p>
      }
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
            <h2>{{ toolChoiceCards[guide.slug]?.title ?? guide.heading }}</h2>
            <p>
              {{
                toolChoiceCards[guide.slug]?.description ?? guide.description
              }}
            </p>
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
        @if (!isFlat) {
          <p>
            For the selected mechanism, follow
            <a
              [routerLink]="[
                '/guides',
                articleSlug.HowToUseAnAutomaticHairCurler,
              ]"
              >automatic-curler operation</a
            >
            or
            <a [routerLink]="['/guides', articleSlug.HowToUseAHairWaver]"
              >waver use</a
            >. For a cooled motor-wrapped appliance,
            <a
              [routerLink]="[
                '/guides',
                articleSlug.HowToCleanAnAutomaticHairCurler,
              ]"
              >automatic-curler care</a
            >
            keeps chamber and cover access separate from the electrical body.
          </p>
        }
      </div>
      <div class="editorial-grid guides-grid">
        @for (guide of routineGuides; track guide.slug) {
          <a class="guide-card" [routerLink]="['/guides', guide.slug]">
            <p class="eyebrow">{{ guide.category }}</p>
            <h3>{{ toolChoiceCards[guide.slug]?.title ?? guide.heading }}</h3>
            <p>
              {{
                toolChoiceCards[guide.slug]?.description ?? guide.description
              }}
            </p>
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
              >Choose a flat iron</a
            >
            — settle width and controls before comparing exact models.
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
              >Choose a curling iron or wand</a
            >
            — settle holding action, barrel profile and controls.
          </li>
        </ul>
      }
      @if (isFlat) {
        <p>
          Choosing a curling format?
          <a [routerLink]="['/guides', articleSlug.BestCurlingIrons]"
            >Choose a curling iron or wand</a
          >, or
          <a routerLink="/curling-irons">browse curling tools and methods</a>.
        </p>
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
  readonly toolChoiceCards = resolveGuideCardCopy(
    toolChoiceCards,
    waveMethodCards,
  );
  readonly modelComparisons = modelComparisonGroups['direct-heat']!;
  readonly modelComparisonDescriptions = modelComparisonDescriptions;
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SiteSeoService);
  private readonly analytics = inject(AnalyticsService);
  readonly articleSlug = ArticleSlug;
  readonly isFlat = this.route.snapshot.data['kind'] === 'flat';
  readonly guides = articles.filter(
    (article) =>
      article.group === ArticleGroupId.DirectHeat &&
      !(
        this.isFlat &&
        (modelComparisonDescriptions[article.slug] ||
          straightenerGuideCards[article.slug])
      ) &&
      (this.isFlat
        ? (!/curling|curler|waver|crimper|wand/.test(article.slug) &&
            article.slug !==
              ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir) ||
          article.slug === ArticleSlug.T3SinglepassCurlXVsGhdSoftCurl
        : /curling|curler|waver|crimper|wand/.test(article.slug) ||
          article.slug === ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir ||
          article.slug === ArticleSlug.T3SinglepassCurlXVsGhdSoftCurl),
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
  trackCareLink(): void {
    this.analytics.track('guide_task_link_click', {
      task_group: 'hot_tool_care',
      destination_type: 'method',
    });
  }
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
