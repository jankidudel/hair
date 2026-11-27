import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleSlug } from './article-slug';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { HairDryerAttachmentFinderWidgetComponent } from './hair-dryer-attachment-finder-widget.component';
import { SiteSeoService } from './site-seo.service';

/**
 * Worked examples rendered in the prerendered page, without the finder's
 * data. dryer-attachments.spec.ts checks each line against checkFit().
 */
export const finderWorkedExamples = [
  {
    id: 'helios-diffuser',
    label: 'ghd Helios · Diffuser',
    market: 'UK',
    outcome: 'Fits with adapter ring',
    summary:
      'The maker lists the ghd Professional Hair Dryer Diffuser (p-281) on the ghd Helios, Black (p-497).',
  },
  {
    id: 'hd542uk-diffuser',
    label: 'Shark HD542UK · Diffuser',
    market: 'UK',
    outcome: 'Fits',
    summary:
      'The maker lists the Shark SpeedStyle Pro Flex Diffuser (XSKHD5DMSEU) on the Shark SpeedStyle Pro Flex 4-in-1 HD542UK, Mocha Silver.',
  },
  {
    id: 'nural-wave-curl',
    label: 'Dyson Supersonic Nural · Wave+Curl',
    market: 'UK',
    outcome: 'Fits',
    summary:
      'The maker lists the Dyson Supersonic Wave+Curl diffuser (973924-01) on the Dyson Supersonic Nural HD16, Ceramic patina/topaz.',
  },
  {
    id: 'helios-concentrator',
    label: 'ghd Helios · Concentrator',
    market: 'UK',
    outcome: 'Fits',
    summary:
      'The maker lists the ghd Professional Wide Styling Nozzle (p-519) on the ghd Helios, Black (p-497).',
  },
] as const;

@Component({
  selector: 'app-hair-dryer-attachment-finder',
  imports: [
    BreadcrumbsComponent,
    RouterLink,
    HairDryerAttachmentFinderWidgetComponent,
  ],
  styleUrls: ['tool-shared.css'],
  styles: ['@media print { app-breadcrumbs, .tool-static { display: none; } }'],
  template: `
    <section class="tool-page attachment-finder">
      <app-breadcrumbs [items]="breadcrumbs" />
      <div class="listing-intro">
        <p class="eyebrow">Fix · Check part fit</p>
        <h1>Hair Dryer Attachment Finder</h1>
        <p class="lede">
          Choose the country your dryer was sold for and its exact model. Then
          choose the kind of attachment you need or enter the part code. We’ll
          show what the maker confirms about fit, any adapter it names, and what
          the selected dryer kit lists in the box.
        </p>
      </div>

      @defer (on immediate) {
        <app-hair-dryer-attachment-finder-widget />
      } @placeholder {
        <p class="tool-card tool-placeholder">
          The attachment finder loads here. The worked examples and guidance
          below work without it.
        </p>
      }
      <div class="tool-static">
        <section aria-labelledby="fit-meaning-heading">
          <h2 id="fit-meaning-heading">What a fit result means</h2>
          <ul>
            <li>
              <strong>Fits</strong>: the maker’s own fit list names this dryer
              for this part, in this market.
            </li>
            <li>
              <strong>Fits with adapter</strong>: the maker names an adapter or
              ring for this dryer. Check whether it comes with the part.
            </li>
            <li>
              <strong>Maker excludes this model</strong>: the maker expressly
              rules this pairing out.
            </li>
            <li>
              <strong>Fit unconfirmed</strong>: the evidence we hold does not
              name this pairing either way. It is not a no; ask the maker before
              ordering.
            </li>
          </ul>
          <p>
            A part with a similar name or the same collar size is not evidence
            of fit, and a US part list says nothing about a UK dryer. For how
            diffusers connect and what to measure, read
            <a [routerLink]="['/guides', slugs.HairDryerDiffuserCompatibility]"
              >hair dryer diffuser compatibility</a
            >.
          </p>
        </section>
        <section aria-labelledby="kit-check-heading">
          <h2 id="kit-check-heading">Check what came in your kit</h2>
          <p>
            Box contents belong to one exact kit and colour. “Not listed in this
            kit” is shown only when we hold that kit’s complete box list. When a
            box names a piece differently from the spare, such as the HD542UK
            Mocha Silver box’s DefrizzFast Diffuser, we show the box name and do
            not treat it as the spare code. For nozzles and concentrators, see
            <a
              [routerLink]="[
                '/guides',
                slugs.HairDryerReplacementNozzleCompatibility,
              ]"
              >hair dryer replacement nozzle compatibility</a
            >.
          </p>
        </section>
        <section aria-labelledby="model-code-heading">
          <h2 id="model-code-heading">Find the model code</h2>
          <p>
            The code is on the rating label, usually on the handle or near the
            cable, and in the manual or on the box. Copy every letter: HD542UK
            and HD542 are different market records. Do not enter a serial
            number. If you can’t find it, the
            <a routerLink="/hair-tool-manual-finder">Hair Tool Manual Finder</a>
            links to official manuals by model.
          </p>
        </section>
        <section aria-labelledby="finder-examples-heading">
          <h2 id="finder-examples-heading">Worked examples</h2>
          <ul>
            @for (example of examples; track example.id) {
              <li [attr.id]="'preset-' + example.id">
                <a
                  [href]="'/hair-dryer-attachment-finder#preset-' + example.id"
                  >{{ example.label }}</a
                >
                ({{ example.market }}): {{ example.outcome }}.
                {{ example.summary }}
              </li>
            }
          </ul>
        </section>
        <section aria-labelledby="finder-faq-heading">
          <h2 id="finder-faq-heading">Questions</h2>
          <h3>Why can a part fit my dryer but be missing from my box?</h3>
          <p>
            Fit lists and box lists answer different questions. A maker can list
            a diffuser as compatible with a model and still sell some kits of
            that model without it. Check the box list for your exact kit and
            colour, and the part’s own fit list.
          </p>
          <h3>Can I use a part listed for another country?</h3>
          <p>
            Only the market on the part listing is covered. If your dryer’s code
            is not on the list for your market, the result is “Fit unconfirmed”,
            even if a similar code appears elsewhere.
          </p>
        </section>
      </div>
    </section>
  `,
})
export class HairDryerAttachmentFinderComponent {
  private readonly seo = inject(SiteSeoService);
  readonly slugs = ArticleSlug;
  readonly examples = finderWorkedExamples;
  readonly breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Tools', path: '/tools' },
    { label: 'Hair Dryer Attachment Finder' },
  ];

  constructor() {
    this.seo.set(
      'Hair Dryer Attachment Finder | Model and Part Compatibility',
      'Check which diffuser, concentrator or other attachment fits your exact hair dryer, whether it needs an adapter, and what your selected kit lists in the box.',
      '/hair-dryer-attachment-finder',
      undefined,
      [
        { label: 'Home', path: '/' },
        { label: 'Tools', path: '/tools' },
        {
          label: 'Hair Dryer Attachment Finder',
          path: '/hair-dryer-attachment-finder',
        },
      ],
    );
  }
}
