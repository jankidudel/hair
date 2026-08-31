import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/">Comb Report</a>
      <nav aria-label="Main navigation">
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Home</a
        ><a routerLink="/hair-care" routerLinkActive="active">Hair Care</a
        ><a routerLink="/products" routerLinkActive="active">Products</a
        ><a routerLink="/guides" routerLinkActive="active">Guides</a
        ><a routerLink="/about" routerLinkActive="active">About</a>
      </nav>
    </header>
    <main><router-outlet /></main>
    <footer>
      <div class="footer-row">
        <p>
          Some pages may contain affiliate links.
          <a routerLink="/affiliate-disclosure">Read our disclosure</a>.
        </p>
        <p>
          <a routerLink="/privacy">Privacy</a> · Cookies (coming soon) · Contact
          (coming soon)
        </p>
      </div>
    </footer>
  `,
})
export class AppComponent {}
