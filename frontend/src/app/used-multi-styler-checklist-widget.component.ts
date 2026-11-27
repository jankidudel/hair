import { Component, inject } from '@angular/core';
import { watchPresetHash } from './tool-preset-hash';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import { ArticleSlug } from './article-slug';
import {
  UNKNOWN_KIT,
  buildChecklist,
  checklistRoles,
  demoObservations,
  genericItems,
  listingConditions,
  observationLabels,
  observations,
  questionsText,
  referenceById,
  referencesForMarket,
  roleLabels,
  type ChecklistItem,
  type ChecklistMarket,
  type ChecklistResult,
  type ChecklistRole,
  type Observation,
  type ReferenceKit,
} from './used-multi-styler-checklist';

const cosmeticOptions = [
  'Not checked',
  'Looks clean in photos',
  'Visible wear in photos',
  'Damage visible in photos',
] as const;

@Component({
  selector: 'app-used-multi-styler-checklist-widget',
  imports: [RouterLink],
  styleUrls: ['tool-shared.css', 'used-multi-styler-checklist.component.css'],
  template: `
    <div class="tool-page tool-widget">
      <div class="tool-layout checklist-layout">
        <form
          class="tool-card checklist-controls"
          aria-labelledby="reference-heading"
          (submit)="$event.preventDefault()"
        >
          <h2 id="reference-heading">Choose the reference kit</h2>
          <fieldset class="no-print">
            <legend>Market</legend>
            <div class="pill-row">
              @for (option of markets; track option) {
                <label class="pill">
                  <input
                    type="radio"
                    name="checklist-market"
                    [value]="option"
                    [checked]="market === option"
                    (change)="setMarket(option)"
                  />
                  <span>{{ option }}</span>
                </label>
              }
            </div>
          </fieldset>
          <label class="field no-print" for="reference-kit"
            >Reference kit
            <select id="reference-kit" (change)="setKit($event)">
              <option value="" [selected]="!kitId">Choose the kit</option>
              @for (kit of marketKits; track kit.id) {
                <option [value]="kit.id" [selected]="kitId === kit.id">
                  {{ kit.market }} · {{ kit.name }}, {{ kit.variant }} ·
                  {{ kit.packageType }}
                </option>
              }
              <option [value]="unknownKit" [selected]="kitId === unknownKit">
                I can’t identify the kit yet
              </option>
            </select>
          </label>
          @if (kit) {
            <div class="reference-summary">
              <p class="eyebrow">{{ kit.market }} · {{ kit.packageType }}</p>
              <p>
                <strong>{{ kit.name }}</strong
                >, {{ kit.variant }}
              </p>
              <p class="hint">
                The official parts list is a reference for this specific pack.
                It doesn’t show what a seller includes.
                @if (!kit.complete) {
                  <strong>Maker only confirms some box contents.</strong>
                }
                @if (kit.note) {
                  {{ kit.note }}
                }
              </p>
              <p class="hint">
                Source:
                <a
                  [href]="kit.source.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ kit.source.label
                  }}<span class="visually-hidden">
                    (opens in a new tab)</span
                  ></a
                >
                · {{ kit.source.market }}
                @if (kit.source.checkedDate) {
                  · checked {{ kit.source.checkedDate }}
                }
              </p>
            </div>
          } @else if (kitId === unknownKit) {
            <p class="hint reference-summary">
              Reader checks only: these rows are general roles, not a maker’s
              package contents. Try the
              <a routerLink="/hair-tool-manual-finder"
                >Hair Tool Manual Finder</a
              >
              with the model code on the label to identify the kit.
            </p>
          }
          <label class="field no-print" for="listing-condition"
            >Listing type (optional)
            <select id="listing-condition" (change)="setCondition($event)">
              <option value="" [selected]="!condition">Not chosen</option>
              @for (option of conditions; track option) {
                <option [value]="option" [selected]="condition === option">
                  {{ option }}
                </option>
              }
            </select>
            <span class="hint"
              >Context only. It never changes the reference kit.</span
            >
          </label>
          <fieldset class="no-print">
            <legend>What do you want it for?</legend>
            <div class="pill-row">
              @for (role of roles; track role) {
                <label class="pill">
                  <input
                    type="checkbox"
                    [checked]="needed.includes(role)"
                    (change)="toggleRole(role)"
                  />
                  <span>{{ roleLabel(role) }}</span>
                </label>
              }
            </div>
          </fieldset>
        </form>

        <div class="checklist-main">
          @if (kitId) {
            <section
              class="tool-card item-checks"
              aria-labelledby="item-checks-heading"
            >
              <h2 id="item-checks-heading">
                Mark what the listing shows
                @if (kit) {
                  <span class="heading-scope"
                    >{{ kit.name }} ({{ kit.market }})</span
                  >
                }
              </h2>
              @for (row of items; track row.id) {
                <fieldset class="item-row">
                  <legend>
                    {{ row.name }}
                    @if (row.mainUnit) {
                      <span class="tag">Main unit</span>
                    } @else if (isWanted(row)) {
                      <span class="tag">You need this</span>
                    }
                  </legend>
                  <div class="observation-options">
                    @for (option of observationOptions; track option) {
                      <label class="obs">
                        <input
                          type="radio"
                          [name]="'obs-' + row.id"
                          [value]="option"
                          [checked]="observed(row) === option"
                          (change)="observe(row, option)"
                        />
                        <span>{{ observationLabel(option) }}</span>
                      </label>
                    }
                  </div>
                </fieldset>
              }
              <label class="field cosmetic" for="cosmetic"
                >Cosmetic condition from the photos (optional)
                <select id="cosmetic" (change)="setCosmetic($event)">
                  @for (option of cosmetic; track option) {
                    <option
                      [value]="option"
                      [selected]="cosmeticState === option"
                    >
                      {{ option }}
                    </option>
                  }
                </select>
                <span class="hint"
                  >Kept separate from completeness and from whether the unit
                  works.</span
                >
              </label>
            </section>

            <section
              class="tool-card checklist-result"
              aria-labelledby="result-heading"
            >
              <h2 id="result-heading" tabindex="-1">
                Your checklist
                <span class="heading-scope">{{ scopeLabel }}</span>
              </h2>
              <div aria-live="polite" aria-atomic="true">
                <p class="tool-status" role="status">{{ status }}</p>
              </div>
              @if (condition) {
                <p class="hint">Listing type: {{ condition }}.</p>
              }
              @if (cosmeticState !== 'Not checked') {
                <p class="hint">
                  Cosmetic condition (your note): {{ cosmeticState }}.
                </p>
              }
              <h3>Missing pieces you want</h3>
              @if (result.missing.length) {
                <ul>
                  @for (line of result.missing; track line) {
                    <li>{{ line }}</li>
                  }
                </ul>
              } @else {
                <p class="hint">None marked as not included.</p>
              }
              <h3>Ask the seller</h3>
              <ul>
                @for (line of result.ask; track line) {
                  <li>{{ line }}</li>
                }
                <li>
                  Ask for a clear photo of the model and rating label, with the
                  serial number covered.
                </li>
                <li>
                  Ask the seller to confirm the unit switches on and the
                  controls respond.
                </li>
              </ul>
              <h3>Other pieces to check</h3>
              @if (result.other.length) {
                <ul>
                  @for (line of result.other; track line) {
                    <li>{{ line }}</li>
                  }
                </ul>
              } @else {
                <p class="hint">Nothing else to check.</p>
              }
              <p class="hint">
                “Shown in photos” is your own observation. Condition, part fit,
                completeness and whether the unit works are separate checks.
              </p>
              <h3 id="questions-heading">Questions to send</h3>
              <textarea
                class="questions-text"
                readonly
                rows="6"
                aria-labelledby="questions-heading"
                [value]="questions"
              ></textarea>
              <div class="button-row no-print">
                <button class="tool-button" type="button" (click)="copy()">
                  Copy questions
                </button>
                <button
                  class="tool-button secondary"
                  type="button"
                  (click)="print()"
                >
                  Print checklist
                </button>
              </div>
              <p class="hint" aria-live="polite">{{ copyMessage }}</p>
            </section>
          } @else {
            <div class="tool-card">
              <p class="tool-status" role="status">
                Choose UK or US and the reference kit to start.
              </p>
              <button
                class="tool-button secondary"
                type="button"
                (click)="loadDemo()"
              >
                Try the demo listing
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class UsedMultiStylerChecklistWidgetComponent {
  private readonly analytics = inject(AnalyticsService);
  readonly slugs = ArticleSlug;
  readonly markets: readonly ChecklistMarket[] = ['UK', 'US'];
  readonly roles = checklistRoles;
  readonly conditions = listingConditions;
  readonly cosmetic = cosmeticOptions;
  readonly observationOptions = observations;
  readonly unknownKit = UNKNOWN_KIT;
  market: ChecklistMarket = 'UK';
  kitId = '';
  condition = '';
  cosmeticState: string = 'Not checked';
  needed: ChecklistRole[] = [];
  copyMessage = '';
  /** Observations per reference kit for this page session. */
  private readonly observedByKit: Record<string, Record<string, Observation>> =
    {};
  private completedTracked = false;

  constructor() {
    watchPresetHash(
      'kit-',
      (id) => {
        const kit = referenceById(id);
        if (!kit) return false;
        this.market = kit.market;
        this.kitId = kit.id;
        this.analytics.track('used_checklist_preset', { kit: kit.id });
        setTimeout(() =>
          document.getElementById('reference-heading')?.scrollIntoView(),
        );
        return true;
      },
      () =>
        (this.copyMessage =
          'That link’s kit isn’t available. Choose the reference kit to start.'),
    );
  }

  get marketKits(): readonly ReferenceKit[] {
    return referencesForMarket(this.market);
  }

  get kit(): ReferenceKit | undefined {
    return this.kitId && this.kitId !== UNKNOWN_KIT
      ? referenceById(this.kitId)
      : undefined;
  }

  get items(): readonly ChecklistItem[] {
    return this.kit?.items ?? genericItems;
  }

  get scopeLabel(): string {
    return this.kit
      ? `${this.kit.name}, ${this.kit.variant} (${this.kit.market})`
      : `Reader checks only (${this.market})`;
  }

  get result(): ChecklistResult {
    return buildChecklist(
      this.kit,
      this.needed,
      this.observedByKit[this.kitId] ?? {},
    );
  }

  get questions(): string {
    return questionsText(this.result);
  }

  get status(): string {
    const r = this.result;
    if (this.needed.length === 0)
      return 'Pick the attachments you need to see which gaps matter.';
    return `${r.missing.length} missing ${r.missing.length === 1 ? 'piece' : 'pieces'} you want, ${r.ask.length} ${r.ask.length === 1 ? 'thing' : 'things'} to ask the seller.`;
  }

  roleLabel(role: ChecklistRole): string {
    return roleLabels[role];
  }

  observationLabel(option: Observation): string {
    return observationLabels[option];
  }

  isWanted(row: ChecklistItem): boolean {
    return row.roles.some((role) => this.needed.includes(role));
  }

  observed(row: ChecklistItem): Observation {
    return this.observedByKit[this.kitId]?.[row.id] ?? 'cant-tell';
  }

  setMarket(market: ChecklistMarket): void {
    this.market = market;
    if (this.kit && this.kit.market !== market) this.kitId = '';
  }

  setKit(event: Event): void {
    this.kitId = (event.target as HTMLSelectElement).value;
  }

  setCondition(event: Event): void {
    this.condition = (event.target as HTMLSelectElement).value;
  }

  setCosmetic(event: Event): void {
    this.cosmeticState = (event.target as HTMLSelectElement).value;
  }

  toggleRole(role: ChecklistRole): void {
    this.needed = this.needed.includes(role)
      ? this.needed.filter((r) => r !== role)
      : this.roles.filter((r) => r === role || this.needed.includes(r));
    this.trackCompleted();
  }

  observe(row: ChecklistItem, option: Observation): void {
    (this.observedByKit[this.kitId] ??= {})[row.id] = option;
    this.trackCompleted();
  }

  loadDemo(): void {
    const kit = referenceById(demoObservations.kitId) as ReferenceKit;
    this.market = kit.market;
    this.kitId = kit.id;
    this.needed = [...demoObservations.needed];
    this.observedByKit[kit.id] = { ...demoObservations.observed };
    setTimeout(() => document.getElementById('result-heading')?.focus());
  }

  async copy(): Promise<void> {
    this.analytics.track('used_checklist_copy');
    try {
      await navigator.clipboard.writeText(this.questions);
      this.copyMessage = 'Questions copied.';
    } catch {
      this.copyMessage =
        'Copying isn’t available here. Select the questions above and copy them.';
      document.querySelector<HTMLTextAreaElement>('.questions-text')?.select();
    }
  }

  print(): void {
    this.analytics.track('used_checklist_print');
    window.print();
  }

  private trackCompleted(): void {
    if (this.completedTracked || !this.kitId || this.needed.length === 0)
      return;
    this.completedTracked = true;
    this.analytics.track('used_checklist_completed', {
      reference: this.kit ? 'known' : 'unknown',
    });
  }
}
