import { Component, inject } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';
import {
  recommendHeatProtectant,
  type HeatProtectantApplication,
  type HeatProtectantDensity,
  type HeatProtectantFinish,
  type HeatProtectantResult,
  type HeatProtectantStylingStep,
} from './heat-protectant-recommendation';

@Component({
  selector: 'app-heat-protectant-finder',
  styleUrl: 'heat-protectant-finder.component.css',
  template: `
    <section
      class="finder-card heat-protectant-finder"
      aria-labelledby="heat-protectant-finder-heading"
    >
      <p class="eyebrow">Practical chooser</p>
      <h2 id="heat-protectant-finder-heading">Heat Protectant Finder</h2>
      <p>
        Choose a product format and application point to compare. This guide
        uses product directions first; it does not promise a particular styling
        result.
      </p>
      <div class="finder-options">
        <label
          >Styling routine<select
            [value]="stylingStep"
            (change)="setStylingStep($any($event.target).value)"
          >
            <option value="blow-dry">Blow-drying only</option>
            <option value="dry-tool">
              Straightening, curling or dry-hair styling only
            </option>
            <option value="both">
              Blow-drying, then a dry-hair styling tool
            </option>
          </select></label
        >
        <label
          >When will you apply it?<select
            [value]="application"
            (change)="setApplication($any($event.target).value)"
          >
            <option value="damp">On towel-dried / damp hair</option>
            <option value="dry">On fully dry hair</option>
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
          >Preferred feel<select
            [value]="finish"
            (change)="setFinish($any($event.target).value)"
          >
            <option value="lightweight">Lightweight</option>
            <option value="softening">Softer and more conditioned</option>
            <option value="neutral">No strong preference</option>
          </select></label
        >
      </div>
      <button
        class="button finder-submit"
        type="button"
        (click)="showRecommendation()"
      >
        Show what to check
      </button>
      @if (result) {
        <section
          class="dryer-finder-result"
          aria-live="polite"
          aria-label="Your heat protectant guidance"
        >
          <h3>{{ result.heading }}</h3>
          <p>{{ result.explanation }}</p>
          <h4>Check these details</h4>
          <ul>
            @for (priority of result.priorities; track priority) {
              <li>{{ priority }}</li>
            }
          </ul>
          <p><strong>Keep in mind:</strong> {{ result.reminder }}</p>
        </section>
      }
    </section>
  `,
})
export class HeatProtectantFinderComponent {
  private readonly analytics = inject(AnalyticsService);
  stylingStep: HeatProtectantStylingStep = 'blow-dry';
  application: HeatProtectantApplication = 'damp';
  density: HeatProtectantDensity = 'medium';
  finish: HeatProtectantFinish = 'neutral';
  result?: HeatProtectantResult;
  private started = false;

  setStylingStep(value: HeatProtectantStylingStep): void {
    this.stylingStep = value;
    this.trackStarted();
  }
  setApplication(value: HeatProtectantApplication): void {
    this.application = value;
    this.trackStarted();
  }
  setDensity(value: HeatProtectantDensity): void {
    this.density = value;
    this.trackStarted();
  }
  setFinish(value: HeatProtectantFinish): void {
    this.finish = value;
    this.trackStarted();
  }

  showRecommendation(): void {
    this.trackStarted();
    this.result = recommendHeatProtectant({
      stylingStep: this.stylingStep,
      application: this.application,
      density: this.density,
      finish: this.finish,
    });
    this.analytics.track('heat_protectant_finder_result_shown');
  }

  private trackStarted(): void {
    if (!this.started) {
      this.started = true;
      this.analytics.track('heat_protectant_finder_started');
    }
  }
}
