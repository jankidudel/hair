import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import {
  recommendHairDryer,
  type DiffuserNeed,
  type DryerDensity,
  type DryerGoal,
  type DryerLength,
  type DryerPriority,
  type HairDryerResult,
} from './hair-dryer-recommendation';

@Component({
  selector: 'app-hair-dryer-finder',
  imports: [RouterLink],
  styleUrl: 'hair-dryer-finder.component.css',
  template: `
    <section
      class="finder-card hair-dryer-finder"
      aria-labelledby="hair-dryer-finder-heading"
    >
      <p class="eyebrow">Practical chooser</p>
      <h2 id="hair-dryer-finder-heading">
        Find the Hair Dryer Features That Matter to You
      </h2>
      <p>
        Choose the closest match, then compare the features that suit your
        routine. The buying guide below remains useful if you prefer not to use
        this tool.
      </p>
      <div class="finder-options">
        <label
          >Hair length
          <select
            [value]="length"
            (change)="setLength($any($event.target).value)"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select></label
        >
        <label
          >Hair density
          <select
            [value]="density"
            (change)="setDensity($any($event.target).value)"
          >
            <option value="fine">Fine</option>
            <option value="medium">Medium</option>
            <option value="thick">Thick</option>
          </select></label
        >
        <label
          >Your main goal
          <select [value]="goal" (change)="setGoal($any($event.target).value)">
            <option value="quick">Quickest everyday drying</option>
            <option value="smooth">Smooth blowout</option>
            <option value="diffuser">Use with a diffuser</option>
            <option value="travel">Compact travel dryer</option>
          </select></label
        >
        <label
          >Your priority
          <select
            [value]="priority"
            (change)="setPriority($any($event.target).value)"
          >
            <option value="lightweight">Lighter to hold</option>
            <option value="airflow">Strongest airflow</option>
            <option value="price">Lower price</option>
            <option value="attachments">Flexible attachments</option>
          </select></label
        >
        <label
          >Do you need a diffuser?
          <select
            [value]="diffuser"
            (change)="setDiffuser($any($event.target).value)"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not-sure">Not sure</option>
          </select></label
        >
      </div>
      <button
        class="button finder-submit"
        type="button"
        (click)="showRecommendation()"
      >
        Show my recommendation
      </button>
      @if (result) {
        <section
          class="dryer-finder-result"
          aria-live="polite"
          aria-label="Your hair dryer recommendation"
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
          <nav
            class="dryer-finder-links"
            aria-label="Related hair dryer guides"
          >
            @for (link of result.links; track link.slug) {
              <a
                [routerLink]="['/guides', link.slug]"
                (click)="trackGuideClick(link.slug)"
              >
                {{ link.label }} <span aria-hidden="true">→</span>
              </a>
            }
          </nav>
          @if (goal === 'quick' || goal === 'smooth') {
            <p class="dryer-finder-compare">
              <a routerLink="/guides/dyson-supersonic-vs-shark-speedstyle"
                >Compare published dryer specifications</a
              >
            </p>
          }
          <p class="dryer-finder-compare">
            <a routerLink="/products">Compare published specifications</a>
          </p>
        </section>
      }
    </section>
  `,
})
export class HairDryerFinderComponent {
  private readonly analytics = inject(AnalyticsService);
  length: DryerLength = 'medium';
  density: DryerDensity = 'medium';
  goal: DryerGoal = 'quick';
  priority: DryerPriority = 'lightweight';
  diffuser: DiffuserNeed = 'not-sure';
  result?: HairDryerResult;
  private started = false;

  setLength(value: DryerLength): void {
    this.length = value;
    this.trackStarted();
  }
  setDensity(value: DryerDensity): void {
    this.density = value;
    this.trackStarted();
  }
  setGoal(value: DryerGoal): void {
    this.goal = value;
    this.trackStarted();
  }
  setPriority(value: DryerPriority): void {
    this.priority = value;
    this.trackStarted();
  }
  setDiffuser(value: DiffuserNeed): void {
    this.diffuser = value;
    this.trackStarted();
  }
  showRecommendation(): void {
    this.trackStarted();
    this.result = recommendHairDryer({
      length: this.length,
      density: this.density,
      goal: this.goal,
      priority: this.priority,
      diffuser: this.diffuser,
    });
    this.analytics.track('tool_completed', {
      goal: this.goal,
      priority: this.priority,
      diffuser: this.diffuser,
    });
  }
  trackGuideClick(slug: string): void {
    this.analytics.track('result_to_guide_click', {
      destination_slug: slug,
    });
  }
  private trackStarted(): void {
    if (this.started) return;
    this.started = true;
    this.analytics.track('tool_started', { tool: 'hair_dryer_finder' });
  }
}
