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
import { combReportEditorialTeam } from './editorial';

@Component({
  imports: [RouterLink, BreadcrumbsComponent],
  styleUrl: 'static-page.component.css',
  template: `@switch (page) {
    @case ('home') {
      <section class="home-hero">
        <div class="hero-copy">
          <p class="eyebrow">Hair appearance, simply explained</p>
          <h1>Choose hair tools with clear, specification-led guidance.</h1>
          <p class="hero-lede">
            Independent, source-linked help for comparing dryers, styling tools
            and brushes. We explain published specifications and routine
            trade-offs; we do not claim hands-on testing where we have not done
            it.
          </p>
          <a class="button" routerLink="/guides/how-to-choose-hair-dryer"
            >Find a blow dryer</a
          >
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
          <a routerLink="/guides/how-to-choose-hair-dryer"
            ><span>01</span> Find a blow dryer <b>→</b></a
          >
          <a routerLink="/products"
            ><span>02</span> Compare styling tools <b>→</b></a
          >
          <a routerLink="/hair-brush-finder"
            ><span>03</span> Choose a brush <b>→</b></a
          >
          <a routerLink="/flat-irons"
            ><span>04</span> Explore direct-heat tools <b>→</b></a
          >
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
        <p>
          <a routerLink="/testing-research-methodology">How we research</a>
          · <a routerLink="/about">About Comb Report</a> ·
          <a routerLink="/corrections-policy">Report a correction</a> ·
          <a routerLink="/affiliate-disclosure">How affiliate links work</a>
        </p>
      </section>
    }
    @case ('guides') {
      <app-breadcrumbs [items]="guidesBreadcrumbs" />
      <section class="listing-intro guides-intro">
        <p class="eyebrow">Guides</p>
        <h1>Hair tools and routine guides</h1>
        <p class="lede">
          Start with a decision tool, then use a source-linked guide for the
          product, size, or format decision in front of you.
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
      <section class="category-hubs" aria-labelledby="troubleshooting-heading">
        <div class="section-heading">
          <p class="eyebrow">Solve a styling problem</p>
          <h2 id="troubleshooting-heading">Styling-tool troubleshooting</h2>
        </div>
        <p>
          Start with the symptom you can see: a blowout that falls, frizz during
          brushing, a curl that drops, a snag, or an attachment that may not
          fit.
        </p>
        <a
          class="text-link"
          [routerLink]="['/guides', articleSlug.StylingToolTroubleshooting]"
          >Choose a troubleshooting guide <span aria-hidden="true">→</span></a
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
          class="category-product-explorer"
          aria-labelledby="start-here-heading"
        >
          <p class="eyebrow">Start here</p>
          <h2 id="start-here-heading">Choose your next step</h2>
          <ul>
            @for (link of categoryStartLinks; track link.path) {
              <li>
                <a [routerLink]="link.path">{{ link.label }}</a> —
                {{ link.description }}
              </li>
            }
          </ul>
        </section>
        @for (section of categoryGuideSections; track section.label) {
          <section
            class="category-guide-section"
            [attr.aria-labelledby]="section.id"
          >
            <div class="section-heading">
              <p class="eyebrow">{{ section.eyebrow }}</p>
              <h2 [id]="section.id">{{ section.label }}</h2>
            </div>
            <div class="editorial-grid guides-grid">
              @for (article of section.articles; track article.slug) {
                <a class="guide-card" [routerLink]="['/guides', article.slug]"
                  ><p class="eyebrow">{{ article.category }}</p>
                  <h3>
                    {{
                      article.slug === articleSlug.HairDryerChooser
                        ? 'Choose a Hair Dryer'
                        : article.heading
                    }}
                  </h3>
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
            </div>
          </section>
        }
        @if (
          category.id === 'hair-dryers' ||
          category.id === 'hot-air-brushes' ||
          category.id === 'brushes-and-combs'
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
    @case ('flat-irons') {
      <section class="listing-intro">
        <p class="eyebrow">Direct-heat tools</p>
        <h1>Flat irons and hair straighteners</h1>
        <p class="lede">
          Choose a flat-iron format by plate width, controls and documented
          travel details—not a promise about results.
        </p>
      </section>
      <section class="category-product-explorer">
        <p class="eyebrow">Start here</p>
        <h2>Choose your next step</h2>
        <ul>
          <li>
            <a routerLink="/flat-iron-finder">Use the Flat Iron Finder</a> —
            narrow a practical profile.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.FlatIronPlateWidthGuide]"
              >Compare plate widths</a
            >
            — use inches-first practical bands.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.BestFlatIrons]"
              >Compare researched models</a
            >
            — inspect exact US source records.
          </li>
        </ul>
        <p>
          Specifications are researched from official sources. Follow the exact
          manufacturer instructions; no plate material or feature guarantees a
          styling outcome.
        </p>
      </section>
    }
    @case ('curling-irons') {
      <section class="listing-intro">
        <p class="eyebrow">Direct-heat tools</p>
        <h1>Curling irons, wands and barrel sizes</h1>
        <p class="lede">
          Choose a clamp, wand or tapered format and a practical barrel-size
          band for the routine you want.
        </p>
      </section>
      <section class="category-product-explorer">
        <p class="eyebrow">Start here</p>
        <h2>Choose your next step</h2>
        <ul>
          <li>
            <a routerLink="/curling-tool-finder">Use the Curling Tool Finder</a>
            — compare clamp and wand formats.
          </li>
          <li>
            <a
              [routerLink]="['/guides', articleSlug.CurlingIronBarrelSizeGuide]"
              >Compare barrel sizes</a
            >
            — sizes influence possible results, not guarantees.
          </li>
          <li>
            <a [routerLink]="['/guides', articleSlug.BestCurlingIrons]"
              >Compare researched models</a
            >
            — inspect exact US source records.
          </li>
        </ul>
        <p>
          Hair length, sections, technique and the exact instructions affect the
          result. Product specifications do not prove curl longevity or
          performance.
        </p>
      </section>
    }
    @case ('about') {
      <section class="listing-intro">
        <p class="eyebrow">About</p>
        <h1>About Comb Report</h1>
        <p class="lede">
          Comb Report helps readers in English-speaking markets choose hair
          tools for ordinary grooming and styling routines.
        </p>
        <p>
          We cover blow dryers, hot-air brushes, brushes and combs, flat irons,
          and curling tools. Our goal is to make a tool decision clearer with
          practical trade-offs and source-linked specifications—not to promise a
          universal result or give medical advice.
        </p>
        <p>
          Pages are labelled to distinguish specification research from
          editorial guidance. We publish a named author, reviewer, or test claim
          only when the underlying identity and evidence are available. Read our
          <a routerLink="/testing-research-methodology">methodology</a>,
          <a routerLink="/affiliate-disclosure">affiliate disclosure</a>, or
          <a routerLink="/corrections-policy">corrections policy</a> for more.
        </p>
      </section>
    }
    @case ('author') {
      <section class="listing-intro">
        <p class="eyebrow">Editorial identity</p>
        <h1>{{ editorialTeam.name }}</h1>
        <p class="lede">{{ editorialTeam.description }}</p>
        <p>
          Read our <a routerLink="/editorial-policy">editorial policy</a> and
          <a routerLink="/testing-research-methodology">research methodology</a>
          for how labels and sources are used.
        </p>
      </section>
    }
    @case ('editorial-policy') {
      <section class="listing-intro">
        <p class="eyebrow">Standards</p>
        <h1>Editorial policy</h1>
        <p class="lede">
          Comb Report publishes appearance-focused grooming guidance. We aim to
          separate practical editorial advice from sourced product facts.
        </p>
        <h2>What we publish</h2>
        <p>
          We do not present a product as hands-on tested, expert reviewed, or
          commercially recommended without the evidence needed for that label.
          Product specifications should link to a source and state when they
          were checked.
        </p>
        <h2>Corrections and updates</h2>
        <p>
          Material corrections are reflected in the article record. Contact us
          with a specific correction or source so it can be assessed.
        </p>
      </section>
    }
    @case ('methodology') {
      <section class="listing-intro">
        <p class="eyebrow">Standards</p>
        <h1>Testing and research methodology</h1>
        <p class="lede">
          Every guide is labelled so readers can distinguish editorial guidance
          from sourced product research.
        </p>
        <h2>Content-method labels</h2>
        <ul>
          <li>
            <strong>Editorial guide:</strong> practical guidance without a claim
            of product testing.
          </li>
          <li>
            <strong>Specification researched:</strong> factual product details
            traced to published sources.
          </li>
          <li>
            <strong>Expert reviewed:</strong> used only with a named, verified
            reviewer and review date.
          </li>
          <li>
            <strong>Hands-on tested:</strong> used only with documented tester,
            protocol, date, and original evidence.
          </li>
        </ul>
        <p>
          Prices, retailer availability, and bundles can change. We do not treat
          them as permanent facts unless they are maintained.
        </p>
        <h2>How we select products</h2>
        <p>
          We begin with an exact model and its official product or support
          material for the market named on the page. Electrical ratings, bundles
          and availability can differ across countries. A product is included
          only when its published details help answer the page’s specific
          decision; unavailable or unclear facts stay marked as such rather than
          being inferred.
        </p>
      </section>
    }
    @case ('corrections') {
      <section class="listing-intro">
        <p class="eyebrow">Standards</p>
        <h1>Corrections policy</h1>
        <p class="lede">
          If you spot an inaccurate specification, broken source, or misleading
          statement, send us the page and supporting source.
        </p>
        <p>
          We assess substantiated corrections and update material inaccuracies.
          We do not alter dates merely because a page is rebuilt.
        </p>
      </section>
    }
    @case ('contact') {
      <section class="listing-intro">
        <p class="eyebrow">Contact</p>
        <h1>Contact Comb Report</h1>
        <p class="lede">
          For corrections, source information, or business enquiries, please use
          the contact channel provided by the site owner.
        </p>
        <p>
          Contact details are awaiting owner confirmation and are not yet
          published.
        </p>
      </section>
    }
    @case ('privacy') {
      <section class="listing-intro">
        <p class="eyebrow">Privacy</p>
        <h1>Privacy</h1>
        <p class="lede">
          Comb Report can be read without creating an account. The browser keeps
          your analytics choice on this device so the site can remember it.
        </p>
        <h2>Optional analytics</h2>
        <p>
          Google Analytics is loaded only after you choose “Accept analytics” in
          the consent banner. It records page views and may use cookies to help
          us understand site use. We configure it without Google signals or
          ad-personalization signals. Choosing “Reject” does not load the
          analytics script. You can change your choice by clearing this site's
          browser storage; the banner will then appear again.
        </p>
        <h2>Site delivery and outside links</h2>
        <p>
          The site host may process technical request information needed to
          deliver pages and protect the service. Links to manufacturers and
          other sites take you to services with their own privacy practices. We
          do not publish a contact form or ask you to submit personal details
          through this site.
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
  readonly editorialTeam = combReportEditorialTeam;
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
      name: 'Flat Iron Finder',
      type: 'Choose a flat iron',
      description:
        'Use plate-width and handling preferences to identify a practical profile.',
      path: '/flat-iron-finder',
      action: 'Use the finder',
    },
    {
      name: 'Curling Tool Finder',
      type: 'Choose a curling format',
      description:
        'Compare clamp, wand and barrel-size trade-offs without a rigid rule.',
      path: '/curling-tool-finder',
      action: 'Use the finder',
    },
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
  categoryGuideSections: readonly {
    id: string;
    eyebrow: string;
    label: string;
    articles: typeof articles;
  }[] = [];
  categoryStartLinks: readonly {
    label: string;
    path: string;
    description: string;
  }[] = [];
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
      const classify = (slug: string) => {
        if (/\bvs\b/.test(slug)) return 'compare';
        if (/^how-to|how-often|can-you-use/.test(slug)) return 'learn';
        return 'choose';
      };
      const groups = [
        ['choose', 'Choose by routine or tool', 'Selection and feature guides'],
        ['compare', 'Compare formats and options', 'Decision frameworks'],
        ['learn', 'Learn use and maintenance', 'Tutorials and care'],
      ] as const;
      this.categoryGuideSections = groups
        .map(([id, label, eyebrow]) => ({
          id: `${categoryId}-${id}-guides`,
          label,
          eyebrow,
          articles: this.categoryArticles.filter(
            (article) => classify(article.slug) === id,
          ),
        }))
        .filter((section) => section.articles.length > 0);
      const startLinks: Record<
        string,
        readonly { label: string; path: string; description: string }[]
      > = {
        'hair-dryers': [
          {
            label: 'Use the Hair Dryer Finder',
            path: '/guides/how-to-choose-hair-dryer',
            description: 'turn your routine into a feature checklist',
          },
          {
            label: 'Compare Dyson and Shark',
            path: '/guides/dyson-supersonic-vs-shark-speedstyle',
            description:
              'check source-linked US specifications and bundle limits',
          },
          {
            label: 'Plan international travel',
            path: '/guides/best-travel-hair-dryers',
            description: 'start with voltage compatibility',
          },
        ],
        'hot-air-brushes': [
          {
            label: 'Choose a hot-air brush',
            path: '/guides/best-hot-air-brushes',
            description: 'compare a brush-led dryer with other tool formats',
          },
          {
            label: 'Compare options for fine hair',
            path: '/guides/best-hot-air-brushes-fine-hair',
            description: 'focus on published controls and head shape',
          },
          {
            label: 'Check barrel size',
            path: '/guides/hot-air-brush-barrel-size-guide',
            description: 'match section length and styling control',
          },
        ],
        'brushes-and-combs': [
          {
            label: 'Use the Hair Brush Finder',
            path: '/hair-brush-finder',
            description: 'choose a tool category from your main task',
          },
          {
            label: 'Choose a brush by job',
            path: '/guides/how-to-choose-hair-brush',
            description: 'separate detangling, smoothing and blow-dry needs',
          },
          {
            label: 'Compare detangling options',
            path: '/guides/best-detangling-brushes',
            description: 'check wet-use directions, spacing and form factor',
          },
        ],
      };
      this.categoryStartLinks = startLinks[categoryId] ?? [];
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
      'flat-irons': [
        'Flat Irons and Hair Straighteners | Comb Report',
        'Compare flat-iron plate widths, controls and researched US models.',
        '/flat-irons',
      ],
      'curling-irons': [
        'Curling Irons and Wands | Comb Report',
        'Compare curling-tool formats, barrel sizes and researched US models.',
        '/curling-irons',
      ],
      about: ['About | Comb Report', 'About Comb Report.', '/about'],
      privacy: ['Privacy | Comb Report', 'Privacy information.', '/privacy'],
      affiliate: [
        'Affiliate Disclosure | Comb Report',
        'How affiliate links support Comb Report.',
        '/affiliate-disclosure',
      ],
      author: [
        'Comb Report Editorial Team | Comb Report',
        'The transparent interim editorial identity for Comb Report.',
        '/authors/combreport-editorial-team',
      ],
      'editorial-policy': [
        'Editorial Policy | Comb Report',
        'How Comb Report labels and maintains editorial content.',
        '/editorial-policy',
      ],
      methodology: [
        'Testing and Research Methodology | Comb Report',
        'How Comb Report distinguishes editorial guidance, research, review, and testing.',
        '/testing-research-methodology',
      ],
      corrections: [
        'Corrections Policy | Comb Report',
        'How to report and assess a correction on Comb Report.',
        '/corrections-policy',
      ],
      contact: ['Contact | Comb Report', 'Contact Comb Report.', '/contact'],
    };
    const pageData =
      this.page === 'category' && this.category
        ? [this.category.title, this.category.description, this.category.path]
        : data[this.page];
    const [title, description, path] = pageData;
    if (this.page === 'contact') {
      this.seo.applyNoIndex(title, description);
      return;
    }
    this.seo.set(
      title,
      description,
      path,
      this.page === 'home'
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Comb Report',
              url: SITE_URL,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Comb Report',
              url: SITE_URL,
            },
          ]
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
