import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { HeatProtectantFinderComponent } from './heat-protectant-finder.component';
import { heatProtectantDefaults } from './heat-protectant-recommendation';
function setup(ready = true) {
  TestBed.configureTestingModule({
    imports: [HeatProtectantFinderComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture = TestBed.createComponent(HeatProtectantFinderComponent);
  fixture.detectChanges();
  fixture.componentInstance.ready.set(ready);
  fixture.detectChanges();
  const el = fixture.nativeElement as HTMLElement;
  const change = (suffix: string, value: string) => {
    const select = el.querySelector(`[id$="-${suffix}"]`) as HTMLSelectElement;
    select.value = value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  };
  const submit = () => {
    el.querySelector('form')!.dispatchEvent(
      new Event('submit', { cancelable: true }),
    );
    fixture.detectChanges();
  };
  return { fixture, el, change, submit };
}
describe('Heat Protectant Finder', () => {
  it('starts with no result, real labels, static tutorial links and the exact defaults', () => {
    const { fixture, el } = setup();
    expect(fixture.componentInstance.answers).toEqual(heatProtectantDefaults);
    expect(el.querySelector('[aria-label="Your direction checks"]')).toBeNull();
    for (const label of Array.from(el.querySelectorAll('label')))
      expect(el.querySelector(`#${label.htmlFor}`)).not.toBeNull();
    expect(el.querySelectorAll('a')).toHaveLength(2);
    expect(el.textContent).not.toContain('Hair density');
  });
  it('submits, clears stale output after any field changes, then resets every choice', () => {
    const { fixture, el, change, submit } = setup();
    for (const [suffix, value] of [
      ['sequence', 'both'],
      ['application', 'dry'],
      ['directions', 'both'],
      ['finish', 'conditioned'],
    ]) {
      submit();
      expect(el.querySelector('h3')).not.toBeNull();
      change(suffix, value);
      expect(el.querySelector('h3')).toBeNull();
      expect(el.querySelector('[role="status"]')?.textContent).toContain(
        'Choices changed.',
      );
    }
    submit();
    expect(el.querySelector('h3')?.textContent).toBe(
      'Review coverage and readiness',
    );
    expect(
      el
        .querySelector('[aria-label="Your direction checks"]')
        ?.getAttribute('aria-live'),
    ).toBeNull();
    el.querySelector<HTMLButtonElement>('button[type="button"]')!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.answers).toEqual(heatProtectantDefaults);
    expect(el.querySelector('h3')).toBeNull();
    expect(el.querySelector('[role="status"]')?.textContent).toBe('');
    expect(
      Array.from(el.querySelectorAll('select')).map((s) => s.value),
    ).toEqual(['drying', 'unselected', 'unclear', 'none']);
  });
  it('keeps instances independent and IDs unique', () => {
    const first = setup();
    first.change('directions', 'dry');
    first.submit();
    const second = TestBed.createComponent(HeatProtectantFinderComponent);
    second.detectChanges();
    expect(second.componentInstance.answers).toEqual(heatProtectantDefaults);
    expect(second.componentInstance.result).toBeUndefined();
    expect(second.componentInstance.id).not.toBe(
      first.fixture.componentInstance.id,
    );
  });
  it('renders a useful no-JavaScript fallback without inactive form actions', () => {
    const { el } = setup(false);
    expect(el.querySelector('form')).toBeNull();
    expect(el.querySelector('button')).toBeNull();
    expect(el.textContent).toContain(
      'interactive direction checks need JavaScript',
    );
    expect(el.querySelector('a')?.getAttribute('href')).toBe(
      '/guides/how-to-apply-heat-protectant',
    );
  });
});
