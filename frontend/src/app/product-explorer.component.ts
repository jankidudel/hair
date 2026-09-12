import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { articles } from './content.generated';
import {
  comparisonFacts,
  comparisonForProduct,
  canonicalComparisons,
  productBySlug,
  productProfiles,
  type CanonicalComparison,
  type PriceTier,
  type ProductCategory,
  type ProductProfile,
} from './product-comparisons';
import { SiteSeoService } from './site-seo.service';

type CategoryFilter = ProductCategory | 'all';
type PriceFilter = PriceTier | 'all';

@Component({
  imports: [RouterLink],
  styleUrl: 'product-explorer.component.css',
  template: `@if (comparison) {
      <section class="comparison-page">
        <p class="eyebrow">Specification-led comparison</p>
        <h1>{{ firstProduct?.name }} vs {{ secondProduct?.name }}</h1>
        <p class="lede">
          This is a comparison of published manufacturer specifications, not a
          hands-on product test or ranking.
        </p>
        <table class="comparison-matrix">
          <thead>
            <tr>
              <th scope="col">Specification</th>
              <th scope="col">{{ firstProduct?.name }}</th>
              <th scope="col">{{ secondProduct?.name }}</th>
            </tr>
          </thead>
          <tbody>
            @for (fact of facts; track fact.label) {
              <tr>
                <th scope="row">{{ fact.label }}</th>
                <td>
                  @if (fact.first) {
                    <a
                      [href]="fact.first.sourceUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ fact.first.value }}
                      <span class="external-label">Official source</span></a
                    >
                  } @else {
                    Not confirmed
                  }
                </td>
                <td>
                  @if (fact.second) {
                    <a
                      [href]="fact.second.sourceUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ fact.second.value }}
                      <span class="external-label">Official source</span></a
                    >
                  } @else {
                    Not confirmed
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
        <section class="comparison-guidance">
          <h2>Choose this type of tool if…</h2>
          <p>{{ choiceCopy }}</p>
        </section>
        <section class="comparison-guidance">
          <h2>The trade-off to consider</h2>
          <p>
            Attachments and bundles can change by exact model and market. Check
            the official specification page for the package available to you; a
            feature list cannot predict the same result for every routine.
          </p>
        </section>
        <section class="comparison-guidance">
          <h2>Read next</h2>
          <p>
            <a [routerLink]="['/guides', comparison.guideSlug]"
              >Read the full editorial comparison</a
            >
            and use the related buying guides below to consider your routine.
          </p>
          <ul>
            @for (guide of relatedGuides; track guide.slug) {
              <li>
                <a [routerLink]="['/guides', guide.slug]">{{
                  guide.heading
                }}</a>
              </li>
            }
          </ul>
        </section>
      </section>
    } @else {
      <section class="products-page">
        <div class="listing-intro">
          <p class="eyebrow">Product explorer</p>
          <h1>Compare Hair Tools Before You Buy</h1>
          <p class="lede">
            Combreport compares published manufacturer specifications and
            practical feature trade-offs. We do not treat a feature list as a
            substitute for hands-on testing, and we show sources so you can
            check the details before buying.
          </p>
          <p>
            <a routerLink="/affiliate-disclosure"
              >Read the affiliate disclosure</a
            >
          </p>
        </div>
        <section
          class="how-we-compare"
          id="how-we-compare"
          aria-labelledby="how-we-compare-heading"
        >
          <h2 id="how-we-compare-heading">How we compare products</h2>
          <ol>
            <li>
              Specifications come from the current official manufacturer page,
              linked with each stated fact.
            </li>
            <li>
              Features do not guarantee the same result for every person or
              routine.
            </li>
            <li>
              Prices and availability change, so we use broad price tiers rather
              than treating them as permanent facts.
            </li>
            <li>
              Official specifications describe the product; our editorial guides
              explain the routine trade-offs.
            </li>
          </ol>
        </section>
        <section class="product-filters" aria-labelledby="filter-heading">
          <h2 id="filter-heading">Explore by tool type</h2>
          <div class="filter-group" aria-label="Filter by category">
            @for (filter of categoryFilters; track filter.value) {
              <button
                type="button"
                [class.selected]="categoryFilter === filter.value"
                [attr.aria-pressed]="categoryFilter === filter.value"
                (click)="categoryFilter = filter.value"
              >
                {{ filter.label }}
              </button>
            }
          </div>
          <div class="filter-group" aria-label="Filter by price tier">
            @for (filter of priceFilters; track filter.value) {
              <button
                type="button"
                [class.selected]="priceFilter === filter.value"
                [attr.aria-pressed]="priceFilter === filter.value"
                (click)="priceFilter = filter.value"
              >
                {{ filter.label }}
              </button>
            }
          </div>
        </section>
        @if (filteredProducts.length) {
          <section class="product-grid" aria-label="Product profiles">
            @for (product of filteredProducts; track product.slug) {
              <article class="product-card">
                <p class="eyebrow">
                  {{ categoryLabel(product.category) }} ·
                  {{ product.priceTier }}
                </p>
                <h2>{{ product.name }}</h2>
                <p class="product-source">
                  Manufacturer specifications checked; bundles vary by market.
                </p>
                <h3>May suit a routine where…</h3>
                <ul>
                  @for (tag of product.bestFor; track tag) {
                    <li>{{ tag }}</li>
                  }
                </ul>
                <div class="product-actions">
                  @if (
                    comparisonForProduct(product.slug);
                    as productComparison
                  ) {
                    <a class="button" [routerLink]="productComparison.path"
                      >View comparison</a
                    >
                  }
                  <a
                    class="official-link"
                    [href]="product.officialProductUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Official specifications
                    <span aria-hidden="true">↗</span></a
                  >
                </div>
                <p class="related-guide">
                  <a [routerLink]="['/guides', product.relatedGuideSlugs[0]]"
                    >Related buying guide</a
                  >
                </p>
              </article>
            }
          </section>
        } @else {
          <p class="empty-state" role="status">
            No profiles match those filters. Try another tool type or price
            tier.
          </p>
        }
      </section>
    }`,
})
export class ProductExplorerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SiteSeoService);
  readonly categoryFilters: readonly {
    label: string;
    value: CategoryFilter;
  }[] = [
    { label: 'All', value: 'all' },
    { label: 'Hair Dryers', value: 'hair-dryer' },
    { label: 'Multi-stylers', value: 'multi-styler' },
    { label: 'Hot-Air Brushes', value: 'hot-air-brush' },
  ];
  readonly priceFilters: readonly { label: string; value: PriceFilter }[] = [
    { label: 'All price tiers', value: 'all' },
    { label: 'Entry', value: 'entry' },
    { label: 'Mid-range', value: 'mid-range' },
    { label: 'Premium', value: 'premium' },
  ];
  categoryFilter: CategoryFilter = 'all';
  priceFilter: PriceFilter = 'all';
  comparison?: CanonicalComparison;
  firstProduct?: ProductProfile;
  secondProduct?: ProductProfile;
  facts: ReturnType<typeof comparisonFacts> = [];
  relatedGuides: readonly (typeof articles)[number][] = [];
  get filteredProducts(): readonly ProductProfile[] {
    return productProfiles.filter(
      (product) =>
        (this.categoryFilter === 'all' ||
          product.category === this.categoryFilter) &&
        (this.priceFilter === 'all' || product.priceTier === this.priceFilter),
    );
  }
  ngOnInit(): void {
    const comparisonSlug = this.route.snapshot.paramMap.get('comparison');
    this.comparison = canonicalComparisons.find(
      (entry) => entry.slug === comparisonSlug,
    );
    if (this.comparison) {
      [this.firstProduct, this.secondProduct] =
        this.comparison.productSlugs.map(productBySlug);
      if (!this.firstProduct || !this.secondProduct) return;
      this.facts = comparisonFacts(this.firstProduct, this.secondProduct);
      this.relatedGuides = articles
        .filter(
          (article) =>
            this.comparison?.guideSlug === article.slug ||
            this.firstProduct?.relatedGuideSlugs.includes(article.slug) ||
            this.secondProduct?.relatedGuideSlugs.includes(article.slug),
        )
        .slice(0, 4);
      this.seo.set(
        `${this.firstProduct.name} vs ${this.secondProduct.name} | Combreport`,
        `Compare published manufacturer specifications for ${this.firstProduct.name} and ${this.secondProduct.name}.`,
        this.comparison.path,
      );
      return;
    }
    this.seo.set(
      'Hair Tool Comparison Explorer | Combreport',
      'Compare hair-dryer and styling-tool features, understand trade-offs and find the relevant Combreport buying guides.',
      '/products',
    );
  }
  comparisonForProduct(slug: string): CanonicalComparison | undefined {
    return comparisonForProduct(slug);
  }
  categoryLabel(category: ProductCategory): string {
    return (
      this.categoryFilters.find((filter) => filter.value === category)?.label ??
      category
    );
  }
  get choiceCopy(): string {
    return this.firstProduct?.category === 'hair-dryer'
      ? 'You may prefer a dedicated hair dryer if your routine is centred on drying and the particular attachments included with that exact model.'
      : 'You may prefer a multi-styler if you want a dryer and several styling formats in one system, and expect to use the included attachments.';
  }
}
