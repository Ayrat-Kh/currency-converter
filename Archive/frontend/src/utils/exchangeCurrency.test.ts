import { describe, expect, it } from 'vitest';

import { exchangeCurrency } from './exchangeCurrency';

const testRates = {
  base: 'EUR',
  rates: {
    AED: 4.000807,
    USD: 1.089277,
  },
};

describe('exchangeCurrency', () => {
  it('should convert currency from usd to aed', () => {
    expect(
      exchangeCurrency({
        fromCurrency: 'USD',
        toCurrency: 'AED',
        rates: testRates,
        fromValue: 2,
      }),
    ).toBeCloseTo(7.35);
  });

  it('should convert currency from  aed to usd', () => {
    expect(
      exchangeCurrency({
        fromCurrency: 'AED',
        toCurrency: 'USD',
        rates: testRates,
        fromValue: 7.35,
      }),
    ).toBeCloseTo(2);
  });
});
