import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { articles, Article } from './content.generated';
import { SiteSeoService, SITE_URL } from './site-seo.service';
import { Breadcrumb, BreadcrumbsComponent } from './breadcrumbs.component';
import { ArticleSlug } from './article-slug';
import { guideCategoryById } from './article-registry';
import { combReportEditorialTeam, contentMethodLabel } from './editorial';
import { RoundBrushSizeFinderComponent } from './round-brush-size-finder.component';
import { HairDryerFinderComponent } from './hair-dryer-finder.component';
import { HairDryerSpecsDecoderComponent } from './hair-dryer-specs-decoder.component';
import { HairDryerSettingsFinderComponent } from './hair-dryer-settings-finder.component';
import { StraighteningBrushFinderComponent } from './straightening-brush-finder.component';
import { HeatProtectantFinderComponent } from './heat-protectant-finder.component';
import { BlowDryRoutinePlannerComponent } from './blow-dry-routine-planner.component';
import { guideLinkMap } from './guide-link-map';
import { DecisionSnapshotComponent } from './decision-snapshot.component';
import { EvidenceScopeComponent } from './evidence-scope.component';
import { UpgradeCheckComponent } from './upgrade-check.component';
import {
  decisionRelatedLinks,
  decisionSnapshots,
  evidenceOwners,
  type DecisionSnapshotContent,
  type RelatedDecisionLinks,
} from './decision-support';
import { productBySlug, type ProductProfile } from './product-comparisons';

export function splitEvidenceArticleHtml(
  html: string,
  upgradeBeforeHeading: string,
): readonly [string, string, string] {
  const tableIndex = html.indexOf('<table');
  if (tableIndex < 0)
    throw new Error('An evidence owner must contain a comparison table.');
  const upgradeAnchor = `<h2>${upgradeBeforeHeading}</h2>`;
  const upgradeIndex = html.indexOf(upgradeAnchor, tableIndex);
  if (upgradeIndex < 0)
    throw new Error(
      `An evidence owner is missing the upgrade anchor '${upgradeBeforeHeading}'.`,
    );
  return [
    html.slice(0, tableIndex),
    html.slice(tableIndex, upgradeIndex),
    html.slice(upgradeIndex),
  ];
}
@Component({
  imports: [
    RouterLink,
    BreadcrumbsComponent,
    RoundBrushSizeFinderComponent,
    HairDryerFinderComponent,
    HairDryerSpecsDecoderComponent,
    HairDryerSettingsFinderComponent,
    StraighteningBrushFinderComponent,
    HeatProtectantFinderComponent,
    BlowDryRoutinePlannerComponent,
    DecisionSnapshotComponent,
    EvidenceScopeComponent,
    UpgradeCheckComponent,
  ],
  styleUrl: 'article-page.component.css',
  template: `@if (article) {
    <article
      class="article-page"
      [class.round-brush-guide]="
        article.slug === articleSlug.RoundBrushSizeGuide
      "
    >
      <app-breadcrumbs [items]="breadcrumbs" />
      <header class="article-header">
        <p class="eyebrow">{{ article.category }}</p>
        <h1>{{ article.heading }}</h1>
        <p class="lede">{{ article.description }}</p>
        <p class="article-byline">
          By
          <a routerLink="/authors/combreport-editorial-team">{{
            editorialTeam.name
          }}</a>
          <a
            class="content-method"
            routerLink="/testing-research-methodology"
            >{{ contentMethodLabel[article.contentMethod] }}</a
          >
        </p>
      </header>
      @if (decisionSnapshot) {
        <app-decision-snapshot [content]="decisionSnapshot" />
      }
      @if (article.commercialOutcome === 'selection-guide') {
        <aside class="selection-guide-note">
          <strong>Selection guide, not a product ranking.</strong>
        </aside>
      }
      @switch (article.slug) {
        @case (articleSlug.RoundBrushSizeGuide) {
          <app-round-brush-size-finder />
        }
        @case (articleSlug.HairDryerChooser) {
          <app-hair-dryer-finder />
        }
        @case (articleSlug.HairDryerWattageGuide) {
          <app-hair-dryer-specs-decoder />
        }
        @case (articleSlug.HairDryerSettingsGuide) {
          <app-hair-dryer-settings-finder />
        }
        @case (articleSlug.HowToChooseAStraighteningBrush) {
          <app-straightening-brush-finder />
        }
        @case (articleSlug.HeatProtectantSprayVsCream) {
          <app-heat-protectant-finder />
        }
        @case (articleSlug.HowToBlowDryHair) {
          <app-blow-dry-routine-planner />
        }
      }
      @if (article.affiliateDisclosure) {
        <aside class="disclosure">
          This article may contain affiliate links.
          <a routerLink="/affiliate-disclosure">How this supports Comb Report</a
          >.
        </aside>
      }
      @if (evidenceProducts.length > 0) {
        @if (articleHtmlBeforeTable) {
          <section
            class="article-body"
            [innerHTML]="articleHtmlBeforeTable"
          ></section>
        }
        <app-evidence-scope
          [products]="evidenceProducts"
          [marketContext]="evidenceMarketContext"
        />
        <section
          class="article-body"
          [innerHTML]="articleHtmlBeforeUpgrade"
        ></section>
        <app-upgrade-check />
        <section
          class="article-body"
          [innerHTML]="articleHtmlAfterUpgrade"
        ></section>
      } @else {
        <section class="article-body" [innerHTML]="article.html"></section>
      }
      @if (evidenceSourceChecks.length) {
        <section class="article-body" aria-labelledby="source-checks-heading">
          <h2 id="source-checks-heading">Sources</h2>
          <ul>
            @for (source of evidenceSourceChecks; track source.key) {
              <li>
                <a [href]="source.url">{{ source.label }}</a>
                — checked {{ source.date }}
              </li>
            }
          </ul>
        </section>
      }
      @if (decisionLinks) {
        <nav class="article-next-steps" aria-labelledby="next-steps-heading">
          <h2 id="next-steps-heading">Continue from this decision</h2>
          <p>{{ decisionLinks.sentence }}</p>
          <ul>
            @for (link of decisionLinks.links; track link.path) {
              <li>
                <a [href]="link.path">{{ link.label }}</a>
              </li>
            }
          </ul>
        </nav>
      } @else if (guideLinks) {
        <nav class="article-next-steps" aria-labelledby="next-steps-heading">
          <h2 id="next-steps-heading">Related guides</h2>
          <ul>
            <li>
              <a [routerLink]="guideLinks.hubPath">Browse this category</a>
            </li>
            @for (related of relatedGuides; track related.slug) {
              <li>
                <a [routerLink]="['/guides', related.slug]">{{
                  related.heading
                }}</a>
              </li>
            }
          </ul>
        </nav>
      }
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
  readonly articleSlug = ArticleSlug;
  readonly editorialTeam = combReportEditorialTeam;
  readonly contentMethodLabel = contentMethodLabel;
  breadcrumbs: readonly Breadcrumb[] = [];
  guideLinks?: (typeof guideLinkMap)[string];
  relatedGuides: readonly Article[] = [];
  decisionSnapshot?: DecisionSnapshotContent;
  decisionLinks?: RelatedDecisionLinks;
  evidenceProducts: readonly ProductProfile[] = [];
  evidenceMarketContext?: string;
  get evidenceSourceChecks(): readonly {
    key: string;
    url: string;
    label: string;
    date: string;
  }[] {
    const checks = this.evidenceProducts.flatMap((product) => [
      {
        url: product.officialProductUrl,
        label: product.name,
        date: product.verifiedAt,
      },
      ...product.verifiedFacts.map((fact) => ({
        url: fact.sourceUrl,
        label: `${product.name}: ${fact.label}`,
        date: fact.verifiedAt,
      })),
    ]);
    if (new Set(checks.map((check) => check.date)).size <= 1) return [];
    return [
      ...new Map(
        checks.map((check) => [
          `${check.url}|${check.date}`,
          { ...check, key: `${check.url}|${check.date}` },
        ]),
      ).values(),
    ];
  }
  articleHtmlBeforeTable = '';
  articleHtmlBeforeUpgrade = '';
  articleHtmlAfterUpgrade = '';
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.article = articles.find((item) => item.slug === slug);
    if (this.article) {
      this.decisionSnapshot = decisionSnapshots[this.article.slug];
      this.decisionLinks = decisionRelatedLinks[this.article.slug];
      const evidenceOwner = evidenceOwners[this.article.slug];
      if (evidenceOwner) {
        this.evidenceMarketContext = evidenceOwner.marketContext;
        this.evidenceProducts = evidenceOwner.productSlugs.map(
          (productSlug) => {
            const product = productBySlug(productSlug);
            if (!product?.modelIdentifier)
              throw new Error(
                `Evidence owner '${this.article?.slug}' needs an exact identifier for '${productSlug}'.`,
              );
            return product;
          },
        );
        [
          this.articleHtmlBeforeTable,
          this.articleHtmlBeforeUpgrade,
          this.articleHtmlAfterUpgrade,
        ] = splitEvidenceArticleHtml(
          this.article.html,
          evidenceOwner.upgradeBeforeHeading,
        );
      }
      this.guideLinks = guideLinkMap[this.article.slug];
      this.relatedGuides = (this.guideLinks?.relatedSlugs ?? [])
        .map((relatedSlug) =>
          articles.find((item) => item.slug === relatedSlug),
        )
        .filter((item): item is Article => !!item);
      const category = guideCategoryById[this.article.group];
      this.breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Guides', path: '/guides' },
        ...(category.path === '/guides'
          ? []
          : [{ label: category.label, path: category.path }]),
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
            dateModified: this.article.updatedDate ?? this.article.publishDate,
            author: {
              '@type': 'Organization',
              name: this.editorialTeam.name,
              url: `${SITE_URL}/authors/${this.editorialTeam.slug}`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Comb Report',
              url: SITE_URL,
            },
            mainEntityOfPage: `${SITE_URL}/guides/${this.article.slug}`,
          },
          ...(this.article.faq.length
            ? [
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
              ]
            : []),
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
