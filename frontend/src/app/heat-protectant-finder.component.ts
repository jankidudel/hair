import { Component, afterNextRender, signal } from '@angular/core';
import { ArticleSlug } from './article-slug';
import {
  heatProtectantDefaults,
  recommendHeatProtectant,
  type HeatProtectantAnswers,
  type HeatProtectantResult,
} from './heat-protectant-recommendation';

let nextId = 0;
@Component({
  selector: 'app-heat-protectant-finder',
  styleUrl: 'heat-protectant-finder.component.css',
  template: `
    <section
      class="finder-card heat-protectant-finder"
      [attr.aria-labelledby]="id + '-heading'"
    >
      <p class="eyebrow">Direction checks</p>
      <h2 [id]="id + '-heading'">Heat Protectant Finder</h2>
      <p>
        Record the styling stage and the starting states named on your product.
        This helper returns direction checks, not a product recommendation or
        permission to use an appliance.
      </p>
      @if (ready()) {
        <form (submit)="submit($event)">
          <div class="finder-options">
            <div>
              <label [for]="id + '-sequence'">Styling sequence</label
              ><select
                [id]="id + '-sequence'"
                [value]="answers.stylingStep"
                (change)="change('stylingStep', $any($event.target).value)"
              >
                <option value="drying">Blow-drying</option>
                <option value="contact">
                  Dry-hair straightening, curling or heated-brush styling
                </option>
                <option value="both">
                  Blow-drying followed by a dry-hair styling tool
                </option>
              </select>
            </div>
            <div>
              <label [for]="id + '-application'"
                >Planned application state</label
              ><select
                [id]="id + '-application'"
                [value]="answers.application"
                (change)="change('application', $any($event.target).value)"
              >
                <option value="unselected">Not chosen</option>
                <option value="damp">Damp or towel-dried hair</option>
                <option value="dry">Dry hair</option>
              </select>
            </div>
            <div>
              <label [for]="id + '-directions'"
                >Starting states recorded from the product directions</label
              ><select
                [id]="id + '-directions'"
                [attr.aria-describedby]="id + '-direction-help'"
                [value]="answers.directions"
                (change)="change('directions', $any($event.target).value)"
              >
                <option value="unclear">Not checked or unclear</option>
                <option value="damp">Damp or towel-dried only</option>
                <option value="dry">Dry only</option>
                <option value="both">Both are explicitly described</option>
              </select>
              <p [id]="id + '-direction-help'">
                These are your notes from the label. The helper has not verified
                the formula, quantity, placement or appliance compatibility.
              </p>
            </div>
            <div>
              <label [for]="id + '-finish'">Preferred application feel</label
              ><select
                [id]="id + '-finish'"
                [value]="answers.finish"
                (change)="change('finish', $any($event.target).value)"
              >
                <option value="none">No preference</option>
                <option value="light">
                  I want to compare a lighter-feeling application
                </option>
                <option value="conditioned">
                  I want to compare a more conditioned feel
                </option>
              </select>
            </div>
          </div>
          <div class="finder-actions">
            <button class="button finder-submit" type="submit">
              Show direction checks</button
            ><button class="button" type="button" (click)="reset()">
              Clear choices
            </button>
          </div>
        </form>
      } @else {
        <p>
          The interactive direction checks need JavaScript. Use the comparison
          tables and application guides below to review the exact product and
          appliance instructions.
        </p>
      }
      <p role="status" aria-live="polite">{{ status }}</p>
      @if (result) {
        <section class="dryer-finder-result" aria-label="Your direction checks">
          <h3>{{ result.heading }}</h3>
          <p>{{ result.explanation }}</p>
          <p>{{ result.sequence }}</p>
          @if (result.preference) {
            <p>{{ result.preference }}</p>
          }
          <p>{{ result.reminder }}</p>
        </section>
      }
      <ul>
        <li>
          <a [href]="'/guides/' + articleSlug.HowToApplyHeatProtectant"
            >How to apply heat protectant</a
          >
        </li>
        <li>
          <a [href]="'/guides/' + articleSlug.BestHeatProtectants"
            >How to choose a heat protectant for your styling routine</a
          >
        </li>
      </ul>
    </section>
  `,
})
export class HeatProtectantFinderComponent {
  readonly id = `heat-direction-${nextId++}`;
  readonly articleSlug = ArticleSlug;
  readonly ready = signal(false);
  answers: HeatProtectantAnswers = { ...heatProtectantDefaults };
  result?: HeatProtectantResult;
  status = '';
  constructor() {
    afterNextRender(() => this.ready.set(true));
  }
  change<K extends keyof HeatProtectantAnswers>(
    key: K,
    value: HeatProtectantAnswers[K],
  ): void {
    const hadResult = !!this.result;
    this.answers = { ...this.answers, [key]: value };
    this.result = undefined;
    if (hadResult)
      this.status = 'Choices changed. Show direction checks again.';
  }
  submit(event: Event): void {
    event.preventDefault();
    this.result = recommendHeatProtectant(this.answers);
    this.status = 'Direction checks ready.';
  }
  reset(): void {
    this.answers = { ...heatProtectantDefaults };
    this.result = undefined;
    this.status = '';
  }
}
