import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  CONTACT_FORM_PREVIEW,
  CONTACT_TURNSTILE_SITE_KEY,
} from './contact-config';
import { ContactPageComponent } from './contact-page.component';
import {
  TurnstileService,
  type Turnstile,
} from './contact-turnstile.component';

describe('Contact Comb Report', () => {
  let completeChallenge: (token: string) => void;
  const resetChallenge = vi.fn();
  afterEach(() => {
    vi.unstubAllGlobals();
    resetChallenge.mockClear();
    TestBed.resetTestingModule();
  });

  async function render(preview = false) {
    TestBed.configureTestingModule({
      imports: [ContactPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: CONTACT_FORM_PREVIEW, useValue: preview },
        { provide: CONTACT_TURNSTILE_SITE_KEY, useValue: 'test-site-key' },
        {
          provide: TurnstileService,
          useValue: {
            load: async (): Promise<Turnstile> => ({
              render: (_element, options) => {
                expect(options.action).toBe('contact');
                completeChallenge = options.callback;
                return 'test-widget';
              },
              reset: resetChallenge,
              remove: () => undefined,
            }),
          },
        },
      ],
    });
    const fixture = TestBed.createComponent(ContactPageComponent);
    await fixture.whenStable();
    return fixture;
  }

  it('shows the contact form without exposing a destination address', async () => {
    const fixture = await render();
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('form')).not.toBeNull();
    expect(page.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(page.innerHTML).not.toMatch(/hello@(?:combreport|inspectmesh)\.com/);
  });

  it('shows and validates the local preview with no request to the contact API', async () => {
    const fetchContact = vi.fn<typeof fetch>();
    vi.stubGlobal('fetch', fetchContact);
    const fixture = await render(true);
    const page: HTMLElement = fixture.nativeElement;
    const form = page.querySelector('form')!;
    const submit = () =>
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    expect(form.querySelector('button')?.textContent).toContain('Test form');
    submit();
    await fixture.whenStable();
    expect(page.querySelector('#contact-email-error')).not.toBeNull();

    form.querySelector('select')!.value = 'correction';
    form.querySelector<HTMLInputElement>('#contact-email')!.value =
      'reader@example.com';
    form.querySelector('textarea')!.value = 'Please check the specification.';
    submit();
    await fixture.whenStable();
    expect(page.querySelector('[role="status"]')?.textContent).toContain(
      'Form validation passed',
    );
    expect(fetchContact).not.toHaveBeenCalled();
  });

  it('links field errors, blocks duplicate submissions and keeps values until success', async () => {
    const fetchContact = vi.fn<typeof fetch>();
    vi.stubGlobal('fetch', fetchContact);
    const fixture = await render();
    const page: HTMLElement = fixture.nativeElement;
    const form = page.querySelector('form')!;
    const submit = () =>
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    const reason = form.querySelector('select')!;
    const email = form.querySelector<HTMLInputElement>('#contact-email')!;
    const message = form.querySelector('textarea')!;
    const button = form.querySelector('button')!;
    submit();
    await fixture.whenStable();
    expect(fetchContact).not.toHaveBeenCalled();
    expect(reason.getAttribute('aria-describedby')).toBe(
      'contact-reason-error',
    );
    expect(page.querySelector('#contact-email-error')?.textContent).toBe(
      'Enter a valid email address.',
    );

    reason.value = 'correction';
    email.value = 'reader@example.com';
    message.value = 'Please check the specification.';
    submit();
    await fixture.whenStable();
    expect(fetchContact).not.toHaveBeenCalled();
    expect(page.textContent).toContain('Complete the security check');
    completeChallenge('first-token');
    let finish!: (response: Response) => void;
    fetchContact.mockReturnValueOnce(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    submit();
    submit();
    fixture.detectChanges();
    expect(fetchContact).toHaveBeenCalledTimes(1);
    expect(
      JSON.parse(String(fetchContact.mock.calls[0][1]?.body)).turnstileToken,
    ).toBe('first-token');
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Sending…');
    finish(new Response(null, { status: 429 }));
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(page.querySelector('[role="alert"]')?.textContent).toContain(
        'Too many messages',
      );
    });
    expect(message.value).toBe('Please check the specification.');
    expect(resetChallenge).toHaveBeenCalledTimes(1);

    fetchContact.mockResolvedValueOnce(new Response(null, { status: 503 }));
    completeChallenge('second-token');
    submit();
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(page.querySelector('[role="alert"]')?.textContent).toContain(
        'couldn’t confirm',
      );
    });
    expect(email.value).toBe('reader@example.com');

    fetchContact.mockResolvedValueOnce(Response.json({ ok: true }));
    completeChallenge('third-token');
    submit();
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(page.querySelector('[role="status"]')?.textContent).toContain(
        'Thanks. Your message was sent.',
      );
    });
    expect(reason.value).toBe('');
    expect(email.value).toBe('');
    expect(message.value).toBe('');
  });
});
