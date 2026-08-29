import { RenderMode, ServerRoute } from '@angular/ssr';
import { articles } from './content.generated';
export const serverRoutes: ServerRoute[] = [
  {
    path: 'guides/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return articles.map(({ slug }) => ({ slug }));
    },
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
