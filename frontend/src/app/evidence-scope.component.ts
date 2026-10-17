import { Component, Input } from '@angular/core';
import type { ProductProfile } from './product-comparisons';

@Component({
  selector: 'app-evidence-scope',
  styleUrl: 'evidence-scope.component.css',
  template: `
    <section class="evidence-scope" aria-labelledby="evidence-scope-title">
      <h2 id="evidence-scope-title">What this comparison can establish</h2>
      <dl>
        <div>
          <dt>Exact products</dt>
          <dd>
            @for (product of products; track product.slug; let last = $last) {
              {{ product.name }}
              <span class="identifier"
                >({{ product.modelIdentifier ?? product.slug }})</span
              >
              @if (!last) {
                ;
              }
            }
          </dd>
        </div>
        <div>
          <dt>Market</dt>
          <dd>{{ marketContext ?? markets }}</dd>
        </div>
        @if (marketWarning) {
          <div class="scope-warning" role="note">
            <dt>Market warning</dt>
            <dd>{{ marketWarning }}</dd>
          </div>
        }
        @if (generationWarning) {
          <div class="scope-warning" role="note">
            <dt>Generation warning</dt>
            <dd>{{ generationWarning }}</dd>
          </div>
        }
        <div>
          <dt>Evidence used</dt>
          <dd>
            Official product pages, support pages and manuals linked in this
            article.
          </dd>
        </div>
        <div>
          <dt>Useful for</dt>
          <dd>
            Comparing published construction, controls, attachments, dimensions
            and ownership details when those fields are available.
          </dd>
        </div>
        <div>
          <dt>Does not establish</dt>
          <dd>
            Independent performance, comfort, durability, hair outcome or value
            for every reader.
          </dd>
        </div>
        @if (commonCheckedDate) {
          <div>
            <dt>Checked</dt>
            <dd>{{ commonCheckedDate }}</dd>
          </div>
        }
      </dl>
      <p class="scope-note">
        A missing field stays unknown. Do not infer it from another colour,
        bundle, market or product generation.
      </p>
    </section>
  `,
})
export class EvidenceScopeComponent {
  @Input({ required: true }) products: readonly ProductProfile[] = [];
  @Input() marketWarning?: string;
  @Input() generationWarning?: string;
  @Input() marketContext?: string;

  get markets(): string {
    return [...new Set(this.products.map((product) => product.market))].join(
      ' and ',
    );
  }

  get commonCheckedDate(): string | undefined {
    const dates = new Set(
      this.products.flatMap((product) => [
        product.verifiedAt,
        ...product.verifiedFacts.map((fact) => fact.verifiedAt),
      ]),
    );
    return dates.size === 1 ? [...dates][0] : undefined;
  }
}
