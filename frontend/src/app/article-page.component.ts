import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { articles, Article } from './content.generated';
import { SiteSeoService, SITE_URL } from './site-seo.service';
@Component({
  imports: [RouterLink],
  template: `@if (article) {
    <article class="article-page">
      <header class="article-header">
        <a class="back-link" routerLink="/guides">← All guides</a>
        <p class="eyebrow">{{ article.category }}</p>
        <h1>{{ article.heading }}</h1>
        <p class="lede">{{ article.description }}</p>
        @if (article.publishDate && article.updatedDate) {
          <p class="dates">
            Published {{ article.publishDate }} · Updated
            {{ article.updatedDate }}
          </p>
        }
      </header>
      @if (article.affiliateDisclosure) {
        <aside class="disclosure">
          This article may contain affiliate links.
          <a routerLink="/affiliate-disclosure">How this supports Comb Report</a
          >.
        </aside>
      }
      <section class="article-body" [innerHTML]="article.html"></section>
      @if (article.faq.length > 0) {
        <section class="article-faq">
          <h2>FAQ</h2>
          @for (faq of article.faq; track faq.question) {
            <h3>{{ faq.question }}</h3>
            <p>{{ faq.answer }}</p>
          }
        </section>
      }
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
          datePublished: this.article.publishDate,
          dateModified: this.article.updatedDate,
          mainEntityOfPage: `${SITE_URL}/guides/${this.article.slug}`,
        },
      );
  }
}
