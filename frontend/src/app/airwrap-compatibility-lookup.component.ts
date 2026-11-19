import { Component, inject } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';
import {
  airwrapAttachmentLabels,
  airwrapBodyLabels,
  airwrapFit,
  type AirwrapAttachmentFamily,
  type AirwrapBodyFamily,
  type AirwrapFitAnswer,
} from './airwrap-compatibility';

@Component({
  selector: 'app-airwrap-compatibility-lookup',
  styleUrl: 'airwrap-compatibility-lookup.component.css',
  template: `
    <section
      class="finder-card airwrap-lookup"
      aria-labelledby="airwrap-lookup-heading"
    >
      <p class="eyebrow">Compatibility lookup</p>
      <h2 id="airwrap-lookup-heading">Check an Airwrap body and attachment</h2>
      <p>
        Choose the body you own and the attachment family you want to use. The
        answer matches the matrix in the article, which stays complete without
        this tool. No serial number or account is needed.
      </p>
      <div class="lookup-fields">
        <label for="airwrap-body"
          >Your Airwrap body
          <select id="airwrap-body" (change)="setBody($event)">
            <option value="" [selected]="!body">Choose a body</option>
            @for (option of bodyOptions; track option.value) {
              <option [value]="option.value" [selected]="option.value === body">
                {{ option.label }}
              </option>
            }
          </select>
        </label>
        <label for="airwrap-attachment"
          >Attachment you want to use
          <select id="airwrap-attachment" (change)="setAttachment($event)">
            <option value="" [selected]="!attachment">
              Choose an attachment
            </option>
            @for (option of attachmentOptions; track option.value) {
              <option
                [value]="option.value"
                [selected]="option.value === attachment"
              >
                {{ option.label }}
              </option>
            }
          </select>
        </label>
      </div>
      <div class="lookup-result" aria-live="polite">
        @if (result) {
          <p class="lookup-status" [attr.data-status]="result.status">
            {{ result.statusLabel }}
          </p>
          <p>{{ result.answer }}</p>
          <p><strong>Next check:</strong> {{ result.nextCheck }}</p>
        } @else {
          <p>Choose both options to see the documented answer.</p>
        }
      </div>
    </section>
  `,
})
export class AirwrapCompatibilityLookupComponent {
  private readonly analytics = inject(AnalyticsService);
  readonly bodyOptions = Object.entries(airwrapBodyLabels).map(
    ([value, label]) => ({ value: value as AirwrapBodyFamily, label }),
  );
  readonly attachmentOptions = Object.entries(airwrapAttachmentLabels).map(
    ([value, label]) => ({ value: value as AirwrapAttachmentFamily, label }),
  );
  body?: AirwrapBodyFamily;
  attachment?: AirwrapAttachmentFamily;
  result?: AirwrapFitAnswer;

  setBody(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.body = value ? (value as AirwrapBodyFamily) : undefined;
    this.update();
  }

  setAttachment(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.attachment = value ? (value as AirwrapAttachmentFamily) : undefined;
    this.update();
  }

  private update(): void {
    this.result =
      this.body && this.attachment
        ? airwrapFit(this.body, this.attachment)
        : undefined;
    if (this.result)
      this.analytics.track('airwrap_compatibility_lookup', {
        status: this.result.status,
      });
  }
}
