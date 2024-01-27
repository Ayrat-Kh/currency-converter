import { describe, expect, it } from 'vitest';

import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('should convert successfully', () => {
    expect(formatNumber(43.4234, { maximumFractionDigits: 2 })).toBeCloseTo(
      43.42,
    );
  });

  it('should convert successfully', () => {
    expect(formatNumber(43.4274, { maximumFractionDigits: 2 })).toBeCloseTo(
      43.43,
    );
  });
});
