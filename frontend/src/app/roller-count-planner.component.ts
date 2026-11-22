import { Component, inject } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';
import {
  checkRollerPlan,
  emptyRollerGroup,
  ROLLER_GROUP_LIMIT,
  rollerPlannerExample,
  type RollerCountField,
  type RollerGroupInput,
  type RollerGroupOutcome,
} from './roller-count-planner';

const countFields: readonly {
  readonly key: RollerCountField;
  readonly label: string;
}[] = [
  { key: 'front', label: 'Front sections' },
  { key: 'crown', label: 'Crown sections' },
  { key: 'sides', label: 'Side sections' },
  { key: 'available', label: 'Rollers available' },
];

let nextId = 0;

@Component({
  selector: 'app-roller-count-planner',
  styleUrl: 'roller-count-planner.component.css',
  template: `
    <section
      class="finder-card roller-count-planner"
      id="count-rollers-for-your-set"
      aria-labelledby="roller-planner-heading"
    >
      <p class="eyebrow">Unheated roller planner</p>
      <h2 id="roller-planner-heading">Count rollers for your set</h2>
      <p>
        Enter one group per roller size, or per other inventory group you keep
        separate. Each group is checked on its own: spare pieces in one size do
        not cover a shortage in another unless you deliberately change the plan.
        Leave a box blank for zero. This counts simultaneous placements only; it
        does not choose a diameter, a closure or a curl result.
      </p>
      <div class="planner-groups">
        @for (group of groups; track $index; let i = $index) {
          <fieldset>
            <legend>Group {{ i + 1 }}</legend>
            <label [for]="controlId(i, 'label')"
              >Size or inventory label
              <input
                [id]="controlId(i, 'label')"
                type="text"
                maxlength="40"
                autocomplete="off"
                [value]="group.label"
                [attr.aria-describedby]="controlId(i, 'label') + '-hint'"
                (input)="update(i, 'label', $event)"
              />
              <span class="planner-hint" [id]="controlId(i, 'label') + '-hint'"
                >For example 35 mm. Copy the pack's own size label.</span
              >
            </label>
            @for (field of countFields; track field.key) {
              <label [for]="controlId(i, field.key)"
                >{{ field.label }}
                <input
                  [id]="controlId(i, field.key)"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  autocomplete="off"
                  [value]="group[field.key]"
                  [attr.aria-invalid]="errorFor(i, field.key) ? 'true' : null"
                  [attr.aria-describedby]="
                    errorFor(i, field.key)
                      ? controlId(i, field.key) + '-error'
                      : null
                  "
                  (input)="update(i, field.key, $event)"
                />
                @if (errorFor(i, field.key); as error) {
                  <span
                    class="planner-error"
                    [id]="controlId(i, field.key) + '-error'"
                    >{{ error }}</span
                  >
                }
              </label>
            }
            @if (groups.length > 1) {
              <button
                type="button"
                class="planner-remove"
                (click)="removeGroup(i)"
              >
                Remove group {{ i + 1 }}
              </button>
            }
          </fieldset>
        }
      </div>
      <div class="planner-actions">
        <button
          type="button"
          (click)="addGroup()"
          [disabled]="groups.length >= groupLimit"
        >
          Add another size
        </button>
        <button type="button" (click)="reset()">Reset to the example</button>
      </div>
      <div class="planner-result" aria-live="polite">
        <h3>Count check</h3>
        <div
          class="table-scroll"
          tabindex="0"
          role="region"
          aria-label="Roller count check by group"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Group</th>
                <th scope="col">Sections planned</th>
                <th scope="col">Rollers available</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              @for (outcome of outcomes; track $index; let i = $index) {
                <tr>
                  @if (outcome.ok) {
                    <th scope="row">{{ outcome.result.label }}</th>
                    <td>{{ outcome.result.needed }}</td>
                    <td>{{ outcome.result.available }}</td>
                    <td>
                      <strong>{{ outcome.result.summary }}</strong>
                      @if (
                        outcome.result.status !== 'empty' &&
                        outcome.result.spare > 0
                      ) {
                        ({{ outcome.result.spare }} spare in this group only)
                      }
                    </td>
                  } @else {
                    <th scope="row">Group {{ i + 1 }}</th>
                    <td colspan="3" class="planner-error">
                      Correct the highlighted entries in group {{ i + 1 }}.
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p>
          A shortage means some planned sections need another piece of that
          size, fewer sections in that size, or a deliberate change of plan.
          Check working width and closure reach separately before buying.
        </p>
      </div>
    </section>
  `,
})
export class RollerCountPlannerComponent {
  private readonly analytics = inject(AnalyticsService);
  private tracked = false;
  private readonly instanceId = nextId++;
  readonly countFields = countFields;
  readonly groupLimit = ROLLER_GROUP_LIMIT;
  groups: RollerGroupInput[] = rollerPlannerExample.map((group) => ({
    ...group,
  }));
  outcomes: readonly RollerGroupOutcome[] = checkRollerPlan(this.groups);

  controlId(index: number, key: string): string {
    return `roller-plan-${this.instanceId}-${index}-${key}`;
  }

  errorFor(index: number, field: RollerCountField): string | undefined {
    const outcome = this.outcomes[index];
    return outcome && !outcome.ok ? outcome.errors[field] : undefined;
  }

  update(index: number, key: keyof RollerGroupInput, event: Event): void {
    const value = (event.target as HTMLInputElement).value.slice(0, 40);
    this.groups = this.groups.map((group, i) =>
      i === index ? { ...group, [key]: value } : group,
    );
    this.refresh();
  }

  addGroup(): void {
    if (this.groups.length >= ROLLER_GROUP_LIMIT) return;
    this.groups = [...this.groups, emptyRollerGroup()];
    this.refresh();
  }

  removeGroup(index: number): void {
    if (this.groups.length <= 1) return;
    this.groups = this.groups.filter((_, i) => i !== index);
    this.refresh();
  }

  reset(): void {
    this.groups = rollerPlannerExample.map((group) => ({ ...group }));
    this.outcomes = checkRollerPlan(this.groups);
  }

  private refresh(): void {
    this.outcomes = checkRollerPlan(this.groups);
    if (!this.tracked) {
      this.tracked = true;
      this.analytics.track('roller_count_planner_used');
    }
  }
}
