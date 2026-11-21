import { convertToParamMap } from '@angular/router';
import { ARTICLE_HTML_DATA_KEY } from './article-html.resolver';
import { articleBySlug } from './content.generated';

/**
 * Test double for the `guides/:slug` route snapshot, including the article
 * body that `articleHtmlResolver` supplies in the running application.
 */
export function articleRouteSnapshot(slug: string) {
  return {
    paramMap: convertToParamMap({ slug }),
    data: { [ARTICLE_HTML_DATA_KEY]: articleBySlug[slug]?.html ?? '' },
  };
}
