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
      @if (article.commercialOutcome === 'selection-guide') {
        <aside class="selection-guide-note">
          <strong>Selection guide, not a product ranking.</strong> This page
          explains documented features and routine trade-offs to check. It does
          not claim a universal “best” product or hands-on testing.
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
      <section class="article-body" [innerHTML]="article.html"></section>
      @if (guideLinks) {
        <nav class="article-next-steps" aria-labelledby="next-steps-heading">
          <p class="eyebrow">Keep exploring</p>
          <h2 id="next-steps-heading">Continue with a useful next step</h2>
          <p>
            Return to the category hub, then follow related guides that help
            with the next decision in this topic.
          </p>
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
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.article = articles.find((item) => item.slug === slug);
    if (this.article) {
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
