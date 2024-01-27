import { useGetCurrencies, useGetCurrencyRates } from '@/api';

import { Button } from '../ui';
import { CurrencyCalculator } from './CurrencyCalculator';
import classes from './CurrencyCalculatorContainer.module.css';

export const CurrencyCalculatorContainer = () => {
  const {
    isError: isCurrencyRatesError,
    isLoading: isLoadingCurrencyRates,
    refetch: refetchCurrencyRates,
  } = useGetCurrencyRates();

  const {
    isError: isCurrencyError,
    isLoading: isLoadingCurrencies,
    refetch: refetchCurrencies,
  } = useGetCurrencies();

  const handleTryAgain = () => {
    if (isCurrencyRatesError) {
      refetchCurrencyRates();
    }
    if (isCurrencyError) {
      refetchCurrencies();
    }
  };

  if (isLoadingCurrencyRates || isLoadingCurrencies) {
    return (
      <div className={classes['calc-container']}>
        <p>Loading...</p>
      </div>
    );
  }

  if (isCurrencyError || isCurrencyRatesError) {
    return (
      <div className={classes['calc-container']}>
        <p>There was an error during fetching data</p>
        <Button onClick={handleTryAgain}>Try again</Button>
      </div>
    );
  }

  return (
    <div className={classes['calc-container']}>
      <h1 className={classes['calc-header']}>Currency Converter</h1>
      <CurrencyCalculator />
    </div>
  );
};
