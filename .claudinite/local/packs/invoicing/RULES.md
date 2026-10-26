# invoicing

- **Adding an amount anywhere in the library** — keep it integer cents, and round only where a
  percentage is applied, in the customer's favour; a float total drifts by a cent across a long
  invoice. (amounts-integer-cents)
