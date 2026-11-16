import { Component, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  contactFields,
  contactReasons,
  validateContact,
  type ContactField,
  type ContactFieldErrors,
} from '../../../api/src/contact-fields.js';
import { CONTACT_FORM_PREVIEW } from './contact-config';
import { SiteSeoService } from './site-seo.service';

@Component({
  imports: [RouterLink],
  styleUrl: 'contact-page.component.css',
  templateUrl: 'contact-page.component.html',
})
export class ContactPageComponent {
  readonly preview = inject(CONTACT_FORM_PREVIEW);
  readonly reasons = Object.entries(contactReasons);
  readonly formAvailable = signal(false);
  readonly sending = signal(false);
  readonly errors = signal<ContactFieldErrors>({});
  readonly status = signal('');
  readonly failure = signal('');

  constructor() {
    inject(SiteSeoService).set(
      'Contact & Corrections | Comb Report',
      'Report a correction, share a source, suggest a guide or contact Comb Report about a business enquiry.',
      '/contact',
    );
    afterNextRender(() => this.formAvailable.set(true));
  }

  fieldError(field: ContactField): string | null {
    return this.errors()[field] ?? null;
  }

  clearError(field: ContactField): void {
    if (this.errors()[field]) {
      this.errors.update((current) => ({ ...current, [field]: undefined }));
    }
  }

  async submit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    if (this.sending() || !this.formAvailable()) return;

    const form = event.currentTarget as HTMLFormElement;
    const values = new FormData(form);
    const checked = validateContact({
      reason: String(values.get('reason') ?? ''),
      name: String(values.get('name') ?? ''),
      email: String(values.get('email') ?? ''),
      link: String(values.get('link') ?? ''),
      message: String(values.get('message') ?? ''),
    });
    this.errors.set({});
    this.status.set('');
    this.failure.set('');
    if ('errors' in checked) {
      this.showFieldErrors(form, checked.errors);
      return;
    }
    if (this.preview) {
      this.status.set(
        'Form validation passed. Preview submissions stay in this browser.',
      );
      return;
    }

    this.sending.set(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...checked.message,
          website: values.get('website') ?? '',
        }),
        signal: AbortSignal.timeout(12000),
      });
      if (response.status === 429) {
        this.failure.set('Too many messages were submitted. Try again later.');
        return;
      }
      if (![200, 400].includes(response.status)) throw new Error();
      const result = await response.json();
      if (response.ok && result?.ok === true) {
        form.reset();
        this.status.set('Thanks. Your message was sent.');
      } else if (response.status === 400 && result?.errors) {
        const errors: ContactFieldErrors = {};
        for (const field of contactFields) {
          const message = result.errors[field];
          if (typeof message === 'string') errors[field] = message;
        }
        if (!Object.keys(errors).length) throw new Error();
        this.showFieldErrors(form, errors);
      } else {
        throw new Error();
      }
    } catch {
      this.failure.set(
        'We couldn’t confirm that your message was sent. Please try again later.',
      );
    } finally {
      this.sending.set(false);
    }
  }

  private showFieldErrors(
    form: HTMLFormElement,
    errors: ContactFieldErrors,
  ): void {
    this.errors.set(errors);
    // Let Angular render the descriptions and re-enable the fields before focus.
    requestAnimationFrame(() => {
      const first = contactFields.find((field) => errors[field]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    });
  }
}
