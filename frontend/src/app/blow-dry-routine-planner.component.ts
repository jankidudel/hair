import { Component } from '@angular/core';

type Finish = 'everyday' | 'smooth' | 'volume' | 'waves';
type Length = 'short' | 'medium' | 'long';

interface RoutinePlan {
  readonly attachment: string;
  readonly steps: readonly string[];
  readonly note: string;
}

@Component({
  selector: 'app-blow-dry-routine-planner',
  styleUrl: 'blow-dry-routine-planner.component.css',
  template: `
    <section
      class="finder-card blow-dry-routine-planner"
      aria-labelledby="blow-dry-routine-planner-heading"
    >
      <p class="eyebrow">Practical planner</p>
      <h2 id="blow-dry-routine-planner-heading">Blow-Dry Routine Planner</h2>
      <p>
        Choose a finish and length for a simple sequence to try. It is a
        flexible starting point, so lower the setting or simplify a step when
        that makes the routine easier to control.
      </p>
      <div class="finder-options">
        <label
          >Finish you want
          <select
            [value]="finish"
            (change)="setFinish($any($event.target).value)"
          >
            <option value="everyday">An everyday dry</option>
            <option value="smooth">A smooth, directed finish</option>
            <option value="volume">More root lift</option>
            <option value="waves">Waves or curls left to settle</option>
          </select>
        </label>
        <label
          >Hair length
          <select
            [value]="length"
            (change)="setLength($any($event.target).value)"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </label>
      </div>
      <section
        class="routine-result"
        aria-live="polite"
        aria-label="Suggested blow-dry routine"
      >
        <h3>Use {{ plan.attachment }}</h3>
        <ol>
          @for (step of plan.steps; track step) {
            <li>{{ step }}</li>
          }
        </ol>
        <p><strong>Keep in mind:</strong> {{ plan.note }}</p>
      </section>
    </section>
  `,
})
export class BlowDryRoutinePlannerComponent {
  finish: Finish = 'everyday';
  length: Length = 'medium';
  plan = this.createPlan();

  setFinish(value: Finish): void {
    this.finish = value;
    this.update();
  }

  setLength(value: Length): void {
    this.length = value;
    this.update();
  }

  private update(): void {
    this.plan = this.createPlan();
  }

  private createPlan(): RoutinePlan {
    const section =
      this.length === 'long'
        ? 'smaller sections, starting underneath'
        : this.length === 'short'
          ? 'small, easy-to-direct sections around the crown and face'
          : 'manageable sections from underneath upward';

    if (this.finish === 'smooth')
      return {
        attachment:
          'a concentrator nozzle and a brush you can handle comfortably',
        steps: [
          'Begin with comfortably blotted hair and set the dryer to a controllable medium setting.',
          `Work through ${section}, keeping the nozzle pointed down the length of each section.`,
          'Lower the heat for the last passes, then let the finished section settle before moving it again.',
        ],
        note: 'Aim the airflow rather than brushing against a strong blast; control matters more than maximum heat.',
      };

    if (this.finish === 'volume')
      return {
        attachment:
          'a concentrator nozzle and a round brush if that feels comfortable',
        steps: [
          'Dry the roots first with moderate airflow, lifting only the section you are working on.',
          `Continue in ${section}, giving the root area a short, directed pass before the lengths.`,
          'Finish each section with lower heat or a cool shot if your dryer has one, then let it fall into place.',
        ],
        note: 'A smaller section is usually easier to lift and place than repeatedly passing over one large section.',
      };

    if (this.finish === 'waves')
      return {
        attachment: 'a compatible diffuser',
        steps: [
          'Begin with comfortably blotted hair and choose low or medium heat with low airflow.',
          `Gather ${this.length === 'long' ? 'a small section' : 'a manageable section'} into the diffuser bowl and pause instead of sweeping through it.`,
          'Move around the head in sections, then leave the finished hair to settle before rearranging it.',
        ],
        note: 'Keep the attachment secure and lower the airflow whenever it feels difficult to place calmly.',
      };

    return {
      attachment: 'the attachment that gives you the most control',
      steps: [
        'Begin with comfortably blotted hair and a modest heat and airflow setting.',
        `Dry in ${section}, moving on when each area is mostly dry rather than repeatedly passing over it.`,
        'Use a lower setting for any final passes and check only the areas that still need attention.',
      ],
      note: 'The simplest repeatable routine is useful: make one small adjustment at a time when you want a different finish.',
    };
  }
}
