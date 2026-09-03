import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

export const SITE_URL = environment.siteUrl;
@Injectable({ providedIn: 'root' })
export class SiteSeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  set(title: string, description: string, path: string, jsonLd?: object): void {
    const url = this.canonicalUrl(path);
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'robots',
      content: url ? 'index, follow' : 'noindex, nofollow',
    });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    if (url) this.meta.updateTag({ property: 'og:url', content: url });
    else this.meta.removeTag("property='og:url'");
    let canonical = this.document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    if (!url) {
      canonical?.remove();
    } else {
      canonical.href = url;
    }
    this.document
      .querySelectorAll('script[data-site-jsonld]')
      .forEach((node) => node.remove());
    if (jsonLd && url) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-site-jsonld', 'true');
      script.textContent = JSON.stringify(jsonLd);
      this.document.head.appendChild(script);
    }
  }
  private canonicalUrl(path: string): string | null {
    if (!environment.indexingEnabled || !SITE_URL) return null;
    try {
      const siteUrl = new URL(SITE_URL);
      if (siteUrl.protocol !== 'https:') return null;
      return `${siteUrl.origin}${path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`}`;
    } catch {
      return null;
    }
  }
}
