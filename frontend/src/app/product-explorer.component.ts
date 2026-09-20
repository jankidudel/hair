import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import { articles } from './content.generated';
import {
  comparisonFacts,
  comparisonForProduct,
  canonicalComparisons,
  productBySlug,
  productProfiles,
  ProductCategory,
  parseProductSelection,
  type CanonicalComparison,
  type PriceTier,
  type ProductProfile,
} from './product-comparisons';
import { SiteSeoService } from './site-seo.service';

type CategoryFilter = ProductCategory | 'all';
type PriceFilter = PriceTier | 'all';

const productCategoryChoiceCopy: Readonly<Record<ProductCategory, string>> = {
  [ProductCategory.HairDryer]:
    'You may prefer a dedicated hair dryer if your routine is centred on drying and the particular attachments included with that exact model.',
  [ProductCategory.HotAirBrush]:
    'You may prefer a hot-air brush when a brush-led, smooth or softly shaped finish is your usual goal. Decide whether one fixed barrel or several attachments better matches the steps you actually use.',
  [ProductCategory.MultiStyler]:
    'You may prefer a multi-styler if you want a dryer and several styling formats in one system, and expect to use the included attachments.',
  [ProductCategory.HairBrush]:
    'You may prefer a brush when the task is detangling, smoothing, or sectioning rather than heated styling. Check wet-use and care directions for the exact brush.',
  [ProductCategory.FlatIron]:
    'You may prefer a flat iron when plate width and close-section control match the finishing step you actually want. Follow the exact model instructions.',
  [ProductCategory.CurlingIron]:
    'You may prefer a clamp curling iron when that format suits your handling preference. Barrel size influences the possible result but does not guarantee it.',
  [ProductCategory.CurlingWand]:
    'You may prefer a clipless curling wand when that wrapping format suits your handling preference. Check the exact model directions and included accessories.',
};

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
              Specifications come from an official US manufacturer or support
              source, linked with each stated fact and its check date.
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
        <section class="selected-comparison" aria-labelledby="selected-heading">
          <h2 id="selected-heading">Compare up to three products</h2>
          <p class="product-source" aria-live="polite">
            {{ selectedSlugs.length }} of 3 selected. The selection is stored in
            the page URL so you can copy or bookmark it.
          </p>
          @if (selectedProducts.length) {
            <div
              class="comparison-scroll"
              tabindex="0"
              aria-label="Selected product comparison"
            >
              <table class="comparison-matrix">
                <thead>
                  <tr>
                    <th scope="col">Published detail</th>
                    @for (product of selectedProducts; track product.slug) {
                      <th scope="col">{{ product.name }}</th>
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Type</th>
                    @for (product of selectedProducts; track product.slug) {
                      <td>{{ product.subtype }}</td>
                    }
                  </tr>
                  <tr>
                    <th scope="row">Evidence</th>
                    @for (product of selectedProducts; track product.slug) {
                      <td>
                        {{
                          product.evidenceStatus === 'specification-researched'
                            ? 'Specification researched'
                            : 'Limited specification coverage'
                        }}
                      </td>
                    }
                  </tr>
                  <tr>
                    <th scope="row">Checked</th>
                    @for (product of selectedProducts; track product.slug) {
                      <td>{{ product.verifiedAt }}</td>
                    }
                  </tr>
                  <tr>
                    <th scope="row">Availability</th>
                    @for (product of selectedProducts; track product.slug) {
                      <td>
                        {{
                          product.availability === 'available'
                            ? 'Available at last check'
                            : 'Recheck before purchase'
                        }}
                      </td>
                    }
                  </tr>
                  <tr>
                    <th scope="row">Source</th>
                    @for (product of selectedProducts; track product.slug) {
                      <td>
                        <a
                          [href]="product.officialProductUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          (click)="trackOutbound(product.slug)"
                          >Official US source</a
                        >
                      </td>
                    }
                  </tr>
                </tbody>
              </table>
            </div>
          }
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
                  {{
                    product.evidenceStatus === 'specification-researched'
                      ? 'Specification researched'
                      : 'Limited specification coverage'
                  }}
                  · checked {{ product.verifiedAt }}.
                </p>
                @if (product.conflictNote) {
                  <p class="product-source">{{ product.conflictNote }}</p>
                }
                <button
                  type="button"
                  class="compare-toggle"
                  [class.selected]="isSelected(product.slug)"
                  [attr.aria-pressed]="isSelected(product.slug)"
                  [disabled]="
                    !isSelected(product.slug) && selectedSlugs.length >= 3
                  "
                  (click)="toggleProduct(product.slug)"
                >
                  {{
                    isSelected(product.slug)
                      ? 'Remove from comparison'
                      : 'Add to comparison'
                  }}
                </button>
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
                    (click)="trackOutbound(product.slug)"
                    >Official US source <span aria-hidden="true">↗</span></a
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
  private readonly router = inject(Router);
  private readonly seo = inject(SiteSeoService);
  private readonly analytics = inject(AnalyticsService);
  readonly categoryFilters: readonly {
    label: string;
    value: CategoryFilter;
  }[] = [
    { label: 'All', value: 'all' },
    { label: 'Hair Dryers', value: ProductCategory.HairDryer },
    { label: 'Multi-stylers', value: ProductCategory.MultiStyler },
    { label: 'Hot-Air Brushes', value: ProductCategory.HotAirBrush },
    { label: 'Hair Brushes', value: ProductCategory.HairBrush },
    { label: 'Flat Irons', value: ProductCategory.FlatIron },
    { label: 'Curling Irons', value: ProductCategory.CurlingIron },
    { label: 'Curling Wands', value: ProductCategory.CurlingWand },
  ];
  readonly priceFilters: readonly { label: string; value: PriceFilter }[] = [
    { label: 'All price tiers', value: 'all' },
    { label: 'Entry', value: 'entry' },
    { label: 'Mid-range', value: 'mid-range' },
    { label: 'Premium', value: 'premium' },
  ];
  categoryFilter: CategoryFilter = 'all';
  priceFilter: PriceFilter = 'all';
  selectedSlugs: string[] = [];
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
  get selectedProducts(): readonly ProductProfile[] {
    return this.selectedSlugs
      .map(productBySlug)
      .filter((product): product is ProductProfile => product !== undefined);
  }
  ngOnInit(): void {
    const comparisonSlug = this.route.snapshot.paramMap.get('comparison');
    this.selectedSlugs = [
      ...parseProductSelection(
        this.route.snapshot.queryParamMap.get('compare'),
      ),
    ];
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
  isSelected(slug: string): boolean {
    return this.selectedSlugs.includes(slug);
  }
  toggleProduct(slug: string): void {
    if (this.isSelected(slug)) {
      this.selectedSlugs = this.selectedSlugs.filter((item) => item !== slug);
    } else if (this.selectedSlugs.length < 3) {
      this.selectedSlugs = [...this.selectedSlugs, slug];
    }
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        compare: this.selectedSlugs.length
          ? this.selectedSlugs.join(',')
          : null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    this.analytics.track('product_explorer_selection', {
      selected_count: this.selectedSlugs.length,
    });
  }
  trackOutbound(slug: string): void {
    this.analytics.track('product_explorer_outbound_click', {
      product_slug: slug,
    });
  }
  categoryLabel(category: ProductCategory): string {
    return (
      this.categoryFilters.find((filter) => filter.value === category)?.label ??
      category
    );
  }
  get choiceCopy(): string {
    return this.firstProduct
      ? productCategoryChoiceCopy[this.firstProduct.category]
      : '';
  }
}
