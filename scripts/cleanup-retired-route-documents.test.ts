import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';

const run = promisify(execFile);
const script = new URL('./cleanup-retired-route-documents.ts', import.meta.url)
  .pathname;

async function preview(buildDirectory: string) {
  return run(process.execPath, [
    '--import',
    'tsx',
    script,
    buildDirectory,
    's3://review-only-placeholder',
  ]);
}

test('retired route cleanup previews only exact missing documents', async () => {
  const build = await mkdtemp(join(tmpdir(), 'hair-retired-'));
  await writeFile(join(build, 'sitemap.xml'), '<urlset></urlset>');
  const { stdout } = await preview(build);
  const keys = stdout.trim().split('\n');
  assert.equal(keys.length, 6);
  assert.ok(keys.every((key) => key.startsWith('Would delete s3://')));
  assert.ok(keys.every((key) => key.endsWith('/index.html')));
});

test('retired route cleanup refuses a document still present in the build', async () => {
  const build = await mkdtemp(join(tmpdir(), 'hair-retired-'));
  await writeFile(join(build, 'sitemap.xml'), '<urlset></urlset>');
  const route = join(build, 'guides', 'best-hair-brush-for-curly-hair');
  await mkdir(route, { recursive: true });
  await writeFile(join(route, 'index.html'), '<html></html>');
  await assert.rejects(preview(build), /Still in the generated build/);
});
