import { JSDOM } from 'jsdom';
import type { Article } from '../../frontend/src/app/content.generated.ts';
import type { GuideEvidence } from '../../frontend/src/app/guide-evidence.ts';
import {
  renderedGuideErrors,
  renderedEditorialCopyErrors,
} from '../guide-body-validation.ts';

/** Validate actual delivered HTML against the intended source, including body
 * and metadata. An old document with HTTP 200 must fail just like a fallback. */
export function releaseArticleErrors(
  response: { status: number; contentType: string; text: string },
  expected: {
    article: Article;
    evidence?: GuideEvidence;
    authoredBody?: boolean;
    relatedPaths: readonly string[];
  },
  sitemap: readonly { url: string; lastmod?: string }[],
): string[] {
  const { article, evidence, relatedPaths } = expected;
  const canonical = `https://www.combreport.com/guides/${article.slug}`;
  const errors: string[] = [];
  if (response.status !== 200)
    errors.push(`HTTP ${response.status}; expected 200.`);
  if (!response.contentType.includes('text/html'))
    errors.push('Expected HTML response.');
  const dom = new JSDOM(response.text);
  const doc = dom.window.document;
  if (doc.title !== article.title)
    errors.push('Title does not match release source.');
  const canonicals = [...doc.querySelectorAll('link[rel="canonical"]')];
  if (
    canonicals.length !== 1 ||
    canonicals[0].getAttribute('href') !== canonical
  )
    errors.push('Canonical does not match release source.');
  if (
    doc.querySelectorAll('h1').length !== 1 ||
    doc.querySelector('h1')?.textContent?.trim() !== article.heading
  )
    errors.push('H1 does not match release source.');
  if (
    /noindex/i.test(
      doc.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '',
    )
  )
    errors.push('Article is unexpectedly noindex.');
  const schema = [...doc.querySelectorAll('script[data-site-jsonld]')]
    .flatMap((node) => {
      try {
        const value = JSON.parse(node.textContent ?? '');
        return value['@graph'] ?? [value];
      } catch {
        return [];
      }
    })
    .find((value) => value['@type'] === 'Article');
  const modified = article.updatedDate ?? article.publishDate;
  if (
    schema?.datePublished !== article.publishDate ||
    schema?.dateModified !== modified
  )
    errors.push(
      'Article publication/revision dates differ from release source.',
    );
  const entries = sitemap.filter((entry) => entry.url === canonical);
  if (entries.length !== 1 || entries[0].lastmod !== modified)
    errors.push('Expected exactly one current sitemap entry.');
  if (expected.authoredBody) {
    const authored = new JSDOM(article.html);
    const delivered = doc.querySelector('article.article-page');
    const normal = (text: string) => text.replace(/\s+/g, ' ').trim();
    const actualText = normal(delivered?.textContent ?? '');
    for (const block of authored.window.document.querySelectorAll(
      'p, h2, th, td, li',
    )) {
      const text = normal(block.textContent ?? '');
      if (text && !actualText.includes(text))
        errors.push(`Missing authored copy '${text.slice(0, 100)}'.`);
    }
    for (const link of authored.window.document.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href');
      if (
        ![...(delivered?.querySelectorAll('a[href]') ?? [])].some(
          (node) => node.getAttribute('href') === href,
        )
      )
        errors.push(`Missing authored destination '${href}'.`);
    }
    errors.push(...renderedEditorialCopyErrors(response.text));
    authored.window.close();
  } else
    errors.push(
      ...renderedGuideErrors(response.text, {
        heading: article.heading,
        body: article.html,
        faqs: article.faq,
        sourceUrls: (evidence?.sources ?? []).map((source) => source.url),
        relatedPaths,
      }),
    );
  dom.window.close();
  return errors;
}

/**
 * A retired duplicate must return an actual 404. Its `/path/` and
 * `/path/index.html` shapes instead get the edge function's single 301 to the
 * canonical `/path`, which must itself 404; pass that URL as
 * `canonicalLocation` to require exactly that redirect and nothing else.
 */
export function retiredRouteErrors(
  response: { status: number; text: string; location?: string | null },
  canonicalLocation?: string,
): string[] {
  if (canonicalLocation === undefined)
    return response.status === 404
      ? []
      : [`Retired route returned HTTP ${response.status}; expected 404.`];
  if (response.status !== 301)
    return [
      `Retired route variant returned HTTP ${response.status}; expected a 301 to ${canonicalLocation}.`,
    ];
  return response.location === canonicalLocation
    ? []
    : [
        `Retired route variant redirected to ${response.location ?? '(no Location)'}; expected ${canonicalLocation}.`,
      ];
}
