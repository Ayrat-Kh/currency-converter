import { type GetCurrencyRatesResponse } from '@/api';

import { getNormalizedNumber } from './getNormalizedNumber';

// for now, assuming we always have currency on the list
export type ExchangeCurrencyParams = {
  fromValue: number;
  fromCurrency: string;
  toCurrency: string;
  rates: GetCurrencyRatesResponse;
  maximumFractionDigits?: number;
};

// 1 EUR = 4.000807 AED
// 1 EUR = 1.089277 USD
// if converting from USD to AED => 4.000807 * 79.851063
export const exchangeCurrency = ({
  fromCurrency,
  toCurrency,
  rates,
  fromValue,
  maximumFractionDigits = 2,
}: ExchangeCurrencyParams): number => {
  let fromRate = 1;
  if (fromCurrency !== rates.base) {
    fromRate = rates.rates[fromCurrency];
  }

  let toRate = 1;
  if (toCurrency !== rates.base) {
    toRate = rates.rates[toCurrency];
  }

  return getNormalizedNumber((fromValue * toRate) / fromRate, {
    maximumFractionDigits,
  });
};
