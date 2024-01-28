import { describe, expect, it } from 'vitest';

import { getNormalizedNumberFromString } from './getNormalizedNumberFromString';

describe('getNormalizedNumberFromString', () => {
  it('should convert successfully', () => {
    expect(
      getNormalizedNumberFromString('43.4234', { maximumFractionDigits: 2 }),
    ).toEqual({
      normalizedValue: '43.42',
      number: 43.42,
    });
  });

  it('should convert successfully and ignore letter and symbols', () => {
    expect(
      getNormalizedNumberFromString('43,42,423423', {
        maximumFractionDigits: 2,
      }),
    ).toEqual({
      normalizedValue: '43,42',
      number: 43.42,
    });
  });
});
