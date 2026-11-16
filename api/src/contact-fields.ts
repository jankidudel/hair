export const contactReasons = {
  correction: 'Report a correction',
  source: 'Share a source',
  guide: 'Suggest a guide or comparison',
  business: 'Business enquiry',
  other: 'Something else',
} as const;

export const contactFields = [
  'reason',
  'name',
  'email',
  'link',
  'message',
] as const;
export type ContactField = (typeof contactFields)[number];
export type ContactFieldErrors = Partial<Record<ContactField, string>>;
export type ContactInput = Record<ContactField, string>;
type ContactMessage = ContactInput & { reason: keyof typeof contactReasons };

const headerControlCharacters = /\p{Cc}/u;
const messageControlCharacters = /[^\P{Cc}\t\r\n]/u;
const emailLocalPart =
  /^[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*$/i;
const emailDomain =
  /^(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)+[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?$/i;

export function isContactEmail(value: string): boolean {
  const [local, domain, extra] = value.split('@');
  return (
    value.length <= 254 &&
    local.length <= 64 &&
    extra === undefined &&
    emailLocalPart.test(local) &&
    emailDomain.test(domain ?? '')
  );
}

function isPageLink(link: string): boolean {
  if (!/^https?:\/\//i.test(link) || /[\s\\]/.test(link)) return false;
  try {
    const url = new URL(link);
    return !!url.hostname && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function validateContact(
  input: ContactInput,
): { message: ContactMessage } | { errors: ContactFieldErrors } {
  const reason = input.reason;
  const name = input.name.trim();
  const email = input.email.trim();
  const link = input.link.trim();
  const message = input.message.trim();
  const errors: ContactFieldErrors = {};

  if (!Object.hasOwn(contactReasons, reason))
    errors.reason = 'Choose a reason.';
  if (name.length > 100) {
    errors.name = 'Keep your name to 100 characters or fewer.';
  } else if (headerControlCharacters.test(input.name)) {
    errors.name = 'Enter a name without control characters.';
  }
  if (headerControlCharacters.test(input.email) || !isContactEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (
    headerControlCharacters.test(input.link) ||
    (link && (link.length > 2048 || !isPageLink(link)))
  ) {
    errors.link = 'Enter a full link starting with https:// or http://.';
  }
  if (!message) {
    errors.message = 'Enter a message.';
  } else if (message.length > 5000) {
    errors.message = 'Keep your message to 5,000 characters or fewer.';
  } else if (messageControlCharacters.test(input.message)) {
    errors.message = 'Enter a message without control characters.';
  }

  return Object.keys(errors).length
    ? { errors }
    : {
        message: {
          reason: reason as ContactMessage['reason'],
          name,
          email,
          link,
          message,
        },
      };
}
