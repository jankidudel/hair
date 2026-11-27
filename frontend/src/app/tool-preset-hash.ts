import { DestroyRef, afterNextRender, inject } from '@angular/core';

/**
 * Tool presets travel in the URL fragment, for example
 * `/hair-tool-size-visualiser#compare-ghd-conical-vs-max`. Every preset
 * fragment is also the id of a static worked example on the page, so the
 * canonical URL never changes and the link still lands on useful text without
 * JavaScript. Only fragments that start with `prefix` are treated as presets;
 * other anchors on the page are ignored.
 *
 * Call from a component constructor. `apply` returns false for an unknown id.
 */
export function watchPresetHash(
  prefix: string,
  apply: (id: string) => boolean,
  onInvalid: () => void,
): void {
  const destroyRef = inject(DestroyRef);
  afterNextRender(() => {
    const read = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash.startsWith(prefix)) return;
      if (!apply(hash.slice(prefix.length))) onInvalid();
    };
    read();
    window.addEventListener('hashchange', read);
    destroyRef.onDestroy(() => window.removeEventListener('hashchange', read));
  });
}
