import { describe, expect, it } from 'vitest';

import { getNormalizedNumberFromString } from './getNormalizedNumberFromString';

describe('getNormalizedNumberFromString', () => {
  it('should convert successfully', () => {
    expect(
      getNormalizedNumberFromString('43.4234', { maximumFractionDigits: 2 }),
    ).toBeCloseTo(43.42);
  });
});
