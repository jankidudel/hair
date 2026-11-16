import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  Injectable,
  afterNextRender,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

export interface Turnstile {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      size: 'compact' | 'flexible';
      'response-field': false;
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ): string;
  reset(widget: string): void;
  remove(widget: string): void;
}

@Injectable({ providedIn: 'root' })
export class TurnstileService {
  private readonly document = inject(DOCUMENT);
  private loading?: Promise<Turnstile>;

  load(): Promise<Turnstile> {
    const browser = this.document.defaultView as Window & {
      turnstile?: Turnstile;
    };
    if (browser.turnstile) return Promise.resolve(browser.turnstile);
    return (this.loading ??= new Promise<Turnstile>((resolve, reject) => {
      const script = this.document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => {
        if (browser.turnstile) resolve(browser.turnstile);
        else reject(new Error('Turnstile did not load.'));
      };
      script.onerror = () => reject(new Error('Turnstile did not load.'));
      this.document.head.appendChild(script);
    }));
  }
}

@Component({
  selector: 'app-contact-turnstile',
  template: `
    <div #container></div>
    @if (failed()) {
      <p role="alert">
        The security check couldn’t load. Refresh to try again.
      </p>
    }
  `,
})
export class ContactTurnstileComponent {
  readonly siteKey = input.required<string>();
  readonly tokenChange = output<string>();
  readonly failed = signal(false);
  private readonly container =
    viewChild.required<ElementRef<HTMLElement>>('container');
  private readonly service = inject(TurnstileService);
  private readonly destroyRef = inject(DestroyRef);
  private widget?: { turnstile: Turnstile; id: string };

  constructor() {
    afterNextRender(() => void this.renderWidget());
    this.destroyRef.onDestroy(() =>
      this.widget?.turnstile.remove(this.widget.id),
    );
  }

  reset(): void {
    this.tokenChange.emit('');
    this.widget?.turnstile.reset(this.widget.id);
  }

  private async renderWidget(): Promise<void> {
    try {
      const turnstile = await this.service.load();
      if (this.destroyRef.destroyed) return;
      const element = this.container().nativeElement;
      const id = turnstile.render(element, {
        sitekey: this.siteKey(),
        action: 'contact',
        size: element.clientWidth < 300 ? 'compact' : 'flexible',
        'response-field': false,
        callback: (token) => {
          this.failed.set(false);
          this.tokenChange.emit(token);
        },
        'expired-callback': () => this.tokenChange.emit(''),
        'error-callback': () => {
          this.tokenChange.emit('');
          this.failed.set(true);
        },
      });
      this.widget = { turnstile, id };
    } catch {
      if (!this.destroyRef.destroyed) this.failed.set(true);
    }
  }
}
