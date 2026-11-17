import assert from 'node:assert/strict';
import test from 'node:test';
import { cosmeticNamesForSafetyScan } from './content-safety.ts';

test('reviewed cosmetic product names do not exempt surrounding claims', () => {
  const text = cosmeticNamesForSafetyScan(
    'Moroccanoil Treatment Light is a cosmetic oil. Treatment for disease remains prohibited.',
  );
  assert.ok(text.includes('Moroccanoil styling oil Light'));
  assert.ok(text.includes('Treatment for disease'));
  assert.equal(
    cosmeticNamesForSafetyScan('Other treatment'),
    'Other treatment',
  );
});

test('only the exact reviewed cosmetic catalogue paths are recognised', () => {
  assert.equal(
    cosmeticNamesForSafetyScan(
      'https://uk.colorwowhair.com/products/dream-coat-anti-frizz-treatment',
    ),
    'https://uk.colorwowhair.com/reviewed-dream-coat',
  );
  assert.equal(
    cosmeticNamesForSafetyScan('https://example.com/products/treatment'),
    'https://example.com/products/treatment',
  );
});
