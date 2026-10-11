import { Component } from '@angular/core';
import {
  recommendRoundBrushSize,
  type RoundBrushLength,
  type RoundBrushGoal,
  type RoundBrushDensity,
} from './round-brush-size-recommendation';

@Component({
  selector: 'app-round-brush-size-finder',
  styleUrl: 'round-brush-size-finder.component.css',
  template: ` <section
    class="finder-card round-brush-finder"
    aria-labelledby="round-brush-finder-heading"
  >
    <p class="eyebrow">Practical chooser</p>
    <h2 id="round-brush-finder-heading">Round Brush Size Finder</h2>
    <p>
      Choose the closest match. The written table below remains the useful
      starting point if you prefer not to use this tool.
    </p>
    <div class="finder-options">
      <label
        >Hair length
        <select
          [value]="length"
          (change)="setLength($any($event.target).value)"
        >
          <option value="" disabled>Select a length</option>
          <option value="short">Short</option>
          <option value="bob">Bob or shoulder length</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select></label
      >
      <label
        >Desired result
        <select [value]="goal" (change)="setGoal($any($event.target).value)">
          <option value="" disabled>Select a result</option>
          <option value="lift">Root lift</option>
          <option value="smooth">Smooth blowout</option>
          <option value="bend">Loose bend</option>
          <option value="curl">Defined curl</option>
        </select></label
      >
      <label
        >Hair density
        <select
          [value]="density"
          (change)="setDensity($any($event.target).value)"
        >
          <option value="" disabled>Select a density</option>
          <option value="fine">Low density</option>
          <option value="medium">Medium density</option>
          <option value="thick">High density</option>
        </select></label
      >
    </div>
    @if (result) {
      <p class="finder-rationale" aria-live="polite">
        <strong>{{ result.size }}</strong> — {{ result.reason }}
        {{ result.adjustment }}
        <a href="/guides/how-to-use-a-round-brush-with-a-hair-dryer"
          >Practise the section and release</a
        >.
      </p>
    } @else {
      <p class="finder-rationale">
        Select all three inputs for a practical starting point. The guide below
        explains the geometry without a number.
      </p>
    }
  </section>`,
})
export class RoundBrushSizeFinderComponent {
  length: RoundBrushLength | '' = '';
  goal: RoundBrushGoal | '' = '';
  density: RoundBrushDensity | '' = '';
  result: ReturnType<typeof recommendRoundBrushSize> = null;
  setLength(value: RoundBrushLength | ''): void {
    this.length = value;
    this.update();
  }
  setGoal(value: RoundBrushGoal | ''): void {
    this.goal = value;
    this.update();
  }
  setDensity(value: RoundBrushDensity | ''): void {
    this.density = value;
    this.update();
  }
  update(): void {
    this.result = recommendRoundBrushSize(this.length, this.goal, this.density);
  }
}
