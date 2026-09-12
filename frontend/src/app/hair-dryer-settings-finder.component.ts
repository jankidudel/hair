import { Component } from '@angular/core';

type Routine = 'everyday' | 'smooth' | 'diffuser' | 'fringe';
type StartingPoint = 'wet' | 'mostly-dry';

@Component({
  selector: 'app-hair-dryer-settings-finder',
  styleUrl: 'hair-dryer-settings-finder.component.css',
  template: `
    <section
      class="finder-card hair-dryer-settings-finder"
      aria-labelledby="dryer-settings-finder-heading"
    >
      <p class="eyebrow">Practical chooser</p>
      <h2 id="dryer-settings-finder-heading">Hair Dryer Settings Finder</h2>
      <p>
        Choose a starting point for your next blow-dry. This is a comfort-led
        guide, not a fixed rule: adjust down whenever the air feels too hot or
        difficult to control.
      </p>
      <div class="finder-options">
        <label
          >What are you styling?
          <select
            [value]="routine"
            (change)="setRoutine($any($event.target).value)"
          >
            <option value="everyday">Everyday drying</option>
            <option value="smooth">A smooth brush-led blowout</option>
            <option value="diffuser">Curls or waves with a diffuser</option>
            <option value="fringe">
              A fringe or short face-framing pieces
            </option>
          </select>
        </label>
        <label
          >Starting point
          <select
            [value]="startingPoint"
            (change)="setStartingPoint($any($event.target).value)"
          >
            <option value="wet">Freshly washed / quite wet</option>
            <option value="mostly-dry">Mostly dry</option>
          </select>
        </label>
      </div>
      <p class="finder-rationale" aria-live="polite">
        <strong>{{ result.heading }}</strong> — {{ result.guidance }}
      </p>
    </section>
  `,
})
export class HairDryerSettingsFinderComponent {
  routine: Routine = 'everyday';
  startingPoint: StartingPoint = 'wet';
  result = this.recommend();

  setRoutine(value: Routine): void {
    this.routine = value;
    this.update();
  }

  setStartingPoint(value: StartingPoint): void {
    this.startingPoint = value;
    this.update();
  }

  private update(): void {
    this.result = this.recommend();
  }

  private recommend(): { heading: string; guidance: string } {
    if (this.routine === 'diffuser') {
      return {
        heading: 'Start with low or medium heat and low airflow',
        guidance:
          'Keep the diffuser settled near one section, then raise only the setting you need for comfortable progress. A slower airflow is usually easier to place without constantly moving the pattern around.',
      };
    }
    if (this.routine === 'fringe') {
      return {
        heading: 'Start with low heat and low airflow',
        guidance:
          'Short pieces dry quickly and are easier to direct with a modest setting. Use a nozzle if you need precision, keep it moving, and step up only if the section needs more airflow.',
      };
    }
    if (this.routine === 'smooth') {
      return {
        heading:
          this.startingPoint === 'wet'
            ? 'Start with medium heat and medium airflow'
            : 'Start with low or medium heat and medium airflow',
        guidance:
          'Work in manageable sections with a concentrator nozzle pointed down the length. Once a section is nearly dry, lower the heat for the finishing passes instead of repeatedly using maximum heat.',
      };
    }
    return {
      heading:
        this.startingPoint === 'wet'
          ? 'Start with medium heat and medium airflow'
          : 'Start with low heat and low or medium airflow',
      guidance:
        'Dry in sections at a pace you can control. Lower the setting as the hair becomes mostly dry, and use a cool shot only as a finishing option if your dryer has one.',
    };
  }
}
