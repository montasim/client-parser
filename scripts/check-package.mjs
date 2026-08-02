import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const esm = await import('client-parser');
const require = createRequire(import.meta.url);
const cjs = require('client-parser');

assert.equal(typeof esm.parseClient, 'function');
assert.equal(typeof esm.default, 'function');
assert.equal(typeof cjs.parseClient, 'function');
assert.equal(typeof cjs.default, 'function');
assert.equal(esm.parseClient('curl/8.8.0').browser.name, 'curl');
assert.equal(cjs.parseClient('curl/8.8.0').browser.name, 'curl');

console.info('ESM and CommonJS package entry points are valid.');
