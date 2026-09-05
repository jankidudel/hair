import { InjectionToken } from '@angular/core';

/** A UTC calendar date, injected so rendering tests can be deterministic. */
export const CURRENT_UTC_DATE = new InjectionToken<string>('CURRENT_UTC_DATE', {
  factory: () => new Date().toISOString().slice(0, 10),
});

export function isValidCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function isPublishedOn(
  enabled: boolean,
  publishDate: string,
  currentUtcDate: string,
): boolean {
  return (
    enabled && isValidCalendarDate(publishDate) && publishDate <= currentUtcDate
  );
}
