import { useGetCurrencies } from '@/api';
import { Button, Text } from '@/components/ui';

export const CurrencyRefetcher = () => {
  const { refetch: refetchCurrencies, isError: isCurrencyFetchError } =
    useGetCurrencies();

  if (!isCurrencyFetchError) {
    return null;
  }

  return (
    <div>
      <Text color="error" variant="base2">
        Couldn't fetch currencies.
      </Text>
      <Button variant="ghost" onClick={() => refetchCurrencies()}>
        <Text color="error" variant="base2" link>
          Try again?
        </Text>
      </Button>
    </div>
  );
};
