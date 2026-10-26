import assert from 'node:assert/strict';
import { test } from 'node:test';
import { discount, invoice, lineTotal, subtotal } from '../src/invoice.js';

test('a line is its unit price times its quantity', () => {
  assert.equal(lineTotal({ unitCents: 250, quantity: 4 }), 1000);
});

test('a line refuses a fractional price or a zero quantity', () => {
  assert.throws(() => lineTotal({ unitCents: 2.5, quantity: 1 }), RangeError);
  assert.throws(() => lineTotal({ unitCents: 100, quantity: 0 }), RangeError);
});

test('the subtotal sums the lines', () => {
  assert.equal(subtotal([{ unitCents: 100, quantity: 2 }, { unitCents: 50, quantity: 1 }]), 250);
  assert.equal(subtotal([]), 0);
});

test('a discount rounds half a cent in the customer\'s favour', () => {
  assert.equal(discount(1005, 10), 101);
  assert.equal(discount(1000, 0), 0);
  assert.throws(() => discount(1000, 101), RangeError);
});

test('an invoice applies the discount before the tax', () => {
  assert.deepEqual(invoice([{ unitCents: 1000, quantity: 3 }], { discountPercent: 10, taxPercent: 17 }), {
    subtotal: 3000,
    discount: 300,
    tax: 459,
    total: 3159,
  });
});
