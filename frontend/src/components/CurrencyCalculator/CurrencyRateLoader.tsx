import { useGetCurrencyRates } from '@/api';
import { Text } from '@/components/ui';

export const CurrencyRateLoader = () => {
  const { isRefetching: isRefetchingCurrencies } = useGetCurrencyRates();

  if (!isRefetchingCurrencies) {
    return null;
  }

  return <Text>Fetching currencies, please wait a while...</Text>;
};
