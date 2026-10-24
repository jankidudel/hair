import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { handlingGuideCards } from './handling-guides';
@Component({
  selector: 'app-handling-routine-navigator',
  imports: [RouterLink],
  styleUrl: 'handling-routine-navigator.component.css',
  template: `<section
    class="handling-navigator"
    aria-labelledby="handling-navigator-heading"
  >
    <h2 id="handling-navigator-heading">
      Which handling step do you want help with?
    </h2>
    <p>
      Choose the task you want to perform. These are optional steps, not a
      routine you must complete from start to finish.
    </p>
    <div class="handling-grid">
      @for (card of cards; track card.slug) {
        <a class="handling-card" [routerLink]="['/guides', card.slug]"
          ><h3>{{ card.label }}</h3>
          <p>{{ card.description }}</p></a
        >
      }
    </div>
    <p class="handling-footer">
      A tool’s exact directions still govern wet use, heat and product
      compatibility.
    </p>
  </section>`,
})
export class HandlingRoutineNavigatorComponent {
  readonly cards = handlingGuideCards;
}
