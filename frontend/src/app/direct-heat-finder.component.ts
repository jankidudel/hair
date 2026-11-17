import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { productProfiles, ProductCategory } from './product-comparisons';
import { SiteSeoService } from './site-seo.service';
import { ArticleSlug } from './article-slug';

type FinderKind = 'flat' | 'curling';
type Answer = 'precision' | 'general' | 'broad' | 'clamp' | 'wand' | 'varied';

@Component({
  imports: [RouterLink],
  styleUrl: './hair-brush-finder.component.css',
  template: ` <section class="finder-hero">
      <p class="eyebrow">Tools · Direct heat</p>
      <h1>{{ title }}</h1>
      <p class="lede">
        A browser-local, deterministic helper that narrows the tool format and
        documented details worth checking. It does not collect your answers.
      </p>
    </section>
    <section class="finder-card" aria-labelledby="finder-question">
      @if (!complete) {
        <div class="finder-progress" aria-live="polite">
          <span>Question {{ step + 1 }} of 3</span>
          <div class="progress-track">
            <span [style.width.%]="((step + 1) / 3) * 100"></span>
          </div>
        </div>
        <div class="finder-question">
          <h2 id="finder-question">{{ prompts[step] }}</h2>
          <div
            class="finder-options"
            role="radiogroup"
            [attr.aria-label]="prompts[step]"
          >
            @for (option of options; track option.value) {
              <button
                type="button"
                class="finder-option"
                role="radio"
                (click)="answer(option.value)"
              >
                <span>{{ option.label }}</span
                ><small>{{ option.detail }}</small>
              </button>
            }
          </div>
        </div>
        @if (step > 0) {
          <button type="button" class="finder-back" (click)="back()">
            ← Back
          </button>
        }
      } @else {
        <div class="finder-result" aria-live="polite">
          <p class="eyebrow">Your direct-heat profile</p>
          <h2>{{ resultName }}</h2>
          <p class="finder-rationale">{{ rationale }}</p>
          <div class="result-sections">
            <section>
              <h3>What to verify</h3>
              <ul>
                <li>Exact US model, voltage and instructions</li>
                <li>
                  Documented controls; unknown controls are not treated as
                  adjustable
                </li>
                <li>The stated plate or barrel measurement</li>
              </ul>
            </section>
            <section>
              <h3>Trade-off</h3>
              <p>{{ tradeoff }}</p>
            </section>
          </div>
          <h3>Verified products to compare</h3>
          <ul>
            @for (product of matches; track product.slug) {
              <li>
                <a
                  [routerLink]="'/products'"
                  [state]="{ compareProductSlug: product.slug }"
                  >{{ product.name }}</a
                >
              </li>
            }
          </ul>
          <a class="button" [routerLink]="guidePath">Read the primary guide</a>
          @if (kind === 'flat' && answers[0] === 'broad') {
            <p>
              <a [routerLink]="['/guides', articleSlug.GhdMaxVsChronosMax]"
                >Compare two wide ghd models</a
              >
              for the 42 mm and 43 mm labels and control differences. For
              standard versus wide, use
              <a [routerLink]="['/guides', articleSlug.GhdChronosVsChronosMax]"
                >Chronos versus Chronos Max</a
              >.
            </p>
          }
          <p><a routerLink="/products">Compare published specifications</a></p>
          <button type="button" class="finder-restart" (click)="reset()">
            Start again
          </button>
        </div>
      }
    </section>`,
})
export class DirectHeatFinderComponent {
  readonly articleSlug = ArticleSlug;
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SiteSeoService);
  readonly kind: FinderKind = this.route.snapshot.data['kind'] as FinderKind;
  step = 0;
  complete = false;
  answers: Answer[] = [];
  constructor() {
    this.seo.set(
      this.kind === 'flat'
        ? 'Flat Iron Finder | Comb Report'
        : 'Curling Tool Finder | Comb Report',
      this.kind === 'flat'
        ? 'Find a practical flat-iron profile by plate-width and handling preferences.'
        : 'Find a practical curling-tool format by barrel size and clamp or wand preference.',
      this.kind === 'flat' ? '/flat-iron-finder' : '/curling-tool-finder',
    );
  }
  get title() {
    return this.kind === 'flat'
      ? 'Find a Flat Iron Profile'
      : 'Find a Curling Tool Profile';
  }
  get prompts() {
    return this.kind === 'flat'
      ? [
          'What is your primary task?',
          'Which handling preference fits?',
          'Do you need documented international voltage?',
        ]
      : [
          'What result scale are you considering?',
          'Do you prefer a clamp or wand?',
          'Do you need documented international voltage?',
        ];
  }
  get options() {
    const choices =
      this.kind === 'flat'
        ? [
            [
              [
                'precision',
                'Short sections or precision',
                'Narrow plates can be easier to guide',
              ],
              [
                'general',
                'General use',
                'A standard-width format is a starting point',
              ],
              [
                'broad',
                'Broader sections',
                'Wider plates trade away precision',
              ],
            ],
            [
              [
                'precision',
                'Lightweight, close control',
                'Prioritize handling',
              ],
              ['general', 'No strong preference', 'Use the standard profile'],
              ['broad', 'Cover more section at once', 'Consider wider plates'],
            ],
            [
              ['general', 'Yes', 'Only documented compatibility can match'],
              [
                'precision',
                'No or unsure',
                'Do not assume voltage compatibility',
              ],
            ],
          ]
        : [
            [
              [
                'precision',
                'Tighter-scale curls',
                'Start with smaller barrels',
              ],
              ['general', 'Classic curls', 'Start with a middle band'],
              ['broad', 'Loose bends or waves', 'Start with larger bands'],
            ],
            [
              ['clamp', 'Clamp iron', 'Built-in clamp format'],
              ['wand', 'Clipless wand', 'Wrapping format'],
              ['varied', 'No preference', 'Compare both formats'],
            ],
            [
              ['general', 'Yes', 'Only documented compatibility can match'],
              [
                'precision',
                'No or unsure',
                'Do not assume voltage compatibility',
              ],
            ],
          ];
    return choices[this.step].map(([value, label, detail]) => ({
      value: value as Answer,
      label,
      detail,
    }));
  }
  answer(value: Answer) {
    this.answers[this.step] = value;
    if (this.step === 2) this.complete = true;
    else this.step += 1;
  }
  back() {
    this.step -= 1;
  }
  reset() {
    this.step = 0;
    this.answers = [];
    this.complete = false;
  }
  get resultName() {
    if (this.kind === 'flat')
      return this.answers[0] === 'precision'
        ? 'A narrow-plate flat-iron profile'
        : this.answers[0] === 'broad'
          ? 'A wider-plate flat-iron profile'
          : 'A standard-width flat-iron profile';
    return this.answers[1] === 'clamp'
      ? 'A clamp curling-iron profile'
      : this.answers[1] === 'wand'
        ? 'A clipless curling-wand profile'
        : 'A curling format to compare';
  }
  get rationale() {
    return this.kind === 'flat'
      ? 'This profile uses your stated handling preference to suggest a plate-width band. Follow exact manufacturer instructions and begin with the lowest effective permitted setting.'
      : 'This profile combines your preferred format and a barrel-size band. It cannot guarantee a curl shape or duration.';
  }
  get tradeoff() {
    return this.kind === 'flat'
      ? 'Wider plates can cover broader sections but reduce precision. Missing voltage or control evidence never counts as a match.'
      : 'Clamp and wand formats change handling; barrel size is only one influence on the result.';
  }
  get guidePath() {
    return this.kind === 'flat'
      ? '/guides/best-flat-irons'
      : '/guides/best-curling-irons';
  }
  get matches() {
    const categories: ProductCategory[] =
      this.kind === 'flat'
        ? [ProductCategory.FlatIron]
        : [ProductCategory.CurlingIron, ProductCategory.CurlingWand];
    return productProfiles
      .filter((p) => categories.includes(p.category))
      .filter(
        (p) =>
          this.kind !== 'flat' ||
          this.answers[0] !== 'precision' ||
          (p.plateWidthInches ?? 9) <= 1,
      )
      .filter(
        (p) =>
          this.kind !== 'curling' ||
          this.answers[1] === 'varied' ||
          p.mechanism === this.answers[1],
      )
      .filter((p) => this.answers[2] !== 'general' || p.dualVoltage === true)
      .slice(0, 3);
  }
}
