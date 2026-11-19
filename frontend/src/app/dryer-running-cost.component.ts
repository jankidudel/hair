import { Component, inject } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';
import {
  calculateDryerRunningCost,
  formatCost,
  formatEnergy,
  parseCostInput,
  type DryerRunningCostField,
  type DryerRunningCostOutcome,
  type TariffUnit,
} from './dryer-running-cost';

interface CurrencyOption {
  readonly id: string;
  readonly label: string;
  readonly symbol: string;
  readonly minorLabel: string;
}

const currencies: readonly CurrencyOption[] = [
  { id: 'gbp', label: 'Pounds (£)', symbol: '£', minorLabel: 'pence' },
  { id: 'usd', label: 'Dollars ($)', symbol: '$', minorLabel: 'cents' },
  { id: 'eur', label: 'Euros (€)', symbol: '€', minorLabel: 'cents' },
  { id: 'none', label: 'No symbol', symbol: '', minorLabel: 'hundredths' },
];

@Component({
  selector: 'app-dryer-running-cost',
  styleUrl: 'dryer-running-cost.component.css',
  template: `
    <section
      class="finder-card dryer-running-cost"
      aria-labelledby="running-cost-heading"
    >
      <p class="eyebrow">Electricity-use calculator</p>
      <h2 id="running-cost-heading">Estimate your dryer's running cost</h2>
      <p>
        Enter the power, how long the dryer runs and your own unit rate. The
        result assumes that power is drawn for the whole time entered. The
        worked example below the calculator gives the same arithmetic without
        it.
      </p>
      <div class="cost-fields">
        <label for="cost-watts"
          >Power (watts)
          <input
            id="cost-watts"
            inputmode="decimal"
            autocomplete="off"
            [value]="values.watts"
            [attr.aria-invalid]="errorFor('watts') ? 'true' : null"
            [attr.aria-describedby]="
              errorFor('watts') ? 'cost-watts-error' : 'cost-watts-hint'
            "
            (input)="update('watts', $event)"
          />
          <span class="cost-hint" id="cost-watts-hint"
            >From the rating label, or a measured average if you have one.</span
          >
          @if (errorFor('watts'); as error) {
            <span class="cost-error" id="cost-watts-error">{{ error }}</span>
          }
        </label>
        <label for="cost-minutes"
          >Minutes per use
          <input
            id="cost-minutes"
            inputmode="decimal"
            autocomplete="off"
            [value]="values.minutesPerUse"
            [attr.aria-invalid]="errorFor('minutesPerUse') ? 'true' : null"
            [attr.aria-describedby]="
              errorFor('minutesPerUse') ? 'cost-minutes-error' : null
            "
            (input)="update('minutesPerUse', $event)"
          />
          @if (errorFor('minutesPerUse'); as error) {
            <span class="cost-error" id="cost-minutes-error">{{ error }}</span>
          }
        </label>
        <label for="cost-uses"
          >Uses per week
          <input
            id="cost-uses"
            inputmode="decimal"
            autocomplete="off"
            [value]="values.usesPerWeek"
            [attr.aria-invalid]="errorFor('usesPerWeek') ? 'true' : null"
            [attr.aria-describedby]="
              errorFor('usesPerWeek') ? 'cost-uses-error' : null
            "
            (input)="update('usesPerWeek', $event)"
          />
          @if (errorFor('usesPerWeek'); as error) {
            <span class="cost-error" id="cost-uses-error">{{ error }}</span>
          }
        </label>
        <label for="cost-currency"
          >Currency
          <select id="cost-currency" (change)="setCurrency($event)">
            @for (option of currencies; track option.id) {
              <option
                [value]="option.id"
                [selected]="option.id === currency.id"
              >
                {{ option.label }}
              </option>
            }
          </select>
        </label>
        <label for="cost-price"
          >Price per kWh
          <input
            id="cost-price"
            inputmode="decimal"
            autocomplete="off"
            [value]="values.pricePerKwh"
            [attr.aria-invalid]="errorFor('pricePerKwh') ? 'true' : null"
            [attr.aria-describedby]="
              errorFor('pricePerKwh') ? 'cost-price-error' : 'cost-price-hint'
            "
            (input)="update('pricePerKwh', $event)"
          />
          <span class="cost-hint" id="cost-price-hint"
            >Use the unit rate on your own bill or tariff.</span
          >
          @if (errorFor('pricePerKwh'); as error) {
            <span class="cost-error" id="cost-price-error">{{ error }}</span>
          }
        </label>
        <fieldset>
          <legend>Price is entered in</legend>
          <label
            ><input
              type="radio"
              name="tariff-unit"
              value="minor"
              [checked]="tariffUnit === 'minor'"
              (change)="setTariffUnit('minor')"
            />
            {{ currency.minorLabel }} per kWh</label
          >
          <label
            ><input
              type="radio"
              name="tariff-unit"
              value="major"
              [checked]="tariffUnit === 'major'"
              (change)="setTariffUnit('major')"
            />
            whole {{ currency.id === 'none' ? 'units' : currency.label }} per
            kWh</label
          >
        </fieldset>
      </div>
      <div class="cost-result" aria-live="polite">
        @if (outcome.ok) {
          <h3>Your estimate</h3>
          <dl>
            <div>
              <dt>Energy per use</dt>
              <dd>{{ energy(outcome.result.kwhPerUse) }}</dd>
            </div>
            <div>
              <dt>Cost per use</dt>
              <dd>{{ cost(outcome.result.costPerUse) }}</dd>
            </div>
            <div>
              <dt>Cost per week</dt>
              <dd>{{ cost(outcome.result.weeklyCost) }}</dd>
            </div>
            <div>
              <dt>52-week estimate</dt>
              <dd>{{ cost(outcome.result.annualisedCost) }}</dd>
            </div>
          </dl>
          @if (outcome.result.kwhPerUse === 0) {
            <p>
              Enter power and minutes above zero for a usage estimate. A zero
              price or zero uses gives a zero cost.
            </p>
          } @else {
            <p>
              This uses {{ energy(outcome.result.kwhPerWeek) }} a week. It is
              arithmetic from your entries, not a measured bill: a dryer can
              draw less than its rating on lower heat or speed settings.
            </p>
          }
        } @else {
          <p class="cost-error" role="alert">
            Correct the highlighted entries to see an estimate.
          </p>
        }
      </div>
    </section>
  `,
})
export class DryerRunningCostComponent {
  private readonly analytics = inject(AnalyticsService);
  private tracked = false;
  readonly currencies = currencies;
  currency: CurrencyOption = currencies[0];
  tariffUnit: TariffUnit = 'minor';
  values: Record<DryerRunningCostField, string> = {
    watts: '2000',
    minutesPerUse: '10',
    usesPerWeek: '5',
    pricePerKwh: '25',
  };
  outcome: DryerRunningCostOutcome = this.calculate();

  errorFor(field: DryerRunningCostField): string | undefined {
    return this.outcome.ok ? undefined : this.outcome.errors[field];
  }

  energy(kwh: number): string {
    return formatEnergy(kwh);
  }

  cost(amount: number): string {
    const formatted = formatCost(amount, this.currency.symbol);
    if (amount <= 0 || amount >= 1 || this.currency.id === 'none')
      return formatted;
    const minor = (amount * 100).toLocaleString('en-GB', {
      maximumFractionDigits: 1,
    });
    return `${formatted} (${minor} ${this.currency.minorLabel})`;
  }

  update(field: DryerRunningCostField, event: Event): void {
    this.values = {
      ...this.values,
      [field]: (event.target as HTMLInputElement).value,
    };
    this.refresh();
  }

  setCurrency(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    this.currency =
      currencies.find((option) => option.id === id) ?? currencies[0];
  }

  setTariffUnit(unit: TariffUnit): void {
    this.tariffUnit = unit;
    this.refresh();
  }

  private refresh(): void {
    this.outcome = this.calculate();
    if (this.outcome.ok && !this.tracked) {
      this.tracked = true;
      this.analytics.track('hair_dryer_running_cost_used');
    }
  }

  private calculate(): DryerRunningCostOutcome {
    return calculateDryerRunningCost({
      watts: parseCostInput(this.values.watts),
      minutesPerUse: parseCostInput(this.values.minutesPerUse),
      usesPerWeek: parseCostInput(this.values.usesPerWeek),
      pricePerKwh: parseCostInput(this.values.pricePerKwh),
      tariffUnit: this.tariffUnit,
    });
  }
}
