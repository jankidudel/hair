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

test('pull requests call the same frontend validation workflow', async () => {
  const source = await workflow('verify.yml');
  assert.match(
    source,
    /validate:\s*\n\s+uses: \.\/\.github\/workflows\/frontend-validation\.yml/,
  );
  assert.ok(root);
});

test('frontend deployment preserves prior hashed assets and revalidates entries', async () => {
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
  assert.match(deployScript, /Upload new content-addressed assets before/);
  assert.match(deployScript, /Route documents are deliberately last/);
  assert.match(deployScript, /invalidation-completed/);
  assert.doesNotMatch(deployScript, /'\/\*'/);

  for (const name of ['deploy-content.yml', 'deploy-all.yml']) {
    const source = await workflow(name);
    assert.match(source, /deploy-frontend-assets\.sh/);
    assert.doesNotMatch(source, /cleanup-stale-frontend-assets/);
  }
});
