import { articleGroups } from './article-registry';

export interface GuideCardCopy {
  readonly title?: string;
  readonly description?: string;
}

const categoryLabels = new Set<string>(
  Object.values(articleGroups).map((group) => group.label.toLowerCase()),
);

/**
 * True when a card override cannot be shown as reader-facing copy: an empty
 * value, a raw route or code-formatted path, a serialised object or a value
 * that is only a category label. Callers then fall back to the article's
 * canonical heading or description.
 */
export function isUnresolvedCardText(value: string | undefined): boolean {
  if (value === undefined) return true;
  const text = value.trim();
  if (!text) return true;
  if (/^[`'"]?\/(?:guides|products|tools)?\b/.test(text)) return true;
  if (/^`.*`$/.test(text)) return true;
  if (/^(?:undefined|null|\[object [A-Za-z]+\])$/i.test(text)) return true;
  return categoryLabels.has(text.toLowerCase());
}

/** Drops unusable card overrides so every listing uses one fallback rule. */
export function resolveGuideCardCopy(
  ...records: readonly Readonly<Partial<Record<string, GuideCardCopy>>>[]
): Readonly<Record<string, GuideCardCopy>> {
  const merged: Record<string, GuideCardCopy> = {};
  for (const record of records) {
    for (const [slug, copy] of Object.entries(record)) {
      if (!copy) continue;
      const title = isUnresolvedCardText(copy.title) ? undefined : copy.title;
      const description = isUnresolvedCardText(copy.description)
        ? undefined
        : copy.description;
      if (title === undefined && description === undefined) {
        delete merged[slug];
        continue;
      }
      merged[slug] = {
        ...(title === undefined ? {} : { title }),
        ...(description === undefined ? {} : { description }),
      };
    }
  }
  return merged;
}
