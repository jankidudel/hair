import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { articles } from './content.generated';
import { SiteSeoService, SITE_URL } from './site-seo.service';
import {
  GuideCategory,
  guideCategories,
  guideCategoryById,
} from './article-registry';
import { Breadcrumb, BreadcrumbsComponent } from './breadcrumbs.component';

@Component({
  imports: [RouterLink, BreadcrumbsComponent],
  template: `@switch (page) {
    @case ('home') {
      <section class="home-hero">
        <div class="hero-copy">
          <p class="eyebrow">Hair appearance, simply explained</p>
          <h1>Everyday routines for hair that feels like you.</h1>
          <p class="hero-lede">
            Practical guides, styling tools, and thoughtful product
            comparisons—focused on appearance and everyday care.
          </p>
          <a class="button" routerLink="/guides">Browse guides</a>
        </div>
        <a
          class="featured-guide"
          [routerLink]="['/guides', featuredGuide.slug]"
        >
          <div class="featured-art" aria-hidden="true">
            <svg viewBox="0 0 360 230" width="360" height="230">
              <path d="M45 172c49-115 136-144 252-99" />
              <path d="M66 190c46-81 122-108 218-72" />
              <path d="M173 39c10 42 42 72 84 82" />
              <circle cx="274" cy="63" r="22" />
            </svg>
          </div>
          <p class="eyebrow">Featured guide · {{ featuredGuide.category }}</p>
          <h2>{{ featuredGuide.heading }}</h2>
          <p>{{ featuredGuide.description }}</p>
          <span class="text-link"
            >Read guide <span aria-hidden="true">→</span></span
          >
        </a>
      </section>
      <section class="topic-section" aria-labelledby="topics-heading">
        <div class="section-heading">
          <p class="eyebrow">Start where you are</p>
          <h2 id="topics-heading">Explore by topic</h2>
        </div>
        <div class="topic-links">
          <a routerLink="/hair-care"><span>01</span> Hair Care <b>→</b></a>
          <a routerLink="/products"><span>02</span> Products <b>→</b></a>
          <a routerLink="/guides"><span>03</span> Guides <b>→</b></a>
        </div>
      </section>
      <section class="latest-section" aria-labelledby="latest-heading">
        <div class="section-heading section-heading-row">
          <div>
            <p class="eyebrow">Recently added</p>
            <h2 id="latest-heading">Latest guides</h2>
          </div>
          <a class="text-link" routerLink="/guides"
            >All guides <span aria-hidden="true">→</span></a
          >
        </div>
        <div class="editorial-grid latest-grid">
          @for (
            article of latestGuides;
            track article.slug;
            let first = $first
          ) {
            <a
              class="guide-card"
              [class.guide-card-featured]="first"
              [routerLink]="['/guides', article.slug]"
            >
              <p class="eyebrow">{{ article.category }}</p>
              <h3>{{ article.heading }}</h3>
              <p>{{ article.description }}</p>
              <span class="text-link"
                >Read guide <span aria-hidden="true">→</span></span
              >
            </a>
          }
        </div>
      </section>
      <section class="trust-statement">
        <p class="eyebrow">Our approach</p>
        <p>
          Clear, appearance-focused advice for the routines and tools you
          actually use. When a link earns us a commission, we say so—without
          changing the point of view.
        </p>
        <a routerLink="/affiliate-disclosure">How affiliate links work</a>
      </section>
    }
    @case ('guides') {
      <app-breadcrumbs [items]="guidesBreadcrumbs" />
      <section class="listing-intro guides-intro">
        <p class="eyebrow">Guides</p>
        <h1>Hair tools and routine guides</h1>
        <p class="lede">
          Straightforward reading for choosing tools and making your routine
          feel more considered.
        </p>
      </section>
      <section class="category-hubs" aria-labelledby="category-hubs-heading">
        <div class="section-heading">
          <p class="eyebrow">Browse by category</p>
          <h2 id="category-hubs-heading">Find a guide by topic</h2>
        </div>
        <div class="category-links">
          @for (category of categories; track category.id) {
            <a [routerLink]="category.path">
              <span>{{ category.label }}</span
              ><b aria-hidden="true">→</b>
            </a>
          }
        </div>
      </section>
      <section class="category-hubs" aria-labelledby="brush-cluster-heading">
        <div class="section-heading">
          <p class="eyebrow">Brushes &amp; combs</p>
          <h2 id="brush-cluster-heading">Hair Brush Care &amp; Selection</h2>
        </div>
        <p>
          Choose a styling brush, understand its bristles, and keep the one you
          own in good working order.
        </p>
        <div class="category-links">
          <a routerLink="/guides/round-brush-size-guide"
            >Round brush size guide <b>→</b></a
          ><a routerLink="/guides/boar-bristle-vs-nylon-brush"
            >Boar bristle vs nylon <b>→</b></a
          ><a routerLink="/guides/how-to-clean-a-hair-brush"
            >How to clean a hairbrush <b>→</b></a
          ><a routerLink="/guides/what-is-the-grey-fuzz-on-my-hairbrush"
            >What is grey fuzz? <b>→</b></a
          >
        </div>
      </section>
      <section class="editorial-grid guides-grid" aria-label="All guides">
        @for (article of guides; track article.slug; let first = $first) {
          <a
            class="guide-card"
            [class.guide-card-featured]="first"
            [routerLink]="['/guides', article.slug]"
            ><p class="eyebrow">{{ article.category }}</p>
            <h2>{{ article.heading }}</h2>
            <p>{{ article.description }}</p>
            <span class="text-link"
              >Read guide <span aria-hidden="true">→</span></span
            ></a
          >
        }
      </section>
    }
    @case ('category') {
      @if (category) {
        <app-breadcrumbs [items]="categoryBreadcrumbs" />
        <section class="listing-intro">
          <p class="eyebrow">{{ category.label }}</p>
          <h1>{{ category.heading }}</h1>
          <p class="lede">{{ category.intro }}</p>
        </section>
        <section
          class="editorial-grid guides-grid"
          [attr.aria-label]="category.label + ' guides'"
        >
          @for (article of categoryArticles; track article.slug) {
            <a class="guide-card" [routerLink]="['/guides', article.slug]"
              ><p class="eyebrow">{{ article.category }}</p>
              <h2>{{ article.heading }}</h2>
              <p>{{ article.description }}</p>
              <span class="text-link"
                >Read guide <span aria-hidden="true">→</span></span
              ></a
            >
          }
        </section>
      }
    }
    @case ('products') {
      <section class="listing-intro">
        <p class="eyebrow">Products</p>
        <h1>Product comparisons, coming soon</h1>
        <p class="lede">
          We’re building clear comparisons for brushes, shampoos, and styling
          tools.
        </p>
      </section>
    }
    @case ('about') {
      <section class="listing-intro">
        <p class="eyebrow">About</p>
        <h1>About Comb Report</h1>
        <p class="lede">
          We make appearance-focused hair care easier to navigate with useful,
          plainly written guides.
        </p>
      </section>
    }
    @case ('privacy') {
      <section class="listing-intro">
        <p class="eyebrow">Privacy</p>
        <h1>Privacy</h1>
        <p class="lede">
          Privacy details will be published here before launch.
        </p>
      </section>
    }
    @case ('affiliate') {
      <section class="listing-intro">
        <p class="eyebrow">Disclosure</p>
        <h1>Affiliate disclosure</h1>
        <p class="lede">
          When we use affiliate links, we may earn a commission at no extra cost
          to you. This helps support the site.
        </p>
      </section>
    }
  }`,
})
export class StaticPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SiteSeoService);
  readonly guides = articles;
  readonly categories = guideCategories;
  readonly guidesBreadcrumbs: readonly Breadcrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Guides' },
  ];
  readonly featuredGuide = articles[0];
  readonly latestGuides = articles.slice(0, 6);
  category?: GuideCategory;
  categoryArticles = articles;
  categoryBreadcrumbs: readonly Breadcrumb[] = [];
  page = 'home';

  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'] as string;
    const categoryId = this.route.snapshot.data['category'];
    if (this.page === 'category') {
      this.category = guideCategoryById[categoryId];
      this.categoryArticles = articles.filter(
        (article) => article.group === this.category?.id,
      );
      this.categoryBreadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Guides', path: '/guides' },
        { label: this.category.label },
      ];
    }
    const data: Record<string, [string, string, string]> = {
      home: [
        'Comb Report | Honest Hair Tool and Routine Advice',
        'Appearance-focused hair routines, guides, and product comparisons.',
        '/',
      ],
      guides: [
        'Hair Tools and Routine Guides | Comb Report',
        'Honest hair-tool comparisons and practical routine advice.',
        '/guides',
      ],
      products: [
        'Products | Comb Report',
        'Hair tools and product comparisons.',
        '/products',
      ],
      about: ['About | Comb Report', 'About Comb Report.', '/about'],
      privacy: ['Privacy | Comb Report', 'Privacy information.', '/privacy'],
      affiliate: [
        'Affiliate Disclosure | Comb Report',
        'How affiliate links support Comb Report.',
        '/affiliate-disclosure',
      ],
    };
    const pageData =
      this.page === 'category' && this.category
        ? [this.category.title, this.category.description, this.category.path]
        : data[this.page];
    const [title, description, path] = pageData;
    this.seo.set(
      title,
      description,
      path,
      this.page === 'home'
        ? {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Comb Report',
            url: SITE_URL,
          }
        : undefined,
      this.page === 'guides'
        ? [
            { label: 'Home', path: '/' },
            { label: 'Guides', path: '/guides' },
          ]
        : this.page === 'category' && this.category
          ? [
              { label: 'Home', path: '/' },
              { label: 'Guides', path: '/guides' },
              { label: this.category.label, path: this.category.path },
            ]
          : undefined,
    );
  }
}
