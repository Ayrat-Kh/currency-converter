import { GetCurrencyResponse } from '@/api';

export const mapCurrencyOptionResponse = (
  response: GetCurrencyResponse | undefined,
) => {
  return Object.entries(response ?? {})
    .map(([key, value]) => ({
      label: value,
      value: key,
    }))
    .sort((a, b) => (a.label < b.label ? -1 : 1));
};
