import { useState } from 'react';

import { useGetCurrencyRates } from '@/api';
import { DEBOUNCE_TIME_MS } from '@/constants/app-constants';
import { useDebounceHandler } from '@/hooks';
import { exchangeCurrency } from '@/utils';
import { ExchangeCurrencyParams } from '@/utils/exchangeCurrency';

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

type ExchangeDebounceParams = Omit<ExchangeCurrencyParams, 'rates'>;

export const useCurrencyState = (): [CurrencyState, CurrencyStateHandlers] => {
  const { refetch: refetchCurrencyRates } = useGetCurrencyRates();

  const [toAmount, setToAmount] = useState(NaN);
  const [toCurrency, setToCurrency] = useState('');
  const [fromAmount, setFromAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState('');

  const updateValue = useDebounceHandler<
    (request: ExchangeDebounceParams, updateFrom: boolean) => Promise<void>
  >(async (request: ExchangeDebounceParams, updateFrom: boolean) => {
    if (!request.fromCurrency || !request.toCurrency || !request.fromValue) {
      return;
    }

    const { data: rates } = await refetchCurrencyRates();
    if (!rates) {
      return;
    }

    const exchangedValue = exchangeCurrency({
      ...request,
      rates,
    });

    if (updateFrom) {
      setFromAmount(exchangedValue);
    } else {
      setToAmount(exchangedValue);
    }
  }, DEBOUNCE_TIME_MS);

  const handleFromAmountChange = async (fromValue: number) => {
    setFromAmount(fromValue);

    updateValue(
      {
        fromValue,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
      },
      false,
    );
  };

  const handleToAmountChange = async (value: number) => {
    setToAmount(value);

    updateValue(
      {
        fromValue: value,
        fromCurrency,
        toCurrency,
      },
      true,
    );
  };

  const handleFromCurrencyChange = async (currency: string) => {
    setFromCurrency(currency);

    updateValue(
      {
        fromValue: fromAmount,
        fromCurrency: currency,
        toCurrency: toCurrency,
      },
      false,
    );
  };

  const handleToCurrencyChange = async (currency: string) => {
    setToCurrency(currency);

    updateValue(
      {
        fromValue: fromAmount,
        fromCurrency: currency,
        toCurrency: fromCurrency,
      },
      false,
    );
  };

  return [
    {
      fromAmount,
      fromCurrency,
      toAmount,
      toCurrency,
    },
    {
      handleFromAmountChange,
      handleToAmountChange,
      handleFromCurrencyChange,
      handleToCurrencyChange,
    },
  ];
};
