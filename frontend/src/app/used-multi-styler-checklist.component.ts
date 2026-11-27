import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleSlug } from './article-slug';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { SiteSeoService } from './site-seo.service';
import { UsedMultiStylerChecklistWidgetComponent } from './used-multi-styler-checklist-widget.component';

/**
 * Reference kits listed in the prerendered page, each with the anchor used by
 * preset links (#kit-<id>). used-multi-styler-checklist.spec.ts checks this
 * list against the checklist data.
 */
export const checklistReferenceList = [
  {
    id: 'uk-airwrap-id-straight-wavy-patina-topaz',
    label:
      'UK · Dyson Airwrap i.d. Straight+Wavy, Ceramic Patina/Topaz · Dyson retail kit',
  },
  {
    id: 'uk-airwrap-id-diffuser-vinca-topaz',
    label:
      'UK · Dyson Airwrap i.d. with Diffuser, Vinca Blue/Topaz · Dyson retail kit',
  },
  {
    id: 'uk-airwrap-id-diffuser-vinca-topaz-refurbished',
    label:
      'UK · Dyson Refurbished Airwrap i.d. with Diffuser, Vinca Blue/Topaz · Dyson refurbished kit',
  },
  {
    id: 'uk-airwrap-complete-long-nickel-copper',
    label: 'UK · Dyson Airwrap Complete Long, Nickel/Copper · Dyson retail kit',
  },
  {
    id: 'uk-airwrap-complete-long-nickel-copper-refurbished',
    label:
      'UK · Dyson Refurbished Airwrap Complete Long, Nickel/Copper · Dyson refurbished listing (partial)',
  },
  {
    id: 'us-flexstyle-hd430-stone',
    label: 'US · Shark FlexStyle HD430, Stone · Shark new retail kit',
  },
  {
    id: 'us-flexstyle-hd430ref-beige',
    label:
      'US · Shark FlexStyle Certified Renewed HD430REF, Beige · Shark Certified Renewed listing (partial)',
  },
] as const;

@Component({
  selector: 'app-used-multi-styler-checklist',
  imports: [
    BreadcrumbsComponent,
    RouterLink,
    UsedMultiStylerChecklistWidgetComponent,
  ],
  styleUrls: ['tool-shared.css'],
  styles: [
    '@media print { app-breadcrumbs, .lede, .tool-static { display: none; } }',
  ],
  template: `
    <section class="tool-page used-checklist">
      <app-breadcrumbs [items]="breadcrumbs" />
      <div class="listing-intro">
        <p class="eyebrow">Choose · Check a used listing</p>
        <h1>Used Multi-Styler Checklist</h1>
        <p class="lede">
          Choose the kit that best matches the listing, then mark which pieces
          the seller shows or lists. Pick the attachments you actually need.
          You’ll get a short list of missing pieces and things to confirm before
          you decide.
        </p>
      </div>

      @defer (on immediate) {
        <app-used-multi-styler-checklist-widget />
      } @placeholder {
        <p class="tool-card tool-placeholder">
          The checklist loads here. The demo listing and guidance below work
          without it.
        </p>
      }
      <div class="tool-static no-print">
        <section aria-labelledby="read-listing-heading">
          <h2 id="read-listing-heading">How to read the listing</h2>
          <p>
            Start with the exact kit name, colour and package type. A Dyson
            retail kit, a Dyson refurbished kit and a private seller’s bundle
            are three different sources, even when the names match. The
            reference tells you what the maker lists for that pack. Only the
            seller’s photos and answers tell you what this listing includes.
          </p>
          <p>
            <strong>Demo listing:</strong> a US Shark FlexStyle HD430 listing
            shows the main unit and one 1¼-inch curler. A second curler isn’t
            visible, and the Styling Concentrator isn’t in the photos or the
            text. Mark Curler 1 as shown, Curler 2 as can’t tell and the
            concentrator as not included. The checklist asks for one photo of
            the second curler and lists the concentrator as missing.
          </p>
        </section>
        <section aria-labelledby="attachments-heading">
          <h2 id="attachments-heading">Check the attachments you use</h2>
          <p>
            Choose only the roles you need. A presentation case or comb that you
            won’t use is listed under other pieces, never as a missing
            essential. Barrels of different sizes are separate checks, and when
            a pack lists two curlers of the same size, one photographed curler
            can’t answer for both. For which pieces fit which body, see
            <a
              [routerLink]="[
                '/guides',
                slugs.DysonAirwrapAttachmentCompatibility,
              ]"
              >Dyson Airwrap attachment compatibility</a
            >
            and
            <a [routerLink]="['/guides', slugs.SharkFlexstyleModelsCompared]"
              >Shark FlexStyle models compared</a
            >. To compare new boxes, use the
            <a routerLink="/products" fragment="compare-multi-styler-kits"
              >Multi-Styler Kit Comparison</a
            >.
          </p>
        </section>
        <section aria-labelledby="reference-list-heading">
          <h2 id="reference-list-heading">Reference kits in this checklist</h2>
          <p>
            Each reference is one exact pack. A partial listing shows only the
            pieces the maker confirms.
          </p>
          <ul>
            @for (kit of references; track kit.id) {
              <li [attr.id]="'kit-' + kit.id">
                <a [href]="'/used-multi-styler-checklist#kit-' + kit.id">{{
                  kit.label
                }}</a>
              </li>
            }
          </ul>
        </section>
        <section aria-labelledby="manual-heading">
          <h2 id="manual-heading">Where to find the matching manual</h2>
          <p>
            Ask for a photo of the rating label, then look the model code up in
            the
            <a routerLink="/hair-tool-manual-finder">Hair Tool Manual Finder</a
            >. The manual helps you identify attachments by name. For a fuller
            walkthrough of a Dyson listing, read
            <a [routerLink]="['/guides', slugs.BuyingAUsedDysonAirwrap]"
              >buying a used Dyson Airwrap</a
            >.
          </p>
        </section>
      </div>
    </section>
  `,
})
export class UsedMultiStylerChecklistComponent {
  private readonly seo = inject(SiteSeoService);
  readonly slugs = ArticleSlug;
  readonly references = checklistReferenceList;
  readonly breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Tools', path: '/tools' },
    { label: 'Used Multi-Styler Checklist' },
  ];

  constructor() {
    this.seo.set(
      'Used Airwrap & FlexStyle Checklist | Check the Listing',
      'Match a used Dyson Airwrap or Shark FlexStyle listing to a known kit and turn missing or unclear attachments into questions for the seller.',
      '/used-multi-styler-checklist',
      undefined,
      [
        { label: 'Home', path: '/' },
        { label: 'Tools', path: '/tools' },
        {
          label: 'Used Multi-Styler Checklist',
          path: '/used-multi-styler-checklist',
        },
      ],
    );
  }
}
