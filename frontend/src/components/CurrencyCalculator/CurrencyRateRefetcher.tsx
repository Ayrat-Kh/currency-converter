import { useGetCurrencyRates } from '@/api';
import { Button, Text } from '@/components/ui';

export const CurrencyRateRefetcher = () => {
  const { refetch: refetchCurrencyRates } = useGetCurrencyRates();
  const {
    isRefetching: isRefetchingCurrencies,
    isRefetchError: isGetCurrencyRefetchError,
  } = useGetCurrencyRates();

  if (!isGetCurrencyRefetchError || isRefetchingCurrencies) {
    return null;
  }

  return (
    <div>
      <Text>Couldn't update rates.</Text>
      <Button variant="ghost" onClick={() => refetchCurrencyRates()}>
        Try again?
      </Button>
    </div>
  );
};
