import { Component, inject } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';
import {
  recommendStraighteningBrush,
  type HeatControlPreference,
  type StraighteningBrushBudget,
  type StraighteningBrushDensity,
  type StraighteningBrushFinish,
  type StraighteningBrushLength,
  type StraighteningBrushResult,
  type StraighteningBrushTexture,
  type StylingFrequency,
} from './straightening-brush-recommendation';

@Component({
  selector: 'app-straightening-brush-finder',
  styleUrl: 'straightening-brush-finder.component.css',
  template: `
    <section
      class="finder-card straightening-brush-finder"
      aria-labelledby="straightening-brush-finder-heading"
    >
      <p class="eyebrow">Practical chooser</p>
      <h2 id="straightening-brush-finder-heading">
        Straightening Brush Finder
      </h2>
      <p>
        Choose the closest match for a practical list of features to compare.
        This is a dry-hair styling guide, not a promise of a particular result.
      </p>
      <div class="finder-options">
        <label
          >Hair length<select
            [value]="length"
            (change)="setLength($any($event.target).value)"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select></label
        >
        <label
          >Hair density<select
            [value]="density"
            (change)="setDensity($any($event.target).value)"
          >
            <option value="fine">Fine</option>
            <option value="medium">Medium</option>
            <option value="thick">Thick</option>
          </select></label
        >
        <label
          >Usual texture<select
            [value]="texture"
            (change)="setTexture($any($event.target).value)"
          >
            <option value="straight">Straight</option>
            <option value="wavy">Wavy</option>
            <option value="curly">Curly</option>
          </select></label
        >
        <label
          >Finish you want<select
            [value]="finish"
            (change)="setFinish($any($event.target).value)"
          >
            <option value="soft-smoothing">Soft smoothing</option>
            <option value="sleek">A sleeker finish</option>
            <option value="refresh">A quick dry-hair refresh</option>
          </select></label
        >
        <label
          >Heat-control preference<select
            [value]="heatControl"
            (change)="setHeatControl($any($event.target).value)"
          >
            <option value="lower">Lower settings available</option>
            <option value="adjustable">Several adjustable settings</option>
            <option value="simple">Simple controls</option>
          </select></label
        >
        <label
          >How often will you use it?<select
            [value]="frequency"
            (change)="setFrequency($any($event.target).value)"
          >
            <option value="occasional">Occasionally</option>
            <option value="regular">Regularly</option>
          </select></label
        >
        <label
          >Budget<select
            [value]="budget"
            (change)="setBudget($any($event.target).value)"
          >
            <option value="entry">Entry</option>
            <option value="mid-range">Mid-range</option>
            <option value="premium">Premium</option>
          </select></label
        >
      </div>
      <button
        class="button finder-submit"
        type="button"
        (click)="showRecommendation()"
      >
        Show what to compare
      </button>
      @if (result) {
        <section
          class="dryer-finder-result"
          aria-live="polite"
          aria-label="Your straightening brush guidance"
        >
          <h3>{{ result.heading }}</h3>
          <p>{{ result.explanation }}</p>
          <div class="result-sections">
            <section>
              <h4>Prioritise these features</h4>
              <ul>
                @for (feature of result.features; track feature) {
                  <li>{{ feature }}</li>
                }
              </ul>
            </section>
            <section>
              <h4>Keep in mind</h4>
              <p>{{ result.caution }}</p>
            </section>
          </div>
        </section>
      }
    </section>
  `,
})
export class StraighteningBrushFinderComponent {
  private readonly analytics = inject(AnalyticsService);
  length: StraighteningBrushLength = 'medium';
  density: StraighteningBrushDensity = 'medium';
  texture: StraighteningBrushTexture = 'wavy';
  finish: StraighteningBrushFinish = 'soft-smoothing';
  heatControl: HeatControlPreference = 'adjustable';
  frequency: StylingFrequency = 'occasional';
  budget: StraighteningBrushBudget = 'mid-range';
  result?: StraighteningBrushResult;
  private started = false;
  setLength(value: StraighteningBrushLength): void {
    this.length = value;
    this.trackStarted();
  }
  setDensity(value: StraighteningBrushDensity): void {
    this.density = value;
    this.trackStarted();
  }
  setTexture(value: StraighteningBrushTexture): void {
    this.texture = value;
    this.trackStarted();
  }
  setFinish(value: StraighteningBrushFinish): void {
    this.finish = value;
    this.trackStarted();
  }
  setHeatControl(value: HeatControlPreference): void {
    this.heatControl = value;
    this.trackStarted();
  }
  setFrequency(value: StylingFrequency): void {
    this.frequency = value;
    this.trackStarted();
  }
  setBudget(value: StraighteningBrushBudget): void {
    this.budget = value;
    this.trackStarted();
  }
  showRecommendation(): void {
    this.trackStarted();
    this.result = recommendStraighteningBrush({
      length: this.length,
      density: this.density,
      texture: this.texture,
      finish: this.finish,
      heatControl: this.heatControl,
      frequency: this.frequency,
      budget: this.budget,
    });
    this.analytics.track('straightening_brush_finder_result_shown');
  }
  private trackStarted(): void {
    if (!this.started) {
      this.started = true;
      this.analytics.track('straightening_brush_finder_started');
    }
  }
}
