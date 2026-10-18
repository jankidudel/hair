import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { CleanInspectStopComponent } from './clean-inspect-stop.component';

describe('CleanInspectStopComponent', () => {
  it('renders the shared crawlable safety copy as a semantic table', () => {
    TestBed.configureTestingModule({
      imports: [CleanInspectStopComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(CleanInspectStopComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('section > h2')?.textContent).toContain(
      'Clean, inspect, or stop?',
    );
    expect(element.querySelectorAll('tbody tr')).toHaveLength(3);
    expect(element.textContent).toContain(
      'Cleaning helps with ordinary surface residue. It does not repair a damaged heated surface, loose part or electrical fault.',
    );
    expect(element.textContent).toContain(
      'If you cannot identify the residue or the manual does not permit a cleaning method, do not improvise with solvents or abrasive tools.',
    );
  });

  it('supports an h3 without making the fixed safety copy caller-configurable', () => {
    TestBed.configureTestingModule({
      imports: [CleanInspectStopComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(CleanInspectStopComponent);
    fixture.componentRef.setInput('headingLevel', 'h3');
    fixture.componentRef.setInput('className', 'embedded-check');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('section > h3')).not.toBeNull();
    expect(element.querySelector('section')?.classList).toContain(
      'embedded-check',
    );
  });
});
