import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, it, expect } from 'vitest';
import { HeadFitWorksheetComponent } from './head-fit-worksheet.component';

function setup() {
  TestBed.configureTestingModule({
    imports: [HeadFitWorksheetComponent],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture = TestBed.createComponent(HeadFitWorksheetComponent);
  fixture.componentInstance.ready.set(true);
  fixture.detectChanges();
  const el = fixture.nativeElement as HTMLElement;
  const change = (head: number, key: string, value: string) => {
    const input = el.querySelector(
      '#' + fixture.componentInstance.controlId(head, key),
    ) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(
      new Event(input.tagName === 'SELECT' ? 'change' : 'input'),
    );
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
describe('head-fit worksheet', () => {
  it('preserves missing definitions and unchecked observations as unknown', () => {
    const { el, submit } = setup();
    submit();
    expect(el.querySelectorAll('tbody tr')).toHaveLength(7);
    expect(el.textContent).toContain(
      'Head A: establish what its size label describes.',
    );
    expect(el.textContent).toContain(
      'Head B: establish what its size label describes.',
    );
    expect(el.textContent).toContain(
      'No access or release observations are recorded yet.',
    );
    expect(el.querySelector('tbody')!.textContent).toContain('Not recorded');
  });
  it('compares unlike definitions and retains a release concern despite positive access', () => {
    const { el, change, submit } = setup();
    change(0, 'measurement', 'Round core diameter');
    change(0, 'shape', 'Oval');
    change(1, 'measurement', 'Outside bristle span');
    change(0, 'access', 'Reaches the intended area');
    change(0, 'release', 'Path needs review');
    submit();
    expect(el.textContent).toContain(
      'These records describe different measurement types.',
    );
    expect(el.textContent).toContain(
      'An oval head needs its measurement definition checked',
    );
    expect(el.textContent).toContain('Head A: settle the release path');
    expect(el.textContent).not.toContain(
      'No access or release observations are recorded yet.',
    );
  });
  it('invalidates old output on edits and clears every control and result', () => {
    const { el, change, submit, fixture } = setup();
    submit();
    change(0, 'model', 'Test brush US');
    expect(el.querySelector('tbody')).toBeNull();
    expect(el.querySelector('[role=status]')!.textContent).toContain(
      'Entries changed.',
    );
    submit();
    (el.querySelector('button[type=button]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelector('tbody')).toBeNull();
    expect((el.querySelector('input') as HTMLInputElement).value).toBe('');
    expect((el.querySelector('select') as HTMLSelectElement).value).toBe(
      'Not recorded',
    );
    expect(el.querySelector('[role=status]')!.textContent).toBe('');
  });
  it('renders user text inert and keeps instances independent with unique control IDs', () => {
    const first = setup();
    const second = TestBed.createComponent(HeadFitWorksheetComponent);
    second.componentInstance.ready.set(true);
    second.detectChanges();
    first.change(0, 'model', '<img src=x onerror=alert(1)>');
    first.submit();
    expect(first.el.querySelector('tbody')!.textContent).toContain(
      '<img src=x onerror=alert(1)>',
    );
    expect(first.el.querySelector('img')).toBeNull();
    expect(second.componentInstance.heads[0]['model']).toBe('');
    expect(second.componentInstance.notes).toBeNull();
    const ids = [
      ...Array.from(first.el.querySelectorAll('input,select')),
      ...Array.from(
        (second.nativeElement as HTMLElement).querySelectorAll('input,select'),
      ),
    ].map((e) => e.id);
    expect(new Set(ids).size).toBe(28);
  });
  it('provides static fallback and links before the form is activated', () => {
    const { fixture, el } = setup();
    fixture.componentInstance.ready.set(false);
    fixture.detectChanges();
    expect(el.querySelector('form')).toBeNull();
    expect(el.textContent).toContain(
      'Compare the measurement types in the table above',
    );
    expect(el.querySelectorAll('a')).toHaveLength(3);
  });
});
