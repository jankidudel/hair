import {
  ChangeDetectorRef,
  provideZonelessChangeDetection,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import {
  attachmentTypes,
  checkFit,
  dryerById,
  dryers,
  finderPresets,
  findPartByCode,
  fitRecords,
  partById,
  partsByType,
  searchDryers,
} from './dryer-attachments';
import { HairDryerAttachmentFinderWidgetComponent } from './hair-dryer-attachment-finder-widget.component';
import {
  HairDryerAttachmentFinderComponent,
  finderWorkedExamples,
} from './hair-dryer-attachment-finder.component';
import { attachmentFinderPresetForManual } from './hair-tool-manual-finder.component';
import { manualRecords } from './hair-tool-manuals';

const fit = (dryerId: string, partId: string, variantId?: string) =>
  checkFit(dryerById(dryerId)!, variantId, partById(partId)!);

describe('dryer attachment records', () => {
  it('only references known dryers and parts', () => {
    for (const record of fitRecords) {
      expect(dryerById(record.dryerId), record.dryerId).toBeDefined();
      expect(partById(record.partId), record.partId).toBeDefined();
    }
    for (const preset of finderPresets) {
      expect(dryerById(preset.dryerId)).toBeDefined();
      if (preset.partId) expect(partById(preset.partId)).toBeDefined();
    }
    expect(attachmentTypes).toEqual([
      'diffuser',
      'concentrator',
      'comb-nozzle',
      'polisher',
      'round-brush',
    ]);
  });

  it('gives the same ghd part a different answer on each body', () => {
    const helios = fit('ghd-helios-uk', 'ghd-p281', 'black-p497');
    expect(helios.statusLabel).toBe('Fits with adapter ring');
    expect(helios.record?.instruction).toContain('Helios owners');
    const air1 = fit('ghd-air-1-uk', 'ghd-p281');
    expect(air1.statusLabel).toBe('Fits with adapter ring');
    expect(air1.record?.instruction).toContain('footnote');
    expect(fit('ghd-air-uk', 'ghd-p281').statusLabel).toBe(
      'Fits · check Air version for adapter',
    );
    expect(fit('ghd-flight-plus-uk', 'ghd-p281').statusLabel).toBe(
      'Maker excludes this model',
    );
    expect(fit('ghd-helios-uk', 'ghd-p519').statusLabel).toBe('Fits');
    expect(fit('ghd-air-uk', 'ghd-p519').statusLabel).toBe('Fit unconfirmed');
  });

  it('keeps Shark market, box names and spare codes apart', () => {
    const uk = fit('shark-hd542uk', 'shark-xskhd5dmseu', 'mocha-silver');
    expect(uk.status).toBe('fits');
    expect(uk.kit.status).toBe('role-other-name');
    expect(uk.kit.text).toContain('DefrizzFast Diffuser');
    expect(uk.kit.text).toContain('doesn’t identify it as XSKHD5DMSEU');
    expect(fit('shark-hd542-us', 'shark-xskhd5dams').status).toBe('fits');
    expect(fit('shark-hd542-us', 'shark-xskhd3da').status).toBe('excluded');
    expect(fit('shark-hd331-us', 'shark-xskhd5dams').status).toBe(
      'unconfirmed',
    );
    const crossMarket = fit('shark-hd542uk', 'shark-xskhd5dams');
    expect(crossMarket.status).toBe('unconfirmed');
    expect(crossMarket.dryer.id).toBe('shark-hd542uk');
    expect(crossMarket.marketNote).toContain('US part');
    // HD500UK has no sourced kit: box contents stay unknown.
    expect(fit('shark-hd500uk', 'shark-xskhd5dmseu').kit.status).toBe(
      'unconfirmed',
    );
    // A complete box without the part name is "not listed", naming its pieces.
    const polisher = fit('shark-hd542uk', 'shark-xskhd5pfmseu', 'mocha-silver');
    expect(polisher.kit.status).toBe('not-listed');
  });

  it('scopes the Dyson Wave+Curl to its exact variant and features', () => {
    const nural = fit(
      'dyson-nural-uk',
      'dyson-973924-01',
      'ceramic-patina-topaz',
    );
    expect(nural.status).toBe('fits');
    expect(nural.kit.status).toBe('listed');
    expect(nural.features[0].text).toContain('Attachment Learning');
    const other = fit('dyson-nural-uk', 'dyson-973924-01');
    expect(other.status).toBe('unconfirmed');
    expect(other.familyNote?.text).toContain('previous Supersonic');
    const hd07 = fit('dyson-supersonic-hd07-uk', 'dyson-973924-01');
    expect(hd07.status).toBe('unconfirmed');
    expect(hd07.familyNote?.text).toContain('Supersonic r');
  });

  it('labels Parlux evidence as manufacturer international', () => {
    const result = fit('parlux-alyon', 'parlux-magicsense');
    expect(result.status).toBe('fits');
    expect(result.marketNote).toContain('manufacturer international');
    expect(fit('parlux-elysium', 'parlux-magicsense').status).toBe('excluded');
    expect(fit('parlux-ethos', 'parlux-magicsense').status).toBe('unconfirmed');
  });

  it('normalises case and spaces but never strips a suffix', () => {
    expect(findPartByCode(' xskhd5 dmseu ')?.id).toBe('shark-xskhd5dmseu');
    expect(findPartByCode('XSKHD5DMS')).toBeUndefined();
    expect(findPartByCode('973924-01')?.id).toBe('dyson-973924-01');
    expect(findPartByCode('97392401')).toBeUndefined();
    const uk = searchDryers('UK', 'hd542');
    expect(uk.kind).toBe('choices');
    const us = searchDryers('US', 'hd542uk');
    expect(us.kind).toBe('other-market');
  });

  it('lists every candidate when a name is ambiguous', () => {
    const result = searchDryers('UK', 'ghd air');
    expect(result.kind).toBe('choices');
    if (result.kind === 'choices')
      expect(result.dryers.map((d) => d.id)).toEqual([
        'ghd-air-uk',
        'ghd-air-1-uk',
      ]);
    expect(searchDryers('UK', 'HD542UK').kind).toBe('match');
    expect(searchDryers('UK', 'FlexStyle').kind).toBe('multi-styler');
    expect(searchDryers('UK', 'Supersonic r').kind).toBe('none');
  });

  it('puts verified fits first in a type search', () => {
    const results = partsByType(
      dryerById('ghd-helios-uk')!,
      undefined,
      'concentrator',
    );
    expect(results.map((r) => r.part.id)).toEqual(['ghd-p519']);
    const diffusers = partsByType(
      dryerById('shark-hd542-us')!,
      undefined,
      'diffuser',
    );
    expect(diffusers.map((r) => r.status)).toEqual(['fits', 'excluded']);
  });

  it('only searches dedicated dryers', () => {
    for (const dryer of dryers)
      expect(dryer.name).not.toMatch(/airwrap|flexstyle|flexfusion/i);
  });

  it('keeps Manual Finder presets in step with finder presets', () => {
    for (const [recordId, presetId] of Object.entries(
      attachmentFinderPresetForManual,
    )) {
      expect(manualRecords.some((r) => r.id === recordId)).toBe(true);
      expect(finderPresets.some((p) => p.id === presetId)).toBe(true);
    }
  });
});

describe('HairDryerAttachmentFinderComponent (route shell)', () => {
  it('renders one H1, the opening and the worked examples', async () => {
    await TestBed.configureTestingModule({
      imports: [HairDryerAttachmentFinderComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(HairDryerAttachmentFinderComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.textContent).toContain(
      'Choose the country your dryer was sold for and its exact model.',
    );
    expect(element.textContent).toContain('Fits with adapter ring');
    // Every preset has a static anchor, so fragment links resolve.
    for (const preset of finderPresets)
      expect(element.querySelector(`#preset-${preset.id}`)).not.toBeNull();
  });

  it('keeps the static worked examples in step with the data', () => {
    for (const example of finderWorkedExamples) {
      const preset = finderPresets.find((p) => p.id === example.id)!;
      const dryer = dryerById(preset.dryerId)!;
      const result = preset.partId
        ? checkFit(dryer, preset.variantId, partById(preset.partId)!)
        : partsByType(dryer, preset.variantId, preset.type!)[0];
      expect(example.label).toBe(preset.label);
      expect(example.outcome).toBe(result.statusLabel);
      expect(example.summary).toBe(result.summary);
    }
  });
});

describe('HairDryerAttachmentFinderWidgetComponent', () => {
  function setup() {
    TestBed.configureTestingModule({
      imports: [HairDryerAttachmentFinderWidgetComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
    const fixture = TestBed.createComponent(
      HairDryerAttachmentFinderWidgetComponent,
    );
    fixture.detectChanges();
    return fixture;
  }
  const refresh = (fixture: ReturnType<typeof setup>) => {
    fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    fixture.detectChanges();
  };

  it('renders three worked shortcuts with their outcomes', () => {
    const element = setup().nativeElement as HTMLElement;
    const samples = Array.from(element.querySelectorAll('.sample-card'));
    expect(samples).toHaveLength(3);
    expect(samples[0].textContent).toContain('Fits with adapter ring');
    expect(samples[0].getAttribute('href')).toBe(
      '/hair-dryer-attachment-finder#preset-helios-diffuser',
    );
  });

  it('shows a result card with its evidence for a preset', () => {
    const fixture = setup();
    fixture.componentInstance.applyPreset(
      finderPresets.find((p) => p.id === 'hd542uk-diffuser')!,
    );
    refresh(fixture);
    const element = fixture.nativeElement as HTMLElement;
    const card = element.querySelector('.result-card');
    expect(card?.textContent).toContain('Fits');
    expect(card?.textContent).toContain('XSKHD5DMSEU');
    expect(card?.textContent).toContain(
      'Listed in this kit under another name',
    );
    expect(card?.textContent).toContain('Maker fit list');
    expect(card?.textContent).toContain('Selected kit contents');
  });

  it('shows the no-result text for an unknown part code', () => {
    const fixture = setup();
    const component = fixture.componentInstance;
    component.chooseDryer(dryerById('ghd-helios-uk')!);
    component.setMode('code');
    component.partCode = 'p-999';
    component.checkPartCode();
    refresh(fixture);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('[role="status"]')
        ?.textContent,
    ).toContain(
      'We couldn’t confirm this dryer and attachment pairing. Check the model code and contact the maker before ordering.',
    );
  });
});
