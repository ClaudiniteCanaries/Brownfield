// Amounts are integer cents throughout, so no total is ever off by a
// rounding of a fraction of a cent.

export function lineTotal({ unitCents, quantity }) {
  if (!Number.isInteger(unitCents) || unitCents < 0) {
    throw new RangeError(`unitCents must be a non-negative integer, not ${unitCents}`);
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError(`quantity must be a positive integer, not ${quantity}`);
  }
  return unitCents * quantity;
}

export function subtotal(lines) {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0);
}

// A percentage discount rounds half up, in the customer's favour.
export function discount(cents, percent) {
  if (percent < 0 || percent > 100) {
    throw new RangeError(`percent must be between 0 and 100, not ${percent}`);
  }
  return Math.floor((cents * percent) / 100 + 0.5);
}

export function invoice(lines, { discountPercent = 0, taxPercent = 0 } = {}) {
  const sub = subtotal(lines);
  const off = discount(sub, discountPercent);
  const taxable = sub - off;
  const tax = Math.round((taxable * taxPercent) / 100);
  return { subtotal: sub, discount: off, tax, total: taxable + tax };
}
