import { DOCUMENT } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { AnalyticsService } from './analytics/analytics.service';
import { HairToolRoutineBuilderComponent } from './hair-tool-routine-builder.component';
import { SiteSeoService } from './site-seo.service';

describe('HairToolRoutineBuilderComponent state', () => {
  it('updates an existing result after ownership edits and clears it on reset', () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: SiteSeoService, useValue: { set: () => undefined } },
        { provide: AnalyticsService, useValue: { track: () => undefined } },
        { provide: DOCUMENT, useValue: document },
      ],
    });
    const builder = TestBed.runInInjectionContext(
      () => new HairToolRoutineBuilderComponent(),
    );
    builder.setGoal('blowout');
    builder.toggleOwned('heated-round-brush');
    builder.submit(new Event('submit') as SubmitEvent);
    expect(builder.resultShown).toBe(true);
    expect(builder.result.items[1].tool).toBe(
      'Your existing heated round brush',
    );
    builder.toggleOwned('heated-round-brush');
    builder.toggleOwned('hot-air-brush');
    expect(builder.result.items.map((item) => item.tool)).toEqual([
      'Your existing hot-air brush',
    ]);
    expect(builder.result.links[0].path).toBe(
      '/guides/thermal-brush-vs-hot-air-brush',
    );
    builder.reset();
    expect(builder.resultShown).toBe(false);
    expect(builder.owned).toEqual([]);
    expect(builder.noneOrUnsure).toBe(true);
    expect(builder.goal).toBe('smooth');
  });
});
