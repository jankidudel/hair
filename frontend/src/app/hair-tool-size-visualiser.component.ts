import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleSlug } from './article-slug';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { HairToolSizeVisualiserWidgetComponent } from './hair-tool-size-visualiser-widget.component';
import { SiteSeoService } from './site-seo.service';

/**
 * Comparison links rendered in the prerendered page, without the visualiser's
 * data. hair-tool-sizes.spec.ts checks each outcome against the data.
 */
export const visualiserWorkedComparisons = [
  {
    id: 'ghd-mini-vs-chronos-max',
    mode: 'Plate widths',
    label: 'ghd Mini vs Chronos Max plates',
    outcome: 'The 43 mm plate (B) is 28 mm wider than the 15 mm plate (A).',
  },
  {
    id: 'ghd-classic-vs-grand',
    mode: 'Curling barrels',
    label: 'ghd Classic 26 mm vs Grand 32 mm tong',
    outcome: 'The 32 mm barrel (B) is 6 mm wider than the 26 mm barrel (A).',
  },
  {
    id: 'ghd-conical-vs-max',
    mode: 'Curling barrels',
    label: 'ghd Conical 28–23 mm vs Max 38 mm wand',
    outcome:
      'The 38 mm cylinder is 10 mm wider than the 28 mm end and 15 mm wider than the 23 mm end.',
  },
  {
    id: 't3-curl-x-1-vs-125',
    mode: 'Curling barrels',
    label: 'T3 SinglePass Curl X 1″ vs 1¼″',
    outcome:
      'The 31.75 mm barrel (B) is 6.35 mm wider than the 25.4 mm barrel (A).',
  },
  {
    id: 'og-nt34-vs-ntxl34',
    mode: 'Round brushes',
    label: 'Olivia Garden NT-34 vs NTXL-34',
    outcome:
      'The 31.75 mm core (A) and the 31.75 mm core (B) have the same core diameter.',
  },
] as const;

@Component({
  selector: 'app-hair-tool-size-visualiser',
  imports: [
    BreadcrumbsComponent,
    RouterLink,
    HairToolSizeVisualiserWidgetComponent,
  ],
  styleUrls: ['tool-shared.css'],
  styles: [
    `
      .measure-diagram {
        max-width: 26rem;
        margin: 1rem 0;
      }
      .measure-diagram svg {
        display: block;
        width: 100%;
        height: auto;
        font-size: 13px;
        fill: var(--ink);
      }
      .measure-diagram .d-fill {
        fill: var(--green);
      }
      .measure-diagram .d-dash {
        fill: none;
        stroke: var(--ink);
        stroke-width: 2;
        stroke-dasharray: 6 4;
      }
      .measure-diagram .d-line {
        stroke: var(--ink);
        stroke-width: 2;
      }
      .measure-diagram .d-on-fill {
        fill: var(--surface);
        font-weight: 700;
      }
      .measure-diagram figcaption {
        color: var(--muted);
        font-size: 0.9rem;
      }
      @media print {
        app-breadcrumbs,
        .lede,
        .tool-static {
          display: none;
        }
      }
    `,
  ],
  template: `
    <section class="tool-page size-visualiser">
      <app-breadcrumbs [items]="breadcrumbs" />
      <div class="listing-intro">
        <p class="eyebrow">Choose · Compare sizes</p>
        <h1>Hair Tool Size Visualiser</h1>
        <p class="lede">
          Pick a tool shape and compare two sizes at the same scale. Choose
          published maker measurements or enter your own in millimetres or
          inches. The drawing labels the part you’re measuring, such as the
          heated plate, the barrel, or the outside edge of the bristles.
        </p>
      </div>

      @defer (on immediate) {
        <app-hair-tool-size-visualiser-widget />
      } @placeholder {
        <p class="tool-card tool-placeholder">
          The size drawing loads here. The comparisons and measurement notes
          below work without it.
        </p>
      }
      <div class="tool-static no-print">
        <section aria-labelledby="measure-meaning-heading">
          <h2 id="measure-meaning-heading">What each measurement means</h2>
          <figure class="measure-diagram">
            <svg
              viewBox="0 0 360 120"
              role="img"
              aria-labelledby="measure-diagram-caption"
            >
              <rect x="10" y="40" width="90" height="30" class="d-fill" />
              <line x1="10" y1="85" x2="100" y2="85" class="d-line" />
              <text x="55" y="105" text-anchor="middle">Plate width</text>
              <circle cx="180" cy="55" r="28" class="d-fill" />
              <line x1="152" y1="95" x2="208" y2="95" class="d-line" />
              <text x="180" y="115" text-anchor="middle">Barrel diameter</text>
              <circle cx="300" cy="55" r="45" class="d-dash" />
              <circle cx="300" cy="55" r="20" class="d-fill" />
              <text x="300" y="60" text-anchor="middle" class="d-on-fill">
                Core
              </text>
              <text x="300" y="115" text-anchor="middle">
                Bristle tips (dashed)
              </text>
            </svg>
            <figcaption id="measure-diagram-caption">
              Schematic, not to scale: a flat plate’s width, a barrel’s
              diameter, and a round brush’s solid core inside the dashed
              bristle-tip edge.
            </figcaption>
          </figure>
          <ul>
            <li>
              <strong>Heated plate width</strong> is the width of one heated
              plate on a flat iron, not the width of the whole tool. See the
              <a [routerLink]="['/guides', slugs.FlatIronPlateWidthGuide]"
                >flat iron plate width guide</a
              >.
            </li>
            <li>
              <strong>Barrel diameter</strong> is across the heated barrel. A
              tapered barrel has a wide end and a narrow end, and heated length
              is a separate figure. See the
              <a [routerLink]="['/guides', slugs.CurlingIronBarrelSizeGuide]"
                >curling iron barrel size guide</a
              >.
            </li>
            <li>
              <strong>Bare core diameter</strong> is the solid barrel of a round
              brush; <strong>bristle-tip diameter</strong> is across the outside
              of the bristles. See the
              <a [routerLink]="['/guides', slugs.RoundBrushSizeGuide]"
                >round brush size guide</a
              >.
            </li>
          </ul>
          <p>
            A one-number oval head label, such as a 2.8-inch blowout brush,
            doesn’t say which axis it measures, so it isn’t offered as a model
            here. Measure your own brush and enter the figure instead.
          </p>
        </section>
        <section aria-labelledby="try-heading">
          <h2 id="try-heading">Try these comparisons</h2>
          <ul class="sample-grid">
            @for (example of examples; track example.id) {
              <li [attr.id]="'compare-' + example.id">
                <a
                  class="sample-card"
                  [href]="'/hair-tool-size-visualiser#compare-' + example.id"
                >
                  <span class="eyebrow">{{ example.mode }}</span>
                  <strong>{{ example.label }}</strong>
                  <span>{{ example.outcome }}</span>
                </a>
              </li>
            }
          </ul>
        </section>
        <section aria-labelledby="print-check-heading">
          <h2 id="print-check-heading">Print and check the scale</h2>
          <p>
            Choose “Print size template”, then print at 100% or Actual Size.
            Measure the 50 mm calibration line with a ruler before you use the
            template. If it isn’t 50 mm, your printer scaled the page. A drawing
            wider than the page is left out of the print, and the table of
            measurements is printed instead.
          </p>
        </section>
      </div>
    </section>
  `,
})
export class HairToolSizeVisualiserComponent {
  private readonly seo = inject(SiteSeoService);
  readonly slugs = ArticleSlug;
  readonly examples = visualiserWorkedComparisons;
  readonly breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Tools', path: '/tools' },
    { label: 'Hair Tool Size Visualiser' },
  ];

  constructor() {
    this.seo.set(
      'Hair Tool Size Visualiser | Plate, Barrel and Brush Sizes',
      'Compare flat iron plate widths, curling barrel diameters and round brush sizes side by side. Use maker specs or enter your own measurements.',
      '/hair-tool-size-visualiser',
      undefined,
      [
        { label: 'Home', path: '/' },
        { label: 'Tools', path: '/tools' },
        {
          label: 'Hair Tool Size Visualiser',
          path: '/hair-tool-size-visualiser',
        },
      ],
    );
  }
}
