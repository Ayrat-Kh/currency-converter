import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

type Response<T> = {
  message: 'Success';
  value: T;
};

export type GetCurrencyResponse = Record<string, string>;

const getCurrencies = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<GetCurrencyResponse> => {
  const result = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/currencies`,
    {
      signal,
    },
  );

  const responseData = (await result.json()) as Response<GetCurrencyResponse>;

  return responseData.value;
};

export const CurrenciesKey = ['currencies'];

export const useGetCurrencies = () => {
  return useQuery({
    queryKey: CurrenciesKey,
    queryFn: getCurrencies,
  });
};

export type GetCurrencyRatesResponse = {
  base: string;
  rates: Record<string, number>;
};

const getCurrencyRates = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<GetCurrencyRatesResponse> => {
  const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/rates`, {
    signal,
  });

  const responseData =
    (await result.json()) as Response<GetCurrencyRatesResponse>;

  return responseData.value;
};

export const CurrenciesRateKey = ['currency-rates'];

export const useGetCurrencyRates = () => {
  return useQuery({
    queryKey: CurrenciesRateKey,
    queryFn: getCurrencyRates,
  });
};
