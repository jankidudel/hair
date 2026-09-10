import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { articles, Article } from './content.generated';
import { SiteSeoService, SITE_URL } from './site-seo.service';
import { Breadcrumb, BreadcrumbsComponent } from './breadcrumbs.component';
import { guideCategoryById } from './article-registry';
import { RoundBrushSizeFinderComponent } from './round-brush-size-finder.component';
import { HairDryerFinderComponent } from './hair-dryer-finder.component';
@Component({
  imports: [
    RouterLink,
    BreadcrumbsComponent,
    RoundBrushSizeFinderComponent,
    HairDryerFinderComponent,
  ],
  template: `@if (article) {
    <article
      class="article-page"
      [class.round-brush-guide]="article.slug === 'round-brush-size-guide'"
    >
      <app-breadcrumbs [items]="breadcrumbs" />
      <header class="article-header">
        <p class="eyebrow">{{ article.category }}</p>
        <h1>{{ article.heading }}</h1>
        <p class="lede">{{ article.description }}</p>
      </header>
      @if (article.slug === 'round-brush-size-guide') {
        <app-round-brush-size-finder />
      }
      @if (article.slug === 'how-to-choose-hair-dryer') {
        <app-hair-dryer-finder />
      }
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
  breadcrumbs: readonly Breadcrumb[] = [];
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.article = articles.find((item) => item.slug === slug);
    if (this.article) {
      const category = guideCategoryById[this.article.group];
      this.breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Guides', path: '/guides' },
        { label: category.label, path: category.path },
        { label: this.article.heading },
      ];
      this.seo.set(
        this.article.title,
        this.article.description,
        `/guides/${this.article.slug}`,
        [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: this.article.title,
            description: this.article.description,
            datePublished: this.article.publishDate,
            dateModified: this.article.updatedDate,
            mainEntityOfPage: `${SITE_URL}/guides/${this.article.slug}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: this.article.faq.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ],
        this.breadcrumbs
          .filter((item): item is Breadcrumb & { path: string } => !!item.path)
          .concat({
            label: this.article.heading,
            path: `/guides/${this.article.slug}`,
          }),
      );
    }
  }
}
