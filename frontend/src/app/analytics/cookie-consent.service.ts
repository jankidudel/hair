import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

export type CookieConsentChoice = 'accepted' | 'rejected';
const storageKey = 'combreport_cookie_consent_v1';

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly browserReady = signal(false);
  private readonly choice = signal<CookieConsentChoice | null>(
    this.readStoredChoice(),
  );
  readonly bannerVisible = computed(
    () => this.browserReady() && this.choice() === null,
  );
  readonly analyticsAllowed = computed(() => this.choice() === 'accepted');

  constructor() {
    afterNextRender(() => this.browserReady.set(true));
  }
  accept(): void {
    this.saveChoice('accepted');
  }
  reject(): void {
    this.saveChoice('rejected');
  }
  changeChoice(): void {
    this.choice.set(null);
    if (this.isBrowser) localStorage.removeItem(storageKey);
  }
  private readStoredChoice(): CookieConsentChoice | null {
    if (!this.isBrowser) return null;
    const choice = localStorage.getItem(storageKey);
    return choice === 'accepted' || choice === 'rejected' ? choice : null;
  }
  private saveChoice(choice: CookieConsentChoice): void {
    this.choice.set(choice);
    if (this.isBrowser) localStorage.setItem(storageKey, choice);
  }
}
