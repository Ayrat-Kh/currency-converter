import { useState } from 'react';

import { useGetCurrencyRates } from '@/api';
import { DEBOUNCE_TIME_MS } from '@/constants/app-constants';
import { useDebounceHandler } from '@/hooks';
import { exchangeCurrency } from '@/utils';
import { ExchangeCurrencyParams } from '@/utils';

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

  const [toAmount, setToAmount] = useState<number>(NaN);
  const [toCurrency, setToCurrency] = useState('');
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState('');

  const exchangeValueAsync = useDebounceHandler<
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

    exchangeValueAsync(
      {
        fromValue,
        fromCurrency,
        toCurrency,
      },
      false,
    );
  };

  const handleToAmountChange = async (value: number) => {
    setToAmount(value);

    exchangeValueAsync(
      {
        fromValue: value,
        fromCurrency: toCurrency,
        toCurrency: fromCurrency,
      },
      true,
    );
  };

  const handleFromCurrencyChange = async (currency: string) => {
    setFromCurrency(currency);

    exchangeValueAsync(
      {
        fromValue: fromAmount,
        fromCurrency: currency,
        toCurrency,
      },
      false,
    );
  };

  const handleToCurrencyChange = async (currency: string) => {
    setToCurrency(currency);

    exchangeValueAsync(
      {
        fromValue: fromAmount,
        fromCurrency,
        toCurrency: currency,
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
