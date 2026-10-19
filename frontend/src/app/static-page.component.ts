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
import {
  ChooseUseFixPathwaysComponent,
  type PathwayGroup,
} from './choose-use-fix-pathways.component';
import { categoryPathways } from './category-pathways';
import { AnalyticsService } from './analytics/analytics.service';

@Component({
  imports: [RouterLink, BreadcrumbsComponent, ChooseUseFixPathwaysComponent],
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
            [routerLink]="['/guides', articleSlug.WhenToReplaceHairbrushOrComb]"
            >Inspect a brush or comb <b>→</b></a
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
        @if (categoryPathwayGroups.length) {
          <app-choose-use-fix-pathways [groups]="categoryPathwayGroups" />
        }
        @if (category.id === 'hair-accessories') {
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
                        : article.slug === articleSlug.HowToCleanAHairComb
                          ? 'Remove debris between teeth, follow material-specific care and inspect the comb before storing it.'
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
        <h1>Privacy notice</h1>
        <p class="lede">
          You can read Comb Report without an account. The site has no contact
          form and does not ask you to submit personal details through its
          pages.
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
          privacy practices. No public contact address or contact form is
          currently provided by this site.
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
  private readonly analytics = inject(AnalyticsService);
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
      tools: ['Hair Dryer Specs Decoder'].flatMap((name) =>
        this.tools.filter((tool) => tool.name === name),
      ),
    },
  ] as const;
  readonly featuredGuide = articles[0];
  readonly latestGuides = [
    ArticleSlug.HowToUseHeatlessCurlingRod,
    ArticleSlug.VelcroVsFoamHairRollers,
    ArticleSlug.BaBylissAirStyle1000VsFlawlessVolume,
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
            description: 'check curve, working width, closures and pieces',
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
