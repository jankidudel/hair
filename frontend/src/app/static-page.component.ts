import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { articles } from './content.generated';
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
        <h1>Hair care guides</h1>
        <div class="cards">
          @for (article of articles; track article.slug) {
            <a class="card" [routerLink]="['/guides', article.slug]"
              ><p>{{ article.category }}</p>
              <h2>{{ article.title }}</h2>
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
        <h1>About Everyday Hair</h1>
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
  readonly articles = articles;
  page = 'home';
  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'] as string;
    const data: Record<string, [string, string, string]> = {
      home: [
        'Everyday Hair | Practical Hair Care Guides',
        'Appearance-focused hair routines, guides, and product comparisons.',
        '/',
      ],
      guides: [
        'Hair Care Guides | Everyday Hair',
        'Practical hair-care guides for everyday routines.',
        '/guides',
      ],
      products: [
        'Products | Everyday Hair',
        'Hair tools and product comparisons.',
        '/products',
      ],
      about: ['About | Everyday Hair', 'About Everyday Hair.', '/about'],
      privacy: ['Privacy | Everyday Hair', 'Privacy information.', '/privacy'],
      affiliate: [
        'Affiliate Disclosure | Everyday Hair',
        'How affiliate links support Everyday Hair.',
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
            name: 'Everyday Hair',
            url: SITE_URL,
          }
        : undefined,
    );
  }
}
