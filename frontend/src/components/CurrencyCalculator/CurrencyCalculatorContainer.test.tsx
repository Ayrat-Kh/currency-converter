import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { useGetCurrencies, useGetCurrencyRates } from '@/api';

import { CurrencyCalculatorContainer } from './CurrencyCalculatorContainer';

vi.mock('@/api', () => ({
  useGetCurrencies: vi.fn(),
  useGetCurrencyRates: vi.fn(),
}));

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

const currenciesMock = {
  isLoading: false,
  data: currenciesMockData,
  isError: false,
  refetch: () => ({ data: currenciesMockData }),
};

const currencyRatesMock = {
  isLoading: false,
  data: currencyRatesMockData,
  isError: false,
  refetch: () => ({ data: currencyRatesMockData }),
};

const useGetCurrenciesMock = useGetCurrencies as Mock;

const useGetCurrencyRatesMock = useGetCurrencyRates as Mock;

describe('CurrencyCalculatorContainer', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    useGetCurrenciesMock.mockReturnValue(currenciesMock);
    useGetCurrencyRatesMock.mockReturnValue(currencyRatesMock);
  });

  it('Should show error content if data failed', () => {
    useGetCurrenciesMock.mockReturnValue({ ...currenciesMock, isError: true });
    useGetCurrencyRatesMock.mockReturnValue({
      ...currencyRatesMock,
      isError: true,
    });

    render(<CurrencyCalculatorContainer />);

    expect(
      screen.getByText<HTMLInputElement>("Couldn't fetch currency rates.", {
        exact: false,
      }),
    ).toBeTruthy();
  });

  it('Should show loaded content if data is loaded and no errors', () => {
    useGetCurrenciesMock.mockReturnValue(currenciesMock);
    useGetCurrencyRatesMock.mockReturnValue(currencyRatesMock);

    render(<CurrencyCalculatorContainer />);

    expect(
      screen.getByText<HTMLInputElement>('Currency Converter', {
        exact: false,
      }),
    ).toBeTruthy();
  });

  it('Should set secondary amount after adding primary amount, primary currency and secondary currency', async () => {
    render(<CurrencyCalculatorContainer />);

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
    render(<CurrencyCalculatorContainer />);

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
