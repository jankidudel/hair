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
import { ArticleSlug } from './article-slug';

@Component({
  imports: [RouterLink, BreadcrumbsComponent],
  styleUrl: 'static-page.component.css',
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
          <a [routerLink]="['/guides', articleSlug.RoundBrushSizeGuide]"
            >Round brush size guide <b>→</b></a
          ><a [routerLink]="['/guides', articleSlug.BoarBristleVsNylonBrush]"
            >Boar bristle vs nylon <b>→</b></a
          ><a [routerLink]="['/guides', articleSlug.HowToCleanAHairBrush]"
            >How to clean a hairbrush <b>→</b></a
          ><a
            [routerLink]="[
              '/guides',
              articleSlug.WhatIsTheGreyFuzzOnMyHairbrush,
            ]"
            >What is grey fuzz? <b>→</b></a
          >
        </div>
      </section>
      <section class="category-hubs" aria-labelledby="routine-builder-heading">
        <div class="section-heading">
          <p class="eyebrow">Build a smaller toolkit</p>
          <h2 id="routine-builder-heading">Hair Tool Routine Builder</h2>
        </div>
        <p>
          Choose the few tool categories that support your ordinary routine
          before comparing extra options.
        </p>
        <a class="text-link" routerLink="/hair-tool-routine-builder"
          >Build a simple routine <span aria-hidden="true">→</span></a
        >
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
    @case ('tools') {
      <app-breadcrumbs [items]="toolsBreadcrumbs" />
      <section class="listing-intro tools-intro">
        <p class="eyebrow">Interactive tools</p>
        <h1>Practical help for choosing and using hair tools</h1>
        <p class="lede">
          Use these simple, browser-based helpers to narrow a styling choice or
          find a comfortable starting point. They do not collect the details you
          enter.
        </p>
      </section>
      <section class="tools-grid" aria-label="Hair tools">
        @for (tool of tools; track tool.name) {
          <a class="tool-card" [routerLink]="tool.path">
            <p class="eyebrow">{{ tool.type }}</p>
            <h2>{{ tool.name }}</h2>
            <p>{{ tool.description }}</p>
            <span class="text-link"
              >{{ tool.action }} <span aria-hidden="true">→</span></span
            >
          </a>
        }
      </section>
      <section class="tools-note" aria-labelledby="tools-note-heading">
        <h2 id="tools-note-heading">Want to compare specific models?</h2>
        <p>
          Browse published manufacturer specifications side by side, then use
          the related guides to weigh the trade-offs for your routine.
        </p>
        <a class="text-link" routerLink="/products"
          >Explore product comparisons <span aria-hidden="true">→</span></a
        >
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
              <h2>
                {{
                  article.slug === articleSlug.HairDryerChooser
                    ? 'Choose a Hair Dryer'
                    : article.heading
                }}
              </h2>
              <p>
                {{
                  article.slug === articleSlug.HairDryerChooser
                    ? 'Use the feature finder, then compare dryers for your routine.'
                    : article.description
                }}
              </p>
              <span class="text-link"
                >Read guide <span aria-hidden="true">→</span></span
              ></a
            >
          }
        </section>
        @if (
          category.id === 'hair-dryers' || category.id === 'hot-air-brushes'
        ) {
          <section class="category-product-explorer">
            <p class="eyebrow">Specification-led explorer</p>
            <h2>Compare Hair Tools Before You Buy</h2>
            <p>
              Compare published manufacturer specifications alongside the buying
              guides for this category.
            </p>
            <a class="text-link" routerLink="/products"
              >Explore comparisons <span aria-hidden="true">→</span></a
            >
          </section>
        }
      }
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
  readonly articleSlug = ArticleSlug;
  readonly categories = guideCategories;
  readonly guidesBreadcrumbs: readonly Breadcrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Guides' },
  ];
  readonly toolsBreadcrumbs: readonly Breadcrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Tools' },
  ];
  readonly toolsBreadcrumbSchema = [
    { label: 'Home', path: '/' },
    { label: 'Tools', path: '/tools' },
  ] as const;
  readonly tools = [
    {
      name: 'Hair Brush Finder',
      type: 'Choose a brush',
      description:
        'Narrow down brush shapes and bristles for your length, texture, and usual styling goal.',
      path: '/hair-brush-finder',
      action: 'Use the finder',
    },
    {
      name: 'Hair Tool Routine Builder',
      type: 'Build a smaller toolkit',
      description:
        'Choose a few useful tool categories for your ordinary routine before adding more.',
      path: '/hair-tool-routine-builder',
      action: 'Build a routine',
    },
    {
      name: 'Hair Dryer Feature Finder',
      type: 'Choose a dryer',
      description:
        'Identify the dryer features and attachments that may matter most for your routine.',
      path: '/guides/how-to-choose-hair-dryer',
      action: 'Use the finder',
    },
    {
      name: 'Hair Dryer Settings Finder',
      type: 'Start a blow-dry',
      description:
        'Find a comfort-led heat and airflow starting point for the style you are making.',
      path: '/guides/hair-dryer-heat-and-speed-settings-guide',
      action: 'Find a starting point',
    },
    {
      name: 'Blow-Dry Routine Planner',
      type: 'Plan a blow-dry',
      description:
        'Build a simple sequence around the finish you want, from drying prep to the attachment and final pass.',
      path: '/guides/how-to-blow-dry-hair',
      action: 'Plan a routine',
    },
    {
      name: 'Hair Dryer Specs Decoder',
      type: 'Read a label',
      description:
        'Turn common dryer label details into a practical next step for home or travel use.',
      path: '/guides/hair-dryer-wattage-guide',
      action: 'Decode the details',
    },
    {
      name: 'Round Brush Size Finder',
      type: 'Choose a barrel',
      description:
        'Use your length and styling goal to choose a sensible round-brush size to start with.',
      path: '/guides/round-brush-size-guide',
      action: 'Find a brush size',
    },
    {
      name: 'Heat Protectant Finder',
      type: 'Choose an application format',
      description:
        'Use your styling routine and the product directions to choose a practical format and application point.',
      path: '/guides/heat-protectant-spray-vs-cream',
      action: 'Use the finder',
    },
  ] as const;
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
      tools: [
        'Interactive Hair Tools | Comb Report',
        'Browser-based helpers for choosing and using everyday hair styling tools.',
        '/tools',
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
      this.page === 'tools'
        ? this.toolsBreadcrumbSchema
        : this.page === 'guides'
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
