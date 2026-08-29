import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/">Everyday Hair</a>
      <nav aria-label="Main navigation">
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Home</a
        ><a routerLink="/guides" routerLinkActive="active">Hair Care</a
        ><a routerLink="/products" routerLinkActive="active">Products</a
        ><a routerLink="/guides">Guides</a><a routerLink="/about">About</a>
      </nav>
    </header>
    <main><router-outlet /></main>
    <footer>
      <p>
        Some pages may contain affiliate links.
        <a routerLink="/affiliate-disclosure">Read our disclosure</a>.
      </p>
      <p>
        <a routerLink="/privacy">Privacy</a> · Cookies (coming soon) · Contact
        (coming soon)
      </p>
    </footer>
  `,
})
export class AppComponent {}
