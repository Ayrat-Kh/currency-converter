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
      <Text color="error" variant="base2">
        Couldn't fetch currency rates.
      </Text>
      <Button variant="ghost" onClick={() => refetchCurrencyRates()}>
        <Text color="error" variant="base2" link>
          Try again?
        </Text>
      </Button>
    </div>
  );
};
