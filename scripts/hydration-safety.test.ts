import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const appDirectory = new URL('../frontend/src/app/', import.meta.url);

test('the browser app hydrates prerendered pages instead of re-rendering them', async () => {
  const config = await readFile(new URL('app.config.ts', appDirectory), 'utf8');
  assert.match(config, /provideClientHydration\(withEventReplay\(\)\)/);
});

test('templates never hydrate element children inside <noscript>', async () => {
  // With scripting enabled, browsers parse <noscript> content as text, so an
  // element child in an Angular template cannot be matched during hydration.
  // Bind such fallbacks with [innerHTML] instead.
  const files = (await readdir(appDirectory, { recursive: true })).filter(
    (name) =>
      /\.(ts|html)$/.test(name) &&
      !name.endsWith('.spec.ts') &&
      !name.includes('.generated'),
  );
  const offenders: string[] = [];
  for (const name of files) {
    const source = await readFile(new URL(name, appDirectory), 'utf8');
    for (const match of source.matchAll(
      /<noscript\b[^>]*>([\s\S]*?)<\/noscript\s*>/g,
    ))
      if (/<[a-z]/i.test(match[1])) offenders.push(name);
  }
  assert.deepEqual(offenders, []);
});
