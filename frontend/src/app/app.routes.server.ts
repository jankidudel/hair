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
  { path: '404', renderMode: RenderMode.Prerender },
  // This S3-hosted application is static-only; CloudFront maps unknown URLs
  // to the prerendered 404 document with an HTTP 404 response.
  { path: '**', renderMode: RenderMode.Prerender },
];
