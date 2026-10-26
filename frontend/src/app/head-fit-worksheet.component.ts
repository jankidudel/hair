import { Component, afterNextRender, signal } from '@angular/core';

type HeadRecord = Record<string, string>;
const fields = [
  { key: 'model', label: 'Model and market' },
  {
    key: 'shape',
    label: 'Head shape',
    options: ['Not recorded', 'Round', 'Oval', 'Paddle', 'Other'],
  },
  {
    key: 'size',
    label: 'Published size label',
    help: 'Copy the source wording. Do not guess a dimension from an image.',
  },
  {
    key: 'measurement',
    label: 'What the size measures',
    options: [
      'Not established',
      'Round core diameter',
      'Oval axes',
      'Outside bristle span',
      'Other defined measurement',
    ],
  },
  {
    key: 'length',
    label: 'Published working-head length',
    help: 'Leave blank if the source does not define it. Overall tool length is a different measurement.',
  },
  {
    key: 'access',
    label: 'Short-section access',
    options: ['Not checked', 'Reaches the intended area', 'Awkward to reach'],
  },
  {
    key: 'release',
    label: 'Clear release path',
    options: ['Not checked', 'Path looks clear', 'Path needs review'],
  },
] as const;
const emptyHead = (): HeadRecord =>
  Object.fromEntries(
    fields.map((f) => [f.key, 'options' in f ? f.options[0] : '']),
  );
let nextId = 0;
@Component({
  selector: 'app-head-fit-worksheet',
  styleUrl: './head-fit-worksheet.component.css',
  template: `
    <section id="head-fit-worksheet" aria-labelledby="head-fit-heading">
      <h2 id="head-fit-heading">Compare two head-fit records</h2>
      <p>
        Record the published labels and your own access observations. Unknown
        information stays unknown; this worksheet does not choose a product or a
        heat setting. Your entries stay in this page session.
      </p>
      @if (ready()) {
        <form (submit)="submit($event)">
          <div class="heads">
            @for (head of heads; track $index; let i = $index) {
              <fieldset>
                <legend>Head {{ i === 0 ? 'A' : 'B' }}</legend>
                @for (field of fields; track field.key) {
                  <label [for]="controlId(i, field.key)">{{
                    field.label
                  }}</label>
                  @if ('options' in field) {
                    <select
                      [id]="controlId(i, field.key)"
                      [value]="head[field.key]"
                      (change)="edit(i, field.key, $event)"
                    >
                      @for (option of field.options; track option) {
                        <option [value]="option">{{ option }}</option>
                      }
                    </select>
                  } @else {
                    <input
                      [id]="controlId(i, field.key)"
                      type="text"
                      maxlength="120"
                      [value]="head[field.key]"
                      [attr.aria-describedby]="
                        'help' in field
                          ? controlId(i, field.key) + '-help'
                          : null
                      "
                      (input)="edit(i, field.key, $event)"
                    />
                    @if ('help' in field) {
                      <p class="help" [id]="controlId(i, field.key) + '-help'">
                        {{ field.help }}
                      </p>
                    }
                  }
                }
              </fieldset>
            }
          </div>
          <div class="actions">
            <button type="submit">Show comparison notes</button
            ><button type="button" (click)="clear()">Clear entries</button>
          </div>
        </form>
      } @else {
        <p>
          Compare the measurement types in the table above, then record your own
          access observations separately.
        </p>
      }
      <p role="status" aria-live="polite">{{ status }}</p>
      @if (notes) {
        <h3>Your comparison notes</h3>
        <div
          class="table-scroll"
          tabindex="0"
          role="region"
          aria-label="Recorded head comparison"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Recorded item</th>
                <th scope="col">Head A</th>
                <th scope="col">Head B</th>
              </tr>
            </thead>
            <tbody>
              @for (field of fields; track field.key) {
                <tr>
                  <th scope="row">{{ field.label }}</th>
                  <td>{{ heads[0][field.key] || 'Not recorded' }}</td>
                  <td>{{ heads[1][field.key] || 'Not recorded' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <ul>
          @for (note of notes; track $index) {
            <li>{{ note }}</li>
          }
        </ul>
      }
      <ul>
        <li>
          <a href="/guides/t3-airebrush-vs-airebrush-round"
            >T3 AireBrush vs AireBrush Round</a
          >
        </li>
        <li>
          <a href="/guides/best-hot-air-brushes-short-hair"
            >How to choose a hot-air brush for short hair</a
          >
        </li>
        <li>
          <a href="/guides/best-hot-air-brush-for-thick-hair"
            >How to choose a hot-air brush for thick or dense hair</a
          >
        </li>
      </ul>
    </section>
  `,
})
export class HeadFitWorksheetComponent {
  readonly ready = signal(false);
  readonly fields = fields;
  readonly instanceId = nextId++;
  heads = [emptyHead(), emptyHead()];
  notes: string[] | null = null;
  status = '';
  constructor() {
    afterNextRender(() => this.ready.set(true));
  }
  controlId(index: number, key: string): string {
    return `head-fit-${this.instanceId}-${index}-${key}`;
  }
  edit(index: number, key: string, event: Event): void {
    this.heads[index][key] = (event.target as HTMLInputElement).value.slice(
      0,
      120,
    );
    if (this.notes || this.status)
      this.status = 'Entries changed. Show comparison notes again.';
    this.notes = null;
  }
  clear(): void {
    this.heads = [emptyHead(), emptyHead()];
    this.notes = null;
    this.status = '';
  }
  submit(event: Event): void {
    event.preventDefault();
    const [a, b] = this.heads;
    const notes = [
      'A size label is not a styling result. Compare what each source measured before comparing the numbers.',
    ];
    this.heads.forEach((head, i) => {
      if (head['measurement'] === 'Not established')
        notes.push(
          `Head ${i === 0 ? 'A' : 'B'}: establish what its size label describes.`,
        );
    });
    if (
      a['measurement'] !== 'Not established' &&
      b['measurement'] !== 'Not established' &&
      a['measurement'] !== b['measurement']
    )
      notes.push(
        'These records describe different measurement types. Do not rank the heads by the size labels alone.',
      );
    if (
      this.heads.some(
        (h) =>
          h['shape'] === 'Oval' && h['measurement'] === 'Round core diameter',
      )
    )
      notes.push(
        'An oval head needs its measurement definition checked; one round-diameter label may not describe its two axes.',
      );
    if (this.heads.some((h) => !h['length'].trim()))
      notes.push(
        'At least one working-head length is not recorded. This table does not infer it from the total appliance length.',
      );
    this.heads.forEach((h, i) => {
      if (h['access'] === 'Awkward to reach')
        notes.push(
          `Head ${i === 0 ? 'A' : 'B'}: review the body route and working section before assuming that another size is necessary.`,
        );
    });
    this.heads.forEach((h, i) => {
      if (h['release'] === 'Path needs review')
        notes.push(
          `Head ${i === 0 ? 'A' : 'B'}: settle the release path under the exact tool instructions before treating the head as a useful fit.`,
        );
    });
    if (
      this.heads.every(
        (h) => h['access'] === 'Not checked' && h['release'] === 'Not checked',
      )
    )
      notes.push(
        'No access or release observations are recorded yet. The entries describe labels, not a completed fit check.',
      );
    notes.push(
      'A head that already reaches and releases the section can remain your baseline. No replacement recommendation is generated.',
    );
    this.notes = notes;
    this.status = 'Comparison notes are ready.';
  }
}
