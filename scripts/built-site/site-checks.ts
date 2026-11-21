import { cleanText, type BuiltPage } from './pages.ts';

/**
 * Structured-data types this site must never emit: it publishes no first-party
 * product reviews or ratings, and it is not a health site (see AGENTS.md).
 */
export const unsupportedSchemaTypes: ReadonlySet<string> = new Set([
  'Product',
  'Offer',
  'Review',
  'AggregateRating',
  'MedicalWebPage',
  'MedicalCondition',
  'MedicalEntity',
  'MedicalTherapy',
  'Drug',
  'DietarySupplement',
]);

/** Text that only appears when a template or data binding failed to render. */
const placeholderPatterns: readonly RegExp[] = [
  /lorem ipsum/i,
  /\[object Object\]/,
  /\{\{[^}]*\}\}/,
];
const unboundValues = new Set(['undefined', 'null', 'NaN']);
const urlAttributes = ['href', 'src', 'content'] as const;

function schemaTypes(value: unknown, found = new Set<string>()): Set<string> {
  if (Array.isArray(value)) value.forEach((item) => schemaTypes(item, found));
  else if (value && typeof value === 'object') {
    const type = (value as Record<string, unknown>)['@type'];
    for (const item of Array.isArray(type) ? type : [type])
      if (typeof item === 'string') found.add(item);
    Object.values(value).forEach((child) => schemaTypes(child, found));
  }
  return found;
}

export function pageErrors({ path, document }: BuiltPage): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const element of document.querySelectorAll('[id]')) {
    const id = element.id;
    if (!id.trim() || unboundValues.has(id))
      errors.push(
        `${path}: invalid DOM id ${JSON.stringify(id)} on <${element.localName}>.`,
      );
    else if (ids.has(id)) errors.push(`${path}: duplicate DOM id "${id}".`);
    ids.add(id);
  }

  const main = document.querySelector('main');
  if (!main) errors.push(`${path}: missing <main>.`);
  else {
    const text = main.textContent ?? '';
    for (const pattern of placeholderPatterns) {
      const match = pattern.exec(text);
      if (match)
        errors.push(`${path}: unrendered placeholder text "${match[0]}".`);
    }
    for (const element of main.querySelectorAll('*')) {
      const ownText = cleanText(
        [...element.childNodes]
          .filter((node) => node.nodeType === node.TEXT_NODE)
          .map((node) => node.textContent)
          .join(' '),
      );
      if (unboundValues.has(ownText))
        errors.push(
          `${path}: unbound value "${ownText}" rendered in <${element.localName}>.`,
        );
    }
    for (const table of main.querySelectorAll('table'))
      if (!table.querySelector('thead th, tr:first-child th'))
        errors.push(`${path}: table without column headers.`);
  }
  for (const attribute of urlAttributes)
    for (const element of document.querySelectorAll(`[${attribute}]`)) {
      const value = element.getAttribute(attribute) ?? '';
      if (/\bundefined\b|\[object Object\]|\{\{/.test(value))
        errors.push(
          `${path}: unbound ${attribute}="${value}" on <${element.localName}>.`,
        );
    }

  for (const script of document.querySelectorAll(
    'script[type="application/ld+json"]',
  )) {
    let data: unknown;
    try {
      data = JSON.parse(script.textContent ?? '');
    } catch {
      errors.push(`${path}: invalid JSON-LD.`);
      continue;
    }
    for (const type of schemaTypes(data))
      if (unsupportedSchemaTypes.has(type))
        errors.push(`${path}: unsupported structured-data type ${type}.`);
  }
  return errors;
}

/** Titles, descriptions and canonicals must each identify exactly one page. */
export function duplicateMetadataErrors(pages: readonly BuiltPage[]): string[] {
  const fields = {
    title: (doc: Document) => cleanText(doc.title),
    description: (doc: Document) =>
      cleanText(
        doc.querySelector('meta[name="description"]')?.getAttribute('content'),
      ),
    canonical: (doc: Document) =>
      doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
  };
  const errors: string[] = [];
  for (const [field, read] of Object.entries(fields)) {
    const owners = new Map<string, string[]>();
    for (const page of pages) {
      const value = read(page.document);
      if (!value) {
        errors.push(`${page.path}: missing ${field}.`);
        continue;
      }
      owners.set(value, [...(owners.get(value) ?? []), page.path]);
    }
    for (const [value, paths] of owners)
      if (paths.length > 1)
        errors.push(
          `Duplicate ${field} "${value}" on ${paths.length} pages: ${paths.join(', ')}.`,
        );
  }
  return errors;
}

export function notFoundErrors(document: Document): string[] {
  const errors: string[] = [];
  const robots = document
    .querySelector('meta[name="robots"]')
    ?.getAttribute('content');
  if (!robots?.includes('noindex'))
    errors.push('/404: not-found document must be noindex.');
  if (document.querySelector('link[rel="canonical"]'))
    errors.push('/404: not-found document must not declare a canonical URL.');
  return errors;
}
