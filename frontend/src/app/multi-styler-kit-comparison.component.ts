import { Component, inject } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';
import {
  kitById,
  kitRoleLabels,
  kitRoles,
  kitStatusLabels,
  kitSummaryLabels,
  kitsForMarket,
  reconcileKitSelection,
  summariseKit,
  type KitMarket,
  type KitRole,
  type MultiStylerKit,
} from './multi-styler-kits';

@Component({
  selector: 'app-multi-styler-kit-comparison',
  styleUrl: 'multi-styler-kit-comparison.component.css',
  template: `
    <div class="kit-widget">
      <form class="kit-controls" (submit)="$event.preventDefault()">
        <fieldset>
          <legend>Market</legend>
          <div class="kit-options">
            @for (option of markets; track option) {
              <label>
                <input
                  type="radio"
                  name="kit-market"
                  [value]="option"
                  [checked]="market === option"
                  (change)="setMarket(option)"
                />
                {{ option }}
              </label>
            }
          </div>
        </fieldset>
        <div class="kit-selects">
          @for (slot of [0, 1]; track slot) {
            <label [for]="'kit-select-' + slot"
              >{{ slot === 0 ? 'First kit' : 'Second kit' }}
              <select
                [id]="'kit-select-' + slot"
                [disabled]="!market"
                (change)="setKit(slot, $event)"
              >
                <option value="" [selected]="!selection[slot]">
                  {{ market ? 'Choose a kit' : 'Choose a market first' }}
                </option>
                @for (kit of marketKits; track kit.id) {
                  <option
                    [value]="kit.id"
                    [selected]="selection[slot] === kit.id"
                    [disabled]="selection[slot === 0 ? 1 : 0] === kit.id"
                  >
                    {{ kit.name }}
                  </option>
                }
              </select>
            </label>
          }
        </div>
        <fieldset>
          <legend>Attachments you need (optional)</legend>
          <div class="kit-options kit-roles">
            @for (role of roles; track role) {
              <label>
                <input
                  type="checkbox"
                  [checked]="required.includes(role)"
                  (change)="toggleRole(role)"
                />
                {{ roleLabel(role) }}
              </label>
            }
          </div>
        </fieldset>
      </form>

      <p class="kit-status" role="status" aria-live="polite">
        {{ status }}
      </p>

      @if (selectedKits.length === 2) {
        <div
          class="kit-table-scroll"
          tabindex="0"
          role="region"
          aria-label="Kit comparison table"
        >
          <table class="kit-table">
            <caption class="visually-hidden">
              What each selected box includes, by attachment role
            </caption>
            <thead>
              <tr>
                <th scope="col">Role</th>
                @for (kit of selectedKits; track kit.id) {
                  <th scope="col">{{ kit.name }}</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (role of shownRoles; track role) {
                <tr [class.required]="required.includes(role)">
                  <th scope="row">
                    {{ roleLabel(role) }}
                    @if (required.includes(role)) {
                      <span class="needed">(needed)</span>
                    }
                  </th>
                  @for (kit of selectedKits; track kit.id) {
                    <td [attr.data-status]="kit.roles[role].status">
                      <strong>{{ statusLabel(kit.roles[role].status) }}</strong>
                      @if (kit.roles[role].detail) {
                        <span class="detail">{{ kit.roles[role].detail }}</span>
                      }
                      @for (
                        accessory of optionalFor(kit, role);
                        track accessory.url
                      ) {
                        <span class="optional"
                          >Optional accessory, sold separately:
                          <a
                            [href]="accessory.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            (click)="trackOutbound()"
                            >{{ accessory.name }}</a
                          >. {{ accessory.scope }}</span
                        >
                      }
                    </td>
                  }
                </tr>
              }
              @if (required.length > 0) {
                <tr class="summary">
                  <th scope="row">Your roles</th>
                  @for (kit of selectedKits; track kit.id) {
                    <td>{{ summary(kit) }}</td>
                  }
                </tr>
              }
              <tr>
                <th scope="row">Source</th>
                @for (kit of selectedKits; track kit.id) {
                  <td>
                    <a
                      [href]="kit.sourceUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      (click)="trackOutbound()"
                      >{{ kit.sourceLabel }}</a
                    >
                    <span class="detail">Checked {{ kit.checkedDate }}</span>
                    @if (kit.note) {
                      <span class="detail">{{ kit.note }}</span>
                    }
                  </td>
                }
              </tr>
            </tbody>
          </table>
        </div>
        <p class="kit-note">
          Box lists show what each exact listing includes. They do not show
          whether a part from one kit fits another body. No winner is declared.
        </p>
      }
    </div>
  `,
})
export class MultiStylerKitComparisonComponent {
  private readonly analytics = inject(AnalyticsService);
  readonly markets: readonly KitMarket[] = ['UK', 'US'];
  readonly roles = kitRoles;
  market?: KitMarket;
  selection: [string | undefined, string | undefined] = [undefined, undefined];
  required: KitRole[] = [];
  private startedTracked = false;
  private resultTracked = false;

  get marketKits(): readonly MultiStylerKit[] {
    return this.market ? kitsForMarket(this.market) : [];
  }

  get selectedKits(): readonly MultiStylerKit[] {
    return this.selection
      .map((id) => (id ? kitById(id) : undefined))
      .filter((kit): kit is MultiStylerKit => kit !== undefined);
  }

  /** Needed roles first, then the rest, so the decision is read first. */
  get shownRoles(): readonly KitRole[] {
    return [
      ...this.required,
      ...this.roles.filter((role) => !this.required.includes(role)),
    ];
  }

  get status(): string {
    if (!this.market) return 'Choose UK or US to see kits sold in that market.';
    if (this.selectedKits.length < 2)
      return `Choose two different ${this.market} kits to compare.`;
    if (this.required.length === 0)
      return 'Comparing every role. Mark the attachments you need to get a summary.';
    return this.selectedKits
      .map((kit) => `${kit.name}: ${this.summary(kit)}.`)
      .join(' ');
  }

  roleLabel(role: KitRole): string {
    return kitRoleLabels[role];
  }

  statusLabel(status: keyof typeof kitStatusLabels): string {
    return kitStatusLabels[status];
  }

  optionalFor(kit: MultiStylerKit, role: KitRole) {
    return (kit.optional ?? []).filter((accessory) => accessory.role === role);
  }

  summary(kit: MultiStylerKit): string {
    const result = summariseKit(kit, this.required);
    return result ? kitSummaryLabels[result] : '';
  }

  setMarket(market: KitMarket): void {
    this.market = market;
    // Clear selections from the other market; never substitute a variant.
    this.selection = reconcileKitSelection(market, this.selection);
    this.track();
  }

  setKit(slot: number, event: Event): void {
    const value = (event.target as HTMLSelectElement).value || undefined;
    const next: [string | undefined, string | undefined] = [...this.selection];
    next[slot] = value;
    if (!this.market) return;
    // A duplicate in the other slot is rejected, not silently swapped.
    if (value && next[slot === 0 ? 1 : 0] === value) next[slot] = undefined;
    this.selection = reconcileKitSelection(this.market, next);
    this.track();
  }

  toggleRole(role: KitRole): void {
    this.required = this.required.includes(role)
      ? this.required.filter((item) => item !== role)
      : this.roles.filter(
          (item) => item === role || this.required.includes(item),
        );
    this.track();
  }

  trackOutbound(): void {
    this.analytics.track('kit_comparison_outbound_click');
  }

  private track(): void {
    if (!this.startedTracked && this.selection.some(Boolean)) {
      this.analytics.track('kit_comparison_started');
      this.startedTracked = true;
    }
    if (
      !this.resultTracked &&
      this.selectedKits.length === 2 &&
      this.required.length > 0
    ) {
      this.analytics.track('kit_comparison_result', {
        market: this.market ?? '',
        roles: this.required.length,
      });
      this.resultTracked = true;
    }
  }
}
