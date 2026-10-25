import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { HairDryerFinderComponent } from './hair-dryer-finder.component';
import { AnalyticsService } from './analytics/analytics.service';
describe('dryer chooser state and controls', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HairDryerFinderComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: AnalyticsService, useValue: { track: () => undefined } },
      ],
    }),
  );
  it('exposes guide anchors before submission, labelled section amount, and clears through the UI', async () => {
    const fixture = TestBed.createComponent(HairDryerFinderComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(
      element.querySelectorAll('nav[aria-label="Hair dryer feature guides"] a'),
    ).toHaveLength(4);
    const amount = element.querySelector(
      'select[aria-describedby="section-amount-help"]',
    ) as HTMLSelectElement;
    expect(amount.closest('label')?.textContent).toContain(
      'Amount of hair in the working section',
    );
    amount.value = 'higher';
    amount.dispatchEvent(new Event('change'));
    const buttons = Array.from(element.querySelectorAll('button'));
    buttons.find((b) => b.textContent?.includes('Show features'))!.click();
    fixture.changeDetectorRef.detectChanges();
    expect(element.textContent).toContain(
      'Try releasing a smaller working area',
    );
    buttons.find((b) => b.textContent?.includes('Clear choices'))!.click();
    fixture.changeDetectorRef.detectChanges();
    expect(element.querySelector('.dryer-finder-result')).toBeNull();
    expect(fixture.componentInstance.sectionAmount).toBe('medium');
    expect(fixture.componentInstance.priority).toBe('airflow');
    const another = TestBed.createComponent(HairDryerFinderComponent);
    expect(another.componentInstance.result).toBeUndefined();
    expect(another.componentInstance.sectionAmount).toBe('medium');
  });
});
