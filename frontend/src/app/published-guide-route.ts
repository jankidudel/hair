import { CanMatchFn } from '@angular/router';
import { articles } from './content.generated';

const publishedGuideSlugs = new Set(articles.map((article) => article.slug));

export const publishedGuideCanMatch: CanMatchFn = (_route, segments) =>
  segments.length === 2 &&
  segments[0].path === 'guides' &&
  publishedGuideSlugs.has(segments[1].path);
