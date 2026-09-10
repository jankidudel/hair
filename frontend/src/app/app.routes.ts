import { Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page.component';
import { StaticPageComponent } from './static-page.component';
import { HairBrushFinderComponent } from './hair-brush-finder.component';
import { HairToolRoutineBuilderComponent } from './hair-tool-routine-builder.component';
import { NotFoundPageComponent } from './not-found-page.component';
import { ProductExplorerComponent } from './product-explorer.component';
import { publishedGuideCanMatch } from './published-guide-route';
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
    path: 'hair-tool-routine-builder',
    component: HairToolRoutineBuilderComponent,
  },
  { path: 'products', component: ProductExplorerComponent },
  { path: 'products/:comparison', component: ProductExplorerComponent },
  { path: 'about', component: StaticPageComponent, data: { page: 'about' } },
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
  },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
