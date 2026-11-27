import {
  ChangeDetectorRef,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { HairToolManualFinderComponent } from './hair-tool-manual-finder.component';
import {
  lookupManual,
  manualRecords,
  normaliseModelCode,
} from './hair-tool-manuals';

describe('hair tool manual records', () => {
  it('launches with at least 12 dated records from at least four makers', () => {
    expect(manualRecords.length).toBeGreaterThanOrEqual(12);
    expect(
      new Set(manualRecords.map((record) => record.maker)).size,
    ).toBeGreaterThanOrEqual(4);
    for (const record of manualRecords) {
      expect(record.checkedDate).toBe('26 November 2026');
      expect(record.documents.length).toBeGreaterThan(0);
      for (const doc of record.documents)
        expect(doc.url).toMatch(/^https:\/\//);
    }
  });

  it('trims spaces and ignores case', () => {
    expect(normaliseModelCode('  hd 16 ')).toBe('hd16');
    const result = lookupManual('UK', ' hd16 ');
    expect(result.kind).toBe('exact');
    if (result.kind === 'exact') {
      expect(result.records[0].code).toBe('HD16');
      expect(result.records[0].documents[0].url).toContain(
        'HD16_OUG_MASTER.pdf',
      );
    }
  });

  it('opens the exact HD07 UK PDF', () => {
    const result = lookupManual('UK', 'HD07');
    expect(result.kind === 'exact' && result.records[0].documents[0].pdf).toBe(
      true,
    );
  });

  it('shows a US record as separate evidence for a UK HD430 query', () => {
    const result = lookupManual('UK', 'HD430');
    expect(result.kind).toBe('other-market');
    if (result.kind === 'other-market')
      expect(result.records.every((record) => record.market === 'US')).toBe(
        true,
      );
  });

  it('asks for a market when the code exists in two markets and the market is unknown', () => {
    expect(lookupManual('unsure', 'Airwrap i.d.').kind).toBe('choose-market');
  });

  it('offers suggestions for an ambiguous partial code and nothing for an unknown one', () => {
    const partial = lookupManual('UK', 'HD4');
    expect(partial.kind).toBe('suggestions');
    expect(lookupManual('UK', 'ZZ9999').kind).toBe('none');
    expect(lookupManual('UK', '   ').kind).toBe('empty');
  });
});

describe('HairToolManualFinderComponent', () => {
  function refresh(fixture: {
    componentRef: {
      injector: { get: (token: typeof ChangeDetectorRef) => ChangeDetectorRef };
    };
    detectChanges: () => void;
  }) {
    fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
  }
  function setup() {
    TestBed.configureTestingModule({
      imports: [HairToolManualFinderComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
    const fixture = TestBed.createComponent(HairToolManualFinderComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('renders one H1, the default status and the static source list without input', () => {
    const element = setup().nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('[role="status"]')?.textContent).toContain(
      'Enter a model code or browse the manufacturer links below.',
    );
    expect(
      element.querySelectorAll('.manual-source-list a').length,
    ).toBeGreaterThanOrEqual(12);
    expect(element.textContent).toContain('HD16');
  });

  it('announces an exact match and a mismatched market', () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    component.setMarket('UK');
    component.code = 'hd16';
    component.search();
    refresh(fixture);
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[role="status"]')?.textContent).toContain(
      'Official documents for Dyson Supersonic Nural hair dryer (UK).',
    );
    component.code = 'HD430';
    component.search();
    refresh(fixture);
    expect(element.querySelector('[role="status"]')?.textContent).toContain(
      'separate evidence',
    );
    expect(element.querySelector('.manual-card.other-market')).not.toBeNull();
  });

  it('writes a plain-text result heading that also names the result region', () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    const element = fixture.nativeElement as HTMLElement;
    const heading = () =>
      element.querySelector('#manual-results-heading')?.textContent?.trim();
    const regionName = () => {
      const region = element.querySelector('section.manual-records');
      const id = region?.getAttribute('aria-labelledby');
      return id ? element.querySelector(`#${id}`)?.textContent?.trim() : null;
    };
    component.setMarket('UK');
    component.code = '  hd16 ';
    component.search();
    refresh(fixture);
    expect(heading()).toBe(
      'Official documents for Dyson Supersonic Nural hair dryer (UK)',
    );
    expect(regionName()).toBe(heading());
    expect(
      element.querySelector<HTMLAnchorElement>(
        '.manual-card a[href$="HD16_OUG_MASTER.pdf"]',
      )?.textContent,
    ).toContain('User manual');
    component.code = 'HD430';
    component.search();
    refresh(fixture);
    expect(heading()).toBe('US record for HD430');
    expect(regionName()).toBe('US record for HD430');
    component.code = 'ZZ999';
    component.search();
    refresh(fixture);
    expect(element.querySelector('#manual-results-heading')).toBeNull();
    expect(element.querySelector('.manual-card')).toBeNull();
    expect(element.querySelector('#fallback-heading')).not.toBeNull();
    expect(element.textContent).not.toContain('[object');
  });

  it('requires explicit selection of a suggestion', () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    component.setMarket('UK');
    component.code = 'HD4';
    component.search();
    refresh(fixture);
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.manual-card')).toBeNull();
    (element.querySelector('.suggestion') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(element.querySelectorAll('.manual-card')).toHaveLength(1);
  });
});
