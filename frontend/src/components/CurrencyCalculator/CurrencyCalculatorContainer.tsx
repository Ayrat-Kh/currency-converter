import { type FC } from 'react';

import { useGetCurrencies } from '@/api';
import { Button } from '@/components/ui';

import classes from './CurrencyCalculatorContainer.module.css';
import { CurrencyCalculatorInner } from './CurrencyCalculatorInner';

const CurrencyCalculatorLoader: FC = () => {
  return (
    <div className={classes['calc-container']}>
      <p>Loading...</p>
    </div>
  );
};

const CurrencyCalculatorError: FC = () => {
  const { isError: isCurrencyError, refetch: refetchCurrencies } =
    useGetCurrencies();

  const handleTryAgain = () => {
    if (isCurrencyError) {
      refetchCurrencies();
    }
  };

  return (
    <div className={classes['calc-container']}>
      <p>There was an error during fetching data</p>
      <Button onClick={handleTryAgain}>Try again</Button>
    </div>
  );
};

const CurrencyCalculator: FC = () => {
  return (
    <div className={classes['calc-container']}>
      <h1 className={classes['calc-header']}>Currency Converter</h1>
      <CurrencyCalculatorInner />
    </div>
  );
};

export const CurrencyCalculatorContainer = () => {
  const { isError: isCurrencyError, isLoading: isLoadingCurrencies } =
    useGetCurrencies();

  if (isLoadingCurrencies) {
    return <CurrencyCalculatorLoader />;
  }

  if (isCurrencyError) {
    return <CurrencyCalculatorError />;
  }

  return <CurrencyCalculator />;
};
