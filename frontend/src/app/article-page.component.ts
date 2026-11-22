import { HeadFitWorksheetComponent } from './head-fit-worksheet.component';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  articles,
  type ArticleBody,
  type ArticleFaq,
  type ArticleSummary,
} from './content-index.generated';
import {
  ARTICLE_BODY_DATA_KEY,
  emptyArticleBody,
} from './article-html.resolver';

/** Index metadata plus the FAQ loaded with this article's body chunk. */
type Article = ArticleSummary & { readonly faq: readonly ArticleFaq[] };
import { SiteSeoService, SITE_URL } from './site-seo.service';
import { Breadcrumb, BreadcrumbsComponent } from './breadcrumbs.component';
import { ArticleSlug } from './article-slug';
import { guideCategoryById } from './article-registry';
import { combReportEditorialTeam, contentMethodLabel } from './editorial';
import { RoundBrushSizeFinderComponent } from './round-brush-size-finder.component';
import { HairDryerFinderComponent } from './hair-dryer-finder.component';
import { HairDryerSpecsDecoderComponent } from './hair-dryer-specs-decoder.component';
import { DryerRunningCostComponent } from './dryer-running-cost.component';
import { AirwrapCompatibilityLookupComponent } from './airwrap-compatibility-lookup.component';
import { RollerCountPlannerComponent } from './roller-count-planner.component';
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
import { CleanInspectStopComponent } from './clean-inspect-stop.component';
import { guideEvidence, type GuideEvidence } from './guide-evidence';
import { additionalGuideSources } from './current-model-comparison-guides';
import { remainingOpportunitySources } from './remaining-opportunity-guides';
import { seoGrowthSupplementarySources } from './seo-growth-guides';
import { megaBatchSupplementarySources } from './seo-mega-batch-guides';
import { guideContextualIntegrations } from './guide-contextual-integrations';
import { AnalyticsService } from './analytics/analytics.service';
import { GHD_UK_RETAILER_OFFERS } from './retailer-availability';

const safetyInsertionHeading: Readonly<Record<string, string>> = {
  [ArticleSlug.HowToCleanHairStraightenerPlates]:
    'What not to use unless the manual permits it',
  [ArticleSlug.HowToCleanACurlingIronOrWand]:
    'What not to use unless the manual permits it',
  [ArticleSlug.FlatIronSnaggingHair]: 'When to seek support',
};

/** Interactive planners rendered inside the article body, before a heading. */
const plannerInsertionHeading: Readonly<Record<string, string>> = {
  [ArticleSlug.HairRollerSizeGuide]: 'When one pack is enough',
};

export function splitBeforeHeading(
  html: string,
  heading: string,
): readonly [string, string] {
  const anchor = `<h2>${heading}</h2>`;
  const index = html.indexOf(anchor);
  if (index < 0)
    throw new Error(`Article is missing the heading '${heading}'.`);
  return [html.slice(0, index), html.slice(index)];
}

export function splitAfterFirstParagraph(
  html: string,
): readonly [string, string] {
  const paragraphEnd = html.indexOf('</p>');
  if (paragraphEnd < 0)
    throw new Error('A task guide is missing its introductory paragraph.');
  const splitAt = paragraphEnd + '</p>'.length;
  return [html.slice(0, splitAt), html.slice(splitAt)];
}

export function splitInlineFaq(html: string): readonly [string, string] {
  const index = html.indexOf('<h2>FAQ</h2>');
  return index < 0 ? [html, ''] : [html.slice(0, index), html.slice(index)];
}

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
    DryerRunningCostComponent,
    AirwrapCompatibilityLookupComponent,
    RollerCountPlannerComponent,
    HairDryerSettingsFinderComponent,
    StraighteningBrushFinderComponent,
    HeatProtectantFinderComponent,
    BlowDryRoutinePlannerComponent,
    DecisionSnapshotComponent,
    EvidenceScopeComponent,
    UpgradeCheckComponent,
    CleanInspectStopComponent,
    HeadFitWorksheetComponent,
  ],
  styleUrl: 'article-page.component.css',
  template: `@if (article) {
    <article
      class="article-page"
      [class.task-guide]="!!guideEvidenceContent"
      (click)="trackGuideTaskLink($event)"
      [class.round-brush-guide]="
        article.slug === articleSlug.RoundBrushSizeGuide
      "
    >
      <app-breadcrumbs [items]="breadcrumbs" />
      <header class="article-header">
        <p class="eyebrow">{{ article.category }}</p>
        <h1>{{ article.heading }}</h1>
        @if (articleHtmlIntro) {
          <div class="lede task-intro" [innerHTML]="articleHtmlIntro"></div>
        } @else {
          <p class="lede">{{ article.description }}</p>
        }
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
          <app-dryer-running-cost />
        }
        @case (articleSlug.DysonAirwrapAttachmentCompatibility) {
          <app-airwrap-compatibility-lookup />
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
      } @else if (articleHtmlBeforeRetailers) {
        <section
          class="article-body"
          [innerHTML]="articleHtmlBeforeRetailers"
        ></section>
        <section
          class="article-body retailer-availability"
          aria-labelledby="retailer-availability-heading"
        >
          <h2 id="retailer-availability-heading">
            Check retailer availability
          </h2>
          <p>These links are for the UK models compared above.</p>
          @if (hasAffiliateOffer) {
            <p>We may earn a commission if you buy through links marked Ad.</p>
          }
          <ul>
            @for (offer of ghdRetailerOffers; track offer.product) {
              <li>
                <span>{{ offer.product }}</span>
                <a
                  [href]="offer.affiliateUrl || offer.url"
                  [attr.rel]="offer.affiliateUrl ? 'sponsored' : null"
                  (click)="trackGhdRetailerLink()"
                  (auxclick)="trackGhdRetailerLink($event)"
                >
                  {{
                    offer.affiliateUrl ? 'Ad ' + offer.label : offer.label
                  }}</a
                >
              </li>
            }
          </ul>
        </section>
        <section class="article-body" [innerHTML]="articleHtmlMain"></section>
      } @else if (articleHtmlBeforePlanner) {
        <section
          class="article-body"
          [innerHTML]="articleHtmlBeforePlanner"
        ></section>
        @switch (article.slug) {
          @case (articleSlug.HairRollerSizeGuide) {
            <app-roller-count-planner />
          }
        }
        <section
          class="article-body"
          [innerHTML]="articleHtmlAfterPlanner"
        ></section>
      } @else if (articleHtmlBeforeSafety) {
        <section
          class="article-body"
          [innerHTML]="articleHtmlBeforeSafety"
        ></section>
        <app-clean-inspect-stop />
        <section
          class="article-body"
          [innerHTML]="articleHtmlAfterSafety"
        ></section>
      } @else {
        <section
          class="article-body"
          [innerHTML]="articleHtmlMain || articleHtml"
        ></section>
      }
      @if (article.slug === articleSlug.HotAirBrushBarrelSizeGuide) {
        <app-head-fit-worksheet />
      }
      @if (guideEvidenceContent) {
        @if (articleHtmlFaq) {
          <section class="article-faq" [innerHTML]="articleHtmlFaq"></section>
        } @else if (article.faq.length > 0) {
          <section class="article-faq">
            <h2>FAQ</h2>
            @for (faq of article.faq; track faq.question) {
              <h3>{{ faq.question }}</h3>
              <p>{{ faq.answer }}</p>
            }
          </section>
        }
        <app-evidence-scope [summary]="guideEvidenceContent.summary" />
        <section class="article-body" aria-labelledby="source-checks-heading">
          <h2 id="source-checks-heading">Sources</h2>
          @if (guideEvidenceContent.sourceIntro) {
            <p>{{ guideEvidenceContent.sourceIntro }}</p>
          }
          <ul>
            @for (source of guideEvidenceContent.sources; track source.url) {
              <li>
                @if (guideEvidenceContent.sourceFormat === 'product-market') {
                  <a [href]="source.url">{{ source.label }}</a> —
                  {{ source.market }}; checked {{ source.checkedDate }}.
                  {{ source.scope }}
                } @else {
                  <strong>{{ source.model }}</strong> ({{ source.market }}):
                  <a [href]="source.url">{{ source.label }}</a> — checked
                  {{ source.checkedDate }}. {{ source.scope }}
                }
              </li>
            }
          </ul>
        </section>
      } @else if (evidenceSourceChecks.length || supplementarySources.length) {
        <section class="article-body" aria-labelledby="source-checks-heading">
          <h2 id="source-checks-heading">Sources</h2>
          <ul>
            @for (source of evidenceSourceChecks; track source.key) {
              <li>
                <a [href]="source.url">{{ source.label }}</a>
                — checked {{ source.date }}
              </li>
            }
            @for (source of supplementarySources; track source.url) {
              <li>
                <a [href]="source.url">{{ source.label }}</a> —
                {{ source.market }}; checked {{ source.checkedDate }}.
                {{ source.scope }}
              </li>
            }
          </ul>
        </section>
      }
      @if (article && contextualIntegrations[article.slug]; as integration) {
        <p class="article-body contextual-integration">
          {{ integration.before
          }}<a [href]="'/guides/' + integration.slug">{{ integration.label }}</a
          >{{ integration.after }}
        </p>
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
      } @else if (guideLinks && relatedGuides.length > 0) {
        <nav class="article-next-steps" aria-labelledby="next-steps-heading">
          <h2 id="next-steps-heading">Related guides</h2>
          @if (guideEvidenceContent && !guideEvidenceContent.relatedOnly) {
            <p><a [href]="guideLinks.hubPath">Browse this category</a></p>
          }
          <ul>
            @if (!guideEvidenceContent) {
              <li>
                <a [routerLink]="guideLinks.hubPath">Browse this category</a>
              </li>
            }
            @for (related of relatedGuides; track related.slug) {
              <li>
                <a [href]="'/guides/' + related.slug">{{ related.heading }}</a>
              </li>
            }
          </ul>
        </nav>
      }
      @if (guideLinks && relatedGuides.length === 0 && !decisionLinks) {
        <p class="article-body">
          <a [href]="guideLinks.hubPath">Browse this category</a>
        </p>
      }
      @if (!guideEvidenceContent && article.faq.length > 0) {
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
export class ArticlePageComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly contextualIntegrations = guideContextualIntegrations;
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SiteSeoService);
  private readonly analytics = inject(AnalyticsService);
  readonly ghdRetailerOffers = inject(GHD_UK_RETAILER_OFFERS);
  readonly hasAffiliateOffer = this.ghdRetailerOffers.some(
    (offer) => !!offer.affiliateUrl,
  );
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private safetyObserver?: IntersectionObserver;
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
  guideEvidenceContent?: GuideEvidence;
  get supplementarySources() {
    return this.article
      ? [
          ...new Map(
            [
              ...(additionalGuideSources[this.article.slug] ?? []),
              ...(remainingOpportunitySources[
                this.article.slug as ArticleSlug
              ] ?? []),
              ...(seoGrowthSupplementarySources[this.article.slug] ?? []),
              ...(megaBatchSupplementarySources[this.article.slug] ?? []),
            ].map((source) => [source.url, source] as const),
          ).values(),
        ]
      : [];
  }
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
  articleHtmlBeforeSafety = '';
  articleHtmlBeforeRetailers = '';
  articleHtmlAfterSafety = '';
  articleHtmlBeforePlanner = '';
  articleHtmlAfterPlanner = '';
  articleHtmlIntro = '';
  articleHtmlMain = '';
  articleHtmlFaq = '';
  /** Article body from the route resolver; loaded per article, not bundled. */
  articleHtml = '';
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const body: ArticleBody =
      this.route.snapshot.data?.[ARTICLE_BODY_DATA_KEY] ?? emptyArticleBody;
    this.articleHtml = body.html;
    const summary = articles.find((item) => item.slug === slug);
    this.article = summary && { ...summary, faq: body.faq };
    if (this.article) {
      this.decisionSnapshot = decisionSnapshots[this.article.slug];
      this.decisionLinks = decisionRelatedLinks[this.article.slug];
      this.guideEvidenceContent = guideEvidence[this.article.slug];
      if (
        this.guideEvidenceContent ||
        slug === ArticleSlug.HairDryerWattageGuide
      ) {
        [this.articleHtmlIntro, this.articleHtmlMain] =
          splitAfterFirstParagraph(this.articleHtml);
      }
      if (this.guideEvidenceContent) {
        [this.articleHtmlMain, this.articleHtmlFaq] = splitInlineFaq(
          this.articleHtmlMain,
        );
      }
      if (slug === ArticleSlug.GhdSpeedVsHelios) {
        [this.articleHtmlBeforeRetailers, this.articleHtmlMain] =
          splitBeforeHeading(
            this.articleHtmlMain || this.articleHtml,
            'Give setting memory a real job',
          );
      }
      const plannerHeading = plannerInsertionHeading[this.article.slug];
      if (plannerHeading) {
        [this.articleHtmlBeforePlanner, this.articleHtmlAfterPlanner] =
          splitBeforeHeading(
            this.articleHtmlMain || this.articleHtml,
            plannerHeading,
          );
      }
      const safetyHeading = safetyInsertionHeading[this.article.slug];
      if (safetyHeading) {
        [this.articleHtmlBeforeSafety, this.articleHtmlAfterSafety] =
          splitBeforeHeading(
            this.articleHtmlMain || this.articleHtml,
            safetyHeading,
          );
      }
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
          this.articleHtml,
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
        {
          label:
            this.guideEvidenceContent?.breadcrumbLabel ?? this.article.heading,
        },
      ];
      this.seo.set(
        this.article.title,
        this.article.description,
        `/guides/${this.article.slug}`,
        [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: this.article.heading,
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
          ...(this.article.faq.length && !this.guideEvidenceContent
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
            label:
              this.guideEvidenceContent?.breadcrumbLabel ??
              this.article.heading,
            path: `/guides/${this.article.slug}`,
          }),
      );
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.article) return;
    const safety = this.host.nativeElement.querySelector(
      'app-clean-inspect-stop',
    );
    if (!safety || !('IntersectionObserver' in window)) return;
    this.safetyObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      this.analytics.track('care_stop_guidance_view', {
        tool_family:
          this.article?.slug === ArticleSlug.HowToCleanACurlingIronOrWand
            ? 'curling_tool'
            : 'flat_iron',
      });
      this.safetyObserver?.disconnect();
    });
    this.safetyObserver.observe(safety);
  }

  trackGhdRetailerLink(event?: MouseEvent): void {
    if (event && event.button !== 1) return;
    this.analytics.track('retailer_outbound_click', {
      guide_path: `/guides/${ArticleSlug.GhdSpeedVsHelios}`,
      merchant: 'ghd',
      offer_market: 'UK',
    });
  }

  trackGuideTaskLink(event: MouseEvent): void {
    if (!this.article) return;
    const anchor = (event.target as HTMLElement | null)?.closest('a');
    const href = anchor?.getAttribute('href');
    if (!href?.startsWith('/')) return;
    const path = href.split(/[?#]/, 1)[0];
    if (
      !path.startsWith('/guides/') &&
      !['/hair-accessories', '/flat-irons', '/brushes-combs'].includes(path)
    )
      return;
    const rollerSlugs = new Set<string>([
      ArticleSlug.HowToUseHeatedHairRollers,
      ArticleSlug.HeatedRollersVsSelfGripRollers,
      ArticleSlug.HowToUseFlexiRods,
      ArticleSlug.HowToUseSnapClosureFoamRollers,
      ArticleSlug.HowToUseVelcroHairRollers,
      ArticleSlug.VelcroVsFoamHairRollers,
      ArticleSlug.HairRollerSizeGuide,
    ]);
    const hotToolSlugs = new Set<string>([
      ArticleSlug.HowToCleanHairStraightenerPlates,
      ArticleSlug.HowToCleanACurlingIronOrWand,
      ArticleSlug.FlatIronSnaggingHair,
      ArticleSlug.CurlingIronLeavesCrease,
    ]);
    const taskGroup = rollerSlugs.has(this.article.slug as ArticleSlug)
      ? 'roller_method'
      : hotToolSlugs.has(this.article.slug as ArticleSlug)
        ? 'hot_tool_care'
        : this.article.group === 'hair-accessories'
          ? /how-to-(?:clean|wash)/.test(this.article.slug)
            ? 'accessory_care'
            : 'accessory_method'
          : this.article.group === 'brushes-and-combs'
            ? 'brush_comb_care'
            : undefined;
    const isNewTaskDestination = Object.keys(guideEvidence).some(
      (slug) => path === `/guides/${slug}`,
    );
    if (!taskGroup || (!isNewTaskDestination && !this.guideEvidenceContent))
      return;
    const destinationType = [
      '/hair-accessories',
      '/flat-irons',
      '/brushes-combs',
    ].includes(path)
      ? 'category'
      : /\bvs\b/.test(path)
        ? 'comparison'
        : /snag|crease|not-working|fall-out/.test(path)
          ? 'troubleshooting'
          : 'method';
    this.analytics.track('guide_task_link_click', {
      task_group: taskGroup,
      destination_type: destinationType,
    });
  }

  ngOnDestroy(): void {
    this.safetyObserver?.disconnect();
  }
}
