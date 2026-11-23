import { Pipe, PipeTransform, SecurityContext, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

/**
 * Article HTML keeps section anchors (`<h2 id="user-content-…">`) from the
 * content generator, but Angular's HTML sanitizer drops every `id`. This pipe
 * still runs Angular's sanitizer over the whole fragment and then restores
 * only heading ids that match the generator's `user-content-` prefix, so
 * in-page jump links work in prerendered HTML without trusting anything else.
 */
const HEADING_ID = /<h([23]) id="(user-content-[a-z0-9-]+)">/g;
const MARKER = /<h([23]) title="__anchor:(user-content-[a-z0-9-]+)">/g;

export function restoreHeadingAnchors(
  html: string,
  sanitize: (value: string) => string,
): string {
  const marked = html.replace(HEADING_ID, '<h$1 title="__anchor:$2">');
  return sanitize(marked).replace(MARKER, '<h$1 id="$2">');
}

@Pipe({ name: 'anchoredHtml' })
export class AnchoredHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(html: string | null | undefined): SafeHtml | string {
    if (!html || !html.includes('id="user-content-')) return html ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(
      restoreHeadingAnchors(
        html,
        (value) => this.sanitizer.sanitize(SecurityContext.HTML, value) ?? '',
      ),
    );
  }
}
