import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import { queryClient } from '@/api';
import { CurrenciesKey, CurrenciesRateKey } from '@/api/currency';

import { CurrencyCalculator } from './CurrencyCalculator';

const currenciesMockData = {
  AED: 'United Arab Emirates Dirham',
  USD: 'United States Dollar',
};

const currencyRatesMockData = {
  base: 'EUR',
  rates: {
    AED: 4.000807,
    USD: 1.089277,
  },
};

describe('CurrencyCalculator', () => {
  beforeEach(() => {
    queryClient.setQueryData(CurrenciesKey, currenciesMockData);
    queryClient.setQueryData(CurrenciesRateKey, currencyRatesMockData);
  });

  it('Should set secondary amount after adding primary amount, primary currency and secondary currency', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CurrencyCalculator />
      </QueryClientProvider>,
    );

    fireEvent.change(screen.getByLabelText('Amount 1'), {
      target: {
        value: '2',
      },
    });

    fireEvent.change(screen.getByLabelText('Currency 1'), {
      target: {
        value: 'AED',
      },
    });

    fireEvent.change(screen.getByLabelText('Currency 2'), {
      target: {
        value: 'USD',
      },
    });

    expect(screen.getByLabelText<HTMLInputElement>('Amount 2').value).toBe(
      '7.35',
    );
  });

  it('Should set primary amount after adding secondary amount, primary currency and secondary currency', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CurrencyCalculator />
      </QueryClientProvider>,
    );

    fireEvent.change(screen.getByLabelText('Currency 1'), {
      target: {
        value: 'AED',
      },
    });

    fireEvent.change(screen.getByLabelText('Currency 2'), {
      target: {
        value: 'USD',
      },
    });

    fireEvent.change(screen.getByLabelText('Amount 2'), {
      target: {
        value: '2',
      },
    });

    expect(screen.getByLabelText<HTMLInputElement>('Amount 1').value).toBe(
      '7.35',
    );
  });
});
