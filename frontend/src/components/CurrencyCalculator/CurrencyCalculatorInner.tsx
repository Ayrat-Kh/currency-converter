import { useGetCurrencies } from '@/api';
import { CurrencySelect } from '@/components/CurrencySelect';
import { NumberInput } from '@/components/ui/NumberInput';

import classes from './CurrencyCalculatorInner.module.css';
import { CurrencyRateRefetcher } from './CurrencyRateRefetcher';
import { CurrencyRefetcher } from './CurrencyRefetcher';
import { Summary } from './Summary';
import { useCurrencyState } from './hooks/useCurrencyState';

export const CurrencyCalculatorInner = () => {
  const { isLoading: isLoadingCurrencies } = useGetCurrencies();

  const [
    currencyState,
    {
      handleFromAmountChange,
      handleFromCurrencyChange,
      handleToAmountChange,
      handleToCurrencyChange,
    },
  ] = useCurrencyState();

  return (
    <>
      <div className={classes['calculator-container']}>
        <Summary
          mainAmount={currencyState.fromAmount}
          mainCurrency={currencyState.fromCurrency}
          secondaryAmount={currencyState.toAmount}
          secondaryCurrency={currencyState.toCurrency}
          className={classes['calculator-screen']}
        />
        <NumberInput
          label="Amount 1"
          value={currencyState.fromAmount}
          className={classes['calculator-first_amount']}
          onChange={handleFromAmountChange}
        />
        <CurrencySelect
          disabled={isLoadingCurrencies}
          className={classes['calculator-first_cur_select']}
          label="Currency 1"
          selectedCurrencyCode={currencyState.fromCurrency}
          onChange={handleFromCurrencyChange}
        />
        <NumberInput
          label="Amount 2"
          value={currencyState.toAmount}
          className={classes['calculator-second_amount']}
          onChange={handleToAmountChange}
        />
        <CurrencySelect
          disabled={isLoadingCurrencies}
          className={classes['calculator-second_cur_select']}
          label="Currency 2"
          selectedCurrencyCode={currencyState.toCurrency}
          onChange={handleToCurrencyChange}
        />
      </div>
      <CurrencyRateRefetcher />
      <CurrencyRefetcher />
    </>
  );
};
