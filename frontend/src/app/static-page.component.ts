import { resolveGuideCardCopy } from './guide-card-copy';
import { remainingOpportunityAliases } from './remaining-opportunity-guides';
import { exactModelAliases } from './exact-model-guides';
import { seoGrowthAliases } from './seo-growth-guides';
import { megaBatchAliases } from './seo-mega-batch-guides';
import { supportedUpdoCards } from './supported-updo-guides';
import { straightenerGuideCards } from './straightener-guides';
import { shapingMethodCards } from './shaping-method-guides';
import { airflowMethodCards } from './airflow-method-guides';
import { waveMethodCards } from './wave-method-guides';
import { toolChoiceCards } from './tool-choice-guides';
import { everydayMethodDescriptions } from './everyday-method-guides';
import { finishingMethodDescriptions } from './finishing-method-guides';
import { everydayFastenerSlugs, fastenerDescriptions } from './fastener-guides';
import { HandlingRoutineNavigatorComponent } from './handling-routine-navigator.component';
import { handlingGuideDescriptions } from './handling-guides';
import {
  modelComparisonDescriptions,
  modelComparisonGroups,
} from './model-comparison-guides';
import { finishingGuideDescriptions } from './finishing-guides';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { articles } from './content-index.generated';
import { SiteSeoService, SITE_URL } from './site-seo.service';
import {
  GuideCategory,
  guideCategories,
  guideCategoryById,
} from './article-registry';
import { Breadcrumb, BreadcrumbsComponent } from './breadcrumbs.component';
import { ArticleSlug } from './article-slug';
import { consolidatedComparisonAliases } from './consolidated-comparison-guides';
import { combReportEditorialTeam } from './editorial';
import {
  ChooseUseFixPathwaysComponent,
  type PathwayGroup,
} from './choose-use-fix-pathways.component';
import { categoryPathways } from './category-pathways';
import { AnalyticsService } from './analytics/analytics.service';
import { CONTACT_FORM_PRIVACY } from './contact-config';

@Component({
  imports: [
    RouterLink,
    BreadcrumbsComponent,
    ChooseUseFixPathwaysComponent,
    HandlingRoutineNavigatorComponent,
  ],
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
          <h2 id="topics-heading">Choose the next useful step</h2>
        </div>
        <div class="task-cards">
          <article>
            <p class="eyebrow">Choose</p>
            <h3>Find the tool format that fits the job</h3>
            <p>
              Start with the result, section and routine you repeat, then
              compare the features that change that task.
            </p>
            <a class="text-link" routerLink="/tools"
              >Open the interactive tools →</a
            >
          </article>
          <article>
            <p class="eyebrow">Use</p>
            <h3>Follow a complete method</h3>
            <p>
              Move from preparation to sectioning, tool movement, release and
              the next useful adjustment.
            </p>
            <a class="text-link" routerLink="/guides">Browse use guides →</a>
          </article>
          <article>
            <p class="eyebrow">Fix</p>
            <h3>Diagnose the stage that failed</h3>
            <p>
              Start from the visible symptom and change one part of the routine
              before replacing a working tool.
            </p>
            <a
              class="text-link"
              [routerLink]="['/guides', articleSlug.StylingToolTroubleshooting]"
              >Open styling troubleshooting →</a
            >
          </article>
        </div>
        <p class="named-comparison-note">
          Comparing named products?
          <a routerLink="/products">Use source-linked specifications</a> only
          after you know which documented difference matters to your routine.
        </p>
      </section>
      <section class="latest-section" aria-labelledby="latest-heading">
        <div class="section-heading section-heading-row">
          <div>
            <p class="eyebrow">From the guide library</p>
            <h2 id="latest-heading">Featured guides</h2>
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
              <h3>
                {{ toolChoiceCards[article.slug]?.title ?? article.heading }}
              </h3>
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
          Search {{ allGuideCount }} source-linked guides by tool, model or
          styling task, or browse a category.
        </p>
      </section>
      <section class="guide-finder" aria-label="Search and browse guides">
        <div class="guide-search">
          <label for="guide-search">Search guides</label>
          <div class="guide-search-row">
            <input
              #guideSearchInput
              id="guide-search"
              type="search"
              placeholder="Search by tool, model or hair concern"
              autocomplete="off"
              aria-describedby="guide-result-count"
              [value]="guideSearch"
              (input)="guideSearch = $any($event.target).value"
            />
            @if (guideSearch) {
              <button
                type="button"
                class="guide-search-clear"
                (click)="clearGuideSearch(guideSearchInput)"
              >
                Clear search
              </button>
            }
          </div>
        </div>
        <nav
          class="guide-category-chips"
          aria-label="Browse guides by category"
        >
          <span class="guide-category-label">Browse by category:</span>
          @for (category of categories; track category.id) {
            <a [routerLink]="category.path">{{ category.label }}</a>
          }
        </nav>
        <p
          class="guide-result-count"
          id="guide-result-count"
          aria-live="polite"
        >
          {{ guideResultCountText }}
        </p>
      </section>
      @if (guides.length) {
        <section class="editorial-grid guides-grid" aria-label="All guides">
          @for (article of guides; track article.slug; let first = $first) {
            <a
              class="guide-card"
              [class.guide-card-featured]="first && !guideSearch"
              [routerLink]="['/guides', article.slug]"
              ><p class="eyebrow">{{ article.category }}</p>
              <h2>
                {{ toolChoiceCards[article.slug]?.title ?? article.heading }}
              </h2>
              <p>
                {{
                  toolChoiceCards[article.slug]?.description ??
                    everydayMethodDescriptions[article.slug] ??
                    modelComparisonDescriptions[article.slug] ??
                    handlingGuideDescriptions[article.slug] ??
                    finishingGuideDescriptions[article.slug] ??
                    article.description
                }}
              </p>
              <span class="text-link"
                >Read guide <span aria-hidden="true">→</span></span
              ></a
            >
          }
        </section>
      } @else {
        <p class="guide-empty-state">
          No guides found. Try a tool name, model or hair concern, or
          <button
            type="button"
            class="guide-empty-clear"
            (click)="clearGuideSearch(guideSearchInput)"
          >
            clear your search
          </button>
          to browse all guides.
        </p>
      }
      <section
        class="guide-secondary"
        aria-labelledby="guide-secondary-heading"
      >
        <h2 id="guide-secondary-heading">More ways to start</h2>
        <div class="guide-secondary-grid">
          <section aria-labelledby="routine-builder-heading">
            <p class="eyebrow">Build a smaller toolkit</p>
            <h3 id="routine-builder-heading">Hair Tool Routine Builder</h3>
            <p>
              Choose the few tool categories that support your ordinary routine
              before comparing extra options.
            </p>
            <a class="text-link" routerLink="/hair-tool-routine-builder"
              >Build a simple routine <span aria-hidden="true">→</span></a
            >
          </section>
          <section aria-labelledby="brush-cluster-heading">
            <p class="eyebrow">Brushes &amp; combs</p>
            <h3 id="brush-cluster-heading">Hair Brush Care &amp; Selection</h3>
            <p>
              Choose a styling brush, understand its bristles, and keep the one
              you own in good working order.
            </p>
            <ul>
              <li>
                <a [routerLink]="['/guides', articleSlug.RoundBrushSizeGuide]"
                  >Round brush size guide</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.BoarBristleVsNylonBrush,
                  ]"
                  >Boar bristle vs nylon</a
                >
              </li>
              <li>
                <a [routerLink]="['/guides', articleSlug.HowToCleanAHairBrush]"
                  >How to clean a hairbrush</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.WhenToReplaceHairbrushOrComb,
                  ]"
                  >Inspect a brush or comb</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.WhatIsTheGreyFuzzOnMyHairbrush,
                  ]"
                  >What is grey fuzz?</a
                >
              </li>
            </ul>
          </section>
          <section aria-labelledby="troubleshooting-heading">
            <p class="eyebrow">Solve a styling problem</p>
            <h3 id="troubleshooting-heading">Styling-tool troubleshooting</h3>
            <p>
              Start with the symptom you can see: a blowout that falls, frizz
              during brushing, a curl that drops, a snag, or an attachment that
              may not fit.
            </p>
            <a
              class="text-link"
              [routerLink]="['/guides', articleSlug.StylingToolTroubleshooting]"
              >Choose a troubleshooting guide
              <span aria-hidden="true">→</span></a
            >
          </section>
        </div>
      </section>
    }
    @case ('tools') {
      <app-breadcrumbs [items]="toolsBreadcrumbs" />
      <section class="listing-intro tools-intro">
        <p class="eyebrow">Interactive tools</p>
        <h1>Practical help for choosing and using hair tools</h1>
        <p class="lede">
          Use these browser-local helpers to choose a format, plan a routine or
          interpret a published specification. Your answers stay in this page
          session and are not used to build a personal profile.
        </p>
      </section>
      @for (group of toolGroups; track group.label) {
        <section class="tool-group" [attr.aria-labelledby]="group.id">
          <div class="section-heading">
            <h2 [id]="group.id">{{ group.label }}</h2>
            <p>{{ group.description }}</p>
          </div>
          <div class="tools-grid">
            @for (tool of group.tools; track tool.name) {
              <a class="tool-card" [routerLink]="tool.path">
                <p class="eyebrow">{{ tool.type }}</p>
                <h3>{{ tool.name }}</h3>
                <p>{{ tool.description }}</p>
                <span class="text-link"
                  >{{ tool.action }} <span aria-hidden="true">→</span></span
                >
              </a>
            }
          </div>
          @if (group.id === 'tools-fix') {
            <section class="tools-note" aria-labelledby="tools-note-heading">
              <h3 id="tools-note-heading">
                Compare exact models after choosing the job
              </h3>
              <p>
                Use Product Explorer when you know which product category and
                task you are comparing. Check the market, generation and source
                scope before treating a difference as meaningful.
              </p>
              <a class="text-link" routerLink="/products"
                >Open Product Explorer <span aria-hidden="true">→</span></a
              >
            </section>
          }
        </section>
      }
    }
    @case ('category') {
      @if (category) {
        <app-breadcrumbs [items]="categoryBreadcrumbs" />
        <section class="listing-intro">
          <p class="eyebrow">{{ category.label }}</p>
          <h1>{{ category.heading }}</h1>
          <p class="lede">{{ category.intro }}</p>
        </section>
        @if (
          category.id === 'brushes-and-combs' ||
          category.id === 'hair-accessories'
        ) {
          <app-handling-routine-navigator>
            @if (category.id === 'brushes-and-combs') {
              <p>
                For a paddle-body choice, compare
                <a [routerLink]="['/guides', articleSlug.DenmanD3VsD38]"
                  >Denman D3 and D38</a
                >. Keep
                <a [routerLink]="['/guides', articleSlug.DenmanD3VsD4]"
                  >D3/D4 row count</a
                >
                and
                <a [routerLink]="['/guides', articleSlug.DenmanD3VsD31]"
                  >D3/D31 spacing</a
                >
                as separate decisions.
              </p>
              <p>
                After forming a styled curl set, use
                <a [routerLink]="['/guides', articleSlug.HowToBrushOutCurls]"
                  >how to brush out curls</a
                >
                to choose the amount of separation. This finishing method starts
                with dry, cooled styled curls; natural-curl detangling remains a
                different task.
              </p>
            }
          </app-handling-routine-navigator>
        }
        @if (modelComparisonGroups[category.id]; as comparisons) {
          <section
            class="category-guide-section"
            aria-labelledby="model-comparisons-heading"
          >
            <div class="section-heading">
              <h2 id="model-comparisons-heading">{{ comparisons.heading }}</h2>
              <p>{{ comparisons.intro }}</p>
              @if (category.id === 'hot-air-brushes') {
                <p>
                  For one brush-led routine, compare
                  <a
                    [routerLink]="[
                      '/guides',
                      articleSlug.DysonAirsmoothVsGhdDuetBlowdry,
                    ]"
                    >Airsmooth and Duet Blowdry</a
                  >. For several attachment jobs, compare
                  <a
                    [routerLink]="['/guides', articleSlug.SharkGlamVsFlexstyle]"
                    >Shark Glam and FlexStyle</a
                  >. Confirm the exact body, permitted mode and selected box
                  before treating either route as a replacement for the tools
                  you own.
                </p>
              }
            </div>
            <div class="editorial-grid guides-grid">
              @for (card of comparisons.cards; track card.slug) {
                <a class="guide-card" [routerLink]="['/guides', card.slug]">
                  <h3>{{ card.label }}</h3>
                  <p>{{ modelComparisonDescriptions[card.slug] }}</p>
                  <span class="text-link">Read guide →</span>
                </a>
              }
            </div>
          </section>
        }
        @if (categoryPathwayGroups.length) {
          <app-choose-use-fix-pathways [groups]="categoryPathwayGroups">
            @if (category.id === 'hair-dryers') {
              <p>
                For an exact purchase or replacement question, use the
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.ParluxDiffuserCompatibility,
                  ]"
                  >Parlux fit lookup</a
                >,
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.T3AireluxeVsFeatherweightStylemax,
                  ]"
                  >T3 included-tool comparison</a
                >, or
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.RemingtonHydraluxeProVsProluxeYouDryer,
                  ]"
                  >Remington control comparison</a
                >. The use and care guides below cover the next task.
              </p>
              <p>
                To read a rating label and estimate what a dryer costs to run,
                use the
                <a [routerLink]="['/guides', articleSlug.HairDryerWattageGuide]"
                  >wattage and running-cost calculator</a
                >. Check a diffuser with the
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HairDryerDiffuserCompatibility,
                  ]"
                  >fit reference and record</a
                >, and for travel compare automatic and manual voltage in
                <a [routerLink]="['/guides', articleSlug.BestTravelHairDryers]"
                  >travel hair dryers</a
                >.
              </p>
              <p>
                If the proposed replacement combines drying and straightening,
                begin with
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.WetToDryHairStraightenerVsFlatIron,
                  ]"
                  >wet-to-dry straightener versus flat iron</a
                >. It compares the routine stage and actual mechanism rather
                than assuming every airflow tool performs the same movement. Use
                the
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowToUseAWetToDryHairStraightener,
                  ]"
                  >wet-to-dry method</a
                >
                only with the selected appliance's own preparation and mode
                instructions.
              </p>
            }
          </app-choose-use-fix-pathways>
        }
        @if (category.id === 'hot-air-brushes') {
          <p>
            Match the next purchase to its task. Use the
            <a [routerLink]="['/guides', articleSlug.SharkFlexstyleVsIonCurl]"
              >IonCurl attachment lookup</a
            >,
            <a
              [routerLink]="[
                '/guides',
                articleSlug.T3Aire360NextGenVsDysonAirwrapId,
              ]"
              >current T3 and i.d. kit comparison</a
            >, or
            <a
              [routerLink]="[
                '/guides',
                articleSlug.BabylissAirWandAs6550uVsAs6553u,
              ]"
              >Air Wand box chooser</a
            >
            after identifying the heads you need.
          </p>
          <p>
            Reusing Dyson parts? The
            <a
              [routerLink]="[
                '/guides',
                articleSlug.DysonAirwrapAttachmentCompatibility,
              ]"
              >Airwrap attachment compatibility lookup</a
            >
            answers which bodies and attachments fit together. For the
            whole-machine choice, compare
            <a [routerLink]="['/guides', articleSlug.DysonAirwrapIdVsCoAnda2x]"
              >Airwrap i.d. and Co-anda2x</a
            >.
          </p>
          <p>
            <a href="/guides/hot-air-brush-barrel-size-guide#head-fit-worksheet"
              >Compare two head-fit records</a
            >
          </p>
        }
        @if (category.id === 'hair-care') {
          <p>
            Choosing where to add cosmetic volume?
            <a
              [routerLink]="[
                '/guides',
                articleSlug.ColorWowRaiseTheRootVsXtraLarge,
              ]"
              >Raise the Root vs Xtra Large</a
            >
            compares targeted spray and distributed foam. Continue with the
            mousse and product-order methods for the application plan.
          </p>
          <p>
            Choosing a labelled formula? Compare
            <a
              [routerLink]="[
                '/guides',
                articleSlug.ColorWowDreamCoatOriginalVsExtraStrengthVsCurly,
              ]"
              >Dream Coat's three application routes</a
            >
            or
            <a
              [routerLink]="[
                '/guides',
                articleSlug.MoroccanoilTreatmentOriginalVsLight,
              ]"
              >Moroccanoil Original and Light</a
            >
            before following the routine and application guides below.
          </p>
          <section
            class="category-guide-section"
            aria-labelledby="care-method-heading"
          >
            <h2 id="care-method-heading">
              Choose a step, then follow its method
            </h2>
            <p>
              Start with the question you need to answer. Washing, choosing a
              formula and carrying out its application are separate decisions.
            </p>
            <p>
              For a chosen root-refresh product, follow
              <a [routerLink]="['/guides', articleSlug.HowToUseDryShampoo]"
                >how to use dry shampoo</a
              >. Keep the exact aerosol or powder directions together instead of
              copying preparation, distance or blending from a different
              container.
            </p>
            <h3>Washing and rinsing</h3>
            <ul>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowOftenShouldYouWashYourHair,
                  ]"
                  >How often should you wash your hair?</a
                >
              </li>
              <li>
                <a [routerLink]="['/guides', articleSlug.ColdWaterForHair]"
                  >Cold water for hair: what does a final rinse change?</a
                >
              </li>
            </ul>
            <h3>Leave-in role and application</h3>
            <ul>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.BestLeaveInConditionersDryHair,
                  ]"
                  >How to choose a leave-in conditioner for your routine</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.CurlCreamVsLeaveInConditioner,
                  ]"
                  >Curl cream vs leave-in conditioner</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowToApplyLeaveInConditioner,
                  ]"
                  >How to apply leave-in conditioner</a
                >
              </li>
            </ul>
            <h3>Heat-styling preparation</h3>
            <ul>
              <li>
                <a [routerLink]="['/guides', articleSlug.BestHeatProtectants]"
                  >How to choose a heat protectant for your styling routine</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HeatProtectantSprayVsCream,
                  ]"
                  >Heat Protectant Spray vs Cream</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowToApplyHeatProtectant,
                  ]"
                  >How to apply heat protectant</a
                >
              </li>
            </ul>
          </section>
        }
        @if (category.id === 'brushes-and-combs') {
          <section
            class="category-guide-section"
            aria-labelledby="manual-care-heading"
          >
            <h2 id="manual-care-heading">
              Choose, maintain or inspect a manual tool
            </h2>
            <p>
              Keep the handling task separate from the material and its care.
              Start with what you need to do next.
            </p>
            <ul>
              <li>
                <a [routerLink]="['/guides', articleSlug.HairBrushVsComb]"
                  >Hair brush vs comb: which task are you doing?</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.BestHairBrushForShortHair,
                  ]"
                  >How to choose a hair brush for short hair</a
                >
              </li>
              <li>
                <a [routerLink]="['/guides', articleSlug.BoarBristleBrushGuide]"
                  >Boar-bristle brushes: what should you compare?</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.WhyHairGetsStaticAfterBrushing,
                  ]"
                  >Why does hair get static when you brush it?</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.TangleTeezerOriginalVsUltimateDetangler,
                  ]"
                  >Tangle Teezer Original vs Ultimate Detangler</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.MasonPearsonBrushSizeAndBristleGuide,
                  ]"
                  >Mason Pearson sizes, bristles and model codes</a
                >
              </li>
              <li>
                <a [routerLink]="['/guides', articleSlug.HowToCleanAHairBrush]"
                  >How to clean a hairbrush: Tangle Teezer, Denman and material
                  checks</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowToCleanABoarBristleHairbrush,
                  ]"
                  >How to clean a boar-bristle hairbrush</a
                >
              </li>
              <li>
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.WhenToReplaceHairbrushOrComb,
                  ]"
                  >When should you replace a hairbrush or comb?</a
                >
              </li>
            </ul>
            <p>
              For curl styling after detangling,
              <a
                [routerLink]="[
                  '/guides',
                  articleSlug.BounceCurlDefineVsVolumeEdgelift,
                ]"
                >Bounce Curl Define vs Volume EdgeLift</a
              >
              compares two edge-guided styling brushes by the curl grouping the
              maker describes. Neither replaces a detangler.
            </p>
            <p>
              For a prepared section being arranged backwards,
              <a
                [routerLink]="[
                  '/guides',
                  articleSlug.HowToSlickBackHairWithGel,
                ]"
                >slick-back gel styling</a
              >
              separates the comb or brush's finishing role from detangling. The
              product's setting directions and the tool's own care permissions
              remain separate checks.
            </p>
            <p>
              For an arranged bun,
              <a [routerLink]="['/guides', articleSlug.HowToUseHairSticks]"
                >hair-stick use</a
              >
              begins after preparation and keeps the bun supported during
              placement. The stick's point is not a detangling tool. Choose the
              right contact and movement before trying to carry a styling
              accessory through resistance.
            </p>
          </section>
        }
        @if (category.id === 'hair-care') {
          <section
            class="category-guide-section"
            aria-labelledby="product-role-heading"
          >
            <div class="section-heading">
              <h2 id="product-role-heading">
                Choose the product’s job, then its format
              </h2>
              <p>
                Mousse, gel, curl cream, leave-in conditioner, serum and oil can
                overlap in purpose. Compare the exact formula and directions,
                then keep only the steps that support your routine.
              </p>
            </div>
            <div class="editorial-grid guides-grid">
              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HairMousseVsGel]"
                ><h3>Mousse or gel?</h3>
                <p>
                  Compare application format, labelled hold and drying
                  directions.
                </p>
                <span class="text-link">Read guide →</span></a
              ><a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.CurlCreamVsLeaveInConditioner,
                ]"
                ><h3>Curl cream or leave-in?</h3>
                <p>
                  Separate preparation and styling roles before adding both.
                </p>
                <span class="text-link">Read guide →</span></a
              ><a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HairSerumVsHairOil]"
                ><h3>Serum or oil?</h3>
                <p>
                  Compare the actual formula rather than treating the names as
                  opposites.
                </p>
                <span class="text-link">Read guide →</span></a
              ><a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HairStylingProductOrder]"
                ><h3>Plan product order</h3>
                <p>
                  Build a sequence around compatible labels and appliance
                  restrictions.
                </p>
                <span class="text-link">Read guide →</span></a
              >
            </div>
            <p>
              For deliberate shaping, compare
              <a [routerLink]="['/guides', articleSlug.HairWaxVsHairGel]"
                >wax and gel</a
              >
              or
              <a [routerLink]="['/guides', articleSlug.HairPasteVsHairClay]"
                >paste and clay</a
              >
              by the actual formula's finish and directions. Keep product choice
              separate from stacking several jars that would arrange the same
              area.
            </p>
          </section>
          <section
            class="category-guide-section"
            aria-labelledby="product-application-heading"
          >
            <div class="section-heading">
              <h2 id="product-application-heading">
                Make application more consistent
              </h2>
              <p>
                Work through manageable sections and compare distribution before
                increasing the amount.
              </p>
            </div>
            <div class="editorial-grid guides-grid">
              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToApplyHairSerumOrOil]"
                ><h3>How to apply hair serum or oil</h3>
                <p>
                  Choose the formula's stage and placement, then check
                  distribution.
                </p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToApplyCurlCream]"
                ><h3>How to apply curl cream</h3>
                <p>
                  Prepare, distribute and follow the permitted drying route.
                </p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.HowToUseHairStylingPowder,
                ]"
                ><h3>How to use hair styling powder</h3>
                <p>
                  Check the dispenser and target a deliberate styling
                  application.
                </p>
                <span class="text-link">Read guide →</span></a
              >

              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToApplyHairClay]"
                ><h3>How to apply hair clay</h3>
                <p>
                  Check the jar's preparation, distribute the product and shape
                  the intended area.
                </p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToUseTexturisingSpray]"
                ><h3>How to use texturising spray</h3>
                <p>
                  Choose the target area and follow the exact container's
                  starting state and distance.
                </p>
                <span class="text-link">Read guide →</span></a
              >

              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToApplyHairMousse]"
                ><h3>Apply hair mousse</h3>
                <p>
                  Check dispensing, coverage and the intended drying method.
                </p>
                <span class="text-link">Read guide →</span></a
              ><a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToApplyGelToCurlyHair]"
                ><h3>Apply gel to curly hair</h3>
                <p>
                  Follow the formula’s method and distinguish coverage from
                  quantity.
                </p>
                <span class="text-link">Read guide →</span></a
              >
            </div>
            <p>
              Follow
              <a [routerLink]="['/guides', articleSlug.HowToApplyHairWax]"
                >wax application</a
              >
              or
              <a [routerLink]="['/guides', articleSlug.HowToApplyHairPaste]"
                >paste application</a
              >
              for hand-distributed shaping. For a deliberately backward outline,
              use
              <a
                [routerLink]="[
                  '/guides',
                  articleSlug.HowToSlickBackHairWithGel,
                ]"
                >slick-back gel styling</a
              >, keeping preparation, arranging and the formula's setting stage
              separate.
            </p>
          </section>
        }
        @if (category.id === 'hair-care') {
          <section
            class="category-guide-section"
            aria-labelledby="finishing-texture-heading"
          >
            <div class="section-heading">
              <h2 id="finishing-texture-heading">
                Choose a finishing or texture step
              </h2>
              <p>
                Compare the exact formula’s intended finish and starting hair
                state. Choose a useful role before adding another spray or jar
                to your routine.
              </p>
            </div>
            <div class="editorial-grid guides-grid">
              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.HairStylingPowderVsDryShampoo,
                ]"
                ><h3>Styling powder vs dry shampoo</h3>
                <p>
                  Compare product roles and application formats before adding
                  another layer.
                </p>
                <span class="text-link">Read guide →</span></a
              >

              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToUseHairspray]"
                ><h3>Use hairspray deliberately</h3>
                <p>Plan the area, follow the container and review coverage.</p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.FlexibleVsStrongHoldHairspray,
                ]"
                ><h3>Compare hairspray hold labels</h3>
                <p>Read movement and finish alongside the stated hold.</p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.SeaSaltSprayVsTexturisingSpray,
                ]"
                ><h3>Sea salt or texture spray?</h3>
                <p>
                  Compare actual methods rather than treating names as
                  opposites.
                </p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToUseSeaSaltSpray]"
                ><h3>Apply sea salt spray</h3>
                <p>
                  Organise the starting state, sections and finishing method.
                </p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.PomadeVsHairClay]"
                ><h3>Pomade or hair clay?</h3>
                <p>Compare finish, hold and preparation for the exact jars.</p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToApplyHairPomade]"
                ><h3>Apply hair pomade</h3>
                <p>Track distribution before changing the amount.</p>
                <span class="text-link">Read guide →</span></a
              >
            </div>
          </section>
        }
        @if (category.id === 'hair-accessories') {
          <p>
            Compare
            <a
              [routerLink]="[
                '/guides',
                articleSlug.InvisibobbleOriginalVsPowerVsSlim,
              ]"
              >the named ORIGINAL, POWER and SLIM spirals</a
            >
            for the fastening task, or
            <a [routerLink]="['/guides', articleSlug.BestHeatlessCurlingSets]"
              >heatless pack formats</a
            >
            for ribbon and individual-rod closure and coverage.
          </p>
          <p>
            Buying rollers? Try your shortest section first and count each size
            separately with the
            <a [routerLink]="['/guides', articleSlug.HairRollerSizeGuide]"
              >roller size guide and count planner</a
            >. Buying a named kit or clip? Compare
            <a
              [routerLink]="[
                '/guides',
                articleSlug.ConairHs400VsHs79crHotRollers,
              ]"
              >Conair roller counts and original clips</a
            >
            or
            <a
              [routerLink]="[
                '/guides',
                articleSlug.FramarGatorGripsVsSuperSectioners,
              ]"
              >Framar clip mechanisms and sectioning tasks</a
            >
            alongside the choose, use and care guides.
          </p>
          <section
            class="category-guide-section"
            aria-labelledby="roller-method-heading"
          >
            <div class="section-heading">
              <h2 id="roller-method-heading">
                Follow the method for the roller you own
              </h2>
              <p>
                Self-grip rollers, flexi rods and snap-closure foam rollers do
                not secure a section in the same way. Use the method page for
                the exact closure in your set.
              </p>
            </div>
            <div class="editorial-grid guides-grid">
              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.HowToUseVelcroHairRollers,
                ]"
                (click)="trackGuideTaskLink('roller_method', 'method')"
              >
                <h3>Use self-grip rollers</h3>
                <p>
                  Section, roll and remove a textured self-grip roller without
                  treating it like a clasp or bendable rod.
                </p>
                <span class="text-link">Open the self-grip method →</span>
              </a>
              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToUseFlexiRods]"
                (click)="trackGuideTaskLink('roller_method', 'method')"
              >
                <h3>Use flexi rods</h3>
                <p>
                  Secure the ends, wrap the section and bend the rod only enough
                  to hold it.
                </p>
                <span class="text-link">Open the flexi-rod method →</span>
              </a>
              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.HowToUseSnapClosureFoamRollers,
                ]"
                (click)="trackGuideTaskLink('roller_method', 'method')"
              >
                <h3>Use snap-closure foam rollers</h3>
                <p>
                  Roll an even section and close the built-in frame without
                  catching loose hair.
                </p>
                <span class="text-link">Open the foam-roller method →</span>
              </a>
            </div>
            <p>
              Comparing a textured self-grip surface with a clasp-based foam
              roller? Read
              <a
                [routerLink]="['/guides', articleSlug.VelcroVsFoamHairRollers]"
                (click)="trackGuideTaskLink('roller_method', 'comparison')"
                >Velcro vs foam hair rollers</a
              >.
            </p>
          </section>
        }
        @if (category.id === 'hair-accessories') {
          <section class="category-guide-section">
            <div class="section-heading">
              <h2>Choose the fastening, then follow its method</h2>
              <p>
                Pins, barrettes, claw clips and sectioning clips hold different
                arrangements. Start with the mechanism, then use the method for
                the accessory in your hand.
              </p>
            </div>
            <div class="editorial-grid guides-grid">
              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.BobbyPinsVsUShapedHairPins,
                ]"
                ><h3>Compare pin shapes</h3>
                <p>
                  Distinguish closed bobby pins, open U pins and rigid French
                  pins before choosing a fastening.
                </p>
                <span class="text-link">Compare the pins →</span></a
              ><a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToUseBobbyPins]"
                ><h3>Use a bobby pin</h3>
                <p>
                  Secure a small section, check the grip and slide the pin out
                  without pulling through caught strands.
                </p>
                <span class="text-link">Follow the bobby-pin method →</span></a
              ><a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToUseAFrenchHairPin]"
                ><h3>Use a French hair pin</h3>
                <p>
                  Support the bun, guide the rigid pin and check the placement
                  before letting go.
                </p>
                <span class="text-link">Follow the French-pin method →</span></a
              ><a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToChooseAHairBarrette]"
                ><h3>Choose a barrette</h3>
                <p>
                  Check clasp clearance and contact with the actual section
                  instead of relying on decorative length.
                </p>
                <span class="text-link">Check barrette fit →</span></a
              >
            </div>
            <p>
              Compare
              <a [routerLink]="['/guides', articleSlug.BananaClipVsClawClip]"
                >banana and claw closures</a
              >
              for toothed accessories, or
              <a [routerLink]="['/guides', articleSlug.HairBungeeVsHairElastic]"
                >bungees and closed elastics</a
              >
              for a gathered tail. Opening, placement and removal are different
              tasks; a similar material or size name does not make the methods
              interchangeable.
            </p>
          </section>
          <section class="category-guide-section">
            <div class="section-heading">
              <h2>Use and care for the accessories you own</h2>
              <p>
                Follow a heated kit’s own handling instructions, then use each
                fabric accessory’s care label for cleaning and drying.
              </p>
            </div>
            <div class="editorial-grid guides-grid">
              <a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToCleanHairRollers]"
                ><h3>How to clean hair rollers</h3>
                <p>
                  Identify the construction and separate roller care from the
                  electrical setter.
                </p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.HowToCleanHairClipsAndPins,
                ]"
                ><h3>How to clean clips and pins</h3>
                <p>
                  Check the finish and mechanism before choosing permitted
                  surface care.
                </p>
                <span class="text-link">Read guide →</span></a
              >
              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.HowToPackHairToolsForTravel,
                ]"
                ><h3>How to pack hair tools for travel</h3>
                <p>
                  Plan a cooled kit with room for the cord, plug and
                  attachments.
                </p>
                <span class="text-link">Read guide →</span></a
              >

              <a
                class="guide-card"
                [routerLink]="[
                  '/guides',
                  articleSlug.HowToUseHeatedHairRollers,
                ]"
                ><h3>Use heated hair rollers</h3>
                <p>
                  Separate kit readiness, section wrapping, hot-clip handling
                  and removal.
                </p>
                <span class="text-link"
                  >Open the heated-roller method →</span
                ></a
              ><a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToWashASatinBonnet]"
                ><h3>Wash a satin bonnet</h3>
                <p>
                  Check fibre, band, lining and the permitted wash and drying
                  route.
                </p>
                <span class="text-link">Open bonnet care →</span></a
              ><a
                class="guide-card"
                [routerLink]="['/guides', articleSlug.HowToCleanHairScrunchies]"
                ><h3>Clean hair scrunchies</h3>
                <p>
                  Choose spot cleaning or a permitted wash without treating
                  every fabric-and-elastic ring alike.
                </p>
                <span class="text-link">Open scrunchie care →</span></a
              >
            </div>
          </section>
        }
        @for (section of categoryGuideSections; track section.label) {
          <section
            class="category-guide-section"
            [attr.aria-labelledby]="section.id"
          >
            <div class="section-heading">
              <p class="eyebrow">{{ section.eyebrow }}</p>
              <h2 [id]="section.id">{{ section.label }}</h2>
            </div>
            @if (section.id === 'hair-dryers-learn-guides') {
              <p>
                For the small front section, follow
                <a [routerLink]="['/guides', articleSlug.HowToBlowDryAFringe]"
                  >how to blow-dry a fringe</a
                >. Choose a forward, side or curtain direction and check the
                brush's release before repeating a pass.
              </p>
            }
            @if (section.id === 'everyday-fastening-methods') {
              <p>
                For a finished clasp fastening, follow
                <a [routerLink]="['/guides', articleSlug.HowToUseAHairBarrette]"
                  >barrette placement and release</a
                >. For a temporary surface section while getting ready, use
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowToUseCreaselessHairClips,
                  ]"
                  >creaseless-clip placement</a
                >. Choose the actual job before applying another accessory's
                opening action.
              </p>
              <p>
                Use
                <a [routerLink]="['/guides', articleSlug.HowToUseABananaClip]"
                  >banana-clip operation</a
                >,
                <a [routerLink]="['/guides', articleSlug.HowToUseAHairBungee]"
                  >hair-bungee operation</a
                >
                or
                <a [routerLink]="['/guides', articleSlug.HowToUseHairSticks]"
                  >hair-stick placement</a
                >
                for the selected construction. Begin with the intended section
                supported and keep the closure or insertion route clear before
                releasing the style.
              </p>
            }
            <div class="editorial-grid guides-grid">
              @for (article of section.articles; track article.slug) {
                <a class="guide-card" [routerLink]="['/guides', article.slug]"
                  ><p class="eyebrow">{{ article.category }}</p>
                  <h3>
                    {{
                      article.slug === articleSlug.HairDryerChooser
                        ? 'Choose a Hair Dryer'
                        : (toolChoiceCards[article.slug]?.title ??
                          article.heading)
                    }}
                  </h3>
                  <p>
                    {{
                      article.slug === articleSlug.HairDryerChooser
                        ? 'Use the feature finder, then compare dryers for your routine.'
                        : article.slug === articleSlug.HowToCleanAHairComb
                          ? 'Remove debris between teeth, follow material-specific care and inspect the comb before storing it.'
                          : (toolChoiceCards[article.slug]?.description ??
                            everydayMethodDescriptions[article.slug] ??
                            finishingMethodDescriptions[article.slug] ??
                            fastenerDescriptions[article.slug] ??
                            article.description)
                    }}
                  </p>
                  <span class="text-link"
                    >Read guide <span aria-hidden="true">→</span></span
                  ></a
                >
              }
            </div>
            @if (section.id === 'hot-air-brushes-compare-guides') {
              <p>
                Compare
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.RotatingVsFixedHotAirBrush,
                  ]"
                  >rotating and fixed brush heads</a
                >
                when the turning movement is the decision. Compare
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.AirflowCurlingBarrelVsCurlingWand,
                  ]"
                  >airflow curling barrels with wands</a
                >
                when the question is how hair wraps. A mode-changing body, a
                powered brush and an airflow barrel describe different
                functions.
              </p>
              <p>
                A two-arm airflow straightener is another format to assess when
                the aim is combined drying and straightening. Use
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.WetToDryHairStraightenerVsFlatIron,
                  ]"
                  >wet-to-dry versus flat iron</a
                >
                for that stage decision, then
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowToCleanAWetToDryHairStraightener,
                  ]"
                  >wet-to-dry straightener care</a
                >
                for its separate air-path and contact-surface checks. Do not
                borrow a brush-head movement or cleaning procedure simply
                because both appliances move air.
              </p>
            }
            @if (section.id === 'hot-air-brushes-learn-guides') {
              <p>
                For the selected method, use
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowToUseARotatingHotAirBrush,
                  ]"
                  >rotating-brush operation</a
                >
                or
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowToUseAirflowCurlingBarrels,
                  ]"
                  >airflow-barrel use</a
                >. Keep the actual head, starting condition and release sequence
                together rather than borrowing controls from another attachment
                in the same box.
              </p>
            }
            @if (section.id === 'hair-dryers-learn-guides') {
              <p>
                For a different contact path, compare
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HairDryerCombAttachmentVsConcentrator,
                  ]"
                  >a comb attachment with a concentrator</a
                >. For an already suitable style's finishing step, use
                <a
                  [routerLink]="[
                    '/guides',
                    articleSlug.HowToUseAHairDryerFlyawayAttachment,
                  ]"
                  >flyaway-attachment guidance</a
                >. The attachment's own directions determine which stage and
                movement it permits.
              </p>
            }
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
        <p><a routerLink="/contact">Contact Comb Report</a></p>
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
        <h2>What our comparisons can establish</h2>
        <p>
          A published dimension, control or accessory list can identify a
          difference between exact models. It does not establish a timed result,
          comfort, damage reduction or durability unless the page supplies
          suitable evidence for that specific claim.
        </p>
        <p>
          We keep the model, variant, market, source and check date together.
          Missing facts remain unknown. Specifications shown for a free gift,
          related product or another generation are not transferred to the tool
          being compared.
        </p>
        <p>
          An editorial recommendation to investigate a format is not a claim
          that we used or tested it. When a practical handling check is
          suggested, it helps readers inspect their own fit and routine; it is
          not presented as a controlled product test.
        </p>
        <h2>Changes and review dates</h2>
        <p>
          A source-check date records when the cited material was inspected. An
          article’s modification date records a substantive change to that
          article. A deployment or template rebuild does not by itself make
          every product fact newly checked.
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
        <p><a routerLink="/contact">Report a correction</a></p>
      </section>
    }
    @case ('privacy') {
      <section class="listing-intro">
        <p class="eyebrow">Privacy</p>
        <h1>Privacy notice</h1>
        <p class="lede">You can read Comb Report without an account.</p>
        <h2>Contact enquiries</h2>
        <p>
          We use your email address, your message and any details you include to
          respond and follow up on your enquiry. For questions about your
          personal data, use the form on our
          <a routerLink="/contact">contact page</a>.
        </p>
        <p>
          The contact form collects your reason for getting in touch, email
          address and message, plus your name and a page link if you provide
          them. Amazon Simple Email Service delivers messages to our mailbox.
        </p>
        @if (contactPrivacy; as policy) {
          <p>
            {{ policy.controller }} is responsible for this data. The lawful
            basis is {{ policy.lawfulBasis }}.
          </p>
          <p>
            Our mailbox is hosted by {{ policy.mailboxProvider }}.
            {{ policy.retention }}
          </p>
        }
        <p>
          AWS uses incoming IP addresses to limit repeated form submissions. The
          contact form uses Cloudflare Turnstile to check for automated
          submissions. Form answers are kept out of application logs and
          analytics.
        </p>
        <h2>Your analytics choice</h2>
        <p>
          The consent banner offers “Accept analytics” and “Reject.” Your choice
          is stored in this browser's local storage so it can be remembered on
          this device; the application does not set a cookie for the choice.
          Clear this site's local storage to make the banner appear again and
          choose again.
        </p>
        <h2>Analytics after acceptance</h2>
        <p>
          Google Analytics is loaded only after you accept. The application
          sends page views and general interaction events, but does not send
          finder answers, routine choices, or the identities of products you
          select; a comparison interaction may include only the number of
          selected items. Page-view paths omit query strings and fragments.
          Google signals and ad-personalization signals are disabled in the
          application configuration. Google may use cookies after analytics is
          enabled. The cookie lifetime and Analytics data-retention settings are
          controlled outside this codebase and have not been verified here.
        </p>
        <p>
          If you accept analytics, we record clicks on retailer links along with
          the guide, retailer, and market for the offer.
        </p>
        <h2>Choices and product comparisons</h2>
        <p>
          Finder answers stay in page memory while you use a tool. A product
          selected from the direct-heat finder is passed to the comparison
          explorer through in-app navigation state, not the address bar. The
          explorer's selections stay in page memory and are not saved by the
          application. Reloading or leaving the page clears them.
        </p>
        <h2>Hosting and outside links</h2>
        <p>
          The site host necessarily receives technical requests to deliver
          pages. This repository does not configure a separate access-log
          destination or a retention period for provider-side request and
          security records, so those details are not stated here. Links to
          manufacturers and other sites take you to services with their own
          privacy practices.
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
  readonly toolChoiceCards = resolveGuideCardCopy(
    toolChoiceCards,
    waveMethodCards,
    airflowMethodCards,
    shapingMethodCards,
    supportedUpdoCards,
    straightenerGuideCards,
  );
  readonly modelComparisonDescriptions = modelComparisonDescriptions;
  readonly modelComparisonGroups = modelComparisonGroups;
  readonly finishingGuideDescriptions = finishingGuideDescriptions;
  readonly handlingGuideDescriptions = handlingGuideDescriptions;
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SiteSeoService);
  private readonly analytics = inject(AnalyticsService);
  readonly contactPrivacy = inject(CONTACT_FORM_PRIVACY);
  guideSearch = '';
  readonly allGuideCount = articles.length;
  get guideResultCountText(): string {
    const count = this.guides.length;
    if (!this.guideSearch.trim())
      return `${count} ${count === 1 ? 'guide' : 'guides'}`;
    return `${count} of ${this.allGuideCount} guides ${count === 1 ? 'matches' : 'match'}`;
  }
  clearGuideSearch(input: HTMLInputElement): void {
    this.guideSearch = '';
    input.value = '';
    input.focus();
  }
  get guides() {
    const normalise = (value: string) =>
      value.toLowerCase().replace(/[^a-z0-9]/g, '');
    const query = normalise(this.guideSearch);
    return articles.filter((article) =>
      normalise(
        [
          article.title,
          article.heading,
          article.slug,
          ...(consolidatedComparisonAliases[article.slug] ?? []),
          ...(seoGrowthAliases[article.slug] ?? []),
          ...(megaBatchAliases[article.slug] ?? []),
          ...(exactModelAliases[article.slug] ?? []),
          ...(remainingOpportunityAliases[article.slug] ?? []),
        ].join(' '),
      ).includes(query),
    );
  }
  readonly articleSlug = ArticleSlug;
  readonly everydayMethodDescriptions = everydayMethodDescriptions;
  readonly finishingMethodDescriptions = finishingMethodDescriptions;
  readonly fastenerDescriptions: Readonly<Partial<Record<string, string>>> =
    fastenerDescriptions;
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
        'Identify three features worth comparing for your routine, then open a named model comparison with its market stated.',
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
      name: 'Hair Dryer Running-Cost Calculator',
      type: 'Estimate electricity use',
      description:
        'Turn watts, minutes and your own unit rate into kWh and cost per use, per week and over 52 weeks.',
      path: '/guides/hair-dryer-wattage-guide',
      action: 'Estimate the cost',
    },
    {
      name: 'Airwrap Attachment Lookup',
      type: 'Check part fit',
      description:
        'Choose your Airwrap body and attachment family to see whether Dyson documents them as compatible.',
      path: '/guides/' + ArticleSlug.DysonAirwrapAttachmentCompatibility,
      action: 'Check compatibility',
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
      type: 'Review product directions',
      description:
        'Record your planned application and product-label starting states, then review direction and readiness checks.',
      path: '/guides/' + ArticleSlug.HeatProtectantSprayVsCream,
      action: 'Use the finder',
    },
  ] as const;
  readonly toolGroups = [
    {
      id: 'tools-choose',
      label: 'Choose',
      description:
        'Turn a styling job into the format and features worth checking.',
      tools: [
        'Flat Iron Finder',
        'Curling Tool Finder',
        'Hair Brush Finder',
        'Hair Dryer Feature Finder',
        'Round Brush Size Finder',
        'Heat Protectant Finder',
      ].flatMap((name) => this.tools.filter((tool) => tool.name === name)),
    },
    {
      id: 'tools-use',
      label: 'Use',
      description: 'Build a sequence from preparation to the final pass.',
      tools: [
        'Hair Tool Routine Builder',
        'Blow-Dry Routine Planner',
        'Hair Dryer Settings Finder',
      ].flatMap((name) => this.tools.filter((tool) => tool.name === name)),
    },
    {
      id: 'tools-fix',
      label: 'Fix',
      description:
        'Translate a confusing specification before treating a working tool as the problem.',
      tools: [
        'Hair Dryer Specs Decoder',
        'Hair Dryer Running-Cost Calculator',
        'Airwrap Attachment Lookup',
      ].flatMap((name) => this.tools.filter((tool) => tool.name === name)),
    },
  ] as const;
  readonly featuredGuide = articles[0];
  readonly latestGuides = [
    ArticleSlug.T3AireluxeVsFeatherweightStylemax,
    ArticleSlug.CloudNineOriginalIronVsTouchIron,
    ArticleSlug.BabylissWaveSecretAirVsStyleSecretAir,
    ArticleSlug.GhdChronosVsPlatinumPlus,
    ArticleSlug.CurlDefiningBrushVsDetanglingBrush,
    ArticleSlug.HairDryerDiffuserCompatibility,
  ].flatMap((slug) => articles.filter((article) => article.slug === slug));
  category?: GuideCategory;
  categoryArticles = articles;
  categoryGuideSections: readonly {
    id: string;
    eyebrow: string;
    label: string;
    articles: typeof articles;
  }[] = [];
  categoryPathwayGroups: readonly PathwayGroup[] = [];
  categoryStartLinks: readonly {
    label: string;
    path: string;
    description: string;
  }[] = [];
  categoryBreadcrumbs: readonly Breadcrumb[] = [];
  page = 'home';

  trackGuideTaskLink(
    taskGroup: 'roller_method' | 'hot_tool_care',
    destinationType: 'method' | 'comparison' | 'troubleshooting' | 'category',
  ): void {
    this.analytics.track('guide_task_link_click', {
      task_group: taskGroup,
      destination_type: destinationType,
    });
  }

  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'] as string;
    const categoryId = this.route.snapshot.data['category'];
    if (this.page === 'category') {
      this.category = guideCategoryById[categoryId];
      this.categoryPathwayGroups = categoryPathways[categoryId] ?? [];
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
            (article) =>
              classify(article.slug) === id &&
              !everydayFastenerSlugs.includes(article.slug as ArticleSlug) &&
              !finishingGuideDescriptions[article.slug] &&
              !handlingGuideDescriptions[article.slug] &&
              !modelComparisonDescriptions[article.slug],
          ),
        }))
        .filter((section) => section.articles.length > 0);
      if (categoryId === 'hair-accessories') {
        this.categoryGuideSections = [
          ...this.categoryGuideSections,
          {
            id: 'everyday-fastening-methods',
            label: 'Everyday fastening methods',
            eyebrow: 'Use',
            articles: everydayFastenerSlugs.flatMap((slug) =>
              this.categoryArticles.filter((article) => article.slug === slug),
            ),
          },
        ];
      }
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
          {
            label: 'Check adapter and voltage labels',
            path: '/guides/plug-adapter-vs-voltage-converter-hair-tools',
            description: 'separate plug fit from appliance input',
          },
        ],
        'hot-air-brushes': [
          {
            label: 'Choose heated round or airflow',
            path: '/guides/thermal-brush-vs-hot-air-brush',
            description: 'check heat source and the permitted routine stage',
          },
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
          {
            label: 'Compare current Revlon US versions',
            path: '/guides/revlon-one-step-volumizer-vs-plus',
            description: 'separate fixed and detachable heads',
          },
          {
            label: 'Compare two UK BaByliss models',
            path: '/guides/babyliss-air-style-1000-vs-flawless-volume',
            description: 'check the exact 2136U and 2764U formats',
          },
          {
            label: 'Choose powered or manual turning',
            path: '/guides/rotating-vs-fixed-hot-air-brush',
            description: 'identify which brush head actually rotates',
          },
          {
            label: 'Plan a multi-styler bundle',
            path: '/guides/how-to-choose-multi-styler-attachments',
            description: 'check roles, fit and what is in the box',
          },
        ],
        'brushes-and-combs': [
          {
            label: 'Compare two Denman stylers',
            path: '/guides/denman-d3-vs-d4',
            description: 'choose the exact seven- or nine-row layout',
          },
          {
            label: 'Compare Olivia Garden round brushes',
            path: '/guides/olivia-garden-ceramic-ion-vs-nanothermic',
            description:
              'keep nominal labels and diameter definitions distinct',
          },
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
          {
            label: 'Compare two exact detanglers',
            path: '/guides/tangle-teezer-ultimate-detangler-vs-wet-brush-original',
            description: 'read tooth layout, grip and heat restrictions',
          },
          {
            label: 'Detangle with a comb or brush',
            path: '/guides/wide-tooth-comb-vs-detangling-brush',
            description: 'compare contact area, grip and section handling',
          },
          {
            label: 'Style a curl section',
            path: '/guides/curl-defining-brush-vs-detangling-brush',
            description: 'separate preparation from defining',
          },
          {
            label: 'Check dryer permission',
            path: '/guides/can-you-use-detangling-brush-for-blow-drying',
            description: 'verify exact brush guidance before using heat',
          },
          {
            label: 'Maintain a manual tool',
            path: '/guides/how-to-clean-a-hair-brush',
            description: 'clean, inspect and decide whether to replace it',
          },
        ],
        'hair-accessories': [
          {
            label: 'Plan roller sizes and pack coverage',
            path: '/guides/hair-roller-size-guide',
            description: 'try a first size, then count pieces per size',
          },
          {
            label: 'Choose bendable or snap rollers',
            path: '/guides/flexi-rods-vs-foam-rollers',
            description: 'compare two unheated closure paths',
          },
          {
            label: 'Choose heated or self-grip rollers',
            path: '/guides/heated-rollers-vs-self-grip-rollers',
            description: 'separate an appliance from an unheated set',
          },
          {
            label: 'Choose a heatless set',
            path: '/guides/best-heatless-curling-sets',
            description: 'compare ribbon, flexi and roller formats',
          },
          {
            label: 'Diagnose a heatless set',
            path: '/guides/heatless-curls-not-working',
            description: 'change one part of the failed stage',
          },
          {
            label: 'Hold working sections',
            path: '/guides/how-to-choose-hair-sectioning-clips',
            description: 'choose temporary clips for styling',
          },
          {
            label: 'Fasten a finished style',
            path: '/guides/how-to-choose-claw-clip-size',
            description: 'match jaw opening and arrangement',
          },
          {
            label: 'Compare hair ties',
            path: '/guides/hair-elastics-vs-scrunchies',
            description: 'weigh hold, bulk, removal and care',
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
      privacy: [
        'Privacy | Comb Report',
        'How optional analytics, local tool choices, hosting requests, and outside links are handled on Comb Report.',
        '/privacy',
      ],
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
