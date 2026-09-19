import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function workflow(name: string): Promise<string> {
  return readFile(
    new URL(`../.github/workflows/${name}`, import.meta.url),
    'utf8',
  );
}

test('frontend deployments require reusable validation', async () => {
  for (const name of ['deploy-content.yml', 'deploy-all.yml']) {
    const source = await workflow(name);
    assert.match(
      source,
      /validate:\s*\n\s+uses: \.\/\.github\/workflows\/frontend-validation\.yml/,
    );
    assert.match(source, /deploy:\s*\n\s+needs: \[validate\]/);
  }
});

test('pull requests validate without running on main pushes', async () => {
  const source = await workflow('verify.yml');
  assert.match(source, /pull_request:/);
  assert.doesNotMatch(source, /\n\s+push:/);
  assert.match(
    source,
    /validate:\s*\n\s+uses: \.\/\.github\/workflows\/frontend-validation\.yml/,
  );
  assert.ok(root);
});

test('only manual workflows can deploy', async () => {
  for (const name of ['deploy-content.yml', 'deploy-all.yml']) {
    const source = await workflow(name);
    assert.match(source, /on:\s*\n\s+workflow_dispatch:/);
    assert.doesNotMatch(source, /\n\s+push:/);
  }
});

test('CI builds the production artifact exactly once while deployments validate without building', async () => {
  const validation = await workflow('frontend-validation.yml');
  assert.match(validation, /npm run validate:prebuild/);
  assert.match(validation, /npm run build --workspace=frontend/);
  assert.match(validation, /inputs\.build-production-artifact/);
  assert.doesNotMatch(validation, /npm run check:seo/);

  for (const name of ['deploy-content.yml', 'deploy-all.yml']) {
    const source = await workflow(name);
    assert.match(source, /build-production-artifact: false/);
    assert.doesNotMatch(source, /check-generated-seo: false/);
  }
});

test('the all-in-one deployment builds the API package once before diffing and deploying', async () => {
  const source = await workflow('deploy-all.yml');
  const apiBuild = 'npm run build --workspace=@hair/api';
  assert.equal(source.split(apiBuild).length - 1, 1);
  assert.match(source, /npx cdk diff "Hair-\$STAGE"/);
  assert.doesNotMatch(source, /npm run infra:diff/);
  assert.doesNotMatch(source, /npm run synth/);
});

test('frontend deployment preserves prior hashed assets without CloudFront invalidation', async () => {
  const deployScript = await readFile(
    new URL('../.github/scripts/deploy-frontend-assets.sh', import.meta.url),
    'utf8',
  );
  const executableLines = deployScript
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('#'))
    .join('\n');
  assert.doesNotMatch(executableLines, /--delete|delete-object/);
  assert.match(deployScript, /max-age=31536000, immutable/);
  assert.match(deployScript, /no-cache, max-age=0, must-revalidate/);
  assert.match(deployScript, /is_hashed_asset/);
  assert.match(deployScript, /\(js\|css\|woff2\?\|ttf\|otf/);
  assert.match(deployScript, /Upload new content-addressed assets before/);
  assert.match(deployScript, /Route documents are deliberately last/);
  assert.doesNotMatch(deployScript, /cloudfront create-invalidation/);
  assert.match(deployScript, /content-addressed by the build/);

  for (const name of ['deploy-content.yml', 'deploy-all.yml']) {
    const source = await workflow(name);
    assert.match(source, /deploy-frontend-assets\.sh/);
    assert.doesNotMatch(source, /cleanup-stale-frontend-assets/);
  }
});

test('deployment builds fingerprint static entry assets', async () => {
  const frontendPackage = JSON.parse(
    await readFile(
      new URL('../frontend/package.json', import.meta.url),
      'utf8',
    ),
  ) as { scripts: Record<string, string> };

  assert.match(frontendPackage.scripts.build, /assets:fingerprint/);
  assert.match(
    frontendPackage.scripts['build:deployment-development'],
    /assets:fingerprint/,
  );
  const fingerprintScript = await readFile(
    new URL(
      '../frontend/scripts/fingerprint-static-assets.ts',
      import.meta.url,
    ),
    'utf8',
  );
  assert.match(fingerprintScript, /main\.js/);
  assert.match(fingerprintScript, /styles\.css/);
  assert.match(fingerprintScript, /createHash\('sha256'\)/);
});
