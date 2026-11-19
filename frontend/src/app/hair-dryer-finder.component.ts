import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import { ArticleSlug } from './article-slug';
import {
  recommendHairDryer,
  dryerGoalGuidance,
  type DiffuserNeed,
  type DryerSectionAmount,
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
            <option value="medium" selected>Medium</option>
            <option value="long">Long</option>
          </select></label
        >
        <label
          >Amount of hair in the working section
          <select
            aria-describedby="section-amount-help"
            [value]="sectionAmount"
            (change)="setSectionAmount($any($event.target).value)"
          >
            <option value="lower">Less hair in the section</option>
            <option value="medium" selected>A moderate amount</option>
            <option value="higher">More hair in the section</option>
          </select>
          <small id="section-amount-help"
            >This is about the amount you handle at once, not the thickness of
            an individual strand. You can reduce the working section before
            changing tools.</small
          ></label
        >
        <label
          >Your main goal
          <select [value]="goal" (change)="setGoal($any($event.target).value)">
            <option value="quick" selected>Everyday drying</option>
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
            <option value="airflow" selected>Airflow control</option>
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
            <option value="not-sure" selected>Not sure</option>
          </select></label
        >
      </div>
      <button
        class="button finder-submit"
        type="button"
        (click)="showRecommendation()"
      >
        Show features to compare
      </button>
      <button class="button" type="button" (click)="clearChoices()">
        Clear choices
      </button>
      <nav class="dryer-finder-links" aria-label="Hair dryer feature guides">
        @for (link of coreLinks; track link.slug) {
          <a [routerLink]="['/guides', link.slug]">{{ link.label }}</a>
        }
      </nav>
      @if (result) {
        <section
          class="dryer-finder-result"
          aria-live="polite"
          aria-label="Your hair dryer recommendation"
        >
          <h3>{{ result.heading }}</h3>
          <p>{{ result.explanation }}</p>
          <p>{{ result.priority }}</p>
          @if (result.diffuserNote === 'yes') {
            <p>
              You also selected diffuser use: verify that attachment’s
              <a routerLink="/guides/hair-dryer-diffuser-compatibility"
                >exact compatibility and box contents</a
              >.
            </p>
          } @else if (result.diffuserNote === 'not-sure') {
            <p>
              Decide whether a diffuser serves a routine you intend to use
              before paying for a kit.
            </p>
          }
          @if (result.smallerSection) {
            <p>
              <a routerLink="/guides/how-to-section-hair-for-styling"
                >Try releasing a smaller working area before using section
                volume as a reason to replace a tool.</a
              >
            </p>
          }
          <nav
            class="dryer-finder-links"
            aria-label="Related hair dryer guides"
          >
            @for (link of result.links; track link.slug) {
              <a
                [routerLink]="['/guides', link.slug]"
                (click)="trackGuideClick()"
              >
                {{ link.label }} <span aria-hidden="true">→</span>
              </a>
            }
          </nav>
          <h4>Three features to compare</h4>
          <ul class="dryer-finder-features">
            @for (feature of result.features; track feature.name) {
              <li>
                <strong>{{ feature.name }}:</strong> {{ feature.why }}
              </li>
            }
          </ul>
          <h4>Named comparisons</h4>
          <ul class="dryer-finder-features">
            @for (comparison of result.comparisons; track comparison.slug) {
              <li>
                <a
                  [routerLink]="['/guides', comparison.slug]"
                  (click)="trackGuideClick()"
                  >{{ comparison.label }}</a
                >
                ({{ comparison.scope }})
              </li>
            }
          </ul>
          <p><strong>Next check:</strong> {{ result.nextCheck }}</p>
          <p class="dryer-finder-compare">
            <a routerLink="/products">Compare published specifications</a>
          </p>
        </section>
      }
    </section>
  `,
})
export class HairDryerFinderComponent {
  readonly articleSlug = ArticleSlug;
  private readonly analytics = inject(AnalyticsService);
  length: DryerLength = 'medium';
  sectionAmount: DryerSectionAmount = 'medium';
  goal: DryerGoal = 'quick';
  priority: DryerPriority = 'airflow';
  diffuser: DiffuserNeed = 'not-sure';
  result?: HairDryerResult;
  private started = false;
  readonly coreLinks = Object.values(dryerGoalGuidance);
  clearChoices(): void {
    this.length = 'medium';
    this.sectionAmount = 'medium';
    this.goal = 'quick';
    this.priority = 'airflow';
    this.diffuser = 'not-sure';
    this.result = undefined;
  }

  setLength(value: DryerLength): void {
    this.length = value;
    this.trackStarted();
  }
  setSectionAmount(value: DryerSectionAmount): void {
    this.sectionAmount = value;
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
      sectionAmount: this.sectionAmount,
      goal: this.goal,
      priority: this.priority,
      diffuser: this.diffuser,
    });
    this.analytics.track('tool_completed');
  }
  trackGuideClick(): void {
    this.analytics.track('result_to_guide_click');
  }
  private trackStarted(): void {
    if (this.started) return;
    this.started = true;
    this.analytics.track('tool_started', { tool: 'hair_dryer_finder' });
  }
}
