import { render, screen } from '@testing-library/react';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { useGetCurrencies, useGetCurrencyRates } from '@/api';

import { CurrencyCalculatorContainer } from './CurrencyCalculatorContainer';

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
useGetCurrenciesMock.mockReturnValue({});

const useGetCurrencyRatesMock = useGetCurrencyRates as Mock;
useGetCurrencyRatesMock.mockReturnValue({});

describe('CurrencyCalculatorContainer', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Should show error content if data failed', () => {
    useGetCurrenciesMock.mockReturnValue({ isError: true });
    useGetCurrencyRatesMock.mockReturnValue({ isError: true });

    render(<CurrencyCalculatorContainer />);

    expect(
      screen.getByText<HTMLInputElement>(
        'There was an error during fetching data',
        { exact: false },
      ),
    ).toBeTruthy();
  });

  it('Should show loading content if data is loading', () => {
    useGetCurrenciesMock.mockReturnValue({ isLoading: true });
    useGetCurrencyRatesMock.mockReturnValue({ isLoading: true });

    render(<CurrencyCalculatorContainer />);

    expect(
      screen.getByText<HTMLInputElement>('Loading...', { exact: false }),
    ).toBeTruthy();
  });

  it('Should show loaded content if data is loaded and no errors', () => {
    useGetCurrenciesMock.mockReturnValue({ data: currenciesMockData });
    useGetCurrencyRatesMock.mockReturnValue({ data: currencyRatesMockData });

    render(<CurrencyCalculatorContainer />);

    expect(
      screen.getByText<HTMLInputElement>('Currency Converter', {
        exact: false,
      }),
    ).toBeTruthy();
  });
});
