import { describe, expect, it } from 'vitest';
import { ArticleSlug } from './article-slug';
import {
  decisionRelatedLinks,
  decisionSnapshots,
  evidenceOwners,
} from './decision-support';
import { splitEvidenceArticleHtml } from './article-page.component';

describe('article decision integration data', () => {
  it('maps exactly ten decision owners and eight evidence owners', () => {
    expect(Object.keys(decisionSnapshots)).toHaveLength(10);
    expect(Object.keys(decisionRelatedLinks)).toHaveLength(10);
    expect(Object.keys(evidenceOwners)).toHaveLength(8);
    expect(
      evidenceOwners[ArticleSlug.DysonAirwrapVsSharkFlexstyle],
    ).toBeDefined();
  });

  it('places evidence before the first table and the checklist before the conclusion', () => {
    const html =
      '<p>Scope</p><table><tr></tr></table><p>Analysis</p><h2>Conclusion</h2><p>Keep it.</p>';
    expect(splitEvidenceArticleHtml(html, 'Conclusion')).toEqual([
      '<p>Scope</p>',
      '<table><tr></tr></table><p>Analysis</p>',
      '<h2>Conclusion</h2><p>Keep it.</p>',
    ]);
  });
});
