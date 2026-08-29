import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { articles, Article } from './content.generated';
import { SiteSeoService, SITE_URL } from './site-seo.service';
@Component({
  imports: [RouterLink],
  template: `@if (article) {
    <article>
      <a routerLink="/guides">← All guides</a>
      <p class="eyebrow">{{ article.category }}</p>
      <h1>{{ article.title }}</h1>
      <p class="lede">{{ article.description }}</p>
      <p class="dates">
        Published {{ article.published }} · Updated {{ article.updated }}
      </p>
      @if (article.affiliateDisclosure) {
        <p class="disclosure">This article may contain affiliate links.</p>
      }
      <section class="article-body" [innerHTML]="article.html"></section>
    </article>
  }`,
})
export class ArticlePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SiteSeoService);
  article?: Article;
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.article = articles.find((item) => item.slug === slug);
    if (this.article)
      this.seo.set(
        this.article.title,
        this.article.description,
        `/guides/${this.article.slug}`,
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: this.article.title,
          description: this.article.description,
          datePublished: this.article.published,
          dateModified: this.article.updated,
          mainEntityOfPage: `${SITE_URL}/guides/${this.article.slug}`,
        },
      );
  }
}
