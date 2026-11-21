import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const deployScript = readFileSync(
  new URL('../.github/scripts/deploy-frontend-assets.sh', import.meta.url),
  'utf8',
);
const classifier = deployScript.match(/^is_hashed_asset\(\) \{[\s\S]*?^\}$/m);

function isImmutable(relativePath: string): boolean {
  assert.ok(classifier, 'deploy script must define is_hashed_asset()');
  const exitCode = execFileSync(
    'bash',
    [
      '-c',
      `${classifier[0]}\nis_hashed_asset "$1" && echo 0 || echo 1`,
      '_',
      relativePath,
    ],
    { encoding: 'utf8' },
  ).trim();
  return exitCode === '0';
}

test('build-emitted content-addressed assets are uploaded as immutable', () => {
  for (const path of [
    'chunk-GBZOLAAJ.js',
    'main.465e072c135489d6.js',
    'main-AB12CD34.js',
    'polyfills-AB12CD34.js',
    'styles.0123456789abcdef.css',
    'styles-AB12CD34.css',
    'worker-AB12CD34.js',
    'media/font-AB12CD34.woff2',
  ])
    assert.equal(isImmutable(path), true, path);
});

test('hand-named public files keep revalidating cache headers', () => {
  // These names change content without changing URL, so a year-long immutable
  // header would leave visitors on stale diagrams and icons.
  for (const path of [
    'diagrams/barrel-geometry.svg',
    'diagrams/curling-iron-diameter-and-length-evidence.svg',
    'android-chrome-512x512.png',
    'apple-touch-icon.png',
    'favicon-192.png',
    'favicon.ico',
    'favicon.svg',
    'robots.txt',
    'sitemap.xml',
    'index.html',
    'guides/how-to-choose-hair-dryer/index.html',
    'main.js',
    'styles.css',
    'mainstream-guide.js',
  ])
    assert.equal(isImmutable(path), false, path);
});
