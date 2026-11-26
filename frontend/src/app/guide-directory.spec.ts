import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { AnalyticsService } from './analytics/analytics.service';
import { articles } from './content-index.generated';
import { StaticPageComponent } from './static-page.component';

async function renderDirectory() {
  TestBed.configureTestingModule({
    imports: [StaticPageComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { data: { page: 'guides' } } },
      },
      { provide: AnalyticsService, useValue: { track: () => undefined } },
    ],
  });
  const fixture = TestBed.createComponent(StaticPageComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  const page: HTMLElement = fixture.nativeElement;
  const input = page.querySelector<HTMLInputElement>('#guide-search')!;
  const search = async (value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
  };
  return { fixture, page, input, search };
}

// Each test renders every guide card (one per published guide) in jsdom.
// That takes under a second alone but can pass 5 s in the full parallel
// suite on a loaded machine, so allow more time than the default.
describe('guide directory', { timeout: 20_000 }, () => {
  it('puts a labelled full search before the results and secondary panels', async () => {
    const { page, input } = await renderDirectory();
    const label = page.querySelector('label[for="guide-search"]')!;
    expect(label.textContent?.trim()).toBe('Search guides');
    expect(input.placeholder).toBe('Search by tool, model or hair concern');
    const results = page.querySelector('.guides-grid')!;
    const secondary = page.querySelector('.guide-secondary')!;
    const follows = (a: Node, b: Node) =>
      !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    expect(follows(input, results)).toBe(true);
    expect(follows(results, secondary)).toBe(true);
    // Every published guide stays linked without searching or clicking.
    expect(results.querySelectorAll('a.guide-card')).toHaveLength(
      articles.length,
    );
    expect(page.querySelector('.guide-search-clear')).toBeNull();
  });

  it('shows a recovery message for no matches and clears back to every guide', async () => {
    const { page, input, search, fixture } = await renderDirectory();
    await search('zzzz-no-matching-guide');
    expect(page.querySelector('.guides-grid')).toBeNull();
    expect(page.querySelector('.guide-empty-state')?.textContent).toContain(
      'No guides found. Try a tool name, model or hair concern',
    );
    expect(page.querySelector('#guide-result-count')?.textContent).toContain(
      `0 of ${articles.length} guides match`,
    );
    page.querySelector<HTMLButtonElement>('.guide-search-clear')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.value).toBe('');
    expect(document.activeElement === input || !input.isConnected).toBe(true);
    expect(page.querySelectorAll('a.guide-card')).toHaveLength(articles.length);
  });

  it('filters by model name and reports the match count politely', async () => {
    const { page, search } = await renderDirectory();
    await search('Airwrap');
    const count = page.querySelector('#guide-result-count')!;
    expect(count.getAttribute('aria-live')).toBe('polite');
    const shown = page.querySelectorAll('a.guide-card').length;
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(articles.length);
    expect(count.textContent).toContain(`${shown} of ${articles.length}`);
  });
});
