import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { watchPresetHash } from './tool-preset-hash';
import { AnalyticsService } from './analytics/analytics.service';
import { ArticleSlug } from './article-slug';
import {
  PRINTABLE_WIDTH_MM,
  buildMeasurement,
  compareMeasurements,
  comparisonPresetById,
  comparisonPresets,
  drawingExtent,
  fieldLabels,
  fieldsForShape,
  figureText,
  formatLength,
  inputValue,
  modeDemo,
  modeLabels,
  parseLength,
  presetById,
  presetsForMode,
  taperGap,
  type ComparisonPreset,
  type FieldName,
  type ManualShape,
  type ManualValues,
  type Measurement,
  type PublishedFigure,
  type SizeMode,
  type SizePreset,
  type SizeUnit,
} from './hair-tool-sizes';

type Slot = 'a' | 'b';

interface CardState {
  source: 'model' | 'manual';
  presetId?: string;
  figureId?: string;
  shape: ManualShape;
  raw: Partial<Record<FieldName, string>>;
  values: ManualValues;
  invalid: Set<FieldName>;
  /** Fields the reader has committed at least once; only these show errors. */
  touched: Set<FieldName>;
}

/** Pause after the last keystroke before an entry counts as finished. */
export const FIELD_COMMIT_DELAY_MS = 600;

interface CardView {
  readonly slot: Slot;
  readonly measurement?: Measurement;
  readonly preset?: SizePreset;
  readonly figure?: PublishedFigure;
  readonly errors: Partial<Record<FieldName, string>>;
  readonly lines: readonly string[];
  readonly notes: readonly string[];
  readonly title: string;
}

interface Shape {
  readonly kind: 'rect' | 'circle' | 'poly' | 'line';
  readonly x?: number;
  readonly y?: number;
  readonly w?: number;
  readonly h?: number;
  readonly cx?: number;
  readonly cy?: number;
  readonly r?: number;
  readonly points?: string;
  readonly dashed?: boolean;
  readonly solid?: boolean;
}

interface Drawing {
  readonly height: number;
  readonly shapes: readonly Shape[];
  readonly description: string;
}

const modeShapes: Readonly<Record<SizeMode, readonly ManualShape[]>> = {
  plates: ['plate'],
  barrels: ['cylinder', 'taper'],
  brushes: ['brush'],
};

const shapeLabels: Readonly<Record<ManualShape, string>> = {
  plate: 'Flat plate',
  cylinder: 'Straight barrel',
  taper: 'Tapered barrel',
  brush: 'Round brush',
};

const newCard = (mode: SizeMode): CardState => ({
  source: 'model',
  shape: modeShapes[mode][0],
  raw: {},
  values: {},
  invalid: new Set(),
  touched: new Set(),
});

@Component({
  selector: 'app-hair-tool-size-visualiser-widget',
  imports: [],
  styleUrls: ['tool-shared.css', 'hair-tool-size-visualiser.component.css'],
  template: `
    <div class="tool-page tool-widget">
      <div class="mode-bar no-print">
        <div class="pill-row" role="radiogroup" aria-label="Tool shape">
          @for (option of modes; track option) {
            <label class="pill">
              <input
                type="radio"
                name="size-mode"
                [value]="option"
                [checked]="mode === option"
                (change)="setMode(option)"
              />
              <span>{{ modeLabel(option) }}</span>
            </label>
          }
        </div>
        <div class="pill-row" role="radiogroup" aria-label="Units">
          @for (option of units; track option) {
            <label class="pill">
              <input
                type="radio"
                name="size-unit"
                [value]="option"
                [checked]="unit === option"
                (change)="setUnit(option)"
              />
              <span>{{ option === 'mm' ? 'mm' : 'inches' }}</span>
            </label>
          }
        </div>
      </div>
      @if (presetMessage) {
        <p class="hint no-print">{{ presetMessage }}</p>
      }

      <div class="size-layout">
        <div class="size-cards no-print">
          @for (view of views; track view.slot) {
            <fieldset class="tool-card size-card">
              <legend>
                <span class="slot-badge" aria-hidden="true">{{
                  view.slot.toUpperCase()
                }}</span>
                Size {{ view.slot.toUpperCase() }}
              </legend>
              <div class="pill-row">
                <label class="pill">
                  <input
                    type="radio"
                    [name]="'source-' + view.slot"
                    value="model"
                    [checked]="card(view.slot).source === 'model'"
                    (change)="setSource(view.slot, 'model')"
                  />
                  <span>Choose a model</span>
                </label>
                <label class="pill">
                  <input
                    type="radio"
                    [name]="'source-' + view.slot"
                    value="manual"
                    [checked]="card(view.slot).source === 'manual'"
                    (change)="setSource(view.slot, 'manual')"
                  />
                  <span>Enter a measurement</span>
                </label>
              </div>
              @if (card(view.slot).source === 'model') {
                <label class="field" [for]="'preset-' + view.slot"
                  >Model
                  <select
                    [id]="'preset-' + view.slot"
                    (change)="setPreset(view.slot, $event)"
                  >
                    <option value="" [selected]="!card(view.slot).presetId">
                      Choose a model
                    </option>
                    @for (preset of modePresets; track preset.id) {
                      <option
                        [value]="preset.id"
                        [selected]="card(view.slot).presetId === preset.id"
                      >
                        {{ preset.market }} · {{ preset.name }}
                      </option>
                    }
                  </select>
                </label>
                @if (view.preset && view.preset.figures.length > 1) {
                  <label class="field" [for]="'figure-' + view.slot"
                    >Select a published width or label
                    <select
                      [id]="'figure-' + view.slot"
                      (change)="setFigure(view.slot, $event)"
                    >
                      @for (figure of view.preset.figures; track figure.id) {
                        <option
                          [value]="figure.id"
                          [selected]="view.figure?.id === figure.id"
                        >
                          {{ figure.basis }}: {{ figure.published }}
                        </option>
                      }
                    </select>
                    <span class="hint"
                      >The maker publishes more than one figure. Each is kept
                      separate; none is averaged.</span
                    >
                  </label>
                }
              } @else {
                @if (shapes.length > 1) {
                  <div class="pill-row shape-row">
                    @for (shape of shapes; track shape) {
                      <label class="pill">
                        <input
                          type="radio"
                          [name]="'shape-' + view.slot"
                          [value]="shape"
                          [checked]="card(view.slot).shape === shape"
                          (change)="setShape(view.slot, shape)"
                        />
                        <span>{{ shapeLabel(shape) }}</span>
                      </label>
                    }
                  </div>
                }
                <p class="hint">
                  Choose your own sizes in {{ unitName }}.
                  @if (unit === 'in') {
                    Fractions such as 1 1/4 or 1¼ work.
                  }
                </p>
                @for (field of fields(view.slot); track field) {
                  <label class="field" [for]="fieldId(view.slot, field)"
                    >{{ fieldLabel(field) }} ({{ unit }})
                    <input
                      type="text"
                      inputmode="decimal"
                      autocomplete="off"
                      [id]="fieldId(view.slot, field)"
                      [value]="card(view.slot).raw[field] ?? ''"
                      (input)="queueField(view.slot, field, $event)"
                      (change)="setField(view.slot, field, $event)"
                      (keydown.enter)="setField(view.slot, field, $event)"
                      [attr.aria-invalid]="view.errors[field] ? 'true' : null"
                      [attr.aria-describedby]="
                        view.errors[field]
                          ? fieldId(view.slot, field) + '-error'
                          : null
                      "
                    />
                    @if (view.errors[field]) {
                      <span
                        class="field-error"
                        [id]="fieldId(view.slot, field) + '-error'"
                        >{{ view.errors[field] }}</span
                      >
                    }
                  </label>
                }
              }
            </fieldset>
          }
        </div>

        <section
          class="tool-card size-drawing"
          aria-labelledby="drawing-heading"
        >
          <h2 id="drawing-heading">{{ modeLabel(mode) }} at a common scale</h2>
          <p class="print-only print-instruction">
            Print at 100% or Actual Size. Measure the 50 mm line before using
            this template.
          </p>
          <div class="print-only calibration">
            <svg
              class="calibration-bar"
              viewBox="0 0 50 6"
              role="img"
              aria-label="50 millimetre calibration line"
            >
              <rect x="0" y="2" width="50" height="1" fill="currentColor" />
              <rect x="0" y="0" width="0.5" height="5" fill="currentColor" />
              <rect x="49.5" y="0" width="0.5" height="5" fill="currentColor" />
            </svg>
            <span>50 mm</span>
          </div>
          @if (viewWidth > 0) {
            <div
              class="drawing-block"
              [class.print-omit]="!printable"
              [style.--print-width]="viewWidth + 'mm'"
            >
              <svg
                class="ruler scaled"
                [attr.viewBox]="'0 0 ' + viewWidth + ' ' + rulerHeight"
                aria-hidden="true"
              >
                <rect
                  x="0"
                  [attr.y]="rulerHeight * 0.05"
                  [attr.width]="viewWidth"
                  [attr.height]="rulerHeight * 0.04"
                  fill="currentColor"
                />
                @for (tick of ticks; track tick.x) {
                  <rect
                    [attr.x]="tick.x"
                    y="0"
                    [attr.width]="viewWidth / 500"
                    [attr.height]="
                      tick.major ? rulerHeight * 0.5 : rulerHeight * 0.28
                    "
                    fill="currentColor"
                  />
                  @if (tick.label) {
                    <text
                      [attr.x]="tick.x"
                      [attr.y]="rulerHeight * 0.92"
                      [attr.font-size]="rulerHeight * 0.38"
                      text-anchor="middle"
                      fill="currentColor"
                    >
                      {{ tick.label }}
                    </text>
                  }
                }
              </svg>
              <p class="ruler-caption">Ruler in {{ rulerUnit }}</p>
              @for (view of views; track view.slot) {
                <figure class="size-figure">
                  <figcaption>
                    <strong
                      ><span class="slot-badge" aria-hidden="true">{{
                        view.slot.toUpperCase()
                      }}</span>
                      {{ view.title }}</strong
                    >
                    @for (line of view.lines; track $index) {
                      <span>{{ line }}</span>
                    }
                    @for (note of view.notes; track $index) {
                      <span class="note">{{ note }}</span>
                    }
                  </figcaption>
                  @if (drawing(view); as d) {
                    <svg
                      class="scaled shape-svg"
                      [class.slot-b]="view.slot === 'b'"
                      [attr.viewBox]="'0 0 ' + viewWidth + ' ' + d.height"
                      role="img"
                      [attr.aria-label]="d.description"
                    >
                      @for (shape of d.shapes; track $index) {
                        @switch (shape.kind) {
                          @case ('rect') {
                            <rect
                              [attr.x]="shape.x"
                              [attr.y]="shape.y"
                              [attr.width]="shape.w"
                              [attr.height]="shape.h"
                              class="fill"
                            />
                          }
                          @case ('circle') {
                            <circle
                              [attr.cx]="shape.cx"
                              [attr.cy]="shape.cy"
                              [attr.r]="shape.r"
                              [class.fill]="shape.solid"
                              [class.outline]="!shape.solid"
                              [class.dashed]="shape.dashed"
                              [attr.stroke-width]="viewWidth / 250"
                              [attr.stroke-dasharray]="
                                shape.dashed ? viewWidth / 80 : null
                              "
                            />
                          }
                          @case ('poly') {
                            <polygon
                              [attr.points]="shape.points"
                              class="fill"
                            />
                          }
                        }
                      }
                    </svg>
                  } @else {
                    <p class="hint">Nothing to draw yet.</p>
                  }
                </figure>
              }
            </div>
            @if (!printable) {
              <p class="print-only">
                These dimensions are wider than a printed page, so the drawing
                was omitted at actual size. Use the table below.
              </p>
            }
          } @else {
            <p class="hint">Choose two sizes to draw them.</p>
          }
          <p class="scale-note">Drawn at a common scale. Screen sizes vary.</p>
          <div aria-live="polite" aria-atomic="true">
            @if (summary.length) {
              <h3 class="summary-heading">Difference</h3>
              @for (line of summary; track $index) {
                <p class="tool-status">{{ line }}</p>
              }
            } @else {
              <p class="tool-status" role="status">{{ statusText }}</p>
            }
          </div>
          <div
            class="table-scroll"
            tabindex="0"
            role="region"
            aria-label="Measurements in text"
          >
            <table>
              <caption class="visually-hidden">
                Measurements and sources for A and B
              </caption>
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  <th scope="col">Measurement</th>
                  <th scope="col">Source</th>
                </tr>
              </thead>
              <tbody>
                @for (view of views; track view.slot) {
                  <tr>
                    <th scope="row">
                      {{ view.slot.toUpperCase() }}: {{ view.title }}
                    </th>
                    <td>
                      @for (line of view.lines; track $index) {
                        <span class="cell-line">{{ line }}</span>
                      }
                    </td>
                    <td>
                      @if (view.figure) {
                        <a
                          [href]="view.figure.source.url"
                          target="_blank"
                          rel="noopener noreferrer"
                          >{{ view.figure.source.label
                          }}<span class="visually-hidden">
                            (opens in a new tab)</span
                          ></a
                        >
                        · {{ view.figure.source.market }} ·
                        {{ view.figure.basis }}: “{{ view.figure.published }}”
                        @if (view.figure.source.checkedDate) {
                          · checked {{ view.figure.source.checkedDate }}
                        }
                      } @else if (view.measurement) {
                        Your measurement
                      } @else {
                        —
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div class="button-row no-print">
            <button class="tool-button" type="button" (click)="print()">
              Print size template
            </button>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class HairToolSizeVisualiserWidgetComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly commitTimers = new Map<
    string,
    ReturnType<typeof setTimeout>
  >();
  readonly slugs = ArticleSlug;
  readonly modes: readonly SizeMode[] = ['plates', 'barrels', 'brushes'];
  readonly units: readonly SizeUnit[] = ['mm', 'in'];
  readonly comparisons = comparisonPresets;
  mode: SizeMode = 'plates';
  unit: SizeUnit = 'mm';
  presetMessage = '';
  private readonly state: Record<SizeMode, Record<Slot, CardState>> = {
    plates: { a: newCard('plates'), b: newCard('plates') },
    barrels: { a: newCard('barrels'), b: newCard('barrels') },
    brushes: { a: newCard('brushes'), b: newCard('brushes') },
  };
  private completedTracked = new Set<SizeMode>();

  constructor() {
    inject(DestroyRef).onDestroy(() =>
      this.commitTimers.forEach((timer) => clearTimeout(timer)),
    );
    for (const mode of this.modes) {
      const demo = comparisonPresetById(modeDemo[mode]);
      if (demo) this.loadComparison(demo);
    }
    this.mode = 'plates';
    watchPresetHash(
      'compare-',
      (id) => {
        const preset = comparisonPresetById(id);
        if (preset) this.applyComparison(preset, undefined, true);
        return preset !== undefined;
      },
      () =>
        (this.presetMessage =
          'That comparison link isn’t available, so the default comparison is shown.'),
    );
  }

  get modePresets(): readonly SizePreset[] {
    return presetsForMode(this.mode);
  }

  get shapes(): readonly ManualShape[] {
    return modeShapes[this.mode];
  }

  get unitName(): string {
    return this.unit === 'mm' ? 'millimetres' : 'inches';
  }

  get rulerUnit(): string {
    return this.unit === 'mm' ? 'millimetres' : 'inches';
  }

  card(slot: Slot): CardState {
    return this.state[this.mode][slot];
  }

  modeLabel(mode: SizeMode): string {
    return modeLabels[mode];
  }

  shapeLabel(shape: ManualShape): string {
    return shapeLabels[shape];
  }

  fieldLabel(field: FieldName): string {
    return fieldLabels[field];
  }

  fields(slot: Slot): readonly FieldName[] {
    return fieldsForShape[this.card(slot).shape];
  }

  fieldId(slot: Slot, field: FieldName): string {
    return `size-${slot}-${field}`;
  }

  presetHref(id: string): string {
    return `/hair-tool-size-visualiser#compare-${id}`;
  }

  get views(): readonly CardView[] {
    return (['a', 'b'] as const).map((slot) => this.view(this.mode, slot));
  }

  private view(mode: SizeMode, slot: Slot): CardView {
    const card = this.state[mode][slot];
    if (card.source === 'model') {
      const preset = card.presetId ? presetById(card.presetId) : undefined;
      const figure =
        preset?.figures.find((f) => f.id === card.figureId) ??
        preset?.figures[0];
      const measurement = figure?.value;
      return {
        slot,
        measurement,
        preset,
        figure,
        errors: {},
        title: preset ? `${preset.name} (${preset.market})` : 'No model chosen',
        lines: measurement ? this.lines(measurement, figure) : [],
        notes: measurement ? this.notes(measurement) : [],
      };
    }
    const { measurement, errors: allErrors } = buildMeasurement(
      card.shape,
      card.values,
      card.invalid,
    );
    // An untouched empty field is not an error yet.
    const errors = Object.fromEntries(
      Object.entries(allErrors).filter(([field]) =>
        card.touched.has(field as FieldName),
      ),
    ) as Partial<Record<FieldName, string>>;
    return {
      slot,
      measurement,
      errors,
      title: `Your measurement (${shapeLabels[card.shape].toLowerCase()})`,
      lines: measurement ? this.lines(measurement) : [],
      notes: measurement ? this.notes(measurement) : [],
    };
  }

  private lines(m: Measurement, figure?: PublishedFigure): string[] {
    const t = (mm: number) => figureText(mm, figure, this.unit);
    const published = figure ? [`Published: “${figure.published}”`] : [];
    switch (m.kind) {
      case 'plate':
        return [`Heated plate width: ${t(m.width)}`, ...published];
      case 'cylinder':
        return [
          `Barrel diameter: ${t(m.diameter)}`,
          ...(m.length !== undefined
            ? [`Heated length: ${formatLength(m.length, this.unit)}`]
            : []),
          ...published,
        ];
      case 'taper':
        return [
          `Wide end: ${t(m.wide)}`,
          `Narrow end: ${t(m.narrow)}`,
          ...(m.length !== undefined
            ? [`Heated length: ${formatLength(m.length, this.unit)}`]
            : []),
          ...published,
        ];
      case 'brush':
        return [
          ...(m.core !== undefined ? [`Bare core: ${t(m.core)}`] : []),
          ...(m.bristle !== undefined
            ? [`Bristle-tip diameter: ${t(m.bristle)}`]
            : []),
          ...published,
        ];
    }
  }

  private notes(m: Measurement): string[] {
    if (m.kind === 'plate')
      return ['Plate length not drawn; both plates share a graphical height.'];
    if ((m.kind === 'cylinder' || m.kind === 'taper') && m.length === undefined)
      return ['Barrel length not stated.'];
    if (m.kind === 'brush' && m.bristle === undefined)
      return ['Bristle-tip diameter not stated.'];
    if (m.kind === 'brush' && m.core === undefined)
      return ['Core diameter not stated.'];
    return [];
  }

  private get drawable(): readonly Measurement[] {
    return this.views
      .map((view) => view.measurement)
      .filter((m): m is Measurement => m !== undefined);
  }

  /** Shared viewBox width in millimetres for every drawing in this mode. */
  get viewWidth(): number {
    const extents = this.drawable.map(drawingExtent);
    if (extents.length === 0) return 0;
    return Math.max(...extents) * 1.1;
  }

  get printable(): boolean {
    return this.viewWidth <= PRINTABLE_WIDTH_MM;
  }

  get rulerHeight(): number {
    return this.viewWidth * 0.09;
  }

  get ticks(): readonly { x: number; major: boolean; label?: string }[] {
    const width = this.viewWidth;
    const ticks: { x: number; major: boolean; label?: string }[] = [];
    if (this.unit === 'mm') {
      const step = width > 120 ? 10 : width > 40 ? 5 : 1;
      const labelEvery = width > 120 ? 50 : 10;
      for (let mm = 0; mm <= width; mm += step) {
        const major = mm % labelEvery === 0;
        ticks.push({ x: mm, major, label: major ? String(mm) : undefined });
      }
    } else {
      const quarter = 25.4 / 4;
      for (let i = 0; i * quarter <= width; i++) {
        const major = i % 4 === 0;
        ticks.push({
          x: i * quarter,
          major,
          label: major ? `${i / 4}″` : undefined,
        });
      }
    }
    return ticks;
  }

  /** Geometry in millimetres, drawn at the shared scale. */
  drawing(view: CardView): Drawing | undefined {
    const m = view.measurement;
    if (!m) return undefined;
    const pad = this.viewWidth * 0.045;
    const plateHeight = this.viewWidth * 0.18;
    switch (m.kind) {
      case 'plate':
        return {
          height: plateHeight + pad * 2,
          shapes: [{ kind: 'rect', x: 0, y: pad, w: m.width, h: plateHeight }],
          description: `Heated plate ${formatLength(m.width, this.unit)} wide, drawn as a band of common height.`,
        };
      case 'cylinder':
        if (m.length !== undefined)
          return {
            height: m.diameter + pad * 2,
            shapes: [
              { kind: 'rect', x: 0, y: pad, w: m.length, h: m.diameter },
            ],
            description: `Straight barrel, top view: ${formatLength(m.diameter, this.unit)} diameter and ${formatLength(m.length, this.unit)} heated length.`,
          };
        return {
          height: m.diameter + pad * 2,
          shapes: [
            {
              kind: 'circle',
              cx: m.diameter / 2,
              cy: m.diameter / 2 + pad,
              r: m.diameter / 2,
              solid: true,
            },
          ],
          description: `Straight barrel end view: a ${formatLength(m.diameter, this.unit)} circle. Barrel length not stated.`,
        };
      case 'taper': {
        if (m.length !== undefined) {
          const top = pad;
          const mid = pad + m.wide / 2;
          return {
            height: m.wide + pad * 2,
            shapes: [
              {
                kind: 'poly',
                points: `0,${top} ${m.length},${mid - m.narrow / 2} ${m.length},${mid + m.narrow / 2} 0,${top + m.wide}`,
              },
            ],
            description: `Tapered barrel, top view: ${formatLength(m.wide, this.unit)} wide end to ${formatLength(m.narrow, this.unit)} narrow end over ${formatLength(m.length, this.unit)}.`,
          };
        }
        const cy = m.wide / 2 + pad;
        return {
          height: m.wide + pad * 2,
          shapes: [
            { kind: 'circle', cx: m.wide / 2, cy, r: m.wide / 2, solid: true },
            {
              kind: 'circle',
              cx: m.wide + taperGap(m) + m.narrow / 2,
              cy,
              r: m.narrow / 2,
              solid: true,
            },
          ],
          description: `Tapered barrel ends: a ${formatLength(m.wide, this.unit)} wide-end circle and a ${formatLength(m.narrow, this.unit)} narrow-end circle. Barrel length not stated.`,
        };
      }
      case 'brush': {
        const outer = Math.max(m.bristle ?? 0, m.core ?? 0);
        const c = outer / 2;
        const shapes: Shape[] = [];
        if (m.bristle !== undefined)
          shapes.push({
            kind: 'circle',
            cx: c,
            cy: c + pad,
            r: m.bristle / 2,
            dashed: true,
          });
        if (m.core !== undefined)
          shapes.push({
            kind: 'circle',
            cx: c,
            cy: c + pad,
            r: m.core / 2,
            solid: true,
          });
        const parts = [
          m.core !== undefined
            ? `solid core ${formatLength(m.core, this.unit)}`
            : 'core not stated',
          m.bristle !== undefined
            ? `dashed bristle edge ${formatLength(m.bristle, this.unit)}`
            : 'bristle-tip diameter not stated',
        ];
        return {
          height: outer + pad * 2,
          shapes,
          description: `Round brush end view: ${parts.join(', ')}.`,
        };
      }
    }
  }

  get summary(): readonly string[] {
    const [a, b] = this.views.map((view) => view.measurement);
    return a && b ? compareMeasurements(a, b, this.unit) : [];
  }

  get statusText(): string {
    const missing = this.views.filter((view) => !view.measurement);
    return missing.length
      ? `Choose or enter size ${missing.map((v) => v.slot.toUpperCase()).join(' and ')} to compare.`
      : '';
  }

  comparisonOutcome(preset: ComparisonPreset): string {
    const value = (side: ComparisonPreset['a']) =>
      presetById(side.preset)?.figures.find((f) => f.id === side.figure)?.value;
    const a = value(preset.a);
    const b = value(preset.b);
    return a && b ? compareMeasurements(a, b, 'mm')[0] : '';
  }

  setMode(mode: SizeMode): void {
    this.mode = mode;
  }

  setUnit(unit: SizeUnit): void {
    this.unit = unit;
    // Re-derive field text from the stored millimetres. Values themselves are
    // never re-parsed, so switching back and forth cannot drift.
    for (const mode of this.modes)
      for (const slot of ['a', 'b'] as const) {
        const card = this.state[mode][slot];
        for (const field of Object.keys(card.values) as FieldName[])
          if (!card.invalid.has(field))
            card.raw[field] = inputValue(card.values[field], unit);
      }
  }

  setSource(slot: Slot, source: CardState['source']): void {
    this.card(slot).source = source;
    this.trackCompleted();
  }

  setPreset(slot: Slot, event: Event): void {
    const card = this.card(slot);
    card.presetId = (event.target as HTMLSelectElement).value || undefined;
    card.figureId = card.presetId
      ? presetById(card.presetId)?.figures[0].id
      : undefined;
    this.trackCompleted();
  }

  setFigure(slot: Slot, event: Event): void {
    this.card(slot).figureId = (event.target as HTMLSelectElement).value;
  }

  setShape(slot: Slot, shape: ManualShape): void {
    this.card(slot).shape = shape;
  }

  /** Commits on change (blur or Enter), so partial typing is ignored. */
  /**
   * Commits a field once the reader pauses typing, so a half-typed value such
   * as “1 1/” is never drawn, but nobody has to leave the field or press Enter.
   */
  queueField(slot: Slot, field: FieldName, event: Event): void {
    const input = event.target as HTMLInputElement;
    const card = this.card(slot);
    const key = `${this.mode}-${slot}-${field}`;
    clearTimeout(this.commitTimers.get(key));
    this.commitTimers.set(
      key,
      setTimeout(() => {
        this.commitTimers.delete(key);
        this.commitField(card, field, input.value);
        this.changeDetector.markForCheck();
      }, FIELD_COMMIT_DELAY_MS),
    );
  }

  /** Commits immediately on blur or Enter. */
  setField(slot: Slot, field: FieldName, event: Event): void {
    clearTimeout(this.commitTimers.get(`${this.mode}-${slot}-${field}`));
    this.commitField(
      this.card(slot),
      field,
      (event.target as HTMLInputElement).value,
    );
  }

  private commitField(card: CardState, field: FieldName, raw: string): void {
    card.touched.add(field);
    card.raw[field] = raw;
    const parsed = parseLength(raw, this.unit);
    if (parsed === null) {
      delete card.values[field];
      card.invalid.delete(field);
    } else if (Number.isNaN(parsed)) {
      delete card.values[field];
      card.invalid.add(field);
    } else {
      card.values[field] = parsed;
      card.invalid.delete(field);
    }
    this.trackCompleted();
  }

  applyComparison(
    preset: ComparisonPreset,
    event?: Event,
    scroll = false,
  ): void {
    event?.preventDefault();
    this.loadComparison(preset);
    this.mode = preset.mode;
    this.presetMessage = '';
    this.analytics.track('size_visualiser_preset', { preset: preset.id });
    if (event || scroll)
      setTimeout(() =>
        document.getElementById('drawing-heading')?.scrollIntoView(),
      );
  }

  print(): void {
    this.analytics.track('size_visualiser_print', { mode: this.mode });
    window.print();
  }

  private loadComparison(preset: ComparisonPreset): void {
    for (const slot of ['a', 'b'] as const) {
      const card = this.state[preset.mode][slot];
      card.source = 'model';
      card.presetId = preset[slot].preset;
      card.figureId = preset[slot].figure;
    }
  }

  private trackCompleted(): void {
    if (this.completedTracked.has(this.mode) || this.summary.length === 0)
      return;
    this.completedTracked.add(this.mode);
    this.analytics.track('size_visualiser_comparison', { mode: this.mode });
  }
}
