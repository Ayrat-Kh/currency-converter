import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { type Mock, vi } from 'vitest';

import { useGetCurrencies, useGetCurrencyRates } from '@/api';

import { CurrencyCalculatorInner } from './CurrencyCalculatorInner';

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

vi.mock('@/api', () => ({
  useGetCurrencies: vi.fn(),
  useGetCurrencyRates: vi.fn(),
}));

const useGetCurrenciesMock = useGetCurrencies as Mock;
useGetCurrenciesMock.mockReturnValue({
  data: currenciesMockData,
});

const useGetCurrencyRatesMock = useGetCurrencyRates as Mock;
useGetCurrencyRatesMock.mockReturnValue({
  data: currencyRatesMockData,
  refetch: () => ({
    data: currencyRatesMockData,
  }),
});

describe('CurrencyCalculatorInner', () => {
  beforeEach(() => {});

  it('Should set secondary amount after adding primary amount, primary currency and secondary currency', async () => {
    render(<CurrencyCalculatorInner />);

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

    await waitFor(() => {
      expect(screen.getByLabelText<HTMLInputElement>('Amount 2').value).toBe(
        '0.54',
      );
    });
  });

  it('Should set primary amount after adding secondary amount, primary currency and secondary currency', async () => {
    render(<CurrencyCalculatorInner />);

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

    await waitFor(() => {
      screen.getByLabelText<HTMLInputElement>('Amount 1');
    });
  });
});
