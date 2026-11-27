import {
  ChangeDetectorRef,
  provideZonelessChangeDetection,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { HairToolSizeVisualiserWidgetComponent } from './hair-tool-size-visualiser-widget.component';
import {
  HairToolSizeVisualiserComponent,
  visualiserWorkedComparisons,
} from './hair-tool-size-visualiser.component';
import {
  buildMeasurement,
  compareMeasurements,
  comparisonPresets,
  formatLength,
  inputValue,
  parseLength,
  presetById,
  sizePresets,
} from './hair-tool-sizes';

describe('hair tool size data', () => {
  it('converts inches exactly and keeps canonical millimetres unrounded', () => {
    expect(parseLength('1.25', 'in')).toBe(31.75);
    expect(parseLength('1', 'in')).toBe(25.4);
    expect(parseLength('1 1/4', 'in')).toBe(31.75);
    expect(parseLength('1-1/4', 'in')).toBe(31.75);
    expect(parseLength('1¼', 'in')).toBe(31.75);
    expect(parseLength('2⅜', 'in')).toBeCloseTo(60.325, 9);
    expect(parseLength('3/8', 'in')).toBeCloseTo(9.525, 9);
    expect(parseLength('15', 'mm')).toBe(15);
    expect(parseLength('', 'mm')).toBeNull();
    expect(parseLength('abc', 'mm')).toBeNaN();
    expect(parseLength('1/4', 'mm')).toBeNaN();
  });

  it('round-trips field text between units without drift', () => {
    const mm = parseLength('1.25', 'in')!;
    expect(inputValue(mm, 'mm')).toBe('31.75');
    expect(inputValue(mm, 'in')).toBe('1.25');
    expect(inputValue(15, 'in')).toBe('0.5906');
    expect(inputValue(15, 'mm')).toBe('15');
  });

  it('keeps ghd’s published plate widths as separate figures', () => {
    const mini = presetById('ghd-mini')!;
    expect(mini.figures.map((f) => [f.basis, f.value])).toEqual([
      ['Listing overview', { kind: 'plate', width: 15 }],
      ['Listing FAQ', { kind: 'plate', width: 14.6 }],
      ['ghd compare table', { kind: 'plate', width: 15.3 }],
    ]);
    const max = presetById('ghd-chronos-max')!;
    expect(max.figures.map((f) => f.basis)).toEqual([
      'Listing heading',
      'Listing FAQ',
      'ghd compare table',
    ]);
  });

  it('keeps the NTXL-34 nominal 34 mm label apart from the 31.75 mm conversion', () => {
    const xl = presetById('og-ntxl-34')!;
    expect(xl.figures[0].value).toEqual({
      kind: 'brush',
      core: 31.75,
      bristle: 50.8,
    });
    expect(xl.figures[1].value).toEqual({ kind: 'brush', core: 34 });
    expect(xl.figures[1].basis).toContain('nominal');
  });

  it('compares a taper from each named end', () => {
    const conical = presetById('ghd-conical-wand')!.figures[0].value;
    const max = presetById('ghd-max-wand')!.figures[0].value;
    expect(compareMeasurements(conical, max, 'mm')).toEqual([
      'The 38 mm cylinder is 10 mm wider than the 28 mm end and 15 mm wider than the 23 mm end.',
    ]);
  });

  it('compares only like quantities for brushes', () => {
    expect(
      compareMeasurements(
        { kind: 'brush', core: 25.4 },
        { kind: 'brush', bristle: 50.8 },
        'mm',
      ),
    ).toEqual([
      'A and B state different measurements, so no difference is calculated.',
    ]);
  });

  it('validates manual input', () => {
    const none = new Set<never>();
    expect(buildMeasurement('plate', {}, none).errors.width).toBe(
      'Enter this measurement.',
    );
    expect(
      buildMeasurement('plate', { width: 0 }, none).errors.width,
    ).toContain('greater than zero');
    expect(
      buildMeasurement('plate', { width: -2 }, none).errors.width,
    ).toBeDefined();
    expect(
      buildMeasurement('taper', { wide: 23, narrow: 28 }, none).errors.narrow,
    ).toContain('smaller than the wide end');
    expect(
      buildMeasurement('brush', { core: 40, bristle: 30 }, none).errors.bristle,
    ).toContain('smaller than the core');
    expect(
      buildMeasurement('cylinder', { diameter: 25 }, none).measurement,
    ).toEqual({ kind: 'cylinder', diameter: 25, length: undefined });
    expect(buildMeasurement('brush', { core: 30 }, none).measurement).toEqual({
      kind: 'brush',
      core: 30,
      bristle: undefined,
    });
    expect(
      buildMeasurement('plate', {}, new Set(['width'] as const)).errors.width,
    ).toContain('Enter a number');
  });

  it('formats lengths in the reader’s unit', () => {
    expect(formatLength(31.75, 'in')).toBe('1.25 in');
    expect(formatLength(6.35, 'mm')).toBe('6.35 mm');
  });

  it('has resolvable comparison presets and no oval head preset', () => {
    for (const preset of comparisonPresets)
      for (const side of [preset.a, preset.b]) {
        const model = presetById(side.preset);
        expect(model?.mode).toBe(preset.mode);
        expect(model?.figures.some((f) => f.id === side.figure)).toBe(true);
      }
    expect(sizePresets.some((p) => /hot tools/i.test(p.name))).toBe(false);
  });
});

describe('HairToolSizeVisualiserComponent (route shell)', () => {
  it('renders one H1, the opening, the diagram and comparison links', async () => {
    await TestBed.configureTestingModule({
      imports: [HairToolSizeVisualiserComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(HairToolSizeVisualiserComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.textContent).toContain(
      'compare two sizes at the same scale',
    );
    expect(element.querySelector('.measure-diagram svg')).not.toBeNull();
    expect(element.querySelectorAll('.sample-card')).toHaveLength(5);
    for (const preset of comparisonPresets)
      expect(element.querySelector(`#compare-${preset.id}`)).not.toBeNull();
  });

  it('keeps the static comparison outcomes in step with the data', () => {
    for (const example of visualiserWorkedComparisons) {
      const preset = comparisonPresets.find((p) => p.id === example.id)!;
      const value = (side: typeof preset.a) =>
        presetById(side.preset)!.figures.find((f) => f.id === side.figure)!
          .value;
      expect(example.label).toBe(preset.label);
      expect(example.outcome).toBe(
        compareMeasurements(value(preset.a), value(preset.b), 'mm')[0],
      );
    }
    expect(visualiserWorkedComparisons).toHaveLength(comparisonPresets.length);
  });
});

describe('HairToolSizeVisualiserWidgetComponent', () => {
  function setup() {
    TestBed.configureTestingModule({
      imports: [HairToolSizeVisualiserWidgetComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
    const fixture = TestBed.createComponent(
      HairToolSizeVisualiserWidgetComponent,
    );
    fixture.detectChanges();
    return fixture;
  }
  const refresh = (fixture: ReturnType<typeof setup>) => {
    fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
  };
  const enter = (
    fixture: ReturnType<typeof setup>,
    slot: 'a' | 'b',
    field: 'width',
    value: string,
  ) => {
    const component = fixture.componentInstance;
    component.setSource(slot, 'manual');
    component.setField(slot, field, {
      target: { value },
    } as unknown as Event);
  };

  it('renders the demo plate comparison at a common scale', () => {
    const fixture = setup();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain(
      'Drawn at a common scale. Screen sizes vary.',
    );
    expect(element.textContent).toContain('Heated plate width: 15 mm');
    expect(element.textContent).toContain('Heated plate width: 43 mm');
  });

  it('draws 18 mm and 36 mm plates at 1:2 in one shared viewBox', () => {
    const fixture = setup();
    enter(fixture, 'a', 'width', '18');
    enter(fixture, 'b', 'width', '36');
    refresh(fixture);
    const element = fixture.nativeElement as HTMLElement;
    const svgs = Array.from(element.querySelectorAll('svg.shape-svg'));
    expect(svgs).toHaveLength(2);
    const widths = svgs.map((svg) =>
      Number(svg.querySelector('rect')?.getAttribute('width')),
    );
    expect(widths).toEqual([18, 36]);
    const boxes = svgs.map((svg) => svg.getAttribute('viewBox')?.split(' ')[2]);
    expect(boxes[0]).toBe(boxes[1]);
    expect(element.textContent).toContain(
      'The 36 mm plate (B) is 18 mm wider than the 18 mm plate (A).',
    );
  });

  it('keeps other inputs when one is invalid, and units toggle without drift', () => {
    const fixture = setup();
    enter(fixture, 'a', 'width', 'abc');
    enter(fixture, 'b', 'width', '25.4');
    fixture.componentInstance.setUnit('in');
    fixture.componentInstance.setUnit('mm');
    refresh(fixture);
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.field-error')?.textContent).toContain(
      'Enter a number',
    );
    expect(element.querySelectorAll('svg.shape-svg')).toHaveLength(1);
    expect(
      (element.querySelector('#size-b-width') as HTMLInputElement).value,
    ).toBe('25.4');
  });

  it('never suggests a barrel length that is not published', () => {
    const fixture = setup();
    fixture.componentInstance.setMode('barrels');
    refresh(fixture);
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Barrel length not stated.');
    expect(element.querySelectorAll('svg.shape-svg polygon')).toHaveLength(0);
    expect(element.textContent).toContain(
      'The 38 mm cylinder is 10 mm wider than the 28 mm end and 15 mm wider than the 23 mm end.',
    );
  });
});
