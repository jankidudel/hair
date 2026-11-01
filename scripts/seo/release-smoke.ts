import { everydayMethodSlugs } from '../../frontend/src/app/everyday-method-guides.ts';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { articles } from '../../frontend/src/app/content.generated.ts';
import { carePackingSlugs } from '../../frontend/src/app/care-packing-guides.ts';
import { finishingMethodSlugs } from '../../frontend/src/app/finishing-method-guides.ts';
import { currentModelSlugs } from '../../frontend/src/app/current-model-comparison-guides.ts';
import { guideEvidence } from '../../frontend/src/app/guide-evidence.ts';
import { guideLinkMap } from '../../frontend/src/app/guide-link-map.ts';
import { parseSitemap } from './route-coverage.ts';
import { releaseArticleErrors } from './release-article-validation.ts';

// Read-only, explicit post-release command. No deployment or invalidation.
const artifactOnly = process.argv.includes('--artifact-only');
const option = (name: string, fallback: string) =>
  process.argv
    .find((value) => value.startsWith(`--${name}=`))
    ?.slice(name.length + 3) ?? fallback;
const artifact = resolve(
  option('artifact', 'frontend/dist/hair-frontend/browser'),
);
const output = resolve(
  option('output', 'reports/seo-route-audit/release-smoke.json'),
);
const origin = 'https://www.combreport.com';
const failures: string[] = [];
const observations: { stage: string; path: string; errors: string[] }[] = [];
const intended = [
  ...new Set([
    ...carePackingSlugs,
    ...finishingMethodSlugs,
    ...currentModelSlugs,
    ...everydayMethodSlugs,
  ]),
].flatMap((slug) => {
  const article = articles.find((value) => value.slug === slug);
  if (!article)
    failures.push(
      `Expected release owner '${slug}' is not published in the generated content.`,
    );
  return article ? [article] : [];
});
const hash = createHash('sha256');
const expectedFor = (article: (typeof articles)[number]) => ({
  article,
  evidence: guideEvidence[article.slug],
  relatedPaths: guideLinkMap[article.slug].relatedSlugs.map(
    (slug) => `/guides/${slug}`,
  ),
});
function record(stage: string, path: string, errors: string[]) {
  observations.push({ stage, path, errors });
  failures.push(...errors.map((error) => `${stage} ${path}: ${error}`));
}
try {
  const sitemap = await readFile(resolve(artifact, 'sitemap.xml'), 'utf8');
  hash.update(sitemap);
  const entries = parseSitemap(sitemap).entries;
  for (const article of intended) {
    const path = `/guides/${article.slug}`;
    try {
      const text = await readFile(
        resolve(artifact, 'guides', article.slug, 'index.html'),
        'utf8',
      );
      hash.update(path).update(text);
      record(
        'artifact',
        path,
        releaseArticleErrors(
          { status: 200, contentType: 'text/html', text },
          expectedFor(article),
          entries,
        ),
      );
    } catch (error) {
      record('artifact', path, [String(error)]);
    }
  }
} catch (error) {
  record('artifact', '/sitemap.xml', [String(error)]);
}
if (!artifactOnly && failures.length === 0) {
  const request = async (path: string) => {
    const response = await fetch(origin + path, {
      redirect: 'manual',
      signal: AbortSignal.timeout(15000),
      headers: {
        accept: 'text/html,application/xml',
        'cache-control': 'no-cache',
      },
    });
    let bytes = Buffer.from(await response.arrayBuffer());
    if (bytes[0] === 0x1f && bytes[1] === 0x8b) bytes = gunzipSync(bytes);
    return {
      status: response.status,
      contentType: response.headers.get('content-type') ?? '',
      text: bytes.toString('utf8'),
    };
  };
  try {
    const sitemap = await request('/sitemap.xml');
    if (sitemap.status !== 200) throw Error(`Sitemap HTTP ${sitemap.status}`);
    const entries = parseSitemap(sitemap.text).entries;
    // Bounded release owners from the maintained batches, plus the sitemap.
    for (const article of intended) {
      const path = `/guides/${article.slug}`;
      try {
        record(
          'production',
          path,
          releaseArticleErrors(
            await request(path),
            expectedFor(article),
            entries,
          ),
        );
      } catch (error) {
        record('production', path, [String(error)]);
      }
    }
  } catch (error) {
    record('production', '/sitemap.xml', [String(error)]);
  }
}
const report = {
  checkedAt: new Date().toISOString(),
  origin,
  artifact,
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], {
    encoding: 'utf8',
  }).trim(),
  sourceTreeDirty: !!execFileSync('git', ['status', '--porcelain'], {
    encoding: 'utf8',
  }).trim(),
  artifactSha256: hash.digest('hex'),
  artifactScope: 'sitemap.xml and the intended rendered article documents',
  releaseRun: {
    id: process.env.GITHUB_RUN_ID ?? null,
    attempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
  },
  mode: artifactOnly ? 'artifact-only' : 'artifact-and-production',
  expectedOwners: intended.map((article) => article.slug),
  observations,
  failures,
  verified: failures.length === 0,
};
await mkdir(resolve(output, '..'), { recursive: true });
await writeFile(output, JSON.stringify(report, null, 2) + '\n');
console.log(
  JSON.stringify(
    {
      verified: report.verified,
      mode: report.mode,
      checked: observations.length,
      report: output,
      failures,
    },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;
