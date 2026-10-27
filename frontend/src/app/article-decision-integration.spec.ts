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
    const registered = new Set(articles.map((article) => article.slug));
    for (const collection of [
      decisionSnapshots,
      decisionRelatedLinks,
      evidenceOwners,
      guideEvidence,
    ]) {
      for (const slug of Object.keys(collection))
        expect(registered.has(slug), slug).toBe(true);
    }
    for (const slug of Object.keys(guideEvidence))
      expect(evidenceOwners[slug], slug).toBeUndefined();
    for (const slug of [
      ArticleSlug.T3AirebrushVsAirebrushRound,
      ArticleSlug.T3SinglepassCurlXVsGhdSoftCurl,
      ArticleSlug.BestHotAirBrushesFineHair,
      ArticleSlug.BestHotAirBrushesShortHair,
      ArticleSlug.BestHotAirBrushForThickHair,
      ArticleSlug.HotAirBrushBarrelSizeGuide,
    ]) {
      expect(articles.some((article) => article.slug === slug)).toBe(true);
      expect(guideEvidence[slug]?.sources.length).toBeGreaterThan(0);
      expect(evidenceOwners[slug]).toBeUndefined();
    }
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

  it('separates finishing and handling guide FAQs for the shared section while preserving its links', () => {
    for (const slug of [
      ArticleSlug.HowToSectionHairForStyling,
      ArticleSlug.GhdAirVsHelios,
      ArticleSlug.ParluxAlyonVsDigitalyon,
      ArticleSlug.CloudNineOriginalIronVsWideIron,
      ArticleSlug.GhdSoftCurlTongVsCreativeCurlWand,
      ArticleSlug.TangleTeezerUltimateDetanglerVsFineFragile,
      ArticleSlug.HowToUseAWideToothComb,
      ArticleSlug.HowToUseACurlDefiningBrush,
      ArticleSlug.HowToUseAHairPick,
      ArticleSlug.HowToPlopHair,
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
