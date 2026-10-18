import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ArticleSlug } from './article-slug';
import { ChooseUseFixPathwaysComponent } from './choose-use-fix-pathways.component';
import { categoryPathways } from './category-pathways';
import { DecisionSnapshotComponent } from './decision-snapshot.component';
import { decisionSnapshots } from './decision-support';
import { EvidenceScopeComponent } from './evidence-scope.component';
import { productBySlug } from './product-comparisons';

describe('decision support components', () => {
  it('renders a visible decision heading and three labelled rows', () => {
    TestBed.configureTestingModule({
      imports: [DecisionSnapshotComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(DecisionSnapshotComponent);
    fixture.componentRef.setInput(
      'content',
      decisionSnapshots[ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume],
    );
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('aside h2')?.textContent).toContain(
      'Choose attachments or one repeatable brush routine',
    );
    expect(element.querySelectorAll('dt')).toHaveLength(3);
    expect(element.textContent).toContain(
      'Check the exact model, market and instructions',
    );
  });

  it('renders evidence fields and omits a non-common check date', () => {
    TestBed.configureTestingModule({
      imports: [EvidenceScopeComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(EvidenceScopeComponent);
    const products = [
      productBySlug('tangle-teezer-ultimate-detangler-matte-uk')!,
      productBySlug('wet-brush-original-detangler')!,
    ];
    fixture.componentRef.setInput('products', products);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('section h2')?.textContent).toContain(
      'What this comparison can establish',
    );
    expect(
      Array.from(element.querySelectorAll('dt')).map(
        (item) => item.textContent,
      ),
    ).toEqual([
      'Exact products',
      'Market',
      'Evidence used',
      'Useful for',
      'Does not establish',
    ]);
    expect(element.textContent).toContain(
      'Ultimate Detangler Matte, UK listing',
    );
    expect(element.textContent).toContain('A missing field stays unknown.');
  });

  it('renders the guide evidence summary without comparison fields', () => {
    TestBed.configureTestingModule({
      imports: [EvidenceScopeComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(EvidenceScopeComponent);
    fixture.componentRef.setInput(
      'summary',
      'The exact model manual controls the cleaning method.',
    );
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h2')?.textContent).toContain(
      'Evidence scope',
    );
    expect(element.textContent).toContain(
      'The exact model manual controls the cleaning method.',
    );
    expect(element.querySelector('dl')).toBeNull();
  });

  it('renders all pathway links in semantic groups without hidden state', () => {
    TestBed.configureTestingModule({
      imports: [ChooseUseFixPathwaysComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(ChooseUseFixPathwaysComponent);
    fixture.componentRef.setInput('groups', categoryPathways['hair-dryers']);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('nav section')).toHaveLength(3);
    expect(
      Array.from(element.querySelectorAll('h3')).map(
        (item) => item.textContent,
      ),
    ).toEqual(['Choose', 'Use', 'Fix']);
    expect(element.querySelectorAll('a')).toHaveLength(9);
    expect(element.querySelector('a')?.getAttribute('href')).toBe(
      '/guides/how-to-choose-hair-dryer',
    );
  });
});
