import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { removedDuplicateRoutes } from './removed-duplicate-routes.ts';

const run = promisify(execFile);
const [buildDirectory, bucketUri, mode] = process.argv.slice(2);
if (!buildDirectory || !/^s3:\/\/[a-z0-9.-]+$/.test(bucketUri ?? '')) {
  throw new Error(
    'Usage: node --import tsx scripts/cleanup-retired-route-documents.ts <build-directory> s3://<bucket> [--execute]',
  );
}
if (mode && mode !== '--execute') throw new Error(`Unknown option: ${mode}`);

const bucket = bucketUri.slice('s3://'.length);
const output = resolve(buildDirectory);
const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8');
const keys = removedDuplicateRoutes.map((route) => {
  if (!/^\/(guides|products)\/[a-z0-9-]+$/.test(route))
    throw new Error(`Unsafe retired route: ${route}`);
  if (sitemap.includes(`<loc>https://www.combreport.com${route}</loc>`))
    throw new Error(`Still in the generated sitemap: ${route}`);
  return `${route.slice(1)}/index.html`;
});

for (const key of keys) {
  try {
    await access(resolve(output, key));
    throw new Error(`Still in the generated build: ${key}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
}

for (const key of keys) {
  if (mode === '--execute') {
    await run('aws', [
      's3api',
      'delete-object',
      '--bucket',
      bucket,
      '--key',
      key,
    ]);
    console.log(`Deleted s3://${bucket}/${key}`);
  } else {
    console.log(`Would delete s3://${bucket}/${key}`);
  }
}
