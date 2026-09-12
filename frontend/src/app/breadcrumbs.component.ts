import { Component, ViewEncapsulation, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Breadcrumb {
  readonly label: string;
  readonly path?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  encapsulation: ViewEncapsulation.None,
  styleUrl: 'breadcrumbs.component.css',
  template: `<nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      @for (item of items(); track item.label; let last = $last) {
        <li>
          @if (last) {
            <span aria-current="page">{{ item.label }}</span>
          } @else {
            <a [routerLink]="item.path">{{ item.label }}</a>
          }
        </li>
      }
    </ol>
  </nav>`,
})
export class BreadcrumbsComponent {
  readonly items = input.required<readonly Breadcrumb[]>();
}
