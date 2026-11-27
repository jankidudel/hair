import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import { ArticleSlug } from './article-slug';
import { watchPresetHash } from './tool-preset-hash';
import {
  attachmentTypeLabels,
  attachmentTypes,
  checkFit,
  dryerById,
  dryerLabel,
  findPartByCode,
  finderPresetById,
  kitStatusLabels,
  marketLabel,
  partById,
  partsByType,
  sampleFinderPresetIds,
  searchDryers,
  type AttachmentType,
  type DryerRecord,
  type DryerSearchResult,
  type FinderMarket,
  type FinderPreset,
  type FitResult,
} from './dryer-attachments';

type FinderMode = 'type' | 'code';

const tone = (result: FitResult): 'yes' | 'no' | 'maybe' =>
  result.status === 'excluded'
    ? 'no'
    : result.status === 'unconfirmed'
      ? 'maybe'
      : 'yes';

const noResultText =
  'We couldn’t confirm this dryer and attachment pairing. Check the model code and contact the maker before ordering.';

@Component({
  selector: 'app-hair-dryer-attachment-finder-widget',
  imports: [RouterLink],
  styleUrls: ['tool-shared.css', 'hair-dryer-attachment-finder.component.css'],
  template: `
    <div class="tool-page tool-widget">
      <div class="tool-layout">
        <form
          class="tool-card finder-controls"
          aria-labelledby="finder-controls-heading"
          (submit)="$event.preventDefault(); searchDryer()"
        >
          <h2 id="finder-controls-heading">Choose your dryer</h2>
          <fieldset>
            <legend>Where was your dryer sold?</legend>
            <div class="pill-row">
              @for (option of markets; track option) {
                <label class="pill">
                  <input
                    type="radio"
                    name="finder-market"
                    [value]="option"
                    [checked]="selectedMarket === option"
                    (change)="setMarket(option)"
                  />
                  <span>{{ option }}</span>
                </label>
              }
            </div>
          </fieldset>
          <label class="field" for="dryer-query"
            >Model code or product name
            <input
              #dryerInput
              id="dryer-query"
              type="search"
              autocomplete="off"
              spellcheck="false"
              [value]="query"
              (input)="setQuery($event)"
              aria-describedby="dryer-query-hint"
            />
            <span id="dryer-query-hint" class="hint"
              >Look for the model code on the label or in the manual. Example:
              HD542UK, ghd Helios or Supersonic Nural.</span
            >
          </label>
          <div class="button-row">
            <button class="tool-button" type="submit">Find my dryer</button>
            @if (dryer || query) {
              <button class="text-button" type="button" (click)="reset()">
                Start again
              </button>
            }
          </div>

          @if (search.kind === 'choices') {
            <p class="hint" id="dryer-choices-hint">
              More than one model matches. Choose the one on your label.
            </p>
            <ul class="choice-list" aria-describedby="dryer-choices-hint">
              @for (option of search.dryers; track option.id) {
                <li>
                  <button
                    type="button"
                    class="choice-button"
                    [attr.aria-pressed]="dryer?.id === option.id"
                    (click)="chooseDryer(option)"
                  >
                    {{ labelFor(option) }} · {{ marketOf(option) }}
                  </button>
                </li>
              }
            </ul>
          }

          @if (dryer) {
            <p class="selected-dryer">
              <span class="eyebrow"
                >{{ marketOf(dryer) }} · selected dryer</span
              >
              <strong>{{ labelFor(dryer) }}</strong>
            </p>
            @if (dryer.variants?.length) {
              <label class="field" for="dryer-variant"
                >Kit or colour (for box contents)
                <select
                  id="dryer-variant"
                  (change)="setVariant($event)"
                  aria-describedby="variant-hint"
                >
                  <option value="" [selected]="!variantId">
                    Another kit or not sure
                  </option>
                  @for (variant of dryer.variants; track variant.id) {
                    <option
                      [value]="variant.id"
                      [selected]="variantId === variant.id"
                    >
                      {{ variant.label }}
                    </option>
                  }
                </select>
                <span id="variant-hint" class="hint"
                  >Box contents differ between kits. Fit is checked against the
                  model.</span
                >
              </label>
            }
            <fieldset>
              <legend>What do you want to check?</legend>
              <div class="pill-row">
                <label class="pill">
                  <input
                    type="radio"
                    name="finder-mode"
                    value="type"
                    [checked]="mode === 'type'"
                    (change)="setMode('type')"
                  />
                  <span>Find by attachment type</span>
                </label>
                <label class="pill">
                  <input
                    type="radio"
                    name="finder-mode"
                    value="code"
                    [checked]="mode === 'code'"
                    (change)="setMode('code')"
                  />
                  <span>Check a part code</span>
                </label>
              </div>
            </fieldset>
            @if (mode === 'type') {
              <fieldset>
                <legend>Attachment type</legend>
                <div class="pill-row">
                  @for (option of types; track option) {
                    <label class="pill">
                      <input
                        type="radio"
                        name="finder-type"
                        [value]="option"
                        [checked]="type === option"
                        (change)="setType(option)"
                      />
                      <span>{{ typeLabel(option) }}</span>
                    </label>
                  }
                </div>
              </fieldset>
            } @else {
              <label class="field" for="part-code"
                >Part code
                <input
                  id="part-code"
                  type="text"
                  autocomplete="off"
                  spellcheck="false"
                  [value]="partCode"
                  (input)="setPartCode($event)"
                  (keydown.enter)="$event.preventDefault(); checkPartCode()"
                  aria-describedby="part-code-hint"
                />
                <span id="part-code-hint" class="hint"
                  >Enter it exactly as printed, including any letters at the
                  end. Example: XSKHD5DMSEU or 973924-01.</span
                >
              </label>
              <button
                class="tool-button secondary"
                type="button"
                (click)="checkPartCode()"
              >
                Check this part
              </button>
            }
          }
        </form>

        <div class="finder-results">
          <div aria-live="polite" aria-atomic="true">
            <p class="tool-status" role="status">{{ status }}</p>
          </div>
          @if (presetMessage) {
            <p class="hint">{{ presetMessage }}</p>
          }

          @if (search.kind === 'multi-styler') {
            <div class="result-card" data-tone="maybe">
              <h3>This looks like a multi-styler</h3>
              <p>
                This finder covers dedicated hair dryers. For this tool, use
                <a
                  [routerLink]="search.hint.path"
                  [fragment]="search.hint.fragment"
                  >{{ search.hint.label }}</a
                >.
              </p>
            </div>
          }

          @if (search.kind === 'other-market') {
            <div class="result-card" data-tone="maybe">
              <h3>Recorded for another market</h3>
              <p>
                @for (
                  other of search.dryers;
                  track other.id;
                  let last = $last
                ) {
                  {{ labelFor(other) }} is a {{ other.market }} record{{
                    last ? '.' : ';'
                  }}
                }
                We don’t use it for a {{ selectedMarket }} dryer. Check the
                market and the suffix on your label.
              </p>
            </div>
          }

          @for (result of results; track result.part.id; let first = $first) {
            <article
              class="result-card"
              [attr.data-tone]="tone(result)"
              [attr.aria-labelledby]="'fit-' + result.part.id"
            >
              <p class="eyebrow">
                {{ marketOf(result.part) }} part · {{ marketOf(result.dryer) }}
                dryer
              </p>
              <h3
                [id]="'fit-' + result.part.id"
                [attr.tabindex]="first ? -1 : null"
                #resultHeading
              >
                <span class="status-text">{{ result.statusLabel }}</span>
              </h3>
              <p>{{ result.summary }}</p>
              <dl>
                <div>
                  <dt>Part</dt>
                  <dd>
                    {{ result.part.name }} · {{ result.part.code }}
                    @if (result.part.detail) {
                      · {{ result.part.detail }}
                    }
                  </dd>
                </div>
                <div>
                  <dt>Dryer</dt>
                  <dd>
                    {{ labelFor(result.dryer) }} ({{ marketOf(result.dryer) }})
                    @if (result.variant) {
                      · {{ result.variant.label }}
                    }
                  </dd>
                </div>
                @if (result.marketNote) {
                  <div>
                    <dt>Market</dt>
                    <dd>{{ result.marketNote }}</dd>
                  </div>
                }
                <div>
                  <dt>Adapter</dt>
                  <dd>
                    @if (result.record?.adapter) {
                      The maker names the {{ result.record?.adapter }}.
                      {{ result.record?.adapterSupply }}
                    } @else if (result.record) {
                      No adapter named.
                    } @else {
                      The maker doesn’t state this for this model.
                    }
                    @if (result.record) {
                      {{ result.record.instruction }}
                    }
                  </dd>
                </div>
                @if (result.familyNote) {
                  <div>
                    <dt>Family note</dt>
                    <dd>{{ result.familyNote.text }}</dd>
                  </div>
                }
                <div>
                  <dt>In your selected kit</dt>
                  <dd>
                    <strong>{{ kitLabel(result) }}</strong
                    >.
                    {{ result.kit.text }}
                  </dd>
                </div>
                @for (feature of result.features; track feature.text) {
                  <div>
                    <dt>Features</dt>
                    <dd>{{ feature.text }}</dd>
                  </div>
                }
              </dl>
              <div class="source-panel">
                <h4>Evidence</h4>
                <ul>
                  @for (source of result.evidence; track source.url) {
                    <li>
                      {{ evidenceRole(result, source.url) }}:
                      <a
                        [href]="source.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        (click)="trackOutbound()"
                        >{{ source.label
                        }}<span class="visually-hidden">
                          (opens in a new tab)</span
                        ></a
                      >
                      · {{ source.market }}
                      @if (source.checkedDate) {
                        · checked {{ source.checkedDate }}
                      }
                    </li>
                  }
                </ul>
              </div>
            </article>
          }

          @if (dryer && (results.length > 0 || noResult)) {
            <div class="next-actions">
              <h3>Next</h3>
              <ul>
                <li>
                  <button
                    class="text-button"
                    type="button"
                    (click)="checkAnother()"
                  >
                    Check another attachment
                  </button>
                </li>
                @if (dryer.guideSlug) {
                  <li>
                    <a [routerLink]="['/guides', dryer.guideSlug]">{{
                      dryer.guideLabel
                    }}</a>
                  </li>
                }
                @if (dryer.supportUrl) {
                  <li>
                    <a
                      [href]="dryer.supportUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ dryer.supportLabel
                      }}<span class="visually-hidden">
                        (opens in a new tab)</span
                      ></a
                    >
                  </li>
                }
                <li>
                  <a routerLink="/hair-tool-manual-finder"
                    >Find the official manual</a
                  >
                </li>
              </ul>
            </div>
          }

          <section aria-labelledby="samples-heading">
            <h2 id="samples-heading" class="samples-heading">
              Try a worked example
            </h2>
            <ul class="sample-grid">
              @for (sample of samples; track sample.preset.id) {
                <li>
                  <a
                    class="sample-card"
                    [href]="presetHref(sample.preset.id)"
                    (click)="applyPreset(sample.preset, $event)"
                  >
                    <span class="eyebrow">{{ sample.preset.market }}</span>
                    <strong>{{ sample.preset.label }}</strong>
                    <span>{{ sample.outcome }}</span>
                  </a>
                </li>
              }
            </ul>
          </section>
        </div>
      </div>
    </div>
  `,
})
export class HairDryerAttachmentFinderWidgetComponent {
  private readonly analytics = inject(AnalyticsService);
  @ViewChild('dryerInput') dryerInputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('resultHeading') resultHeadingRef?: ElementRef<HTMLElement>;
  readonly slugs = ArticleSlug;
  readonly markets: readonly FinderMarket[] = ['UK', 'US'];
  readonly types = attachmentTypes;
  readonly samples = sampleFinderPresetIds.map((id) => {
    const preset = finderPresetById(id) as FinderPreset;
    const dryer = dryerById(preset.dryerId) as DryerRecord;
    const part = partById(preset.partId as string);
    const result = part ? checkFit(dryer, preset.variantId, part) : undefined;
    return {
      preset,
      outcome: result?.statusLabel ?? '',
      summary: result?.summary ?? '',
    };
  });
  selectedMarket: FinderMarket = 'UK';
  query = '';
  search: DryerSearchResult = { kind: 'empty' };
  dryer?: DryerRecord;
  variantId?: string;
  mode: FinderMode = 'type';
  type?: AttachmentType;
  partCode = '';
  results: readonly FitResult[] = [];
  noResult = false;
  presetMessage = '';
  private started = false;

  constructor() {
    watchPresetHash(
      'preset-',
      (id) => {
        const preset = finderPresetById(id);
        if (preset) this.applyPreset(preset, undefined, true);
        return preset !== undefined;
      },
      () =>
        (this.presetMessage =
          'That link’s example is not available. Choose your dryer to start.'),
    );
  }

  marketOf(record: { market: DryerRecord['market'] }): string {
    return marketLabel(record.market);
  }

  presetHref(id: string): string {
    return `/hair-dryer-attachment-finder#preset-${id}`;
  }

  labelFor(dryer: DryerRecord): string {
    return dryerLabel(dryer);
  }

  typeLabel(type: AttachmentType): string {
    return attachmentTypeLabels[type];
  }

  tone(result: FitResult) {
    return tone(result);
  }

  kitLabel(result: FitResult): string {
    return kitStatusLabels[result.kit.status];
  }

  evidenceRole(result: FitResult, url: string): string {
    if (result.kit.source?.url === url) return 'Selected kit contents';
    if (result.familyNote?.source.url === url) return 'Family statement';
    return result.record ? 'Maker fit list' : 'Part listing';
  }

  get status(): string {
    if (this.search.kind === 'none')
      return `We don’t have a ${this.selectedMarket} dryer record for that code. ${noResultText}`;
    if (this.search.kind === 'choices')
      return `${this.search.dryers.length} models match. Choose yours.`;
    if (!this.dryer)
      return 'Choose UK or US, then enter your dryer’s model code or name.';
    if (this.noResult) return noResultText;
    if (this.results.length === 0)
      return this.mode === 'type'
        ? 'Choose the type of attachment you need.'
        : 'Enter the part code exactly as printed.';
    const first = this.results[0];
    return this.results.length === 1
      ? `${first.statusLabel}: ${first.part.name} (${first.part.code}) on the ${dryerLabel(first.dryer)}.`
      : `${this.results.length} ${this.typeLabel(first.part.type).toLowerCase()} records for the ${dryerLabel(first.dryer)}. Verified fits are listed first.`;
  }

  setMarket(market: FinderMarket): void {
    this.selectedMarket = market;
    // Never carry a dryer across markets.
    if (
      this.dryer &&
      this.dryer.market !== market &&
      this.dryer.market !== 'International'
    )
      this.reset(false);
    else if (this.query) this.searchDryer();
  }

  setQuery(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
  }

  searchDryer(): void {
    this.search = searchDryers(this.selectedMarket, this.query);
    this.dryer = undefined;
    this.clearResults();
    if (this.search.kind === 'match') this.chooseDryer(this.search.dryer);
    if (this.search.kind !== 'empty') this.trackStart();
  }

  chooseDryer(dryer: DryerRecord): void {
    this.dryer = dryer;
    this.variantId = undefined;
    this.clearResults();
    if (this.type) this.runType();
  }

  setVariant(event: Event): void {
    this.variantId = (event.target as HTMLSelectElement).value || undefined;
    this.rerun();
  }

  setMode(mode: FinderMode): void {
    this.mode = mode;
    this.clearResults();
    if (mode === 'type' && this.type) this.runType();
  }

  setType(type: AttachmentType): void {
    this.type = type;
    this.runType();
  }

  setPartCode(event: Event): void {
    this.partCode = (event.target as HTMLInputElement).value;
  }

  checkPartCode(): void {
    if (!this.dryer) return;
    const part = findPartByCode(this.partCode);
    this.results = part ? [checkFit(this.dryer, this.variantId, part)] : [];
    this.noResult = !part && this.partCode.trim().length > 0;
    this.trackResult();
  }

  checkAnother(): void {
    this.clearResults();
    this.type = undefined;
    this.partCode = '';
    setTimeout(() =>
      document
        .querySelector<HTMLInputElement>(
          this.mode === 'code' ? '#part-code' : 'input[name="finder-type"]',
        )
        ?.focus(),
    );
  }

  reset(focus = true): void {
    this.query = '';
    this.search = { kind: 'empty' };
    this.dryer = undefined;
    this.variantId = undefined;
    this.type = undefined;
    this.partCode = '';
    this.presetMessage = '';
    this.clearResults();
    if (focus) this.dryerInputRef?.nativeElement.focus();
  }

  applyPreset(preset: FinderPreset, event?: Event, focus = false): void {
    event?.preventDefault();
    const dryer = dryerById(preset.dryerId);
    if (!dryer) return;
    this.presetMessage = '';
    this.selectedMarket = preset.market;
    this.query = dryer.code ?? dryer.name;
    this.search = { kind: 'match', dryer };
    this.dryer = dryer;
    this.variantId = preset.variantId;
    this.clearResults();
    if (preset.partId) {
      const part = partById(preset.partId);
      this.mode = 'code';
      this.type = undefined;
      this.partCode = part?.code ?? '';
      if (part) this.results = [checkFit(dryer, preset.variantId, part)];
    } else if (preset.type) {
      this.mode = 'type';
      this.type = preset.type;
      this.runType();
    }
    this.analytics.track('attachment_finder_preset', { preset: preset.id });
    this.trackResult();
    if (event || focus)
      setTimeout(() => this.resultHeadingRef?.nativeElement.focus());
  }

  trackOutbound(): void {
    this.analytics.track('attachment_finder_outbound_click');
  }

  private rerun(): void {
    if (this.mode === 'type' && this.type) this.runType();
    else if (this.mode === 'code' && this.partCode) this.checkPartCode();
  }

  private runType(): void {
    if (!this.dryer || !this.type) return;
    this.results = partsByType(this.dryer, this.variantId, this.type);
    this.noResult = this.results.length === 0;
    this.trackResult();
  }

  private clearResults(): void {
    this.results = [];
    this.noResult = false;
  }

  private trackStart(): void {
    if (this.started) return;
    this.started = true;
    this.analytics.track('attachment_finder_started');
  }

  private trackResult(): void {
    this.trackStart();
    this.analytics.track('attachment_finder_result', {
      result: this.noResult ? 'none' : (this.results[0]?.status ?? 'none'),
      market: this.selectedMarket,
    });
  }
}
