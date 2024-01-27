import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useGetCurrencies, useGetCurrencyRates } from '@/api';

import { Button } from '../ui';
import { CurrencyCalculator } from './CurrencyCalculator';
import classes from './CurrencyCalculatorContainer.module.css';
import { CurrencyCalculatorLoader } from './CurrencyCalculatorLoader';

export const CurrencyCalculatorContainer = () => {
  const { isError: isCurrencyRatesError, refetch: refetchCurrencyRates } =
    useGetCurrencyRates();

  const { isError: isCurrencyError, refetch: refetchCurrencies } =
    useGetCurrencies();

  const handleTryAgain = () => {
    if (isCurrencyRatesError) {
      refetchCurrencyRates();
    }
    if (isCurrencyError) {
      refetchCurrencies();
    }
  };

  return (
    <Suspense fallback={<CurrencyCalculatorLoader />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={() => (
              <div className={classes['calc-container']}>
                <p>There was an error during fetching data</p>
                <Button onClick={handleTryAgain}>Try again</Button>
              </div>
            )}
          >
            <div className={classes['calc-container']}>
              <h1 className={classes['calc-header']}>Currency Converter</h1>
              <CurrencyCalculator />
            </div>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
};
