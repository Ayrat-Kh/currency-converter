import { describe, expect, it } from 'vitest';

import { exchangeCurrency } from './exchangeCurrency';

const testRates = {
  base: 'EUR',
  rates: {
    AED: 4.000807,
    USD: 1.089277,
    RUB: 95,
    THB: 38.923689,
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

  it('should convert currency from eur to rub', () => {
    expect(
      exchangeCurrency({
        fromCurrency: 'EUR',
        toCurrency: 'RUB',
        rates: testRates,
        fromValue: 1,
      }),
    ).toBeCloseTo(95);
  });

  it('should convert currency from usd to thai', () => {
    expect(
      exchangeCurrency({
        fromCurrency: 'USD',
        toCurrency: 'THB',
        rates: testRates,
        fromValue: 1,
      }),
    ).toBeCloseTo(35.73);
  });
});
