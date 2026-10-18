import { Component, Input } from '@angular/core';
import type { DecisionSnapshotContent } from './decision-support';

@Component({
  selector: 'app-decision-snapshot',
  styleUrl: 'decision-snapshot.component.css',
  template: `
    <aside class="decision-snapshot" aria-labelledby="decision-snapshot-title">
      @if (content.heading) {
        <p class="eyebrow">{{ content.label ?? 'Decision snapshot' }}</p>
        <h2 id="decision-snapshot-title">{{ content.heading }}</h2>
      } @else {
        <h2 id="decision-snapshot-title" class="eyebrow">
          {{ content.label ?? 'Decision snapshot' }}
        </h2>
      }
      <p class="decision-intro">{{ content.intro }}</p>
      <dl>
        @for (row of content.rows; track row.label) {
          <div>
            <dt>{{ row.label }}</dt>
            <dd>{{ row.text }}</dd>
          </div>
        }
      </dl>
      @if (content.footer !== '') {
        <p class="decision-footer">
          {{
            content.footer ??
              'Check the exact model, market and instructions before treating a published difference as a reason to buy.'
          }}
        </p>
      }
    </aside>
  `,
})
export class DecisionSnapshotComponent {
  @Input({ required: true }) content!: DecisionSnapshotContent;
}
