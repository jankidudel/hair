import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clean-inspect-stop',
  styleUrl: 'clean-inspect-stop.component.css',
  template: `
    <section
      [class]="
        className ? 'clean-inspect-stop ' + className : 'clean-inspect-stop'
      "
      aria-labelledby="clean-inspect-stop-heading"
    >
      @if (headingLevel === 'h3') {
        <h3 id="clean-inspect-stop-heading">Clean, inspect, or stop?</h3>
      } @else {
        <h2 id="clean-inspect-stop-heading">Clean, inspect, or stop?</h2>
      }
      <p>
        Cleaning helps with ordinary surface residue. It does not repair a
        damaged heated surface, loose part or electrical fault.
      </p>
      <div
        class="table-shell"
        tabindex="0"
        aria-label="Cleaning and stop-use guidance"
      >
        <table>
          <thead>
            <tr>
              <th scope="col">What you can see</th>
              <th scope="col">What to do</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loose hair, lint or ordinary surface residue</td>
              <td>
                Unplug the tool, let it cool completely and follow the exact
                cleaning method in its manual.
              </td>
            </tr>
            <tr>
              <td>
                A rough edge, peeling surface, crack, loose clamp or unstable
                part
              </td>
              <td>
                Stop using the tool. Check the warranty or contact the
                manufacturer for model-specific advice.
              </td>
            </tr>
            <tr>
              <td>
                A damaged cord or plug, exposed wiring, smoke, sparking or an
                unusual electrical smell
              </td>
              <td>
                Unplug the tool if it is safe to do so and stop using it. Do not
                attempt an internal repair.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="closing-note">
        If you cannot identify the residue or the manual does not permit a
        cleaning method, do not improvise with solvents or abrasive tools.
      </p>
    </section>
  `,
})
export class CleanInspectStopComponent {
  @Input() headingLevel: 'h2' | 'h3' = 'h2';
  @Input() className?: string;
}
