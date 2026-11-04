import { Component, Input } from '@angular/core';

export interface PathwayGroup {
  readonly label: string;
  readonly description: string;
  readonly links: readonly { readonly label: string; readonly path: string }[];
}

@Component({
  selector: 'app-choose-use-fix-pathways',
  styleUrl: 'choose-use-fix-pathways.component.css',
  template: `
    <nav class="pathways" aria-labelledby="pathways-heading">
      <p class="eyebrow">Start with the job in front of you</p>
      <h2 id="pathways-heading">Choose, use or fix a tool</h2>
      <div class="pathway-grid">
        @for (group of groups; track group.label) {
          <section>
            <h3>{{ group.label }}</h3>
            <p>{{ group.description }}</p>
            <ul>
              @for (link of group.links; track link.label) {
                <li>
                  <a [href]="link.path">{{ link.label }}</a>
                </li>
              }
            </ul>
          </section>
        }
      </div>
      <ng-content />
    </nav>
  `,
})
export class ChooseUseFixPathwaysComponent {
  @Input({ required: true }) groups: readonly PathwayGroup[] = [];
}
