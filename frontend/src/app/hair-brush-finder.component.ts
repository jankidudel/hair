import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import {
  recommendHairBrush,
  type HairBrushAnswers,
} from './hair-brush-recommendation';
import { SiteSeoService } from './site-seo.service';

type QuestionKey = keyof HairBrushAnswers;
interface FinderQuestion {
  key: QuestionKey;
  prompt: string;
  options: readonly { value: string; label: string; detail: string }[];
}

interface FinderGuideLink {
  readonly slug: string;
  readonly label: string;
}

const questions: readonly FinderQuestion[] = [
  {
    key: 'use',
    prompt: 'What is the main task for this brush?',
    options: [
      {
        value: 'wet',
        label: 'Damp detangling',
        detail: 'Prepare manageable sections; no dryer use implied',
      },
      {
        value: 'blow-dry',
        label: 'Shape with a dryer',
        detail: 'Guide a section while using separate airflow',
      },
      {
        value: 'dry',
        label: 'Dry grooming or finishing',
        detail: 'Tidy or style already-dry sections',
      },
    ],
  },
  {
    key: 'length',
    prompt: 'How long is your hair?',
    options: [
      { value: 'short', label: 'Short', detail: 'Above or around the jaw' },
      { value: 'medium', label: 'Medium', detail: 'Around the shoulders' },
      { value: 'long', label: 'Long', detail: 'Below the shoulders' },
    ],
  },
  {
    key: 'texture',
    prompt: 'What is your natural texture?',
    options: [
      {
        value: 'straight',
        label: 'Straight',
        detail: 'Mostly smooth from root to end',
      },
      {
        value: 'wavy',
        label: 'Wavy',
        detail: 'Soft bends or an S-shaped pattern',
      },
      {
        value: 'curly-coily',
        label: 'Curly / coily',
        detail: 'Defined curls, coils or kinks',
      },
    ],
  },
  {
    key: 'thickness',
    prompt: 'How does your hair feel overall?',
    options: [
      {
        value: 'fine',
        label: 'Fine',
        detail: 'Lightweight individual strands',
      },
      { value: 'medium', label: 'Medium', detail: 'A balanced, everyday feel' },
      {
        value: 'thick',
        label: 'Thick',
        detail: 'Dense or substantial sections',
      },
    ],
  },
  {
    key: 'goal',
    prompt: 'What is your main goal?',
    options: [
      {
        value: 'smooth',
        label: 'Neater, smoother everyday hair',
        detail: 'A polished, easy finish',
      },
      {
        value: 'volume',
        label: 'More volume',
        detail: 'A little lift and airiness',
      },
      {
        value: 'detangle',
        label: 'Gentle detangling',
        detail: 'Less pulling through knots',
      },
      {
        value: 'define-curls',
        label: 'Defining curls / keeping texture natural',
        detail: 'Working with your preferred pattern',
      },
    ],
  },
];

@Component({
  imports: [RouterLink],
  styleUrl: 'hair-brush-finder.component.css',
  template: `
    <section class="finder-hero">
      <p class="eyebrow">Tools · Hair brushes</p>
      <h1>Find the Right Hair Brush</h1>
      <p class="lede">
        Answer a few practical questions and get a brush type that fits your
        hair and the way you style it.
      </p>
      <p class="finder-time">
        <span aria-hidden="true">◷</span> Takes about 30 seconds
      </p>
    </section>
    <section class="finder-card" aria-labelledby="finder-question">
      @if (!complete) {
        <div class="finder-progress" aria-live="polite">
          <span
            >Question {{ currentQuestion + 1 }} of {{ questions.length }}</span
          >
          <div class="progress-track" aria-hidden="true">
            <span
              [style.width.%]="((currentQuestion + 1) / questions.length) * 100"
            ></span>
          </div>
        </div>
        <div class="finder-question">
          <svg class="brush-icon" viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M18 9h20a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V17a8 8 0 0 1 8-8Zm7 30v16m7-16v16m7-16v16m7-16v16M7 20h42"
            />
          </svg>
          <h2 id="finder-question">{{ question.prompt }}</h2>
          <div class="finder-options" [attr.aria-label]="question.prompt">
            @for (option of question.options; track option.value) {
              <button
                type="button"
                class="finder-option"
                [attr.aria-pressed]="answers[question.key] === option.value"
                (click)="answer(option.value)"
              >
                <span>{{ option.label }}</span
                ><small>{{ option.detail }}</small>
              </button>
            }
          </div>
        </div>
        @if (currentQuestion > 0) {
          <button class="finder-back" type="button" (click)="back()">
            ← Back
          </button>
        }
      } @else {
        <div class="finder-result" aria-live="polite">
          <p class="eyebrow">Your brush match</p>
          <h2>Your best match: {{ result.primary.name }}</h2>
          <p class="finder-rationale">{{ result.rationale }}</p>
          <p class="finder-rationale">
            This is a manual format for your stated task. Check the exact
            model's wet and dryer permissions before using it in another stage.
          </p>
          <div class="result-sections">
            <section>
              <h3>Best for</h3>
              <ul>
                @for (item of result.primary.bestFor; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </section>
            <section>
              <h3>Consider instead</h3>
              @if (result.alternative) {
                <p>
                  <strong>{{ result.alternative.name }}</strong> is a useful
                  second choice for {{ result.alternative.bestFor[0] }}.
                </p>
              } @else {
                <p>
                  {{
                    result.primary.avoidIf ||
                      'Choose another tool when your routine calls for a different finish.'
                  }}
                </p>
              }
            </section>
          </div>
          <section class="buying-notes">
            <h3>Check the exact item</h3>
            @if (answers.use === 'wet') {
              <p>
                Confirm wet-use directions, tooth spacing or pin layout, and a
                grip you can control through one damp section. Wet-use
                permission does not establish dryer-heat permission.
              </p>
            } @else if (answers.use === 'blow-dry') {
              <p>
                Check dryer-use directions, the working width and a release path
                for your usual section. A dense section can be divided before
                choosing a larger head.
              </p>
            } @else {
              <p>
                Check the head size, contact feel and grip against one dry
                section. Buy another format only for a separate task.
              </p>
            }
          </section>
          <section class="finder-next-steps" aria-label="Related brush guides">
            <h3>Continue reading</h3>
            <ul>
              @for (guide of nextStepGuides; track guide.slug) {
                <li>
                  <a
                    [href]="'/guides/' + guide.slug"
                    (click)="guideClicked(guide.slug)"
                    >{{ guide.label }}</a
                  >
                </li>
              }
            </ul>
          </section>
          <a
            class="button"
            [routerLink]="['/guides', result.primary.guideSlug]"
            (click)="guideClicked(result.primary.guideSlug)"
            >Read the buying guide</a
          >
          <p><a routerLink="/products">Compare published specifications</a></p>
          <button class="finder-restart" type="button" (click)="restart()">
            Start again
          </button>
          <button class="finder-back" type="button" (click)="edit()">
            Edit answers
          </button>
          <div class="affiliate-placeholder" hidden aria-hidden="true"></div>
        </div>
      }
    </section>
  `,
})
export class HairBrushFinderComponent {
  private readonly seo = inject(SiteSeoService);
  private readonly analytics = inject(AnalyticsService);
  readonly questions = questions;
  readonly answers: Partial<HairBrushAnswers> = {};
  currentQuestion = 0;
  complete = false;
  private started = false;

  constructor() {
    this.seo.set(
      'Find the Right Hair Brush for Your Hair | CombReport',
      'Answer a few quick questions to find the best type of hair brush for your length, texture and styling goal.',
      '/hair-brush-finder',
    );
  }
  get question(): FinderQuestion {
    return this.questions[this.currentQuestion];
  }
  get result() {
    return recommendHairBrush(this.answers as HairBrushAnswers);
  }
  edit(): void {
    this.complete = false;
    this.currentQuestion = 0;
  }
  get nextStepGuides(): readonly FinderGuideLink[] {
    if (this.answers.use === 'wet') {
      return [
        {
          slug: 'tangle-teezer-ultimate-detangler-vs-wet-brush-original',
          label: 'Compare two exact wet-use detanglers',
        },
        {
          slug: 'wide-tooth-comb-vs-detangling-brush',
          label: 'Compare a comb and detangling brush',
        },
      ];
    }
    if (this.answers.use === 'blow-dry') {
      return [
        {
          slug: 'round-brush-vs-paddle-brush',
          label: 'Choose a brush shape for the dryer',
        },
        {
          slug: 'round-brush-size-guide',
          label: 'Check barrel and working-section geometry',
        },
      ];
    }
    if (this.answers.texture === 'curly-coily') {
      return [
        {
          slug: 'best-brushes-curly-hair',
          label: 'Best Hair Brushes for Curly Hair',
        },
        {
          slug: 'wide-tooth-comb-vs-detangling-brush',
          label: 'Wide-Tooth Comb vs Detangling Brush',
        },
      ];
    }
    if (this.answers.thickness === 'thick') {
      return [
        {
          slug: 'best-brushes-thick-hair',
          label: 'Best Hair Brushes for Thick Hair',
        },
        { slug: 'best-detangling-brushes', label: 'Best Detangling Brushes' },
      ];
    }
    if (this.answers.thickness === 'fine') {
      return [
        {
          slug: 'best-brushes-fine-hair',
          label: 'Best Hair Brushes for Fine Hair',
        },
        { slug: 'hair-brush-vs-comb', label: 'Hair Brush vs Comb' },
      ];
    }
    return [
      {
        slug: 'how-to-choose-hair-brush',
        label: 'How to Choose the Right Hair Brush',
      },
      {
        slug: 'round-brush-vs-paddle-brush',
        label: 'Round Brush vs Paddle Brush',
      },
    ];
  }
  answer(value: string): void {
    if (!this.started) {
      this.analytics.track('tool_started', { tool: 'hair_brush_finder' });
      this.started = true;
    }
    const key = this.question.key;
    (this.answers as Record<QuestionKey, string>)[key] = value;
    this.analytics.track('hair_brush_finder_question_answered', {
      question_number: this.currentQuestion + 1,
    });
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      return;
    }
    this.complete = true;
    this.analytics.track('tool_completed', {
      primary_recommendation_category: this.result.primary.category,
    });
  }
  back(): void {
    this.currentQuestion--;
  }
  restart(): void {
    this.answers.length = undefined;
    this.answers.texture = undefined;
    this.answers.thickness = undefined;
    this.answers.use = undefined;
    this.answers.goal = undefined;
    this.currentQuestion = 0;
    this.complete = false;
    this.started = false;
    this.analytics.track('hair_brush_finder_restart');
  }
  guideClicked(slug: string): void {
    this.analytics.track('result_to_guide_click', {
      destination_slug: slug,
    });
  }
}
