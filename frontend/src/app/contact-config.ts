import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const CONTACT_FORM_PREVIEW = new InjectionToken<boolean>(
  'Contact form preview',
  { factory: () => environment.contactFormPreview },
);

export interface ContactFormPrivacy {
  readonly controller: string;
  readonly lawfulBasis: string;
  readonly mailboxProvider: string;
  readonly retention: string;
}

export const CONTACT_FORM_PRIVACY =
  new InjectionToken<ContactFormPrivacy | null>(
    'Confirmed contact form privacy details',
    {
      // Set the confirmed details after a deployed correction reaches the mailbox.
      factory: () => null,
    },
  );
