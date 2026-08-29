import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://example.com'; // Replace once the production domain is known.
@Injectable({ providedIn: 'root' })
export class SiteSeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  set(title: string, description: string, path: string, jsonLd?: object): void {
    const url = `${SITE_URL}${path}`;
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    let canonical = this.document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
    this.document
      .querySelectorAll('script[data-site-jsonld]')
      .forEach((node) => node.remove());
    if (jsonLd) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-site-jsonld', 'true');
      script.textContent = JSON.stringify(jsonLd);
      this.document.head.appendChild(script);
    }
  }
}
