## 2026-11-15 · declined · converting amounts-integer-cents to a check
- **Source:** the prose-to-checks sweep, work item #78.
- **Reason:** re-derived against today's `src/`: still not a working rule a check can carry.
  Rounding in the customer's favour and integer-cent amounts are the library's contract (the README
  states it), so they belong in its tests; and a scan for non-integer money still has to judge which
  numbers are money - a decimal-literal ban fires on the half-up `0.5` in `discount`.
- **Actor:** the Claudinite task `claudinite/prose-to-checks-sweep`, unattended.
