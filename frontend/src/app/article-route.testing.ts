import { convertToParamMap } from '@angular/router';
import {
  ARTICLE_BODY_DATA_KEY,
  emptyArticleBody,
} from './article-html.resolver';
import { articleBySlug } from './content.generated';
import { guideEvidence } from './guide-evidence';

/**
 * Test double for the `guides/:slug` route snapshot, including the article
 * body and FAQ that `articleBodyResolver` supplies in the running application.
 */
export function articleRouteSnapshot(slug: string) {
  const article = articleBySlug[slug];
  return {
    paramMap: convertToParamMap({ slug }),
    data: {
      [ARTICLE_BODY_DATA_KEY]: article
        ? {
            html: article.html,
            faq: article.faq,
            evidence: guideEvidence[slug],
          }
        : emptyArticleBody,
    },
  };
}
