import { describe, expect, it } from 'vitest';

import { getNormalizedNumber } from './getNormalizedNumber';

describe('getNormalizedNumber', () => {
  it('should convert successfully', () => {
    expect(
      getNormalizedNumber(43.4234, { maximumFractionDigits: 2 }),
    ).toBeCloseTo(43.42);
  });

  it('should convert successfully', () => {
    expect(
      getNormalizedNumber(43.4274, { maximumFractionDigits: 2 }),
    ).toBeCloseTo(43.43);
  });
});
