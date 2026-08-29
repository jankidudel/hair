import test from 'node:test';
import assert from 'node:assert/strict';
import { handler } from '../src/health.js';
test('returns an OK health response', async () => {
  const response = await handler({} as never, {} as never, () => undefined);
  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { status: 'ok' });
});
