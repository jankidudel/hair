import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { articleIndexGroups } from './content.generated';
import { SiteSeoService, SITE_URL } from './site-seo.service';
@Component({
  imports: [RouterLink],
  template: `@switch (page) {
    @case ('home') {
      <section class="hero">
        <p class="eyebrow">Hair appearance, simply explained</p>
        <h1>Everyday routines for hair that feels like you.</h1>
        <p>
          Practical guides, styling tools, and thoughtful product
          comparisons—focused on appearance and everyday care.
        </p>
        <a class="button" routerLink="/guides">Browse guides</a>
      </section>
    }
    @case ('guides') {
      <section>
        <p class="eyebrow">Guides</p>
        <h1>Hair tools and routine guides</h1>
        @for (group of articleIndexGroups; track group.id) {
          <section class="article-group">
            <h2>{{ group.label }}</h2>
            <div class="cards">
              @for (article of group.articles; track article.slug) {
                <a class="card" [routerLink]="['/guides', article.slug]"
                  ><h3>{{ article.heading }}</h3>
                  <span>{{ article.description }}</span></a
                >
              }
            </div>
          </section>
        }
      </section>
    }
    @case ('hair-care') {
      <section>
        <p class="eyebrow">Hair care</p>
        <h1>Hair care guides</h1>
        <div class="cards">
          @for (article of hairCareArticles; track article.slug) {
            <a class="card" [routerLink]="['/guides', article.slug]"
              ><h2>{{ article.heading }}</h2>
              <span>{{ article.description }}</span></a
            >
          }
        </div>
      </section>
    }
    @case ('products') {
      <section>
        <p class="eyebrow">Products</p>
        <h1>Product comparisons, coming soon</h1>
        <p>
          We’re building clear comparisons for brushes, shampoos, and styling
          tools.
        </p>
      </section>
    }
    @case ('about') {
      <section>
        <h1>About Comb Report</h1>
        <p>
          We make appearance-focused hair care easier to navigate with useful,
          plainly written guides.
        </p>
      </section>
    }
    @case ('privacy') {
      <section>
        <h1>Privacy</h1>
        <p>Privacy details will be published here before launch.</p>
      </section>
    }
    @case ('affiliate') {
      <section>
        <h1>Affiliate disclosure</h1>
        <p>
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
  readonly articleIndexGroups = articleIndexGroups;
  readonly hairCareArticles =
    articleIndexGroups.find((group) => group.id === 'hair-care')?.articles ??
    [];
  page = 'home';
  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'] as string;
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
      'hair-care': [
        'Hair Care Guides | Comb Report',
        'Practical hair care guides for everyday styling routines.',
        '/hair-care',
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
    const [title, description, path] = data[this.page];
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
    );
  }
}
