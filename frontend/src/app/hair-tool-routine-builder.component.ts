import { ArticleSlug } from './article-slug';
import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import {
  recommendHairToolRoutine,
  type HairLength,
  type OwnedTool,
  type RoutineGoal,
  type StylingTime,
} from './hair-tool-routine-recommendation';
import { SiteSeoService } from './site-seo.service';

@Component({
  imports: [RouterLink],
  styleUrl: 'hair-tool-routine-builder.component.css',
  template: `
    <section class="finder-hero">
      <p class="eyebrow">Tools · Routine planning</p>
      <h1>Build Your Simple Hair Tool Routine</h1>
      <p class="lede">
        Answer four practical questions to identify the few tools most likely to
        earn a place in your routine. The result is a starting point, not a
        promise that one tool suits everyone.
      </p>
    </section>
    <section
      class="finder-card routine-builder"
      aria-labelledby="routine-builder-heading"
    >
      <h2 id="routine-builder-heading">Your routine details</h2>
      <form (submit)="submit($event)">
        <fieldset>
          <legend>Hair length</legend>
          <div class="routine-options">
            @for (option of lengthOptions; track option.value) {
              <label
                ><input
                  type="radio"
                  [id]="'routine-length-' + option.value"
                  name="length"
                  [value]="option.value"
                  [checked]="length === option.value"
                  (change)="setLength(option.value)"
                />
                {{ option.label }}</label
              >
            }
          </div>
        </fieldset>
        <fieldset>
          <legend>Your usual goal</legend>
          <div class="routine-options">
            @for (option of goalOptions; track option.value) {
              <label
                ><input
                  type="radio"
                  name="goal"
                  [value]="option.value"
                  [checked]="goal === option.value"
                  (change)="setGoal(option.value)"
                />
                {{ option.label }}</label
              >
            }
          </div>
        </fieldset>
        <fieldset>
          <legend>How much styling time do you normally want to spend?</legend>
          <div class="routine-options">
            @for (option of timeOptions; track option.value) {
              <label
                ><input
                  type="radio"
                  name="time"
                  [value]="option.value"
                  [checked]="time === option.value"
                  (change)="setTime(option.value)"
                />
                {{ option.label }}</label
              >
            }
          </div>
        </fieldset>
        <fieldset>
          <legend>What do you already own?</legend>
          <div class="routine-options">
            @for (option of ownedOptions; track option.value) {
              <label
                ><input
                  type="checkbox"
                  [checked]="owns(option.value)"
                  (change)="toggleOwned(option.value)"
                />
                {{ option.label }}</label
              >
            }
          </div>
          <label class="routine-none"
            ><input
              type="checkbox"
              [checked]="noneOrUnsure"
              (change)="setNoneOrUnsure($any($event.target).checked)"
            />
            None or not sure</label
          >
        </fieldset>
        <button class="button finder-submit" type="submit">
          Build my routine
        </button>
      </form>
      @if (resultShown) {
        <section
          class="dryer-finder-result routine-result"
          aria-live="polite"
          aria-labelledby="routine-result-heading"
        >
          <p class="eyebrow">Your practical starting routine</p>
          <h3 id="routine-result-heading">Your practical starting routine</h3>
          <p>{{ result.summary }}</p>
          <ol>
            @for (item of result.items; track item.tool) {
              <li>
                <strong>{{ item.label }}</strong> —
                <strong>{{ item.tool }}</strong
                >: {{ item.detail }}
              </li>
            }
            <li><strong>Skip for now</strong> — {{ result.skip }}</li>
          </ol>
          <nav
            class="dryer-finder-links"
            aria-label="Relevant tools and guides"
          >
            @for (link of result.links; track link.path) {
              <a [routerLink]="link.path" (click)="linkClicked()">{{
                link.label
              }}</a>
            }
            <a routerLink="/products" (click)="linkClicked()"
              >Compare published product specifications</a
            >
          </nav>
          <button class="finder-restart" type="button" (click)="reset()">
            Reset answers
          </button>
        </section>
      }
      <!-- Bound as innerHTML: with scripting on, browsers parse noscript
        content as text, so hydrating element children here can fail. -->
      <noscript [innerHTML]="noScriptFallback"></noscript>
    </section>
  `,
})
export class HairToolRoutineBuilderComponent {
  readonly noScriptFallback = `<p class="finder-rationale">For a no-JavaScript guide to choosing a smaller toolkit, read <a href="/guides/${ArticleSlug.WhatHairToolsDoINeed}">What Hair Tools Do You Actually Need?</a>.</p>`;
  private readonly document = inject(DOCUMENT);
  private readonly seo = inject(SiteSeoService);
  private readonly analytics = inject(AnalyticsService);
  readonly lengthOptions = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' },
  ] as const;
  readonly goalOptions = [
    { value: 'smooth', label: 'Simple everyday smoothing' },
    { value: 'blowout', label: 'Blowout and volume' },
    { value: 'curls', label: 'Defined curls or waves' },
    { value: 'travel', label: 'Low-effort travel routine' },
  ] as const;
  readonly timeOptions = [
    { value: 'under-10', label: 'Under 10 minutes' },
    { value: '10-20', label: '10–20 minutes' },
    { value: 'over-20', label: 'More than 20 minutes' },
  ] as const;
  readonly ownedOptions = [
    { value: 'dryer', label: 'A dryer' },
    { value: 'hot-air-brush', label: 'A hot-air brush' },
    { value: 'heated-round-brush', label: 'A dry-use heated round brush' },
    { value: 'rollers', label: 'A roller set' },
    { value: 'round-brush', label: 'A round brush' },
    { value: 'flat-iron', label: 'A flat iron' },
    { value: 'curling-iron', label: 'A curling iron' },
    { value: 'curling-wand', label: 'A curling wand' },
  ] as const;
  length: HairLength = 'medium';
  goal: RoutineGoal = 'smooth';
  time: StylingTime = '10-20';
  owned: OwnedTool[] = [];
  noneOrUnsure = true;
  resultShown = false;
  private hasStarted = false;
  constructor() {
    this.seo.set(
      'Hair Tool Routine Builder | Combreport',
      'Build a simple hair-tool routine for your length, styling goal and available time, then explore the guides and comparisons that fit.',
      '/hair-tool-routine-builder',
      undefined,
      [
        { label: 'Home', path: '/' },
        {
          label: 'Hair Tool Routine Builder',
          path: '/hair-tool-routine-builder',
        },
      ],
    );
  }
  get result() {
    return recommendHairToolRoutine({
      length: this.length,
      goal: this.goal,
      time: this.time,
      owned: this.owned,
    });
  }
  started(): void {
    if (!this.hasStarted) {
      this.analytics.track('hair_tool_routine_builder_started');
      this.hasStarted = true;
    }
  }
  owns(tool: OwnedTool): boolean {
    return this.owned.includes(tool);
  }
  setLength(length: HairLength): void {
    this.started();
    this.length = length;
  }
  setGoal(goal: RoutineGoal): void {
    this.started();
    this.goal = goal;
  }
  setTime(time: StylingTime): void {
    this.started();
    this.time = time;
  }
  toggleOwned(tool: OwnedTool): void {
    this.started();
    this.noneOrUnsure = false;
    this.owned = this.owns(tool)
      ? this.owned.filter((item) => item !== tool)
      : [...this.owned, tool];
  }
  setNoneOrUnsure(checked: boolean): void {
    this.started();
    this.noneOrUnsure = checked;
    if (checked) this.owned = [];
  }
  submit(event: SubmitEvent): void {
    event.preventDefault();
    this.started();
    this.resultShown = true;
    this.analytics.track('hair_tool_routine_builder_result_shown');
  }
  reset(): void {
    this.length = 'medium';
    this.goal = 'smooth';
    this.time = '10-20';
    this.owned = [];
    this.noneOrUnsure = true;
    this.resultShown = false;
    this.hasStarted = false;
    queueMicrotask(() =>
      this.document.getElementById('routine-length-medium')?.focus(),
    );
  }
  linkClicked(): void {
    this.analytics.track('hair_tool_routine_builder_link_clicked');
  }
}
