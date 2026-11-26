import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import {
  lookupManual,
  manualFinderMakers,
  manualRecordsByMaker,
  type ManualDocument,
  type ManualLookupResult,
  type ManualMarketChoice,
  type ManualRecord,
} from './hair-tool-manuals';
import { SiteSeoService } from './site-seo.service';

const marketLabel: Record<ManualMarketChoice, string> = {
  UK: 'UK',
  US: 'US',
  unsure: 'I’m not sure',
};

@Component({
  selector: 'app-hair-tool-manual-finder',
  imports: [BreadcrumbsComponent],
  styleUrl: 'hair-tool-manual-finder.component.css',
  template: `
    <section class="manual-finder-page">
      <app-breadcrumbs
        [items]="[
          { label: 'Home', path: '/' },
          { label: 'Tools', path: '/tools' },
          { label: 'Hair Tool Manual Finder' },
        ]"
      />
      <div class="listing-intro">
        <p class="eyebrow">Fix · Find the instructions</p>
        <h1>Hair Tool Manual Finder</h1>
        <p class="lede">
          Choose the market where you bought your tool and enter the model code
          from its rating label or paperwork. Open the matching official manual
          or support page.
        </p>
      </div>

      <form
        class="finder-card manual-form"
        aria-labelledby="manual-form-heading"
        (submit)="search($event)"
      >
        <h2 id="manual-form-heading">Look up your model</h2>
        <fieldset>
          <legend>Where did you buy it?</legend>
          <div class="market-options">
            @for (option of marketOptions; track option) {
              <label>
                <input
                  type="radio"
                  name="market"
                  [value]="option"
                  [checked]="market === option"
                  (change)="setMarket(option)"
                />
                {{ label(option) }}
              </label>
            }
          </div>
        </fieldset>
        <label class="code-field" for="manual-code"
          >Model code or named variant
          <input
            #codeInput
            id="manual-code"
            type="text"
            autocomplete="off"
            spellcheck="false"
            [value]="code"
            (input)="setCode($event)"
            aria-describedby="manual-code-hint"
          />
        </label>
        <p id="manual-code-hint" class="hint">
          Example: HD16. Spaces and capital letters do not matter. Do not enter
          a serial number.
        </p>
        <div class="form-actions">
          <button class="button" type="submit">Find documents</button>
          @if (code || result.kind !== 'empty') {
            <button class="text-button" type="button" (click)="clear()">
              Clear
            </button>
          }
        </div>
      </form>

      <div class="manual-result" aria-live="polite" aria-atomic="true">
        <p class="manual-status" role="status">{{ status }}</p>
      </div>

      @if (shownRecords.length > 0) {
        <section
          class="manual-records"
          aria-labelledby="manual-results-heading"
        >
          <h2 id="manual-results-heading" tabindex="-1" #resultsHeading>
            {{ resultsHeading }}
          </h2>
          @for (record of shownRecords; track record.id) {
            <article
              class="manual-card"
              [class.other-market]="result.kind === 'other-market'"
            >
              <p class="eyebrow">
                {{ record.maker }} · {{ record.market }}
                @if (result.kind === 'other-market') {
                  · Separate market evidence
                }
              </p>
              <h3>{{ record.name }}</h3>
              <dl>
                <div>
                  <dt>
                    {{
                      record.codeKind === 'model code'
                        ? 'Exact code'
                        : 'Named variant'
                    }}
                  </dt>
                  <dd>{{ record.code }}</dd>
                </div>
                <div>
                  <dt>Market</dt>
                  <dd>{{ record.market }}</dd>
                </div>
                <div>
                  <dt>Checked</dt>
                  <dd>{{ record.checkedDate }}</dd>
                </div>
              </dl>
              <ul class="manual-documents">
                @for (doc of record.documents; track doc.url) {
                  <li>
                    <a
                      [href]="doc.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      (click)="trackOutbound(doc)"
                      >{{ doc.type }}
                      @if (doc.pdf) {
                        (PDF)
                      }
                      <span class="visually-hidden">
                        for {{ record.name }}, opens in a new tab</span
                      ></a
                    >
                    @if (doc.scopeNote) {
                      <span class="scope-note">{{ doc.scopeNote }}</span>
                    }
                  </li>
                }
              </ul>
              @if (record.guideSlug) {
                <p class="related-guide">
                  Related guide:
                  <a [href]="'/guides/' + record.guideSlug">{{
                    record.guideLabel
                  }}</a>
                </p>
              }
            </article>
          }
        </section>
      }

      @if (result.kind === 'suggestions' || result.kind === 'choose-market') {
        <section
          class="manual-suggestions"
          aria-labelledby="suggestions-heading"
        >
          <h2 id="suggestions-heading">
            {{
              result.kind === 'choose-market'
                ? 'Choose the market on your receipt'
                : 'Possible matches'
            }}
          </h2>
          <ul>
            @for (record of result.records; track record.id) {
              <li>
                <button
                  type="button"
                  class="suggestion"
                  (click)="choose(record)"
                >
                  {{ record.code }} · {{ record.market }} ·
                  {{ record.name }}
                </button>
              </li>
            }
          </ul>
        </section>
      }

      @if (result.kind === 'none' || result.kind === 'other-market') {
        <section class="maker-fallback" aria-labelledby="fallback-heading">
          <h2 id="fallback-heading">Open the maker’s support page</h2>
          <ul>
            @for (maker of makers; track maker.maker) {
              @for (link of maker.links; track link.url) {
                <li>
                  <a
                    [href]="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    (click)="trackSupport()"
                    >{{ link.label }}</a
                  >
                </li>
              }
            }
          </ul>
        </section>
      }

      <section class="manual-explainer" aria-labelledby="label-example-heading">
        <h2 id="label-example-heading">Read the code on your label</h2>
        <p>
          Look on the rating label, usually on the handle or the base of the
          body, and on the box or receipt. Copy the code exactly, including any
          letters at the end. Codes that look alike can be different products: a
          UK listing often ends in UK, and a refurbished unit may end in REF.
        </p>
        <p>
          <strong>Worked example:</strong> the label on a Dyson Supersonic Nural
          reads HD16. Choose UK if you bought it in the UK, enter HD16 and open
          the user manual (PDF). Its filter section tells you to unplug, let it
          cool, rotate the filter cage anti-clockwise and clean the mesh without
          water. If the lights keep flashing red after that, the manual says to
          contact Dyson.
        </p>
        <p>
          A model from another market is shown separately and never as your
          manual. Plugs, voltage and box contents can differ between markets.
        </p>
      </section>

      <section class="manual-source-list" aria-labelledby="source-list-heading">
        <h2 id="source-list-heading">Official documents we have checked</h2>
        <p>
          Every link below was opened and checked on 26 November 2026. Product
          pages are labelled as product pages; they are not manuals.
        </p>
        @for (group of groups; track group.maker) {
          <h3>{{ group.maker }}</h3>
          <ul>
            @for (record of group.records; track record.id) {
              <li>
                <strong>{{ record.code }}</strong> ({{ record.market }}),
                {{ record.name }}:
                @for (
                  doc of record.documents;
                  track doc.url;
                  let last = $last
                ) {
                  <a [href]="doc.url"
                    >{{ doc.type }}
                    @if (doc.pdf) {
                      (PDF)
                    }
                  </a>
                  @if (!last) {
                    ·
                  }
                }
              </li>
            }
          </ul>
        }
        <h3>Browse by maker</h3>
        <p>
          These are the makers’ own support homes. Use them when your code is
          not listed above.
        </p>
        <ul>
          @for (maker of makers; track maker.maker) {
            @for (link of maker.links; track link.url) {
              <li>
                <a [href]="link.url">{{ link.label }}</a>
              </li>
            }
          }
        </ul>
        <p>
          Related:
          <a href="/guides/styling-tool-troubleshooting"
            >styling tool troubleshooting</a
          >
          ·
          <a href="/guides/how-to-clean-hair-dryer-filter"
            >how to clean a hair dryer filter</a
          >
        </p>
      </section>
    </section>
  `,
})
export class HairToolManualFinderComponent {
  private readonly seo = inject(SiteSeoService);
  private readonly analytics = inject(AnalyticsService);
  @ViewChild('resultsHeading') resultsHeadingRef?: ElementRef<HTMLElement>;
  @ViewChild('codeInput') codeInputRef?: ElementRef<HTMLInputElement>;
  readonly marketOptions: readonly ManualMarketChoice[] = [
    'UK',
    'US',
    'unsure',
  ];
  readonly groups = manualRecordsByMaker;
  readonly makers = manualFinderMakers;
  market?: ManualMarketChoice;
  code = '';
  result: ManualLookupResult = { kind: 'empty' };
  /** A record the reader explicitly chose from suggestions. */
  chosen?: ManualRecord;
  private started = false;

  constructor() {
    this.seo.set(
      'Hair Tool Manual Finder | Comb Report',
      'Find official manuals and support pages by hair tool model and market. Check the exact Dyson, Shark, ghd or other model code on your appliance.',
      '/hair-tool-manual-finder',
    );
  }

  label(option: ManualMarketChoice): string {
    return marketLabel[option];
  }

  setMarket(option: ManualMarketChoice): void {
    this.market = option;
  }

  setCode(event: Event): void {
    this.code = (event.target as HTMLInputElement).value;
  }

  search(event?: Event): void {
    event?.preventDefault();
    this.chosen = undefined;
    this.result = lookupManual(this.market, this.code);
    if (!this.started && this.result.kind !== 'empty') {
      this.analytics.track('manual_finder_started');
      this.started = true;
    }
    if (this.result.kind !== 'empty')
      this.analytics.track('manual_finder_result', {
        result: this.result.kind,
        market: this.market ?? 'none',
      });
  }

  choose(record: ManualRecord): void {
    this.chosen = record;
    this.result = { kind: 'exact', records: [record] };
    this.analytics.track('manual_finder_result', {
      result: 'chosen',
      market: record.market,
    });
    setTimeout(() => this.resultsHeadingRef?.nativeElement.focus());
  }

  clear(): void {
    this.code = '';
    this.chosen = undefined;
    this.result = { kind: 'empty' };
    this.codeInputRef?.nativeElement.focus();
  }

  get shownRecords(): readonly ManualRecord[] {
    return this.result.kind === 'exact' || this.result.kind === 'other-market'
      ? this.result.records
      : [];
  }

  get resultsHeading(): string {
    return this.result.kind === 'other-market'
      ? 'Record from another market'
      : 'Official documents';
  }

  get status(): string {
    const result = this.result;
    switch (result.kind) {
      case 'empty':
        return 'Enter a model code or browse the manufacturer links below.';
      case 'exact': {
        const record = result.records[0];
        return `Official documents for ${record.name} (${record.market}).`;
      }
      case 'other-market': {
        const markets = [...new Set(result.records.map((r) => r.market))];
        return `We don’t have a verified ${this.market} record for this code. The ${markets.join(' and ')} record below is separate evidence. Check the market and model on your label before using it.`;
      }
      case 'choose-market': {
        const markets = [...new Set(result.records.map((r) => r.market))];
        return `This code has records for ${markets.join(' and ')}. Choose the market where you bought your tool.`;
      }
      case 'suggestions':
        return 'No exact match. If one of these matches your label exactly, choose it.';
      case 'none':
        return 'We don’t have a verified match for this code and market. Check the suffix on your label or open the manufacturer’s support page.';
    }
  }

  trackOutbound(doc: ManualDocument): void {
    this.analytics.track('manual_finder_outbound_click', {
      document_type: doc.type,
    });
  }

  trackSupport(): void {
    this.analytics.track('manual_finder_support_click');
  }
}
