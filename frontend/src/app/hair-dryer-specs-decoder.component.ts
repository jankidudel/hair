import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import {
  decodeHairDryerSpecs,
  type DryerPriority,
  type DryerUseLocation,
  type DryerVoltage,
  type DryerWattage,
  type HairDryerSpecsAnswers,
  type HairDryerSpecsResult,
} from './hair-dryer-specs-recommendation';

type AnswerKey = keyof HairDryerSpecsAnswers;

@Component({
  selector: 'app-hair-dryer-specs-decoder',
  imports: [RouterLink],
  styleUrl: 'hair-dryer-specs-decoder.component.css',
  template: `
    <section
      class="finder-card hair-dryer-specs-decoder"
      aria-labelledby="specs-decoder-heading"
    >
      <p class="eyebrow">Label helper</p>
      <h2 id="specs-decoder-heading">Hair Dryer Specs Decoder</h2>
      <p>
        Choose the details shown on the label for a practical next step. The
        guide below remains complete if you prefer not to use this tool.
      </p>
      <div class="specs-options">
        <fieldset
          [attr.aria-invalid]="showErrors && !answers.location ? 'true' : null"
        >
          <legend>Where will you mainly use it?</legend>
          <label
            ><input
              type="radio"
              name="location"
              value="home"
              [checked]="answers.location === 'home'"
              (change)="setLocation('home')"
            />
            At home</label
          >
          <label
            ><input
              type="radio"
              name="location"
              value="occasional-travel"
              [checked]="answers.location === 'occasional-travel'"
              (change)="setLocation('occasional-travel')"
            />
            Travelling occasionally</label
          >
          <label
            ><input
              type="radio"
              name="location"
              value="frequent-travel"
              [checked]="answers.location === 'frequent-travel'"
              (change)="setLocation('frequent-travel')"
            />
            Travelling often</label
          >
        </fieldset>
        <fieldset
          [attr.aria-invalid]="showErrors && !answers.wattage ? 'true' : null"
        >
          <legend>What wattage is shown?</legend>
          <label
            ><input
              type="radio"
              name="wattage"
              value="under-1400"
              [checked]="answers.wattage === 'under-1400'"
              (change)="setWattage('under-1400')"
            />
            Under 1,400 W</label
          >
          <label
            ><input
              type="radio"
              name="wattage"
              value="1400-1800"
              [checked]="answers.wattage === '1400-1800'"
              (change)="setWattage('1400-1800')"
            />
            1,400–1,800 W</label
          >
          <label
            ><input
              type="radio"
              name="wattage"
              value="over-1800"
              [checked]="answers.wattage === 'over-1800'"
              (change)="setWattage('over-1800')"
            />
            Over 1,800 W</label
          >
          <label
            ><input
              type="radio"
              name="wattage"
              value="unknown"
              [checked]="answers.wattage === 'unknown'"
              (change)="setWattage('unknown')"
            />
            I cannot find it</label
          >
        </fieldset>
        <fieldset
          [attr.aria-invalid]="showErrors && !answers.voltage ? 'true' : null"
        >
          <legend>What voltage marking does it have?</legend>
          <label
            ><input
              type="radio"
              name="voltage"
              value="single"
              [checked]="answers.voltage === 'single'"
              (change)="setVoltage('single')"
            />
            Single voltage</label
          >
          <label
            ><input
              type="radio"
              name="voltage"
              value="dual"
              [checked]="answers.voltage === 'dual'"
              (change)="setVoltage('dual')"
            />
            Dual/multi-voltage</label
          >
          <label
            ><input
              type="radio"
              name="voltage"
              value="unknown"
              [checked]="answers.voltage === 'unknown'"
              (change)="setVoltage('unknown')"
            />
            I am not sure</label
          >
        </fieldset>
        <fieldset
          [attr.aria-invalid]="showErrors && !answers.priority ? 'true' : null"
        >
          <legend>What matters most?</legend>
          <label
            ><input
              type="radio"
              name="priority"
              value="light-compact"
              [checked]="answers.priority === 'light-compact'"
              (change)="setPriority('light-compact')"
            />
            Light and compact</label
          >
          <label
            ><input
              type="radio"
              name="priority"
              value="home-drying"
              [checked]="answers.priority === 'home-drying'"
              (change)="setPriority('home-drying')"
            />
            Everyday home drying</label
          >
          <label
            ><input
              type="radio"
              name="priority"
              value="faster-drying"
              [checked]="answers.priority === 'faster-drying'"
              (change)="setPriority('faster-drying')"
            />
            Faster-feeling drying</label
          >
          <label
            ><input
              type="radio"
              name="priority"
              value="travel-flexibility"
              [checked]="answers.priority === 'travel-flexibility'"
              (change)="setPriority('travel-flexibility')"
            />
            Travel flexibility</label
          >
        </fieldset>
      </div>
      @if (showErrors && !isComplete) {
        <p class="specs-error" role="alert">
          Choose one option in each group to show your result.
        </p>
      }
      <div class="specs-actions">
        <button
          class="button finder-submit"
          type="button"
          (click)="showResult()"
        >
          Show result
        </button>
        <button class="button button-secondary" type="button" (click)="reset()">
          Reset
        </button>
      </div>
      @if (result) {
        <section
          class="dryer-finder-result"
          aria-live="polite"
          aria-label="Your hair dryer specifications result"
        >
          <h3>{{ result.heading }}</h3>
          @for (paragraph of result.paragraphs; track paragraph) {
            <p>{{ paragraph }}</p>
          }
          <nav class="dryer-finder-links" aria-label="Related hair dryer pages">
            @for (link of result.links; track link.path) {
              <a [routerLink]="link.path"
                >{{ link.label }} <span aria-hidden="true">→</span></a
              >
            }
          </nav>
        </section>
      }
    </section>
  `,
})
export class HairDryerSpecsDecoderComponent {
  private readonly analytics = inject(AnalyticsService);
  answers: Partial<HairDryerSpecsAnswers> = {};
  result?: HairDryerSpecsResult;
  showErrors = false;

  get isComplete(): boolean {
    return this.completeAnswers !== undefined;
  }

  setLocation(value: DryerUseLocation): void {
    this.setAnswer('location', value);
  }
  setWattage(value: DryerWattage): void {
    this.setAnswer('wattage', value);
  }
  setVoltage(value: DryerVoltage): void {
    this.setAnswer('voltage', value);
  }
  setPriority(value: DryerPriority): void {
    this.setAnswer('priority', value);
  }

  showResult(): void {
    this.showErrors = true;
    const answers = this.completeAnswers;
    if (!answers) return;
    this.result = decodeHairDryerSpecs(answers);
    this.analytics.track('hair_dryer_specs_decoder_completed');
  }

  reset(): void {
    this.answers = {};
    this.result = undefined;
    this.showErrors = false;
  }

  private setAnswer<Key extends AnswerKey>(
    key: Key,
    value: HairDryerSpecsAnswers[Key],
  ): void {
    this.answers = { ...this.answers, [key]: value };
  }

  private get completeAnswers(): HairDryerSpecsAnswers | undefined {
    const { location, wattage, voltage, priority } = this.answers;
    if (!location || !wattage || !voltage || !priority) return undefined;
    return { location, wattage, voltage, priority };
  }
}
