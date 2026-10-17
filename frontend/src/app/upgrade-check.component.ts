import { Component, ElementRef, ViewChild } from '@angular/core';

export interface UpgradeResult {
  readonly heading: string;
  readonly text: string;
}

export const upgradeResults: Readonly<Record<number, UpgradeResult>> = {
  0: {
    heading: 'No replacement case yet',
    text: 'Start with the task your current tool cannot perform. If there is no missing task, keep the tool you have.',
  },
  1: {
    heading: 'One useful question, with gaps remaining',
    text: 'You have identified one part of the decision. Check the exact published difference and whether it changes a task you actually perform.',
  },
  2: {
    heading: 'The comparison is still incomplete',
    text: 'Confirm the exact model and package, then decide whether the different controls or parts fit your routine.',
  },
  3: {
    heading: 'A reason to change is taking shape',
    text: 'One check remains. Resolve it before treating the alternative as a practical upgrade.',
  },
  4: {
    heading: 'You have a documented purchase case',
    text: 'The alternative appears to address a task gap you identified. Recheck the current local listing and return terms before buying.',
  },
};

@Component({
  selector: 'app-upgrade-check',
  styleUrl: 'upgrade-check.component.css',
  template: `
    <section class="upgrade-check" aria-labelledby="upgrade-check-title">
      <p class="eyebrow">Before you replace a working tool</p>
      <h2 id="upgrade-check-title">Is there a documented reason to change?</h2>
      <p>
        Tick each statement only when the article or exact product source
        supports it.
      </p>
      <p class="result-note">
        Your answers stay in this page session and are not used to build a
        personal profile.
      </p>
      <fieldset>
        <legend class="visually-hidden">Documented purchase checks</legend>
        @for (question of questions; track question; let index = $index) {
          <label>
            <input
              #answerCheckbox
              type="checkbox"
              [checked]="answers[index]"
              (change)="setAnswer(index, answerCheckbox.checked)"
            />
            <span>{{ question }}</span>
          </label>
        }
      </fieldset>
      <div class="upgrade-actions">
        <button
          type="button"
          class="button"
          [disabled]="checkedCount === 0"
          (click)="review()"
        >
          Review my purchase case
        </button>
        <button type="button" class="secondary-button" (click)="clear()">
          Clear answers
        </button>
      </div>
      @if (pending) {
        <p class="pending" role="status">Answers changed — review again.</p>
      }
      <div class="upgrade-result" aria-live="polite">
        <h3 #resultHeading tabindex="-1">{{ result.heading }}</h3>
        <p>{{ result.text }}</p>
        <p class="result-note">
          This checklist organises your decision. It does not test products or
          predict results.
        </p>
      </div>
    </section>
  `,
})
export class UpgradeCheckComponent {
  @ViewChild('answerCheckbox', { read: ElementRef })
  firstCheckbox?: ElementRef<HTMLInputElement>;
  @ViewChild('resultHeading', { read: ElementRef })
  resultHeading?: ElementRef<HTMLHeadingElement>;

  readonly questions = [
    'My current tool cannot perform a task I actually repeat.',
    'The alternative has a published difference that addresses that task.',
    'I checked the exact model, market, plug or voltage where relevant, and box contents.',
    'I am willing to use and store the different controls, attachments or parts.',
  ] as const;
  answers = [false, false, false, false];
  reviewedCount = 0;
  pending = false;

  get checkedCount(): number {
    return this.answers.filter(Boolean).length;
  }

  get result(): UpgradeResult {
    return upgradeResults[this.reviewedCount];
  }

  setAnswer(index: number, checked: boolean): void {
    this.answers = this.answers.map((value, itemIndex) =>
      itemIndex === index ? checked : value,
    );
    this.pending = this.reviewedCount > 0;
  }

  review(): void {
    if (this.checkedCount === 0) return;
    this.reviewedCount = this.checkedCount;
    this.pending = false;
    this.resultHeading?.nativeElement.focus();
  }

  clear(): void {
    this.answers = [false, false, false, false];
    this.reviewedCount = 0;
    this.pending = false;
    this.firstCheckbox?.nativeElement.focus();
  }
}
