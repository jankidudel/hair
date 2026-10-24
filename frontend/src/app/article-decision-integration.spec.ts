import { describe, expect, it } from 'vitest';
import { ArticleSlug } from './article-slug';
import {
  decisionRelatedLinks,
  decisionSnapshots,
  evidenceOwners,
} from './decision-support';
import {
  splitAfterFirstParagraph,
  splitBeforeHeading,
  splitEvidenceArticleHtml,
  splitInlineFaq,
} from './article-page.component';
import { guideEvidence } from './guide-evidence';
import { articles } from './content.generated';

describe('article decision integration data', () => {
  it('maps the comparison and task-guide decision owners without duplicating evidence owners', () => {
    expect(Object.keys(decisionSnapshots)).toHaveLength(34);
    expect(Object.keys(decisionRelatedLinks)).toHaveLength(10);
    expect(Object.keys(evidenceOwners)).toHaveLength(8);
    expect(Object.keys(guideEvidence)).toHaveLength(24);
    expect(
      evidenceOwners[ArticleSlug.DysonAirwrapVsSharkFlexstyle],
    ).toBeDefined();
  });

  it('splits task-guide intros and shared safety insertion points deterministically', () => {
    const html =
      '<p>Intro</p><h2>Sequence</h2><p>Steps</p><h2>Stop heading</h2><p>Stop.</p>';
    expect(splitAfterFirstParagraph(html)).toEqual([
      '<p>Intro</p>',
      '<h2>Sequence</h2><p>Steps</p><h2>Stop heading</h2><p>Stop.</p>',
    ]);
    expect(splitBeforeHeading(html, 'Stop heading')).toEqual([
      '<p>Intro</p><h2>Sequence</h2><p>Steps</p>',
      '<h2>Stop heading</h2><p>Stop.</p>',
    ]);
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

  it('separates every finishing guide FAQ for the shared section while preserving its links', () => {
    for (const slug of [
      ArticleSlug.HowToUseHairspray,
      ArticleSlug.FlexibleVsStrongHoldHairspray,
      ArticleSlug.SeaSaltSprayVsTexturisingSpray,
      ArticleSlug.HowToUseSeaSaltSpray,
      ArticleSlug.PomadeVsHairClay,
      ArticleSlug.HowToApplyHairPomade,
    ]) {
      const article = articles.find((item) => item.slug === slug)!;
      const [intro, remainder] = splitAfterFirstParagraph(article.html);
      const [main, faq] = splitInlineFaq(remainder);
      expect(intro + main + faq).toBe(article.html);
      expect(main).not.toContain('<h2>FAQ</h2>');
      expect(faq.startsWith('<h2>FAQ</h2>')).toBe(true);
      expect(faq.match(/<h3>/g)).toHaveLength(3);
      if (slug === ArticleSlug.HowToUseHairspray)
        expect(faq).toContain('href="/guides/how-to-use-bobby-pins"');
    }
    expect(splitInlineFaq('<p>No inline FAQ</p>')).toEqual([
      '<p>No inline FAQ</p>',
      '',
    ]);
  });
});
