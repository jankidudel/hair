import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import {
  UpgradeCheckComponent,
  upgradeResults,
} from './upgrade-check.component';

describe('UpgradeCheckComponent', () => {
  function setup() {
    TestBed.configureTestingModule({
      imports: [UpgradeCheckComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(UpgradeCheckComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the four questions, privacy note and zero state before interaction', () => {
    const fixture = setup();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('input[type="checkbox"]')).toHaveLength(4);
    expect(element.querySelector('.upgrade-result h3')?.textContent).toBe(
      upgradeResults[0].heading,
    );
    expect(element.textContent).toContain(upgradeResults[0].text);
    expect(element.textContent).toContain(
      'This checklist organises your decision. It does not test products or predict results.',
    );
    expect(
      (element.querySelector('.button') as HTMLButtonElement).disabled,
    ).toBe(true);
  });

  it('returns the exact one, two, three and four-check results', () => {
    const fixture = setup();
    for (let count = 1; count <= 4; count += 1) {
      fixture.componentInstance.answers = [false, false, false, false];
      for (let index = 0; index < count; index += 1)
        fixture.componentInstance.setAnswer(index, true);
      fixture.componentInstance.review();
      expect(fixture.componentInstance.result).toEqual(upgradeResults[count]);
    }
  });

  it('marks reviewed answers as pending after a change', () => {
    const fixture = setup();
    fixture.componentInstance.setAnswer(0, true);
    fixture.componentInstance.review();
    fixture.componentInstance.setAnswer(1, true);
    expect(fixture.componentInstance.pending).toBe(true);
  });

  it('moves focus to the result on review and back to the first checkbox on clear', () => {
    const fixture = setup();
    const element = fixture.nativeElement as HTMLElement;
    const first = element.querySelector('input') as HTMLInputElement;
    first.checked = true;
    first.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    (element.querySelector('.button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(document.activeElement).toBe(
      element.querySelector('.upgrade-result h3'),
    );
    (element.querySelector('.secondary-button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(document.activeElement).toBe(first);
    expect(fixture.componentInstance.answers).toEqual([
      false,
      false,
      false,
      false,
    ]);
    expect(fixture.componentInstance.result).toEqual(upgradeResults[0]);
  });
});
