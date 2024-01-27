import { useState } from 'react';

import { useGetCurrencyRates } from '@/api';
import { exchangeCurrency } from '@/utils';

type CurrencyState = {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
};

type CurrencyStateHandlers = {
  handleFromAmountChange: (value: number) => void;
  handleToAmountChange: (value: number) => void;
  handleFromCurrencyChange: (currency: string) => void;
  handleToCurrencyChange: (currency: string) => void;
};

const defaultCurrencyState: CurrencyState = {
  fromAmount: 0,
  fromCurrency: '',
  toAmount: 0,
  toCurrency: '',
};

export const useCurrencyState = (): [CurrencyState, CurrencyStateHandlers] => {
  const { data: rates, isSuccess } = useGetCurrencyRates();

  const [currencyState, setCurrencyState] =
    useState<CurrencyState>(defaultCurrencyState);

  const handleFromAmountChange = (value: number) => {
    if (!isSuccess) {
      return;
    }

    const exchangedValue = exchangeCurrency({
      fromValue: value,
      fromCurrency: currencyState.fromCurrency,
      toCurrency: currencyState.toCurrency,
      rates,
    });

    setCurrencyState((prev) => ({
      ...prev,
      fromAmount: value,
      toAmount: exchangedValue,
    }));
  };

  const handleToAmountChange = (value: number) => {
    if (!isSuccess) {
      return;
    }

    const exchangedValue = exchangeCurrency({
      fromValue: value,
      fromCurrency: currencyState.toCurrency,
      toCurrency: currencyState.fromCurrency,
      rates,
    });

    setCurrencyState((prev) => ({
      ...prev,
      fromAmount: exchangedValue,
      toAmount: value,
    }));
  };

  const handleFromCurrencyChange = (currency: string) => {
    if (!isSuccess) {
      return;
    }

    const exchangedValue = exchangeCurrency({
      fromValue: currencyState.fromAmount,
      fromCurrency: currency,
      toCurrency: currencyState.toCurrency,
      rates,
    });

    setCurrencyState((prev) => ({
      ...prev,
      fromCurrency: currency,
      toAmount: exchangedValue,
    }));
  };

  const handleToCurrencyChange = (currency: string) => {
    if (!isSuccess) {
      return;
    }

    const exchangedValue = exchangeCurrency({
      fromValue: currencyState.fromAmount,
      fromCurrency: currency,
      toCurrency: currencyState.fromCurrency,
      rates,
    });

    setCurrencyState((prev) => ({
      ...prev,
      toCurrency: currency,
      toAmount: exchangedValue,
    }));
  };

  return [
    currencyState,
    {
      handleFromAmountChange,
      handleToAmountChange,
      handleFromCurrencyChange,
      handleToCurrencyChange,
    },
  ];
};
