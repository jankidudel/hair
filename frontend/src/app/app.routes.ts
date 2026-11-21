import { Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page.component';
import { StaticPageComponent } from './static-page.component';
import { ContactPageComponent } from './contact-page.component';
import { HairBrushFinderComponent } from './hair-brush-finder.component';
import { HairToolRoutineBuilderComponent } from './hair-tool-routine-builder.component';
import { NotFoundPageComponent } from './not-found-page.component';
import { ProductExplorerComponent } from './product-explorer.component';
import { DirectHeatFinderComponent } from './direct-heat-finder.component';
import { DirectHeatHubComponent } from './direct-heat-hub.component';
import { publishedGuideCanMatch } from './published-guide-route';
import {
  ARTICLE_BODY_DATA_KEY,
  articleBodyResolver,
} from './article-html.resolver';
export const routes: Routes = [
  { path: '', component: StaticPageComponent, data: { page: 'home' } },
  {
    path: 'hair-care',
    component: StaticPageComponent,
    data: { page: 'category', category: 'hair-care' },
  },
  {
    path: 'hair-dryers',
    component: StaticPageComponent,
    data: { page: 'category', category: 'hair-dryers' },
  },
  {
    path: 'hot-air-brushes',
    component: StaticPageComponent,
    data: { page: 'category', category: 'hot-air-brushes' },
  },
  {
    path: 'brushes-combs',
    component: StaticPageComponent,
    data: { page: 'category', category: 'brushes-and-combs' },
  },
  {
    path: 'hair-accessories',
    component: StaticPageComponent,
    data: { page: 'category', category: 'hair-accessories' },
  },
  { path: 'guides', component: StaticPageComponent, data: { page: 'guides' } },
  { path: 'hair-brush-finder', component: HairBrushFinderComponent },
  {
    path: 'flat-irons',
    component: DirectHeatHubComponent,
    data: { kind: 'flat' },
  },
  {
    path: 'curling-irons',
    component: DirectHeatHubComponent,
    data: { kind: 'curling' },
  },
  {
    path: 'flat-iron-finder',
    component: DirectHeatFinderComponent,
    data: { kind: 'flat' },
  },
  {
    path: 'curling-tool-finder',
    component: DirectHeatFinderComponent,
    data: { kind: 'curling' },
  },
  {
    path: 'hair-tool-routine-builder',
    component: HairToolRoutineBuilderComponent,
  },
  { path: 'tools', component: StaticPageComponent, data: { page: 'tools' } },
  { path: 'products', component: ProductExplorerComponent },
  { path: 'about', component: StaticPageComponent, data: { page: 'about' } },
  {
    path: 'authors/combreport-editorial-team',
    component: StaticPageComponent,
    data: { page: 'author' },
  },
  {
    path: 'editorial-policy',
    component: StaticPageComponent,
    data: { page: 'editorial-policy' },
  },
  {
    path: 'testing-research-methodology',
    component: StaticPageComponent,
    data: { page: 'methodology' },
  },
  {
    path: 'corrections-policy',
    component: StaticPageComponent,
    data: { page: 'corrections' },
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  {
    path: 'privacy',
    component: StaticPageComponent,
    data: { page: 'privacy' },
  },
  {
    path: 'affiliate-disclosure',
    component: StaticPageComponent,
    data: { page: 'affiliate' },
  },
  {
    path: 'guides/:slug',
    component: ArticlePageComponent,
    canMatch: [publishedGuideCanMatch],
    resolve: { [ARTICLE_BODY_DATA_KEY]: articleBodyResolver },
  },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
