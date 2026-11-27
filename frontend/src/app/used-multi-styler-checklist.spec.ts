import {
  ChangeDetectorRef,
  provideZonelessChangeDetection,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { multiStylerKits } from './multi-styler-kits';
import { UsedMultiStylerChecklistWidgetComponent } from './used-multi-styler-checklist-widget.component';
import {
  UsedMultiStylerChecklistComponent,
  checklistReferenceList,
} from './used-multi-styler-checklist.component';
import {
  buildChecklist,
  questionsText,
  referenceById,
  referenceKits,
} from './used-multi-styler-checklist';

const hd430 = referenceById('us-flexstyle-hd430-stone')!;
const hd430ref = referenceById('us-flexstyle-hd430ref-beige')!;

describe('used multi-styler reference kits', () => {
  it('starts HD430 with two separate curler checks', () => {
    const curlers = hd430.items.filter((i) => i.roles.includes('curl'));
    expect(curlers.map((i) => i.name)).toEqual([
      '1¼-inch Auto-Wrap Curler (Curler 1)',
      '1¼-inch Auto-Wrap Curler (Curler 2)',
    ]);
  });

  it('leaves one curler question when one of two is shown', () => {
    const result = buildChecklist(hd430, ['curl'], {
      'main-unit': 'shown',
      'curler-1': 'shown',
    });
    const curlerQuestions = result.ask.filter((q) => /Curler/.test(q));
    expect(curlerQuestions).toEqual([
      'Ask to see the 1¼-inch Auto-Wrap Curler (Curler 2).',
    ]);
  });

  it('keeps HD430REF partial and does not inherit the HD430 box', () => {
    expect(hd430ref.complete).toBe(false);
    expect(hd430ref.items.map((i) => i.id)).toEqual([
      'main-unit',
      'curler-1',
      'curler-2',
    ]);
    const result = buildChecklist(hd430ref, ['smoothing'], {});
    expect(result.ask.join(' ')).toContain(
      'Maker only confirms some box contents',
    );
    expect(result.missing).toEqual([]);
  });

  it('turns a needed diffuser absent from the source into a seller question', () => {
    const result = buildChecklist(hd430, ['diffusing'], {});
    expect(result.missing).toEqual([]);
    expect(result.ask).toContain(
      'This reference kit doesn’t list diffusing. Ask what comes with the listing.',
    );
  });

  it('never reports an unneeded case as a missing essential', () => {
    const kit = referenceById('uk-airwrap-id-straight-wavy-patina-topaz')!;
    const result = buildChecklist(kit, ['curl'], { case: 'not-included' });
    expect(result.missing).toEqual([]);
    expect(result.other).toContain('Presentation case: not included.');
  });

  it('keeps retail, refurbished and different i.d. packs distinct', () => {
    const ids = referenceKits.map((k) => k.id);
    expect(new Set(ids).size).toBe(ids.length);
    const sw = referenceById('uk-airwrap-id-straight-wavy-patina-topaz')!;
    const diff = referenceById('uk-airwrap-id-diffuser-vinca-topaz')!;
    const refurb = referenceById(
      'uk-airwrap-id-diffuser-vinca-topaz-refurbished',
    )!;
    expect(sw.items.map((i) => i.name)).not.toEqual(
      diff.items.map((i) => i.name),
    );
    expect(diff.items.some((i) => i.name === 'Wave+Curl diffuser')).toBe(true);
    expect(sw.items.some((i) => i.name === 'Wave+Curl diffuser')).toBe(false);
    expect(refurb.packageType).toBe('Dyson refurbished kit');
    expect(refurb.source.url).not.toBe(diff.source.url);
  });

  it('writes copyable questions with exact names and a missing count', () => {
    const result = buildChecklist(hd430, ['curl', 'drying'], {
      'main-unit': 'shown',
      'curler-1': 'shown',
      concentrator: 'not-included',
    });
    expect(result.missing).toEqual(['Styling Concentrator']);
    const text = questionsText(result);
    expect(text).toContain('1¼-inch Auto-Wrap Curler (Curler 2)');
    expect(text).toContain('You can cover the serial number.');
    expect(text).toContain('I can’t see the Styling Concentrator');
    expect(text.split('\n').every((line) => line.startsWith('• '))).toBe(true);
  });

  it('links Kit Comparison records to existing checklist references', () => {
    for (const kit of multiStylerKits)
      if (kit.usedChecklistId)
        expect(referenceById(kit.usedChecklistId)?.market).toBe(kit.market);
  });
});

describe('UsedMultiStylerChecklistComponent (route shell)', () => {
  it('renders one H1 and the static demo without input', async () => {
    await TestBed.configureTestingModule({
      imports: [UsedMultiStylerChecklistComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(UsedMultiStylerChecklistComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.textContent).toContain('Demo listing:');
    for (const kit of referenceKits)
      expect(element.querySelector(`#kit-${kit.id}`)).not.toBeNull();
  });

  it('keeps the static reference list in step with the data', () => {
    expect(checklistReferenceList.map((k) => k.label)).toEqual(
      referenceKits.map(
        (k) => `${k.market} · ${k.name}, ${k.variant} · ${k.packageType}`,
      ),
    );
  });
});

describe('UsedMultiStylerChecklistWidgetComponent', () => {
  function setup() {
    TestBed.configureTestingModule({
      imports: [UsedMultiStylerChecklistWidgetComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
    const fixture = TestBed.createComponent(
      UsedMultiStylerChecklistWidgetComponent,
    );
    fixture.detectChanges();
    return fixture;
  }
  const refresh = (fixture: ReturnType<typeof setup>) => {
    fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
  };
  const choose = (
    component: UsedMultiStylerChecklistWidgetComponent,
    kitId: string,
  ) => component.setKit({ target: { value: kitId } } as unknown as Event);

  it('preserves observations per reference kit during the session', () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    component.setMarket('US');
    choose(component, 'us-flexstyle-hd430-stone');
    component.observe(hd430.items[1], 'shown');
    choose(component, 'us-flexstyle-hd430ref-beige');
    expect(component.observed(hd430ref.items[1])).toBe('cant-tell');
    choose(component, 'us-flexstyle-hd430-stone');
    expect(component.observed(hd430.items[1])).toBe('shown');
  });

  it('shows the demo result with grouped actions', () => {
    const fixture = setup();
    fixture.componentInstance.loadDemo();
    refresh(fixture);
    const element = fixture.nativeElement as HTMLElement;
    const result = element.querySelector('.checklist-result')!;
    expect(result.textContent).toContain('Missing pieces you want');
    expect(result.textContent).toContain('Styling Concentrator');
    expect(result.textContent).toContain('Shark FlexStyle HD430, Stone (US)');
    expect(
      element.querySelector<HTMLTextAreaElement>('.questions-text')?.value,
    ).toContain('Curler 2');
  });
});
