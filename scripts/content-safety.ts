/** Reviewed cosmetic names and their canonical manufacturer catalogue paths. */
export function cosmeticNamesForSafetyScan(text: string): string {
  return text
    .replace(/\bMoroccanoil Treatment\b/g, 'Moroccanoil styling oil')
    .replace(
      /https:\/\/uk\.moroccanoil\.com\/products\/moroccanoil-treatment-(?:original|light)(?=["'\s<]|$)/g,
      'https://uk.moroccanoil.com/reviewed-styling-oil',
    )
    .replace(
      /https:\/\/uk\.colorwowhair\.com\/products\/dream-coat-anti-frizz-treatment(?=["'\s<]|$)/g,
      'https://uk.colorwowhair.com/reviewed-dream-coat',
    );
}
