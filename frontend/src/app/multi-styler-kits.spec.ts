import {
  ChangeDetectorRef,
  provideZonelessChangeDetection,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { MultiStylerKitComparisonComponent } from './multi-styler-kit-comparison.component';
import {
  kitById,
  kitRoles,
  kitsForMarket,
  multiStylerKits,
  reconcileKitSelection,
  summariseKit,
} from './multi-styler-kits';

describe('multi-styler kit records', () => {
  it('starts with five UK and three US exact kits, each with a source and date', () => {
    expect(kitsForMarket('UK')).toHaveLength(5);
    expect(kitsForMarket('US')).toHaveLength(3);
    for (const kit of multiStylerKits) {
      expect(kit.sourceUrl).toMatch(/^https:\/\//);
      expect(kit.checkedDate).toMatch(/\d{4}$/);
      for (const role of kitRoles) expect(kit.roles[role]).toBeDefined();
    }
  });

  it('compares UK HD446UK and HD652SUK without inventing FlexFusion contents', () => {
    const hd446 = kitById('shark-hd446uk')!;
    const hd652 = kitById('shark-hd652suk')!;
    expect(hd446.roles.diffuser.status).toBe('included');
    expect(hd652.roles['ceramic-straightening'].status).toBe('unconfirmed');
    expect(summariseKit(hd446, ['diffuser', 'airflow-curling'])).toBe(
      'all-included',
    );
    expect(summariseKit(hd652, ['diffuser'])).toBe('unconfirmed');
  });

  it('keeps the US HD430 diffuser outside Included and shows no optional part', () => {
    const hd430 = kitById('shark-hd430-us')!;
    expect(hd430.roles.diffuser.status).toBe('not-listed');
    expect(hd430.optional ?? []).toHaveLength(0);
    expect(summariseKit(hd430, ['diffuser'])).toBe('missing');
  });

  it('reports both missing and unconfirmed roles, and an optional part never counts as included', () => {
    const dysonUs = kitById('dyson-airwrap-id-us-plum-copper')!;
    expect(summariseKit(dysonUs, ['diffuser', 'smoothing-brush'])).toBe(
      'missing-and-unconfirmed',
    );
    const t3 = kitById('t3-aire-360-dv-us')!;
    expect(t3.optional?.[0].role).toBe('diffuser');
    expect(summariseKit(t3, ['diffuser'])).toBe('missing');
    expect(summariseKit(t3, [])).toBeUndefined();
  });

  it('clears other-market selections and rejects a duplicate', () => {
    expect(
      reconcileKitSelection('UK', ['shark-hd430-us', 'shark-hd446uk']),
    ).toEqual([undefined, 'shark-hd446uk']);
    expect(
      reconcileKitSelection('US', ['shark-hd430-us', 'shark-hd430-us']),
    ).toEqual(['shark-hd430-us', undefined]);
  });
});

describe('MultiStylerKitComparisonComponent', () => {
  function setup() {
    TestBed.configureTestingModule({
      imports: [MultiStylerKitComparisonComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(MultiStylerKitComparisonComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('waits for a market before enabling the kit selects', () => {
    const element = setup().nativeElement as HTMLElement;
    expect(element.querySelector('.kit-status')?.textContent).toContain(
      'Choose UK or US',
    );
    expect(
      (element.querySelector('#kit-select-0') as HTMLSelectElement).disabled,
    ).toBe(true);
  });

  it('compares US HD430 and the US Airwrap i.d., then clears both when the market changes', () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    component.setMarket('US');
    component.selection = ['shark-hd430-us', 'dyson-airwrap-id-us-plum-copper'];
    component.toggleRole('diffuser');
    fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.kit-table thead th')).toHaveLength(3);
    expect(element.querySelector('.kit-status')?.textContent).toContain(
      'At least one selected role is not listed in this box',
    );
    expect(element.textContent).not.toMatch(
      /the winner|best kit|ranked first/i,
    );
    component.setMarket('UK');
    fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
    expect(component.selectedKits).toHaveLength(0);
    expect(element.querySelector('.kit-table')).toBeNull();
  });
});
