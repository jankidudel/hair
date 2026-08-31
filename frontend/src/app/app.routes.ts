import { Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page.component';
import { StaticPageComponent } from './static-page.component';
export const routes: Routes = [
  { path: '', component: StaticPageComponent, data: { page: 'home' } },
  {
    path: 'hair-care',
    component: StaticPageComponent,
    data: { page: 'hair-care' },
  },
  { path: 'guides', component: StaticPageComponent, data: { page: 'guides' } },
  {
    path: 'products',
    component: StaticPageComponent,
    data: { page: 'products' },
  },
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
  { path: 'guides/:slug', component: ArticlePageComponent },
];
