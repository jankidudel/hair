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
