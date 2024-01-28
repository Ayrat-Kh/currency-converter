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
        Couldn't update rates.
      </Text>
      <Button variant="ghost" onClick={() => refetchCurrencyRates()}>
        <u>
          <Text color="error" variant="base2">
            Try again?
          </Text>
        </u>
      </Button>
    </div>
  );
};
