import { Component } from '@angular/core';

type Length = 'short' | 'bob' | 'medium' | 'long';
type Goal = 'lift' | 'smooth' | 'bend' | 'curl';
type Density = 'fine' | 'medium' | 'thick';

@Component({
  selector: 'app-round-brush-size-finder',
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
          <option value="short">Short</option>
          <option value="bob">Bob or shoulder length</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select></label
      >
      <label
        >Desired result
        <select [value]="goal" (change)="setGoal($any($event.target).value)">
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
          <option value="fine">Fine</option>
          <option value="medium">Medium</option>
          <option value="thick">Thick</option>
        </select></label
      >
    </div>
    <p class="finder-rationale">
      <strong>{{ result.size }} ({{ result.inches }})</strong> —
      {{ result.reason }} {{ result.adjustment }}
    </p>
  </section>`,
})
export class RoundBrushSizeFinderComponent {
  length: Length = 'bob';
  goal: Goal = 'smooth';
  density: Density = 'medium';
  result = this.recommend();
  setLength(value: Length): void {
    this.length = value;
    this.update();
  }
  setGoal(value: Goal): void {
    this.goal = value;
    this.update();
  }
  setDensity(value: Density): void {
    this.density = value;
    this.update();
  }
  update(): void {
    this.result = this.recommend();
  }
  private recommend() {
    const base: Record<Length, [number, number]> = {
      short: [19, 25],
      bob: [25, 35],
      medium: [35, 45],
      long: [45, 65],
    };
    let [low, high] = base[this.length];
    if (this.goal === 'lift' || this.goal === 'curl') {
      low -= 6;
      high -= 5;
    }
    if (this.goal === 'smooth') {
      low += 4;
      high += 5;
    }
    if (this.density === 'thick') high += 5;
    const roundedLow = Math.max(12, low);
    const roundedHigh = Math.max(19, high);
    return {
      size: `${roundedLow}–${roundedHigh} mm`,
      inches: `${(roundedLow / 25.4).toFixed(1)}–${(roundedHigh / 25.4).toFixed(1)} in`,
      reason:
        this.goal === 'smooth'
          ? 'A broader barrel keeps the result loose while guiding the length.'
          : this.goal === 'lift'
            ? 'A smaller barrel reaches close to the roots for more control.'
            : 'This range gives the section enough wrap for the shape you chose.',
      adjustment:
        this.density === 'thick'
          ? 'Size up within the range for wider sections; size down if control is more important.'
          : 'Size down for more bend or shorter face-framing pieces; size up for a looser finish.',
    };
  }
}
